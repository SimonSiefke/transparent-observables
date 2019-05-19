let dirty = {}
let scheduledUpdate
function invalidate(variableName, variableValue){
  console.log(variableName)
  dirty[variableName] = true
  if(!scheduledUpdate){
    scheduledUpdate = setTimeout(update, 0)
  } else{
    console.log('already scheduled', scheduledUpdate)
  }
}

let x = 1
let y = x + 1
x =  y + 1; invalidate('x'); update()

function update(){
  console.log('-----')
  if(dirty.x){y = x + 1;invalidate('y')}
  if(dirty.y){x = y + 1;invalidate('x')}
  dirty={}
}