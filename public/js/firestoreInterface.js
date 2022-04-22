import { getFirestore, doc, setDoc, addDoc, collection } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';

const db = getFirestore();

// CREATE
export async function addPazienteToFirestore(paziente) {
    await setDoc(doc(db, "pazienti", paziente.cf_paziente), paziente);
}

export async function addMedicoToFirestore(medico) {
    await setDoc(doc(db, "medici", medico.cf_medico), medico);
}

export async function addCartellaToFirestore(cartella) {
    return (await addDoc(collection(db, "cartelle-cliniche"), cartella)).id;
}

export async function addRefertoToFirestore() {
    // TODO: implement
}
// END CREATE

// READ
export async function getPazienteFromFirestore() {
    // TODO: implement
}

export async function getMedicoFromFirestore() {
    // TODO: implement
}

export async function getCartellaFromFirestore() {
    // TODO: implement
}
// END READ

// UPDATE
// TODO: update
// END UPDATE

// DELETE
export async function deletePazienteFromFirestore() {
    // TODO: implement
}

export async function deleteMedicoFromFirestore() {
    // TODO: implement
}

export async function deleteCartellaFromFirestore() {
    // TODO: implement
}

export async function deleteRefertoFromFirestore() {
    // TODO: implement
}
// END DELETE