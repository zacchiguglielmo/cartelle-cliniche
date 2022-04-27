import { getCartella } from "../dbInterface/dbInterface";

const queryParams = new URLSearchParams(window.location.search);
const id_cartella = queryParams.get('id');
const cf_paziente = queryParams.get('cf');

const cartella = await getCartella(id_cartella, cf_paziente);
