// El "cerebro" del generador: construye el prompt que recibe Codex.
// Reglas fijas de PGAS + lista de temas a evitar + distribución pedida.

export const ICONS = ['globe', 'search', 'help', 'chat', 'quote', 'users', 'target', 'sparkles', 'brain', 'shield', 'check'];
export const TIPOS = ['checklist', 'base_3_cards', 'mito_realidad', 'piramide', 'proceso'];

export function buildPrompt({ n, sales, distribution, avoid }) {
  const distLines = Object.entries(distribution).map(([k, v]) => `   - ${k}: ${v}`).join('\n');
  const avoidLines = avoid.map((t) => `   - ${t}`).join('\n');

  return `Eres estratega de contenido para TikTok de PGAS, una agencia chilena de SEO, AEO, GEO y
desarrollo web (sitio: www.pgas.online). Genera ${n} ideas de post NUEVAS para TikTok.

# Reglas duras (obligatorias)
- Español NEUTRO/CHILENO. PROHIBIDO el voseo argentino: nunca uses "hacés, tenés, querés,
  mirá, fijate, mandame, escribime, dale, andá". Usa "tú": haces, tienes, mira, fíjate,
  mándame, escríbeme. Acentos y signos (¿ ¡) SIEMPRE correctos.
- Temas: principalmente SEO, AEO y GEO; secundariamente desarrollo web. Enfoque PGAS:
  educar y, en algunas, ofrecer auditoría/servicios.
- NO repitas ni te parezcas a los temas ya publicados (lista más abajo). Ángulos frescos.
- De las ${n}: ${sales} con orientacion "venta" (auditoría/consulta/pack), el resto "educativo".
  Reparto de plantillas (aproximado):
${distLines}

# Campos por idea
- tipo_plantilla: uno de [${TIPOS.join(', ')}], el que mejor calce con el contenido.
- titulo: título interno breve (sin asteriscos).
- hook: titular de la imagen, corto y potente (máx ~7 palabras). Envuelve UNA sola frase
  clave entre *asteriscos* (se resalta en azul). Usa fórmulas que enganchan: mito/contradicción,
  brecha de curiosidad, número concreto, error común, "antes de X". Sin voseo.
- descripcion: MUY LARGA (entre 230 y 350 palabras), en 2 o 3 párrafos, en español con acentos.
  Profundiza el tema de la imagen: explica QUÉ es, POR QUÉ importa, ejemplos concretos y errores
  comunes. La 1ª frase engancha con la keyword principal. Integra de forma natural keywords y
  sinónimos, y VARIAS preguntas reales que la gente escribe en TikTok y Google (ej. "¿qué es...?",
  "cómo...", "...para pymes", "mejor... en Chile") para posicionar dentro y fuera de TikTok.
  Termina SIEMPRE con un CTA claro (guardar/seguir si es educativo; escribir por DM si es venta).
  Sin voseo. NO incluyas hashtags ni asteriscos en la descripción.
- hashtags: EXACTAMENTE 5, en minúscula, sin tildes ni espacios internos, cada uno con #.
  Incluye SIEMPRE #pgas. Mezcla: 1 amplio (#seo o #marketingdigital) + 2-3 temáticos del post
  + 1 de intención/venta (#paginasweb #auditoriaseo #pymes #masventas). En orientacion "venta"
  puedes usar un tag local chileno (#seochile o #emprendedoreschile). Deben reflejar el tema.
- orientacion: "educativo" o "venta".
- imagen_json: el contenido EXACTO que se dibuja en la imagen, con acentos y textos MUY cortos.
  Campos comunes: badge (etiqueta corta, ej "AEO" o "Checklist · Anuncios"), subtitle (una frase
  de apoyo), cta {title, sub}, y según la plantilla:
    * checklist: items (5 frases cortísimas), note (frase de cierre tipo alerta).
    * base_3_cards: cards (3, cada una {icon, title de 2-3 palabras, text frase corta}), note (cierre).
      icon ∈ [${ICONS.join(', ')}].
    * mito_realidad: mito (frase), realidad (frase), cierre (frase).
    * piramide: pyramid {top, mid, base} (2-4 palabras c/u; top=cima, base=cimiento), cierre.
    * proceso: steps (4 o 5, 2-3 palabras c/u), cierre.
  Los campos que NO aplican a la plantilla deben ir en null.
  cta educativo: {title: "Sígueme para más" o "Guarda este post", sub: frase corta}.
  cta venta: {title: "Solicita tu auditoría" / "Hablemos de tu web" / "Arma tu pack",
              sub: "Escríbeme por DM y revisamos tu caso." o similar}.

# Temas ya publicados (NO repetir, busca ángulos distintos)
${avoidLines}

# Salida
Devuelve SOLO el JSON con la forma del schema (un objeto con "ideas"). Nada de texto extra.`;
}
