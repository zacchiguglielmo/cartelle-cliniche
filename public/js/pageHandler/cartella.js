import { deleteReferto, getCartella, getMedico, getPaziente, getReferti } from "../dbInterface/dbInterface.js";



const queryParams = new URLSearchParams(window.location.search);
const id_cartella = queryParams.get('id');
const cf_paziente = queryParams.get('cf');

const cartella = await getCartella(id_cartella, cf_paziente);
const medico = await getMedico(cartella.cf_medico);
const paziente = await getPaziente(cf_paziente);

document.getElementById("download").addEventListener('click', function() {
    const doc = new jsPDF();



    doc.fromHTML($('#main').get(0), 20, 20, {
        'width': 500
    });


    doc.save("cartellaClinica" + paziente.info_paziente.cognome + ".pdf");
});
document.getElementById("nominativoMedico").innerHTML = medico.info_medico.nome + ' ' + medico.info_medico.cognome;
document.getElementById("nominativoPaziente").innerHTML = paziente.info_paziente.nome + ' ' + paziente.info_paziente.cognome;
let dataFine = cartella.data.fine ? new Date(cartella.data.fine).toLocaleDateString("it-IT") : undefined;
document.getElementById("periodoRicovero").innerHTML = new Date(cartella.data.inizio).toLocaleDateString("it-IT") + ' - ' + (dataFine || 'ancora aperta');
if (cartella.info_cartella.stato_salute)
    document.getElementById("statoSalute").innerHTML = cartella.info_cartella.stato_salute;
else document.getElementById().parentElement.setAttribute("style", "display: none");
if (cartella.info_cartella.note)
    document.getElementById("note").innerHTML = cartella.info_cartella.note;
else document.getElementById("note").parentElement.setAttribute("style", "display: none");

async function loadReferti() {
    document.getElementById("refertiContainer").innerHTML = "";
    const referti = await getReferti(id_cartella, cf_paziente);

    let response = await fetch("../templates/templateTipoReferto.html");
    let textTipoReferto = await response.text();
    response = await fetch("../templates/templateReferto.html");
    let textReferto = await response.text();
    for (const tipo_referto in referti) {
        let tipoRefertoElement = document.createElement("div");
        tipoRefertoElement.innerHTML = textTipoReferto;
        tipoRefertoElement.setAttribute("class", "row");
        tipoRefertoElement.setAttribute("id", `${tipo_referto}Container`);

        tipoRefertoElement.querySelector("#tipo_referto_header").innerHTML = tipo_referto.toUpperCase();
        tipoRefertoElement.querySelector("#tipo_referto_header").setAttribute("id", `${tipo_referto}_header`);

        for (const referto of referti[tipo_referto]) {
            let refertoElement = document.createElement("div");
            refertoElement.innerHTML = textReferto;
            refertoElement.setAttribute("class", "row");

            let medicoResponsabile = await getMedico(referto.cf_medico_responsabile);
            refertoElement.querySelector("#nominativo_medico_responsabile").innerHTML = "Medico: " + medicoResponsabile.info_medico.nome + " " + medicoResponsabile.info_medico.cognome;
            refertoElement.querySelector("#data").innerHTML = "Data: " + referto.data;
            refertoElement.querySelector("#note").innerHTML = "Note: " + referto.note;

            for (let key in referto.info_referto) {
                let formattedKey = key.replace(/([A-Z])/g, " $1");
                formattedKey = formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1).toLowerCase();
                let pElement = document.createElement("div");
                pElement.innerHTML = `${formattedKey}: ${referto.info_referto[key]}`;
                refertoElement.querySelector("#info_referto").appendChild(pElement);
            }

            refertoElement.querySelector("#delete").addEventListener("click", async() => {
                await deleteReferto(id_cartella, cf_paziente, tipo_referto, referto.id);
                loadReferti();
            });

            tipoRefertoElement.querySelector("#tipo_referto_container").appendChild(refertoElement);
        }

        document.getElementById("refertiContainer").appendChild(tipoRefertoElement);
    }
}

loadReferti();