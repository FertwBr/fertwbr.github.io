# Historial de Versiones
Siga la evolución del portafolio. Aquí encontrará un registro detallado de nuevas características, mejoras y correcciones para cada versión.

## Version 4.1.0
*(Released April 14, 2026)*

La versión 4.1.0 introduce nuevas y potentes formas de compartir actualizaciones y aporta una capa de pulido premium a la interfaz del sitio. Este lanzamiento se centra en hacer que la información sea más accesible y fácil de distribuir a través de nuestro nuevo motor de intercambio por correo electrónico enriquecido, a la vez que ofrece una experiencia de navegación más fluida y receptiva para los usuarios de tablets.

#### 🌐 Core Web Experience
* **New: Rich Email Sharing Engine:** Compartir actualizaciones importantes ahora es sencillo. El sitio ahora puede generar incrustaciones de correo electrónico HTML con un estilo elegante directamente desde el changelog y el contenido Markdown.
  * **Cross-Client Compatibility:** Las incrustaciones se generan dinámicamente utilizando un estilo en línea preciso (utilizando opacidad moderna y formato RGBA en lugar de colores fijos) para garantizar que se vean perfectas y hereden las fuentes correctas en todos los principales clientes de correo electrónico.
  * **Smart Topic Extraction:** El sistema ahora extrae de forma inteligente los encabezados y temas de Markdown, empaquetándolos ordenadamente en la carga útil del correo electrónico junto con un respaldo de portapapeles de texto sin formato confiable para una máxima compatibilidad.
  * **Seamless Copy Feedback:** Olvídese de las intrusivas alertas emergentes del navegador. Copiar enlaces o incrustaciones de correo electrónico ahora activa una notificación toast elegante y ligera para un flujo premium sin interrupciones.

* **UI & UX Polish: Tablet Navigation Overhaul:** La barra de navegación para tablets se ha reconstruido desde cero, pasando de los estilos en línea a una arquitectura robusta impulsada por CSS para una capacidad de respuesta superior.
  * **Refined Glass Effect:** La estética característica de efecto cristal ahora es más suave, consistente y más fácil de tematizar mientras se desplaza.
  * **Intelligent Layouts:** Las etiquetas de navegación ahora se ocultan dinámicamente en pantallas de tablets más estrechas (menos de 900 px), priorizando el espacio en pantalla para su contenido mientras mantiene los iconos esenciales perfectamente alineados.

* **Global Localization: Expanded Translations:** La nueva suite de intercambio por correo electrónico está completamente localizada y lista para su uso global.
  * **Multi-Language Support:** Se agregaron claves de traducción completas para todos los flujos de intercambio y copia en alemán, inglés, español, hindi, japonés y portugués.

* **Fixes & Stability: Ecosystem & Routing:** Correcciones esenciales para garantizar que los usuarios siempre lleguen al destino correcto sin fricciones.
  * **Verified Store Links:** Se reemplazaron las URL de marcador de posición con los enlaces oficiales y en vivo de Chrome Web Store y Firefox Add-on.
  * **Documentation Anchors:** Se normalizaron los metadatos de la tabla de contenidos en las secciones de Ayuda y FAQ (convirtiéndolos a kebab-case), lo que garantiza que los enlaces profundos y el desplazamiento automático funcionen perfectamente cada vez.
  * **Repository Routing:** Se corrigió un error tipográfico en la URL de la documentación del desarrollador para que apunte correctamente a la base de código de código abierto Gemini-Expressive.

## Version 4.0.0
*(Publicado el 6 de abril de 2026)*

Bienvenido a la Versión 4.0 del Portal de Portafolio y Aplicaciones. Este hito fundamental introduce un ecosistema dedicado de alta fidelidad para nuestra nueva extensión de Chrome, **Gemini Expressive**. Junto con el lanzamiento del nuevo producto, hemos implementado un potente middleware de edge computing para SEO dinámico, incorporado exhibiciones de medios con reproducción automática y llevado nuestra interfaz de usuario cinematográfica "Scrollytelling" a un nuevo nivel.

