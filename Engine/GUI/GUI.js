import Rasterizer from '/Engine/Rasterizer.js'
import Sprite from '/Engine/Sprite.js'

class GUI{
    constructor(){
        this.elements = [];
        this.rasterizer = new Rasterizer({pixel_size:2});
        return;
    }

    append(element){
        element.GUI = this;
        this.elements[element.uuid] = element
        if(element.constructor.name !== 'ContainerElement'){
            this.rasterizer.cache_img(element)
        }
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
        this.background_color = (typeof props.background_color !== 'undefined') ? props.background_color : 'drkgry';
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
        return new Array(this.height).fill(null).map(() => new Array(this.width).fill('drkcobolt'));
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
        ctx.fillStyle = GUI.rasterizer.colors[GUI.rasterizer.color_map.indexOf(this.background_color) + 1]
        ctx.beginPath()
        ctx.rect(this.position[0] * GUI.rasterizer.pixel_size, this.position[1] * GUI.rasterizer.pixel_size, this.width * GUI.rasterizer.pixel_size, this.height * GUI.rasterizer.pixel_size)
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.restore();
    }
}

export{GUI, GUIElement, ContainerElement}