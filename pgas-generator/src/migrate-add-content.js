// Agrega la columna `imagen_json` al CSV: contenido estructurado y con acentos para cada
// plantilla (español neutro/chileno). El render lo lee para dibujar la imagen.

import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import { readFileSync, writeFileSync } from 'node:fs';

const CSV = '/Users/taketaraketake/testmarketing/pgas_ideas.csv';

const cta = {
  follow: { title: 'Sígueme para más', sub: 'SEO, AEO y GEO sin enredos.' },
  save:   { title: 'Guarda este post', sub: 'y revísalo con tu web al lado.' },
  audit:  { title: 'Solicita tu auditoría', sub: 'Escríbeme por DM y revisamos tu caso.' },
  dm:     { title: 'Hablemos de tu web', sub: 'Escríbeme por DM y te oriento.' },
  pack:   { title: 'Arma tu pack', sub: 'Escríbeme y vemos qué necesitas.' },
};

const CONTENT = {
  'PGAS-IDEA-001': { badge: 'SEO · Visibilidad', subtitle: 'Estar publicada no es lo mismo que ser encontrada.',
    cards: [{ icon: 'globe', title: 'Publicada ≠ posicionada', text: 'Existir online no te hace visible.' },
            { icon: 'search', title: 'Sin estructura SEO', text: 'Google no entiende qué ofreces.' },
            { icon: 'help', title: 'No responde búsquedas', text: 'Si no respondes, no te recomienda.' }],
    note: 'Publicar no basta: hay que ser encontrable.', cta: cta.dm },

  'PGAS-IDEA-002': { badge: 'Mito SEO', subtitle: 'Repetir keywords ya no posiciona.',
    mito: 'SEO es repetir palabras clave en toda la web.',
    realidad: 'SEO moderno entiende intención, estructura y confianza.',
    cierre: 'No optimices palabras: optimiza decisiones.', cta: cta.follow },

  'PGAS-IDEA-003': { badge: 'SEO técnico', subtitle: 'El posicionamiento se construye por capas.',
    pyramid: { top: 'Contenido que responde búsquedas', mid: 'Estructura y páginas claras', base: 'Base técnica estable' },
    cierre: 'Si la base falla, el SEO pierde fuerza.', cta: cta.save },

  'PGAS-IDEA-004': { badge: 'Checklist · Anuncios', subtitle: 'El tráfico pagado no arregla una web confusa.',
    items: ['¿Carga rápido?', '¿Explica tu oferta?', '¿Tiene títulos SEO?', '¿Responde dudas?', '¿Convierte visitas?'],
    note: 'Primero arregla la web, después invierte.', cta: cta.audit },

  'PGAS-IDEA-005': { badge: 'Auditoría web', subtitle: 'Así revisamos tu sitio antes de cambiar nada.',
    steps: ['Indexación', 'Velocidad', 'Estructura SEO', 'Contenido y conversión', 'AEO y GEO'],
    cierre: 'Diagnóstico antes de rediseñar.', cta: cta.audit },

  'PGAS-IDEA-006': { badge: 'AEO', subtitle: 'Responder mejor que la competencia también vende.',
    cards: [{ icon: 'help', title: 'Preguntas reales', text: 'Lo que tus clientes ya buscan.' },
            { icon: 'chat', title: 'Respuestas claras', text: 'Información fácil de entender.' },
            { icon: 'quote', title: 'Fácil de citar', text: 'Para Google y para la IA.' }],
    note: 'La claridad también posiciona.', cta: cta.follow },

  'PGAS-IDEA-007': { badge: 'Mito · IA', subtitle: 'La IA necesita una fuente que pueda entender.',
    mito: 'Con ChatGPT ya no necesito página web.',
    realidad: 'La IA necesita tu web clara para recomendarte.',
    cierre: 'Sin web clara, la IA no puede citarte.', cta: cta.follow },

  'PGAS-IDEA-008': { badge: 'Checklist · Claridad web', subtitle: 'Si no las responde en segundos, pierdes clientes y recomendación de la IA.',
    items: ['¿Qué vendes?', '¿Para quién es?', '¿Qué problema resuelves?', '¿Por qué confiar en ti?', '¿Cómo contactarte?'],
    note: 'Si falta una sola respuesta, ya hay fricción.', cta: cta.dm },

  'PGAS-IDEA-009': { badge: 'GEO', subtitle: 'La IA recomienda lo que puede entender y verificar.',
    pyramid: { top: 'Recomendación en la IA', mid: 'Datos y contenido estructurado', base: 'Fuente confiable' },
    cierre: 'GEO no son trucos: es confianza.', cta: cta.follow },

  'PGAS-IDEA-010': { badge: 'SEO · Proceso', subtitle: 'Una transformación con orden, no con magia.',
    steps: ['Diagnóstico', 'Estructura', 'Contenido SEO y AEO', 'Medición y ajustes'],
    cierre: 'De publicar a ser encontrado.', cta: cta.dm },

  'PGAS-IDEA-011': { badge: 'Conversión', subtitle: 'Tu portada debe orientar, no presumir.',
    cards: [{ icon: 'users', title: 'Cliente primero', text: 'Habla de su problema, no de ti.' },
            { icon: 'target', title: 'Problema claro', text: 'Qué resuelves, en una frase.' },
            { icon: 'sparkles', title: 'Solución visible', text: 'Y el siguiente paso, obvio.' }],
    note: 'La home responde, no se presenta.', cta: cta.dm },

  'PGAS-IDEA-012': { badge: 'Auditoría SEO', subtitle: 'Si marcas dos o más, conviene revisar.',
    items: ['No llegan visitas orgánicas', 'No apareces por tus servicios', 'La web carga lento', 'Títulos repetidos', 'No llegan contactos'],
    note: '2 o más señales = hora de auditar.', cta: cta.audit },

  'PGAS-IDEA-013': { badge: 'Mito SEO', subtitle: 'Publicar no es lo mismo que posicionar.',
    mito: 'Lanzo mi web y Google la posiciona sola.',
    realidad: 'Necesita indexación, estructura y contenido con intención.',
    cierre: 'Lanzar bien evita empezar invisible.', cta: cta.follow },

  'PGAS-IDEA-014': { badge: 'Pack PGAS', subtitle: 'Una base digital, no piezas sueltas.',
    steps: ['Web clara', 'SEO desde la estructura', 'Respuestas AEO', 'Preparación GEO'],
    cierre: 'Todo conectado desde el primer día.', cta: cta.pack },

  'PGAS-IDEA-015': { badge: 'SEO · AEO · GEO', subtitle: 'Se complementan en una estrategia moderna.',
    cards: [{ icon: 'search', title: 'SEO', text: 'Te encuentran en Google.' },
            { icon: 'chat', title: 'AEO', text: 'Respondes preguntas concretas.' },
            { icon: 'brain', title: 'GEO', text: 'La IA te entiende y recomienda.' }],
    note: 'Juntos te vuelven más elegible.', cta: cta.follow },

  'PGAS-IDEA-016': { badge: 'Checklist · Servicios', subtitle: 'Menos texto genérico, más claridad que convierte.',
    items: ['El problema del cliente', 'Tu solución', 'Beneficios concretos', 'Tu proceso', 'FAQs y un CTA claro'],
    note: 'Cada página responde una intención.', cta: cta.dm },

  'PGAS-IDEA-017': { badge: 'Mito · Contenido', subtitle: 'Cantidad no es lo mismo que crecimiento.',
    mito: 'Mientras más artículos publique, mejor.',
    realidad: 'Mejor contenido conectado y con intención.',
    cierre: 'Publicar sin estrategia también confunde.', cta: cta.follow },

  'PGAS-IDEA-018': { badge: 'GEO · Confianza', subtitle: 'La recomendación se construye con señales claras.',
    pyramid: { top: 'Recomendación de la IA', mid: 'Contenido experto y pruebas', base: 'Información clara y consistente' },
    cierre: 'Sin confianza, no hay recomendación.', cta: cta.audit },

  'PGAS-IDEA-019': { badge: 'Rediseño · SEO', subtitle: 'Cambia el diseño sin perder lo que ya funciona.',
    steps: ['Páginas con tráfico', 'Búsquedas que funcionan', 'Errores técnicos', 'Contenido que conservar'],
    cierre: 'Rediseña sin perder SEO.', cta: cta.dm },

  'PGAS-IDEA-020': { badge: 'Conversión', subtitle: 'A veces el problema no es cuánta gente llega.',
    cards: [{ icon: 'chat', title: 'Mensaje confuso', text: 'No se entiende qué ofreces.' },
            { icon: 'shield', title: 'Poca confianza', text: 'Falta prueba y respaldo.' },
            { icon: 'target', title: 'CTA débil', text: 'No guía al siguiente paso.' }],
    note: 'Primero encuentra el cuello de botella.', cta: cta.audit },
};

const rows = parse(readFileSync(CSV), { columns: true, skip_empty_lines: true, relax_quotes: true });
let n = 0;
const out = rows.map((r) => {
  const o = {};
  for (const [k, v] of Object.entries(r)) {
    o[k] = v;
    if (k === 'texto_imagen' && CONTENT[r.id]) { o.imagen_json = JSON.stringify(CONTENT[r.id]); n++; }
  }
  return o;
});
writeFileSync(CSV, stringify(out, { header: true, columns: Object.keys(out[0]) }));
console.log(`OK: imagen_json agregado a ${n} filas.`);
console.log('Columnas:', Object.keys(out[0]).join(', '));
