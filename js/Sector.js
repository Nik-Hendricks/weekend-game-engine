class Sector {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.chunks = [];
    }

    addChunk(chunk) {
        this.chunks.push(chunk);
    }

    getChunksInView(viewportX, viewportY, viewportWidth, viewportHeight) {
        const chunksInView = [];
        for (let i = 0; i < this.chunks.length; i++) {
            const chunk = this.chunks[i];
            if (chunk.x >= viewportX && chunk.x + chunk.width <= viewportX + viewportWidth && chunk.y >= viewportY && chunk.y + chunk.height <= viewportY + viewportHeight) {
                chunksInView.push(chunk);
            }
        }
        return chunksInView;
    }
}

class Chunk {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
