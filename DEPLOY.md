# Deploy en el VPS (Docker)

Proyecto: bot de Telegram + generador de posts PGAS. Corre como un contenedor
(`docker compose`). El bot escucha comandos y expone un endpoint de salud en :3000
(mapeado a :3010 en el host).

## 0) Requisitos en el VPS
- Docker + docker compose.
- **Codex CLI instalado y autenticado** como el usuario `srv`:
  ```bash
  codex login          # deja la sesión en /home/srv/.codex
  ls /home/srv/.codex  # debe existir (auth.json, etc.)
  ```
  El contenedor monta esa carpeta para usar tu sesión de Codex.

## 1) Subir el proyecto
Ubicación: `/home/srv/apps/pgas-tiktok`

Opción A — git (recomendada, permite `git pull` para actualizar):
```bash
cd /home/srv/apps
git clone https://github.com/rememberSalpepper/Pgas-TikTok.git pgas-tiktok
cd pgas-tiktok
```
Opción B — rsync desde tu PC:
```bash
rsync -avz --delete -e "ssh -p 2222" ./ srv@192.99.168.235:/home/srv/apps/pgas-tiktok/
```

## 2) Crear el .env (token + chat, NO está en el repo)
```bash
cd /home/srv/apps/pgas-tiktok
cp pgas-generator/.env.example pgas-generator/.env
nano pgas-generator/.env   # pega TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, PGAS_ALLOWED_CHATS
```

## 3) Datos iniciales (CSV semilla + carpeta de imágenes)
```bash
mkdir -p data/dist
cp pgas_ideas.seed.csv data/pgas_ideas.csv
```

## 4) (Si tu Codex no está en /home/srv/.codex)
Ajusta esa ruta en `docker-compose.yml` (volumen `/home/srv/.codex:/root/.codex`).

## 5) Levantar
```bash
docker compose up -d --build
```

## 6) Verificar
```bash
docker ps
docker logs --tail 100 pgas-tiktok        # debe decir "Salud en :3000" y "Bot PGAS escuchando"
curl http://127.0.0.1:3010                 # {"ok":true,"servicio":"pgas-bot",...}
```
Y en Telegram, escríbele `/estado` al bot.

## 7) Renderizar el backlog de la semilla (una vez)
La semilla trae 37 ideas en estado `pendiente`. Genera sus imágenes:
```bash
docker compose exec app node src/pipeline.js pending
```
Después, desde Telegram: `/enviar 5` (o las que quieras).

## Uso diario (desde Telegram)
- `/generar 14` → Codex crea 14 ideas nuevas y las renderiza.
- `/enviar [N]` → te manda N posts listos.
- `/estado`, `/siguiente`, `/borrar <id>`, `/ayuda`.

## Actualizar el VPS cuando cambies algo en tu PC
```bash
# en tu PC:
git push
# en el VPS:
cd /home/srv/apps/pgas-tiktok && git pull && docker compose up -d --build
```
El CSV y las imágenes viven en `./data` y NO se tocan al actualizar.

## Notas
- El contenedor se reinicia solo (`restart: unless-stopped`).
- Puerto host: **3010** (libre). Salud pública: http://192.99.168.235:3010
- Si `npm install -g @openai/codex` fallara en el build, instala Codex en el host y
  monta el binario, o ajusta el paquete; el bot igual arranca (solo /generar lo necesita).
