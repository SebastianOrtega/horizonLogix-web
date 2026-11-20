// Copy and card media for /plugins, the end-customer page that lists the three
// plugins. Title, tagline, nameplate and route come from PLUGINS (one source);
// this file only holds what the hub adds. Spec:
// marketing/propuesta-pagina-plugins.md in the middleware-docs repo.
//
// Card media: each card names its short film (`video`) and keeps a product
// capture (`media`) as the fallback. A card plays its film as soon as
// scripts/encode-plugin-video.sh has written, for that language, all four of
// src/assets/video/<video>-short-<lang>-{16x9,4x5}.{mp4,jpg}; until then it
// shows the capture. Resolved shapes:
//   { kind: "video", wide: { src, poster }, tall: { src, poster }, captions, duration, label }
//   { kind: "image", src, alt, width, height, position }

import whLive from "./assets/warehouse/live-missing-top.png";
import whLiveEn from "./assets/warehouse/en/live-missing-top.png";
import ctDashboard from "./assets/containers/dashboard.png";
import ctDashboardEn from "./assets/containers/en/dashboard.png";
import trDashboard from "./assets/rtls/dashboard.png";
import trDashboardEn from "./assets/rtls/en/dashboard.png";

const SHOT = { width: 1600, height: 1122 };

// URLs only (no download until a <video> asks for one).
const VIDEO_FILES = import.meta.glob("./assets/video/*-short-*.{mp4,jpg,vtt}", {
  eager: true,
  query: "?url",
  import: "default",
});
const VIDEO_META = import.meta.glob("./assets/video/*-short.json", { eager: true, import: "default" });

