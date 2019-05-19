/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

const folders = fs.readdirSync(path.join(__dirname, 'fixtures'))

if (!fs.existsSync(path.join(__dirname, 'generated'))) {
  fs.mkdirSync(path.join(__dirname, 'generated'))
}

for (const folder of folders) {
  fs.writeFileSync(
    path.join(__dirname, 'generated', `${folder}.test.js`),
    `
const fs = require('fs')
const path = require('path')
const { compile } = require('../../dist/compile.js')

const folderPath = path.join(__dirname, '..', 'fixtures', '${folder}')

test('${folder}', () => {
  const input = fs.readFileSync(path.join(folderPath, 'input.txt'), 'utf-8')
  const output = compile(input)
  const expected = fs.readFileSync(path.join(folderPath, 'expected.js'), 'utf-8')
  expect(output).toBe(expected)
})
`.trimLeft()
  )
}
