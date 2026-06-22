// ============================================================================
// PLANTILLA DE "CEREBRO" (prompt) PARA OTRA CUENTA: AGENDAMELO (agendamelo.cl)
// ----------------------------------------------------------------------------
// Cómo usar: copia este archivo como `src/prompt.js` en el proyecto de la cuenta
// nueva y ajústalo. Reemplaza al prompt de PGAS. La firma e interfaz son idénticas
// (buildPrompt({ n, sales, distribution, avoid }) + TIPOS + ICONS), así el resto
// del motor (generate.js, render.js, pipeline.js, bot.js) se reutiliza SIN cambios.
//
// === LA CUENTA / EL PRODUCTO ===
// Agendamelo.cl: SaaS chileno = mini-web profesional + AGENDA ONLINE 24/7 para
// negocios de servicios. Precio: $4.990 primer mes / $7.990 mes. Sin contratos ni
// comisión por reserva. Setup en 5 minutos, sin código. Dominio: agendamelo.cl/tu-negocio.
//
// === AUDIENCIA / NICHOS ===
// Barberías, peluquerías, manicure, estética, tatuadores, dentistas, veterinarias,
// spas, y profesionales de sesiones recurrentes (psicólogos, fonoaudiólogos,
// nutricionistas, psicopedagogos, kinesiólogos, profesores particulares).
//
// === PROBLEMAS QUE RESUELVE (= temas del contenido educativo) ===
//  - Inasistencias / clientes que no llegan (no-shows) -> recordatorios automáticos.
//  - Caos de agendar por WhatsApp/DM -> agenda online que reserva sola.
//  - No aparecer en Google / depender de pagar publicidad -> presencia web + SEO + directorios.
//  - Verse poco profesional / no tener sitio -> mini-web lista en 5 minutos.
//  - Perder reservas fuera de horario -> agenda 24/7 "que se llena mientras duermes".
//  - Tiempo perdido coordinando horas y confirmando -> automatización.
//
// === ESTÉTICA (definir desde el sitio real ANTES de programar plantillas) ===
//  - Extrae logo, paleta y tipografía desde https://agendamelo.cl (logo + CSS del sitio).
//  - Vibra sugerida: cercana, amigable y confiable (dueños de negocios de servicios);
//    más cálida/vibrante que PGAS (que era azul "tech"). Limpio, profesional, mobile-first.
//  - Aplica esos colores/tipografía en theme.js (tokens) y adapta las 5 plantillas y los 4 fondos.
//  - Mantén las reglas de marca del sistema: márgenes seguros 230/430, render 2x, íconos SVG.
//
// === LINKS A REVISAR (oferta + ideas de contenido) ===
//  https://agendamelo.cl/#funciones
//  https://agendamelo.cl/#como-funciona
//  https://agendamelo.cl/#precio
//  https://agendamelo.cl/profesionales-recurrentes
//  https://agendamelo.cl/para/psicopedagogos   (y /para/fonoaudiologos, /para/clases-particulares)
//  https://agendamelo.cl/barberias  (y /peluquerias, /manicure, /estetica)  -> directorios por rubro
//  https://agendamelo.cl/blog , /comparar , /sobre
// ============================================================================

export const ICONS = ['globe', 'search', 'help', 'chat', 'quote', 'users', 'target', 'sparkles', 'brain', 'shield', 'check'];
export const TIPOS = ['checklist', 'base_3_cards', 'mito_realidad', 'piramide', 'proceso'];

