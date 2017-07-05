// @flow

const spawn = require('..')

const jason = spawn(async function() {
  const msg = 'sup fam'
  log('jason', msg)
  jesse.send(msg)
}).catch(console.error)

const dog = spawn(async function() {
  const msg = 'woof'
  log('dog', msg)
  jesse.send(msg)
}).catch(console.error)

const jesse = spawn(async function() {
  for (let i = 0; i < 2; i++) {
    const result = await this.receive(mail => {
      if (mail === 'sup fam') return 'sup'
      if (mail === 'woof') return 'stahp'
    })

    log('jesse', result)
  }
}).catch(console.error)

function log(actor, result) {
  if (typeof result === 'string') console.log(`${actor}: ${result}`)
}
