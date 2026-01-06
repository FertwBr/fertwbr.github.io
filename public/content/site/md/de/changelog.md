# Versionsverlauf
Verfolgen Sie die Entwicklung des Portfolios. Hier finden Sie ein detailliertes Protokoll über neue Funktionen, Verbesserungen und Korrekturen für jede Version.

## Version 2.7.0
*(Veröffentlicht am 6. Januar 2026)*

Dieses Update konzentriert sich auf **Vertrauen, Sicherheit und Compliance**. Wir haben eine robuste rechtliche Infrastruktur mit einem dedizierten Nutzungsbedingungen-Viewer, erweiterten Datenschutzrichtlinien in allen Sprachen und einer umfassenden Dokumentation für Datensicherheit und Backups eingeführt.

#### ⚖️ Recht & Compliance
* **Neu: Nutzungsbedingungen-Viewer:** Es wurde eine spezialisierte `TermsViewer`-Komponente implementiert, die die Nutzungsbedingungen mit einem dynamischen Inhaltsverzeichnis und einer Integration des Support-Kontakts darstellt.
* **Neu: Rechtliche Lokalisierung:** Die Dateien `TERMS.md` und `PRIVACY_POLICY.md` für Pixel Compass und Pixel Pulse wurden in 6 Sprachen (Deutsch, Englisch, Spanisch, Hindi, Japanisch, Portugiesisch) hinzugefügt und aktualisiert.
* **Update: Datenschutzrichtlinie:** Überarbeitete Richtlinien zur Klärung der Datenverarbeitung und Berechtigungsnutzung sowie Hinzufügung spezifischer medizinischer Haftungsausschlüsse für die Pulse-App.
* **Neu: Konfiguration:** `PixelCompassConfig` und `PixelPulseConfig` wurden aktualisiert, um den neuen Bereich 'Terms' zu unterstützen, was eine nahtlose Navigation zwischen Datenschutz, Hilfe und Bedingungen ermöglicht.

#### 📘 Dokumentation & Support
* **Neu: Leitfaden für manuelles Backup:** Ein detaillierter Abschnitt "Manuelles Backup und Wiederherstellung" wurde den FAQ hinzugefügt. Er deckt das `.ppbk`-Dateiformat, intelligente Wiederherstellungsstrategien und Verschlüsselungsstandards ab, um Nutzern zu helfen, ihre Daten sicher zu archivieren.
* **Verbesserung:** Das `termsParser`-Dienstprogramm wurde verbessert, um Metadaten und Abschnitte aus Markdown-Dateien genauer zu extrahieren.

## Version 2.6.0
*(Veröffentlicht am 6. Januar 2026)*

Diese Version führt das **Store Conversion Kit** ein, das entwickelt wurde, um die Lücke zwischen dem Webportal und dem Google Play Store zu schließen. Es bietet High-Fidelity-Call-to-Action-Komponenten und verbesserte Interaktionen in der Fußzeile.

#### 🛍️ Store-Integration
* **Neu: HomeStoreFooter-Komponente:** Einführung einer markenspezifischen Fußzeile speziell für App-Startseiten. Sie verfügt über ein "Get it on Google Play"-Abzeichen, lokalisierte Slogans und Hinweise zur Gerätekompatibilität.
* **Lokalisierung:** Übersetzungsschlüssel für `store_footer` in allen unterstützten Sprachen hinzugefügt, um sicherzustellen, dass die Download-Aufforderungen der Region des Nutzers entsprechen.
* **Integration:** Die neue Fußzeile wurde nahtlos in `PixelCompassHome` und `PixelPulseHome` integriert.

#### 🎨 UI & Animation
* **Neu: Interaktive Fußzeilen-Links:** Die Navigation in der App-Fußzeile und soziale Links wurden mit `framer-motion` umschlossen, um taktiles Feedback (Hover- und Tipp-Animationen) für ein ansprechenderes Nutzererlebnis zu bieten.

## Version 2.5.0
*(Veröffentlicht am 4. Januar 2026)*

Ein dokumentationsorientiertes Update, das die Brücke zwischen Telefon und Handgelenk schlägt und das **Wear OS-Ökosystem** detailliert beschreibt.

