# 📋 Prompts de Implementación — Fullstack TypeScript + Vercel

> **Instrucción de uso:** Cada prompt debe ejecutarse en orden. Copia el bloque completo y pégalo en una sesión nueva de Claude. Antes de ejecutar cualquier prompt, asegúrate de que los tres documentos base están disponibles para adjuntar o referenciar.
>
> **Documentos base que SIEMPRE debes adjuntar o tener en contexto antes de ejecutar cada prompt:**
> - 📄 `plan-infraestructura-fullstack.md` — El plan técnico completo
> - 📋 `prompts-implementacion.md` — Este archivo
> - 📊 `estado-ejecucion.md` — El estado vivo de ejecución

---

## 🗂️ Índice de Fases

| # | Fase | Skill | Estado |
|---|------|-------|--------|
| 1 | Setup Inicial del Repositorio | Ingeniero DevOps / Fullstack | ⬜ Pendiente |
| 2 | Estructura de Datos JSON | Ingeniero Backend Fullstack | ⬜ Pendiente |
| 3 | Componentes y Páginas | Ingeniero Frontend + Diseñador UX/UI | ⬜ Pendiente |
| 4 | Validación TypeScript y Build | Ingeniero Fullstack QA | ⬜ Pendiente |
| 5 | Despliegue en Vercel | Ingeniero DevOps / Cloud | ⬜ Pendiente |

---

---

## ▶️ PROMPT — FASE 1: Setup Inicial del Repositorio

```
CONTEXTO OBLIGATORIO — Lee estos tres documentos antes de continuar:
1. plan-infraestructura-fullstack.md → El plan técnico completo del sistema
2. prompts-implementacion.md → El archivo de prompts con la estructura de fases
3. estado-ejecucion.md → El estado actual de ejecución del proyecto

---

SKILL: Actúa como Ingeniero DevOps y Fullstack Senior con experiencia en Next.js, TypeScript y Vercel. Conoces a fondo la configuración de repositorios modernos y las mejores prácticas de estructura de proyectos.

---

ACCIÓN INMEDIATA AL INICIAR:
Antes de hacer cualquier cosa, actualiza el archivo estado-ejecucion.md con la siguiente entrada al inicio del registro:

[INICIO] FASE 1 — Setup Inicial del Repositorio
Fecha/hora: [indicar fecha y hora actual]
Estado: EN PROGRESO
Responsable skill: Ingeniero DevOps / Fullstack Senior

---

TAREA:
Ejecuta la Fase 1 del plan de implementación que incluye:

1. Generar el comando exacto para crear el repositorio en GitHub (con instrucciones paso a paso para hacerlo desde la interfaz web o CLI con gh).
2. Generar el comando de inicialización del proyecto Next.js con TypeScript:
   npx create-next-app@latest . --typescript --eslint --app --src-dir=false --import-alias="@/*"
3. Verificar y mostrar el contenido correcto de tsconfig.json con "strict": true habilitado.
4. Generar el archivo .gitignore adecuado para Next.js + Vercel.
5. Generar los comandos git para el primer commit y push:
   git init / git add . / git commit -m "feat: initial project setup" / git push -u origin main
6. Validar que la estructura de carpetas base coincide exactamente con la definida en el plan.

ENTREGABLES DE ESTA FASE:
- Comandos listos para ejecutar en terminal
- Archivo tsconfig.json completo y validado
- Archivo .gitignore completo
- Confirmación de estructura de carpetas correcta

---

ACCIÓN OBLIGATORIA AL COMPLETAR:
Cuando termines todos los pasos, actualiza el archivo estado-ejecucion.md con:

[COMPLETADO] FASE 1 — Setup Inicial del Repositorio
Fecha/hora: [indicar fecha y hora]
Estado: COMPLETADO ✅
Lo que se hizo:
- [Describe brevemente cada paso ejecutado]
- [Menciona cualquier ajuste o decisión tomada]
- [Lista los archivos creados o modificados]

Luego, crea un archivo separado llamado resumen-fase-1.md con el detalle completo de todo lo ejecutado en esta fase (comandos usados, archivos generados, decisiones técnicas, problemas encontrados y soluciones aplicadas).
```

---

---

## ▶️ PROMPT — FASE 2: Estructura de Datos JSON

