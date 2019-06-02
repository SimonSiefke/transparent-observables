## Creating the babel plugin

### Overview of babel

For transforming the code I created a babel plugin. The process is the following: Babel analyzes the source code and creates and ast (abstract syntax tree). Babel plugins can 'visit' the ast and make transformations on the ast. Then the ast is converted into code again, which has the transformations. A simple babel plugin would look like this:

```javascript
export default function() {
  return {
    visitor: {
      Identifier(path) {
        path.node.identifier.name = 'a'
      }
    },
  }
}
```

It visits every identifier (every variable) in the source code and changes its name to `a`.

<!-- TODO transform component left/right with arrow from left to right -->
```javascript
const x = 1
const y = x + 1
const z = x + y + 1
```

gets transformed into

```javascript
const a = 1
const a = a + 1
const a = a + a + 1
```

This example plugin is obviously useless and produces invalid javascript, but it should be clearer now how it works. This example is also available on ast explorer (TODO link) as an interactive demo.

<!-- Ast explorer gives a visual overview of the ast, the source code, the plugin code and the transformed code -->

### Creating a plugin for transparent observables
