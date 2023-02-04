import Cosmos from '/Engine/Cosmos.js'
import {GUI, GUIElement, WindowElement} from '/Engine/GUI/GUI.js'
import Text from '/Engine/GUI/Text.js'
import Entity from '/Engine/Entity.js'
import Sprite from '/Engine/Sprite.js';
import {PhysicalObject} from '/Engine/Physics.js'
import PlayerControls from '/Engine/PlayerControls.js'
import {ship, ship2, enemy, space_station, alien_crawfish, alien_dragonfly, gold, colorSet} from '/js/GameSprites.js'
import AsteroidGenerator from '/js/asteroid.js'
import Line from '/Engine/Line.js';
import BackgroundImageEntity from '/Engine/BackgroundImageEntity.js'

import Ship from '/js/Ship.js';

var GameSprites = [
    {
        name:'Ship3',
        src:'/images/Ship3.png'
    },
    {
        name:'Ship4',
        src:'/images/Ship4.png'
    },
    {
        name:'Ship5',
        src:'/images/Ship5.png'
    },
    {
        name:'DolphinShip',
        src:'/images/DolphinShip.png'
    },
    {
        name:'Asteroid1',
        src:'/images/Asteroid1.png'
    },
    {
        name:'DolphinianCruiser1',
        src:'/images/DolphinianCruiser1.png'
    },
    {
        name:'DolphinianDestroyer1',
        src:'/images/DolphinianDestroyer1.png'
    },
    {
        name:'DolphinianPod1',
        src:'/images/DolphinianPod1.png'
    },
    {
        name:'DolphinianProwler1',
        src:'/images/DolphinianProwler1.png'
    },
    {
        name:'ThuulePredatorB',
        src:'/images/ThuulePredatorB.png'
    },
    {
        name:'ThuulePredatorG',
        src:'/images/ThuulePredatorG.png'
    },
    {
        name:'ThuulePredatorP',
        src:'/images/ThuulePredatorP.png'
    },
    {
        name:'ThuuleSpawnB',
        src:'/images/ThuuleSpawnB.png'
    },
    {
        name:'ThuuleSpawnG',
        src:'/images/ThuuleSpawnG.png'
    },
    {
        name:'ThuuleSpawnP',
        src:'/images/ThuuleSpawnP.png'
    },
    {
        name:'ProfoundDreadnaught',
        src:'/images/ProfoundDreadnaught.png'
    },
    {
        name:'Stars',
        src:'/images/Stars.png',
    },
    {
        name:'HumanDreadNaught',
        src:'/images/HumanDreadNaught.png',
    },
    {
        name:'ship',
        src:'/images/Ship1A.png'
    },
    {
        name:'ship2',
        data:ship2,
    },
]


var GameObjects = [
    {
        name : 'ship',
        sprite: 'ship',
        position: [10, 15],
        phys_obj: {},
    },
    {
        name : 'rob',
        sprite: 'Ship3',
        position: [50, 50],
        phys_obj: {},
    },
    {
        name : 'other_rob',
        sprite: 'Ship4',
        position: [90, 100],
        phys_obj: {},
    },
    {
        name : 'other_other_rob',
        sprite: 'Ship5',
        position: [50, 100],
        phys_obj: {},
    },
    {
        name : 'dolphin_ship',
        sprite: 'DolphinShip',
        position: [-50, 100],
        phys_obj: {},
    },
    {
        name : 'DolphinianCruiser1',
        sprite: 'DolphinianCruiser1',
        position: [-100, 100],
        phys_obj: {},
    },
    {
        name : 'DolphinianDestroyer1',
        sprite: 'DolphinianDestroyer1',
        position: [-150,100],
        phys_obj: {},
    },
    {
        name : 'DolphinianPod1',
        sprite: 'DolphinianPod1',
        position: [-175, 100],
        phys_obj: {},
    },
    {
        name : 'DolphinianProwler1',
        sprite: 'DolphinianProwler1',
        position: [-210, 100],
        phys_obj: {},
    },
    {
        name : 'ProfoundDreadnaught',
        sprite: 'ProfoundDreadnaught',
        position: [-270, 100],
        phys_obj: {},
    },
    {
        name : 'ThuulePredatorB',
        sprite: 'ThuulePredatorB',
        position: [-300, 100],
        phys_obj: {},
    },
    {
        name : 'ThuulePredatorG',
        sprite: 'ThuulePredatorG',
        position: [-370, 100],
        phys_obj: {},
    },
    {
        name : 'ThuulePredatorP',
        sprite: 'ThuulePredatorP',
        position: [-400, 100],
        phys_obj: {},
    },
    {
        name : 'ThuuleSpawnB',
        sprite: 'ThuuleSpawnB',
        position: [-450, 100],
        phys_obj: {},
    },
    {
        name : 'ThuuleSpawnG',
        sprite: 'ThuuleSpawnG',
        position: [-500, 100],
        phys_obj: {},
    },
    {
        name : 'ThuuleSpawnP',
        sprite: 'ThuuleSpawnP',
        position: [-550, 100],
        phys_obj: {},
    },
    {
        name : 'HumanDreadNaught',
        sprite: 'HumanDreadNaught',
        position: [0, -200],
        phys_obj: {},
    },
]