```
CONTEXTO OBLIGATORIO — Lee estos tres documentos antes de continuar:
1. plan-infraestructura-fullstack.md → El plan técnico completo del sistema
2. prompts-implementacion.md → El archivo de prompts con la estructura de fases
3. estado-ejecucion.md → El estado actual de ejecución del proyecto

Verifica en estado-ejecucion.md que la Fase 1 está marcada como COMPLETADA ✅ antes de proceder.

---

SKILL: Actúa como Ingeniero Backend Fullstack Senior especializado en TypeScript, arquitectura de datos y diseño de APIs RESTful con Next.js. Tienes experiencia creando sistemas de persistencia ligeros sin base de datos convencional.

---

ACCIÓN INMEDIATA AL INICIAR:
Antes de hacer cualquier cosa, actualiza el archivo estado-ejecucion.md con la siguiente entrada:

[INICIO] FASE 2 — Estructura de Datos JSON
Fecha/hora: [indicar fecha y hora actual]
Estado: EN PROGRESO
Responsable skill: Ingeniero Backend Fullstack Senior

---

TAREA:
Ejecuta la Fase 2 del plan de implementación que incluye:

1. Crear la carpeta /data y el archivo data/config.json con la estructura definida en el plan:
   - Sección "sitio": nombre, saludo, subtitulo, version
   - Sección "tema": colorPrimario, colorSecundario, fuente
2. Crear lib/types.ts con la interfaz ConfigSitio tipada completamente.
3. Crear lib/dataLoader.ts con la función genérica cargarDatos<T>() que lee archivos JSON desde /data.
4. Crear app/api/data/route.ts como API Route que expone el endpoint GET /api/data.
5. Verificar que todos los tipos TypeScript son correctos y no hay errores de compilación.
6. Mostrar cómo probar el endpoint en local: curl http://localhost:3000/api/data

ENTREGABLES DE ESTA FASE:
- data/config.json creado y validado
- lib/types.ts con todos los tipos definidos
- lib/dataLoader.ts funcional y tipado
- app/api/data/route.ts operativo
- Verificación de types sin errores

---

ACCIÓN OBLIGATORIA AL COMPLETAR:
Cuando termines todos los pasos, actualiza el archivo estado-ejecucion.md con:

[COMPLETADO] FASE 2 — Estructura de Datos JSON
Fecha/hora: [indicar fecha y hora]
Estado: COMPLETADO ✅
Lo que se hizo:
- [Describe cada archivo creado]
- [Menciona los tipos definidos]
- [Resultado de la verificación de TypeScript]
- [Cualquier ajuste realizado respecto al plan original]

Luego, crea un archivo separado llamado resumen-fase-2.md con el detalle completo de todo lo ejecutado en esta fase.
```

---

---

## ▶️ PROMPT — FASE 3: Componentes y Páginas

```
CONTEXTO OBLIGATORIO — Lee estos tres documentos antes de continuar:
1. plan-infraestructura-fullstack.md → El plan técnico completo del sistema
2. prompts-implementacion.md → El archivo de prompts con la estructura de fases
3. estado-ejecucion.md → El estado actual de ejecución del proyecto

Verifica en estado-ejecucion.md que las Fases 1 y 2 están marcadas como COMPLETADAS ✅ antes de proceder.

---

SKILL: Actúa como Ingeniero Frontend Senior y Diseñador UX/UI especializado en React, Next.js con App Router, TypeScript y diseño de interfaces elegantes. Tienes ojo para el detalle visual y sabes cómo crear experiencias que impresionan desde el primer render.

---

ACCIÓN INMEDIATA AL INICIAR:
Antes de hacer cualquier cosa, actualiza el archivo estado-ejecucion.md con la siguiente entrada:

[INICIO] FASE 3 — Componentes y Páginas
Fecha/hora: [indicar fecha y hora actual]
Estado: EN PROGRESO
Responsable skill: Ingeniero Frontend Senior + Diseñador UX/UI

---

TAREA:
Ejecuta la Fase 3 del plan de implementación que incluye:

1. Crear components/HolaMundo.tsx como componente funcional tipado con React.FC<HolaMundoProps> que recibe saludo y subtitulo como props.
2. Actualizar app/page.tsx para que sea un Server Component que:
   - Use la función cargarDatos<ConfigSitio>() del lib/dataLoader
   - Pase los datos al componente HolaMundo como props
3. Crear app/layout.tsx con:
   - Metadata correcta (title, description)
   - Fuente Inter de Google Fonts o sistema
   - Estructura HTML semántica
4. Reemplazar app/globals.css con los estilos del plan que incluyen:
   - Fondo oscuro con gradientes radiales
   - Efecto glassmorphism en la tarjeta central
   - Título con gradiente animado
   - Badge con efecto pulsar
   - Línea decorativa con animación de expansión
   - Aparición suave con fadeUp al cargar
5. Verificar que el componente se centra perfectamente en pantalla en desktop y móvil.

ENTREGABLES DE ESTA FASE:
- components/HolaMundo.tsx funcional y tipado
- app/page.tsx como Server Component
- app/layout.tsx completo
- app/globals.css con efecto visual elegante
- Validación visual en localhost:3000

---

ACCIÓN OBLIGATORIA AL COMPLETAR:
Cuando termines todos los pasos, actualiza el archivo estado-ejecucion.md con:

[COMPLETADO] FASE 3 — Componentes y Páginas
Fecha/hora: [indicar fecha y hora]
Estado: COMPLETADO ✅
Lo que se hizo:
- [Componentes creados y sus props]
- [Efectos visuales implementados]
- [Decisiones de diseño tomadas]
- [Resultado visual en el navegador]

Luego, crea un archivo separado llamado resumen-fase-3.md con el detalle completo de todo lo ejecutado en esta fase, incluyendo capturas de descripción visual del resultado.
```

