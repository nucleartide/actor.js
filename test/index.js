
const assert = require('assert')
const spawn = require('..')

// `spawn()` is like `co()`, except it accepts non-generator
// functions. The return value of `spawn()` also exposes a
// `.send()` method.

describe('spawn', function() {
  it('returns a thenable', async function() {
    const a = await spawn(() => {}).then(() => 'hello')
    assert.equal(a, 'hello')
  })

  it('works with plain functions', async function() {
    let expect = 0
    await spawn(() => expect++)
    assert.equal(expect, 1)
  })

  it('works with async functions', async function() {
    let expect = 0
    await spawn(async function() { expect++ })
    assert.equal(expect, 1)
  })

  it('works with functions that return Promises', async function() {
    const a = await spawn(() => Promise.resolve('jesse'))
    assert.equal(a, 'jesse')
  })

  it('can receive messages')

  it('handles errors')
})
