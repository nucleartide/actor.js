
const spawn = require('.')

const jason = spawn(async function() {
  const msg = 'sup fam'
  console.log(`jason: ${msg}`)
  jesse.send(msg)
})

const dog = spawn(async function() {
  const msg = 'woof'
  console.log(`dog: ${msg}`)
  jesse.send(msg)
})

const jesse = spawn(async function() {
  let result = await jesse.receive(mail => {
    switch (mail) {
    case 'sup fam':
      return 'sup'
    }
  })
  console.log(`jesse: ${result}`)

  result = await jesse.receive(mail => {
    switch (mail) {
    case 'woof':
      return 'stahp'
    }
  })
  console.log(`jesse: ${result}`)
})
