let dirty = {}
let scheduledUpdate
function invalidate(variableName){
  dirty[variableName] = true
  if(!scheduledUpdate){
    scheduledUpdate = setTimeout(update, 0)
  }
}

export let count = 0
setInterval(()=>{
count =  count + 1; invalidate('count'); update()
}, 1000)

function update(){
  if(dirty.count){count = count + 1;invalidate('count')}
  dirty={}
}