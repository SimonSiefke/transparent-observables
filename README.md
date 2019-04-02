[![travis build](https://img.shields.io/travis/com/SimonSiefke/transparent-observables.svg?style=flat-square)](https://travis-ci.com/SimonSiefke/transparent-observables) [![MIT License](https://img.shields.io/github/license/SimonSiefke/transparent-observables.svg?style=flat-square)](http://opensource.org/licenses/MIT) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

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
