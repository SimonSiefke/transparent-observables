/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable no-continue */
const emptyLineRE = /^\s*$/
const expressionRE = /^\s*(console|window|return|localStorage)/
const commentRE = /^\/\//
const exportRE = /^\s*export/
const functionInvocationRE = /^\s*[a-zA-Z]+\(/
const endOfBlockRE = /^\s*}/

function isInputValue(code: string): boolean {
  return code.endsWith('.value')
}

function getVariables(code: string): any[] {
  return code
    .replace(/'[^']*'/g, '') // single quote strings
    .replace(/"[^"]*"/g, '') // double quote strings
    .replace(/\d+/g, '') // numbers
    .replace(/`[^$`]*(\${([^}]*)})*.*/g, '$2') // variables inside template string
    .replace(/\.\.\./g, '') // rest/spread
    .replace(/\.[^,]*/g, '')
    .split(/[+\-*/[\],{}<>\\(\\)=`]/)
    .map(variable => variable.trim())
    .filter(Boolean)
}

// getVariables("document.querySelector('input').value") // ?
export function compile(file: string): string {
  const lines = file.split('\n')
  const assigned = new Set()
  const exportAssigned = new Set()
  const assignedExpressions = new Set()
  const rightVariables = new Set()

  const update = []
  const variablesCode = []

  for (const line of lines) {
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

    // eslint-disable-next-line prefer-const
    let [left, middle, right] = line.split(/(=)(.+)/)

    const leftTrimmed = left.trim()

    if (middle === '=') {
      const variables = getVariables(right) // ?
      if (isInputValue(right.trim())) {
        const selector = right.trim().replace(/\.value$/, '')
        const selectorIdentifier = `selector${Math.floor(Math.random() * 1000)}`
        variablesCode.push(`const ${selectorIdentifier} = ${selector}`)
        variablesCode.push(`${selectorIdentifier}.addEventListener('input', event => {
          ${left} = event.target.value; invalidate('${leftTrimmed}')
        })`)
        right = `${selectorIdentifier}.value`
        update.push(
          `if(dirty.has('${leftTrimmed}')){${selectorIdentifier}.value =${leftTrimmed};}`
        )
        assignedExpressions.add(leftTrimmed)
        rightVariables.add(leftTrimmed)
      }
      // if (assignedExpressions.has(leftTrimmed)) {
      // throw new Error(
      //   `Error on line ${i +
      //     1}: cannot reassign variable ${leftTrimmed} because it is bound to an expression`
      // )
      // }
      if (
        variables.filter(variable => variable !== 'document').length > 0 &&
        !variables.includes(leftTrimmed)
      ) {
        assignedExpressions.add(leftTrimmed)
        update.push(
          `if(${variables
            .map(
              (variable: any) => `dirty.has('${variable.replace(/'/g, "\\'")}')`
            )
            .join(
              '||'
            )}){${leftTrimmed} =${right};invalidate('${leftTrimmed.replace(
            /'/g,
            "\\'"
          )}')}`
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

compile(
  `document.querySelector('#todos').innerHTML = \`<ul>\${todosHTML.join('\n')}</ul>\``
) // ?
