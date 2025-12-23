

# Version History

## Versión 2.3.0
*(Lanzada el 23 de diciembre de 2025)*

Esta versión presenta el **Portal de Apps "Scrollytelling"**, una página de aterrizaje interactiva de alta fidelidad para el ecosistema de aplicaciones. Utiliza técnicas de animación avanzadas para mostrar Pixel Pulse y Pixel Compass en un formato cinematográfico basado en la narrativa.

#### 🌐 Portal de Apps (Scrollytelling)
* **Nuevo: Experiencia cinematográfica de "Scrollytelling":** El inicio de aplicaciones (`apps.fertwbr.com`) ha sido completamente reinventado. Ahora presenta una narrativa basada en el desplazamiento (scroll) que anima dispositivos, interfaces de usuario y texto según la interacción del usuario.
* **Nuevo: Maquetas de dispositivos de alta fidelidad:** Se han diseñado reproducciones realistas creadas únicamente con CSS de **Pixel Phones** y **Pixel Watches** (con efectos de cristal abombado y acabados en acero inoxidable) para mostrar el contenido de las aplicaciones sin necesidad de archivos de imagen pesados.
* **Nuevo: Pantallas de maqueta animadas:** Se han desarrollado interfaces de usuario simuladas y animadas para Pixel Pulse (visualización de audio) y Pixel Compass (dial de brújula rotatorio) que se integran dentro de los marcos de los dispositivos.
* **Nuevo: Elección dividida interactiva:** Un componente de navegación de "Gran Final" que divide la pantalla, permitiendo a los usuarios elegir su camino (Master Audio vs. Find Path) con efectos de expansión al pasar el cursor y enfoque dinámico.

#### 🛠️ Técnica y Arquitectura
* **Refactorización: Arquitectura de secciones modulares:** Se ha dividido la página de inicio monolítica en componentes de sección especializados y reutilizables (`ScrollDeviceSection`, `WearSection`, `AppsHero`, `AppsHomeExtra`) para un mejor mantenimiento.
* **Nuevo: Animaciones de física de resorte:** Se han integrado transiciones de resorte complejas de `framer-motion` para lograr un movimiento fluido y natural de los elementos de la interfaz de usuario.
* **Localización:** Se han ampliado los módulos de localización `apps_home` en todos los idiomas admitidos (de, es, hi, ja, pt) para dar soporte al nuevo contenido narrativo y a las especificaciones técnicas.

## Versión 2.2.0
*(Publicado el 23 de diciembre de 2025)*

Esta actualización marca la migración a una infraestructura en la nube profesional, solucionando limitaciones de enrutamiento y estableciendo un dominio dedicado para el ecosistema de aplicaciones.

#### ☁️ Infraestructura y Nube
* **Nuevo: Migración a Cloudflare Pages:** El sitio ahora está alojado en **Cloudflare Pages**, lo que permite una entrega global más rápida, mejores analíticas y reglas de enrutamiento avanzadas.
* **Nuevo: Dominios personalizados:** Se establecieron `fertwbr.com` para el portafolio y `apps.fertwbr.com` para los productos de software.
* **Nuevo: Compatibilidad con enlaces heredados:** Se implementó una robusta cadena de redireccionamiento. Los enlaces heredados (ej. `fertwbr.github.io/PixelCompass`) ahora se redirigen automáticamente al nuevo dominio, preservando el SEO y los marcadores de los usuarios.
* **Nuevo: Enrutamiento insensible a mayúsculas:** Las reglas del lado del servidor ahora gestionan problemas heredados de capitalización, redirigiendo `/PixelPulse` a `/pixelpulse` automáticamente.

#### 🛠️ Mejoras Técnicas
* **Corrección: Desplazamiento por anclaje asíncrono:** Se desarrolló un `HashScrollHandler` compatible con el desplazamiento suave de **Lenis**. Este espera de forma inteligente a que el contenido Markdown asíncrono se renderice antes de desplazarse a los enlaces profundos (ej. `#privacy`).
* **Refactorización: Limpieza de URLs:** El hook de gestión de estado ahora limpia de forma exhaustiva los parámetros de consulta (`?color=...`, `?theme=...`) después de aplicarlos, resultando en URLs más limpias y fáciles de compartir.
* **Seguridad:** Se actualizó `assetlinks.json` para dar soporte al vínculo de aplicaciones (app linking) unificado en ambos dominios nuevos.

## Versión 2.1.0
*(Lanzado el 23 de diciembre de 2025)*

Esta versión introduce el concepto de **Apps Portal** y refactoriza el código base para una mejor mantenibilidad.

#### 🌐 Apps Portal
* **Nuevo: Apps Home:** Se ha creado una página de inicio dedicada para `apps.fertwbr.com` que funciona como un centro neurálgico para todas las aplicaciones móviles.
* **Nuevo: Domain-Aware Routing:** La aplicación ahora detecta el hostname (`apps.` frente a `www.`) y sirve el componente Home adecuado (**Apps Portal** frente a Portfolio) mientras comparten el mismo código base.

#### 🏗️ Arquitectura
* **Refactorización: SiteConfig:** Se centralizaron todos los enlaces externos, las URLs de recursos y los metadatos en un único archivo de configuración (**SiteConfig**). Esto actúa como una "Única Fuente de Verdad" (Single Source of Truth), facilitando las actualizaciones futuras.
* **Refactorización: Arquitectura del Footer:** Se unificó la lógica del pie de página permitiendo variaciones sensibles al contexto (Portfolio frente a Apps).

