// src/locales/modules/portfolio/es.js
export default {
    nav: {
        index: "Inicio",
        overview: "Documentación",
        changelog: "Registro de Cambios",
        roadmap: "Hoja de Ruta",
        privacy: "Privacidad",
        terms: "Términos de Uso",
        help: "Ayuda",
        back: "Volver"
    },
    hero: {
        greeting: "Hola, soy",
        name: "Fernando Vaz",
        role_prefix: "Desarrollo",
        roles: ["Aplicaciones Android", "Sistemas Backend", "Experiencias de Usuario", "Soluciones Digitales"],
        cta_primary: "Ver Proyectos",
        cta_secondary: "Contácteme"
    },
    not_found: {
        page_title: "Página No Encontrada",
        title: "404",
        subtitle: "¡Vaya! Entramos en el vacío.",
        message: "La página que está buscando no existe actualmente.",
        suggestion_title: "¿Buscaba esto?",
        suggestion_desc: "Basado en su enlace, creemos que deseaba ir a",
        suggestion_btn: "Sí, ir allí",
        home_btn: "Ir al Inicio",
        apps_btn: "Ver Aplicaciones"
    },
    about: {
        title: "Sobre Mí",
        subtitle: "Donde la Ingeniería se encuentra con el Diseño",
        bio: {
            p1: {
                start: "Soy Fernando Vaz, un Ingeniero de Software graduado en ",
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
        stats: {exp: "Años Exp.", projects: "Proyectos", clients: "Clientes Satisfechos"},
        cards: {
            education: {title: "Educación", value: "Licenciatura en Ingeniería de Software", sub: "UniCesumar"},
            location: {title: "Ubicación", value: "Salvador, Brasil", sub: "GMT-3"},
            stack: {title: "Stack Principal", value: "Kotlin y Java", sub: "Desarrollo de Ciclo Completo"}
        }
    },
    projects: {
        title: "Trabajos Seleccionados",
        subtitle: "Una muestra de profundidad técnica y resolución creativa de problemas.",
        view_project: "Ver Estudio de Caso",
        source_code: "Código Fuente",
        items: [
            {
                id: "pixel_pulse",
                title: "Pixel Pulse",
                category: "Ingeniería Android",
                desc: "Medidor de nivel de sonido avanzado con análisis FFT en tiempo real, persistencia en Room Database y servicios en segundo plano optimizados para batería a través de WorkManager.",
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
                category: "Wear OS y Dispositivos Móviles",
                desc: "Herramienta de navegación premium con algoritmos de fusión de sensores, widgets de Jetpack Glance y arquitectura multimodular para una separación clara de responsabilidades.",
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
                desc: "Una inmersión profunda en la arquitectura de este mismo sitio. Creado con React, Material Design 3 y un motor Markdown personalizado.",
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
                desc: "Plataforma de innovación corporativa que permite a los equipos enviar, votar y rastrear ideas. Creada con Spring Boot Security y PostgreSQL.",
                tags: ["Spring Boot", "Java", "PostgreSQL", "JWT"],
                link: "https://github.com/FertwBr/boxIdea",
                repo: "https://github.com/FertwBr/boxIdea",
                color: "tertiary",
                icon: "lightbulb"
            }
        ]
    },
    tech: {title: "Tecnologías", subtitle: "Herramientas que utilizo para dar vida a las ideas"},
    github: {
        title: "Código Abierto", view_profile: "Ver Perfil de GitHub", languages: "Idiomas Más Utilizados",
        default_bio: "Desarrollando soluciones para Android y la Web.",
        stats: {
            contributions: "Contribuciones Anuales",
            repos: "Repositorios",
            stars: "Estrellas Totales",
            followers: "Seguidores"
        }
    },
    contact: {
        title: "Trabajemos Juntos",
        desc: "¿Tiene un proyecto en mente o desea discutir lo último en tecnología Android?",
        email: "Enviar e-mail",
        linkedin: "LinkedIn",
        github: "GitHub"
    }
};