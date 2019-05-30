import { updates, invalidate, dirty } from '@relevant/ui'

let x = 1
let y = x + 1
setInterval(()=>{
x =  x + 1; invalidate('x');
}, 1000)

function update(){
  if(dirty.has('x')){y = x + 1;invalidate('y')}
}
updates.push(update)