const score = document.querySelector('.score');
const start = document.querySelector('.start');
const gameArea = document.querySelector('.gameArea');
const list = document.querySelector('.scoreList');
const car = document.createElement('div');

car.className = 'car';

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

const settings = {
    start: false,
    score: 0,
    speed: 5,
    traffic: 3,
};
const getQuantityElements = heightElement => Math.ceil(gameArea.offsetHeight / heightElement);


const startGame = () => {
    start.className = 'hide';
    score.className = 'score';
    gameArea.innerHTML = '';
    for (let i = 0; i < getQuantityElements(100) + 1; i++) {
        const line = document.createElement('div');
        line.className = 'line';
        line.style.top = (i * 100) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    };
    for (let i = 0; i < getQuantityElements(100 * settings.traffic); i++) {
        const enemy = document.createElement('div');
        let enemyImg = Math.floor(Math.random() * 3) + 1;
        enemy.className = 'enemy';
        enemy.y = -100 * settings.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = `transparent url(./img/enemy${enemyImg}.png) center / cover no-repeat`;
        gameArea.appendChild(enemy);
    }
    settings.score = 0;
    settings.start = true;
    gameArea.appendChild(car);
    car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2;
    car.style.top = 'auto';
    car.style.bottom = '10px';
    settings.x = car.offsetLeft;
    settings.y = car.offsetTop;
    requestAnimationFrame(playGame);
};

const playGame = () => {
    // settings.y += (settings.speed / 12);
    if (settings.start) {
        let points = settings.score += settings.speed;
        score.innerHTML = 'SCORE<br>' + points;
        moveRoad();
        moveEnemy();
        if (keys.ArrowLeft && settings.x > 0) {
            settings.x -= settings.speed;
        }
        if (keys.ArrowRight && settings.x < (gameArea.offsetWidth - car.offsetWidth)) {
            settings.x += settings.speed;
        }
        if (keys.ArrowDown && settings.y < (gameArea.offsetHeight - car.offsetHeight)) {
            settings.y += settings.speed;
        }
        if (keys.ArrowUp && settings.y > 0) {
            settings.y -= settings.speed;
        }
        car.style.left = settings.x + 'px';
        car.style.top = settings.y + 'px';

        requestAnimationFrame(playGame);

    }
};

const startRun = event => {
    event.preventDefault();
    // if(keys.hasOwnProperty(event.key)){
    //     keys[event.key] = true;

    // }
    if (event.key in keys) {
        keys[event.key] = true;
    }
};
const stopRun = event => {
    event.preventDefault();
    if (event.key in keys) {
        keys[event.key] = false;

    }
};

const moveRoad = () => {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function (line) {
        line.y += settings.speed;
        line.style.top = line.y + 'px';
        if (line.y >= gameArea.offsetHeight) {
            line.y = -100;
        }
    });
};

const moveEnemy = () => {
    let scoreList = [];

    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(item => {

        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();

        if (carRect.top <= enemyRect.bottom &&
            carRect.right >= enemyRect.left &&
            carRect.left <= enemyRect.right &&
            carRect.bottom >= enemyRect.top) {
            score.className = 'hide';

            scoreList.push(settings.score);
            settings.start = false;

            start.classList.remove('hide');
            start.className = 'start';
            start.style.top = score.offsetHeight;
            list.innerHTML += '>\t' + scoreList + '<br>';
            console.log(scoreList);
        }
        item.y += settings.speed / 2;
        item.style.top = item.y + 'px';
        if (item.y >= gameArea.offsetHeight) {
            let enemyImg = Math.floor(Math.random() * 2) + 1;
            item.y = -100 * settings.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
            item.style.background = `transparent url(./img/enemy${enemyImg}.png) center / cover no-repeat`;
        }
    });
};

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);































































































