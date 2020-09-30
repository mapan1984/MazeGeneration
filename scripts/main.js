import Game from './game.js'
import Dungeon from './dungeon.js'


let game = new Game()

let dungeon = new Dungeon(500, 500, 25, '#dungeon')

dungeon.show()

game.draw = function() {
    dungeon.clean()
    dungeon.show()
}

game.update = function() {
    dungeon.update()
}

game.reset = function() {
    dungeon.clean()
    dungeon.init()
    dungeon.show()
}

// 按空格开始/暂停
game.registerAction(' ', () => {
    game.taggle.bind(game)()
})

// 按 'r' 重置
game.registerAction('r', game.reset.bind(game))

game.listen()
