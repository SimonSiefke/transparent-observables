import { updates, invalidate, dirty } from 'ui'

export let count = 0
setInterval(()=>{
count =  count + 1; invalidate('count');
}, 1000)

function update(){
  if(dirty.has('count')){count = count + 1;invalidate('count')}
}
updates.push(update)