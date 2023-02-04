export class Rasterizer{
    constructor(_props){
        var props = (typeof _props !== 'undefined') ? _props: {};
        this.cached_images = [];
        this.pixel_size = (typeof props.pixel_size !== 'undefined') ? props.pixel_size : 4;
        this.colors = (typeof props.colors !== 'undefined') ? props.colors :["#030303","#7eb77","#a2a0a3","#375788","#368abe","#68e0f4","#92f0e7","#3c6d4b","#3d9457","#7cf1a6","#9cf6bf","#40760d","#3d9b00","#76fa49","#99ef93","#3e6d12","#479700","#a5f811","#c2ec75","#4f5e0e","#807d00","#f6e330","#f9ea87","#814b10","#b85f00","#ffb012","#ffda9a","#ac471e","#d13600","#ff8635","#fbb8a3","#b52242","#d52b53","#ff74bd","#f8ade3","#a12e83","#d22fb9","#ff73ff","#dba4f9","#681eaa","#842fe8","#b384ff","#b9a4f7","#330dc1","#2e2ff6","#6095ff","#96abf5","#2c0eb9","#334fd1","#66b0ff","#8cccf4","#7d807e","#b0aba8","#e0e0e0","#fefefe"];
        this.color_map = (typeof props.color_map !== 'undefined') ? props.color_map : ["blk","drkgry","litegry","drkcobolt","cobolt","litecobolt","whtcobolt","drkforest","forest","liteforest","whtforest","drkgreen","green","litegreen","whtforest","drklime","lime","litelime","whtlime","drkpuke","puke","ylw","liteylw","drkorg","org","liteorg","whtorg","drkred","red","litered","whtred","drkpnk","pnk","litepnk","whtpnk","drkfus","fus","litefush","whtfus","drkpurp","purp","litepurp","whtpurp","drkblue","blue","liteblue","whtblue","drknavy","navy","litenavy","whtnavy","drkogry","ogry","liteorgy","wht"];
    }

    cache_img(data){
        if(data.constructor.name == 'GUIElement' || data.constructor.name == 'WindowElement'){
            this.cached_images[data.uuid] = this.create_img(data.data)
        }else{
            this.cached_images[data.uuid] = this.create_img(data.sprite.data);
        }
    }

    get_cached_img(entity){
        return this.cached_images[entity.uuid]
    }

    recache_images(entities){
        Object.entries(entities).forEach(entry => {
            this.cache_img(entry[1])
        })
    }

    create_img(data){
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');            
            canvas.width = data[0].length * this.pixel_size;
            canvas.height = data.length * this.pixel_size;
            ctx.globalAlpha = 1;
        
            var colors = this.colors;
            var colorMap = this.color_map;
            var pixelSize = this.pixel_size;

            for(var y = 0; y < data.length; y++){
                for(var x = 0; x < data[y].length; x++){
                        var color = data[y][x];
                        if(color !== '0'){
                            ctx.fillStyle = colors[colorMap.indexOf(color)];
                            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
                        }
                }
            }
        
            var img = new Image();
            img.src = canvas.toDataURL();
            return img;
        
    }
}

export default Rasterizer;