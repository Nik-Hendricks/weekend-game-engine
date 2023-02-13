import Rasterizer from '/Engine/Rasterizer.js'
import Sprite from '/Engine/Sprite.js'
import Text from '/Engine/GUI/Text.js';

function generateOutline(width, height, color, color2) {
    const topRight = [
        [color,color,'0'],
        [color2,color,color],
        [color2,color2,color],
    ];
    const bottomRight = [  
        [color2,color2,color],
        [color2,color,color],
        [color,color,color],
        [color,color,'0'],
    ];
    const topLeft = [
        ['0',color,color],
        [color,color,color2],
        [color,color2,color2],
    ];
    const bottomLeft = [          
        [color,color2,color2],
        [color,color,color2],
        [color,color,color],
        ['0',color,color],
    ];
    
    const pixelArray = [];
    for (let i = 0; i < height; i++) {
        const row = new Array(width).fill(color2);
        for (let j = 0; j < width; j++) {
            


            //roof
            if(j > 0 && j < width && i < 1){
                row[j] = color;
            }

            //floor
            if(j > 0 && j < width && i > height -3){
                row[j] = color;
            }

            //side walls
            if(j<1 || j > width -2){
                row[j] = color
            }

            //top left
            if(j < 3 && i < 3){
                row[j] = topLeft[i][j];
            }
            //bottom left
            if (i >= height - 4 && j < 3) {
                row[j] = bottomLeft[4 - (height - i)][j];
            }
            //top right
            if (i < 3 && j >= width - 3) {
                row[j] = topRight[i][2 - (width - j - 1)];
            }
            //bottom right
            if (i >= height - 4 && j >= width - 3) {
                row[j] = bottomRight[3 - (height - i - 1)][2 - (width - j - 1)];
            }
        }
        pixelArray.push(row);
    }
    return pixelArray;
}

function appendArray(x,y, arr, array){
    var arrheight = arr[0].length
    var arrwidth = arr.length
    var arrayheight = array[0].length
    var arraywidth = array.length

    var startX = x;
    var startY = y;
    var endX = arraywidth + x;
    var endY = arrayheight + y;

    //console.log(`startX: ${startX} startY: ${startY} endX: ${endX} endY: ${endY}`)
    for(var i = startY; i < endY; i++){
        for(var j = startX; j < endX; j++){
            if(array[j-x][i-y] !== '0'){
                arr[j][i] = array[j - x][i - y]
            }
        }
    }

    return arr;
}

function build_grid(sizex, sizey, element_size){
    var state = true;
    var size = [sizex, sizey]
    var element_size = [element_size, element_size];
    var normalized_size = [size[0] * element_size[0], size[1] * element_size[1]]
    var arr = new Array(normalized_size[1] + 1).fill('0').map(() => new Array(normalized_size[0]).fill('0'));
    for(var x = 0; x <= normalized_size[0]; x += element_size[0]){
        for(var y = 0; y < normalized_size[1]; y++){
            arr[y][x] = 'wht'
        }
    }
    for(var x = 0; x <= normalized_size[0]; x++){
        for(var y = 0; y <= normalized_size[1]; y += element_size[1]){
            arr[y][x] = 'wht'
        }
    }
    return arr
}

class GUI{
    constructor(){
        this.elements = [];
        this.rasterizer = new Rasterizer({pixel_size:2});
        return;
    }

    append(element){
        element.GUI = this;
        this.elements[element.uuid] = element
        this.rasterizer.cache_img(element)
    }

    update(controls){
        var x = controls.Controls.input_data.mouse / this.rasterizer.pixel_size;
        var y = controls.Controls.input_data.mouse / this.rasterizer.pixel_size;
        if(controls.Controls.input_data.mousedown){
            var es = Object.entries(this.get_elements_from_range(controls.Controls.input_data.mouse, controls.Controls.input_data.mouse));
            if(es.length > 0){
                var e = es[es.length-1][1]
                e.onclick(this);
            }
        }
    }

    draw(ctx){
        ctx.save();
        Object.entries(this.elements).forEach(entry => {
            var element = entry[1];
            var d = false
            if(element.uuid !== 'cursor' && element.opened && element.background !== 'transparent'){
                d = true;
                if(element.parentElement){
                    if(element.parentElement.opened == false){
                        d = false
                    }
                }
            }

            if(d){
                element.draw(this, ctx)
            }
        })
        var x = (this.elements.cursor.position[0] * this.rasterizer.pixel_size)
        var y = (this.elements.cursor.position[1] * this.rasterizer.pixel_size)
        ctx.drawImage(this.rasterizer.get_cached_img(this.elements.cursor), x, y);
        ctx.restore();
    }

