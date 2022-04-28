import { getMedico } from "../dbInterface/dbInterface.js";

const cf_medico = new URLSearchParams(window.location.search).get("cf");

const medico = await getMedico(cf_medico);

document.getElementById("nome").innerHTML = medico.info_medico.nome;
document.getElementById("cognome").innerHTML = medico.info_medico.cognome;
document.getElementById("dataNascita").innerHTML = medico.info_medico.dataNascita;
document.getElementById("luogoNascita").innerHTML = medico.info_medico.luogoNascita;
document.getElementById("sesso").innerHTML = medico.info_medico.sesso;
document.getElementById("specializzazione").innerHTML = medico.info_medico.specializzazione;
if (medico.info_medico.cittadinanza)
    document.getElementById("cittadinanza").innerHTML = medico.info_medico.cittadinanza;
else document.getElementById("cittadinanza").parentElement.setAttribute("style", "display: none");