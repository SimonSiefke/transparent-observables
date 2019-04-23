/* eslint-disable no-param-reassign, no-shadow */
import * as _ from 'lodash'

let target: (() => void) | null = null

export function effect(fn: () => void): void {
  target = fn
  target()
  target = null
}

function recursiveProxy(value, handler) {
  if (typeof value !== 'object' || value === null) {
    return value
  }
  return new Proxy(value, handler)
}

export function observable<T>(value: () => T): { value: T } {
  // A list of observers that depend on this observable
  const observers = new Set()
  /**
   * notifies all observers
   */
  const notify = () => {
    observers.forEach(fn => fn())
  }
  const handler = {
    get(obj, key) {
      // if the effect function was called we add the target as an observer
      if (target) {
        observers.add(target)
      }
      // return the value
      return obj[key]
    },
    set(obj, key, value) {
      const oldValue = obj[key]
      // do nothing if the value didn't change
      if (_.isEqual(value, oldValue)) {
        return true
      }
      // set the value
      obj[key] = value
      notify()
      return true
    },
  }
  const proxy = new Proxy(
    {
      value: recursiveProxy(value(), handler),
    },
    handler
  )
  return proxy
}

export function computed<T>(value: () => T): { value: T } {
  const proxy = observable(value)
  effect(() => {
    proxy.value = value()
  })
  return proxy
}
