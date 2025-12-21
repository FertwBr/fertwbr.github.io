export default {
  common: {
    offline: "Sie sind derzeit offline.",
  },
  redirect: {
    launching: "Anwendung wird gestartet...",
    did_open: "Hat sich die App geöffnet?",
    open_again: "App erneut öffnen",
    get_on_store: "Im Play Store laden"
  },
  error: {
    title: "Systemfehler",
    desc_1: "Im Anwendungskern ist etwas Unerwartetes passiert.",
    desc_2: "Keine Sorge, es sind keine Daten verloren gegangen.",
    reload: "System neu laden",
    home: "Zur Startseite",
    show_details: "Technische Details anzeigen",
    hide_details: "Technische Details ausblenden",
    copy: "Kopieren",
    copied: "Kopiert"
  },
  hero: {
    greeting: "Hallo, ich bin",
    role_prefix: "Ich entwickle",
    roles: ["Android-Apps", "Backend-Systeme", "Nutzererlebnisse", "Digitale Lösungen"],
    cta_primary: "Projekte ansehen",
    cta_secondary: "Kontaktieren"
  },
  not_found: {
    page_title: "Seite nicht gefunden",
    title: "404",
    subtitle: "Hoppla! Ins Leere.",
    message: "Die gesuchte Seite existiert derzeit nicht.",
    suggestion_title: "Haben Sie das gesucht?",
    suggestion_desc: "Basierend auf Ihrem Link dachten wir, Sie wollten zu",
    suggestion_btn: "Ja, dorthin gehen",
    home_btn: "Zur Startseite",
    apps_btn: "Apps ansehen"
  },
  about: {
    title: "Über mich",
    subtitle: "Ingenieurskunst trifft Design",
    bio_1: "Ich bin Fernando Vaz, Softwareingenieur (Abschluss an der UniCesumar) mit einer Leidenschaft für die Schnittstelle zwischen robustem Code und intuitivem Design.",
    bio_2: "Spezialisiert auf das Android-Ökosystem (Kotlin/Jetpack Compose) und skalierbare Backends (Spring Boot). Ich erstelle Lösungen, die nicht nur funktional, sondern auch angenehm zu bedienen sind.",
    stats: {
      exp: "Jahre Erfahrung",
      projects: "Projekte",
      clients: "Zufriedene Kunden"
    },
    cards: {
      education: { title: "Ausbildung", value: "B.S. Software Engineering", sub: "UniCesumar" },
      location: { title: "Standort", value: "Salvador, Brasilien", sub: "GMT-3" },
      stack: { title: "Haupt-Stack", value: "Kotlin & Java", sub: "Full Cycle Dev" }
    }
  },
  projects: {
    title: "Ausgewählte Werke",
    subtitle: "Ein Schaufenster technischer Tiefe und kreativer Problemlösung.",
    view_project: "Fallstudie ansehen",
    source_code: "Quellcode",
    items: [
      {
        id: "pixel_pulse",
        title: "Pixel Pulse",
        category: "Android Engineering",
        desc: "Fortschrittlicher Schallpegelmesser mit Echtzeit-FFT-Analyse, Room-Datenbank-Persistenz und batterieoptimierten Hintergrunddiensten via WorkManager.",
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
        desc: "Premium-Navigationstool mit Sensor-Fusion-Algorithmen, Jetpack Glance-Widgets und Multi-Modul-Architektur für saubere Funktionstrennung.",
        tags: ["Wear OS", "Sensoren", "Glance", "Retrofit"],
        icon_url: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Compass/art/phone.svg",
        link: "/PixelCompass?page=index",
        repo: "https://github.com/fertwbr/PixelCompass",
        color: "secondary",
        icon: "explore"
      },
      {
        id: "box_idea",
        title: "boxIdea",
        category: "Full Stack Web",
        desc: "Plattform für Unternehmensinnovation, die es Teams ermöglicht, Ideen einzureichen, darüber abzustimmen und zu verfolgen. Erstellt mit Spring Boot Security und PostgreSQL.",
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
    subtitle: "Werkzeuge, die ich nutze, um Ideen zum Leben zu erwecken"
  },
  github: {
    title: "Open Source",
    stats: {
      contributions: "Jahresbeiträge",
      repos: "Repositories",
      stars: "Gesamtsterne"
    }
  },
contact: {
    title: "Lassen Sie uns zusammenarbeiten",
    desc: "Haben Sie ein Projekt im Kopf oder möchten Sie über die neueste Android-Technologie diskutieren?",
    email: "E-Mail senden",
    linkedin: "LinkedIn",
    github: "GitHub"
  },
  footer: {
    rights: "Alle Rechte vorbehalten.",
    built: "Entworfen & Entwickelt von Fernando Vaz 🇧🇷",
    useful_links: "Nützliche Links",
    social_title: "Vernetzen",
    appearance: {
      title: "Design & Erscheinungsbild",
      language_selector: "Sprache",
      en: "Englisch",
      pt: "Portugiesisch"
    }
  },
  pixel_pulse: {
    nav: {
      index: "Übersicht",
      plus: "Pixel Pulse+",
      changelog: "Updates",
      roadmap: "Roadmap",
      privacy: "Datenschutz",
      help: "Hilfe",
      overview: "Doku",
      back: "Zurück zum Portfolio"
    },
    hero: {
      title: "Ihr smarter Sound-Coach",
      subtitle: "Messen Sie Ihre Welt mit Stil und Präzision. Wunderschön gestaltet für Android.",
      download: "Im Play Store laden"
    },
    new_features: {
      label: "Neu in v1.17",
      title: "Tiefe Anpassung",
      view_history: "Vollständigen Verlauf ansehen",
      items: [
        {
          icon: "edit_attributes",
          title: "Toolbar-Editor",
          desc: "Passen Sie Ihren Arbeitsbereich per Drag & Drop an. Platzieren Sie Ihre wichtigsten Tools genau dort, wo Sie sie brauchen."
        },
        {
          icon: "palette",
          title: "9 Neue Themes",
          desc: "Von Smaragd bis Sonnenuntergang. Plus ein echter schwarzer AMOLED-Modus zum Energiesparen beim Messen."
        },
        {
          icon: "share",
          title: "Bild-Export",
          desc: "Teilen Sie Ihre Diagramme und Sitzungsstatistiken als schöne Bilder direkt in sozialen Medien."
        }
      ]
    },
    features: {
      title: "Ein mächtiges Toolkit, kostenlos für alle",
      cta_project: "Technische Übersicht erkunden",
      items: [
        {
          title: "Expressives Echtzeit-Meter",
          desc: "Animierte Anzeige mit dynamischen Farbwechseln von ruhigem Blau zu warnendem Rot."
        },
        {
          title: "Sitzungsverlauf",
          desc: "Speichern Sie Messungen und analysieren Sie Details mit interaktiven Diagrammen."
        },
        {
          title: "Präzisionskalibrierung",
          desc: "Stimmen Sie den Sensor gegen ein Referenzgerät ab für professionelle Genauigkeit."
        },
        {
          title: "Material You",
          desc: "Passt sich der Farbpalette Ihres Hintergrundbildes an für einen einzigartigen Look."
        }
      ]
    },
    plus: {
      title: "Das ultimative Erlebnis freischalten",
      desc: "Wechseln Sie von reaktiv zu proaktiv mit automatisierter Analyse.",
      cta: "Pixel Pulse+ entdecken"
    },
    plus_page: {
      title: "Erweitern Sie Ihr Erlebnis",
      badge: "Einmaliger Kauf",
      cta: "Lebenslangen Zugriff freischalten",
      disclaimer: "Keine Abos. Keine versteckten Gebühren.",
      why_title: "Warum ein Einmal-Kauf?",
      features_title: "Der Plus-Vorteil",
      features_subtitle: "Visualisierung der Leistung, die Sie sofort erhalten.",
      faq_title: "Häufige Fragen"
    },
    privacy_section: {
      title: "Datenschutz zuerst",
      cta_policy: "Datenschutzrichtlinie lesen",
      cta_tech: "Technische Details",
      cards: [
        {
          icon: "mic_off",
          title: "Keine Audioaufnahme",
          desc: "Roh-Audio wird sofort verarbeitet und verworfen. Wir speichern niemals Ihre Gespräche."
        },
        {
          icon: "phonelink_lock",
          title: "Nur auf dem Gerät",
          desc: "Alle Analysen finden auf Ihrem Telefon statt. Ihre Daten verlassen niemals Ihr Gerät."
        },
        {
          icon: "block",
          title: "Keine Werbung oder Tracker",
          desc: "Ein sauberes Erlebnis ohne Tracking durch Dritte oder invasive Werbung."
        },
        {
          icon: "visibility",
          title: "Transparente Speicherung",
          desc: "Sie haben die volle Kontrolle. Exportieren oder löschen Sie Ihren Sitzungsverlauf jederzeit."
        }
      ]
    },
    footer: {
      rights: "Pixel Pulse. Alle Rechte vorbehalten.",
      links: "Nützliche Links",
      theme_title: "Design & Erscheinungsbild"
    },
    changelog: {
      title: "Versionsgeschichte",
      subtitle: "Verfolgen Sie die Entwicklung von Pixel Pulse. Jedes Feature, jede Verbesserung und jeder Fix unten detailliert.",
      search_placeholder: "Suche nach Features, Versionen (z.B. 1.15, Beta)...",
      latest_release: "Neueste Version",
      released: "Veröffentlicht",
      update_now: "Jetzt aktualisieren",
      on_this_page: "Auf dieser Seite",
      load_more: "Ältere Versionen laden",
      no_results: "Keine Versionen gefunden, die Ihren Filtern entsprechen.",
      jump_to: "Springe zu Version",
      read_more: "Release Notes lesen",
      collapse: "Einklappen",
      back_to_top: "Nach oben",
      plus_promo: {
        title: "Entwicklung unterstützen",
        subtitle: "Schalten Sie Auto-Monitoring frei und helfen Sie uns, neue Features zu bauen.",
        cta: "Pixel Pulse+ holen"
      },
      beta_program: {
        title: "Beta-Programm beitreten",
        subtitle: "Testen Sie neue Funktionen vor der offiziellen Veröffentlichung.",
        cta: "Am Beta-Programm teilnehmen",
        badge: "Vorabzugang"
      },
      wear_os_promo: {
        title: "Wear OS-Erlebnis",
        subtitle_available: "Navigieren Sie direkt von Ihrem Handgelenk. Nahtlose Integration.",
        subtitle_coming: "Erscheint im 1. Quartal 2026 für Ihre Smartwatch.",
        cta: "Auf der Uhr anzeigen",
        badge: "Begleiter"
      }
    },
    privacy_page: {
      page_title: "Datenschutzerklärung",
      last_updated: "Zuletzt aktualisiert:",
      table_of_contents: "Inhaltsverzeichnis",
      contact_title: "Haben Sie Fragen?",
      contact_desc: "Wenn Sie Bedenken bezüglich Ihrer Daten haben, kontaktieren Sie uns bitte.",
      contact_btn: "Support kontaktieren",
      print_btn: "Richtlinie drucken"
    },
    help_page: {
      page_title: "Hilfe & FAQ",
      subtitle: "Finden Sie Antworten und erfahren Sie, wie Sie das Beste aus Pixel Pulse herausholen.",
      search_placeholder: "Nach Antworten suchen (z.B. Kalibrierung, Export)...",
      table_of_contents: "Themen",
      contact_title: "Kommen Sie nicht weiter?",
      contact_desc: "Finden Sie nicht, was Sie suchen? Unser Team ist hier, um zu helfen.",
      contact_btn: "Support kontaktieren",
      no_results: "Keine Themen gefunden."
    },
    roadmap_page: {
      title: "Produkt-Roadmap",
      subtitle: "Sehen Sie, was wir gebaut haben und wohin wir als nächstes gehen.",
      suggest_btn: "Feature vorschlagen",
      toc_title: "Zeitstrahl"
    },
    overview_page: {
      title: "Technische Übersicht",
      subtitle: "Ein tiefer Einblick in die Architektur, den Tech-Stack und das Privacy Engineering.",
      github_btn: "Auf GitHub ansehen",
      toc_title: "Auf dieser Seite"
    },
  },
  pixel_compass: {
    nav: {
      index: "Übersicht",
      plus: "Pixel Compass+",
      changelog: "Updates",
      roadmap: "Roadmap",
      privacy: "Datenschutz",
      help: "Hilfe",
      overview: "Doku",
      back: "Zurück zum Portfolio"
    },
    hero: {
      title: "Ihr smarter Kompass für Handy & Uhr",
      subtitle: "Navigieren Sie Ihre Welt mit Stil, Präzision und einem Hauch von Material 3 Magie. Der ultimative Navigationsbegleiter für Android.",
      download: "Im Play Store laden"
    },
    new_features: {
      label: "Neu in v1.15 Beta",
      title: "Vereinheitlichtes Erlebnis",
      view_history: "Vollständigen Verlauf ansehen",
      items: [
        { 
          icon: "responsive_layout", 
          title: "Responsive Layouts", 
          desc: "Komplett neu gestaltete 'Willkommen'- und 'Plan'-Bildschirme, optimiert für Foldables und Tablets." 
        },
        { 
          icon: "error", 
          title: "Smartere Fehler", 
          desc: "Die App behandelt Wetter-API-Fehler jetzt elegant mit klaren, hilfreichen Nachrichten." 
        },
        { 
          icon: "palette", 
          title: "Visueller Feinschliff", 
          desc: "Aktualisierte AMOLED-Theme-Oberflächenfarben und dynamische Statusleisten-Scrims hinzugefügt." 
        }
      ]
    },
    features: {
      title: "Präzisions-Toolkit",
      cta_project: "Technische Übersicht erkunden",
      items: [
        { 
          title: "Präzisionsnavigation", 
          desc: "Wechseln Sie zwischen magnetischem und wahrem Norden mit professioneller Genauigkeit und haptischem Feedback." 
        },
        { 
          title: "Smarte Umgebung", 
          desc: "Echtzeit-Höhe, Temperatur und UV-Index mit proaktiven Insight Engine 4.0 Warnungen." 
        },
        { 
          title: "Innovatives Wasserwaagen-Tool", 
          desc: "Überprüfen Sie Oberflächenneigungen mit expressiven Animationen: Welleneffekte und flüssige Wogen." 
        },
        { 
          title: "Adaptive Widgets", 
          desc: "Schöne Startbildschirm-Widgets, die ihre Größe intelligent von 1x1 bis zu ganzen Panels anpassen." 
        }
      ]
    },
    plus: {
      title: "Das ultimative Erlebnis freischalten",
      desc: "Erhalten Sie exklusive Widgets, erweiterte Vorhersage-Diagramme, Cloud-Hintergrundbilder und entfernen Sie Werbung.",
      cta: "Pixel Compass+ entdecken"
    },
    plus_page: {
      title: "Erweitern Sie Ihr Erlebnis",
      badge: "Flexible Optionen",
      cta: "Jetzt freischalten",
      disclaimer: "Abonnement oder Lebenszeit-Optionen verfügbar.",
      why_title: "Warum Plus?",
      features_title: "Der Plus-Vorteil",
      features_subtitle: "Visualisierung der Leistung, die Sie sofort erhalten.",
      faq_title: "Häufige Fragen"
    },
    privacy_section: {
      title: "Datenschutz zuerst",
      cta_policy: "Richtlinie lesen",
      cta_tech: "Technische Details",
      cards: [
        { 
          icon: "location_off", 
          title: "Kein verstecktes Tracking", 
          desc: "Der Standort wird nur für Navigation und Wetter verwendet, wenn die App aktiv ist." 
        },
        { 
          icon: "phonelink_lock", 
          title: "Verarbeitung auf dem Gerät", 
          desc: "Sensordaten werden vollständig lokal auf Ihrem Gerät verarbeitet." 
        },
        { 
          icon: "cloud_off", 
          title: "Transparente Daten", 
          desc: "Wir speichern Ihren Standortverlauf oder Zahlungsdaten nicht auf unseren Servern." 
        },
        { 
          icon: "block", 
          title: "Werbefrei-Option", 
          desc: "Plus entfernt alle Werbung von Drittanbietern für ein saubereres, schnelleres Erlebnis." 
        }
      ]
    },
    footer: {
      links: "Nützliche Links",
      rights: "Pixel Compass. Alle Rechte vorbehalten.",
      theme_title: "Design & Erscheinungsbild"
    },
    changelog: {
      title: "Versionsgeschichte",
      subtitle: "Verfolgen Sie die Entwicklung von Pixel Compass. Jedes Feature, jede Verbesserung und jeder Fix unten detailliert.",
      search_placeholder: "Suche nach Features, Versionen...",
      latest_release: "Neueste Version",
      released: "Veröffentlicht",
      update_now: "Jetzt aktualisieren",
      on_this_page: "Auf dieser Seite",
      load_more: "Ältere Versionen laden",
      no_results: "Keine Versionen gefunden.",
      jump_to: "Springe zu Version",
      read_more: "Release Notes lesen",
      collapse: "Einklappen",
      back_to_top: "Nach oben",
      plus_promo: {
        title: "Entwicklung unterstützen",
        subtitle: "Schalten Sie Widgets und Anpassungen frei und helfen Sie uns, neue Features zu bauen.",
        cta: "Pixel Compass+ holen"
      },
      beta_program: {
        title: "Beta-Programm beitreten",
        subtitle: "Testen Sie neue Funktionen vor der offiziellen Veröffentlichung.",
        cta: "Am Beta-Programm teilnehmen",
        badge: "Vorabzugang"
      },
      wear_os_promo: {
        title: "Wear OS-Erlebnis",
        subtitle_available: "Navigieren Sie direkt von Ihrem Handgelenk. Nahtlose Integration.",
        subtitle_coming: "Erscheint im 1. Quartal 2026 für Ihre Smartwatch.",
        cta: "Auf der Uhr anzeigen",
        badge: "Begleiter"
      }
    },
    roadmap_page: {
      title: "Produkt-Roadmap",
      subtitle: "Sehen Sie, was wir gebaut haben und wohin wir als nächstes gehen.",
      suggest_btn: "Feature vorschlagen",
      toc_title: "Zeitstrahl"
    },
    privacy_page: {
      page_title: "Datenschutzerklärung",
      last_updated: "Zuletzt aktualisiert:",
      table_of_contents: "Inhaltsverzeichnis",
      contact_title: "Haben Sie Fragen?",
      contact_desc: "Wenn Sie Bedenken bezüglich Ihrer Daten haben, kontaktieren Sie uns bitte.",
      contact_btn: "Support kontaktieren",
      print_btn: "Richtlinie drucken"
    },
    help_page: {
      page_title: "Hilfe & FAQ",
      subtitle: "Finden Sie Antworten und erfahren Sie, wie Sie das Beste aus Pixel Compass herausholen.",
      search_placeholder: "Nach Antworten suchen...",
      table_of_contents: "Themen",
      contact_title: "Kommen Sie nicht weiter?",
      contact_desc: "Finden Sie nicht, was Sie suchen? Unser Team ist hier, um zu helfen.",
      contact_btn: "Support kontaktieren",
      no_results: "Keine Themen gefunden."
    },
    overview_page: {
      title: "Technische Übersicht",
      subtitle: "Ein tiefer Einblick in die Architektur, Sensoren und das Engineering.",
      github_btn: "Auf GitHub ansehen",
      toc_title: "Auf dieser Seite"
    }
  }
};