// @flow

/**
 * Alternate version of https://github.com/tj/deferred.js
 * that hangs until resolved or rejected.
 */

module.exports = class Deferred /*:: <R> */ {
  /*::
  resolve: (result: Promise<R> | R) => void

  reject: (error: any) => void

  then: <U>(
    onFulfill?: (value: R) => Promise<U> | U,
    onReject?:  (error: any) => Promise<U> | U
  ) => Promise<U>

  catch: <U>(
    onReject?: (error: any) => Promise<U> | U
  ) => Promise<R | U>
  */

  constructor() {
    const id = setInterval(() => {}, ~(1 << 31))

    const p = new Promise((resolve, reject) => {
      this.resolve = function() {
        clearInterval(id)
        resolve(...arguments)
      }

      this.reject = function() {
        clearInterval(id)
        reject(...arguments)
      }
    })

    const then /*: any */ = p.then
    const _catch /*: any */ = p.catch

    this.then = then.bind(p)
    this.catch = _catch.bind(p)
  }
}
