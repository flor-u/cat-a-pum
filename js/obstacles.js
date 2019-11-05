class Obstacle {
    constructor(ctx, width, height, gameWidth, gameHeight) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        this.posX = gameWidth;
        this.posY = gameHeight * .9 - this.height;

        this.image = new Image();
        this.image.src = 'img/shit.png';

        this.vx = 2;
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
      }
    
      move() {
        this.posX -= this.vx;
      }
}