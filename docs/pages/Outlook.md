# Outlook

With Svelte being the first mainstream web framework creating a language that uses transparent observables to create user user interfaces for the web, it is likely that there will come more programming languages in the future that have the power of transparent observables built in. And they will likely come in many different flavours, the same way programming languages nowadays do. There are the simple ones with an easy to learn and readable Syntax like Python or CoffeeScript for the web. There are the Functional ones like Haskell or Elm for the web. With Type systems or no type systems or optional type systems.

Also as transparent observables are very close to natural language, there might be a possibility to derive the code for the application directly from a natural language specification:

"Make a button":

```html
<button></button>
```

"Create a variable count and when the button is clicked, increment count by 1"

```html
<script>
  let count
</script>
<button on:click="count++"></button>
```

"Oh and count initially has the value 0"

```html
<script>
  let count = 0
</script>
<button on:click="count++"></button>
```

"Oh and display the count inside the button"

```html
<script>
  let count = 0
</script>
<button on:click="count++">{count}</button>
```

Even though this probably won't happen any time soon, it is interesting to think about how easy programming could become. And if it would work, it would scale very well because of the way components can be structured: Ideally there are just a lot of small, independent components for a large application.
