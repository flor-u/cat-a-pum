class DeadCat {
  constructor(ctx, width, height, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.image = new Image();
    this.image.src = 'img/dead-cat-sprite.png';
    this.gameWidth = gameWidth;
    this.gameHeight= gameHeight;
    this.posX = gameWidth/1.7;
    this.posY = gameHeight * .9 - this.height;
    

    this.frames = 5;
    this.framesIndex = 0;

    

  }

  draw(framesCounter) {
    this.animate(framesCounter);
    this.ctx.drawImage(
      this.image,
      this.framesIndex * Math.floor(this.image.width / this.frames),
      0,
      Math.floor(this.image.width / this.frames),
      this.image.height,
      this.posX,
      this.posY,
      this.width,
      this.height
    )
    

  }

  animate(framesCounter) {
    if (framesCounter % 50 === 0) {
      this.framesIndex++;
      if (this.framesIndex > 4) this.framesIndex = 0;
    }
  }

}