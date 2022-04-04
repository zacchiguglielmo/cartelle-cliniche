Schema RDB:
Medici(**cf_medico**, nome, cognome, data_nascita,sesso_biologico, luogo_nascita, cittadinanza, specializzazione)
Pazienti(**cf_paziente**, nome, cognome, data_nascita, data_morte, sesso_biologico, luogo_nascita, cittadinanza, tel_contatto, nominativo_contatto)
Cartelle_cliniche(**id_cartella**, data_ora_inizio_ricovero, data_ora_fine_ricovero, stato_di_salute_paziente, note ,*cf_paziente*, *cf_medico*)
Prescrizioni(**id_prescrizione**, nome_cura, descrizione_cura, note, *id_cartella*, *medico_responsabile*)
Interventi(**id_intervento**, data_ora_inizio_intervento, data_ora_fine_intervento, tipo_intervento, esito, note, *id_cartella*, *medico_responsabile*)
Esami(**id_esame**, risultati, note, *id_cartella*, *medico_responsabile*)
Anamnesi(**id_anamnesi**, descrizione, note, data, *id_cartella*, *medico_responsabile*)

Note:
 - Le prescrizioni possono essere cure o medicine
 - I risultati di un esito possono essere di diversi tipi
