// ===== EINSTELLUNGEN =====
// Hier Ihre E-Mail-Adresse eintragen, an die Demo-Anfragen gehen.
var CONTACT_EMAIL = 'pishokhaartem62@gmail.com';

// Branchen, Leistungen und Preise des Demo-Rechners (Beispielwerte).
// base = Grundpreis, rate = Preis pro Einheit des Schiebereglers,
// mult = Grundpreis wird mit der Menge multipliziert.
// Extras: per = pro Einheit, flat = pauschal, pct = Prozentaufschlag (0.25 = 25 %).
var INDUSTRIES = [
  { label: 'Reinigung', title: 'Reinigung berechnen', choiceLabel: 'Art der Reinigung', min: 89,
    choices: [{ label: 'Unterhaltsreinigung', base: 0, rate: 2.2 }, { label: 'Grundreinigung', base: 0, rate: 4.5 }, { label: 'Bauendreinigung', base: 0, rate: 6 }],
    slider: { label: 'Fläche', unit: 'm²', min: 20, max: 500, step: 10, def: 120 },
    extras: [{ label: 'Fensterreinigung', hint: '+ 1,20 €/m²', per: 1.2 }, { label: 'Am Wochenende', hint: '+ 25 %', pct: 0.25 }, { label: 'Express (48 h)', hint: '+ 15 %', pct: 0.15 }] },
  { label: 'Umzug', title: 'Umzug berechnen', choiceLabel: 'Wohnungsgröße', min: 290,
    choices: [{ label: '1 Zimmer', base: 390, rate: 1.5 }, { label: '2–3 Zimmer', base: 690, rate: 2.2 }, { label: '4+ Zimmer', base: 1190, rate: 3 }],
    slider: { label: 'Entfernung', unit: 'km', min: 1, max: 300, step: 1, def: 15 },
    extras: [{ label: 'Möbelmontage', hint: '+ 180 €', flat: 180 }, { label: 'Einpackservice', hint: '+ 250 €', flat: 250 }, { label: 'Halteverbotszone', hint: '+ 120 €', flat: 120 }] },
  { label: 'Autowerkstatt', title: 'Werkstatt-Termin berechnen', choiceLabel: 'Leistung', min: 0, mult: true,
    choices: [{ label: 'Reifenwechsel', base: 39, rate: 0 }, { label: 'Ölwechsel', base: 89, rate: 0 }, { label: 'Inspektion', base: 199, rate: 0 }],
    slider: { label: 'Anzahl Fahrzeuge', unit: 'Fzg.', min: 1, max: 5, step: 1, def: 1 },
    extras: [{ label: 'Reifeneinlagerung', hint: '+ 59 €/Fzg.', per: 59 }, { label: 'Fahrzeugwäsche', hint: '+ 25 €/Fzg.', per: 25 }, { label: 'Hol- und Bringservice', hint: '+ 35 €', flat: 35 }] },
  { label: 'Malerbetrieb', title: 'Malerarbeiten berechnen', choiceLabel: 'Leistung', min: 149,
    choices: [{ label: 'Wände streichen', base: 0, rate: 9 }, { label: 'Tapezieren', base: 0, rate: 16 }, { label: 'Fassade', base: 0, rate: 28 }],
    slider: { label: 'Fläche', unit: 'm²', min: 10, max: 400, step: 5, def: 60 },
    extras: [{ label: 'Spachtelarbeiten', hint: '+ 4 €/m²', per: 4 }, { label: 'Möbel abdecken und rücken', hint: '+ 80 €', flat: 80 }, { label: 'Material inklusive', hint: '+ 3 €/m²', per: 3 }] },
  { label: 'Garten', title: 'Gartenpflege berechnen', choiceLabel: 'Leistung', min: 59,
    choices: [{ label: 'Rasenpflege', base: 0, rate: 0.35 }, { label: 'Heckenschnitt', base: 0, rate: 1.2 }, { label: 'Pflasterreinigung', base: 0, rate: 3.5 }],
    slider: { label: 'Fläche', unit: 'm²', min: 20, max: 2000, step: 20, def: 300 },
    extras: [{ label: 'Grünschnitt-Entsorgung', hint: '+ 49 €', flat: 49 }, { label: 'Regelmäßig (monatlich)', hint: '− 10 %', pct: -0.1 }, { label: 'Express', hint: '+ 15 %', pct: 0.15 }] }
];
// ===== ENDE EINSTELLUNGEN =====

