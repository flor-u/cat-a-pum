class FurBall {
    constructor(ctx, width, height, playerX, playerY, playerWidth, playerHeight, floor) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        this.posX = playerX + playerWidth;
        this.posY = playerY + playerHeight / 2;
        this.playerHeight = playerHeight;
        this.floor = floor;

        this.image = new Image();
        this.image.src = 'img/prize3.png';

        this.vx = 7;
        this.vy = 1;
        this.gravity = 1;
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }

    move() {
        this.posX += this.vx;
        this.posY += this.vy;
        this.vy += this.gravity;

        //Accelerate > 1 &&  Decelerate < 1
        if (this.posY >= this.floor + this.playerHeight) this.vy *= -1
    }

}