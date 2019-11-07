const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    framesCounter: 0,
    playerKeys: {
        TOP_KEY: 38,
        SPACE: 32
    },
    score: 0,
    touches: 0,
    level: 0,

    init() {
        document.querySelector('.game-intro').style.display = "none";
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = 960;
        this.height = 540;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.background = new Background(this.ctx, this.width, this.height);
        this.player = new Player(this.ctx, 100, 100, 'img/black-cat-sprite.png', this.width, this.height, this.playerKeys);

        this.start();
    },

    start() {
        this.reset();
        this.interval = setInterval(() => {
            this.framesCounter++;
            this.clear();
            this.drawAll();
            this.moveAll();
            this.clearAll();
            if (this.score < 0 || this.isEnemy())

                this.gameOver();
            // level 0
            if (this.level === 0) {
                if (this.framesCounter % 280 === 0) this.generatePrizes();

                if (this.framesCounter % 200 === 0) this.generateObstacles();

                if (this.isEating()) {
                    this.prizes.shift();
                    this.score++;
                };

                if (this.isPoop()) {
                    this.poops.shift();
                    this.score -= 10;
                };

                if (this.score === 2) {
                    this.nextLevel();
                }
            }

            //level 1
            if (this.level === 1) {

                if (this.framesCounter % 260 === 0) this.generatePrizes();

                if (this.framesCounter % 500 === 0) this.generateEnemy();

                if (this.isEating()) {
                    this.prizes.shift();
                    this.score++;
                };

                if (this.enemy.length > 0) {
                    if (this.isHitting()) {
                        this.player.furBalls.shift();
                        this.touches++;
                        //this.score -= 5;

                        if (this.touches === 5) {
                            this.enemy.shift();
                            this.touches = 0;
                        }
                    }
                }
                // if (this.score === 10) //function to call you won!
            }

            if (this.framesCounter > 1000) this.framesCounter = 0;


        }, 1000 / this.fps)
    },

    reset() {
        this.poops = [];
        this.prizes = [];
        this.enemy = [];
        ScoreBoard.init(this.ctx, this.score)
    },

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    },

    drawAll() {
        this.background.draw();
        this.player.draw(this.framesCounter);
        this.poops.forEach(obstacle => obstacle.draw());
        this.prizes.forEach(prize => prize.draw());
        this.enemy.forEach(dog => dog.draw())
        ScoreBoard.draw(this.score)
    },

    moveAll() {
        this.background.move();
        this.player.move();
        this.poops.forEach(obstacle => obstacle.move());
        this.prizes.forEach(prize => prize.move());
        this.enemy.forEach(dog => dog.move());
    },

    clearAll() {
        this.poops = this.poops.filter(obstacle => (obstacle.posX >= 0));
        this.prizes = this.prizes.filter(prize => (prize.posX >= 0));
        this.enemy = this.enemy.filter(dog => (dog.posX >= 0))
    },

    generateObstacles() {
        this.poops.push(new Obstacle(this.ctx, 35, 35, 'img/shit.png', this.width, this.height))
    },

    isPoop() {
        return this.poops.some(obs => (this.player.posX + this.player.width - 35 > obs.posX && obs.posX + obs.width > this.player.posX - 35 && this.player.posY + this.player.height > obs.posY && obs.posY + obs.height > this.player.posY - 100))
    },

    generatePrizes() {
        this.prizes.push(new Prize(this.ctx, 35, 35, this.width, this.height))
    },

    isEating() {
        return this.prizes.some(obs => (this.player.posX + this.player.width - 50 > obs.posX && obs.posX + obs.width > this.player.posX - 80 && this.player.posY - 50 + this.player.height - 50 > obs.posY && obs.posY + obs.height > this.player.posY - 50))
    },

    generateEnemy() {
        this.enemy.push(new Obstacle(this.ctx, 100, 100, 'img/ugly-dog.png', this.width, this.height))
    },

    isEnemy() {
        return this.enemy.some(obs => (this.player.posX + this.player.width - 10 > obs.posX && obs.posX + obs.width > this.player.posX && this.player.posY + this.player.height > obs.posY && obs.posY + obs.height > this.player.posY - 80))
    },

    isHitting() {
        return this.player.furBalls.some(obs => (this.enemy[0].posX + this.enemy[0].width > obs.posX && obs.posX + obs.width > this.enemy[0].posX && this.enemy[0].posY + this.enemy[0].height > obs.posY && obs.posY + obs.height > this.enemy[0].posY))
    },

    nextLevel() {
        clearInterval(this.interval);
        this.ctx.fillStyle = "#FF5682";
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = '#1E69FF'
        this.ctx.font = '60px VT323'
        this.ctx.fillText(`Level Up!`, 150, 230)
        // this.ctx.shadowColor = '#FF5682'
        // this.ctx.shadowOffsetX = -5;
        // this.ctx.shadowOffsetY = 5;
        this.level++;
        

        setTimeout(() => {
            
            this.start();
        }, 2000);

    },
    gameOver() {
       clearInterval(this.interval);
       this.animationCounter=0;
       this.animationInterval = setInterval(()=>{
           this.animationCounter++;
       
        this.level = 0;
        this.score = 0;

        this.ctx.fillStyle = "#1E69FF";
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.gameOverAnimation = new DeadCat(this.ctx, 200, 200, this.width, this.height);
        this.gameOverAnimation.draw(this.animationCounter);


        this.ctx.fillStyle = '#FCEE21'
        this.ctx.font = '100px VT323'
        this.ctx.fillText(`GAME OVER`, 150, 230)
        this.ctx.shadowColor = '#FF5682'
        this.ctx.shadowOffsetX = -5;
        this.ctx.shadowOffsetY = 5;
        
    }, 1000/60)

    setTimeout(() => {
            
    clearInterval(this.animationInterval);
    }, 2000);
console.log(this.animationInterval);
    },









}