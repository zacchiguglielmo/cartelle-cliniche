import { deletePaziente, getPazienti } from "../dbInterface/dbInterface.js";

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
    let pazienti = await getPazienti();

    let response = await fetch("../templates/templatePaziente.html");
    let text = await response.text();
    for (let cf in pazienti) {
        let pazienteElement = document.createElement("div");
        pazienteElement.innerHTML = text;
        pazienteElement.setAttribute("class", "row");
        pazienteElement.setAttribute("id", pazienti[cf].cf_paziente);

        // SET VALUES
        pazienteElement.querySelector("#nome").innerHTML = pazienti[cf].info_paziente.nome;
        pazienteElement.querySelector("#cognome").innerHTML = pazienti[cf].info_paziente.cognome;
        pazienteElement.querySelector("#dataNascita").innerHTML =
            pazienti[cf].info_paziente.dataNascita;
        pazienteElement.querySelector("#eta").innerHTML = getAge(
            pazienti[cf].info_paziente.dataNascita
        );
        pazienteElement.querySelector("#sesso").innerHTML = pazienti[cf].info_paziente.sesso;
        pazienteElement.querySelector("#show").addEventListener("click", () => {
            window.location.href = "../singlePage/paziente.html?cf=" + cf;
        });
        pazienteElement.querySelector("#delete").addEventListener("click", () => {
            deletePaziente(pazienti[cf].cf_paziente);
            loadPazienti();
        });

        // FIX ID NAMES
        pazienteElement.querySelector("#nome").setAttribute("id", "nome" + cf);
        pazienteElement.querySelector("#cognome").setAttribute("id", "cognome" + cf);
        pazienteElement.querySelector("#dataNascita").setAttribute("id", "dataNascita" + cf);
        pazienteElement.querySelector("#eta").setAttribute("id", "eta" + cf);
        pazienteElement.querySelector("#sesso").setAttribute("id", "sesso" + cf);
        pazienteElement.querySelector("#show").setAttribute("id", "show" + cf);
        // pazienteElement.querySelector("#modify").setAttribute("id", "modify" + cf);
        pazienteElement.querySelector("#delete").setAttribute("id", "delete" + cf);

        // ADD CHILD
        document.getElementById("pazientiContainer").innerHTML = "";
        document.getElementById("pazientiContainer").appendChild(pazienteElement);
    }
}

loadPazienti();
