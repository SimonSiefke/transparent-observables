Let's compare the implementation of a simple Todo application:

The application should

- display the list of todos
- be able to add more todos
- toggle whether or not a todo is completed
- filtering todos (either showing all todos, completed todos or not completed todos)

A few interesting observations:

- all frameworks use a templating mechanism that allows tight coupling between JavaScript and HTML
- Vue and svelte use the concept of binding JavaScript variables the the values of HTML Elements. There is one 1-way-binding and 2-way-binding. With 1-way-binding the value of an HTML element is bound to a JavaScript variable. When the JavaScript variable changes, the HTML element value changes. 2-way binding is an extension of 1-way-binding. When the HTML element value changes, the JavaScript variable changes as well.
- They use different mechanisms for handling 2-way-binding. For example the `filteredTodos` variable is a computed property that depends on the list of todos and the current filter. Conceptually it is bound to the expression that defines it. However in the JavaScript language it is not possible to directly specify the value of a variable as an expression that is bound to other variables. But every framework has a workaround for that.

Vue segregates normal variables from bound variables:

```js
export default {
  data() {
    return {
      // normal variables
      todos: [
        {
          id: 1,
          title: 'apple',
          completed: false,
        },
        {
          id: 2,
          title: 'banana',
          completed: false,
        },
      ],
      newTodo: '',
      visibility: 'all',
      filters,
    }
  },
  // variables bound to expressions
  computed: {
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
  },
}
```

Svelte uses a useless label to mark variables that are bound to expressions. The svelte compiler transforms the code into JavaScript which has extra code to handle the updating of bound expressions. The interesting part is that the syntax of declaring variables with bound is very similar to the syntax of normal declarations.

```js
let todos = [
  {
    title: 'apple',
    completed: false,
  },
  {
    title: 'banana',
    completed: false,
  },
]
let newTodo = ''
let visibility = 'all'
$: filteredTodos = filters[visibility](todos)
```

Another example: Detect when the mouse is approaching an element and load the data for the page that a link is redirecting to. When the data loads when the user hovers over the link it is likely that he or she will click the link. By loading the page on hover instead of after the user has clicked, it will make the navigation to the next page faster, providing a better user experience. However when the user doesn't click the link, the resources for the next page are fetched regardless and it is actually a worse user experience because it wastes data on mobile and data is money.

```js
preloadedPages = new Set()

$mouseTarget = undefined
window.addEventListener('mousemove', event => {
  $mouseTarget = event.target
})

async function preload(url) {
  // fetch some data
}

function findLink($element) {
  if ($element.nodeName !== 'A') {
    return findLink($element.parentNode)
  }
  return $element
}

$hoveredLink = findLink(mouseTarget)

if ($hoveredLink && !preloadedPages.has($hoveredLink.href)) {
  preloadedPages.add($hoveredLink.href)
  await preload($hoveredLink.href)
}
```

In JavaScript the same Code might look like this:

```js
const preloadedPages = new Set()

async function preload(url) {
  // fetch some data
}

function findLink($element) {
  if ($element.nodeName !== 'A') {
    return findLink($element.parentNode)
  }
  return $element
}

window.addEventListener('mousemove', async event => {
  const $hoveredLink = findLink(event.target)
  if ($hoveredLink && !preloadedPages.has($hoveredLink.href)) {
    preloadedPages.add($hoveredLink.href)
    await preload($hoveredLink.href)
  }
})
```

There are some differences: JavaScript uses the `const` keyword for variables that don't change. UI doesn't. JavaScript needs to nest the code responsible for finding the link at the current mouse position and calling `preload`. UI doesn't. UI separates the logic for detecting the mouse position from the logic to preload the link the mouse is currently hovering. The UI eventListener for `mousemove` looks like this:

```js
$mouseTarget = undefined
window.addEventListener('mousemove', event => {
  $mouseTarget = event.target
})
```

By separating the logic UI makes it easier to understand and refactor code. For example a `touchstart` event handler (which is fired when a user on a mobile phone touches the screen) could be added to the `mousemove` event handler. Because in UI the logic for that is in one place, it makes it easier to replace that logic:

```js
$mouseTarget = undefined
function handleMousemove(event) {
  $mouseTarget = event.target
}
window.addEventListener('mousemove', handleMousemove)
window.addEventListener('touchstart', handleMousemove)
```

Compared to JavaScript:

```js
function handleMousemove(event){
  const $hoveredLink = findLink(event.target)
  if ($hoveredLink && !preloadedPages.has($hoveredLink.href)) {
    preloadedPages.add($hoveredLink.href)
    await preload($hoveredLink.href)
  }
}

window.addEventListener('mousemove', handleMousemove)
window.addEventListener('touchstart', handleMousemove)
```

In JavaScript, everything that happens when the mouse is moved or the display is touched is crammed into the `handleMousemove` function. This might can be a good thing or a bad thing. The good part is that that logic is encapsulated in a single block, which is useful when somebody wants to know what happens when the mouse is moved. The bad part is that if somebody wants to know when a page is preloaded, it is not in the determine-when-link-should-be-preloaded-section but in the `handleMousemove` function. In UI it is the other way around: Less encapsulated but sectioned into sections that logically fit together.

## Time example

The goal is to create an application that displays the current time. The current time should update every second. For this example, we will focus on the time updating logic and omit the html code.

With UI:

```js
export time = new Date()
setInterval(() => {
  time = new Date()
}, 1000)
```

With Svelte (modified example from the svelte docs, https://svelte.dev/examples#readable-stores):

```js
import { readable } from 'svelte/store'

export const time = readable(new Date(), set => {
  const interval = setInterval(() => {
    set(new Date())
  }, 1000)

  return () => {
    clearInterval(interval)
  }
})
```

With React (modified example from https://codepen.io/katrpilar/pen/oQwXPw?editors=0010):

```js
import { useState, useEffect } from 'react'

export function useTime() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])
  return time
}
```

With Vue (modified example from https://github.com/yyx990803/vue-hooks)

```js
import { useState, useEffect } from 'vue-hooks'

export function useTime() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])
  return time
}
```

With UI, there is the least amount of code. This is because the code is transpiled into reactive code. The other examples use plain JavaScript, which results in longer code because assignments are not reactive. Semantically, `time = new Date()` in UI is equivalent to `setTime(new Date())` in the Vue and React example. Another difference between UI and the other examples is the cleanup function. With UI, the `clearInterval` function is not needed.
