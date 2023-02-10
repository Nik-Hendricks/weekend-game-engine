import Vec2 from '/Engine/Vec2.js'

export default class Polygon{
    constructor(pixels){
        this._vertices = []
        this.vertices = [];
        this.generate(this.trimArray(pixels));
        //console.log(this.generatePolyLine(pixels))
    }

    generate(pixels){
        this.vertices = this.generatePolyLine(pixels, 6);
        this._vertices = this.vertices
    }

    translate( x, y) {
        const translatedVertices = [];
        for (let i = 0; i < this.vertices.length; i++) {
            translatedVertices[i] = new Vec2(this.vertices[i].x + x, this.vertices[i].y + y);
        }
        return translatedVertices;
    }

    transform(vertices, rotation, position, pixel_size) {
        rotation =  rotation * (Math.PI/180);
        let transformedShape = [];
        for (let i = 0; i < vertices.length; i++) {
            let x = vertices[i].x * Math.cos(rotation) - vertices[i].y * Math.sin(rotation) + position.x;
            let y = vertices[i].x * Math.sin(rotation) + vertices[i].y * Math.cos(rotation) + position.y;
            transformedShape.push(new Vec2(x, y));
        }
        return this.scalePolyLine(transformedShape, pixel_size)
    }

    generatePolyLine(outline_pixels, detail){
        var PolyLine = [];
        for(var x = 0; x < outline_pixels.length; x++){
            for(var y = 0; y < outline_pixels[x].length; y++){
                if(outline_pixels[x][y] !== '0'){
                    PolyLine.push(new Vec2(x, y))
                }
            }
        }
        //return this.orderVertices(this.simplifyPolyline(PolyLine, detail));
        //return PolyLine
        return this.sortVec2Array(this.simplifyVectors(this._simplifyPolyline(PolyLine, detail)))
    }

    simplifyVectors(vectors) {
        let result = [vectors[0]];
        for (let i = 1; i < vectors.length; i++) {
          let v1 = result[result.length - 1];
          let v2 = vectors[i];
          if (!this.isCollinear(v1, v2)) {
            result.push(v2);
          }
        }
        return result;
    }
      
    isCollinear(v1, v2) {
        let x1 = v1[0];
        let y1 = v1[1];
        let x2 = v2[0];
        let y2 = v2[1];
        return x1 * y2 === x2 * y1;
    }

    _simplifyPolyline(points, epsilon) {
        let dmax = 0;
        let index = 0;
        let end = points.length - 1;
    
        for (let i = 1; i < end; i++) {
            let d = this.perpendicularDistance(points[i], points[0], points[end]);
            if (d > dmax) {
                index = i;
                dmax = d;
            }
        }
    
        if (dmax > epsilon) {
            let res1 = this._simplifyPolyline(points.slice(0, index + 1), epsilon);
            let res2 = this._simplifyPolyline(points.slice(index, end + 1), epsilon);
            return res1.slice(0, res1.length - 1).concat(res2);
        } else {
            return [points[0], points[end]];
        }
    }

    perpendicularDistance(point, start, end) {
        let dx = end.x - start.x;
        let dy = end.y - start.y;
        let norm = Math.sqrt(dx * dx + dy * dy);
        return Math.abs(dy * point.x - dx * point.y + end.x * start.y - end.y * start.x) / norm;
    }
    
    sortVec2Array(vec2Array) {
        const center = vec2Array.reduce((acc, curr) => ({
          x: acc.x + curr.x,
          y: acc.y + curr.y
        }), { x: 0, y: 0 });
        center.x /= vec2Array.length;
        center.y /= vec2Array.length;
      
        vec2Array.sort((a, b) => {
          if (a.y < center.y && b.y >= center.y)
            return -1;
          if (b.y < center.y && a.y >= center.y)
            return 1;
          if (a.y === center.y && b.y === center.y) {
            if (a.x < center.x && b.x >= center.x)
              return -1;
            if (b.x < center.x && a.x >= center.x)
              return 1;
            return 0;
          }
          const det = (a.x - center.x) * (b.y - center.y) - (b.x - center.x) * (a.y - center.y);
          if (det < 0)
            return -1;
          if (det > 0)
            return 1;
          return 0;
        });
        vec2Array.push(vec2Array[0])
        return vec2Array;
    }
    
