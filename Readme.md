# actor.js

Elixir-style actors in JavaScript. Spawn "processes", then send and receive messages between them – just like you would in Elixir.

You can think of it as [`co`](https://github.com/tj/co), but with message passing.

## Example

```js
const pid = spawn(async function() {
  const msg = await this.receive(mail => {
    if (mail === 'hello') return 'world'
  })

  console.log(msg)
})

pid.send('hello')
```

See the [included examples](examples/) for more use cases.

## Install

```
$ yarn add actor.js
```

## API

#### `spawn(fn | asyncFn, ...args) => PID`

Spawn a "process" that will execute the passed-in function.

```js
const pid = spawn(async function(foo, bar) {
  console.log("wee i'm in a process sorta")
}, 'foo', 'bar')
```

#### `PID#send(msg)`

Send a message to a PID.

```js
pid.send(['ok', 'this is a message'])
```

#### `this.receive(pattern) => Promise`

Block until a received message matches the passed-in `pattern` function.

The `pattern` function takes an arbitrary `message` as input, and returns a result based on that `message`.

A result of `undefined` is not considered to be a match, and thus `this.receive()` will continue blocking.

```js
const pid = spawn(async function() {
  const v = await this.receive(msg => {
    const [status, value] = msg
    if (status === 'hello') return value
    if (status === 'world') return "won't match"
  })
})

pid.send(['hello', 'yes this is dog'])
```

#### `PID#then(value =>)`, `PID#catch(err =>)`

The return value of `spawn()` is a thenable.

```js
spawn(async function() {
  // ...
})
  .then(value => { /* ... */ })
  .catch(console.error)
```

# License

MIT
