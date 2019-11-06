const startCanvas = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    image: new Image(),
    fps: 60,
    playerKeys: {
        TOP_KEY: 38,
        SPACE: 32
    },

    init() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.draw();

        this.image.src='img/start.png';

        // this.start();
    },

    draw(){
        this.ctx.drawImage(this.image,0,0,this.width, this.height);
    }
}