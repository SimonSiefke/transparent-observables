import { updates, invalidate, dirty } from '../src/ui'

const x = 1
let y = x + 1

function update() {
  if (dirty.has('x')) {
    y = x + 1
    invalidate('y')
  }
}
updates.push(update)