    get_elements_from_range(start, end){
        var ret = {}
        var elements = this.elements;
        if(elements){
            Object.entries(elements).forEach(entry => {
                var element = entry[1]
                var pos = element.render_position
                if(pos[0] + element.width * this.rasterizer.pixel_size >= start[0] && pos[0] <= end[0]){
                    if(pos[1] + element.height * this.rasterizer.pixel_size >= start[1] && pos[1] <= end[1]){
                        if(entry[0] !== 'cursor'){
                            ret[element.uuid] = element
                        }
                    }
                }
            })
        }
        return ret;
    }
}

class GUIElement{
    constructor(props){
        this.transparency = (typeof props.transparency !== 'undefined') ? props.transparency : 1;
        this.background_color = (typeof props.background_color !== 'undefined') ? props.background_color : 'litegry';
        this.position_type = 'absolute'
        this._position = (typeof props.position !== 'undefined') ? props.position : [0, 0];
        this.data = props.data;
        this.width = (typeof props.width !== 'undefined') ? props.width : 0;
        this.height = (typeof props.height !== 'undefined') ? props.height : 0;
        this.uuid = (typeof props.uuid !== 'undefined') ? props.uuid : Math.random();
        this.isDragging = false;
        this.opened = (typeof props.opened !== 'undefined') ? props.opened : true;
        this.pixel_size = (typeof props.pixel_size !== 'undefined') ? props.pixel_size : 2;
        this.onclick = (typeof props.onclick !== 'undefined') ? props.onclick : () => {console.log("MEOW >:(")};
    }


    get position(){
        var refPos = (typeof this.parentElement !== 'undefined') ? this.parentElement.position : [0, 0];
        var x = (this._position[0] + refPos[0])
        var y = (this._position[1] + refPos[1])
        return [x,y]
    }

    set position(value){
        this._position = value
    }

    get render_position(){
        var refPos = (typeof this.parentElement !== 'undefined') ? this.parentElement.position : [0, 0];
        var x = ((this._position[0] + refPos[0]) * this.GUI.rasterizer.pixel_size)
        var y = ((this._position[1] + refPos[1]) * this.GUI.rasterizer.pixel_size)
        return [x,y]
    }

    update(GUI){
        this.GUI.rasterizer.cache_img(this);
    }

    draw(GUI, ctx){
        ctx.save();
        ctx.globalAlpha = this.transparency;
        if(GUI.rasterizer.get_cached_img(this).src.length > 6){
            ctx.drawImage(GUI.rasterizer.get_cached_img(this), this.position[0] * this.GUI.rasterizer.pixel_size, this.position[1] * this.GUI.rasterizer.pixel_size);
        }
        ctx.restore();
    }

    append(GUI, Element){
        Element.parentElement = this;
        GUI.append(Element)
        //this.elements[Element.uuid] = this
    }
}

class ContainerElement extends GUIElement{
    constructor(props){
        super(props);
        this.title = (typeof props.title !== 'undefined') ? props.title : 'window';
        this.onopen = (typeof props.onopen !== 'undefined') ? props.onopen : undefined;
        this.isDragging = false;
        this.data = this.create()
    }   

    get elements(){
        var ret = [];
        Object.entries(this.GUI.elements).forEach(el => {
            var element = el[1];
            if(element.parentElement == this && element.opened){
                ret[element.uuid] = element;
            }
        })
        return ret;
    }

    create(){
        return generateOutline(this.width, this.height, 'drkogry', this.background_color)
    }

    close(){
        this.opened = false;
    }

    open(){
        this.opened = true;
        if(typeof this.onopen !== 'undefined'){
            this.onopen();
        }
    }

    toggle(){
        if(this.opened == true){
            this.close();
        }else{
            this.open();
        }
    }


    draw(GUI, ctx){
        ctx.save();
        ctx.globalAlpha = this.transparency;
        if(GUI.rasterizer.get_cached_img(this).src.length > 6){
            ctx.drawImage(GUI.rasterizer.get_cached_img(this), this.position[0] * this.GUI.rasterizer.pixel_size, this.position[1] * this.GUI.rasterizer.pixel_size);
        }
        ctx.restore();
    }
}

class ButtonElement extends GUIElement{
    constructor(props){
        super(props)
        this.text = props.text
        this.create()
    }

    create(){
        this.data = generateOutline(this.width, this.height, 'drkogry', 'litegry')
        var text = new Text({text:this.text, color:'blk'})
        var x = (this.data[0].length / 2) - (text[0].length /2)
        var y = (this.data.length / 2) - (text.length / 2)
        this.data = appendArray(y, x, this.data, text)
    }
} 

class TextAreaElement extends GUIElement{
    constructor(props){
        super(props)
    }
    
}

export{GUI, GUIElement, ContainerElement, ButtonElement}