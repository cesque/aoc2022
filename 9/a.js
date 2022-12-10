import { promises as fs } from 'fs'
import path from 'path'
import url from 'url'
import chalk from 'chalk'

const __filename = url.fileURLToPath(import.meta.url)

let inputText = await fs.readFile(path.join(path.dirname(__filename), 'bigboy.txt'), 'utf-8')
let input = inputText.split(/\n/)
    .map(line => line.split(' '))
    .map(line => { return {direction: line[0], number: +line[1]}})

function print(head, tail, visited) {
    let minX = Infinity
    let maxX = -Infinity
    let minY = Infinity
    let maxY = -Infinity

    for(let key of Object.keys(visited)) {
        let [x, y] = key.split(',').map(n => +n)

        if(x < minX) minX = x
        if(x > maxX) maxX = x
        if(y < minY) minY = y
        if(y > maxY) maxY = y
    }

    let char = '●'
    for(let y = minY - 1; y <= maxY + 1; y++) {
        let s = ''

        for(let x = minX - 1; x <= maxX + 1; x++) {
            let bg = visited[`${ x },${ y }`] ? chalk.bgBlue : chalk.bgGray
            let c = '·'

            if(head.y == y && head.x == x && tail.y == y && tail.x == x) {
                c = chalk.magenta(char)
            } else if(head.y == y && head.x == x) {
                c = chalk.red(char)
            } else if(tail.y == y && tail.x == x) {
                c = chalk.cyan(char)
            }

            s += bg(c)
        }

        console.log(chalk.bgGray(s))
    }

    console.log()
}

let head = {x: 0, y: 0}
let tail = {x: 0, y: 0}
let visited = {}

let axes = ['x', 'y']

for(let instruction of input) {
    let axisIndex = !(instruction.direction == 'L' || instruction.direction == 'R')

    let axis =  axes[+axisIndex]
    let otherAxis =  axes[1 - +axisIndex]

    let amount = (instruction.direction == 'U' || instruction.direction == 'L') ? -1 : 1

    for(let i = 0; i < instruction.number; i++) {
        if(head[axis] - tail[axis] == amount) {
            tail[axis] += amount
            tail[otherAxis] = head[otherAxis]
        }

        head[axis] += amount

        visited[`${ tail.x },${ tail.y }`] = true
    }
}

console.log(Object.keys(visited).length)