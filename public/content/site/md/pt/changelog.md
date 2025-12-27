# Histórico de Versões
Acompanhe a evolução do portfólio. Aqui você encontrará um registro detalhado de novos recursos, melhorias e correções para cada versão.

## Versão 2.4.0
*(Lançada em 24 de dezembro de 2025)*

Esta atualização dá vida ao portfólio com **Dados em Tempo Real**. Integramos um backend serverless para buscar classificações ao vivo da Google Play Store e implementamos padrões avançados de SEO para garantir que os aplicativos sejam devidamente indexados pelos motores de busca.

#### ☁️ Nuvem e Infraestrutura
* **Novo: API de Classificação Serverless:** Implantamos uma **Cloudflare Pages Function** personalizada (`/api/rating`) que atua como um middleware seguro. Ela extrai, armazena em cache e disponibiliza as classificações da Google Play Store para o Pixel Compass e o Pixel Pulse, protegendo os limites da nossa API e melhorando o desempenho do frontend.
* **Novo: Cache Inteligente:** O worker de classificação implementa estratégias de cache para garantir tempos de carregamento instantâneos enquanto mantém os dados atualizados.

#### 🎨 UI e Componentes
* **Novo: Distintivo de Classificação ao Vivo:** Introduzido um componente `RatingBadge` que se conecta à nossa nova API. Ele exibe a classificação por estrelas e a contagem de avaliações em tempo real, com um fallback elegante caso a rede esteja offline.
* **Novo: Modo Compacto:** Integrada uma versão condensada do distintivo de classificação diretamente nas pílulas de dispositivo do "Scrollytelling" para um visual mais limpo.

#### 🌐 SEO e Metadados
* **Novo: Dados Estruturados (JSON-LD):** Injeção de scripts dinâmicos `application/ld+json` no cabeçalho do documento. Isso permite que os motores de busca leiam "Rich Snippets" para os produtos de software, exibindo preço, SO e classificações diretamente nos resultados da pesquisa.

## Versão 2.3.1
*(Lançada em 24 de dezembro de 2025)*

Uma atualização focada em **Segurança** e **Identidade da Marca**, garantindo que o site seja não apenas rápido, mas também seguro e reconhecível em todas as plataformas.

#### 🛡️ Segurança e Polimento
* **Novo: Cabeçalhos de Segurança:** Adicionado um arquivo de configuração rigoroso `_headers`. Isso impõe **HSTS** (Strict Transport Security), previne MIME-sniffing e protege o site contra ataques de clickjacking.
* **Novo: Branding no Console:** Adicionada uma assinatura de desenvolvedor estilizada no console do navegador, proporcionando um toque profissional para desenvolvedores que inspecionam o código-fonte.

#### 🛠️ Aprimoramentos de Metadados
* **Melhoria: Suporte ao Ecossistema Apple:** Atualizado o sistema de favicon para suportar estritamente o `apple-touch-icon`, garantindo que os aplicativos pareçam nativos quando adicionados a uma Tela de Início do iOS.
* **Melhoria: Links Canônicos:** O hook `usePageMetadata` agora gera automaticamente URLs canônicas, prevenindo penalidades de SEO por "conteúdo duplicado" entre o portfólio e os domínios dos aplicativos.

## Versão 2.3.0
*(Lançada em 23 de dezembro de 2025)*

Este lançamento introduz o **Portal de Aplicativos "Scrollytelling"**, uma landing page interativa de alta fidelidade para o ecossistema de aplicativos. Ela utiliza técnicas avançadas de animação para apresentar o Pixel Pulse e o Pixel Compass em um formato cinematográfico e narrativo.

#### 🌐 Portal de Aplicativos (Scrollytelling)
* **Novo: Experiência Cinematográfica "Scrollytelling":** A Home dos Apps (`apps.fertwbr.com`) foi completamente reimaginada. Agora apresenta uma narrativa guiada pela rolagem que anima dispositivos, interfaces e texto com base na interação do usuário.
* **Novo: Mocks de Dispositivos de Alta Fidelidade:** Produzidas reproduções realistas, apenas em CSS, de **Pixel Phones** e **Pixel Watches** (com efeitos de vidro curvado e acabamentos em aço inoxidável) para exibir o conteúdo do aplicativo sem ativos de imagem pesados.
* **Novo: Telas de Mock Animadas:** Desenvolvidas interfaces simuladas e animadas para o Pixel Pulse (visualização de áudio) e Pixel Compass (bússola rotativa) que funcionam dentro das molduras dos dispositivos.
* **Novo: Escolha Dividida Interativa:** Um componente de navegação "Grand Finale" que divide a tela, permitindo aos usuários escolherem seu caminho (Master Audio vs. Encontrar Caminho) com efeitos de expansão ao passar o mouse e foco dinâmico.

