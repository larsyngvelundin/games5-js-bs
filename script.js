//
//
//
//




let hero = "";
let game = document.getElementById("game");
let score = document.getElementById("score");
let messageElement = document.getElementById("message");

let playerAlive = false;
let scoreValue = 0
let playerBottom = document.documentElement.clientHeight / 2;
let playerLeft = document.documentElement.clientWidth / 2;
let heroRotation = 0;
let enemySpeed = -12;

document.addEventListener("keydown", (e) => {
    console.log("e", e.key);

    switch (e.key) {
        case "s":
        case "ArrowDown":
            if (playerAlive) {
                console.log("vi ska gå ner");
                //bottom -= 10;
            }
            else {
                startGame();
            }
            break;
        case "d":
        case "ArrowRight":
            heroRotation += 10;
            hero.style.rotate = heroRotation + "deg";
            break;
        case "a":
        case "ArrowLeft":
            heroRotation -= 10;
            hero.style.rotate = heroRotation + "deg";
            break;

        case "j":
        case "ArrowUp":
        case "w":
            createBullet();

    }
})

let enemyId = 0;
let bulletId = 0;
let enemyMainSize = 25;

function createEnemy(size, left = 0, bottom = 0) {


    let enemySize = size;
    enemyId++;
    let enemy = document.createElement("img");
    enemy.classList = "enemy";


    let enemyBottom = bottom;
    let enemyLeft = left;

    if (enemyBottom == 0) {
        let leftorright = Math.random();
        console.log("leftorright", leftorright)
        if (leftorright > 0.5) {
            enemyLeft = Math.floor(Math.random() * document.documentElement.clientWidth / 10) * 10;
            enemyBottom = -15;
        }
        else {
            enemyBottom = Math.floor(Math.random() * document.documentElement.clientHeight / 10) * 10;
            enemyLeft = -15;
        }
    }

    let enemyRotation = Math.random() * 360;
    console.log("enemyRotation", enemyRotation);

    console.log("enemy", enemyBottom);

    enemy.src = "img/asteroid.png"
    enemy.style.backgroundImage = "url('img/asteroid.png')";
    enemy.style.left = enemyLeft + "px";
    enemy.style.bottom = enemyBottom + "px";
    enemy.style.width = enemyMainSize * enemySize + "px";
    enemy.style.height = enemyMainSize * enemySize + "px";
    // enemy.style.backgroundColor = color;
    enemy.id = enemyId;

    //stänger intervallen
    let move = setInterval(() => {
        //Hastighet
        // enemyBottom += enemySpeed;
        // enemy.style.bottom = enemyBottom + "px";

        let moveX = Math.cos(toRadians(enemyRotation)) * enemySpeed;
        //console.log("move X", moveX)
        enemyLeft += moveX;
        enemy.style.left = enemyLeft + "px";
        let moveY = Math.sin(toRadians(enemyRotation)) * enemySpeed;
        //console.log("move Y", moveY)
        enemyBottom -= moveY;
        enemy.style.bottom = enemyBottom + "px";

        //Collision detector
        //if (enemyBottom > bottom && enemyBottom < bottom + 150 && enemyLeft === left) {
        if (Math.abs(enemyBottom - playerBottom) < 25 && Math.abs(enemyLeft - playerLeft) < 25) {
            console.log("HERO HIT");
            let dyingSound = new Audio("game-over-arcade-6435.mp3");
            dyingSound.volume = 0.3;
            dyingSound.play();
            hero.remove();
            messageElement.innerHTML = "You died";
            //clearInterval(move)
            clearInterval(move)
            playerAlive = false;
            enemy.remove();
            
            let currentAsteroids = document.getElementsByClassName("enemy");
            for (i = 0; i < currentAsteroids.length; i++) {
                currentAsteroids[i].classList.add("dead");
            }
            //enemy.remove();
        }
        //Math.abs(enemyBottom - bottom) < 25
        let clientWidth = document.documentElement.clientWidth;
        let clientHeight = document.documentElement.clientHeight;
        let safeMargin = 15;
        let safeMarginExtra = 30;
        if (enemyLeft > clientWidth + safeMargin) {
            enemyLeft = 0 - safeMarginExtra;
        }
        if (enemyLeft < 0 - safeMarginExtra) {
            enemyLeft = clientWidth + safeMargin;
        }
        if (enemyBottom > clientHeight + safeMargin) {
            enemyBottom = 0 - safeMarginExtra;
        }
        if (enemyBottom < 0 - safeMarginExtra) {
            enemyBottom = clientHeight + safeMargin;
        }
        if (enemy.classList.contains("dead")) {
            if (enemySize > 1 && playerAlive) {
                createEnemy(enemySize-1, enemyLeft, enemyBottom);
                createEnemy(enemySize-1, enemyLeft, enemyBottom);
                createEnemy(enemySize-1, enemyLeft, enemyBottom);
            }
            else if (playerAlive){
                createEnemy(5);
            }
            clearInterval(move)
            enemy.remove();

        }
        // if(enemy.classList)
        //     clearInterval(move)
        //     enemy.remove();
        //     //setTimeout(createEnemy(color), 5000);
        //     if (playerAlive) {
        //         createEnemy();
        //         createEnemy();
        //     }
        // }

    }, 60);

    function stopEnemy() {
        clearInterval(move);

    }

    game.appendChild(enemy)
}


