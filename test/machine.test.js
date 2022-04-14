import { n, board, win, colorIndex, getBoard, getBoardIndex, indexToPosition, addChessman, init } from '../src/App.js'
import { play } from '../src/machine.js'
import { expect } from 'chai'

let mid = Math.floor(n / 2)

describe('machine', () => {
    it('1', () => {
        let n = 10
        init()
        for (let i = 0; i < 4; i++) {
            let machinePlayPosition = play(board)
            console.log(indexToPosition(machinePlayPosition))
            addChessman(machinePlayPosition)
            addChessman(machinePlayPosition + 1)
        }
        let machinePlayPosition = play(board)
        console.log(indexToPosition(machinePlayPosition))
        addChessman(machinePlayPosition)

        // expect(win).to.be.equal(true)
    })
})
