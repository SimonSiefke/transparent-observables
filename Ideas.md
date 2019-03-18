## Heading

- transparent observables
- invisible observables
- Reactive interfaces for the web

## Subheading

- Reactive Programming languages for the web
- Exploring reactive programming languages

provabilty:

```js
let x = 0
const y = x
x++
```

making complex things easier

sorting

```js
let numbers = [2, 1, 3]
const sortedNumbers = numbers.sort()
numbers.push(4)
console.log(sortedNumbers) // [1,2,3,4]
```

instead of having a list of numbers, you could also have a list of todos to filter. By replacing the filter, the items shown to the user would be automatically updated. That's as simple as it goes.

https://www.youtube.com/watch?v=5V1ynVyud4M&t=2460s

sorting

```js
function findMin(arr, start) {
  let min = 0
  for (let i = start; i < arr.length; i++) {
    min = Math.min(min, arr[i])
  }
  return min
}
function sort(arr) {
  if (arr.length <= 1) {
    return []
  }
  let newArr = []
  for (let i = 0; i < arr.length; i++) {
    newArr[i] = findMin(arr, start)
  }
}
```
