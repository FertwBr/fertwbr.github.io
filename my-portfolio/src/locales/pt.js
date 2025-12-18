export default {
  hero: {
    greeting: "Olá, eu sou",
    role_prefix: "Eu crio",
    roles: ["Apps Android", "Sistemas Backend", "Experiências UX", "Soluções Digitais"],
    cta_primary: "Ver Projetos",
    cta_secondary: "Contato"
  },
  about: {
    title: "Sobre Mim",
    subtitle: "Engenharia encontra Design",
    bio_1: "Sou Fernando Vaz, Engenheiro de Software formado pela UniCesumar, apaixonado pela interseção entre código robusto e design intuitivo.",
    bio_2: "Especialista no ecossistema Android (Kotlin/Jetpack Compose) e Backends escaláveis (Spring Boot). Crio soluções que não são apenas funcionais, mas agradáveis de usar.",
    stats: {
      exp: "Anos Exp.",
      projects: "Projetos",
      clients: "Clientes Felizes"
    },
    cards: {
      education: { title: "Formação", value: "Engenharia de Software", sub: "UniCesumar" },
      location: { title: "Localização", value: "Salvador, Bahia", sub: "GMT-3" },
      stack: { title: "Stack Principal", value: "Kotlin & Java", sub: "Full Cycle Dev" }
    }
  },
  projects: {
    title: "Trabalhos Selecionados",
    subtitle: "Um showcase de profundidade técnica e resolução criativa.",
    view_project: "Ver Estudo de Caso",
    source_code: "Código Fonte",
    items: [
      {
        id: "pixel_pulse",
        title: "Pixel Pulse",
        category: "Engenharia Android",
        desc: "Medidor de som avançado com análise FFT em tempo real, persistência Room Database e serviços em segundo plano otimizados via WorkManager.",
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
        desc: "Ferramenta de navegação premium com fusão de sensores, widgets Jetpack Glance e arquitetura multi-módulo para separação limpa de responsabilidades.",
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
        desc: "Plataforma de inovação corporativa permitindo times submeter, votar e rastrear ideias. Construído com Spring Boot Security e PostgreSQL.",
        tags: ["Spring Boot", "Java", "PostgreSQL", "JWT"],
        link: "https://github.com/FertwBr/boxIdea",
        repo: "https://github.com/FertwBr/boxIdea",
        color: "tertiary",
        icon: "lightbulb"
      }
    ]
  },
  tech: {
    title: "Tecnologias",
    subtitle: "Ferramentas que uso para dar vida às ideias"
  },
  github: {
    title: "Open Source",
    stats: {
      contributions: "Contribuições (Ano)",
      repos: "Repositórios",
      stars: "Estrelas Totais"
    }
  },
  contact: {
    title: "Vamos Trabalhar Juntos",
    desc: "Tem um projeto em mente ou quer discutir as novidades do Android?",
    email: "Enviar Email",
    linkedin: "Conectar no LinkedIn"
  },
  footer: {
    rights: "Todos os direitos reservados.",
    built: "Design & Código por Fernando Vaz"
  }
};