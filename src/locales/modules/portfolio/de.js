/**
 * Core portfolio localization strings (German).
 */
export default {
    common: {
        offline: "Sie sind derzeit offline.",
    },
    redirect: {
        launching: "Anwendung wird gestartet...",
        did_open: "Hat sich die App geöffnet?",
        open_again: "App erneut öffnen",
        get_on_store: "Im Play Store herunterladen"
    },
    error: {
        title: "Systemfehler",
        desc_1: "Ein unerwarteter Fehler ist im Anwendungskern aufgetreten.",
        desc_2: "Keine Sorge, es wurden keine Daten verloren.",
        reload: "System neu laden",
        home: "Zur Startseite",
        show_details: "Technische Details anzeigen",
        hide_details: "Technische Details ausblenden",
        copy: "Kopieren",
        copied: "Kopiert"
    },
    hero: {
        greeting: "Hallo, ich bin",
        name: "Fernando Vaz",
        role_prefix: "Ich entwickle",
        roles: ["Android-Apps", "Backend-Systeme", "User Experiences", "Digitale Lösungen"],
        cta_primary: "Projekte ansehen",
        cta_secondary: "Kontakt"
    },
    not_found: {
        page_title: "Seite nicht gefunden",
        title: "404",
        subtitle: "Hoppla! Ab in die Leere.",
        message: "Die von Ihnen gesuchte Seite existiert derzeit nicht.",
        suggestion_title: "Haben Sie danach gesucht?",
        suggestion_desc: "Basierend auf Ihrem Link glauben wir, dass Sie hierhin wollten:",
        suggestion_btn: "Ja, dorthin gehen",
        home_btn: "Zur Startseite",
        apps_btn: "Apps ansehen"
    },
    about: {
        title: "Über mich",
        subtitle: "Engineering trifft auf Design",
        bio: {
            p1: {
                start: "Ich bin Fernando Vaz, ein Software-Ingenieur mit Abschluss der ",
                highlight: "UniCesumar",
                end: ", leidenschaftlich an der Schnittstelle von robustem Code und intuitivem Design."
            },
            p2: {
                start: "Spezialisiert auf das ",
                highlight_1: "Android-Ökosystem",
                middle: " (Kotlin/Jetpack Compose) und skalierbare ",
                highlight_2: "Backends",
                end: " (Spring Boot). Ich erstelle Lösungen, die nicht nur funktional sind, sondern auch Freude bei der Benutzung bereiten."
            }
        },
        cta_work: "Meine Arbeit ansehen",
        stats: {
            exp: "Jahre Erf.",
            projects: "Projekte",
            clients: "Zufriedene Kunden"
        },
        cards: {
            education: {title: "Bildung", value: "B.S. Software Engineering", sub: "UniCesumar"},
            location: {title: "Standort", value: "Salvador, Brasilien", sub: "GMT-3"},
            stack: {title: "Main Stack", value: "Kotlin & Java", sub: "Full Cycle Dev"}
        }
    },
    projects: {
        title: "Ausgewählte Arbeiten",
        subtitle: "Ein Schaufenster für technische Tiefe und kreative Problemlösung.",
        view_project: "Fallstudie ansehen",
        source_code: "Quellcode",
        items: [
            {
                id: "pixel_pulse",
                title: "Pixel Pulse",
                category: "Android Engineering",
                desc: "Fortschrittlicher Schallpegelmesser mit Echtzeit-FFT-Analyse, Room Database Persistenz und batterieoptimierten Hintergrunddiensten via WorkManager.",
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
                desc: "Premium Navigations-Tool mit Sensor-Fusions-Algorithmen, Jetpack Glance Widgets und Multi-Modul-Architektur zur klaren Trennung von Belangen.",
                tags: ["Wear OS", "Sensors", "Glance", "Retrofit"],
                icon_url: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Compass/art/phone.svg",
                link: "/PixelCompass?page=index",
                repo: "https://github.com/fertwbr/PixelCompass",
                color: "secondary",
                icon: "explore"
            },
            {
                id: "portfolio_site",
                title: "Dieses Portfolio",
                category: "Web Engineering",
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
                desc: "Plattform für Unternehmensinnovationen, die es Teams ermöglicht, Ideen einzureichen, zu bewerten und zu verfolgen. Erstellt mit Spring Boot Security und PostgreSQL.",
                tags: ["Spring Boot", "Java", "PostgreSQL", "JWT"],
                link: "https://github.com/FertwBr/boxIdea",
                repo: "https://github.com/FertwBr/boxIdea",
                color: "tertiary",
                icon: "lightbulb"
            }
        ]
    },
    tech: {
        title: "Technologien",
        subtitle: "Werkzeuge, mit denen ich Ideen zum Leben erwecke"
    },
    github: {
        title: "Open Source",
        view_profile: "GitHub-Profil anzeigen",
        languages: "Meistgenutzte Sprachen",
        default_bio: "Entwickelt Lösungen für Android und das Web.",
        stats: {
            contributions: "Beiträge im Jahr",
            repos: "Repositorys",
            stars: "Gesamtanzahl der Sterne",
            followers: "Follower"
        }
    },
    contact: {
        title: "Lassen Sie uns zusammenarbeiten",
        desc: "Haben Sie ein Projekt im Sinn oder möchten Sie das Neueste aus der Android-Technik besprechen?",
        email: "E-mail senden",
        linkedin: "LinkedIn",
        github: "GitHub"
    },
    footer: {
        rights: "Alle Rechte vorbehalten.",
        built: "Entworfen & Erstellt von Fernando Vaz 🇧🇷",
        useful_links: "Nützliche Links",
        social_title: "Verbinden",
        appearance: {
            title: "Design & Erscheinungsbild",
            language_selector: "Sprache",
            en: "English",
            pt: "Português"
        }
    }
};