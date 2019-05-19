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
const util = require('util')
const { compile } = require('../../dist/compile.js')

const readFile = util.promisify(fs.readFile)
const folderPath = path.join(__dirname, '..', 'fixtures', '${folder}')

test('${folder}', async () => {
  const inputPromise = readFile(path.join(folderPath, 'input.txt'), 'utf-8')
  const expectedPromise = readFile(path.join(folderPath, 'expected.js'), 'utf-8')
  const [input, expected] = await Promise.all([inputPromise, expectedPromise])
  const output = compile(input)
  expect(output.trim()).toBe(expected.trim())
})
`.trimLeft()
  )
}
