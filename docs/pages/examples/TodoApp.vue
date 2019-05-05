<template>
  <section>
    <input v-model="newTodo" @keydown.enter="addTodo" placeholder="Add Todo">
    <select v-model="visibility">
      <option v-for="filterName in Object.keys(filters)" :key="filterName">{{filterName}}</option>
    </select>
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id" :class="{ completed: todo.completed }">
        <input type="checkbox" v-model="todo.completed">
        <span>{{todo.title}}</span>
      </li>
    </ul>
  </section>
</template>

<script>
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

export default {
  data() {
    return {
      todos: [
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
      ],
      newTodo: '',
      visibility: 'all',
      filters,
    }
  },
  computed: {
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
  },
  methods: {
    addTodo() {
      const value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      this.todos.push({
        id: Math.random(),
        title: value,
        completed: false,
      })
      this.newTodo = ''
    },
  },
}
</script>

<style>
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>