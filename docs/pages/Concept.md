# Concept

The concept of transparent observables is simple: Using reactive programming in a way that makes working with observables easy by creating observable variables without explicitly registering or unregistering observers for the variable.

Transparent observables are important for the following reasons

- they are less errorprone and prevent memory leaks. This is similar to how higher order programming languages don't need to manage memory manually, because it is handled automatically
- they are easier to learn and use because close to natural language
- almost every user interface is reactive and needs code that handles reactivity. Traditional approaches are inefficient
- observables are crucial for every dynamic user interface

Two things are important for transparent observables:

- simple syntax
- 1-way and 2-way binding

There is an assignment operator: `=`.

There is a 1-way-binding operator: `<-`. When the value/variable/expression on the right hand side is a constant, the 1-way-binding operator is equivalent to the assignment operator.

One way to achieve 2-way binding, is to use two times 1-way binding

```txt
x <- localStorage.x
localStorage.x <- x
```

Another possibility is to introduce a new assignment operator that binds variables 2-ways.

```txt
x <-> localStorage.x
```

Initializing both `x` and `localStorage.x` could look like this:

```txt
x <-> localStorage.x = localStorage.x || 0
```

The 2-way-binding-operator is used to keep `x` and `localStorage.x` in sync and the assignment operator `=` initializes both to `localStorage.x` if it exists or `0` if `localStorage.x` does not yet exist.

The 2-way binding operator cannot be used for expressions, because updating the variables inside the expression can be very complex or impossible. In this example it would be impossible to deduce the value of `a` and `b` when `c` changes.

```txt
a = 1
b = 2
c <-> a + b
```

Now let's focus on a triangle. ▲. More precisely on an application that has 3 inputs fields, each for the length of a triangle.

```html
<input type="number" bind:value="a" />
<input type="number" bind:value="b" />
<input type="number" bind:value="c" />

<svg>
  <path d="M"></path>
</svg>

<script type="transparent">
  a = 30
  b = 30
  c = 30

  s <- (a + b + c) / 2
  height = 2 * a * Math.sqrt(s*(s-a)(s-b)(s-c))

  pointA <- {
    x: 0,
    y: 0
  }

  pointB <- {
    x: a,
    y: 0
  }

  pointC <- {
    x:
    y: height
  }

  path <- `M0 ${height} L${pointB.x} ${height} L${pointC.x} 0`
</script>
```
