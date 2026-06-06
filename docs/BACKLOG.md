# Backlog

Deferred work items with enough context to resume cold in a separate session.
Each item is intentionally NOT yet touched — read the whole entry before acting,
and respect the "one change, one measurement" rule (don't bundle with an
in-flight experiment).

---

## Strony miast (`/[typ]/[miasto]`) — firmy spoza realnego zasięgu — osobna sesja, NIE ruszone

### Problem (zdiagnozowany 2026-06-06, read-only, zero zmian)
Strony miast pokazują firmy spoza realnego zasięgu. Mechanizm to **NIE promień** —
to kuratorowane mapowanie `company_regions`. Firma jest na stronie miasta, jeśli ma
wiersz `company_regions → to miasto`. (Kod: `getCompaniesForCraneAndCity`,
`src/lib/queries.ts:250`. Radius-logika żyje wyłącznie w Kostenrechnerze — inna ścieżka.)

Źródła objawu (Hamburg/minikran, header "30 Anbieter"):
1. **Duplikacja oddziałów holdingu:** Schmidbauer = 11 z 30 wierszy (jedna marka, 37%
   listy) → wygląda jak spam, zawyża licznik.
2. **Asymetria w `scripts/normalize_service_regions.py`:** limit 150 km działa TYLKO na
   ekspansję per-Bundesland (Krok 3), NIE na exact city-name match (Krok 2). Token
   "Hamburg" w `service_regions[]` mapuje firmę z dowolnej odległości
   (Dingolfing→Hamburg ~600 km).
3. **Tag minikran za szeroki na heavy-lift:** bawarski holding pokazany jako
   "Minikran-Anbieter w Hamburgu" (Mobilkran 600 km ma sens, Minikran nie).
4. **Nagłówek "N Anbieter in {Stadt}"** = licznik członkostwa `company_regions`, nie
   firm w mieście. Overclaim — reszta strony mówi "und Umgebung", ale pasek twardo
   "in {Stadt}". (Header: `src/app/[crane-type]/[city]/page.tsx:200`.)
5. **Dotyczy wszystkich ~90 stron miast** (ta sama `getCompaniesForCraneAndCity`).

### Uzgodniony kierunek (do zrobienia w osobnej sesji)
- **KIERUNEK DOCELOWY:** zastąpić deklaratywną listę `service_regions[]` PROMIENIEM OD
  SIEDZIBY — ale promień **PER TYP DŹWIGU**, nie jednolity:
  - Minikran / Anhängerkran ~60 km (mały sprzęt, transport zżera wartość lokalnie)
  - Auto / Mobilkran ~120 km (jadą o własnych siłach)
  - Raupenkran / Baukran bez limitu / bardzo duży (heavy-lift jeździ przez całe DE)

  Liczby do **USREDNIENIA NA REALNYCH DANYCH** per typ — to NIE są wartości ostateczne.
- **RYZYKO do pilnowania:** za ciasny promień WYPŁUCZE firmy z list (30→4 Anbieter),
  martwe strony, szkoda dla SEO. Odwrotny błąd niż dziś, równie zły.
- **TANI PIERWSZY KROK** (mniejsze ryzyko, ~80% widocznego objawu): dedup holdingu w
  listingu (jedna marka = jeden wiersz) + copy "in {Stadt}" → "in {Stadt} und Umgebung"
  w pasku zaufania. To rénder/copy, nie masowa migracja danych.
- **ZASADA:** jedna zmiana, jeden pomiar. Nie mieszać z pomiarem kalkulatora.
