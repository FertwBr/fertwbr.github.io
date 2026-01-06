# Historial de Versiones
Siga la evolución del portafolio. Aquí encontrará un registro detallado de nuevas características, mejoras y correcciones para cada versión.

## Versión 2.7.0
*(Lanzada el 6 de enero de 2026)*

Esta actualización se centra en **Confianza, Seguridad y Cumplimiento**. Hemos introducido una infraestructura legal robusta con un visor de Términos de Uso dedicado, Políticas de Privacidad expandidas en todos los idiomas y documentación completa para la seguridad de datos y copias de seguridad.

#### ⚖️ Legal y Cumplimiento
* **Nuevo: Visor de Términos de Uso:** Se implementó un componente `TermsViewer` especializado que renderiza los Términos de Servicio con una tabla de contenido dinámica e integración de contacto de soporte.
* **Nuevo: Localización Legal:** Se agregaron y actualizaron los archivos `TERMS.md` y `PRIVACY_POLICY.md` para Pixel Compass y Pixel Pulse en 6 idiomas (Alemán, Inglés, Español, Hindi, Japonés, Portugués).
* **Actualización: Política de Privacidad:** Políticas revisadas para aclarar el procesamiento de datos, el uso de permisos y la adición de descargos de responsabilidad médica específicos para la aplicación Pulse.
* **Nuevo: Configuración:** Se actualizaron `PixelCompassConfig` y `PixelPulseConfig` para soportar la nueva sección 'Terms', permitiendo una navegación fluida entre Privacidad, Ayuda y Términos.

#### 📘 Documentación y Soporte
* **Nuevo: Guía de Copia de Seguridad Manual:** Se agregó una sección detallada de "Copia de Seguridad Manual y Restauración" a las FAQ. Cubre el formato de archivo `.ppbk`, estrategias de restauración inteligente y estándares de encriptación para ayudar a los usuarios a archivar sus datos de forma segura.
* **Mejora:** Se mejoró la utilidad `termsParser` para extraer metadatos y secciones de archivos Markdown con mayor precisión.

## Versión 2.6.0
*(Lanzada el 6 de enero de 2026)*

Este lanzamiento introduce el **Kit de Conversión de Tienda**, diseñado para cerrar la brecha entre el portal web y Google Play Store. Cuenta con componentes de Llamada a la Acción de alta fidelidad e interacciones de pie de página mejoradas.

#### 🛍️ Integración con la Tienda
* **Nuevo: Componente HomeStoreFooter:** Se introdujo un pie de página de marca específicamente para las páginas de inicio de la aplicación. Cuenta con una insignia "Get it on Google Play", eslóganes localizados y notas de compatibilidad de dispositivos.
* **Localización:** Se agregaron claves de traducción `store_footer` en todos los idiomas admitidos para asegurar que las indicaciones de descarga sean nativas de la región del usuario.
* **Integración:** Se integró perfectamente el nuevo pie de página en `PixelCompassHome` y `PixelPulseHome`.

#### 🎨 UI y Animación
* **Nuevo: Enlaces de Pie de Página Interactivos:** La navegación del pie de página de la aplicación y los enlaces sociales se envolvieron con `framer-motion` para proporcionar retroalimentación táctil (animaciones al pasar el cursor y al tocar) para una experiencia de usuario más atractiva.

## Versión 2.5.0
*(Lanzada el 4 de enero de 2026)*

Una actualización centrada en la documentación que une el teléfono y la muñeca, detallando el **Ecosistema Wear OS**.

#### ⌚ Ecosistema Wear OS
* **Nuevo: Documentación de la App Companion:** Se expandieron significativamente las FAQ para incluir una guía dedicada para la aplicación **Pixel Pulse Wear OS**.
* **Guías Detalladas:** Se agregaron secciones sobre Conceptos Básicos de Navegación, uso del Medidor Principal, visualización del Historial y personalización de configuraciones directamente desde el reloj.
* **Sincronización y Privacidad:** Se aclaró cómo funciona la sincronización de sesiones entre el Teléfono y el Reloj, incluidos los detalles de privacidad con respecto a la transferencia de datos local.

