class GameLoop {
    constructor() {
        this.lastFrameTime = Date.now();
    }

    start(logic, render) {
        this.logic = logic
        this.render = render
        this.update();
    }

    update() {
        // calculate delta time
        this.currentFrame = this.get_delta_time();


        this.logic(this);
        this.render(this);
        // schedule next frame
        window.requestAnimationFrame(this.update.bind(this));
    }

    get_delta_time(){
        let currentTime = Date.now();
        let deltaTime = (currentTime - this.lastFrameTime) / 1000;
        this.lastFrameTime = currentTime;
        return deltaTime;
    }
}

export default GameLoop;