---

---

## ▶️ PROMPT — FASE 4: Validación TypeScript y Build

```
CONTEXTO OBLIGATORIO — Lee estos tres documentos antes de continuar:
1. plan-infraestructura-fullstack.md → El plan técnico completo del sistema
2. prompts-implementacion.md → El archivo de prompts con la estructura de fases
3. estado-ejecucion.md → El estado actual de ejecución del proyecto

Verifica en estado-ejecucion.md que las Fases 1, 2 y 3 están marcadas como COMPLETADAS ✅ antes de proceder.

---

SKILL: Actúa como Ingeniero Fullstack Senior con especialidad en QA, TypeScript estricto y optimización de builds de Next.js. Eres meticuloso, no aceptas errores de tipos y conoces cada flag del compilador de TypeScript.

---

ACCIÓN INMEDIATA AL INICIAR:
Antes de hacer cualquier cosa, actualiza el archivo estado-ejecucion.md con la siguiente entrada:

[INICIO] FASE 4 — Validación TypeScript y Build
Fecha/hora: [indicar fecha y hora actual]
Estado: EN PROGRESO
Responsable skill: Ingeniero Fullstack QA / TypeScript Specialist

---

TAREA:
Ejecuta la Fase 4 del plan de implementación que incluye:

1. Ejecutar la validación de tipos sin emitir archivos:
   npm run type-check  (equivale a: tsc --noEmit)
   → Documentar el resultado: errores encontrados y cómo se resolvieron.

2. Ejecutar el linter:
   npm run lint
   → Documentar warnings y errores, y las correcciones aplicadas.

3. Ejecutar el build de producción:
   npm run build
   → Documentar el output: páginas generadas, tamaño de bundles, tiempo de build.

4. Ejecutar en modo producción local para validación final:
   npm run start
   → Verificar en http://localhost:3000 que todo funciona correctamente.

5. Checklist de validación TypeScript:
   - ¿Todos los componentes tienen tipos explícitos?
   - ¿No hay ningún uso de `any`?
   - ¿Las props tienen interfaces definidas?
   - ¿La función cargarDatos<T>() está correctamente tipada?
   - ¿La API Route retorna el tipo correcto?

6. Documentar el resumen del build:
   - Páginas estáticas generadas (SSG)
   - Páginas dinámicas (SSR)
   - Tamaño total del bundle
   - Tiempo de compilación

ENTREGABLES DE ESTA FASE:
- Resultado de tsc --noEmit sin errores
- Resultado de npm run build exitoso
- Checklist de TypeScript completado y aprobado
- Confirmación visual en modo producción local

---

ACCIÓN OBLIGATORIA AL COMPLETAR:
Cuando termines todos los pasos, actualiza el archivo estado-ejecucion.md con:

[COMPLETADO] FASE 4 — Validación TypeScript y Build
Fecha/hora: [indicar fecha y hora]
Estado: COMPLETADO ✅
Lo que se hizo:
- [Resultado del type-check]
- [Resultado del lint]
- [Resultado del build: páginas, bundles, tiempo]
- [Errores encontrados y cómo se resolvieron]
- [Estado final del checklist TypeScript]

Luego, crea un archivo separado llamado resumen-fase-4.md con el detalle completo, incluyendo el output del terminal de cada comando ejecutado.
```

