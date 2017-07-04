
module.exports = class Context {
  constructor(actor) {
    this._actor = actor
  }

  receive() {
    return this._actor.receive(...arguments)
  }
}
