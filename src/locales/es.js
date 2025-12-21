export default {
  common: {
    offline: "Estás desconectado actualmente.",
  },
  redirect: {
    launching: "Iniciando Aplicación...",
    did_open: "¿Se abrió la app?",
    open_again: "Abrir App de Nuevo",
    get_on_store: "Obtener en Play Store"
  },
  error: {
    title: "Fallo del Sistema",
    desc_1: "Ocurrió algo inesperado en el núcleo de la aplicación.",
    desc_2: "No te preocupes, no se perdieron datos.",
    reload: "Recargar Sistema",
    home: "Volver al Inicio",
    show_details: "Mostrar Detalles Técnicos",
    hide_details: "Ocultar Detalles Técnicos",
    copy: "Copiar",
    copied: "Copiado"
  },
  hero: {
    greeting: "Hola, soy",
    role_prefix: "Desarrollo",
    roles: ["Apps Android", "Sistemas Backend", "Experiencias de Usuario", "Soluciones Digitales"],
    cta_primary: "Ver Proyectos",
    cta_secondary: "Contactar"
  },
  not_found: {
    page_title: "Página No Encontrada",
    title: "404",
    subtitle: "¡Ups! Hacia el vacío.",
    message: "La página que buscas no existe actualmente.",
    suggestion_title: "¿Buscabas esto?",
    suggestion_desc: "Basado en tu enlace, creemos que querías ir a",
    suggestion_btn: "Sí, Ir Allí",
    home_btn: "Ir al Inicio",
    apps_btn: "Ver Apps"
  },
  about: {
    title: "Sobre Mí",
    subtitle: "Ingeniería y Diseño se encuentran",
    bio_1: "Soy Fernando Vaz, Ingeniero de Software graduado en UniCesumar, apasionado por la intersección entre código robusto y diseño intuitivo.",
    bio_2: "Especializado en el ecosistema Android (Kotlin/Jetpack Compose) y Backends escalables (Spring Boot). Creo soluciones que no solo son funcionales, sino agradables de usar.",
    stats: {
      exp: "Años de Exp.",
      projects: "Proyectos",
      clients: "Clientes Felices"
    },
    cards: {
      education: { title: "Educación", value: "Ingeniería de Software", sub: "UniCesumar" },
      location: { title: "Ubicación", value: "Salvador, Brasil", sub: "GMT-3" },
      stack: { title: "Stack Principal", value: "Kotlin y Java", sub: "Full Cycle Dev" }
    }
  },
  projects: {
    title: "Trabajos Seleccionados",
    subtitle: "Una muestra de profundidad técnica y resolución creativa de problemas.",
    view_project: "Ver Caso de Estudio",
    source_code: "Código Fuente",
    items: [
      {
        id: "pixel_pulse",
        title: "Pixel Pulse",
        category: "Ingeniería Android",
        desc: "Medidor de nivel de sonido avanzado con análisis FFT en tiempo real, persistencia en base de datos Room y servicios en segundo plano optimizados con WorkManager.",
        tags: ["Kotlin", "Compose", "FFT", "Room"],
        icon_url: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Pulse/art/phone.svg",
        link: "/PixelPulse?page=index",
        repo: "https://github.com/fertwbr/PixelPulse",
        color: "primary",
        icon: "equalizer"
      },
      {
        id: "pixel_compass",
        title: "Pixel Compass",
        category: "Wear OS y Móvil",
        desc: "Herramienta de navegación premium con algoritmos de fusión de sensores, widgets Jetpack Glance y arquitectura multimodular para una clara separación de responsabilidades.",
        tags: ["Wear OS", "Sensores", "Glance", "Retrofit"],
        icon_url: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Compass/art/phone.svg",
        link: "/PixelCompass?page=index",
        repo: "https://github.com/fertwbr/PixelCompass",
        color: "secondary",
        icon: "explore"
      },
      {
        id: "portfolio_site",
        title: "Este Portafolio",
        category: "Ingeniería Web",
        desc: "Una inmersión profunda en la arquitectura de este mismo sitio. Construido con React, Material Design 3 y un motor de Markdown personalizado.",
        tags: ["React", "Vite", "Material 3", "Framer Motion"],
        icon: "web",
        link: "/site/overview",
        repo: "https://github.com/fertwbr/fertwbr.github.io",
        color: "tertiary"
      },
      {
        id: "box_idea",
        title: "boxIdea",
        category: "Full Stack Web",
        desc: "Plataforma de innovación corporativa que permite a los equipos enviar, votar y rastrear ideas. Construido con Spring Boot Security y PostgreSQL.",
        tags: ["Spring Boot", "Java", "PostgreSQL", "JWT"],
        link: "https://github.com/FertwBr/boxIdea",
        repo: "https://github.com/FertwBr/boxIdea",
        color: "tertiary",
        icon: "lightbulb"
      }
    ]
  },
  tech: {
    title: "Tecnologías",
    subtitle: "Herramientas que uso para dar vida a las ideas"
  },
  github: {
    title: "Open Source",
    stats: {
      contributions: "Contribuciones del Año",
      repos: "Repositorios",
      stars: "Estrellas Totales"
    }
  },
  contact: {
    title: "Trabajemos Juntos",
    desc: "¿Tienes un proyecto en mente o quieres discutir lo último en tecnología Android?",
    email: "Enviar Email",
    linkedin: "LinkedIn",
    github: "GitHub"
  },
  footer: {
    rights: "Todos los derechos reservados.",
    built: "Diseñado y Construido por Fernando Vaz 🇧🇷",
    useful_links: "Enlaces Útiles",
    social_title: "Conectar",
    appearance: {
      title: "Tema y Apariencia",
      language_selector: "Idioma",
      en: "Inglés",
      pt: "Portugués"
    }
  },
  pixel_pulse: {
    nav: {
      index: "Resumen",
      plus: "Pixel Pulse+",
      changelog: "Actualizaciones",
      roadmap: "Hoja de Ruta",
      privacy: "Privacidad",
      help: "Ayuda",
      overview: "Docs",
      back: "Volver al Portafolio"
    },
    hero: {
      title: "Tu Coach de Sonido Inteligente",
      subtitle: "Mide tu mundo con estilo y precisión. Bellamente diseñado para Android.",
      download: "Descargar en Play Store"
    },
    new_features: {
      label: "Nuevo en v1.17",
      title: "Personalización Profunda",
      view_history: "Ver Historial Completo",
      items: [
        {
          icon: "edit_attributes",
          title: "Editor de Barra de Herramientas",
          desc: "Arrastra y suelta para personalizar tu espacio. Pon tus herramientas más usadas exactamente donde las necesitas."
        },
        {
          icon: "palette",
          title: "9 Nuevos Temas",
          desc: "Desde Esmeralda hasta Atardecer. Además de un modo AMOLED negro real para ahorrar batería mientras mides."
        },
        {
          icon: "share",
          title: "Exportación de Imágenes",
          desc: "Comparte tus gráficos y estadísticas de sesión como hermosas imágenes directamente en redes sociales."
        }
      ]
    },
    plus_teaser: {
      title: "Desbloquea la Experiencia Definitiva",
      description: "Pasa de reactivo a proactivo con análisis automatizados. Actualiza a **Pixel Pulse+** para proteger tu salud auditiva continuamente.",
      cta: "Descubre Pixel Pulse+",
      items: [
        {
          icon: "shield",
          title: "Presupuesto de Ruido",
          desc: "El seguimiento semanal basado en la OMS asegura que te mantengas dentro de límites seguros."
        },
        {
          icon: "notifications_active",
          title: "Alertas Proactivas",
          desc: "Recibe notificaciones antes de que ocurra daño con chequeos inteligentes en segundo plano."
        },
        {
          icon: "auto_awesome",
          title: "Monitoreo Automático",
          desc: "Seguimiento eficiente de exposición en segundo plano sin agotar la batería."
        },
        {
          icon: "table_chart",
          title: "Exportación CSV",
          desc: "Propiedad total de datos. Exporta tu historial para un análisis detallado."
        },
        {
          icon: "palette",
          title: "9 Temas Premium",
          desc: "Desbloquea los modos Emerald, Sunset y negro puro AMOLED."
        },
        {
          icon: "equalizer",
          title: "Ponderación Pro",
          desc: "Accede a Ponderación C y Ponderación Z para mediciones técnicas."
        }
      ]
    },
    features: {
      title: "Un Kit de Herramientas Potente, Gratis para Todos",
      cta_project: "Explorar Resumen Técnico",
      items: [
        {
          title: "Medidor Expresivo en Tiempo Real",
          desc: "Indicador animado con cambios de color dinámicos de azules tranquilos a rojos de advertencia."
        },
        {
          title: "Historial de Sesiones",
          desc: "Guarda mediciones y analiza detalles con gráficos interactivos."
        },
        {
          title: "Calibración de Precisión",
          desc: "Ajusta el sensor contra un dispositivo de referencia para una precisión profesional."
        },
        {
          title: "Material You",
          desc: "Se adapta a la paleta de colores de tu fondo de pantalla para un aspecto único."
        }
      ]
    },
    plus: {
      title: "Desbloquea la Experiencia Definitiva",
      desc: "Pasa de reactivo a proactivo con análisis automatizado.",
      cta: "Descubrir Pixel Pulse+"
    },
    plus_page: {
      title: "Eleva Tu Experiencia",
      badge: "Pago Único",
      cta: "Desbloquear Acceso Vitalicio",
      disclaimer: "Sin suscripciones. Sin cargos ocultos.",
      why_title: "¿Por qué un Pago Único?",
      features_title: "La Ventaja Plus",
      features_subtitle: "Visualizando el poder que obtienes al instante.",
      faq_title: "Preguntas Frecuentes"
    },
    privacy_section: {
      title: "Privacidad Primero",
      cta_policy: "Leer Política de Privacidad",
      cta_tech: "Detalles Técnicos",
      cards: [
        {
          icon: "mic_off",
          title: "Audio No Grabado",
          desc: "El audio sin procesar se analiza al instante y se descarta. Nunca guardamos tus conversaciones."
        },
        {
          icon: "phonelink_lock",
          title: "Solo en el Dispositivo",
          desc: "Todo el análisis ocurre en tu teléfono. Tus datos nunca salen de tu dispositivo."
        },
        {
          icon: "block",
          title: "Sin Anuncios ni Rastreadores",
          desc: "Una experiencia limpia sin seguimiento de terceros ni publicidad invasiva."
        },
        {
          icon: "visibility",
          title: "Almacenamiento Transparente",
          desc: "Tienes el control total. Exporta o elimina tu historial de sesiones en cualquier momento."
        }
      ]
    },
    footer: {
      rights: "Pixel Pulse. Todos los derechos reservados.",
      links: "Enlaces Útiles",
      theme_title: "Tema y Apariencia"
    },
    changelog: {
      title: "Historial de Versiones",
      subtitle: "Sigue la evolución de Pixel Pulse. Cada función, mejora y corrección detallada a continuación.",
      search_placeholder: "Buscar funciones, versiones (ej. 1.15, Beta)...",
      latest_release: "Último Lanzamiento",
      released: "Lanzado",
      update_now: "Actualizar Ahora",
      on_this_page: "En Esta Página",
      load_more: "Cargar Versiones Anteriores",
      no_results: "No se encontraron versiones que coincidan con tus filtros.",
      jump_to: "Ir a la Versión",
      read_more: "Leer Notas de la Versión",
      collapse: "Colapsar",
      back_to_top: "Volver Arriba",
      plus_promo: {
        title: "Apoya el Desarrollo",
        subtitle: "Desbloquea el auto-monitoreo y ayúdanos a construir nuevas funciones.",
        cta: "Obtener Pixel Pulse+"
      },
      beta_program: {
        title: "Únete a la Beta",
        subtitle: "Prueba nuevas funciones antes de que se lancen públicamente.",
        cta: "Unirse al Programa Beta",
        badge: "Acceso Anticipado"
      },
      wear_os_promo: {
        title: "Experiencia Wear OS",
        subtitle_available: "Navega directamente desde tu muñeca. Integración perfecta.",
        subtitle_coming: "Disponible para tu muñeca en el primer trimestre de 2026.",
        cta: "Ver en el Reloj",
        badge: "Complemento"
      }
    },
    privacy_page: {
      page_title: "Política de Privacidad",
      last_updated: "Última Actualización:",
      table_of_contents: "Tabla de Contenidos",
      contact_title: "¿Tienes Preguntas?",
      contact_desc: "Si tienes alguna inquietud sobre tus datos, por favor contáctanos.",
      contact_btn: "Contactar Soporte",
      print_btn: "Imprimir Política"
    },
    help_page: {
      page_title: "Ayuda y Preguntas Frecuentes",
      subtitle: "Encuentra respuestas y aprende cómo aprovechar al máximo Pixel Pulse.",
      search_placeholder: "Buscar respuestas (ej. Calibración, Exportar)...",
      table_of_contents: "Temas",
      contact_title: "¿Sigues atascado?",
      contact_desc: "¿No encuentras lo que buscas? Nuestro equipo está aquí para ayudar.",
      contact_btn: "Contactar Soporte",
      no_results: "No se encontraron temas que coincidan con tu búsqueda."
    },
    roadmap_page: {
      title: "Hoja de Ruta del Producto",
      subtitle: "Mira lo que hemos construido y hacia dónde nos dirigimos.",
      suggest_btn: "Sugerir una Función",
      toc_title: "Línea de Tiempo"
    },
    overview_page: {
      title: "Resumen Técnico",
      subtitle: "Sumérgete en la arquitectura, el stack tecnológico y la ingeniería de privacidad.",
      github_btn: "Ver en GitHub",
      toc_title: "En Esta Página"
    },
  },
  pixel_compass: {
    nav: {
      index: "Resumen",
      plus: "Pixel Compass+",
      changelog: "Actualizaciones",
      roadmap: "Hoja de Ruta",
      privacy: "Privacidad",
      help: "Ayuda",
      overview: "Docs",
      back: "Volver al Portafolio"
    },
    hero: {
      title: "Tu Brújula Inteligente para Celular y Reloj",
      subtitle: "Navega tu mundo con estilo, precisión y un toque de magia Material 3. El compañero de navegación definitivo para Android.",
      download: "Descargar en Play Store"
    },
    new_features: {
      label: "Nuevo en v1.15 Beta",
      title: "Experiencia Unificada",
      view_history: "Ver Historial Completo",
      items: [
        {
          icon: "responsive_layout",
          title: "Diseños Responsivos",
          desc: "Pantallas de 'Bienvenida' y 'Plan' completamente rediseñadas y optimizadas para Plegables y Tablets."
        },
        {
          icon: "error",
          title: "Errores Más Inteligentes",
          desc: "La app ahora maneja los errores de la API del clima con mensajes claros y útiles."
        },
        {
          icon: "palette",
          title: "Pulido Visual",
          desc: "Colores de superficie del Tema AMOLED actualizados y scrims dinámicos en la barra de estado añadidos."
        }
      ]
    },
    plus_teaser_compass: {
      title: "Eleva Tu Experiencia",
      description: "Actualiza a **Pixel Compass+** y desbloquea un conjunto de herramientas profesionales diseñadas para la precisión. Obtén acceso exclusivo a potentes widgets, datos ambientales avanzados y gráficos interactivos.",
      cta: "Descubre Pixel Compass+",
      items: [
        {
          icon: "widgets",
          title: "Suite de Widgets",
          desc: "Widgets exclusivos de Reloj, Clima y Brújula para tu pantalla de inicio."
        },
        {
          icon: "query_stats",
          title: "Gráficos de Pronóstico",
          desc: "Toca cualquier tarjeta para ver tendencias por hora de Lluvia, Viento y UV."
        },
        {
          icon: "insights",
          title: "Información Inteligente",
          desc: "Alertas proactivas como 'Lluvia comenzando pronto' o 'Índice UV alto'."
        },
        {
          icon: "air",
          title: "Barómetro y Viento",
          desc: "Seguimiento de presión en tiempo real y dirección del viento en la brújula."
        },
        {
          icon: "wb_sunny",
          title: "Sol y Luna",
          desc: "Horas precisas de amanecer, atardecer y seguimiento de la trayectoria solar."
        },
        {
          icon: "speed",
          title: "Preciso",
          desc: "Actualización de datos meteorológicos y de elevación hasta 4 veces más rápida que la versión gratuita."
        }
      ]
    },

    plus_teaser: {
      title: "Desbloquea la Experiencia Definitiva",
      description: "Pasa de reactivo a proactivo con análisis automatizados. Actualiza a **Pixel Pulse+** para proteger tu salud auditiva continuamente.",
      cta: "Descubre Pixel Pulse+",
      items: [
        {
          icon: "shield",
          title: "Presupuesto de Ruido",
          desc: "El seguimiento semanal basado en la OMS asegura que te mantengas dentro de límites seguros."
        },
        {
          icon: "notifications_active",
          title: "Alertas Proactivas",
          desc: "Recibe notificaciones antes de que ocurra daño con chequeos inteligentes en segundo plano."
        },
        {
          icon: "auto_awesome",
          title: "Monitoreo Automático",
          desc: "Seguimiento eficiente de exposición en segundo plano sin agotar la batería."
        },
        {
          icon: "table_chart",
          title: "Exportación CSV",
          desc: "Propiedad total de datos. Exporta tu historial para un análisis detallado."
        },
        {
          icon: "palette",
          title: "9 Temas Premium",
          desc: "Desbloquea los modos Emerald, Sunset y negro puro AMOLED."
        },
        {
          icon: "equalizer",
          title: "Ponderación Pro",
          desc: "Accede a Ponderación C y Ponderación Z para mediciones técnicas."
        }
      ]
    },
    features: {
      title: "Kit de Precisión",
      cta_project: "Explorar Resumen Técnico",
      items: [
        {
          title: "Navegación de Precisión",
          desc: "Alterna entre Norte Magnético y Verdadero con precisión profesional y retroalimentación háptica."
        },
        {
          title: "Entorno Inteligente",
          desc: "Altitud, temperatura e índice UV en tiempo real con alertas proactivas del Insight Engine 4.0."
        },
        {
          title: "Herramienta de Nivel Innovadora",
          desc: "Verifica niveles de superficie con animaciones expresivas: efectos de onda y olas fluidas."
        },
        {
          title: "Widgets Adaptables",
          desc: "Hermosos widgets de pantalla de inicio que cambian de tamaño inteligentemente desde 1x1 hasta paneles completos."
        }
      ]
    },
    plus: {
      title: "Desbloquea la Experiencia Definitiva",
      desc: "Obtén widgets exclusivos, gráficos de pronóstico avanzados, fondos de pantalla en la nube y elimina anuncios.",
      cta: "Descubrir Pixel Compass+"
    },
    plus_page: {
      title: "Eleva Tu Experiencia",
      badge: "Opciones Flexibles",
      cta: "Desbloquear Ahora",
      disclaimer: "Opciones de Suscripción o Vitalicia disponibles.",
      why_title: "¿Por qué ser Plus?",
      features_title: "La Ventaja Plus",
      features_subtitle: "Visualizando el poder que obtienes al instante.",
      faq_title: "Preguntas Frecuentes"
    },
    privacy_section: {
      title: "Privacidad Primero",
      cta_policy: "Leer Política",
      cta_tech: "Detalles Técnicos",
      cards: [
        {
          icon: "location_off",
          title: "Sin Rastreo Oculto",
          desc: "La ubicación solo se usa para navegación y clima cuando la app está activa."
        },
        {
          icon: "phonelink_lock",
          title: "Procesamiento en Dispositivo",
          desc: "Los datos del sensor se procesan completamente de forma local en tu dispositivo."
        },
        {
          icon: "cloud_off",
          title: "Datos Transparentes",
          desc: "No almacenamos tu historial de ubicación ni detalles de pago en nuestros servidores."
        },
        {
          icon: "block",
          title: "Opción Sin Publicidad",
          desc: "Plus elimina todos los anuncios de terceros para una experiencia más limpia y rápida."
        }
      ]
    },
    footer: {
      links: "Enlaces Útiles",
      rights: "Pixel Compass. Todos los derechos reservados.",
      theme_title: "Tema y Apariencia"
    },
    changelog: {
      title: "Historial de Versiones",
      subtitle: "Sigue la evolución de Pixel Compass. Cada función, mejora y corrección detallada a continuación.",
      search_placeholder: "Buscar funciones, versiones...",
      latest_release: "Último Lanzamiento",
      released: "Lanzado",
      update_now: "Actualizar Ahora",
      on_this_page: "En Esta Página",
      load_more: "Cargar Versiones Anteriores",
      no_results: "No se encontraron versiones que coincidan con tus filtros.",
      jump_to: "Ir a la Versión",
      read_more: "Leer Notas de la Versión",
      collapse: "Colapsar",
      back_to_top: "Volver Arriba",
      plus_promo: {
        title: "Apoya el Desarrollo",
        subtitle: "Desbloquea widgets y personalización y ayúdanos a construir nuevas funciones.",
        cta: "Obtener Pixel Compass+"
      },
      beta_program: {
        title: "Únete a la Beta",
        subtitle: "Prueba nuevas funciones antes de que se lancen públicamente.",
        cta: "Unirse al Programa Beta",
        badge: "Acceso Anticipado"
      },
      wear_os_promo: {
        title: "Experiencia Wear OS",
        subtitle_available: "Navega directamente desde tu muñeca. Integración perfecta.",
        subtitle_coming: "Disponible para tu muñeca en el primer trimestre de 2026.",
        cta: "Ver en el Reloj",
        badge: "Complemento"
      }
    },
    roadmap_page: {
      title: "Hoja de Ruta del Producto",
      subtitle: "Mira lo que hemos construido y hacia dónde nos dirigimos.",
      suggest_btn: "Sugerir una Función",
      toc_title: "Línea de Tiempo"
    },
    privacy_page: {
      page_title: "Política de Privacidad",
      last_updated: "Última Actualización:",
      table_of_contents: "Tabla de Contenidos",
      contact_title: "¿Tienes Preguntas?",
      contact_desc: "Si tienes alguna inquietud sobre tus datos, por favor contáctanos.",
      contact_btn: "Contactar Soporte",
      print_btn: "Imprimir Política"
    },
    help_page: {
      page_title: "Ayuda y Preguntas Frecuentes",
      subtitle: "Encuentra respuestas y aprende cómo aprovechar al máximo Pixel Compass.",
      search_placeholder: "Buscar respuestas...",
      table_of_contents: "Temas",
      contact_title: "¿Sigues atascado?",
      contact_desc: "¿No encuentras lo que buscas? Nuestro equipo está aquí para ayudar.",
      contact_btn: "Contactar Soporte",
      no_results: "No se encontraron temas que coincidan con tu búsqueda."
    },
    overview_page: {
      title: "Resumen Técnico",
      subtitle: "Sumérgete en la arquitectura, sensores e ingeniería.",
      github_btn: "Ver en GitHub",
      toc_title: "En Esta Página"
    }
  }
};