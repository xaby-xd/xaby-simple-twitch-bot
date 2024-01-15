<a name="readme-top"></a>

# xaby-simple-twitch-bot
Simple twitch bot for simple chat interactions and commands on Node.js and Tmi.js.

For more information about tmi.js follow the official website: https://tmijs.com/ .

I will add more functionallity in the future. See the [Roadmap](https://github.com/xaby-xd/xaby-simple-twitch-bot?tab=readme-ov-file#roadmap).

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Vue][Vue.js]][Vue-url]
* [![Angular][Angular.io]][Angular-url]
* [![Svelte][Svelte.dev]][Svelte-url]
* [![Laravel][Laravel.com]][Laravel-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![JQuery][JQuery.com]][JQuery-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- PREREQUISITES -->
### Prerequisites

1. Get a free API Key at [https://dev.twitch.tv/](https://dev.twitch.tv/) or just using your user account by generating a password for the API [https://twitchapps.com/tmi/](https://twitchapps.com/tmi/).

2. You need to install tmi.js to run the bot and it is recommended to use dotenv.
* npm
  ```sh
  npm install tmi.js@latest
  npm install dotenv@latest
  ```

3. After running the bot you will need to configure it.
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


   ```js
       case 'test':
                client.say(target, `${ctx.username} test command`);
                break;
   ```


<!-- RUN -->
## Runnning the bot

You can now use it and customize it as you need, use the command bellow to run the bot, You can run the bot locally or online using platforms like [Heroku](https://www.heroku.com/).

   ```sh
   node /src/index.js
   ```

<!-- ROADMAP -->
## Roadmap

- [✔] Basic commands.
- [✔] Subs, resubs, gifted subs message.
- [🛠] Current song command (locally).
- [🛠] Bot control-Web gui.
- [❌] Mods commands.
- [❌] Add Changelog.
- [❌] Raids notification.
- [❌] Timers.
- [❌] Counters.
- [❌] Database integration.
- [❌] Discord integration.
- [❌] Multi-language Support.
    - [❌] Spanish
    - [❌] English


See the [open issues](https://github.com/xaby-xd/xaby-simple-twitch-bot/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>
