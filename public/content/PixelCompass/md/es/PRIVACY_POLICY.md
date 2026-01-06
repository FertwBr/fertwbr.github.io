# Política de Privacidad de Pixel Compass

**Última actualización:** 06 de enero de 2026

¡Bienvenido a Pixel Compass! Esta Política de Privacidad explica cómo **fertwbr** ("nosotros", "nos" o "nuestro") maneja la información cuando usted utiliza nuestra aplicación móvil Pixel Compass (el "Servicio").

Nuestro compromiso es con su privacidad. Aunque Pixel Compass requiere sensores específicos y conectividad para funcionar, nuestro objetivo es procesar los datos localmente siempre que sea posible y minimizar la transmisión externa.

## 1. Información que procesamos

Para proporcionar datos precisos de navegación y clima, la aplicación procesa los siguientes tipos de información:

### a) Datos de ubicación (Precisa)
* **Finalidad:** La funcionalidad central del Servicio depende del acceso a la ubicación precisa de su dispositivo (latitud y longitud). Usamos esto para:
    * Mostrar sus coordenadas geográficas.
    * Calcular el **Norte verdadero** (determinando la declinación magnética para su ubicación específica).
    * Obtener condiciones climáticas locales y datos de elevación a través de API externas.
    * Alimentar widgets basados en la ubicación (si Pixel Compass+ está activo).
* **Procesamiento y uso compartido:**
    * **Uso local:** Utilizado internamente por la API `android.hardware.GeomagneticField` de Android para corregir errores de la brújula.
    * **API externas:** Sus coordenadas se envían a proveedores externos (**Google Weather API** y **Google Elevation API**) estrictamente para recuperar los datos ambientales que se muestran en su pantalla.
* **Activador de recopilación:** Solo se accede a los datos de ubicación cuando la aplicación está en uso (primer plano) o cuando un widget requiere una actualización programada. Utilizamos un **Foreground Service** (indicado por una notificación persistente) para garantizar que la precisión del sensor y las actualizaciones de datos permanezcan activas mientras utiliza la aplicación. **No rastreamos ni almacenamos su historial de ubicación en segundo plano.**

### b) Datos del sensor
* **Tipos:** Acelerómetro, Magnetómetro (Brújula), Vector de rotación y Sensor de presión (Barómetro).
* **Finalidad:** Esencial para calcular estimaciones de Azimut (orientación de la brújula), *Pitch* (inclinación), *Roll* (balanceo) y Altitud.
* **Procesamiento:** Estos datos se procesan **totalmente de forma local en su dispositivo**. No se graban, no se almacenan en servidores externos ni se nos transmiten.

### c) Acceso a la red y datos de API
* **Finalidad:** Se requiere acceso a Internet para comunicarse con las API de Clima y Elevación y para validar las compras en la aplicación con Google Play.
* **Datos transmitidos:** Latitud, Longitud e información estándar de dirección IP requerida para solicitudes HTTPS a los servicios de Google.

### d) Información de compras en la aplicación (Pixel Compass+)
* **Finalidad:** Gestionar el acceso a funciones premium mediante una **compra única (Legacy)** o una **suscripción recurrente**.
* **Datos procesados por Google Play:** Todas las transacciones financieras son gestionadas de forma segura por el **sistema de facturación de Google Play**. Nosotros **no** recopilamos, accedemos ni almacenamos su información de pago (como números de tarjetas de crédito o detalles de cuentas bancarias).
* **Almacenamiento local:** Almacenamos un indicador local en su dispositivo (a través de las preferencias de **DataStore**) que indica su estado "Premium". Esto permite que la aplicación verifique su licencia sin conexión y desbloquee funciones sin acceso constante a Internet.

## 2. Permisos

Para proporcionar el Servicio, solicitamos los siguientes permisos en su dispositivo:

