import { promises as fs } from 'fs'
import path from 'path'
import url from 'url'

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

function score(grid) {
    return grid.map((line, y) => {
        return line.reduce((p, c, i) => {
            p.output.push(p.register[c])
            return {
                output: p.output,
                register: p.register.map((x, i) => i <= c ? 1 : x + 1)
            }
        }, {output: [], register: new Array(10).fill(0)}).output
    })
}

let transforms = [
    [],
    [transpose],
    [flipH],
    [transpose, flipH]
]

let totalScores = transforms.map(t => {
    let array = t.reduce((p, c) => c(p), input)
    let scores = score(array)
    let normalised = t.reduceRight((p, c) => c(p), scores)

    return normalised
}).reduce((p, c, i) => {
    return p.map((row, y) => {
        return row.map((item, x) => {
            return item * c[y][x]
        })
    })
}).map((row, y) => Math.max(...row))
    .reduce((p, c) => c > p ? c : p)

console.log(totalScores)

