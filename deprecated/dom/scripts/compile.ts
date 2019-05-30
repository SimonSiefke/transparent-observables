import * as fs from 'fs'
import * as path from 'path'
import * as util from 'util'
import { compile } from '../../core/src/compile'

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const sourceFiles = fs.readdirSync(path.join(__dirname, '../src'))

if (!fs.existsSync(path.join(__dirname, '../dist'))) {
  fs.mkdirSync(path.join(__dirname, '../dist'))
}
sourceFiles.map(async file => {
  const content = await readFile(
    path.join(__dirname, `../src/${file}`),
    'utf-8'
  )
  const compiled = compile(content)
  await writeFile(
    path.join(__dirname, `../dist/${file.replace(/\ui$/, 'js')}`),
    compiled
  )
})
