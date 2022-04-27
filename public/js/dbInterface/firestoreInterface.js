import { getFirestore, doc, setDoc, addDoc, getDoc, getDocs, deleteDoc, collection, query, where } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';

const db = getFirestore();

// CREATE
async function addToFirestore(object, path, id) {
    if (id == undefined) {
        return (await addDoc(collection(db, path), object)).id;
    }
    else {
        await setDoc(doc(db, path, id), object);
    }
}

export async function addPazienteToFirestore(paziente) {
    await addToFirestore(paziente, "pazienti", paziente.cf_paziente);
}

export async function addMedicoToFirestore(medico) {
    await addToFirestore(medico, "medici", medico.cf_medico);
}

export async function addCartellaToFirestore(cartella) {
    return await addToFirestore(cartella, "cartelle-cliniche");
}

export async function addRefertoToFirestore(referto, id_cartella, tipo_referto) {
    return await addToFirestore(referto, `cartelle-cliniche/${id_cartella}/${tipo_referto}`);
}
// END CREATE

// READ
async function getDocumentsFromFirestore(path) {
    let returnObj = {};
    const data = await getDocs(collection(db, path));
    data.forEach(doc => {
        returnObj[doc.id] = doc.data();
    });
    return returnObj;
}

async function queryFirestore(path, idFieldName, id) {
    const q = query(collection(db, path), where(idFieldName, "==", id));
    const data = await getDocs(q);
    let returnObj = {};
    data.forEach(doc => {
        returnObj[doc.id] = doc.data();
    });
    return returnObj;
}

export async function getPazientiFromFirestore() {
    return await getDocumentsFromFirestore("pazienti");
}

export async function getPazienteFromFirestore(cf_paziente) {
    return (await getDoc(doc(db, "pazienti", cf_paziente))).data();
}

export async function getMediciFromFirestore() {
    return getDocumentsFromFirestore("medici");
}

export async function getMedicoFromFirestore(cf_medico) {
    return (await queryFirestore("medici", "cf_medico", cf_medico))[cf_medico];
}

export async function getCartelleFromFirestore(cf_paziente) {
    return (await queryFirestore("cartelle-cliniche", "cf_paziente", cf_paziente));
}

export async function getCartellaFromFirestore(id_cartella) {
    return (await getDoc(doc(db, "cartelle-cliniche", id_cartella))).data();
}
// END READ

// UPDATE
// TODO: update
// END UPDATE

// DELETE
async function deleteFromFirestore(path, documentName) {
    await deleteDoc(doc(db, path, documentName));
}

export async function deletePazienteFromFirestore(cf_paziente) {
    const cartelle = await getCartelleFromFirestore(cf_paziente);
    for (let id in cartelle)
        await deleteCartellaFromFirestore(id);
    await deleteFromFirestore("pazienti", cf_paziente);
}

export async function deleteMedicoFromFirestore(cf_medico) {
    await deleteFromFirestore("medici", cf_medico);
}

export async function deleteCartellaFromFirestore(id_cartella) {
    await deleteFromFirestore("cartelle-cliniche", id_cartella);
}

export async function deleteRefertoFromFirestore(id_cartella, tipo_referto, id_referto) {
    await deleteFromFirestore(`cartelle-cliniche/${id_cartella}/${tipo_referto}`, id_referto);
}
// END DELETE