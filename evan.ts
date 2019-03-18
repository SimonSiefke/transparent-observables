// let data = { price: 5, quantity: 2, total: 0 }

// let target = null

// // This is exactly the same Dep class
// class Dep {
//   private subscribers: Set<any>
//   constructor() {
//     this.subscribers = new Set()
//   }
//   depend() {
//     if (target && !this.subscribers.has(target)) {
//       // Only if there is a target & it's not already subscribed
//       this.subscribers.add(target)
//     }
//   }
//   notify() {
//     this.subscribers.forEach(sub => sub())
//   }
// }

// let deps = new Map()
// // Go through each of our data properties
// Object.keys(data).forEach(key => {
//   deps.set(key, new Dep())
// })

// let originalData = data

// data = new Proxy(originalData, {
//   get(obj, key) {
//     deps.get(key).depend()
//     return obj[key]
//   },
//   set(obj, key, newValue) {
//     obj[key] = newValue
//     deps.get(key).notify()
//     return true
//   },
// })
// // My watcher no longer calls dep.depend,
// // since that gets called from inside our get method.
// function watcher(myFunc) {
//   target = myFunc
//   target()
//   target = null
// }

// watcher(() => {
//   data.total = 0 // line 1
// })
// watcher(() => {
//   data.total = data.price * data.quantity // line 2
// })

// watcher(() => {
//   data.total = data.price - 10 // line 3
// })

// // watcher(() => {
// //   // data.price = 2// line 4
// // })

// data.total //?
// data.price++
// data.total //?
// data.price++
// data.total //?
