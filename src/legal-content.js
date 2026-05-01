// Legal content for Horizon Logix — privacy notice + terms of use, ES + EN.
//
// This is a TEMPLATE drafted to satisfy LFPDPPP (México) and align with
// GDPR-friendly defaults. It is NOT legal advice — have a lawyer review
// before publishing. Items in [BRACKETS] need to be filled in with the
// real company details.

const COMPANY = {
  legalName: "[Razón social completa, S.A. de C.V.]",
  shortName: "Horizon Logix",
  address: "[Domicilio fiscal — calle, número, colonia, ciudad, estado, CP, México]",
  rfc: "[RFC del responsable]",
  contactEmail: "[privacidad@horizonlogix.com]",
  generalEmail: "hola@horizonlogix.com",
  website: "horizonlogix.com",
  retentionMonths: 24,
};

const lastUpdatedISO = "2026-05-01";
const lastUpdated = {
  es: "Última actualización: 1 de mayo de 2026",
  en: "Last updated: May 1, 2026",
};

export const LEGAL = {
  es: {
    eyebrow: "Documentos legales",
    backToHome: "Volver al inicio",
    lastUpdatedISO,
    privacy: {
      slug: "privacidad",
      title: "Aviso de privacidad",
      lead:
        "Este aviso describe qué datos personales recabamos cuando interactúas con " +
        COMPANY.shortName + ", para qué los usamos, con quién los compartimos y cómo " +
        "puedes ejercer tus derechos. Está redactado en cumplimiento de la Ley Federal " +
        "de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y " +
        "alineado con buenas prácticas internacionales.",
      lastUpdated: lastUpdated.es,
      sections: [
        {
          h: "1. Identidad y datos del responsable",
          body:
            COMPANY.legalName + " (en adelante, “" + COMPANY.shortName + "” o “nosotros”), " +
            "con domicilio en " + COMPANY.address + " y RFC " + COMPANY.rfc + ", es el " +
            "responsable del tratamiento de tus datos personales recabados a través del " +
            "sitio " + COMPANY.website + ".\n\n" +
            "Para cualquier asunto relacionado con este aviso, puedes contactarnos en " +
            COMPANY.contactEmail + ".",
        },
        {
          h: "2. Datos personales que recabamos",
          body:
            "Recabamos los siguientes datos personales cuando interactúas voluntariamente con nuestro sitio:\n\n" +
            "• Datos de identificación y contacto: nombre completo, correo electrónico corporativo, empresa, cargo y teléfono cuando los proporcionas en el formulario de solicitud de demostración.\n" +
            "• Contenido de tu mensaje: texto libre que envías a través del formulario de contacto.\n" +
            "• Datos técnicos y de navegación: dirección IP, tipo y versión de navegador, sistema operativo, páginas visitadas, tiempo de permanencia, sitio de referencia. Estos datos se recaban automáticamente mediante cookies y tecnologías similares (ver sección 5).\n\n" +
            "No recabamos datos personales sensibles según la definición de la LFPDPPP. " +
            "No recabamos datos de menores de edad de manera intencional.",
        },
        {
          h: "3. Finalidades del tratamiento",
          body:
            "Tratamos tus datos personales para las siguientes finalidades primarias (necesarias para la relación contigo):\n\n" +
            "• Atender tus solicitudes de información, demostración o cotización.\n" +
            "• Contactarte por los medios que nos proporcionaste para dar seguimiento a tu solicitud.\n" +
            "• Mantener un registro interno de prospectos y comunicaciones comerciales con tu empresa.\n" +
            "• Mejorar el funcionamiento, contenido y experiencia de uso del sitio mediante datos agregados de navegación.\n\n" +
            "Y para las siguientes finalidades secundarias, sujetas a tu consentimiento:\n\n" +
            "• Enviarte material informativo sobre actualizaciones del producto, casos de uso y eventos.\n" +
            "• Realizar análisis estadísticos y de mercado a partir de información agregada y anónima.\n\n" +
            "Si no deseas que tus datos sean tratados para las finalidades secundarias, puedes manifestarlo en cualquier momento escribiendo a " + COMPANY.contactEmail + ". La negativa al uso para finalidades secundarias no es motivo para que te neguemos los servicios solicitados.",
        },
        {
          h: "4. Transferencias de datos",
          body:
            "Tus datos personales pueden ser transferidos a los siguientes terceros, en su mayoría ubicados fuera de México, exclusivamente para los fines indicados:\n\n" +
            "• Google LLC (Estados Unidos): proveedor de Google Analytics 4 y Google Tag Manager para análisis de uso del sitio. Operamos bajo Consent Mode v2: las cookies de analítica solo se activan tras tu consentimiento explícito.\n" +
            "• Microsoft Corporation (Estados Unidos / Irlanda): proveedor de Azure Static Web Apps, donde está alojado el sitio.\n" +
            "• Google Cloud Functions / Firebase (Estados Unidos): procesamiento de los formularios de contacto cuando los envías.\n" +
            "• Google reCAPTCHA Enterprise (Estados Unidos): protección anti-bots de los formularios.\n\n" +
            "Los terceros listados están obligados, mediante términos contractuales o sus propios marcos de protección de datos, a tratar la información con confidencialidad y a aplicar medidas de seguridad razonables. No vendemos tus datos personales a terceros.",
        },
        {
          h: "5. Cookies y tecnologías similares",
          body:
            "Nuestro sitio utiliza las siguientes categorías de cookies:\n\n" +
            "• Cookies estrictamente necesarias: requeridas para el funcionamiento del sitio (incluyendo el almacenamiento de tus preferencias de cookies). No requieren consentimiento.\n" +
            "• Cookies de analítica: Google Analytics 4 a través de Google Tag Manager. Recolectan datos agregados sobre cómo se usa el sitio. Solo se activan si otorgas consentimiento.\n" +
            "• Cookies de marketing: pueden activarse por integraciones de remarketing (Google Ads). Solo se activan si otorgas consentimiento.\n\n" +
            "Implementamos Google Consent Mode v2: por defecto, todas las categorías opcionales están en estado “denied” hasta que otorgues tu consentimiento. Puedes modificar tus preferencias en cualquier momento haciendo clic en el botón “Configurar cookies” disponible en el aviso de cookies o en el pie de página.\n\n" +
            "Si rechazas las cookies opcionales, el sitio sigue funcionando sin restricciones, pero no podremos analizar de forma agregada cómo lo usas.",
        },
        {
          h: "6. Derechos ARCO y revocación del consentimiento",
          body:
            "De conformidad con la LFPDPPP, tienes derecho a:\n\n" +
            "• Acceder a los datos personales que tenemos sobre ti.\n" +
            "• Rectificar datos inexactos o incompletos.\n" +
            "• Cancelar el tratamiento cuando consideres que no se ajusta a este aviso o a la ley.\n" +
            "• Oponerte al uso de tus datos para fines específicos.\n\n" +
            "Adicionalmente, puedes revocar el consentimiento que nos hayas otorgado para el tratamiento de tus datos.\n\n" +
            "Para ejercer cualquiera de estos derechos, envía una solicitud por escrito a " + COMPANY.contactEmail + " incluyendo: (a) tu nombre y medio para recibir respuesta, (b) documento que acredite tu identidad, (c) descripción clara y precisa de los datos sobre los que ejerces el derecho, (d) cualquier elemento que facilite la localización de los datos.\n\n" +
            "Responderemos a tu solicitud en un plazo máximo de 20 días hábiles. Si la solicitud es procedente, dispondremos de 15 días hábiles adicionales para hacerla efectiva.",
        },
        {
          h: "7. Conservación de los datos",
          body:
            "Conservaremos tus datos personales por un periodo máximo de " + COMPANY.retentionMonths + " meses contados a partir del último contacto contigo, salvo que (a) exista una obligación legal que requiera mayor tiempo, o (b) hayas establecido una relación comercial vigente con " + COMPANY.shortName + ", en cuyo caso aplicarán los plazos correspondientes a dicha relación.\n\n" +
            "Pasado el periodo de conservación, tus datos serán eliminados o anonimizados de forma segura.",
        },
        {
          h: "8. Medidas de seguridad",
          body:
            "Adoptamos medidas administrativas, técnicas y físicas razonables para proteger tus datos contra daño, pérdida, alteración, destrucción o uso no autorizado. Estas medidas incluyen, entre otras: cifrado en tránsito (TLS), control de accesos basado en roles, registro de auditoría de accesos, y revisiones periódicas de los proveedores con los que compartimos datos.\n\n" +
            "Ningún sistema es completamente invulnerable. Si detectamos un incidente de seguridad que afecte tus datos personales, te informaremos sin demora indebida y conforme a lo previsto por la LFPDPPP.",
        },
        {
          h: "9. Cambios al aviso de privacidad",
          body:
            "Podremos actualizar este aviso de privacidad para reflejar cambios en nuestras prácticas, en la legislación aplicable o en los servicios que ofrecemos. La fecha al inicio del documento indica la última actualización.\n\n" +
            "Cuando los cambios sean sustanciales (por ejemplo, nuevas finalidades o nuevos terceros con los que compartamos datos), te lo haremos saber por los medios de contacto que nos hayas proporcionado, o mediante un aviso destacado en el sitio.",
        },
        {
          h: "10. Autoridad de protección de datos y contacto",
          body:
            "Si consideras que tu derecho a la protección de datos personales ha sido vulnerado, puedes presentar una denuncia ante el Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI): https://home.inai.org.mx.\n\n" +
            "Para cualquier consulta relacionada con este aviso, escríbenos a " + COMPANY.contactEmail + ".",
        },
      ],
    },
    terms: {
      slug: "terminos",
      title: "Términos de uso",
      lead:
        "Estos términos regulan el acceso y uso del sitio " + COMPANY.website + " operado por " + COMPANY.shortName + ". Al acceder al sitio, aceptas estos términos. Si no estás de acuerdo, te pedimos no utilizar el sitio.",
      lastUpdated: lastUpdated.es,
      sections: [
        {
          h: "1. Aceptación de los términos",
          body:
            "El acceso y uso del sitio constituye tu aceptación de estos términos y del aviso de privacidad. Si actúas en nombre de una empresa, declaras tener facultades suficientes para vincular a esa empresa con estos términos.",
        },
        {
          h: "2. Uso aceptable",
          body:
            "Te comprometes a usar el sitio de forma legal, ética y conforme a su propósito informativo y comercial. En particular, no debes:\n\n" +
            "• Intentar obtener acceso no autorizado a sistemas, redes o cuentas.\n" +
            "• Realizar acciones automatizadas masivas que afecten el funcionamiento del sitio (scraping, denegación de servicio, etc.).\n" +
            "• Interferir con la operación del sitio o con la experiencia de otros usuarios.\n" +
            "• Enviar a través de los formularios información falsa, suplantar identidad o usar datos de terceros sin autorización.\n" +
            "• Reproducir, distribuir o aprovechar comercialmente el contenido del sitio sin nuestro consentimiento expreso.",
        },
        {
          h: "3. Propiedad intelectual",
          body:
            "Todos los contenidos del sitio (textos, imágenes, gráficos, ilustraciones, logotipos, marcas, código fuente del front-end, así como el producto Horizon Logix y sus componentes) son propiedad de " + COMPANY.shortName + " o de sus licenciantes, y están protegidos por las leyes de propiedad intelectual aplicables.\n\n" +
            "Se te concede una licencia limitada, no exclusiva y revocable para visualizar el sitio para fines personales y de evaluación comercial. No se otorga ningún otro derecho.",
        },
        {
          h: "4. Información proporcionada en el sitio",
          body:
            "El contenido del sitio es informativo. Aunque procuramos mantenerlo actualizado y preciso, no garantizamos que esté libre de errores u omisiones. Las cifras de rendimiento, casos de uso y métricas de impacto referidas en el sitio son referenciales y dependen de la implementación específica en cada cliente.\n\n" +
            "Cualquier propuesta comercial vinculante será formalizada por escrito y por separado.",
        },
        {
          h: "5. Limitación de responsabilidad",
          body:
            "En la medida permitida por la ley, " + COMPANY.shortName + " no será responsable por daños indirectos, incidentales, consecuenciales, especiales o punitivos derivados del uso o imposibilidad de uso del sitio, incluyendo pérdida de utilidades, ingresos o datos, aún cuando hubiéramos sido advertidos de la posibilidad de tales daños.\n\n" +
            "Esta limitación no aplica en casos de dolo, negligencia grave o cuando la legislación aplicable no permita su exclusión.",
        },
        {
          h: "6. Enlaces a sitios de terceros",
          body:
            "El sitio puede contener enlaces a sitios web de terceros (por ejemplo, partners tecnológicos como Zebra o Impinj, o redes sociales). No controlamos esos sitios ni respondemos por su contenido, prácticas de privacidad o disponibilidad.",
        },
        {
          h: "7. Modificaciones a los términos",
          body:
            "Podremos modificar estos términos en cualquier momento. La versión vigente es siempre la publicada en esta página. El uso continuado del sitio después de una modificación constituye tu aceptación de los términos actualizados.",
        },
        {
          h: "8. Ley aplicable y jurisdicción",
          body:
            "Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier controversia derivada de estos términos o del uso del sitio será resuelta por los tribunales competentes de [Ciudad / Estado], renunciando expresamente a cualquier otro fuero que pudiera corresponderles.",
        },
        {
          h: "9. Contacto",
          body:
            "Para cualquier asunto relacionado con estos términos, escríbenos a " + COMPANY.generalEmail + ".",
        },
      ],
    },
  },
  en: {
    eyebrow: "Legal documents",
    backToHome: "Back to home",
    lastUpdatedISO,
    privacy: {
      slug: "privacy",
      title: "Privacy notice",
      lead:
        "This notice describes what personal data we collect when you interact with " + COMPANY.shortName + ", how we use it, who we share it with, and how you can exercise your rights. It is drafted in compliance with Mexico's Federal Law on the Protection of Personal Data Held by Private Parties (LFPDPPP) and aligned with international good-practice standards.",
      lastUpdated: lastUpdated.en,
      sections: [
        {
          h: "1. Identity and contact of the data controller",
          body:
            COMPANY.legalName + " (hereinafter, “" + COMPANY.shortName + "” or “we”), with registered office at " + COMPANY.address + " and tax ID " + COMPANY.rfc + ", is the controller responsible for the processing of personal data collected through the " + COMPANY.website + " website.\n\n" +
            "For any matter related to this notice, you can reach us at " + COMPANY.contactEmail + ".",
        },
        {
          h: "2. Personal data we collect",
          body:
            "We collect the following personal data when you voluntarily interact with our site:\n\n" +
            "• Identification and contact data: full name, business email address, company, role and phone number, when you provide them in the demo request form.\n" +
            "• Message content: free-text you send through the contact form.\n" +
            "• Technical and browsing data: IP address, browser type and version, operating system, pages visited, time on site, referring site. This data is collected automatically through cookies and similar technologies (see section 5).\n\n" +
            "We do not collect sensitive personal data as defined by the LFPDPPP. We do not knowingly collect personal data from minors.",
        },
        {
          h: "3. Purposes of processing",
          body:
            "We process your personal data for the following primary purposes (necessary for our relationship with you):\n\n" +
            "• Responding to your information, demo or quote requests.\n" +
            "• Contacting you through the means you provided to follow up on your request.\n" +
            "• Maintaining an internal record of prospects and commercial communications with your company.\n" +
            "• Improving the operation, content and user experience of the site through aggregated browsing data.\n\n" +
            "And for the following secondary purposes, subject to your consent:\n\n" +
            "• Sending you informational material about product updates, use cases and events.\n" +
            "• Performing statistical and market analysis based on aggregated and anonymized data.\n\n" +
            "If you do not wish your data to be processed for the secondary purposes, you can opt out at any time by writing to " + COMPANY.contactEmail + ". Refusing the use of your data for secondary purposes is not grounds for us to deny you the requested services.",
        },
        {
          h: "4. Data transfers",
          body:
            "Your personal data may be transferred to the following third parties, mostly located outside Mexico, exclusively for the purposes indicated:\n\n" +
            "• Google LLC (United States): provider of Google Analytics 4 and Google Tag Manager for site usage analysis. We operate under Consent Mode v2: analytics cookies are activated only after your explicit consent.\n" +
            "• Microsoft Corporation (United States / Ireland): provider of Azure Static Web Apps, where the site is hosted.\n" +
            "• Google Cloud Functions / Firebase (United States): processing of contact forms when you submit them.\n" +
            "• Google reCAPTCHA Enterprise (United States): anti-bot protection for forms.\n\n" +
            "The third parties listed are obligated, through contractual terms or their own data protection frameworks, to handle the information confidentially and apply reasonable security measures. We do not sell your personal data to third parties.",
        },
        {
          h: "5. Cookies and similar technologies",
          body:
            "Our site uses the following categories of cookies:\n\n" +
            "• Strictly necessary cookies: required for the operation of the site (including storing your cookie preferences). They do not require consent.\n" +
            "• Analytics cookies: Google Analytics 4 via Google Tag Manager. They collect aggregate data on how the site is used. They are activated only if you grant consent.\n" +
            "• Marketing cookies: may be activated by remarketing integrations (Google Ads). They are activated only if you grant consent.\n\n" +
            "We implement Google Consent Mode v2: by default, all optional categories are in the “denied” state until you grant your consent. You can modify your preferences at any time by clicking the “Manage cookies” button available in the cookie notice or in the footer.\n\n" +
            "If you reject optional cookies, the site continues to function without restrictions, but we will not be able to analyze in aggregate how you use it.",
        },
        {
          h: "6. Data subject rights and withdrawal of consent",
          body:
            "In accordance with the LFPDPPP, you have the right to:\n\n" +
            "• Access the personal data we hold about you.\n" +
            "• Rectify data that is inaccurate or incomplete.\n" +
            "• Cancel processing when you consider that it does not conform to this notice or to the law.\n" +
            "• Object to the use of your data for specific purposes.\n\n" +
            "Additionally, you can withdraw any consent you have granted us for the processing of your data.\n\n" +
            "To exercise any of these rights, send a written request to " + COMPANY.contactEmail + " including: (a) your name and means of receiving a response, (b) a document proving your identity, (c) a clear and precise description of the data on which you are exercising the right, (d) any element that facilitates locating the data.\n\n" +
            "We will respond to your request within a maximum of 20 business days. If the request is granted, we will have an additional 15 business days to make it effective.",
        },
        {
          h: "7. Data retention",
          body:
            "We will keep your personal data for a maximum period of " + COMPANY.retentionMonths + " months from your last contact with us, unless (a) a legal obligation requires longer retention, or (b) you have established an active commercial relationship with " + COMPANY.shortName + ", in which case the periods corresponding to that relationship will apply.\n\n" +
            "After the retention period, your data will be securely deleted or anonymized.",
        },
        {
          h: "8. Security measures",
          body:
            "We adopt reasonable administrative, technical and physical measures to protect your data against damage, loss, alteration, destruction or unauthorized use. These measures include, among others: encryption in transit (TLS), role-based access control, audit logging of accesses, and periodic reviews of the providers with whom we share data.\n\n" +
            "No system is completely invulnerable. If we detect a security incident that affects your personal data, we will inform you without undue delay and in accordance with the provisions of the LFPDPPP.",
        },
        {
          h: "9. Changes to the privacy notice",
          body:
            "We may update this privacy notice to reflect changes in our practices, in applicable law, or in the services we offer. The date at the top of the document indicates the last update.\n\n" +
            "When changes are substantive (for example, new purposes or new third parties with whom we share data), we will let you know through the contact means you have provided, or through a prominent notice on the site.",
        },
        {
          h: "10. Data protection authority and contact",
          body:
            "If you believe your right to personal data protection has been violated, you can file a complaint with the National Institute for Transparency, Access to Information and Personal Data Protection (INAI): https://home.inai.org.mx.\n\n" +
            "For any inquiry related to this notice, write to us at " + COMPANY.contactEmail + ".",
        },
      ],
    },
    terms: {
      slug: "terms",
      title: "Terms of use",
      lead:
        "These terms govern access to and use of the " + COMPANY.website + " site, operated by " + COMPANY.shortName + ". By accessing the site, you accept these terms. If you do not agree, please do not use the site.",
      lastUpdated: lastUpdated.en,
      sections: [
        {
          h: "1. Acceptance of terms",
          body:
            "Access to and use of the site constitutes your acceptance of these terms and of the privacy notice. If you act on behalf of a company, you represent that you have sufficient authority to bind that company to these terms.",
        },
        {
          h: "2. Acceptable use",
          body:
            "You agree to use the site in a lawful, ethical manner and consistent with its informational and commercial purpose. In particular, you must not:\n\n" +
            "• Attempt to gain unauthorized access to systems, networks or accounts.\n" +
            "• Perform large-scale automated actions that affect the operation of the site (scraping, denial of service, etc.).\n" +
            "• Interfere with the operation of the site or with the experience of other users.\n" +
            "• Submit through forms false information, impersonate someone else, or use third-party data without authorization.\n" +
            "• Reproduce, distribute or commercially exploit the content of the site without our express consent.",
        },
        {
          h: "3. Intellectual property",
          body:
            "All site content (text, images, graphics, illustrations, logos, trademarks, front-end source code, as well as the Horizon Logix product and its components) is the property of " + COMPANY.shortName + " or its licensors, and is protected by applicable intellectual property laws.\n\n" +
            "You are granted a limited, non-exclusive and revocable license to view the site for personal and commercial-evaluation purposes. No other rights are granted.",
        },
        {
          h: "4. Information provided on the site",
          body:
            "The content of the site is informational. Although we strive to keep it up to date and accurate, we do not guarantee that it is free of errors or omissions. The performance figures, use cases and impact metrics referenced on the site are illustrative and depend on the specific implementation at each customer.\n\n" +
            "Any binding commercial proposal will be formalized in writing and separately.",
        },
        {
          h: "5. Limitation of liability",
          body:
            "To the extent permitted by law, " + COMPANY.shortName + " will not be liable for indirect, incidental, consequential, special or punitive damages arising from the use or inability to use the site, including loss of profits, revenue or data, even if we have been advised of the possibility of such damages.\n\n" +
            "This limitation does not apply in cases of willful misconduct, gross negligence, or where applicable law does not allow its exclusion.",
        },
        {
          h: "6. Links to third-party sites",
          body:
            "The site may contain links to third-party websites (for example, technology partners such as Zebra or Impinj, or social networks). We do not control those sites and are not responsible for their content, privacy practices or availability.",
        },
        {
          h: "7. Changes to the terms",
          body:
            "We may modify these terms at any time. The current version is always the one published on this page. Continued use of the site after a modification constitutes your acceptance of the updated terms.",
        },
        {
          h: "8. Governing law and jurisdiction",
          body:
            "These terms are governed by the laws of the United Mexican States. Any dispute arising from these terms or from the use of the site will be resolved by the competent courts of [City / State], expressly waiving any other jurisdiction that might apply to them.",
        },
        {
          h: "9. Contact",
          body:
            "For any matter related to these terms, write to us at " + COMPANY.generalEmail + ".",
        },
      ],
    },
  },
};

// Maps a path to its language twin (used by LangSwitch on legal pages).
export const ROUTE_TWINS = {
  "/privacidad": "/privacy",
  "/privacy": "/privacidad",
  "/terminos": "/terms",
  "/terms": "/terminos",
};

// Maps a path to the language it forces (used by App to sync lang state).
export const ROUTE_LANG = {
  "/privacidad": "es",
  "/privacy": "en",
  "/terminos": "es",
  "/terms": "en",
};