#### 🚀 Gemini Expressive Portal
* **Nuevo: Centro de Producto Dedicado:** Lanzamiento de una experiencia de destino completa para `tools.fertwbr.com/geminiexpressive`. El centro cuenta con una sección hero animada que detecta inteligentemente su navegador, tarjetas de funciones personalizadas y guías interactivas de "Cómo hacerlo".
* **Nuevo: Estadísticas de Desarrollador en Vivo:** Introducción del componente `ExtensionDev`, que se conecta directamente con la API de GitHub para obtener y mostrar estadísticas del repositorio en tiempo real (Stars y Forks) directamente en la página de destino.
* **Nuevo: Infraestructura Legal de la Extensión:** Se han añadido Políticas de Privacidad integrales y totalmente localizadas, Términos de Uso y una sección detallada de Ayuda/Preguntas Frecuentes, adaptada específicamente a la naturaleza "local-first" de la extensión Gemini Expressive.
* **Integración:** Se ha integrado perfectamente la nueva extensión en el mapa del sitio global, las exhibiciones del portafolio y los motores de traducción localizada en los 6 idiomas compatibles.

#### ☁️ Infraestructura de Edge y SEO
* **Nuevo: Motor de Middleware de Cloudflare:** Implementación de una potente función de edge `onRequest` que utiliza `HTMLRewriter`. Este middleware intercepta dinámicamente las solicitudes de página e inyecta etiquetas Open Graph específicas de la ruta, tarjetas de Twitter y etiquetas meta de `theme-color` directamente en el HTML antes de que llegue al navegador, mejorando drásticamente el intercambio social y las vistas previas de SEO.
* **Mejora: Datos Estructurados Inteligentes:** Actualización de nuestra generación de esquemas JSON-LD. El sitio ahora detecta automáticamente si una página es una aplicación móvil o una extensión de navegador, emitiendo el esquema `SoftwareApplication` correcto para los motores de búsqueda.

#### 🎨 Interfaz de Usuario Cinematográfica y Medios
* **Nuevo: Fondo de Herramientas Ambiental:** Introducción de `ToolsPageBackground`, un nuevo y sorprendente fondo ambiental que presenta una malla de degradado animada superpuesta con una elegante cuadrícula geométrica semitransparente.
* **Nuevo: Exhibiciones de Medios con Reproducción Automática:** Se ha añadido un soporte sólido para demostraciones de vídeo integradas. El nuevo componente `FeatureVideo` utiliza un `IntersectionObserver` para reproducir o pausar automáticamente vídeos de demostración de alta calidad (como los editores de Timeline y Snippet) a medida que entran o salen del área de visualización.
* **Refinamiento: Mejoras en Hero y SplitChoice:** Las secciones `AppsHero` y `SplitChoice` han recibido importantes mejoras visuales. Ahora cuentan con máscaras de cuadrícula de fondo, focos desenfocados, iconos flotantes y una física de resortes perfectamente ajustada para una entrada cinematográfica más inmersiva.

#### 🧭 Navegación y Soporte
* **Nuevo: Agrupación Móvil Inteligente:** La barra de navegación móvil (`NavbarMobile`) ahora se organiza dinámicamente. Si hay más de 4 elementos de menú, los divide inteligentemente en filas compactas "Principales" y "Secundarias" para preservar el espacio en pantalla.
* **Nuevo: Comentarios Sensibles al Contexto:** El Asistente de Soporte ahora acepta un parámetro de URL (`?source=`). Cuando los usuarios hacen clic en "Ayuda" o "Comentarios" desde la página de destino de una aplicación específica, el asistente preselecciona automáticamente el proyecto correcto (Pixel Compass, Pixel Pulse o Gemini Expressive), ahorrando tiempo y evitando tickets categorizados incorrectamente.
* **Corrección: Estabilidad de la Interfaz Responsiva:** Se han sustituido cientos de estilos en línea por clases CSS semánticas y centralizadas (`feedback.css`, `tools.css`). Esto refuerza el diseño frente al cambio de tamaño de la ventana de visualización y garantiza una representación coherente tanto en monitores ultra-wide como en pantallas móviles compactas.


