import { TDate } from './Date'
import { effect } from '../../core/src/observable'

effect(() => {
  console.log(TDate.value)
})
