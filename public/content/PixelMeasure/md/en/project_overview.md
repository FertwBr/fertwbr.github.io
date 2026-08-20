# Project Overview {: data-toc-key="top" }

Welcome to the technical overview of Pixel Measure. This project is built to demonstrate the capabilities of modern spatial computing, leveraging Google's ARCore to perform complex environmental tracking while strictly maintaining a privacy-first, on-device architecture.

Pixel Measure demonstrates how to handle continuous camera rendering, heavy matrix math, and 3D coordinate mapping while keeping the UI buttery smooth with Jetpack Compose.

## 🛠️ Tech Stack & Architecture {: data-toc-key="tech-stack" }

We believe in using robust, modern technologies to bridge the gap between physical space and digital data.

| Category | Technologies & Approach |
| :--- | :--- |
| **Language** | 100% **Kotlin**, leveraging Coroutines and Flow for managing real-time spatial data streams. |
| **Architecture** | Clean, modular MVVM with a strict separation between the AR Engine, the UI, and Local Storage. |
| **UI Toolkit** | **Jetpack Compose**, utilizing transparent surface overlays and dynamic Material 3 components overlaid on the camera feed. |
| **Spatial Engine** | **Google ARCore**, implementing Hit Testing, Plane Detection, and Anchor management. |
| **3D Rendering** | **Sceneview / Filament**, used to render hardware-accelerated 3D objects (lines, shapes, bounding boxes) anchored to the physical world. |
| **Data Persistence** | **Jetpack Room** with complex TypeConverters to safely serialize 3D vectors (`Pose` data) into the local SQLite database. |
| **Dependency Injection** | **Hilt** (Dagger) for scalable dependency management, particularly crucial for injecting the AR session lifecycle. |
| **Document Generation** | Native **Android PDFDocument** APIs to programmatically draw and export high-quality floorplan reports on the fly. |
| **Billing** | **Google Play Billing Library**, implementing a secure, offline-capable flow for Pixel Measure+ lifetime licenses. |

## 📐 Technical Deep Dive {: data-toc-key="deep-dive" }

### The AR Rendering Loop
Unlike standard Android apps, Pixel Measure relies on a continuous 60fps rendering loop.
* **Session Management:** The `ArSessionManager` handles the complex lifecycle of the camera. It must gracefully handle interruptions, backgrounding, and tracking loss without crashing the application.
* **Hit Testing & Planes:** When the user taps the "+", the app performs a Raycast (Hit Test) from the center of the screen into the physical world. If the ray intersects an ARCore `Plane` or `Point`, an `Anchor` is created. This Anchor holds a 3D coordinate (`Pose`) that remains locked to that physical spot even as the phone moves.

### Spatial Mathematics
To turn arbitrary 3D points into human-readable data, the app relies heavily on Vector mathematics.
* **Distance Calculation:** Using the Euclidean distance formula across 3D space (`sqrt((x2-x1)^2 + (y2-y1)^2 + (z2-z1)^2)`) to constantly calculate the line length between two moving Anchors.
* **Area Calculation:** For the Shape Tools, the app dynamically applies polygon area formulas based on the anchored vertices, continuously updating the UI as the user expands the shape across the physical floor.

### Privacy-First Architecture
Because the app uses the camera, privacy is structurally enforced at the code level.
* **No Network Calls:** The ARCore session is configured explicitly to run in a local-only mode. Cloud Anchors are disabled.
* **Transient Frames:** The image buffers processed by the CPU to detect planes are immediately discarded. Only the mathematical `Pose` data (coordinates) are ever passed to the Room database for saving.