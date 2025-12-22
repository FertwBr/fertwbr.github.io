# Fernando Vaz | Software Engineer

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=googlebard&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)
![Material Design 3](https://img.shields.io/badge/Material%20Design%203-7555fa?style=for-the-badge&logo=materialdesign&logoColor=white)

This repository contains the source code for my professional portfolio and the official landing pages for my mobile application suite. It is designed to showcase my technical proficiency in front-end architecture, UI/UX implementation, full-stack automation, and modern web performance.

**🌐 Live at:** [fertwbr.github.io](https://fertwbr.github.io)

## 🎯 Purpose

This project is a personal showcase of my programming standards, architectural decisions, and design philosophy. It demonstrates:
* **Advanced UI Engineering:** Implementation of Material Design 3 and dynamic tonal palettes.
* **Complex State Management:** Orchestrating multi-language support, theme synchronization, and markdown content parsing.
* **Performance & Motion:** High-performance animations and smooth-scrolling experiences.
* **Tooling & Automation:** Creating custom scripts to automate localization workflows using AI.

## 🚀 Technical Highlights

### 🤖 AI-Driven Localization Pipeline
To maintain documentation across **6 languages** without manual overhead, I engineered a custom build-time solution:
* **Incremental Translation:** A Node.js script scans English changelogs and compares them against target languages using AST-like parsing.
* **Gemini API Integration:** Utilizes the **Google Gemini 3 Flash** model to translate *only* missing version blocks, preserving Markdown structure and technical terminology.
* **Smart Rate Limiting:** Implements a "save-as-you-go" strategy with delays to respect API quotas while ensuring data persistence.

### 💬 Intelligent Feedback System
A fully custom feedback engine built from scratch (`/feedback`), designed to reduce friction and improve report quality:
* **Context-Aware Routing:** The system detects the source app (Pixel Pulse vs. Compass) and pre-fills platform context.
* **Draft Persistence:** Uses `localStorage` to auto-save user input, preventing data loss during navigation or browser refreshes.
* **Smart Guidance:** A regex-based utility (`FeedbackUtils`) analyzes user input in real-time to offer tips (e.g., detecting a crash report and suggesting to include error codes).

### 🎨 Dynamic Material Theming
* **Real-time Generation:** Uses `@material/material-color-utilities` to generate accessible color schemes from a seed color.
* **Global Persistence:** Theme preferences are saved globally and restored on reload.
* **URL Control:** Supports query parameters (e.g., `?color=...`) to dynamically override the theme seed for sharing.
* **Surface Logic:** Advanced calculation for surface colors and elevation overlays.

### 🌍 Advanced Internationalization (i18n)
* **Multi-Language:** Full support for **English, Portuguese, Spanish, German, Hindi, and Japanese**.
* **Auto-Detection:** Smart detection of browser language with a persistent "Auto" mode option.
* **Locale Management:** Scalable dictionary system with separate locale files and deep-merge fallback logic.

### ⚡ UX & Performance
* **Lenis Scroll:** Integration of `lenis` for smooth inertial scrolling.
* **Resilience:** Custom `ErrorBoundary` for graceful failures and `OfflineNotice` for network state feedback.
* **Page Transitions:** Orchestrated exit/enter animations using `Framer Motion` and a reusable `PageTransition` component.
* **Smart Navigation:** Responsive `AppNavbar` with glassmorphism, hide-on-scroll behavior, and context-aware back buttons.

### 📝 Markdown Content Engine
The site features a custom-built engine to parse and render Markdown documentation directly:
* **Custom Parsers:** Utilities to extract structured data (sections, dates, tags, roadmap phases) from raw Markdown files.
* **Dedicated Viewers:** Specialized components:
    * `ChangelogViewer`: Interactive version history with filtering and AI translation badges.
    * `RoadmapViewer`: Flexible timeline visualization supporting nested and flat data structures.
    * `Privacy/HelpViewer`: Clean, typography-focused layouts for readability.

## 📱 Integrated App Ecosystem

The site hosts dedicated environments for my Android projects, featuring **Deep Linking** and **Google Play** integration:

* **Pixel Pulse:** High-fidelity audio analysis and hearing health tools. Includes interactive comparison tables and roadmap viewers.
* **Pixel Compass:** Premium navigation suite utilizing advanced sensor fusion.
* **Smart Redirects:** Implemented logic (`RedirectToStore`) that attempts to open the installed Android app via Intent URL scheme and gracefully falls back to the Play Store if not installed.

## 🛠️ Tech Stack

* **Front-end:** React 18 (Vite)
* **Languages:** JavaScript (ES6+), Node.js (Automation Scripts)
* **AI Integration:** Google Gemini API (`@google/generative-ai`)
* **Design System:** Material Design 3 (M3)
* **Animation:** Framer Motion
* **Scrolling:** Lenis
* **Routing:** React Router DOM v6
* **Data Parsing:** Remark / Rehype / Gray-matter
* **Localization:** Custom Context-based i18n with Fallback
* **CI/CD:** GitHub Pages

## 📄 License & Intellectual Property

Copyright © 2025 **Fernando Vaz Bela (fertwbr)**.

The source code and design assets in this repository are **not** intended for redistribution, cloning, or commercial use. This project exists solely as a demonstration of professional skills. Please refer to the [LICENSE](LICENSE) file for more details.

---

<p align="center">
  Developed with precision by <b>Fernando Vaz</b>
</p>