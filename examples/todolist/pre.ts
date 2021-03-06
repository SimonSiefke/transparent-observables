import * as fs from 'fs'
import * as path from 'path'
import { compile } from '@relevant/compiler'

const exampleCode = fs.readFileSync(
  path.join(__dirname, './src/todolist.ui'),
  'utf-8'
)

if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  fs.mkdirSync(path.join(__dirname, 'dist'))
}
const generatedCode = compile(exampleCode)
fs.writeFileSync(path.join(__dirname, 'dist', 'todolist.ts'), generatedCode)
