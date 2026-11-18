// Horizon Containers product page. Kept apart from plugin-content.js because
// this page carries the long sales layout (problem, product tour, steps, FAQ).
//
// Every claim here is something the product does today. Before adding a
// number or a feature, check it against contenedores/apps/back.

import dashboardImg from "./assets/containers/dashboard.png";
import locationsImg from "./assets/containers/locations.png";
import movementsImg from "./assets/containers/movements.png";
import alertsImg from "./assets/containers/alerts.png";
import reportsImg from "./assets/containers/reports.png";
// English captures come from a demo tenant with US plants and English data.
import dashboardImgEn from "./assets/containers/en/dashboard.png";
import locationsImgEn from "./assets/containers/en/locations.png";
import movementsImgEn from "./assets/containers/en/movements.png";
import alertsImgEn from "./assets/containers/en/alerts.png";
import reportsImgEn from "./assets/containers/en/reports.png";

// All captures share one viewport, so one size keeps layout from shifting.
const SHOT = { width: 1600, height: 1122 };
const APP = "containers.hlogix.app";

export const CONTAINERS = {
  slug: "containers",
  nameplate: "PL · 02",
  routes: { es: "/contenedores", en: "/containers" },
  es: {
    title: "Horizon Containers",
    tagline: "Cada contenedor que no regresa es dinero que nadie está contando.",
    lead:
      "Cajas, tarimas, racks y charolas salen todos los días hacia tus plantas, clientes y proveedores. Horizon Containers te dice cuántos tienes, dónde está cada uno y cuáles llevan demasiado tiempo fuera. Sin hojas de cálculo ni conteos a mano.",
    ribbon: null,
    heroImage: {
      src: dashboardImg,
      ...SHOT,
      url: `${APP}/dashboard`,
      alt: "Panel de Horizon Containers: total de contenedores, inventario por planta contra su capacidad y mapa de ubicaciones.",
      caption: "El panel, con datos de demostración",
    },
    problem: {
      title: "Compras contenedores cada año. ¿A dónde se fueron los del año pasado?",
      body:
        "Un contenedor reutilizable solo se paga si regresa. El problema no es que se pierdan: es que nadie puede decir cuántos faltan, desde cuándo, ni en manos de quién.",
      points: [
        {
          h: "El inventario vive en un Excel",
          d: "Se actualiza cuando alguien tiene tiempo. Para cuando el número llega a la junta, ya no es cierto.",
        },
        {
          h: "Lo que sale no siempre vuelve",
          d: "Se quedan con el cliente, en otra planta o en el patio de un proveedor. Sin registro de salida no hay a quién reclamarle.",
        },
        {
          h: "Reponer se vuelve costumbre",
          d: "El faltante se cubre comprando más. La pérdida deja de ser un incidente y se convierte en una línea del presupuesto.",
        },
      ],
    },
    metrics: [
      { label: "Movimientos", value: "En vivo", note: "sin recargar la pantalla" },
      { label: "Tipos de alerta", value: "6", note: "inventario, inactividad, zonas, accesos" },
      { label: "Reportes", value: "5", note: "exportables a CSV" },
      { label: "Roles de usuario", value: "4", note: "de solo lectura a administrador" },
    ],
    tourTitle: "Cuatro preguntas que hoy cuestan una llamada. Aquí son una pantalla.",
    tour: [
      {
        q: "¿Dónde están?",
        h: "Cuántos contenedores hay en cada planta, ahora.",
        d: "Cada ubicación muestra cuántos contenedores tiene en este momento, con los activos separados de los que están en mantenimiento.",
        points: [
          "Conteo por ubicación contra su capacidad",
          "Activos y en mantenimiento, por separado",
          "Plantas, almacenes y clientes sobre el mapa",
        ],
        src: locationsImg,
        ...SHOT,
        url: `${APP}/reports`,
        alt: "Reporte de ubicaciones: una tarjeta por planta con sus contenedores activos y en mantenimiento.",
      },
      {
        q: "¿Qué se está moviendo?",
        h: "Cada entrada y cada salida, en el momento en que ocurre.",
        d: "El lector registra el paso y el movimiento aparece en pantalla. Nadie captura nada, así que nadie se equivoca al capturarlo.",
        points: [
          "Fecha, hora, contenedor y ubicación de cada lectura",
          "Modo en vivo que puedes pausar para revisar",
          "Filtros por tipo, ubicación y rango de fechas",
        ],
        src: movementsImg,
        ...SHOT,
        url: `${APP}/movements`,
        alt: "Lista de movimientos en modo en vivo: entradas y salidas con fecha, contenedor, ubicación y estado.",
      },
      {
        q: "¿Cuáles no han vuelto?",
        h: "Te avisa antes de que el faltante pare una línea.",
        d: "Defines la regla una vez: inventario por debajo de un mínimo, contenedores sin movimiento, una salida que no debía ocurrir. El sistema vigila por ti.",
        points: [
          "Seis tipos de regla, por ubicación o para todas",
          "Aviso por correo y en el panel",
          "Cada alerta se asigna, se comenta y se cierra",
        ],
        src: alertsImg,
        ...SHOT,
        url: `${APP}/alerts`,
        alt: "Pantalla de alertas con una alerta abierta: severidad, ubicación, responsable asignado y comentarios.",
      },
      {
        q: "¿Cómo lo compruebo?",
        h: "El historial completo, listo para la conversación difícil.",
        d: "Cuando un cliente dice que ya devolvió los contenedores, la respuesta es un reporte: qué salió, cuándo, por qué portón y qué no ha regresado.",
        points: [
          "Historial por contenedor, ubicación o fechas",
          "Exportación a CSV para Excel o tu BI",
          "Resumen del periodo para la junta de operación",
        ],
        src: reportsImg,
        ...SHOT,
        url: `${APP}/reports`,
        alt: "Reporte de movimientos filtrado por fechas, con la opción de exportar a CSV.",
      },
    ],
    tourCta: "Verlo con tus contenedores y tus plantas toma una llamada.",
    stepsTitle: "Tres pasos, sin cambiar cómo trabaja tu gente.",
    steps: [
      {
        h: "Etiqueta",
        d: "Cada contenedor recibe una etiqueta RFID con un identificador único. Se dan de alta una sola vez, con su tipo, modelo y los datos que quieras asociarles.",
      },
      {
        h: "Lee",
        d: "Lectores RFID en andenes y portones registran cada paso. El operador sigue cargando y descargando como siempre.",
      },
      {
        h: "Decide",
        d: "El portal muestra el inventario por ubicación, dispara las alertas y arma los reportes. Tú decides a quién llamar.",
      },
    ],
    capabilities: [
      {
        h: "Movimientos de entrada y salida",
        d: "Cada lectura queda con fecha, hora, lector y ubicación, y actualiza sola la ubicación del contenedor.",
      },
      {
        h: "Alertas configurables",
        d: "Inventario bajo o alto, inventario por tipo, inactividad, entradas y salidas, zonas restringidas. Con severidad y tiempo de espera entre avisos.",
      },
      {
        h: "Reportes exportables",
        d: "Movimientos, contenedores, alertas, ubicaciones y resumen. Filtros por fecha, contenedor o planta, y exportación a CSV.",
      },
      {
        h: "Una flota por empresa",
        d: "Cada empresa ve únicamente sus contenedores y sus ubicaciones. Administrador, operador y solo lectura dentro de cada una.",
      },
      {
        h: "Ubicaciones en el mapa",
        d: "Plantas, zonas, estantes y posiciones en jerarquía, con capacidad y coordenadas para verlas sobre el mapa.",
      },
      {
        h: "Tu marca, tu idioma",
        d: "Logotipo y colores de tu empresa en el portal. Interfaz completa en español e inglés.",
      },
    ],
    useCases: [
      {
        h: "Alimentos y bebidas",
        d: "Cajas reutilizables entre planta, centro de distribución y punto de entrega. Saber cuáles están fuera, cuáles llevan días sin volver y dónde quedaron.",
      },
      {
        h: "Automotriz",
        d: "Charolas y racks hechos para una pieza. Si se quedan en la planta del cliente, la siguiente entrega no tiene en qué viajar.",
      },
      {
        h: "Logística de retorno",
        d: "Tarimas y contenedores retornables entre varios sitios. La pérdida y las disputas bajan cuando cada activo tiene su historial.",
      },
    ],
    integrations: {
      erp: "API REST documentada para llevar contenedores, movimientos y alertas a tu ERP o WMS.",
      readers: "Lectores RFID UHF fijos y de mano, conectados por el middleware de Horizon Logix.",
      tags: "Etiquetas RFID UHF elegidas según el material del contenedor y su manejo: plástico, metal, lavado, intemperie.",
      deployment: "Portal web en la nube. No se instala nada en las computadoras de planta.",
    },
    faq: [
      {
        q: "¿Tengo que cambiar mi ERP?",
        a: "No. Horizon Containers funciona por su cuenta desde el primer día. Cuando quieras llevar los datos a tu ERP o WMS, se conectan por API.",
      },
      {
        q: "¿Qué hay que instalar?",
        a: "Etiquetas RFID en los contenedores y lectores en los puntos por donde pasan. El portal se usa desde el navegador.",
      },
      {
        q: "¿Funciona con mis contenedores?",
        a: "El material y el contenido cambian cómo se lee una etiqueta. Por eso la etiqueta y su posición se definen con una prueba sobre tus propios contenedores, antes de etiquetar el lote completo.",
      },
      {
        q: "¿Se puede empezar en pequeño?",
        a: "Sí. Recomendamos arrancar con una ubicación y un lote de contenedores, medir, y crecer desde ahí.",
      },
    ],
  },
  en: {
    title: "Horizon Containers",
    tagline: "Every container that doesn't come back is money nobody is counting.",
    lead:
      "Crates, pallets, racks and totes leave every day for your plants, customers and suppliers. Horizon Containers tells you how many you have, where each one is, and which have been out too long. No spreadsheets, no manual counts.",
    ribbon: null,
    heroImage: {
      src: dashboardImgEn,
      ...SHOT,
      url: `${APP}/dashboard`,
      alt: "Horizon Containers dashboard: total containers, inventory per plant against capacity, and a map of locations.",
      caption: "The dashboard, with demo data",
    },
    problem: {
      title: "You buy containers every year. Where did last year's go?",
      body:
        "A reusable container only pays for itself if it comes back. The problem isn't that they go missing: it's that nobody can say how many, since when, or who has them.",
      points: [
        {
          h: "Inventory lives in a spreadsheet",
          d: "It gets updated when someone has time. By the time the number reaches the meeting, it is no longer true.",
        },
        {
          h: "What leaves doesn't always return",
          d: "They stay with the customer, at another plant, or in a supplier's yard. Without a record of the exit, there is nobody to ask.",
        },
        {
          h: "Replacing becomes routine",
          d: "The shortfall is covered by buying more. Loss stops being an incident and becomes a budget line.",
        },
      ],
    },
    metrics: [
      { label: "Movements", value: "Live", note: "no page reload" },
      { label: "Alert types", value: "6", note: "inventory, inactivity, zones, access" },
      { label: "Reports", value: "5", note: "exportable to CSV" },
      { label: "User roles", value: "4", note: "from read-only to administrator" },
    ],
    tourTitle: "Four questions that cost a phone call today. Here, each is a screen.",
    tour: [
      {
        q: "Where are they?",
        h: "How many containers each plant holds, right now.",
        d: "Each location shows how many containers it holds at this moment, with active units separated from those in maintenance.",
        points: [
          "Count per location against its capacity",
          "Active and in-maintenance units, kept apart",
          "Plants, warehouses and customers on the map",
        ],
        src: locationsImgEn,
        ...SHOT,
        url: `${APP}/reports`,
        alt: "Locations report: one card per plant with its active and in-maintenance containers.",
      },
      {
        q: "What is moving?",
        h: "Every entry and every exit, the moment it happens.",
        d: "The reader logs the pass and the movement shows up on screen. Nobody types anything, so nobody mistypes it.",
        points: [
          "Date, time, container and location for each read",
          "Live mode you can pause to review",
          "Filters by type, location and date range",
        ],
        src: movementsImgEn,
        ...SHOT,
        url: `${APP}/movements`,
        alt: "Movement list in live mode: entries and exits with date, container, location and status.",
      },
      {
        q: "Which ones haven't come back?",
        h: "It warns you before the shortfall stops a line.",
        d: "Define the rule once: inventory below a minimum, containers with no movement, an exit that should not have happened. The system keeps watch.",
        points: [
          "Six rule types, per location or across all",
          "Notification by email and in the dashboard",
          "Every alert is assigned, commented and closed",
        ],
        src: alertsImgEn,
        ...SHOT,
        url: `${APP}/alerts`,
        alt: "Alerts screen with one alert open: severity, location, assignee and comments.",
      },
      {
        q: "How do I prove it?",
        h: "The full history, ready for the difficult conversation.",
        d: "When a customer says the containers were already returned, the answer is a report: what left, when, through which gate, and what has not come back.",
        points: [
          "History by container, location or dates",
          "CSV export for Excel or your BI tool",
          "Period summary for the operations review",
        ],
        src: reportsImgEn,
        ...SHOT,
        url: `${APP}/reports`,
        alt: "Movement report filtered by date, with the option to export to CSV.",
      },
    ],
    tourCta: "Seeing it with your containers and your plants takes one call.",
    stepsTitle: "Three steps, without changing how your people work.",
    steps: [
      {
        h: "Tag",
        d: "Each container gets an RFID tag with a unique identifier. You register it once, with its type, model and whatever data you want attached.",
      },
      {
        h: "Read",
        d: "RFID readers at docks and gates log every pass. Operators keep loading and unloading as they always have.",
      },
      {
        h: "Decide",
        d: "The portal shows inventory by location, raises the alerts and builds the reports. You decide who to call.",
      },
    ],
    capabilities: [
      {
        h: "Entry and exit movements",
        d: "Each read is stored with date, time, reader and location, and updates the container's location on its own.",
      },
      {
        h: "Configurable alerts",
        d: "Low or high inventory, inventory by type, inactivity, entries and exits, restricted areas. With severity and a cooldown between notices.",
      },
      {
        h: "Exportable reports",
        d: "Movements, containers, alerts, locations and summary. Filter by date, container or plant, and export to CSV.",
      },
      {
        h: "One fleet per company",
        d: "Each company sees only its own containers and locations. Administrator, operator and read-only roles inside each one.",
      },
      {
        h: "Locations on the map",
        d: "Plants, zones, shelves and positions in a hierarchy, with capacity and coordinates to see them on the map.",
      },
      {
        h: "Your brand, your language",
        d: "Your company's logo and colors in the portal. Full interface in Spanish and English.",
      },
    ],
    useCases: [
      {
        h: "Food & beverage",
        d: "Reusable crates between plant, distribution center and delivery point. Know which are out, which have gone days without returning, and where they ended up.",
      },
      {
        h: "Automotive",
        d: "Trays and racks built for one part. If they stay at the customer's plant, the next delivery has nothing to travel in.",
      },
      {
        h: "Return logistics",
        d: "Returnable pallets and containers across several sites. Loss and disputes drop when every asset has its history.",
      },
    ],
    integrations: {
      erp: "Documented REST API to bring containers, movements and alerts into your ERP or WMS.",
      readers: "Fixed and handheld UHF RFID readers, connected through the Horizon Logix middleware.",
      tags: "UHF RFID tags chosen for the container's material and handling: plastic, metal, washing, outdoor use.",
      deployment: "Cloud web portal. Nothing to install on plant computers.",
    },
    faq: [
      {
        q: "Do I have to change my ERP?",
        a: "No. Horizon Containers runs on its own from day one. When you want the data in your ERP or WMS, they connect through the API.",
      },
      {
        q: "What needs to be installed?",
        a: "RFID tags on the containers and readers at the points they pass through. The portal runs in the browser.",
      },
      {
        q: "Will it work with my containers?",
        a: "Material and contents change how a tag reads. That is why the tag and its position are defined with a test on your own containers, before tagging the whole lot.",
      },
      {
        q: "Can we start small?",
        a: "Yes. We recommend starting with one location and one batch of containers, measuring, and growing from there.",
      },
    ],
  },
};
