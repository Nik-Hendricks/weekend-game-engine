import Cosmos from '/Engine/Cosmos.js'
import {GUI, GUIElement, WindowElement} from '/Engine/GUI/GUI.js'
import Text from '/Engine/GUI/Text.js'
import Entity from '/Engine/Entity.js'
import Sprite from '/Engine/Sprite.js';
import {PhysicalObject} from '/Engine/Physics.js'
import Controls from '/js/Controls.js'
import AsteroidGenerator from '/js/asteroid.js'
import Line from '/Engine/Line.js';
import BackgroundImageEntity from '/Engine/BackgroundImageEntity.js'
import Vec2 from '/Engine/Vec2.js';
import Scene from '/Engine/Scene.js';

import {GameObjects, GameSprites} from '/js/Assets.js';
import Ship from '/js/Ship.js';


var gui_elements = [
    {
        uuid:'',
        width:'',
        height:'',
        elements:[],
        
    }
]

var devScene = new Scene(GameSprites, GameObjects)

class Game{
    constructor(){
        this.Engine = new Cosmos();
        this.GUI = new GUI();
        this.Controls = new Controls();
        this.currentSector = [0, 0];
        this.movement_type = 'ship'
    }

    load(){
        devScene.create(this.Engine).then(() => {
            var inventory = new WindowElement({
                uuid:'inventory',
                title:"Start",
                width: 100,
                height:100, 
                position: new Vec2(40, 10)
            });
            
            var edit_controls = new WindowElement({
                uuid:'edit controls',
                title: 'Material',
                width: 10,
                height: 100,
                position: [2, (this.Engine.rendersize.y / this.GUI.rasterizer.pixel_size) / 2 + (100 * this.GUI.rasterizer.pixel_size)],
            })
            


            this.GUI.append(inventory)
            this.GUI.append(edit_controls);
            
            this.GUI.append(new GUIElement({uuid:'cursor',position: [100, 100], data: [['0','wht','0'],['wht','wht','wht'],['0','wht','0']], width:3, height:3}))
            this.GUI.append(new GUIElement({uuid:'hud', position: [0,0], data: new Text({text:'test', color:'litepurp'})}))
            this.GUI.append(new GUIElement({uuid:'hud2',position:  [70, 0], data: new Text({text: 'v0.1.8', color: 'purp'})}))
            this.GUI.append(new GUIElement({uuid:'hud3',position:  [150, 0], data: new Text({text: '', color: 'puke'})}))
            this.GUI.append(new WindowElement({uuid:'inventory', position:[100,100], width:100, height: 200}))
            
            this.Engine.follow_entity = this.Engine.entities['other_rob'];
            this.Engine.control_entity = this.Engine.entities['other_rob'];
            this.GUI.elements['hud3'].data = new Text({text:`${this.Engine.rendersize.x} ${this.Engine.rendersize.y}`, color:'wht'})
            this.background = new BackgroundImageEntity(this.Engine, 5);
            this.Engine.entities['HumanDreadNaught'].sprite.data = this.Engine.entities['HumanDreadNaught'].sprite.CreateOutline(this.Engine.entities['HumanDreadNaught'].sprite.data, 'purp')

            

            this.start()
        })
    }

    start(){  
        this.Engine.start((ev) => {
            //logic
            var input = this.Controls.input
            var _n_mouse = [input.mouse[0] / this.GUI.rasterizer.pixel_size, input.mouse[1] / this.GUI.rasterizer.pixel_size]
            this.GUI.elements['cursor'].position = _n_mouse;

            this.currentSector = [Math.floor(this.Engine.follow_entity._get_midpoint().x / (100 * this.Engine.rasterizer.pixel_size)), Math.floor(this.Engine.follow_entity._get_midpoint().y / (100 * this.Engine.rasterizer.pixel_size))]
            this.updateEntities(ev);
            var e = this.Engine.screenToGame(this.Controls.input.mouse);
            this.GUI.elements['hud'].data = new Text({text:`${e}  ${this.currentSector}`, color:'red'})
            this.update_weapons_systems();
            this.Controls.update(this.Engine);
        }, () => {
            //render
            this.Engine.clear_screen();
            this.background.draw(this.Engine.gameToScreen(this.Engine.follow_entity._get_render_midpoint()));
            this.Engine.renderedEntities = this.Engine.camera.update(this.Engine.follow_entity, this.Engine)
            this.GUI.update(this.Engine.ctx, this.Controls)
            //this.Engine.physics.draw(this.Engine)
        });
    }


    updateEntities(ev){
        Object.entries(this.Engine.renderedEntities).forEach(e => {
            var entity = e[1]
            entity.update(this.Engine, ev.currentFrame)
            this.Engine.physics.update(this.Engine, entity, ev.currentFrame)
        });
    }

    


    update_weapons_systems(){    
    }
    
    respawn(entity){
        entity.position = new Vec2(0, 0);
        entity.phys_obj.acceleration = new Vec2(0, 0);
    }
}

new Game().load()