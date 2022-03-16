import { n, getBoardIndex } from './App.js'

function arraySplit(list, pattern) {
    let from = 0
    let ans = []
    for (let i = 0; i < list.length; i++) {
        if (list[i] === pattern) {
            ans.push(list.slice(from, i))
            from = i + 1
        }
    }
    ans.push(list.slice(from, list.length))
    return ans
}

let inverseColorIndex = { 0: 0, 1: 2, 2: 1 }

function check(list) {
    let len = 0
    for (let i of list) {
        if (list[i] == 1) {
            len++
            if (len == 5)
                return 1
        } else
            len = 0
    }
}

let searchCache = {}
// let count = 0

function search(list) {
    if (searchCache[list] !== undefined)
        return searchCache[list]
    if (list.length < 5)
        return 0
    let index = list.indexOf(0)
    if (index < 0)
        return check(list)
    let list1 = list.slice()
    list1[index] = 1
    let list2 = list.slice(index + 1)

    let answer1
    let prev = 0
    for (let i = index; i >= 0; i--)
        if (list1[i] != 1) {
            prev = i + 1
            break
        }
    if (list1[prev] == 1 && list1[prev + 1] == 1 && list1[prev + 2] == 1 && list1[prev + 3] == 1 && list1[prev + 4] == 1) {
        let number = list1.filter(x => x == 0).length
        answer1 = 2 ** number
    } else
        answer1 = search(list1)
    let answer2 = search(list2)
    let ans = answer1 + answer2
    searchCache[list] = ans
    return ans
}

function lineOneSideEvauate(list) {
    let split1 = arraySplit(list, 2)
    let filter1 = split1.filter(array => array.length >= 5)
    if (filter1.length === 0)
        return 0
    // console.log(filter1)
    let rateList = filter1.map(array => search(array) / 2 ** array.filter(x => x == 0).length)
    // console.log(rateList)
    let max = Math.max(rateList)
    return max
}

function lineEvauate(list) {
    let result1 = lineOneSideEvauate(list)
    let list2 = list.map(x => inverseColorIndex[x])
    let result2 = lineOneSideEvauate(list2)
    return [result1, result2]
}

function play(board) {
    let allGroup = [n, n, 2 * n - 1, 2 * n - 1].map(x => Array(x).fill(0).map(y => []))

    let toGroupIndex = [
        (x, y) => x,
        (x, y) => y,
        (x, y) => x + y,
        (x, y) => x - y + n - 1
    ]

    for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++)
            for (let k = 0; k < 4; k++)
                allGroup[k][toGroupIndex[k](i, j)].push(getBoardIndex(i, j))

    function getValue(group) {
        let boardValue = group.map(list => list.map(x => board[x]))
        let value = boardValue.map(list => lineEvauate(list))
        return value
    }

    let allGroupValue = allGroup.map(group => getValue(group))

    let allSum = Array(n * n)
    for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++) {
            let allValue = []
            for (let k = 0; k < 4; k++) {
                let value = allGroupValue[k][toGroupIndex[k](i, j)]
                allValue.push(value)
            }
            let sum = allValue.map(x => Math.exp(5 * x[0]) + Math.exp(5 * x[1])).reduce((x, y) => x + y)
            allSum[getBoardIndex(i, j)] = sum
        }
    let maxSum = 0
    let maxIndex = 0
    for (let i in allSum)
        if (board[i] == 0 && maxSum < allSum[i]) {
            maxSum = allSum[i]
            maxIndex = i
        }
    console.log(maxIndex)

    return maxIndex
}

// let line = Array(10).fill(0)
// line[3] = 1
// line[4] = 2
// console.log(lineEvauate(line))

// console.log(search(line))
// console.log(count)

// let board = Array(n * n).fill(0)
// board[44] = 1
// board[45] = 2

// play()

export { play }
