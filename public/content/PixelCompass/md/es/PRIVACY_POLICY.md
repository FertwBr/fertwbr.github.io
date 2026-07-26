# Política de Privacidad para Pixel Compass

**Última Actualización:** 26 de julio de 2026

¡Bienvenido a Pixel Compass! Esta Política de Privacidad explica cómo **fertwbr** ("nosotros", "nos" o "nuestro") maneja la información cuando usted utiliza nuestra aplicación móvil Pixel Compass (el "Servicio").

Nuestro compromiso es con su privacidad. Si bien Pixel Compass requiere sensores específicos y conectividad para funcionar, nuestro objetivo es procesar los datos localmente siempre que sea posible y minimizar la transmisión externa.

Esta Política de Privacidad también refleja el cumplimiento de las leyes brasileñas de privacidad y protección digital, incluyendo la **Lei Geral de Proteção de Dados (LGPD)** y la **Lei nº 15.211/2025 ("ECA Digital")**, la cual establece protecciones adicionales para menores en entornos digitales.

## 1. Información que Procesamos

Para proporcionar una navegación precisa, datos del clima y funciones de widgets inteligentes, la aplicación procesa los siguientes tipos de información:

### a) Datos de Ubicación (Precisa)

**Propósito:** La funcionalidad principal del Servicio depende del acceso a la ubicación precisa de su dispositivo (latitud y longitud). Usamos esto para:

* Mostrar sus coordenadas geográficas.
* Calcular el **Norte Verdadero** (determinando la declinación magnética para su ubicación específica).
* Obtener las condiciones climáticas locales y los datos de elevación a través de API externas.
* Alimentar los widgets basados en la ubicación (si Pixel Compass+ está activo).

**Procesamiento y Compartición:**

* **Uso Local:** Usado internamente por la API `android.hardware.GeomagneticField` de Android para corregir errores de la brújula.
* **API Externas:** Sus coordenadas se envían a proveedores externos (**Google Weather API** y **Google Elevation API**) estrictamente para recuperar los datos ambientales mostrados en su pantalla.

**Desencadenante de Recopilación:**

A los datos de ubicación se accede solo cuando la aplicación está en uso (primer plano) o cuando un widget requiere una actualización programada. Utilizamos un **Servicio en Primer Plano** (indicado por una notificación persistente) para garantizar que la precisión del sensor y las actualizaciones de datos permanezcan activas mientras usted utiliza la aplicación.

**Nosotros no rastreamos ni almacenamos su historial de ubicación en segundo plano.**

### b) Datos de Sensores

**Tipos:** Acelerómetro, Magnetómetro (Brújula), Vector de Rotación y Sensor de Presión (Barómetro).

**Propósito:** Esencial para calcular estimaciones de Azimut (rumbo de la brújula), Cabeceo (Pitch), Alabeo (Roll) y Altitud.

**Procesamiento:** Estos datos se procesan **completamente de forma local en su dispositivo**. **No** se registran, ni se almacenan en servidores externos, ni se transmiten a nosotros.

### c) Datos de Información Inteligente e Integraciones (Solo Local)

**Propósito:** Para impulsar el widget "De un vistazo" y las funciones de Información Inteligente, la aplicación puede solicitar acceso opcional a los datos del sistema:
* **Calendario:** Para mostrar su próximo evento.
* **Oyente de notificaciones:** Para interceptar y mostrar cuentas regresivas en vivo de temporizadores y alarmas activos desde aplicaciones de reloj compatibles.
* **Bluetooth:** Para detectar periféricos conectados (como auriculares) y mostrar sus niveles de batería.
* **Cámara (Linterna):** Para detectar si su linterna se encuentra encendida en este momento.

**Procesamiento:** Todos los datos de Información Inteligente se procesan **estrictamente de forma local en su dispositivo**. Nosotros **no** leemos el contenido de su calendario personal para realizar un seguimiento, ni almacenamos, registramos ni transmitimos los eventos de su calendario, las notificaciones o los nombres de dispositivos Bluetooth a ningún servidor externo. El permiso de Cámara se utiliza exclusivamente para verificar el estado de la linterna; nunca se capturan imágenes ni videos.

### d) Acceso a la Red, Datos de API e Integridad del Dispositivo

**Propósito:** Se requiere acceso a Internet para comunicarse con las API de Clima y Elevación, para validar las Compras en la Aplicación y para verificar la seguridad del dispositivo.

