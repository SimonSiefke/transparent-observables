// let data = {"x":0,"y":"x + 1"}
// const watchers = []
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
//     if(deps.get(key)){
//       deps.get(key).depend()
//       return obj[key]
//     } else {
//       console.error(`-> no variable with given key `)
//     }
//   },
//   set(obj, key, newValue) {
//     obj[key] = newValue
//     deps.get(key).notify()
//     return true
//   },
// })

// function watcher(fn) {
//   target = fn
//   target()
//   target = null
// }

// console.log(data)
// watchers.forEach(fn => watcher(fn))
// console.log(data)
