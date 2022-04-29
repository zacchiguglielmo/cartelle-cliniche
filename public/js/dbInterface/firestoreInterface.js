import {
    getFirestore,
    doc,
    setDoc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    collection,
    query,
    where,
    arrayUnion,
    arrayRemove,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const db = getFirestore();

// CREATE
async function addToFirestore(object, path, id) {
    if (id == undefined) {
        return (await addDoc(collection(db, path), object)).id;
    } else {
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

export async function addRefertoToFirestore(
    referto,
    id_cartella,
    tipo_referto
) {
    const id_referto = await addToFirestore(
        referto,
        `cartelle-cliniche/${id_cartella}/${tipo_referto}`
    );
    await updateDoc(doc(db, "cartelle-cliniche", id_cartella), {
        referti: arrayUnion({ id_referto, tipo_referto }),
    });
    return id_referto;
}
// END CREATE

// READ
async function getDocumentsFromFirestore(path) {
    let returnObj = {};
    const data = await getDocs(collection(db, path));
    data.forEach((doc) => {
        returnObj[doc.id] = doc.data();
    });
    return returnObj;
}

async function queryFirestore(path, idFieldName, id) {
    const q = query(collection(db, path), where(idFieldName, "==", id));
    const data = await getDocs(q);
    let returnObj = {};
    data.forEach((doc) => {
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
    return await queryFirestore("cartelle-cliniche", "cf_paziente", cf_paziente);
}

export async function getCartellaFromFirestore(id_cartella) {
    return (await getDoc(doc(db, "cartelle-cliniche", id_cartella))).data();
}

export async function getRefertoFromFirestore(
    id_cartella,
    tipo_referto,
    id_referto
) {
    return (
        await getDoc(
            doc(db, `cartelle-cliniche/${id_cartella}/${tipo_referto}`, id_referto)
        )
    ).data();
}

export async function getRefertiFromFirestore(id_cartella) {
    const cartella = await getCartellaFromFirestore(id_cartella);
    const obj = {};
    for (let refReferto of cartella.referti) {
        if (!obj[refReferto.tipo_referto]) obj[refReferto.tipo_referto] = [];
        const referto = await getRefertoFromFirestore(
            id_cartella,
            refReferto.tipo_referto,
            refReferto.id_referto
        );
        referto.id = refReferto.id_referto;
        obj[refReferto.tipo_referto].push(referto);
    }
    return obj;
}
// END READ

// DELETE
async function deleteFromFirestore(path, documentName) {
    await deleteDoc(doc(db, path, documentName));
}

export async function deletePazienteFromFirestore(cf_paziente) {
    const cartelle = await getCartelleFromFirestore(cf_paziente);
    for (let id in cartelle) await deleteCartellaFromFirestore(id);
    await deleteFromFirestore("pazienti", cf_paziente);
}

export async function deleteMedicoFromFirestore(cf_medico) {
    await deleteFromFirestore("medici", cf_medico);
}

export async function deleteCartellaFromFirestore(id_cartella) {
    await deleteFromFirestore("cartelle-cliniche", id_cartella);
}

export async function deleteRefertoFromFirestore(
    id_cartella,
    tipo_referto,
    id_referto
) {
    await updateDoc(doc(db, "cartelle-cliniche", id_cartella), {
        referti: arrayRemove({ id_referto, tipo_referto }),
    });
    await deleteFromFirestore(
        `cartelle-cliniche/${id_cartella}/${tipo_referto}`,
        id_referto
    );
}
// END DELETE

// UPDATE
async function updateOnFirestore(object, path, id) {
    if (id == undefined) {
        return (await updateDoc(collection(db, path), object)).id;
    } else {
        await updateDoc(doc(db, path, id), object);
    }
}

export async function updatePazienteOnFirestore(paziente) {
    await updateOnFirestore(paziente, "pazienti", paziente.cf_paziente);
}

export async function updateMedicoOnFirestore(medico) {
    await updateOnFirestore(medico, "medici", medico.cf_medico);
}

export async function updateCartellaOnFirestore(cartella) {
    return await updateOnFirestore(cartella, "cartelle-cliniche");
}

export async function updateRefertoOnFirestore(
    referto,
    id_cartella,
    tipo_referto
) {
    const id_referto = await updateOnFirestore(
        referto,
        `cartelle-cliniche/${id_cartella}/${tipo_referto}`
    );
    await updateDoc(doc(db, "cartelle-cliniche", id_cartella), {
        referti: arrayUnion({ id_referto, tipo_referto }),
    });
    return id_referto;
}
// END UPDATE