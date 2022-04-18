import * as config from "./config.js";
import { getPazienti } from "./realtimeInterface.js";

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

async function loadPazienti() {
  let pazienti;
  if (config.DB_SYSTEM == "realtime") {
    pazienti = await getPazienti();
  } else if (config.DB_SYSTEM == "firestore") {
  } else {
    console.error("Unknown db system: " + config.DB_SYSTEM);
    return;
  }

  let response = await fetch("templates/templatePaziente.html");
  let text = await response.text();
  for (let i in pazienti) {
    let pazienteElement = document.createElement("div");
    pazienteElement.innerHTML = text;
    pazienteElement.setAttribute("class", "row");

    // SET VALUES
    pazienteElement.querySelector("#nome").innerHTML = pazienti[i].nome;
    pazienteElement.querySelector("#cognome").innerHTML = pazienti[i].cognome;
    pazienteElement.querySelector("#dataNascita").innerHTML =
      pazienti[i].dataNascita;
    // TODO: calculate data nascita
    pazienteElement.querySelector("#eta").innerHTML = getAge(
      pazienti[i].dataNascita
    );
    pazienteElement.querySelector("#sesso").innerHTML = pazienti[i].sesso;

    // FIX ID NAMES
    pazienteElement.querySelector("#nome").setAttribute("id", "nome" + i);
    pazienteElement.querySelector("#cognome").setAttribute("id", "cognome" + i);
    pazienteElement
      .querySelector("#dataNascita")
      .setAttribute("id", "dataNascita" + i);
    pazienteElement.querySelector("#eta").setAttribute("id", "eta" + i);
    pazienteElement.querySelector("#sesso").setAttribute("id", "sesso" + i);

    // ADD CHILD
    document.getElementById("pazientiContainer").appendChild(pazienteElement);
  }
}

loadPazienti();
