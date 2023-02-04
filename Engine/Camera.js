class Camera{

    update(Entity, Engine){
        if(Entity){
            var startX = Entity._get_midpoint()[0] - (Engine.rendersize[0] / 2)
            var startY = Entity._get_midpoint()[1] - (Engine.rendersize[1] / 2)
    
            var endX = startX + Engine.rendersize[0];
            var endY = startY + Engine.rendersize[1];
            var entities = Engine.get_entitites_from_range([startX, startY], [endX, endY])
            Object.entries(entities).forEach(entry => {
                    var entity = entry[1]
                    var x = (entity.position[0] - startX)
                    var y = (entity.position[1] - startY)
                    var _x = x + (entity._get_size_x() / 2) 
                    var _y = y + (entity._get_size_y() / 2) ;
                    Engine.ctx.save();  
                    Engine.ctx.translate(_x, _y);
                    Engine.ctx.rotate(entity.rotation * Math.PI / 180);
                    Engine.ctx.translate(-_x, -_y);
                    Engine.ctx.drawImage(Engine.rasterizer.get_cached_img(entity), x, y); /**/
                    Engine.ctx.restore();       
            })
        }

        return entities;
    }

    
}
export default Camera