#### 🛠️ Técnica e Arquitetura
* **Refatoração: Arquitetura de Seção Modular:** Decomposição da página inicial monolítica em componentes de seção especializados e reutilizáveis (`ScrollDeviceSection`, `WearSection`, `AppsHero`, `AppsHomeExtra`) para melhor manutenibilidade.
* **Novo: Animações com Física de Mola:** Integração de transições complexas de mola do `framer-motion` para movimentos fluidos e naturais dos elementos de UI.
* **Localização:** Expandidos os módulos de localidade `apps_home` em todos os idiomas suportados (de, es, hi, ja, pt) para suportar o novo conteúdo narrativo e especificações técnicas.

## Versão 2.2.0
*(Lançada em 23 de dezembro de 2025)*

Esta atualização marca a migração para uma infraestrutura de nuvem profissional, resolvendo limitações de roteamento e estabelecendo um domínio dedicado para o ecossistema de aplicativos.

#### ☁️ Infraestrutura e Nuvem
* **Novo: Migração para Cloudflare Pages:** O site agora está hospedado no **Cloudflare Pages**, possibilitando entrega global mais rápida, melhores análises e regras de roteamento avançadas.
* **Novo: Domínios Personalizados:** Estabelecido `fertwbr.com` para o portfólio e `apps.fertwbr.com` para os produtos de software.
* **Novo: Compatibilidade com Links Legados:** Implementada uma cadeia de redirecionamento robusta. Links legados (ex: `fertwbr.github.io/PixelCompass`) agora são automaticamente redirecionados para o novo domínio, preservando SEO e favoritos dos usuários.
* **Novo: Roteamento Insensível a Maiúsculas/Minúsculas:** Regras no lado do servidor agora lidam com problemas de capitalização legados, redirecionando `/PixelPulse` para `/pixelpulse` automaticamente.

#### 🛠️ Melhorias Técnicas
* **Correção: Rolagem de Âncora Assíncrona:** Desenvolvido um `HashScrollHandler` compatível com a rolagem suave do **Lenis**. Ele aguarda inteligentemente a renderização do conteúdo Markdown assíncrono antes de rolar para links profundos (ex: `#privacy`).
* **Refatoração: Limpeza de URL:** O hook de gerenciamento de estado agora limpa agressivamente os parâmetros de consulta (`?color=...`, `?theme=...`) após aplicá-los, resultando em URLs mais limpas e compartilháveis.
* **Segurança:** Atualizado o `assetlinks.json` para suportar vinculação unificada de aplicativos em ambos os novos domínios.

## Versão 2.1.0
*(Lançada em 23 de dezembro de 2025)*

Este lançamento introduz o conceito de "Portal de Aplicativos" e refatora a base de código para melhor manutenibilidade.

#### 🌐 Portal de Aplicativos
* **Novo: Home dos Apps:** Criada uma landing page dedicada para `apps.fertwbr.com` que serve como um hub central para todos os aplicativos móveis.
* **Novo: Roteamento Ciente de Domínio:** A aplicação agora detecta o hostname (`apps.` vs `www.`) e serve o componente Home apropriado (Portal de Aplicativos vs. Portfólio) enquanto compartilha a mesma base de código.

#### 🏗️ Arquitetura
* **Refatoração: SiteConfig:** Centralizados todos os links externos, URLs de ativos e metadados em um único arquivo de configuração (`SiteConfig`). Isso atua como uma "Fonte Única de Verdade", tornando atualizações futuras simples.
* **Refatoração: Arquitetura do Rodapé:** Unificada a lógica do rodapé, permitindo variações cientes do contexto (Portfólio vs. Apps).

## Versão 2.0.0
*(Lançada em 23 de dezembro de 2025)*

Esta é uma atualização monumental que reimagina completamente a estrutura do portfólio. Migramos de uma arquitetura HTML estática para uma moderna **Single Page Application (SPA)** construída com React e Vite. Este lançamento foca em **Desempenho**, **Internacionalização**, **Integração com IA** e um sistema de **Design Material 3 Dinâmico**.

