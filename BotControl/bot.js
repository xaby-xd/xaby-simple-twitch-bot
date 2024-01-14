const tmi = require('tmi.js');

// Configuración del bot
const options = {
    identity: {
        username: 'tu_nombre_de_bot',
        password: 'tu_token_de_oauth', // Puedes obtener este token en https://twitchapps.com/tmi/
    },
    channels: ['tu_canal'],
};

// Crear un cliente de Twitch
const client = new tmi.Client(options);

// Conectar el cliente a Twitch
client.connect();

// Manejar comandos desde el chat
client.on('message', (channel, tags, message, self) => {
    // Verificar si el mensaje es un comando
    if (message.startsWith('!')) {
        const command = message.slice(1); // Eliminar el prefijo "!"

        // Lógica para buscar y ejecutar el comando
        const commandList = JSON.parse(localStorage.getItem('commandList')) || [];

        const matchedCommand = commandList.find(cmd => cmd.name.toLowerCase() === command.toLowerCase());

        if (matchedCommand) {
            // Ejecutar la respuesta del comando
            client.say(channel, matchedCommand.response);
        }
    }
});

// Eventos de suscripción (puedes incluir esta parte si aún lo necesitas)
client.on('subscription', (channel, username, method, message, userstate) => {
    console.log(`${username} se ha suscrito a ${channel} con el método ${method}`);
});

client.on('resub', (channel, username, months, message, userstate, methods) => {
    console.log(`${username} se ha resuscrito a ${channel} por ${months} meses`);
});

client.on('subgift', (channel, username, streakMonths, recipient, methods, userstate) => {
    console.log(`${username} ha regalado una suscripción a ${recipient} en ${channel}`);
});
