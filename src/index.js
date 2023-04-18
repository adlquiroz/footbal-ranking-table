const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const { Client } = require("discord.js");
const client = new Client({ intents: [3276799] });

client.config = require("./token.json");

client.login(client.config.token).then(() => {
    console.log(`Client: ${client.user.username} se ha iniciado`);
    client.user.setActivity('');
}).catch((err) => console.log(err));



app.get('/', (req, res) => {
    axios.get('https://ligamx.net/ws/aHR0cDovL3NpaWRhZG1pbi5saWdhbXgubmV0L3dlYnNlcnZpY2VzL3BydGxfd2ViX2pzb25kYXRhLmFzaHg@aHNhaD18NWVhYjQzNTAzMDQ4NWZmMTQ0ZGU5NzY0MWFiZjE1NWZlNDhkYTBmZTI1MzRiODVlNmFjNzM3MDJhNTdiN2Q3ZjVjOTgxZWQzZDZjODZjODFiOTU2YTNmNDAyMGFhNDhkNjhhNmVlNzUxOTkwOWRmMTQ1MjIyZDJmNzRmNDM2ZWR8JnBzV2lkZ2V0PVBSVExfT2ZlbnNpdmEmb2JqSWREaXZpc2lvbj0xJm9iaklkVGVtcG9yYWRhPTczJm9iaklEVG9ybmVvPTI=')
        .then(function (response) {
            const tablaGeneral = response.data.DatosJSON;
            const equiposCalificados = rankingleage(tablaGeneral, 12);
            res.send(equiposCalificados)
        })
        .catch(error => {
            console.log(error)
            res.status(500).send('Error al obtener los datos');
        })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

function rankingleage(tablaGeneral, topRank) {
    const equiposCalificados = tablaGeneral.sort(
        (elementoA, elementoB) => elementoA.rank - elementoB.rank
    ).slice(0, topRank);
    const nombreClubYRank = [];
    for (let i = 0; i < equiposCalificados.length; i++) {
        nombreClubYRank.push({ nombreClub: equiposCalificados[i].nombreClub, rank: equiposCalificados[i].rank });
    }
    return nombreClubYRank;
}