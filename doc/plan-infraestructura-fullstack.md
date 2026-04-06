# 🏗️ Plan de Infraestructura — Fullstack TypeScript + GitHub + Vercel

> **Arquitecto:** Claude (Arquitecto de Software)
> **Versión:** 1.0
> **Stack:** Next.js 14 · TypeScript · Vercel · JSON como base de datos

---

## 📐 Visión General

Sistema fullstack moderno sin base de datos convencional. La persistencia de datos se gestiona mediante archivos `.json` organizados en una carpeta `/data`, actuando como una base de datos ligera y portable. El repositorio GitHub actúa como fuente de verdad y Vercel como plataforma de despliegue continuo.

```
GitHub Repository → Push → Vercel CI/CD → Deploy → URL Pública
```

---

## 🗂️ Estructura del Repositorio

```
mi-proyecto/
├── .github/
│   └── workflows/
│       └── ci.yml                  # (Opcional) GitHub Actions para validación
│
├── app/                            # Next.js App Router
│   ├── layout.tsx                  # Layout raíz con fuentes y metadata
│   ├── page.tsx                    # Página Home → "Hola Mundo"
│   ├── globals.css                 # Estilos globales + efecto elegante
│   └── api/
│       └── data/
│           └── route.ts            # API Route para leer archivos JSON
│
├── components/
│   └── HolaMundo.tsx               # Componente principal con animación
│
├── data/                           # 📦 "Base de datos" en JSON
│   └── config.json                 # Configuración general del sitio
│
├── lib/
│   └── dataLoader.ts               # Utilidad para leer archivos JSON
│
├── public/                         # Assets estáticos
│
├── .env.local                      # Variables de entorno locales (no commitear)
├── .gitignore
├── next.config.ts                  # Configuración de Next.js
├── package.json
├── tsconfig.json                   # Configuración TypeScript estricta
└── vercel.json                     # Configuración de despliegue
```

---

## ⚙️ Requisitos Previos

### Herramientas Locales

| Herramienta | Versión Mínima | Propósito |
|-------------|---------------|-----------|
| Node.js | 20.x LTS | Runtime JavaScript |
| npm / pnpm | 9.x / 8.x | Gestor de paquetes |
| Git | 2.40+ | Control de versiones |
| VS Code | Última | Editor recomendado |

### Cuentas Necesarias

| Servicio | Rol |
|----------|-----|
| GitHub | Repositorio + fuente de verdad |
| Vercel | Hosting + CI/CD automático |

---

## 📦 Dependencias del Proyecto

### `package.json`

```json
{
  "name": "mi-proyecto-fullstack",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "14.2.x",
    "react": "^18.3.x",
    "react-dom": "^18.3.x"
  },
  "devDependencies": {
    "@types/node": "^20.x",
    "@types/react": "^18.x",
    "@types/react-dom": "^18.x",
    "typescript": "^5.x",
    "eslint": "^8.x",
    "eslint-config-next": "14.2.x"
  }
}
```

---

## 🔧 Configuración TypeScript

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
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
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

> **Nota:** `strict: true` habilita todas las verificaciones estrictas de TypeScript. Es la forma correcta de validar que el sistema funciona correctamente con tipado fuerte.

---

## 🗄️ Capa de Datos — JSON como Base de Datos

### `data/config.json`

```json
{
  "sitio": {
    "nombre": "Mi App Fullstack",
    "saludo": "Hola Mundo",
    "subtitulo": "Bienvenido al sistema TypeScript + Next.js",
    "version": "1.0.0"
  },
  "tema": {
    "colorPrimario": "#6366f1",
    "colorSecundario": "#a855f7",
    "fuente": "Inter"
  }
}
```

### `lib/dataLoader.ts`

```typescript
import fs from 'fs';
import path from 'path';

// Tipo genérico para cargar cualquier archivo JSON de /data
export async function cargarDatos<T>(archivo: string): Promise<T> {
  const rutaArchivo = path.join(process.cwd(), 'data', `${archivo}.json`);

  try {
    const contenido = fs.readFileSync(rutaArchivo, 'utf-8');
    return JSON.parse(contenido) as T;
  } catch (error) {
    throw new Error(`Error al cargar el archivo de datos: ${archivo}.json → ${error}`);
  }
}
```

### Tipos TypeScript — `lib/types.ts`

