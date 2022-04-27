import { addCartella, getMedici } from "../dbInterface/dbInterface.js";

let selectCfMedico = document.getElementById("cf_medico");
const medici = await getMedici();
for (let cf in medici)
    selectCfMedico.innerHTML += `<option value='${cf}'>${cf} - ${medici[cf].info_medico.cognome}</option>`;

async function onAddPaziente() {
    let cf_paziente = new URLSearchParams(window.location.search).get("cf");
    let cf_medico = selectCfMedico.value;
    let data_inizio_ricovero = document.getElementById("data_inizio_ricovero").value;
    let stato_salute = document.getElementById("stato_salute").value;
    stato_salute = stato_salute == "" ? null : stato_salute;
    let note = document.getElementById("note").value;
    note = note == "" ? null : note;

    let cartella = {
        cf_medico,
        cf_paziente,
        data: {
            inizio: data_inizio_ricovero,
        },
        info_cartella: { stato_salute, note }
    };

    console.log(cartella);

    await addCartella(cartella, cf_paziente);

    // window.location.href = "../singlePage/paziente.html?cf=" + cf_paziente;
}

$("#submit").click(onAddPaziente);
