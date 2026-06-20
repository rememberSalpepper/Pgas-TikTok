// Constructores de plantillas PGAS.
// Cada función recibe `data` y devuelve el HTML del bloque central (.body).
// Encabezado de marca, titular (hook), CTA y footer son compartidos (ver render.js).

// ---------- Íconos (SVG inline, trazo en currentColor) ----------
const P = {
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.6 2.6 2.6 15.4 0 18M12 3c-2.6 2.6-2.6 15.4 0 18"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.2 9.3a3 3 0 0 1 5.6 1.4c0 2-3 2.3-3 3.6"/><path d="M12 17.5h.01"/>',
  chat: '<path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z"/>',
  quote: '<path d="M7 7H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2v2.5a3 3 0 0 1-3 3"/><path d="M19 7h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2v2.5a3 3 0 0 1-3 3"/>',
  users: '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M16 5.3a3.2 3.2 0 0 1 0 6.4"/><path d="M20.5 19a5.5 5.5 0 0 0-4-5.3"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><path d="M12 12h.01"/>',
  sparkles: '<path d="M12 3l1.8 4.9L18.7 9l-4.9 1.8L12 16l-1.8-5.2L5.3 9l4.9-1.1z"/><path d="M18.5 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>',
  brain: '<path d="M9.5 4A3 3 0 0 0 6.6 7 3 3 0 0 0 5 12.5 3 3 0 0 0 8 17a2.4 2.4 0 0 0 4-.5V5.6A2.4 2.4 0 0 0 9.5 4z"/><path d="M14.5 4A3 3 0 0 1 17.4 7 3 3 0 0 1 19 12.5 3 3 0 0 1 16 17a2.4 2.4 0 0 1-4-.5"/>',
  shield: '<path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z"/><path d="M9 12l2.2 2.2L15 10.4"/>',
  check: '<path d="M5 12.5l4.2 4.2L19 7"/>',
};
function svg(name, size = 44) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${P[name] || P.check}</svg>`;
}

const chatIcon = `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"
  stroke-linecap="round" stroke-linejoin="round">${P.chat}</svg>`;
const globeIcon = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" stroke-width="2"
  stroke-linecap="round" stroke-linejoin="round">${P.globe}</svg>`;
const closer = (txt) => `<div class="closer"><div class="ic">${svg('check', 28)}</div><span>${txt}</span></div>`;

// ---------- CHECKLIST ----------
export function checklist(data) {
  const rows = data.items.map((it, i) => `
    <div class="ck-row">
      <div class="ck-num">${i + 1}</div>
      <div class="ck-tx">${it}</div>
      <div class="ck-ck">${svg('check', 30)}</div>
    </div>`).join('');
  const note = data.note ? `<div class="ck-note"><span class="ck-note-ic">!</span><span>${data.note}</span></div>` : '';
  return `<style>
    .ck-card { background: var(--card); border-radius: 32px; box-shadow: var(--shadow);
      padding: 26px 32px; display: flex; flex-direction: column; border: 1px solid var(--line); }
    .ck-row { display: flex; align-items: center; gap: 22px; padding: 15px 4px; }
    .ck-row + .ck-row { border-top: 1px solid var(--line); }
    .ck-num { flex: 0 0 auto; width: 58px; height: 58px; border-radius: 16px; background: var(--grad-brand);
      color: #fff; font-family: 'Poppins',sans-serif; font-weight: 700; font-size: 30px; display: grid;
      place-items: center; box-shadow: 0 8px 18px rgba(45,127,249,0.25); }
    .ck-tx { flex: 1; font-size: 36px; font-weight: 600; color: var(--navy); letter-spacing: -0.3px; }
    .ck-ck { flex: 0 0 auto; width: 50px; height: 50px; border-radius: 50%; color: #fff;
      background: linear-gradient(135deg, var(--green), var(--teal)); display: grid; place-items: center;
      box-shadow: 0 6px 14px rgba(34,201,160,0.30); }
    .ck-note { display: flex; align-items: center; gap: 16px; margin-top: 18px; background: var(--red-bg);
      border-radius: 20px; padding: 20px 26px; }
    .ck-note-ic { flex: 0 0 auto; width: 40px; height: 40px; border-radius: 50%; background: var(--red);
      color: #fff; font-family: 'Poppins',sans-serif; font-weight: 800; font-size: 26px; display: grid; place-items: center; }
    .ck-note span:last-child { font-size: 28px; font-weight: 600; color: #B91C1C; }
  </style>
  <div class="ck-card">${rows}</div>${note}`;
}

