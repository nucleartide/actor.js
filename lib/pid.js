
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
    return this._promise.then(...arguments)
  }

  catch() {
    return this._promise.catch(...arguments)
  }
}
