

# Version History

## Version 2.3.0
*(Veröffentlicht am 23. Dezember 2025)*

Dieses Release führt das **"Scrollytelling" Apps Portal** ein – eine interaktive High-Fidelity-Landingpage für das App-Ökosystem. Es nutzt fortschrittliche Animationstechniken, um Pixel Pulse und Pixel Compass in einem filmischen, narrativen Format zu präsentieren.

#### 🌐 Apps Portal (Scrollytelling)
* **Neu: Filmisches „Scrollytelling“-Erlebnis:** Die Apps Home (`apps.fertwbr.com`) wurde komplett neu konzipiert. Sie bietet nun eine scroll-gesteuerte Erzählweise, die Geräte, UIs und Texte basierend auf der Benutzerinteraktion animiert.
* **Neu: High-Fidelity Device Mocks:** Es wurden realistische, reine CSS-Reproduktionen von **Pixel Phones** und **Pixel Watches** entwickelt (mit Effekten für gewölbtes Glas und Edelstahl-Finishes), um App-Inhalte ohne ressourcenintensive Bild-Assets darzustellen.
* **Neu: Animierte Mock-Screens:** Entwicklung simulierter, animierter UIs für Pixel Pulse (Audiovisualisierung) und Pixel Compass (rotierendes Kompass-Zifferblatt), die direkt in den Geräterahmen eingebettet sind.
* **Neu: Interaktive Split Choice:** Eine „Grand Finale“-Navigationskomponente, die den Bildschirm teilt und es Benutzern ermöglicht, ihren Pfad zu wählen (Master Audio vs. Find Path), ergänzt durch expandierende Hover-Effekte und dynamischen Fokus.

#### 🛠️ Technical & Architecture
* **Refactor: Modulare Sektionsarchitektur:** Die monolithische Homepage wurde in spezialisierte, wiederverwendbare Sektionskomponenten unterteilt (`ScrollDeviceSection`, `WearSection`, `AppsHero`, `AppsHomeExtra`), um eine bessere Wartbarkeit zu gewährleisten.
* **Neu: Spring Physics Animationen:** Integration komplexer `framer-motion` Feder-Übergänge (Spring Transitions) für flüssige, natürliche Bewegungen der UI-Elemente.
* **Lokalisierung:** Die `apps_home` Lokalisierungsmodule wurden für alle unterstützten Sprachen (de, es, hi, ja, pt) erweitert, um die neuen narrativen Inhalte und technischen Spezifikationen zu unterstützen.
## Version 2.2.0
*(Veröffentlicht am 23. Dezember 2025)*

Dieses Update markiert die Migration zu einer professionellen Cloud-Infrastruktur, behebt Routing-Einschränkungen und etabliert eine dedizierte Domain für das App-Ökosystem.

#### ☁️ Infrastruktur & Cloud
* **Neu: Cloudflare Pages Migration:** Die Website wird nun auf **Cloudflare Pages** gehostet, was eine schnellere globale Bereitstellung, verbesserte Analysen und erweiterte Routing-Regeln ermöglicht.
* **Neu: Eigene Domains:** Einführung von `fertwbr.com` für das Portfolio und `apps.fertwbr.com` für die Softwareprodukte.
* **Neu: Kompatibilität für Legacy-Links:** Implementierung einer robusten Weiterleitungskette. Legacy-Links (z. B. `fertwbr.github.io/PixelCompass`) werden nun automatisch auf die neue Domain umgeleitet, wodurch SEO und Benutzer-Lesezeichen erhalten bleiben.
* **Neu: Case-Insensitive Routing:** Serverseitige Regeln behandeln nun Probleme mit der ursprünglichen Groß-/Kleinschreibung und leiten `/PixelPulse` automatisch auf `/pixelpulse` weiter.

