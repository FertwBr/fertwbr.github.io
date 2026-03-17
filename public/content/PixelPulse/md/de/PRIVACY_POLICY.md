# Datenschutzrichtlinie für Pixel Pulse

**Zuletzt aktualisiert:** 17. März 2026

Willkommen bei Pixel Pulse! Diese Datenschutzrichtlinie erklärt, wie der **fertwbr** ("wir", "uns" oder "unser")
Informationen behandelt, wenn Sie unsere mobilen und tragbaren Pixel Pulse-Anwendungen (der "Dienst") nutzen.

Unser Engagement gilt Ihrer Privatsphäre. Der Dienst ist so konzipiert, dass er in erster Linie die **lokale
Verarbeitung auf Ihrem Gerät** nutzt und die externe Datenübertragung wann immer möglich minimiert.

Diese Richtlinie spiegelt auch die Einhaltung der brasilianischen Datenschutzbestimmungen wider, einschließlich der *
*Lei Geral de Proteção de Dados (LGPD)** und des **Lei nº 15.211/2025 ("ECA Digital")**, das zusätzliche Schutzmaßnahmen
für Minderjährige in digitalen Umgebungen festlegt.

## 1. Informationen, die wir verarbeiten

### a) Audiodaten (Mikrofonzugriff)

**Zweck:**

Die Kernfunktionalität des Dienstes erfordert den Zugriff auf das Mikrofon Ihres Geräts, um die Schalldruckpegel der
Umgebung (Dezibel) zu messen.

**Verarbeitung:**

Audiosignale werden **in Echtzeit lokal auf Ihrem Gerät** verarbeitet, um die Dezibelpegel zu berechnen.

Das rohe Audiosignal wird sofort nach der Berechnung der Messung verworfen.

**Wir speichern, protokollieren oder übertragen kein rohes Audio von Ihrem Gerät.**

**Auslöser der Erfassung:**

Der Mikrofonzugriff kann aktiv sein, wenn:

1. Sie die App aktiv nutzen.
2. Sie die **Hintergrundüberwachung** (Background Monitoring) oder **Live-Sitzungen** (Live Sessions) aktivieren.
3. Die Messung auf einem verbundenen **Wear OS**-Gerät ausgeführt wird.

Es wird immer eine dauerhafte Benachrichtigung angezeigt, wenn die Hintergrundmessung aktiv ist.

### b) Sitzungs- & Expositionsdaten (Lokal gespeichert)

**Zweck:**

Zur Bereitstellung von Diagrammen, Verlauf, Expositionsanalysen und Erkenntnissen zur Gehörsicherheit.

**Gespeicherte Daten:**

* Zeitstempel (timestamps)
* Expositionsdauer
* berechnete Dezibelwerte (Min. / Durchschn. / Max.)
* Expositionsdosis-Metriken
* analytische Zusammenfassungen, die aus aufgezeichneten Sitzungen abgeleitet wurden

**Speicherung:**

Diese Informationen werden **lokal in einer privaten Datenbank auf Ihrem Gerät** gespeichert.

Sie werden **nicht an Server übertragen, die vom fertwbr betrieben werden**.

Benutzer können diese Daten jederzeit über die In-App-Datenverwaltungstools löschen.

### c) Wear OS-Synchronisierung

Wenn Sie die Wear OS-Begleitanwendung verwenden, können berechnete Messdaten zwischen Ihrer Uhr und Ihrem Telefon
synchronisiert werden.

Diese Synchronisierung erfolgt über die **Android Wearable Data Layer API**, die Daten direkt zwischen Ihren
persönlichen Geräten über Bluetooth, WLAN oder andere lokale Verbindungsmethoden überträgt.

Rohes Audio wird **niemals** zwischen Geräten **übertragen**.

### d) Benutzerdefinierte Routinen

Der Dienst kann es Benutzern ermöglichen, persönliche Routinen wie **Arbeitspläne oder Schlafphasen** zu konfigurieren.

Diese Einstellungen helfen bei der Generierung kontextbezogener Warnungen und analytischer Erkenntnisse.

Alle Routineninformationen werden **ausschließlich lokal auf Ihrem Gerät** gespeichert und niemals an unsere Server
übertragen.

### e) In-App-Kaufinformationen (Pixel Pulse+)

premium-Funktionen werden durch einen **einmaligen Kauf** freigeschaltet, der vollständig über die **Google
Play-Abrechnung** (Google Play Billing) abgewickelt wird.