class Game{
    constructor(){
        this.Engine = new Cosmos();
        this.GUI = new GUI();
        this.Controls = new PlayerControls();
        this.currentSector = [0, 0];
        this.renderedEntities = {};
        this.movement_type = 'ship'
    }

    load(){
        this.Engine.loadImages(GameSprites).then(() => {

            GameObjects.forEach(GameObject => {
                this.Engine.register_entity(GameObject.name, new Entity({
                    sprite: this.Engine.sprites[GameObject.sprite],
                    position: GameObject.position,
                    phys_obj: new PhysicalObject(GameObject.phys_obj),
                }))
            })

            var inventory = new WindowElement({
                uuid:'inventory',
                title:"Start",
                width: 100,
                height:100, 
                position: [40, 10]
            });
            
            var edit_controls = new WindowElement({
                uuid:'edit controls',
                title: 'Material',
                width: 10,
                height: 100,
                position: [2, (this.Engine.rendersize[0] / this.GUI.rasterizer.pixel_size) / 2 + (100 * this.GUI.rasterizer.pixel_size)],
            })
            
            edit_controls.close();
            inventory.close();

            this.GUI.append(inventory)
            this.GUI.append(edit_controls);
            
            this.GUI.append(new GUIElement({uuid:'cursor',position: [100, 100], data: [['0','wht','0'],['wht','wht','wht'],['0','wht','0']], width:3, height:3}))
            this.GUI.append(new GUIElement({uuid:'hud', position: [0,0], data: new Text({text:'test', color:'litepurp'})}))
            this.GUI.append(new GUIElement({uuid:'hud2',position:  [70, 0], data: new Text({text: 'v0.1.8', color: 'purp'})}))
            this.GUI.append(new GUIElement({uuid:'hud3',position:  [150, 0], data: new Text({text: '', color: 'puke'})}))
            
                
            //var p = new Ship(this.Engine, 'Nik', 'ship', [10, 10])
        
        
            this.Engine.follow_entity = this.Engine.entities['other_rob'];
            this.Engine.control_entity = this.Engine.entities['other_rob'];
            this.GUI.elements['hud3'].data = new Text({text:`${this.Engine.rendersize}`, color:'wht'})
            this.background = new BackgroundImageEntity(this.Engine).create();
            this.start()
        })
    }

    start(){  
        this.Engine.start((ev) => {
            //logic
            this.currentSector = [Math.floor(this.Engine.follow_entity._get_midpoint()[0] / (100 * this.Engine.rasterizer.pixel_size)), Math.floor(this.Engine.follow_entity._get_midpoint()[1] / (100 * this.Engine.rasterizer.pixel_size))]
            Object.entries(this.renderedEntities).forEach(e => {
                var entity = e[1]
                entity.update(this.Engine, ev.currentFrame)
                this.Engine.physics.update(this.Engine, entity, ev.currentFrame)
            });
            var e = this.screenToGame(this.Controls.input_data.mouse, this.Engine.follow_entity._get_midpoint(), this.Engine.rendersize);
            this.GUI.elements['hud'].data = new Text({text:`${e}  ${this.currentSector}`, color:'red'})
            this.handleControls()
            this.update_weapons_systems();
        }, () => {
            //render
            this.Engine.clear_screen();
            this.background.draw(this.Engine.follow_entity.position);
            this.GUI.update(this.Engine.ctx, this.Controls)
            this.renderedEntities = this.Engine.camera.update(this.Engine.follow_entity, this.Engine)
        });
    }




