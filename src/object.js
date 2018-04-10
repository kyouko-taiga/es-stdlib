import { KeyError } from './errors.js'

function isEmpty(self) {
  if (!(self instanceof Object)) { throw new TypeError(`${self} is not an object`) }
  for (let key in self) {
    if (key in self) { return false }
  }
  return true
}

function length(self) {
  if (!(self instanceof Object)) { throw new TypeError(`${self} is not an object`) }
  return Object.keys(self).length
}

function contains(self, predicate) {
  if (!(self instanceof Object)) { throw new TypeError(`${self} is not an object`) }
  const fn = typeof predicate === 'function'
    ? predicate
    : (key, value) => (key == predicate[0] && value == predicate[1])

  for (let key in self) {
    if (fn(key, self[key])) {
      return true
    }
  }
  return false
}

function equals(lhs, rhs, comparator = (a, b) => (a == b)) {
  if (!(lhs instanceof Object)) { throw new TypeError(`${self} is not an object`) }
  if (!(rhs instanceof Object)) { return false }
  if (length(lhs) != length(rhs)) { return false }
  for (let key in lhs) {
    if (!comparator(lhs[key], rhs[key])) { return false }
  }
  return true
}

function merge(self, other, combinator) {
  if (!(self instanceof Object)) { throw new TypeError(`${self} is not an object`) }
  for (let key in other) {
    self[key] = key in self
      ? combinator(self[key], other[key])
      : other[key]
  }
}

function merging(self, other, combinator) {
  if (!(self instanceof Object)) { throw new TypeError(`${self} is not an object`) }
  const result = Object.assign({}, self)
  merge(result, other, combinator)
  return result
}

function filter(self, predicate) {
  if (!(self instanceof Object)) { throw new TypeError(`${self} is not an object`) }
  for (let key in self) {
    if (!predicate(key, self[key])) {
      delete self[key]
    }
  }
}

function filtering(self, predicate) {
  if (!(self instanceof Object)) { throw new TypeError(`${self} is not an object`) }
  const result = {}
  for (let key in self) {
    if (predicate(key, self[key])) {
      result[key] = self[key]
    }
  }
  return result
}

function mutate(self, transform) {
  if (!(self instanceof Object)) { throw new TypeError(`${self} is not an object`) }
  for (let key in self) {
    const t = transform(self, self[key])
    delete self[key]
    if (t !== null) {
      self[t[0]] = t[1]
    }
  }
}

function mutating(self, transform) {
  if (!(self instanceof Object)) { throw new TypeError(`${self} is not an object`) }
  const result = {}
  for (let key in self) {
    const t = transform(self, self[key])
    if (t !== null) {
      result[t[0]] = t[1]
    }
  }
  return result
}

function map(self, transform) {
  if (!(self instanceof Object)) { throw new TypeError(`${self} is not an object`) }
  return Object.keys(self).map((key) => transform(key, self[key]))
}

function compactMap(self, transform) {
  if (!(self instanceof Object)) { throw new TypeError(`${self} is not an object`) }
  const result = []
  for (let key in self) {
    const t = transform(key, self[key])
    if (t !== null) {
      result.push(t)
    }
  }
  return result
}

export default {
  isEmpty,
  length,
  contains,
  equals,
  merge,
  merging,
  filter,
  filtering,
  mutate,
  mutating,
  map,
  compactMap,
}
