export default function(babel) {
  const { types: t } = babel
  return {
    visitor: {
      VariableDeclaration(path) {
        const newDeclarations = path.node.declarations.map(declaration => {
          const name = declaration.id.name
          const result = t.variableDeclarator(
            declaration.id,
            buildObservableExpression(declaration.init)
          )
          return result
        })
        path.node.declarations = newDeclarations
      },
      AssignmentExpression(path) {
        window.p = path
        console.log(path)
      },
    },
  }
}

function buildObservableExpression(value) {
  return t.callExpression(t.identifier('observable'), [value])
}

function looksLike(a, b) {
  return (
    a &&
    b &&
    Object.keys(b).every(bKey => {
      const bVal = b[bKey]
      const aVal = a[bKey]
      if (typeof bVal === 'function') {
        return bVal(aVal)
      }
      return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal)
    })
  )
}

function isPrimitive(val) {
  return val == null || /^[sbn]/.test(typeof val)
}
