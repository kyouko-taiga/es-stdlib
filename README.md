# es-stdlib

`es-stdlib` is a small package that aim at providing a decent standard library to EcmaScript.

## Motivation

EcmaScript (a.k.a JavaScript) doesn't really have a standard library.
That makes simple tasks, such as comparing arrays, really tedious and often quite hacky.
`es-stdlib` is an attempt to fill the gap with a collection of functions
to perform various common manipulations on basic types.

For instance, comparing two arrays become as easy as:
```javascript
import esl from 'es-stdlib'

console.log(esl.array.equals([1, 2, 3], [1, 2, 3])) // Prints "true"
```
