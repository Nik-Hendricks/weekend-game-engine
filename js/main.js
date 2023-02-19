import Cosmos from '/Engine/Cosmos.js'
import {GUI, GUIElement, ContainerElement, ButtonElement} from '/Engine/GUI/GUI.js'
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
import {Helpers} from '/Engine/Helpers.js';

import Ship from '/js/Ship.js';

import DevScene from '/js/Scenes/DevScene.js'


class Game{
    constructor(){
        this.Engine = new Cosmos();
        this.GUI = new GUI();
        this.Controls = new Controls();
        this.currentSector = [0, 0];
        this.movement_type = 'ship'
        this.ContextEntity = null;

        this.EnterShipEditMode = Helpers.runOnce(() => {
            var s = this.Controls.Controls.input_data.scroll;
            if (s === 20) {
              this.Controls.Controls.input_data.scroll = 4;
            } else {
              this.Controls.Controls.input_data.scroll = 20;
            }
        }, 300)


    }

    load(){
        debugger;
        DevScene.create(this.Engine, this.GUI).then(() => {

            this.GUI.append(new GUIElement({uuid:'cursor',position: [100, 100], data: [['0','wht','0'],['wht','wht','wht'],['0','wht','0']], width:3, height:3}))
            this.GUI.append(new GUIElement({uuid:'hud', position: [0,0], data: [['0']], }))
            this.GUI.append(new GUIElement({uuid:'hud2',position:  [70, 0], data: new Text({text: 'v0.1.8', color: 'purp'})}))
            this.GUI.append(new GUIElement({uuid:'hud3',position:  [150, 0], data: new Text({text: '', color: 'puke'})}))
      
            this.Engine.follow_entity = this.Engine.entities['other_rob'];
            this.Engine.control_entity = this.Engine.entities['other_rob'];
            this.GUI.elements['hud3'].data = new Text({text:`${this.Engine.rendersize.x} ${this.Engine.rendersize.y}`, color:'wht'})
            this.background = new BackgroundImageEntity(this.Engine, 5);

            var x = (90 / 2) - (this.Engine.control_entity.sprite.data[0].length /2)
            this.GUI.elements.InventoryView.append(this.GUI, new GUIElement({uuid:'ShipStatus',position:[x, 70], data:this.Engine.control_entity.sprite.data, }))
            this.start()
        })
    }

    start(){  
        this.Engine.start((ev) => {
            //logic
            var e = this.Engine.screenToGame(this.Controls.input.mouse);
            this.GUI.elements['hud'].data = new Text({text:`${e}  ${this.currentSector}`, color:'red'})
            this.Controls.update(this, this.Engine);
            var input = this.Controls.input
            var _n_mouse = [input.mouse[0] / this.GUI.rasterizer.pixel_size, input.mouse[1] / this.GUI.rasterizer.pixel_size]
            this.GUI.elements['cursor'].position = _n_mouse;

            this.currentSector = [Math.floor(this.Engine.follow_entity._get_midpoint().x / (100 * this.Engine.rasterizer.pixel_size)), Math.floor(this.Engine.follow_entity._get_midpoint().y / (100 * this.Engine.rasterizer.pixel_size))]
            this.updateEntities(ev);
            this.GUI.update(this.Controls, this)
        }, () => {
            //render
            this.Engine.clear_screen();
            this.background.draw(this.Engine.gameToScreen(this.Engine.follow_entity._get_render_midpoint()));
            this.Engine.renderedEntities = this.Engine.camera.update(this.Engine.follow_entity, this.Engine)
            this.GUI.draw(this.Engine.ctx);

            this.GUI.elements['hud'].update(this.GUI)
            this.updateShipStatus()
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

    updateShipStatus(){
        var x = (90 / 2) - (this.Engine.control_entity.sprite.data[0].length /2)
        this.GUI.elements.InventoryView.append(this.GUI, new GUIElement({uuid:'ShipStatus',position:[x, 100], data:this.Engine.control_entity.sprite.data, }))
    }

    updateRadar(hovered){
        var radar_el = this.GUI.elements.Radar;
        if(hovered.length !== 0){
            var radaredEntity = hovered[0][1]
            var x = (100 / 2) - (radaredEntity.sprite.data[0].length /2)
            var y = (100 / 2) - (radaredEntity.sprite.data.length /2)
            radar_el.append(this.GUI, new GUIElement({uuid:'RadarShip',position:[x, y], data:radaredEntity.sprite.data, }))
        }
    }

    updateContextMenu(){
            var context_menu = this.GUI.elements['ContextMenu'];
            var y_offset = 5;
        
            if(this.ContextEntity !== null){
                if(this.ContextEntity.contextItems){
                // Calculate the position of the entity in the game world
                var gameX = this.ContextEntity.position.x;
                var gameY = this.ContextEntity.position.y;

                // Calculate the position of the camera in the game world
                var cameraX = this.Engine.follow_entity.position.x;
                var cameraY = this.Engine.follow_entity.position.y;

                // Calculate the position of the entity on the screen, taking into account the difference in pixel size between the game entities and the GUI elements
                var screenX = (gameX - cameraX) * this.GUI.rasterizer.pixel_size / this.Engine.rasterizer.pixel_size;
                var screenY = (gameY - cameraY) * this.GUI.rasterizer.pixel_size / this.Engine.rasterizer.pixel_size;

                // Adjust the position of the entity on the screen to take into account the size of the entity
                screenX -= this.ContextEntity._get_render_size().x / 2;
                screenY -= this.ContextEntity._get_render_size().y / 2;


                    context_menu.position = [screenX, screenY];
                    this.ContextEntity.contextItems.forEach(contextItem =>{
                        context_menu.elements = [];
                        //context_menu.append(this.GUI, new ButtonElement({
                        //    position: [5, y_offset],
                        //    text: contextItem.text,
                        //    width:70,
                        //    height:16,awd
                        //    onclick: contextItem.action,
                        //}))
                        y_offset += 20;
                    })
                }
            }
            
        
    }
}

new Game().load()