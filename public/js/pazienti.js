import * as config from './config.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';

if (config.DB_SYSTEM == 'realtime') {
    const db = getDatabase();
    onValue(ref(db, '/'), snapshot => {
        $("#pazienti_list").text((JSON.stringify(snapshot.val())));
    });
}
else if (config.DB_SYSTEM == "firestore") {

}
else {
    console.error("Unknown db system: " + config.DB_SYSTEM);
}