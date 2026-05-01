# Pendientes — Horizon Logix web

Estado actual: landing single-page bilingüe (ES/EN) con GTM + Consent Mode v2 cableados. Lo siguiente es darle salida real a las conversiones, cerrar legales, abrir páginas de producto y mejorar la observabilidad.

---

## 1. Conectar la forma de contacto

**Hoy**: el modal `DemoModal` valida campos y simula envío con `setTimeout(900)`. **No manda nada a ningún lado.** Ver `src/components/DemoModal.jsx:22-28`.

Tres opciones, ordenadas por costo de implementación:

- **A. Servicio externo (Formspree, Web3Forms, Resend, EmailJS)** — apuntar el `fetch` de `submit` al endpoint del servicio. Setup en ~10 min. Bueno para arrancar.
- **B. Azure Function dentro del SWA** — agregar `api/contact/index.js` (Azure Functions) que envíe vía SendGrid o Microsoft Graph (Outlook). El SWA enruta `/api/contact` automático, sin CORS. Requiere cuenta SendGrid o tenant M365.
- **C. Integración a CRM directo** — POST a HubSpot Forms API, Pipedrive, Zoho, etc. Si hay CRM definido, esto es lo correcto a futuro.

**Decisión pendiente**: ¿qué backend? Si no hay todavía, recomiendo **A con Resend o Web3Forms** mientras se decide el CRM final.

**Tareas relacionadas** (independientes del backend elegido):
- Agregar mensaje de error visible si el `fetch` falla (hoy no hay manejo de error, solo `idle | sending | done`).
- Considerar honeypot anti-spam (campo invisible que un bot rellenaría).
- Disparar evento GA4 `demo_request_submit` al éxito (ver sección 4).

---

## 2. Aviso de privacidad (legal)

Necesario para LFPDPPP (México) y, si captamos visitas EU, GDPR. Hoy el footer tiene el link "Privacidad" pero apunta a `#` (sin destino).

**Qué se necesita:**
- Página `/privacidad` (ES) y `/privacy` (EN) con: identidad del responsable, finalidades del tratamiento, datos recolectados (nombre, email, empresa, IP vía analytics), derechos ARCO, datos de contacto del responsable, cookies utilizadas, transferencias internacionales (Google, Azure).
- Página `/terminos` y/o `/aviso-legal` con condiciones de uso del sitio.
- Vincular ambas desde el footer (`src/components/Sections.jsx:1018` reemplaza `href="#"` por la ruta real).
- Mencionar GA4 + GTM explícitamente en la sección de cookies del aviso (Consent Mode aplicado).

**Bloquea**: lanzamiento público sin riesgo legal.

**Implementación técnica**: ver sección 3 (mismo router/rutas).

---

## 3. Páginas dedicadas por plugin

Hoy el card de cada plugin tiene un link "Conocer más" pero no tiene `href` (literalmente no hace nada — `src/components/Sections.jsx:550`). Hay que crear:

| Ruta ES | Ruta EN | Plugin | Foco del contenido |
|---|---|---|---|
| `/warehouse` | `/warehouse` | Horizon Warehouse | Embarques + recepción inteligente. Validación SKU/serial vs órdenes ERP, pantalla en vivo del operador, casos: 3PL, manufactura, retail DC. |
| `/contenedores` | `/containers` | Horizon Containers | Trazabilidad de contenedores reusables. In/out automático, dashboard multi-tenant, alertas, casos: alimentos & bebidas, automotriz. |
| `/rtls` | `/rtls` | Horizon RTLS / WIP | Localización + tiempos & movimientos para work-in-progress. Cycle time por estación, mapas de calor, bottleneck detection. |

**Decisión técnica pendiente**: hoy no hay router. Para soportar URLs dedicadas hay que elegir entre:

- **React Router** (`react-router-dom`) — lo más estándar, ~12kB, mantiene la SPA.
- **TanStack Router** — más moderno, type-safe, pero overkill para 4-5 rutas.
- **Multi-page Vite (MPA)** — 1 entry HTML por página. Mejor SEO out-of-the-box, peor para shared state. Recomendable si las páginas de plugin van a ser bastante distintas y queremos mejor indexabilidad.

**Recomendación**: React Router en modo SPA — la landing ya es un long-scroll y los visitantes esperan navegación instantánea entre productos. Para SEO de las páginas de plugin agregar prerender al build (vite-plugin-prerender o equivalente) para que el HTML inicial tenga el contenido — Google ya rastrea SPAs pero el prerender ayuda.

**Tareas**:
- [ ] Decidir router (depende de cuánta distancia conceptual habrá entre páginas).
- [ ] Crear plantilla `<PluginPage>` reusable: hero del plugin, screenshots reales (cuando los haya), bullets ampliados, sección de casos, CTA de demo.
- [ ] Conectar el "Conocer más" del card y la nav.
- [ ] Para los textos / hero copy, replicar tono editorial existente.
- [ ] Para EN: lockstep con ES.
- [ ] Bloqueante para Aviso de privacidad y Términos también — usan el mismo router.

---

## 4. Eventos GA4 custom

Pageviews ya los captura el Google Tag base. Faltan los puntos de conversión:

