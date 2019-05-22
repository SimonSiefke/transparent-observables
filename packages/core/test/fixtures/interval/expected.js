import { updates, invalidate, dirty } from 'ui'

let x = 1
let y = x + 1
setInterval(()=>{
x =  x + 1; invalidate('x');
}, 1000)

function update(){
  if(dirty.has('x')){y = x + 1;invalidate('y')}
  if(dirty.has('x')){x = x + 1;invalidate('x')}
}
updates.push(update)