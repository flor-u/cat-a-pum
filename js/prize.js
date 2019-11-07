class Prize {
  constructor(ctx, width, height, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.posX = gameWidth;
    this.posY = Math.floor(Math.random() * (gameHeight - (gameHeight * .7) + 1) + gameHeight / 2.2);

    this.image = new Image();
    this.image.src = 'img/prize3.png';

    this.vx = 7;
  }

  draw() {
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
  }

  move() {
    this.posX -= this.vx;
  }
}