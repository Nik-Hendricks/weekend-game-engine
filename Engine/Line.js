class Line{
    constructor(startx, starty, endx, endy, ctx){
        this.sprite = this.generateLineSprite(startx, starty, endx, endy)
        this.update(ctx);
    }

    generateLineSprite(startX, startY, endX, endY) {
        let sprite = [], x, y, xDiff = endX - startX, yDiff = endY - startY;
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            for (x = startX; x <= endX; x++) {
                y = startY + yDiff * (x - startX) / xDiff;
                sprite.push([Math.round(x), Math.round(y)]);
            }
        } else {
            for (y = startY; y <= endY; y++) {
                x = startX + xDiff * (y - startY) / yDiff;
                sprite.push([Math.round(x), Math.round(y)]);
            }
        }
        return sprite;
    }

    update(engine){
        for(var i = 0; i < this.sprite.length; i++){
            engine.ctx.beginPath();
            engine.ctx.strokeStyle = "blue";
            engine.ctx.rect(this.sprite[i][0], this.sprite[i][1], this.sprite[i][0] + 10, this.sprite[i][1] + 10)
            engine.ctx.stroke();
        }
    }
}

export default Line;