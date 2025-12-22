# Project Overview {: data-toc-key="top" }

Welcome to the technical overview of Pixel Pulse. This project is built on the principles of modern design, high reliability, and a privacy-first approach to provide a best-in-class sound measurement and hearing health experience for Android.

Pixel Pulse demonstrates how to build a complex, background-heavy application that remains battery-efficient and complies with the latest Android strictures on privacy and services.

## 🛠️ Tech Stack & Architecture {: data-toc-key="tech-stack" }

We believe in using modern, robust, and maintainable technologies to deliver a first-class experience.

| Category | Technologies & Approach |
| :--- | :--- |
| **Language** | 100% **Kotlin**, leveraging Coroutines, Flow, and modern language features for type safety and concurrency. |
| **Architecture** | Clean, multi-module MVVM (`:app`, `:shared`) with strict separation of UI, Domain, and Data layers. |
| **UI Toolkit** | **Jetpack Compose** for a fully declarative, dynamic UI. Implements complex animations and responsive layouts for foldables/tablets. |
| **Design System** | **Material 3**, fully embracing Material You dynamic theming, custom shapes, and expressive motion. |
| **Dependency Injection** | **Hilt** (Dagger) for robust, scalable dependency management across modules and ViewModels. |
| **Asynchronicity** | **Kotlin Coroutines & Flow** for reactive data streams, specifically for real-time audio analysis and DB updates. |
| **Data Persistence** | **Jetpack Room** for structured session history. **Jetpack DataStore** for type-safe, asynchronous user preferences. |
| **Background Processing** | **Hybrid Engine:** Persistent **Foreground Services** for reliable live monitoring/recording, paired with **WorkManager** for periodic health checks and resilience. |
| **Audio Processing** | **Android `AudioRecord`** low-latency buffer reading + **JTransforms (FFT)** for precise frequency analysis and A/C/Z weighting implementation. |
| **Graphics & Export** | **Native Canvas Drawing** to dynamically generate high-resolution, shareable images of charts and stats without heavy external libraries. |
| **Platform Integration** | Specific optimizations for OEM features, such as **Samsung's "Ongoing Activity"** API for rich status bar notifications. |
| **Remote Content** | **Cloud-Based Dynamic Loading** for changelogs and banners to minimize APK size and allow over-the-air content updates. |
| **Billing** | **Google Play Billing Library**, implementing a secure, reactive flow for one-time purchases and license verification. |
| **Build System** | **Gradle with Kotlin DSL & Version Catalogs** (TOML) for centralized dependency management. |

## 📐 Technical Deep Dive {: data-toc-key="deep-dive" }

### The Hybrid Monitoring Engine
One of Pixel Pulse's core technical challenges is monitoring sound exposure reliably without draining the battery. We moved away from a pure *WorkManager* approach to a **Hybrid Foreground Service Architecture**:
* **Active Monitoring:** A persistent `ForegroundService` handles the microphone input loop, ensuring the OS does not kill the process during long measurement sessions.
* **Service Health:** A periodic `ServiceHealthWorker` runs via WorkManager to act as a "watchdog," ensuring the monitoring service is restarted automatically if the device reboots or the service is unexpectedly terminated.
* **Lifecycle Awareness:** An `AppLifecycleManager` intelligently coordinates between the UI and the Service to prevent resource conflicts (e.g., pausing background monitoring when the user opens the real-time meter).

### Smart Insight Algorithms
The app doesn't just record numbers; it processes them against health standards:
* **Noise Budgeting:** Implements a rolling weekly "dose" calculation based on WHO (World Health Organization) standards for safe listening.
* **Trend Analysis:** The database queries are optimized to aggregate millions of potential data points into performant Daily, Weekly, and Monthly visualizations.

### 🌐 Website {: data-toc-key="website" }

*   **Framework:** Built on a reusable, generalized template using pure HTML, CSS, and vanilla JavaScript (ES6 Modules).
*   **UI Components:** Material Web Components for a consistent Material 3 look and feel.
*   **Content:** Markdown (`.md`) files are parsed dynamically client-side, allowing for easy content updates for each app sharing the template.
*   **Internationalization (i18n):** A custom, scalable system that loads language-specific strings and content files, with a robust fallback to English.

## 🔮 Roadmap & Future Enhancements {: data-toc-key="roadmap" }

We are constantly working to make Pixel Pulse more powerful, intuitive, and delightful. Here's a look at what's coming next.

<div id="roadmap-summary-container">
    </div>

<a href="#" data-page-id="roadmap" class="cta-link-secondary" style="margin-top: 16px;">View Full Roadmap <md-icon>arrow_forward</md-icon></a>