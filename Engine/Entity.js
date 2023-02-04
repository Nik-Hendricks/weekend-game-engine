import Sprite from '/Engine/Sprite.js'

class Entity{
    constructor(props){
        this.uuid = (typeof props.uuid !== 'undefined') ? props.uuid : Math.random();
        this.sprite = (typeof props.sprite !== 'undefined') ? props.sprite : [['wht']];
        this.phys_obj = (typeof props.phys_obj !== 'undefined') ? props.phys_obj : null;
        this.ttl = (typeof props.ttl !== 'undefined') ? props.ttl : null;
        this.rotation = (typeof props.rotation !== 'undefined') ? props.rotation : 0;
        this.hasAI = (typeof props.hasAI !== 'undefined') ? props.hasAI : false;
        this.ai_type = (typeof props.ai_type !== 'undefined') ? props.ai_type : false; 
        this.original_sprite = props.sprite;
        this.initial_position = props.position
        this._position = props.position
        this.pixel_size = 0;
    }

    get direction_vec(){
        return this.direction_vec;
    }

    get accel_vec(){
        return this.accel_vec;
    }

    set accel_vec(vec){
        this.accel_vec = vec;
    }

    get position(){
        return [this._position[0] * this.pixel_size, this._position[1] * this.pixel_size];
    }

    set position(value){
        this._position = value;
    }

    _get_size_x(){
        return this.sprite.data[0].length * this.pixel_size;
    }

    _get_midpoint(){
        return [this.position[0] + this._get_size_x() / 2, this.position[1] + this._get_size_y() / 2]
    }

    _get_size_y(){
        return this.sprite.data.length * this.pixel_size;
    }

    update(Engine, deltaTime){
        if(this.hasAI){
            Engine.AI.update(this, deltaTime);
        }
    }

    render(Engine){
        if(this.pixel_size !== Engine.rasterizer.pixel_size){
            this.recache_image(Engine)
            this.pixel_size = Engine.rasterizer.pixel_size
        }
    }

    
    rotate(deg){
        if(this.rotation > 360){
            this.rotation = 0;
        }else if(this.rotation < 0){
            this.rotation = 360
        }else{
            this.rotation = deg;
        }
    }

    recache_image(engine){
        engine.rasterizer.cache_img(this);
    }

    destroy(){

    }
}

export default Entity;