const tmi = require('tmi.js');
const fs = require('fs');
const readline = require('readline');
const kleur = require('kleur');

const { readAndSendFile } = require('./file-handler.js');
const chatLogFile = ('src/chat.log');
// const { measureMemory } = require('vm');

const options = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true,
        secure: true,
        timeout: 10000,
        maxReconnectAttempts: 5
    },
    identity: {
        username: 'Bot-Username',
        password: 'oauth:token'
    },
    channels: ['stream-channel'],
}

const client = new tmi.client(options)

let startTime;
let lastUptimeCommandTime = 0;
let modsList = ['CarnashBot'];
let vipsList = ['null'];

client.connect();

client.on('connected', (address, port) => {
    client.action('user', `Bot is running now. Usad "!comandos" para ver todos los comandos.`);
    console.log(kleur.cyan('Bot is running, use: "commands" to see the command list'));
    startTime = new Date();
})

client.on('chat', (target, ctx, message, self) => {
    if (self) return;

    // Escuchar eventos de mod y vip
    client.on('mods', (target, mods) => {
        modsList = mods;
        console.log(kleur.yellow('Lista de Moderadores actualizada:'));
        console.log(modsList);
    });

    client.on('vips', (target, vips) => {
        vipsList = vips;
        console.log(kleur.yellow('Lista de VIPs actualizada:'));
        console.log(vipsList);
    });

    // Log del chat
    const logEntry = `[${new Date().toLocaleString()}] ${ctx.username}: ${message}\n`;
    fs.appendFile(chatLogFile, logEntry, (err) => {
        if (err) {
            console.error('Error al escribir en el archivo de registro:', err);
        }
    });


    if (message.startsWith('!')) {
        const command = message.slice(1).toLowerCase();

        switch (command) {
            case 'song':
                const readcurrentsong = readAndSendFile(target, 'src/current_song.txt');
                client.say(target, `${ctx.username}, Esta es la canción que está sonando: ${readcurrentsong}`);
                break;
            case 'elo':
                const readcurrentelo = readAndSendFile(target, 'src/lol-rank.txt');
                client.say(target, `${ctx.username}, ───────────────★─────────────── xabyxxd ► ${readcurrentelo}───────────────★───────────────`);
                break;
            case 'xd':
                client.say(target, `${ctx.username} xdn´t`);
                break;
            case 'redes':
                client.say(target, ' ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ (TikTok) https://www.tiktok.com/@xabyxd ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ (Twitter) https://twitter.com/xaby016 ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ (Youtube) https://www.youtube.com/c/xabyxd ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ (Instagram) www.instagram.com/__xaby__');
                break;
            case 'emotes':
                client.say(target, 'Puedes usar emotes gratuitamente con la extensión 7tv, https://7tv.app/ ');
                break;
            case 'bot':
                client.say(target, 'Este bot está construido por xabyxd con el lenguaje Javascript, ve al GitHub para ver el código');
                break;
            case 'discord':
                client.say(target, 'Este es el enlace a mi discord: https://discord.gg/YYbuERfrnd');
                break;
            case 'opgg':
                client.say(target, 'Main: https://www.op.gg/summoners/euw/xabyxd-6666');
                break;
            case 'maestria':
                client.say(target, 'xaby tiene 408.445 puntos de maestria con Riven🍃⚔ (Está malito)');
                break;
            case 'hola':
                client.say(target, 'hola HEADTOTHEFUCKINGWALL HEADTOTHEFUCKINGWALL ');
                break;
            case 'comandos':
                client.say(target, 'Para usar los comandos deben empezar port !, Esta es la lista de comandos; song, elo, maestria, playlist, discord, opgg, xd, redes, emotes, bot, uptime, hola');
                break;
            case 'playlist':
                client.say(target, 'Nope, no hay playlist :/');
                break;
            case 'uptime':
                const currentTime = new Date().getTime();
                const elapsedTimeSinceLastCommand = (currentTime - lastUptimeCommandTime) / 1000;
                if (elapsedTimeSinceLastCommand < 120) { // 120 segundos = 2 minutos
                    client.say(target, `${ctx.username}, por favor, espera antes de usar el comando uptime nuevamente.`);
                } else {
                    lastUptimeCommandTime = currentTime;
                    const uptimeInSeconds = (currentTime - startTime) / 1000;
                    const days = Math.floor(uptimeInSeconds / 86400);
                    const hours = Math.floor((uptimeInSeconds % 86400) / 3600);
                    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
                    const seconds = Math.floor(uptimeInSeconds % 60);
                    client.say(target, `${ctx.username}, el bot lleva funcionando ${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos.`);
                }
                break;
        }
    }
});


// Función para medir la latencia
function measureLatency() {
    const start = Date.now();
    client.ping().then(() => {
        const latency = Date.now() - start;
        console.log(kleur.green(`Latencia actual con el servidor: ${latency} ms`));
    }).catch((err) => {
        console.error('Error al medir la latencia:', err);
    });
}

// Crear interfaz de lectura para leer desde la terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Variable para seguir el estado de confirmación del reinicio
let confirmacionReinicio = false;

