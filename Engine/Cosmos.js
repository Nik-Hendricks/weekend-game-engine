//written by Nik Hendricks 1-27-23
import Rasterizer from '/Engine/Rasterizer.js'
import Sprite from '/Engine/Sprite.js';
import {PhysicalObject, Physics} from '/Engine/Physics.js'
import Camera from '/Engine/Camera.js';
import AI from '/Engine/AI.js';
import GameLoop from '/Engine/GameLoop.js';

class Cosmos{
    constructor(){
        this.lastFrameTime = Date.now();
        this.entities = [];
        this.sprites = []
        this.images = [];
        this.backgrounds = [];
        this.scenes = [];
        this.setup_canvas();
        this.rasterizer = new Rasterizer();
        this.camera = new Camera();
        this.physics = new Physics();
        this.GameLoop = new GameLoop();
        this.AI = new AI();
        this.rendersize = [this.canvas.width, this.canvas.height];
        this.follow_entity = false;
        this.control_entity = false;
    }

    start(logic, render){
        this.GameLoop.start(logic, render)
    }

    register_sprite(name, data){
        this.sprites[name] = new Sprite(data);
    }

    register_image(name, img){
        this.images[name] = img
    }

    register_entity(name, entity){
        entity.uuid = name;
        this.entities[name] = entity
        this.rasterizer.cache_img(entity)
    }

    register_background(name){
        this.backgrounds[name] = this.parseImage(this.images[name], this.rasterizer.colors, this.rasterizer.color_map);
    }

    setup_canvas(){
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d")
        this.temp_canvas = document.createElement('canvas');
        this.temp_ctx = this.temp_canvas.getContext('2d')
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0px';
        this.canvas.style.right = '0px';
        this.canvas.style.left = '0px';
        this.canvas.style.bottom = '0px';
        this.canvas.style.cursor = 'none'
        document.body.append(this.canvas)
    }

    clear_screen(){
        this.ctx.fillStyle = this.background_color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }


    get_delta_time(){
        let currentTime = Date.now();
        let deltaTime = (currentTime - this.lastFrameTime) / 1000;
        this.lastFrameTime = currentTime;
        return deltaTime;
    }

   get_entitites_from_range(start, end){
        var ret = {}
        var entities = this.entities;
        if(entities){
            Object.entries(entities).forEach(entry => {
                var entity = entry[1]
                entity.render(this);
                var pos = entity.position
                if(pos[0] + entity.sprite.data.length >= start[0] && pos[0] <= end[0]){
                    if(pos[1] + entity.sprite.data[0].length >= start[1] && pos[1] <= end[1]){
                        ret[entity.uuid] = entity
                    }
                }
            })
        }
        return ret;
    }


    loadImage(name, src) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = src;
        image.onload = () => {
            this.images[name] = image
            this.register_sprite(name, this.parseImage(this.images[name], this.rasterizer.colors, this.rasterizer.color_map))
            resolve(image)
        }
      });
    }
    
    loadImages(images) {
        console.log(images)
        var promises = []
        images.forEach(image => {
            if(typeof image.data == 'undefined'){
                promises.push(this.loadImage(image.name, image.src))
            }else{
                this.register_sprite(image.name, image.data);
            }
        })
        return Promise.all(promises);
    }
    
    

    parseImage(image, colors, color_codes) {
        const result = [];
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
        let row = [];
        for (let i = 0; i < imageData.data.length; i += 4) {
          const r = imageData.data[i];
          const g = imageData.data[i + 1];
          const b = imageData.data[i + 2];
          const a = imageData.data[i + 3];
      
          let closestColor = colors[0];
          let closestDistance = Number.MAX_SAFE_INTEGER;
          
          for (const color of colors) {
             
            const colorR = parseInt(color.substring(1, 3), 16);
            const colorG = parseInt(color.substring(3, 5), 16);
            const colorB = parseInt(color.substring(5, 7), 16);
      
            const distance = (r - colorR) ** 2 + (g - colorG) ** 2 + (b - colorB) ** 2;
            if (distance < closestDistance) {
              closestDistance = distance;
              closestColor = color;
            }
          }
      
          row.push(a === 0 ? '0' : color_codes[colors.indexOf(closestColor)]);
          if (row.length === canvas.width) {
            result.push(row);
            row = [];
          }
        }
      
        return result;
    }
}




export default Cosmos;