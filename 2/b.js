import { promises as fs } from 'fs'
import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url)

let inputText = await fs.readFile(path.join(path.dirname(__filename), 'input.txt'), 'utf-8')
let input = inputText.split(/\n/mg)
    .map(line => line.split(' '))

let total = input.reduce((accumulator, line) => {
    let move = line[0].charCodeAt(0) - 65
    let outcome = line[1].charCodeAt(0) - 88
    return accumulator + (move + outcome + 2) % 3 + 1 + (outcome * 3)
}, 0)

console.log(total)