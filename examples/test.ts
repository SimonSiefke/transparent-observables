import { observable, effect } from '../src/observable'

const x = observable(() => 1)

const y = observable(() => x.value * 2)

effect(() => console.log('y is', y.value))
// effect(() => (y.value = x.value * 2))

x.value = 2
x.value = 333

// effect(() => {
//   x.value = y.value + 1
// })

y.value++

x.value--
