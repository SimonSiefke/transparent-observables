# @relevant/compiler

> Relevant Compiler

## Installation

```sh
npm i @relevant/compiler
```

## Usage

```js
import { compile } from '@relevant/compiler'

const code = `x = 1`
compile(code) // 'let x = 1'
```
