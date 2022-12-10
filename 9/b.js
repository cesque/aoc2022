import { promises as fs } from 'fs'
import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url)

let inputText = await fs.readFile(path.join(path.dirname(__filename), 'input.txt'), 'utf-8')
let input = inputText.split(/\n/)
    .map(line => line.split(' '))
    .map(line => { return {direction: line[0], number: +line[1]}})

let rope = new Array(10).fill(0).map(_ => { return {x: 0, y: 0}})
let visited = {}

function follow(head, tail, direction) {
    let result = {x: 0, y: 0}

    let diagonal = direction.x != 0 && direction.y != 0

    if((head.x - tail.x) != 0 && (head.x - tail.x) == direction.x) {
        result.x = direction.x
        let offset = diagonal ? direction.y : 0
        result.y = Math.sign(head.y - tail.y + offset )
    }

    if((head.y - tail.y) != 0 && (head.y - tail.y) == direction.y) {
        result.y = direction.y
        let offset = diagonal ? direction.x : 0
        result.x = Math.sign(head.x - tail.x + offset)
    }

    return result
}

for(let instruction of input) {
    let amount = (instruction.direction == 'U' || instruction.direction == 'L') ? -1 : 1

    for(let _ = 0; _ < instruction.number; _++) {
        let movement = {
            x: (instruction.direction == 'L' || instruction.direction == 'R') ? amount : 0,
            y: (instruction.direction == 'U' || instruction.direction == 'D') ? amount : 0,
        }

        let previous = { x: rope[0].x, y: rope[0].y }

        rope[0].x += movement.x
        rope[0].y += movement.y

        for(let i = 1; i < rope.length; i++) {
            let result = follow(previous, rope[i], movement)
            
            movement = result
            previous = { x: rope[i].x, y: rope[i].y }

            rope[i].x += result.x
            rope[i].y += result.y

        }
        visited[`${ rope[rope.length - 1].x },${ rope[rope.length - 1].y }`] = true
    }
}

console.log(Object.keys(visited).length)