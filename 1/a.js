import { promises as fs } from 'fs'
import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url)

let inputText = await fs.readFile(path.join(path.dirname(__filename), 'input.txt'), 'utf-8')
let input = inputText.split(/\n/mg)

let totals = []

let runningTotal = 0
for(let entry of input) {
    if(entry == '') {
        totals.push(runningTotal)
        runningTotal = 0
    } else {
        runningTotal += +entry
    }
}

totals.push(runningTotal)


console.log(Math.max(...totals))

let n = 1
let a = input.reduce((p, c) => c ? [p[0], p[1]+ +c] : [[...p[0], p[1]], 0], [[],0])
    .flat()
    .sort((a, b) => b - a)
    .slice(0, n)
    .reduce((p, c) => p + c)

console.log(a)