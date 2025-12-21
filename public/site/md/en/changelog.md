# Version History
Track the evolution of the portfolio. Here you'll find a detailed log of new features, improvements, and fixes for each version.

## Version 2.0.0
*(Released December 21, 2025)*

This is a monumental update that completely reimagines the portfolio structure. We have migrated from a static HTML architecture to a modern **Single Page Application (SPA)** built with React and Vite. This release focuses on **Performance**, **Internationalization**, and a **Dynamic Material 3 Design** system that unifies the experience across all devices.

#### 🌐 Website
* **New: Complete Architecture Rewrite:** The entire site has been rebuilt from the ground up using **React**, moving away from the legacy static components. This allows for instant page navigation and a modular codebase.
* **New: Dynamic Material 3 Theming:** Implemented a robust theming engine that supports **Dynamic Color** extraction. The site now automatically generates color schemes (Surface, Primary, Secondary containers) based on the active project context or user selection.
* **New: Smooth Scrolling & Transitions:** Integrated **Lenis** for buttery-smooth scroll behavior and **Framer Motion** for seamless page-to-page transitions and entrance animations.
* **New: Markdown Content Engine:** A custom-built engine now parses raw Markdown files to render **Changelogs**, **Roadmaps**, **Privacy Policies**, and **Help Sections** dynamically. This keeps documentation synchronized with the code.
* **New: Global Internationalization (i18n):** The portfolio is now fully localized.
    * **6 Supported Languages:** English, Portuguese, Spanish, German, Hindi, and Japanese.
    * **Auto-Detection:** The site automatically detects the user's browser language and preference.
    * **Persistent Selection:** Your language choice is saved and remembered across visits.
* **New: Smart Navigation:**
    * **Responsive Navbar:** A new glassmorphic navigation bar that intelligently hides on scroll and transforms into a bottom sheet/menu on mobile devices.
    * **Context-Aware Back Button:** The navigation logic now understands deep linking, offering a "Close" action on home and "Back" on sub-pages.
* **New: App Ecosystem Hubs:** Dedicated, immersive sub-sections for **Pixel Pulse** and **Pixel Compass**. These pages feature:
    * **Interactive Feature Grids:** Highlighting key app capabilities.
    * **"Plus" Showcases:** Special viewers for premium features with comparison tables.
    * **Live Metadata:** Dynamic fetching of the latest version numbers and changelogs.

#### 📱 Mobile & Experience
* **New: Android Intent Integration:** Implemented smart deep-linking. If the user has the app installed, links will try to open the native Android app; otherwise, they gracefully fallback to the Play Store.
* **New: Offline Resilience:** Added an **Offline Notice** component that gracefully handles connectivity loss, informing the user while keeping the UI accessible.
* **New: Touch Optimizations:** Removed tap highlights and optimized touch targets for a native-app feel on mobile browsers.
* **Visual Polish:**
    * **Glassmorphism:** Extensive use of blur effects on cards, navbars, and sidebars for a modern aesthetic.
    * **Loading States:** Custom animated spinners and skeleton loaders for smoother perceived performance during data fetching.
    * **404 Experience:** A completely redesigned "Not Found" page that offers smart suggestions based on the broken link.

#### 🛠️ Technical
* **New: SEO Overhaul:** Added comprehensive `sitemap.xml`, `robots.txt`, and dynamic meta tags (title, description, theme-color) that update based on the current route and content.
* **Improvement: Project Structure:** Refactored into a clean, modular directory structure (components, hooks, contexts, utils) for better maintainability.
* **Fix:** Resolved layout shifts by implementing `100dvh` (Dynamic Viewport Height) to handle mobile browser toolbars correctly.


## Version 1.0.0
*(Released July 19, 2025)*

This version marked the initial major redesign of the portfolio, establishing the Material 3 visual identity and laying the groundwork for a modular Single-Page Application.

#### 🌐 Website
* **New: Material 3 Redesign:** Overhauled the project's documentation website using Material 3 for a modern, clean, and responsive user interface.
* **New: Single-Page Application (SPA):** Replaced static HTML files with a modular architecture featuring dynamic routing and content loading.
* **New: Major Documentation Localization:** The entire site was translated into multiple languages, including **Spanish**, **Portuguese**, **Japanese**, **French**, **German**, and **Hindi**.
* **New: Language Picker:** Added a dedicated UI to allow users to easily switch between supported languages, powered by a robust i18n engine that dynamically loads strings and markdown content.
* **New: Interactive Changelog:** The version history page was redesigned into an interactive, accordion-style layout with platform-specific filtering and expressive animations.
* **New: Content Expansions:**
    * **Pixel Compass+ Page:** Added a new dedicated page with a feature grid.
    * **Wear OS Section:** Updated the homepage to highlight wearable features.
    * **Testimonials:** Added a section to showcase user feedback.
* **Improvement: Dynamic UI Elements:** The "Latest Update" panel was updated to dynamically fetch the most recent changelog, and a roadmap summary was added to the index page.
* **Improvement: Mobile Experience:** Added a custom 404 page, improved mobile navigation transitions, and implemented a fully dynamic navigation bar and footer.
* **Visual Identity:** Updated the website's favicon and manifest icons to match the modern app branding.