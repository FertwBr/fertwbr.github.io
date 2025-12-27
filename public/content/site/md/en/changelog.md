# Version History
Track the evolution of the portfolio. Here you'll find a detailed log of new features, improvements, and fixes for each version.

## Version 2.4.0
*(Released December 24, 2025)*

This update brings the portfolio to life with **Real-Time Data**. We've integrated a serverless backend to fetch live Google Play Store ratings and implemented advanced SEO standards to ensure the apps are properly indexed by search engines.

#### ☁️ Cloud & Infrastructure
* **New: Serverless Rating API:** We deployed a custom **Cloudflare Pages Function** (`/api/rating`) that acts as a secure middleware. It scrapes, caches, and serves Google Play Store ratings for Pixel Compass and Pixel Pulse, protecting our API limits and improving frontend performance.
* **New: Smart Caching:** The rating worker implements caching strategies to ensure instant load times while keeping data fresh.

#### 🎨 UI & Components
* **New: Live Rating Badge:** Introduced a `RatingBadge` component that connects to our new API. It displays the live star rating and review count with a graceful fallback if the network is offline.
* **New: Compact Mode:** Integrated a condensed version of the rating badge directly into the "Scrollytelling" device pills for a cleaner look.

#### 🌐 SEO & Metadata
* **New: Structured Data (JSON-LD):** Injected dynamic `application/ld+json` scripts into the head of the document. This allows search engines to read "Rich Snippets" for the software products, displaying price, OS, and ratings directly in search results.

## Version 2.3.1
*(Released December 24, 2025)*

A focused update on **Security** and **Brand Identity**, ensuring the site is not only fast but also secure and recognizable across all platforms.

#### 🛡️ Security & Polish
* **New: Security Headers:** Added a strict `_headers` configuration file. This enforces **HSTS** (Strict Transport Security), prevents MIME-sniffing, and secures the site against clickjacking attacks.
* **New: Console Branding:** Added a stylized developer signature in the browser console, providing a polished touch for developers inspecting the source code.

#### 🛠️ Metadata Enhancements
* **Improvement: Apple Ecosystem Support:** Updated the favicon system to strictly support `apple-touch-icon`, ensuring the apps looks native when added to an iOS Home Screen.
* **Improvement: Canonical Links:** The `usePageMetadata` hook now automatically generates canonical URLs, preventing "duplicate content" SEO penalties across the portfolio and app domains.

## Version 2.3.0
*(Released December 23, 2025)*

This release introduces the **"Scrollytelling" Apps Portal**, a high-fidelity, interactive landing page for the app ecosystem. It leverages advanced animation techniques to showcase Pixel Pulse and Pixel Compass in a cinematic, narrative-driven format.

#### 🌐 Apps Portal (Scrollytelling)
* **New: Cinematic "Scrollytelling" Experience:** The Apps Home (`apps.fertwbr.com`) has been completely reimagined. It now features a scroll-driven narrative that animates devices, UIs, and text based on user interaction.
* **New: High-Fidelity Device Mocks:** Engineered realistic, CSS-only reproductions of **Pixel Phones** and **Pixel Watches** (with domed glass effects and stainless steel finishes) to display app content without heavy image assets.
* **New: Animated Mock Screens:** Developed simulated, animated UIs for Pixel Pulse (audio visualization) and Pixel Compass (rotating compass dial) that live inside the device frames.
* **New: Interactive Split Choice:** A "Grand Finale" navigation component that splits the screen, allowing users to choose their path (Master Audio vs. Find Path) with expanding hover effects and dynamic focus.

#### 🛠️ Technical & Architecture
* **Refactor: Modular Section Architecture:** Broken down the monolithic home page into specialized, reusable section components (`ScrollDeviceSection`, `WearSection`, `AppsHero`, `AppsHomeExtra`) for better maintainability.
* **New: Spring Physics Animations:** Integrated complex `framer-motion` spring transitions for fluid, natural movement of UI elements.
* **Localization:** Expanded the `apps_home` locale modules across all supported languages (de, es, hi, ja, pt) to support the new narrative content and technical specs.

## Version 2.2.0
*(Released December 23, 2025)*

This update marks the migration to a professional cloud infrastructure, solving routing limitations and establishing a dedicated domain for the app ecosystem.

#### ☁️ Infrastructure & Cloud
* **New: Cloudflare Pages Migration:** The site is now hosted on **Cloudflare Pages**, enabling faster global delivery, better analytics, and advanced routing rules.
* **New: Custom Domains:** Established `fertwbr.com` for the portfolio and `apps.fertwbr.com` for the software products.
* **New: Legacy Link Compatibility:** Implemented a robust redirect chain. Legacy links (e.g., `fertwbr.github.io/PixelCompass`) are now automatically redirected to the new domain, preserving SEO and user bookmarks.
* **New: Case-Insensitive Routing:** Server-side rules now handle legacy capitalization issues, redirecting `/PixelPulse` to `/pixelpulse` automatically.

