import * as config from "./config.js";
import { addPazienteToRealtimeDB } from "./realtimeInterface.js";

async function addPaziente() {
    let nome = document.getElementById("nome").value;
    let cognome = document.getElementById("cognome").value;
    let cf_paziente = document.getElementById("cf_paziente").value;
    let dataNascita = document.getElementById("dataNascita").value;
    let dataMorte = document.getElementById("dataMorte").value;
    dataMorte = dataMorte == "" ? null : dataMorte;
    let luogoNascita = document.getElementById("luogoNascita").value;
    let cittadinanza = document.getElementById("cittadinanza").value;
    let sesso = document.getElementById("sessoBiologico").value;

    if (config.DB_SYSTEM == "realtime") {
        await addPazienteToRealtimeDB({
            cf_paziente,
            info_paziente: { nome, cognome, dataNascita, dataMorte, luogoNascita, cittadinanza, sesso }
        });
        window.location.href = "../lists/listaPazienti.html";
    } else if (config.DB_SYSTEM == "firestore") {
    } else {
        console.error("Unknown db system: " + config.DB_SYSTEM);
        return;
    }
}

$("#submit").click(addPaziente);
