<template>
	<section>
		<input bind:value="newTodo" @keydown.enter="addTodo" placeholder="Add Todo">
		<select bind:value="visibility">
			{#each Object.keys(filters) as filterName}
			<option>{filterName}</option>
			{/each}
		</select>
		<ul>
			{#each filteredTodos as todo}
			<li>
				<input type="checkbox" bind:value=todo.completed>
				<span>{todo.title}</span>
			</li>
			{/each}
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

  let todos = [
    {
      title: 'apple',
      completed: false,
    },
    {
      title: 'banana',
      completed: false,
    },
  ]
  let newTodo = ''
  let visibility = 'all'
  $: filteredTodos = filters[visibility](todos)

  function addTodo() {
    const value = newTodo && newTodo.trim()
    if (!value) {
      return
    }
    todos = [
      ...todos,
      {
        title: value,
        completed: false,
      },
    ]
    newTodo = ''
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