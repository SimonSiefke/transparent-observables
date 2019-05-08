import fs from 'fs'
import path from 'path'

const file = fs.readFileSync(path.join(__dirname, './index.txt'), 'utf-8')

const nonEmptyLineRE = /^([a-zA-Z]+)\s*(<-|<->|=)\s*([^\s]+)\s*/
const emptyLineRE = /^\s*$/
const expressionRE = /console/

const lines = file.split('\n')
const assigned = new Set()


function isNumber(code) {
  return /\d+/.test(code)
}
function getVariables(code) {
  return code.split(/[\+\-\*\/]/).filter(x => !isNumber(x)).map(variable => variable.trim())
}

let update = []
let variablesCode = []

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]

  if (emptyLineRE.test(line)) {
    continue
  }
  if (expressionRE.test(line)) {
    variablesCode.push(line)
    continue
  }
  if (!nonEmptyLineRE.test(line)) {
    throw new Error(`invalid line ${i + 1}`)
  }

  const [left, middle, right] = line.split(/(<-|<->|=)(.+)/)

  const leftName = left.trim()
  if (middle === '=') {
    // update.push(line)
  } else if (middle === '<-') {
    const variables = getVariables(right)
    if (variables.length > 0) {
      update.push(`if(${variables.map(variable => `dirty.${variable}`).join('||')}){${leftName}=${right};invalidate('${leftName}')}`)
    }
  }
  if (assigned.has(leftName)) {
    variablesCode.push(`${leftName} = ${right}; invalidate('${left}'); update()`)
  } else {
    variablesCode.push(`let ${leftName} = ${right}`)
    assigned.add(leftName)
  }
}


const result = `
let dirty = {}
let scheduledUpdate
function invalidate(variableName, variableValue){
  dirty[variableName] = true
  if(!scheduledUpdate){
    scheduledUpdate  = setTimeout(update, 0)
  }
}

${variablesCode.join('\n')}
function update(){
  ${update.join('\n  ')}
  dirty={}
}
`


update

result

// eval(result)

fs.writeFileSync(path.join(__dirname, 'out.js'), result)