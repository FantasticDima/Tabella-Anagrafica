# Scheda Anagrafica

A minimal HTML form that collects personal data, auto-calculates age from a birth date, lets the user pick favorite subjects via checkboxes, and prints all the data into an HTML table using DOM manipulation.

No frameworks, no CSS files, no dependencies. One single HTML file.

---

## Fields

| Field | Input type | Notes |
|-------|-----------|-------|
| Nome | `text` | Free text |
| Cognome | `text` | Free text |
| Data di nascita | `date` | Triggers auto age calculation |
| Età | `number` | `readonly` — filled automatically |
| Indirizzo | `text` | Free text |
| Sesso | `radio` | Exclusive choice (M / F) |
| Materie preferite | `checkbox` | Multiple choice |

---

## How it works

### 1. The HTML structure

Everything lives inside a single `<div style="width:300px">` container. Each field is a plain `<label>` followed by an `<input>`, separated by `<br>` line breaks. No CSS classes, no external stylesheets — just default browser rendering with the bare minimum inline styles needed for inputs to fit the container width.

### 2. Sesso (radio buttons)

```html
<input type="radio" name="sesso" value="M"> M
<input type="radio" name="sesso" value="F"> F
```

Both radios share the same `name="sesso"`. This is what makes them **exclusive** — the browser only allows one to be checked at a time. No JavaScript needed for that behavior.

### 3. Materie preferite (checkboxes)

```html
<input type="checkbox" name="materia" value="Matematica"> Matematica
<input type="checkbox" name="materia" value="Italiano"> Italiano
```

All checkboxes share `name="materia"` but each has a different `value`. Unlike radios, checkboxes are **not** exclusive — the user can pick zero, one, or many.

---

## The JavaScript

There are three functions. None of them run until the user interacts with the page.

### `calcolaEta()` — auto age calculation

```js
function calcolaEta() {
  const data = document.getElementById('dataNascita').value;
  if (!data) return;
  const nascita = new Date(data);
  const oggi = new Date();
  let eta = oggi.getFullYear() - nascita.getFullYear();
  const m = oggi.getMonth() - nascita.getMonth();
  if (m < 0 || (m === 0 && oggi.getDate() < nascita.getDate())) eta--;
  document.getElementById('eta').value = eta;
}
```

**When it runs:** Every time the user changes the date of birth, via `onchange="calcolaEta()"` on the date input.

**How it works, line by line:**
1. Reads the date string from the `dataNascita` input.
2. If empty, stops immediately (`return`).
3. Converts the date string into a `Date` object (`nascita` = birth date).
4. Creates a second `Date` object for today (`oggi` = today).
5. Subtracts the birth year from the current year → rough age.
6. Checks if the birthday has happened yet this year:
   - If the current month is **before** the birth month → subtract 1.
   - If it's the **same month** but today's day is **before** the birth day → subtract 1.
7. Writes the final age into the `eta` input (which is `readonly`, so the user can't edit it manually).

### `leggiCheckbox()` — read selected subjects

```js
function leggiCheckbox() {
  const checkbox = document.querySelectorAll('input[name="materia"]:checked');
  const valori = [];
  checkbox.forEach(function(c) { valori.push(c.value); });
  return valori.length > 0 ? valori.join(', ') : 'Nessuna';
}
```

**How it works, line by line:**
1. `querySelectorAll('input[name="materia"]:checked')` selects **every** checkbox with `name="materia"` that is currently checked. The `:checked` pseudo-class filters out unchecked ones.
2. Creates an empty array `valori`.
3. Loops over each checked checkbox with `.forEach()` and pushes its `value` into the array.
4. If at least one was selected, joins them into a single string separated by commas (e.g. `"Matematica, Storia, Inglese"`). If none were selected, returns `"Nessuna"`.

> Adaptation of the single-checkbox example. The original used `getElementById` to read one box. Here we use `querySelectorAll` to read **all** checked boxes at once.

### `stampa()` — collect everything and print the table

Runs when the user clicks the **Invia** button.

**Step 1 — Read every field:**
```js
const nome = document.getElementById('nome').value;
const cognome = document.getElementById('cognome').value;
const dataN = document.getElementById('dataNascita').value;
const eta = document.getElementById('eta').value;
const indirizzo = document.getElementById('indirizzo').value;
```
Each line grabs the `.value` from its input by `id`.

**Step 2 — Read the selected radio:**
```js
const sessoEl = document.querySelector('input[name="sesso"]:checked');
const sesso = sessoEl ? sessoEl.value : 'Non specificato';
```
`querySelector` finds the one checked radio. If the user didn't pick one, `sessoEl` is `null`, so we fall back to `'Non specificato'`.

**Step 3 — Read the checkboxes:**
```js
const materie = leggiCheckbox();
```
Calls the function described above.

**Step 4 — Build the HTML table string:**
```js
let html = '<table border="1" cellpadding="4" style="border-collapse:collapse;width:100%">';
html += '<tr><th>Campo</th><th>Valore</th></tr>';
html += '<tr><td>Nome</td><td>' + nome + '</td></tr>';
html += '<tr><td>Cognome</td><td>' + cognome + '</td></tr>';
html += '<tr><td>Materie preferite</td><td>' + materie + '</td></tr>';
html += '</table>';
```
A string variable `html` is built piece by piece using `+=`. Each field becomes one table row (`<tr>`) with two cells (`<td>`): the field name and its value.

**Step 5 — Inject the table into the page (DOM manipulation):**
```js
document.getElementById('output').innerHTML = html;
```
Finds the empty `<div id="output"></div>` at the bottom of the form and replaces its content with the table HTML. This is the **DOM** part — JavaScript modifying the live document without reloading the page.

---

## How to use

1. Fill in Nome, Cognome, Indirizzo.
2. Pick a Data di nascita — the Età field fills in automatically.
3. Select Sesso (M or F).
4. Tick one or more Materie preferite.
5. Click **Invia**.
6. The table appears below the button.

## Run it

Open the `.html` file in any browser. No server, no installation, no internet required.

## Files

- `index.html` — everything (HTML + CSS + JavaScript) in one file.
