import Polygon from '/Engine/Polygon.js';
import Vec2 from '/Engine/Vec2.js';


export class PhysicalObject{
    constructor(_props){
        var props = (typeof _props !== 'undefined') ? _props : {};
        this.acceleration = (typeof props.acceleration !== 'undefined') ? new Vec2(props.acceleration) : new Vec2(0, 0);
        this.direction_vec = (typeof props.direction_vec !== 'undefined') ? new Vec2(props.direction_vec) : new Vec2(0, -1);
        this.mass = this.mass = (typeof props.mass !== 'undefined') ? props.mass : .02;
        this.input_force = new Vec2(this.acceleration.x * this.mass, this.acceleration.y * this.mass);
        this.velocity = new Vec2(this.input_force.x * 0, this.input_force.y * 0);
        this.polygon = new Polygon(props.sprite)
        //console.log(this.shape)
    }

    rotate(deg){
        this.direction_vec = new Vec2(Math.cos((deg - 90) * (Math.PI / 180)), Math.sin((deg - 90)* (Math.PI / 180)))                        
    }

}


export class Physics{
    direction_vec_from_angle(deg){
        return [
            new Vec2(Math.cos((deg - 90)* (Math.PI / 180)), Math.sin((deg - 90)* (Math.PI / 180))),
            new Vec2(Math.cos(deg* (Math.PI / 180)), Math.sin(deg * (Math.PI / 180)))
        ]
    }


    update(Engine, entity, deltaTime){
        if(entity.phys_obj){
            this.applyForce(entity.phys_obj)
            var ix = entity.position.x + entity.phys_obj.input_force.x * deltaTime;
            var iy = entity.position.y + entity.phys_obj.input_force.y * deltaTime;
            entity.position = new Vec2(ix, iy)
            //entity.phys_obj.polygon.vertices = entity.phys_obj.polygon.translate(entity.phys_obj.polygon.vertices, [0, 0])
        }
    }

    draw(Engine){
        Object.entries(Engine.entities).forEach(el => {
          var e = el[1]
          this.drawBoundingBoxes(Engine, e)
        })
    }

    drawBoundingBoxes(Engine, Entity) {
        var polygon = Entity.phys_obj.polygon
          if(typeof polygon.vertices !== 'undefined'){
            //Engine.ctx.save();


            var startX = Entity._get_midpoint().x - (Engine.rendersize.x / 2)
            var startY = Entity._get_midpoint().y - (Engine.rendersize.y / 2)

            var x = Entity.render_position.x - (Engine.follow_entity.render_position.x - Engine.rendersize.x / 2) - (Entity._get_render_size().x / 2) 
            var y = Entity.render_position.y - (Engine.follow_entity.render_position.y - Engine.rendersize.y / 2) - (Entity._get_render_size().y / 2)
            var v = new Vec2(x, y)
    
            this.draw_point(Engine, v, 'blue')
            Engine.ctx.beginPath();
            polygon.transform(polygon.vertices, Entity.rotation + 90, v, Entity.pixel_size).forEach(point => {                
              this.draw_point(Engine, new Vec2(point.x, point.y), 'green');
              this.draw_line(Engine, point.x, point.y, 'red')
            })
            console.log(Engine.gameToScreen(polygon.getPolyLineCenterPoint(polygon.vertices)))
            this.draw_point(Engine, Engine.gameToScreen(polygon.getPolyLineCenterPoint(polygon.vertices)), 'blue');
            //Engine.ctx.restore()
          }
    }

    applyForce(physical_object){
        physical_object.input_force = new Vec2(Math.floor(physical_object.acceleration.x * physical_object.mass), Math.floor(physical_object.acceleration.y * physical_object.mass));
    }

    rotate2dArray(array, angle, center) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const height = array.length;
        const width = array[0].length;
      
        const rotated = [];
        for (let y = 0; y < height; y++) {
          const row = [];
          for (let x = 0; x < width; x++) {
            const xDiff = x - center[0];
            const yDiff = y - center[1];
            const newX = xDiff * cos - yDiff * sin + center[0];
            const newY = xDiff * sin + yDiff * cos + center[1];
      
            // Check if the rotated pixel is inside the bounds of the original array
            const xIndex = Math.floor(newX);
            const yIndex = Math.floor(newY);
            if (xIndex >= 0 && xIndex < width && yIndex >= 0 && yIndex < height) {
              row.push(array[yIndex][xIndex]);
            } else {
              row.push(0);
            }
          }
          rotated.push(row);
        }
      
        return rotated;
    }
    
    pointInPoint(point1, point2) {
      return point1[0] === point2[0] && point1[1] === point2[1];
    }

    polygonCollision(vertices1, vertices2) {
      // Check if any vertex of polygon1 is inside polygon2
      for (let i = 0; i < vertices1.length; i++) {
        if (this.isPointInsidePolygon(vertices1[i], vertices2)) {
          return true;
        }
      }
    
      // Check if any vertex of polygon2 is inside polygon1
      for (let i = 0; i < vertices2.length; i++) {
        if (this.isPointInsidePolygon(vertices2[i], vertices1)) {
          return true;
        }
      }
    
      // Check if any edge of polygon1 intersects with any edge of polygon2
      for (let i = 0; i < vertices1.length; i++) {
        for (let j = 0; j < vertices2.length; j++) {
          let p1 = vertices1[i];
          let p2 = i + 1 === vertices1.length ? vertices1[0] : vertices1[i + 1];
          let p3 = vertices2[j];
          let p4 = j + 1 === vertices2.length ? vertices2[0] : vertices2[j + 1];
    
          if (this.doLinesIntersect(p1, p2, p3, p4)) {
            return true;
          }
        }
      }
    
      return false;
    }

    isPointInsidePolygon(point, polygon) {
      let isInside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        if (
          (polygon[i].y > point.y) !== (polygon[j].y > point.y) &&
          point.x < ((polygon[j].x - polygon[i].x) * (point.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x)
        ) {
          isInside = !isInside;
        }
      }
      return isInside;
    }

    doLinesIntersect(p1, p2, p3, p4) {
      let denominator = ((p4.y - p3.y) * (p2.x - p1.x)) - ((p4.x - p3.x) * (p2.y - p1.y));
      let numerator1 = ((p4.x - p3.x) * (p1.y - p3.y)) - ((p4.y - p3.y) * (p1.x - p3.x));
      let numerator2 = ((p2.x - p1.x) * (p1.y - p3.y)) - ((p2.y - p1.y) * (p1.x - p3.x));
    
      // Check if the lines are coincident
      if (denominator === 0 && numerator1 === 0 && numerator2 === 0) {
        return true;
      }
    
      // Check if the lines are parallel
      if (denominator === 0) {
        return false;
      }
    
      let r = numerator1 / denominator;
      let s = numerator2 / denominator;
    
      return (r >= 0 && r <= 1) && (s >= 0 && s <= 1);
    }

    draw_line(Engine, pos1, pos2, color){
      Engine.ctx.save()
      Engine.ctx.strokeStyle = color;
      Engine.ctx.lineTo(pos1, pos2)
      Engine.ctx.stroke()
      Engine.ctx.restore()
    }

    draw_point(Engine, point, color){
      Engine.ctx.save()
      Engine.ctx.fillStyle = color;
      Engine.ctx.fillRect(point.x,point.y,4,4)
      Engine.ctx.restore();
    }
      
}