#### 🛠️ Technical Improvements
* **Fix: Async Anchor Scrolling:** Engineered a `HashScrollHandler` compatible with **Lenis** smooth scroll. It intelligently waits for asynchronous Markdown content to render before scrolling to deep links (e.g., `#privacy`).
* **Refactor: URL Cleanup:** The state management hook now aggressively cleans up query parameters (`?color=...`, `?theme=...`) after applying them, resulting in cleaner, shareable URLs.
* **Security:** Updated `assetlinks.json` to support unified app linking across both new domains.

## Version 2.1.0
*(Released December 23, 2025)*

This release introduces the "Apps Portal" concept and refactors the codebase for better maintainability.

#### 🌐 Apps Portal
* **New: Apps Home:** Created a dedicated landing page for `apps.fertwbr.com` that serves as a central hub for all mobile applications.
* **New: Domain-Aware Routing:** The application now detects the hostname (`apps.` vs `www.`) and serves the appropriate Home component (Apps Portal vs. Portfolio) while sharing the same codebase.

#### 🏗️ Architecture
* **Refactor: SiteConfig:** Centralized all external links, asset URLs, and metadata into a single configuration file (`SiteConfig`). This acts as a "Single Source of Truth," making future updates effortless.
* **Refactor: Footer Architecture:** Unified the footer logic while allowing context-aware variations (Portfolio vs. Apps).

## Version 2.0.0
*(Released December 23, 2025)*

This is a monumental update that completely reimagines the portfolio structure. We have migrated from a static HTML architecture to a modern **Single Page Application (SPA)** built with React and Vite. This release focuses on **Performance**, **Internationalization**, **AI Integration**, and a **Dynamic Material 3 Design** system.

#### 🌐 Website & Architecture
* **New: Complete Architecture Rewrite:** The entire site has been rebuilt from the ground up using **React**, moving away from legacy static components. This allows for instant page navigation and a modular codebase.
* **New: AI-Powered Translation Engine:** Implemented a sophisticated Node.js script using the **Gemini API** to automatically translate changelogs into 5 languages (Portuguese, Spanish, German, Japanese, Hindi). It features incremental updates and rate-limiting protection.
* **New: Smart Feedback System:** A dedicated `/feedback` route that allows users to send structured feedback (bugs, feature requests) with device info, smart guidance tips, and draft auto-saving.
* **New: Dynamic Material 3 Theming:** Implemented a robust theming engine that supports **Dynamic Color** extraction via `@material/material-color-utilities`.
* **New: Markdown Content Engine:** A custom-built engine now parses raw Markdown files to render **Changelogs**, **Roadmaps**, **Privacy Policies**, and **Help Sections** dynamically.
* **New: Global Internationalization (i18n):** The portfolio is now fully localized with support for **6 Languages**, auto-detection, and persistent preferences.

#### 🎨 UI & Design
* **New: Professional Documentation Layouts:** Refactored `Privacy`, `Help`, and `Roadmap` viewers to use a clean, typography-focused layout (removing heavy glassmorphism for better readability).
* **New: Interactive Roadmap:** A completely redesigned Roadmap Viewer that supports nested timelines, status badges (Launched, Planned), and multiple markdown formats.
* **New: App Ecosystem Hubs:** Dedicated sub-sections for **Pixel Pulse** and **Pixel Compass** featuring interactive feature grids, "Plus" showcases, and live metadata.
* **Visual Polish:**
  * **Glassmorphism:** Strategic use of blur effects on cards and navbars.
  * **Geometric Spinner:** A new high-fidelity loading animation.
  * **Animated Navbar:** A responsive navigation bar that intelligently hides on scroll.

#### 📱 Mobile & Experience
* **New: Android Intent Integration:** Smart deep-linking allows users to open links directly in the installed Android app or fallback to the Play Store.
* **New: Offline Resilience:** Added an **Offline Notice** component that gracefully handles connectivity loss.
* **New: Touch Optimizations:** Optimized touch targets and removed tap highlights for a native-app feel on mobile browsers.

#### 🛠️ Technical
* **New: SEO Overhaul:** Added comprehensive `sitemap.xml`, `robots.txt`, and dynamic meta tags via a custom `usePageMetadata` hook.
* **Improvement: Performance:** Integrated **Lenis** for inertial scrolling and **Framer Motion** for smooth `AnimatePresence` page transitions.
* **Refactor:** Migrated to a modular directory structure (sections, viewers, layout) and unified navigation logic via `handleContactSupport`.


## Version 1.0.0
*(Released July 19, 2025)*

This version marked the initial major redesign of the portfolio, establishing the Material 3 visual identity and laying the groundwork for a modular Single-Page Application.

#### 🌐 Website
* **New: Material 3 Redesign:** Overhauled the project's documentation website using Material 3 for a modern, clean, and responsive user interface.
* **New: Single-Page Application (SPA):** Replaced static HTML files with a modular architecture featuring dynamic routing and content loading.
* **New: Major Documentation Localization:** The entire site was translated into multiple languages, including **Spanish**, **Portuguese**, **Japanese**, **French**, **German**, and **Hindi**.
* **New: Interactive Changelog:** The version history page was redesigned into an interactive, accordion-style layout.
* **New: Content Expansions:** Added dedicated pages for **Pixel Compass+**, **Wear OS**, and User Testimonials.
* **Visual Identity:** Updated the website's favicon and manifest icons to match the modern app branding.