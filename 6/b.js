import { promises as fs } from 'fs'
import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url)

let inputText = await fs.readFile(path.join(path.dirname(__filename), 'input.txt'), 'utf-8')
let indices = inputText.split(/\n/)
    .map(line => [...line].findIndex((_, i) => new Set([...line].slice(i, i + 14)).size == 14) + 14)

console.log(indices)