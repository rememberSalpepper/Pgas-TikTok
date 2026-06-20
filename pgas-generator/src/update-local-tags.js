// Activa un hashtag local chileno en los posts de venta para subir alcance cualificado.
// Mantiene SIEMPRE 5 hashtags y #pgas.

import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import { readFileSync, writeFileSync } from 'node:fs';

const CSV = '/Users/taketaraketake/testmarketing/pgas_ideas.csv';

// Posts de venta -> set con tag local (5 exactos).
const SALES = {
  'PGAS-IDEA-004': '#pgas #publicidaddigital #paginasweb #masventas #seochile',
  'PGAS-IDEA-005': '#pgas #auditoriaseo #paginasweb #pymes #seochile',
  'PGAS-IDEA-012': '#pgas #auditoriaseo #posicionamientoweb #pymes #seochile',
  'PGAS-IDEA-014': '#pgas #paginasweb #seo #pymes #emprendedoreschile',
  'PGAS-IDEA-020': '#pgas #marketingdigital #paginasweb #masventas #seochile',
};

const rows = parse(readFileSync(CSV), { columns: true, skip_empty_lines: true, relax_quotes: true });
let n = 0;
for (const r of rows) if (SALES[r.id]) { r.hashtags = SALES[r.id]; n++; }
writeFileSync(CSV, stringify(rows, { header: true, columns: Object.keys(rows[0]) }));
console.log(`OK: tag local aplicado a ${n} posts de venta.`);
