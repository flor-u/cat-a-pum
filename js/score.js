const ScoreBoard = {
    ctx: undefined,
    score: undefined,

    init(ctx, score) {
        this.ctx = ctx;
        this.score = score;
    },

    draw(score) {
        this.ctx.fillStyle = "pink";
        this.ctx.fillRect(20, 10, 200, 60);
        this.ctx.fillStyle = 'black'
        this.ctx.font = '40px VT323'
        this.ctx.fillText(`Treats: ${score}`, 50, 50)
    }
}