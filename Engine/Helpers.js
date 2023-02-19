export var Helpers = {
    build_grid(sizex, sizey, element_size){
        var state = true;
        var size = [sizex, sizey]
        var element_size = [element_size, element_size];
        var normalized_size = [size[0] * element_size[0], size[1] * element_size[1]]
        var arr = new Array(normalized_size[1] + 1).fill('0').map(() => new Array(normalized_size[0]).fill('0'));
        for(var x = 0; x <= normalized_size[0]; x += element_size[0]){
            for(var y = 0; y < normalized_size[1]; y++){
                arr[y][x] = 'wht'
            }
        }
        for(var x = 0; x <= normalized_size[0]; x++){
            for(var y = 0; y <= normalized_size[1]; y += element_size[1]){
                arr[y][x] = 'wht'
            }
        }
        console.log(arr)
        return arr
    },

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
    },

    appendArray(x,y, arr, array){
        var arrheight = arr[0].length
        var arrwidth = arr.length
        var arrayheight = array[0].length
        var arraywidth = array.length

        var startX = x;
        var startY = y;
        var endX = arraywidth + x;
        var endY = arrayheight + y;

        //console.log(`startX: ${startX} startY: ${startY} endX: ${endX} endY: ${endY}`)
        for(var i = startY; i < endY; i++){
            for(var j = startX; j < endX; j++){
                arr[j][i] = array[j - x][i - y]
            }
        }

        return arr;
    },

    AddPadding2(array, padding){
        var s = (array.length >= array[0].length) ? array.length + padding*2 : array[0].length + padding*2;


        var nA = new Array(s).fill(null).map(() => new Array(s).fill('0'));
        var _ax = (nA[0].length / 2) - (array[0].length / 2)
        var _ay = (nA.length / 2) - (array.length / 2)
        console.log(nA)
        console.log(array)
        array = this.appendArray(_ax, _ay, nA, array)
        return array;
    },

    rotate2dArray(array, angle, center) {

        array = this.AddPadding2(array, 5)

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
              row.push('0');
            }
          }
          rotated.push(row);
        }
        console.log(this.trimArray(rotated))
        return this.trimArray(rotated);
    },

    Outline(sprite, color){
        sprite = this.AddPadding(sprite, 1)
        let newSprite = JSON.parse(JSON.stringify(new Array(sprite.length).fill(null).map(() => new Array(sprite[0].length).fill('0'))));
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
    },

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
    },
    
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
    },

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
    },

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
    },

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
    },

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
    },

    debounce(func, timeout){
        let timer;
        return () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, arguments)
            }, timeout)
        }
    },

    runOnce(func, timeout) {
        let hasRun = false;
        return function() {
          if (!hasRun) {
            func.apply(this, arguments);
            hasRun = true;
            if(timeout == false) return;
            setTimeout(() => {
              hasRun = false;
            }, timeout);
          }
        };
      }
}