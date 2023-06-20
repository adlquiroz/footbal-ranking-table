const axios = require("axios")
const goleadoresURL = 'https://ligamx.net/ws/aHR0cDovL3NpaWRhZG1pbi5saWdhbXgubmV0L3dlYnNlcnZpY2VzL3BydGxfd2ViX2pzb25kYXRhLmFzaHg@aHNhaD18NzBlMzJlY2E4ZTRmOWY5ZGVmYjVkZmVjNWEzNzVhMjg3N2QwN2M0Y2RkZTM1OWQ3ZDE2ODhhNDdlMmUwZWZlNDg2NTEyZmU4OTdkMzlhZmFmZTRhYmEyNzM2ODk2ZDViOGVjY2ZkZDhhZmIzYmNmMTA3NDFlMjY2ZjFiYWQ2MTN8JnBzV2lkZ2V0PVBSVExfR2xlb0luZHYmb2JqVE9QPTEwJm9iaklkRGl2aXNpb249MSZvYmpJZFRlbXBvcmFkYT03MyZvYmpJRFRvcm5lbz0y'

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

async function goleadores(){
    const result = await axios.get(goleadoresURL);
    const { data } = result; 

    try{ 
        const tablaGeneral = data.DatosJSON;
        const tablaDeGoleo = goleadoresEquipo(tablaGeneral);

        return tablaDeGoleo;
    } catch (e){
        throw new Error("command error: calificados - "+ e.message)
    }
}

module.exports = {
    goleadores: goleadores
}