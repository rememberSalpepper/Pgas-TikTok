// Arma el caption final de TikTok a partir de una fila del CSV.
// Regla fija: la descripción parte con el emoji 👇 cuatro veces, cada uno con salto de
// línea, para empujar el texto hacia abajo y que NO tape la imagen en TikTok.

const POINT_PREFIX = '👇\n👇\n👇\n👇\n';

export function buildCaption(row) {
  const desc = (row.descripcion || '').trim();
  const tags = (row.hashtags || '').trim();
  return `${POINT_PREFIX}${desc}\n\n${tags}`;
}
