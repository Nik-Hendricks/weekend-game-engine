import Sprite from '/Engine/Sprite.js'
import Vec2 from '/Engine/Vec2.js'

class Entity{
    constructor(props){
        this.props = props;
        this.uuid = (typeof props.uuid !== 'undefined') ? props.uuid : Math.random();
        this.sprite = (typeof props.sprite !== 'undefined') ? props.sprite : [['wht']];
        this.phys_obj = (typeof props.phys_obj !== 'undefined') ? props.phys_obj : null;
        this.ttl = (typeof props.ttl !== 'undefined') ? props.ttl : null;
        this.rotation = (typeof props.rotation !== 'undefined') ? props.rotation : 0;
        this.hasAI = (typeof props.hasAI !== 'undefined') ? props.hasAI : false;
        this.ai_type = (typeof props.ai_type !== 'undefined') ? props.ai_type : false; 
        this.original_sprite = props.sprite;
        this.position = new Vec2(props.position)
        this.pixel_size = (typeof props.pixel_size !== 'undefined') ? props.pixel_size : 0;
        this.clone_count = 0;
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

    get render_position(){
        return new Vec2(this.position.x * this.pixel_size, this.position.y * this.pixel_size)
    }


    _get_render_midpoint(){
        return new Vec2(this.render_position.x + this._get_render_size().x / 2, this.render_position.y + this._get_render_size().y / 2)
    }

    _get_render_size(){
        return new Vec2(this.sprite.data[0].length * this.pixel_size, this.sprite.data.length * this.pixel_size)
    }

    _get_sprite_midpoint(){
        return new Vec2(this._get_size().x / 2, this._get_size().y / 2)
    }

    _get_sprite_render_midpoint(){
        return new Vec2(this._get_render_size().x / 2, this._get_render_size().y / 2)
    }

    _get_midpoint(){
        return new Vec2(this.position.x + this._get_size().x / 2, this.position.y + this._get_size().y / 2)
    }

    _get_size(){
        return new Vec2 (this.sprite.data[0].length, this.sprite.data.length)
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

    clone(){
        var p = this.props
        p.uuid = `${this.uuid}_clone${this.clone_count}`
        this.clone_count++
        return new Entity(this.props);
    }
}

export default Entity;