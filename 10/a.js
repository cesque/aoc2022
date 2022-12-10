import { promises as fs } from 'fs'
import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url)

let inputText = await fs.readFile(path.join(path.dirname(__filename), 'input.txt'), 'utf-8')
let input = inputText.split(/\n/)


let strengths = []

let x = 1
let cycle = 0
let currentOp = ''
let opCycles = 0
while(input.length || opCycles > 0) {
    if(opCycles == 0) {
        if(currentOp.startsWith('addx')) x += +currentOp.split(' ')[1]

        currentOp = input.shift()

        console.log(`cycle ${ cycle.toString().padEnd(5) } (${ x.toString().padEnd(3) }): ${ currentOp }`)

        if(currentOp == 'noop') {
            opCycles = 1
        } else {
            opCycles = 2
        }
    }
    
    cycle++
    opCycles--

    if(cycle % 40 == 20) {
        console.log(cycle, x, cycle * x)
        strengths.push(cycle * x)
    }
}

console.log(strengths.reduce((p, c) => p + c))