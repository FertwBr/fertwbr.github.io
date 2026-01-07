# Project Overview

Welcome to the technical overview of Pixel Compass. This project is built on the principles of modern design, high performance, and a user-centric approach, spanning across Android and Wear OS.

## 🛠️ Tech Stack & Architecture

We believe in using modern, robust, and maintainable technologies to deliver a first-class experience.

| Category | Technologies & Approach |
| :--- |:---|
| **Language** | 100% Kotlin First, leveraging modern language features for safety and conciseness. |
| **Architecture** | Clean, multi-module MVVM (`:app`, `:wear`, `:shared`, `:uicommon`, `:baselineprofile`, `:wear-baselineprofile`) promoting separation of concerns and high code reusability. |
| **UI Toolkit** | **Jetpack Compose** for a fully declarative, dynamic, and adaptive UI. **Jetpack Glance** for modern, reactive home screen widgets (including At-a-Glance integration). |
| **Wear OS** | **Compose for Wear OS** creating a unified experience. Features native **Tiles (ProtoLayout)** and **Complications** support for instant data access. |
| **Design System** | **Material 3**, fully embracing Material You dynamic theming and expressive motion patterns. |
| **Dependency Injection** | **Hilt** for robust, scalable dependency management across all modules and background tasks. |
| **Asynchronicity** | **Kotlin Coroutines & Flow** for reactive, structured, and efficient data handling and UI updates. |
| **Networking** | **Retrofit & OkHttp** (via Moshi) for type-safe API communication with Google Weather and Google Maps Elevation APIs. |
| **Performance** | **Baseline Profiles** generated for both App and Wear modules to ensure peak startup performance and smooth scrolling. |
| **Data Handling** | **Moshi with KSP** for fast, reflection-free JSON parsing. **Jetpack DataStore** for modern, asynchronous local storage. |
| **Billing** | **Google Play Billing Library v8**, supporting both legacy one-time purchases and the new subscription model. |
| **Device Services** | **Android SensorManager** for core compass/level data and **Fused Location Provider** for battery-efficient location. |
| **Build System** | **Gradle with Kotlin DSL & Version Catalogs** for a clean, type-safe, and maintainable build configuration. |

## 📐 Technical Deep Dive {: data-toc-key="deep-dive" }

### Modularization Strategy
To maximize code sharing between the Android App and Wear OS App, the project is strictly modularized:

* **`:shared`**: Contains the core business logic, data repositories (Weather, Elevation, Location), and the `SensorDataManager`. This ensures that both the phone and watch run on the exact same logic.
* **`:uicommon`**: Houses shared UI elements, such as the `FigureEightCalibrationAnimation`, custom `CompassShape`s, and canvas drawing utilities, ensuring visual consistency across platforms.
* **`:app` & `:wear`**: Platform-specific entry points that implement the UI layer using Jetpack Compose and handle platform-specific lifecycles.
* **`:baselineprofile` & `:wear-baselineprofile`**: Dedicated modules to generate AOT compilation profiles, optimizing startup time and frame timing for both form factors.

### Unified Sensor & Location Layer
The application abstracts the Android `SensorManager` and `FusedLocationProviderClient` within the `:shared` module. This allows:
1.  **Consistent Filtering**: Both apps use the same smoothing algorithms for compass data.
2.  **Battery Efficiency**: Centralized management of sensor registration/unregistration based on lifecycle states (handled by `AppSensorLifecycleManager` in app and `WearPixelCompassApplication` logic in wear).

### Modern Widget & Tile Architecture
* **Android Widgets**: Built using **Jetpack Glance**, moving away from `RemoteViews` XML layouts to a declarative Kotlin API.
* **Wear Tiles**: Implemented using **ProtoLayout** and **Tiles Material**, offering high-performance, glanceable information (Compass, Weather, Elevation) directly from the watch face swipe.