```typescript
export interface ConfigSitio {
  sitio: {
    nombre: string;
    saludo: string;
    subtitulo: string;
    version: string;
  };
  tema: {
    colorPrimario: string;
    colorSecundario: string;
    fuente: string;
  };
}
```

---

## 🌐 API Route — `app/api/data/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { cargarDatos } from '@/lib/dataLoader';
import type { ConfigSitio } from '@/lib/types';

export async function GET(): Promise<NextResponse> {
  try {
    const config = await cargarDatos<ConfigSitio>('config');
    return NextResponse.json({ success: true, data: config });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error al leer los datos' },
      { status: 500 }
    );
  }
}
```

---

## 🎨 Componente Home — Hola Mundo con Efecto Elegante

### `components/HolaMundo.tsx`

```typescript
import type { FC } from 'react';

interface HolaMundoProps {
  saludo: string;
  subtitulo: string;
}

const HolaMundo: FC<HolaMundoProps> = ({ saludo, subtitulo }) => {
  return (
    <main className="hero-container">
      <div className="hero-content">
        <div className="badge">TypeScript ✓</div>
        <h1 className="titulo-principal">{saludo}</h1>
        <p className="subtitulo">{subtitulo}</p>
        <div className="linea-decorativa" />
        <span className="version-tag">Next.js 14 · Vercel · JSON DB</span>
      </div>
    </main>
  );
};

export default HolaMundo;
```

### `app/page.tsx`

```typescript
import HolaMundo from '@/components/HolaMundo';
import { cargarDatos } from '@/lib/dataLoader';
import type { ConfigSitio } from '@/lib/types';

// Página de servidor — carga datos del JSON en tiempo de build
export default async function Home() {
  const config = await cargarDatos<ConfigSitio>('config');

  return (
    <HolaMundo
      saludo={config.sitio.saludo}
      subtitulo={config.sitio.subtitulo}
    />
  );
}
```

### `app/globals.css` — Efecto Elegante

```css
/* Reset base */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --color-primario: #6366f1;
  --color-secundario: #a855f7;
  --color-fondo: #0a0a0f;
  --color-texto: #f8fafc;
  --color-muted: #94a3b8;
}

body {
  background-color: var(--color-fondo);
  color: var(--color-texto);
  font-family: 'Inter', system-ui, sans-serif;
  overflow: hidden;
}

/* Contenedor centrado */
.hero-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background:
    radial-gradient(ellipse at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 60%),
    var(--color-fondo);
}

/* Efecto de partículas con CSS puro */
.hero-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.4) 0%, transparent 100%),
    radial-gradient(1px 1px at 80% 70%, rgba(255,255,255,0.3) 0%, transparent 100%),
    radial-gradient(1px 1px at 50% 20%, rgba(255,255,255,0.2) 0%, transparent 100%),
    radial-gradient(1px 1px at 35% 80%, rgba(255,255,255,0.3) 0%, transparent 100%);
  animation: parpadeo 8s ease-in-out infinite alternate;
}

@keyframes parpadeo {
  0%   { opacity: 0.3; }
  100% { opacity: 1; }
}

/* Tarjeta central */
.hero-content {
  text-align: center;
  z-index: 10;
  padding: 3rem;
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  animation: aparecer 1.2s ease-out forwards;
  box-shadow:
    0 0 40px rgba(99, 102, 241, 0.1),
    inset 0 0 40px rgba(168, 85, 247, 0.05);
}

@keyframes aparecer {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Badge */
.badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-primario);
  border: 1px solid rgba(99, 102, 241, 0.4);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  margin-bottom: 1.5rem;
  animation: pulsar 3s ease-in-out infinite;
}

@keyframes pulsar {
  0%, 100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
  50%       { box-shadow: 0 0 0 6px rgba(99, 102, 241, 0); }
}

/* Título principal con gradiente */
.titulo-principal {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #fff 0%, var(--color-primario) 50%, var(--color-secundario) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradiente-movil 6s ease infinite;
  background-size: 200% 200%;
}

