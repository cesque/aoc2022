import { promises as fs } from 'fs'
import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url)

let inputText = await fs.readFile(path.join(path.dirname(__filename), 'bigboy.txt'), 'utf-8')

let fileSystem = {name: '', type: 'dir', children: []}
let filePath = []

for(let line of inputText.split(/\n/)) {
    let cd = line.match(/\$ cd (.*)/)
    if(cd) {
        if(cd[1] == '..') {
            filePath = filePath.slice(0, -1)
        } else if(cd[1] == '/') {
            filePath = []
        } else {
            filePath = [...filePath, cd[1]]
        }
    } else {
        if(/\$ ls/.test(line)) continue

        let current = filePath.reduce((p, c) => {
            return p.children.find(x => x.type == 'dir' && x.name == c)
        }, fileSystem)

        let dirRegex = line.match(/dir (.*)/)

        if(dirRegex) {
            let dir = dirRegex[1]
            current.children.push({name: dir, type: 'dir', children: []})
        } else {
            let statRegex = line.match(/(\d+) (.*)/)
            let size = statRegex[1]
            let name = statRegex[2]

            current.children.push({name, type: 'file', size})
        }
    }
}

function print(node, indent = 0) {
    let indentSize = 2
    let indentString = ''.padStart(indentSize * indent)
    if(node.type == 'file') {
        console.log(`${ indentString }${ node.name } (${ node.size })`)
    } else {
        console.log(`${ indentString }${ node.name }/`)
        for(let child of node.children) {
            print(child, indent + 1)
        }
    }
}

function size(node) {
    return node.type == 'file' ? +node.size : node.children.reduce((p, c) => p + size(c), 0)
}

function list(node, condition) {
    let c = condition(node) ? [node] : []
    let rest = node.type == 'dir'
        ? node.children.reduce((p, c) => p.concat(list(c, condition)), [])
        : []

    return c.concat(rest)
}

let totalSize = size(fileSystem)
let result = list(fileSystem, item => item.type == 'dir')
    .map(node => 0||{ name: node.name, size: size(node) })
    .filter(x => (totalSize - x.size) < (3e9 - 7e8)) // 7e7 - 3e7 for normal input
    .filter(x => x.name != '')
    .reduce((p, c) => p.size < c.size ? p : c, { size: Infinity })
    .size


// print(fileSystem)
console.log()
console.log(result)