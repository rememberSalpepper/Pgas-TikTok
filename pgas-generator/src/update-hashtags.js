// Actualiza los hashtags de cada fila con la fórmula PGAS:
// marca + amplio (alcance) + temáticos (relevancia) + intención (venta). Máx 5, #pgas siempre.

import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import { readFileSync, writeFileSync } from 'node:fs';

const CSV = '/Users/taketaraketake/testmarketing/pgas_ideas.csv';

const HASHTAGS = {
  'PGAS-IDEA-001': '#pgas #seo #posicionamientoweb #marketingdigital #paginasweb',
  'PGAS-IDEA-002': '#pgas #seo #posicionamientoweb #marketingdigital #emprendedores',
  'PGAS-IDEA-003': '#pgas #seo #seotecnico #posicionamientoweb #paginasweb',
  'PGAS-IDEA-004': '#pgas #marketingdigital #publicidaddigital #paginasweb #masventas',
  'PGAS-IDEA-005': '#pgas #auditoriaseo #seo #paginasweb #pymes',
  'PGAS-IDEA-006': '#pgas #aeo #seo #inteligenciaartificial #marketingdigital',
  'PGAS-IDEA-007': '#pgas #chatgpt #inteligenciaartificial #aeo #paginasweb',
  'PGAS-IDEA-008': '#pgas #seo #paginasweb #marketingdigital #emprendedores',
  'PGAS-IDEA-009': '#pgas #geo #inteligenciaartificial #seo #marketingdigital',
  'PGAS-IDEA-010': '#pgas #seo #posicionamientoweb #paginasweb #emprendedores',
  'PGAS-IDEA-011': '#pgas #marketingdigital #paginasweb #copywriting #emprendedores',
  'PGAS-IDEA-012': '#pgas #auditoriaseo #seo #posicionamientoweb #pymes',
  'PGAS-IDEA-013': '#pgas #seo #paginasweb #emprendedores #posicionamientoweb',
  'PGAS-IDEA-014': '#pgas #paginasweb #seo #aeo #pymes',
  'PGAS-IDEA-015': '#pgas #seo #aeo #geo #marketingdigital',
  'PGAS-IDEA-016': '#pgas #paginasweb #marketingdigital #seo #emprendedores',
  'PGAS-IDEA-017': '#pgas #seo #marketingdecontenidos #marketingdigital #posicionamientoweb',
  'PGAS-IDEA-018': '#pgas #geo #inteligenciaartificial #aeo #marketingdigital',
  'PGAS-IDEA-019': '#pgas #seo #paginasweb #posicionamientoweb #emprendedores',
  'PGAS-IDEA-020': '#pgas #marketingdigital #paginasweb #masventas #emprendedores',
};

const rows = parse(readFileSync(CSV), { columns: true, skip_empty_lines: true, relax_quotes: true });
let n = 0;
for (const r of rows) {
  if (HASHTAGS[r.id]) { r.hashtags = HASHTAGS[r.id]; n++; }
}
writeFileSync(CSV, stringify(rows, { header: true, columns: Object.keys(rows[0]) }));
console.log(`OK: hashtags actualizados en ${n} filas.`);
