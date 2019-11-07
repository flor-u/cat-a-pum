class Background {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        this.image = new Image();
        this.image.src = 'img/purple-room.png';

       this.secondImage = new Image();
       this.secondImage.src='img/teal-room.png';

        this.posX = 0;
        this.posY = 0;

        this.vx = 6;
    }

    draw() {
        if (Game.level === 0){
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
        this.ctx.drawImage(this.image, this.posX + this.width, this.posY, this.width, this.height);
    } else {
        this.ctx.drawImage(this.secondImage, this.posX, this.posY, this.width, this.height);
        this.ctx.drawImage(this.secondImage, this.posX + this.width, this.posY, this.width, this.height);
    }
    }

    move() {
        this.posX -= this.vx;

        if (this.posX <= -this.width) this.posX = 0;
    }
}