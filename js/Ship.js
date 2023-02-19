import Entity from '/Engine/Entity.js'
import {PhysicalObject} from '/Engine/Physics.js'
import Sprite from '/Engine/Sprite.js'

class Ship extends Entity{
    constructor(props){
        super(props)
        this.hasInteriorSprite = true;
        this.interiorSprite = new Sprite(this.generateInterior());
        this.systems = [];
        this.contextItems = [
            {
                text:"Vieu Interior",
                action: (GUI, Game) => {
                    console.log("View Interior")
                }
            },
            {
                text: "Enter Ship",
                action: (GUI, Game) => {
                    console.log(Game)
                    Game.Engine.control_entity = this;
                    Game.Engine.follow_entity = this;
                }
            }
        ]
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