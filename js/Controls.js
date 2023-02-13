import PlayerControls from '/Engine/PlayerControls.js'
import Vec2 from '/Engine/Vec2.js';

export default class Controls{
    constructor(){
        this.Controls = new PlayerControls()
        this.movement_type = 'ship'
    }

    get input(){
        return this.Controls.input_data
    }

    update(Engine, deltaTime){
        var input = this.input
        var player = Engine.control_entity

        if(this.movement_type == 'ship'){
            if(input.d){
                Engine.control_entity.phys_obj.rotate(player.rotation + 5)
                player.rotate(player.rotation + 5)
            }
            if(input.a){
                player.phys_obj.rotate(player.rotation - 5)
                player.rotate(player.rotation - 5)
            }
            if(input.w){
                player.phys_obj.acceleration.y += player.phys_obj.direction_vec.y * 100;
                player.phys_obj.acceleration.x += player.phys_obj.direction_vec.x * 100;
            }
            if(input.s){
                player.phys_obj.acceleration.y -= player.phys_obj.direction_vec.y * 100;
                player.phys_obj.acceleration.x -= player.phys_obj.direction_vec.x * 100;
            }
        }
    
        if(this.movement_type == 'player'){
            if(input.d){
                player.phys_obj.acceleration.y -= player.phys_obj.direction_vec.x * 50;
                player.phys_obj.acceleration.x -= player.phys_obj.direction_vec.y * 50;
            }
            if(input.a){
                player.phys_obj.acceleration.y += player.phys_obj.direction_vec.x * 50;
                player.phys_obj.acceleration.x += player.phys_obj.direction_vec.y * 50;
            }
    
            if(input.w){
                player.phys_obj.acceleration.y += player.phys_obj.direction_vec.y * 50;
                player.phys_obj.acceleration.x += player.phys_obj.direction_vec.x * 50;
            }
            if(input.s){
                player.phys_obj.acceleration.y -= player.phys_obj.direction_vec.y * 50;
                player.phys_obj.acceleration.x -= player.phys_obj.direction_vec.x * 50;
            }
        }
    
    
        if(input.i){
            //inventory.toggle();
        
        }
        if(input.r){
            player.position = new Vec2(0, 0);
            player.phys_obj.acceleration = new Vec2(0, 0);
        }
        if(input.o){
            new AsteroidGenerator(Engine, 150)
        }
        if(input.shift){
            var accel = player.phys_obj.acceleration;
                                
            if(accel.x < 0){
                accel.x += 200
            }else{
                accel.x -= 200
            }
        
      
            if(accel.y < 0){
                accel.y += 200
            }else{
                accel.y -= 200
            }
        }
    

    
        if(input.mousedown == true){
            //var entity = hovered[0][1]
            //enter_ship(entity);
            //console.log(input.mouse)
    
        }

    
        if(input.scroll >= 20){
            if(Engine.follow_entity.hasInteriorSprite){
                Engine.follow_entity.interiorView = true
                //edit_controls.open();
            }
        }else{
            //edit_controls.close();
            Engine.follow_entity.interiorView = false
        }
    
        this.Controls.input_data.old_scroll = input.scroll;
        Engine.rasterizer.pixel_size = (input.scroll > 0) ?  input.scroll : 1;
    }

}