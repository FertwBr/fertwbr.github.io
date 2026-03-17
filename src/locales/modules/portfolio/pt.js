// src/locales/modules/portfolio/pt.js
export default {
    nav: {
        index: "Início",
        overview: "Documentação",
        changelog: "Registro de Alterações",
        roadmap: "Roteiro",
        privacy: "Privacidade",
        terms: "Termos de Uso",
        help: "Ajuda",
        back: "Voltar"
    },
    hero: {
        greeting: "Olá, eu sou",
        name: "Fernando Vaz",
        role_prefix: "Eu desenvolvo",
        roles: ["Aplicativos Android", "Sistemas de Backend", "Experiências de Usuário", "Soluções Digitais"],
        cta_primary: "Ver Projetos",
        cta_secondary: "Contate-me"
    },
    not_found: {
        page_title: "Página Não Encontrada",
        title: "404",
        subtitle: "Ops! Fomos para o vazio.",
        message: "A página que você procura não existe no momento.",
        suggestion_title: "Você estava procurando por isto?",
        suggestion_desc: "Com base no seu link, acreditamos que você desejava acessar",
        suggestion_btn: "Sim, ir para lá",
        home_btn: "Ir para o Início",
        apps_btn: "Ver Aplicativos"
    },
    about: {
        title: "Sobre Mim",
        subtitle: "Onde a Engenharia encontra o Design",
        bio: {
            p1: {
                start: "Sou Fernando Vaz, um Engenheiro de Software formado pela ",
                highlight: "UniCesumar",
                end: ", apaixonado pela interseção entre código robusto e design intuitivo."
            },
            p2: {
                start: "Especialista no ",
                highlight_1: "ecossistema Android",
                middle: " (Kotlin/Jetpack Compose) e em ",
                highlight_2: "Backends",
                end: " escaláveis (Spring Boot). Crio soluções que não são apenas funcionais, mas também agradáveis de usar."
            }
        },
        cta_work: "Ver o meu trabalho",
        stats: {exp: "Anos de Exp.", projects: "Projetos", clients: "Clientes Satisfeitos"},
        cards: {
            education: {title: "Educação", value: "Bacharelado em Engenharia de Software", sub: "UniCesumar"},
            location: {title: "Localização", value: "Salvador, Brasil", sub: "GMT-3"},
            stack: {title: "Stack Principal", value: "Kotlin e Java", sub: "Desenvolvimento de Ciclo Completo"}
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
                desc: "Medidor de nível de som avançado com análise FFT em tempo real, persistência com Room Database e serviços em segundo plano otimizados para bateria via WorkManager.",
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
                category: "Wear OS e Dispositivos Móveis",
                desc: "Ferramenta de navegação premium com algoritmos de fusão de sensores, widgets do Jetpack Glance e arquitetura multimodular para separação limpa de responsabilidades.",
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
                desc: "Um mergulho profundo na arquitetura deste próprio site. Desenvolvido com React, Material Design 3 e um motor Markdown personalizado.",
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
    tech: {title: "Tecnologias", subtitle: "Ferramentas que utilizo para dar vida às ideias"},
    github: {
        title: "Código Aberto", view_profile: "Ver Perfil no GitHub", languages: "Idiomas Mais Utilizados",
        default_bio: "A desenvolver soluções para Android e Web.",
        stats: {
            contributions: "Contribuições Anuais",
            repos: "Repositórios",
            stars: "Total de Estrelas",
            followers: "Seguidores"
        }
    },
    contact: {
        title: "Vamos Trabalhar Juntos",
        desc: "Tem um projeto em mente ou deseja discutir as novidades da tecnologia Android?",
        email: "Enviar e-mail",
        linkedin: "LinkedIn",
        github: "GitHub"
    }
};