## Versión 2.0.0
*(Lanzado el 23 de diciembre de 2025)*

Esta es una actualización monumental que rediseña por completo la estructura del portafolio. Hemos migrado de una arquitectura HTML estática a una moderna **Single Page Application (SPA)** construida con React y Vite. Este lanzamiento se centra en el **Rendimiento**, la **Internacionalización**, la **Integración de IA** y un sistema de diseño dinámico de **Material 3**.

#### 🌐 Sitio Web y Arquitectura
* **Nuevo: Reescritura completa de la arquitectura:** Todo el sitio ha sido reconstruido desde cero utilizando **React**, dejando atrás los componentes estáticos heredados. Esto permite una navegación instantánea por las páginas y una base de código modular.
* **Nuevo: Motor de traducción potenciado por IA:** Se ha implementado un sofisticado script de Node.js que utiliza la **Gemini API** para traducir automáticamente los changelogs a 5 idiomas (portugués, español, alemán, japonés e hindi). Cuenta con actualizaciones incrementales y protección de límite de velocidad (rate-limiting).
* **Nuevo: Sistema de feedback inteligente:** Una ruta `/feedback` dedicada que permite a los usuarios enviar comentarios estructurados (errores, solicitudes de funciones) con información del dispositivo, consejos de guía inteligente y guardado automático de borradores.
* **Nuevo: Tematización dinámica de Material 3:** Implementación de un robusto motor de tematización que admite la extracción de color dinámico mediante `@material/material-color-utilities`.
* **Nuevo: Motor de contenido Markdown:** Un motor desarrollado a medida que ahora analiza archivos Markdown sin procesar para renderizar **Changelogs**, **Roadmaps**, **Políticas de Privacidad** y **Secciones de Ayuda** de forma dinámica.
* **Nuevo: Internacionalización Global (i18n):** El portafolio está ahora completamente localizado con soporte para **6 idiomas**, detección automática y preferencias persistentes.

#### 🎨 Interfaz de Usuario y Diseño
* **Nuevo: Diseños de documentación profesional:** Se han refactorizado los visualizadores de `Privacy`, `Help` y `Roadmap` para utilizar un diseño limpio y centrado en la tipografía (eliminando el glassmorphism pesado para una mejor legibilidad).
* **Nuevo: Roadmap interactivo:** Un visualizador de Roadmap completamente rediseñado que admite líneas de tiempo anidadas, insignias de estado (Lanzado, Planificado) y múltiples formatos de Markdown.
* **Nuevo: Centros del ecosistema de aplicaciones:** Subsecciones dedicadas para **Pixel Pulse** y **Pixel Compass** que presentan cuadrículas de funciones interactivas, vitrinas "Plus" y metadatos en vivo.
* **Pulido Visual:**
  * **Glassmorphism:** Uso estratégico de efectos de desenfoque en tarjetas y barras de navegación.
  * **Spinner geométrico:** Una nueva animación de carga de alta fidelidad.
  * **Barra de navegación animada:** Una barra de navegación responsiva que se oculta de forma inteligente al hacer scroll.

#### 📱 Móvil y Experiencia
* **Nuevo: Integración de Android Intent:** El deep-linking inteligente permite a los usuarios abrir enlaces directamente en la aplicación de **Android** instalada o recurrir a la **Google Play** Store.
* **Nuevo: Resiliencia sin conexión:** Se ha añadido un componente de aviso de modo offline que gestiona con fluidez la pérdida de conectividad.
* **Nuevo: Optimizaciones táctiles:** Optimización de los objetivos táctiles y eliminación de los resaltados de toque para lograr una sensación de aplicación nativa en navegadores móviles.

#### 🛠️ Técnico
* **Nuevo: Revisión completa de SEO:** Se han añadido archivos `sitemap.xml`, `robots.txt` y metaetiquetas dinámicas exhaustivas a través de un hook personalizado `usePageMetadata`.
* **Mejora: Rendimiento:** Integración de **Lenis** para el desplazamiento inercial y **Framer Motion** para transiciones de página suaves con `AnimatePresence`.
* **Refactorización:** Migración a una estructura de directorios modular (secciones, visualizadores, diseño) y unificación de la lógica de navegación a través de `handleContactSupport`.

## Versión 1.0.0
*(Publicada el 19 de julio de 2025)*

Esta versión marcó el rediseño integral inicial del portafolio, estableciendo la identidad visual de **Material 3** y sentando las bases para una **Single-Page Application** modular.

#### 🌐 Sitio Web
* **Novedad: Rediseño con Material 3:** Se renovó completamente el sitio web de documentación del proyecto utilizando **Material 3** para lograr una interfaz de usuario moderna, limpia y responsiva.
* **Novedad: Single-Page Application (SPA):** Se reemplazaron los archivos HTML estáticos por una arquitectura modular con enrutamiento dinámico y carga de contenido.
* **Novedad: Localización masiva de la documentación:** Todo el sitio fue traducido a múltiples idiomas, incluyendo **español**, **portugués**, **japonés**, **francés**, **alemán** e **hindi**.
* **Novedad: Changelog interactivo:** La página del historial de versiones fue rediseñada con un formato interactivo de estilo acordeón.
* **Novedad: Expansión de contenido:** Se agregaron páginas dedicadas para **Pixel Compass+**, **Wear OS** y testimonios de usuarios.
* **Identidad visual:** Se actualizaron el favicon y los iconos del manifest del sitio web para alinearlos con la moderna imagen de marca de la aplicación.

