import { DB_SYSTEM } from "../config.js";
import * as realtime from "./realtimeInterface.js";
import * as firestore from "./firestoreInterface.js";

const ERROR_MSG = "Unknown db system: " + DB_SYSTEM + ". Change in js/config.js";

// CREATE
export async function addPaziente(paziente) {
    if (DB_SYSTEM == "realtime") {
        return realtime.addPazienteToRealtimeDB(paziente);
    }
    else if (DB_SYSTEM == "firestore") {
        return firestore.addPazienteToFirestore(paziente);
    }
    else {
        console.error(ERROR_MSG);
    }
}

export async function addMedico(medico) {
    if (DB_SYSTEM == "realtime") {
        return realtime.addMedicoToRealtimeDB(medico);
    }
    else if (DB_SYSTEM == "firestore") {
        return firestore.addMedicoToFirestore(medico);
    }
    else {
        console.error(ERROR_MSG);
    }
}

export async function addCartella(cartella, cf_paziente) {
    if (DB_SYSTEM == "realtime") {
        return realtime.addCartellaToRealtimeDB(cartella, cf_paziente);
    }
    else if (DB_SYSTEM == "firestore") {
        return firestore.addCartellaToFirestore(cartella);
    }
    else {
        console.error(ERROR_MSG);
    }
}

export async function addReferto(referto, id_cartella, cf_paziente, tipo_referto) {
    if (DB_SYSTEM == "realtime") {
        return realtime.addRefertoToRealtimeDB(referto, id_cartella, cf_paziente, tipo_referto);
    }
    else if (DB_SYSTEM == "firestore") {
        return firestore.addRefertoToFirestore(referto, id_cartella, tipo_referto);
    }
    else {
        console.error(ERROR_MSG);
    }
}
// END CREATE

// READ
export async function getPazienti() {
    if (DB_SYSTEM == "realtime") {
        return realtime.getPazientiFromRealtimeDB();
    }
    else if (DB_SYSTEM == "firestore") {
        return firestore.getPazientiFromFirestore();
    }
    else {
        console.error(ERROR_MSG);
    }
}

export async function getPaziente(cf_paziente) {
    if (DB_SYSTEM == "realtime") {
        return realtime.getPazienteFromRealtimeDB(cf_paziente);
    }
    else if (DB_SYSTEM == "firestore") {
        return firestore.getPazienteFromFirestore(cf_paziente);
    }
    else {
        console.error(ERROR_MSG);
    }
}

export async function getMedici() {
    if (DB_SYSTEM == "realtime") {
        return realtime.getMediciFromRealtimeDB();
    }
    else if (DB_SYSTEM == "firestore") {
        return firestore.getMediciFromFirestore();
    }
    else {
        console.error(ERROR_MSG);
    }
}

export async function getMedico(cf_medico) {
    if (DB_SYSTEM == "realtime") {
        return realtime.getMedicoFromRealtimeDB(cf_medico);
    }
    else if (DB_SYSTEM == "firestore") {
        return firestore.getMedicoFromFirestore(cf_medico);
    }
    else {
        console.error(ERROR_MSG);
    }
}

export async function getCartelle(cf_paziente) {
    if (DB_SYSTEM == "realtime") {
        return realtime.getCartelleFromRealtimeDB(cf_paziente);
    }
    else if (DB_SYSTEM == "firestore") {
        return firestore.getCartelleFromFirestore(cf_paziente);
    }
    else {
        console.error(ERROR_MSG);
    }
}

export async function getCartella(id_cartella, cf_paziente) {
    if (DB_SYSTEM == "realtime") {
        return realtime.getCartellaFromRealtimeDB(cf_paziente, id_cartella);
    }
    else if (DB_SYSTEM == "firestore") {
        return firestore.getCartellaFromFirestore(id_cartella);
    }
    else {
        console.error(ERROR_MSG);
    }
}

export async function getReferti(id_cartella, cf_paziente) {
    if (DB_SYSTEM == "realtime") {
        return realtime.getRefertiFromRealtimeDB(cf_paziente, id_cartella);
    }
    else if (DB_SYSTEM == "firestore") {
        return firestore.getRefertiFromFirestore(id_cartella);
    }
    else {
        console.error(ERROR_MSG);
    }
};
// END READ

// UPDATE
// TODO: update
// END UPDATE

// DELETE
export async function deletePaziente(cf_paziente) {
    if (DB_SYSTEM == "realtime") {
        return realtime.deletePazienteFromRealtimeDB(cf_paziente);
    }
    else if (DB_SYSTEM == "firestore") {
        return firestore.deletePazienteFromFirestore(cf_paziente);
    }
    else {
        console.error(ERROR_MSG);
    }
}

export async function deleteMedico(cf_medico) {
    if (DB_SYSTEM == "realtime") {
        return realtime.deleteMedicoFromRealtimeDB(cf_medico);
    }
    else if (DB_SYSTEM == "firestore") {
        return firestore.deleteMedicoFromFirestore(cf_medico);
    }
    else {
        console.error(ERROR_MSG);
    }
}

export async function deleteCartella(id_cartella, cf_paziente) {
    if (DB_SYSTEM == "realtime") {
        return realtime.deleteCartellaFromRealtimeDB(cf_paziente, id_cartella);
    }
    else if (DB_SYSTEM == "firestore") {
        return firestore.deleteCartellaFromFirestore(id_cartella);
    }
    else {
        console.error(ERROR_MSG);
    }
}

export async function deleteReferto(id_cartella, cf_paziente, tipo_referto, id_referto) {
    if (DB_SYSTEM == "realtime") {
        return realtime.deleteRefertoFromRealtimeDB(cf_paziente, id_cartella, tipo_referto, id_referto);
    }
    else if (DB_SYSTEM == "firestore") {
        return firestore.deleteRefertoFromFirestore(id_cartella, tipo_referto, id_referto);
    }
    else {
        console.error(ERROR_MSG);
    }
}
// END DELETE