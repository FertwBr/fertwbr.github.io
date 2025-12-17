# Project Overview {: data-toc-key="top" }

Welcome to the technical overview of Pixel Pulse. This project is built on the principles of modern design, high performance, and a user-centric approach to provide a best-in-class sound measurement and hearing health experience for Android.

## 🛠️ Tech Stack & Architecture {: data-toc-key="tech-stack" }

We believe in using modern, robust, and maintainable technologies to deliver a first-class experience.

| Category | Technologies & Approach |
| :--- | :--- |
| **Language** | 100% Kotlin First, leveraging modern language features for safety and conciseness. |
| **Architecture** | Clean, multi-module MVVM (`:app`, `:shared`) promoting separation of concerns and high code reusability. |
| **UI Toolkit** | **Jetpack Compose** for a fully declarative, dynamic, and expressive UI, designed with Material 3 principles. |
| **Design System** | **Material 3**, fully embracing Material You dynamic theming and expressive motion. |
| **Dependency Injection** | **Hilt** for robust, scalable dependency management across all modules. |
| **Asynchronicity** | **Kotlin Coroutines & Flow** for reactive, structured, and efficient data handling and UI updates. |
| **Data Persistence** | **Jetpack Room** for robust local database storage of session history. **Jetpack DataStore** for modern, asynchronous storage of user preferences. |
| **Background Processing** | **Jetpack WorkManager** for efficient, battery-friendly, and persistent background monitoring of sound exposure. |
| **Audio Processing** | **Android `AudioRecord` & JTransforms (FFT)** for low-level audio buffer access, enabling precise decibel calculation and frequency weighting. |
| **Billing** | **Google Play Billing Library**, configured for a simple and secure one-time purchase to unlock Plus features. |
| **Build System** | **Gradle with Kotlin DSL & Version Catalogs** for a clean, type-safe, and maintainable build configuration. |

### 🌐 Website {: data-toc-key="website" }

*   **Framework:** Built on a reusable, generalized template using pure HTML, CSS, and vanilla JavaScript (ES6 Modules).
*   **UI Components:** Material Web Components for a consistent Material 3 look and feel.
*   **Content:** Markdown (`.md`) files are parsed dynamically, allowing for easy content updates for each app sharing the template.
*   **Internationalization (i18n):** A custom, scalable system that loads language-specific strings and content files, with a robust fallback to English.


## 🔮 Roadmap & Future Enhancements {: data-toc-key="roadmap" }

We are constantly working to make Pixel Pulse more powerful, intuitive, and delightful. Here's a look at what's coming next.

<div id="roadmap-summary-container">
    <!-- This content will be dynamically injected by JavaScript from the roadmap.md file -->
</div>

<a href="#" data-page-id="roadmap" class="cta-link-secondary" style="margin-top: 16px;">View Full Roadmap <md-icon>arrow_forward</md-icon></a>