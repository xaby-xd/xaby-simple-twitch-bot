<a name="readme-top"></a>

# xaby-simple-twitch-bot
Simple twitch bot for simple chat interactions and commands on Node.js and Tmi.js.

For more information about tmi.js follow the official website: https://tmijs.com/

I will add more functionallity in the future.


### Prerequisites

1. Get a free API Key at [https://dev.twitch.tv/](https://dev.twitch.tv/)

2. You need to install tmi.js to run the bot and it is recommended to use dotenv.
* npm
  ```sh
  npm install tmi.js@latest
  npm install dotenv@latest
  ```

3. After configuring the bot, you can now use it and customize it as you need.
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
## Runnning the bot

Use the command bellow to run the bot, You can run the bot locally or online using platforms like Heroku.
   ```sh
   node /src/index.js
   ```

<!-- ROADMAP -->
## Roadmap

- [✔] Basic commands
- [✔] Subs, resubs, gifted subs message
- [❌] Add Changelog
- [❌] Timers
- [❌] Counters
- [❌] Database integration


See the [open issues](https://github.com/xaby-xd/xaby-simple-twitch-bot/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>