#### 🛠️ Técnico
* **Mejora: Help Parser:** Se refinó la lógica de `helpParser`. Ahora maneja inteligentemente los títulos de sección (eliminando los hashes iniciales) y asegura que los subtítulos se procesen con saltos de línea correctos para una mejor legibilidad.

## Versión 2.4.4
*(Lanzada el 1 de enero de 2026)*

* **Documentación:** Se actualizaron los registros de cambios internos para reflejar el enorme progreso en **Pixel Pulse v1.18.0** (Beta 2 a Alpha 01), documentando características como Deep Linking, Sincronización de Estado Plus y el nuevo núcleo Wear OS.

## Versión 2.4.3
*(Lanzada el 31 de diciembre de 2025)*

* **Mantenimiento:** Actualizaciones de documentación de rutina e incremento de versión.

## Versión 2.4.2
*(Lanzada el 31 de diciembre de 2025)*

* **Documentación:** Se actualizaron los registros de cambios para cubrir **Pixel Compass v1.15.0 (Beta 5-7)**, destacando la nueva Háptica Mecánica, los modos de Rotación de Widget y la UI de Calibración Avanzada.

## Versión 2.4.1
*(Lanzada el 26 de diciembre de 2025)*

Una actualización de pulido centrada en la fluidez de la interfaz de usuario y las transiciones de navegación.

#### 🎨 Pulido Visual
* **Corrección: Transiciones Más Suaves:** Se refinaron las animaciones de `AppNavbar` y `PageTransition`. Se cambió de efectos de deslizamiento vertical a horizontal para la navegación de página para crear una sensación más natural de "aplicación nativa".
* **Corrección: Lógica de Animación:** Se simplificaron las props de animación y se mejoraron las funciones de tiempo para eliminar cambios de diseño durante la navegación.
* **Documentación:** Se sincronizó el registro de cambios del sitio con los lanzamientos recientes de aplicaciones en las configuraciones regionales de alemán y japonés, asegurando consistencia en el historial de versiones.

## Versión 2.4.0
*(Lanzada el 24 de diciembre de 2025)*

Esta actualización da vida al portafolio con **Datos en Tiempo Real**. Hemos integrado un backend serverless para obtener calificaciones en vivo de Google Play Store e implementado estándares avanzados de SEO para asegurar que las aplicaciones sean indexadas correctamente por los motores de búsqueda.

#### ☁️ Nube e Infraestructura
* **Nuevo: API de Calificación Serverless:** Desplegamos una **Cloudflare Pages Function** personalizada (`/api/rating`) que actúa como un middleware seguro. Extrae, almacena en caché y sirve las calificaciones de Google Play Store para Pixel Compass y Pixel Pulse, protegiendo nuestros límites de API y mejorando el rendimiento del frontend.
* **Nuevo: Caché Inteligente:** El worker de calificación implementa estrategias de caché para asegurar tiempos de carga instantáneos mientras mantiene los datos actualizados.

#### 🎨 UI y Componentes
* **Nuevo: Insignia de Calificación en Vivo:** Se introdujo un componente `RatingBadge` que se conecta a nuestra nueva API. Muestra la calificación de estrellas y el recuento de reseñas en vivo, con un fallback elegante si la red está desconectada.
* **Nuevo: Modo Compacto:** Integrada una versión condensada de la insignia de calificación directamente en las píldoras de dispositivo de "Scrollytelling" para una apariencia más limpia.

#### 🌐 SEO y Metadatos
* **Nuevo: Datos Estructurados (JSON-LD):** Inyección de scripts dinámicos `application/ld+json` en el encabezado del documento. Esto permite a los motores de búsqueda leer "Rich Snippets" para los productos de software, mostrando precio, SO y calificaciones directamente en los resultados de búsqueda.

## Versión 2.3.1
*(Lanzada el 24 de diciembre de 2025)*

