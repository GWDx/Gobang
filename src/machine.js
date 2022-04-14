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
    for (let x of list) {
        if (x == 1) {
            len++
            if (len == 5)
                return 1
        } else
            len = 0
    }
    return 0
}

let searchCache = {}
// let count = 0

function search(list) {
    if (searchCache[list] !== undefined)
        return searchCache[list]
    if (list.length < 5)
        return 0

    if (check(list)) {
        let all0Length = list.filter(x => x == 0).length
        let ans = 2 ** all0Length
        return ans
    }
    if (list.indexOf(2) >= 0) {
        let split = arraySplit(list, 2)
        let allResult = split.map(array => search(array))
        let sum = allResult.reduce((x, y) => x + y)
        return sum
    }
    const index = list.indexOf(0)
    if (index < 0)
        return check(list)
    let list1 = list.slice()
    list1[index] = 1
    let list2 = list.slice()
    list2[index] = 2

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
    let all0Length = list.filter(x => x == 0).length
    let current = search(list) / 2 ** all0Length
    let assumeResult = Array(list.length).fill(0)
    for (let i = 0; i < list.length; i++)
        if (list[i] === 0) {
            let tempList = list.slice()
            tempList[i] = 1
            assumeResult[i] = search(tempList) / 2 ** (all0Length - 1)
        }
    // let ans = { 'current': current, 'assumeResult': assumeResult }
    let ans = assumeResult.map(x => (1.1 - current) / (1.1 - x))
    return ans
}

function lineEvauate(list) {
    let result1 = lineOneSideEvauate(list)
    let list2 = list.map(x => inverseColorIndex[x])
    let result2 = lineOneSideEvauate(list2)
    let ans = result1.map((x, i) => x + result2[i])
    return ans
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

    let indexScore = Array(n * n).fill(0).map(x => [])

    for (let group of allGroup) {
        for (let indexList of group) {
            let listBoardValue = indexList.map(x => board[x])
            let value = lineEvauate(listBoardValue)
            for (let i = 0; i < indexList.length; i++)
                indexScore[indexList[i]].push(value[i])
        }
    }

    let allSum = indexScore.map(x => x.reduce((x, y) => x + y))
    let maxSum = Math.max.apply(0, allSum)
    let maxIndex = []
    for (let i = 0; i < allSum.length; i++)
        if (maxSum == allSum[i])
            maxIndex.push(i)
    let ans = maxIndex[Math.floor(Math.random() * maxIndex.length)]
    return ans
}

// let line = Array(15).fill(0)
// line[3] = 1
// line[4] = 1
// line[5] = 1
// line[6] = 1
// let ans = lineOneSideEvauate(line)
// console.log(ans)

// console.log(search([1, 1, 1, 1, 0]))

// console.log(lineEvauate(line))
// console.log(count)

export { play }
