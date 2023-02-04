import Entity from '/Engine/Entity.js'
export default class BackgroundImageEntity extends Entity{
    constructor(Engine){
        super({Engine: Engine, position:[0,0]});
        this.Engine = Engine

    }

    create(){
        //this.image = this.Engine.rasterizer.create_img(this.Engine.sprites['Stars'].data)
        return this;
    }

    draw(pos){
        this.image = this.Engine.rasterizer.create_img(this.Engine.sprites['Stars'].data)
        const backgroundRect = this.image.getBoundingClientRect();
        const canvasRect = this.Engine.canvas.getBoundingClientRect();
        
        const numTilesX = Math.ceil(canvasRect.width / backgroundRect.width) + 1;
        const numTilesY = Math.ceil(canvasRect.height / backgroundRect.height) + 1;
        
        const xOffset = pos[0] % backgroundRect.width;
        const yOffset = pos[1] % backgroundRect.height;
        let pattern = this.Engine.ctx.createPattern(this.image, 'repeat');
        this.Engine.ctx.save();
        this.Engine.ctx.fillStyle = pattern;
        this.Engine.ctx.fillRect(0, 0, this.Engine.canvas.width, this.Engine.canvas.height);
        this.Engine.ctx.restore();       
    }
}