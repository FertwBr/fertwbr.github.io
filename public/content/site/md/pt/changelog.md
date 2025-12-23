

# Version History

## Versão 2.3.0
*(Lançada em 23 de dezembro de 2025)*

Esta versão introduz o **Portal de Apps "Scrollytelling"**, uma landing page interativa de alta fidelidade para o ecossistema de aplicativos. Ela utiliza técnicas avançadas de animação para apresentar o Pixel Pulse e o Pixel Compass em um formato cinematográfico e focado na narrativa.

#### 🌐 Portal de Apps (Scrollytelling)
* **Novo: Experiência Cinematográfica "Scrollytelling":** A Home de Apps (`apps.fertwbr.com`) foi completamente reimaginada. Agora, apresenta uma narrativa conduzida pela rolagem que anima dispositivos, UIs e textos com base na interação do usuário.
* **Novo: Mockups de Dispositivos de Alta Fidelidade:** Desenvolveram-se reproduções realistas, utilizando apenas CSS, de **Pixel Phones** e **Pixel Watches** (com efeitos de vidro curvado e acabamentos em aço inoxidável) para exibir o conteúdo dos apps sem a necessidade de arquivos de imagem pesados.
* **Novo: Telas de Mockup Animadas:** Desenvolveu-se UIs simuladas e animadas para o Pixel Pulse (visualização de áudio) e o Pixel Compass (mostrador de bússola rotativo) que funcionam dentro das molduras dos dispositivos.
* **Novo: Escolha Dividida Interativa:** Um componente de navegação "Grand Finale" que divide a tela, permitindo que os usuários escolham o seu caminho (Master Audio vs. Find Path) com efeitos de expansão ao passar o mouse e foco dinâmico.

#### 🛠️ Técnico e Arquitetura
* **Refatoração: Arquitetura de Seções Modulares:** A página inicial monolítica foi dividida em componentes de seção especializados e reutilizáveis (`ScrollDeviceSection`, `WearSection`, `AppsHero`, `AppsHomeExtra`) para uma melhor manutenibilidade.
* **Novo: Animações com Física de Mola:** Integração de transições de mola complexas via `framer-motion` para um movimento fluido e natural dos elementos da UI.
* **Localização:** Expansão dos módulos de localidade `apps_home` em todos os idiomas suportados (de, es, hi, ja, pt) para oferecer suporte ao novo conteúdo narrativo e às especificações técnicas.

## Versão 2.2.0
*(Lançada em 23 de dezembro de 2025)*

Esta atualização marca a migração para uma infraestrutura de nuvem profissional, resolvendo limitações de roteamento e estabelecendo um domínio dedicado para o ecossistema de apps.

#### ☁️ Infraestrutura & Nuvem
* **Novo: Migração para Cloudflare Pages:** O site agora está hospedado no **Cloudflare Pages**, permitindo entrega global mais rápida, métricas aprimoradas e regras de roteamento avançadas.
* **Novo: Domínios Personalizados:** Estabelecidos `fertwbr.com` para o portfólio e `apps.fertwbr.com` para os produtos de software.
* **Novo: Compatibilidade de Links Legados:** Implementação de uma cadeia de redirecionamento robusta. Links legados (ex: `fertwbr.github.io/PixelCompass`) são agora redirecionados automaticamente para o novo domínio, preservando o SEO e os favoritos dos usuários.
* **Novo: Roteamento Insensível a Maiúsculas e Minúsculas:** Regras no servidor agora gerenciam problemas de capitalização legados, redirecionando `/PixelPulse` para `/pixelpulse` de forma automática.

#### 🛠️ Melhorias Técnicas
* **Correção: Rolagem de Âncora Assíncrona:** Desenvolvimento de um `HashScrollHandler` compatível com a rolagem suave do **Lenis**. O sistema aguarda de forma inteligente a renderização do conteúdo assíncrono em Markdown antes de realizar a rolagem para links profundos (ex: `#privacy`).
* **Refatoração: Limpeza de URL:** O hook de gerenciamento de estado agora remove de forma agressiva os parâmetros de consulta (`?color=...`, `?theme=...`) após a aplicação, resultando em URLs mais limpas e compartilháveis.
* **Segurança:** Atualização do `assetlinks.json` para suportar a vinculação unificada de apps em ambos os novos domínios.

## Versão 2.1.0
*(Lançada em 23 de dezembro de 2025)*

Esta versão introduz o conceito de "Apps Portal" e refatora a base de código para melhor manutenibilidade.

#### 🌐 Apps Portal
* **Novo: Apps Home:** Criada uma página de destino dedicada para `apps.fertwbr.com` que serve como um hub central para todos os aplicativos móveis.
* **Novo: Domain-Aware Routing:** O aplicativo agora detecta o hostname (`apps.` vs `www.`) e fornece o componente Home apropriado (Apps Portal vs. Portfolio), compartilhando a mesma base de código.

#### 🏗️ Architecture
* **Refatoração: SiteConfig:** Centralizados todos os links externos, URLs de assets e metadados em um único arquivo de configuração (`SiteConfig`). Isso atua como uma "Single Source of Truth", tornando as atualizações futuras simplificadas.
* **Refatoração: Footer Architecture:** Unificada a lógica do rodapé, permitindo variações sensíveis ao contexto (Portfolio vs. Apps).

