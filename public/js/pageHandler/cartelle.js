import * as config from "../config.js";
import { getCartelleFromRealtimeDB, getMedicoFromRealtimeDB, getPazienteFromRealtimeDB } from "./realtimeInterface.js";


async function loadCartelle() {
    document.getElementById("cartelleContainer").innerHTML = "";
    let cartelle;
    if (config.DB_SYSTEM == "realtime") {
        cartelle = await getCartelleFromRealtimeDB();
    } else if (config.DB_SYSTEM == "firestore") {
    } else {
        console.error("Unknown db system: " + config.DB_SYSTEM);
        return;
    }

    let response = await fetch("../templates/templateCartella.html");
    let text = await response.text();
    for (let i in cartelle) {
        let cartellaElement = document.createElement("div");
        cartellaElement.innerHTML = text;
        cartellaElement.setAttribute("class", "row");
        cartellaElement.setAttribute("id", cartelle[i].id_cartella);

        // SET VALUES
        let medico = getMedicoFromRealtimeDB(cartelle[i].cf_medico);
        let paziente = getPazienteFromRealtimeDB(cartelle[i].cf_paziente);
        cartellaElement.querySelector("#nominativoMedico").innerHTML = medico.info_medico.nome + " " + medico.info_medico.cognome;
        cartellaElement.querySelector("#nominativoPaziente").innerHTML = medico.info_paziente.nome + " " + medico.info_paziente.cognome;
        cartellaElement.querySelector("#periodoRicovero").innerHTML = cartelle[i].data.inizio + " " + cartelle[i].data.fine;
        cartellaElement.querySelector("#delete").addEventListener("click", () => {
            deleteCartellaFromRealtimeDB(cartelle[i].id_cartella);
            loadCartelle();
        });

        // FIX ID NAMES
        cartellaElement.querySelector("#nominativoMedico").setAttribute("id", "nominativoMedico" + i);
        cartellaElement.querySelector("#nominativoPaziente").setAttribute("id", "nominativoPaziente" + i);
        cartellaElement.querySelector("#periodoRicovero").setAttribute("id", "periodoRicovero" + i);
        cartellaElement.querySelector("#show").setAttribute("id", "show" + i);
        cartellaElement.querySelector("#modify").setAttribute("id", "modify" + i);
        cartellaElement.querySelector("#delete").setAttribute("id", "delete" + i);

        // ADD CHILD
        document.getElementById("cartelleContainer").appendChild(cartellaElement);
    }
}

loadCartelle();
