
// Alternate version of https://github.com/tj/deferred.js
// that hangs until resolved or rejected.

module.exports = function Deferred() {
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

  this.then = p.then.bind(p)
  this.catch = p.catch.bind(p)
}
