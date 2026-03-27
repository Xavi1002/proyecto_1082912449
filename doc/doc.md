# 🏗️ Plan de Infraestructura — Fullstack TypeScript con GitHub + Vercel

> **Versión:** 1.0  
> **Arquitecto:** Claude (Anthropic)  
> **Fecha:** Marzo 2026  
> **Stack:** Next.js 14 · TypeScript · Vercel · JSON como base de datos

---

## 1. Visión General

Sistema fullstack en **TypeScript puro**, desplegado en **Vercel** desde un repositorio **GitHub**, sin base de datos relacional ni NoSQL convencional. La persistencia de datos se gestiona mediante **archivos `.json`** ubicados en una carpeta `/data`, actuando como una capa de almacenamiento ligera y versionable.

El objetivo inicial es validar el pipeline completo con una pantalla **Home** que muestre un mensaje "Hola Mundo" centrado con un efecto visual elegante.

---

## 2. Arquitectura del Sistema

```
GitHub Repository
       │
       │  push / PR merge
       ▼
   Vercel CI/CD
       │
       │  build + deploy automático
       ▼
┌─────────────────────────────────┐
│         Next.js 14 App          │
│                                 │
│  ┌──────────┐  ┌─────────────┐ │
│  │  Pages / │  │  API Routes │ │
│  │  App Dir │  │  /api/*     │ │
│  └──────────┘  └──────┬──────┘ │
│                        │        │
│                ┌───────▼──────┐ │
│                │  /data layer │ │
│                │  *.json files│ │
│                └──────────────┘ │
└─────────────────────────────────┘
```

---

## 3. Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | Next.js (App Router) | 14.x |
| Lenguaje | TypeScript | 5.x |
| Estilos | Tailwind CSS | 3.x |
| Runtime | Node.js | 20 LTS |
| Despliegue | Vercel | — |
| Control de versiones | GitHub | — |
| "Base de datos" | Archivos JSON en `/data` | — |
| Gestor de paquetes | pnpm | 9.x |

---

## 4. Estructura de Carpetas

```
/
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions (lint + type-check)
│
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # Layout raíz con metadata global
│   │   ├── page.tsx             # Home — "Hola Mundo"
│   │   └── globals.css          # Estilos globales + animaciones
│   │
│   ├── components/
│   │   └── HolaMundo.tsx        # Componente principal con efecto elegante
│   │
│   ├── lib/
│   │   └── dataLayer.ts         # Utilidades para leer/escribir archivos JSON
│   │
│   └── types/
│       └── index.ts             # Tipos e interfaces globales TypeScript
│
├── data/                        # "Base de datos" JSON
│   └── home.json                # Configuración inicial del Home
│
├── public/                      # Assets estáticos
│
├── .env.local                   # Variables de entorno locales (no se versiona)
├── .env.example                 # Plantilla de variables de entorno
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── pnpm-lock.yaml
└── package.json
```

---

## 5. Capa de Datos — JSON como Base de Datos

### 5.1 Filosofía

Los archivos `.json` dentro de `/data` actúan como tablas. Cada archivo representa una "colección". Las API Routes de Next.js leen y escriben estos archivos en el servidor usando `fs` de Node.js.

> **Importante:** En Vercel, el filesystem es **read-only** en producción para archivos dentro del bundle. Para operaciones de **escritura**, se utilizan las rutas de `/tmp` o, si se requiere persistencia real, se migra a Vercel KV/Blob. Para la fase inicial (solo lectura desde `data/`), funciona sin restricciones.

### 5.2 Estructura del archivo `data/home.json`

```json
{
  "id": "home",
  "titulo": "Hola Mundo",
  "subtitulo": "TypeScript + Next.js + Vercel",
  "efecto": "glitch-fade",
  "activo": true,
  "version": "1.0.0"
}
```

### 5.3 Utilidad `lib/dataLayer.ts`

```typescript
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

/**
 * Lee un archivo JSON del directorio /data
 */
export function readData<T>(filename: string): T {
  const filePath = path.join(DATA_DIR, `${filename}.json`);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

/**
 * Escribe datos en un archivo JSON del directorio /data
 * Solo funciona en entornos con filesystem mutable (local / serverless con /tmp)
 */
export function writeData<T>(filename: string, data: T): void {
  const filePath = path.join(DATA_DIR, `${filename}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