#### 🌐 Website e Arquitetura
* **Novo: Reescrita Completa da Arquitetura:** Todo o site foi reconstruído do zero usando **React**, afastando-se de componentes estáticos legados. Isso permite navegação instantânea entre páginas e uma base de código modular.
* **Novo: Motor de Tradução Impulsionado por IA:** Implementado um script Node.js sofisticado usando a **Gemini API** para traduzir automaticamente os changelogs para 5 idiomas (Português, Espanhol, Alemão, Japonês, Hindi). Possui atualizações incrementais e proteção contra limitação de taxa.
* **Novo: Sistema de Feedback Inteligente:** Uma rota dedicada `/feedback` que permite aos usuários enviar feedback estruturado (bugs, solicitações de recursos) com informações do dispositivo, dicas de orientação inteligente e salvamento automático de rascunhos.
* **Novo: Temas Material 3 Dinâmicos:** Implementado um motor de temas robusto que suporta extração de **Cor Dinâmica** via `@material/material-color-utilities`.
* **Novo: Motor de Conteúdo Markdown:** Um motor personalizado agora analisa arquivos Markdown brutos para renderizar **Changelogs**, **Roadmaps**, **Políticas de Privacidade** e **Seções de Ajuda** dinamicamente.
* **Novo: Internacionalização Global (i18n):** O portfólio agora é totalmente localizado com suporte para **6 Idiomas**, detecção automática e preferências persistentes.

#### 🎨 UI e Design
* **Novo: Layouts de Documentação Profissionais:** Refatorados os visualizadores de `Privacy`, `Help` e `Roadmap` para usar um layout limpo e focado na tipografia (removendo o glassmorphism pesado para melhor legibilidade).
* **Novo: Roadmap Interativo:** Um Visualizador de Roadmap completamente redesenhado que suporta cronogramas aninhados, distintivos de status (Lançado, Planejado) e múltiplos formatos markdown.
* **Novo: Hubs do Ecossistema de Apps:** Subseções dedicadas para **Pixel Pulse** e **Pixel Compass** apresentando grades de recursos interativas, vitrines "Plus" e metadados ao vivo.
* **Polimento Visual:**
  * **Glassmorphism:** Uso estratégico de efeitos de desfoque em cartões e barras de navegação.
  * **Spinner Geométrico:** Uma nova animação de carregamento de alta fidelidade.
  * **Navbar Animada:** Uma barra de navegação responsiva que se oculta inteligentemente ao rolar.

#### 📱 Mobile e Experiência
* **Novo: Integração com Intent Android:** O deep-linking inteligente permite que os usuários abram links diretamente no aplicativo Android instalado ou recorram à Play Store.
* **Novo: Resiliência Offline:** Adicionado um componente de **Aviso Offline** que lida graciosamente com a perda de conectividade.
* **Novo: Otimizações de Toque:** Otimizados os alvos de toque e removidos os destaques de toque para uma sensação de aplicativo nativo em navegadores móveis.

#### 🛠️ Técnico
* **Novo: Reformulação de SEO:** Adicionado `sitemap.xml` abrangente, `robots.txt` e meta tags dinâmicas através de um hook personalizado `usePageMetadata`.
* **Melhoria: Desempenho:** Integrado **Lenis** para rolagem inercial e **Framer Motion** para transições de página suaves com `AnimatePresence`.
* **Refatoração:** Migração para uma estrutura de diretórios modular (seções, visualizadores, layout) e lógica de navegação unificada via `handleContactSupport`.

## Versão 1.0.0
*(Lançada em 19 de julho de 2025)*

Esta versão marcou o grande redesenho inicial do portfólio, estabelecendo a identidade visual Material 3 e preparando o terreno para uma Single-Page Application modular.

#### 🌐 Website
* **Novo: Redesign Material 3:** Reformulação do site de documentação do projeto usando Material 3 para uma interface de usuário moderna, limpa e responsiva.
* **Novo: Single-Page Application (SPA):** Substituição de arquivos HTML estáticos por uma arquitetura modular com roteamento dinâmico e carregamento de conteúdo.
* **Novo: Localização Principal da Documentação:** Todo o site foi traduzido para vários idiomas, incluindo **Espanhol**, **Português**, **Japonês**, **Francês**, **Alemão** e **Hindi**.
* **Novo: Changelog Interativo:** A página de histórico de versões foi redesenhada em um layout interativo estilo acordeão.
* **Novo: Expansões de Conteúdo:** Adicionadas páginas dedicadas para **Pixel Compass+**, **Wear OS** e Depoimentos de Usuários.
* **Identidade Visual:** Atualizados o favicon do site e os ícones do manifesto para corresponder ao branding moderno do aplicativo.