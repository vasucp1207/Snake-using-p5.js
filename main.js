var snake;
var grid = 20;
var food;
let mySound;
let gameEnd;

// function preload() {
//   soundFormats('mp3', 'ogg');
//   mySound = loadSound('eating.mp3');
// }

function setup(){

    createCanvas(600, 600);
    background(50);
    gameEnd = false;
    frameRate(10);
    pickLocation();

    snake = new Snake();
}

function draw(){

    background(50);
    snake.show();
    snake.update();
    snake.death();

    if(snake.eat(food)){
        pickLocation();
    }

    fill(255, 0, 100);
    rect(food.x, food.y, grid, grid);
}

function pickLocation(){

    var col = floor(width / grid);
    var row = floor(height / grid);
    food = createVector(floor(random(col)), floor(random(row)));
    food.mult(grid);
}

// function keyReleased(){
//     snake.dir(0, 0);
// }

function keyPressed(){
    
    if(keyCode == UP_ARROW){
        snake.dir(0, -1);
    }
    else if(keyCode == DOWN_ARROW){
        snake.dir(0, 1);
    }
    else if(keyCode == RIGHT_ARROW){
        snake.dir(1, 0);
    }
    else if(keyCode == LEFT_ARROW){
        snake.dir(-1, 0);
    }
}

function Snake(){
        
    this.x = 0;
    this.y = 0;
    this.xspeed = 0;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];

    this.show = function(){

        fill(255);
        for(var i = 0; i < this.tail.length; i++){
            rect(this.tail[i].x, this.tail[i].y, grid, grid);
        }
        rect(this.x, this.y, grid, grid);
    }

    this.dir = function(x, y){

        this.xspeed = x;
        this.yspeed = y;
    }

    this.update = function(){

        for(var i = 0; i < this.tail.length - 1; i++){
            this.tail[i] = this.tail[i + 1];
        }

        if(this.total >= 1){
            this.tail[this.total - 1] = createVector(this.x, this.y);
        }

        this.x = this.x + this.xspeed * grid;
        this.y = this.y + this.yspeed * grid;

        this.x = constrain(this.x, 0, width - grid);
        this.y = constrain(this.y, 0, height - grid);
    }

    this.eat = function(food_pos){

        var d = dist(this.x, this.y, food_pos.x, food_pos.y);
        if(d < 1){
            // mySound.play();
            this.total++;
            return true;
        }
        else{
            return false;
        }
    }

    this.death = function(){

        for(var i = 0; i < this.tail.length; i++){
            var pos = this.tail[i];
            let d = dist(this.x, this.y, pos.x, pos.y);
            if(d < 1){
                this.total = 0;
                this.tail = [];
                gameOver = true;
                // Let the user confirm whether or not they want to reload
                const reloadPage = confirm("Game Over. Reload?")
                if (reloadPage) {
                    window.location.reload();
                }
            }
        }
    }
}
