#! /usr/bin/env node
/* eslint-disable import/no-unresolved */
import program from 'commander'
import * as fs from 'fs'
import { compile } from '@relevant/compiler'

program
  .version(require('../package.json').version)
  .on('--help', () => {
    console.log('')
    console.log('Example:')
    console.log('  $ relevant index.ui')
  })
  .parse(process.argv)

const files = program.args

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

for (const file of files) {
  if (!file.endsWith('.ui')) {
    throw new Error('file must end with ".ui"')
  }
  const fileContent = fs.readFileSync(file, 'utf-8')
  fs.writeFileSync(`dist/${file.replace(/ui$/, 'js')}`, compile(fileContent))
}
