import { n, board, win, color, getBoard, addChessman } from './App.js'


function getBoardIndex(x, y) {
    return x * n + y
}

function test() {
    for (let i = 0; i < 6; i++) {
        if (i == 4)
            i = 4
        addChessman(getBoardIndex(0, i))
        console.log(board)
        addChessman(getBoardIndex(1, i))
        console.log(board)
    }
}

test()
