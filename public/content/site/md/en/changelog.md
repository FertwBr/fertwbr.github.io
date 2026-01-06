# Version History
Track the evolution of the portfolio. Here you'll find a detailed log of new features, improvements, and fixes for each version.

## Version 2.7.0
*(Released January 6, 2026)*

This update focuses on **Trust, Safety, and Compliance**. We have introduced a robust legal infrastructure with a dedicated Terms of Use viewer, expanded Privacy Policies across all languages, and added comprehensive documentation for data safety and backups.

#### ⚖️ Legal & Compliance
* **New: Terms of Use Viewer:** Implemented a specialized `TermsViewer` component that renders the Terms of Service with a dynamic table of contents and support contact integration.
* **New: Legal Localization:** Added and updated `TERMS.md` and `PRIVACY_POLICY.md` files for Pixel Compass and Pixel Pulse in 6 languages (German, English, Spanish, Hindi, Japanese, Portuguese).
* **Update: Privacy Policy:** Revised policies to clarify data processing, permission usage, and added specific medical disclaimers for the Pulse app.
* **New: Configuration:** Updated `PixelCompassConfig` and `PixelPulseConfig` to support the new 'Terms' section, allowing seamless navigation between Privacy, Help, and Terms.

#### 📘 Documentation & Support
* **New: Manual Backup Guide:** Added a detailed "Manual Backup and Restore" section to the FAQ. It covers the `.ppbk` file format, smart restore strategies, and encryption standards to help users securely archive their data.
* **Improvement:** Enhanced the `termsParser` utility to extract metadata and sections from Markdown files more accurately.

## Version 2.6.0
*(Released January 6, 2026)*

This release introduces the **Store Conversion Kit**, designed to bridge the gap between the web portal and the Google Play Store. It features high-fidelity Call-to-Action components and enhanced footer interactions.

#### 🛍️ Store Integration
* **New: HomeStoreFooter Component:** Introduced a branded footer specifically for app home pages. It features a "Get it on Google Play" badge, localized taglines, and device compatibility notes.
* **Localization:** Added `store_footer` translation keys across all supported languages to ensure the download prompts are native to the user's region.
* **Integration:** Seamlessly integrated the new footer into `PixelCompassHome` and `PixelPulseHome`.

#### 🎨 UI & Animation
* **New: Interactive Footer Links:** Wrapped app footer navigation and social links with `framer-motion` to provide tactile feedback (hover and tap animations) for a more engaging user experience.

## Version 2.5.0
*(Released January 4, 2026)*

A documentation-focused update that bridges the gap between the phone and the wrist, detailing the **Wear OS Ecosystem**.

#### ⌚ Wear OS Ecosystem
* **New: Companion App Documentation:** Significantly expanded the FAQ to include a dedicated guide for the **Pixel Pulse Wear OS** app.
* **Detailed Guides:** Added sections on Navigation Basics, Main Meter usage, History viewing, and customizing settings directly from the watch.
* **Sync & Privacy:** Clarified how session synchronization works between the Phone and Watch, including privacy details regarding local data transfer.

#### 🛠️ Technical
* **Improvement: Help Parser:** Refined the `helpParser` logic. It now intelligently handles section titles (removing leading hashes) and ensures subheadings are processed with correct line breaks for better readability.

## Version 2.4.4
*(Released January 1, 2026)*

* **Documentation:** Updated the internal changelogs to reflect the massive progress on **Pixel Pulse v1.18.0** (Beta 2 through Alpha 01), documenting features like Deep Linking, Plus Status Sync, and the new Wear OS core.

## Version 2.4.3
*(Released December 31, 2025)*

* **Maintenance:** Routine documentation updates and version bumping.

## Version 2.4.2
*(Released December 31, 2025)*

* **Documentation:** Updated changelogs to cover **Pixel Compass v1.15.0 (Beta 5-7)**, highlighting the new Mechanical Haptics, Widget Rotation modes, and Advanced Calibration UI.

## Version 2.4.1
*(Released December 26, 2025)*

A polish update focused on the fluidity of the user interface and navigation transitions.

#### 🎨 Visual Polish
* **Fix: Smoother Transitions:** Refined `AppNavbar` and `PageTransition` animations. Switched from vertical to horizontal slide effects for page navigation to create a more natural "native app" feel.
* **Fix: Animation Logic:** Simplified animation props and improved timing functions to eliminate layout shifts during navigation.
* **Documentation:** Synchronized the site's changelog with recent app releases across German and Japanese locales, ensuring consistency in version history.

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