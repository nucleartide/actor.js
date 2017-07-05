// @flow

/*::
import type Actor from './actor'
*/

module.exports = class Context {
  /*::
  _actor: Actor
  */

  constructor(actor /*: Actor */) {
    this._actor = actor
  }

  receive() {
    return this._actor.receive(...arguments)
  }
}