@keyframes gradiente-movil {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Subtítulo */
.subtitulo {
  font-size: 1.1rem;
  color: var(--color-muted);
  margin-top: 1rem;
  letter-spacing: 0.02em;
}

/* Línea decorativa animada */
.linea-decorativa {
  width: 80px;
  height: 2px;
  background: linear-gradient(90deg, var(--color-primario), var(--color-secundario));
  margin: 1.5rem auto;
  border-radius: 9999px;
  animation: expandir 2s ease-out forwards;
}

@keyframes expandir {
  from { width: 0; opacity: 0; }
  to   { width: 80px; opacity: 1; }
}

/* Tag de tecnología */
.version-tag {
  font-size: 0.8rem;
  color: rgba(148, 163, 184, 0.6);
  letter-spacing: 0.08em;
}
```

---

## 🚀 Configuración de Vercel

### `vercel.json`

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "regions": ["iad1"],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### Pasos para Vincular Vercel + GitHub

1. Ir a [vercel.com](https://vercel.com) → **Add New Project**
2. Seleccionar **Import Git Repository** → conectar tu cuenta GitHub
3. Elegir el repositorio del proyecto
4. En configuración:
   - **Framework Preset:** Next.js (auto-detectado)
   - **Root Directory:** `/` (raíz del repo)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
5. Hacer clic en **Deploy**

> Cada `git push` a la rama `main` disparará un deploy automático en Vercel.

---

## 🔄 Flujo de Trabajo de Desarrollo

```
┌─────────────────────────────────────────────────────────┐
│                   FLUJO DE TRABAJO                      │
│                                                         │
│  Local Dev          GitHub             Vercel           │
│  ─────────          ──────             ──────           │
│  npm run dev   →   git push   →   Auto Deploy           │
│  localhost:3000    main branch    *.vercel.app           │
│                                                         │
│  Editar /data/*.json  →  push  →  Datos actualizados    │
│  (sin reiniciar servidor en producción estática)        │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ Checklist de Implementación

### Fase 1 — Setup Inicial
- [ ] Crear repositorio en GitHub (público o privado)
- [ ] Clonar repositorio localmente
- [ ] Ejecutar `npx create-next-app@latest . --typescript --eslint --app --src-dir=false --import-alias="@/*"`
- [ ] Verificar que `tsconfig.json` tiene `"strict": true`

### Fase 2 — Estructura de Datos
- [ ] Crear carpeta `/data`
- [ ] Crear `data/config.json` con la estructura definida
- [ ] Crear `lib/dataLoader.ts`
- [ ] Crear `lib/types.ts`

### Fase 3 — Componentes y Páginas
- [ ] Crear `components/HolaMundo.tsx`
- [ ] Actualizar `app/page.tsx` con carga de datos
- [ ] Aplicar estilos en `app/globals.css`
- [ ] Crear `app/api/data/route.ts`

### Fase 4 — Validación TypeScript
- [ ] Ejecutar `npm run type-check` → debe pasar sin errores
- [ ] Ejecutar `npm run build` → debe compilar correctamente
- [ ] Verificar en `localhost:3000` que el "Hola Mundo" se muestra con el efecto

### Fase 5 — Despliegue
- [ ] Hacer `git add . && git commit -m "feat: initial setup"` y `git push`
- [ ] Conectar repositorio en Vercel
- [ ] Verificar URL de producción en Vercel
- [ ] Validar que los datos del JSON se leen correctamente en producción

---

## 🛡️ Consideraciones de Seguridad y Buenas Prácticas

- **No commitear `.env.local`** — agregarlo siempre al `.gitignore`
- **Los archivos `/data/*.json` son públicos en el repo** — no almacenar credenciales ni datos sensibles en ellos
- **TypeScript strict** — mantener `noImplicitAny` y `strictNullChecks` activos en todo momento
- **API Routes en Next.js** — los datos del servidor nunca se exponen directamente al cliente sin pasar por una route
- **Vercel Edge Network** — los archivos JSON se leen en tiempo de build (SSG) o por request (SSR), dependiendo de la estrategia elegida

---

## 📈 Escalabilidad Futura

Cuando el proyecto crezca y los archivos JSON sean insuficientes, la migración es limpia:

| Escenario | Siguiente Paso |
|-----------|---------------|
| Datos complejos o relacionales | Migrar a PostgreSQL (Neon, Supabase) |
| Búsqueda avanzada | Integrar Algolia o Typesense |
| Autenticación | NextAuth.js |
| CMS externo | Contentlayer, Sanity, o Notion API |
| Cache de datos | Vercel KV (Redis) |

El módulo `lib/dataLoader.ts` actúa como capa de abstracción — solo se necesita modificar ese archivo para cambiar la fuente de datos, sin tocar los componentes.

---

*Plan generado por Claude — Arquitecto de Software*
*Stack: Next.js 14 · TypeScript 5 · Vercel · JSON Data Layer*
