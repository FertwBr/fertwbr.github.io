export default {
  common: {
    offline: "Você está offline no momento.",
  },
  redirect: {
    launching: "Iniciando Aplicativo...",
    did_open: "O app abriu?",
    open_again: "Abrir App Novamente",
    get_on_store: "Baixar na Play Store"
  },
  error: {
    title: "Falha no Sistema",
    desc_1: "Algo inesperado aconteceu no núcleo da aplicação.",
    desc_2: "Não se preocupe, nenhum dado foi perdido.",
    reload: "Recarregar Sistema",
    home: "Voltar ao Início",
    show_details: "Mostrar Detalhes Técnicos",
    hide_details: "Ocultar Detalhes Técnicos",
    copy: "Copiar",
    copied: "Copiado"
  },
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
        id: "portfolio_site",
        title: "Este Portfólio",
        category: "Engenharia Web",
        desc: "Uma análise profunda da arquitetura deste próprio site. Desenvolvido com React, Material Design 3 e um motor Markdown personalizado.",
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
    desc: "Tem um projeto em mente ou quer discutir as novidades do mundo Android?",
    email: "Enviar Email",
    linkedin: "LinkedIn",
    github: "GitHub"
  },
  footer: {
    rights: "Todos os direitos reservados.",
    built: "Design e Desenvolvimento por Fernando Vaz 🇧🇷",
    useful_links: "Links Úteis",
    social_title: "Conectar",
    appearance: {
      title: "Tema e Aparência",
      language_selector: "Idioma",
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
    plus_teaser: {
      title: "Desbloqueie a Experiência Suprema",
      description: "Deixe de ser reativo e torne-se proativo com análises automatizadas. Atualize para o **Pixel Pulse+** para proteger sua saúde auditiva continuamente.",
      cta: "Descubra o Pixel Pulse+",
      items: [
        {
          icon: "shield",
          title: "Orçamento de Ruído",
          desc: "Rastreamento semanal baseado na OMS garante que você permaneça dentro dos limites seguros."
        },
        {
          icon: "notifications_active",
          title: "Alertas Proativos",
          desc: "Seja notificado antes que danos ocorram com verificações inteligentes em segundo plano."
        },
        {
          icon: "auto_awesome",
          title: "Monitoramento Automático",
          desc: "Rastreamento eficiente da exposição em segundo plano sem drenar a bateria."
        },
        {
          icon: "table_chart",
          title: "Exportação CSV",
          desc: "Propriedade total dos dados. Exporte seu histórico para análise detalhada."
        },
        {
          icon: "palette",
          title: "9 Temas Premium",
          desc: "Desbloqueie os modos Emerald, Sunset e preto puro AMOLED."
        },
        {
          icon: "equalizer",
          title: "Ponderação Pro",
          desc: "Acesse Ponderação C e Ponderação Z para medições técnicas."
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
    plus_page: {
      title: "Eleve Sua Experiência",
      badge: "Compra Única",
      cta: "Desbloquear Acesso Vitalício",
      disclaimer: "Sem assinaturas. Sem taxas ocultas.",
      why_title: "Por que uma Compra Única?",
      features_title: "A Vantagem Plus",
      features_subtitle: "Visualizando o poder que você recebe instantaneamente.",
      faq_title: "Perguntas Frequentes"
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
      beta_program: {
        title: "Participe da Beta",
        subtitle: "Teste novos recursos antes que sejam lançados publicamente.",
        cta: "Participar do Programa Beta",
        badge: "Acesso Antecipado"
      },
      wear_os_promo: {
        title: "Experiência Wear OS",
        subtitle_available: "Navegue diretamente do seu pulso. Integração perfeita.",
        subtitle_coming: "Chegando ao seu pulso no 1º trimestre de 2026.",
        cta: "Ver no Relógio",
        badge: "Complemento"
      }
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
  },
  pixel_compass: {
    nav: {
      index: "Visão Geral",
      plus: "Pixel Compass+",
      changelog: "Atualizações",
      roadmap: "Roadmap",
      privacy: "Privacidade",
      help: "Ajuda",
      overview: "Docs",
      back: "Voltar ao Portfólio"
    },
    hero: {
      title: "Seu Compasso Inteligente para Telefone e Relógio",
      subtitle: "Navegue pelo seu mundo com estilo, precisão e um toque de mágica Material 3. O companheiro de navegação definitivo para Android.",
      download: "Baixar na Play Store"
    },
    new_features: {
      label: "Novo na v1.15 Beta",
      title: "Experiência Unificada",
      view_history: "Ver Histórico Completo",
      items: [
        {
          icon: "responsive_layout",
          title: "Layouts Responsivos",
          desc: "Telas de 'Boas-vindas' e 'Plano' totalmente redesenhadas e otimizadas para Dobráveis e Tablets."
        },
        {
          icon: "error",
          title: "Erros Mais Inteligentes",
          desc: "O app agora lida graciosamente com erros de API de clima com mensagens claras e úteis."
        },
        {
          icon: "palette",
          title: "Polimento Visual",
          desc: "Cores de superfície do Tema AMOLED atualizadas e adicionados scrims dinâmicos na barra de status."
        }
      ]
    },
    plus_teaser: {
      title: "Eleve Sua Experiência",
      description: "Atualize para o **Pixel Compass+** e desbloqueie um conjunto de ferramentas profissionais projetadas para precisão. Tenha acesso exclusivo a widgets poderosos, dados ambientais avançados e gráficos interativos.",
      cta: "Descubra o Pixel Compass+",
      items: [
        {
          icon: "widgets",
          title: "Suíte de Widgets",
          desc: "Widgets exclusivos de Relógio, Clima e Bússola para sua tela inicial."
        },
        {
          icon: "query_stats",
          title: "Gráficos de Previsão",
          desc: "Toque em qualquer cartão para revelar tendências horárias de Chuva, Vento e UV."
        },
        {
          icon: "insights",
          title: "Insights Inteligentes",
          desc: "Alertas proativos como 'Chuva começando em breve' ou 'Índice UV alto'."
        },
        {
          icon: "air",
          title: "Barômetro e Vento",
          desc: "Rastreamento de pressão em tempo real e direção do vento na bússola."
        },
        {
          icon: "wb_sunny",
          title: "Sol e Lua",
          desc: "Horários precisos para nascer e pôr do sol e rastreamento da trajetória solar."
        },
        {
          icon: "speed",
          title: "Preciso",
          desc: "Dados meteorológicos e de altitude atualizados até 4x mais rápido que na versão gratuita."
        }
      ]
    },
    features: {
      title: "Kit de Precisão",
      cta_project: "Explorar Visão Técnica",
      items: [
        {
          title: "Navegação de Precisão",
          desc: "Alterne entre Norte Magnético e Verdadeiro com precisão profissional e feedback háptico."
        },
        {
          title: "Ambiente Inteligente",
          desc: "Altitude, temperatura e índice UV em tempo real com alertas proativos do Insight Engine 4.0."
        },
        {
          title: "Nível Inovador",
          desc: "Verifique o nivelamento de superfícies com animações expressivas: efeitos de ondulação e ondas fluidas."
        },
        {
          title: "Widgets Adaptáveis",
          desc: "Belos widgets de tela inicial que redimensionam de forma inteligente de 1x1 a painéis completos."
        }
      ]
    },
    plus: {
      title: "Desbloqueie a Experiência Definitiva",
      desc: "Obtenha widgets exclusivos, gráficos de previsão avançados, papéis de parede na nuvem e remova anúncios.",
      cta: "Descobrir o Pixel Compass+"
    },
    plus_page: {
      title: "Eleve Sua Experiência",
      badge: "Opções Flexíveis",
      cta: "Desbloquear Agora",
      disclaimer: "Opções de Assinatura ou Vitalícia disponíveis.",
      why_title: "Por que ser Plus?",
      features_title: "A Vantagem Plus",
      features_subtitle: "Visualizando o poder que você recebe instantaneamente.",
      faq_title: "Perguntas Frequentes"
    },
    privacy_section: {
      title: "Privacidade em Primeiro Lugar",
      cta_policy: "Ler Política",
      cta_tech: "Detalhes Técnicos",
      cards: [
        {
          icon: "location_off",
          title: "Sem Rastreamento Oculto",
          desc: "A localização é usada apenas para navegação e clima quando o app está ativo."
        },
        {
          icon: "phonelink_lock",
          title: "Processamento no Dispositivo",
          desc: "Os dados dos sensores são processados inteiramente localmente no seu dispositivo."
        },
        {
          icon: "cloud_off",
          title: "Dados Transparentes",
          desc: "Não armazenamos seu histórico de localização ou detalhes de pagamento em nossos servidores."
        },
        {
          icon: "block",
          title: "Opção Sem Anúncios",
          desc: "O Plus remove todos os anúncios de terceiros para uma experiência mais limpa e rápida."
        }
      ]
    },
    footer: {
      links: "Links Úteis",
      rights: "Pixel Compass. Todos os direitos reservados.",
      theme_title: "Tema e Aparência"
    },
    changelog: {
      title: "Histórico de Versões",
      subtitle: "Acompanhe a evolução do Pixel Compass. Cada recurso, melhoria e correção detalhados abaixo.",
      search_placeholder: "Buscar recursos, versões...",
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
        subtitle: "Desbloqueie widgets, personalização e nos ajude a construir novos recursos.",
        cta: "Obter Pixel Compass+"
      },
      beta_program: {
        title: "Participe da Beta",
        subtitle: "Teste novos recursos antes que sejam lançados publicamente.",
        cta: "Participar do Programa Beta",
        badge: "Acesso Antecipado"
      },
      wear_os_promo: {
        title: "Experiência Wear OS",
        subtitle_available: "Navegue diretamente do seu pulso. Integração perfeita.",
        subtitle_coming: "Chegando ao seu pulso no 1º trimestre de 2026.",
        cta: "Ver no Relógio",
        badge: "Complemento"
      }
    },
    roadmap_page: {
      title: "Roadmap do Produto",
      subtitle: "Veja o que já construímos e para onde estamos indo.",
      suggest_btn: "Sugerir um Recurso",
      toc_title: "Cronograma"
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
      subtitle: "Encontre respostas e aprenda como aproveitar ao máximo o Pixel Compass.",
      search_placeholder: "Buscar respostas...",
      table_of_contents: "Tópicos",
      contact_title: "Ainda está com problemas?",
      contact_desc: "Não encontrou o que procurava? Nossa equipe está aqui para ajudar.",
      contact_btn: "Contatar Suporte",
      no_results: "Nenhum tópico encontrado para sua busca."
    },
    overview_page: {
      title: "Visão Geral Técnica",
      subtitle: "Mergulhe na arquitetura, sensores e engenharia.",
      github_btn: "Ver no GitHub",
      toc_title: "Nesta Página"
    }
  }
};