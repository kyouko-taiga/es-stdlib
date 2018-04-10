# es-stdlib

`es-stdlib` is a small package that aim at providing a decent standard library to EcmaScript.

## Motivation

EcmaScript (a.k.a JavaScript) doesn't really have a standard library.
That makes simple tasks, such as comparing arrays, really tedious and often quite hacky.
`es-stdlib` is an attempt to fill the gap with a collection of functions
to perform various common manipulations on basic types.

For instance, comparing two arrays become as easy as:
```js
import esl from 'es-stdlib'

console.log(esl.array.equals([1, 2, 3], [1, 2, 3])) // Prints "true"
```

## API Documentation

### Array

#### `isEmpty(self)`

Returns whether the given array is empty.
```js
const fruits = [ 'apple', 'orange' ]
if (!esl.array.isEmpty(fruits)) {
  console.log(`There are ${fruits.length} elements.`)
}
// Prints "There are 2 elements."
```

#### `first(self, [predicate])`

Returns the first element of the array that satisfies the given predicate.

**Parameters**

* `predicate`
  A closure that takes an element of the array as its argument
  and returns `true` if it should match the search.
  If not provided, the first element of the array will be returned.

**Return Value**

The first element of the array that satisfies `predicate`,
or `undefined` if such element does not exists.

```js
const numbers = [ 2, -7, 4, -3 ]
const n = esl.array.first(numbers, (x) => (x < 0))
if (typeof n !== undefined) {
  console.log(`The first negative number is ${n}`)
}
// Prints "The first negative number is -7"
```

#### `last(self)`

Returns the last element of the array.

**Return Value**

The last element of the array,,
or `undefined` if the array is empty.

```js
const numbers = [ 2, -7, 4, -3 ]
const n = esl.array.last(numbers)
if (typeof n !== undefined) {
  console.log(`The last number is ${n}`)
}
// Prints "The first negative number is -3"
```

#### `contains(self, predicate)`

Returns whether the array contains an element satisfying the given predicate.

**Parameters**

* `predicate`
  A closure that takes an element of the array as its argument
  and returns `true` if it should match the search
  *or*
  an element that should be matched from the array.

```js
const fruits = [ 'apple', 'orange' ]

const hasApple = els.array.contains('apple')
console.log(`The array contains an apple: ${hasApple}`)
// Prints "true"

const hasSomethingElse = els.array.contains((x) => x != 'apple')
console.log(`The array contains other fruits: ${hasSomethingElse}`)
// Prints "true"
```

#### `equals(self, other, [comparator])`

Returns whether the two given arrays are shallowly equal.

**Parameters**

* `other`
  The other array.
* `comparator`
  An optional closure that takes an element from both arrays
  and returns whether there are equals.
  By default, JavaScript's *loose equality* (e.g. `==`) is performed.

```js
const firstRow = ['apple', 'orange']
const secondRow = ['apple', 'orange']
if (esl.array.equals(firstRow, secondRow)) {
  console.log('The second and first rows are equals.')
}
// Prints "The second and first rows are equals."
```

#### `insert(self, element, [index])`

Inserts an element in the array in place, at the given index.

**Parameters**

* `element`
  The element to insert.
* `index`
  The index at which insert the element.
  If not provided, the element will be inserted at the beginning of the array.
  Note that the given index should be within the bounds of the array.

```js
const fruits = ['apple', 'orange']
esl.array.insert(fruits, 'pineapple', 1)
console.log(fruits)
// Prints "[ 'apple', 'pineapple', 'orange' ]"
```

#### `inserting(self, element, [index])`

Same as `insert`, but returns a new array instead of mutating the given one.

#### `remove(self, index)`

Removes an element in the array in place, at the given index.

**Parameters**

* `index`
  The index of the element to remove.
  Note that it should be within the bounds of the array.

```js
const fruits = ['apple', 'orange']
esl.array.remove(fruits, 1)
console.log(fruits)
// Prints "[ 'apple' ]"
```

#### `removing(self, index)`

Same as `remove`, but returns a new array instead of mutating the given one.

#### `compactMap(self, transform)`

Applies the given transform function to produce a new array,
filtering out elements for which the transform function returns `null`.

**Parameters**

* `index`
  A closure that takes an element of the array as its argument and returns its transformation,
  or `null` if it should be discarded.

```js
const numbers = [ 2, -7, 4, -3 ]
const squaresOfNegative = esl.array.compactMap(numbers, (x) => x < 0 ? x * x : null)
console.log(squaresOfNegative)
// Prints "[ 49, 9 ]"
```

#### `sort(self, comparator)`

Sorts the array in place with the given comparator.

**Parameters**

* `comparator`
  A closure that takes two elements of the array
  and returns `true` if the first is smaller than the second.

```js
const numbers = [ 2, -7, 4, -3 ]
est.array.sort(numbers, (a, b) => a < b)
console.log(numbers)
// Prints "[ -7, -3, 2, 4 ]"
```

#### `sorting(self, comparator)`

Same as `sort`, but returns a new array instead of mutating the given one.