## Versión 3.0.0
*(Publicada el 22 de marzo de 2026)*

Bienvenido a la Versión 3.0. Este importante lanzamiento representa meses de perfeccionamiento continuo, mediante la reconstrucción completa de nuestra arquitectura de navegación, la introducción de un potente sistema de soporte de varios pasos y la actualización significativa de nuestros motores de internacionalización y cumplimiento legal.

#### 🌐 Navegación y Arquitectura
* **Nuevo: Sistema de Navegación Adaptativo:** Hemos reconstruido por completo la navegación del sitio para que sea verdaderamente responsiva en todos los dispositivos.
  * **Escritorio:** Una nueva `TopBarDesktop` con un encabezado fijo, portales de búsqueda/filtro integrados y una `SidebarDesktop` plegable (modos Drawer/Rail).
  * **Tableta:** Una `NavbarTablet` dedicada, que presenta menús en forma de píldora centrados y transiciones de diseño fluidas con `framer-motion`.
  * **Móvil:** Una `NavbarMobile` mejorada, con un menú deslizante suave con efecto de cristal, cierre confiable al hacer clic en el fondo y controles flotantes de acceso rápido.
* **Nuevo: Controles Universales:** Reemplazamos los antiguos menús de pie de página por un nuevo componente `UniversalControls`. Ahora, usted puede cambiar su Tema (Automático/Claro/Oscuro) y su Idioma desde cualquier lugar, con el estado perfectamente sincronizado.
* **Corrección: Volver Arriba Inteligente:** El botón flotante (FAB) "Volver Arriba" ahora utiliza un `IntersectionObserver` para detectar automáticamente el pie de página, desplazándose suavemente hacia arriba para que nunca se superponga con enlaces cruciales.

#### 🌍 Internacionalización y Traducción
* **Nuevo: Experiencia de Traducción Automática Inteligente:** Al visualizar los registros de cambios traducidos, aparece un emblema interactivo de "Traducido Automáticamente". Los usuarios pueden hacer clic en este emblema para alternar instantáneamente entre el texto traducido y el texto original en inglés.
* **Nuevo: Banderas de Idioma Geográficas:** Reemplazamos los emojis de texto estándar por recursos `FlagCDN` de alta calidad (con un respaldo de Noto Color Emoji). El sitio ahora lee inteligentemente su zona horaria para mostrar la bandera geográficamente correcta para su idioma (por ejemplo, asignando el inglés a las banderas del Reino Unido, Irlanda, Sudáfrica o Jamaica según la ubicación).
* **Nuevo: Temas Localizados y Configuraciones Regionales Compartidas:** Los nombres de los temas (Bosque, Carmesí, Púrpura, etc.) ahora están completamente localizados. También hemos introducido una arquitectura unificada de "Configuración Regional Compartida" para sincronizar a la perfección las traducciones en todo el portafolio y en las páginas de destino de las aplicaciones.

#### 📧 Soporte y Comentarios
* **Nuevo: El Asistente de Soporte:** La página de Comentarios se ha transformado completamente en un asistente interactivo de 4 pasos. Lo guía a través de la selección de su aplicación/plataforma, la categorización de su problema, la vinculación segura de capturas de pantalla (vía Base64) y la revisión de su solicitud antes de enviarla.
* **Nuevo: E-mails de Soporte Dinámicos:** Los e-mails automatizados (desarrollados por la API Resend) se han rediseñado por completo. Ahora, cuentan con temas responsivos en modo Claro y Oscuro, garantizando que sus tickets de soporte y respuestas automáticas luzcan perfectos en cualquier cliente de e-mail.

