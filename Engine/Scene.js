import Entity from '/Engine/Entity.js';
import {PhysicalObject} from '/Engine/Physics.js';
import {ContainerElement, GUIElement, GUI} from '/Engine/GUI/GUI.js';

export default class Scene{
    constructor(sprites, entities, elements){
        this.sprites = sprites;
        this.entities = entities;
        this.elements = elements;
    }

    create(Engine, GUI){
        return new Promise(resolve => {
            Engine.loadImages(this.sprites).then(() => {
                this.loadGUI(Engine, GUI, this.elements)
                console.log(GUI.elements)
                this.entities.forEach(GameObject => {
                    this.entities.push(GameObject)
                    Engine.register_entity(GameObject.name, new Entity({
                        sprite: Engine.sprites[GameObject.sprite],
                        position: GameObject.position,
                        phys_obj: new PhysicalObject({...GameObject.phys_obj, ...{sprite: Engine.sprites[GameObject.sprite].Outline(Engine.sprites[GameObject.sprite].data, 1)}}),
                    }))
                })
                resolve(this.entities)
            })
        })
    }

    loadGUI(Engine, GUI, elements, append_context){
        Object.entries(elements).forEach(el => {
            var element = el[1];
            var d = (typeof element.data !== 'undefined') ? Engine.sprites[element.data].data : null;
            var p = (typeof element.parentElement !== 'undefined') ? [element.parentElement.position[0] + element.position[0], element.parentElement.position[1] + element.position[1]] : element.position;


            if(element.type == GUIElement){
                var newElement = new element.type({
                    uuid: element.name, 
                    position:p, 
                    width:element.width, 
                    height:element.height, 
                    data:d, 
                    onclick: element.onclick,
                    opened: element.opened,
                })
            }else{
                var newElement = new element.type({
                    uuid: element.name, 
                    position:p, 
                    width:element.width, 
                    height:element.height, 
                    transparency:element.transparency,
                    opened: element.opened,
                })
            }

            var ae = (typeof append_context !== 'undefined') ? append_context : GUI;
            if(ae == GUI){
                ae.append(newElement)
            }else{
                console.log('elementappend')
                ae.append(GUI, newElement)
            }
            if(element.elements){
                var hasChildren = [];
                if(element.elements.length > 0){
                    Object.entries(element.elements).forEach(el2 => {
                        var element2 = el2[1];
                        var d = (typeof element2.data !== 'undefined') ? Engine.sprites[element2.data].data : null;
                        var newElement2 = new element2.type({
                            uuid: element2.name,
                            position:element2.position,
                            width:element2.width,
                            height:element2.height,
                            data:d,
                            onclick: element2.onclick,
                            transparency: element.transparency,
                            opened: element2.opened,
                        })
                        newElement.append(GUI, newElement2)
                        if(element2.elements){
                            hasChildren.push([newElement2, element2])
                        }
                    })
                }
                hasChildren.forEach(el =>{
                    this.loadGUI(Engine, GUI, el[1].elements, el[0])
                })
            }
        })
    }
}