#### ⌚ Wear OS-Ökosystem
* **Neu: Dokumentation der Companion-App:** Die FAQ wurden erheblich erweitert, um einen dedizierten Leitfaden für die **Pixel Pulse Wear OS**-App aufzunehmen.
* **Detaillierte Anleitungen:** Abschnitte zu Navigationsgrundlagen, Nutzung des Hauptmessgeräts, Verlaufansicht und Anpassung der Einstellungen direkt von der Uhr aus hinzugefügt.
* **Sync & Datenschutz:** Geklärt, wie die Sitzungssynchronisation zwischen Telefon und Uhr funktioniert, einschließlich Datenschutzdetails bezüglich der lokalen Datenübertragung.

#### 🛠️ Technisch
* **Verbesserung: Help Parser:** Die `helpParser`-Logik wurde verfeinert. Sie behandelt nun Abschnittstitel intelligent (Entfernung führender Rauten) und stellt sicher, dass Unterüberschriften für eine bessere Lesbarkeit mit korrekten Zeilenumbrüchen verarbeitet werden.

## Version 2.4.4
*(Veröffentlicht am 1. Januar 2026)*

* **Dokumentation:** Die internen Changelogs wurden aktualisiert, um den massiven Fortschritt bei **Pixel Pulse v1.18.0** (Beta 2 bis Alpha 01) widerzuspiegeln, wobei Funktionen wie Deep Linking, Plus-Status-Synchronisation und der neue Wear OS-Kern dokumentiert wurden.

## Version 2.4.3
*(Veröffentlicht am 31. Dezember 2025)*

* **Wartung:** Routinemäßige Dokumentationsaktualisierungen und Versionserhöhung.

## Version 2.4.2
*(Veröffentlicht am 31. Dezember 2025)*

* **Dokumentation:** Aktualisierte Changelogs zur Abdeckung von **Pixel Compass v1.15.0 (Beta 5-7)**, mit Hervorhebung der neuen mechanischen Haptik, Widget-Rotationsmodi und der erweiterten Kalibrierungs-UI.

## Version 2.4.1
*(Veröffentlicht am 26. Dezember 2025)*

Ein Polish-Update, das sich auf die Flüssigkeit der Benutzeroberfläche und Navigationsübergänge konzentriert.

#### 🎨 Visueller Feinschliff
* **Fix: Geschmeidigere Übergänge:** `AppNavbar`- und `PageTransition`-Animationen verfeinert. Umstellung von vertikalen auf horizontale Gleiteffekte für die Seitennavigation, um ein natürlicheres "Native App"-Gefühl zu erzeugen.
* **Fix: Animationslogik:** Animations-Props vereinfacht und Zeitfunktionen verbessert, um Layout-Verschiebungen während der Navigation zu eliminieren.
* **Dokumentation:** Das Changelog der Website wurde mit den jüngsten App-Veröffentlichungen in den deutschen und japanischen Sprachumgebungen synchronisiert, um Konsistenz in der Versionshistorie sicherzustellen.

## Version 2.4.0
*(Veröffentlicht am 24. Dezember 2025)*

Dieses Update erweckt das Portfolio mit **Echtzeitdaten** zum Leben. Wir haben ein serverloses Backend integriert, um Live-Bewertungen aus dem Google Play Store abzurufen, und fortschrittliche SEO-Standards implementiert, um sicherzustellen, dass die Apps von Suchmaschinen korrekt indexiert werden.

#### ☁️ Cloud & Infrastruktur
* **Neu: Serverlose Bewertungs-API:** Wir haben eine benutzerdefinierte **Cloudflare Pages Function** (`/api/rating`) bereitgestellt, die als sichere Middleware fungiert. Sie extrahiert, speichert und liefert Google Play Store-Bewertungen für Pixel Compass und Pixel Pulse, schützt unsere API-Limits und verbessert die Frontend-Leistung.
* **Neu: Intelligentes Caching:** Der Bewertungs-Worker implementiert Caching-Strategien, um sofortige Ladezeiten zu gewährleisten und gleichzeitig die Daten aktuell zu halten.

#### 🎨 UI & Komponenten
* **Neu: Live-Rating-Badge:** Einführung einer `RatingBadge`-Komponente, die sich mit unserer neuen API verbindet. Sie zeigt die Live-Sternebewertung und die Anzahl der Rezensionen an, mit einem eleganten Fallback, falls das Netzwerk offline ist.
* **Neu: Kompaktmodus:** Integration einer komprimierten Version des Bewertungs-Badges direkt in die "Scrollytelling"-Geräte-Pills für ein saubereres Erscheinungsbild.

