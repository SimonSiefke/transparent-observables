# Cli

There is also a command line interface for the compiler.

To use the cli, it must first be installed via npm:

```sh
npm i -g @relevant/cli
```

Then ui files can be compiled via the command line.

```sh
relevant index.ui # compiles index.ui to dist/index.js
```

The Cli is written in typescript, and uses the Commander npm package as well as the @relevant/compiler package.
