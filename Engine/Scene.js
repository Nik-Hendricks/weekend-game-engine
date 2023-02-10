import Entity from '/Engine/Entity.js';
import {PhysicalObject} from '/Engine/Physics.js';

export default class Scene{
    constructor(sprites, entities){
        this.sprites = sprites;
        this.entities = entities;
    }

    create(Engine){
        return new Promise(resolve => {
            Engine.loadImages(this.sprites).then(() => {
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
}