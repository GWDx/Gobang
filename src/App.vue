<script>
    import { n, board, win, colorIndex, getBoard, addChessman, init } from './App.js'
    import { play } from './machine'

    const indexToColor = ['', 'black', 'white']

    let machinePlayPosition = play(board)
    addChessman(machinePlayPosition)

    export default {
        data() {
            return { board: board, colorIndex: colorIndex, indexToColor: indexToColor, n: n, win: win }
        },
        methods: {
            clickChessman(index) {
                if (board[index] !== 0 || win) return

                console.log('click ' + index)
                let winner = addChessman(index)
                if (winner) console.log(indexToColor[winner] + ' win')
                else {
                    machinePlayPosition = play(board)
                    winner = addChessman(machinePlayPosition)
                    if (winner) console.log(indexToColor[winner] + ' win')
                }
                this.board = board.slice()
                this.colorIndex = colorIndex
                this.win = win
            }
        }
    }
</script>

<template>
    <div class="box">
        <div class="squareGrid">
            <div class="square" v-for="(x, j) in Array((n - 1) ** 2)" :key="j"></div>
        </div>

        <div class="chessmanGrid">
            <div class="chessmanSquare" v-for="(x, i) in Array(n ** 2)" :key="i">
                <div class="chessmanClickArea" @click="clickChessman(i)">
                    <div class="chessman" v-if="board[i]" :style="{ background: indexToColor[board[i]] }"></div>
                </div>
            </div>
        </div>

        <div class="winInfo" v-if="win">{{ indexToColor[win] }} win</div>
    </div>
</template>

<style scoped>
    .box {
        position: relative;
        left: 75px;
        top: 75px;
        width: fit-content;
        height: fit-content;
    }
    .squareGrid {
        position: relative;
        display: grid;
        grid-template-columns: repeat(14, 1fr);
        grid-template-rows: repeat(14, 1fr);
        width: 1400px;
        height: 1400px;
        border: solid 1px lightgray;
    }
    .square {
        font-size: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: solid 1px lightgray;
    }
    .chessmanGrid {
        position: relative;
        left: -50px;
        top: -1450px;
        display: grid;
        grid-template-columns: repeat(15, 1fr);
        grid-template-rows: repeat(15, 1fr);
        width: 1500px;
        height: 1500px;
        border: solid 1px gray;
    }
    .chessmanSquare {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .chessmanClickArea {
        width: 60%;
        height: 60%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .chessman {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: solid 3px gray;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .winInfo {
        position: relative;
        top: -1400px;
        font-size: 50px;
        text-align: center;
    }
</style>
