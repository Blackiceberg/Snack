
//Snack
class Snake {
    constructor(size){
        this.x = 0;
        this.y = 0;
        this.blockSize = size;
        this.blocks =[];
        this.addBlock(this.x, this.y);
        console.log(this.blocks); 
    }

    addBlock(x,y){
        const block = new Block(x, y, this.blockSize);
        this.blocks.push(block);
    }

    moveHead(){
        const head = this.blocks[0];
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

    update(){
        for(const block of this.blocks){
            block.draw();
        }
        this.moveHead();
    }
}

//Block
class Block {
    constructor(x, y, size){
    this.x = x;
    this.y = y;
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

    draw(){
        ctx.fillStyle = 'red'; 
        ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size)
    }
}

//GAME
const GAME_SIZE = 600;
const SQUARE_SIZE = 20;
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');


const snake = new Snake(SQUARE_SIZE);
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
    snake.update();
    setTimeout(update, 150);
}

function start (){
    deteckKetPressed()
    update();
}

start(); 

