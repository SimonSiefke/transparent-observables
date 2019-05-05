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

It is also probable that there will be more API's or libraries written in or at least compatible with a language that has transparent observables. For example it would be useful if there was a reactive version of the localStorage API whose stored values are bound to JavaScript variables, e.g.

```txt
<button on:click={() => count++}>{count}</button>

<script>
  let count <-> localStorage.count || 0
</script>
```

In this example the variable count would be 2-way bound to the localStorage, which means when `count` changes, the value of count is persisted into local storage and when the localStorage changes, the value of `count` of would updated as well. This also means that the behavior of this simple app is synchronized between all tabs and restored when a page is closed and reopened.

Currently one way to do that (in svelte) would be:

```html
<button on:click={()=>count++}>{count}</button>

<script>
  let count = JSON.parse(localStorage.getItem("count") || "0");
  window.addEventListener("storage", event => {
    count = JSON.parse(event.newValue);
  });
  $: {
    localStorage.setItem("count", JSON.stringify(count));
  }
</script>
```

[Edit this example on CodeSandbox](https://codesandbox.io/s/01m73oqrrv)

There is a lot of potential for cleaner code not only for the localstorage API, but also for

- Databases in general
- WebRTC (Real Time Communication)
- Websockets and live data, online multiplayer games
- DOM API's, e.g. scroll offset, mouse position
