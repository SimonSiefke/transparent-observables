
let dirty = {}
let scheduledUpdate
function invalidate(variableName, variableValue){
  dirty[variableName] = true
  if(!scheduledUpdate){
    scheduledUpdate  = setTimeout(update, 0)
  }
}

let x =  1
let y =  x * 2
x =  222; invalidate('x'); update()
x =  1; invalidate('x'); update()
console.log(y)
function update(){
  if(dirty.x){y= x * 2;invalidate('y')}
  dirty={}
}
