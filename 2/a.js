import { promises as fs } from 'fs'
import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url)

let inputText = await fs.readFile(path.join(path.dirname(__filename), 'input.txt'), 'utf-8')
let input = inputText.split(/\n/mg)
    .map(line => line.split(' '))

let total = input.reduce((accumulator, line) => {
    let theirs = line[0].charCodeAt(0) - 65
    let ours = line[1].charCodeAt(0) - 88

    return accumulator + ours + 1 + ((ours + (4 - theirs)) % 3) * 3
}, 0)

console.log(total)

// 0 0 - 1
// 0 1 - 2
// 0 2 - 0
// 1 0 - 0
// 1 1 - 1
// 1 2 - 2


/// old code

// let total = input.reduce((accumulator, line) => {
//     let winner = {
//         A: 'Y',
//         B: 'Z',
//         C: 'X',
//     }

//     let played = line[1]
//     let score = played.charCodeAt(0) - 87
//     let winScore = (line[0].charCodeAt(0) == line[1].charCodeAt(0) - 23) ? 3 :
//         winner[line[0]] == line[1] ? 6 : 0

//     return accumulator + score + winScore
// }, 0)