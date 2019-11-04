class Player {
    constructor(ctx, width, height, image, gameWidth, gameHeight, keys) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
    
        this.image = new Image();
        this.image.src = image;
    
        this.posX = 60;
        this.posY = gameHeight * .9- this.height ;
        this.posY0 = gameHeight * .9 - this.height ;
        this.vy = 10;
        this.gravity = 0.1;
        this.gameWidth = gameWidth;
    
        this.frames = 1;
        this.framesIndex = 0;
    
        this.keys = keys;
        // this.bullets = [];
        this.setListeners()
      }

      draw(){
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
            // console.log(this.bullets.length)
            // this.clearBullets()
            // this.bullets.forEach(bullet => bullet.draw())
            // this.animate(framesCounter)
        }
      move(){
        if(this.posY <= this.posY0) {
            this.posY += this.vy;
            this.vy += this.gravity;
          } else {
            this.vy = 1;
            this.posY = this.posY0;
          }
        //   this.bullets.forEach(bullet => bullet.move())
        // }
      }

    //   animate(framesCounter) {
    //     if(framesCounter % 10 === 0) {
    //       this.framesIndex++;
    
    //       if(this.framesIndex > 2) this.framesIndex = 0;
    //     }
    //   }
    
      setListeners() {
        document.addEventListener('keydown', (e) => {
          switch(e.keyCode) {
            case this.keys.TOP_KEY:
              // if(this.posY >= this.posY0) {
                this.posY -= this.vy;
                this.vy -= 7;
              //  }
              break;
                // case this.keys.SPACE:
                //   this.shoot()
          }
        })
      }
    
    //   shoot() {
    //     this.bullets.push(new Bullet(this.ctx, 10, this.posX, this.posY, this.width, this.height, this.posY0))
    //   }
    
    //   clearBullets() {
    //     this.bullets = this.bullets.filter(bullet => bullet.posX <= this.gameWidth)
    //   }
    //}
}