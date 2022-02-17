
//Snack
class Snake {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.blockSize = SQUARE_SIZE;
        this.blocks =[];
        this.addBlock(this.x, this.y);
        this.alive = true;
    }

    addBlock(x,y){
        const block = new Block(x, y, this.blockSize);
        this.blocks.push(block);
    }

    moveHead(){
        const head = this.blocks[0];
        head.oldX = head.x;
        head.oldY = head.y;
        switch (currentDirection) {
            case 'left':
                head.x -= 1;
                break;
            case 'right':
                head.x += 1;
                break;
            case 'up':
                head.y -= 1;
                break;
            case 'down':
                head.y += 1;
                break;
            default:
                break;
        }
    head.teleportInOutOfMap();
    }

    calculateNewBlockPosition(){
        let {x, y} = this.blocks[this.blocks.length -1]; 
        switch (currentDirection) {
            case 'left':
                x += 1;
                break;
            case 'right':
                x -= 1;
                break;
            case 'up':
                y += 1;
                break;
            case 'down':
                y -= 1;
                break;
            default:
                break;
            }

        return {x, y};
    }

    eat(){
        const head = this.blocks[0];
        if (head.x === food.x && head.y === food.y){
            food.setRandomPosition();
            const {x, y} = this.calculateNewBlockPosition(head);
            this.addBlock(x, y);
        }
    }

    blockTouchHead(block){
        const head = this.blocks[0];
        const headX = head.x;
        const headY = head.y;

        return(headX === block.x && headY === block.y);
    
    }
    update(){
        this.moveHead();
        this.eat();
        for (const [index, block] of this.blocks.entries()) {
            if(index > 0) {
              const {oldX, oldY} = this.blocks[index - 1];
              block.setPosition(oldX, oldY);
              if(this.blockTouchHead(block)) {
                    this.alive = false;
                }   
            }
            
            block.draw();
        }
    }
}

//Block
class Block {
    constructor(x, y, size){
    this.x = x;
    this.y = y;
    this.oldX = x;
    this.oldY = y;
    this.size = size;
    }
    teleportInOutOfMap(){
        const maxSize = GAME_SIZE / this.size
        if(this.x < 0){
            this.x = maxSize;
        } else if(this.x > maxSize){
            this.x = 0;
        }
        if(this.y < 0){
            this.y = maxSize;
        }else if (this.y > maxSize){
            this.y = 0;
        }
    }

    setPosition(x, y){
        this.oldX = this.x;
        this.oldY = this.y;
        this.x = x;
        this.y = y;
    }

    draw(){
        ctx.fillStyle = 'red'; 
        ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size)
    }
}

//Food
class Food{
    constructor(){
        this.size = SQUARE_SIZE;
        this.setRandomPosition();
    }

    setRandomPosition(){
        const maxSite = ((GAME_SIZE / this.size) -1);
        this.x = Math.round(Math.random() * GAME_SIZE % maxSite);
        this.y = Math.round(Math.random() * GAME_SIZE % maxSite);
    }
     
    draw(){
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size );
    }
}

//GAME
const GAME_SIZE = 600;
const SQUARE_SIZE = 20;
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');


const snake = new Snake(SQUARE_SIZE);
const food = new Food();
let currentDirection = 'right';

function deteckKetPressed(){
    document.addEventListener('keydown', function(event){
        switch (event.key) {
            case 'ArrowLeft':
                currentDirection = 'left';
                break;
            case 'ArrowRight':
                currentDirection = 'right';
                break;
            case 'ArrowUp':
                currentDirection = 'up';
                break;
            case 'ArrowDown':
                currentDirection = 'down'; 
                break;
            default:
                break;
        }
    });
}
function clearScreen(){
    ctx.clearRect(0, 0, GAME_SIZE, GAME_SIZE);
}

function update(){
    clearScreen();
    food.draw();
    snake.update();
    if(snake.alive){
    setTimeout(update, 150);
    }
}

function start (){
    deteckKetPressed()
    update();
}

start(); 