#### 🌐 SEO & Metadaten
* **Neu: Strukturierte Daten (JSON-LD):** Injektion dynamischer `application/ld+json`-Skripte in den Head des Dokuments. Dies ermöglicht Suchmaschinen das Lesen von "Rich Snippets" für die Softwareprodukte und zeigt Preis, Betriebssystem und Bewertungen direkt in den Suchergebnissen an.

## Version 2.3.1
*(Veröffentlicht am 24. Dezember 2025)*

Ein fokussiertes Update zu **Sicherheit** und **Markenidentität**, das sicherstellt, dass die Website nicht nur schnell, sondern auch sicher und auf allen Plattformen wiedererkennbar ist.

#### 🛡️ Sicherheit & Feinschliff
* **Neu: Sicherheits-Header:** Hinzufügen einer strengen `_headers`-Konfigurationsdatei. Dies erzwingt **HSTS** (Strict Transport Security), verhindert MIME-Sniffing und sichert die Website gegen Clickjacking-Angriffe ab.
* **Neu: Konsolen-Branding:** Hinzufügen einer stilisierten Entwicklersignatur in der Browserkonsole, die Entwicklern, die den Quellcode inspizieren, eine professionelle Note bietet.

#### 🛠️ Metadaten-Verbesserungen
* **Verbesserung: Unterstützung des Apple-Ökosystems:** Aktualisierung des Favicon-Systems zur strikten Unterstützung von `apple-touch-icon`, damit die Apps nativ aussehen, wenn sie zum iOS-Startbildschirm hinzugefügt werden.
* **Verbesserung: Kanonische Links:** Der `usePageMetadata`-Hook generiert jetzt automatisch kanonische URLs, um SEO-Abstrafungen durch "doppelten Inhalt" über das Portfolio und die App-Domains hinweg zu verhindern.

## Version 2.3.0
*(Veröffentlicht am 23. Dezember 2025)*

Diese Version führt das **"Scrollytelling"-App-Portal** ein, eine interaktive High-Fidelity-Landingpage für das App-Ökosystem. Es nutzt fortschrittliche Animationstechniken, um Pixel Pulse und Pixel Compass in einem filmischen, narrativen Format zu präsentieren.

#### 🌐 App-Portal (Scrollytelling)
* **Neu: Filmisches "Scrollytelling"-Erlebnis:** Die Apps Home (`apps.fertwbr.com`) wurde komplett neu konzipiert. Sie bietet nun eine scroll-gesteuerte Erzählung, die Geräte, Benutzeroberflächen und Text basierend auf der Benutzerinteraktion animiert.
* **Neu: High-Fidelity Geräte-Mocks:** Entwicklung realistischer, reiner CSS-Reproduktionen von **Pixel Phones** und **Pixel Watches** (mit gewölbten Glaseffekten und Edelstahloberflächen), um App-Inhalte ohne schwere Bild-Assets anzuzeigen.
* **Neu: Animierte Mock-Screens:** Entwicklung simulierter, animierter Benutzeroberflächen für Pixel Pulse (Audio-Visualisierung) und Pixel Compass (rotierendes Kompass-Zifferblatt), die innerhalb der Geräterahmen laufen.
* **Neu: Interaktive Split-Choice:** Eine "Grand Finale"-Navigationskomponente, die den Bildschirm teilt und es den Benutzern ermöglicht, ihren Pfad zu wählen (Master Audio vs. Pfad finden), mit expandierenden Hover-Effekten und dynamischem Fokus.

#### 🛠️ Technik & Architektur
* **Refactoring: Modulare Sektionsarchitektur:** Aufteilung der monolithischen Startseite in spezialisierte, wiederverwendbare Sektionskomponenten (`ScrollDeviceSection`, `WearSection`, `AppsHero`, `AppsHomeExtra`) für bessere Wartbarkeit.
* **Neu: Federphysik-Animationen:** Integration komplexer `framer-motion` Federübergänge für flüssige, natürliche Bewegungen von UI-Elementen.
* **Lokalisierung:** Erweiterung der `apps_home`-Lokalisierungsmodule über alle unterstützten Sprachen (de, es, hi, ja, pt), um die neuen narrativen Inhalte und technischen Spezifikationen zu unterstützen.

## Version 2.2.0
*(Veröffentlicht am 23. Dezember 2025)*

Dieses Update markiert die Migration zu einer professionellen Cloud-Infrastruktur, löst Routing-Einschränkungen und etabliert eine dedizierte Domain für das App-Ökosystem.

