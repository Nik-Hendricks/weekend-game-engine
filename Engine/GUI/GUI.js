import Rasterizer from '/Engine/Rasterizer.js'
import Sprite from '/Engine/Sprite.js'

class GUI{
    constructor(){
        this.elements = [];
        this.rasterizer = new Rasterizer({pixel_size:3});
        return;
    }

    append(element){
        this.elements[element.uuid] = element
        this.rasterizer.cache_img(element)
    }


    update(ctx, controls){
        //Object.entries(this.elements).forEach(entry => {
        //    var element = entry[1]
        //    var doRender = (element.constructor.name == 'WindowElement' && element.opened == false) ? false : true;
        //    
        //    if(doRender){
        //        var x = (element.position[0] * this.rasterizer.pixel_size)
        //        var y = (element.position[1] * this.rasterizer.pixel_size)
        //        ctx.drawImage(this.rasterizer.get_cached_img(element), x, y);
        //        this.rasterizer.cache_img(element)
        //    }
        //})
//
        //var m = [controls.input_data.mouse[0] / this.rasterizer.pixel_size, controls.input_data.mouse[1] / this.rasterizer.pixel_size]
        //var start = [m[0], m[1]]
        //var end = [m[0] + 3, m[1] + 3]
        //var gui_hovered = Object.entries(this.get_elements_from_range(start, end))
        this.draw(ctx)
    }

    draw(ctx){
        ctx.save();
        Object.entries(this.elements).forEach(entry => {
            var element = entry[1];
                if(element.opened !== false){
                    if(element.background_color !== 'transparent'){
                        ctx.globalAlpha = element.transparency;
                        ctx.fillStyle = this.rasterizer.colors[this.rasterizer.color_map.indexOf(element.background_color) + 1]
                        ctx.beginPath()
                        ctx.rect(element.position[0] * this.rasterizer.pixel_size, element.position[1] * this.rasterizer.pixel_size, element.width * this.rasterizer.pixel_size, element.height * this.rasterizer.pixel_size)
                        ctx.fill();
                        ctx.globalAlpha = 1;
                    }
                    Object.entries(element.elements).forEach(entry => {
                        var entity = entry[1]
                        if(entity.position_type == 'absolute'){
                            var x = (entity.position[0] * this.rasterizer.pixel_size)
                            var y = (entity.position[1] * this.rasterizer.pixel_size)
                            ctx.drawImage(this.rasterizer.get_cached_img(entity), x, y);
                        }
                    })
                }
        })
        ctx.restore();
    }


    get_elements_from_range(start, end){
        var ret = {}
        var elements = this.elements;
        if(elements){
            Object.entries(elements).forEach(entry => {
                var element = entry[1]
                var pos = element.position
                if(pos[0] + element.width >= start[0] && pos[0] <= end[0]){
                    if(pos[1] + element.height >= start[1] && pos[1] <= end[1]){
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
        this.background_color = (typeof props.background_color !== 'undefined') ? props.background_color : 'drkgry';
        this.position_type = 'absolute'
        this.position = (typeof props.position !== 'undefined') ? props.position : [0, 0];
        this.data = props.data;
        this.width = (typeof props.width !== 'undefined') ? props.width : 0;
        this.height = (typeof props.height !== 'undefined') ? props.height : 0;
        this.uuid = (typeof props.uuid !== 'undefined') ? props.uuid : Math.random();
        this.elements = [];
        this.isDragging = false;
    }

    update(GUI){
        GUI.rasterizer.cache_img(this);
    }
}

class WindowElement extends GUIElement{
    constructor(props){
        super(props);
        this.transparency = (typeof props.transparency !== 'undefined') ? props.transparency : 1;
        this.title = (typeof props.title !== 'undefined') ? props.title : 'window';
        this.opened = true;
        this.onopen = (typeof props.onopen !== 'undefined') ? props.onopen : undefined;
        this.data = this.create();
        this.isDragging = false;
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

    update(controls){

    }
}

export{GUI, GUIElement, WindowElement}