## Versão 2.0.0
*(Lançada em 23 de dezembro de 2025)*

Esta é uma atualização monumental que reimagina completamente a estrutura do portfólio. Migramos de uma arquitetura HTML estática para uma moderna **Single Page Application (SPA)** desenvolvida com React e Vite. Este lançamento foca em **Desempenho**, **Internacionalização**, **Integração de IA** e um sistema de design **Dynamic Material 3**.

#### 🌐 Website e Arquitetura
* **Novo: Reescrita Completa da Arquitetura:** Todo o site foi reconstruído do zero com o uso de **React**, em substituição aos componentes estáticos legados. Isso permite navegação instantânea entre páginas e uma base de código modular.
* **Novo: Motor de Tradução Baseado em IA:** Implementação de um script Node.js sofisticado que utiliza a **Gemini API** para traduzir automaticamente os registros de alterações para 5 idiomas (português, espanhol, alemão, japonês, hindi). O recurso conta com atualizações incrementais e proteção contra limite de taxa (rate-limiting).
* **Novo: Sistema Inteligente de Feedback:** Uma rota `/feedback` dedicada que permite aos usuários enviar feedback estruturado (bugs, solicitações de recursos) com informações do dispositivo, dicas de orientação inteligente e salvamento automático de rascunhos.
* **Novo: Tematização Dinâmica Material 3:** Implementação de um motor de temas robusto que suporta a extração de **Dynamic Color** via `@material/material-color-utilities`.
* **Novo: Motor de Conteúdo Markdown:** Um motor personalizado que agora analisa arquivos Markdown brutos para renderizar **Changelogs**, **Roadmaps**, **Políticas de Privacidade** e **Seções de Ajuda** de forma dinâmica.
* **Novo: Internacionalização Global (i18n):** O portfólio agora está totalmente localizado com suporte para **6 Idiomas**, detecção automática e preferências persistentes.

#### 🎨 UI e Design
* **Novo: Layouts de Documentação Profissionais:** Refatoração dos visualizadores de `Privacidade`, `Ajuda` e `Roadmap` para utilizarem um layout limpo e focado em tipografia (com a remoção do glassmorphism carregado para garantir melhor legibilidade).
* **Novo: Roadmap Interativo:** Um visualizador de Roadmap completamente redesenhado que suporta cronogramas aninhados, selos de status (Lançado, Planejado) e múltiplos formatos de markdown.
* **Novo: Hubs de Ecossistema de Apps:** Subseções dedicadas para **Pixel Pulse** e **Pixel Compass** com grades de recursos interativas, vitrines "Plus" e metadados em tempo real.
* **Refinamento Visual:**
  * **Glassmorphism:** Uso estratégico de efeitos de desfoque em cartões e barras de navegação.
  * **Spinner Geométrico:** Uma nova animação de carregamento de alta fidelidade.
  * **Navbar Animada:** Uma barra de navegação responsiva que se oculta de forma inteligente ao rolar a página.

#### 📱 Mobile e Experiência
* **Novo: Integração de Intents do Android:** O deep-linking inteligente permite que os usuários abram links diretamente no aplicativo **Android** instalado ou recorram à **Google Play**.
* **Novo: Resiliência Offline:** Adição de um componente de **Aviso de Offline** que gerencia perdas de conectividade de forma elegante.
* **Novo: Otimizações de Toque:** Ajuste dos alvos de toque e remoção de destaques de clique para proporcionar uma sensação de aplicativo nativo em navegadores móveis.

#### 🛠️ Técnico
* **Novo: Reformulação de SEO:** Adição de `sitemap.xml`, `robots.txt` abrangentes e meta tags dinâmicas via um hook personalizado `usePageMetadata`.
* **Melhoria: Desempenho:** Integração do **Lenis** para rolagem inercial e **Framer Motion** para transições de página suaves com `AnimatePresence`.
* **Refatoração:** Migração para uma estrutura de diretórios modular (seções, visualizadores, layout) e unificação da lógica de navegação via `handleContactSupport`.

## Versão 1.0.0
*(Lançada em 19 de julho de 2025)*

Esta versão marcou o primeiro grande redesign do portfólio, estabelecendo a identidade visual do Material 3 e lançando as bases para uma Single-Page Application modular.

#### 🌐 Website
* **Novo: Redesign Material 3:** Reformulação completa do site de documentação do projeto utilizando Material 3 para uma interface de usuário moderna, limpa e responsiva.
* **Novo: Single-Page Application (SPA):** Substituição de arquivos HTML estáticos por uma arquitetura modular com roteamento dinâmico e carregamento de conteúdo.
* **Novo: Localização Abrangente da Documentação:** Todo o site foi traduzido para vários idiomas, incluindo **espanhol**, **português**, **japonês**, **francês**, **alemão** e **hindi**.
* **Novo: Changelog Interativo:** A página de histórico de versões foi redesenhada com um layout interativo em estilo acordeão.
* **Novo: Expansões de Conteúdo:** Adição de páginas dedicadas para **Pixel Compass+**, **Wear OS** e Depoimentos de Usuários.
* **Identidade Visual:** Atualização do favicon e dos ícones de manifesto do site para alinhar à identidade visual moderna do aplicativo.

