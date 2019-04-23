import { observable } from '../../core/src/observable'

export const TDate = observable(() => new Date())

setInterval(() => {
  TDate.value = new Date()
}, 1)