    simplifyPolyline(polyline, detail) {
        if (polyline.length <= 2) {
            return polyline;
        }
    
        function getPointLineDistance(point, start, end) {
            const A = point.x - start.x;
            const B = point.y - start.y;
            const C = end.x - start.x;
            const D = end.y - start.y;
    
            const dot = A * C + B * D;
            const len_sq = C * C + D * D;
            let param = -1;
            if (len_sq != 0) {
                param = dot / len_sq;
            }
    
            let xx, yy;
    
            if (param < 0) {
                xx = start.x;
                yy = start.y;
            }
            else if (param > 1) {
                xx = end.x;
                yy = end.y;
            }
            else {
                xx = start.x + param * C;
                yy = start.y + param * D;
            }
    
            const dx = point.x - xx;
            const dy = point.y - yy;
            return dx * dx + dy * dy;
        }
    
        function simplifySection(start, end, detail) {
            let maxDist = 0;
            let maxIndex = 0;
    
            for (let i = start + 1; i < end; i++) {
                const dist = getPointLineDistance(polyline[i], polyline[start], polyline[end]);
                if (dist > maxDist) {
                    maxDist = dist;
                    maxIndex = i;
                }
            }
    
            if (maxDist > detail * detail) {
                const results1 = simplifySection(start, maxIndex, detail);
                const results2 = simplifySection(maxIndex, end, detail);
                return results1.concat(results2.slice(1));
            }
            else {
                return [polyline[start], polyline[end]];
            }
        }
    
        return simplifySection(0, polyline.length - 1, detail);
    }

    orderVertices(vertices) {
        if(vertices.length == 0){
            return
        }
        const center = [0, 0];
        for (const vertex of vertices) {
          center[0] += vertex.x;
          center[1] += vertex.y;
        }
        center[0] /= vertices.length;
        center[1] /= vertices.length;
      
        vertices.sort((a, b) => {
          const angleA = Math.atan2(a.y - center[1], a.x - center[0]);
          const angleB = Math.atan2(b.y - center[1], b.x - center[0]);
          return angleA - angleB;
        });
      
        const result = [new Vec2(vertices[0].x, vertices[0].y)];
        for (let i = 1; i < vertices.length; i++) {
          const last = result[result.length - 1];
          const current = vertices[i];
          const next = vertices[(i + 1) % vertices.length];
          const crossProduct = (current.x - last.x) * (next.y - current.y) - (current.y - last.y) * (next.x - current.x);
          if (crossProduct > 0) {
            result.push(new Vec2(current.x, current.y));
          }
        }
        result.push(new Vec2(vertices[0].x, vertices[0].y))
        return result;
    }

    getPolyLineCenterPoint(points) {
        let xSum = 0, ySum = 0;
        for (let i = 0; i < points.length; i++) {
          xSum += points[i].x;
          ySum += points[i].y;
        }
        return new Vec2(xSum / points.length, ySum / points.length);
    }

    scalePolyLine(PolyLine, scaleFactor) {
        var centerPoint = this.getPolyLineCenterPoint(PolyLine);
        var scaledPolyline = [];
        // Step 1: Translate polyline so that centerPoint is at origin
        for (var i = 0; i < PolyLine.length; i++) {
            var translatedPoint = new Vec2(PolyLine[i].x - centerPoint.x, PolyLine[i].y - centerPoint.y);
            // Step 2: Scale the translated polyline
            var scaledPoint = new Vec2(translatedPoint.x * scaleFactor, translatedPoint.y * scaleFactor);
            // Step 3: Translate the scaled polyline back to original centerPoint
            var finalPoint = new Vec2(scaledPoint.x + centerPoint.x, scaledPoint.y + centerPoint.y)
            scaledPolyline.push(finalPoint);
        }
        return scaledPolyline;
    }

    reset(){
        this.vertices = this._vertices
    }

    trimArray(array) {
        let rowStart = 0;
        let rowEnd = array.length - 1;
        let colStart = 0;
        let colEnd = array[0].length - 1;
      
        // find the first non-zero row
        for (let i = 0; i < array.length; i++) {
          let row = array[i];
          let isAllZero = row.every(value => value === '0');
          if (!isAllZero) {
            rowStart = i;
            break;
          }
        }
      
        // find the last non-zero row
        for (let i = array.length - 1; i >= 0; i--) {
          let row = array[i];
          let isAllZero = row.every(value => value === '0');
          if (!isAllZero) {
            rowEnd = i;
            break;
          }
        }
      
        // find the first non-zero column
        for (let i = 0; i < array[0].length; i++) {
          let isAllZero = true;
          for (let j = 0; j < array.length; j++) {
            if (array[j][i] !== '0') {
              isAllZero = false;
              break;
            }
          }
          if (!isAllZero) {
            colStart = i;
            break;
          }
        }
      
        // find the last non-zero column
        for (let i = array[0].length - 1; i >= 0; i--) {
          let isAllZero = true;
          for (let j = 0; j < array.length; j++) {
            if (array[j][i] !== '0') {
              isAllZero = false;
              break;
            }
          }
          if (!isAllZero) {
            colEnd = i;
            break;
          }
        }
      
        // create a new 2D array with the trimmed elements
        let trimmedArray = [];
        for (let i = rowStart; i <= rowEnd; i++) {
          let row = array[i];
          let trimmedRow = row.slice(colStart, colEnd + 1);
          trimmedArray.push(trimmedRow);
        }
      
        return trimmedArray;
    }
}