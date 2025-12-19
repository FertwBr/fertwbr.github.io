export default {
  hero: {
    greeting: "Hello, I'm",
    role_prefix: "I build",
    roles: ["Android Apps", "Backend Systems", "User Experiences", "Digital Solutions"],
    cta_primary: "View Projects",
    cta_secondary: "Contact Me"
  },
  about: {
    title: "About Me",
    subtitle: "Engineering meets Design",
    bio_1: "I'm Fernando Vaz, a Software Engineer graduated from UniCesumar, passionate about the intersection of robust code and intuitive design.",
    bio_2: "Specializing in the Android ecosystem (Kotlin/Jetpack Compose) and scalable Backends (Spring Boot). I create solutions that are not only functional but delightful to use.",
    stats: {
      exp: "Years Exp.",
      projects: "Projects",
      clients: "Happy Clients"
    },
    cards: {
      education: { title: "Education", value: "B.S. Software Engineering", sub: "UniCesumar" },
      location: { title: "Location", value: "Salvador, Brazil", sub: "GMT-3" },
      stack: { title: "Main Stack", value: "Kotlin & Java", sub: "Full Cycle Dev" }
    }
  },
  projects: {
    title: "Selected Works",
    subtitle: "A showcase of technical depth and creative problem solving.",
    view_project: "View Case Study",
    source_code: "Source Code",
    items: [
      {
        id: "pixel_pulse",
        title: "Pixel Pulse",
        category: "Android Engineering",
        desc: "Advanced sound level meter featuring real-time FFT analysis, Room Database persistence, and battery-optimized background services via WorkManager.",
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
        desc: "Premium navigation tool with sensor fusion algorithms, Jetpack Glance widgets, and multi-module architecture for clean separation of concerns.",
        tags: ["Wear OS", "Sensors", "Glance", "Retrofit"],
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
        desc: "Corporate innovation platform enabling teams to submit, vote on, and track ideas. Built with Spring Boot Security and PostgreSQL.",
        tags: ["Spring Boot", "Java", "PostgreSQL", "JWT"],
        link: "https://github.com/FertwBr/boxIdea",
        repo: "https://github.com/FertwBr/boxIdea",
        color: "tertiary",
        icon: "lightbulb"
      }
    ]
  },
  tech: {
    title: "Technologies",
    subtitle: "Tools I use to bring ideas to life"
  },
  github: {
    title: "Open Source",
    stats: {
      contributions: "Year Contributions",
      repos: "Repositories",
      stars: "Total Stars"
    }
  },
  contact: {
    title: "Let's Work Together",
    desc: "Have a project in mind or want to discuss the latest in Android tech?",
    email: "Send Email",
    linkedin: "LinkedIn"
  },
  footer: {
    rights: "All rights reserved.",
    built: "Designed & Built by Fernando Vaz 🇧🇷",
    useful_links: "Useful Links",
    appearance: {
      title: "Theme & Appearance",
      en: "English",
      pt: "Português"
    }
  },
  pixel_pulse: {
    nav: {
      index: "Overview",
      plus: "Pixel Pulse+",
      changelog: "Updates",
      roadmap: "Roadmap",
      privacy: "Privacy",
      help: "Help",
      overview: "Docs",
      back: "Back to Portfolio"
    },
    hero: {
      title: "Your Smart Sound & Hearing Coach",
      subtitle: "Measure your world with style and precision. Beautifully designed for Android.",
      download: "Download on Play Store"
    },
    new_features: {
      label: "New in v1.17",
      title: "Deep Customization",
      view_history: "View Full History",
      items: [
        {
          icon: "edit_attributes",
          title: "Toolbar Editor",
          desc: "Drag and drop to customize your workspace. Put your most used tools exactly where you need them."
        },
        {
          icon: "palette",
          title: "9 New Themes",
          desc: "From Emerald to Sunset. Plus a true black AMOLED mode to save battery while you measure."
        },
        {
          icon: "share",
          title: "Image Export",
          desc: "Share your charts and session stats as beautiful images directly to social media."
        }
      ]
    },
    features: {
      title: "A Powerful Toolkit, Free for Everyone",
      cta_project: "Explore Technical Overview",
      items: [
        {
          title: "Expressive Real-Time Meter",
          desc: "Animated gauge with dynamic color shifts from calm blues to warning reds."
        },
        {
          title: "Session History",
          desc: "Save measurements and analyze details with interactive charts."
        },
        {
          title: "Precision Calibration",
          desc: "Tune the sensor against a reference device for professional accuracy."
        },
        {
          title: "Material You",
          desc: "Adapts to your wallpaper's color palette for a unique look."
        }
      ]
    },
    plus: {
      title: "Unlock the Ultimate Experience",
      desc: "Go from reactive to proactive with automated analysis.",
      cta: "Discover Pixel Pulse+"
    },
    privacy_section: {
      title: "Privacy First",
      cta_policy: "Read Privacy Policy",
      cta_tech: "Technical Details",
      cards: [
        {
          icon: "mic_off",
          title: "No Audio Recorded",
          desc: "Raw audio is processed instantly and discarded. We never save your conversations."
        },
        {
          icon: "phonelink_lock",
          title: "On-Device Only",
          desc: "All analysis happens on your phone. Your data never leaves your device."
        },
        {
          icon: "block",
          title: "No Ads or Trackers",
          desc: "A clean experience without third-party tracking or invasive advertising."
        },
        {
          icon: "visibility",
          title: "Transparent Storage",
          desc: "You have full control. Export or delete your session history at any time."
        }
      ]
    },
    footer: {
      rights: "Pixel Pulse. All rights reserved.",
      links: "Useful Links",
      theme_title: "Theme & Appearance"
    },
    changelog: {
      title: "Version History",
      subtitle: "Track the evolution of Pixel Pulse. Every feature, improvement, and fix detailed below.",
      search_placeholder: "Search features, versions (e.g. 1.15, Beta)...",
      latest_release: "Latest Release",
      released: "Released",
      update_now: "Update Now",
      on_this_page: "On This Page",
      load_more: "Load Older Versions",
      no_results: "No versions found matching your filters.",
      jump_to: "Jump to Version",
      read_more: "Read Release Notes",
      collapse: "Collapse",
      back_to_top: "Back to Top",
      plus_promo: {
        title: "Support Development",
        subtitle: "Unlock auto-monitoring and help us build new features.",
        cta: "Get Pixel Pulse+"
      },
    },
    privacy_page: {
      page_title: "Privacy Policy",
      last_updated: "Last Updated:",
      table_of_contents: "Table of Contents",
      contact_title: "Have Questions?",
      contact_desc: "If you have any concerns about your data, please contact us.",
      contact_btn: "Contact Support",
      print_btn: "Print Policy"
    },
    help_page: {
      page_title: "Help & FAQ",
      subtitle: "Find answers and learn how to get the most out of Pixel Pulse.",
      search_placeholder: "Search for answers (e.g. Calibration, Export)...",
      table_of_contents: "Topics",
      contact_title: "Still stuck?",
      contact_desc: "Can't find what you're looking for? Our team is here to help.",
      contact_btn: "Contact Support",
      no_results: "No topics found matching your search."
    },
    roadmap_page: {
      title: "Product Roadmap",
      subtitle: "See what we've built and where we're heading next.",
      suggest_btn: "Suggest a Feature",
      toc_title: "Timeline"
    },
    overview_page: {
      title: "Technical Overview",
      subtitle: "Deep dive into the architecture, tech stack, and privacy engineering.",
      github_btn: "View on GitHub",
      toc_title: "On This Page"
    },
  }
};