**Datos Transmitidos:**

* Latitud, Longitud e información estándar de la dirección IP requerida para las solicitudes HTTPS a los servicios de Google.
* **Google Play Integrity API:** Durante el inicio, la aplicación se comunica de forma segura con Google para verificar que la aplicación y el dispositivo no hayan sido manipulados. Esto ayuda a prevenir el fraude y garantiza un entorno seguro.

### e) Información de Compra en la Aplicación (Pixel Compass+)

**Propósito:** Para gestionar el acceso a las funciones premium a través de una **compra única (Legado)** o una **suscripción recurrente**.

**Datos Procesados por Google Play:**

Todas las transacciones financieras y las alertas transaccionales (Mensajes en la aplicación) se manejan de forma segura a través del **sistema de facturación de Google Play**. Nosotros **no** recopilamos, accedemos ni almacenamos su información de pago (como números de tarjetas de crédito o detalles de cuentas bancarias).

**Almacenamiento Local:**

Almacenamos un indicador local en su dispositivo (a través de las preferencias de DataStore) que señala su estado "premium". Esto permite a la aplicación verificar su licencia sin conexión y desbloquear funciones sin acceso constante a Internet.

### f) Comentarios, Registros y Archivos Adjuntos Opcionales

Pixel Compass proporciona un **sistema de soporte opcional en la aplicación** que permite a los usuarios enviar comentarios, informes de errores o sugerencias.

El envío de comentarios es **completamente voluntario**.

Los usuarios pueden elegir incluir:

* una dirección de e-mail de contacto
* comentarios escritos
* capturas de pantalla o archivos adjuntos
* información de diagnóstico opcional

La información de diagnóstico puede incluir detalles técnicos como:

* modelo del dispositivo
* versión de Android
* versión de la aplicación
* configuración regional

Ejemplos de información de diagnóstico pueden aparecer de manera similar a:

Device: Google sdk_gphone64_x86_64
Android Version: 16 (API 36)
App Version: 1.22.0
Locale: pt_BR

Esta información ayuda a diagnosticar problemas y mejorar la aplicación. Los usuarios pueden revisar o eliminar la información antes de enviarla.

## 2. Permisos

Para proporcionar el Servicio, solicitamos los siguientes permisos en su dispositivo. Algunos son necesarios para la funcionalidad principal, mientras que otros son completamente opcionales para la personalización de los widgets:

* **Ubicación (Precisa):** Requerida para calcular el Norte Verdadero, la declinación magnética y obtener datos precisos de Clima/Elevación.
* **Internet:** Requerida para obtener datos de la API y verificar la integridad de la suscripción y del dispositivo.
* **Servicio en Primer Plano:** Requerida para mantener activas las lecturas de los sensores y las actualizaciones de ubicación sin interrupción mientras la aplicación se está ejecutando o la pantalla está activa.
* **Notificaciones (Opcional):** Utilizada para mostrar el estado del servicio en primer plano o para proporcionar alertas meteorológicas.
* **Calendario (Opcional):** Utilizada para mostrar los próximos eventos en el widget.
* **Acceso a Notificaciones (Opcional):** Utilizada para mostrar temporizadores y alarmas activos en el widget.
* **Bluetooth (Opcional):** Utilizada para mostrar el estado de conexión de los periféricos en el widget.
* **Cámara (Opcional):** Utilizada únicamente para detectar el estado de la linterna para el widget.

## 3. Compartición y Divulgación de Información

Nosotros **no** vendemos, alquilamos ni compartimos su información personal con anunciantes o terceros no autorizados.

Sin embargo, para proporcionar las características de la aplicación, datos específicos se comparten con los siguientes proveedores de servicios:

* **Google Weather & Elevation APIs:** Su latitud y longitud se envían a estos servicios únicamente para devolver los datos de clima y altitud a su dispositivo.
* **Google Play Services (Facturación e Integridad):** Utilizados para procesar pagos, enviar mensajes transaccionales y verificar la seguridad del dispositivo para evitar abusos.
* **Requisitos Legales:** Podemos divulgar información si así lo exige la ley o en respuesta a solicitudes válidas de autoridades públicas (por ejemplo, un tribunal o una agencia gubernamental).

## 4. Seguridad, Retención y Eliminación de Datos

**Seguridad:**

Utilizamos **encriptación HTTPS** estándar de la industria para todas las solicitudes de API.