#### 🛠️ Technische Verbesserungen
* **Fix: Asynchrones Anchor-Scrolling:** Entwicklung eines `HashScrollHandler`, der mit **Lenis** Smooth-Scroll kompatibel ist. Er wartet intelligent auf das Rendern asynchroner Markdown-Inhalte, bevor zu Deep-Links (z. B. `#privacy`) gescrollt wird.
* **Refactor: URL-Bereinigung:** Der State-Management-Hook bereinigt nun Query-Parameter (`?color=...`, `?theme=...`) nach deren Anwendung konsequent, was zu saubereren, teilbaren URLs führt.
* **Sicherheit:** `assetlinks.json` wurde aktualisiert, um ein einheitliches App-Linking über beide neuen Domains hinweg zu unterstützen.

## Version 2.1.0
*(Veröffentlicht am 23. Dezember 2025)*

Dieses Release führt das Konzept des „Apps Portal“ ein und refakturiert die Codebasis für eine bessere Wartbarkeit.

#### 🌐 Apps Portal
* **Neu: Apps Home:** Eine dedizierte Landingpage für `apps.fertwbr.com` wurde erstellt, die als zentraler Hub für alle mobilen Anwendungen dient.
* **Neu: Domain-Aware Routing:** Die Anwendung erkennt nun den Hostnamen (`apps.` vs. `www.`) und stellt die entsprechende Home-Komponente bereit (Apps Portal vs. Portfolio), während dieselbe Codebasis genutzt wird.

#### 🏗️ Architektur
* **Refactoring: SiteConfig:** Alle externen Links, Asset-URLs und Metadaten wurden in einer einzigen Konfigurationsdatei (`SiteConfig`) zentralisiert. Diese fungiert als „Single Source of Truth“ und macht zukünftige Aktualisierungen mühelos.
* **Refactoring: Footer-Architektur:** Die Footer-Logik wurde vereinheitlicht, während gleichzeitig kontextabhängige Variationen (Portfolio vs. Apps) ermöglicht werden.

## Version 2.0.0
*(Veröffentlicht am 23. Dezember 2025)*

Dies ist ein monumentales Update, das die Portfoliostruktur völlig neu konzipiert. Wir sind von einer statischen HTML-Architektur zu einer modernen **Single Page Application (SPA)** gewechselt, die mit React und Vite erstellt wurde. Diese Veröffentlichung konzentriert sich auf **Performance**, **Internationalisierung**, **KI-Integration** und ein dynamisches **Material 3** Design-System.

#### 🌐 Website & Architektur
* **Neu: Vollständige Überarbeitung der Architektur:** Die gesamte Website wurde von Grund auf mit **React** neu aufgebaut, wobei veraltete statische Komponenten ersetzt wurden. Dies ermöglicht eine sofortige Seitennavigation und eine modulare Codebasis.
* **Neu: KI-gestützte Übersetzungs-Engine:** Implementierung eines hochentwickelten Node.js-Skripts unter Verwendung der **Gemini API**, um Changelogs automatisch in 5 Sprachen zu übersetzen (Portugiesisch, Spanisch, Deutsch, Japanisch, Hindi). Es bietet inkrementelle Updates und Schutz durch Rate-Limiting.
* **Neu: Intelligentes Feedback-System:** Eine dedizierte `/feedback`-Route, die es Nutzern ermöglicht, strukturiertes Feedback (Bugs, Feature-Anfragen) mit Geräteinformationen, intelligenten Hilfestellungen und automatischer Entwurfsspeicherung zu senden.
* **Neu: Dynamisches Material 3 Theming:** Implementierung einer robusten Theming-Engine, die die Extraktion von **Dynamic Color** via `@material/material-color-utilities` unterstützt.
* **Neu: Markdown Content Engine:** Eine eigens entwickelte Engine parst nun rohe Markdown-Dateien, um **Changelogs**, **Roadmaps**, Datenschutzrichtlinien und Hilfebereiche dynamisch zu rendern.
* **Neu: Globale Internationalisierung (i18n):** Das Portfolio ist nun vollständig lokalisiert und bietet Unterstützung für **6 Sprachen**, automatische Erkennung und dauerhafte Präferenzen.

