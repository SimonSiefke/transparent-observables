import { updates, invalidate, dirty } from 'ui'

let x = 1
let y = x + 1

function update(){
  if(dirty.has('x')){y = x + 1;invalidate('y')}
}
updates.push(update)