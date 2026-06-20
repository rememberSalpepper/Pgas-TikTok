// Tema visual compartido de PGAS.
// Define tokens de marca, fondo minimalista y las zonas seguras (280px arriba/abajo).
// Recibe las fuentes y el logo ya en base64 para inyectarlos sin dependencias externas.

export function buildCss({ fonts, fontFace }) {
  return `
${fontFace}

:root {
  /* Paleta PGAS (extraída de los assets de marca) */
  --navy:   #16224F;
  --navy-2: #1E3A8A;
  --blue:   #2D6BFF;
  --blue-d: #1D4ED8;
  --teal:   #2DD4BF;
  --green:  #22C9A0;
  --ink:    #51607A;   /* texto cuerpo */
  --ink-2:  #7C8AA5;   /* texto secundario */
  --bg-1:   #F7FAFF;
  --bg-2:   #E9F0FF;
  --card:   #FFFFFF;
  --line:   #E7EDF7;
  --red:    #EF4444;
  --red-bg: #FEECEC;

  --grad-brand: linear-gradient(135deg, var(--green) 0%, var(--blue) 100%);
  --grad-cta:   linear-gradient(135deg, var(--teal) 0%, var(--blue-d) 100%);

  --safe-top: 230px;    /* margen calmo superior (HUD de TikTok) */
  --safe-bottom: 430px; /* margen calmo inferior, más amplio: ahí va la descripción de TikTok */
  --pad-x: 84px;        /* margen lateral del contenido */
  --shadow: 0 24px 60px rgba(28, 50, 110, 0.10);
  --shadow-sm: 0 10px 30px rgba(28, 50, 110, 0.07);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html, body { width: 1080px; height: 1920px; }

body {
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: geometricPrecision;
}

/* ---------- Lienzo ---------- */
.canvas {
  position: relative;
  width: 1080px;
  height: 1920px;
  overflow: hidden;
  background: var(--bg-1);
}

/* ---------- Fondo a sangre completa (cubre el 100%, márgenes incluidos) ---------- */
.bg { position: absolute; inset: 0; z-index: 0; }
.bg-base {
  position: absolute; inset: 0;
  background:
    radial-gradient(1200px 900px at 80% -8%, #EFF5FF 0%, rgba(239,245,255,0) 60%),
    radial-gradient(1100px 1000px at 0% 108%, #EAF3FF 0%, rgba(234,243,255,0) 55%),
    linear-gradient(180deg, var(--bg-1) 0%, var(--bg-2) 100%);
}
/* Blobs muy sutiles, viven en las zonas calmas sin competir con el contenido */
.blob { position: absolute; border-radius: 50%; filter: blur(2px); opacity: 0.16; }
.blob.a { width: 360px; height: 360px; top: -120px; left: -110px; background: var(--grad-brand); }
.blob.b { width: 300px; height: 300px; bottom: -110px; right: -90px; background: var(--grad-cta); opacity: 0.14; }
/* Retícula de puntos decorativa */
.dots {
  position: absolute; width: 150px; height: 150px;
  background-image: radial-gradient(var(--blue) 2px, transparent 2px);
  background-size: 26px 26px; opacity: 0.12;
}
.dots.tr { top: 120px; right: 70px; }
.dots.bl { bottom: 120px; left: 70px; }

/* ---------- Zona de contenido (entre los 280px calmos) ---------- */
.content {
  position: absolute;
  top: var(--safe-top);
  bottom: var(--safe-bottom);
  left: 0; right: 0;
  z-index: 2;
  padding: 0 var(--pad-x);
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* contenido compactado hacia arriba */
}

/* ---------- Encabezado de marca ---------- */
.brand {
  display: flex; align-items: center; justify-content: center;
  gap: 24px; margin-bottom: 28px;
}
.brand img { height: 200px; width: auto; display: block;
  filter: drop-shadow(0 12px 26px rgba(45,127,249,0.22)); }
.brand .wm {
  font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 120px;
  letter-spacing: -2.5px; line-height: 1.18; padding-bottom: 8px; /* espacio para el descender de la "g" */
  background: var(--grad-brand); -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
}

.badge {
  align-self: center;
  font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 24px;
  color: #fff; letter-spacing: 0.3px;
  padding: 11px 26px; border-radius: 999px;
  background: var(--grad-cta);
  box-shadow: 0 10px 24px rgba(45,127,249,0.28);
  margin-bottom: 30px;
}

/* ---------- Titular ---------- */
.headline {
  font-family: 'Poppins', sans-serif; font-weight: 800;
  font-size: 76px; line-height: 1.04; letter-spacing: -1.6px;
  color: var(--navy); text-align: center;
}
.headline .hl {
  background: linear-gradient(120deg, var(--blue) 0%, var(--blue-d) 100%);
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
}
.subtitle {
  font-size: 31px; line-height: 1.4; color: var(--ink);
  text-align: center; margin-top: 22px; font-weight: 400;
  padding: 0 12px;
}

/* ---------- Bloque central flexible ---------- */
.body { flex: 0 1 auto; display: flex; flex-direction: column; justify-content: flex-start; gap: 22px; margin: 36px 0 44px; }

/* ---------- CTA inferior ---------- */
.cta {
  display: flex; align-items: center; gap: 22px;
  background: var(--grad-cta); border-radius: 28px;
  padding: 28px 34px; box-shadow: 0 18px 40px rgba(29,78,216,0.30);
}
.cta .ic { flex: 0 0 auto; width: 64px; height: 64px; display: grid; place-items: center;
  background: rgba(255,255,255,0.18); border-radius: 18px; }
.cta .tx { color: #fff; }
.cta .tx b { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 36px; display: block; line-height: 1.1; }
.cta .tx span { font-size: 25px; opacity: 0.92; display: block; margin-top: 4px; }
.footer {
  display: flex; align-items: center; justify-content: center; gap: 12px;
  margin-top: 22px; color: var(--navy-2); font-weight: 600; font-size: 27px;
  font-family: 'Poppins', sans-serif;
}
.footer svg { opacity: 0.85; }

/* ---------- Franja de cierre (compartida: mito, pirámide, proceso, cards) ---------- */
.closer {
  display: flex; align-items: center; gap: 18px;
  background: #EAF1FF; border: 1px solid var(--line); border-radius: 22px;
  padding: 22px 28px;
}
.closer .ic { flex: 0 0 auto; width: 50px; height: 50px; border-radius: 14px;
  background: var(--grad-cta); display: grid; place-items: center; color: #fff; }
.closer span { font-size: 30px; font-weight: 600; color: var(--navy-2); line-height: 1.25; }
`;
}
