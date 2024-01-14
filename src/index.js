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
    client.action('{stream user name}', `Bot is runing now, Use "!commands" to see the command list.`)
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
    if (commandName === '!commands') {
        client.say(target, `${ctx.username}, Here is the command list: hello, !commands`);
    }

    // Manejar eventos de suscripción
    client.on('subscription', (channel, username, method, message, userstate) => {
    // Manejar evento de suscripción
    console.log(`${username} has subscribed to ${channel}´s with ${method}`);
    // You can send a personalized message here
    });

    client.on('resub', (channel, username, months, message, userstate, methods) => {
    // Manejar evento de resuscripción
    console.log(`${username} has been resubscribed to ${channel}´s channel for ${months} months`);
    // You can send a personalized message here
    });

    client.on('subgift', (channel, username, streakMonths, recipient, methods, userstate) => {
    // Manejar evento de regalo de suscripción
    console.log(`${username} has gifted a sub to ${recipient} on ${channel}´s chanel`);
    // You can send a personalized message here
    });


})
