let dirty = {}
let scheduledUpdate
function invalidate(variableName){
  dirty[variableName] = true
  if(!scheduledUpdate){
    scheduledUpdate = setTimeout(update, 0)
  }
}

let x = 1
let y = x + 1

function update(){
  if(dirty.x){y = x + 1;invalidate('y')}
  dirty={}
}