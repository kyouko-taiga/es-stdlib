# es-stdlib
[![Build Status](https://travis-ci.org/kyouko-taiga/es-stdlib.svg?branch=master)](https://travis-ci.org/kyouko-taiga/es-stdlib)

`es-stdlib` is a small package that aims at providing a decent standard library to EcmaScript.

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
const firstRow = [ 'apple', 'orange' ]
const secondRow = [ 'apple', 'orange' ]
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
const fruits = [ 'apple', 'orange' ]
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
const fruits = [ 'apple', 'orange' ]
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

* `transform`
  A closure that takes an element of the array as its argument and returns its transformation,
  or `null` if it should be discarded.

```js
const numbers = [ 2, -7, 4, -3 ]
const squaresOfNegative = esl.array.compactMap(numbers, (x) => x < 0 ? x * x : null)
console.log(squaresOfNegative)
// Prints "[ 49, 9 ]"
```

#### `unique(self)`

Filter out duplicated values to produce a new array.
Note that elements order is kept as in the original array.

```js
const numbers = [ 2, 3, 2, 1, 3 ]
const uniqueNumbers = esl.array.unique(numbers)
console.log(uniqueNumbers)
// Prints "[ 2, 3, 1 ]"
```

#### `sort(self, comparator)`

Sorts the array in place with the given comparator.

**Parameters**

* `comparator`
  A closure that takes two elements of the array
  and returns `true` if the first is smaller than the second.

```js
const numbers = [ 2, -7, 4, -3 ]
esl.array.sort(numbers, (a, b) => a < b)
console.log(numbers)
// Prints "[ -7, -3, 2, 4 ]"
```

#### `sorting(self, comparator)`

Same as `sort`, but returns a new array instead of mutating the given one.

### Object

#### `isEmpty(self)`

Returns whether the given object is empty.
```js
const basket = [ 'apple': 2, 'orange': 1 ]
if (!esl.object.isEmpty(fruits)) {
  console.log('There are fruits in the basket.')
}
// Prints "There are fruits in the basket."
```

#### `length(self)`

Returns number of keys in the given object.
```js
const basket = [ 'apple': 2, 'orange': 1 ]
const different = esl.object.length(basket)
console.log(`There are ${different} kind(s) of fruit in the basket.`)
// Prints "There are 2 kind(s) of fruit in the basket."
```

#### `contains(self, predicate)`

Returns whether the object contains a key/value pair satisfying the given predicate.

**Parameters**

* `predicate`
  A closure that takes a key/value pair of the object as its arguments
  and returns `true` if it should match the search
  *or*
  a key/value pair that should be matched from the object.

```js
const basket = [ 'apple': 2, 'orange': 1 ]

const hasTwoApple = els.object.contains([ 'apple', 2 ])
console.log(`The array contains two apples: ${hasTwoApple}`)
// Prints "true"

const hasSingle = els.object.contains((k, v) => v == 1)
console.log(`The array contains unique fruits: ${hasSingle}`)
// Prints "true"
```

#### `equals(self, other, [comparator])`

Returns whether the two given objects are shallowly equal.

**Parameters**

* `other`
  The other object.
* `comparator`
  An optional closure that takes an value from both objects
  and returns whether there are equals.
  By default, JavaScript's *loose equality* (e.g. `==`) is performed.

```js
const firstRow = { 'apple': 2, 'orange': 1 }
const secondRow = { 'apple': 2, 'orange': 1 }
if (esl.object.equals(firstRow, secondRow)) {
  console.log('The second and first rows are equals.')
}
// Prints "The second and first rows are equals."
```

#### `merge(self, other, combinator)`

Merges an object into the given one,
using the given combinator to determine the value for any duplicate keys.

**Parameters**

* `other`
  The other object.
* `combinator`
  A closure that takes an value from both objects
  and returns the one that should be kept.

```js
const basket = { 'apple': 2, 'orange': 1 }
esl.object.merge(basket, { 'pineapple': 2, 'orange': 2 }, (lhs, _) => lhs)
console.log(basket)
// Prints "{ 'apple': 2, 'orange': 1, 'pineapple': 2 }"
```

#### `merging(self, other, combinator)`

Same as `merge`, but returns a new object instead of mutating the given one.

#### `filter(self, predicate)`

Filters out key/value pairs from the given object if they satisfy a predicate.

**Parameters**

* `predicate`
  A closure that takes a key/value pair of the object as its arguments
  and returns `true` if it should match the search.

```js
const basket = { 'apple': 2, 'orange': 1 }
esl.object.filter(basket, (key, value) => key != 'orange')
console.log(basket)
// Prints "{ 'apple': 2 }"
```

#### `filtering(self, predicate)`

Same as `filter`, but returns a new object instead of mutating the given one.

#### `mutate(self, transform)`

Mutates the given object's key/value pairs with a transform function.

**Parameters**

* `transform`
  A closure that takes a key/value pair of the object as its arguments
  and returns its transformation,
  or `null` if it should be discarded.

```js
const basket = { 'apple': 2, 'orange': 1 }
esl.object.transform(basket, (key, value) => key == 'apple' ? ['pear', 3] : null)
console.log(basket)
// Prints "{ 'pear': 3 }"
```

#### `mutating(self, transform)`

Same as `mutate`, but returns a new object instead of mutating the given one.

#### `map(self, transform)`

Applies the given transform function on the object's key/value pairs to produce an array.

**Parameters**

* `transform`
  A closure that takes a key/value pair of the object as its arguments
  and returns its transformation.

```js
const basket = { 'apple': 2, 'orange': 1 }
const fruits = esl.object.transform(basket, (key, value) => key)
console.log(fruits)
// Prints "[ 'apple', 'orange' ]"
```

#### `compactMap(self, transform)`

Applies the given transform function on the object's key/value pairs to produce an array,
filtering out elements for which the transform function returns `null`.

**Parameters**

* `transform`
  A closure that takes a key/value pair of the object as its arguments
  and returns its transformation,
  or `null` if it should be discarded.

```js
const basket = { 'apple': 2, 'orange': 1 }
const fruits = esl.object.transform(basket, (key, value) => key != 'apple' ? key : null)
console.log(fruits)
// Prints "[ 'orange' ]"
```
