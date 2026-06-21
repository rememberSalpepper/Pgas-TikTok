// Motor de render PGAS: data -> HTML -> PNG (Playwright/Chromium headless).
// Fuentes y logo se inyectan en base64 para reproducibilidad total (sin CDN ni rutas frágiles).

import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { buildCss } from './theme.js';
import { templates, icons, esc } from './templates.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const b64 = (p) => readFileSync(join(ROOT, p)).toString('base64');

// ---- Fuentes self-hosted -> @font-face en base64 ----
const FONTS = [
  ['Poppins', 400, 'assets/fonts/poppins-400.woff2'],
  ['Poppins', 600, 'assets/fonts/poppins-600.woff2'],
  ['Poppins', 700, 'assets/fonts/poppins-700.woff2'],
  ['Poppins', 800, 'assets/fonts/poppins-800.woff2'],
  ['Inter', 400, 'assets/fonts/inter-400.woff2'],
  ['Inter', 500, 'assets/fonts/inter-500.woff2'],
  ['Inter', 600, 'assets/fonts/inter-600.woff2'],
];
const fontFace = FONTS.map(([fam, w, p]) =>
  `@font-face{font-family:'${fam}';font-style:normal;font-weight:${w};font-display:block;`
  + `src:url(data:font/woff2;base64,${b64(p)}) format('woff2');}`).join('\n');

const birdDataUri = `data:image/webp;base64,${b64('assets/logos/bird.webp')}`;

// Convierte un hook "texto con *énfasis*" en el titular HTML con resaltado azul.
function hookToHeadline(hook) {
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return esc(hook).replace(/\*(.+?)\*/g, '<span class="hl">$1</span>');
}

export function renderHtml(data) {
  const css = buildCss({ fontFace });
  const body = templates[data.tipo](data);
  const headline = data.headline ?? hookToHeadline(data.hook);
  const cta = data.cta || { title: 'Sígueme para más', sub: 'SEO, AEO y GEO sin enredos.' };
  const bg = data.bg || 1; // variante de fondo (1-4)

  return `<!doctype html><html lang="es"><head><meta charset="utf-8">
  <style>${css}</style></head>
  <body><div class="canvas">
    <div class="bg v${bg}">
      <div class="bg-base"></div>
      <div class="blob a"></div><div class="blob b"></div>
      <div class="dots d1"></div><div class="dots d2"></div>
    </div>
    <div class="content">
      <div class="brand">
        <img src="${birdDataUri}" alt="">
        <span class="wm">Pgas</span>
      </div>
      ${data.badge ? `<div class="badge">${esc(data.badge)}</div>` : ''}
      <h1 class="headline">${headline}</h1>
      ${data.subtitle ? `<p class="subtitle">${esc(data.subtitle)}</p>` : ''}
      <div class="body">${body}</div>
      <div class="cta">
        <div class="ic">${icons.chatIcon}</div>
        <div class="tx"><b>${esc(cta.title)}</b><span>${esc(cta.sub)}</span></div>
      </div>
      <div class="footer">${icons.globeIcon}<span>${esc(data.footer || 'www.pgas.online')}</span></div>
    </div>
  </div></body></html>`;
}

export async function renderToPng(data, outPath, existingBrowser = null) {
  const html = renderHtml(data);
  const browser = existingBrowser ?? await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1920 },
    deviceScaleFactor: 2, // salida 2160x3840 -> máxima nitidez
  });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready.then(() => true));
  await page.locator('.canvas').screenshot({ path: outPath });
  await page.close();
  if (!existingBrowser) await browser.close();
  return outPath;
}

export async function openBrowser() { return chromium.launch(); }
