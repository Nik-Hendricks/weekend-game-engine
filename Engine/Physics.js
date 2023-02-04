export class Vector{
    
}

export class PhysicalObject{
    constructor(_props){
        var props = (typeof _props !== 'undefined') ? _props : {};
        this.acceleration = (typeof props.acceleration !== 'undefined') ? props.acceleration : [0, 0];
        this.direction_vec = (typeof props.direction_vec !== 'undefined') ? props.direction_vec : [0, -1];
        this.mass = this.mass = (typeof props.mass !== 'undefined') ? props.mass : .02;
        this.input_force = [this.acceleration[0] * this.mass, this.acceleration[1] * this.mass];
        this.velocity = [this.input_force[0] * 0, this.input_force[1] * 0];
        this.physical_shape = [];
    }

    rotate(deg){
        this.direction_vec = [Math.cos((deg - 90) * (Math.PI / 180)), Math.sin((deg - 90)* (Math.PI / 180))]                        
    }


}


export class Physics{
    direction_vec_from_angle(deg){
        return [
            [Math.cos((deg - 90)* (Math.PI / 180)), Math.sin((deg - 90)* (Math.PI / 180))],
            [Math.cos(deg* (Math.PI / 180)), Math.sin(deg * (Math.PI / 180))]
        ]
    }

    _set_state(physical_object){
        physical_object.input_force = [Math.floor(physical_object.acceleration[0] * physical_object.mass), Math.floor(physical_object.acceleration[1] * physical_object.mass)];
    }

    check_collision(Engine, entity){
        return {};
    }

    update(Engine, entity, deltaTime){
        if(entity.phys_obj){
            this._set_state(entity.phys_obj)
            var ix = entity.phys_obj.input_force[0] * deltaTime;
            var iy = entity.phys_obj.input_force[1] * deltaTime;
            ix += entity.position[0] / entity.pixel_size;
            iy += entity.position[1] / entity.pixel_size
            entity.position = [ix, iy]
            this.check_collision(Engine, entity)
        }
    }
}