Wir erfassen oder speichern keine Zahlungsdetails.

Wir erhalten lediglich ein Lizenzvalidierungs-Token von Google Play, um den Kaufstatus zu bestätigen.

### f) Optionales Feedback, Protokolle und Diagnosedaten

Die App bietet ein **optionales In-App-Support-Tool**, mit dem Benutzer Feedback senden können.

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
* Sprach- / Gebietsschema-Einstellungen

Diese Informationen werden ausschließlich zur Fehlerbehebung und zur Verbesserung des Dienstes verwendet.

Benutzer können Informationen vor dem Einreichen bearbeiten oder entfernen.

## 2. Berechtigungen

Die Anwendung kann die folgenden Berechtigungen anfordern:

* **Mikrofon:** Erforderlich, um Schallpegel zu messen.
* **Benachrichtigungen:** Wird für Expositionsalarme und Indikatoren für Vordergrunddienste verwendet.
* **Vordergrunddienst:** Erforderlich, um genaue Messungen bei ausgeschaltetem Bildschirm aufrechtzuerhalten.

## 3. Informationsweitergabe und Offenlegung

Wir verkaufen, vermieten oder teilen persönliche Informationen **nicht** mit Werbetreibenden.

Da die meisten Anwendungsdaten lokal auf dem Gerät des Benutzers verarbeitet und gespeichert werden, hat der fertwbr im
Allgemeinen **keinen Zugriff auf die Messdaten der Benutzer**.

Informationen dürfen nur unter den folgenden eingeschränkten Umständen weitergegeben werden:

* wenn ein Benutzer freiwillig Support-Feedback einreicht
* wenn dies gesetzlich oder durch eine gültige rechtliche Anfrage vorgeschrieben ist

## 4. Datensicherheit, Aufbewahrung und Löschung

### Sicherheit

Lokale Expositionsdaten können mithilfe von Verschlüsselungsmechanismen geschützt werden, die vom Android-Betriebssystem
und nativen Bibliotheken unterstützt werden.

### Aufbewahrung

Daten werden so lange auf dem Gerät des Benutzers aufbewahrt, wie der Benutzer sie behalten möchte.

### System-Backup-Integration

Einige Geräte können Anwendungsdaten automatisch in **Android-System-Backups** (zum Beispiel Google Backup oder Google
Drive-Backups) einbeziehen.

Diese Backups werden **vollständig vom Betriebssystem des Geräts und den Kontoeinstellungen des Benutzers gesteuert**,
nicht vom fertwbr.

Pixel Pulse **greift nicht auf diese Backups zu, verwaltet sie nicht und speichert sie nicht**.

Benutzer können das Backup-Verhalten über ihre Geräteeinstellungen steuern.

### Löschung

Benutzer können aufgezeichnete Expositionsdaten jederzeit über die In-App-Datenverwaltungstools löschen.

Die Deinstallation der Anwendung entfernt auch die lokal auf dem Gerät gespeicherten Daten.

## 5. Medizinischer Haftungsausschluss

Pixel Pulse ist **kein medizinisches Gerät**.

Die bereitgestellten Daten und Erkenntnisse sind informative Schätzungen und sollten nicht für eine professionelle
medizinische Diagnose oder als Ersatz für professionelle Gehörschutzausrüstung verwendet werden.

## 6. Privatsphäre von Kindern

Der Dienst ist nicht für Kinder unter **13** Jahren bestimmt.

Die App kann jedoch je nach den Verteilungseinstellungen der Plattform für jugendliche Benutzer zugänglich sein.

In Übereinstimmung mit den brasilianischen Vorschriften zum digitalen Schutz, einschließlich des **ECA Digital (Lei nº
15.211/2025)**, ist die Anwendung so konzipiert, dass sie die Verarbeitung personenbezogener Daten minimiert, und
implementiert keine Verhaltensverfolgungs- oder Werbesysteme.

## 7. Änderungen an dieser Datenschutzrichtlinie

Wir können diese Datenschutzrichtlinie regelmäßig aktualisieren.

Wesentliche Änderungen werden durch Aktualisierung der Richtlinie auf dieser Seite und Aktualisierung des Datums "
Zuletzt aktualisiert" mitgeteilt.

## 8. Kontaktieren Sie uns

Wenn Sie Fragen zu dieser Datenschutzrichtlinie haben, kontaktieren Sie uns bitte unter:

**[contact@fertwbr.com](mailto:contact@fertwbr.com)**