// @flow

const Deferred = require('deferred')

/**
 * Blocked is an alternate version of Deferred that makes
 * the process hang until resolved or rejected.
 */

module.exports = class Blocked extends Deferred {
  constructor() {
    super()

    const resolve = this.resolve
    const reject = this.reject
    const id = setInterval(() => {}, ~(1 << 31))

    this.resolve = function(value) {
      clearInterval(id)
      resolve(value)
    }

    this.reject = function(error) {
      clearInterval(id)
      reject(error)
    }
  }
}
