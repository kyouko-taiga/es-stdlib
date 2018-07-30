import { assert, expect } from 'chai'
import u from '../src'

describe('array', () => {

  it('isEmpty', () => {
    expect(u.array.isEmpty([ 0, 1, 2 ])).to.be.false
    expect(u.array.isEmpty([])).to.be.true
  })

  it('first', () => {
    expect(u.array.first([ 0, 1, 2 ])).to.equal(0)
    expect(u.array.first([])).to.be.undefined
  })

  it('first with predicate', () => {
    expect(u.array.first([ 0, 1, 2 ], (x) => (x == 1))).to.equal(1)
    expect(u.array.first([], (x) => (x == 1))).to.be.undefined
  })

  it('last', () => {
    expect(u.array.last([ 0, 1, 2 ])).to.equal(2)
    expect(u.array.last([])).to.be.undefined
  })

  it('contains', () => {
    expect(u.array.contains([ 4, 2, 3, 1 ], 2)).to.be.true
    expect(u.array.contains([ 4, 2, 3, 1 ], 0)).to.be.false
  })

  it('contains with closure', () => {
    expect(u.array.contains([ 4, 2, 3, 1 ], (x) => (x == 2))).to.be.true
    expect(u.array.contains([ 4, 2, 3, 1 ], (x) => (x == 0))).to.be.false
  })

  it('equals', () => {
    expect(u.array.equals([], [])).to.be.true
    expect(u.array.equals([ 1 ], [ 1 ])).to.be.true
    expect(u.array.equals([ 1, 2 ], [ 1, 2 ])).to.be.true

    expect(u.array.equals([], [ 1, 2 ])).to.be.false
    expect(u.array.equals([ 1, 2 ], [])).to.be.false
    expect(u.array.equals([ 1, 2 ], {})).to.be.false
  })

  it('equals with comparator', () => {
    const comparator = (a, b) => (a == b)

    expect(u.array.equals([], [], comparator)).to.be.true
    expect(u.array.equals([ 1 ], [ 1 ], comparator)).to.be.true
    expect(u.array.equals([ 1, 2 ], [ 1, 2 ], comparator)).to.be.true

    expect(u.array.equals([], [ 1, 2 ], comparator)).to.be.false
    expect(u.array.equals([ 1, 2 ], [], comparator)).to.be.false
    expect(u.array.equals([ 1, 2 ], {}, comparator)).to.be.false
  })

  it('insert', () => {
    const a = []
    u.array.insert(a, 1, 0)
    expect(u.array.equals(a, [ 1 ])).to.be.true
    u.array.insert(a, 2, 0)
    expect(u.array.equals(a, [ 2, 1 ])).to.be.true
    u.array.insert(a, 3, 1)
    expect(u.array.equals(a, [ 2, 3, 1 ])).to.be.true
    u.array.insert(a, 4)
    expect(u.array.equals(a, [ 4, 2, 3, 1 ])).to.be.true

    expect(() => { u.array.insert([], 1, 1) }).to.throw()
    expect(() => { u.array.insert([], 1, -1) }).to.throw()
  })

  it('inserting', () => {
    expect(u.array.equals(u.array.inserting([], 1, 0), [ 1 ])).to.be.true
    expect(u.array.equals(u.array.inserting([ 1 ], 2, 0), [ 2, 1 ])).to.be.true
    expect(u.array.equals(u.array.inserting([ 2, 1 ], 3, 1), [ 2, 3, 1 ])).to.be.true
    expect(u.array.equals(u.array.inserting([ 2, 3, 1 ], 4), [ 4, 2, 3, 1 ])).to.be.true

    expect(() => { u.array.inserting([], 1, 1) }).to.throw()
    expect(() => { u.array.inserting([], 1, -1) }).to.throw()
  })

  it('remove', () => {
    const a = [ 4, 2, 3, 1 ]
    u.array.remove(a, 1)
    expect(u.array.equals(a, [4, 3, 1])).to.be.true
    u.array.remove(a, 2)
    expect(u.array.equals(a, [4, 3])).to.be.true
    u.array.remove(a, 0)
    expect(u.array.equals(a, [3])).to.be.true

    expect(() => { u.array.remove([], 1, 1) }).to.throw()
    expect(() => { u.array.remove([], 1, -1) }).to.throw()
  })

  it('removing', () => {
    expect(u.array.equals(u.array.removing([ 4, 2, 3, 1 ], 0), [ 2, 3, 1 ])).to.be.true
    expect(u.array.equals(u.array.removing([ 4, 2, 3, 1 ], 1), [ 4, 3, 1 ])).to.be.true

    expect(() => { u.array.removing([], 1, 1) }).to.throw()
    expect(() => { u.array.removing([], 1, -1) }).to.throw()
  })

  it('compactMap', () => {
    const result = u.array.compactMap([ 4, 2, 3, 1 ], (x) => (x != 2 ? x * x : null))
    expect(u.array.equals(result, [ 16, 9, 1 ])).to.be.true
  })

  it('unique', () => {
    expect(u.array.equals(u.array.unique([3, 1, 2]), [3, 1, 2])).to.be.true
    expect(u.array.equals(u.array.unique([3, 1, 2, 1]), [3, 1, 2])).to.be.true
    expect(u.array.equals(u.array.unique([3, 2, 3, '2']), [3, 2, '2'])).to.be.true
    const a1 = [1, 2]
    const a2 = [1, 2]
    expect(u.array.equals(u.array.unique([3, a1, a1]), [3, a1])).to.be.true
    expect(u.array.equals(u.array.unique([3, a1, a2]), [3, a1, a2])).to.be.true
  })

  it('sort', () => {
    const a = [ 4, 2, 3, 1 ]
    u.array.sort(a, (a, b) => (a < b))
    expect(u.array.equals(a, [ 1, 2, 3, 4 ])).to.be.true
  })

  it('sorting', () => {
    expect(u.array.equals(u.array.sorting([ 2, 3, 1 ]), [1, 2, 3])).to.be.true
  })

  it('sorting with closure', () => {
    expect(u.array.equals(u.array.sorting([ 2, 3, 1 ], (a, b) => (a < b)), [ 1, 2, 3 ])).to.be.true
  })

})
