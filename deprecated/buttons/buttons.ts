import { observable, effect } from '../src2/observable'

const buttons = observable(() => [
  document.querySelector('button:nth-of-type(1)'),
  document.querySelector('button:nth-of-type(2)'),
  document.querySelector('button:nth-of-type(3)'),
])

let active = observable(() => [])

effect(() => {
  for (const button of buttons.value) {
    if (button === active.value[buttons.value.length - 1]) {
      button.style.background = 'gray'
    }
  }
})

effect(() => {
  console.log('on click')
  for (const button of buttons.value) {
    button.onclick = () => {
      button.style.background = button.style.background.startsWith('gray')
        ? 'green'
        : 'gray'
      active.value = [button, ...active.value.filter(b => b !== button)]
    }
  }
})

// const buttons = [
//   document.querySelector('button:nth-of-type(1)'),
//   document.querySelector('button:nth-of-type(2)'),
//   document.querySelector('button:nth-of-type(3)'),
// ]
// let active = []
// const thirdPressedButton = active[buttons.length-1]
// if(thirdPressedButton){
//   thirdPressedButton.disabled = true
// }