#### ☁️ Infrastruktur & Cloud
* **Neu: Migration zu Cloudflare Pages:** Die Website wird jetzt auf **Cloudflare Pages** gehostet, was eine schnellere globale Bereitstellung, bessere Analysen und fortschrittliche Routing-Regeln ermöglicht.
* **Neu: Benutzerdefinierte Domains:** Einrichtung von `fertwbr.com` für das Portfolio und `apps.fertwbr.com` für die Softwareprodukte.
* **Neu: Kompatibilität mit Legacy-Links:** Implementierung einer robusten Weiterleitungskette. Veraltete Links (z. B. `fertwbr.github.io/PixelCompass`) werden jetzt automatisch auf die neue Domain weitergeleitet, wodurch SEO und Benutzer-Lesezeichen erhalten bleiben.
* **Neu: Groß-/Kleinschreibungsunabhängiges Routing:** Serverseitige Regeln behandeln jetzt veraltete Probleme mit der Groß-/Kleinschreibung und leiten `/PixelPulse` automatisch zu `/pixelpulse` um.

#### 🛠️ Technische Verbesserungen
* **Fix: Asynchrones Anker-Scrollen:** Entwicklung eines `HashScrollHandler`, der mit dem sanften Scrollen von **Lenis** kompatibel ist. Er wartet intelligent darauf, dass asynchrone Markdown-Inhalte gerendert werden, bevor er zu Deep Links (z. B. `#privacy`) scrollt.
* **Refactoring: URL-Bereinigung:** Der State-Management-Hook bereinigt jetzt aggressiv Query-Parameter (`?color=...`, `?theme=...`) nach deren Anwendung, was zu saubereren, teilbaren URLs führt.
* **Sicherheit:** Aktualisierung von `assetlinks.json` zur Unterstützung einer einheitlichen App-Verknüpfung über beide neuen Domains hinweg.

## Version 2.1.0
*(Veröffentlicht am 23. Dezember 2025)*

Diese Version führt das Konzept des "App-Portals" ein und refaktoriert die Codebasis für eine bessere Wartbarkeit.

#### 🌐 App-Portal
* **Neu: Apps Home:** Erstellung einer dedizierten Landingpage für `apps.fertwbr.com`, die als zentraler Hub für alle mobilen Anwendungen dient.
* **Neu: Domain-basiertes Routing:** Die Anwendung erkennt jetzt den Hostnamen (`apps.` vs. `www.`) und stellt die entsprechende Home-Komponente (App-Portal vs. Portfolio) bereit, während sie dieselbe Codebasis teilt.

#### 🏗️ Architektur
* **Refactoring: SiteConfig:** Zentralisierung aller externen Links, Asset-URLs und Metadaten in einer einzigen Konfigurationsdatei (`SiteConfig`). Dies fungiert als "Single Source of Truth" und macht zukünftige Updates mühelos.
* **Refactoring: Footer-Architektur:** Vereinheitlichung der Footer-Logik bei gleichzeitiger Ermöglichung kontextbezogener Variationen (Portfolio vs. Apps).

## Version 2.0.0
*(Veröffentlicht am 23. Dezember 2025)*

Dies ist ein monumentales Update, das die Struktur des Portfolios völlig neu konzipiert. Wir sind von einer statischen HTML-Architektur zu einer modernen **Single Page Application (SPA)** migriert, die mit React und Vite erstellt wurde. Diese Version konzentriert sich auf **Leistung**, **Internationalisierung**, **KI-Integration** und ein **Dynamisches Material 3 Design**-System.

#### 🌐 Website & Architektur
* **Neu: Komplette Architektur-Neuschreibung:** Die gesamte Website wurde von Grund auf mit **React** neu erstellt, weg von veralteten statischen Komponenten. Dies ermöglicht eine sofortige Seitennavigation und eine modulare Codebasis.
* **Neu: KI-gestützte Übersetzungs-Engine:** Implementierung eines ausgefeilten Node.js-Skripts unter Verwendung der **Gemini API**, um Changelogs automatisch in 5 Sprachen (Portugiesisch, Spanisch, Deutsch, Japanisch, Hindi) zu übersetzen. Es verfügt über inkrementelle Updates und Schutz vor Ratenbegrenzung.
* **Neu: Intelligentes Feedback-System:** Eine dedizierte `/feedback`-Route, die es Benutzern ermöglicht, strukturiertes Feedback (Fehler, Funktionsanfragen) mit Geräteinformationen, intelligenten Tipps und automatischer Entwurfsspeicherung zu senden.
* **Neu: Dynamisches Material 3 Theming:** Implementierung einer robusten Theming-Engine, die die Extraktion von **Dynamic Color** über `@material/material-color-utilities` unterstützt.
* **Neu: Markdown Content Engine:** Eine benutzerdefinierte Engine parst nun rohe Markdown-Dateien, um **Changelogs**, **Roadmaps**, **Datenschutzrichtlinien** und **Hilfebereiche** dynamisch zu rendern.
* **Neu: Globale Internationalisierung (i18n):** Das Portfolio ist jetzt vollständig lokalisiert und unterstützt **6 Sprachen**, automatische Erkennung und persistente Präferenzen.

