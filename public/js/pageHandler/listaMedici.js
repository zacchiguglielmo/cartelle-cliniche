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
    let medici = await getMedici();

    let response = await fetch("../templates/templateMedico.html");
    let text = await response.text();
    for (let i in medici) {
        let medicoElement = document.createElement("div");
        medicoElement.innerHTML = text;
        medicoElement.setAttribute("class", "row");
        medicoElement.setAttribute("id", medici[i].cf_medico);

        // SET VALUES
        medicoElement.querySelector("#nome").innerHTML = medici[i].info_medico.nome;
        medicoElement.querySelector("#cognome").innerHTML = medici[i].info_medico.cognome;
        medicoElement.querySelector("#dataNascita").innerHTML =
            medici[i].info_medico.dataNascita;
        
        medicoElement.querySelector("#sesso").innerHTML = medici[i].info_medico.sesso;
        medicoElement.querySelector("#specializzazione").innerHTML = medici[i].info_medico.specializzazione;
        medicoElement.querySelector("#delete").addEventListener("click", () => {
            deleteMedico(medici[i].cf_medico);
            loadMedici();
        });

        // FIX ID NAMES
        medicoElement.querySelector("#nome").setAttribute("id", "nome" + i);
        medicoElement.querySelector("#cognome").setAttribute("id", "cognome" + i);
        medicoElement.querySelector("#dataNascita").setAttribute("id", "dataNascita" + i);
        medicoElement.querySelector("#sesso").setAttribute("id", "sesso" + i);
        medicoElement.querySelector("#specializzazione").setAttribute("id", "specializzazione" + i);
        medicoElement.querySelector("#show").setAttribute("id", "show" + i);
        medicoElement.querySelector("#modify").setAttribute("id", "modify" + i);
        medicoElement.querySelector("#delete").setAttribute("id", "delete" + i);

        // ADD CHILD
        document.getElementById("mediciContainer").innerHTML = "";
        document.getElementById("mediciContainer").appendChild(medicoElement);
    }
}

loadMedici();
