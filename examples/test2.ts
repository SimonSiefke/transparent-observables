import { observable, effect } from '../src/observable'

let x = observable(() => 2)
const y = observable(() => x.value)
effect(() => {
  console.log(y.value * 2)
})
effect(() => {
  console.log(x.value)
})

x.key = '7'

x.value++
x.value = x.value + 1
x.value = x.value + 2

// effect(() => (x.value = y.value + 1))
