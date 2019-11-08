class Dog {
    constructor(ctx, width, height, image, gameWidth, gameHeight) {
      this.ctx = ctx;
      this.width = width;
      this.height = height;
  
      this.image = new Image();
      this.image.src = image;
  
      this.posX = 60;
      this.posY = gameHeight * .9 - this.height;
      this.posYTop = gameHeight / 2;
      this.vy = 1;
      this.gameWidth = gameWidth;
  
      this.frames = 4;
      this.framesIndex = 0;
    }
  
    draw(framesCounter) {
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
      // console.log(this.furBalls.length)
      
      this.animate(framesCounter)
    }
    move() {
      if (this.posY <= this.posY0) {
        this.posY += this.vy;
        this.vy += this.gravity;
      } else {
        this.vy = 1;
        this.posY = this.posY0;
      }
      
    }
  
  
    animate(framesCounter) {
      if (framesCounter % 10 === 0) {
        this.framesIndex++;
  
        if (this.framesIndex > 3) this.framesIndex = 0;
      }
    }
  
  }