// Escuchar eventos de línea para detener el bot y ver el estado del bot desde la terminal
rl.on('line', (input) => {
    if (input.toLowerCase() === 'stop') {
        console.log(kleur.red('Deteniendo el bot...'));
        client.action('xaby_xd', 'Deteniendo el bot...');
        client.disconnect().then(() => {
            console.log(kleur.red('Bot detenido.'));
            process.exit(0);
        });

    } else if (input.toLowerCase() === 'reboot') { // Comando para reiniciar el bot
        if (!confirmacionReinicio) {
            console.log(kleur.yellow('¿Estás seguro de que deseas reiniciar el bot? (y/n)'));
            confirmacionReinicio = true;

            rl.once('line', (confirm) => {
                if (confirm.trim().toLowerCase() === 'y') {
                    console.log(kleur.yellow('Reiniciando el bot...'));
                    client.action('xaby_xd', 'Reiniciando el bot...');

                    // Desconectar el bot
                    client.disconnect().then(() => {
                        console.log(kleur.yellow('Bot desconectado.'));
                        // Volver a conectar el bot
                        console.log(kleur.yellow('Iniciando el bot...'));
                        // Mostrar la barra de progreso
                        let progressBar = '[';
                        const interval = setInterval(() => {
                            progressBar += '=';
                            process.stdout.clearLine();  // Limpiar la línea anteriormente impresa
                            process.stdout.cursorTo(0); // Mover el cursor al inicio de la línea
                            process.stdout.write('Progreso: ' + progressBar + ']'); // Imprimir la barra de progreso
                        }, 1000); // Actualizar la barra de progreso cada segundo

                        setTimeout(() => {
                            clearInterval(interval); // Detener la actualización de la barra de progreso
                            console.log(); // Nueva línea para separar la barra de progreso
                            client.connect();
                        }, 10000); // Esperar 10 segundos antes de reiniciar el bot se puede aumentar por ejemplo 15000 son 15 segundos
                    }).catch((err) => {
                        console.error(kleur.red('Error al desconectar el bot:', err));
                    });
                } else if (confirm.trim().toLowerCase() === 'n') {
                    console.log(kleur.yellow('Reinicio del bot cancelado.'));
                } else {
                    console.log(kleur.red('Entrada no reconocida. Reinicio del bot cancelado.'));
                }

                // Restablecer el estado de confirmación
                confirmacionReinicio = false;
            });
        } else {
            console.log(kleur.yellow('Ya se ha solicitado una confirmación para reiniciar el bot. Por favor, espera.'));
        }

    } else if (input.toLowerCase().startsWith('ban')) { // Comando para banear a un usuario
        const usernameToBan = input.split(' ')[1]; // Obtener el nombre de usuario a banear del comando
        if (usernameToBan) {
            client.say('xaby_xd', `/ban ${usernameToBan}`).then(() => {
                console.log(kleur.green(`Usuario ${usernameToBan} baneado correctamente.`));
            }).catch((err) => {
                console.error(kleur.red('Error al banear al usuario:', err));
            });
        } else {
            console.log(kleur.red('Sintaxis incorrecta. Uso: bot.ban <username>'));
        }
    } else if (input.toLowerCase().startsWith('unban')) { // Comando para desbanear a un usuario
        const usernameToUnban = input.split(' ')[1]; // Obtener el nombre de usuario a desbanear del comando
        if (usernameToUnban) {
            client.say('xaby_xd', `/unban ${usernameToUnban}`).then(() => {
                console.log(kleur.green(`Usuario ${usernameToUnban} desbaneado correctamente.`));
            }).catch((err) => {
                console.error(kleur.red('Error al desbanear al usuario:', err));
            });
        } else {
            console.log(kleur.red('Sintaxis incorrecta. Uso: bot.unban <username>'));
        }

    } else if (input.toLowerCase() === 'mods') {
        console.log(kleur.yellow('Lista de Moderadores:'));
        console.log(modsList);

    } else if (input.toLowerCase() === 'vips') {
        console.log(kleur.yellow('Lista de VIPs:'));
        console.log(vipsList);

    } else if (input.toLowerCase() === 'commands') { // Comando para mostrar lista de comandos disponibles
        console.log(kleur.yellow('Lista de comandos disponibles:'));
        console.log('- stop: Para detener el bot');
        console.log('- reboot: Para reiniciar el bot');
        console.log('- status: Para ver el estado del bot');
        console.log('- clear.chat: Para limpiar el chat de Twitch');
        console.log('- ban <username>: Para banear usuarios');
        console.log('- unban <username>: Para desbanear usuarios');
        console.log('- mods: para mostrar la lista de mods del chat');
        console.log('- vips: Para mostrar la lista de vips del chat');
        console.log('- uptime: Para ver el tiempo total que el bot lleva funcionando');
        console.log('- commands: Para mostrar esta lista de comandos');

    } else if (input.toLowerCase() === 'clear.chat') { // Comando para limpiar el chat
        // Enviar un mensaje especial para limpiar el chat
        client.say('xaby_xd', '/clear');
        console.log(kleur.green('Chat limpiado correctamente.'));

    } else if (input.toLowerCase() === 'uptime') { // Comando para ver el tiempo de actividad del bot
        const currentTime = new Date().getTime();
        const uptimeInSeconds = (currentTime - startTime) / 1000;
        const days = Math.floor(uptimeInSeconds / 86400);
        const hours = Math.floor((uptimeInSeconds % 86400) / 3600);
        const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
        const seconds = Math.floor(uptimeInSeconds % 60);
        console.log(kleur.yellow(`El bot lleva funcionando ${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos.`));

    } else if (input.toLowerCase() === 'status') { // Comando para ver el uso de memoria, puerto por el que se conecta y la latencia actual con twitch
        const port = process.env.PORT || 3000;
        measureLatency();
        const memoryUsage = process.memoryUsage();
        const memoryUsageMB = Math.round(memoryUsage.heapUsed / 1024 / 1024 * 100) / 100;
        console.log(kleur.blue(`Estado del bot:`));
        console.log(kleur.cyan(`Conectado al puerto ${port}`));
        console.log(kleur.yellow(`Uso de memoria: ${memoryUsageMB} MB`));

    } else {
        console.log(kleur.red(`Comando no reconocido: ${input}`)); // Usado por si te equivocas en usar los comandos
    }
});

module.exports = { client };