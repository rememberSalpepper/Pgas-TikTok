// Valida el CSV antes de renderizar/publicar. Falla si algo no cumple las reglas PGAS.

import { parse } from 'csv-parse/sync';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CSV = process.env.PGAS_CSV || join(ROOT, '..', 'pgas_ideas.csv');
const TIPOS = ['checklist', 'base_3_cards', 'mito_realidad', 'piramide', 'proceso'];

const rows = parse(readFileSync(CSV), { columns: true, skip_empty_lines: true, relax_quotes: true });
const errors = [];

for (const r of rows) {
  const tags = (r.hashtags || '').trim().split(/\s+/).filter(Boolean);
  if (tags.length !== 5) errors.push(`${r.id}: debe tener EXACTAMENTE 5 hashtags (tiene ${tags.length}).`);
  if (!tags.includes('#pgas')) errors.push(`${r.id}: falta #pgas.`);
  if (!TIPOS.includes(r.tipo_plantilla)) errors.push(`${r.id}: tipo_plantilla desconocido "${r.tipo_plantilla}".`);
  if (!r.hook) errors.push(`${r.id}: falta hook.`);
  try { JSON.parse(r.imagen_json); } catch { errors.push(`${r.id}: imagen_json inválido o vacío.`); }
}

if (errors.length) {
  console.error(`✗ ${errors.length} problema(s):`);
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
console.log(`✓ OK: ${rows.length} filas válidas (5 hashtags, #pgas, plantilla, hook, imagen_json).`);
