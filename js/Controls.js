import PlayerControls from '/Engine/PlayerControls.js'
import Vec2 from '/Engine/Vec2.js';
import {ButtonElement} from '/Engine/GUI/GUI.js'

export default class Controls{
    constructor(){
        this.Controls = new PlayerControls()
        this.movement_type = 'ship'
    }

    get input(){
        return this.Controls.input_data
    }

    update(Game, Engine, deltaTime){
        this.hovered = Object.entries(Engine.get_entitites_from_range(new Vec2(Engine.screenToGame(this.input.mouse)), new Vec2(Engine.screenToGame(this.input.mouse))))
        var input = this.input
        var player = Engine.control_entity

        if(this.movement_type == 'ship'){
            if(input.d){
                if(player.phys_obj.rotation_velocity < 5){
                    player.phys_obj.rotation_velocity += .5;
                }
            }
            if(input.a){
                if(player.phys_obj.rotation_velocity > -5){
                    player.phys_obj.rotation_velocity -= .5;
                }
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
        if(input.c){
            var shake = Engine.camera.enableShake;
            if(shake){
                Engine.camera.enableShake = false;
            }else{
                Engine.camera.enableShake = true;
            }
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

            if(player.phys_obj.rotation_velocity > 0){
                player.phys_obj.rotation_velocity -= .5
            }
        }
    
 
        
        
        Game.updateRadar(this.hovered);




        if(input.rightClick){                                             
            var entity;
            if (this.hovered.length !== 0){
                entity = this.hovered[0][1];
                if(Game.ContextMenuManager.context_entity == null){
                    Game.ContextMenuManager.context_entity = entity;
                }
                Game.ContextMenuManager.open(entity.position, entity)
            }
            //Game.updateContextMenu();
        }else{
            Game.ContextMenuManager.close();
        }
        if(input.leftClick){
            Game.ContextMenuManager.close();
            input.rightClick = false;
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