import { updates, invalidate, dirty } from 'ui'

let x = 0
let y = x + 1
x =  22; invalidate('x');

function update(){
  if(dirty.has('x')){y = x + 1;invalidate('y')}
}
updates.push(update)