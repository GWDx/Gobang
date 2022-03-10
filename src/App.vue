<template>
    <div class="box">
        <div class="squareGrid">
            <div class="square" v-for="(x, i) in Array(25)" :key="i"></div>
        </div>

        <div class="chessmanGrid">
            <div class="chessmanSquare" v-for="(x, i) in Array(36)" :key="i">
                <div class="chessman"></div>
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
        /* border: solid 1px gray; */
    }
    .chessman {
        width: 40%;
        height: 40%;
        border-radius: 50%;
        border: solid 3px gray;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
