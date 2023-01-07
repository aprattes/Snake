// Alexander Prattes 42002053

let snakeV2 = false;

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// create the score var
let score = 0;

// control the snake
let d;

// load images
const ground = new Image();
ground.src = "./img/ground.png";

const foodImg = new Image();
foodImg.src = "./img/food.png";

// load audio files
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();


dead.src = "./audio/dead.mp3";
eat.src = "./audio/eat.mp3";
up.src = "./audio/up.mp3";
right.src = "./audio/right.mp3";
left.src = "./audio/left.mp3";
down.src = "./audio/down.mp3";

// create the snake
let snake = [];

// create the food
let food;

document.addEventListener("keydown", direction);

// Intervall variable
let game;

let versionInfo = ""

function initGame() {
    // Stop current game
    clearInterval(game);

    let instructions = "INSTRUCTIONS:\n"
        + "Use arrow keys to navigate the Snake\n"
        + "Press 'v' to change to SnakeV2 or back to Classic Snake.\n"
        + "Press 'n' to start a new Game."

    if (snakeV2 == true) {
        // SNAKE V2!
        document.title = "Snake V2!"
        alert("Welcome to Snake 2!\n\n"
            + " * Avoid hitting yourself, but you can "
            + "go through walls and the new Head will appear on the other side.\n\n"
            + "========================================\n"
            + instructions + "\n"
            + "========================================\n"
        );

        versionInfo = "Snake V2"
    } else {
        // SNAKE V1 - Classic Snake
        document.title = "Snake Game"
        alert("Welcome to the Classic Snake Game!\n\n"
            + " * Avoid hitting yourself and the walls.\n\n"
            + "========================================\n"
            + instructions + "\n"
            + "========================================\n"
        );

        versionInfo = "Classic Snake"
    }

    score = 0;
    d = 0; // Snake shouldn move until first KeyDown
    snake = []; // Empty Array
    snake[0] = {
        x: 9 * box,
        y: 10 * box
    };

    food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box
    }

    // call draw function every 100 ms
    game = setInterval(draw, 100);
}

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT") {
        left.play();
        d = "LEFT";
    } else if (key == 38 && d != "DOWN") {
        d = "UP";
        up.play();
    } else if (key == 39 && d != "LEFT") {
        d = "RIGHT";
        right.play();
    } else if (key == 40 && d != "UP") {
        d = "DOWN";
        down.play();
    } else if (key == 78) { // n
        initGame();
    } else if (key == 86) { // v
        snakeV2 = !snakeV2;
        initGame();
    }
}

// check collision function
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// draw everything to the canvas
function draw() {
    ctx.drawImage(ground, 0, 0);

    ctx.fillStyle = "white";
    ctx.font = box + "px Changa one";
    ctx.fillText(versionInfo, 1 * box, 18.75 * box);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? ((snakeV2) ? "brown" : "green") : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // which direction
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // if the snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
        // we don't remove the tail
    } else {
        // remove the tail
        snake.pop();
    }

    // Snake 2 feature :F
    if (snakeV2 == true) {
        if (snakeX < box) {
            snakeX = 17 * box;
        }

        if (snakeX > 17 * box) {
            snakeX = box;
        }

        if (snakeY < 3 * box) {
            snakeY = 17 * box;
        }

        if (snakeY > 17 * box) {
            snakeY = box * 3;
        }
    }

    // add new Head
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // game over
    if (snakeX < box || snakeX > 17 * box
        || snakeY < 3 * box || snakeY > 17 * box
        || collision(newHead, snake)) {
        clearInterval(game);
        dead.play();
    }

    snake.unshift(newHead);


    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

initGame();



















