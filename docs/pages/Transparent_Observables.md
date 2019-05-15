As seen in the previous section, 1-way binding and 2-way-binding are two very useful concepts that simplify creating dynamic user interfaces. However, they are not "transparent" like Excel, where there is no difference between declaring and using bound variables/cells.

## What if a programming language was like excel?

A programming language that behaves like excel would treat bound variables as first class citizens. There would be no one-time assignment. As a result, for expressions like `y=x+1`, `y` will **always** have the value of `x+1`. Users such a language will not have to know about the observer pattern and don't need to worry about keeping values consistent. I have created a small programming language based on JavaScript that does this.

## Syntax & Semantic

### Assignments

Assignments are reactive and they don't require the keyword `var`, `let` or `const` in front of them (like they would in JavaScript).

```js
x = 0
y = x + 1
x = 12 // updates the value of x and y
```

## Dom Api's

There is a number of Api's available that enables JavaScript interacting with HTML and CSS. Currently there is only a fraction of DOM Api's available:

- innerHTML
- innerText
- textContent
- innerWidth
- innerHeight
- outerWidth
- outerHeight
- scrollX
- scrollY
- classList

Additionally, the following Api's are available for HTML Input Elements

- value

The following Api's are available for HTML Audio elements as well as HTML Video elements

- currentTime
- currentSrc
- duration
- playing **ns**
- muted
- paused
- volume

## Global variables

The following DOM Api's are provided as global variables (on the `window` object).

### Mouse **ns**

A reactive version of the mouse coordinates.

```js
x = mouse.x
```

### Now **ns**

A reactive version of the current Time.

```js
currentTime = now
```

### Fullscreen

```js
isFullScreen = fullScreen
```

### Hidden

A reactive version of whether of not the document is hidden.

```js
isHidden = hidden
```

### VisibilityState

A reactive version of the page visibility API.

```js
isWindowVisible = visibilityState === 'visible'
```

## Not available

The Api's and methods not listed above are not available. This includes:

- alert
- confirm
- console.*
- localStorage
- indexedDB

The Api's that are not available fall into two categories:

1. The ones that are not available because I just haven't implemented them yet (e.g. `localStorage`), and which can be implemented in a reactive way.
1. The ones that are currently not intended be implemented (e.g. `console.log`). The reason `console.log` is not available is because it would be rather confusing when a variable would be logged every time that it changes.