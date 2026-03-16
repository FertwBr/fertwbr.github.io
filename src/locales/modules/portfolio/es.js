/**
 * Core portfolio localization strings (Spanish).
 */
export default {
    nav: {
        index: "Inicio",
        overview: "Documentación",
        changelog: "Historial de cambios",
        roadmap: "Hoja de ruta",
        privacy: "Privacidad",
        help: "Ayuda",
        back: "Volver"
    },
    common: {
        offline: "Actualmente no tienes conexión.",
    },
    redirect: {
        launching: "Iniciando aplicación...",
        did_open: "¿Se abrió la aplicación?",
        open_again: "Abrir aplicación de nuevo",
        get_on_store: "Disponible en Play Store"
    },
    error: {
        title: "Error del sistema",
        desc_1: "Algo inesperado ocurrió en el núcleo de la aplicación.",
        desc_2: "No te preocupes, no se perdieron datos.",
        reload: "Reiniciar sistema",
        home: "Volver al inicio",
        show_details: "Mostrar detalles técnicos",
        hide_details: "Ocultar detalles técnicos",
        copy: "Copiar",
        copied: "Copiado"
    },
    hero: {
        greeting: "Hola, soy",
        name: "Fernando Vaz",
        role_prefix: "Desarrollo",
        roles: ["Aplicaciones Android", "Sistemas Backend", "Experiencias de Usuario", "Soluciones Digitales"],
        cta_primary: "Ver proyectos",
        cta_secondary: "Contacto"
    },
    not_found: {
        page_title: "Página no encontrada",
        title: "404",
        subtitle: "¡Ups! Hacia el vacío.",
        message: "La página que buscas no existe actualmente.",
        suggestion_title: "¿Buscabas esto?",
        suggestion_desc: "Basándonos en tu enlace, creemos que querías ir a",
        suggestion_btn: "Sí, ir allí",
        home_btn: "Ir al inicio",
        apps_btn: "Ver aplicaciones"
    },
    about: {
        title: "Sobre mí",
        subtitle: "Donde la ingeniería se une al diseño",
        bio: {
            p1: {
                start: "Soy Fernando Vaz, ingeniero de software graduado por la ",
                highlight: "UniCesumar",
                end: ", apasionado por la intersección entre el código robusto y el diseño intuitivo."
            },
            p2: {
                start: "Especializado en el ",
                highlight_1: "ecosistema Android",
                middle: " (Kotlin/Jetpack Compose) y en ",
                highlight_2: "Backends",
                end: " escalables (Spring Boot). Creo soluciones que no solo son funcionales, sino también agradables de usar."
            }
        },
        cta_work: "Ver mi trabajo",
        stats: {
            exp: "Años de exp.",
            projects: "Proyectos",
            clients: "Clientes felices"
        },
        cards: {
            education: {title: "Educación", value: "Grado en Ing. de Software", sub: "UniCesumar"},
            location: {title: "Ubicación", value: "Salvador, Brasil", sub: "GMT-3"},
            stack: {title: "Stack principal", value: "Kotlin & Java", sub: "Dev Full Cycle"}
        }
    },
    projects: {
        title: "Trabajos seleccionados",
        subtitle: "Una muestra de profundidad técnica y resolución creativa de problemas.",
        view_project: "Ver caso de estudio",
        source_code: "Código fuente",
        items: [
            {
                id: "pixel_pulse",
                title: "Pixel Pulse",
                category: "Ingeniería Android",
                desc: "Sonómetro avanzado con análisis FFT en tiempo real, persistencia con Room Database y servicios en segundo plano optimizados para batería mediante WorkManager.",
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
                category: "Wear OS & Mobile",
                desc: "Herramienta de navegación premium con algoritmos de fusión de sensores, widgets Jetpack Glance y arquitectura multimódulo para una clara separación de responsabilidades.",
                tags: ["Wear OS", "Sensors", "Glance", "Retrofit"],
                icon_url: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Compass/art/phone.svg",
                link: "/PixelCompass?page=index",
                repo: "https://github.com/fertwbr/PixelCompass",
                color: "secondary",
                icon: "explore"
            },
            {
                id: "portfolio_site",
                title: "Este portafolio",
                category: "Ingeniería Web",
                desc: "Un análisis profundo de la arquitectura de este sitio. Construido con React, Material Design 3 y un motor de Markdown personalizado.",
                tags: ["React", "Vite", "Material 3", "Framer Motion"],
                icon: "web",
                link: "/site/overview",
                repo: "https://github.com/fertwbr/fertwbr.github.io",
                color: "tertiary"
            },
            {
                id: "box_idea",
                title: "boxIdea",
                category: "Web Full Stack",
                desc: "Plataforma de innovación corporativa que permite a los equipos enviar, votar y seguir ideas. Construida con Spring Boot Security y PostgreSQL.",
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
        subtitle: "Herramientas que utilizo para dar vida a las ideas"
    },
    github: {
        title: "Código Abierto",
        view_profile: "Ver Perfil de GitHub",
        languages: "Lenguajes Más Utilizados",
        default_bio: "Desarrollando soluciones para Android y la Web.",
        stats: {
            contributions: "Contribuciones del Año",
            repos: "Repositorios",
            stars: "Total de Estrellas",
            followers: "Seguidores"
        }
    },

    contact: {
        title: "Trabajemos juntos",
        desc: "¿Tienes un proyecto en mente o quieres hablar sobre lo último en tecnología Android?",
        email: "Enviar e-mail",
        linkedin: "LinkedIn",
        github: "GitHub"
    },
    footer: {
        rights: "Todos los derechos reservados.",
        built: "Diseñado y construido por Fernando Vaz 🇧🇷",
        useful_links: "Enlaces útiles",
        social_title: "Conectar",
        appearance: {
            title: "Tema y apariencia",
            language_selector: "Idioma",
            en: "English",
            pt: "Português"
        }
    },
    changelog: {
        title: "Historial de versiones",
        subtitle: "Siga la evolución del sitio. Aquí encontrará un registro detallado de las nuevas funciones, mejoras y correcciones de cada versión.",
        search_placeholder: "Buscar funciones, versiones...",
        latest_release: "Último lanzamiento",
        released: "Lanzado",
        update_now: "Actualizar ahora",
        on_this_page: "En esta página",
        load_more: "Cargar versiones anteriores",
        no_results: "No se han encontrado versiones que coincidan con sus filtros.",
        jump_to: "Ir a la versión",
        read_more: "Leer notas de lanzamiento",
        collapse: "Contraer",
        back_to_top: "Volver arriba"
    },
    overview_page: {
        title: "Resumen técnico",
        subtitle: "Análisis profundo de la arquitectura y el stack.",
        github_btn: "Ver en GitHub",
        toc_title: "En esta página",
        dynamic_docs_note: "Esta descripción general se genera dinámicamente a partir de archivos Markdown para garantizar que esté siempre actualizada con los últimos cambios en la base de código.",
        about_docs_title: "Acerca de esta documentación"
    },
    feedback: {
        title: "Enviar comentarios",
        subtitle: "Ayúdenos a mejorar. Reportes de errores, solicitudes de funciones o simplemente un saludo.",
        form: {
            project_label: "Proyecto",
            type_label: "Tema",
            platform_label: "Plataforma",
            email_label: "Dirección de correo electrónico",
            email_placeholder: "su@email.com",
            email_error: "Por favor, introduzca una dirección de correo electrónico válida.",
            description_label: "Mensaje",
            description_placeholder: "Describa lo que sucedió o comparta su idea...",
            description_error: "El mensaje debe tener al menos 15 caracteres.",
            include_device_info: "Incluir información del dispositivo (Navegador/SO)",
            send_button: "Enviar comentarios",
            draft_recovered: "Borrador recuperado",
            discard_draft: "Descartar borrador"
        },
        success: {
            title: "¡Mensaje enviado!",
            message: "Su mensaje ha sido enviado con éxito a support@fertwbr.com. Se ha enviado una copia de confirmación a {email}.",
            error_title: "Error en el envío",
            error_message: "Encontramos un error de red al intentar enviar su mensaje. Por favor, inténtelo de nuevo.",
            btn_retry: "Reintentar",
            btn_edit: "Editar mensaje",
            btn_home: "Volver al inicio"
        },
        projects: {
            pixelpulse: "Pixel Pulse",
            pixelcompass: "Pixel Compass",
            portfolio: "Sitio de portafolio"
        },
        platforms: {
            android: "Android (Teléfono)",
            wearos: "Wear OS",
            web: "Web / Sitio"
        },
        types: {
            general: "Comentarios generales",
            bug: "Reporte de error",
            feature: "Solicitud de función",
            translation: "Problema de traducción",
            ui: "Sugerencia de interfaz",
            other: "Otro"
        },
        guidance: {
            label: "Consejo",
            default_general: "¡Le escuchamos! Comparta sus pensamientos.",
            default_bug: "Describa los pasos para que ocurra el error.",
            default_feature: "¿Cómo mejoraría esta función su experiencia?",
            default_translation: "¿En qué pantalla aparece el texto incorrecto?",
            short_text: "Por favor, proporcione un poco más de detalle para que podamos entender mejor.",
            crash: "Si la aplicación falló, ¿vio algún código o mensaje de error?",
            screenshot: "Una imagen vale más que mil palabras. Considere adjuntar una captura de pantalla.",
            translation_keyword: "Mencionar el idioma específico y la frase incorrecta nos ayuda a corregirlo rápido.",
            steps_received: "¡Perfecto! Conocer los pasos nos ayuda a reproducir el problema.",
            error_received: "Gracias por incluir los detalles del error.",
            location_received: "Excelente, conocer la ubicación en la pantalla es muy útil.",
            idea_received: "¡Es una idea interesante! Cuéntenos más sobre cómo funcionaría.",
            great_detail: "¡Gran detalle! Esto nos ayuda significativamente a entender."
        },
        keywords: {
            crash: "crash,cerrar,detener,bloqueo,congelar,lag,roto,pantalla blanca",
            error: "error,código,fallo,excepción,0x,número,mensaje",
            steps: "paso,primero,luego,después,cuando,clic,tocar,presionar,deslizar",
            screen: "pantalla,página,vista,ventana,diálogo,pestaña,tarjeta,menú,navbar,pie de página",
            correction: "texto,palabra,error tipográfico,falso,incorrecto,malo,ortografía,gramática,traducir,idioma",
            idea: "añadir,crear,deseo,gustaría,podría,debería,mejor,nuevo,función,modo"
        }
    }
};