    handleControls(deltaTime){
        var input = this.Controls.input_data;
        var player = this.Engine.control_entity
        var _n_mouse = [input.mouse[0] / this.GUI.rasterizer.pixel_size, input.mouse[1] / this.GUI.rasterizer.pixel_size]
        this.GUI.elements['cursor'].position = _n_mouse;
    
        if(this.movement_type == 'ship'){
            if(input.d){
                this.Engine.control_entity.phys_obj.rotate(player.rotation + 5)
                player.rotate(player.rotation + 5)
            }
            if(input.a){
                player.phys_obj.rotate(player.rotation - 5)
                player.rotate(player.rotation - 5)
            }
            if(input.w){
                player.phys_obj.acceleration[1] += player.phys_obj.direction_vec[1] * 50;
                player.phys_obj.acceleration[0] += player.phys_obj.direction_vec[0] * 50;
            }
            if(input.s){
                player.phys_obj.acceleration[1] -= player.phys_obj.direction_vec[1] * 50;
                player.phys_obj.acceleration[0] -= player.phys_obj.direction_vec[0] * 50;
            }
        }
    
        if(this.movement_type == 'player'){
            if(input.d){
                player.phys_obj.acceleration[1] -= player.phys_obj.direction_vec[0] * 50;
                player.phys_obj.acceleration[0] -= player.phys_obj.direction_vec[1] * 50;
            }
            if(input.a){
                player.phys_obj.acceleration[1] += player.phys_obj.direction_vec[0] * 50;
                player.phys_obj.acceleration[0] += player.phys_obj.direction_vec[1] * 50;
            }
    
            if(input.w){
                player.phys_obj.acceleration[1] += player.phys_obj.direction_vec[1] * 50;
                player.phys_obj.acceleration[0] += player.phys_obj.direction_vec[0] * 50;
            }
            if(input.s){
                player.phys_obj.acceleration[1] -= player.phys_obj.direction_vec[1] * 50;
                player.phys_obj.acceleration[0] -= player.phys_obj.direction_vec[0] * 50;
            }
        }
    
    
        if(input.i){
            inventory.toggle();
        }
        if(input.r){
            this.respawn(player);
        }
        if(input.o){
            new AsteroidGenerator(this.Engine, 150)
        }
        if(input.shift){
            var accel = player.phys_obj.acceleration;
                                
            if(accel[0] < 0){
                accel[0] += 50
            }else{
                accel[0] -= 50
            }
        
      
            if(accel[1] < 0){
                accel[1] += 50
            }else{
                accel[1] -= 50
            }
        }
    
        var sx = this.Controls.input_data.mouse[0] - this.Engine.rendersize[0] / 2 + this.Engine.follow_entity.position[0] * this.Engine.rasterizer.pixel_size
        var sy = this.Controls.input_data.mouse[1] - this.Engine.rendersize[1] / 2 + this.Engine.follow_entity.position[1] * this.Engine.rasterizer.pixel_size
    
        
    
        var hovered = Object.entries(this.Engine.get_entitites_from_range(sx, sy, sx - 3, sy - 3));
    
        if(input.mousedown == true){
            //var entity = hovered[0][1]
            //enter_ship(entity);
            //console.log(input.mouse)
    
        }
        if(hovered.length > 0){
    
        }
    
        if(input.scroll >= 20){
            if(this.Engine.follow_entity.hasInteriorSprite){
                this.Engine.follow_entity.interiorView = true
                //edit_controls.open();
            }
        }else{
            //edit_controls.close();
            this.Engine.follow_entity.interiorView = false
        }
    
        this.Controls.input_data.old_scroll = input.scroll;
        this.Engine.rasterizer.pixel_size = (input.scroll > 0) ?  input.scroll : 1;
    }

    screenToGame(screen, player, rendersize) {
        var x = Math.floor((player[0] - (rendersize[0] / 2) + screen[0]) / this.Engine.rasterizer.pixel_size)
        var y = Math.floor((player[1] - (rendersize[1] / 2) + screen[1]) / this.Engine.rasterizer.pixel_size)
        return  [x, y];
    }
    


    update_weapons_systems(){    
    }
    
    respawn(entity){
        entity.position = [0, 0];
        entity.phys_obj.acceleration = [0, 0];
    }
}

new Game().load()