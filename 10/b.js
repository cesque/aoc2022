import { promises as fs } from 'fs'
import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url)

let inputText = await fs.readFile(path.join(path.dirname(__filename), 'input.txt'), 'utf-8')
let input = inputText.split(/\n/)

let screen = []

let spriteX = 1
let cycle = 0
let currentOp = ''
let opCycles = 0
while(input.length || opCycles > 0) {
    if(opCycles == 0) {
        if(currentOp.startsWith('addx')) spriteX += +currentOp.split(' ')[1]

        currentOp = input.shift()

        if(currentOp == 'noop') {
            opCycles = 1
        } else {
            opCycles = 2
        }
    }

    let x = cycle % 40

    if(x >= spriteX -1 && x <= spriteX + 1) {
        screen.push('#')
    } else {
        screen.push('.')
    }
    
    cycle++
    opCycles--
}

for(let i = 0; i < screen.length; i++) {
    if(i % 40 == 0) {
        console.log()
    }

    process.stdout.write(screen[i])
}

console.log()