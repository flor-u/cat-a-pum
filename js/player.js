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
        this.posYTop= gameHeight/2;
        this.vy = 12;
        this.gravity = 0.05;
        this.gameWidth = gameWidth;
    
        this.frames = 4;
        this.framesIndex = 0;
    
        this.keys = keys;
        this.furBalls = [];
        this.setListeners()
      }

      draw(framesCounter){
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
            this.clearFurBalls()
            this.furBalls.forEach(ball => ball.draw())
            this.animate(framesCounter)
        }
      move(){
        if(this.posY <= this.posY0) {
            this.posY += this.vy;
            this.vy += this.gravity;
          } else {
            this.vy = 1;
            this.posY = this.posY0;
          }
          this.furBalls.forEach(ball => ball.move())
        }
      

      animate(framesCounter) {
        if(framesCounter % 30 === 0) {
          this.framesIndex++;
    
          if(this.framesIndex > 3) this.framesIndex = 0;
        }
      }
    
      setListeners() {
        document.addEventListener('keydown', (e) => {
          switch(e.keyCode) {
            case this.keys.TOP_KEY:
              if(this.posY >= this.posYTop) {
              this.posY -= this.vy;
                this.vy -= 7;
              }
              break;
                case this.keys.SPACE:
                  this.spit()
                  
          }
        })
      }
    
      spit() {
        this.furBalls.push(new FurBall(this.ctx, 35, 35, this.posX, this.posY, this.width, this.height, this.posY0))
      }
    
      clearFurBalls() {
        this.furBalls = this.furBalls.filter(ball => ball.posX <= this.gameWidth)
      }
    }