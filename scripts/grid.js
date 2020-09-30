class Grid {
    constructor(x, y, visited = false) {
        this.x = x
        this.y = y
        this.visited = visited

        this.top = true
        this.right = true
        this.bottom = true
        this.left = true
    }

    equal(other) {
        return this.x === other.x && this.y === other.y
    }

}


export default Grid
