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
        icon_url: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Pulse/art/icon.svg",
        link: "/PixelPulse",
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
        icon_url: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Compass/art/icon.svg",
        link: "/PixelCompass",
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
    linkedin: "Connect on LinkedIn"
  },
  footer: {
    rights: "All rights reserved.",
    built: "Designed & Built by Fernando Vaz"
  }
};