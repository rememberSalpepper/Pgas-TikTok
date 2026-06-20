// Pipeline PGAS: lee el CSV, renderiza por plantilla y marca cada idea como realizada.
//
// Uso:
//   node src/pipeline.js pending      -> renderiza solo las que están pendientes
//   node src/pipeline.js all          -> renderiza las 20 (estandarizar)
//   node src/pipeline.js one <id>     -> renderiza una sola
//
// Al terminar cada idea: estado=realizado, fecha_realizado, imagen_url.

import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderToPng, openBrowser } from './render.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CSV = process.env.PGAS_CSV || join(ROOT, '..', 'pgas_ideas.csv');
const today = new Date().toISOString().slice(0, 10);

function rowToData(row) {
  const content = JSON.parse(row.imagen_json);
  return { tipo: row.tipo_plantilla, hook: row.hook, ...content };
}

async function main() {
  const [mode = 'pending', arg] = process.argv.slice(2);
  const rows = parse(readFileSync(CSV), { columns: true, skip_empty_lines: true, relax_quotes: true });

  let targets;
  if (mode === 'all') targets = rows;
  else if (mode === 'one') targets = rows.filter((r) => r.id === arg);
  else targets = rows.filter((r) => r.estado !== 'realizado');

  if (targets.length === 0) { console.log('No hay ideas que renderizar para el modo:', mode); return; }
  console.log(`Renderizando ${targets.length} imagen(es) [modo: ${mode}]...`);

  const browser = await openBrowser();
  for (const row of targets) {
    const rel = `dist/${row.id}.png`;
    const out = join(ROOT, rel);
    await renderToPng(rowToData(row), out, browser);
    row.estado = 'realizado';
    row.fecha_realizado = row.fecha_realizado || today;
    row.imagen_url = rel;
    console.log(`  ✓ ${row.id}  (${row.tipo_plantilla})  -> ${rel}`);
  }
  await browser.close();

  writeFileSync(CSV, stringify(rows, { header: true, columns: Object.keys(rows[0]) }));
  console.log('CSV actualizado: estado=realizado, fecha_realizado, imagen_url.');
}

main();
