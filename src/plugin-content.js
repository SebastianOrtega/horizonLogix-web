// Per-plugin content for the dedicated product pages. Each entry is a full
// page rendered by <PluginPage>. Tone follows .impeccable.md — industrial
// editorial, technical, opinionated where it matters.

import dashboardImg from "./assets/rtls/dashboard.png";
import editorImg from "./assets/rtls/editor.png";
import heatmapImg from "./assets/rtls/heatmap.png";
import alertsImg from "./assets/rtls/alerts.png";
import historyImg from "./assets/rtls/history.png";
import reportDwellImg from "./assets/rtls/report-dwell.png";
// English captures (UI and demo data in English) — same six views.
import dashboardImgEn from "./assets/rtls/en/dashboard.png";
import editorImgEn from "./assets/rtls/en/editor.png";
import heatmapImgEn from "./assets/rtls/en/heatmap.png";
import alertsImgEn from "./assets/rtls/en/alerts.png";
import historyImgEn from "./assets/rtls/en/history.png";
import reportDwellImgEn from "./assets/rtls/en/report-dwell.png";
// Horizon Warehouse captures, taken from a local demo (fictitious company).
import whLiveMissingTop from "./assets/warehouse/live-missing-top.png";
import whLiveOk from "./assets/warehouse/live-ok.png";
import whLiveForeign from "./assets/warehouse/live-foreign.png";
import whLiveClosed from "./assets/warehouse/live-closed.png";
import whOperationDetail from "./assets/warehouse/operation-detail.png";
import whDashboard from "./assets/warehouse/dashboard.png";
import whLiveMissingTopEn from "./assets/warehouse/en/live-missing-top.png";
import whLiveOkEn from "./assets/warehouse/en/live-ok.png";
import whLiveForeignEn from "./assets/warehouse/en/live-foreign.png";
import whLiveClosedEn from "./assets/warehouse/en/live-closed.png";
import whOperationDetailEn from "./assets/warehouse/en/operation-detail.png";
import whDashboardEn from "./assets/warehouse/en/dashboard.png";
// Phone crops of the same screens (4:5).
import whMLiveMissing from "./assets/warehouse/mobile/live-missing.png";
import whMLiveOk from "./assets/warehouse/mobile/live-ok.png";
import whMLiveForeign from "./assets/warehouse/mobile/live-foreign.png";
import whMLiveClosed from "./assets/warehouse/mobile/live-closed.png";
import whMOperationDetail from "./assets/warehouse/mobile/operation-detail.png";
import whMDashboard from "./assets/warehouse/mobile/dashboard.png";
import whMLiveMissingEn from "./assets/warehouse/mobile/en/live-missing.png";
import whMLiveOkEn from "./assets/warehouse/mobile/en/live-ok.png";
import whMLiveForeignEn from "./assets/warehouse/mobile/en/live-foreign.png";
import whMLiveClosedEn from "./assets/warehouse/mobile/en/live-closed.png";
import whMOperationDetailEn from "./assets/warehouse/mobile/en/operation-detail.png";
import whMDashboardEn from "./assets/warehouse/mobile/en/dashboard.png";
import { CONTAINERS } from "./plugin-containers.js";

const WH_SHOT = { width: 1600, height: 1122 };
const WH_APP = "warehouse.hlogix.app";

const SHARED = {
  es: {
    eyebrow: "Plugin",
    backToPlugins: "Ver todos los plugins",
    sections: {
      problem: "El problema",
      tour: "Dentro del producto",
      steps: "Cómo funciona",
      faq: "Preguntas frecuentes",
      metrics: "En números",
      capabilities: "Capacidades",
      inProduct: "Dentro del producto",
      useCases: "Dónde encaja",
      integrations: "Integraciones y despliegue",
    },
    integrationLabels: {
      erp: "ERP / WMS",
      readers: "Lectores compatibles",
      deployment: "Despliegue",
      tags: "Tags",
      mes: "MES / API",
    },
    closingCtaTitle: "Hablemos de tu operación.",
    closingCtaSub: "Renta mensual según tus lectores, sin costo de desarrollo. La cotización incluye software, lectores, etiquetas e instalación.",
    closingCtaPrimary: "Solicitar demo",
    closingCtaSecondary: "Pedir cotización",
  },
  en: {
    eyebrow: "Plugin",
    backToPlugins: "See all plugins",
    sections: {
      problem: "The problem",
      tour: "Inside the product",
      steps: "How it works",
      faq: "Common questions",
      metrics: "By the numbers",
      capabilities: "Capabilities",
      inProduct: "Inside the product",
      useCases: "Where it fits",
      integrations: "Integrations & deployment",
    },
    integrationLabels: {
      erp: "ERP / WMS",
      readers: "Compatible readers",
      deployment: "Deployment",
      tags: "Tags",
      mes: "MES / API",
    },
    closingCtaTitle: "Let's talk about your operation.",
    closingCtaSub: "A monthly subscription based on your readers, with no development fee. The quote covers software, readers, tags and installation.",
    closingCtaPrimary: "Request demo",
    closingCtaSecondary: "Get a quote",
  },
};

