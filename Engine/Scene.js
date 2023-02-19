import Entity from '/Engine/Entity.js';
import {PhysicalObject} from '/Engine/Physics.js';
import {ContainerElement, GUIElement, GUI} from '/Engine/GUI/GUI.js';
import {Helpers} from '/Engine/Helpers.js';

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
                this.entities.forEach(GameObject => {
                    this.entities.push(GameObject)
                    Engine.register_entity(GameObject.name, new GameObject.type({
                        sprite: Engine.sprites[GameObject.sprite],
                        position: GameObject.position,
                        phys_obj: new PhysicalObject({...GameObject.phys_obj, ...{sprite: Helpers.Outline(Engine.sprites[GameObject.sprite].data, 1)}}),
                        WeaponSystem: (typeof GameObject.WeaponSystem !== 'undefined') ? GameObject.WeaponSystem : null,
                    }))
                })
                resolve(this.entities)
            })
        })
    }

    loadGUI(Engine, GUI, elements, append_context){
        Object.entries(elements).forEach(el => {
            var element = el[1];
            var d = (typeof element.data !== 'undefined') ? element.data : (typeof element.sprite_name !== 'undefined') ?  Engine.sprites[element.sprite_name].data : [['0']];
            var p = (typeof element.parentElement !== 'undefined') ? [element.parentElement.position[0] + element.position[0], element.parentElement.position[1] + element.position[1]] : element.position;
            element.position = p;
            element.data = d;
            var newElement = new element.type(element)
            var ae = (typeof append_context !== 'undefined') ? append_context : GUI;
            if(ae == GUI){
                ae.append(newElement)
            }else{
                ae.append(GUI, newElement);
            }
            if(element.elements){
                var hasChildren = [];
                if(element.elements.length > 0){
                    Object.entries(element.elements).forEach(el2 => {
                        var element2 = el2[1];
                        var d = (typeof element2.data !== 'undefined') ? element2.data : (typeof element2.sprite_name !== 'undefined') ?  Engine.sprites[element2.sprite_name].data : [['0']];
                        element2.data = d;
                        var newElement2 = new element2.type(element2)
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