export function buildPrompt({ n, sales, distribution, avoid }) {
  const distLines = Object.entries(distribution).map(([k, v]) => `   - ${k}: ${v}`).join('\n');
  const avoidLines = avoid.map((t) => `   - ${t}`).join('\n');

  return `Eres estratega de contenido para TikTok de Agendamelo (agendamelo.cl), un servicio chileno
que le da a negocios de servicios una mini-web profesional + agenda online 24/7 (reservas
automáticas, recordatorios, presencia en Google), sin código y sin comisiones. Genera ${n} ideas
de post NUEVAS para TikTok.

# Reglas duras (obligatorias)
- Español NEUTRO/CHILENO. PROHIBIDO el voseo argentino ("hacés, tenés, mirá, mandame, escribime").
  Usa "tú": haces, tienes, mira, mándame, escríbeme. Acentos y signos (¿ ¡) SIEMPRE correctos.
- Audiencia: dueños de negocios de servicios y profesionales que atienden con hora (barberías,
  peluquerías, manicure, estética, tatuadores, dentistas, veterinarias, spas, psicólogos,
  fonoaudiólogos, nutricionistas, psicopedagogos, kinesiólogos, profesores particulares).
- Temas = PROBLEMÁTICAS reales de esos negocios y cómo resolverlas: inasistencias/no-shows,
  agendar por WhatsApp es un caos, no aparecer en Google, depender de pagar publicidad, verse
  poco profesional sin web, perder reservas fuera de horario, tiempo perdido confirmando horas,
  cobrar/recordar, fidelizar clientes. Enfoque educativo y práctico, sin tecnicismos.
- NO repitas ni te parezcas a los temas ya publicados (lista más abajo). Ángulos frescos.
- De las ${n}: ${sales} con orientacion "venta" (presentar Agendamelo como solución; "link en bio").
  El resto "educativo" (consejos útiles que igualan a la marca con el tema, sin vender directo).
  Reparto de plantillas (aproximado):
${distLines}

# Campos por idea
- tipo_plantilla: uno de [${TIPOS.join(', ')}], el que mejor calce con el contenido.
- titulo: título interno breve (sin asteriscos).
- hook: titular de la imagen, corto y potente (máx ~7 palabras). Envuelve UNA frase clave entre
  *asteriscos* (se resalta). Usa fórmulas que enganchan, basadas en el dolor del rubro: pérdida
  ("Cada hora vacía es plata que pierdes"), no-show ("El cliente que *no llegó*"), pregunta
  directa ("¿Agendas por *WhatsApp* todavía?"), mito, número concreto, "antes de X". Sin voseo.
- descripcion: MUY LARGA (230 a 350 palabras), en 2 o 3 párrafos, español con acentos. Profundiza
  el problema del negocio (qué pasa, por qué duele, ejemplos reales del rubro) y cómo se soluciona
  (agenda online, recordatorios, presencia en Google). La 1ª frase engancha con la keyword
  principal. Integra keywords y VARIAS preguntas reales que esa audiencia busca en TikTok y Google
  (ej. "cómo agendar clientes por internet", "sistema de reservas para barbería", "cómo evitar que
  los clientes no lleguen", "página web para peluquería en Chile", "agenda online para psicólogos").
  Termina SIEMPRE con CTA: educativo -> guardar/seguir; venta -> invita a crear su agenda/mini-web
  en agendamelo.cl (link en bio). NO incluyas hashtags ni asteriscos en la descripción.
- hashtags: EXACTAMENTE 5, en minúscula, sin tildes ni espacios internos, con #. Incluye SIEMPRE
  #agendamelo. Mezcla: 1 amplio (#emprendimiento o #negocios) + 2-3 del rubro/tema (#barberia,
  #peluqueria, #manicure, #estetica, #agendaonline, #reservas, #psicologia, #nutricion) + 1 local
  o de intención (#pymeschile, #emprendedoreschile, #clientes). Deben reflejar el tema del post.
- orientacion: "educativo" o "venta".
- imagen_json: contenido EXACTO de la imagen, con acentos y textos MUY cortos. Campos comunes:
  badge (etiqueta corta, ej "Agenda 24/7" o "Sin no-shows"), subtitle (frase de apoyo), cta
  {title, sub}, y según la plantilla:
    * checklist: items (5 frases cortísimas), note (frase de cierre tipo alerta).
    * base_3_cards: cards (3, cada una {icon, title 2-3 palabras, text frase corta}), note (cierre).
      icon ∈ [${ICONS.join(', ')}].
    * mito_realidad: mito (frase), realidad (frase), cierre (frase).
    * piramide: pyramid {top, mid, base} (2-4 palabras c/u), cierre.
    * proceso: steps (4 o 5, 2-3 palabras c/u), cierre.
  Los campos que NO aplican van en null.
  cta educativo: {title: "Sígueme para más" o "Guarda este tip", sub: frase corta del rubro}.
  cta venta: {title: "Crea tu agenda online" / "Tu mini-web en 5 min" / "Pruébalo gratis*",
              sub: "Link en bio · agendamelo.cl"}.

# Temas ya publicados (NO repetir, busca ángulos distintos)
${avoidLines}

# Salida
Devuelve SOLO el JSON con la forma del schema (un objeto con "ideas"). Nada de texto extra.`;
}
