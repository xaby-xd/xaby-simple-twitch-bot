const tmi = require('tmi.js')

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

const client = new tmi.client(options)

client.connect();

client.on('connected', (address, port) => {
    client.action('xaby_xd', `Bot is runing now, Usad "!comandos" para ver todos los comandos.`)
})

/* ${address}:${port}   <- Show the port that will use the bot */

client.on('chat', (target, ctx, message, self) => {
    if (self) return;

    console.log(target);
    console.log(ctx)

    const commandName = message.trim();


    if (commandName === 'hello') {
        client.say(target, `Hello!! ${ctx.username} hehe blobDance blobDance `);
    }



})