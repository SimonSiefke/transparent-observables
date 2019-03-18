var estraverse = require('estraverse')
var escodegen = require('escodegen')
var esprima = require('esprima')
const fs = require('fs')
// TODO: observable for primitive expressions
// TODO: string or number
var a = esprima.parse(`let x=0;let y = x+1;
`)
// 'function bar(){ var longVariable; console.log("foo", longVariable);}'

let data = {}
let unstring = {}
let watchers = []
estraverse.replace(a, {
  enter: function(node, parent) {
    // read variables
    if (node.type === 'MemberExpression') {
      if (node.property.name === '__value__') {
        return node
      }

      return {
        type: 'MemberExpression',
        computed: false,
        object: {
          type: 'MemberExpression',
          computed: false,
          object: node.object, // original object (e.g. obj.a)
          property: { type: 'Identifier', name: '__value__' },
        },
        property: node.property, // original property (e.g. 'a')
      }
    }

    // declare variables
    if (
      parent.type === 'Property' &&
      parent.key &&
      parent.key.name === '__value__'
    ) {
      return node
    }
    if (node.type === 'VariableDeclaration') {
      for (const declaration of node.declarations) {
        declaration.init.type //?
        declaration //?
        switch (declaration.init.type) {
          case 'Literal':
            data[declaration.id.name] = declaration.init.value
            declaration.id.name //?
            declaration.init.value //?
            break
          case 'Identifier':
            data[declaration.id.name] = null
            declaration
            watchers.push(
              `() => {data.${declaration.id.name} = data.${
                declaration.init.name
              }}`
            )
            break
          case 'BinaryExpression':
            declaration
            let left
            let right
            declaration.init.left //?
            switch (declaration.init.left.type) {
              case 'Literal':
                left = declaration.init.left.value
                break
              case 'Identifier':
                left = declaration.init.left.name
              default:
                break
            }
            switch (declaration.init.right.type) {
              case 'Literal':
                right = declaration.init.right.value
                break
              case 'Identifier':
                right = declaration.init.right.name
              default:
                break
            }
            // if (declaration.init.left.type === 'Literal') {
              data[declaration.id.name] = `${left} ${
                declaration.init.operator
              } ${right}`

              unstring[declaration.id.name]=true
            // }
            declaration //?

            break
          default:
            break
        }

        declaration.init //?
      }
      node.declarations //?
      // // esprima.parseModule
      // node.declarations[0].init //?
      // data[node.declarations[0].id.name] = node.declarations[0].init.value
      return {
        type: 'VariableDeclaration',
        kind: 'let',
        declarations: node.declarations,
      }
    }
    if (node.type === 'Literal') {
      node //?
      // node.declarations[0].init //?
      // data[node.declarations[0].id.name] = 'ok'
      // return {
      //   type: 'VariableDeclaration',
      //   kind: 'let',
      //   declarations: node.declarations,
      // }
    }
    // node.type //?
    // if (node.type === 'Literal') {
    //   return {
    //     type: 'ObjectExpression',
    //     properties: [
    //       {
    //         type: 'Property',
    //         key: { type: 'Identifier', name: '__value__' },
    //         computed: false,
    //         value: node, // new value is the old literal (primitive) node
    //         kind: 'init',
    //         method: false,
    //         shorthand: false,
    //       },
    //     ],
    //   }
    // }
  },
})

var js = escodegen.generate(a)
console.log(js)
data
watchers

const generated_Data = `let data = ${JSON.stringify(data)}` //?
const generated_Watchers = `const watchers = [${watchers.join(',')}]` //?
const generated_HelperCode = `let target = null

// This is exactly the same Dep class
class Dep {
  private subscribers: Set<any>
  constructor() {
    this.subscribers = new Set()
  }
  depend() {
    if (target && !this.subscribers.has(target)) {
      // Only if there is a target & it's not already subscribed
      this.subscribers.add(target)
    }
  }
  notify() {
    this.subscribers.forEach(sub => sub())
  }
}

let deps = new Map()
// Go through each of our data properties
Object.keys(data).forEach(key => {
  deps.set(key, new Dep())
})

let originalData = data

data = new Proxy(originalData, {
  get(obj, key) {
    if(deps.get(key)){
      deps.get(key).depend()
      return obj[key]
    } else {
      console.error(\`-> no variable with given key \`)
    }
  },
  set(obj, key, newValue) {
    obj[key] = newValue
    deps.get(key).notify()
    return true
  },
})

function watcher(fn) {
  target = fn
  target()
  target = null
}

console.log(data)
watchers.forEach(fn => watcher(fn))
console.log(data)
`
const generated_Code = `${generated_Data}\n${generated_Watchers}\n${generated_HelperCode}` //?
// eval(generated_Code)
fs.writeFileSync('./output.ts', generated_Code)
