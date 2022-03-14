<script>
    import { n, board, win, color, getBoard, addChessman } from './App.js'

    export default {
        data() {
            return { board: board, color: color, n: n }
        },
        methods: {
            clickChessman(i) {
                console.log('click ' + i)
                if (board[i] !== '' || win) return
                addChessman(i)

                console.log(board)
                this.board = board.slice()
                this.color = color
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
                    <div class="chessman" v-if="board[i]" :style="{ background: board[i] }"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .box {
        width: fit-content;
        height: fit-content;
    }
    .squareGrid {
        position: absolute;
        left: 50px;
        top: 50px;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(5, 1fr);
        width: 500px;
        height: 500px;
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
        position: absolute;
        left: 0px;
        top: 0px;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(6, 1fr);
        width: 600px;
        height: 600px;
        border: solid 1px gray;
    }
    .chessmanSquare {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .chessmanClickArea {
        width: 40%;
        height: 40%;
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
</style>
