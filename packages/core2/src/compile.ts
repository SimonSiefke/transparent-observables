/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable no-continue */
// import * as fs from 'fs'
// import * as path from 'path'

// const file = fs.readFileSync(path.join(__dirname, './index.txt'), 'utf-8')

export function compile(file: string): string {
  const nonEmptyLineRE = /^([a-zA-Z]+)\s*(<-|<->|=)\s*([^\s]+)\s*/
  const emptyLineRE = /^\s*$/
  const expressionRE = /console/
  const commentRE = /^\/\//

  const lines = file.split('\n')
  const assigned = new Set()
  const assignedExpressions = new Set()
  const rightVariables = new Set()

  function isNumber(code: string): boolean {
    return /\d+/.test(code)
  }
  function getVariables(code: string): any[] {
    return code
      .split(/[+\-*/]/)
      .filter(x => !isNumber(x))
      .map(variable => variable.trim())
  }

  const update = []
  const variablesCode = []

  for (const [i, line] of lines.entries()) {
    if (emptyLineRE.test(line)) {
      continue
    }
    if (commentRE.test(line)) {
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

    const leftTrimmed = left.trim()

    if (middle === '=') {
      const variables = getVariables(right)
      if (assignedExpressions.has(leftTrimmed)) {
        throw new Error(
          `Error on line ${i +
            1}: cannot reassign variable ${leftTrimmed} because it is bound to an expression`
        )
      }
      if (variables.length > 0) {
        assignedExpressions.add(leftTrimmed)
        update.push(
          `if(${variables
            .map((variable: any) => `dirty.${variable}`)
            .join(
              '||'
            )}){${leftTrimmed} =${right};invalidate('${leftTrimmed}')}`
        )
        for (const variable of variables) {
          rightVariables.add(variable)
        }
      }
    }
    if (assigned.has(leftTrimmed)) {
      if (rightVariables.has(leftTrimmed)) {
        variablesCode.push(
          `${leftTrimmed} = ${right}; invalidate('${leftTrimmed}'); update()`
        )
      } else {
        variablesCode.push(`${leftTrimmed} =${right}`)
      }
    } else {
      variablesCode.push(`let ${leftTrimmed} =${right}`)
      assigned.add(leftTrimmed)
    }
  }

  let result = variablesCode.join('\n')

  if (assignedExpressions.size > 0) {
    result = `
let dirty = {}
let scheduledUpdate
function invalidate(variableName, variableValue){
  dirty[variableName] = true
  if(!scheduledUpdate){
    scheduledUpdate = setTimeout(update, 0)
  }
}

${result}

function update(){
  ${update.join('\n  ')}
  dirty={}
}`
  }
  return result
}

// fs.writeFileSync(path.join(__dirname, 'out.js'), result)