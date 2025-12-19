export default {
  hero: {
    greeting: "Olá, eu sou",
    role_prefix: "Eu desenvolvo",
    roles: ["Apps Android", "Sistemas Backend", "Experiências de Usuário", "Soluções Digitais"],
    cta_primary: "Ver Projetos",
    cta_secondary: "Contato"
  },
  not_found: {
      page_title: "Página Não Encontrada",
      title: "404",
      subtitle: "Ops! No meio do nada.",
      message: "A página que você está procurando não existe no momento.",
      suggestion_title: "Você estava procurando por isso?",
      suggestion_desc: "Com base no seu link, achamos que você queria ir para",
      suggestion_btn: "Sim, Ir Para Lá",
      home_btn: "Ir para o Início",
      apps_btn: "Ver Aplicativos"
    },
  about: {
    title: "Sobre Mim",
    subtitle: "Engenharia encontra o Design",
    bio_1: "Sou Fernando Vaz, Engenheiro de Software formado pela UniCesumar, apaixonado pela intersecção entre código robusto e design intuitivo.",
    bio_2: "Especializado no ecossistema Android (Kotlin/Jetpack Compose) e Backends escaláveis (Spring Boot). Crio soluções que não são apenas funcionais, mas encantadoras de usar.",
    stats: {
      exp: "Anos de Exp.",
      projects: "Projetos",
      clients: "Clientes Felizes"
    },
    cards: {
      education: { title: "Formação", value: "Bacharel em Eng. de Software", sub: "UniCesumar" },
      location: { title: "Localização", value: "Salvador, Brasil", sub: "GMT-3" },
      stack: { title: "Stack Principal", value: "Kotlin & Java", sub: "Full Cycle Dev" }
    }
  },
  projects: {
    title: "Trabalhos Selecionados",
    subtitle: "Uma vitrine de profundidade técnica e solução criativa de problemas.",
    view_project: "Ver Estudo de Caso",
    source_code: "Código Fonte",
    items: [
      {
        id: "pixel_pulse",
        title: "Pixel Pulse",
        category: "Engenharia Android",
        desc: "Medidor de nível de som avançado com análise FFT em tempo real, persistência em banco de dados Room e serviços de segundo plano otimizados via WorkManager.",
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
        desc: "Ferramenta de navegação premium com algoritmos de fusão de sensores, widgets Jetpack Glance e arquitetura multi-módulo para separação de responsabilidades.",
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
        desc: "Plataforma de inovação corporativa que permite às equipes enviar, votar e acompanhar ideias. Construído com Spring Boot Security e PostgreSQL.",
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
      contributions: "Contribuições no Ano",
      repos: "Repositórios",
      stars: "Total de Estrelas"
    }
  },
  contact: {
    title: "Vamos Trabalhar Juntos",
    desc: "Tem um projeto em mente ou quer discutir as novidades em tecnologia Android?",
    email: "Enviar E-mail",
    linkedin: "LinkedIn"
  },
  footer: {
    rights: "Todos os direitos reservados.",
    built: "Projetado e Construído por Fernando Vaz 🇧🇷",
    useful_links: "Links Úteis",
    theme_title: "Tema e Aparência",
    appearance: {
      title: "Tema e Aparência",
      en: "Inglês",
      pt: "Português"
    }
  },
  pixel_pulse: {
    nav: {
      index: "Visão Geral",
      plus: "Pixel Pulse+",
      changelog: "Atualizações",
      roadmap: "Roadmap",
      privacy: "Privacidade",
      help: "Ajuda",
      overview: "Docs",
      back: "Voltar ao Portfólio"
    },
    hero: {
      title: "Seu Coach Inteligente de Som e Audição",
      subtitle: "Meça o seu mundo com estilo e precisão. Lindamente projetado para Android.",
      download: "Baixar na Play Store"
    },
    new_features: {
      label: "Novo na v1.17",
      title: "Customização Profunda",
      view_history: "Ver Histórico Completo",
      items: [
        {
          icon: "edit_attributes",
          title: "Editor de Ferramentas",
          desc: "Arraste e solte para personalizar seu espaço de trabalho. Coloque suas ferramentas mais usadas exatamente onde você precisa."
        },
        {
          icon: "palette",
          title: "9 Novos Temas",
          desc: "De Esmeralda a Pôr do Sol. Incluindo um modo AMOLED preto real para economizar bateria enquanto você mede."
        },
        {
          icon: "share",
          title: "Exportação de Imagem",
          desc: "Compartilhe seus gráficos e estatísticas de sessão como imagens bonitas diretamente nas redes sociais."
        }
      ]
    },
    features: {
      title: "Um Kit de Ferramentas Poderoso, Grátis para Todos",
      cta_project: "Explorar Visão Técnica",
      items: [
        {
          title: "Medidor Expressivo em Tempo Real",
          desc: "Medidor animado com mudanças dinâmicas de cor, de azuis calmos a vermelhos de alerta."
        },
        {
          title: "Histórico de Sessões",
          desc: "Salve medições e analise detalhes com gráficos interativos."
        },
        {
          title: "Calibração de Precisão",
          desc: "Ajuste o sensor comparando-o com um dispositivo de referência para precisão profissional."
        },
        {
          title: "Material You",
          desc: "Adapta-se à paleta de cores do seu papel de parede para um visual único."
        }
      ]
    },
    plus: {
      title: "Desbloqueie a Experiência Definitiva",
      desc: "Vá do reativo ao proativo com análise automatizada.",
      cta: "Descobrir o Pixel Pulse+"
    },
    privacy_section: {
      title: "Privacidade em Primeiro Lugar",
      cta_policy: "Ler Política de Privacidade",
      cta_tech: "Detalhes Técnicos",
      cards: [
        {
          icon: "mic_off",
          title: "Nenhum Áudio Gravado",
          desc: "O áudio bruto é processado instantaneamente e descartado. Nunca salvamos suas conversas."
        },
        {
          icon: "phonelink_lock",
          title: "Apenas no Dispositivo",
          desc: "Toda a análise acontece no seu telefone. Seus dados nunca saem do seu dispositivo."
        },
        {
          icon: "block",
          title: "Sem Anúncios ou Rastreadores",
          desc: "Uma experiência limpa, sem rastreamento de terceiros ou publicidade invasiva."
        },
        {
          icon: "visibility",
          title: "Armazenamento Transparente",
          desc: "Você tem controle total. Exporte ou exclua seu histórico de sessões a qualquer momento."
        }
      ]
    },
    footer: {
      rights: "Pixel Pulse. Todos os direitos reservados.",
      links: "Links Úteis",
      theme_title: "Tema e Aparência"
    },
    changelog: {
      title: "Histórico de Versões",
      subtitle: "Acompanhe a evolução do Pixel Pulse. Cada recurso, melhoria e correção detalhados abaixo.",
      search_placeholder: "Buscar recursos, versões (ex: 1.15, Beta)...",
      latest_release: "Último Lançamento",
      released: "Lançado",
      update_now: "Atualizar Agora",
      on_this_page: "Nesta Página",
      load_more: "Carregar Versões Antigas",
      no_results: "Nenhuma versão encontrada para seus filtros.",
      jump_to: "Ir para Versão",
      read_more: "Ler Notas de Lançamento",
      collapse: "Recolher",
      back_to_top: "Voltar ao Topo",
      plus_promo: {
        title: "Apoie o Desenvolvimento",
        subtitle: "Desbloqueie o monitoramento automático e nos ajude a construir novos recursos.",
        cta: "Obter Pixel Pulse+"
      },
    },
    privacy_page: {
      page_title: "Política de Privacidade",
      last_updated: "Última Atualização:",
      table_of_contents: "Índice",
      contact_title: "Tem Dúvidas?",
      contact_desc: "Se você tiver qualquer preocupação com seus dados, entre em contato conosco.",
      contact_btn: "Contatar Suporte",
      print_btn: "Imprimir Política"
    },
    help_page: {
      page_title: "Ajuda & FAQ",
      subtitle: "Encontre respostas e aprenda como aproveitar ao máximo o Pixel Pulse.",
      search_placeholder: "Buscar respostas (ex: Calibração, Exportar)...",
      table_of_contents: "Tópicos",
      contact_title: "Ainda está com problemas?",
      contact_desc: "Não encontrou o que procurava? Nossa equipe está aqui para ajudar.",
      contact_btn: "Contatar Suporte",
      no_results: "Nenhum tópico encontrado para sua busca."
    },
    roadmap_page: {
      title: "Roadmap do Produto",
      subtitle: "Veja o que já construímos e para onde estamos indo.",
      suggest_btn: "Sugerir um Recurso",
      toc_title: "Cronograma"
    },
    overview_page: {
      title: "Visão Geral Técnica",
      subtitle: "Mergulhe na arquitetura, stack tecnológica e engenharia de privacidade.",
      github_btn: "Ver no GitHub",
      toc_title: "Nesta Página"
    },
  }
};