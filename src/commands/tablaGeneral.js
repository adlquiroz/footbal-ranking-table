const axios = require("axios")
const calificadosURL = "https://ligamx.net/ws/aHR0cDovL3NpaWRhZG1pbi5saWdhbXgubmV0L3dlYnNlcnZpY2VzL3BydGxfd2ViX2pzb25kYXRhLmFzaHg@aHNhaD18NzBlMzJlY2E4ZTRmOWY5ZGVmYjVkZmVjNWEzNzVhMjg3N2QwN2M0Y2RkZTM1OWQ3ZDE2ODhhNDdlMmUwZWZlNDg2NTEyZmU4OTdkMzlhZmFmZTRhYmEyNzM2ODk2ZDViOGVjY2ZkZDhhZmIzYmNmMTA3NDFlMjY2ZjFiYWQ2MTN8JnBzV2lkZ2V0PVBSVExfQ2xzZlNtbGRMZ2xsVE9QJm9iaklERGl2aXNpb249MSZvYmpJRFRlbXBvcmFkYT03MyZvYmpJRFRvcm5lbz0yJm9ialRPUD0yOA=="


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



async function tablaDeLaLiga() {
    const result = await axios.get(calificadosURL)
    const { data } = result;

    try {
        const tablaGeneral = data.DatosJSON;
        const equiposCalificados2 = tablaLiga(tablaGeneral);
        
        return equiposCalificados2;
    } catch (e) {
        throw new Error("command error: calificados - "+ e.message)
    }
}

module.exports = {
    tablaDeLaLiga: tablaDeLaLiga
}