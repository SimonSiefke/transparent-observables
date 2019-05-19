const fs = require('fs')
const path = require('path')
const { compile } = require('../../dist/compile.js')

const folderPath = path.join(__dirname, '..', 'fixtures', 'single_variable')

test('single_variable', () => {
  const input = fs.readFileSync(path.join(folderPath, 'input.txt'), 'utf-8')
  const output = compile(input)
  const expected = fs.readFileSync(path.join(folderPath, 'expected.js'), 'utf-8')
  expect(output).toBe(expected)
})
