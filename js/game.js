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
            if (this.framesCounter % 420 === 0) this.generateObstacles();
            if(this.framesCounter % 280 === 0) this.generatePrizes();
            if(this.isCollision()) this.gameOver()
            if (this.framesCounter > 1000) this.framesCounter = 0;
        })
    },

    reset() {
        this.background = new Background(this.ctx, this.width, this.height);
        this.player = new Player(this.ctx, 150, 150, 'img/cat2.png', this.width, this.height, this.playerKeys);
        this.obstacles = [];
        this.prizes = [];
    },

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    },

    drawAll() {
        this.background.draw();
        this.player.draw();
        this.obstacles.forEach(obstacle => obstacle.draw());
        this.prizes.forEach(prize => prize.draw());
    },

    moveAll() {
        this.background.move();
        this.player.move();
        this.obstacles.forEach(obstacle => obstacle.move());
        this.prizes.forEach(prize => prize.move());
    },

    generateObstacles() {
        this.obstacles.push(new Obstacle(this.ctx, 50, 50, this.width, this.height))
    },

    clearObstacles() {
        this.obstacles = this.obstacles.filter(obstacle => (obstacle.posX >= 0))
    },


    generatePrizes() {
        this.prizes.push(new Prize(this.ctx, 50, 50, this.width, this.height))
    },

    clearPrizes() {
        this.prizes = this.prizes.filter(prize => (prize.posX >= 0))
    },

    isCollision() {
        // colisiones genéricas
        // (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
        return this.obstacles.some(obs => (this.player.posX + this.player.width > obs.posX && obs.posX + obs.width > this.player.posX && this.player.posY + this.player.height > obs.posY && obs.posY + obs.height > this.player.posY ))
      },

      gameOver (){
        clearInterval(this.interval)
      }







}