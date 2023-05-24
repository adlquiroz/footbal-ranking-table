const { Client, Events, GatewayIntentBits } = require("discord.js");
const { token } = require('./config.json');
const { calificados } = require("./commands/calificados")
const axios = require('axios');
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
            await interaction.reply(equiposCalificados);

        } catch (e) {
            console.log(error)
            await interaction.reply('Error al obtener los datos');
        }
    } else if (commandName === 'tabla_general') {
        const team = interaction.options.getString('equipo');
        axios.get('https://ligamx.net/ws/aHR0cDovL3NpaWRhZG1pbi5saWdhbXgubmV0L3dlYnNlcnZpY2VzL3BydGxfd2ViX2pzb25kYXRhLmFzaHg@aHNhaD18NzBlMzJlY2E4ZTRmOWY5ZGVmYjVkZmVjNWEzNzVhMjg3N2QwN2M0Y2RkZTM1OWQ3ZDE2ODhhNDdlMmUwZWZlNDg2NTEyZmU4OTdkMzlhZmFmZTRhYmEyNzM2ODk2ZDViOGVjY2ZkZDhhZmIzYmNmMTA3NDFlMjY2ZjFiYWQ2MTN8JnBzV2lkZ2V0PVBSVExfQ2xzZlNtbGRMZ2xsVE9QJm9iaklERGl2aXNpb249MSZvYmpJRFRlbXBvcmFkYT03MyZvYmpJRFRvcm5lbz0yJm9ialRPUD0yOA==')
            .then(async function (response) {
                const tablaGeneral = response.data.DatosJSON;
                const equiposCalificados2 = tablaLiga(tablaGeneral, undefined, team).join('\n');
                await interaction.reply(equiposCalificados2);
            })
            .catch(async (error) => {
                console.log(error)
                await interaction.reply('Error al obtener los datos');
            })
    } else if (commandName === 'lideres_de_goleo') {
        axios.get('https://ligamx.net/ws/aHR0cDovL3NpaWRhZG1pbi5saWdhbXgubmV0L3dlYnNlcnZpY2VzL3BydGxfd2ViX2pzb25kYXRhLmFzaHg@aHNhaD18NzBlMzJlY2E4ZTRmOWY5ZGVmYjVkZmVjNWEzNzVhMjg3N2QwN2M0Y2RkZTM1OWQ3ZDE2ODhhNDdlMmUwZWZlNDg2NTEyZmU4OTdkMzlhZmFmZTRhYmEyNzM2ODk2ZDViOGVjY2ZkZDhhZmIzYmNmMTA3NDFlMjY2ZjFiYWQ2MTN8JnBzV2lkZ2V0PVBSVExfR2xlb0luZHYmb2JqVE9QPTEwJm9iaklkRGl2aXNpb249MSZvYmpJZFRlbXBvcmFkYT03MyZvYmpJRFRvcm5lbz0y')
            .then(async function (response) {
                const tablaGoleadores = response.data.DatosJSON;
                const tablaDeGoleo = goleadoresEquipo(tablaGoleadores).join('\n');
                await interaction.reply(tablaDeGoleo);
            })
            .catch(async (error) => {
                console.log(error)
                await interaction.reply('Error al obtener los datos');
            })
    }
});

client.login(token);


function tablaLiga(tablaGeneral, topRank, team) {
    const equiposCalificados2 = tablaGeneral.sort(
        (elementoA, elementoB) => elementoA.Lugar - elementoB.Lugar
    ).slice(0, topRank);
    const nombreClubYRank = [];
    for (let i = 0; i < equiposCalificados2.length; i++) {
        if (!team) {
            nombreClubYRank.push(`${equiposCalificados2[i].Lugar}.- ${equiposCalificados2[i].Club} - Goles a favor: ${equiposCalificados2[i].GF}`);
        } else if (team === equiposCalificados2[i].nombreClubUrl) {
            nombreClubYRank.push(`${equiposCalificados2[i].Lugar}.- ${equiposCalificados2[i].Club} - Goles a favor: ${equiposCalificados2[i].GF}`);
            break;
        }
    }
    if (nombreClubYRank.length === 0) {
        nombreClubYRank.push(`El equipo ${team} no se ha encontrado`)
    }
    return nombreClubYRank;
}

function goleadoresEquipo(tablaGoleadores, rank) {
    const tablaDeGoleo = tablaGoleadores
        .sort((elementoA, elementoB) => elementoA.goles + elementoB.goles)
        .slice(0, rank);
    let tablaDeGoles = [];
    for (let i = 0; i < tablaDeGoleo.length; i++) {
        tablaDeGoles.push(
            `EQUIPO: ${tablaDeGoleo[i].nombreClub}\n NOMBRE: ${tablaDeGoleo[i].nombrePopular}\n GOLES:${tablaDeGoleo[i].goles}\n`
        );
    }
    return tablaDeGoles;
}