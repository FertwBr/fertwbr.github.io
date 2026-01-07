# Project Overview {: data-toc-key="top" }

Welcome to the technical overview of Pixel Pulse. This project is built on the principles of modern design, high reliability, and a privacy-first approach to provide a best-in-class sound measurement and hearing health experience for Android and Wear OS.

Pixel Pulse demonstrates how to build a complex, background-heavy application that remains battery-efficient, complies with the latest Android strictures on privacy, and delivers a seamless cross-device ecosystem.

## 🛠️ Tech Stack & Architecture {: data-toc-key="tech-stack" }

We believe in using modern, robust, and maintainable technologies to deliver a first-class experience.

| Category | Technologies & Approach |
| :--- | :--- |
| **Language** | 100% **Kotlin**, leveraging Coroutines, Flow, and modern language features for type safety and concurrency. |
| **Architecture** | Clean, multi-module MVVM (`:app`, `:wear`, `:shared`) with strict separation of UI, Domain, and Data layers. |
| **UI Toolkit** | **Jetpack Compose** (Mobile) and **Compose for Wear OS** for a fully declarative, dynamic UI across form factors. |
| **Design System** | **Material 3**, fully embracing Material You dynamic theming, custom shapes, and expressive motion on both phone and watch. |
| **Dependency Injection** | **Hilt** (Dagger) for robust, scalable dependency management across all modules, Services, and ViewModels. |
| **Asynchronicity** | **Kotlin Coroutines & Flow** for reactive data streams, specifically for real-time audio analysis, DB updates, and Wearable Data Layer events. |
| **Data Persistence** | **Jetpack Room** for structured session history. **Jetpack DataStore** for type-safe, asynchronous user preferences. |
| **Background Processing** | **Hybrid Engine:** Persistent **Foreground Services** for reliable live monitoring/recording, paired with **WorkManager** for periodic health checks and resilience. |
| **Wearable Sync** | **Play Services Wearable Data Layer** for reliable, offline-capable synchronization of session data between Watch and Phone using serialized Data Items. |
| **Audio Processing** | **Android `AudioRecord`** low-latency buffer reading + **JTransforms (FFT)** for precise frequency analysis and A/C/Z weighting implementation. |
| **Graphics & Export** | **Native Canvas Drawing** to dynamically generate high-resolution, shareable images of charts and stats without heavy external libraries. |
| **Platform Integration** | Specific optimizations for OEM features (e.g., Samsung "Ongoing Activity"), plus **Wear OS Tiles & Complications** for instant access. |
| **Remote Content** | **Cloud-Based Dynamic Loading** for changelogs and banners to minimize APK size and allow over-the-air content updates. |
| **Billing** | **Google Play Billing Library**, implementing a secure, reactive flow for one-time purchases and license verification. |
| **Build System** | **Gradle with Kotlin DSL & Version Catalogs** (TOML) for centralized dependency management across the multi-module project. |

## 📐 Technical Deep Dive {: data-toc-key="deep-dive" }

### The Hybrid Monitoring Engine
One of Pixel Pulse's core technical challenges is monitoring sound exposure reliably without draining the battery. We moved away from a pure *WorkManager* approach to a **Hybrid Foreground Service Architecture**:
* **Active Monitoring:** A persistent `ForegroundService` handles the microphone input loop, ensuring the OS does not kill the process during long measurement sessions.
* **Service Health:** A periodic `ServiceHealthWorker` runs via WorkManager to act as a "watchdog," ensuring the monitoring service is restarted automatically if the device reboots or the service is unexpectedly terminated.
* **Lifecycle Awareness:** An `AppLifecycleManager` intelligently coordinates between the UI and the Service to prevent resource conflicts (e.g., pausing background monitoring when the user opens the real-time meter).

### Wear OS Ecosystem & Synchronization
Pixel Pulse creates a unified experience across devices by leveraging a modular architecture and robust synchronization strategies:
* **Shared Business Logic:** The project utilizes a `:shared` module that houses the Core Database (`Room`), DataStore configurations, Repository implementations, and Domain Logic. This ensures that both the Phone (`:app`) and Watch (`:wear`) operate on the exact same data structures and validation rules, minimizing code duplication.
* **Data Layer Synchronization:** We implemented a custom `SessionSyncManager` that serializes complex `SessionEntity` objects into JSON (via Moshi) and transmits them via the **Wearable Data Layer API**.
* **Passive Listener Service:** The phone app includes a `WearableDataListenerService` that operates in the background. It listens for `DATA_CHANGED` events from the watch, deserializes incoming session data, merges it into the main history database, and notifies the user—allowing for a seamless "Record on Wrist, View on Phone" workflow.

### Smart Insight Algorithms
The app doesn't just record numbers; it processes them against health standards:
* **Noise Budgeting:** Implements a rolling weekly "dose" calculation based on WHO (World Health Organization) standards for safe listening.
* **Trend Analysis:** The database queries are optimized to aggregate millions of potential data points into performant Daily, Weekly, and Monthly visualizations.