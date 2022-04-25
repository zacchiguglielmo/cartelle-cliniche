import { addMedico } from "../dbInterface/dbInterface.js";

async function onAddMedico() {
    let cf_medico = document.getElementById("cf_medico").value;
    let nome = document.getElementById("nome").value;
    let cognome = document.getElementById("cognome").value;
    let dataNascita = document.getElementById("dataNascita").value;
    let sesso = document.getElementById("sessoBiologico").value;
    let luogoNascita = document.getElementById("luogoNascita").value;
    let cittadinanza = document.getElementById("cittadinanza").value;
    let specializzazione = document.getElementById("specializzazione").value;

    let medico = {
        cf_medico,
        info_medico: { nome, cognome, dataNascita, luogoNascita, cittadinanza, sesso, specializzazione }
    };

    await addMedico(medico);

    window.location.href = "../lists/listaMedici.html";
}

$("#submit").click(onAddMedico);
