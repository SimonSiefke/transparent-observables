| Excel      | FRP                                                | Normal Languages                                                      |
| ---------- | -------------------------------------------------- | --------------------------------------------------------------------- |
| no scoping | scoping                                            | scoping                                                               |
|            | a variable represents a stream of values over time | a variable represents a snapshot of a value at a specific time        |
|            | x= y means that x is a different name for y        | x=y means that x stores the value y has at the time of the assignment |

FRP = F+R+P

Simple Examples:

```js
div.innerHTML = new Date()

// Reactive: will keep updating
// Normal: will be current snapshot of date
```

proactive vs reactive -> coupling
