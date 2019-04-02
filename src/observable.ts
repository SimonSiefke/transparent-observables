/* eslint-disable no-param-reassign, no-shadow */
let target: (() => void) | null = null

export function effect(fn: () => void): void {
  target = fn
  target()
  target = null
}

export function observable(value: () => any): any {
  // A list of observers that depend on this observable
  const observers = new Set()
  const proxy = new Proxy(
    {
      value: value(), // set the initial value
      key: '',
    },
    {
      get(obj, key: 'value') {
        // if the effect function was called we add the target as an observer
        if (target) {
          observers.add(target)
        }
        // return the value
        return obj[key]
      },
      set(obj, key: 'key' | 'value', value) {
        const oldValue = obj[key]
        // do nothing if the value didn't change
        if (value === oldValue) {
          return true
        }
        // set the value
        obj[key] = value
        // notify all observers
        observers.forEach(fn => fn())
        return true
      },
    }
  )
  effect(() => {
    proxy.value = value()
  })
  return proxy
}
