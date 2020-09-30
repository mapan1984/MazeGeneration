import Grid from './grid.js'


class Dungeon {
    constructor(width, height, gridSize, mapId) {
        this.width = width
        this.height = height
        this.gridSize = gridSize
        this.xMax = Math.floor(this.width / this.gridSize)  // cols
        this.yMax = Math.floor(this.height / this.gridSize)  // rows
        this._canvas = document.querySelector(mapId)
        this._canvas.width = width
        this._canvas.height = height

        this.context = this._canvas.getContext('2d')

        this.init()
    }

    init() {
        this.initGrids()

        this.current = this.grids[0][0]
        this.current.visited = true

        this.visited = [this.current]
    }

    clean() {
        this.context.clearRect(0, 0, this.width, this.height)
    }

    initGrids() {
        this.grids = []
        for (let y = 0; y < this.yMax; y++) {
            let row = []
            for (let x = 0; x < this.xMax; x++) {
                let grid = new Grid(x, y)
                row.push(grid)
            }
            this.grids.push(row)
        }
    }

    neighbors(grid) {
        let x = grid.x
        let y = grid.y

        let locations = []
        if (x - 1 >= 0) {
            locations.push([x - 1, y])
        }
        if (y - 1 >= 0) {
            locations.push([x, y - 1])
        }
        if (x + 1 < this.xMax) {
            locations.push([x + 1, y])
        }
        if (y + 1 < this.yMax) {
            locations.push([x, y + 1])
        }

        let res = []
        for (let [x, y] of locations) {
            if (!this.grids[y][x].visited) {
                res.push(this.grids[y][x])
            }
        }
        return res
    }

    line(x1, y1, x2, y2) {
        this.context.beginPath()
        this.context.moveTo(x1 * this.gridSize, y1 * this.gridSize)
        this.context.lineTo(x2 * this.gridSize, y2 * this.gridSize)
        this.context.strokeStyle = '#FF0000'
        this.context.stroke()
    }

    show() {
        for (let rows of this.grids) {
            for (let grid of rows) {
                if (grid.top) {
                    this.line(grid.x, grid.y, grid.x + 1, grid.y)
                }
                if (grid.right) {
                    this.line(grid.x + 1, grid.y, grid.x + 1, grid.y + 1)
                }
                if (grid.bottom) {
                    this.line(grid.x + 1, grid.y + 1, grid.x, grid.y + 1)
                }
                if (grid.left) {
                    this.line(grid.x, grid.y + 1, grid.x, grid.y)
                }

                if (grid.visited) {
                    this.context.fillStyle = '#00FF00'
                    this.context.fillRect(
                        grid.x * this.gridSize,
                        grid.y * this.gridSize,
                        this.gridSize,
                        this.gridSize
                    )

                }

                if (this.current.equal(grid)) {
                    this.context.fillStyle = '#0000FF'
                    this.context.fillRect(
                        grid.x * this.gridSize,
                        grid.y * this.gridSize,
                        this.gridSize,
                        this.gridSize
                    )
                }
            }
        }
    }

    break(current, next) {
        let xDirection = current.x - next.x
        let yDirection = current.y - next.y

        if (xDirection === 1) {
            current.left = false
            next.right = false
        } else if (xDirection === -1) {
            current.right = false
            next.left = false
        }

        if (yDirection === 1) {
            current.top = false
            next.bottom = false
        } else if (yDirection === -1) {
            current.bottom = false
            next.top = false
        }
    }

    update() {
        let neighbors = this.neighbors(this.current)
        if (neighbors.length > 0) {
            let next = neighbors[Math.floor(Math.random() * neighbors.length)]
            next.visited = true
            this.visited.push(next)

            this.break(this.current, next)

            this.current = next
        } else if (this.visited.length > 0) {
            this.current = this.visited.pop()
        }
    }
}

export default Dungeon
