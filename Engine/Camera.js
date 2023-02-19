import Vec2 from '/Engine/Vec2.js';


class Camera{
    constructor() {
        this.enableShake =false;
    }

    update(Entity, Engine){
        if(Entity){
            var startX = Entity._get_midpoint().x - (Engine.rendersize.x / 2)
            var startY = Entity._get_midpoint().y - (Engine.rendersize.y / 2)
    
            var endX = startX + Engine.rendersize.x;
            var endY = startY + Engine.rendersize.y;
            var entities = Engine.get_entitites_from_range(new Vec2(startX, startY), new Vec2(endX, endY))
            Object.entries(entities).forEach(entry => {
                    var entity = entry[1]
                    this.draw(Engine, entity, Entity)
            })
        }

        return entities;
    }

    draw(Engine, Entity, FollowEntity){
        var shakeX = Math.random() * 10 - 2.5;
        var shakeY = Math.random() * 10 - 2.5;

        var x = Entity.render_position.x - (FollowEntity.render_position.x - Engine.rendersize.x / 2) - (Entity._get_render_size().x / 2); //Rob fucked this up...
        var y = Entity.render_position.y - (FollowEntity.render_position.y - Engine.rendersize.y / 2) - (Entity._get_render_size().y / 2);
        var _x = Entity.render_position.x - (FollowEntity.render_position.x - Engine.rendersize.x / 2);
        var _y = Entity.render_position.y - (FollowEntity.render_position.y - Engine.rendersize.y / 2);

        Engine.ctx.save();  
        Engine.ctx.translate(_x, _y);
        Engine.ctx.rotate(Entity.rotation * Math.PI / 180);
        Engine.ctx.translate(-_x, -_y);
        Engine.ctx.drawImage(Engine.rasterizer.get_cached_img(Entity), x, y); /**/
        Engine.ctx.restore();       
    }
}
export default Camera

//BYE...