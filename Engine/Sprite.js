class Sprite{
    constructor(data){
        this.data = data
    }

    CreateOutline(sprite, color) {
        sprite = this.AddPadding(sprite, 1)
        let newSprite = JSON.parse(JSON.stringify(sprite));
        for (let i = 0; i < sprite.length; i++) {
            for (let j = 0; j < sprite[i].length; j++) {
                if (sprite[i][j] !== '0') {
                    if (i > 0 && sprite[i-1][j] === '0') {
                        newSprite[i-1][j] = color;
                    }
                    if (j > 0 && sprite[i][j-1] === '0') {
                        newSprite[i][j-1] = color;
                    }
                    if (i < sprite.length - 1 && sprite[i+1][j] === '0') {
                        newSprite[i+1][j] = color;
                    }
                    if (j < sprite[i].length - 1 && sprite[i][j+1] === '0') {
                        newSprite[i][j+1] = color;
                    }
                }
            }
        }
        return newSprite;
    }
    
    AddPadding(sprite, padding) {
        let newSprite = new Array(sprite.length + (padding * 2));
        for (let i = 0; i < newSprite.length; i++) {
            newSprite[i] = new Array(sprite[0].length + (padding * 2)).fill('0');
        }
        for (let i = 0; i < sprite.length; i++) {
            for (let j = 0; j < sprite[i].length; j++) {
                newSprite[i + padding][j + padding] = sprite[i][j];
            }
        }
        return newSprite;
    }

    generateCircleSprite1(radius, resolution, color) {
        let circle = new Array(resolution).fill(null).map(() => new Array(resolution).fill(color));
        for (let i = 0; i < resolution; i++) {
            for (let j = 0; j < resolution; j++) {
                let x = (i / resolution) * (radius * 2) - radius;
                let y = (j / resolution) * (radius * 2) - radius;
                if (x ** 2 + y ** 2 > radius ** 2) {
                    circle[i][j] = '0';
                }
            }
        }
        return circle;
    }

    generateCircleSprite2(radius, resolution, color) {
        let circle = new Array(resolution).fill(null).map(() => new Array(resolution).fill(color));
        for (let i = 0; i < resolution; i++) {
            for (let j = 0; j < resolution; j++) {
                let x = (i / resolution) * (radius * 2) - radius;
                let y = (j / resolution) * (radius * 2) - radius;
                let r = radius + Math.random() * (radius / 4) - (radius / 8);
                if (x ** 2 + y ** 2 > r ** 2) {
                    circle[i][j] = '0';
                }
            }
        }
        return circle;
    }

    generateAsteroidSprite(numCircles, maxRadius, circleResolution, resolution, color) {
        let sprite = new Array(resolution).fill(null).map(() => new Array(resolution).fill('0'));
        for (let i = 0; i < numCircles; i++) {
            let radius = Math.random() * maxRadius;
            let x = Math.floor(Math.random() * (resolution - maxRadius));
            let y = Math.floor(Math.random() * (resolution - maxRadius));
            let oblongIrregularCircle = this.generateCircleSprite2(radius, circleResolution, color);
            for (let j = 0; j < resolution; j++) {
                for (let k = 0; k < resolution; k++) {
                    if (j + x >= 0 && j + x < resolution && k + y >= 0 && k + y < resolution && j < circleResolution && k < circleResolution) {
                        if (oblongIrregularCircle[j][k] !== '0') {
                            sprite[j + x][k + y] = oblongIrregularCircle[j][k];
                        }
                    }
                }
            }
        }
        return sprite;
    }



    _generateAsteroidSprite(numCircles, maxRadius, resolution) {
        let sprite = new Array(resolution).fill(null).map(() => new Array(resolution).fill('0'));
        for (let i = 0; i < numCircles; i++) {
            let radius = Math.random() * maxRadius;
            let x = Math.floor(Math.random() * resolution);
            let y = Math.floor(Math.random() * resolution);
            let circle = this.generateCircleSprite(radius, resolution);
            for (let j = 0; j < resolution; j++) {
                for (let k = 0; k < resolution; k++) {
                    if (j + x >= 0 && j + x < resolution && k + y >= 0 && k + y < resolution) {
                        if (circle[j][k] !== '0') {
                            sprite[j + x][k + y] = circle[j][k];
                        }
                    }
                }
            }
        }
        return sprite;
    }

}

export default Sprite