* **Ubicación (Precisa):** Requerido para calcular el Norte verdadero, la declinación magnética y obtener datos precisos de Clima/Elevación.
* **Internet:** Requerido para obtener datos de API y verificar el estado de la suscripción.
* **Foreground Service:** Requerido para mantener lecturas activas de los sensores y actualizaciones de ubicación sin interrupción mientras la aplicación se está ejecutando o la pantalla está activa.
* **Notificaciones:** Se utiliza para mostrar el estado del servicio en primer plano (un requisito del sistema Android) o para proporcionar alertas relacionadas con la funcionalidad de la aplicación.

## 3. Intercambio y divulgación de información

Nosotros **no** vendemos, alquilamos ni compartimos su información personal con anunciantes o terceros no autorizados. Sin embargo, para proporcionar las funciones de la aplicación, se comparten datos específicos con los siguientes proveedores de servicios:

* **Google Weather & Elevation APIs:** Su latitud y longitud se envían a estos servicios únicamente para devolver datos meteorológicos y de altitud a su dispositivo.
* **Google Play Billing:** Se utiliza para procesar pagos y validar su suscripción o licencia heredada (**Legacy**).
* **Requisitos legales:** Podemos divulgar información si así lo exige la ley o en respuesta a solicitudes válidas de autoridades públicas (por ejemplo, un tribunal o una agencia gubernamental).

## 4. Seguridad, retención y eliminación de datos

* **Seguridad:** Utilizamos cifrado **HTTPS** estándar de la industria para todas las solicitudes de API. Los datos del sensor (magnetómetro/acelerómetro) se procesan en la memoria en tiempo real y se descartan inmediatamente después del cálculo.
* **Retención:**
    * **Caché:** Los datos meteorológicos pueden almacenarse temporalmente en caché en su dispositivo para reducir el uso de datos y mejorar el rendimiento.
    * **Preferencias:** La configuración del usuario (Tema, Sistemas de unidades, alternancia de Norte verdadero, Estado Plus) se almacena localmente en su dispositivo a través de **DataStore**.
* **Eliminación:**
    * Puede borrar todos los datos almacenados desinstalando la aplicación o borrando el almacenamiento de la aplicación a través de la Configuración de Android. Esto eliminará inmediatamente todas las preferencias locales y configuraciones de widgets.
    * **Nota sobre compras:** Borrar los datos de la aplicación elimina el indicador local "Premium". Para restaurar su estado después de reinstalar o borrar datos, simplemente use la opción **"Restaurar compras"** en la configuración de la aplicación, lo que volverá a validar su licencia con Google Play.

## 5. Exención de responsabilidad de navegación y seguridad

Pixel Compass es una herramienta de software que utiliza sensores de hardware de nivel de consumo que se encuentran en dispositivos móviles.

* **No para navegación crítica:** **No** confíe en esta aplicación para la navegación marítima, aérea o terrestre profesional donde la imprecisión podría resultar en daños, muerte o daños a la propiedad.
* **Interferencia:** Las lecturas de la brújula pueden verse muy afectadas por interferencias magnéticas de dispositivos electrónicos cercanos, baterías, automóviles o fundas protectoras que contengan imanes. Verifique siempre su entorno.

## 6. Privacidad infantil

El Servicio no está destinado a menores de 13 años. No recopilamos intencionalmente información de identificación personal de niños. Si es padre, madre o tutor y sabe que su hijo nos ha proporcionado datos personales, comuníquese con nosotros.

## 7. Cambios en esta Política de Privacidad

Podemos actualizar nuestra Política de Privacidad de vez en cuando. Le notificaremos cualquier cambio significativo publicando la nueva Política de Privacidad en esta página y actualizando la fecha de "Última actualización" en la parte superior de este documento.

## 8. Contáctenos

Si tiene alguna pregunta sobre esta Política de Privacidad o las prácticas de esta aplicación, contáctenos en:

**Correo electrónico:** fertwbr@programmer.net