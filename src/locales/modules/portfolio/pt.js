/**
 * Core portfolio localization strings (Portuguese).
 * Inclui elementos comuns de UI, seção hero, sobre e navegação geral do site.
 */
export default {
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
    }
};