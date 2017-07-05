# actor.js

Elixir-style actors in JavaScript. Spawn "processes", then send and receive messages like you would in Elixir.

## Example

```js
const pid = spawn(async function() {
  const msg = await this.receive(mail => {
    if (mail === 'hello') return 'world'
  })

  console.log(msg)
})

pid.send('hello world')
```

See the [included examples](examples/) for more demonstration.

## Install

```
$ yarn add actor.js
```

## API

# License

MIT
