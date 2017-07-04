
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

  it('accepts args', async function() {
    const args = await spawn((a, b, c) => [a, b, c], 'do', 're', 'mi')
    assert.deepEqual(args, ['do', 're', 'mi'])
  })

  it('returns a rejected Promise on error', async function() {
    let expect = 0

    try {
      await spawn(() => { throw 'error' })
    } catch (err) {
      assert.equal(err, 'error')
      expect++
    }

    assert.equal(expect, 1)
  })
})

describe('send and receive', function() {
  it('can send and receive messages', async function() {
    spawn(function() {
      pid.send('hello')
    })

    const pid = spawn(async function() {
      return await this.receive(mail => {
        if (mail === 'hello') return "is it me you're looking for"
      })
    })

    assert.equal(await pid, "is it me you're looking for")
  })

  it('returns a rejected Promise on receive error', async function() {
    let expect = 0

    const pid = spawn(async function() {
      try {
        await this.receive(() => { throw 'err' })
      } catch (err) {
        assert.equal(err, 'err')
        expect++
      }
    })

    pid.send('hi')
    await pid

    assert.equal(expect, 1)
  })

  it('stops processing mail on success', async function() {
    const pid = spawn(async function() {
      for (let i = 0; i < 10; i++) {
        const a = await this.receive(mail => {
          if (mail === 'a') return 'a'
        })

        assert.equal(a, 'a')
      }
    })

    for (let i = 0; i < 10; i++) pid.send('a')
    await pid
  })

  it('stops processing mail on error', async function() {
    const pid = spawn(async function() {
      let expect = 0
      try {
        await this.receive(mail => {
          if (mail === 'a') throw 'error'
          if (mail === 'b') return 'b'
        })
      } catch (err) {
        expect++
      }

      // mailbox: ['a', 'b']
      assert.equal(expect, 1)

      const a = await this.receive(mail => {
        if (mail === 'a') return 'a'
      })

      // mailbox: ['b']
      assert.equal(a, 'a')

      const b = await this.receive(mail => {
        if (mail === 'b') return 'b'
      })

      // mailbox: []
      assert.equal(b, 'b')
    })

    pid.send('a')
    pid.send('b')
    await pid
  })
})
