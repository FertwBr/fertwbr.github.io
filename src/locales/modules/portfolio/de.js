// src/locales/modules/portfolio/de.js
export default {
    nav: {
        index: "Startseite",
        overview: "Dokumentation",
        changelog: "Changelog",
        roadmap: "Roadmap",
        privacy: "Datenschutz",
        terms: "Nutzungsbedingungen",
        help: "Hilfe",
        back: "Zurück"
    },
    hero: {
        greeting: "Hallo, ich bin",
        name: "Fernando Vaz",
        role_prefix: "Ich entwickle",
        roles: ["Android-Apps", "Backend-Systeme", "Nutzererlebnisse", "Digitale Lösungen"],
        cta_primary: "Projekte Ansehen",
        cta_secondary: "Mich Kontaktieren"
    },
    not_found: {
        page_title: "Seite nicht gefunden",
        title: "404",
        subtitle: "Hoppla! Ins Leere gelaufen.",
        message: "Die von Ihnen gesuchte Seite existiert derzeit nicht.",
        suggestion_title: "Haben Sie danach gesucht?",
        suggestion_desc: "Basierend auf Ihrem Link denken wir, dass Sie hierhin wollten",
        suggestion_btn: "Ja, dorthin gehen",
        home_btn: "Zur Startseite",
        apps_btn: "Apps Ansehen"
    },
    about: {
        title: "Über Mich",
        subtitle: "Wo Technik auf Design trifft",
        bio: {
            p1: {
                start: "Ich bin Fernando Vaz, ein Softwareentwickler mit Abschluss an der ",
                highlight: "UniCesumar",
                end: ", leidenschaftlich an der Schnittstelle von robustem Code und intuitivem Design interessiert."
            },
            p2: {
                start: "Spezialisiert auf das ",
                highlight_1: "Android-Ökosystem",
                middle: " (Kotlin/Jetpack Compose) und skalierbare ",
                highlight_2: "Backends",
                end: " (Spring Boot). Ich erstelle Lösungen, die nicht nur funktional sind, sondern auch Freude bei der Nutzung bereiten."
            }
        },
        cta_work: "Meine Arbeit ansehen",
        stats: {exp: "Jahre Erf.", projects: "Projekte", clients: "Zufriedene Kunden"},
        cards: {
            education: {title: "Bildung", value: "B.Sc. Softwareentwicklung", sub: "UniCesumar"},
            location: {title: "Standort", value: "Salvador, Brasilien", sub: "GMT-3"},
            stack: {title: "Main Stack", value: "Kotlin & Java", sub: "Full-Cycle-Entwicklung"}
        }
    },
    projects: {
        title: "Ausgewählte Arbeiten",
        subtitle: "Eine Präsentation technischer Tiefe und kreativer Problemlösungen.",
        view_project: "Fallstudie ansehen",
        source_code: "Quellcode",
        items: [
            {
                id: "pixel_pulse",
                title: "Pixel Pulse",
                category: "Android-Engineering",
                desc: "Fortschrittlicher Schallpegelmesser mit Echtzeit-FFT-Analyse, Room Database Persistenz und batterieoptimierten Hintergrunddiensten über den WorkManager.",
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
                desc: "Premium-Navigationswerkzeug mit Sensorfusionsalgorithmen, Jetpack Glance-Widgets und Multi-Modul-Architektur für eine saubere Trennung der Zuständigkeiten.",
                tags: ["Wear OS", "Sensoren", "Glance", "Retrofit"],
                icon_url: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Compass/art/phone.svg",
                link: "/PixelCompass?page=index",
                repo: "https://github.com/fertwbr/PixelCompass",
                color: "secondary",
                icon: "explore"
            },
            {
                id: "portfolio_site",
                title: "Dieses Portfolio",
                category: "Web-Engineering",
                desc: "Ein tiefer Einblick in die Architektur dieser Website. Erstellt mit React, Material Design 3 und einer benutzerdefinierten Markdown-Engine.",
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
                desc: "Unternehmens-Innovationsplattform, die es Teams ermöglicht, Ideen einzureichen, darüber abzustimmen und sie zu verfolgen. Entwickelt mit Spring Boot Security und PostgreSQL.",
                tags: ["Spring Boot", "Java", "PostgreSQL", "JWT"],
                link: "https://github.com/FertwBr/boxIdea",
                repo: "https://github.com/FertwBr/boxIdea",
                color: "tertiary",
                icon: "lightbulb"
            }
        ]
    },
    tech: {title: "Technologien", subtitle: "Werkzeuge, die ich nutze, um Ideen zum Leben zu erwecken"},
    github: {
        title: "Open Source", view_profile: "GitHub-Profil ansehen", languages: "Meistgenutzte Sprachen",
        default_bio: "Entwickle Lösungen für Android und das Web.",
        stats: {
            contributions: "Jahresbeiträge",
            repos: "Repositories",
            stars: "Sterne Gesamt",
            followers: "Follower"
        }
    },
    contact: {
        title: "Lassen Sie Uns Zusammenarbeiten",
        desc: "Haben Sie ein Projekt im Kopf oder möchten Sie die neuesten Entwicklungen der Android-Technologie besprechen?",
        email: "E-Mail senden",
        linkedin: "LinkedIn",
        github: "GitHub"
    }
};