```

---

## 6. Componentes Clave

### 6.1 `app/page.tsx` — Home

```typescript
import { readData } from "@/lib/dataLayer";
import HolaMundo from "@/components/HolaMundo";

interface HomeData {
  titulo: string;
  subtitulo: string;
  efecto: string;
}

export default function HomePage() {
  const data = readData<HomeData>("home");

  return (
    <main className="flex min-h-screen items-center justify-center bg-black">
      <HolaMundo titulo={data.titulo} subtitulo={data.subtitulo} />
    </main>
  );
}
```

### 6.2 `components/HolaMundo.tsx` — Efecto Elegante

```typescript
interface Props {
  titulo: string;
  subtitulo: string;
}

export default function HolaMundo({ titulo, subtitulo }: Props) {
  return (
    <div className="text-center">
      <h1 className="hola-mundo-title">{titulo}</h1>
      <p className="hola-mundo-sub">{subtitulo}</p>
    </div>
  );
}
```

### 6.3 `app/globals.css` — Animación Elegante

```css
/* Efecto: fade-in con shimmer suave */
.hola-mundo-title {
  font-size: clamp(3rem, 10vw, 8rem);
  font-family: "Playfair Display", serif;
  color: transparent;
  background: linear-gradient(135deg, #e2c97e, #fff8e7, #c9a84c);
  background-clip: text;
  -webkit-background-clip: text;
  animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards,
             shimmer 4s ease-in-out infinite 1.5s;
  opacity: 0;
  letter-spacing: -0.02em;
}

.hola-mundo-sub {
  font-family: "DM Mono", monospace;
  color: #666;
  font-size: 0.9rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes shimmer {
  0%, 100% { background-position: 0% 50%; }
  50%       { background-position: 100% 50%; }
}
```

---

## 7. Tipos TypeScript

### `src/types/index.ts`

```typescript
/** Esquema base para cualquier entidad JSON */
export interface BaseEntity {
  id: string;
  version: string;
  activo: boolean;
}

/** Datos del Home */
export interface HomeData extends BaseEntity {
  titulo: string;
  subtitulo: string;
  efecto: "glitch-fade" | "shimmer" | "typewriter";
}
```

---

## 8. Configuración del Proyecto

### 8.1 `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### 8.2 `package.json` (scripts clave)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "react-dom": "18.x"
  },
  "devDependencies": {
    "typescript": "5.x",
    "@types/node": "20.x",
    "@types/react": "18.x",
    "tailwindcss": "3.x",
    "autoprefixer": "^10",
    "postcss": "^8",
    "eslint": "8.x",
    "eslint-config-next": "14.x"
  }
}
```

### 8.3 `.env.example`

```env
# Entorno de ejecución
NODE_ENV=development

# URL pública (Vercel la inyecta automáticamente en producción)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Flag para habilitar escritura en /data (solo en local)
ENABLE_DATA_WRITE=true
```

---

## 9. Pipeline CI/CD

### 9.1 Flujo GitHub → Vercel

```
Developer push / PR
        │
        ▼
  GitHub Actions
  ┌─────────────────┐
  │ 1. pnpm install │
  │ 2. type-check   │
  │ 3. lint         │
  └────────┬────────┘
           │ ✅ pass
           ▼
     Vercel Bot
  ┌──────────────────────┐
  │ Preview Deploy (PR)  │◄── URL única por PR
  │ Production Deploy    │◄── merge a main
  └──────────────────────┘
```

### 9.2 `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v3
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - run: pnpm install --frozen-lockfile

      - name: TypeScript check
        run: pnpm type-check

      - name: Lint
        run: pnpm lint

      - name: Build
        run: pnpm build
```

---

## 10. Configuración Vercel

### 10.1 Vinculación del repositorio

1. Ir a [vercel.com](https://vercel.com) → **Add New Project**
2. Importar el repositorio GitHub
3. Framework: **Next.js** (autodetectado)
4. Build command: `pnpm build`
5. Output directory: `.next`
6. Install command: `pnpm install`

### 10.2 Variables de entorno en Vercel

| Variable | Entorno | Valor |
|----------|---------|-------|
| `NODE_ENV` | Production | `production` |
| `NEXT_PUBLIC_APP_URL` | Production | `https://tu-dominio.vercel.app` |
| `ENABLE_DATA_WRITE` | Production | `false` |

