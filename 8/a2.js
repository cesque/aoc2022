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

let b = [input, transpose(input)]
let result = [0, 1].map(g => {
    let q = b[g]
    return q.map((line, y) => {
        return ['reduce', 'reduceRight'].map(f => {
            return line[f]((a, c, x) => {
                return (a.length == 0 || a.every(j => j.h < c)) ? [...a, { h: c, x: g ? x : y, y: g ? y : x }] : a
            }, [])
        }).flat()
    }).flat()
}).flat().reduce((p, c, i) => {
    // this faster way of making this into a set cuts 20s off bigboy execution
    let key = `${ c.x }-${ c.y }`
    if(!p[key]) p[key] = c

    return p
},{})

console.log(Object.keys(result).length)

