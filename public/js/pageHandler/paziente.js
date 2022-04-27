import { deleteCartella, getCartelle, getMedico, getPaziente } from "../dbInterface/dbInterface.js";

const cf = new URLSearchParams(window.location.search).get("cf");

// DATI PAZIENTE
const paziente = await getPaziente(cf);

if (paziente.info_paziente.nome)
    document.getElementById("nome").innerHTML = paziente.info_paziente.nome;
else document.getElementById("nome").parentElement.setAttribute("style", "display: none");
if (paziente.info_paziente.cognome)
    document.getElementById("cognome").innerHTML = paziente.info_paziente.cognome;
else document.getElementById("cognome").parentElement.setAttribute("style", "display: none");
if (paziente.info_paziente.dataNascita)
    document.getElementById("dataNascita").innerHTML = paziente.info_paziente.dataNascita;
else document.getElementById("dataNascita").parentElement.setAttribute("style", "display: none");
if (paziente.info_paziente.dataMorte)
    document.getElementById("dataMorte").innerHTML = paziente.info_paziente.dataMorte;
else document.getElementById("dataMorte").parentElement.setAttribute("style", "display: none");
if (paziente.info_paziente.luogoNascita)
    document.getElementById("luogoNascita").innerHTML = paziente.info_paziente.luogoNascita;
else document.getElementById("luogoNascita").parentElement.setAttribute("style", "display: none");
if (paziente.info_paziente.cittadinanza)
    document.getElementById("cittadinanza").innerHTML = paziente.info_paziente.cittadinanza;
else document.getElementById("cittadinanza").parentElement.setAttribute("style", "display: none");
if (paziente.info_paziente.sesso)
    document.getElementById("sesso").innerHTML = paziente.info_paziente.sesso;
else document.getElementById("sesso").parentElement.setAttribute("style", "display: none");
if (paziente.info_paziente.statoSalute)
    document.getElementById("statoSalute").innerHTML = paziente.info_paziente.statoSalute;
else document.getElementById("statoSalute").parentElement.setAttribute("style", "display: none");
if (paziente.info_paziente.note)
    document.getElementById("note").innerHTML = paziente.info_paziente.note;
else document.getElementById("note").parentElement.setAttribute("style", "display: none");
if (paziente.info_paziente.nTel)
    document.getElementById("nTel").innerHTML = paziente.info_paziente.nTel;
else document.getElementById("nTel").parentElement.setAttribute("style", "display: none");
if (paziente.info_paziente.nomeContatto)
    document.getElementById("nomeContatto").innerHTML = paziente.info_paziente.nomeContatto;
else document.getElementById("nomeContatto").parentElement.setAttribute("style", "display: none");
if (paziente.info_paziente.cognomeContatto)
    document.getElementById("cognomeContatto").innerHTML = paziente.info_paziente.cognomeContatto;
else document.getElementById("cognomeContatto").parentElement.setAttribute("style", "display: none");

// CARTELLE
async function loadCartelle() {
    document.getElementById("cartelleContainer").innerHTML = "";
    let cartelle = await getCartelle(cf);
    let response = await fetch("../templates/templateCartella.html");
    let text = await response.text();
    for (let id_cartella in cartelle) {
        let cartellaElement = document.createElement("div");
        cartellaElement.innerHTML = text;
        cartellaElement.setAttribute("class", "row");
        cartellaElement.setAttribute("id", id_cartella);

        // SET VALUES
        let medico = await getMedico(cartelle[id_cartella].cf_medico);
        cartellaElement.querySelector("#nominativoMedico").innerHTML = medico.info_medico.nome + " " + medico.info_medico.cognome;
        cartellaElement.querySelector("#nominativoPaziente").innerHTML = paziente.info_paziente.nome + " " + paziente.info_paziente.cognome;
        let stringDataFine = cartelle[id_cartella].data.fine;
        let dataFine;
        if (stringDataFine) dataFine = new Date(stringDataFine).toLocaleDateString("it-IT");
        cartellaElement.querySelector("#periodoRicovero").innerHTML =
            new Date(cartelle[id_cartella].data.inizio).toLocaleDateString("it-IT") + " " +
            (dataFine || "");
        cartellaElement.querySelector('#show').addEventListener("click", () => {
            window.location.href = "cartellaClinica.html?id=" + id_cartella;
        });
        cartellaElement.querySelector("#delete").addEventListener("click", () => {
            deleteCartella(id_cartella);
            loadCartelle();
        });

        // FIX ID NAMES
        cartellaElement.querySelector("#nominativoMedico").setAttribute("id", "nominativoMedico" + id_cartella);
        cartellaElement.querySelector("#nominativoPaziente").setAttribute("id", "nominativoPaziente" + id_cartella);
        cartellaElement.querySelector("#periodoRicovero").setAttribute("id", "periodoRicovero" + id_cartella);
        cartellaElement.querySelector("#show").setAttribute("id", "show" + id_cartella);
        cartellaElement.querySelector("#modify").setAttribute("id", "modify" + id_cartella);
        cartellaElement.querySelector("#delete").setAttribute("id", "delete" + id_cartella);

        // ADD CHILD
        document.getElementById("cartelleContainer").appendChild(cartellaElement);
    }
}

loadCartelle();