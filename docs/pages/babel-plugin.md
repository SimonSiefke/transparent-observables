The Folder structure is pretty simple:
```
src/
├── compiler.ts
└── observable.ts
```

The code consists of two parts:
The `compiler.ts` file is responsible for transforming the source code into javascript that can be executed. For example the following source code:

```javascript
const x = 1
const y = x + 1
```

will be transformed into

```javascript
import { observable } from 'transparent-observables'
const x = observable(() => 1)
const y = observable(() => x + 1)
```

The `observable.ts` has all the required runtime code (e.g. the source code of the `observable` function and more).
