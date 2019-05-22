import { observable, effect, computed } from '../src/observable'

const items = observable(() => ['apple', 'banana', 'cherry'])

const reversedItems = computed(() => items.value.slice().reverse())

// console.log(items.value)

items.value.push('d')

effect(() => {
  console.log(reversedItems.value)
})

items.value.push('e')
// console.log(items.value)

// reversedItems.value //?
// items.value.push('d')

// const items = new Proxy([1, 2, 3], {
//   get: function(target, property) {
//     return target[property]
//   },
//   set: function(target, property, value, receiver) {
//     if (target[property] === value) {
//       return true
//     }
//     target[property] = value
//     console.log('change', target)
//     return true
//   },
// })

// items.push(4)

// const y = observable(() => 1)

// const z = observable(() => y.value + 1)

// effect(() => {
//   console.log(z.value)
// })

// y.value++
