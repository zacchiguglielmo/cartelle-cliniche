import { getMedici, addReferto } from "../dbInterface/dbInterface.js";

const queryParams = new URLSearchParams(window.location.search);
const id_cartella = queryParams.get('id');
const cf_paziente = queryParams.get('cf');

// select medico dropdown
let selectCfMedico = document.getElementById("cfMedicoResponsabile");
const medici = await getMedici();
for (let cf in medici)
    selectCfMedico.innerHTML += `<option value='${cf}'>${cf} - ${medici[cf].info_medico.cognome}</option>`;

async function onAddReferto() {
    let cf_medico_responsabile = selectCfMedico.value;
    let data = document.getElementById("data").value;
    let tipoReferto = document.getElementById("tipoReferto").value;
    let note = document.getElementById("note").value;

    let referto = {
        cf_medico_responsabile,
        data,
        note,
        info_referto: {}
    };

    for (const el of document.getElementsByClassName(tipoReferto)) {
        referto.info_referto[el.id] = el.value;
    }

    await addReferto(referto, id_cartella, cf_paziente, tipoReferto);

    window.location.href = `../singlePage/cartellaClinica.html?id=${id_cartella}&cf=${cf_paziente}`;
}

document.getElementById("submit").addEventListener("click", onAddReferto);