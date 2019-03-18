import { observable, effect } from './observable'

const x = observable(() => 1)

const y = observable(() => x.value * 2)

effect(() => console.log('y is', y.value))
// effect(() => (y.value = x.value * 2))

x.value = 2
x.value = 333
