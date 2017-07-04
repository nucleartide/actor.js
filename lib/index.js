// @flow

const Deferred = require('./deferred')
const sleep = require('./sleep')

/*::
type Result = ['ok', mixed] | ['error', mixed]
*/

/**
 * Spawn an actor.
 */

module.exports = function spawn(
  fn      /*: (...args: Array<mixed>) => void | Promise<void> */,
  ...args /*: Array<mixed> */
) {
  // wait for `Actor` references to be defined
  const promise = sleep(0).then(() => fn(...args))
  return new Actor(promise)
}

class Actor {
  /*::
  _mailbox: Array<mixed>
  _returned: Deferred<mixed> | null
  _internal: Deferred<mixed> | null
  _promise: Promise<mixed>
  */

  /**
   * Initialize empty mailbox.
   */

  constructor(promise) {
    this._mailbox = []
    this._returned = null
    this._internal = null
    this._promise = promise
  }

  /**
   * Place mail in mailbox.
   *
   * If the actor is waiting for mail, alert the actor of new mail.
   */

  send(mail /*: mixed */) {
    this._mailbox.push(mail)
    if (this._internal) this._internal.resolve()
  }

  /**
   * Block until mail that satisfies a pattern match is received.
   *
   * Note: this method is asynchronous.
   */

  receive(pattern /*: (mixed) => mixed */) /*: Deferred<mixed> */ {
    const d = new Deferred
    this._returned = d

    const processUntilOk = () => {
      let status, match
      try {
        [status, match] = this._process(pattern)
      } catch (err) {
        return d.reject(err)
      }

      if (status === 'ok') {
        return d.resolve(match)
      }

      if (status === 'error') {
        this._internal = new Deferred
        this._internal.then(processUntilOk)
      }
    }

    processUntilOk()
    return d
  }

  /**
   * Process mail with Elixir's `receive` algorithm.
   *
   * This is outlined on page 140 of "Elixir in Action".
   */

  _process(pattern /*: (mixed) => mixed */) /*: Result */ {
    for (let i = 0; i < this._mailbox.length; i++) {
      const mail = this._mailbox[i]
      const match = pattern(mail)

      if (match !== undefined) {
        this._mailbox.splice(i, 1)
        return ['ok', match]
      }
    }

    return ['error', 'No matches.']
  }

  then() {
    return this._promise.then(...arguments)
  }

  catch() {
    return this._promise.catch(...arguments)
  }
}
