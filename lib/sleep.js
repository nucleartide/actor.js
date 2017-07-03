// @flow

module.exports = function sleep(ms /*: number */) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
