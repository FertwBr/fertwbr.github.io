export default {
  hero: {
    greeting: "Olá, sou",
    role_prefix: "Eu crio",
    roles: ["Apps Android", "Sistemas Backend", "Experiências", "Soluções Digitais"],
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
      education: { title: "Educação", value: "Engenharia de Software", sub: "UniCesumar" },
      location: { title: "Localização", value: "Salvador, Brasil", sub: "GMT-3" },
      stack: { title: "Stack Principal", value: "Kotlin & Java", sub: "Full Cycle Dev" }
    }
  },
  projects: {
    title: "Trabalhos Selecionados",
    subtitle: "Uma vitrine de profundidade técnica e resolução criativa de problemas.",
    view_project: "Ver Estudo de Caso",
    source_code: "Código Fonte",
    items: [
      {
        id: "pixel_pulse",
        title: "Pixel Pulse",
        category: "Engenharia Android",
        desc: "Medidor de nível sonoro avançado com análise FFT em tempo real, persistência Room Database e serviços em segundo plano otimizados via WorkManager.",
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
        desc: "Ferramenta de navegação premium com algoritmos de fusão de sensores, widgets Jetpack Glance e arquitetura multi-módulo para separação limpa de responsabilidades.",
        tags: ["Wear OS", "Sensores", "Glance", "Retrofit"],
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
        desc: "Plataforma de inovação corporativa permitindo que equipes enviem, votem e acompanhem ideias. Construído com Spring Boot Security e PostgreSQL.",
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
    title: "Código Aberto",
    stats: {
      contributions: "Contribuições no Ano",
      repos: "Repositórios",
      stars: "Total de Estrelas"
    }
  },
  contact: {
    title: "Vamos Trabalhar Juntos",
    desc: "Tem uma ideia de projeto ou quer discutir as novidades em tecnologia Android?",
    email: "Enviar Email",
    linkedin: "Conectar no LinkedIn"
  },
  footer: {
    rights: "Todos os direitos reservados.",
    built: "Design & Construção por Fernando Vaz"
  },
  pixel_pulse: {
    nav: {
      index: "Visão Geral",
      plus: "Pixel Pulse+",
      changelog: "Atualizações",
      roadmap: "Futuro",
      privacy: "Privacidade",
      help: "Ajuda",
      overview: "Docs",
      back: "Voltar ao Portfólio"
    },
    hero: {
      title: "Seu Treinador Auditivo Inteligente",
      subtitle: "Meça seu mundo com estilo e precisão. Design lindo, feito para Android.",
      download: "Baixar na Play Store"
    },
    new_features: {
      label: "Novo na v1.17",
      title: "Personalização Profunda",
      view_history: "Ver Histórico Completo",
      items: [
        {
          icon: "edit_attributes",
          title: "Editor de Toolbar",
          desc: "Arraste e solte para personalizar seu espaço. Coloque suas ferramentas onde precisar."
        },
        {
          icon: "palette",
          title: "9 Novos Temas",
          desc: "Do Esmeralda ao Pôr do Sol. Mais um modo AMOLED preto puro para economizar bateria."
        },
        {
          icon: "share",
          title: "Exportar Imagens",
          desc: "Compartilhe seus gráficos e estatísticas como belas imagens diretamente nas redes sociais."
        }
      ]
    },
    features: {
      title: "Ferramentas Poderosas, Grátis para Todos",
      cta_project: "Explorar Visão Técnica",
      items: [
        {
          title: "Medidor em Tempo Real",
          desc: "Medidor animado com mudança dinâmica de cores baseada no nível de ruído."
        },
        {
          title: "Histórico de Sessões",
          desc: "Salve medições e analise detalhes com gráficos interativos."
        },
        {
          title: "Calibração Precisa",
          desc: "Ajuste o sensor comparando com um dispositivo de referência."
        },
        {
          title: "Material You",
          desc: "Adapta-se à paleta de cores do seu papel de parede automaticamente."
        }
      ]
    },
    plus: {
      title: "Desbloqueie a Experiência Suprema",
      desc: "Vá de reativo a proativo com análise automatizada.",
      cta: "Descubra o Pixel Pulse+"
    },
    privacy_section: {
      title: "Privacidade Primeiro",
      cta_policy: "Ler Política de Privacidade",
      cta_tech: "Detalhes Técnicos",
      cards: [
        {
          icon: "mic_off",
          title: "Sem Gravação de Áudio",
          desc: "O áudio bruto é processado instantaneamente e descartado. Nunca salvamos suas conversas."
        },
        {
          icon: "phonelink_lock",
          title: "Apenas no Dispositivo",
          desc: "Toda análise acontece no seu celular. Seus dados nunca saem do dispositivo."
        },
        {
          icon: "block",
          title: "Sem Anúncios ou Rastreio",
          desc: "Uma experiência limpa e focada, sem rastreadores de terceiros ou publicidade invasiva."
        },
        {
          icon: "visibility",
          title: "Armazenamento Transparente",
          desc: "Você tem o controle total. Exporte ou apague seu histórico de sessões a qualquer momento."
        }
      ]
    },
    footer: {
      rights: "© 2025 Pixel Pulse. Desenvolvido por Fernando Vaz.",
      links: "Links Úteis"
    },
    changelog: {
      title: "Histórico de Versões",
      subtitle: "Acompanhe a evolução do Pixel Pulse. Cada recurso, melhoria e correção detalhada abaixo.",
      search_placeholder: "Buscar recursos, versões (ex: 1.15, Beta)...",
      latest_release: "Última Versão",
      released: "Lançado em",
      update_now: "Atualizar Agora",
      on_this_page: "Nesta Página",
      load_more: "Carregar Versões Antigas",
      no_results: "Nenhuma versão encontrada com esses filtros.",
      jump_to: "Ir para Versão",
      read_more: "Ler Notas da Versão",
      collapse: "Recolher",
      back_to_top: "Voltar ao Topo",
      plus_promo: {
        title: "Apoie o Desenvolvimento",
        subtitle: "Desbloqueie o monitoramento automático e ajude a criar novos recursos.",
        cta: "Obter Pixel Pulse+"
      },
    },
    privacy_page: {
      page_title: "Política de Privacidade",
      last_updated: "Atualizado em:",
      table_of_contents: "Índice",
      contact_title: "Dúvidas?",
      contact_desc: "Se tiver qualquer preocupação sobre seus dados, entre em contato.",
      contact_btn: "Contatar Suporte",
      print_btn: "Imprimir"
    },
    help_page: {
      page_title: "Ajuda e FAQ",
      subtitle: "Encontre respostas e aprenda a tirar o máximo proveito do Pixel Pulse.",
      search_placeholder: "Busque por respostas (ex: Calibração, Exportar)...",
      table_of_contents: "Tópicos",
      contact_title: "Ainda com dúvidas?",
      contact_desc: "Não encontrou o que procurava? Nossa equipe está aqui para ajudar.",
      contact_btn: "Contatar Suporte",
      no_results: "Nenhum tópico encontrado para sua busca."
    },
    roadmap_page: {
      title: "Roadmap do Produto",
      subtitle: "Veja o que construímos e para onde vamos a seguir.",
      suggest_btn: "Sugerir Recurso",
      toc_title: "Linha do Tempo"
    },
    overview_page: {
      title: "Visão Técnica",
      subtitle: "Mergulhe na arquitetura, stack tecnológica e engenharia de privacidade.",
      github_btn: "Ver no GitHub",
      toc_title: "Nesta Página"
    },
  }
};