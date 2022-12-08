import { promises as fs } from 'fs'
import path from 'path'
import url from 'url'
import chalk from 'chalk'

const __filename = url.fileURLToPath(import.meta.url)

let inputText = await fs.readFile(path.join(path.dirname(__filename), 'input.txt'), 'utf-8')
console.log('splitting input')
let input = inputText.split(/\n/)
    .map(line => line.split('').map(x => +x))

console.log('finishing splitting input')

function transpose(m) {
    return m.map((_, y) => m.map(i => i[y]))
}

let b = [input, transpose(input)]
let list = [0, 1].map(g => {
    let q = b[g]
    console.log(g ? 'calculating scores for transposed input' : 'calculating scores for normal input')
    return q.map((line, y) => {
        if(y % 1000 == 0) console.log(`   ` + y)
        return ['reduce', 'reduceRight'].map(f => {
            return line[f]((a, c, x) => {
                return (a.length == 0 || a.every(j => j.h < c)) ? [...a, { h: c, x: g ? x : y, y: g ? y : x }] : a
            }, [])
        }).flat()
    }).flat()
}).flat().map(x => {
    // also pretty much as fast as the a2 solution
    delete x.h

    return JSON.stringify(x)
})

let result = new Set(list)

function print(grid, list) {
    grid.forEach((row, y) => {
        console.log(row.map((item, x) => {
            return (list.find(z => z.x == x && z.y == y) ? chalk.bgBlue : chalk.bgBlack)(item)
        }).join(''))
    })
}

console.log()
// print(input, result)
console.log()

console.log(result.size)

