# Fernando Vaz | Software Engineer

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=googlebard&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)
![Material Design 3](https://img.shields.io/badge/Material%20Design%203-7555fa?style=for-the-badge&logo=materialdesign&logoColor=white)

This repository contains the source code for my professional portfolio and the official landing pages for my mobile application suite. It is designed to showcase my technical proficiency in front-end architecture, UI/UX implementation, full-stack automation, and modern web performance.

**🌐 Live at:** [fertwbr.com](https://fertwbr.com)

## 🎯 Purpose

This project is a personal showcase of my programming standards, architectural decisions, and design philosophy. It demonstrates:
* **Advanced UI Engineering:** Implementation of Material Design 3 and dynamic tonal palettes.
* **Complex State Management:** Orchestrating multi-language support, theme synchronization, and markdown content parsing.
* **Performance & Motion:** High-performance animations and smooth-scrolling experiences.
* **Tooling & Automation:** Creating custom scripts to automate localization workflows using AI.

## 🚀 Technical Highlights

### ☁️ Cloudflare Pages Migration & Hybrid Routing
The site has moved from standard GitHub Pages to a **Cloudflare Pages** infrastructure to support advanced routing requirements:
* **Domain Strategy:** Separation of concerns using `fertwbr.com` for the portfolio and `apps.fertwbr.com` for the application ecosystem.
* **Legacy Compatibility:** A hybrid redirect chain ensures old `fertwbr.github.io` links (including case-sensitive paths like `/PixelCompass`) are seamlessly redirected to the new canonical domains via server-side rules.
* **SPA Routing:** Full support for client-side routing with proper fallback handling for deep links.

### 🤖 AI-Driven Localization Pipeline
To maintain documentation across **6 languages** without manual overhead, I engineered a custom build-time solution:
* **Incremental Translation:** A Node.js script scans English changelogs and compares them against target languages using AST-like parsing.
* **Gemini API Integration:** Utilizes the **Google Gemini 3 Flash** model to translate *only* missing version blocks, preserving Markdown structure and technical terminology.
* **Smart Rate Limiting:** Implements a "save-as-you-go" strategy with delays to respect API quotas while ensuring data persistence.

### 💬 Serverless Feedback & Support API
A fully custom, serverless feedback engine built from scratch (`/feedback`), designed to reduce friction and improve report quality:
* **Cloudflare Functions & Resend:** Deployed a secure Cloudflare Pages Function that handles POST requests and interfaces with the **Resend API** to dispatch support tickets and localized auto-replies.
* **Interactive Support Wizard:** A 4-step interactive flow that guides users through categorizing issues and securely attaching screenshots via Base64 encoding.
* **Context-Aware & Drafts:** Detects the source app (Pixel Pulse vs. Compass), pre-fills context, and uses `localStorage` to auto-save user input, preventing data loss.
* **Dynamic Email Theming:** Automated support emails feature responsive Light and Dark mode theming (`color-scheme`) to adapt to the user's email client.

### 🎨 Dynamic Material Theming
* **Real-time Generation:** Uses `@material/material-color-utilities` to generate accessible color schemes from a seed color.
* **Global Persistence:** Theme preferences are saved globally and restored on reload.
* **URL Control:** Supports query parameters (e.g., `?color=...`) to dynamically override the theme seed for sharing.
* **Surface Logic:** Advanced calculation for surface colors and elevation overlays.

### 🌍 Advanced Internationalization (i18n)
* **Multi-Language:** Full support for **English, Portuguese, Spanish, German, Hindi, and Japanese**.
* **Smart Language Detection:** Intelligent Timezone parsing to display geographically correct flags (via FlagCDN) and persistent "Auto" mode.
* **Locale Management:** Scalable dictionary system with separate locale files, deep-merge fallback logic, and fully translated Material theme names.

### ⚡ UX & Performance
* **Lenis Scroll:** Integration of `lenis` for smooth inertial scrolling.
* **Cinematic Scrollytelling:** High-fidelity CSS-only device mocks (Pixel Phones & Watches) with scroll-driven animations and dynamic UI simulations inside the frames.
* **Resilience:** Custom `ErrorBoundary` for graceful failures and `OfflineNotice` for network state feedback.
* **Page Transitions:** Orchestrated exit/enter animations using `Framer Motion` and a reusable `PageTransition` component.

### 📝 Markdown Content Engine
The site features a custom-built engine to parse and render Markdown documentation directly:
* **Full-Screen Routing:** Support for direct links to specific app updates (e.g., `.../changelog/:versionId`) rendering clean, full-screen article layouts.
* **Platform Tags:** Automatically extracts and renders platform-specific badges (📱 Phone, ⌚ Wear OS) based on markdown section headers.
* **Async Scroll Handling:** A custom `HashScrollHandler` ensures deep links work correctly even with asynchronous content loading.

## 📱 Integrated App Ecosystem

The site hosts dedicated environments for my Android projects, featuring **Deep Linking** and **Google Play** integration:

* **Pixel Pulse:** High-fidelity audio analysis and hearing health tools.
* **Pixel Compass:** Premium navigation suite utilizing advanced sensor fusion.
* **Smart Redirects:** Implemented logic (`RedirectToStore`) that attempts to open the installed Android app via Intent URL scheme and gracefully falls back to the Play Store.

## 🛠️ Tech Stack

* **Front-end:** React 18 (Vite)
* **Hosting:** Cloudflare Pages (Functions/Middleware)
* **Languages:** JavaScript (ES6+), Node.js (Automation Scripts)
* **APIs:** Google Gemini API (`@google/generative-ai`), Resend API
* **Design System:** Material Design 3 (M3)
* **Animation:** Framer Motion
* **Scrolling:** Lenis
* **Routing:** React Router DOM v6
* **Data Parsing:** Remark / Rehype / Gray-matter

## 📄 License & Intellectual Property

Copyright © 2026 **Fernando Vaz Bela (fertwbr)**.

The source code and design assets in this repository are **not** intended for redistribution, cloning, or commercial use. This project exists solely as a demonstration of professional skills. Please refer to the [LICENSE](LICENSE) file for more details.

---

<p align="center">
  Developed with precision by <b>Fernando Vaz</b>
</p>
