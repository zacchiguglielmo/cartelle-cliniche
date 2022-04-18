import {
  getDatabase,
  ref,
  child,
  get,
  set,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// CREATE
export async function addOnDb(path, value, id) {
  if (id == undefined) {
    const postRef = await push(ref(getDatabase(), path));
    await set(postRef, value);
  } else {
    await set(ref(getDatabase(), path + "/" + id), value);
  }
}

export async function addPazienteToRealtimeDB(paziente) {
  if (paziente.cf_paziente == undefined)
    console.error("CF paziente obbligatorio");
  else await addOnDb("/pazienti", paziente, paziente.cf_paziente);
}

export async function addMedico(medico) {
  if (medico.cf_medico == undefined) console.error("CF medico obbligatorio");
  else await addOnDb("/medico", medico, medico.cf_medico);
}

export async function addCartella(cartella, cf_paziente) {
  await addOnDb("/cartelle/" + cf_paziente, cartella);
}
// END CREATE

// READ
export async function getFromDb(path) {
  let snapshot = await get(child(ref(getDatabase()), path));
  if (snapshot.exists()) return snapshot.val();
  else return {};
}

export async function getPazientiFromRealtimeDB() {
  return await getFromDb("/pazienti");
}

export async function getPazienteFromRealtimeDB(cf_paziente) {
  return await getPazienti()[cf_paziente];
}

export async function getMedici() {
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

export async function getCartella(cf_paziente, id_cartella) {
  return await getCartella(cf_paziente)[id_cartella];
}
// END READ

// UPDATE
// TODO: update
// END UPDATE

// DELETE
export function deletePazienteFromRealtimeDB(cf_paziente) {
  set(ref(getDatabase(), "pazienti/" + cf_paziente), null);
}

export function deleteMedico(cf_medico) {
  set(ref(getDatabase(), "medici/" + cf_medico), null);
}

export function deleteCartellaFromRealtimeDB(cf_paziente, id_cartella) {
  set(ref(getDatabase(), "pazienti/" + cf_paziente + "/" + id_cartella), null);
}
// END DELETE;
