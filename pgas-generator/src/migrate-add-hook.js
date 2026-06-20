// Migración: agrega la columna `hook` al CSV (después de `titulo`).
// Hooks en español neutro/chileno (sin voseo), con *asteriscos* marcando el énfasis (azul).
// Robusto: parsea respetando comillas/comas y reescribe sin corromper.

import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import { readFileSync, writeFileSync } from 'node:fs';

const CSV = '/Users/taketaraketake/testmarketing/pgas_ideas.csv';

// Hook por id. El *texto entre asteriscos* se resalta en azul en la imagen.
const HOOKS = {
  'PGAS-IDEA-001': 'Tu web *existe*, pero Google no la recomienda',
  'PGAS-IDEA-002': 'El SEO *no* es repetir palabras clave',
  'PGAS-IDEA-003': 'La *pirámide SEO* que tu web necesita',
  'PGAS-IDEA-004': 'Antes de pagar anuncios, *revisa esto*',
  'PGAS-IDEA-005': 'Una auditoría web en *5 pasos*',
  'PGAS-IDEA-006': 'AEO: *responde* antes de vender',
  'PGAS-IDEA-007': 'ChatGPT *no* reemplaza tu web',
  'PGAS-IDEA-008': '¿Tu web responde estas *5 preguntas*?',
  'PGAS-IDEA-009': '*GEO* explicado en una pirámide',
  'PGAS-IDEA-010': 'De web *invisible* a web encontrable',
  'PGAS-IDEA-011': 'Tu home *no* debería hablar solo de ti',
  'PGAS-IDEA-012': 'Señales de que necesitas una *auditoría SEO*',
  'PGAS-IDEA-013': 'Una web nueva *no* se posiciona sola',
  'PGAS-IDEA-014': 'Web + SEO + AEO + GEO en *un solo pack*',
  'PGAS-IDEA-015': '*SEO, AEO y GEO* no son lo mismo',
  'PGAS-IDEA-016': 'Lo mínimo que necesita tu *página de servicio*',
  'PGAS-IDEA-017': 'Más contenido *no* siempre es mejor',
  'PGAS-IDEA-018': 'La pirámide para que la *IA te recomiende*',
  'PGAS-IDEA-019': 'Antes de rediseñar tu web, *revisa esto*',
  'PGAS-IDEA-020': 'Si tu web no convierte, *no siempre falta tráfico*',
};

const rows = parse(readFileSync(CSV), { columns: true, skip_empty_lines: true, relax_quotes: true });

// Insertar `hook` justo después de `titulo`, conservando el resto del orden.
const out = rows.map((r) => {
  const o = {};
  for (const [k, v] of Object.entries(r)) {
    o[k] = v;
    if (k === 'titulo') o.hook = HOOKS[r.id] ?? '';
  }
  return o;
});

const header = Object.keys(out[0]);
writeFileSync(CSV, stringify(out, { header: true, columns: header }));
console.log(`OK: columna 'hook' agregada a ${out.length} filas.`);
console.log('Columnas:', header.join(', '));
