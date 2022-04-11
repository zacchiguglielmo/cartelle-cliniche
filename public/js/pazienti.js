import * as config from './config.js';
import { getPazienti } from './realtimeInterface.js';

if (config.DB_SYSTEM == 'realtime') {
}
else if (config.DB_SYSTEM == "firestore") {

}
else {
    console.error("Unknown db system: " + config.DB_SYSTEM);
}