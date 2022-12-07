import { promises as fs } from 'fs'
import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url)

let inputText = await fs.readFile(path.join(path.dirname(__filename), 'input.txt'), 'utf-8')
let total = inputText.split(/\n/)
    .reduce((p, c) => {
        return p[0].length == 3 ? [[[...c]], ...p] : [[[...c], ...p[0]], ...p.slice(1)]
    }, [[]])
    .map(group => group[0].filter(x => group[1].includes(x) && group[2].includes(x))[0])
    .map(character => character.charCodeAt(0) - (/[A-Z]/.test(character) ? 38 : 96))
    .reduce((p, c) => p + c) 

console.log(total)