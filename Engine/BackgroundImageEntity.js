import Entity from '/Engine/Entity.js';
import Rasterizer from '/Engine/Rasterizer.js';

export default class BackgroundImageEntity extends Entity{
    constructor(Engine){
        super({Engine: Engine, position:[0,0]});
        this.Engine = Engine
        this.image = new Rasterizer({pixel_size: 2}).create_img(this.Engine.sprites['Stars'].data)
    }

    draw(pos){
        let pattern = this.Engine.ctx.createPattern(this.image, 'repeat');
        this.Engine.ctx.save();
        this.Engine.ctx.fillStyle = pattern;
        this.Engine.ctx.fillRect(0, 0, this.Engine.canvas.width, this.Engine.canvas.height);
        this.Engine.ctx.restore();       
    }
}