/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable no-continue */
const emptyLineRE = /^\s*$/
const expressionRE = /^\s*(console|window|return|localStorage)/
const commentRE = /^\/\//
const exportRE = /^\s*export/
const functionInvocationRE = /^\s*[a-zA-Z]+\(/
const endOfBlockRE = /^\s*}/

export function compile(file: string): string {
  const lines = file.split('\n')
  const assigned = new Set()
  const exportAssigned = new Set()
  const assignedExpressions = new Set()
  const rightVariables = new Set()

  function isNumber(code: string): boolean {
    return /\d+/.test(code)
  }
  function getVariables(code: string): any[] {
    return code
      .split(/[+\-*/{}$,`[\]]/)
      .filter(x => !isNumber(x))
      .map(variable => variable.trim())
      .filter(Boolean)
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
    if (exportRE.test(line)) {
      variablesCode.push(line.replace('export', 'export let'))
      const leftTrimmed = line
        .split('=')[0]
        .replace('export', '')
        .trim()
      assigned.add(leftTrimmed)
      exportAssigned.add(leftTrimmed)
      continue
    }
    if (functionInvocationRE.test(line)) {
      variablesCode.push(line)
      continue
    }
    if (endOfBlockRE.test(line)) {
      variablesCode.push(line)
      continue
    }

    const [left, middle, right] = line.split(/(=)(.+)/)

    const leftTrimmed = left.trim()

    if (middle === '=') {
      const variables = getVariables(right).filter(
        variable => !variable.startsWith('event')
      )
      if (assignedExpressions.has(leftTrimmed)) {
        throw new Error(
          `Error on line ${i +
            1}: cannot reassign variable ${leftTrimmed} because it is bound to an expression`
        )
      }
      if (variables.length > 0 && !variables.includes(leftTrimmed)) {
        assignedExpressions.add(leftTrimmed)
        update.push(
          `if(${variables
            .map((variable: any) => `dirty.has('${variable}')`)
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
      if (rightVariables.has(leftTrimmed) || exportAssigned.has(leftTrimmed)) {
        variablesCode.push(
          `${leftTrimmed} = ${right}; invalidate('${leftTrimmed}');`
        )
      } else {
        variablesCode.push(`${leftTrimmed} =${right}`)
      }
    } else {
      if (leftTrimmed.startsWith('document')) {
        variablesCode.push(`${leftTrimmed} =${right}`)
      } else {
        variablesCode.push(`let ${leftTrimmed} =${right}`)
      }
      assigned.add(leftTrimmed)
    }
  }

  let result = variablesCode.join('\n')

  if (assignedExpressions.size > 0) {
    result = `
import { updates, invalidate, dirty } from '@relevant/ui'

${result}

function update(){
  ${update.join('\n  ')}
}
updates.push(update)`
  }
  return result
}

// fs.writeFileSync(path.join(__dirname, 'out.js'), result)
