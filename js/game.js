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
    touches:0,

    init() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.start();
    },

    start() {
        this.reset();
        this.interval = setInterval(() => {
            this.framesCounter++;

            this.clear();
            this.drawAll();
            this.moveAll();

            this.clearObstacles()
            this.clearPrizes();
            this.clearEnemy();

            if (this.score < 0 && this.framesCounter % 600 === 0) this.generateObstacles();
            if (this.framesCounter % 280 === 0) this.generatePrizes();
            if (this.score > 5 && this.framesCounter % 700 === 0) this.generateEnemy();

            if (this.isEating()) {
                this.prizes.shift();
                this.score++;
            };
            if (this.isPoop()) {
                this.poops.shift();
                this.score -= 10;
            };
            if (this.score < 0 || this.isEnemy()) this.gameOver();
            if (this.compare()) {
                this.player.furBalls.shift();
                this.touches++;
                
                if (this.touches === 5){
                
                this.enemy.shift();
                this.touches = 0;
                }
            }

            if (this.framesCounter > 1000) this.framesCounter = 0;
        })
    },

    reset() {
        this.background = new Background(this.ctx, this.width, this.height);
        this.player = new Player(this.ctx, 200, 200, 'img/black-cat-sprite.png', this.width, this.height, this.playerKeys);
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

    generateObstacles() {
        this.poops.push(new Obstacle(this.ctx, 50, 50, 'img/shit.png', this.width, this.height))
    },

    clearObstacles() {
        this.poops = this.poops.filter(obstacle => (obstacle.posX >= 0))
    },

    isPoop() {
        return this.poops.some(obs => (this.player.posX + this.player.width > obs.posX && obs.posX + obs.width > this.player.posX && this.player.posY + this.player.height > obs.posY && obs.posY + obs.height > this.player.posY))
    },

    generatePrizes() {
        this.prizes.push(new Prize(this.ctx, 50, 50, this.width, this.height))
    },

    clearPrizes() {
        this.prizes = this.prizes.filter(prize => (prize.posX >= 0))
    },


    isEating() {
        return this.prizes.some(obs => (this.player.posX + this.player.width > obs.posX && obs.posX + obs.width > this.player.posX && this.player.posY + this.player.height > obs.posY && obs.posY + obs.height > this.player.posY))
    },

    generateEnemy() {
        this.enemy.push(new Obstacle(this.ctx, 200, 200, 'img/ugly-dog.png',this.width, this.height))
    },

    clearEnemy() {
        this.enemy = this.enemy.filter(dog => (dog.posX >= 0))
    },


    isEnemy() {
        return this.enemy.some(obs => (this.player.posX + this.player.width > obs.posX && obs.posX + obs.width > this.player.posX && this.player.posY + this.player.height > obs.posY && obs.posY + obs.height > this.player.posY))
    },
    gameOver() {
        clearInterval(this.interval)
    },
    compare() {
        return this.player.furBalls.some(obs => (this.enemy[0].posX + this.enemy[0].width > obs.posX && obs.posX + obs.width > this.enemy[0].posX && this.enemy[0].posY + this.enemy[0].height > obs.posY && obs.posY + obs.height > this.enemy[0].posY))
       
    }









}