(function () {
  var state = { ind: 0, choice: 0, qty: INDUSTRIES[0].slider.def, extras: {} };
  var $ = function (id) { return document.getElementById(id); };
  var qtyInput = $('qty');

  function el(tag, attrs, text) {
    var e = document.createElement(tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    return e;
  }

  function calc() {
    var ind = INDUSTRIES[state.ind], c = ind.choices[state.choice], q = state.qty;
    var p = c.base * (ind.mult ? q : 1) + c.rate * q, pct = 1;
    ind.extras.forEach(function (x, i) {
      if (!state.extras[i]) return;
      if (x.per) p += x.per * q;
      if (x.flat) p += x.flat;
      if (x.pct) pct += x.pct;
    });
    return Math.round(Math.max(ind.min, p * pct));
  }

  function fmt(n) { return n.toLocaleString('de-DE'); }

  function updatePrice() {
    var ind = INDUSTRIES[state.ind];
    $('qtyOut').textContent = state.qty + ' ' + ind.slider.unit;
    var price = calc();
    $('price').textContent = fmt(price);
    var chosen = ind.extras.filter(function (x, i) { return state.extras[i]; }).map(function (x) { return x.label; });
    var body = 'Guten Tag,\n\nich interessiere mich für einen Angebotsrechner wie in Ihrer Demo.\n\n' +
      'Demo-Auswahl: ' + ind.label + ' – ' + ind.choices[state.choice].label + ', ' +
      ind.slider.label + ': ' + state.qty + ' ' + ind.slider.unit +
      (chosen.length ? ', Extras: ' + chosen.join(', ') : '') +
      '\nVorläufiger Demo-Preis: ' + fmt(price) + ' €\n\nMein Unternehmen / Branche:\n\nMit freundlichen Grüßen\n';
    $('sendBtn').href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent('Anfrage Angebotsrechner (' + ind.label + ')') + '&body=' + encodeURIComponent(body);
  }

  function render() {
    var ind = INDUSTRIES[state.ind];
    var sw = $('indSwitch'); sw.innerHTML = '';
    INDUSTRIES.forEach(function (d, i) {
      var b = el('button', { type: 'button', 'class': 'pill', 'aria-pressed': i === state.ind ? 'true' : 'false' }, d.label);
      b.onclick = function () { state = { ind: i, choice: 0, qty: d.slider.def, extras: {} }; render(); };
      sw.appendChild(b);
    });
    $('calcTitle').textContent = ind.title;
    $('choiceLabel').textContent = ind.choiceLabel;
    $('choices').setAttribute('aria-label', ind.choiceLabel);
    var ch = $('choices'); ch.innerHTML = '';
    ind.choices.forEach(function (c, i) {
      var b = el('button', { type: 'button', 'class': 'choice', 'aria-pressed': i === state.choice ? 'true' : 'false' }, c.label);
      b.onclick = function () { state.choice = i; render(); };
      ch.appendChild(b);
    });
    $('sliderLabel').textContent = ind.slider.label;
    qtyInput.min = ind.slider.min; qtyInput.max = ind.slider.max; qtyInput.step = ind.slider.step;
    qtyInput.value = state.qty;
    var ex = $('extras'); ex.innerHTML = '';
    ind.extras.forEach(function (x, i) {
      var lab = el('label');
      var cb = el('input', { type: 'checkbox' });
      cb.checked = !!state.extras[i];
      cb.onchange = function () { state.extras[i] = cb.checked; updatePrice(); };
      lab.appendChild(cb);
      lab.appendChild(el('span', {}, x.label));
      lab.appendChild(el('span', { 'class': 'h' }, x.hint));
      ex.appendChild(lab);
    });
    updatePrice();
  }

  qtyInput.addEventListener('input', function () { state.qty = Number(qtyInput.value); updatePrice(); });
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
  render();
})();
