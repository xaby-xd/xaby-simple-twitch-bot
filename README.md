# xaby-simple-twitch-bot
Simple twitch bot for simple chat interactions and commands on Node.js and Tmi.js.

For more information about tmi.js follow the official website: https://tmijs.com/

I will add more functionallity in the future.

To run the bot you need to set-up the channel that you want to use the bot and use another account for the twitch api and the bot. and use: $ node /src/index.js .

### Prerequisites

You need to install tmi.js to run the bot and it is recommended to use dotenv.
* npm
  ```sh
  npm install tmi.js@latest
  npm install dotenv@latest
  ```

After configuring the bot, you can now use it and customize it as you need.
   ```js
    const options = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: '', /* Username for the account the bot will use */
        password: '' /* oauth:{token} */
    },
    channels: [''] /* Stream channel user */
    }
   ```

<!-- ROADMAP -->
## Roadmap

- [✔] Basic commands
- [✔] Subs, resubs, gifted subs message
- [❌] Add Changelog
- [❌] Timers
- [❌] Counters
- [❌] Database integration


See the [open issues]() for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>