Una actualización enfocada en **Seguridad** e **Identidad de Marca**, asegurando que el sitio no solo sea rápido, sino también seguro y reconocible en todas las plataformas.

#### 🛡️ Seguridad y Pulido
* **Nuevo: Encabezados de Seguridad:** Se añadió un archivo de configuración estricto `_headers`. Esto impone **HSTS** (Strict Transport Security), previene MIME-sniffing y asegura el sitio contra ataques de clickjacking.
* **Nuevo: Branding en Consola:** Se añadió una firma de desarrollador estilizada en la consola del navegador, proporcionando un toque profesional para los desarrolladores que inspeccionan el código fuente.

#### 🛠️ Mejoras de Metadatos
* **Mejora: Soporte del Ecosistema Apple:** Se actualizó el sistema de favicon para soportar estrictamente `apple-touch-icon`, asegurando que las aplicaciones se vean nativas cuando se añaden a una Pantalla de Inicio de iOS.
* **Mejora: Enlaces Canónicos:** El hook `usePageMetadata` ahora genera automáticamente URLs canónicas, previniendo penalizaciones de SEO por "contenido duplicado" a través del portafolio y los dominios de la aplicación.

## Versión 2.3.0
*(Lanzada el 23 de diciembre de 2025)*

Este lanzamiento introduce el **Portal de Aplicaciones "Scrollytelling"**, una landing page interactiva de alta fidelidad para el ecosistema de aplicaciones. Aprovecha técnicas avanzadas de animación para mostrar Pixel Pulse y Pixel Compass en un formato cinematográfico y narrativo.

#### 🌐 Portal de Aplicaciones (Scrollytelling)
* **Nuevo: Experiencia Cinematográfica "Scrollytelling":** El Home de Apps (`apps.fertwbr.com`) ha sido completamente reimaginado. Ahora presenta una narrativa impulsada por el desplazamiento que anima dispositivos, interfaces y texto basado en la interacción del usuario.
* **Nuevo: Mocks de Dispositivos de Alta Fidelidad:** Se diseñaron reproducciones realistas, solo con CSS, de **Pixel Phones** y **Pixel Watches** (con efectos de vidrio curvado y acabados de acero inoxidable) para mostrar el contenido de la aplicación sin activos de imagen pesados.
* **Nuevo: Pantallas de Mock Animadas:** Se desarrollaron interfaces simuladas y animadas para Pixel Pulse (visualización de audio) y Pixel Compass (brújula giratoria) que viven dentro de los marcos de los dispositivos.
* **Nuevo: Elección Dividida Interactiva:** Un componente de navegación "Grand Finale" que divide la pantalla, permitiendo a los usuarios elegir su camino (Audio Maestro vs. Encontrar Camino) con efectos de expansión al pasar el mouse y enfoque dinámico.

#### 🛠️ Técnica y Arquitectura
* **Refactorización: Arquitectura de Sección Modular:** Se desglosó la página de inicio monolítica en componentes de sección especializados y reutilizables (`ScrollDeviceSection`, `WearSection`, `AppsHero`, `AppsHomeExtra`) para una mejor mantenibilidad.
* **Nuevo: Animaciones con Física de Resorte:** Se integraron transiciones complejas de resorte de `framer-motion` para un movimiento fluido y natural de los elementos de UI.
* **Localización:** Se expandieron los módulos de configuración regional `apps_home` en todos los idiomas soportados (de, es, hi, ja, pt) para soportar el nuevo contenido narrativo y especificaciones técnicas.

## Versión 2.2.0
*(Lanzada el 23 de diciembre de 2025)*

Esta actualización marca la migración a una infraestructura de nube profesional, resolviendo limitaciones de enrutamiento y estableciendo un dominio dedicado para el ecosistema de aplicaciones.