Los datos de los sensores y los datos de Información Inteligente (Calendario, Bluetooth, Alarmas) se procesan en la memoria en tiempo real y se descartan inmediatamente después del cálculo o cuando el widget se actualiza.

**Retención:**

* **Caché:** Los datos del clima pueden almacenarse temporalmente en caché en su dispositivo para reducir el uso de datos y mejorar el rendimiento.
* **Preferencias:** La configuración del usuario (Tema, Sistemas de unidades, Interruptor del Norte Verdadero, Estado Plus) se almacena localmente en su dispositivo a través de DataStore.

**Copia de Seguridad de la Configuración premium:**

Para los usuarios de Pixel Compass+, la aplicación puede almacenar una **copia de seguridad local de ciertas configuraciones premium** para permitir la restauración si el usuario reactiva su suscripción mientras la aplicación permanece instalada.

Esta copia de seguridad existe solo en el dispositivo y no se transmite a nuestros servidores.

Si la aplicación se desinstala, la copia de seguridad puede eliminarse permanentemente junto con los datos locales de la aplicación.

**Eliminación:**

* Usted puede borrar todos los datos almacenados desinstalando la aplicación o borrando el almacenamiento de la aplicación a través de la Configuración de Android.
* Debido a que Pixel Compass **no opera cuentas de usuario y no mantiene servidores que almacenen datos personales de los usuarios**, **no existen datos personales en el lado del servidor almacenados por nosotros que requieran solicitudes de eliminación**.

**Nota sobre Compras:**

Borrar los datos de la aplicación elimina el indicador local "premium". Para restaurar su estado después de reinstalar o borrar datos, simplemente use la opción **"Restaurar Compras"** en la configuración de la aplicación, la cual revalidará su licencia con Google Play.

## 5. Descargo de Responsabilidad de Navegación y Seguridad

Pixel Compass es una herramienta de software que utiliza sensores de hardware de nivel de consumidor que se encuentran en los dispositivos móviles.

* **No apto para Navegación Crítica:** **No** confíe en esta aplicación para navegación marítima, de aviación o terrestre profesional donde la inexactitud podría resultar en daños, muerte o daños a la propiedad.
* **Interferencia:** Las lecturas de la brújula pueden verse gravemente afectadas por interferencias magnéticas de aparatos electrónicos cercanos, baterías, automóviles o fundas protectoras que contengan imanes. Siempre verifique su entorno.

## 6. Privacidad de los Niños

El Servicio no está destinado a ninguna persona menor de **13** años.

Sin embargo, la aplicación puede ser accesible para usuarios adolescentes de entre **13 y 17** años, dependiendo de la configuración de distribución de la plataforma.

De acuerdo con las leyes brasileñas de protección digital, incluyendo el **ECA Digital (Lei nº 15.211/2025)**, la aplicación sigue los **principios de minimización de datos y privacidad desde el diseño (privacy-by-design)**, especialmente para los usuarios más jóvenes.

Pixel Compass:

* **No** crea perfiles de comportamiento de los usuarios.
* **No** realiza seguimiento entre aplicaciones o entre servicios.
* **No** utiliza identificadores de publicidad.
* **No** recopila datos personales innecesarios más allá de lo que se requiere para la funcionalidad técnica central de la aplicación.

Si usted es padre o tutor y cree que un niño ha proporcionado información personal más allá de lo que se describe aquí, por favor contáctenos.

## 7. Sin Seguimiento de Comportamiento ni Elaboración de Perfiles

Pixel Compass está diseñado como una **herramienta técnica basada en sensores** y no incluye sistemas para:

* elaboración de perfiles analíticos de comportamiento
* publicidad dirigida
* manipulación de la interacción
* sistemas de seguimiento social

La mayor parte de los datos utilizados por la aplicación se procesa **localmente en el dispositivo** y se descarta inmediatamente después de su uso.

## 8. Cambios en esta Política de Privacidad

Podemos actualizar nuestra Política de Privacidad de vez en cuando. Le notificaremos cualquier cambio significativo publicando la nueva Política de Privacidad en esta página y actualizando la fecha de "Última Actualización" en la parte superior de este documento.

## 9. Contáctenos

Si tiene alguna pregunta sobre esta Política de Privacidad o las prácticas de esta aplicación, por favor contáctenos en:

**e-mail:** [contact@fertwbr.com](mailto:contact@fertwbr.com)