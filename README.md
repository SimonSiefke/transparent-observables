[![travis build](https://img.shields.io/travis/com/SimonSiefke/transparent-observables.svg?style=flat-square)](https://travis-ci.com/SimonSiefke/transparent-observables) [![MIT License](https://img.shields.io/github/license/SimonSiefke/transparent-observables.svg?style=flat-square)](http://opensource.org/licenses/MIT) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

# Transparent Observables

## Prerequisites

Make sure you have installed [Node.js](https://nodejs.org/en/). To check the version of Node.js that you have installed, run:

```sh
node --version
```

## Quickstart 🚀

```sh
git clone https://github.com/SimonSiefke/transparent-observables.git &&
npm ci &&
cd examples &&
npm run example:counter
```

## Run the tests

```sh
npm test
```

<!--
## disabled expressions

```js
x = x + 1 // because endless recursion
```

## enabled expressions

```js
y = 1
x = y + 1
y = 2 // y is now 2 and x is now 3
```

Describe complex user interfaces in a completely declarative way

Comparison with finite state machines:

```js
const states = {
  initial: 'green',
  states: {
    green: {
      on: {
        TIMER: 'yellow',
      },
    },
    yellow: {
      on:{
        TIMER:{
          'red'
        }
      }
    },
    red:{
      on:{
        TIMER:'green'
      }
    }
  },
}

const nextState = states.transition('yellow', 'TIMER')
```

const firstState = 'green' const nextState =

```js
const active = []
const last = active[buttons.length - 1]
last.dataset.off = true
const buttons = [firstButton, secondButton, thirdButton]
for (const button of buttons) {
  button.addEventListener('click', () => {
    active = [...buttons.filter(b => b !== button), button]
  })
}
``` -->
