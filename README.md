# App EB (Escuela Biblica IERE)

Aplicacion tipo Duolingo para estudios biblicos de la Iglesia Espanola Reformada Episcopal (IERE).

## Stack instalado

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- ESLint
- Firebase SDK (Auth + Firestore)

## Ejecutar en local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Configura `.env.local`:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_ADMIN_EMAILS=correo-admin@iglesia.org
```

`NEXT_PUBLIC_ADMIN_EMAILS` acepta varios correos separados por comas.
Si el correo del registro aparece en `NEXT_PUBLIC_ADMIN_EMAILS`, la cuenta se crea con rol `admin`.

## Estructura principal

```txt
src/
  app/
    admin/page.tsx
    dashboard/page.tsx
    layout.tsx
    lecciones/[lessonId]/page.tsx
    page.tsx
  components/
    layout/
      main-nav.tsx
    providers/
      app-providers.tsx
  features/
    auth/
      auth-context.tsx
      firebase-user.ts
      types.ts
    lessons/
      components/
        lesson-quiz.tsx
      data/
        lessons.ts
      types.ts
  lib/
    firebase.ts
    firebase-services.ts
```

## Funcionalidades actuales

- Login / registro con Firebase Auth (correo + contraseña).
- Perfil de usuario en Firestore con rol y puntos.
- +1 punto diario al iniciar sesion.
- Leccion 01 cargada con pasaje + preguntas de opcion multiple.
- +20 puntos al completar la leccion por primera vez.
- Menu de estudiante y panel admin.
