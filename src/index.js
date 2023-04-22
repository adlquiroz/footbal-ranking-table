const { Client, Events, GatewayIntentBits } = require("discord.js");
const { token } = require('./config.json');
const axios = require('axios');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, () => {
    console.log('El Bot Liga MX esta en línea.')
});

client.on('interactionCreate', interaction => {
    console.log(interaction.isCommand())
    if (!interaction.isCommand()) return;
se 
    const { commandName } = interaction;

    if (commandName === 'ping') {
        axios.get('https://ligamx.net/ws/aHR0cDovL3NpaWRhZG1pbi5saWdhbXgubmV0L3dlYnNlcnZpY2VzL3BydGxfd2ViX2pzb25kYXRhLmFzaHg@aHNhaD18NWVhYjQzNTAzMDQ4NWZmMTQ0ZGU5NzY0MWFiZjE1NWZlNDhkYTBmZTI1MzRiODVlNmFjNzM3MDJhNTdiN2Q3ZjVjOTgxZWQzZDZjODZjODFiOTU2YTNmNDAyMGFhNDhkNjhhNmVlNzUxOTkwOWRmMTQ1MjIyZDJmNzRmNDM2ZWR8JnBzV2lkZ2V0PVBSVExfT2ZlbnNpdmEmb2JqSWREaXZpc2lvbj0xJm9iaklkVGVtcG9yYWRhPTczJm9iaklEVG9ybmVvPTI=')
            .then(async function (response) {
                const tablaGeneral = response.data.DatosJSON;
                const equiposCalificados = rankingleage(tablaGeneral, 12).join('\n');
                await interaction.reply(equiposCalificados);
            })
            .catch(async (error) => {
                console.log(error)
                await interaction.reply('Error al obtener los datos');
            })
    }
});

client.login(token);


function rankingleage(tablaGeneral, topRank) {
    const equiposCalificados = tablaGeneral.sort(
        (elementoA, elementoB) => elementoA.rank - elementoB.rank
    ).slice(0, topRank);
    const nombreClubYRank = [];
    for (let i = 0; i < equiposCalificados.length; i++) {
        nombreClubYRank.push(`${equiposCalificados[i].rank}.- ${equiposCalificados[i].nombreClub}`);
    }
    return nombreClubYRank;
}