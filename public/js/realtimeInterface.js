import {
  getDatabase,
  ref,
  child,
  get,
  set,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

const db = getDatabase();

// CREATE
async function addOnDb(path, value, id) {
  if (id == undefined) {
    const postRef = await push(ref(db, path));
    await set(postRef, value);
  } else {
    await set(ref(db, path + "/" + id), value);
  }
}

export async function addPazienteToRealtimeDB(paziente) {
  if (paziente.cf_paziente == undefined)
    console.error("CF paziente obbligatorio");
  else await addOnDb("/pazienti", paziente, paziente.cf_paziente);
}

export async function addMedicoToRealtimeDB(medico) {
  if (medico.cf_medico == undefined) console.error("CF medico obbligatorio");
  else await addOnDb("/medico", medico, medico.cf_medico);
}

export async function addCartellaToRealtimeDB(cartella, cf_paziente) {
  await addOnDb("/cartelle/" + cf_paziente, cartella);
}

export async function addRefertoToRealtimeDB(referto, id_cartella, cf_paziente, tipo_referto) {
  await addOnDb(`/cartelle/${cf_paziente}/${id_cartella}/${tipo_referto}`, referto);
};
// END CREATE

// READ
async function getFromDb(path) {
  let snapshot = await get(child(ref(db), path));
  if (snapshot.exists()) return snapshot.val();
  else return {};
}

export async function getPazientiFromRealtimeDB() {
  return await getFromDb("/pazienti");
}

export async function getPazienteFromRealtimeDB(cf_paziente) {
  return await getPazienti()[cf_paziente];
}

export async function getMediciFromRealtimeDB() {
  return await getFromDb("/medici");
}

export async function getMedicoFromRealtimeDB(cf_medico) {
  return await getMedici()[cf_medico];
}

export async function getCartelleFromRealtimeDB(cf_paziente) {
  if (cf_paziente == undefined)
    return await getFromDb("/cartelle_cliniche");
  else
    return await getFromDb(`/ cartelle_cliniche / ${cf_paziente}`);
}

export async function getCartellaFromRealtimeDB(cf_paziente, id_cartella) {
  return await getCartella(cf_paziente)[id_cartella];
}
// END READ

// UPDATE
// TODO: update
// END UPDATE

// DELETE
async function deleteFromDb(path) {
  set(ref(db, path), null);
}

export function deletePazienteFromRealtimeDB(cf_paziente) {
  deleteFromDb("pazienti/" + cf_paziente);
}

export function deleteMedicoFromRealtimeDB(cf_medico) {
  deleteFromDb("medici/" + cf_medico);
}

export function deleteCartellaFromRealtimeDB(cf_paziente, id_cartella) {
  deleteFromDb(`cartelle/${cf_paziente}/${id_cartella}`);
}

export async function deleteRefertoFromRealtimeDB(cf_paziente, id_cartella, id_referto) {
  deleteFromDb(`cartelle/${cf_paziente}/${id_cartella}/${id_referto}`);
}
// END DELETE;
