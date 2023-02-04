import Entity from '/Engine/Entity.js'
import {PhysicalObject} from '/Engine/Physics.js'
import Sprite from '/Engine/Sprite.js'

class Ship extends Entity{
    constructor(Engine, playerName, spriteName, position){
        super({Engine: Engine, position:position, phys_obj: new PhysicalObject(), sprite: Engine.sprites[spriteName]})
        Engine.register_entity(playerName, this)
        this.hasInteriorSprite = true;
        this.interiorSprite = new Sprite(this.generateInterior());
        this.systems = [];
    }

    addSystem(type, position){

    }
    getSystemFromPosition(pos){

    }

    generateInterior(systems){
        var data = this.sprite.data
        let arr = new Array(data.length).fill(null).map(() => new Array(data[0].length).fill('0'));
        for(var y = 0; y < data.length; y++){
            for(var x = 0; x < data[y].length; x++){
                if(data[y][x] !== '0'){
                    arr[y][x] = 'drkogry'
                }
            }
        }

        return arr;
    }

    update(Engine, deltaTime){
        super.update(Engine, deltaTime);
        if(this.interiorView /*&& this.interiorSprite.length > 0*/){
            this.sprite = this.interiorSprite;
            
        }else{
            this.sprite = this.original_sprite
        }
    }

}

class System{
    constructor(){
        this.position = [];
        this.sprite = [];
    }
}

export default Ship;