#### ☁️ Infraestructura y Nube
* **Nuevo: Migración a Cloudflare Pages:** El sitio ahora está alojado en **Cloudflare Pages**, permitiendo una entrega global más rápida, mejores análisis y reglas de enrutamiento avanzadas.
* **Nuevo: Dominios Personalizados:** Se estableció `fertwbr.com` para el portafolio y `apps.fertwbr.com` para los productos de software.
* **Nuevo: Compatibilidad con Enlaces Legados:** Se implementó una cadena de redirección robusta. Los enlaces legados (ej., `fertwbr.github.io/PixelCompass`) ahora son redirigidos automáticamente al nuevo dominio, preservando el SEO y los marcadores de los usuarios.
* **Nuevo: Enrutamiento Insensible a Mayúsculas/Minúsculas:** Las reglas del lado del servidor ahora manejan problemas de capitalización legados, redirigiendo `/PixelPulse` a `/pixelpulse` automáticamente.

#### 🛠️ Mejoras Técnicas
* **Corrección: Desplazamiento de Anclaje Asíncrono:** Se diseñó un `HashScrollHandler` compatible con el desplazamiento suave de **Lenis**. Espera inteligentemente a que el contenido Markdown asíncrono se renderice antes de desplazarse a enlaces profundos (ej., `#privacy`).
* **Refactorización: Limpieza de URL:** El hook de gestión de estado ahora limpia agresivamente los parámetros de consulta (`?color=...`, `?theme=...`) después de aplicarlos, resultando en URLs más limpias y compartibles.
* **Seguridad:** Se actualizó `assetlinks.json` para soportar la vinculación unificada de aplicaciones en ambos dominios nuevos.

## Versión 2.1.0
*(Lanzada el 23 de diciembre de 2025)*

Este lanzamiento introduce el concepto de "Portal de Aplicaciones" y refactoriza la base de código para una mejor mantenibilidad.

#### 🌐 Portal de Aplicaciones
* **Nuevo: Home de Apps:** Se creó una landing page dedicada para `apps.fertwbr.com` que sirve como un centro para todas las aplicaciones móviles.
* **Nuevo: Enrutamiento Consciente del Dominio:** La aplicación ahora detecta el nombre de host (`apps.` vs `www.`) y sirve el componente Home apropiado (Portal de Aplicaciones vs. Portafolio) mientras comparte la misma base de código.

#### 🏗️ Arquitectura
* **Refactorización: SiteConfig:** Se centralizaron todos los enlaces externos, URLs de activos y metadatos en un solo archivo de configuración (`SiteConfig`). Esto actúa como una "Única Fuente de Verdad", haciendo que las actualizaciones futuras sean sencillas.
* **Refactorización: Arquitectura del Pie de Página:** Se unificó la lógica del pie de página permitiendo variaciones conscientes del contexto (Portafolio vs. Apps).

## Versión 2.0.0
*(Lanzada el 23 de diciembre de 2025)*

Esta es una actualización monumental que reimagina completamente la estructura del portafolio. Hemos migrado de una arquitectura HTML estática a una moderna **Single Page Application (SPA)** construida con React y Vite. Este lanzamiento se enfoca en **Rendimiento**, **Internacionalización**, **Integración con IA** y un sistema de **Diseño Material 3 Dinámico**.

#### 🌐 Sitio Web y Arquitectura
* **Nuevo: Reescritura Completa de Arquitectura:** Todo el sitio ha sido reconstruido desde cero usando **React**, alejándose de componentes estáticos legados. Esto permite una navegación instantánea entre páginas y una base de código modular.
* **Nuevo: Motor de Traducción Impulsado por IA:** Se implementó un script Node.js sofisticado usando la **Gemini API** para traducir automáticamente los registros de cambios a 5 idiomas (Portugués, Español, Alemán, Japonés, Hindi). Cuenta con actualizaciones incrementales y protección contra limitación de tasa.
* **Nuevo: Sistema de Feedback Inteligente:** Una ruta dedicada `/feedback` que permite a los usuarios enviar feedback estructurado (errores, solicitudes de características) con información del dispositivo, consejos de orientación inteligente y guardado automático de borradores.
* **Nuevo: Temas Material 3 Dinámicos:** Se implementó un motor de temas robusto que soporta la extracción de **Color Dinámico** vía `@material/material-color-utilities`.
* **Nuevo: Motor de Contenido Markdown:** Un motor personalizado ahora analiza archivos Markdown sin procesar para renderizar **Changelogs**, **Roadmaps**, **Políticas de Privacidad** y **Secciones de Ayuda** dinámicamente.
* **Nuevo: Internacionalización Global (i18n):** El portafolio ahora está totalmente localizado con soporte para **6 Idiomas**, detección automática y preferencias persistentes.

