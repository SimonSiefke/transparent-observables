
let dirty = {}
let scheduledUpdate
function invalidate(variableName, variableValue) {
  dirty[variableName] = true
  if (!scheduledUpdate) {
    scheduledUpdate = setTimeout(update, 0)
  }
}

let x = 1
x = 222;
x = 1;
function update() {

  dirty = {}
}
