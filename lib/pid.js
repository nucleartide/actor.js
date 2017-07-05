
const Actor = require('./actor')

module.exports = class PID {
  constructor(actor, promise) {
    this._actor = actor
    this._promise = promise
  }

  send() {
    return this._actor.send(...arguments)
  }

  then() {
    this._promise = this._promise.then(...arguments)
    return this
  }

  catch() {
    this._promise = this._promise.catch(...arguments)
    return this
  }
}
