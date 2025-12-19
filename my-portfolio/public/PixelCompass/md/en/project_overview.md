# Project Overview

Welcome to the technical overview of Pixel Compass. This project is built on the principles of modern design, high performance, and a user-centric approach, spanning across Android and Wear OS.

## 🛠️ Tech Stack & Architecture

We believe in using modern, robust, and maintainable technologies to deliver a first-class experience.

| Category | Technologies & Approach |
| :--- | :--- |
| **Language** | 100% Kotlin First, leveraging modern language features for safety and conciseness. |
| **Architecture** | Clean, multi-module MVVM (`:app`, `:wear`, `:shared`, `:uicommon`) promoting separation of concerns and high code reusability. |
| **UI Toolkit** | **Jetpack Compose** for a fully declarative, dynamic, and adaptive UI. **Jetpack Glance** for modern, reactive home screen widgets. |
| **Design System** | **Material 3**, fully embracing Material You dynamic theming and expressive motion patterns. |
| **Dependency Injection** | **Hilt** for robust, scalable dependency management across all modules and background tasks. |
| **Asynchronicity** | **Kotlin Coroutines & Flow** for reactive, structured, and efficient data handling and UI updates. |
| **Networking** | **Retrofit & OkHttp** for type-safe API communication with Google Weather and Google Maps Elevation APIs. |
| **Data Handling** | **Moshi with KSP** for fast, reflection-free JSON parsing. **Jetpack DataStore** for modern, asynchronous local storage. |
| **Billing** | **Google Play Billing Library v6**, supporting both legacy one-time purchases and the new subscription model. |
| **Device Services** | **Android SensorManager** for core compass/level data and **Fused Location Provider** for battery-efficient location. |
| **Build System** | **Gradle with Kotlin DSL & Version Catalogs** for a clean, type-safe, and maintainable build configuration. |

### 🌐 Website

*   **Framework:** Pure HTML, CSS, and vanilla JavaScript (ES6 Modules).
*   **UI Components:** Material Web Components for a consistent Material 3 look and feel.
*   **Content:** Markdown (`.md`) files parsed dynamically with `marked.js`, allowing for easy content updates.
*   **Internationalization (i18n):** A custom, scalable system that loads language-specific strings and content files, with a robust fallback to English.


## 🔮 Roadmap & Future Enhancements

We are constantly working to make Pixel Compass more powerful, intuitive, and delightful. Here's a look at what's coming next.

<div id="roadmap-summary-container">
    <!-- This content will be dynamically injected by JavaScript from roadmap.md -->
</div>

<a href="#" data-page-id="roadmap" class="cta-link-secondary" style="margin-top: 16px;">View Full Roadmap <md-icon>arrow_forward</md-icon></a>