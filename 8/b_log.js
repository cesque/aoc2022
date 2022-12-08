import { promises as fs } from 'fs'
import path from 'path'
import url from 'url'
import chalk from 'chalk'

const __filename = url.fileURLToPath(import.meta.url)

let inputText = await fs.readFile(path.join(path.dirname(__filename), 'input.txt'), 'utf-8')
let input = inputText.split(/\n/)
    .map(line => line.split('').map(x => +x))

function transpose(m) {
    return m.map((_, y) => m.map(i => i[y]))
}

function flipH(m) {
    return m.map(r => r.map((_, x) => r[r.length - x - 1]))
}

function print(grid) {
    grid.forEach((row, y) => {
        console.log(row.join(''))
    })
}

function score(grid) {
    return grid.map((line, y) => {
        if(y % 10 == 0) process.stdout.write(y + ' ')
        return line.reduce((p, c, i) => {
            p.output.push(p.register[c])
            return {
                // output: [...p.output, {n: c, v: p.register[c], r: p.register.slice()}],
                // output: p.output.concat([p.register[c]]),
                output: p.output,
                register: p.register.map((x, i) => i <= c ? 1 : x + 1)
            }
        }, {output: [], register: new Array(10).fill(0)}).output
    })
}

// let arrays = [
//     { transform: [], get: function(x, y) { return this.grid[y][x] }}, // from left
//     { transform: [transpose], get: function(x, y) { return this.grid[x][y] }}, // from up
//     { transform: [flipH], get: function(x, y) { return this.grid[y][this.grid.length - x - 1] }}, // from right
//     { transform: [transpose, flipH], get: function(x, y) { return this.grid[x][this.grid.length - y - 1] }}, // from down
// ]

let transforms = [
    [],
    [transpose],
    [flipH],
    [transpose, flipH]
]

let totalScores = transforms.map(t => {
    console.log(`getting scores for ${ t.map(x => x.name) }`)
    console.log(`   transforming array`)
    let array = t.reduce((p, c) => c(p), input)
    console.log(`   calculating scores`)
    let scores = score(array)
    console.log()
    console.log(`   untransforming array`)
    let normalised = t.reduceRight((p, c) => c(p), scores)
    console.log(`   finished processing`)
    console.log()

    return normalised
}).reduce((p, c, i) => {
    if(i == 1) console.log(`calculating sum of items`)
    console.log(i + ':')
    return p.map((row, y) => {
        if(y % 1000 == 0) console.log(`   ${ y }`)
        return row.map((item, x) => {
            return item * c[y][x]
        })
    })
}).map((row, y) => Math.max(...row))
    .reduce((p, c) => c > p ? c : p)

console.log(totalScores)

