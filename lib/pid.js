// @flow

const Actor = require('./actor')

/*::
type OnFulfill = (value: mixed) => Promise<mixed> | mixed
type OnReject = (error: any) => Promise<mixed> | mixed
*/

module.exports = class PID {
	/*::
	_actor: Actor
	_promise: Promise<mixed>
	*/

  constructor(actor /*: Actor */, promise /*: Promise<mixed> */) {
    this._actor = actor
    this._promise = promise
  }

  send(...args /*: Array<mixed> */) {
    return this._actor.send(...args)
  }

  then(onFulfill /*:: ?: OnFulfill */, onReject /*:: ?: OnReject */) {
    this._promise = this._promise.then(onFulfill, onReject)
    return this
  }

  catch(onReject /*:: ?: OnReject */) {
    this._promise = this._promise.catch(onReject)
    return this
  }
}
