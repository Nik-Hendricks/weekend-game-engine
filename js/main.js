import Cosmos from '/Engine/Cosmos.js'
import {GUI, GUIElement, ContainerElement} from '/Engine/GUI/GUI.js'
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
        name:'inventory',
        type:ContainerElement,
        position:[10,20],
        width:100,
        height:200,
        transparency:.5,
        elements:[
            {
                name:'ShipManageButton1',
                type:GUIElement,
                position:[5,5],
                width:16,
                height:16,
                data:'ShipManageButton1',
                onclick:(GUI) => {
                    console.log(GUI.elements)
                    GUI.elements.InventoryView.close();
                    GUI.elements.AutomationView.open();
                    GUI.elements.ShipManageView.open();
                }
            },
            {
                name:'InventoryButton1',
                type:GUIElement,
                position:[26,5],
                width:16,
                height:16,
                data:'InventoryButton1',
                onclick:(GUI) => {
                    GUI.elements.ShipManageView.close();
                    GUI.elements.AutomationView.open();
                    GUI.elements.InventoryView.open();
                    
                }
            },
            {
                name:'AutomationButton1',
                type:GUIElement,
                position:[46,5],
                width:16,
                height:16,
                data:'AutomationButton1',
                onclick:(GUI) => {
                    GUI.elements.ShipManageView.close();
                    GUI.elements.InventoryView.close();
                    GUI.elements.AutomationView.open();
                    console.log('beep beep lettuce')
                }
            },
            {
                name:'ShipManageView',
                type:ContainerElement,
                position:[5,26],
                width:90,
                height:170,
                transparency:.5,
                
                elements:[
                    {
                        name:'InventoryButton2',
                        type:GUIElement,
                        position:[5,5],
                        width:16,
                        height:16,
                        data:'AutomationButton1',
                        onclick:(GUI) => {
                            console.log('yesirski')
                        }
                    },
                ]
            },
            {
                name:'InventoryView',
                type:ContainerElement,
                position:[5,26],
                width:90,
                height:170,
                transparency:.5,
                opened:false,
            },
            {
                name:'AutomationView',
                type:ContainerElement,
                position:[5,26],
                width:90,
                height:170,
                transparency:.5,
                opened:false,
            }
        ],
        
    }
]


var devScene = new Scene(GameSprites, GameObjects, gui_elements)

class Game{
    constructor(){
        this.Engine = new Cosmos();
        this.GUI = new GUI();
        this.Controls = new Controls();
        this.currentSector = [0, 0];
        this.movement_type = 'ship'
    }

    load(){

        devScene.create(this.Engine, this.GUI).then(() => {

            this.GUI.append(new GUIElement({uuid:'cursor',position: [100, 100], data: [['0','wht','0'],['wht','wht','wht'],['0','wht','0']], width:3, height:3}))
            this.GUI.append(new GUIElement({uuid:'hud', position: [0,0], data: [['0']], }))
            this.GUI.append(new GUIElement({uuid:'hud2',position:  [70, 0], data: new Text({text: 'v0.1.8', color: 'purp'})}))
            this.GUI.append(new GUIElement({uuid:'hud3',position:  [150, 0], data: new Text({text: '', color: 'puke'})}))

            //this.GUI.elements['ShipManageButton1'].onclick = () => {
            //    console.log('ShipManage')
            //}
            //this.GUI.elements['InventoryButton1'].onclick = () => {
            //    console.log('InventoryButton')
            //}
            //this.GUI.elements['AutomationButton1'].onclick = () => {
            //    console.log('AutomationButton')
            //}
//
            //this.GUI.elements['ContinueAdventure'].onclick = () => {
            //    inv.close();
            //    console.log(inv.opened)
            //}
            //this.GUI.append(inv)
            
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
            this.Controls.update(this.Engine);
            var input = this.Controls.input
            var _n_mouse = [input.mouse[0] / this.GUI.rasterizer.pixel_size, input.mouse[1] / this.GUI.rasterizer.pixel_size]
            this.GUI.elements['cursor'].position = _n_mouse;

            this.currentSector = [Math.floor(this.Engine.follow_entity._get_midpoint().x / (100 * this.Engine.rasterizer.pixel_size)), Math.floor(this.Engine.follow_entity._get_midpoint().y / (100 * this.Engine.rasterizer.pixel_size))]
            this.updateEntities(ev);
            this.GUI.update(this.Controls)
        }, () => {
            //render
            this.Engine.clear_screen();
            this.background.draw(this.Engine.gameToScreen(this.Engine.follow_entity._get_render_midpoint()));
            this.Engine.renderedEntities = this.Engine.camera.update(this.Engine.follow_entity, this.Engine)
            this.GUI.draw(this.Engine.ctx);
            var e = this.Engine.screenToGame(this.Controls.input.mouse);
            this.GUI.elements['hud'].data = new Text({text:`${e}  ${this.currentSector}`, color:'red'})
            this.GUI.elements['hud'].update(this.GUI)
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
}

new Game().load()