// Per-plugin content for the dedicated product pages. Each entry is a full
// page rendered by <PluginPage>. Tone follows .impeccable.md — industrial
// editorial, technical, opinionated where it matters.

import dashboardImg from "./assets/rtls/dashboard.png";
import editorImg from "./assets/rtls/editor.png";
import heatmapImg from "./assets/rtls/heatmap.png";
import alertsImg from "./assets/rtls/alerts.png";
import historyImg from "./assets/rtls/history.png";
import reportDwellImg from "./assets/rtls/report-dwell.png";

const SHARED = {
  es: {
    eyebrow: "Plugin",
    backToPlugins: "Ver todos los plugins",
    sections: {
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
    closingCtaSub: "Una llamada con el equipo de ingeniería para ver si encaja.",
    closingCtaPrimary: "Solicitar demo",
    closingCtaSecondary: "Hablar con ventas",
  },
  en: {
    eyebrow: "Plugin",
    backToPlugins: "See all plugins",
    sections: {
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
    closingCtaSub: "A call with the engineering team to see if it fits.",
    closingCtaPrimary: "Request demo",
    closingCtaSecondary: "Talk to sales",
  },
};

export const PLUGINS = {
  warehouse: {
    slug: "warehouse",
    nameplate: "PL · 01",
    routes: { es: "/warehouse", en: "/warehouse" },
    es: {
      title: "Horizon Warehouse",
      tagline: "Embarques y recepción RFID, validados contra tu ERP.",
      lead:
        "Cada SKU y serial leído en el dock se valida en tiempo real contra la orden de embarque o recepción de tu ERP. Si algo falta, sobra o no corresponde, el operador lo ve antes de que el camión salga.",
      ribbon: null,
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
          h: "Multi-dock, multi-planta",
          d: "Una instancia maneja decenas de docks en una o varias plantas. Roles y aislamiento de datos por sitio, cliente o unidad de negocio.",
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
          h: "Logística & 3PL",
          d: "Recepción de mercancía contra ASN del cliente. Cada cliente ve solo su inventario; operadores ven todos los embarques activos en su dock.",
        },
        {
          h: "Retail / DC",
          d: "Recepción de pallets desde proveedores. Verifica conteo y SKU contra orden de compra antes de aceptar — los reclamos por faltantes desaparecen.",
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
      tagline: "RFID shipping & receiving, validated against your ERP orders.",
      lead:
        "Every SKU and serial read at the dock is validated in real time against your ERP's shipping or receiving order. If something is missing, extra, or wrong, the operator sees it before the truck leaves.",
      ribbon: null,
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
          h: "Multi-dock, multi-site",
          d: "One instance handles dozens of docks across one or many plants. Role-based access and data isolation by site, customer, or business unit.",
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
          h: "Logistics & 3PL",
          d: "Receiving against the customer's ASN. Each customer sees only their inventory; operators see all active shipments at their dock.",
        },
        {
          h: "Retail / DC",
          d: "Pallet receiving from suppliers. Verifies count and SKU against the purchase order before acceptance — short-shipment claims disappear.",
        },
      ],
      integrations: {
        erp: "Oracle Cloud, Oracle EBS, NetSuite, Microsoft Dynamics 365 F&O, SAP S/4HANA, SAP ECC.",
        readers: "Zebra FX9600, FX7500, ATR7000. Impinj Speedway R420, R720.",
        deployment: "On-premise, private cloud, or hybrid edge for sites without stable connectivity.",
      },
    },
  },

  containers: {
    slug: "containers",
    nameplate: "PL · 02",
    routes: { es: "/contenedores", en: "/containers" },
    es: {
      title: "Horizon Containers",
      tagline: "Trazabilidad de contenedores reutilizables a escala industrial.",
      lead:
        "Tarimas, charolas, racks, IBC, cajas reutilizables — cualquier activo que circule entre tus plantas o las de tus clientes. Sabes cuántos están dentro, dónde, y cuándo deberían volver.",
      ribbon: null,
      capabilities: [
        {
          h: "Movimientos entrada/salida automáticos",
          d: "Lectores fijos en cada portón detectan los activos que pasan. No requiere intervención del operador para registrar el movimiento.",
        },
        {
          h: "Dashboard multi-tenant",
          d: "Cada cliente o socio ve solo su flota. Reglas de visibilidad por contrato, geografía o tipo de activo.",
        },
        {
          h: "Alertas configurables",
          d: "Activo no devuelto en N días, salida fuera de horario, lectura en una zona prohibida — define el umbral, recibe el ping por correo, webhook o Slack.",
        },
        {
          h: "Roles por usuario y por planta",
          d: "Operador de planta ve sus activos. Coordinador regional ve todas sus plantas. Cliente ve solo sus contenedores. Aislamiento por colección.",
        },
        {
          h: "Reportería operativa",
          d: "Rotación de activos por planta, tiempo promedio fuera, contenedores estancados. Exportable a Excel, BI tool o tu data warehouse.",
        },
        {
          h: "Auditoría inmutable",
          d: "Cada movimiento queda con timestamp, lector y zona. Útil para reclamos, auditorías o disputas con cliente — la evidencia es incontestable.",
        },
      ],
      useCases: [
        {
          h: "Alimentos & Bebidas",
          d: "Cajas reutilizables entre planta y centro de distribución. Saber cuáles están en tránsito, cuáles llevan días sin volver, cuál cliente las tiene.",
        },
        {
          h: "Automotriz",
          d: "Charolas y racks específicos para piezas críticas. Prevenir que se queden en la planta del cliente y bloqueen producción.",
        },
        {
          h: "Logística reverse",
          d: "Pallets retornables. Costos por pérdida y disputas con cliente reducidos al tener trazabilidad de cada activo.",
        },
      ],
      integrations: {
        erp: "Cualquier sistema con API REST. Conectores prebuilt para SAP S/4HANA, NetSuite, Manhattan WMOS.",
        readers: "Zebra FX9600 fijo, FX7500 portátil, ATR7000 para zonas amplias.",
        deployment: "Cloud (Azure, AWS, GCP), o edge para sitios offline con sincronización diferida.",
      },
    },
    en: {
      title: "Horizon Containers",
      tagline: "Industrial-scale traceability for reusable containers.",
      lead:
        "Pallets, totes, racks, IBCs, reusable crates — any asset that circulates between your sites or your customers'. Know how many are out, where they are, and when they should be back.",
      ribbon: null,
      capabilities: [
        {
          h: "Automatic in/out movements",
          d: "Fixed readers at each gate detect assets passing through. No operator intervention required to log the movement.",
        },
        {
          h: "Multi-tenant dashboard",
          d: "Each customer or partner sees only their fleet. Visibility rules by contract, geography, or asset type.",
        },
        {
          h: "Configurable alerts",
          d: "Asset not returned in N days, off-hours exit, read in a forbidden zone — set the threshold, get the ping via email, webhook, or Slack.",
        },
        {
          h: "Per-user, per-site roles",
          d: "Plant operator sees their assets. Regional coordinator sees all their plants. Customer sees only their containers. Isolation by collection.",
        },
        {
          h: "Operational reporting",
          d: "Asset turnover by plant, average time out, stuck containers. Exportable to Excel, BI tools, or your data warehouse.",
        },
        {
          h: "Immutable audit trail",
          d: "Every movement timestamped with reader and zone. Useful for claims, audits, or customer disputes — the evidence is incontestable.",
        },
      ],
      useCases: [
        {
          h: "Food & Beverage",
          d: "Reusable crates between plant and distribution center. Know which are in transit, which have been out too long, which customer has them.",
        },
        {
          h: "Automotive",
          d: "Custom trays and racks for critical parts. Prevent them from getting stuck at the customer's plant and blocking production.",
        },
        {
          h: "Reverse logistics",
          d: "Returnable pallets. Loss costs and customer disputes drop when every asset has a verifiable trail.",
        },
      ],
      integrations: {
        erp: "Any system with a REST API. Prebuilt connectors for SAP S/4HANA, NetSuite, Manhattan WMOS.",
        readers: "Zebra FX9600 fixed, FX7500 handheld, ATR7000 for wide-area zones.",
        deployment: "Cloud (Azure, AWS, GCP) or edge for offline sites with deferred sync.",
      },
    },
  },

  rtls: {
    slug: "rtls",
    nameplate: "PL · 03",
    routes: { es: "/rtls", en: "/rtls" },
    es: {
      title: "LogixIQ",
      tagline:
        "Saber dónde está cada activo, cuánto lleva ahí, y cuándo se sale de lugar.",
      lead:
        "Localización en tiempo real sobre el plano real de tu instalación: piso de planta, hospital, taller o bodega. Mientras el WMS ve inventario terminado, LogixIQ ve lo que está pasando ahora — piezas en estación, equipos médicos, vehículos en servicio, contenedores en bahía.",
      ribbon: null,
      metrics: [
        { label: "Latencia tiempo real", value: "< 1 s", note: "streaming en vivo" },
        { label: "Throughput probado", value: "M / día", note: "lecturas por planta" },
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
          h: "Detección por RSSI observable",
          d: "Cada lectura se asigna a la zona con mayor señal. Regla pública, debuggeable, sin ML opaco — puedes auditarla y entender por qué un activo cayó en una zona u otra.",
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
          h: "Hospitales y clínicas",
          d: "Sillas de ruedas, bombas de infusión, monitores. Saber dónde está cada uno y recibir alerta si sale del piso, sin recorrer el edificio.",
        },
        {
          h: "Talleres automotrices y de servicio",
          d: "Flujo del vehículo por etapas: recepción, mecánica, hojalatería, pintura, lavado. Tiempo en cada bahía, sin checador humano.",
        },
        {
          h: "Bodegas y centros de distribución",
          d: "Pallets, racks, contenedores reutilizables. Ubicación correcta, alertas si algo se mueve fuera de horario, auditoría de cada movimiento.",
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
      title: "LogixIQ",
      tagline:
        "Know where every asset is, how long it's been there, and when it leaves where it should be.",
      lead:
        "Real-time location on the actual floor plan of your facility: shop floor, hospital, service bay, or warehouse. While the WMS watches finished inventory, LogixIQ watches what's happening right now — parts at a station, medical equipment, vehicles in service, containers in a bay.",
      ribbon: null,
      metrics: [
        { label: "Real-time latency", value: "< 1 s", note: "live streaming" },
        { label: "Proven throughput", value: "M / day", note: "reads per plant" },
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
          h: "Observable RSSI detection",
          d: "Each read maps to the zone with the strongest signal. The rule is public and debuggable — no opaque ML. You can audit why an asset landed in a given zone.",
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
          src: dashboardImg,
          caption: "Control panel: floor plan + zones + live activity feed.",
        },
        {
          src: editorImg,
          caption: "Visual floor-plan editor: draw zones, place antennas, calibrate scale.",
        },
        {
          src: heatmapImg,
          caption: "Heatmap report: detection density by zone over any date range.",
        },
        {
          src: alertsImg,
          caption: "Configurable alerts: active, acknowledged, and resolved, with reason and operator.",
        },
        {
          src: historyImg,
          caption: "Per-asset history: route, zone transitions, and dwell time, step by step.",
        },
        {
          src: reportDwellImg,
          caption: "Dwell-time report: hours per zone, exportable to CSV or PDF.",
        },
      ],
      useCases: [
        {
          h: "Discrete manufacturing / WIP",
          d: "Lines with multiple stations where the bottleneck moves with product mix. Spot where each unit is stuck and for how long.",
        },
        {
          h: "Hospitals and clinics",
          d: "Wheelchairs, infusion pumps, monitors. Know where each one is and get alerted if it leaves the floor — without walking the building.",
        },
        {
          h: "Automotive and service workshops",
          d: "Vehicle flow by stage: intake, mechanical, body, paint, wash. Time at each bay, no human stopwatch.",
        },
        {
          h: "Warehouses and distribution centers",
          d: "Pallets, racks, returnable containers. Correct location, off-hours movement alerts, audit trail for every move.",
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