### 10.3 Ramas y deployments

| Rama | Tipo de deploy | URL |
|------|---------------|-----|
| `main` | Producción | `tuapp.vercel.app` |
| `develop` | Preview | `tuapp-git-develop.vercel.app` |
| `feature/*` | Preview por PR | URL dinámica |

---

## 11. Guía de Implementación — Paso a Paso

### Fase 1: Inicialización del repositorio

```bash
# 1. Crear el proyecto Next.js con TypeScript
pnpm create next-app@latest mi-app \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

# 2. Entrar al directorio
cd mi-app

# 3. Crear carpeta de datos
mkdir data

# 4. Crear el primer archivo JSON
echo '{
  "id": "home",
  "titulo": "Hola Mundo",
  "subtitulo": "TypeScript + Next.js + Vercel",
  "efecto": "shimmer",
  "activo": true,
  "version": "1.0.0"
}' > data/home.json
```

### Fase 2: Implementar los archivos del plan

```bash
# Estructura de archivos a crear en orden:
# 1. src/types/index.ts
# 2. src/lib/dataLayer.ts
# 3. src/components/HolaMundo.tsx
# 4. src/app/globals.css  (reemplazar)
# 5. src/app/layout.tsx   (actualizar)
# 6. src/app/page.tsx     (reemplazar)
```

### Fase 3: Validar TypeScript localmente

```bash
# Verificar tipos sin compilar
pnpm type-check

# Correr en modo desarrollo
pnpm dev
# → Abrir http://localhost:3000
# → Verificar "Hola Mundo" centrado con animación
```

### Fase 4: Push y deploy

```bash
# Inicializar git (si no existe)
git init
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git

# Primer commit
git add .
git commit -m "feat: initial setup - hola mundo con TypeScript validado"
git push -u origin main

# Vercel detecta el push y despliega automáticamente
```

---

## 12. Checklist de Validación

### ✅ TypeScript

- [ ] `pnpm type-check` pasa sin errores
- [ ] Todos los componentes tienen tipos explícitos
- [ ] `strict: true` activo en `tsconfig.json`
- [ ] No hay ningún `any` implícito

### ✅ Funcionalidad

- [ ] Home renderiza "Hola Mundo" centrado
- [ ] Animación elegante visible en pantalla
- [ ] Datos provienen de `data/home.json` (no hardcodeados)
- [ ] `dataLayer.ts` lee correctamente el archivo JSON

### ✅ CI/CD

- [ ] Push a `main` dispara build en Vercel
- [ ] GitHub Actions pasa (lint + type-check + build)
- [ ] URL de producción accesible

### ✅ Calidad de código

- [ ] ESLint sin warnings
- [ ] Estructura de carpetas respeta el plan
- [ ] Variables de entorno documentadas en `.env.example`
- [ ] `.gitignore` excluye `.env.local` y `.next`

---

## 13. Escalabilidad Futura

Este plan está diseñado para escalar. Una vez validado el pipeline con el "Hola Mundo", la arquitectura soporta naturalmente:

| Siguiente paso | Implementación |
|---------------|----------------|
| Más "tablas" | Nuevos archivos en `/data/*.json` |
| CRUD completo | API Routes en `/api/[coleccion]/route.ts` |
| Autenticación | NextAuth.js con sesión en JSON/Vercel KV |
| Búsqueda | Índices en memoria con `fuse.js` sobre los JSON |
| Migración a DB real | Reemplazar `dataLayer.ts` apuntando a Prisma/Drizzle |
| CMS headless | Los `.json` actúan como CMS estático versionado en Git |

---

## 14. Dependencias de Fuentes (opcional para el efecto)

Agregar en `app/layout.tsx` para el efecto tipográfico elegante:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Mono:wght@400;500&display=swap"
  rel="stylesheet"
/>
```

---

*Plan generado por Claude · Anthropic · Marzo 2026*  
*Este documento es un artefacto vivo — actualizar con cada iteración del sistema.*
