// @flow

const spawn = require('..')
const { take, all } = require('./_util')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function asyncQuery(queryDef) {
  spawn(async function() {
    await sleep(2000)
    main.send(`${queryDef} result`)
  })
}

const main = spawn(async function() {
  const queries = take(5)
    .map(i => asyncQuery(`query ${i}`))
    .map(() => () => this.receive())

  const results = await all(queries)
  console.log(results)
})