---

---

## ▶️ PROMPT — FASE 5: Despliegue en Vercel

```
CONTEXTO OBLIGATORIO — Lee estos tres documentos antes de continuar:
1. plan-infraestructura-fullstack.md → El plan técnico completo del sistema
2. prompts-implementacion.md → El archivo de prompts con la estructura de fases
3. estado-ejecucion.md → El estado actual de ejecución del proyecto

Verifica en estado-ejecucion.md que las Fases 1, 2, 3 y 4 están marcadas como COMPLETADAS ✅ antes de proceder.

---

SKILL: Actúa como Ingeniero DevOps y Cloud Senior especializado en Vercel, CI/CD con GitHub Actions y despliegues de aplicaciones Next.js en producción. Conoces cada configuración de Vercel y las mejores prácticas para un deploy sin fricciones.

---

ACCIÓN INMEDIATA AL INICIAR:
Antes de hacer cualquier cosa, actualiza el archivo estado-ejecucion.md con la siguiente entrada:

[INICIO] FASE 5 — Despliegue en Vercel
Fecha/hora: [indicar fecha y hora actual]
Estado: EN PROGRESO
Responsable skill: Ingeniero DevOps / Cloud Senior

---

TAREA:
Ejecuta la Fase 5 del plan de implementación que incluye:

1. Crear el archivo vercel.json con la configuración correcta:
   - framework: nextjs
   - buildCommand, outputDirectory, installCommand
   - Región recomendada

2. Hacer el commit y push final antes del deploy:
   git add .
   git commit -m "feat: complete implementation ready for deploy"
   git push origin main

3. Guiar el proceso de vinculación Vercel + GitHub:
   - Paso a paso para importar el repositorio en vercel.com
   - Configuración del proyecto (framework preset, variables de entorno)
   - Trigger del primer deploy

4. Verificar el deploy en producción:
   - URL de producción generada por Vercel
   - Que el "Hola Mundo" con efecto elegante se muestra correctamente
   - Que el endpoint /api/data responde con el JSON esperado
   - Que no hay errores en el Vercel dashboard

5. Validar el ciclo completo de CI/CD:
   - Hacer un cambio menor (ej: editar data/config.json)
   - Push a main
   - Verificar que Vercel dispara el redeploy automáticamente
   - Confirmar que el cambio se refleja en la URL de producción

6. Documentar la URL de producción y las métricas de Vercel:
   - URL pública final
   - Tiempo de build en Vercel
   - Core Web Vitals básicos si están disponibles

ENTREGABLES DE ESTA FASE:
- vercel.json creado y funcional
- Deploy exitoso en Vercel con URL pública
- Endpoint /api/data respondiendo en producción
- Ciclo de CI/CD validado (push → redeploy automático)
- URL de producción documentada

---

ACCIÓN OBLIGATORIA AL COMPLETAR:
Cuando termines todos los pasos, actualiza el archivo estado-ejecucion.md con:

[COMPLETADO] FASE 5 — Despliegue en Vercel
Fecha/hora: [indicar fecha y hora]
Estado: COMPLETADO ✅
Lo que se hizo:
- [vercel.json configurado]
- [URL de producción obtenida]
- [Resultado de la validación del deploy]
- [Resultado del test de CI/CD]
- [Métricas del deploy]

[PROYECTO COMPLETADO] ✅🚀
URL de producción: [URL aquí]
Stack desplegado: Next.js 14 · TypeScript · Vercel · JSON Data Layer

Luego, crea un archivo separado llamado resumen-fase-5.md con el detalle completo del despliegue, incluyendo la URL final, configuración de Vercel y validación del ciclo CI/CD.
```

---

## 📌 Notas Generales de Uso

- **Nunca saltes fases.** Cada prompt verifica que la anterior esté completada en `estado-ejecucion.md`.
- **Los tres documentos base siempre deben estar en contexto** al iniciar cada prompt.
- **Los archivos `resumen-fase-N.md` son permanentes** — contienen el historial técnico detallado de cada fase por separado.
- **`estado-ejecucion.md` es el documento vivo** — contiene el historial acumulativo de todo el proyecto desde el inicio hasta el final.
- Si un paso falla, documenta el error en `estado-ejecucion.md` con el tag `[ERROR]` antes de intentar resolverlo.
