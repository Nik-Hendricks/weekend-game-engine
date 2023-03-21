import {ContainerElement, ButtonElement} from '/Engine/GUI/GUI.js';
import Vec2 from '/Engine/Vec2.js';


export default class ContextMenuManager{
    constructor(Game){
        this.context_entity = null;
        this.current_items = [];
        this.spawned_position = [0,0];
        this.context_menu = new ContainerElement({    
            uuid:"ContextMenu",
            width:80,
            height:120,
            position:[100,100],
            transparency:.5,
            background_color:'drkgry',
            opened:false,
        })
        console.log(this.context_menu)
        Game.GUI.append(this.context_menu);
    }


    open(position, context_entity){

        this.spawned_position = position


        this.context_entity = context_entity;
        this.context_menu.opened = true;
    }

    close(){
        this.context_menu.opened = false;
        this.context_entity = null;
    }


    update(Game){
        //var x = this.spawned_position.x - (Game.Engine.follow_entity.render_position.x - Game.Engine.rendersize.x / 2)
        //var y = this.spawned_position.y - (Game.Engine.follow_entity.render_position.y - Game.Engine.rendersize.y / 2) 
        var x = 0;
        var y = 0;

        if(this.context_entity !== null){
            if(this.current_items !== this.context_entity.contextItems){
                var context_menu = this.context_menu
                var y_offset = 5;
                if(this.context_entity !== null){
                    if(this.context_entity.contextItems){
                        this.context_menu.position = new Vec2(x, y);
                        this.context_entity.contextItems.forEach(contextItem =>{
                            this.context_menu.elements = [];
                            this.context_menu.append(Game.GUI, new ButtonElement({
                                position: [5, y_offset],
                                text: contextItem.text,
                                width:70,
                                height:16,
                                onclick: contextItem.action,
                            }))
                            y_offset += 20;
                        })
                    }
                    this.current_items = this.context_entity.contextItems;
                }
            }
        }
    }
}