#### 🎨 UI & Design
* **Neu: Professionelle Dokumentations-Layouts:** Refactoring der Viewer für Datenschutz, Hilfe und **Roadmap**, um ein sauberes, auf Typografie ausgerichtetes Layout zu verwenden (Reduzierung von starkem Glassmorphism für bessere Lesbarkeit).
* **Neu: Interaktive Roadmap:** Ein komplett neu gestalteter Roadmap-Viewer, der verschachtelte Zeitpläne, Status-Badges (Veröffentlicht, Geplant) und mehrere Markdown-Formate unterstützt.
* **Neu: App-Ecosystem Hubs:** Dedizierte Untersektionen für **Pixel Pulse** und **Pixel Compass** mit interaktiven Feature-Grids, „Plus“-Präsentationen und Live-Metadaten.
* **Visueller Feinschliff:**
  * **Glassmorphism:** Strategischer Einsatz von Unschärfe-Effekten auf Karten und Navigationsleisten.
  * **Geometrischer Spinner:** Eine neue, hochauflösende Ladeanimation.
  * **Animierte Navigationsleiste:** Eine responsive Navigationsleiste, die beim Scrollen intelligent ausgeblendet wird.

#### 📱 Mobile & Experience
* **Neu: Android Intent Integration:** Intelligentes Deep-Linking ermöglicht es Nutzern, Links direkt in der installierten **Android**-App zu öffnen oder alternativ auf den **Google Play** Store zurückzugreifen.
* **Neu: Offline-Resilienz:** Integration einer Komponente für Offline-Hinweise, die Verbindungsverluste benutzerfreundlich handhabt.
* **Neu: Touch-Optimierungen:** Optimierte Touch-Ziele und Entfernung von Tap-Highlights für ein natives App-Gefühl in mobilen Browsern.

#### 🛠️ Technical
* **Neu: SEO-Überholung:** Ergänzung umfassender `sitemap.xml` und `robots.txt` sowie dynamischer Meta-Tags über einen benutzerdefinierten `usePageMetadata`-Hook.
* **Verbesserung: Performance:** Integration von **Lenis** für inertiales Scrollen und **Framer Motion** für flüssige `AnimatePresence`-Seitenübergänge.
* **Refactor:** Migration zu einer modularen Verzeichnisstruktur (Sections, Viewers, Layout) und Vereinheitlichung der Navigationslogik via `handleContactSupport`.

## Version 1.0.0
*(Veröffentlicht am 19. Juli 2025)*

Diese Version markierte die erste umfassende Neugestaltung des Portfolios, etablierte die visuelle **Material 3**-Identität und legte den Grundstein für eine modulare **Single-Page Application**.

#### 🌐 Website
* **Neu: Material 3 Redesign:** Überarbeitung der Dokumentations-Website des Projekts unter Verwendung von **Material 3** für eine moderne, klare und responsive Benutzeroberfläche.
* **Neu: Single-Page Application (SPA):** Ersetzung statischer HTML-Dateien durch eine modulare Architektur mit dynamischem Routing und Laden von Inhalten.
* **Neu: Umfassende Lokalisierung der Dokumentation:** Die gesamte Website wurde in mehrere Sprachen übersetzt, darunter **Spanisch**, **Portugiesisch**, **Japanisch**, **Französisch**, **Deutsch** und **Hindi**.
* **Neu: Interaktives Changelog:** Die Seite mit der Versionshistorie wurde in ein interaktives Layout im Accordion-Stil umgestaltet.
* **Neu: Inhaltliche Erweiterungen:** Hinzufügen spezieller Seiten für **Pixel Compass+**, Wear OS und Nutzerberichte.
* **Visuelle Identität:** Aktualisierung des Favicons und der Manifest-Icons der Website zur Anpassung an das moderne Branding der App.
