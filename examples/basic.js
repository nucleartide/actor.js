// @flow

/*::
import type Deferred from '../lib/deferred'
declare function $await<T>(p: Deferred<T> | T): T
*/

const spawn = require('..')

const jason = spawn(async function() {
  const msg = 'sup fam'
  log('jason', msg)
  jesse.send(msg)
})

const dog = spawn(async function() {
  const msg = 'woof'
  log('dog', msg)
  jesse.send(msg)
})

const jesse = spawn(async function() {
  for (let i = 0; i < 2; i++) {
    const result = await jesse.receive(mail => {
      switch (mail) {
      case 'sup fam': return 'sup'
      case 'woof': return 'stahp'
      }
    })

    log('jesse', result)
  }
})

function log(actor, result) {
  if (typeof result === 'string') {
    console.log(`${actor}: ${result}`)
  }
}
