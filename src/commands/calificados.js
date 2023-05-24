const axios = require("axios")
const calificadosURL = "https://ligamx.net/ws/aHR0cDovL3NpaWRhZG1pbi5saWdhbXgubmV0L3dlYnNlcnZpY2VzL3BydGxfd2ViX2pzb25kYXRhLmFzaHg@aHNhaD18NzBlMzJlY2E4ZTRmOWY5ZGVmYjVkZmVjNWEzNzVhMjg3N2QwN2M0Y2RkZTM1OWQ3ZDE2ODhhNDdlMmUwZWZlNDg2NTEyZmU4OTdkMzlhZmFmZTRhYmEyNzM2ODk2ZDViOGVjY2ZkZDhhZmIzYmNmMTA3NDFlMjY2ZjFiYWQ2MTN8JnBzV2lkZ2V0PVBSVExfQ2xzZlNtbGRMZ2xsVE9QJm9iaklERGl2aXNpb249MSZvYmpJRFRlbXBvcmFkYT03MyZvYmpJRFRvcm5lbz0yJm9ialRPUD0yOA=="

function rankingleage(tablaGeneral, topRank) {
    const nombreClubYRank = [];
    const equiposCalificados = tablaGeneral.sort(
        (elementoA, elementoB) => elementoA.Lugar - elementoB.Lugar
    ).slice(0, topRank);
    
    for (let i = 0; i < equiposCalificados.length; i++) {
        nombreClubYRank.push(`${equiposCalificados[i].Lugar}.- ${equiposCalificados[i].Club}`);
    }

    return nombreClubYRank;
}

async function calificados() {
    const topEquipos = 12;
    const result = await axios.get(calificadosURL)
    const { data } = result;

    try {
        const tablaGeneral = data.DatosJSON;
        const equiposCalificados = rankingleage(tablaGeneral, topEquipos)
        
        return equiposCalificados;
    } catch (e) {
        throw new Error("command error: calificados - "+ e.message)
    }
}

module.exports = {
    calificados: calificados
}