#### 📘 Visualizadores y Documentación
* **Nuevo: Enrutamiento del Registro de Cambios en Pantalla Completa:** Ahora puede compartir enlaces directos a actualizaciones de aplicaciones específicas (por ejemplo, `.../changelog/:versionId`). Abrir una versión específica activa un diseño de artículo limpio y en pantalla completa.
* **Nuevo: Etiquetas de Plataforma y Navegación Secuencial:** El analizador del registro de cambios ahora extrae y renderiza automáticamente insignias específicas de la plataforma (📱 Teléfono, ⌚ Wear OS, 🌐 Web) según los encabezados de sección. Los artículos en pantalla completa también cuentan con botones de "Actualización Anterior/Siguiente" para una lectura fluida.
* **Nuevo: Estados de Carga y Búsqueda Fija:** Introducimos un nuevo `GeometricSpinner` con efecto de cristal y un `ChangelogSkeleton` para estados de carga suaves. Añadimos una barra de búsqueda fija que se oculta de forma inteligente al desplazarse hacia abajo o al escribir.
* **Nuevo: Tabla de Contenido Inteligente (TOC):** La tabla de contenido de las páginas de documentación se ha actualizado a un diseño desplazable en forma de píldora, con indicadores de estado activo y animaciones de resorte más suaves.

#### 🎨 Pulido Visual y Scrollytelling
* **Interfaz de Usuario: Transiciones Cinematográficas de Héroe:** La sección `AppsHero` ha sido renovada con una máscara de fondo de cuadrícula y un foco inferior desenfocado. Las animaciones de dispositivos de "Scrollytelling" ahora presentan un sutil efecto de "asomo" al cargar.
* **Interfaz de Usuario: Evolución de Elección Dividida:** La pantalla de selección de aplicaciones del "Gran Final" (`SplitChoice`) ahora cuenta con paneles más altos, detalles radiales animados, íconos rebotantes y un botón de llamada a la acción (CTA) de "Explorar" dedicado.
* **Interfaz de Usuario: Markdown y Tipografía:** El motor de renderizado de markdown ha sido completamente revisado. La documentación ahora presenta una tipografía mejorada (fuente Poppins), sombras sutiles, barras de desplazamiento personalizadas, así como tablas y bloques de código con un estilo limpio.

## Versión 2.8.2
*(Lanzado el 16 de marzo de 2026)*

Una actualización de refinamiento centrada en mejorar el sistema automatizado de correos electrónicos de soporte, garantizando una alta capacidad de entrega y accesibilidad en todas las plataformas.

#### 📧 Sistema de Correo Electrónico y Soporte
* **Nuevo: Tematización Dinámica de Correo:** Se agregó soporte robusto para temas claro/oscuro al HTML del correo automatizado mediante el uso de etiquetas meta `color-scheme` y clases CSS. Los tickets de soporte y las respuestas automáticas ahora se adaptan perfectamente al tema del cliente de correo del usuario.
* **Mejora: Plantillas HTML:** Se introdujo un generador `buildSupportHtml()` para crear cuerpos de correo modernos y con la marca, que contienen el mensaje del usuario junto con datos de depuración de diagnóstico.
* **Mejora: Accesibilidad de Formularios:** Se agregaron los atributos correctos `id`, `name`, `htmlFor` y `autoComplete` al formulario de la página de Feedback para una mejor compatibilidad con lectores de pantalla y facilitar las pruebas.

## Versión 2.8.1
*(Lanzado el 15 de marzo de 2026)*

* **Corrección: Optimización de la Resend API:** Se simplificó la estructura HTML de las respuestas automáticas y se reemplazaron los ayudantes de envoltura por llamadas `fetch` directas y optimizadas a la Resend API, mejorando el manejo de errores y la velocidad de entrega.
* **Corrección: Refinamiento de la UI:** Se eliminó un artefacto de carácter suelto del componente `PortfolioHome` que podía causar inconsistencias de renderizado.

## Versión 2.8.0
*(Lanzado el 15 de marzo de 2026)*

