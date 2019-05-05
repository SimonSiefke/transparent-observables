Let's compare the implementation of a simple Todo application:

The application should

- display the list of todos
- be able to add more todos
- toggle whether or not a todo is completed
- filtering todos (either showing all todos, completed todos or not completed todos)

A few interesting observations:

- all frameworks use a templating mechanism that allows tight coupling between JavaScript and HTML
- Vue and svelte use the concept of binding JavaScript variables the the values of HTML Elements. There is one 1-way-binding and 2-way-binding. With 1-way-binding the value of an HTML element is bound to a JavaScript variable. When the JavaScript variable changes, the HTML element value changes. 2-way binding is an extension of 1-way-binding. When the HTML element value changes, the JavaScript variable changes as well.
- They use different mechanisms for handling 2-way-binding. For example the `filteredTodos` variable is a computed property that depends on the list of todos and the current filter. Conceptually it is bound to the expression that defines it. However in the JavaScript language it is not possible to directly specify the value of a variable as an expression that is bound to other variables. But every framework has a workaround for that.

Vue segregates normal variables from bound variables:

```js
export default {
  data() {
    return {
      // normal variables
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
  // variables bound to expressions
  computed: {
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
  },
}
```

Svelte uses a useless label to mark variables that are bound to expressions. The svelte compiler transforms the code into JavaScript which has extra code to handle the updating of bound expressions. The interesting part is that the syntax of declaring variables with bound is very similar to the syntax of normal declarations.

```js
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
```
