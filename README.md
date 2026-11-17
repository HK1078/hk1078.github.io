# 🍻 Usciamo? – organizza uscite con gli amici

Sito statico (compatibile con **GitHub Pages**) che salva gli eventi e le risposte in un database **Supabase** (gratuito).

- `index.html` – organizzatore (crea l'evento) e invitato (`index.html?e=ID`)
- `risultati.html` – risultati in tempo reale (`risultati.html?e=ID`)
- `config.js` – URL e chiave pubblica di Supabase
- `schema.sql` – tabelle e policy di sicurezza

## Installazione
1. Crea un progetto gratuito su [supabase.com](https://supabase.com).
2. In **SQL Editor** incolla ed esegui il contenuto di `schema.sql`.
3. In **Project Settings → API** copia *Project URL* e la chiave *anon / publishable* in `config.js`.
4. Crea un repository GitHub e carica tutti i file:
   ```bash
   git init && git add . && git commit -m "Usciamo?"
   git branch -M main
   git remote add origin https://github.com/TUO-UTENTE/usciamo.git
   git push -u origin main
   ```
5. Su GitHub: **Settings → Pages → Deploy from a branch → main / (root)**.
6. Dopo un minuto il sito è su `https://TUO-UTENTE.github.io/usciamo/`.

## Come si usa
1. Apri il sito, segna gli impegni e premi **Genera link**: l'evento viene salvato nel database.
2. Condividi il *link per gli amici*; ognuno inserisce nome e disponibilità, che finiscono nel database.
3. Apri il *link per i risultati* per vedere la mappa di calore e lo slot più gettonato.

## Note sulla sicurezza
La chiave anon è pubblica per progettazione. Le policy in `schema.sql` permettono solo lettura, inserimento e aggiornamento delle risposte (nessuna cancellazione) con controlli sui formati. Chiunque conosca l'ID di un evento può leggerne i risultati: va bene per un gruppo di amici, ma non usarlo per dati sensibili.
