//
//
//

let highscoreValue = 0;
// kolla om highscore 'r sparat
if(localStorage.getItem("highscore")){
    //om det finns ladda in i highscoreValue
    console.log("den finns");
    console.log("LS Highscore",localStorage.getItem("highscore"));
    highscoreValue = parseInt(localStorage.getItem("highscore"));
    console.log("type",typeof(highscoreValue));
}
else{
    //om inte skapa det och sätt till noll
    localStorage.setItem("highscore", highscoreValue);
    console.log("den finns inte");
}






let hero = "";
let game = document.getElementById("game");
let score = document.getElementById("score");
let highscore = document.getElementById("highscore");
highscore.innerHTML = "Highscore:" + highscoreValue;
let messageElement = document.getElementById("message");
messageElement.innerHTML = "Press S to start";

let playerAlive = false;
let scoreValue = 0;
let bottom = 0;
let left = 50;
let heroRotation = 0;
let enemySpeed = -12;

document.addEventListener("keydown", (e) => {
    console.log("e", e.key);

    switch (e.key) {
        case "w":
        case "ArrowUp":
            console.log("vi ska gå uppåt");
            bottom += 10;
            hero.style.bottom = bottom + "px"
            break;
        case "s":
        case "ArrowDown":
            if (playerAlive) {
                console.log("vi ska gå ner");
                bottom -= 10;
                hero.style.bottom = bottom + "px"
            }
            else {
                startGame();
            }
            break;
        case "d":
        case "ArrowRight":
            left += 10;
            hero.style.left = left + "px"
            heroRotation += 45;
            hero.style.rotate = heroRotation + "deg";
            break;
        case "a":
        case "ArrowLeft":

            left -= 10;
            hero.style.left = left + "px"
            heroRotation -= 45;
            hero.style.rotate = heroRotation + "deg";

            break;

        case "j":
            createBullet();

    }
})

let enemyId = 0;
let bulletId = 0;

let gameUpdate = setInterval(() => {
    if(playerAlive){
        messageElement.style.display = "none";
    }
    else{
        messageElement.style.display = "block";
    }
},100);

function createEnemy(color) {

    enemyId++;
    let enemy = document.createElement("img");
    enemy.classList = "enemy";
    let enemyBottom = document.documentElement.clientHeight;
    let enemyLeft = Math.floor(Math.random() * document.documentElement.clientWidth / 10) * 10;

    console.log("enemy", enemyBottom);

    enemy.src = "img/asteroid.png"
    enemy.style.backgroundImage = "url('img/asteroid.png')";
    enemy.style.left = enemyLeft + "px";
    enemy.style.bottom = enemyBottom + "px";
    enemy.style.backgroundColor = color;
    enemy.id = enemyId;

    //stänger intervallen
    let move = setInterval(() => {
        //Hastighet
        enemyBottom += enemySpeed;
        enemy.style.bottom = enemyBottom + "px";

        //Collision detector
        //if (enemyBottom > bottom && enemyBottom < bottom + 150 && enemyLeft === left) {
        if (Math.abs(enemyBottom - bottom) < 25 && Math.abs(enemyLeft - left) < 25) {
            console.log("HERO HIT");
            let dyingSound = new Audio("game-over-arcade-6435.mp3");
            dyingSound.volume = 0.3;
            dyingSound.play();
            hero.remove();
            messageElement.innerHTML = "You died<br>Press S to try again";
            if (highscoreValue == scoreValue){
                messageElement.innerHTML += "<br>NEW HIGHSCORE!";
                localStorage.setItem("highscore", highscoreValue);
            }

            ////
            ////LÄGG TILL HIGHCSORE I LS
            ////



            //clearInterval(move)
            clearInterval(move)
            playerAlive = false;
            enemy.remove();
            //enemy.remove();
        }
        //Math.abs(enemyBottom - bottom) < 25
        if (enemyBottom <= -100) {
            clearInterval(move)
            enemy.remove();
            //setTimeout(createEnemy(color), 5000);
            if (playerAlive) {
                createEnemy();
                createEnemy();
            }
        }
        if(enemy.classList.contains("remove")){
            clearInterval(move)
            enemy.remove();
        }

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
    let bulletBottom = bottom + 25;
    let rotation = heroRotation - 90;
    bullet.style.rotate = (rotation + 90) + "deg";
    //console.log(hero.style.width);
    //console.log(hero);
    let bulletLeft = left + 25;

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
        if (bulletLeft > clientWidth + safeMargin) {
            bullet.remove();
        }
        if (bulletLeft < 0 - safeMarginExtra) {
            bullet.remove();
        }
        if (bulletBottom > clientHeight + safeMargin) {
            bullet.remove();
        }
        if (bulletBottom < 0 - safeMarginExtra) {
            bullet.remove();
        }

        let currentAsteroids = document.getElementsByClassName("enemy");

        for (i = 0; i < currentAsteroids.length; i++) {
            //console.log("Entered for loop", currentAsteroids[i].style.bottom);
            let tempBottom = parseInt(currentAsteroids[i].style.bottom.slice(0, -2));
            let tempLeft = parseInt(currentAsteroids[i].style.left.slice(0, -2));
            //console.log("bottom", Math.abs(tempBottom - bulletBottom));
            //console.log("left", Math.abs(tempLeft - bulletLeft));
            if (Math.abs(tempBottom - bulletBottom) < 25 && 
                Math.abs(tempLeft - bulletLeft) < 25) {
                console.log("BULLET HIT");
                let boomSound = new Audio("boom.mp3");
                boomSound.volume = 0.3;
                boomSound.play();
                currentAsteroids[i].classList.add("remove");
                addScore();
                clearInterval(move);
                bullet.remove();
            }
        }


    }, 60);

    //game.createBullet(bullet)
    game.appendChild(bullet)
}

function addScore() {
    scoreValue++;
    if(scoreValue > highscoreValue){
        highscoreValue = scoreValue;
    }
    score.innerHTML = "Score:" + scoreValue;
    highscore.innerHTML = "Highscore:" + highscoreValue;
}

function startGame() {
    playerAlive = true;
    let playerElement = document.createElement("img");
    playerElement.src = "img/superhero.png";
    playerElement.classList.add("hero");
    playerElement.id = "hero";
    game.appendChild(playerElement);
    hero = document.getElementById("hero");
    
    scoreValue = 0;
    score.innerHTML = "Score:" + scoreValue;
    bottom = 0;
    left = 50;
    heroRotation = 0;
    enemySpeed = -12;
    createEnemy();
    createEnemy();
    createEnemy();
}