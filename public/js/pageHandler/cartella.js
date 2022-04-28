import { getCartella, getMedico, getPaziente, getReferti } from "../dbInterface/dbInterface.js";

const queryParams = new URLSearchParams(window.location.search);
const id_cartella = queryParams.get('id');
const cf_paziente = queryParams.get('cf');

const cartella = await getCartella(id_cartella, cf_paziente);
const medico = await getMedico(cartella.cf_medico);
const paziente = await getPaziente(cf_paziente);

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
    console.log(await getReferti(id_cartella, cf_paziente));
}

loadReferti();