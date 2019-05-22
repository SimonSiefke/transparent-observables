# Implementation

Source code written in UI will be transformed into JavaScript which can then be executed in a browser or anything that can execute JavaScript. The goal of the generated code is to make assignments reactive. When a variable changes, dependent variables must update. To achieve this I hav created a library and a compiler. The library includes the update mechanism/function. The compiler inserts extra code that calls the update mechanism of the library. For example this code:

```js
x = 0
y = x + 1
x = 22
```

is transformed into

<!-- prettier-ignore -->
```js
import { updates, invalidate, dirty } from 'ui'

let x = 0
let y = x + 1
x =  22; invalidate('x');

function update(){
  if(dirty.has('x')){y = x + 1;invalidate('y')}
}
updates.push(update)
```

At the top are 3 additional imports from the ui library. Then comes the original source code with the difference that after a change of a variable, the `invalidate` function is called with the name of the variable as an argument. At the bottom of the file is an `update` function, which is added to the `updates` array imported from the ui library. The `update` function reassigns `y` when `x` was changed. Then it marks `y` as changed by calling the `invalidate` function.

To further understand how it works, we will inspect the code of the ui library.

```ts
/**
 * Set of variables that are currently dirty / have recently changed.
 */
export const dirty = new Set()

/**
 * The scheduled update if there is one.
 */
let scheduledUpdate: NodeJS.Timeout | undefined

/**
 * An array of update functions, each file has a update function.
 */
export const updates: Function[] = []

/**
 * Updates everything.
 */
function updateAll(): void {
  for (const update of updates) {
    update()
  }
  dirty.clear()
}

/**
 * Marks a variable as dirty and triggers an update so that other variable that depend on this variable update.
 *
 * @param variableName - The name of the variable that changed.
 */
export function invalidate(variableName: string): void {
  dirty.add(variableName)
  if (!scheduledUpdate) {
    scheduledUpdate = setTimeout(updateAll, 0)
  }
}
```

The library code is written in TypeScript, which is a superset of JavaScript. TypeScript has the benefit of the possibility to add types to a JavaScript program. This reduces runtime errors related to types, because it enforces that functions are always called with the correct type at compile time.

The main thing the library code does is calling `updateAll` when a variable is changed/invalidated. The updating logic for the individual modules is the `update` function of each module. The `updateAll` function just calls the `update` function of every module. One interesting thing to say about the library code is the line `scheduledUpdate = setTimeout(updateAll, 0)`. This would be similar to `updateAll()`, but the difference is that `scheduledUpdate = setTimeout(updateAll, 0)` is run in the next iteration of the JavaScript event loop. For example:

```js
setTimeout(() => {
  console.log('hello')
}, 0)
console.log('world')
```

This would first log `world` and then `hello`.

What this means for the library is that the `updateAll` function is always called on the next iteration of the event loop, **after** every `invalidate` function call of the current iteration of the event loop is done.

The code for the `y = x + 1` example would be executed in the following order:

1. `x` is assigned the value `0`
2. `y` is assigned the value `x + 1`, which is `1`
3. `x` is assigned the value `22`
4. `invalidate` is called
5. A timeout is scheduled for the invocation of the `updateAll` function
6. The current iteration of the event loops ends and the next iteration begins
7. The `updateAll` function is called, which calls the `update` function
8. `y` is assigned the value `x + 1`, which is `23`
