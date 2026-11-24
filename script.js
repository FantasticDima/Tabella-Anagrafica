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

function leggiCheckbox() {
  const checkbox = document.querySelectorAll('input[name="materia"]:checked');
  const valori = [];
  checkbox.forEach(function(c) { valori.push(c.value); });
  return valori.length > 0 ? valori.join(', ') : 'Nessuna';
}

function stampa() {
  const nome = document.getElementById('nome').value;
  const cognome = document.getElementById('cognome').value;
  const dataN = document.getElementById('dataNascita').value;
  const eta = document.getElementById('eta').value;
  const indirizzo = document.getElementById('indirizzo').value;
  const sessoEl = document.querySelector('input[name="sesso"]:checked');
  const sesso = sessoEl ? sessoEl.value : 'Non specificato';
  const materie = leggiCheckbox();

  let html = '<table border="1" cellpadding="4" style="border-collapse:collapse;width:100%">';
  html += '<tr><th>Campo</th><th>Valore</th></tr>';
  html += '<tr><td>Nome</td><td>' + nome + '</td></tr>';
  html += '<tr><td>Cognome</td><td>' + cognome + '</td></tr>';
  html += '<tr><td>Data di nascita</td><td>' + dataN + '</td></tr>';
  html += '<tr><td>Età</td><td>' + eta + '</td></tr>';
  html += '<tr><td>Indirizzo</td><td>' + indirizzo + '</td></tr>';
  html += '<tr><td>Sesso</td><td>' + sesso + '</td></tr>';
  html += '<tr><td>Materie preferite</td><td>' + materie + '</td></tr>';
  html += '</table>';

  document.getElementById('output').innerHTML = html;
}