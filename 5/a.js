import { promises as fs } from 'fs'
import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url)

let inputText = await fs.readFile(path.join(path.dirname(__filename), 'input.txt'), 'utf-8')

let fullInput = inputText.split(/\n/)
let heap = fullInput.slice(0, fullInput.indexOf('') - 1)
let input = fullInput.slice(fullInput.indexOf('') + 1)

// original heap creation, using indexes of digits in bottom row
// doesn't work for bigboy input due to multi-digit column numbers!

// let indexes = heap.pop()
//     .split('')
//     .map((x, i) => /\w/.test(x) ? i : 0)
//     .filter(x => x)

// heap = heap.map(item => item.split('').filter((x, i) => indexes.includes(i)))

heap = heap.map(item => item.split('').filter((_, i) => (i % 4) == 1))


let newHeap = []
for(let i = 0; i < heap[0].length; i++) {
    newHeap.push(heap.map(item => item[i]).filter(x => x != ' '))
}


for(let instruction of input) {
    let [_,n,from,to] = instruction.match(/(\d+)\D+(\d+)\D+(\d+)/)

    // console.log(`move ${ n } from ${ from } to ${ to }`)

    let items = newHeap[from - 1].slice(0, n)
    let remaining = newHeap[from - 1].slice(n)

    newHeap[from - 1] = remaining

    items.reverse()
    newHeap[to - 1].unshift(...items)
}

console.log(newHeap.map(x => x[0]).join(''))