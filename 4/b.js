import { promises as fs } from 'fs'
import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url)

let inputText = await fs.readFile(path.join(path.dirname(__filename), 'input.txt'), 'utf-8')

let total = inputText.split(/\n/)
    .map(line => line.split(',').map(item => item.split('-').map(c => +c)))
    .map(item => item.sort((a, b) => (a[1] - a[0]) - (b[1] - b[0])))
    .filter(item => !(item[0][1] < item[1][0] || item[0][0] > item[1][1]))
    .length


console.log(total)
