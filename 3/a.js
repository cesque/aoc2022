import { promises as fs } from 'fs'
import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url)

let inputText = await fs.readFile(path.join(path.dirname(__filename), 'input.txt'), 'utf-8')
let total = inputText.split(/\n/)
    .map(line => [[...line.slice(0, line.length / 2)], [...line.slice(line.length / 2)]])
    .map(item => item[0].filter(x => item[1].includes(x)))
    .map(item => item[0])
    .map(character => character.charCodeAt(0) - (/[A-Z]/.test(character) ? 38 : 96))
    .reduce((p, c) => p + c) 

console.log(total)