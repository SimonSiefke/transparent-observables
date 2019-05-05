import { useState } from 'react'

const filters = {
  all(todos) {
    return todos
  },
  active(todos) {
    return todos.filter(todo => !todo.completed)
  },
  completed(todos) {
    return todos.filter(todo => todo.completed)
  },
}

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'apple',
      completed: false,
    },
    {
      id: 2,
      title: 'banana',
      completed: false,
    },
  ])
  const [visibility, setVisibility] = useState('all')
  const [newTodo, setNewTodo] = useState('')
  const filteredTodos = filters[visibility](todos)
  function addTodo() {
    const value = newTodo && newTodo.trim()
    if (!value) {
      return
    }
    setTodos([
      ...todos,
      {
        id: Math.random(),
        title: value,
        completed: false,
      },
    ])
    setNewTodo('')
  }
  function toggleCompleted(payload) {
    setTodos(
      todos.map(todo => {
        if (todo.id !== payload.id) {
          return todo
        }
        return {
          ...todo,
          completed: !todo.completed,
        }
      })
    )
  }
  return (
    <section>
      <input
        placeholder="Add Todo"
        value={newTodo}
        onChange={event => setNewTodo(event.target.value)}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            addTodo()
          }
        }}
      />
      <select onChange={event => setVisibility(event.target.value)}>
        {Object.keys(filters).map(filterName => (
          <option key={filterName}>{filterName}</option>
        ))}
      </select>
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo)}
            />
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
