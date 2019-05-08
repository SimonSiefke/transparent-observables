
let dirty = {}
let scheduledUpdate
function invalidate(variableName, variableValue){
  dirty[variableName] = true
  if(!scheduledUpdate){
    scheduledUpdate  = setTimeout(update, 0)
  }
}

let x =  1
let y =  x + 1
let z =  y+x
x = x+1; invalidate('x'); update()
console.log(z)
function update(){
  if(dirty.x){y= x + 1;invalidate('y')}
  if(dirty.y||dirty.x){z= y+x;invalidate('z')}
  dirty={}
}
