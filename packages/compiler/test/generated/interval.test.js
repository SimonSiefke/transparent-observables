const fs = require('fs')
const path = require('path')
const util = require('util')
const { compile } = require('../../dist/compile.js')

const readFile = util.promisify(fs.readFile)
const folderPath = path.join(__dirname, '..', 'fixtures', 'interval')

test('interval', async () => {
  const inputPromise = readFile(path.join(folderPath, 'input.txt'), 'utf-8')
  const expectedPromise = readFile(path.join(folderPath, 'expected.js'), 'utf-8')
  const [input, expected] = await Promise.all([inputPromise, expectedPromise])
  const output = compile(input)
  expect(output.trim()).toBe(expected.trim())
})
