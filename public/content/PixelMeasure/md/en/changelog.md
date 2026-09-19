# Version History
Track the evolution of Pixel Measure. Here you'll find a detailed log of new features, improvements, and fixes for each version.

## Version 1.0.0 Alpha 1
*(Released September 18, 2026)*

Welcome to the inaugural alpha release of Pixel Measure. This initial build establishes the core AR spatial engine and Material 3 Expressive UI foundation, bringing highly precise 3D measurements, volume extrusion, and intelligent snapping directly to your device. As a technical alpha, this update heavily focuses on establishing robust architecture, optimizing the high-framerate rendering pipeline, and deploying our foundational spatial mathematics engine to ensure precision under heavy load.

#### 📱 Phone
* **Core Architecture & Shared Infrastructure**: Foundational logic, data management, and services utilized across all form factors.
  * **Cross-Platform Module Extraction**: Established a unified `:shared` library module containing core domain models (`Point3D`, `MeasurementUnit`), DataStore preferences (`UserPreferencesRepository`), and regional formatting logic.
  * **Centralized Billing & Entitlement**: Integrated `BillingClientManager` to handle Google Play Billing with offline caching. Engineered `SubscriptionLifecycleManager` and `PlusSettingsBackupManager` to synchronize premium subscription states and backup/restore settings across tiers.
  * **App Integrity & Security**: Integrated `PlayIntegrityManager` to perform trusted execution environment verification on startup, and configured ProGuard/R8 consumer rules across all modules.
  * **In-App Updates & Reviews**: Deployed `InAppUpdateManager` using Google Play Core with flexible update tracking and a 48-hour cooldown logic, alongside a localized `ReviewManager` for in-app ratings.
  * **Advanced Haptic Engine**: Engineered a centralized `HapticFeedbackManager` to dispatch standardized, high-fidelity tactile patterns (waveforms for snapping, continuous 80ms ticks for dragging, and clicks) based on user intensity preferences.
  * **Deep Linking System**: Built `MainIntentHandler` to intercept external web links and the `pixelmeasure://` custom scheme, directly routing users into specific application states.
  * **Robust Error Handling**: Deployed `PixelMeasureErrorHandler` as an injectable singleton to intercept runtime exceptions, streamline `FileLogger` integration, and manage fatal hardware/ARCore faults safely.

* **Spatial AR & Measurement Engine**: The primary ARCore tracking, projection math, and volumetric calculation mechanics.
  * **3D Volume Extrusion & Push/Pull**: Engineered a DFS-based cycle detection algorithm to identify flat horizontal and vertical polygons. Enabled push/pull ray-plane intersections for dynamic 3D shape extrusion and full object translation across the XZ plane.
  * **Intelligent Snapping Engine**: Implemented global magnetic point snapping and orthogonal smart angle locking (0°, 90°, 180°), augmented by a visual protractor and dashed guide lines. Included automatic point welding for vertices dropped within a 5cm threshold.
  * **Snapshot-Based Undo System**: Replaced legacy linear undo with a stack-based `MeasureSnapshot` state tracking system. This accurately preserves spatial graphs, anchors, and active segment selections, safely detaching orphaned anchors upon rollback.
  * **Persistent Point Cloud**: Transitioned to a localized, voxel-like Material 3 shape grid with deterministic hashing. Rendered a dynamic "flashlight" effect highlighting proximate depth maps, increasing point cache capacity to 50,000 and extending TTL to 15-30 seconds for stable environmental memory.
  * **Advanced Spatial Projections**: Decoupled native ARCore hit-testing from UI gestures via isolated processors (`MeasureARProcessors`). Built custom 3D-to-2D projection matrices (`ARProjectionUtils`) to calculate mathematical bounds, inverse ray unprojections, and render UI elements accurately into physical space.

* **UI, UX & Customization**: Material 3 Expressive implementation, reactive components, and personalization options.
  * **Expressive Morphing FAB**: Built a dynamic Floating Action Button (`AnimatedShapeButton`) that fluidly morphs from a circle to a 24dp rounded square when targeting valid spatial coordinates, shifting contextual actions (Add, Undo, Delete) seamlessly.
  * **Dynamic Color Themes & Custom Palettes**: Delivered a comprehensive theme engine supporting Material You dynamic colors, true-black AMOLED, and bespoke palettes (Pixel Blue, Emerald, Sunset, Purple, Crimson, Teal, Pink, Brown) including a specialized "Red Light" (Night Vision) mode.
  * **Measurement & Unit Localization**: Introduced `RegionalPreferencesLogic` to automatically configure measurement systems (Metric vs. Imperial) and decimal separators (Dot vs. Comma) based on network locale. Added a Quick Settings sheet and Single Unit Mode for rapid overrides.
  * **Adaptive AR Overlays**: Added `MeasureDistanceChip` and `SegmentDetailsSheet` to display 3D midpoints and precise segments. Introduced a `PowerSavingOverlay` (triggered after 45s of inactivity) that blurs cached AR frames, and an `ARGuidanceOverlay` to notify users of low light or excessive motion.
  * **Precision Drag Interactions**: Suppressed standard reticles during touch events, replacing them with an expanded, thin-lined precision crosshair drawn exactly under the user's touch coordinate.
  * **Navigation & Onboarding**: Deployed a floating pill-shaped bottom navigation bar with auto-expanding labels. Added a custom `PixelMeasureTopBar` featuring dynamic title collision detection and a state-aware status indicator pill.

* **Fixes & Stability**: Critical patches resolving rendering bottlenecks, UI deadlocks, and mathematical projection errors.
  * **AR Pipeline & Memory Leaks**: Eliminated severe Garbage Collection (GC) churn, micro-stuttering, and thermal throttling at 60-120fps by reusing Canvas `Path` objects, hoisting matrix arrays out of the draw loop, and implementing `ThreadLocal` projection caches.
  * **Startup Thread Blockages**: Resolved an infinite splash screen freeze on unstable networks by enforcing a strict 1200ms timeout on Play Billing queries and lazily initializing `AppUpdateManager` to free the main thread for the initial UI frame.
  * **Interaction Physics & Rubber-Banding**: Fixed reticle visual dragging lag by bypassing linear interpolation (LERP) on instant snaps, and implementing spatial hysteresis with independent snap-acquisition (60f) and break-away (150f) radii to strictly lock onto physical points.
  * **Volumetric Z-Clipping**: Implemented mathematical 3D segment clipping against the camera's near frustum (`-0.05f`) to prevent 2D engine integer overflows, infinite line stretching, or visual glitches when segments rest partially behind the viewport.
  * **Continuous Polyline Feedback Loop**: Forced the reticle to automatically detach upon placing the secondary endpoint of a segment, explicitly preventing infinite trailing lines unless the user actively snaps to an existing point.