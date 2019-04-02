import { observable, effect } from './observable'

let x = observable(() => 2)
const y = observable(() => x.value)
effect(() => {
  console.log(y.value * 2)
})

x.value++
x = x.value + 1
x = x.value + 2
