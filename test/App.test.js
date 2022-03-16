import { n, board, win, colorIndex, getBoard, getBoardIndex, addChessman, init } from '../src/App.js'
import { expect } from 'chai'

describe('App', () => {
    it('1', () => {
        init()
        for (let i of [0, 2, 1, 4]) {
            expect(addChessman(getBoardIndex(0, i))).to.be.equal(0)
            expect(addChessman(getBoardIndex(1, i))).to.be.equal(0)
        }
        expect(addChessman(getBoardIndex(0, 0))).to.be.equal(undefined)
        expect(addChessman(getBoardIndex(0, 3))).to.be.equal(1)
        expect(addChessman(getBoardIndex(2, 3))).to.be.equal(undefined)
    })
    it('2', () => {
        init()
        for (let i of [1, 2, 4, 5]) {
            expect(addChessman(getBoardIndex(i - 1, i))).to.be.equal(0)
            expect(addChessman(getBoardIndex(i, i))).to.be.equal(0)
        }
        expect(addChessman(getBoardIndex(0, 0))).to.be.equal(0)
        expect(addChessman(getBoardIndex(3, 3))).to.be.equal(2)
    })
})
