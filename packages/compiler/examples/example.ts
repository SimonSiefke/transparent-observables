import { compile } from '../src'

const code = `
todos = []
todosHTML = todos.map(todo => \`<li>\${todo}</li>\`)
newTodo = document.querySelector('input').value
document.querySelector('add').addEventListener('click', ()=>{
  todos = [...todos, newTodo]
  newTodo = ''
})

document.querySelector('#todos').innerHTML = \`<ul>\${todosHTML.join('\n')}</ul>\``

const generated = compile(code)

generated
