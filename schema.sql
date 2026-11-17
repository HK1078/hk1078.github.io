-- Esegui questo script nel "SQL Editor" di Supabase (una sola volta).
create table events (
  id text primary key check (id ~ '^[a-z0-9]{8,12}$'),
  title text not null check (char_length(title) <= 60),
  note text check (char_length(note) <= 100),
  week date not null,                                  -- lunedì della settimana
  mask text not null check (mask ~ '^[0-9a-f]{28}$'),  -- slot liberi (112 bit in esadecimale)
  created_at timestamptz default now()
);
create table responses (
  event_id text references events(id) on delete cascade,
  name text check (char_length(name) between 1 and 30),
  mask text not null check (mask ~ '^[0-9a-f]{28}$'),  -- slot scelti dall'invitato
  created_at timestamptz default now(),
  primary key (event_id, name)                         -- stesso nome = risposta aggiornata
);
alter table events enable row level security;
alter table responses enable row level security;
-- Lettura e scrittura consentite al pubblico, nessuna cancellazione.
create policy "events_select" on events for select to anon using (true);
create policy "events_insert" on events for insert to anon with check (true);
create policy "resp_select" on responses for select to anon using (true);
create policy "resp_insert" on responses for insert to anon with check (true);
create policy "resp_update" on responses for update to anon using (true) with check (true);
