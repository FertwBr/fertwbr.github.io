# Datenschutzrichtlinie für Pixel Compass

**Zuletzt aktualisiert:** 17. März 2026

Willkommen bei Pixel Compass! Diese Datenschutzrichtlinie erklärt, wie **fertwbr** ("wir", "uns" oder "unser")
Informationen behandelt, wenn Sie unsere mobile Anwendung Pixel Compass (der "Dienst") nutzen.

Unser Engagement gilt Ihrer Privatsphäre. Obwohl Pixel Compass spezifische Sensoren und Konnektivität benötigt, um zu
funktionieren, ist es unser Ziel, Daten wann immer möglich lokal zu verarbeiten und die externe Übertragung zu
minimieren.

Diese Datenschutzrichtlinie spiegelt auch die Einhaltung der brasilianischen Datenschutz- und digitalen Schutzgesetze
wider, einschließlich der **Lei Geral de Proteção de Dados (LGPD)** und des **Lei nº 15.211/2025 ("ECA Digital")**, das
zusätzliche Schutzmaßnahmen für Minderjährige in digitalen Umgebungen festlegt.

## 1. Informationen, die wir verarbeiten

Um genaue Navigations- und Wetterdaten bereitzustellen, verarbeitet die Anwendung die folgenden Arten von Informationen:

### a) Standortdaten (Präzise)

**Zweck:** Die Kernfunktionalität des Dienstes beruht auf dem Zugriff auf den präzisen Standort Ihres Geräts (
Breitengrad und Längengrad). Wir verwenden dies, um:

* Ihre geografischen Koordinaten anzuzeigen.
* Den **Geografischen Nordpol** (True North) zu berechnen (durch Bestimmung der magnetischen Deklination für Ihren
  spezifischen Standort).
* Lokale Wetterbedingungen und Höhendaten über externe APIs abzurufen.
* Standortbasierte Widgets zu betreiben (wenn Pixel Compass+ aktiv ist).

**Verarbeitung & Weitergabe:**

* **Lokale Nutzung:** Wird intern von der Android-API `android.hardware.GeomagneticField` verwendet, um Kompassfehler zu
  korrigieren.
* **Externe APIs:** Ihre Koordinaten werden an Drittanbieter (**Google Weather API** und **Google Elevation API**)
  ausschließlich zu dem Zweck gesendet, die auf Ihrem Bildschirm angezeigten Umgebungsdaten abzurufen.

**Auslöser der Erfassung:**

Auf Standortdaten wird nur zugegriffen, wenn die App in Gebrauch ist (Vordergrund) oder wenn ein Widget eine geplante
Aktualisierung erfordert. Wir verwenden einen **Vordergrunddienst** (angezeigt durch eine dauerhafte Benachrichtigung),
um sicherzustellen, dass die Sensorgenauigkeit und die Datenaktualisierungen aktiv bleiben, während Sie die App
verwenden.

**Wir verfolgen oder speichern Ihren Standortverlauf nicht im Hintergrund.**

### b) Sensordaten

**Typen:** Beschleunigungsmesser, Magnetometer (Kompass), Rotationsvektor und Drucksensor (Barometer).

**Zweck:** Unerlässlich, um Schätzungen für Azimut (Kompasspeilung), Neigung (Pitch), Rollen (Roll) und Höhe zu
berechnen.

**Verarbeitung:** Diese Daten werden **vollständig lokal auf Ihrem Gerät** verarbeitet. Sie werden **nicht**
aufgezeichnet, auf externen Servern gespeichert oder an uns übertragen.

### c) Netzwerkzugriff & API-Daten

**Zweck:** Der Internetzugang ist erforderlich, um mit Wetter- und Höhen-APIs zu kommunizieren und In-App-Käufe mit
Google Play zu validieren.

**Übertragene Daten:**

Breitengrad, Längengrad und Standard-IP-Adressinformationen, die für HTTPS-Anfragen an die Dienste von Google
erforderlich sind.

### d) In-App-Kaufinformationen (Pixel Compass+)

**Zweck:** Zur Verwaltung des Zugriffs auf premium-Funktionen, entweder durch einen **einmaligen Kauf (Legacy)** oder
ein **wiederkehrendes Abonnement**.

**Von Google Play verarbeitete Daten:**