export const PLUGINS = {
  warehouse: {
    slug: "warehouse",
    nameplate: "PL · 01",
    routes: { es: "/warehouse", en: "/warehouse" },
    es: {
      title: "Horizon Warehouse",
      tagline: "Que el embarque incompleto lo detecte el andén, no tu cliente.",
      lead:
        "Cada caja, tarima o pieza etiquetada se lee al pasar por el andén y se compara contra la orden de embarque o recepción de tu ERP. Si algo falta, sobra o no corresponde, el operador lo ve antes de que el camión salga.",
      ribbon: null,
      heroImage: {
        src: whLiveMissingTop,
        srcMobile: whMLiveMissing,
        ...WH_SHOT,
        url: `${WH_APP}/operations`,
        alt: "Pantalla del operador en Horizon Warehouse: orden OV-24871 en proceso, 9 de 12 piezas leídas y 3 faltantes.",
        caption: "La pantalla del operador, con datos de demostración",
      },
      problem: {
        title: "Un embarque mal surtido se paga dos veces: en el reclamo y en el reenvío.",
        body: "Casi siempre el error se descubre cuando el cliente abre la caja. Para entonces ya hay una penalización, una nota de crédito o un flete extra, y nadie puede decir en qué momento se cargó mal.",
        points: [
          {
            h: "La revisión depende de que alguien escanee",
            d: "Con código de barras, cada pieza que no se escanea es una pieza que no se revisó. En hora pico, eso pasa.",
          },
          {
            h: "El ERP se entera después",
            d: "La orden se cierra a mano al final del turno. Lo que el sistema dice que salió y lo que realmente salió no siempre coinciden.",
          },
          {
            h: "Tus clientes ya lo están pidiendo",
            d: "Cadenas comerciales y armadoras exigen producto etiquetado y entregas completas. Cumplir a mano cuesta gente y tiempo.",
          },
        ],
      },
      tourTitle: "Lo que ve tu operador mientras el montacargas cruza el andén.",
      tour: [
        {
          q: "¿Va completo?",
          h: "Cada pieza se palomea sola al pasar.",
          d: "El operador elige la orden y empieza la lectura. La pantalla compara lo que cruza el andén contra lo que pidió el cliente, renglón por renglón.",
          points: ["Esperados, encontrados y faltantes, siempre a la vista", "Resumen por producto que se pone en verde al completarse", "Número de serie de cada pieza leída"],
          src: whLiveOk,
          srcMobile: whMLiveOk,
          ...WH_SHOT,
          url: `${WH_APP}/operations`,
          alt: "Operación con 12 de 12 piezas encontradas y los tres productos de la orden en verde.",
        },
        {
          q: "¿Se subió algo de más?",
          h: "Lo que no es de esta orden se ve de inmediato.",
          d: "Si en la tarima viene un producto que no corresponde o una pieza de más, aparece marcado aparte. El operador lo baja antes de que el camión se vaya.",
          points: ["Producto ajeno a la orden, resaltado", "Piezas de más sobre un producto que sí se pidió", "Faltantes por producto, no solo el total"],
          src: whLiveForeign,
          srcMobile: whMLiveForeign,
          ...WH_SHOT,
          url: `${WH_APP}/operations`,
          alt: "Operación con un producto que no pertenece a la orden resaltado y contado como agregado.",
        },
        {
          q: "¿Ya lo sabe el ERP?",
          h: "Al cerrar, el resultado viaja solo al ERP.",
          d: "El operador envía el resultado y la orden queda registrada en tu ERP con lo que realmente salió. Nadie captura nada al final del turno.",
          points: ["Cada renglón con producto, número de serie y hora", "Conectores para los ERP más usados", "El operador confirma antes de enviar"],
          src: whLiveClosed,
          srcMobile: whMLiveClosed,
          ...WH_SHOT,
          url: `${WH_APP}/operations`,
          alt: "Operación finalizada con el aviso de que los resultados se enviaron al ERP.",
        },
        {
          q: "¿Cómo lo compruebo?",
          h: "Cada embarque queda guardado, pieza por pieza.",
          d: "Cuando un cliente reclama, abres la operación: quién la hizo, en qué andén, a qué hora y qué números de serie salieron.",
          points: ["Operador, andén, hora de inicio y de cierre", "Lista de series por renglón de la orden", "Búsqueda por número de orden"],
          src: whOperationDetail,
          srcMobile: whMOperationDetail,
          ...WH_SHOT,
          url: `${WH_APP}/operations/list`,
          alt: "Detalle de una operación cerrada con operador, andén, horarios y la lista de números de serie.",
        },
        {
          q: "¿Cómo va el almacén?",
          h: "El tablero resume la operación sin pedirle un reporte a nadie.",
          d: "Cuántas órdenes se han movido, cuánto tarda cada una y qué productos, clientes y andenes concentran el trabajo.",
          points: ["Órdenes, minutos y piezas promedio por orden", "Productos, clientes, operadores y andenes con más movimiento", "Órdenes por día"],
          src: whDashboard,
          srcMobile: whMDashboard,
          ...WH_SHOT,
          url: `${WH_APP}/dashboard`,
          alt: "Tablero con total de órdenes, minutos promedio por orden y los productos, clientes y andenes con más movimiento.",
        },
      ],
      tourCta: "Verlo con tus órdenes y tu andén toma una llamada.",
      stepsTitle: "Tres pasos, en el mismo andén.",
      steps: [
        {
          h: "Etiqueta",
          d: "Cajas, tarimas o piezas reciben una etiqueta RFID al empacar o al recibir.",
        },
        {
          h: "Lee",
          d: "Un lector en el andén registra todo lo que pasa, sin que el operador se detenga a escanear.",
        },
        {
          h: "Valida",
          d: "La pantalla compara lo leído contra la orden del ERP y marca faltantes y sobrantes antes de cerrar.",
        },
      ],
      faq: [
        {
          q: "¿Cuánto cuesta en total?",
          a: "El software se cobra como renta mensual según el número de lectores, sin costo de desarrollo. La cotización que te entregamos incluye también lectores, antenas, etiquetas e instalación, para que veas la inversión completa antes de decidir.",
        },
        {
          q: "Ya uso código de barras. ¿Para qué RFID?",
          a: "El código de barras funciona mientras alguien escanee cada pieza. RFID lee todo lo que cruza el andén sin intervención, así que la validación no depende del ritmo del turno.",
        },
        {
          q: "¿Quién pone la etiqueta?",
          a: "Depende de tu operación: se etiqueta al empacar, al recibir, o la etiqueta ya viene de tu proveedor. Lo definimos contigo. Etiquetar por caja o por tarima suele bastar para validar un embarque.",
        },
        {
          q: "¿Funciona con mi ERP?",
          a: "Hay conectores para Oracle, NetSuite, Microsoft Dynamics y SAP. Para otros sistemas la conexión se hace por API.",
        },
        {
          q: "¿Se puede empezar con un solo andén?",
          a: "Sí. Lo habitual es arrancar con un andén y un tipo de embarque, medir, y extender después.",
        },
        {
          q: "¿Quién lo instala?",
          a: "Tu integrador de confianza o nuestro equipo. La configuración corre por nuestra cuenta.",
        },
      ],
      capabilities: [
        {
          h: "Validación SKU + serial en tiempo real",
          d: "Cada lectura del lector RFID se compara contra la lista esperada para esa orden. SKUs faltantes, sobrantes o erróneos aparecen marcados en la pantalla del operador antes de cerrar el embarque.",
        },
        {
          h: "Conector nativo a tu ERP",
          d: "Oracle Cloud, Oracle EBS, NetSuite, Microsoft Dynamics 365 y SAP S/4HANA. La conexión usa los APIs estándar de cada ERP — sin middleware adicional ni archivos planos.",
        },
        {
          h: "Pantalla del operador en vivo",
          d: "Vista en tiempo real con SKUs validados, faltantes y excepciones. Compatible con tablet rugerizada, monitor industrial o pantalla de dock.",
        },
        {
          h: "Auditoría inmutable de cada movimiento",
          d: "Cada lectura, validación y cierre queda registrado con timestamp, lector, operador y orden asociada. Exportable para auditoría o trazabilidad regulatoria.",
        },
        {
          h: "Varios andenes y plantas",
          d: "Decenas de andenes en una o varias plantas, con roles y permisos por usuario y por sitio.",
        },
        {
          h: "Excepciones manejadas por el operador",
          d: "Cuando hay discrepancia, el operador la acepta con motivo (ej. embarque parcial autorizado) o la rechaza. Todo queda en el log con justificación.",
        },
      ],
      useCases: [
        {
          h: "Manufactura",
          d: "Validar embarques de producto terminado contra órdenes de venta. Integración con MES para cerrar la orden de producción al confirmar el embarque.",
        },
        {
          h: "Distribución y 3PL",
          d: "Recepción de mercancía contra el aviso de embarque del cliente. Los operadores ven todos los embarques activos en su andén.",
        },
        {
          h: "Proveedores de cadenas comerciales",
          d: "Si tu cliente ya te exige etiqueta RFID, úsala también para validar tu propio embarque antes de que salga.",
        },
      ],
      integrations: {
        erp: "Oracle Cloud, Oracle EBS, NetSuite, Microsoft Dynamics 365 F&O, SAP S/4HANA, SAP ECC.",
        readers: "Zebra FX9600, FX7500, ATR7000. Impinj Speedway R420, R720.",
        deployment: "On-premise, cloud privado, o edge híbrido para sitios sin conectividad estable.",
      },
    },
    en: {
      title: "Horizon Warehouse",
      tagline: "Let the dock catch the short shipment, not your customer.",
      lead:
        "Every tagged case, pallet or part is read as it crosses the dock and checked against your ERP's shipping or receiving order. If something is missing, extra, or wrong, the operator sees it before the truck leaves.",
      ribbon: null,
      heroImage: {
        src: whLiveMissingTopEn,
        srcMobile: whMLiveMissingEn,
        ...WH_SHOT,
        url: `${WH_APP}/operations`,
        alt: "Operator screen in Horizon Warehouse: order SO-24871 in progress, 9 of 12 items read and 3 missing.",
        caption: "The operator screen, with demo data",
      },
      problem: {
        title: "A wrong shipment costs you twice: once in the claim, once in the reshipment.",
        body: "The error usually surfaces when the customer opens the box. By then there is a chargeback, a credit note or an extra freight bill, and nobody can say when it was loaded wrong.",
        points: [
          {
            h: "The check depends on someone scanning",
            d: "With barcodes, every item that isn't scanned is an item that wasn't checked. At peak hours, that happens.",
          },
          {
            h: "The ERP finds out later",
            d: "The order is closed by hand at the end of the shift. What the system says shipped and what actually shipped don't always match.",
          },
          {
            h: "Your customers are already asking",
            d: "Retailers and OEMs demand tagged product and complete deliveries. Complying by hand costs people and time.",
          },
        ],
      },
      tourTitle: "What your operator sees while the forklift crosses the dock.",
      tour: [
        {
          q: "Is it complete?",
          h: "Every item checks itself off as it passes.",
          d: "The operator picks the order and starts reading. The screen compares what crosses the dock with what the customer ordered, line by line.",
          points: ["Expected, found and missing, always in view", "Per-product summary that turns green when complete", "Serial number of every item read"],
          src: whLiveOkEn,
          srcMobile: whMLiveOkEn,
          ...WH_SHOT,
          url: `${WH_APP}/operations`,
          alt: "Operation with 12 of 12 items found and all three products on the order in green.",
        },
        {
          q: "Did something extra get loaded?",
          h: "Anything that isn't on this order shows up right away.",
          d: "If the pallet carries a product that doesn't belong, or one item too many, it is flagged separately. The operator pulls it before the truck leaves.",
          points: ["Product not on the order, highlighted", "Extra units of a product that was ordered", "Missing items per product, not just a total"],
          src: whLiveForeignEn,
          srcMobile: whMLiveForeignEn,
          ...WH_SHOT,
          url: `${WH_APP}/operations`,
          alt: "Operation with a product that is not on the order highlighted and counted as added.",
        },
        {
          q: "Does the ERP know yet?",
          h: "On close, the result goes to the ERP by itself.",
          d: "The operator submits the result and the order is recorded in your ERP with what actually shipped. Nobody keys anything in at the end of the shift.",
          points: ["Each line with product, serial number and time", "Connectors for the most common ERPs", "The operator confirms before submitting"],
          src: whLiveClosedEn,
          srcMobile: whMLiveClosedEn,
          ...WH_SHOT,
          url: `${WH_APP}/operations`,
          alt: "Finished operation with the notice that results were sent to the ERP.",
        },
        {
          q: "How do I prove it?",
          h: "Every shipment is kept, item by item.",
          d: "When a customer disputes a delivery, you open the operation: who ran it, at which dock, at what time, and which serial numbers shipped.",
          points: ["Operator, dock, start and end time", "Serial list per order line", "Search by order number"],
          src: whOperationDetailEn,
          srcMobile: whMOperationDetailEn,
          ...WH_SHOT,
          url: `${WH_APP}/operations/list`,
          alt: "Detail of a closed operation with operator, dock, times and the list of serial numbers.",
        },
        {
          q: "How is the warehouse doing?",
          h: "The dashboard sums up the operation without asking anyone for a report.",
          d: "How many orders moved, how long each takes, and which products, customers and docks carry the work.",
          points: ["Orders, average minutes and items per order", "Busiest products, customers, operators and docks", "Orders per day"],
          src: whDashboardEn,
          srcMobile: whMDashboardEn,
          ...WH_SHOT,
          url: `${WH_APP}/dashboard`,
          alt: "Dashboard with total orders, average minutes per order and the busiest products, customers and docks.",
        },
      ],
      tourCta: "Seeing it with your orders and your dock takes one call.",
      stepsTitle: "Three steps, at the same dock.",
      steps: [
        {
          h: "Tag",
          d: "Cases, pallets or parts get an RFID tag at packing or at receiving.",
        },
        {
          h: "Read",
          d: "A reader at the dock records everything that passes, without the operator stopping to scan.",
        },
        {
          h: "Validate",
          d: "The screen compares what was read against the ERP order and flags shortages and extras before closing.",
        },
      ],
      faq: [
        {
          q: "What does it cost in total?",
          a: "The software is a monthly subscription based on the number of readers, with no development fee. The quote we give you also covers readers, antennas, tags and installation, so you see the full investment before you decide.",
        },
        {
          q: "I already use barcodes. Why RFID?",
          a: "Barcodes work as long as someone scans every item. RFID reads everything that crosses the dock with no one involved, so validation doesn't depend on how busy the shift is.",
        },
        {
          q: "Who applies the tag?",
          a: "It depends on your operation: tagging at packing, at receiving, or the tag already comes from your supplier. We define it with you. Tagging by case or by pallet is usually enough to validate a shipment.",
        },
        {
          q: "Does it work with my ERP?",
          a: "There are connectors for Oracle, NetSuite, Microsoft Dynamics and SAP. Other systems connect through the API.",
        },
        {
          q: "Can I start with a single dock?",
          a: "Yes. The usual path is to start with one dock and one type of shipment, measure, and expand from there.",
        },
        {
          q: "Who installs it?",
          a: "Your integrator of choice or our own team. We take care of the configuration.",
        },
      ],
      capabilities: [
        {
          h: "Real-time SKU + serial validation",
          d: "Every RFID read is compared against the expected list for that order. Missing, extra, or wrong SKUs are flagged on the operator's screen before the shipment closes.",
        },
        {
          h: "Native ERP connectors",
          d: "Oracle Cloud, Oracle EBS, NetSuite, Microsoft Dynamics 365 and SAP S/4HANA. Uses each ERP's standard APIs — no extra middleware, no flat files.",
        },
        {
          h: "Live operator screen",
          d: "Real-time view of validated SKUs, missing items, and exceptions. Works on rugged tablets, industrial monitors, or dock displays.",
        },
        {
          h: "Immutable audit trail",
          d: "Every read, validation, and close is recorded with timestamp, reader, operator, and associated order. Exportable for audit or regulatory traceability.",
        },
        {
          h: "Many docks, many plants",
          d: "Dozens of docks across one or many plants, with roles and permissions per user and per site.",
        },
        {
          h: "Operator-handled exceptions",
          d: "When there's a discrepancy, the operator accepts it with a reason code (e.g. authorized partial shipment) or rejects it. Everything stays in the log with justification.",
        },
      ],
      useCases: [
        {
          h: "Manufacturing",
          d: "Validate finished-goods shipments against sales orders. MES integration to close production orders when shipment confirms.",
        },
        {
          h: "Distribution & 3PL",
          d: "Receiving against the customer's advance ship notice. Operators see all active shipments at their dock.",
        },
        {
          h: "Suppliers to large retailers",
          d: "If your customer already requires an RFID tag, use it to validate your own shipment before it leaves.",
        },
      ],
      integrations: {
        erp: "Oracle Cloud, Oracle EBS, NetSuite, Microsoft Dynamics 365 F&O, SAP S/4HANA, SAP ECC.",
        readers: "Zebra FX9600, FX7500, ATR7000. Impinj Speedway R420, R720.",
        deployment: "On-premise, private cloud, or hybrid edge for sites without stable connectivity.",
      },
    },
  },

  containers: CONTAINERS,

  rtls: {
    slug: "rtls",
    nameplate: "PL · 03",
    routes: { es: "/trace", en: "/trace" },
    es: {
      title: "Horizon Trace",
      tagline:
        "Dónde está cada cosa y cuánto lleva ahí, sin que nadie escanee.",
      lead:
        "Ubicación por zonas y tiempo por etapa sobre el plano de tu instalación: piso de planta, taller, hospital o bodega. Lectores RFID fijos detectan cada activo al entrar a una zona, y Horizon Trace te dice en cuál está y cuánto lleva ahí. Ubica por zona, no al centímetro.",
      ribbon: null,
      problem: {
        title: "Nadie sabe cuánto tarda cada etapa hasta que la entrega ya se atrasó.",
        body: "Los tiempos por etapa se estiman, y lo que se pierde se busca caminando. Donde se intentó medir con puntos de escaneo, el dato dejó de llegar en cuanto subió la carga de trabajo.",
        points: [
          {
            h: "El punto de escaneo depende de la gente",
            d: "Si hay que detenerse a escanear, en hora pico no se escanea. El reporte queda con huecos justo cuando más importa.",
          },
          {
            h: "Lo que no se encuentra, se busca a pie",
            d: "Moldes, herramentales, equipos médicos, vehículos: alguien recorre el edificio preguntando.",
          },
          {
            h: "El cuello de botella se discute, no se mide",
            d: "Sin tiempos reales por estación, cada junta termina en opiniones.",
          },
        ],
      },
      stepsTitle: "Tres pasos sobre tu propio plano.",
      steps: [
        {
          h: "Etiqueta",
          d: "Cada pieza, orden, equipo o vehículo lleva una etiqueta RFID.",
        },
        {
          h: "Define zonas",
          d: "Subes el plano, dibujas las zonas y colocas las antenas donde van. Un lector puede cubrir varias zonas cercanas.",
        },
        {
          h: "Mide",
          d: "Cada cambio de zona queda registrado: ubicación actual, tiempo por etapa, alertas y reportes.",
        },
      ],
      faq: [
        {
          q: "¿Qué tan precisa es la ubicación?",
          a: "Por zona: te dice en qué área, estación o bahía está el activo, no su posición exacta. Para medir tiempos por etapa y encontrar equipo es suficiente. Si necesitas precisión de centímetros hace falta otra tecnología, y te lo diremos.",
        },
        {
          q: "¿Cuántos lectores necesito?",
          a: "Depende de cuántas zonas quieras distinguir y qué tan cerca estén. Un lector cubre varias zonas contiguas con sus antenas. Lo dimensionamos sobre tu plano antes de cotizar.",
        },
        {
          q: "¿Funciona con metal o líquidos?",
          a: "Sí, con la etiqueta y la posición de antena correctas. Por eso se hace una prueba de lectura en tu instalación antes de etiquetar todo.",
        },
        {
          q: "¿Sirve para rastrear personas?",
          a: "Está pensado para activos, piezas y vehículos. No lo recomendamos para seguir al personal.",
        },
        {
          q: "¿Cuánto cuesta cubrir toda la planta?",
          a: "El software se cobra como renta mensual según el número de lectores, sin costo de desarrollo. La cotización que te entregamos incluye también lectores, antenas, etiquetas e instalación, para que veas la inversión completa antes de decidir. Lo habitual es empezar por un flujo de dos o tres zonas y crecer desde ahí.",
        },
        {
          q: "¿Quién lo instala?",
          a: "Tu integrador de confianza o nuestro equipo. La configuración corre por nuestra cuenta.",
        },
      ],
      metrics: [
        { label: "Latencia tiempo real", value: "< 1 s", note: "streaming en vivo" },
        { label: "Captura", value: "Sin escaneo", note: "lectores fijos por zona" },
        { label: "Retención de historial", value: "365 días", note: "compresión > 7 d" },
        { label: "Reportes preconstruidos", value: "12+", note: "+ constructor personalizado" },
      ],
      capabilities: [
        {
          h: "Vista en vivo sobre tu plano",
          d: "Activos, zonas y feed de actividad reciente en una sola pantalla, actualizándose en vivo. Sin recargar, sin esperar.",
        },
        {
          h: "Editor visual de planos",
          d: "Sube el plano de tu instalación, dibuja zonas (rectangulares, circulares o poligonales), arrastra antenas a su posición real. Sin código, sin GIS especializado.",
        },
        {
          h: "Regla de ubicación clara",
          d: "Cada lectura se asigna a la zona donde la señal es más fuerte. Sin cajas negras: puedes revisar por qué un activo aparece en una zona u otra.",
        },
        {
          h: "Alertas en tiempo real",
          d: "Salida de zona, entrada a zona prohibida, fuera de zona permitida, no detectado por N minutos. Email, webhook o panel. Reglas por activo, categoría o zona.",
        },
        {
          h: "Reportes y mapa de calor",
          d: "12 reportes preconstruidos — permanencia, ocupación, historial, mapa de calor — más constructor personalizado. Exportables a CSV y PDF.",
        },
        {
          h: "Cycle time y permanencia",
          d: "Tiempo de cada pieza en cada estación, de cada vehículo en cada bahía, de cada equipo médico en cada área. Para WIP, ciclo de servicio o cualquier flujo por etapas.",
        },
        {
          h: "Roles y permisos por usuario",
          d: "Operador ve su área, supervisor ve toda la planta, administrador configura. Roles, accesos y vistas finas por usuario y por sitio.",
        },
        {
          h: "Importación masiva",
          d: "CSV con mapeo dinámico de columnas y resumen de errores por fila. Arrancar un piloto con miles de activos no requiere captura manual.",
        },
      ],
      screenshots: [
        {
          src: dashboardImg,
          caption: "Panel de control: planta + zonas + actividad reciente en vivo.",
        },
        {
          src: editorImg,
          caption: "Editor visual de planos: dibuja zonas, coloca antenas, calibra escala.",
        },
        {
          src: heatmapImg,
          caption: "Mapa de calor: densidad de detecciones por zona en el rango de fechas que elijas.",
        },
        {
          src: alertsImg,
          caption: "Alertas configurables: activas, atendidas y resueltas, con razón y operador.",
        },
        {
          src: historyImg,
          caption: "Historial por activo: ruta, transiciones de zona y permanencia, paso a paso.",
        },
        {
          src: reportDwellImg,
          caption: "Reporte de permanencia: horas por zona, exportable a CSV o PDF.",
        },
      ],
      useCases: [
        {
          h: "Manufactura discreta / WIP",
          d: "Líneas con múltiples estaciones donde el cuello de botella varía con el mix. Detecta dónde se atora cada unidad y por cuánto tiempo.",
        },
        {
          h: "Talleres automotrices y de servicio",
          d: "Flujo del vehículo por etapas: recepción, mecánica, hojalatería, pintura, lavado. Tiempo en cada bahía, sin checador humano.",
        },
        {
          h: "Hospitales y laboratorios",
          d: "Sillas de ruedas, bombas de infusión, monitores, muestras. Saber en qué área está cada uno y recibir alerta si sale del piso, sin recorrer el edificio.",
        },
        {
          h: "Renta de equipo y patios",
          d: "Equipo que sale y regresa: en qué zona del patio está, cuánto lleva en revisión y qué está listo para entregar.",
        },
      ],
      integrations: {
        tags: "Tags UHF estándar, códigos de barras o QR. Conectores opcionales de visión artificial para captura sin etiqueta.",
        readers:
          "Impinj R420 / R720 / xSpan / xArray, Zebra FX7500 / FX9600 / ATR7000, Alien ALR-F800 / 9680. Cualquier lector industrial estándar.",
        mes: "API REST con más de 100 endpoints. Eventos en tiempo real hacia tu MES, BI o data warehouse. Conectores para los MES industriales más comunes.",
        deployment:
          "SaaS en la nube, sin servidores ni instaladores. O on-premises en tu planta cuando los datos tienen que quedarse ahí. También híbrido.",
      },
    },
    en: {
      title: "Horizon Trace",
      tagline:
        "Where everything is and how long it's been there, with nobody scanning.",
      lead:
        "Zone-level location and time per stage on your facility's floor plan: shop floor, service bay, hospital, or warehouse. Fixed RFID readers detect each asset as it enters a zone, and Horizon Trace tells you which zone it is in and how long it has been there. It locates by zone, not to the centimeter.",
      ribbon: null,
      problem: {
        title: "Nobody knows how long each stage takes until the delivery is already late.",
        body: "Stage times are estimated, and whatever goes missing is found on foot. Where scan checkpoints were tried, the data stopped arriving as soon as the workload went up.",
        points: [
          {
            h: "A scan point depends on people",
            d: "If someone has to stop and scan, at peak hours nobody scans. The report has gaps exactly when it matters most.",
          },
          {
            h: "What can't be found is searched for on foot",
            d: "Molds, tooling, medical equipment, vehicles: someone walks the building asking around.",
          },
          {
            h: "The bottleneck is argued, not measured",
            d: "Without real times per station, every meeting ends in opinions.",
          },
        ],
      },
      stepsTitle: "Three steps on your own floor plan.",
      steps: [
        {
          h: "Tag",
          d: "Every part, work order, piece of equipment or vehicle carries an RFID tag.",
        },
        {
          h: "Define zones",
          d: "Upload the floor plan, draw the zones and place the antennas where they go. One reader can cover several nearby zones.",
        },
        {
          h: "Measure",
          d: "Every zone change is recorded: current location, time per stage, alerts and reports.",
        },
      ],
      faq: [
        {
          q: "How precise is the location?",
          a: "Zone level: it tells you which area, station or bay the asset is in, not its exact position. That is enough to measure time per stage and to find equipment. If you need centimeter precision you need a different technology, and we will tell you so.",
        },
        {
          q: "How many readers do I need?",
          a: "It depends on how many zones you want to tell apart and how close together they are. One reader covers several adjacent zones with its antennas. We size it on your floor plan before quoting.",
        },
        {
          q: "Does it work around metal or liquids?",
          a: "Yes, with the right tag and antenna placement. That is why we run a read test at your facility before tagging everything.",
        },
        {
          q: "Can it track people?",
          a: "It is built for assets, parts and vehicles. We don't recommend it for following staff.",
        },
        {
          q: "What does it cost to cover the whole plant?",
          a: "The software is a monthly subscription based on the number of readers, with no development fee. The quote we give you also covers readers, antennas, tags and installation, so you see the full investment before you decide. The usual path is to start with one flow of two or three zones and grow from there.",
        },
        {
          q: "Who installs it?",
          a: "Your integrator of choice or our own team. We take care of the configuration.",
        },
      ],
      metrics: [
        { label: "Real-time latency", value: "< 1 s", note: "live streaming" },
        { label: "Capture", value: "No scanning", note: "fixed readers per zone" },
        { label: "History retention", value: "365 days", note: "compression after 7 d" },
        { label: "Prebuilt reports", value: "12+", note: "+ custom builder" },
      ],
      capabilities: [
        {
          h: "Live view on your floor plan",
          d: "Assets, zones, and a recent-activity feed on one screen, updating live. No reload, no waiting.",
        },
        {
          h: "Visual floor-plan editor",
          d: "Upload your facility's plan, draw zones (rectangular, circular, or polygonal), drag antennas to their real position. No code, no specialized GIS.",
        },
        {
          h: "A location rule you can check",
          d: "Each read maps to the zone where the signal is strongest. No black boxes: you can review why an asset shows up in one zone or another.",
        },
        {
          h: "Real-time alerts",
          d: "Zone exit, entry into a forbidden zone, out of allowed zone, not detected for N minutes. Email, webhook, or in-app. Rules by asset, category, or zone.",
        },
        {
          h: "Reports and heatmap",
          d: "12 prebuilt reports — dwell time, occupancy, history, heatmap — plus a custom builder. Exportable to CSV and PDF.",
        },
        {
          h: "Cycle time and dwell",
          d: "Time per part at each station, per vehicle at each bay, per medical asset in each area. For WIP, service cycles, or any staged flow.",
        },
        {
          h: "Roles and permissions per user",
          d: "Operator sees their area, supervisor sees the whole plant, admin configures. Fine-grained roles, access, and views per user and per site.",
        },
        {
          h: "Bulk import",
          d: "CSV with dynamic column mapping and per-row error reporting. Onboarding thousands of assets doesn't require manual entry.",
        },
      ],
      screenshots: [
        {
          src: dashboardImgEn,
          caption: "Control panel: floor plan + zones + live activity feed.",
        },
        {
          src: editorImgEn,
          caption: "Visual floor-plan editor: draw zones, place antennas, calibrate scale.",
        },
        {
          src: heatmapImgEn,
          caption: "Heatmap report: detection density by zone over any date range.",
        },
        {
          src: alertsImgEn,
          caption: "Configurable alerts: active, acknowledged, and resolved, with reason and operator.",
        },
        {
          src: historyImgEn,
          caption: "Per-asset history: route, zone transitions, and dwell time, step by step.",
        },
        {
          src: reportDwellImgEn,
          caption: "Dwell-time report: hours per zone, exportable to CSV or PDF.",
        },
      ],
      useCases: [
        {
          h: "Discrete manufacturing / WIP",
          d: "Lines with multiple stations where the bottleneck moves with product mix. Spot where each unit is stuck and for how long.",
        },
        {
          h: "Automotive and service workshops",
          d: "Vehicle flow by stage: intake, mechanical, body, paint, wash. Time at each bay, no human stopwatch.",
        },
        {
          h: "Hospitals and laboratories",
          d: "Wheelchairs, infusion pumps, monitors, samples. Know which area each one is in and get alerted if it leaves the floor, without walking the building.",
        },
        {
          h: "Equipment rental and yards",
          d: "Equipment that goes out and comes back: which zone of the yard it is in, how long it has been in inspection, and what is ready to deliver.",
        },
      ],
      integrations: {
        tags: "Standard UHF RFID tags, barcodes, or QR codes. Optional computer-vision connectors for capture without a tag.",
        readers:
          "Impinj R420 / R720 / xSpan / xArray, Zebra FX7500 / FX9600 / ATR7000, Alien ALR-F800 / 9680. Any standard industrial reader.",
        mes: "REST API with 100+ endpoints. Real-time events into your MES, BI, or data warehouse. Connectors for the main industrial MES platforms.",
        deployment:
          "SaaS in the cloud — no servers, no installers. Or on-premises at your plant when the data has to stay there. Hybrid available.",
      },
    },
  },
};

export function getPluginShared(lang) {
  return SHARED[lang] || SHARED.es;
}

export const PLUGIN_LIST = ["warehouse", "containers", "rtls"];
