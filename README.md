# Fernando Vaz | Software Engineer

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)
![Material Design 3](https://img.shields.io/badge/Material%20Design%203-7555fa?style=for-the-badge&logo=materialdesign&logoColor=white)

This repository contains the source code for my professional portfolio and the official landing pages for my mobile application suite. It is designed to showcase my technical proficiency in front-end architecture, UI/UX implementation, and modern web performance.

**🌐 Live at:** [fertwbr.github.io](https://fertwbr.github.io)

## 🎯 Purpose

This project is a personal showcase of my programming standards, architectural decisions, and design philosophy. It demonstrates:
* **Advanced UI Engineering:** Implementation of Material Design 3 and dynamic tonal palettes.
* **Complex State Management:** Orchestrating multi-language support, theme synchronization, and markdown content parsing.
* **Performance & Motion:** High-performance animations and smooth-scrolling experiences.

## 🚀 Technical Highlights

### 🎨 Dynamic Material Theming
* **Real-time Generation:** Uses `@material/material-color-utilities` to generate accessible color schemes from a seed color.
* **Global Persistence:** Theme preferences are saved globally and restored on reload.
* **URL Control:** Supports query parameters (e.g., `?color=...`) to dynamically override the theme seed for sharing.
* **Surface Logic:** Advanced calculation for surface colors and elevation overlays.

### 🌍 Advanced Internationalization (i18n)
* **Multi-Language:** Full support for **English, Portuguese, Spanish, German, Hindi, and Japanese**.
* **Auto-Detection:** Smart detection of browser language with a persistent "Auto" mode option.
* **Locale Management:** Scalable dictionary system with separate locale files.

### ⚡ UX & Performance
* **Lenis Scroll:** Integration of `lenis` for smooth inertial scrolling.
* **Resilience:** Custom `ErrorBoundary` for graceful failures and `OfflineNotice` for network state feedback.
* **Page Transitions:** Orchestrated exit/enter animations using `Framer Motion` and a reusable `PageTransition` component.
* **Smart Navigation:** Responsive `AppNavbar` with glassmorphism, hide-on-scroll behavior, and context-aware back buttons.

### 📝 Markdown Content Engine
The site features a custom-built engine to parse and render Markdown documentation directly:
* **Custom Parsers:** Utilities to extract structured data (sections, dates, tags) from raw Markdown files.
* **Dedicated Viewers:** Specialized components (`ChangelogViewer`, `RoadmapViewer`, `PrivacyViewer`, `HelpViewer`) to render documentation with features like search, filtering, and deep linking.

## 📱 Integrated App Ecosystem

The site hosts dedicated environments for my Android projects, featuring **Deep Linking** and **Google Play** integration:

* **Pixel Pulse:** High-fidelity audio analysis and hearing health tools. Includes interactive comparison tables and roadmap viewers.
* **Pixel Compass:** Premium navigation suite utilizing advanced sensor fusion.

## 🛠️ Tech Stack

* **Front-end:** React 18 (Vite)
* **Design System:** Material Design 3 (M3)
* **Animation:** Framer Motion
* **Scrolling:** Lenis
* **Routing:** React Router DOM
* **Data Parsing:** Remark / Rehype / Gray-matter
* **Localization:** Custom Context-based i18n
* **CI/CD:** GitHub Pages

## 📄 License & Intellectual Property

Copyright © 2025 **Fernando Vaz Bela (fertwbr)**.

The source code and design assets in this repository are **not** intended for redistribution, cloning, or commercial use. This project exists solely as a demonstration of professional skills. Please refer to the [LICENSE](LICENSE) file for more details.

---

<p align="center">
  Developed with precision by <b>Fernando Vaz</b>
</p>