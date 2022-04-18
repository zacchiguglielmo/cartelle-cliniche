import {
  getDatabase,
  ref,
  child,
  get,
  set,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// CREATE
export function addOnDb(path, value, id) {
  if (id == undefined) {
    const postRef = push(ref(getDatabase(), path));
    set(postRef, value);
  } else {
    set(ref(getDatabase(), path + "/" + id), value);
  }
}

export function addPaziente(paziente) {
  if (paziente.cf_paziente == undefined)
    console.error("CF paziente obbligatorio");
  else addOnDb("/pazienti", paziente, paziente.cf_paziente);
}

export function addMedico(medico) {
  if (medico.cf_medico == undefined) console.error("CF medico obbligatorio");
  else addOnDb("/medico", medico, medico.cf_medico);
}

export function addCartella(cartella, cf_paziente) {
  addOnDb("/cartelle/" + cf_paziente, cartella);
}
// END CREATE

// READ
export async function getFromDb(path) {
  let snapshot = await get(child(ref(getDatabase()), path));
  if (snapshot.exists()) return snapshot.val();
  else return {};
}

export async function getPazienti() {
  return await getFromDb("/pazienti");
}

export async function getPaziente(cf_paziente) {
  return await getPazienti()[cf_paziente];
}

export async function getMedici() {
  return await getFromDb("/medici");
}

export async function getMedico(cf_medico) {
  return await getMedici()[cf_medico];
}

export async function getCartelle(cf_paziente) {
  return await getFromDb(`/cartelle_cliniche/${cf_paziente}`);
}

export async function getCartella(cf_paziente, id_cartella) {
  return await getCartella(cf_paziente)[id_cartella];
}
// END READ

// UPDATE
// TODO: update
// END UPDATE

// DELETE
export function deletePaziente(cf_paziente) {
  set(ref(getDatabase(), "pazienti/" + cf_paziente), null);
}

export function deleteMedico(cf_medico) {
  set(ref(getDatabase(), "medici/" + cf_medico), null);
}

export function deleteCartella(cf_paziente, id_cartella) {
  set(ref(getDatabase(), "pazienti/" + cf_paziente + "/" + id_cartella), null);
}
// END DELETE
