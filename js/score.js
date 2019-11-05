const ScoreBoard = {
    ctx: undefined,
    score:undefined,
  
    init(ctx, score) {
      this.ctx = ctx;
      this.score = score;
    },
  
    draw(score) {
      this.ctx.fillStyle = 'black'
      this.ctx.font = '40px sans-serif'
      this.ctx.fillText(score, 50, 50)
    }
  }