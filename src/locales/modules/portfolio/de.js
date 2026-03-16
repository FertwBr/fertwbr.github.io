/**
 * Core portfolio localization strings (German).
 */
export default {
    nav: {
        index: "Startseite",
        overview: "Dokumentation",
        changelog: "Änderungsprotokoll",
        roadmap: "Roadmap",
        privacy: "Datenschutz",
        help: "Hilfe",
        back: "Zurück"
    },
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
    },
    changelog: {
        title: "Versionsverlauf",
        subtitle: "Verfolgen Sie die Entwicklung der Website. Hier finden Sie ein detailliertes Protokoll über neue Funktionen, Verbesserungen und Fehlerbehebungen für jede Version.",
        search_placeholder: "Funktionen, Versionen suchen...",
        latest_release: "Neueste Version",
        released: "Veröffentlicht",
        update_now: "Jetzt aktualisieren",
        on_this_page: "Auf dieser Seite",
        read_more: "Versionshinweise lesen",
        collapse: "Einklappen",
        back_to_top: "Zurück nach oben",
        update_details: "Aktualisierungsdetails",
        view_all: "Alle Updates anzeigen",
        share_update: "Update teilen",
        jump_to: "Springen zu",
        version_not_found: "Version nicht gefunden.",
        no_results: "Keine Ergebnisse gefunden.",
        back_to_changelog: "Zurück zum Changelog",
        load_more: "Mehr laden",
        explore_more: "Mehr entdecken",
        link_copied: "Link in die Zwischenablage kopiert!",
        open_full_screen: "Im Vollbildmodus öffnen",
        share_tooltip: "Dieses Update teilen",
        previous_update: "Vorheriges Update",
        next_update: "Nächstes Update",
        table_of_contents: "Inhaltsverzeichnis",
        in_this_update: "In diesem Update",
        auto_translated_badge: "Automatisch übersetzt",
        auto_translated_tooltip: "Für Ihren Komfort von einem KI-System übersetzt.",
        translate_modal_title: "Automatisch übersetzt",
        translate_modal_desc: "Dieser Inhalt wurde automatisch von einem KI-System übersetzt, damit Sie auf dem Laufenden bleiben. Einige Fachbegriffe oder Nuancen könnten leicht ungenau sein.",
        translate_modal_show_original: "Original anzeigen (Englisch)",
        translate_modal_keep_translation: "Übersetzung beibehalten"
    },
    overview_page: {
        title: "Technische Übersicht",
        subtitle: "Ein tiefer Einblick in die Architektur und den Stack.",
        github_btn: "Auf GitHub ansehen",
        toc_title: "Auf dieser Seite",
        dynamic_docs_note: "Dieser Überblick wird dynamisch aus Markdown-Dateien generiert, um sicherzustellen, dass er stets mit den neuesten Änderungen an der Codebasis übereinstimmt.",
        about_docs_title: "Über diese Dokumentation"
    },
    feedback: {
        title: "Feedback senden",
        subtitle: "Helfen Sie uns, besser zu werden. Fehlerberichte, Funktionsanfragen oder einfach ein Gruß.",
        form: {
            project_label: "Projekt",
            type_label: "Thema",
            platform_label: "Plattform",
            email_label: "E-Mail-Adresse",
            email_placeholder: "ihre@email.com",
            email_error: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
            description_label: "Nachricht",
            description_placeholder: "Beschreiben Sie, was passiert ist, oder teilen Sie Ihre Idee mit...",
            description_error: "Die Nachricht muss mindestens 15 Zeichen lang sein.",
            include_device_info: "Geräteinformationen einschließen (Browser/OS)",
            send_button: "Feedback senden",
            draft_recovered: "Entwurf wiederhergestellt",
            discard_draft: "Entwurf verwerfen"
        },
        success: {
            title: "Nachricht gesendet!",
            message: "Ihre Nachricht wurde erfolgreich an support@fertwbr.com gesendet. Eine Bestätigungskopie wurde an {email} gesendet.",
            error_title: "Zustellung fehlgeschlagen",
            error_message: "Beim Senden Ihrer Nachricht ist ein Netzwerkfehler aufgetreten. Bitte versuchen Sie es erneut.",
            btn_retry: "Erneut versuchen",
            btn_edit: "Nachricht bearbeiten",
            btn_home: "Zur Startseite"
        },
        projects: {
            pixelpulse: "Pixel Pulse",
            pixelcompass: "Pixel Compass",
            portfolio: "Portfolio-Website"
        },
        platforms: {
            android: "Android (Smartphone)",
            wearos: "Wear OS",
            web: "Web / Website"
        },
        types: {
            general: "Allgemeines Feedback",
            bug: "Fehlerbericht",
            feature: "Funktionsanfrage",
            translation: "Übersetzungsproblem",
            ui: "UI-Vorschlag",
            other: "Sonstiges"
        },
        guidance: {
            label: "Tipp",
            default_general: "Wir hören zu! Teilen Sie uns Ihre Gedanken mit.",
            default_bug: "Beschreiben Sie die Schritte, die zum Fehler führen.",
            default_feature: "Wie würde diese Funktion Ihr Erlebnis verbessern?",
            default_translation: "Auf welchem Bildschirm befindet sich der falsche Text?",
            short_text: "Bitte geben Sie etwas mehr Details an, damit wir es besser verstehen können.",
            crash: "Falls die App abgestürzt ist, haben Sie einen Fehlercode oder eine Nachricht gesehen?",
            screenshot: "Ein Bild sagt mehr als tausend Worte. Erwägen Sie, einen Screenshot beizufügen.",
            translation_keyword: "Die Angabe der spezifischen Sprache und der falschen Phrase hilft uns, dies schnell zu beheben.",
            steps_received: "Perfekt! Die Kenntnis der Schritte hilft uns, das Problem zu reproduzieren.",
            error_received: "Vielen Dank für die Fehlerdetails.",
            location_received: "Hervorragend, die Kenntnis des Bildschirmorts ist sehr hilfreich.",
            idea_received: "Das ist eine interessante Idee! Erzählen Sie uns mehr darüber, wie sie funktionieren soll.",
            great_detail: "Tolle Details! Dies hilft uns maßgeblich beim Verständnis."
        },
        keywords: {
            crash: "crash,schließen,stoppen,beenden,einfrieren,lag,defekt,weißer bildschirm",
            error: "fehler,code,fehlschlag,exception,0x,nummer,nachricht",
            steps: "schritt,zuerst,dann,danach,wenn,klicken,tippen,drücken,scrollen",
            screen: "bildschirm,seite,ansicht,fenster,dialog,tab,karte,menü,navbar,fußzeile",
            correction: "text,wort,tippfehler,falsch,inkorrekt,schlecht,rechtschreibung,grammatik,übersetzen,sprache",
            idea: "hinzufügen,erstellen,wunsch,würde,könnte,sollte,besser,neu,funktion,modus"
        }
    }
};