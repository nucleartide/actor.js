
const Ok = Symbol('ok')
const Err = Symbol('error')
const Deferred = require('./deferred')

/**
 * Spawn an actor.
 */

module.exports = function spawn(fn) {
  setTimeout(fn, 0) // wait for `Actor` references to be defined
  return new Actor
}

class Actor {

  /**
   * Initialize empty mailbox.
   */

  constructor() {
    this._mailbox = []
  }

  /**
   * Place mail in mailbox.
   *
   * If the actor is waiting for mail, alert the actor of new mail.
   */

  send(mail) {
    this._mailbox.push(mail)
    if (this._internal) this._internal.resolve()
  }

  /**
   * Block until mail that satisfies a pattern match is received.
   *
   * Note: this method is asynchronous.
   */

  receive(pattern) {
    this._returned = new Deferred

    const processUntilOk = () => {
      const [status, match] = this._process(pattern)
      if (status === Ok) {
        this._returned.resolve(match)
        this._internal = null
      } else {
        this._internal = new Deferred
        this._internal.then(processUntilOk)
      }
    }

    processUntilOk()
    return this._returned
  }

  /**
   * Process mail with Elixir's `receive` algorithm.
   *
   * This is outlined on page 140 of "Elixir in Action".
   */

  _process(pattern) {
    for (let i = 0; i < this._mailbox.length; i++) {
      const mail = this._mailbox[i]
      const match = pattern(mail)

      if (match !== undefined) {
        this._mailbox.splice(i, 1)
        return [Ok, match]
      }
    }

    return [Err]
  }
}
