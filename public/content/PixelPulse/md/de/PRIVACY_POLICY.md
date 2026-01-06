# Datenschutzerklärung für Pixel Pulse

**Zuletzt aktualisiert:** 06. Januar 2026

Willkommen bei Pixel Pulse! Diese Datenschutzerklärung erläutert, wie **fertwbr** („wir“, „uns“ oder „unser“) Informationen handhabt, wenn Sie unsere mobilen und Wearable-Anwendungen von Pixel Pulse (den „Dienst“) nutzen.

## 1. Informationen, die wir verarbeiten

Unser Engagement gilt Ihrer Privatsphäre. Der Dienst ist so konzipiert, dass er fast vollständig lokal auf Ihrem Gerät funktioniert.

**a) Audiodaten (Mikrofonzugriff):**
* **Zweck:** Die Kernfunktionalität des Dienstes erfordert Zugriff auf das Mikrofon Ihres Geräts, um den Umgebungsschalldruckpegel (Dezibel) zu messen.
* **Verarbeitung:** Diese Audiodaten werden **in Echtzeit und vollständig lokal auf Ihrem Gerät** verarbeitet. Das Rohaudio wird sofort verworfen, nachdem der Dezibelpegel berechnet wurde. **Wir speichern, zeichnen auf oder übertragen Ihr Rohaudio nicht von Ihrem Gerät.**
* **Auslöser für die Erfassung:** Der Mikrofonzugriff ist aktiv, wenn:
    1.  Sie die App aktiv nutzen (Vordergrund).
    2.  Sie explizit die **Hintergrundüberwachung** (Background Monitoring) oder **Live-Sitzungen** (Live Sessions) aktivieren. In diesen Fällen wacht die App regelmäßig auf oder führt einen **Foreground Service** aus, um Schallpegel abzutasten, während die App geschlossen oder der Bildschirm ausgeschaltet ist. Eine dauerhafte Benachrichtigung wird immer angezeigt, wenn die Hintergrundüberwachung aktiv ist.

**b) Sitzungs- & Expositionsdaten (Lokal gespeichert):**
* **Zweck:** Bereitstellung von Historien, Diagrammen und Gesundheitseinblicken bezüglich Ihrer Schallumgebung.
* **Gespeicherte Daten:** Dazu gehören Zeitstempel, Dauer, berechnete Dezibelwerte (Min/Durchschnitt/Max) und Expositionsdosis-Metriken.
* **Speicherung:** Diese Daten werden in einer **privaten, lokalen Datenbank auf Ihrem Gerät** gespeichert. Sie werden **nicht** an uns oder einen von uns verwalteten Cloud-Server übertragen. Sie haben die volle Kontrolle, diese Daten jederzeit über die App-Einstellungen zu löschen.

**c) Wear OS-Synchronisierung:**
* **Zweck:** Damit Sie die auf Ihrer Uhr aufgezeichneten Daten in der Telefonanwendung ansehen können.
* **Methode:** Wenn Sie die Begleit-App für Wear OS verwenden, werden berechnete Daten (kein Rohaudio) direkt zwischen Ihrer Uhr und Ihrem Telefon über die lokale *Android Wearable Data Layer API* (via Bluetooth oder WLAN) übertragen. Diese Daten verbleiben innerhalb Ihres persönlichen Geräte-Ökosystems.

**d) Informationen zu In-App-Käufen (Pixel Pulse+):**
* **Zweck:** Freischaltung von **Premium**-Funktionen durch einen **einmaligen Kauf**.
* **Von Google Play verarbeitete Daten:** Alle Kauftransaktionen werden direkt über das **Abrechnungssystem von Google Play** abgewickelt. Wir sammeln oder speichern Ihre Zahlungsinformationen **nicht**. Wir erhalten lediglich ein Bestätigungs-Token, um Ihren Lizenzstatus zu verifizieren.

## 2. Berechtigungen

* **Mikrofon:** Erforderlich, um Schallpegel zu messen.
* **Benachrichtigungen:** Erforderlich, um Ihnen Warnungen zu senden, falls die Schallexposition sichere Grenzwerte (WHO-Empfehlungen) überschreitet, und um den dauerhaften Indikator anzuzeigen, wenn Hintergrunddienste ausgeführt werden.
* **Foreground Service:** Erforderlich, um die Mess-Engine präzise laufen zu lassen, wenn der Bildschirm ausgeschaltet ist.

## 3. Weitergabe und Offenlegung von Informationen

Wir verkaufen, vermieten oder teilen Ihre persönlichen Informationen oder Sitzungsdaten nicht. Da alle Kerndaten lokal auf Ihrem Gerät verarbeitet und gespeichert werden, haben wir keinen Zugriff darauf, um sie mit Dritten zu teilen.

## 4. Datensicherheit, Speicherung und Löschung

* **Sicherheit:** Ihre Daten werden durch die Standard-Sicherheits-Sandbox des **Android**-Betriebssystems geschützt.
* **Speicherung:** Daten werden nur so lange auf Ihrem Gerät gespeichert, wie Sie die App installiert haben.
* **Löschung:** Sie können alle Expositionsdaten über den Bildschirm „Einstellungen > Schallexposition > Datenmanagement“ löschen. Das Deinstallieren der App löscht ebenfalls dauerhaft alle lokal gespeicherten Daten.

## 5. Medizinischer Haftungsausschluss

Pixel Pulse ist **kein Medizinprodukt**. Die bereitgestellten Daten und Einblicke dienen nur zu Informationszwecken und basieren auf einer allgemeinen Kalibrierung. Sie sollten nicht für professionelle medizinische Diagnosen oder als Ersatz für professionellen Gehörschutz in industriellen Umgebungen verwendet werden.

## 6. Datenschutz bei Kindern

Der Dienst ist nicht für Personen unter 13 Jahren bestimmt. Wir sammeln nicht wissentlich persönlich identifizierbare Informationen von Kindern.

## 7. Änderungen an dieser Datenschutzerklärung

Wir können unsere Datenschutzerklärung aktualisieren. Wir werden Sie über wesentliche Änderungen informieren, indem wir die neue Richtlinie auf dieser Seite veröffentlichen, das Datum „Zuletzt aktualisiert“ aktualisieren und/oder über eine Benachrichtigung in der App.

## 8. Kontaktieren Sie uns

Wenn Sie Fragen zu dieser Datenschutzerklärung haben, kontaktieren Sie uns bitte unter: **fertwbr@programmer.net**