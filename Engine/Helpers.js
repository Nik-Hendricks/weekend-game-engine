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
}