/**
 * Core portfolio localization strings (Spanish).
 */
export default {
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
    }
};