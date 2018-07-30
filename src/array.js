import { IndexError } from './errors.js'

function isEmpty(self) {
  if (!(self instanceof Array)) { throw new TypeError(`${self} is not an array`) }
  return self.length == 0
}

function first(self, predicate) {
  if (!(self instanceof Array)) { throw new TypeError(`${self} is not an array`) }
  if (typeof predicate === 'undefined') {
    return self[0]
  }
  for (let element of self) {
    if (predicate(element)) { return element }
  }
  return undefined
}

function last(self) {
  if (!(self instanceof Array)) { throw new TypeError(`${self} is not an array`) }
  return self[self.length - 1]
}

function contains(self, predicate) {
  if (!(self instanceof Array)) { throw new TypeError(`${self} is not an array`) }
  const fn = typeof predicate === 'function'
    ? predicate
    : (element) => (element == predicate)

  for (let element of self) {
    if (fn(element)) {
      return true
    }
  }
  return false
}

function equals(lhs, rhs, comparator = (a, b) => (a == b)) {
  if (!(lhs instanceof Array)) { throw new TypeError(`${self} is not an array`) }
  if (!(rhs instanceof Array)) { return false }
  if (lhs.length != rhs.length) { return false }

  for (let i = 0; i < lhs.length; ++i) {
    if (!comparator(lhs[i], rhs[i])) { return false }
  }
  return true
}

function insert(self, element, index = 0) {
  if (!(self instanceof Array)) { throw new TypeError(`${self} is not an array`) }
  if ((index > self.length) || (index < 0)) { throw new IndexError(index) }
  self.splice(index, 0, element)
}

function inserting(self, element, index = 0) {
  if (!(self instanceof Array)) { throw new TypeError(`${self} is not an array`) }
  const result = [ ...self ]
  insert(result, element, index)
  return result
}

function remove(self, index) {
  if (!(self instanceof Array)) { throw new TypeError(`${self} is not an array`) }
  if ((index >= self.length) || (index < 0)) { throw new IndexError(index) }
  self.splice(index, 1)
}

function removing(self, index) {
  if (!(self instanceof Array)) { throw new TypeError(`${self} is not an array`) }
  const result = [ ...self ]
  remove(result, index)
  return result
}

function compactMap(self, transform) {
  if (!(self instanceof Array)) { throw new TypeError(`${self} is not an array`) }
  const result = []
  for (let element of self) {
    const t = transform(element)
    if (t !== null) {
      result.push(t)
    }
  }
  return result
}

function unique(self) {
  if (!(self instanceof Array)) { throw new TypeError(`${self} is not an array`) }
  const result = []
  for (let element of self) {
    if (result.indexOf(element) == -1) {
      result.push(element)
    }
  }
  return result
}

function sort(self, comparator) {
  if (!(self instanceof Array)) { throw new TypeError(`${self} is not an array`) }
  self.sort((a, b) => (comparator(a, b) ? -1 : +1))
}

function sorting(self, comparator) {
  if (!(self instanceof Array)) { throw new TypeError(`${self} is not an array`) }
  const fn = typeof comparator === 'function'
    ? comparator
    : (a, b) => (a < b)

  const result = [ ...self ]
  sort(result, fn)
  return result
}

export default {
  isEmpty,
  first,
  last,
  contains,
  equals,
  insert,
  inserting,
  remove,
  removing,
  compactMap,
  unique,
  sort,
  sorting,
}