#### 🎨 UI & Design
* **Neu: Professionelle Dokumentationslayouts:** Die Viewer für `Privacy`, `Help` und `Roadmap` wurden überarbeitet, um ein sauberes, typografieorientiertes Layout zu verwenden (Entfernung von schwerem Glassmorphismus für bessere Lesbarkeit).
* **Neu: Interaktive Roadmap:** Ein komplett neu gestalteter Roadmap-Viewer, der verschachtelte Zeitachsen, Status-Badges (Gestartet, Geplant) und mehrere Markdown-Formate unterstützt.
* **Neu: App-Ökosystem-Hubs:** Dedizierte Unterbereiche für **Pixel Pulse** und **Pixel Compass** mit interaktiven Funktionsrastern, "Plus"-Showcases und Live-Metadaten.
* **Visueller Feinschliff:**
  * **Glassmorphismus:** Strategischer Einsatz von Unschärfeeffekten auf Karten und Navigationsleisten.
  * **Geometrischer Spinner:** Eine neue High-Fidelity-Ladeanimation.
  * **Animierte Navbar:** Eine responsive Navigationsleiste, die sich beim Scrollen intelligent ausblendet.

#### 📱 Mobile & Erfahrung
* **Neu: Android Intent Integration:** Intelligentes Deep-Linking ermöglicht es Benutzern, Links direkt in der installierten Android-App zu öffnen oder auf den Play Store zurückzugreifen.
* **Neu: Offline-Resilienz:** Hinzufügen einer **Offline-Hinweis**-Komponente, die Verbindungsverluste elegant handhabt.
* **Neu: Touch-Optimierungen:** Optimierte Touch-Ziele und entfernte Tap-Highlights für ein natives App-Gefühl in mobilen Browsern.

#### 🛠️ Technik
* **Neu: SEO-Überholung:** Hinzufügen einer umfassenden `sitemap.xml`, `robots.txt` und dynamischer Meta-Tags über einen benutzerdefinierten `usePageMetadata`-Hook.
* **Verbesserung: Leistung:** Integration von **Lenis** für trägheitsbasiertes Scrollen und **Framer Motion** für sanfte `AnimatePresence`-Seitenübergänge.
* **Refactoring:** Migration zu einer modularen Verzeichnisstruktur (Sektionen, Viewer, Layout) und vereinheitlichte Navigationslogik via `handleContactSupport`.

## Version 1.0.0
*(Veröffentlicht am 19. Juli 2025)*

Diese Version markierte das erste große Redesign des Portfolios, etablierte die visuelle Identität von Material 3 und legte den Grundstein für eine modulare Single-Page Application.

#### 🌐 Website
* **Neu: Material 3 Redesign:** Überarbeitung der Dokumentations-Website des Projekts unter Verwendung von Material 3 für eine moderne, saubere und responsive Benutzeroberfläche.
* **Neu: Single-Page Application (SPA):** Ersetzung statischer HTML-Dateien durch eine modulare Architektur mit dynamischem Routing und Laden von Inhalten.
* **Neu: Hauptdokumentations-Lokalisierung:** Die gesamte Website wurde in mehrere Sprachen übersetzt, darunter **Spanisch**, **Portugiesisch**, **Japanisch**, **Französisch**, **Deutsch** und **Hindi**.
* **Neu: Interaktiver Changelog:** Die Versionsverlaufsseite wurde in einem interaktiven Layout im Akkordeon-Stil neu gestaltet.
* **Neu: Inhaltserweiterungen:** Hinzufügen dedizierter Seiten für **Pixel Compass+**, **Wear OS** und Anwenderberichte.
* **Visuelle Identität:** Aktualisierung des Favicons der Website und der Manifest-Symbole, um dem modernen App-Branding zu entsprechen.