// ---------- BASE 3 CARDS ----------
export function base_3_cards(data) {
  const grads = ['g1', 'g2', 'g1'];
  const cards = data.cards.map((c, i) => `
    <div class="card"><div class="ic ${grads[i % 3]}">${svg(c.icon, 50)}</div>
      <div class="tx"><h3>${c.title}</h3><p>${c.text}</p></div></div>`).join('');
  return `<style>
    .cards { display: flex; flex-direction: column; gap: 18px; }
    .card { display: flex; align-items: center; gap: 26px; background: var(--card); border: 1px solid var(--line);
      border-radius: 28px; box-shadow: var(--shadow-sm); padding: 24px 30px; }
    .card .ic { flex: 0 0 auto; width: 104px; height: 104px; border-radius: 26px; display: grid; place-items: center; color: #fff; }
    .card .ic.g1 { background: linear-gradient(135deg, var(--green), var(--teal)); }
    .card .ic.g2 { background: linear-gradient(135deg, var(--blue), var(--blue-d)); }
    .card .tx h3 { font-family: 'Poppins',sans-serif; font-weight: 700; font-size: 38px; color: var(--navy); margin-bottom: 4px; }
    .card .tx p { font-size: 30px; color: var(--ink); line-height: 1.3; }
  </style>
  <div class="cards">${cards}</div>${data.note ? closer(data.note) : ''}`;
}

// ---------- MITO / REALIDAD ----------
export function mito_realidad(data) {
  return `<style>
    .mr { display: flex; gap: 22px; }
    .mr .col { flex: 1; border-radius: 28px; padding: 28px; border: 1px solid; }
    .mr .mito { background: #FEF1F1; border-color: #FAD4D4; }
    .mr .real { background: #EAF6F2; border-color: #CDEBE0; }
    .mr .lbl { display: inline-flex; align-items: center; gap: 10px; font-family: 'Poppins',sans-serif;
      font-weight: 700; font-size: 27px; padding: 8px 20px; border-radius: 999px; margin-bottom: 18px; color: #fff; }
    .mr .mito .lbl { background: var(--red); }
    .mr .real .lbl { background: linear-gradient(135deg, var(--green), var(--blue)); }
    .mr .col p { font-size: 33px; line-height: 1.32; color: var(--navy); font-weight: 500; }
  </style>
  <div class="mr">
    <div class="col mito"><span class="lbl">✕ Mito</span><p>${data.mito}</p></div>
    <div class="col real"><span class="lbl">✓ Realidad</span><p>${data.realidad}</p></div>
  </div>${data.cierre ? closer(data.cierre) : ''}`;
}

// ---------- PIRÁMIDE ----------
export function piramide(data) {
  const p = data.pyramid;
  return `<style>
    .pyr { display: flex; flex-direction: column; align-items: center; gap: 16px; }
    .pyr .lvl { display: grid; place-items: center; color: #fff; border-radius: 18px; padding: 30px 22px;
      text-align: center; font-family: 'Poppins',sans-serif; font-weight: 700; font-size: 35px;
      box-shadow: var(--shadow-sm); letter-spacing: -0.3px; }
    .pyr .l1 { width: 60%; background: linear-gradient(135deg, var(--green), var(--teal)); }
    .pyr .l2 { width: 80%; background: linear-gradient(135deg, var(--teal), var(--blue)); }
    .pyr .l3 { width: 100%; background: linear-gradient(135deg, var(--blue), var(--blue-d)); }
  </style>
  <div class="pyr">
    <div class="lvl l1">${p.top}</div>
    <div class="lvl l2">${p.mid}</div>
    <div class="lvl l3">${p.base}</div>
  </div>${data.cierre ? closer(data.cierre) : ''}`;
}

// ---------- PROCESO ----------
export function proceso(data) {
  const steps = data.steps.map((s, i) => `
    <div class="step"><div class="node">${i + 1}</div><div class="line"></div>
      <div class="lbl">${s}</div></div>`).join('');
  return `<style>
    .proc { display: flex; flex-direction: column; }
    .step { display: flex; align-items: flex-start; gap: 24px; position: relative; padding-bottom: 22px; }
    .step:last-child { padding-bottom: 0; }
    .step .node { flex: 0 0 auto; width: 70px; height: 70px; border-radius: 50%; background: var(--grad-brand);
      color: #fff; font-family: 'Poppins',sans-serif; font-weight: 700; font-size: 34px; display: grid;
      place-items: center; z-index: 1; box-shadow: 0 8px 18px rgba(45,127,249,0.25); }
    .step .line { position: absolute; left: 34px; top: 70px; bottom: 0; width: 3px;
      background: linear-gradient(var(--teal), var(--blue)); opacity: 0.4; }
    .step:last-child .line { display: none; }
    .step .lbl { flex: 1; background: var(--card); border: 1px solid var(--line); border-radius: 22px;
      box-shadow: var(--shadow-sm); padding: 20px 28px; font-size: 34px; font-weight: 600; color: var(--navy);
      min-height: 70px; display: flex; align-items: center; }
  </style>
  <div class="proc">${steps}</div>${data.cierre ? `<div style="margin-top:18px">${closer(data.cierre)}</div>` : ''}`;
}

export const icons = { chatIcon, globeIcon };
export const templates = { checklist, base_3_cards, mito_realidad, piramide, proceso };
