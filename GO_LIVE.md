# Checklist de publicación (P0)

## 1) Firestore reglas (OBLIGATORIO — Console)

El deploy CLI falló por permisos IAM. Hazlo desde Firebase Console:

1. Abre https://console.firebase.google.com/project/app-eb-a84b8/firestore
2. Arriba selecciona la base **app-eb** (no default)
3. Pestaña **Reglas** → pega el contenido de `firestore.rules` → **Publicar**
4. Pestaña **Índices** → crea/confirma el índice de `publicLeaderboard` por `points` DESC
   (o deja que Firebase lo cree al primer uso del ranking)

Storage (hoja dominical):
1. https://console.firebase.google.com/project/app-eb-a84b8/storage
2. **Rules** → pega `storage.rules` → **Publicar**

## 2) Variables en Vercel (OBLIGATORIO)

Proyecto → Settings → Environment Variables → Production:

- `NEXT_PUBLIC_FIREBASE_DATABASE_ID` = `app-eb`
- `NEXT_PUBLIC_SITE_URL` = `https://estudios-biblicos-gamma.vercel.app`
- (más las 6 de Firebase que ya tengas)

Luego **Redeploy** del último commit.

## 3) Admin seguro

En Authentication → Users → `admin@admin.com` → Reset password (contraseña fuerte).
Para usar otro correo de parroquia:

1. Añádelo en `config/admin-emails.json` y en `NEXT_PUBLIC_ADMIN_EMAILS`
2. Corre `npm run sync:admin-emails`
3. Vuelve a publicar reglas en Console
