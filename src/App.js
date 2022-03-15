const n = 6
let board = Array(n * n).fill('')
let win = false
let color = 'black'

let len
const inverseColor = {
    white: 'black',
    black: 'white'
}

function init() {
    board = Array(n * n).fill('')
    win = false
    color = 'black'
}

function getBoard(x, y) {
    return board[x * n + y]
}

function updateLen(item) {
    for (let i of item)
        if (i < 0 || i >= n)
            return
    let x1, y1, x2, y2;
    [x1, y1, x2, y2] = item
    const cond = getBoard(x1, y1) === getBoard(x2, y2)
    // console.log(cond)
    if (cond) {
        len++
        if (len == 4)
            return true
    } else len = 0;
    return false
}

function addChessman(index) {
    if (board[index] !== '' || win)
        return
    board[index] = color
    let x = Math.floor(index / n)
    let y = index % n
    
    let allUpdate = [[], [], [], []]
    for (let i = -4; i < 4; i++) {
        let u, v
        
        u = x + i
        v = y
        allUpdate[0].push([u, v, u + 1, v])
        
        u = x
        v = y + i
        allUpdate[1].push([u, v + 1, u, v])
        
        u = x + i
        v = y + i
        allUpdate[2].push([u, v, u + 1, v + 1])
        
        u = x + i
        v = y - i
        allUpdate[3].push([u, v, u + 1, v - 1])
    }
    for (let group of allUpdate) {
        // console.log(group)
        len = 0
        for (let item of group) {
            win = updateLen(item)
            if (win)
                return color
        }
    }
    color = inverseColor[color]
    return ''
}

export { n, board, win, color, getBoard, addChessman, init }
