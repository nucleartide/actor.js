
const assert = require('assert')
const spawn = require('..')

describe('spawn', function() {
  it('returns a thenable', async function() {
    const a = await spawn(() => {}).then(() => 'hello')
    assert.equal(a, 'hello')

    const b = await spawn(() => {}).then(() => { throw 'world' }).catch(e => e)
    assert.equal(b, 'world')
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

  it('can send and receive messages', async function() {
    const a = spawn(function() {
      b.send('hello')
    })

    const b = spawn(async function() {
      return await this.receive(mail => {
        if (mail === 'hello') return "is it me you're looking for"
        if (mail === 'flank') return 'steak'
      })
    })

    assert.equal(await b, "is it me you're looking for")
  })

  it('accepts args')

  it('handles errors')

  it("stops processing mail on error")

  it("stops processing mail on success")
})