Alle finanziellen Transaktionen werden sicher durch das **Abrechnungssystem von Google Play** abgewickelt. Wir erfassen,
greifen auf oder speichern Ihre Zahlungsinformationen (wie Kreditkartennummern oder Bankkontodaten) **nicht**.

**Lokale Speicherung:**

Wir speichern eine lokale Markierung auf Ihrem Gerät (über DataStore-Einstellungen), die Ihren "premium"-Status anzeigt.
Dies ermöglicht es der App, Ihre Lizenz offline zu überprüfen und Funktionen ohne ständigen Internetzugang
freizuschalten.

### e) Optionales Feedback, Protokolle und Anhänge

Pixel Compass bietet ein **optionales In-App-Supportsystem**, das es Benutzern ermöglicht, Feedback, Fehlerberichte oder
Vorschläge zu senden.

Das Einreichen von Feedback ist **völlig freiwillig**.

Benutzer können wählen, Folgendes einzuschließen:

* eine Kontakt-e-mail-Adresse
* schriftliches Feedback
* Screenshots oder Anhänge
* optionale Diagnoseinformationen

Diagnoseinformationen können technische Details umfassen, wie zum Beispiel:

* Gerätemodell
* Android-Version
* Anwendungsversion
* Gebietsschema-Einstellungen

Beispielhafte Diagnoseinformationen könnten ähnlich aussehen wie:

Device: Google sdk_gphone64_x86_64
Android Version: 16 (API 36)
App Version: 1.20.0
Locale: pt_BR

Diese Informationen helfen bei der Diagnose von Problemen und der Verbesserung der Anwendung. Benutzer können
Informationen vor dem Einreichen überprüfen oder entfernen.

## 2. Berechtigungen

Um den Dienst bereitzustellen, fordern wir die folgenden Berechtigungen auf Ihrem Gerät an:

* **Standort (Präzise):** Erforderlich, um den geografischen Nordpol und die magnetische Deklination zu berechnen sowie
  genaue Wetter-/Höhendaten abzurufen.
* **Internet:** Erforderlich, um API-Daten abzurufen und den Abonnementstatus zu überprüfen.
* **Vordergrunddienst:** Erforderlich, um aktive Sensorlesungen und Standortaktualisierungen ohne Unterbrechung
  aufrechtzuerhalten, während die App ausgeführt wird oder der Bildschirm aktiv ist.
* **Benachrichtigungen:** Wird verwendet, um den Status des Vordergrunddienstes anzuzeigen (eine Anforderung des
  Android-Systems) oder um Warnungen im Zusammenhang mit der Funktionalität der App bereitzustellen.

## 3. Informationsweitergabe und Offenlegung

Wir verkaufen, vermieten oder teilen Ihre persönlichen Informationen **nicht** mit Werbetreibenden oder unbefugten
Dritten.

Um jedoch die Funktionen der App bereitzustellen, werden spezifische Daten mit den folgenden Dienstleistern geteilt:

* **Google Weather & Elevation APIs:** Ihr Breitengrad und Längengrad werden ausschließlich an diese Dienste gesendet,
  um Wetter- und Höhendaten an Ihr Gerät zurückzusenden.
* **Google Play Abrechnung:** Wird verwendet, um Zahlungen zu verarbeiten und Ihr Abonnement oder Ihre Legacy-Lizenz zu
  validieren.
* **Gesetzliche Anforderungen:** Wir können Informationen offenlegen, wenn dies gesetzlich vorgeschrieben ist oder als
  Reaktion auf gültige Anfragen von Behörden (z. B. einem Gericht oder einer Regierungsbehörde).

## 4. Datensicherheit, Aufbewahrung und Löschung

**Sicherheit:**

Wir verwenden die branchenübliche **HTTPS-Verschlüsselung** für alle API-Anfragen.

Sensordaten (Magnetometer/Beschleunigungsmesser) werden in Echtzeit im Speicher verarbeitet und sofort nach der
Berechnung verworfen.

**Aufbewahrung:**

* **Cache:** Wetterdaten können vorübergehend auf Ihrem Gerät zwischengespeichert werden, um die Datennutzung zu
  reduzieren und die Leistung zu verbessern.
* **Einstellungen:** Benutzereinstellungen (Design, Einheitensysteme, Umschalter für geografischen Nordpol, Plus-Status)
  werden lokal auf Ihrem Gerät über DataStore gespeichert.

**Backup der premium-Konfiguration:**