| Evento | Cuándo dispararlo | Parámetros sugeridos | Por qué |
|---|---|---|---|
| `demo_request_open` | Click en cualquier botón "Solicitar demo" | `source: nav \| hero \| cta_band` | Mide intención |
| `demo_request_submit` | Form envía OK (después del `fetch` real) | `lang`, `company` (opcional) | Mide conversión real |
| `lang_switch` | Click ES↔EN | `to: es \| en` | Mix de mercado |
| `partners_apply_click` | Click "Aplicar al programa" en sección Partners | `source: partners` | Tracking de canal |
| `plugin_card_click` | Click "Conocer más" en card de plugin | `plugin: warehouse \| containers \| rtls` | Interés por producto |
| `scroll_depth` | 25/50/75/100% | `percent` | Engagement |

**Implementación**:
- Helper en `src/lib/track.js`: `export function track(event, params) { window.gtag?.('event', event, params); }`. Wrappea para que no truene si gtag no cargó (modo dev / consent denied). Recordar que en consent denied, GA4 igual recibe el evento pero como ping anónimo.
- Llamar `track(...)` desde los handlers correspondientes.
- Alternativa GTM-only: crear "GA4 Event" tags con triggers de tipo "Click - All Elements" + filtros por clase/ID. Más config en dashboard, menos código. Tradeoff: lógica de tracking distribuida entre GTM y app.

**Recomendación**: lo de conversión (`demo_request_*`, `partners_apply_click`, `plugin_card_click`) por código (control de timing y parámetros). Lo de engagement (`scroll_depth`) lo activa el built-in trigger de GTM, sin código.

---

## 5. Links rotos / placeholders

Inventario actual tras `grep -rn 'href="#"' src/`:

| Archivo:línea | Qué es | Resolución |
|---|---|---|
| `src/components/Sections.jsx:550` | "Conocer más" en cada card de plugin (sin `href`) | Apuntar a `/warehouse`, `/contenedores`, `/rtls` (sección 3). |
| `src/components/Sections.jsx:903` | "Leer la documentación" en `ArchIT` (comentado actualmente) | Decidir si va a haber docs públicas. Si no, eliminar el bloque. Si sí, abrir `/docs` o link a Notion/GitBook. |
| `src/components/Sections.jsx:1018` | Todos los links del footer (4 columnas: Plataforma, Plugins, Empresa, Legal) | Mapear cada `link` del footer a su ruta real (sección 3 para Plugins; sección 2 para Legal; resto puede ir a anchors `#how`, `#arch`, `#partners`, `#cta`, etc.). |
| `src/i18n.js` (`nav.cases` → `id: cases` en Nav) | Item "Casos" del nav apunta a `#cases` que es el ID de la sección LiveDemo, no a casos de cliente reales | Cuando haya casos publicables, crear `/casos` y reenrutar. Mientras tanto, considerar quitar el item del nav o renombrarlo a "Demo en vivo". |
| `src/components/Sections.jsx:987` | CTA "Hablar con ventas" abre `mailto:hola@horizonlogix.com` | Verificar que ese email exista y haya alguien contestando. Si no, cambiar a abrir el modal de demo. |

---

## 6. Otros pendientes menores

- ~~`src/i18n.js:153` — el `note` del card de Zebra dice `"FX9600 · FX9600 · ATR7000"` (FX9600 duplicado, posible typo de `FXR90`). Confirmar lista de modelos correcta.~~ ✅ resuelto: ahora dice `"FX9600 · FX7500 · ATR7000"`.
- **Trust logos del hero** — actualmente comentados en `src/components/Sections.jsx:161-170`. Decidir si se reactivan con logos reales de clientes/socios o se dejan ocultos.
- **`docs: "Leer la documentación"` (i18n.js)** — string declarado pero el bloque que lo usa está comentado. Limpiar uno u otro lado.
- **Form de contacto: campo "role/cargo"** — actualmente requerido por validación pero no es obligatorio (`src/components/DemoModal.jsx:18`). Confirmar si va o sale del formulario.
- **Open Graph / metadatos sociales** — `index.html` solo tiene `<title>` y `<description>`. Falta `og:image`, `og:url`, `twitter:card`, JSON-LD de Organization. Importante cuando se compartan links del sitio.
- ~~**Falta agregar un favicon del SVG del logo**~~ ✅ resuelto: `public/favicon.svg` (copia del logo) + `<link rel="icon" type="image/svg+xml" href="/favicon.svg">` en `index.html`. Pendiente menor: `favicon.ico` 32×32 y `apple-touch-icon.png` 180×180 para Safari/iOS antiguos — solo si soporte de navegadores legacy es importante.
- **"Cómo funciona": texto de las etapas muy pequeño** — en el `FlowDiagram` (`src/components/Sections.jsx`, dentro de `HowItWorks`) los labels de cada etapa (`fontSize="12"` para el título y `fontSize="11"` para la descripción) se ven diminutos en desktop. Subir a ~16/13 y revisar que no se empalmen con 5 etapas. Si se aprietan, considerar wrap más agresivo o reducir descripción.
- **Sitemap + robots.txt** — para SEO de las páginas de plugin. Va con la sección 3.

---

## Prioridad sugerida

1. **Aviso de privacidad** (sección 2) — bloquea cualquier lanzamiento público con tráfico real.
2. **Conectar form de contacto** (sección 1) — sin esto, los leads se pierden.
3. **Eventos GA4 de conversión** (sección 4 — al menos `demo_request_open` y `demo_request_submit`) — para medir el ROI del paid media o referrals desde el día 1.
4. **Páginas de plugin** (sección 3) — desbloquea SEO específico por producto y closing del partnership pitch.
5. **Links rotos del footer** (sección 5) — barrida final pre-launch.
6. **OG / favicon / sitemap** — pulido pre-launch.
