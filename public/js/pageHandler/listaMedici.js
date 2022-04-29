import { deleteMedico, getMedici } from "../dbInterface/dbInterface.js";

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

async function loadMedici() {
    document.getElementById("mediciContainer").innerHTML = "";
    let medici = await getMedici();

    let response = await fetch("../templates/templateMedico.html");
    let text = await response.text();
    for (let cf_medico in medici) {
        let medicoElement = document.createElement("div");
        medicoElement.innerHTML = text;
        medicoElement.setAttribute("class", "row");
        medicoElement.setAttribute("id", medici[cf_medico].cf_medico);

        // SET VALUES
        medicoElement.querySelector("#nome").innerHTML = medici[cf_medico].info_medico.nome;
        medicoElement.querySelector("#cognome").innerHTML = medici[cf_medico].info_medico.cognome;
        medicoElement.querySelector("#dataNascita").innerHTML =
            medici[cf_medico].info_medico.dataNascita;
        medicoElement.querySelector("#sesso").innerHTML = medici[cf_medico].info_medico.sesso;
        medicoElement.querySelector("#specializzazione").innerHTML = medici[cf_medico].info_medico.specializzazione;
        medicoElement.querySelector("#show").addEventListener("click", () => {
            window.location.href = "../singlePage/medico.html?cf=" + cf_medico;
        });
        medicoElement.querySelector("#delete").addEventListener("click", () => {
            deleteMedico(medici[cf_medico].cf_medico);
            loadMedici();
        });

        // FIX ID NAMES
        medicoElement.querySelector("#nome").setAttribute("id", "nome" + cf_medico);
        medicoElement.querySelector("#cognome").setAttribute("id", "cognome" + cf_medico);
        medicoElement.querySelector("#dataNascita").setAttribute("id", "dataNascita" + cf_medico);
        medicoElement.querySelector("#sesso").setAttribute("id", "sesso" + cf_medico);
        medicoElement.querySelector("#specializzazione").setAttribute("id", "specializzazione" + cf_medico);
        medicoElement.querySelector("#show").setAttribute("id", "show" + cf_medico);
        // medicoElement.querySelector("#modify").setAttribute("id", "modify" + i);
        medicoElement.querySelector("#delete").setAttribute("id", "delete" + cf_medico);

        // ADD CHILD
        document.getElementById("mediciContainer").appendChild(medicoElement);
    }
}

loadMedici();