Esta importante actualización introduce una completa **API de Comentarios y Soporte en la Aplicación**, migrando de enlaces `mailto:` directos a un sistema de envío seguro y sin servidor (serverless) con archivos adjuntos y respuestas automáticas localizadas.

#### ☁️ Cloud y API
* **Nuevo: API de Comentarios Serverless:** Se implementó una Cloudflare Pages Function (`/api/feedback`) que maneja de manera segura las solicitudes POST y se comunica con la **Resend API** para despachar tickets de soporte y respuestas automáticas localizadas para el usuario.
* **Nuevo: Soporte para Archivos Adjuntos:** El sistema de comentarios ahora es totalmente compatible con archivos adjuntos en Base64, lo que permite a los usuarios enviar capturas de pantalla de forma segura directamente desde el formulario web.

#### 🎨 UI y Localización
* **Nuevo: Formulario de Comentarios Interactivo:** Se construyó un sólido flujo de validación del lado del cliente con estados de carga en tiempo real (`idle/sending/success/error`), guardado automático de borradores y vistas previas de archivos adjuntos.
* **Localización:** Se tradujo por completo la nueva experiencia de comentarios (marcadores de posición, errores, mensajes de éxito y textos de guía) en los 6 idiomas compatibles (de, en, es, hi, ja, pt).
* **Refactorización: Pie de Página y Navegación:** Se reemplazaron los correos electrónicos de contacto directos por componentes seguros `Link` de React Router. Se mejoraron los componentes `DropdownButton` y `MenuItem` con transiciones más suaves y estados de desplazamiento (hover) perfeccionados.

#### 💎 Branding y Activos
* **Actualización: Iconografía de la App:** Se renovaron por completo los activos de Favicon y Web Manifest tanto para Pixel Compass como para Pixel Pulse. Se reconstruyeron los SVG con gradientes refinados, rutas de recorte actualizadas y se integró el soporte adecuado de `apple-touch-icon` para el ecosistema de Apple.
* **Documentación:** Se agregaron encabezados JSDoc a los archivos de configuración principales (`PixelCompassConfig`, `PixelPulseConfig`) para mejorar la experiencia del desarrollador y la mantenibilidad.

## Versión 2.7.4
*(Lanzado el 5 de febrero de 2026)*

* **Documentación:** Sincronización masiva de los registros de cambios del sitio para cubrir los extensos ciclos de beta y release candidate para **Pixel Compass v1.16.0 - v1.20.0** y **Pixel Pulse v1.19.0 - v1.20.0**, documentando exhaustivamente nuevas características como el Acoustic Health Engine, la paridad con Wear OS y las actualizaciones de la Expressive UI.

## Versión 2.7.3
*(Lanzado el 19 de enero de 2026)*

* **Mejora de UI:** Se refactorizó la lógica de la `WearOSCard` para usar una propiedad de disponibilidad genérica, mostrando dinámicamente la tarjeta promocional de Wear OS para las páginas de destino tanto de Compass como de Pulse.
* **Localización:** Se refinaron las traducciones promocionales de Wear OS en todas las regiones para aclarar las capacidades de medición en la muñeca.
* **Documentación:** Se agregaron entradas en el registro de cambios para Pixel Pulse v1.18.0 RC2 y Pixel Compass v1.16.0 Beta 1.

## Versión 2.7.2
*(Lanzado el 15 de enero de 2026)*

* **Documentación:** Actualizaciones de rutina que detallan el lanzamiento oficial de **Pixel Pulse v1.18.0**, incluyendo la nueva aplicación para Wear OS, copias de seguridad encriptadas y gráficos interactivos.

## Versión 2.7.1
*(Lanzado el 7 de enero de 2026)*

* **Documentación:** Se ampliaron las descripciones generales de los proyectos para destacar las estrategias de modularización y la nueva sincronización del Wear OS Data Layer. Se actualizaron las notas de la versión para las versiones de la aplicación 1.15.1 y 1.15.2.

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