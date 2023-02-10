export default class Vec2 {
    constructor(x, y) {
        if(typeof x == 'object'){
            this.x = x[0]
            this.y = x[1]
        }else{
            this.x = x;
            this.y = y;
        }
    }
  
    subtract(other) {
      return new Vector(this.x - other.x, this.y - other.y);
    }
  
    dot(other) {
      return this.x * other.x + this.y * other.y;
    }
  
    cross(other) {
      return this.x * other.y - this.y * other.x;
    }
  
    normalize() {
      let length = Math.sqrt(this.x * this.x + this.y * this.y);
      this.x /= length;
      this.y /= length;
    }
  
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    add(a, b) {
        return new Vec2(this.x + b.x, a.y + b.y)
    }

    transform(pos){

    }

  }

