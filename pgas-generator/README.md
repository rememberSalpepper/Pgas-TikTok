# PGAS — generador de posts para TikTok

Genera imágenes verticales (1080×1920) y captions optimizados para TikTok/SEO a partir
de un CSV. Render con HTML/CSS + Playwright (Chromium headless). Sin generadores de IA →
sin marca de "generado por IA", control pixel-perfect de márgenes y marca consistente.

## Flujo

```
pgas_ideas.csv  (fuente de verdad)
   → src/pipeline.js   lee filas → render por plantilla → PNG en dist/ → marca realizado
   → src/caption.js    arma el caption (👇×4 + descripción + 5 hashtags)
   → [VPS/Telegram]    (pendiente) envío automático semanal
```

## Comandos

```bash
npm run lint          # valida el CSV (5 hashtags, #pgas, plantilla, hook, imagen_json)
npm run render        # renderiza solo las ideas pendientes
npm run render:all    # renderiza las 20 (estandarizar)
npm run render:one PGAS-IDEA-008   # una sola
```

## Reglas de marca (fijas)

- **Márgenes seguros**: 230px arriba / 430px abajo calmos (HUD + descripción de TikTok).
- **Español neutro/chileno** (sin voseo).
- **Tipografía**: Poppins (titulares) + Inter (cuerpo), self-hosted en `assets/fonts`.
- **Logo**: ave + wordmark "Pgas" (grande, siempre visible).
- **5 hashtags** exactos, `#pgas` siempre. Ver `docs/estrategia-hashtags.md`.
- **Caption** parte con el emoji 👇 cuatro veces (cada uno con salto de línea).

## Plantillas (`tipo_plantilla`)

`checklist` · `base_3_cards` · `mito_realidad` · `piramide` · `proceso`

## Columnas del CSV

`id, estado, tipo_plantilla, titulo, hook, descripcion, hashtags, fecha_creacion,
fecha_realizado, imagen_url, plantilla_referencia, idea_imagen, texto_imagen,
imagen_json, notas_plantilla`

- `hook`: titular de la imagen; el `*texto*` entre asteriscos se resalta en azul.
- `imagen_json`: contenido estructurado de la imagen (lo lee el render).
- `estado`: `pendiente` → `realizado` (evita repetir temas).
