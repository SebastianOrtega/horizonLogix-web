// Per-plugin content for the dedicated product pages. Each entry is a full
// page rendered by <PluginPage>. Tone follows .impeccable.md — industrial
// editorial, technical, opinionated where it matters.

const SHARED = {
  es: {
    eyebrow: "Plugin",
    backToPlugins: "Ver todos los plugins",
    sections: {
      capabilities: "Capacidades",
      useCases: "Dónde encaja",
      integrations: "Integraciones y despliegue",
    },
    integrationLabels: {
      erp: "ERP / WMS",
      readers: "Lectores compatibles",
      deployment: "Despliegue",
      tags: "Tags",
      mes: "MES / SCADA",
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
      capabilities: "Capabilities",
      useCases: "Where it fits",
      integrations: "Integrations & deployment",
    },
    integrationLabels: {
      erp: "ERP / WMS",
      readers: "Compatible readers",
      deployment: "Deployment",
      tags: "Tags",
      mes: "MES / SCADA",
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
      title: "Horizon RTLS / WIP",
      tagline: "Localización en tiempo real para work-in-progress en piso.",
      lead:
        "Mientras el WMS mira el inventario terminado, RTLS / WIP mira lo que está pasando AHORA en tu línea: dónde está cada pieza, cuánto lleva en cada estación, dónde se está atorando.",
      ribbon: "Disponible Q3 2026",
      capabilities: [
        {
          h: "Cycle time por estación",
          d: "Tiempo real que cada pieza pasa en cada paso del proceso. Identifica desviaciones por turno, operador o producto.",
        },
        {
          h: "Mapas de calor de planta",
          d: "Visualización 2D de densidad de activos. Detecta zonas saturadas o vacías que deberían tener trabajo.",
        },
        {
          h: "Detección de cuellos de botella",
          d: "El sistema marca las estaciones donde el tiempo de ciclo se desvía del promedio histórico. Alertas cuando una estación se atora más de N minutos.",
        },
        {
          h: "Tiempos & movimientos automáticos",
          d: "Estudios de tiempos & movimientos sin cronómetro humano. Datos continuos en lugar de muestreos.",
        },
        {
          h: "Integración con MES",
          d: "Compatible con los principales MES industriales. Eventos RTLS pueden disparar transiciones de orden de producción.",
        },
      ],
      useCases: [
        {
          h: "Manufactura discreta",
          d: "Líneas con múltiples estaciones, donde el cuello de botella se mueve dependiendo de mix de producto.",
        },
        {
          h: "Ensambles complejos",
          d: "Aeroespacial, equipo médico, automotriz especializada — donde cada unidad tiene un recorrido específico y el tracking importa.",
        },
      ],
      integrations: {
        tags: "RFID pasivo de largo alcance, UWB activo (Sewio, Ubisense), BLE.",
        mes: "Conectores para los MES industriales más comunes; eventos vía MQTT/REST.",
        deployment: "Edge en planta para latencia mínima; cloud para análisis y reportería.",
      },
    },
    en: {
      title: "Horizon RTLS / WIP",
      tagline: "Real-time location for work-in-progress on the floor.",
      lead:
        "While the WMS watches finished inventory, RTLS / WIP watches what's happening RIGHT NOW on your line: where each piece is, how long it's been at each station, where it's getting stuck.",
      ribbon: "Coming Q3 2026",
      capabilities: [
        {
          h: "Cycle time per station",
          d: "Real time each piece spends at each process step. Identifies deviations by shift, operator, or product.",
        },
        {
          h: "Plant heat maps",
          d: "2D visualization of asset density. Spots saturated or empty zones that should have work.",
        },
        {
          h: "Bottleneck detection",
          d: "The system flags stations where cycle time deviates from the historical average. Alerts when a station is stuck more than N minutes.",
        },
        {
          h: "Automatic time-and-motion",
          d: "Time-and-motion studies without a human stopwatch. Continuous data instead of sampling.",
        },
        {
          h: "MES integration",
          d: "Works with the main industrial MES platforms. RTLS events can trigger production-order state transitions.",
        },
      ],
      useCases: [
        {
          h: "Discrete manufacturing",
          d: "Lines with multiple stations, where the bottleneck moves depending on product mix.",
        },
        {
          h: "Complex assemblies",
          d: "Aerospace, medical devices, specialty automotive — where each unit has a specific routing and tracking matters.",
        },
      ],
      integrations: {
        tags: "Long-range passive RFID, active UWB (Sewio, Ubisense), BLE.",
        mes: "Connectors for the most common industrial MES platforms; events via MQTT/REST.",
        deployment: "Edge at the plant for minimum latency; cloud for analytics and reporting.",
      },
    },
  },
};

export function getPluginShared(lang) {
  return SHARED[lang] || SHARED.es;
}

export const PLUGIN_LIST = ["warehouse", "containers", "rtls"];
