import { n, board, win, colorIndex, getBoard, getBoardIndex, addChessman, init } from '../src/App.js'
import { play } from '../src/machine.js'
import { expect } from 'chai'

let mid = Math.floor(n / 2)

describe('machine', () => {
    it('1', () => {
        init()
        addChessman(play(board))
        addChessman(getBoardIndex(mid, mid - 1))
        addChessman(play(board))
    })
})
