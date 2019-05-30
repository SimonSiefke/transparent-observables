import { updates, invalidate, dirty } from 'ui'

let x = 1
let y = x + 1
x =  y + 1; invalidate('x');

function update(){
  if(dirty.has('x')){y = x + 1;invalidate('y')}
  if(dirty.has('y')){x = y + 1;invalidate('x')}
}
updates.push(update)