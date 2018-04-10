import { assert, expect } from 'chai'
import u from '../src'

describe('object', () => {

  it('isEmpty', () => {
    expect(u.object.isEmpty({ a: 0, b: 1 })).to.be.false
    expect(u.object.isEmpty({})).to.be.true
  })

  it('length', () => {
    expect(u.object.length({ a: 0, b: 1 })).to.equal(2)
    expect(u.object.length({})).to.equal(0)
  })

  it('contains', () => {
    expect(u.object.contains({ a: 0, b: 1, c: 2 }, [ 'a', 0 ])).to.be.true
    expect(u.object.contains({ a: 0, b: 1, c: 2 }, [ 'a', 1 ])).to.be.false
    expect(u.object.contains({ a: 0, b: 1, c: 2 }, [ 'b', 0 ])).to.be.false
  })

  it('contains with closure', () => {
    expect(u.object.contains({ a: 0, b: 1, c: 2 }, (key, value) => (key == 'a'))).to.be.true
    expect(u.object.contains({ a: 0, b: 1, c: 2 }, (key, value) => (key == 'd'))).to.be.false
    expect(u.object.contains({ a: 0, b: 1, c: 2 }, (key, value) => (value == 0))).to.be.true
    expect(u.object.contains({ a: 0, b: 1, c: 2 }, (key, value) => (value == 3))).to.be.false
  })

  it('equals', () => {
    expect(u.object.equals({}, {})).to.be.true
    expect(u.object.equals({ a: 0 }, { a: 0 })).to.be.true
    expect(u.object.equals({ a: 0, b: 1 }, { a: 0, b: 1 })).to.be.true

    expect(u.object.equals({}, { a: 0, b: 1 })).to.be.false
    expect(u.object.equals({ a: 0 }, { a: 0, b: 1 })).to.be.false
    expect(u.object.equals({ a: 0, b: 2 }, { a: 0, b: 1 })).to.be.false
    expect(u.object.equals({ a: 0, b: 2 }, {})).to.be.false
    expect(u.object.equals({ a: 0, b: 2 }, [])).to.be.false
  })

  it('equals with comparator', () => {
    const comparator = (a, b) => (a == b)

    expect(u.object.equals({}, {}, comparator)).to.be.true
    expect(u.object.equals({ a: 0 }, { a: 0 }, comparator)).to.be.true
    expect(u.object.equals({ a: 0, b: 1 }, { a: 0, b: 1 }, comparator)).to.be.true

    expect(u.object.equals({}, { a: 0, b: 1 }, comparator)).to.be.false
    expect(u.object.equals({ a: 0 }, { a: 0, b: 1 }, comparator)).to.be.false
    expect(u.object.equals({ a: 0, b: 2 }, { a: 0, b: 1 }, comparator)).to.be.false
    expect(u.object.equals({ a: 0, b: 2 }, {}, comparator)).to.be.false
    expect(u.object.equals({ a: 0, b: 2 }, [], comparator)).to.be.false
  })

  it('merge', () => {
    const o = { a: 1, b: 2 }
    u.object.merge(o, { a: 3, c: 4 }, (lhs, _) => (lhs))
    expect(u.object.equals(o, { a: 1, b: 2, c: 4 }))
    u.object.merge({ a: 5, d: 6 }, (_, rhs) => (rhs))
    expect(u.object.equals(o, { a: 5, b: 2, c: 4, d: 6 }))
  })

  it('merging', () => {
    const o0 = u.object.merging({ a: 1, b: 2 }, { a: 3, c: 4 }, (lhs, _) => (lhs))
    expect(u.object.equals(o0, { a: 1, b: 2, c: 4 }))
    const o1 = u.object.merging(o0, (_, rhs) => (rhs))
    expect(u.object.equals(o1, { a: 5, b: 2, c: 4, d: 6 }))
  })

  it('filter', () => {
    const o = { 1: 1, 2: 3 }
    u.object.filter(o, (key, value) => (key == value))
    expect(u.object.equals(o, { 1: 1 }))
  })

  it('filtering', () => {
    const o = u.object.filtering({ 1: 1, 2: 3 }, (key, value) => (key == value))
    expect(u.object.equals(o, { 1: 1 }))
  })

  it('mutate', () => {
    const o = { 1: 2, 2: 3 }
    u.object.mutate(o, (key, value) => ([value, key]))
    expect(u.object.equals(o, { 2: 1, 3: 2 }))
    u.object.mutate(o, (key, value) => (key == 2 ? [value, key] : null))
    expect(u.object.equals(o, { 2: 1 }))
  })

  it('mutating', () => {
    const o0 = u.object.mutating({ 1: 2, 2: 3 }, (key, value) => ([value, key]))
    expect(u.object.equals(o0, { 2: 1, 3: 2 }))
    const o1 = u.object.mutating(o0, (key, value) => (key == 2 ? [value, key] : null))
    expect(u.object.equals(o1, { 2: 1 }))
  })

  it('map', () => {
    const o0 = { 1: 2, 2: 3 }
    const a0 = u.array.sorting(u.object.map(o0, (key, value) => (key)))
    expect(u.array.equals(a0, [1, 2]))

    const o1 = { 1: 2, 2: 3 }
    const a1 = u.array.sorting(u.object.map(o1, (key, value) => (value)))
    expect(u.array.equals(a1, [2, 3]))
  })

  it('compactMap', () => {
    const o0 = { 1: 2, 2: 3 }
    const a0 = u.object.compactMap(o0, (key, value) => (key == 2 ? key : null))
    expect(u.array.equals(a0, [2]))

    const o1 = { 1: 2, 2: 3 }
    const a1 = u.object.compactMap(o1, (key, value) => (value == 2 ? value : null))
    expect(u.array.equals(a1, [2]))
  })

})