#### 🎨 UI y Diseño
* **Nuevo: Diseños de Documentación Profesionales:** Se refactorizaron los visualizadores de `Privacy`, `Help` y `Roadmap` para usar un diseño limpio y enfocado en la tipografía (eliminando el glassmorphism pesado para una mejor legibilidad).
* **Nuevo: Roadmap Interactivo:** Un Visualizador de Roadmap completamente rediseñado que soporta líneas de tiempo anidadas, insignias de estado (Lanzado, Planeado) y múltiples formatos markdown.
* **Nuevo: Hubs del Ecosistema de Apps:** Subsecciones dedicadas para **Pixel Pulse** y **Pixel Compass** con cuadrículas de características interactivas, vitrinas "Plus" y metadatos en vivo.
* **Pulido Visual:**
  * **Glassmorphism:** Uso estratégico de efectos de desenfoque en tarjetas y barras de navegación.
  * **Spinner Geométrico:** Una nueva animación de carga de alta fidelidad.
  * **Navbar Animada:** Una barra de navegación receptiva que se oculta inteligentemente al desplazarse.

#### 📱 Móvil y Experiencia
* **Nuevo: Integración con Intent Android:** El deep-linking inteligente permite a los usuarios abrir enlaces directamente en la aplicación Android instalada o recurrir a la Play Store.
* **Nuevo: Resiliencia Offline:** Se añadió un componente de **Aviso Offline** que maneja con elegancia la pérdida de conectividad.
* **Nuevo: Optimizaciones Táctiles:** Se optimizaron los objetivos táctiles y se eliminaron los resaltados de toque para una sensación de aplicación nativa en navegadores móviles.

#### 🛠️ Técnico
* **Nuevo: Revisión de SEO:** Se añadió `sitemap.xml` completo, `robots.txt` y etiquetas meta dinámicas a través de un hook personalizado `usePageMetadata`.
* **Mejora: Rendimiento:** Se integró **Lenis** para desplazamiento inercial y **Framer Motion** para transiciones de página suaves con `AnimatePresence`.
* **Refactorización:** Migración a una estructura de directorios modular (secciones, visualizadores, diseño) y lógica de navegación unificada vía `handleContactSupport`.

## Versión 1.0.0
*(Lanzada el 19 de julio de 2025)*

Esta versión marcó el rediseño mayor inicial del portafolio, estableciendo la identidad visual Material 3 y sentando las bases para una Single-Page Application modular.

#### 🌐 Sitio Web
* **Nuevo: Rediseño Material 3:** Revisión del sitio web de documentación del proyecto usando Material 3 para una interfaz de usuario moderna, limpia y receptiva.
* **Nuevo: Single-Page Application (SPA):** Reemplazo de archivos HTML estáticos con una arquitectura modular con enrutamiento dinámico y carga de contenido.
* **Nuevo: Localización Principal de Documentación:** Todo el sitio fue traducido a múltiples idiomas, incluyendo **Español**, **Portugués**, **Japonés**, **Francés**, **Alemán** e **Hindi**.
* **Nuevo: Changelog Interactivo:** La página de historial de versiones fue rediseñada en un diseño interactivo estilo acordeón.
* **Nuevo: Expansiones de Contenido:** Se añadieron páginas dedicadas para **Pixel Compass+**, **Wear OS** y Testimonios de Usuarios.
* **Identidad Visual:** Se actualizaron el favicon del sitio web y los íconos del manifiesto para coincidir con el branding moderno de la aplicación.