//createEnemy();
//createEnemyTwo();
//createEnemy();
//createEnemy();
//createEnemy();



function toRadians(angle) {
    return angle * (Math.PI / 180);
}
function createBullet() {

    bulletId++;
    let bullet = document.createElement("div");
    bullet.classList = "bullet";
    let bulletBottom = playerBottom + 25;
    let rotation = heroRotation - 90;
    bullet.style.rotate = (rotation + 90) + "deg";
    //console.log(hero.style.width);
    //console.log(hero);
    let bulletLeft = playerLeft + 25;

    let shootingSound = new Audio("lazer-reverb-13090.mp3");
    shootingSound.volume = 0.1;
    shootingSound.play();
    console.log("bullet", bulletBottom);
    let posX = left;
    let posY = bottom;
    let speed = 20;
    let moveX = Math.cos(toRadians(rotation)) * speed;
    let moveY = Math.sin(toRadians(rotation)) * speed;

    bullet.style.left = bulletLeft + "px";
    bullet.style.bottom = bulletBottom + "px";
    bullet.id = bulletId;

    //stänger intervallen
    let move = setInterval(() => {
        //Hastighet
        bulletLeft += moveX;
        bulletBottom -= moveY;
        bullet.style.left = bulletLeft + "px";
        bullet.style.bottom = bulletBottom + "px";
        //bulletBottom += 12;
        //bullet.style.bottom = bulletBottom + "px";

        //Collision detector
        // if (bulletBottom > bottom && bulletBottom < bottom + 150 && bulletLeft === left) {
        //     console.log("HIT");
        // }

        if (bulletBottom > 1000) {
            clearInterval(move)
            bullet.remove();
        }

        let clientWidth = document.documentElement.clientWidth;
        let clientHeight = document.documentElement.clientHeight;
        let safeMargin = 15;
        let safeMarginExtra = 30;
        if (bulletLeft > clientWidth + safeMargin ||
            bulletLeft < 0 - safeMarginExtra ||
            bulletBottom > clientHeight + safeMargin ||
            bulletBottom < 0 - safeMarginExtra) {
            bullet.remove();
            clearInterval(move);
        }
        let currentAsteroids = document.getElementsByClassName("enemy");

        for (i = 0; i < currentAsteroids.length; i++) {
            //console.log("Entered for loop", currentAsteroids[i].style.bottom);
            let tempBottom = parseInt(currentAsteroids[i].style.bottom.slice(0, -2));
            let tempLeft = parseInt(currentAsteroids[i].style.left.slice(0, -2));
            //console.log("bottom", Math.abs(tempBottom - bulletBottom));
            //console.log("left", Math.abs(tempLeft - bulletLeft));
            if (Math.abs(tempBottom - bulletBottom) < 25 && Math.abs(tempLeft - bulletLeft) < 25) {
                console.log("BULLET HIT");
                let boomSound = new Audio("boom.mp3");
                boomSound.volume = 0.3;
                boomSound.play();
                currentAsteroids[i].classList.add("dead");
                clearInterval(move);
                bullet.remove();
                addScore();
            }
        }


    }, 60);

    //game.createBullet(bullet)
    game.appendChild(bullet)
}


function addScore() {
    scoreValue++;
    score.innerHTML = "Score:" + scoreValue;
}


function startGame() {
    playerAlive = true;
    let playerElement = document.createElement("img");
    playerElement.src = "img/superhero.png";
    playerElement.classList.add("hero");
    playerElement.id = "hero";
    playerElement.style.bottom = document.documentElement.clientHeight / 2 + "px";
    playerElement.style.left = document.documentElement.clientWidth / 2 + "px";
    game.appendChild(playerElement);
    hero = document.getElementById("hero");

    scoreValue = 0;
    bottom = 0;
    left = 50;
    heroRotation = 0;
    enemySpeed = -12;
    createEnemy(3);
    createEnemy(3);
    createEnemy(3);
}