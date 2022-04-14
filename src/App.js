const n = 15
let board = Array(n * n).fill(0)
let win = 0
let colorIndex = 1

let len
const inverseColorIndex = { 0: 0, 1: 2, 2: 1 }

function init() {
    board = Array(n * n).fill(0)
    win = 0
    colorIndex = 1
}

function getBoardIndex(x, y) {
    return x * n + y
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

function indexToPosition(index) {
    let x = Math.floor(index / n)
    let y = index % n
    return [x, y]
}

function addChessman(index) {
    if (board[index] !== 0 || win != 0)
        return
    board[index] = colorIndex
    let x, y;
    [x, y] = indexToPosition(index)

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
        for (let item of group)
            if (updateLen(item)) {
                win = colorIndex
                return colorIndex
            }
    }
    colorIndex = inverseColorIndex[colorIndex]
    return 0
}

export { n, board, win, colorIndex, getBoard, getBoardIndex, addChessman, indexToPosition, init }
