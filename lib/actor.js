
const Blocked = require('./blocked')

module.exports = class Actor {

  /**
   * Initialize empty mailbox.
   */

  constructor() {
    this.mailbox = []
    this.receiving = null
  }

  /**
   * Place mail in mailbox.
   *
   * If the actor is waiting for mail, alert the actor of new mail.
   */

  send(mail) {
    this.mailbox.push(mail)
    if (this.receiving) this.receiving()
  }

  /**
   * Process mail with Elixir's `receive` algorithm.
   *
   * This is outlined on page 140 of "Elixir in Action".
   */

  receive(pattern) {
    const b = new Blocked

    this.receiving = () => {
      for (let i = 0; i < this.mailbox.length; i++) {
        const mail = this.mailbox[i]

        // pattern match
        let match
        try {
          match = pattern(mail)
        }

        // error
        catch (err) {
          this.receiving = null
          return b.reject(err)
        }

        // success
        if (match !== undefined) {
          this.mailbox.splice(i, 1)
          this.receiving = null
          return b.resolve(match)
        }
      }
    }

    this.receiving()
    return b
  }
}