Für Benutzer von Pixel Compass+ kann die App ein **lokales Backup bestimmter premium-Konfigurationseinstellungen**
speichern, um eine Wiederherstellung zu ermöglichen, falls der Benutzer sein Abonnement reaktiviert, während die App
installiert bleibt.

Dieses Backup existiert nur auf dem Gerät und wird nicht an unsere Server übertragen.

Wenn die Anwendung deinstalliert wird, kann das Backup zusammen mit den lokalen Daten der App dauerhaft entfernt werden.

**Löschung:**

* Sie können alle gespeicherten Daten löschen, indem Sie die Anwendung deinstallieren oder den Speicher der App über die
  Android-Einstellungen löschen.
* Da Pixel Compass **keine Benutzerkonten betreibt und keine Server unterhält, die persönliche Benutzerdaten speichern
  **, gibt es **keine serverseitigen persönlichen Daten, die von uns gespeichert werden und die Löschanfragen erfordern
  würden**.

**Hinweis zu Käufen:**

Das Löschen der App-Daten löscht die lokale "premium"-Markierung. Um Ihren Status nach einer Neuinstallation oder dem
Löschen von Daten wiederherzustellen, verwenden Sie einfach die Option **"Käufe wiederherstellen"** in den
App-Einstellungen, die Ihre Lizenz mit Google Play erneut validiert.

## 5. Navigations- und Sicherheitsausschluss

Pixel Compass ist ein Software-Tool, das Hardware-Sensoren für Verbraucher nutzt, die in mobilen Geräten zu finden sind.

* **Nicht für kritische Navigation:** Verlassen Sie sich **nicht** auf diese Anwendung für die Navigation auf See, in
  der Luft oder für die professionelle Landnavigation, bei der Ungenauigkeiten zu Schäden, Tod oder Sachschäden führen
  könnten.
* **Interferenz:** Kompassablesungen können stark durch magnetische Interferenzen von nahegelegenen Elektronikgeräten,
  Batterien, Autos oder Schutzhüllen, die Magnete enthalten, beeinträchtigt werden. Überprüfen Sie immer Ihre Umgebung.

## 6. Privatsphäre von Kindern

Der Dienst ist nicht für Personen unter **13** Jahren bestimmt.

Die Anwendung kann jedoch für jugendliche Benutzer im Alter von **13–17** Jahren zugänglich sein, abhängig von den
Verteilungseinstellungen der Plattform.

In Übereinstimmung mit den brasilianischen Gesetzen zum digitalen Schutz, einschließlich des **ECA Digital (Lei nº
15.211/2025)**, folgt die Anwendung den **Prinzipien der Datenminimierung und Privacy-by-Design**, insbesondere für
jüngere Benutzer.

Pixel Compass:

* Erstellt **keine** Verhaltensprofile von Benutzern.
* Führt **kein** App-übergreifendes oder Service-übergreifendes Tracking durch.
* Verwendet **keine** Werbekennungen.
* Erfasst **keine** unnötigen persönlichen Daten, die über das hinausgehen, was für die technische Kernfunktionalität
  der App erforderlich ist.

Wenn Sie ein Elternteil oder Vormund sind und glauben, dass ein Kind persönliche Informationen bereitgestellt hat, die
über das hier Beschriebene hinausgehen, kontaktieren Sie uns bitte.

## 7. Kein Verhaltens-Tracking oder Profiling

Pixel Compass ist als **sensorbasiertes technisches Tool** konzipiert und enthält keine Systeme für:

* Verhaltensanalyse-Profiling
* zielgerichtete Werbung
* Engagement-Manipulation
* soziale Tracking-Systeme

Die meisten von der Anwendung verwendeten Daten werden **lokal auf dem Gerät** verarbeitet und sofort nach der Nutzung
verworfen.

## 8. Änderungen an dieser Datenschutzrichtlinie

Wir können unsere Datenschutzrichtlinie von Zeit zu Zeit aktualisieren. Wir werden Sie über wesentliche Änderungen
informieren, indem wir die neue Datenschutzrichtlinie auf dieser Seite veröffentlichen und das Datum "Zuletzt
aktualisiert" oben in diesem Dokument aktualisieren.

## 9. Kontaktieren Sie uns

Wenn Sie Fragen zu dieser Datenschutzrichtlinie oder den Praktiken dieser App haben, kontaktieren Sie uns bitte unter:

**e-mail:** [contact@fertwbr.com](mailto:contact@fertwbr.com)