function fmtDuration(sec) {
  const s = Math.round(sec);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function resolveVideo(name, lang, title, words) {
  if (!name) return null;
  const base = `./assets/video/${name}-short-${lang}`;
  const pick = (suffix) => VIDEO_FILES[base + suffix];
  const wide = { src: pick("-16x9.mp4"), poster: pick("-16x9.jpg") };
  const tall = { src: pick("-4x5.mp4"), poster: pick("-4x5.jpg") };
  if (!wide.src || !wide.poster || !tall.src || !tall.poster) return null;
  const seconds = VIDEO_META[`./assets/video/${name}-short.json`]?.duration;
  return {
    kind: "video",
    wide,
    tall,
    captions: pick(".vtt") || null,
    captionsLang: lang,
    captionsLabel: lang === "en" ? "English" : "Español",
    duration: seconds ? fmtDuration(seconds) : null,
    label: seconds ? `${words.video} ${title}, ${Math.round(seconds)} ${words.seconds}` : `${words.video} ${title}`,
  };
}

export const HUB_ORDER = ["warehouse", "containers", "rtls"];

export const HUB = {
  es: {
    meta: {
      title: "Plugins de Horizon Logix — embarques, contenedores retornables y ubicación de activos",
      description:
        "Tres aplicaciones para operación y logística: embarques validados en el andén, control de contenedores retornables y ubicación de activos por zona.",
    },
    eyebrow: "Plugins de Horizon Logix",
    title: "Tres problemas de operación. Un plugin para cada uno.",
    lede: "Embarques que salen incompletos, contenedores que no regresan, activos que nadie encuentra. Elige el que se parece a tu operación.",
    of: "de",
    carousel: {
      label: "Plugins de Horizon Logix",
      prev: "Plugin anterior",
      next: "Plugin siguiente",
      goTo: "Ir a",
      swipe: "Desliza para ver los 3",
    },
    video: {
      withSound: "Ver con sonido",
      play: "Ver video",
      again: "Ver de nuevo con sonido",
      pause: "Pausar video",
      video: "Video de",
      seconds: "segundos",
      resume: "Reanudar video",
    },
    chooser: {
      eyebrow: "¿Cuál necesito?",
      title: "Empieza por la pregunta que más se repite en tu operación.",
      rows: [
        { slug: "warehouse", q: "¿Salió completo el embarque?" },
        { slug: "containers", q: "¿Dónde están mis contenedores y cuáles no han regresado?" },
        { slug: "rtls", q: "¿Dónde está ese activo y cuánto lleva ahí?" },
      ],
    },
    cards: {
      warehouse: {
        area: "Embarque y recepción",
        summary:
          "Lee cada pieza al pasar por el andén y la compara contra la orden de tu ERP. Si algo falta, sobra o no corresponde, el operador lo ve antes de que salga el camión.",
        cta: "Conocer Horizon Warehouse",
        video: "warehouse",
        media: {
          kind: "image",
          src: whLive,
          ...SHOT,
          position: "50% 0%",
          alt: "Pantalla del operador en Horizon Warehouse: orden en proceso con 3 piezas faltantes.",
        },
      },
      containers: {
        area: "Contenedores retornables",
        summary:
          "Cuántos contenedores tienes, dónde está cada uno y cuáles llevan demasiado tiempo fuera, sin hojas de cálculo ni conteos a mano.",
        cta: "Conocer Horizon Containers",
        video: "containers",
        media: {
          kind: "image",
          src: ctDashboard,
          ...SHOT,
          position: "78% 40%",
          alt: "Panel de Horizon Containers: contenedores por planta y mapa de ubicaciones.",
        },
      },
      rtls: {
        area: "Ubicación de activos",
        summary:
          "En qué zona está cada activo y cuánto lleva ahí, sobre el plano de tu instalación. Ubica por zona, no al centímetro.",
        cta: "Conocer Horizon Trace",
        video: "trace",
        media: {
          kind: "image",
          src: trDashboard,
          ...SHOT,
          position: "38% 35%",
          alt: "Panel de Horizon Trace: plano de la nave con los activos contados por zona.",
        },
      },
    },
  },
  en: {
    meta: {
      title: "Horizon Logix plugins — shipping, returnable containers and asset location",
      description:
        "Three apps for operations and logistics: shipments checked at the dock, returnable container tracking and zone-level asset location.",
    },
    eyebrow: "Horizon Logix plugins",
    title: "Three operating problems. One plugin for each.",
    lede: "Shipments that leave short, containers that don't come back, assets nobody can find. Pick the one that looks like your operation.",
    of: "of",
    carousel: {
      label: "Horizon Logix plugins",
      prev: "Previous plugin",
      next: "Next plugin",
      goTo: "Go to",
      swipe: "Swipe to see all 3",
    },
    video: {
      withSound: "Watch with sound",
      play: "Play video",
      again: "Watch again with sound",
      pause: "Pause video",
      video: "Video:",
      seconds: "seconds",
      resume: "Resume video",
    },
    chooser: {
      eyebrow: "Which one do I need?",
      title: "Start with the question your team asks most.",
      rows: [
        { slug: "warehouse", q: "Did the shipment leave complete?" },
        { slug: "containers", q: "Where are my containers, and which haven't come back?" },
        { slug: "rtls", q: "Where is that asset, and how long has it been there?" },
      ],
    },
    cards: {
      warehouse: {
        area: "Shipping & receiving",
        summary:
          "Reads every item as it crosses the dock and checks it against your ERP order. If something is missing, extra or wrong, the operator sees it before the truck leaves.",
        cta: "Explore Horizon Warehouse",
        video: "warehouse",
        media: {
          kind: "image",
          src: whLiveEn,
          ...SHOT,
          position: "50% 0%",
          alt: "Operator screen in Horizon Warehouse: order in progress with 3 items missing.",
        },
      },
      containers: {
        area: "Returnable containers",
        summary:
          "How many containers you have, where each one is, and which have been out too long, without spreadsheets or manual counts.",
        cta: "Explore Horizon Containers",
        video: "containers",
        media: {
          kind: "image",
          src: ctDashboardEn,
          ...SHOT,
          position: "78% 40%",
          alt: "Horizon Containers dashboard: containers by plant and a map of locations.",
        },
      },
      rtls: {
        area: "Asset location",
        summary:
          "Which zone each asset is in and how long it has been there, on your facility's floor plan. By zone, not to the centimeter.",
        cta: "Explore Horizon Trace",
        video: "trace",
        media: {
          kind: "image",
          src: trDashboardEn,
          ...SHOT,
          position: "38% 35%",
          alt: "Horizon Trace dashboard: floor plan with assets counted by zone.",
        },
      },
    },
  },
};

const TITLES = { warehouse: "Horizon Warehouse", containers: "Horizon Containers", rtls: "Horizon Trace" };

// Language slice with each card's media resolved: its film when encoded,
// otherwise its capture.
export function getHub(lang) {
  const l = HUB[lang] ? lang : "es";
  const hub = HUB[l];
  const cards = Object.fromEntries(
    Object.entries(hub.cards).map(([slug, c]) => [
      slug,
      { ...c, media: resolveVideo(c.video, l, TITLES[slug], hub.video) || c.media },
    ])
  );
  return { ...hub, cards };
}

// The same film for a plugin page hero: { media, labels } or null when the
// film is not encoded yet for this language (the hero keeps its capture).
export function getPluginVideo(slug, lang) {
  const l = HUB[lang] ? lang : "es";
  const card = HUB[l].cards[slug];
  const media = card && resolveVideo(card.video, l, TITLES[slug], HUB[l].video);
  return media ? { media, labels: HUB[l].video } : null;
}
