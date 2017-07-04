
const PID = require('./pid')
const Actor = require('./actor')
const Context = require('./context')
const Deferred = require('deferred')

module.exports = function spawn(fn, ...args) {
  const a = new Actor
  const d = new Deferred

  setTimeout(() => {
    let value
    try {
      value = fn.call(new Context(a), ...args)
      d.resolve(value)
    } catch (err) {
      d.reject(err)
    }
  }, 0)

  return new PID(a, d)
}
