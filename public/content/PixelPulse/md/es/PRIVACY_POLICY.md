# Política de Privacidad de Pixel Pulse

**Última actualización:** 06 de enero de 2026

¡Bienvenido a Pixel Pulse! Esta Política de Privacidad explica cómo **fertwbr** ("nosotros", "nos" o "nuestro") maneja la información cuando usted utiliza nuestras aplicaciones móviles y para dispositivos vestibles Pixel Pulse (el "Servicio").

## 1. Información que procesamos

Nuestro compromiso es con su privacidad. El Servicio está diseñado para funcionar casi totalmente de forma local en su dispositivo.

**a) Datos de audio (Acceso al micrófono):**
* **Finalidad:** La funcionalidad central del Servicio requiere acceso al micrófono de su dispositivo para medir el nivel de presión sonora ambiental (decibelios).
* **Procesamiento:** Estos datos de audio se procesan **en tiempo real, totalmente de forma local en su dispositivo**. El audio sin procesar se descarta inmediatamente después de calcular el nivel de decibelios. **No almacenamos, grabamos ni transmitimos su audio sin procesar fuera de su dispositivo.**
* **Activador de recopilación:** El acceso al micrófono está activo cuando:
    1.  Usted está utilizando activamente la aplicación (primer plano).
    2.  Usted habilita explícitamente el **Monitoreo en segundo plano** o las **Sesiones en vivo**. En estos casos, la aplicación se activa periódicamente o ejecuta un **Foreground Service** para muestrear los niveles de sonido mientras la aplicación está cerrada o la pantalla está apagada. Siempre se mostrará una notificación persistente cuando el monitoreo en segundo plano esté activo.

**b) Datos de sesión y exposición (Almacenados localmente):**
* **Finalidad:** Proporcionar historial, gráficos y análisis de salud relacionados con su entorno sonoro.
* **Datos almacenados:** Esto incluye marcas de tiempo (*timestamps*), duración, valores de decibelios calculados (mín/prom/máx) y métricas de dosis de exposición.
* **Almacenamiento:** Estos datos se almacenan en una **base de datos local y privada en su dispositivo**. No se nos transmiten a nosotros ni a ningún servidor en la nube gestionado por nosotros. Usted tiene control total para eliminar estos datos en cualquier momento a través de la configuración de la aplicación.

**c) Sincronización con Wear OS:**
* **Finalidad:** Permitirle ver los datos grabados en su reloj dentro de la aplicación del teléfono.
* **Método:** Si utiliza la aplicación complementaria para Wear OS, los datos calculados (no el audio sin procesar) se transfieren directamente entre su reloj y el teléfono utilizando la API local *Android Wearable Data Layer* (vía Bluetooth o Wi-Fi). Estos datos permanecen dentro del ecosistema de su dispositivo personal.

**d) Información de compras en la aplicación (Pixel Pulse+):**
* **Finalidad:** Desbloquear funciones **Premium** mediante una **compra única**.
* **Datos procesados por Google Play:** Todas las transacciones de compra son procesadas directamente por el **sistema de facturación de Google Play**. Nosotros **no** recopilamos ni almacenamos su información de pago. Solo recibimos un token de confirmación para verificar el estado de su licencia.

## 2. Permisos

* **Micrófono:** Requerido para medir los niveles de sonido.
* **Notificaciones:** Requeridas para enviarle alertas si la exposición al sonido excede los umbrales seguros (recomendaciones de la OMS) y para mostrar el indicador persistente cuando los servicios en segundo plano están en ejecución.
* **Foreground Service:** Requerido para mantener el motor de medición funcionando con precisión cuando la pantalla está apagada.

## 3. Intercambio y divulgación de información

No vendemos, alquilamos ni compartimos su información personal o datos de sesión. Dado que todos los datos centrales se procesan y almacenan localmente en su dispositivo, no tenemos acceso a ellos para compartirlos con terceros.

## 4. Seguridad, retención y eliminación de datos

* **Seguridad:** Sus datos están protegidos por el *sandbox* de seguridad estándar del sistema operativo **Android**.
* **Retención:** Los datos se conservan en su dispositivo solo mientras mantenga instalada la aplicación.
* **Eliminación:** Puede eliminar todos los datos de exposición a través de la pantalla "Configuración > Exposición sonora > Gestión de datos". Desinstalar la aplicación también eliminará permanentemente todos los datos almacenados localmente.

## 5. Exención de responsabilidad médica

Pixel Pulse **no es un dispositivo médico**. Los datos y análisis proporcionados son solo para fines informativos y se basan en una calibración genérica. No deben utilizarse para diagnósticos médicos profesionales ni como sustituto de equipos de protección auditiva profesional en entornos industriales.

## 6. Privacidad infantil

El Servicio no está destinado a menores de 13 años. No recopilamos intencionalmente información de identificación personal de niños.

## 7. Cambios en esta Política de Privacidad

Podemos actualizar nuestra Política de Privacidad. Le notificaremos cualquier cambio significativo publicando la nueva Política en esta página, actualizando la fecha de "Última actualización" y/o a través de una notificación en la aplicación.

## 8. Contáctenos

Si tiene alguna pregunta sobre esta Política de Privacidad, contáctenos en: **fertwbr@programmer.net**