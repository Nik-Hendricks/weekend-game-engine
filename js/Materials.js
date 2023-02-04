class Materials{

}

class Material{
    constructor(name, sprite, color){
        //after a certain scroll level the material will turn from a color to a sprite.
        this.name = name;
        this.sprite = sprite;
        this.color = color;
    }
}

class Stone extends Material{
    constructor(){
        super();
    }
}