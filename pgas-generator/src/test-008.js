// Prueba de validación: renderiza PGAS-IDEA-008 (plantilla checklist).
// Copy en español neutro/chileno (sin voseo), acentos corregidos.

import { renderToPng } from './render.js';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const data = {
  id: 'PGAS-IDEA-008',
  tipo: 'checklist',
  badge: 'Checklist · Claridad web',
  // El hook viene del CSV; *énfasis* se resalta en azul automáticamente.
  hook: '¿Tu web responde estas *5 preguntas*?',
  subtitle: 'Si no las responde en segundos, pierdes clientes, posicionamiento y recomendación de la IA.',
  items: [
    '¿Qué vendes?',
    '¿Para quién es?',
    '¿Qué problema resuelves?',
    '¿Por qué confiar en ti?',
    '¿Cómo contactarte?',
  ],
  note: 'Si falta una sola respuesta, ya hay fricción.',
  cta: { title: 'Solicita tu auditoría', sub: 'Escríbeme por DM y revisamos tu caso.' },
  footer: 'www.pgas.online',
};

const out = join(__dirname, '..', 'dist', 'PGAS-IDEA-008.png');
renderToPng(data, out).then(() => console.log('OK ->', out));
