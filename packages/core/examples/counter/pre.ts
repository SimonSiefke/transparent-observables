import * as fs from 'fs'
import * as path from 'path'
import { compile } from '../../src/compile'

const exampleCode = fs.readFileSync(
  path.join(__dirname, './src/counter.ui'),
  'utf-8'
)

if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  fs.mkdirSync(path.join(__dirname, 'dist'))
}
const generatedCode = compile(exampleCode).replace('ui', '../../../src/ui')
fs.writeFileSync(path.join(__dirname, 'dist', 'counter.ts'), generatedCode)
