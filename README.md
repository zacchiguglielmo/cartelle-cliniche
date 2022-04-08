### Schema RDB:<br/>
Medici(**cf_medico**, nome, cognome, data_nascita, sesso_biologico, luogo_nascita, cittadinanza, specializzazione)<br/>
Pazienti(**cf_paziente**, nome, cognome, data_nascita, data_morte, sesso_biologico, luogo_nascita, cittadinanza, tel_contatto, nominativo_contatto)<br/>
Cartelle_cliniche(**id_cartella**, data_ora_inizio_ricovero, data_ora_fine_ricovero, stato_di_salute_paziente, note, *cf_paziente*, *cf_medico*)<br/>
Prescrizioni(**id_prescrizione**, nome_cura, descrizione_cura, note, *id_cartella*, *medico_responsabile*)<br/>
Interventi(**id_intervento**, data_ora_inizio_intervento, data_ora_fine_intervento, tipo_intervento, esito, note, *id_cartella*, *medico_responsabile*)<br/>
Esami(**id_esame**, risultati, note, *id_cartella*, *medico_responsabile*)<br/>
Anamnesi(**id_anamnesi**, descrizione, note, data, *id_cartella*, *medico_responsabile*)<br/>

### Struttura sito

 - Pazienti
 	- Cartelle
 		- Dati

### Struttura DB NoSQL

#### Realtime Database

```
{
 pazienti: [{
 	cf_paziente,
 	info_paziente: {}
 }],
 cartelle_cliniche: {
 	<cf_paziente>: [{
		id_cartella,
		info_cartella: {},
		data: {}
	}]
 }
 medici: [{
 	cf_medico,
	info_medico: {}
 }]
}
```

#### Firestore

 - Documento pazienti
 - Documento medici
 - Collezione cartelle
 	- Documento cartella

### Note:
 - Le prescrizioni possono essere cure o medicine
 - I risultati di un esito possono essere di diversi tipi
