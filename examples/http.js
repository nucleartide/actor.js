// @flow

// Example adopted from TJ's channel.js lib:
// https://github.com/tj/channel.js/blob/master/examples/http.js

const spawn = require('..')
const axios = require('axios')
const { take } = require('./_util')

// worker
async function worker(i) {
  while (1) {
    const url = await this.receive(url => url)
    if (url === null) break

    console.log('[%d]: GET %s', i, url)
    const res = await axios.get(url)
    console.log('[%d]: GET %s -> %s', i, url, res.status)
  }

  console.log('[%d]: done', i)
}

// start workers
const workers = take(3).map(i => {
  return spawn(worker, i).catch(console.error)
})

// load balancer
const lb = spawn(async function() {
  let reqs = 0

  while (1) {
    const url = await this.receive(url => url)
    if (url === null) {
      workers.forEach(w => w.send(null))
      break
    }

    workers[reqs % 3].send(url)
    reqs++
  }
})

// http request maker
spawn(async function() {
  lb.send('http://reddit.com')
  lb.send('http://github.com')
  lb.send('http://news.ycombinator.com')
  lb.send('http://twitch.tv')
  lb.send('http://medium.com')
  lb.send('http://twitter.com')
  lb.send('http://pagerduty.com')
  lb.send(null)
})
