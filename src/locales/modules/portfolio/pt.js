/**
 * Core portfolio localization strings (Portuguese).
 * Inclui elementos comuns de UI, seção hero, sobre e navegação geral do site.
 */
export default {
    nav: {
        index: "Início",
        overview: "Documentação",
        changelog: "Notas de Versão",
        roadmap: "Cronograma",
        privacy: "Privacidade",
        help: "Ajuda",
        back: "Voltar"
    },
    common: {
        offline: "Você está offline no momento.",
    },
    redirect: {
        launching: "Iniciando Aplicativo...",
        did_open: "O aplicativo abriu?",
        open_again: "Abrir Aplicativo Novamente",
        get_on_store: "Baixar na Play Store"
    },
    error: {
        title: "Falha no Sistema",
        desc_1: "Algo inesperado ocorreu no núcleo da aplicação.",
        desc_2: "Não se preocupe, nenhum dado foi perdido.",
        reload: "Reiniciar Sistema",
        home: "Voltar ao Início",
        show_details: "Mostrar Detalhes Técnicos",
        hide_details: "Ocultar Detalhes Técnicos",
        copy: "Copiar",
        copied: "Copiado"
    },
    hero: {
        greeting: "Olá, eu sou",
        name: "Fernando Vaz",
        role_prefix: "Eu desenvolvo",
        roles: ["Aplicativos Android", "Sistemas Backend", "Experiências de Usuário", "Soluções Digitais"],
        cta_primary: "Ver Projetos",
        cta_secondary: "Contato"
    },
    not_found: {
        page_title: "Página Não Encontrada",
        title: "404",
        subtitle: "Ops! Para o vazio.",
        message: "A página que você procura não existe no momento.",
        suggestion_title: "Você estava procurando por isto?",
        suggestion_desc: "Com base no seu link, acreditamos que você gostaria de ir para",
        suggestion_btn: "Sim, Ir para lá",
        home_btn: "Ir para o Início",
        apps_btn: "Ver Aplicativos"
    },
    about: {
        title: "Sobre Mim",
        subtitle: "A Engenharia encontra o Design",
        bio: {
            p1: {
                start: "Sou Fernando Vaz, Engenheiro de Software graduado pela ",
                highlight: "UniCesumar",
                end: ", apaixonado pela intersecção entre código robusto e design intuitivo."
            },
            p2: {
                start: "Especializado no ",
                highlight_1: "ecossistema Android",
                middle: " (Kotlin/Jetpack Compose) e em ",
                highlight_2: "Backends",
                end: " escaláveis (Spring Boot). Crio soluções que não são apenas funcionais, mas agradáveis de usar."
            }
        },
        cta_work: "Veja o meu trabalho",
        stats: {
            exp: "Anos de Exp.",
            projects: "Projetos",
            clients: "Clientes Satisfeitos"
        },
        cards: {
            education: {title: "Educação", value: "Bacharel em Eng. de Software", sub: "UniCesumar"},
            location: {title: "Localização", value: "Salvador, Brasil", sub: "GMT-3"},
            stack: {title: "Stack Principal", value: "Kotlin & Java", sub: "Dev Full Cycle"}
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
                desc: "Medidor de nível de som avançado com análise FFT em tempo real, persistência em Room Database e serviços de segundo plano otimizados para bateria via WorkManager.",
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
                desc: "Ferramenta de navegação premium com algoritmos de fusão de sensores, widgets Jetpack Glance e arquitetura multi-módulo para separação clara de responsabilidades.",
                tags: ["Wear OS", "Sensors", "Glance", "Retrofit"],
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
                desc: "Um mergulho profundo na arquitetura deste site. Construído com React, Material Design 3 e um motor de Markdown personalizado.",
                tags: ["React", "Vite", "Material 3", "Framer Motion"],
                icon: "web",
                link: "/site/overview",
                repo: "https://github.com/fertwbr/fertwbr.github.io",
                color: "tertiary"
            },
            {
                id: "box_idea",
                title: "boxIdea",
                category: "Web Full Stack",
                desc: "Plataforma de inovação corporativa que permite às equipes enviar, votar e acompanhar ideias. Desenvolvido com Spring Boot Security e PostgreSQL.",
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
        subtitle: "Ferramentas que utilizo para dar vida às ideias"
    },
    github: {
        title: "Código Aberto",
        view_profile: "Ver Perfil no GitHub",
        languages: "Linguagens Mais Utilizadas",
        default_bio: "Desenvolvendo soluções para Android e Web.",
        stats: {
            contributions: "Contribuições no Ano",
            repos: "Repositórios",
            stars: "Total de Estrelas",
            followers: "Seguidores"
        }
    },
    contact: {
        title: "Vamos Trabalhar Juntos",
        desc: "Tem um projeto em mente ou quer discutir as novidades em tecnologia Android?",
        email: "Enviar E-mail",
        linkedin: "LinkedIn",
        github: "GitHub"
    },
    footer: {
        rights: "Todos os direitos reservados.",
        built: "Projetado e Construído por Fernando Vaz 🇧🇷",
        useful_links: "Links Úteis",
        social_title: "Conectar",
        appearance: {
            title: "Tema e Aparência",
            language_selector: "Idioma",
            en: "English",
            pt: "Português"
        }
    },
    changelog: {
        title: "Histórico de Versões",
        subtitle: "Acompanhe a evolução do site. Aqui você encontrará um registro detalhado de novos recursos, melhorias e correções para cada versão.",
        search_placeholder: "Pesquisar recursos, versões...",
        latest_release: "Último Lançamento",
        released: "Lançado",
        update_now: "Atualizar Agora",
        on_this_page: "Nesta Página",
        read_more: "Ler Notas de Lançamento",
        collapse: "Recolher",
        back_to_top: "Voltar ao Topo",
        update_details: "Detalhes da Atualização",
        view_all: "Ver Todas as Atualizações",
        share_update: "Compartilhar Atualização",
        jump_to: "Ir para",
        version_not_found: "Versão não encontrada.",
        no_results: "Nenhum resultado encontrado.",
        back_to_changelog: "Voltar ao Changelog",
        load_more: "Carregar Mais",
        explore_more: "Explorar Mais",
        link_copied: "Link copiado para a área de transferência!",
        open_full_screen: "Abrir em tela cheia",
        share_tooltip: "Compartilhar esta atualização",
        previous_update: "Atualização Anterior",
        next_update: "Próxima Atualização",
        table_of_contents: "Índice",
        in_this_update: "Nesta atualização",
        auto_translated_badge: "Traduzido Automaticamente",
        auto_translated_tooltip: "Traduzido por um sistema de IA para a sua conveniência.",
        translate_badge_restore: "Traduzir",
        translate_badge_restore_tooltip: "Traduzir o conteúdo para o seu idioma atual.",
        translate_modal_title: "Traduzido Automaticamente",
        translate_modal_desc: "Este conteúdo foi traduzido automaticamente por um sistema de IA para ajudar a manter você atualizado. Alguns termos técnicos ou nuances podem ser ligeiramente imprecisos.",
        translate_modal_show_original: "Mostrar Original (Inglês)",
        translate_modal_keep_translation: "Manter Tradução"
    },
    overview_page: {
        title: "Visão Geral Técnica",
        subtitle: "Mergulho profundo na arquitetura e na stack.",
        github_btn: "Ver no GitHub",
        toc_title: "Nesta Página",
        dynamic_docs_note: "Esta visão geral é gerada dinamicamente a partir de arquivos Markdown para garantir que esteja sempre atualizada com as últimas alterações na base de código.",
        about_docs_title: "Sobre esta documentação"
    },
    feedback: {
        title: "Enviar Feedback",
        subtitle: "Ajude-nos a melhorar. Relatos de erros, solicitações de recursos ou apenas um olá.",
        form: {
            project_label: "Projeto",
            type_label: "Tópico",
            platform_label: "Plataforma",
            email_label: "Endereço de e-mail",
            email_placeholder: "seu@email.com",
            email_error: "Por favor, insira um endereço de e-mail válido.",
            description_label: "Mensagem",
            description_placeholder: "Descreva o que aconteceu ou compartilhe a sua ideia...",
            description_error: "A mensagem deve conter pelo menos 15 caracteres.",
            include_device_info: "Incluir informações do dispositivo (Navegador/SO)",
            send_button: "Enviar Feedback",
            draft_recovered: "Rascunho recuperado",
            discard_draft: "Descartar rascunho"
        },
        success: {
            title: "Mensagem Enviada!",
            message: "A sua mensagem foi enviada com sucesso para support@fertwbr.com. Uma cópia de confirmação foi enviada para {email}.",
            error_title: "Falha no Envio",
            error_message: "Ocorreu um erro de rede ao tentar enviar a sua mensagem. Por favor, tente novamente.",
            btn_retry: "Tentar Novamente",
            btn_edit: "Editar Mensagem",
            btn_home: "Voltar ao Início"
        },
        projects: {
            pixelpulse: "Pixel Pulse",
            pixelcompass: "Pixel Compass",
            portfolio: "Site do Portfólio"
        },
        platforms: {
            android: "Android (Celular)",
            wearos: "Wear OS",
            web: "Web / Site"
        },
        types: {
            general: "Feedback Geral",
            bug: "Relato de Erro",
            feature: "Solicitação de Recurso",
            translation: "Problema de Tradução",
            ui: "Sugestão de Interface",
            other: "Outro"
        },
        guidance: {
            label: "Dica",
            default_general: "Queremos ouvir você! Compartilhe as suas ideias.",
            default_bug: "Descreva os passos necessários para reproduzir o erro.",
            default_feature: "De que forma este recurso melhoraria a sua experiência?",
            default_translation: "Em qual tela se encontra o texto incorreto?",
            short_text: "Por favor, forneça mais detalhes para facilitar a nossa compreensão.",
            crash: "Caso o aplicativo tenha encerrado inesperadamente, algum código ou mensagem de erro foi exibido?",
            screenshot: "Uma imagem vale mais que mil palavras. Considere anexar uma captura de tela.",
            translation_keyword: "Mencionar o idioma específico e a frase incorreta auxilia na correção rápida.",
            steps_received: "Perfeito! O detalhamento das etapas auxilia na reprodução do problema.",
            error_received: "Agradecemos por incluir os detalhes do erro.",
            location_received: "Excelente, saber a localização na tela é muito útil.",
            idea_received: "Esta é uma ideia interessante! Conte-nos mais sobre o funcionamento dela.",
            great_detail: "Ótimo detalhamento! Isto auxilia significativamente a nossa compreensão."
        },
        keywords: {
            crash: "crash,fechar,parar,encerrar,travar,lag,quebrado,tela branca",
            error: "erro,código,falha,exceção,0x,número,mensagem",
            steps: "passo,primeiro,depois,após,quando,clicar,tocar,pressionar,rolar",
            screen: "tela,página,visualização,janela,diálogo,aba,cartão,menu,navbar,rodapé",
            correction: "texto,palavra,erro de digitação,errado,incorreto,ruim,ortografia,gramática,traduzir,idioma",
            idea: "adicionar,criar,desejo,gostaria,poderia,deveria,melhor,novo,recurso,modo"
        }
    }
};