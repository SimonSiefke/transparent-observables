const fs = require('fs')
const path = require('path')
const mdFiles = fs
  .readdirSync(path.join(__dirname, 'pages'))
  .filter(file => file.endsWith('.md'))

mdFiles

const words = mdFiles
  // @ts-ignore
  .flatMap(file =>
    fs.readFileSync(path.join(__dirname, 'pages', file), 'utf-8').split(' ')
  )
  .map(word => word.replace(/[,.;.:]/g, ' ').replace(/\s+/g, ''))
  .filter(Boolean)

words.length //?

const percent = `${(words.length / 15000) * 100}%`

percent
