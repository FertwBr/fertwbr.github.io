# Datenschutzerklärung für Pixel Compass

**Zuletzt aktualisiert:** 06. Januar 2026

Willkommen bei Pixel Compass! Diese Datenschutzerklärung erläutert, wie **fertwbr** („wir“, „uns“ oder „unser“) Informationen handhabt, wenn Sie unsere mobile Anwendung Pixel Compass (den „Dienst“) nutzen.

Unser Engagement gilt Ihrer Privatsphäre. Obwohl Pixel Compass spezifische Sensoren und Konnektivität benötigt, um zu funktionieren, streben wir danach, Daten wann immer möglich lokal zu verarbeiten und die externe Übertragung zu minimieren.

## 1. Informationen, die wir verarbeiten

Um genaue Navigations- und Wetterdaten bereitzustellen, verarbeitet die Anwendung die folgenden Arten von Informationen:

### a) Standortdaten (Genau)
* **Zweck:** Die Kernfunktionalität des Dienstes beruht auf dem Zugriff auf den genauen Standort Ihres Geräts (Breitengrad und Längengrad). Wir verwenden diesen, um:
    * Ihre geographischen Koordinaten anzuzeigen.
    * Den **Wahren Norden** (True North) zu berechnen (durch Bestimmung der magnetischen Deklination für Ihren spezifischen Standort).
    * Lokale Wetterbedingungen und Höhendaten über externe APIs abzurufen.
    * Standortbasierte Widgets zu betreiben (wenn Pixel Compass+ aktiv ist).
* **Verarbeitung & Weitergabe:**
    * **Lokale Nutzung:** Wird intern von der Android-API `android.hardware.GeomagneticField` verwendet, um Kompassfehler zu korrigieren.
    * **Externe APIs:** Ihre Koordinaten werden an Drittanbieter (**Google Weather API** und **Google Elevation API**) gesendet, und zwar ausschließlich, um die auf Ihrem Bildschirm angezeigten Umgebungsdaten abzurufen.
* **Auslöser für die Erfassung:** Auf Standortdaten wird nur zugegriffen, wenn die App in Gebrauch ist (Vordergrund) oder wenn ein Widget eine geplante Aktualisierung benötigt. Wir verwenden einen **Foreground Service** (gekennzeichnet durch eine dauerhafte Benachrichtigung), um sicherzustellen, dass die Sensorgenauigkeit und Datenaktualisierungen aktiv bleiben, während Sie die App verwenden. **Wir verfolgen oder speichern Ihren Standortverlauf nicht im Hintergrund.**

### b) Sensordaten
* **Arten:** Beschleunigungsmesser (Accelerometer), Magnetometer (Kompass), Rotationsvektor und Drucksensor (Barometer).
* **Zweck:** Unerlässlich zur Berechnung von Schätzungen für Azimut (Kompasspeilung), Pitch (Neigung), Roll (Rollen) und Altitude (Höhe).
* **Verarbeitung:** Diese Daten werden **vollständig lokal auf Ihrem Gerät** verarbeitet. Sie werden **nicht** aufgezeichnet, auf externen Servern gespeichert oder an uns übertragen.

### c) Netzwerkzugriff & API-Daten
* **Zweck:** Internetzugang ist erforderlich, um mit den Wetter- und Höhen-APIs zu kommunizieren und In-App-Käufe mit Google Play zu validieren.
* **Übertragene Daten:** Breitengrad, Längengrad und Standard-IP-Adressinformationen, die für HTTPS-Anfragen an die Dienste von Google erforderlich sind.

### d) Informationen zu In-App-Käufen (Pixel Compass+)
* **Zweck:** Verwaltung des Zugriffs auf Premium-Funktionen über einen **einmaligen Kauf (Legacy)** oder ein **wiederkehrendes Abonnement**.
* **Von Google Play verarbeitete Daten:** Alle finanziellen Transaktionen werden sicher über das **Abrechnungssystem von Google Play** abgewickelt. Wir sammeln, greifen zu oder speichern Ihre Zahlungsinformationen (wie Kreditkartennummern oder Bankkontodaten) **nicht**.
* **Lokale Speicherung:** Wir speichern eine lokale Markierung auf Ihrem Gerät (über **DataStore**-Präferenzen), die Ihren „Premium“-Status anzeigt. Dies ermöglicht es der App, Ihre Lizenz offline zu überprüfen und Funktionen ohne ständigen Internetzugang freizuschalten.

## 2. Berechtigungen

Um den Dienst bereitzustellen, fordern wir die folgenden Berechtigungen auf Ihrem Gerät an:

* **Standort (Genau):** Erforderlich, um den Wahren Norden und die magnetische Deklination zu berechnen sowie genaue Wetter-/Höhendaten abzurufen.
* **Internet:** Erforderlich, um API-Daten abzurufen und den Abonnementstatus zu überprüfen.
* **Foreground Service:** Erforderlich, um aktive Sensormesswerte und Standortaktualisierungen ohne Unterbrechung aufrechtzuerhalten, während die App läuft oder der Bildschirm aktiv ist.
* **Benachrichtigungen:** Wird verwendet, um den Status des Vordergrunddienstes anzuzeigen (eine Anforderung des Android-Systems) oder um Warnungen in Bezug auf die Funktionalität der App bereitzustellen.

## 3. Weitergabe und Offenlegung von Informationen

Wir verkaufen, vermieten oder teilen Ihre persönlichen Informationen **nicht** mit Werbetreibenden oder unbefugten Dritten. Um jedoch die Funktionen der App bereitzustellen, werden spezifische Daten mit den folgenden Dienstleistern geteilt:

* **Google Weather & Elevation APIs:** Ihr Breitengrad und Längengrad werden an diese Dienste gesendet, ausschließlich um Wetter- und Höhendaten an Ihr Gerät zurückzugeben.
* **Google Play Billing:** Wird verwendet, um Zahlungen zu verarbeiten und Ihr Abonnement oder Ihre Legacy-Lizenz (**Legacy**) zu validieren.
* **Gesetzliche Anforderungen:** Wir können Informationen offenlegen, wenn dies gesetzlich vorgeschrieben ist oder als Reaktion auf gültige Anfragen von Behörden (z. B. ein Gericht oder eine Regierungsbehörde).

## 4. Datensicherheit, Speicherung und Löschung

* **Sicherheit:** Wir verwenden branchenübliche **HTTPS**-Verschlüsselung für alle API-Anfragen. Sensordaten (Magnetometer/Beschleunigungsmesser) werden im Echtzeitspeicher verarbeitet und unmittelbar nach der Berechnung verworfen.
* **Speicherung:**
    * **Cache:** Wetterdaten können vorübergehend auf Ihrem Gerät zwischengespeichert werden, um den Datenverbrauch zu reduzieren und die Leistung zu verbessern.
    * **Präferenzen:** Benutzereinstellungen (Design, Einheitensysteme, Umschalter für Wahren Norden, Plus-Status) werden lokal auf Ihrem Gerät über **DataStore** gespeichert.
* **Löschung:**
    * Sie können alle gespeicherten Daten löschen, indem Sie die Anwendung deinstallieren oder den App-Speicher über die Android-Einstellungen löschen. Dadurch werden sofort alle lokalen Präferenzen und Widget-Konfigurationen entfernt.
    * **Hinweis zu Käufen:** Das Löschen von App-Daten entfernt die lokale „Premium“-Markierung. Um Ihren Status nach einer Neuinstallation oder dem Löschen von Daten wiederherzustellen, verwenden Sie einfach die Option **„Käufe wiederherstellen“** (Restore Purchases) in den App-Einstellungen, wodurch Ihre Lizenz mit Google Play erneut validiert wird.

## 5. Haftungsausschluss für Navigation und Sicherheit

Pixel Compass ist ein Software-Tool, das Hardware-Sensoren verwendet, die in mobilen Geräten für Verbraucher üblich sind (Consumer-Grade).

* **Nicht für kritische Navigation:** Verlassen Sie sich **nicht** auf diese Anwendung für die Seeschifffahrt, Luftfahrt oder professionelle Landnavigation, bei der Ungenauigkeiten zu Schäden, Tod oder Sachschäden führen könnten.
* **Interferenzen:** Kompassmesswerte können durch magnetische Interferenzen von nahegelegenen elektronischen Geräten, Batterien, Autos oder Schutzhüllen, die Magnete enthalten, stark beeinträchtigt werden. Überprüfen Sie immer Ihre Umgebung.

## 6. Datenschutz bei Kindern

Der Dienst ist nicht für Personen unter 13 Jahren bestimmt. Wir sammeln nicht wissentlich persönlich identifizierbare Informationen von Kindern. Wenn Sie ein Elternteil oder Erziehungsberechtigter sind und wissen, dass Ihr Kind uns personenbezogene Daten zur Verfügung gestellt hat, kontaktieren Sie uns bitte.

## 7. Änderungen an dieser Datenschutzerklärung

Wir können unsere Datenschutzerklärung von Zeit zu Zeit aktualisieren. Wir werden Sie über wesentliche Änderungen informieren, indem wir die neue Datenschutzerklärung auf dieser Seite veröffentlichen und das Datum „Zuletzt aktualisiert“ oben in diesem Dokument aktualisieren.

## 8. Kontaktieren Sie uns

Wenn Sie Fragen zu dieser Datenschutzerklärung oder den Praktiken dieser App haben, kontaktieren Sie uns bitte unter:

**E-Mail:** fertwbr@programmer.net