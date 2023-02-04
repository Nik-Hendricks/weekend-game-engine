import Entity from '/Engine/Entity.js'
import Sprite from '/Engine/Sprite.js';
import {PhysicalObject} from '/Engine/Physics.js'

class AsteroidGenerator {
    constructor(Engine, asteroidCount) {
        for(var i = 0; i < asteroidCount; i++){
            var randX = getRandomInt(-500, 500)
            var randY =  getRandomInt(-500, 500)
            var randAX =  getRandomInt(-100, 100)
            var randAY =  getRandomInt(-100, 100)
            new Asteroid(Engine, i, [randX, randY], new PhysicalObject({acceleration:[randAX, randAY], direction_vec: [randAX, randAY]}))
        }
    }
}

class Asteroid{
    constructor(Engine, id, position, phys_obj){
        Engine.register_entity(`asteroid-${id}`, new Entity({
            position:position,
            phys_obj: phys_obj,
        }))
        this.entity = Engine.entities[`asteroid-${id}`];
        this.entity.sprite.data = this.entity.sprite.generateAsteroidSprite(40, 20, 20, 71, 'drkogry');
        console.log(this.entity.sprite.data)
        this.entity.recache_image(Engine);
        return this.entity
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

export default AsteroidGenerator