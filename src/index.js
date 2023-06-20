const { Client, Events, GatewayIntentBits } = require("discord.js");
const { token } = require('./config.json');
const { calificados } = require("./commands/calificados");
const { goleadores } = require("./commands/goleadores");
const { tablaDeLaLiga } = require("./commands/tablaGeneral")
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, () => {
    console.log('El Bot Liga MX esta en línea.')
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;

    if (commandName === 'calificados') {
        try {
            const equiposCalificados = await calificados();
            console.log(equiposCalificados)
            await interaction.reply(equiposCalificados.join('\n'));
        } catch (e) {
            console.log(e)
            await interaction.reply('Error al obtener los datos');
        }
    } else if (commandName === 'tabla_general') {
        try {
            const equiposCalificados2 = await tablaDeLaLiga();
            console.log(equiposCalificados2);
            await interaction.reply(equiposCalificados2.join('\n'));
        } catch (e) {
            console.log(e)
            await interaction.reply('Error al obtener los datos');
        }
    } else if (commandName === 'lideres_de_goleo') {
        try {
            const tablaDeGoles = await goleadores();
            console.log(tablaDeGoles)
            await interaction.reply(tablaDeGoles.join('\n'));
        } catch (e) {
            console.log(e);
            await interaction.reply('Error al obtener los datos');
        }
    }
});

client.login(token);