# Version History
Track the evolution of Pixel Pulse. Here you'll find a detailed log of new features, improvements, and fixes for each version.

## Version 1.21.0 Beta 4
*(Released April 27, 2026)*

This beta introduces significant refinements to the Background Recording engine, resolving crucial platform constraints, optimizing performance, and expanding our notification system globally with complete translations.

#### 📱 Phone

* **Core: Recording State Machine Refactor:**
  * **Strict Decibel Gating:** The `MeterViewModel` now strictly gates audio sampling based on the `RecordingState`. If you pause the recording, the app completely drops the microphone connection and ceases to sample audio flows in the background. This immediately frees up CPU cycles and prevents any unnecessary battery drain when not actively recording.
  * **Interactive Recording Controls:** The primary recording buttons on the Meter screen have been completely reworked. They now feature `AnimatedShapeButton` transitions, smoothly morphing the button colors, labels, and icons (e.g., swapping a 'Mic' for a 'Start' label or a 'Play' arrow for a 'Pause' icon) depending on the exact `RecordingState` (IDLE, RECORDING, PAUSED).
* **Core & Architecture:**
  * **Update Prompt Cooldown:** If you decline a flexible in-app update prompt, the app will now log a timestamp and enforce a strict 48-hour cooldown before asking you to update again, eliminating repetitive update popups.
* **UX & UI Polish:**
  * **Responsive Meter Adjustments:** Refined the `MeterExpandedLayout` and `MeterCompactLayout` to better handle extreme constraints. The UI now intelligently adjusts the density and scaling when vertical space is severely limited (like in split-screen mode).
  * **Master Switch UI:** The background recording toggle in the Notifications settings screen now renders as a standalone (`SINGLE`) list item for better visual prominence.
* **Global Localization:**
  * **100% Notification Coverage:** Finalized and pushed translations across 17 languages for the new Background Recording controls, Backup/Restore ETA toasts, Smart Health Alerts categories, and Notification permission states.
  * **Typographic Polish:** Switched several Arabic translations to use proper typographic ellipses (`…`) instead of three standard dots (`...`) for better rendering.
* **Smart Health Alerts Default:** The "Smart Health Alerts" feature is now enabled by default for all users, proactively monitoring your daily acoustic routines and sending insights.

#### ⌚ Wear OS

* **Core & Architecture:**
  * **Smart Health Alerts Default:** The "Smart Health Alerts" feature is now enabled by default for all users, proactively monitoring your daily acoustic routines and sending insights.
  * **Wearable Data Layer Robustness:** Hardened the exposure sync pipeline. Instead of a single combined flow, the UI now requests specific data streams.
  * **Async Session Persisting:** The `WearMainViewModel` now strictly persists recorded sessions to the local database and triggers the phone sync over `Dispatchers.IO`, keeping the main thread free and ensuring the watch interface doesn't stutter when saving a heavy session.
* **UX & UI Polish:**
  * **Paused Timer Feedback:** The active recording timer on the watch face now animates and highlights its background colors when you pause a session, giving you instant visual confirmation that the mic is disengaged.
  * **Dynamic Controls:** The watch's `MeterControls` have been rewritten to utilize the new `RecordingState`. The buttons dynamically shift sizes, swap icons (Play/Pause/Stop), and adjust their layout to match the phone's behavior exactly.
  * **Sync Progress State:** Introduced real-time sync progress tracking to the settings UI. The `WearMainViewModel` now tracks the exact `lastUiSyncTimestamp` and displays an animated `SyncProgressCard` with a 15-second timeout, so you know exactly when your watch data has reached your phone.
  * **Info Screen Polish:** Swapped several internal icons (like the Volume Mute icon) to their `AutoMirrored` variants, ensuring the UI looks perfect for users operating their watch in Right-to-Left (RTL) languages.

## Version 1.21.0 Beta 3
*(Released April 24, 2026)*

Welcome to version 1.21.0 Beta 3. This is a massive under-the-hood update that completely redesigns our background engine and synchronization architecture. The highlight of this release is the introduction of the Smart Health Alerts ecosystem, a proactive, routine-based evaluation engine that intelligently analyzes acoustic data and dispatches contextual insights while strictly managing notification cooldowns.

In addition to the new intelligence layer, we have completely refactored our recording state management to utilize robust state machines, decoupled global UI states via dedicated ViewModels, and executed a highly granular pass on Samsung-specific expanded notifications. This build lays the heavy technical groundwork necessary for our final stable release, optimizing everything from dynamic notification coloring to deep-linked contextual routing across both platforms.

#### 📱 Phone

* **New Engine: Smart Health Alerts & Background Processing:** Introduces a fully autonomous, routine-based acoustic evaluation pipeline.
  * **RoutineInsightWorker & Scheduler:** Implemented a new `RoutineInsightWorker` (via CoroutineWorker) injected with Hilt to trigger background acoustic report generation. The `RoutineInsightScheduler` dynamically manages WorkManager queues based on the user's specific routine (e.g., sleep end, work end).
  * **HealthAlertEvaluator:** Engineered a singleton evaluator to parse generated `HealthInsight` objects. It actively filters insights based on user-selected categories and severity (WARNING/DANGER), enforcing strict 24-hour (default) or 6-hour (danger) cooldowns persisted via `healthAlertCooldownMapFlow` to prevent notification fatigue.
  * **Boot Resilience:** Added a `BootReceiver` listening for `BOOT_COMPLETED` and `MY_PACKAGE_REPLACED` intents, ensuring the routine insight scheduler flawlessly rebuilds background tasks after a device restart or app update.
  * **Deep Linked Notifications:** Smart Insight notifications now support contextual deep links (`pixelpulse://app/exposure_detail/<route>`), utilizing `PendingIntent` with `FLAG_UPDATE_CURRENT | FLAG_IMMUTABLE` to route taps directly into specific analytical views.
  * **Dedicated Alert Channel:** Registered a new `SMART_INSIGHTS` notification channel under the ALERTS group specifically for contextual health insights.

* **Core & Performance: Recording State Machine Refactor:** Migrated away from legacy boolean toggles to a robust, lifecycle-aware recording state architecture.
  * **RecordingState Enum:** Deprecated the legacy `isRecording` boolean in favor of a strict `RecordingState` enum (`IDLE`, `RECORDING`, `PAUSED`).
  * **Explicit Actions & Callbacks:** Replaced generic toggle callbacks with explicit lifecycle methods (`startRecording`, `pauseRecording`, `resumeRecording`, `stopRecording`, `restartRecording`).
  * **Broadcast Integration:** Engineered a local broadcast receiver listening for `ACTION_BROADCAST_STOPPED` emitted directly from the `RecordingService`, ensuring the UI perfectly reflects background teardowns.
  * **Auto-Start & Background Prefs:** Introduced `autoStartRecordingFlow` and `backgroundRecordingEnabledFlow` to `UserPreferencesRepository`, persisting autonomous recording settings via DataStore.

* **Architecture & Refactoring: Decoupled Global States:** Major cleanup of ViewModel responsibilities to isolate UI concerns from global background logic.
  * **TopBarViewModel:** Created a centralized Hilt ViewModel to handle universal top-bar flows (`liveSessionState`, `backupState`, `hasDismissedBatteryBanner`), entirely stripping these responsibilities from `ExposureViewModel`, `HistoryViewModel`, and `MeterViewModel`.
  * **DebugViewModel Injection:** Isolated developer and debug tools into a dedicated `DebugViewModel`. Added a "Populate Session Data" synthetic seeder and a mock trigger for UI testing Smart Health Alerts.
  * **Header Relocation:** Relocated and cleaned up `WeeklyAnalysisHeader` and `MonthlyAnalysisHeader` to the `exposure.detail` package, standardizing Compose modifier delegations.

* **UI & UX Polish: Samsung Notification Overhaul & Dynamic Theming:** Highly granular layout adjustments for system notifications.
  * **Dynamic Decibel Coloring:** Implemented dynamic ARGB coloring for ongoing recording notifications. The builder now injects `getDynamicColor(decibels)` directly into `NotificationCompat` and Samsung RemoteViews based on the live exposure level and system dark mode.
  * **Samsung Expanded UI:** Massively refined `samsung_live_notification_expanded.xml`. Tightened container margins, removed redundant headers, pushed chronometers to right-aligned containers, and set progress bars to `wrap_content` for perfect native alignment.
  * **Manufacturer Precedence:** Reordered the notification selection pipeline so Samsung device checks execute *before* the SDK 35 (Baklava) branch, guaranteeing Samsung-specific extras apply correctly.
  * **ETA in Backups:** `BackupState.Progress` now formats and passes an `estimatedTimeRemainingMs` payload, rendering a live ETA sub-text on manual and automatic backup notifications.
  * **Animated Recording Controls:** Upgraded meter buttons using `AnimatedContentSize` and `AnimatedShapeButton`, dynamically morphing icons between Start, Pause, Resume, Stop, and Restart based on the new `RecordingState`.

* **Settings & Customization: Smart Insight Management:** Granular user control over the new intelligence engine.
  * **NotificationSettingsContent:** Built a new dedicated settings sub-screen for notification preferences, including a master system permission toggle and Plus-gated toggles for background monitoring.
  * **CategorySelectionDialog:** Introduced an `AlertDialog` housing a `ScalingLazyColumn` of `InsightCategory` checkboxes. Users can individually toggle alerts for Sleep Quality, Acoustic Fatigue, Habit Patterns, Long-Term Trends, and Summaries.
  * **Exposure Interval Refactor:** Swapped manual string interpolations for localized `MonitoringInterval.entries`, utilizing `stringResource` fallbacks.

* **Synchronization: Multi-Device Config Sync:** Enhanced Wearable Data Layer communications.
  * **Config DataMap Extensions:** Added `KEY_CONFIG_SMART_ALERTS_ENABLED`, `KEY_CONFIG_BACKGROUND_RECORDING`, and `KEY_CONFIG_ACTIVE_CATEGORIES` to the `PutDataMapRequest` pipeline.
  * **String Set Parsing:** Ensured active categories are correctly serialized as string arrays and synced natively to the wearable.
  * **Backup Manager:** Upgraded `PlusSettingsBackupManager` to safely persist and restore active smart alert categories via string-set DataStore keys.

#### ⌚ Wear OS

* **New Engine: Smart Health Alerts & Background Processing (Shared):** Introduces a fully autonomous, routine-based acoustic evaluation pipeline to the wrist.
  * **RoutineInsightWorker & Scheduler:** Receives the injected `RoutineInsightWorker` to autonomously evaluate acoustics locally on Wear OS. `RoutineInsightScheduler` was integrated directly into `WearMainViewModel` and `WearableDataListenerService` to immediately refresh target times upon receiving routine updates from the phone.
  * **HealthAlertEvaluator:** Utilizes the shared insight evaluator and cooldown tracking to prevent wrist-based notification spam.
  * **Boot Resilience:** Registered `BootReceiver` in the Wear Manifest with `RECEIVER_BOOT_COMPLETED` permission, ensuring workers reschedule gracefully upon watch reboot.
  * **Deep Linked Notifications:** Wrist notifications now natively support deep link routing (`pixelpulse://app/exposure_detail/<route>`) mapped directly to internal exposure screens.

* **Synchronization: Multi-Device Config Sync (Shared):** Enhanced Wearable Data Layer communications.
  * **Inbound Sync Parsers:** Wear OS app now natively parses `smartAlertsEnabled`, `backgroundRecording`, and `activeCategories` from incoming `PutDataMapRequest` payloads, applying them to the local `UserPreferencesRepository`.
  * **Outbound Sync:** Using `exposureSyncManager.syncConfig()`, any change made to active smart alert categories from the watch is immediately broadcasted back to the phone.

* **Architecture & Refactoring: Meter UI Componentization:** Modularized the wearable recording interface for testing and performance.
  * **Stateless Refactor:** Extracted the monolithic `MeterScreen` into `MeterComponents.kt` and `MeterSideEffects.kt`. Replaced complex local UI states with a stateless `MeterContent` composable handling immersive overlays, reactive backgrounds, and readout logic.
  * **Permission Screens:** Moved all permission and onboarding UI overlays into a dedicated `PermissionDeniedScreen.kt` component.
  * **API Documentation:** Executed a massive KDoc sweep on `WearMainViewModel`, strictly documenting StateFlows, permission checks, and sync actions.

* **Core & Performance: Auto-Start Integration:** Autonomous recording logic brought to Wear OS.
  * **Guard Evaluation:** Added a `LaunchedEffect` within `MainActivity` that evaluates `hasAttemptedAutoStart`, firing `viewModel.handleAutoStart()` *only* after `POST_NOTIFICATIONS` / `RECORD_AUDIO` permissions are granted and onboarding is complete.
  * **Recording Control:** Migrated watch logic to respect the shared `RecordingState` enum and explicit lifecycle intents.

* **UI & UX Polish: Notification Settings & Wrist Customization:** Granular control over the intelligence engine directly from the watch.
  * **NotificationCategoriesScreen:** Designed a Wear-native `ScreenScaffold` and `ScalingLazyColumn` utilizing `CheckboxButton` to allow users to toggle specific smart alerts (e.g., Acoustic Fatigue) without touching their phone.
  * **Settings Reorganization:** Swapped the "General" and "Notifications" top-level UI buttons to streamline flow. Added `ListHeader` entries for Data and Support.
  * **Auto-Start UI:** Added an explicit "Auto-start Recording" SwitchButton to the watch's Meter Settings UI.
  * **Manage Categories Action:** Added a full-width `Button` directly inside the Notifications view to jump straight into category management.

## Version 1.21.0 Beta 2
*(Released April 19, 2026)*

Welcome to the second beta of Pixel Pulse 1.21! This release brings highly requested background capabilities, massive optimizations to the backup engine, and a completely unified notification system across your devices.

#### 📱 Phone

* **New: True Background Recording:**
  * **Uninterrupted Measurement:** Live recording now utilizes a dedicated Foreground Service. If you exit the app, it will seamlessly continue measuring and recording your audio exposure in the background.
  * **Interactive Notifications:** While recording in the background, a rich notification will display a live chronometer and current decibel levels. You can now securely "Save" or "Stop" the session directly from the notification tray without opening the app.
  * **Platform Optimization:** Added beautifully tailored, expanded notification layouts specifically for Samsung devices, alongside robust support for Android 13+ permission flows.
* **New: Background Import & Export:**
  * **Multitasking Backups:** Manual imports and exports have been upgraded to run as background workers. You no longer need to keep the screen open while transferring massive amounts of data.
  * **Top Bar Integration:** You can now track the live progress of an ongoing backup or restore directly from the app's Top Bar.
* **UX & UI Polish:**
  * **Backup Progress Sheet:** Completely revamped the visual layout. It now intelligently formats large numbers (e.g., 1,000 vs 1.000) based on your device's regional settings and fixes a bug where progress text would awkwardly wrap into two lines.
  * **Settings Reorganization:** For easier access, the "Sound Exposure" settings have been moved to the very top of the Data category and updated with a fresh `GraphicEq` icon for better visual clarity.
* **New: Pixel Pulse Notification Manager:**
  * **Unified Engine:** Both the phone and watch now route all alerts through a single, centralized `PixelPulseNotificationManager`. This system intelligently groups notifications into distinct categories (like "Recording" and "Live Sessions"), paving the way for deep, granular user customization in future updates.
* **Core: Next-Generation Backup Engine:**
  * **Memory Safe Streaming:** The backup engine has been completely rebuilt to use streaming JSON with intelligent batching and throttling. This completely eradicates memory crashes when exporting or importing years' worth of exposure data.
  * **Live ETA:** The engine now calculates and broadcasts an Estimated Time of Arrival (ETA) for large backup operations, which is dynamically displayed in your notifications and the in-app progress sheet.

#### ⌚ Wear OS

* **New: Wrist-to-Phone Sync Alerts:**
  * **Sync Confirmations:** You will now receive a satisfying success notification whenever a session successfully synchronizes from your Wear OS device to your phone.
* **Core & Performance:**
  * **Debounced Complications:** Watch tiles and complications are now intelligently "debounced." This prevents background service leaks and massive battery drain if you are syncing a heavy batch of exposure data from the watch.
  * **Platform Stability:** We temporarily reverted the internal `compileSdk` and `targetSdk` to API 36 to ensure the watch module remains perfectly stable and compatible with current Wear OS hardware.
* **New: Pixel Pulse Notification Manager:**
  * **Unified Engine:** Both the phone and watch now route all alerts through a single, centralized `PixelPulseNotificationManager`. This system intelligently groups notifications into distinct categories (like "Recording" and "Live Sessions"), paving the way for deep, granular user customization in future updates.

## Version 1.21.0 Beta 1
*(Released April 18, 2026)*

Welcome to the first beta of the 1.21.0 cycle! This update brings crucial responsive UI upgrades to the Phone app, ensuring the Decibel Meter looks perfect on any screen size or font scaling. Under the hood, we've executed a massive build system upgrade across the entire ecosystem, pushing both Phone and Wear OS to the cutting edge of Android development.

#### 📱 Phone

* **UX & UI Polish: Responsive Meter Layouts:**
  * **Dynamic Scaling:** The main Decibel Meter screen has been completely re-architected. It now intelligently measures your device's available screen height and your system's font scaling settings to ensure the UI never cuts off or overflows.
  * **Compact vs. Expanded:** If space is tight (like on smaller phones or when using large accessibility fonts), the app automatically switches to a "Compact Layout." This hides non-essential visual elements (like the background chart or secondary stats) so the primary decibel gauge remains perfectly visible and fully functional.
  * **Gauge Refinements:** The central Decibel Gauge now uses fluid `BoxWithConstraints` math to draw its arcs and text. This replaces hardcoded pixel values, ensuring the gauge ring and its numbers are always perfectly proportioned relative to each other, no matter the screen size.
  * **Button Marquees:** Action buttons (Start, Stop, Reset) on the meter screen now support smooth scrolling (marquee) if their translated text is too long to fit.
  * **Curved Text Fix:** The text drawn along the curved dashboard rings (like budget or status strings) will now properly ellipsize (...) if the translation is too long, preventing the text from awkwardly overlapping itself.
* **Core & Stability:**
  * **Android SDK 37 Upgrade:** The entire project—across Phone, Wear OS, and Shared UI modules—has been upgraded to compile and target **Android SDK 37**. This ensures the app is fully optimized for the latest Android OS features and security standards.
  * **Build System Overhaul:**
    * Upgraded the build pipeline to use Android Gradle Plugin (AGP) 9.1.1 and Gradle 9.3.1.
    * Consolidated Kotlin compiler options and implemented the Foojay toolchains resolver for more reliable, reproducible builds.
    * Updated dozens of underlying libraries (Compose BOM, Wear Protolayout/Tiles, Hilt, WorkManager) to their latest stable versions, squashing hidden bugs and improving overall framework stability.

#### ⌚ Wear OS

* **UX & UI Polish:**
  * **Info Screen Upgrades:** Values displayed on the watch's Info screen now feature a sleek, compact "chip" styling (with rounded backgrounds and adjusted padding) for better readability.
  * **Smooth Scrolling (Marquee):** Long text values and titles on the Info screen will now smoothly scroll horizontally, ensuring you can read complete messages on small circular displays.
  * **Calibration Chevron:** Added a trailing chevron icon to the calibration card on the Info screen to clearly indicate it's a tappable navigation item.
* **Core & Stability:**
  * **Remote Intent Hardening:** Re-engineered how the watch sends intents to open links or the Play Store on the connected phone. It now uses stricter intent construction and better error handling (properly rethrowing `CancellationExceptions`) to prevent background crashes if the phone is unreachable.
  * **Kotlin Enum Optimization:** Upgraded internal state tracking for `MonitoringMode`, `UpdateSpeed`, and `FrequencyWeighting` to use modern, optimized Kotlin Enum entries, resulting in slightly faster execution
  * **Build System Overhaul:**
    * Upgraded the build pipeline to use Android Gradle Plugin (AGP) 9.1.1 and Gradle 9.3.1.
    * Consolidated Kotlin compiler options and implemented the Foojay toolchains resolver for more reliable, reproducible builds.
    * Updated dozens of underlying libraries (Compose BOM, Wear Protolayout/Tiles, Hilt, WorkManager) to their latest stable versions, squashing hidden bugs and improving overall framework stability.


## Version 1.20.1
*(Released April 10, 2026)*

This is a targeted hotfix release focused on correcting a localization issue introduced in the previous update for our French-speaking users.

#### 📱 Phone

* **Fix: French Localization Correction:**
  * **Translation Fix:** Resolved a widespread issue where Spanish text was mistakenly displaying instead of French. All app text—including settings, permissions, exposure analytics, onboarding, and export flows—has been properly restored to accurate French translations.

## Version 1.20.0
*(Released March 25, 2026)*

This is the final, stable release of Pixel Pulse Version 1.20. This massive update completely transforms the app into a comprehensive, WHO-compliant hearing health tool. It introduces advanced Acoustic Health analytics, automated backups, personalized daily routines, and a completely new in-app support system.

#### 📱 Phone

* **New: Advanced Acoustic Health Engine:**
  * **WHO Guidelines Integration:** The app now analyzes your sound exposure against official World Health Organization (WHO) thresholds, providing actionable insights for Weekly Leisure Limits, Cognitive Performance, Cardiovascular Risk, and Ear Recovery Time.
  * **Personalized Daily Routines:** Define your exact Sleep and Work schedules. The app will now specifically monitor "Workplace Stress" and "Pre-Sleep Noise," alerting you if your environment might impact your health or rest.
  * **Smart Curated Insights:** A brand-new horizontal scrolling carousel on the Exposure Dashboard intelligently filters your data, displaying only the most critical, highest-risk health cards without overwhelming you with duplicates.
  * **Interactive Health Charts:** Every summary card on the dashboard now features its own dedicated, full-screen Detail View packed with highly interactive, data-driven charts (like the 90-day interactive calendar for Long-Term Trends or the selectable Habit Pattern heatmap).
* **Core: True Time-Weighted Accuracy & Massive Performance Scaling:**
  * **True Time-Weighted Accuracy (Major Fix):** The internal exposure calculator has been completely overhauled. Taking frequent short measurements (like during a Live Session) no longer artificially skews your daily or weekly averages. The engine now uses true "time-weighted" averaging for mathematically perfect WHO health insights.
  * **Massive Performance Scaling:** We've fundamentally re-architected how the Acoustic Health Engine loads data. Heavy analytics are now "lazy-loaded" only when you open a detail screen. Furthermore, the app now leverages optimized SQLite pre-aggregations, offloading heavy math directly to the database to drastically reduce CPU and memory usage.
* **New: Automated Local Backups:**
  * **Set and Forget:** You can now schedule automatic backups to run daily, weekly, or monthly.
  * **Google Drive Integration:** Backups are saved securely in a local folder that fully supports Android's native Google Drive backup, ensuring your exposure history is safe even if you change phones.
* **New: In-App Feedback & Support System:**
  * **Seamless Support:** We have completely removed the old method of opening an external email app. You can now submit bug reports, feature requests, and screenshots securely directly from within the app.
  * **Smart Auto-Replies:** When you submit feedback, you will now instantly receive a beautifully formatted, localized confirmation email acknowledging your request.
* **New: Custom Monitoring Intervals & Notifications:**
  * **Total Control:** You can adjust how often the app measures background noise, ranging from every 5 minutes up to every 60 minutes, helping you balance data accuracy with battery life.
  * **Expanded Text Block Notifications:** System notifications (including ongoing background monitoring alerts and backup statuses) have been upgraded to support expanded text blocks (`BigTextStyle`), ensuring you can comfortably read long alerts directly from your notification tray without truncation.
  * **Enhanced Live Notifications:** The Live Session notification now dynamically changes color (Green, Yellow, Red) based on your current decibel level, displays a progress bar, and includes a quick "Save" action button.
* **UI & Layout Polish:**
  * **Adaptive Large Screen Layouts:** The Exposure screen has been completely rewritten. On large screens (Tablets/Foldables), it now uses a beautiful two-column split layout with responsive background colors and dynamic typography that scales text weight based on danger levels.
  * **Refinement, UX & Smoother Animations:** Replaced generic click animations with smooth, spring-based scaling for Insight cards. We also introduced the custom `PixelPulseTopBar` featuring animated back buttons and fluid, physics-based transitions.
  * **Interactive Disabled Settings:** Tapping on a "disabled" settings row (such as a Premium feature) no longer does nothing. It now intelligently intercepts the tap and provides a helpful prompt or explanation.
  * **Expressive History List:** The Session History list has been redesigned to be cleaner and more modern. Session items now visually display the icon of the device that recorded them (Phone or Watch) for instant clarity.
  * **Legal & Policy Updates:** A new, clean dialogue will now proactively notify you of any changes to our Privacy Policy or Terms of Use, ensuring you are always informed about your data.
* **Global Localization:**
  * **100% Translated:** All features, including the complex Acoustic Health Insights and formatting, have been fully translated into 17 languages.

#### ⌚ Wear OS

* **New: Wear OS Ecosystem Parity:**
  * **Wrist-Powered Analytics:** Background data collected by your watch now feeds directly into the advanced Acoustic Health Engine, powering insights like Ear Recovery Time and Workplace Stress exactly like the phone app.
  * **Deep Detail Screens:** Just like the phone app, Wear OS now has dedicated detail screens for Sleep Quality, Acoustic Fatigue, Habit Patterns, and Long-Term Trends, featuring custom charts optimized for circular displays.
  * **Data-Driven Carousel:** The main Exposure Dashboard acts as a smart, swipeable carousel that prioritizes your most critical Health Insights (e.g., placing a "Poor Sleep" warning front and center).
* **Core & Performance:**
  * **True Time-Weighted Accuracy (Shared):** The watch app inherits the massive time-weighted calculation fix. Data recorded on your watch will blend perfectly with your background measurements without skewing long-term averages.
  * **True Quick Check Reliability:** "Quick Checks" triggered from a Tile or Complication now run directly and silently within an invisible Activity. This guarantees that your instant decibel readings will *always* succeed without failing or getting stuck.
  * **Optimized 24h Tile:** The "Last 24h" bar chart tile now utilizes pre-aggregated database flows, rendering significantly faster and drastically reducing battery consumption.
  * **On-Wrist Settings Sync:** Configure your background monitoring interval or your Daily Routine directly from your watch; changes instantly sync to your phone.
* **UI & Navigation Polish:**
  * **Visual Overhaul:** The watch app now shares the exact same semantic `WearHealthColors` palette as the phone, ensuring that Danger, Warning, and Excellent states look identical across devices.
  * **Ongoing Notification Polish:** The background recording notification has been upgraded to properly utilize the Wear OS "Ongoing Activity" system, remaining consistently visible at the bottom of your watch face without buzzing or vibrating unnecessarily.
  * **Tactile Sliders & Pagers:** Introduced precise haptic "ticks" for all adjustment sliders, and added beautiful, animated "Expressive" pager indicators when swiping through your health dashboard.
  * **Responsive Typography:** Upgraded text components to use scrolling marquee text for long labels, preventing awkward text-wrapping on small circular screens.

## Version 1.20.0 Release Candidate 2
*(Released March 20, 2026)*

This Release Candidate focuses heavily on polishing the user interface, introducing a cleaner Session History design, and ensuring a smooth, welcoming onboarding experience for new users.

#### 📱 Phone

* **New: Policy Onboarding Flow:**
  * **First-Time Welcome:** New users will now be greeted with a clean, welcoming dialogue to review and accept the Privacy Policy and Terms of Use on their first launch.
  * **Localized Update Summaries:** If our policies change, returning users will see a scrollable, localized summary explaining exactly what was updated, rather than just a generic notification.
* **UI & UX Polish:**
  * **Expressive Session History:** The Session History list has been completely revamped following Material 3 Expressive guidelines. We've simplified the metadata, grouped the date and duration, and introduced a cleaner, more concise decibel stats row with softer corner radii and smoother animations.
  * **Device Source Icons:** Session items now instantly display a device-specific leading icon (Smartphone or Watch) instead of a generic play button, making it instantly clear where the audio was recorded.
  * **Smart Top Bar:** Settings and sub-screens have been upgraded to use the custom `PixelPulseTopBar`. This brings collapsible large titles, premium gradient text for Plus users, and beautifully animated circular back buttons.
* **Core & Architecture:**
  * **Clean Cleanup:** We have fully purged the legacy third-party email intent code, completing the transition to the secure, serverless in-app Feedback API introduced in RC1.

## Version 1.20.0 Release Candidate 1
*(Released March 16, 2026)*

This Release Candidate transitions Pixel Pulse to a modern, fully integrated in-app support system and brings the final layer of polish to the UI before the stable release.

#### 📱 Phone

* **New: In-App Feedback & Support System:**
  * **Seamless Support:** We have completely removed the old method of opening your email client to send feedback. You can now submit bug reports, feature requests, and screenshots directly within the app via a new, secure Feedback Bottom Sheet.
  * **Automated Support Infrastructure:** The app now integrates directly with the Resend API to securely transmit your feedback.
  * **Branded Auto-Replies:** When you submit feedback, you will now instantly receive a beautifully formatted, localized confirmation email (with full Light/Dark mode support) acknowledging your request.
  * **Smart Drafts & Validation:** The feedback form now features real-time email validation, visual loading states, and it automatically saves your message as a draft if you close the sheet accidentally.
* **UI & Polish:**
  * **Expressive Settings Actions:** Standardized the behavior of "disabled" settings items. If a feature requires a Plus subscription or a specific permission, tapping the disabled row now triggers a helpful prompt or action instead of doing nothing.
  * **Visual Cleanups:** Disabled settings items now use a consistent 50% opacity for better visual hierarchy, and long setting titles will now smoothly scroll (marquee) instead of getting cut off on smaller screens.
* **Core & Architecture:**
  * **Deep Link Tracking:** The app now intelligently tracks where you opened the Feedback screen from (e.g., via a website link vs. in-app menu) to help us better categorize support tickets.
  * **Performance:** Replaced several redundant UI checks with streamlined `isReady` flags in the Exposure Engine, slightly improving the speed at which charts render.

#### ⌚ Wear OS

* **UI Polish (Shared):**
  * **Text Formatting:** Fixed an issue where the "Loudest Period" label on the Habit Pattern card could wrap awkwardly on smaller watches. The text now properly scrolls (marquee) on a single line.

## Version 1.20.0 Beta 8
*(Released March 8, 2026)*

This beta is heavily focused on the **Wear OS Experience**. We've addressed several layout and background service issues specifically on smartwatches, significantly improved the Tile and Complication reliability, and introduced smoother navigation indicators for your wrist.

#### ⌚ Wear OS

* **Fix: True Quick Check Reliability:**
  * **Instant Measurements:** We have completely rebuilt how "Quick Checks" are handled when triggered from a Tile or Complication. Instead of attempting to launch a background service (which the OS often blocks), Quick Checks now run directly and silently within an invisible Activity. This guarantees that your instant decibel readings will *always* succeed without failing or getting stuck.
  * **Consistent Noise Budget Math:** Fixed a critical bug where the 24h Tile sometimes calculated your Noise Budget using a hardcoded interval, leading to mismatched numbers between the Tile and the main app. The Tile now correctly pulls your custom monitoring interval for perfectly accurate math.
* **Core & Performance:**
  * **Optimized 24h Tile:** The "Last 24h" bar chart tile now utilizes the new pre-aggregated database SQLite flows introduced in Beta 7. By offloading the heavy math to the database, the tile renders significantly faster and uses less battery.
  * **Persistent Monitoring Notification:** The background recording notification has been upgraded to properly utilize the Wear OS "Ongoing Activity" system (LocusId). This ensures the monitoring icon remains consistently visible at the bottom of your watch face without buzzing or vibrating unnecessarily.
* **UI & Layout Polish:**
  * **Expressive Pager Indicators:** Replaced the simple static dots on the Exposure Dashboard with a beautiful, animated "Expressive" indicator that dynamically scales as you swipe through your health cards.
  * **Unified Progress Bars:** Centralized the design of the Acoustic Fatigue progress bars, ensuring consistent, rounded segment styling and proper color mapping across all Fatigue detail screens.
  * **Text Formatting:** Prevented awkward text-wrapping on small circular screens. The Habit Pattern and Sleep Quality cards now intelligently scroll (marquee) long labels or cleanly truncate them to ensure your data is always legible.

## Version 1.20.0 Beta 7
*(Released March 7, 2026)*

This beta is completely dedicated to **Performance Scaling and Global Localization**. As we prepare for the final release, we've entirely re-architected how the Acoustic Health Engine loads your data, resulting in dramatically faster dashboard load times on both your phone and watch, while also finalizing our 17-language translation effort.

#### 📱 Phone

* **Core: Massive Performance Scaling:**
  * **Lazy-Loaded Analytics:** We've fundamentally changed how your Exposure Dashboard loads. Heavy, deep-dive calculations (like 90-day heatmaps or sleep interruptions) are now completely deferred until you actually tap into a specific Detail Screen. This makes the main dashboard load near-instantly and massively reduces battery drain.
  * **Database-Level Aggregation:** Instead of loading thousands of raw sound measurements into memory, the app now uses optimized SQLite pre-aggregations. The database itself does the heavy lifting for your hourly and daily averages, drastically reducing CPU usage.
  * **Asynchronous UI Updates:** Separated fast UI updates (like toggling a switch or updating a live session state) from the heavy background health analysis. The app will no longer "stutter" or drop frames while calculating your weekly noise budget in the background.
* **UI & UX Polish:**
  * **Smart Status Pill:** The top navigation bar's status pill will now only expand when its actual status *type* changes (e.g., from Idle to Loading), rather than unnecessarily expanding every time the text updates, creating a much less distracting experience.
  * **Duration Formatting:** Centralized and polished how durations (MM:SS) are formatted across the app, ensuring labels look perfectly centered and never clip, regardless of your screen size.
* **Global Localization:**
  * **Full Translation:** Completed the translation effort for all the new Beta 1.20 features. Everything from Weekly Peaks analysis to the new Live Session "Save" actions and Habit Consistency info dialogs are now perfectly localized across 17 languages.

#### ⌚ Wear OS

* **Core: Extreme Performance Scaling (Shared):**
  * **Lazy-Loaded Analytics:** Just like the phone app, the Wear OS dashboard now only calculates top-level summaries. Deep analytics are strictly deferred to the new Detail Screens, preventing memory spikes and keeping your watch UI buttery smooth.
  * **Database-Level Aggregation:** The watch app also inherits the new pre-aggregated database flows, saving precious battery life by offloading heavy math to the SQLite engine.
* **Global Localization (Shared):**
  * **Wrist Translations:** The entire suite of new Wear OS Acoustic Health features—including Sleep Quality metrics, Fatigue Recovery formats, Trend labels, and new Noise Budget states—have been fully translated into 17 languages.

## Version 1.20.0 Beta 6.1
*(Released March 6, 2026)*

This is a focused hotfix and polish update. We've introduced a major overhaul to how the Acoustic Health Engine calculates averages, completely redesigned the Monthly Analysis chart, and squashed several UI and notification bugs.

#### 📱 Phone

* **Core: True Time-Weighted Accuracy (Major Fix):**
  * **No More Data Skewing:** Previously, taking frequent short measurements (like during a Live Session) could artificially skew your daily and weekly averages. The engine now uses true "time-weighted" averaging, meaning a 10-second loud spike is mathematically weighed correctly against hours of background quiet time. Your Acoustic Health Insights are now dramatically more accurate.
* **UI: Monthly Chart Redesign:**
  * **Animated Vertical Bars:** The Monthly Analysis header has been completely redesigned. It now features a beautiful, compact vertical bar chart for your 4-week history, complete with staggered entry animations, dynamic typography, and a highlighted track for the current week.
* **Bug Fixes & UX Polish:**
  * **Stuck Notifications Fixed:** Resolved an issue where the Live Session timer and notification could sometimes get stuck or linger in the notification tray after you clicked "Stop" or "Save".
  * **Scrollable Sheets:** Fixed a layout bug where the "Start Live Session" setup sheets couldn't be scrolled on smaller screens, cutting off content.
  * **Budget Ring Sizing:** Improved the text scaling inside the main Noise Budget ring to ensure the percentage text never overflows the circle, even when hitting exactly 100% (Danger state).

#### ⌚ Wear OS

* **Core: True Time-Weighted Accuracy (Shared):**
  * **Precision on the Wrist:** The watch app inherits the massive time-weighted calculation fix. Any data recorded manually or via Live Sessions on your watch will now blend perfectly with your background measurements without skewing your long-term WHO health insights.

## Version 1.20.0 Beta 6
*(Released March 5, 2026)*

This beta is heavily focused on **Wear OS Parity and Ecosystem Polish**. We have brought the massive Acoustic Health updates from the phone directly to your wrist, complete with new data-rich charts and a beautiful, unified color system.

#### 📱 Phone

* **New: Smart Top Bar Status:**
  * **Dynamic Status Pill:** The top navigation bar now features an intelligent, animated status indicator for active Live Sessions, battery optimization warnings, and missing permissions.
  * **Status Modal:** Tapping the new top bar status pill opens a dedicated bottom sheet with detailed information, live progress indicators, and quick actions (like stopping/saving a session or fixing permissions).
  * **Auto-Hiding Titles:** The main screen title now automatically fades out if the status pill needs more room, preventing awkward text overlaps on smaller screens.
* **UI: Color & Theme Unification:**
  * **Semantic Health Colors:** The entire Exposure Screen now can use a unified `HealthColors` system. All charts, icons, and text automatically adapt their shades (Danger, Warning, Normal, Excellent) based on whether you are using Light or Dark mode, ensuring perfect contrast at all times.
  * **Dynamic Typography Polish:** Tweaked the dynamic font scaling introduced in recent betas. Progress percentages and decibel values now scale with a more aggressive font weight, making critical information punchier and easier to read at a glance.
* **UI: Interactive Health Charts:**
  * **90-Day Trend Calendar:** The Long-Term Trend chart is now fully responsive. On tablets and foldables, it expands to show a massive 90-day grid. We've also added drag-to-scrub support so you can smoothly slide your finger across the calendar to view daily averages.
  * **Interactive Habit Heatmap:** The Habit Pattern heatmap now supports touch selection. Tap or drag across the morning, afternoon, or night blocks to see the exact decibel values.
  * **Fatigue History Chart:** Added drag-to-scrub support to the Acoustic Fatigue chart, allowing you to easily glide through your 7-day recovery history. We also improved the visual weighting so "Today" is always prominently highlighted.
* **Refinement & UX:**
  * **Exposure FAB Group:** Added a new dynamic Floating Action Button (FAB) on the Exposure screen. It intelligently adapts to your recording state, providing quick access to start, stop, or save a Live Session with smooth animations and haptic feedback.
  * **Live Session Summary:** Redesigned the post-session summary dialog. It now groups your metrics cleanly with custom wavy dividers and features a completely rewritten, exposure-focused bar chart that intelligently downsamples large datasets for perfect rendering.
  * **Samsung Layout Fix:** Fixed an issue where the Samsung "Now Bar" setup tip could break the layout in the Live Session bottom sheet on smaller devices. The tip is now a neatly expandable/collapsible interactive card.
  * **Habit Consistency Insights:** Added a helpful info dialog explaining how the 0-100 "Consistency Score" is calculated based on your daily routines.
  * **Smart Deduplication (Continued):** Further refined the detail screens to prevent duplicate cards (e.g., ensuring Sleep Averages or Noise Budget histories aren't shown twice on the same page).

#### ⌚ Wear OS

* **Core: Unified Insight Engine:**
  * **AcousticHealthAnalyzer:** The watch app now fully utilizes the shared `AcousticHealthAnalyzer` to generate your health insights, perfectly matching the phone's advanced WHO-based logic. The legacy `ExposureCalculator` has been completely refactored to focus exclusively on rendering the new visual charts and raw metric cards.
* **New: Wrist-Based Health Analytics:**
  * **Deep Detail Screens:** Just like the phone app, Wear OS now has dedicated detail screens for Sleep Quality, Acoustic Fatigue, Habit Patterns, and Long-Term Trends.
  * **On-Wrist Charts:** We've built custom, highly optimized charts specifically for circular displays. You can now view your Sleep Interruptions bar chart, a 4-week Noise Budget history graph, and a daily Habit Heatmap right from your watch.
* **UI: Visual Overhaul:**
  * **Health Color System:** The watch app now shares the exact same `WearHealthColors` palette as the phone, ensuring that Danger (Red), Warning (Yellow), and Excellent (Green) states look identical across your devices.
  * **Data-Driven Carousel:** The main Exposure Dashboard has been rewritten. It now acts as a smart, swipeable carousel that prioritizes your most critical Health Insights (e.g., automatically placing a "Poor Sleep" warning front and center).
  * **Responsive Typography:** Upgraded the text components (`WearHabitMetricRow`, `SleepDataRow`) to use scrolling marquee text for long labels, ensuring nothing gets cut off on small screens.

## Version 1.20.0 Beta 5
*(Released March 2, 2026)*

This massive update brings the 1.20 feature set near its final form. We've introduced dedicated Detail Screens for every single Acoustic Health metric on your phone, completely overhauled the Live Session notifications, and fixed a critical bug regarding background microphone access.

#### 📱 Phone

* **New: Comprehensive Acoustic Health Detail Screens:**
  * **Deep Dives:** Every single summary card on the Exposure Dashboard (Daily Analysis, Weekly Peaks, Sleep Quality, Ear Recovery, Habit Patterns, Noise Distribution, and Long-Term Trends) now features its own dedicated, full-screen Detail View.
  * **Interactive Analytics:** Tapping a card now opens these new screens, which are packed with highly interactive, data-driven charts (like the new 90-day interactive calendar for Long-Term Trends and the selectable donut chart for Noise Distribution).
  * **Smart Deduplication:** The new detail screens intelligently prioritize your Health Insights, ensuring you only see the most critical warning per category without duplicate cards cluttering your view.
* **New: Enhanced Live Session Notifications:**
  * **Dynamic Decibel Colors:** The Live Session notification now dynamically changes color in real-time (Green, Yellow, Red) based on your current decibel exposure level. This works seamlessly across standard Android notifications and the Samsung's Now Bar ("Ongoing Activity") pill.
  * **Save From Notification:** You can now instantly save a Live Session directly from the notification tray using the new localized "Save" action button.
  * **Redesigned Setup Sheet:** The "Start Live Session" bottom sheet has been completely visually refreshed with a cleaner, list-driven layout and modern typography.
* **Fix: Shared Microphone Reliability:**
  * **Background Audio Bug:** Resolved a critical issue where the app would stop actively listening to audio if you left the app open while the background continuous monitoring service was running. The microphone is now intelligently shared via a new client-tagging and reference-counting system, ensuring both live UI meters and background services can record simultaneously without locking each other out.
* **UI & Layout Polish:**
  * **Large Screen Mastery:** The new detail screens automatically adapt to tablets and foldables, utilizing smart split-pane layouts and dynamic, scroll-responsive scaffold background colors.
  * **Snappier Interactions:** Replaced generic click animations with smooth, spring-based scaling for Insight cards.
  * **Dynamic Typography V2:** Refined the `HealthTypographyMapper` introduced in Beta 4. Decibel values and progress percentages now scale with a smoother, punchier font-weight algorithm.
* **New: Global Localization Expansion:**
  * **100% Translated:** Almost all of the massive text additions from the 1.20 cycle—including every new Acoustic Health Insight, Daily Routine setting, Automated Backup flow, and Chart Label—have been fully translated into 17 languages.

#### ⌚ Wear OS

* **Fix: Shared Microphone Reliability (Shared):**
  * **Background Audio Bug:** The watch app also receives the new microphone reference-counting architecture. This ensures that opening the main app on your watch will no longer interrupt or break the continuous background monitoring service.
* **UI & Navigation Polish:**
  * **Exposure Settings Redesign:** The Exposure settings screen has been reorganized for clarity, neatly grouping Plus-exclusive features and adding a dedicated "Delete Data" button.
  * **Smart Loading States:** Added visual loading indicators (spinners) when the app is fetching or updating your routine settings to prevent screen freezing during syncs.

## Version 1.20.0 Beta 4
*(Released February 28, 2026)*

This beta brings a massive visual and analytical overhaul to Pixel Pulse. We've completely redesigned how your health data is presented, introducing dynamic typography that reacts to noise levels, highly interactive charts for Sleep and Fatigue analysis, and even more advanced Acoustic Health insights.

#### 📱 Phone

* **New: Advanced Acoustic Health Insights:**
  * **Deeper Analytics:** The Acoustic Health Engine has been significantly expanded to evaluate your environment against even more WHO guidelines. New insights now track Cognitive Performance (focus environments), Cardiovascular Risk Trends, and Loud Leisure Noise exposure.
  * **Smarter Curation:** The dashboard now intelligently filters your insights, displaying only the most critical, highest-risk warning per category so you aren't overwhelmed with duplicate alerts.
* **UI: Dynamic "Expressive" Typography & Colors:**
  * **Data-Driven Fonts:** Introduced a completely new typography system (`HealthTypographyMapper`). The font size and weight of decibel values and warnings now dynamically scale up and become bolder as the noise levels or risk factors increase, making critical data instantly grab your attention.
  * **Themed Health Colors:** Health and success indicators now perfectly adapt their shades (Light/Dark) based on your system theme for maximum contrast and readability.
* **UI: Interactive Health Charts:**
  * **Sleep Analysis Revamp:** The Sleep Quality screen now features dynamic, data-driven charts. If noise spikes are detected, you'll see a detailed "Interruptions" bar chart; otherwise, you'll get a clear comparative Peak vs. Average chart.
  * **Ear Recovery (Fatigue) Chart:** Redesigned the Acoustic Fatigue history chart. It now filters out empty days, automatically scales to fit your data, and features larger touch targets with distinct shapes for met vs. unmet recovery goals.
  * **Noise Budget History:** Replaced the old "Success/Fail" badges with a fully interactive, tappable bar chart that shows your exact usage percentage for the past 4 weeks.
  * **Habit Pattern Heatmap:** The Habit Pattern screen now uses a richer "Heatmap" layout to visualize your daily noise exposure, alongside a new "Consistency Score" (0-100) that tracks how stable your listening habits are from day to day.
* **Refinement & UX:**
  * **Responsive Dialogs & Sheets:** Replaced older pop-up dialogs with modern, smooth Modal Bottom Sheets across the app (e.g., Duration Selection, Monitoring Mode, History Filters).
  * **History Filters:** The History filter menu now uses a much clearer multi-select list layout instead of chips, making it easier to combine filters. The "No Results" screen also intelligently suggests clearing active filters if nothing is found.
  * **Minimal Exposure States:** The main Noise Budget ring now displays a dedicated "Minimal Exposure" status if you've barely recorded any noise, rather than showing a tiny, unreadable fraction.

#### ⌚ Wear OS

* **UI: Global Localization (Shared):**
  * **Full Translation Support:** All the new features introduced in the 1.20 cycle—including Automated Backups, Custom Monitoring Intervals, Daily Routines, and all the new Acoustic Health Insights—have been fully translated across 17 languages (including Spanish, French, German, Japanese, and Portuguese).
* **Refinement (Shared):**
  * **Smoother Animations:** Day selection chips and settings buttons now use spring-based scaling animations that adapt to the button's size for a more tactile, premium feel.


## Version 1.20.0 Beta 3
*(Released February 26, 2026)*

This beta focuses heavily on **Personalization and Advanced Health Insights**. We have significantly expanded the Acoustic Health Engine to detect complex noise patterns and introduced fully customizable daily routines, allowing the app to adapt its analysis to your specific lifestyle.

#### 📱 Phone

* **New: Personalized Daily Routines:**
  * **Custom Sleep & Work Hours:** You can now define your exact Sleep and Work/Study schedules, including which days of the week you work.
  * **Smart Regional Defaults:** Even if you don't set a routine, the app now uses your time zone to intelligently guess standard sleep and work hours for your region (e.g., North America vs. East Asia).
  * **Material 3 Time Picker:** Upgraded the time selection interface to a modern, fully localized Material 3 picker. You can now toggle between a visual clock dial or direct keyboard input.
* **New: Advanced Acoustic Insights:**
  * **Workplace Stress:** The engine now specifically monitors your noise exposure during your personalized work hours and alerts you if levels exceed WHO stress thresholds.
  * **Pre-Sleep Noise:** A new analysis checks the 2-hour window before your scheduled bedtime, warning you if loud environments might disrupt your upcoming sleep quality.
  * **Interruption Tracking:** The app now detects "Constant Interruptions," warning you if your quiet periods are frequently broken by sudden noise spikes.
  * **Habit & Anomaly Detection:** Added insights to track long-term Monthly Progress and instantly flag "Daily Anomalies" (e.g., when a specific day is unusually quiet or loud compared to your weekly average).
* **UI & Layout Polish:**
  * **Exposure Dashboard:** The summary cards on the main dashboard have been enlarged for better readability. The "Dominant Noise" card now features an elegant crossfade animation, alternating between the percentage and the noise zone label.
  * **Insights Carousel:** Refined the spacing and sizing of the Health Insights carousel so cards fit perfectly on both compact phone screens and large tablet displays.

#### ⌚ Wear OS

* **New: On-Wrist Routine Management (Shared):**
  * **Custom Sleep & Work Hours:** You can now configure your Sleep schedule, Work hours, and Active Work Days directly from your watch via dedicated new settings screens.
  * **Wrist-to-Phone Sync:** Any changes you make to your routine on your watch instantly sync to your phone, ensuring the Acoustic Health Engine always has your latest schedule.
* **UI Polish & Interactions:**
  * **Exposure Settings Redesign:** The Exposure settings screen has been reorganized for clarity, neatly grouping Plus-exclusive features and adding a dedicated "Delete Data" button.
  * **Smart Loading States:** Added visual loading indicators when the app is fetching or updating your settings to prevent screen freezing.
* **New: Advanced Acoustic Insights (Shared):**
  * **Wrist-Powered Analytics:** The data collected by your watch during your newly defined Sleep and Work routines directly feeds into the expanded Acoustic Health Engine, powering the new Workplace Stress and Pre-Sleep Noise insights.


## Version 1.20.0 Beta 2
*(Released February 25, 2026)*

This major beta update introduces the **Acoustic Health Engine**, a powerful new analytics system that evaluates your listening habits against World Health Organization (WHO) guidelines. We've also completely overhauled the Exposure screen to look stunning on tablets and foldables, and made exposure alerts significantly smarter.

#### 📱 Phone

* **New: Acoustic Health Engine:**
  * **WHO Guidelines Integration:** The app now analyzes your sound exposure against official WHO thresholds, including weekly leisure max limits and daytime stress levels.
  * **Smart Insights:** Added new danger and warning insights for "No Ear Recovery" (when you have virtually no quiet time in 24 hours), "Daytime Stress", and "Sleep Quality" (evaluating noise between 11 PM and 7 AM).
  * **Health Insights Carousel:** A brand-new horizontal scrolling carousel on the Exposure screen displays your personalized health cards. The cards dynamically change color based on the risk level (Excellent, Normal, Warning, Danger).
* **UI: Adaptive Large Screen Layouts:**
  * **Tablet & Foldable Optimization:** The Exposure screen has been completely rewritten. On large screens, it now uses a beautiful two-column split layout, allowing you to view your charts and insights side-by-side with independent scrolling.
  * **Dynamic Backgrounds:** The top app bar and background now smoothly animate their colors as you scroll through your data.
  * **Dashboard Polish:** The central Noise Budget ring now features a split-text design to clearly show your usage status (e.g., "Exceeded" in red). Summary cards have also been enlarged for better touch targets and readability.
* **New: Advanced Alert Tracking:**
  * **Database Logging:** Exposure alerts are no longer just temporary notifications. They are now permanently logged to your database with full context (Threshold, Duration, Interval, and Source Device).
  * **Live dB Notifications:** When an exposure alert is triggered, the notification now displays the exact current decibel level that caused the warning.
  * **Backup Integration:** Your automated and manual backups now track and restore your entire alert history.
* **Refinement & UX:**
  * **Streamlined Settings:** Consolidated the monitoring toggle into a new "Master Switch" and improved the layout of exposure interval warnings. Enabling background monitoring now seamlessly prompts a Plus upgrade if you aren't subscribed.
  * **Responsive Permissions:** The "Permission Denied" screen has been updated to be fully responsive on all screen sizes and now includes a direct shortcut to your device settings.

#### ⌚ Wear OS

* **New: Acoustic Health Engine (Shared):**
  * **Wrist-Powered Analytics:** The background data collected by your watch now directly feeds into the new Acoustic Health Engine. Your wrist measurements will help calculate WHO-based metrics like Ear Recovery Time and Weekly Habit Patterns.
* **New: Advanced Alert Tracking (Shared):**
  * **Historical Logging:** Exposure alerts triggered while wearing your watch are now securely logged to the unified database (Room v6), preserving the exact decibel level and duration that triggered the warning.
  * **Live Context:** Watch-triggered alert notifications now intelligently include the real-time decibel value.
* **Core & Stability:**
  * **Database Upgrade:** The core database has been cleanly migrated to Version 6 to support the new alert context fields without losing your existing history.
  * **Code Optimization:** Applied `@Keep` annotations to critical internal models (like `MonitoringInterval` and `SourceDevice`) to ensure flawless data synchronization between your watch and phone under strict code shrinking rules.

## Version 1.20.0 Beta 1
*(Released February 25, 2026)*

This first beta for 1.20 introduces two highly requested features: **Automated Backups** to keep your history safely stored without lifting a finger, and **Custom Monitoring Intervals** to let you perfectly balance data accuracy with battery life across your devices.

#### 📱 Phone

* **New: Automated Local Backups:**
  * **Set and Forget:** You can now schedule automatic backups to run daily, weekly, or monthly.
  * **Drive Integration:** These automatic backups are saved securely in a dedicated local folder that fully supports Android's native Google Drive backup, ensuring your data is safe even if you change phones.
  * **Restore Hub:** We've completely redesigned the Backup & Sync settings into a cleaner list layout, featuring new modern Bottom Sheets for easily enabling schedules and restoring previous automatic backups.
* **New: Custom Monitoring Intervals:**
  * **Total Control:** You can now adjust how often the app measures background noise, ranging from every 5 minutes up to every 60 minutes.
  * **Smart Warnings:** The UI now provides helpful contextual warnings if your chosen interval might drain the battery too quickly (under 15 mins) or reduce data accuracy (over 30 mins).
* **UI & UX Polish:**
  * **Fluid Feature Cards:** Upgraded the "Feature Cards" with smoother, spring-based expand/collapse animations and dynamically rotating arrows for a more premium feel.
  * **Expanded Notifications:** System notifications have been upgraded to support expanded text blocks (`BigTextStyle`), ensuring you can comfortably read long alerts or backup statuses directly from your notification tray.

#### ⌚ Wear OS

* **New: Custom Monitoring Intervals:**
  * **Wrist Control:** You can now configure the background monitoring interval (5 to 60 minutes) directly from a new dedicated settings screen on your watch.
  * **Instant Sync:** Whatever interval you choose on your watch will automatically sync and apply to your phone (and vice versa).
* **UI Polish & Haptics:**
  * **Tactile Sliders:** Introduced a completely custom `WearInlineSlider` for both Interval Selection and Microphone Calibration. It now features precise haptic "ticks" for every adjustment step, making it much easier to configure settings on a small screen.

## Version 1.19.0
*(Released February 24, 2026)*

This major update transforms Pixel Pulse with an intelligent **Cross-Device Ecosystem**, massive performance scaling, and a refined history engine. We've introduced "Zero-Gap" automatic fallback monitoring, a 30-day offline grace period for Plus users on Wear OS, and silky-smooth high-performance waveforms to handle your largest recording sessions.

#### 📱 Phone

* **New: Zero-Gap Ecosystem Monitoring:**
  * **Fix Smart Fallback:** If your watch is disconnected or taken off-wrist in Automatic mode, the phone now intelligently detects the stale data state (5-minute threshold) and automatically takes over monitoring duties to ensure no data is lost.
  * **Contextual Notifications:** The notification engine has been completely rebuilt. It now clearly shows "Remote Active" or "Standby" states so you always know which device is actively monitoring. These alerts are fully localized across 17 languages.
* **New: High-Performance History Engine:**
  * **Visual Downsampling:** The waveform charts now use an intelligent peak-preserving downsampling algorithm, maintaining smooth 60 FPS scrolling even when viewing sessions spanning several hours.
  * **Multi-Filter System:** Apply multiple filters simultaneously. Filter your history by source (Phone vs. Watch), session type, and Favorites all at once via a modern Bottom Sheet.
  * **Smart Pagination & Selection:** Introduced "Load More" to dramatically reduce initial load times. A new "Select All" toggle intelligently filters across your *entire* database, not just what's visible on screen.
* **Visual & UI Polish:**
  * **Fluid Animations:** Re-engineered the background "Blob" animations for a completely smooth, jank-free experience.
  * **Unified Top Bar:** Standardized the header across the app with bold branding, integrated Plus gradients, and dynamic build badges.
  * **Restore Purchases:** A dedicated, modern Modal Bottom Sheet now handles Plus status restoration with real-time feedback and troubleshooting tips.
* **Core & Reliability:**
  * **Resilient Monitoring:** Added strict timeouts and a "Cycle Guard" to background measurements. This prevents overlapping audio cycles, eliminates race conditions, and safely handles microphone lockups.
* **Project Modernization:** Fully upgraded to Gradle 9.1, Android Gradle Plugin 9.0.1, Kotlin 2.2, and Java 17 for faster processing and a smaller app footprint.
* **Billing Stability:** Hardened the Play Store billing connection to strictly preserve your Plus status during temporary network timeouts and prevent concurrent API requests.
* 
#### ⌚ Wear OS

* **New: Premium Offline Persistence:**
  * **30-Day Grace Period:** The app now tracks your last successful Plus license sync. If you go off-grid, your premium features remain active for 30 days before requiring a phone connection.
  * **Sync Dashboard:** A new UI in settings displays the exact timestamp of your last license check and calculates your remaining offline days.
* **New: "Silky Smooth" Performance Engine:**
  * **GPU-Accelerated UI:** The Compass and Meter screens now cache heavy elements into GPU bitmaps, drastically reducing battery drain and CPU usage during active navigation.
  * **Async Analytics:** Heavy exposure calculations are now precomputed in the background, preventing UI stutters when opening the dashboard.
  * **Memory Optimization:** Added history pagination ("Load more") with smooth 300ms transition delays to conserve watch memory.
* **New: Tile & Complication Mastery:**
  * **Unified Data Layer:** Tiles and Complications now pull directly from the core `ExposureRepository`. They update instantly after a sync with your phone, ensuring your watch face is always accurate.
  * **Smart Loading:** Complications now feature intelligent loading states that only appear if the displayed data is older than 5 seconds.
  * **On-Demand Updates:** Removed background collectors from complications in favor of on-demand updates to significantly improve idle battery life.
* **Core & Reliability:**
  * **Rock-Solid Background Starts:** Replaced legacy broadcast receivers with a secure, transparent `QuickCheckActivity` trampoline. This ensures continuous monitoring launches reliably from your watch face on modern Wear OS versions without failing.

## Version 1.19.0 Release Candidate 2
*(Released February 22, 2026)*

This Release Candidate focuses on hardening the background monitoring architecture for Wear OS and polishing the notification system across the entire ecosystem. We've introduced a more robust activity-based trigger for quick checks and improved the clarity of cross-device notification states.

#### 📱 Phone

* **Notifications:**
  * **Clearer States:** Streamlined the notification engine to provide clearer, more concise messages for active, fallback, and remote-monitoring (standby) states. Notifications now feature a more compact data description for better readability.
* **UI Polish:**
  * **Settings Screen:** Removed an unnecessary status bar overlay (scrim) from the Settings screen, resulting in a cleaner, flush appearance.
* **Stability:**
  * **Data Layer:** Refined the internal preference repository with an updated caching mechanism for Plus user status synchronization, alongside minor formatting and documentation improvements.

#### ⌚ Wear OS

* **Core & Reliability:**
  * **Quick Check Architecture:** Replaced the previous broadcast-based Quick Check system with a secure, transparent `QuickCheckActivity` "trampoline." This ensures the continuous monitoring service launches reliably from Watch Face Complications and Tiles by adhering to strict OS background-start restrictions.
* **UI/UX Polish:**
  * **Interactive Feedback:** The new Quick Check architecture now includes user-facing toasts. If a background service launch fails, it gracefully prompts you to restart the service via the notification manager.
* **Notifications:**
  * **Clearer States:** Streamlined the notification engine to provide clearer, more concise messages for active, fallback, and remote-monitoring (standby) states. Notifications now feature a more compact data description for better readability.
* **Stability:**
  * **Data Layer:** Refined the internal preference repository with an updated caching mechanism for Plus user status synchronization, alongside minor formatting and documentation improvements.


## Version 1.19.0 Release Candidate 1
*(Released February 21, 2026)*

This Release Candidate finalizes the **Cross-Device Plus Experience** and significantly improves ecosystem reliability. We have introduced a 30-day grace period for plus access, a sophisticated license-sync dashboard for Wear OS, and completed a massive localization effort across 17 languages.

#### 📱 Phone

* **UI: Visual Refinement:**
  * **Fluid Blob Animations:** Re-engineered the background "Blob" animations. By persisting randomness across recompositions and scaling durations instead of using delays, the visuals are now smoother and free of "jank."
  * **Contextual Alerts:** Improved the "Standby" notification to clearly communicate when the phone has taken over monitoring because the remote device (watch) is disconnected.
* **New: Global Expansion:**
  * **Full Localization:** Added hundreds of localized UI strings for Beta settings, and Restore Flows across 17 languages, including Arabic, German, Spanish, French, Hindi, Italian, Japanese, Korean, Polish, Portuguese, Russian, Thai, Turkish, Vietnamese, and Chinese.
* **Stability:**
  * **Deduplication:** Applied `distinctUntilChanged` to the Plus-status flow to prevent redundant UI refreshes.

#### ⌚ Wear OS

* **New: Plus Persistence:**
  * **30-Day Grace Period:** The app now tracks the last successful license sync. If you go offline, your Plus features will remain active for 30 days before requiring a new check, ensuring uninterrupted service in remote areas.
  * **Optimized Syncing:** Implemented timestamp rounding (to 12-hour intervals) and deduplication for license data transfers. This reduces background battery drain and prevents redundant updates between your phone and watch.
* **New: Premium Sync Dashboard:**
  * **Sync Status Card:** A new UI in the settings displays the exact timestamp of your last license check and calculates the remaining days in your 30-day grace period.
  * **Live Purchase Sync:** When completing a purchase on your phone, the watch now displays a "Waiting for Phone" spinner and automatically dismisses the screen once the Plus status is synchronized.
* **Fix: Reliability Architecture:**
  * **Broadcast Trampoline:** Tiles and Complications now use a `QuickCheckReceiver` broadcast to trigger measurements. This improves reliability on Android 12+ by avoiding direct foreground service starts from static UI components.
  * **Smart Service Fallback:** The app now intelligently attempts a standard service start before falling back to a foreground service, optimizing system resource usage.
* **UI/UX Polish:**
  * **Interactive Toasts:** Added success toasts and haptic feedback when a Plus license is successfully detected.
  * **Standby Awareness:** Notifications now reflect the "Remote Disconnected" state if the phone is handling monitoring duties.
* **Stability:**
  * **Lifecycle Fix:** Corrected a critical service bug ensuring the `onDestroy` lifecycle event is handled properly for background tasks.
  * **Data Layer:** Refined internal coroutine logic and reflection-based timestamp fetching for faster, safer preference access.

## Version 1.19.0 Beta 2
*(Released February 20, 2026)*

This update focuses on **Ecosystem Reliability** and **Advanced History Management**. We have introduced a smart automatic fallback system to prevent data gaps when devices disconnect, alongside a powerful multi-filter engine for your session history.

#### 📱 Phone

* **New: Multi-Filter History Engine:**
  * **Combined Filtering:** You can now apply multiple filters simultaneously. Filter your history by source (**Phone vs. Watch**), session type (**Live Monitoring**), and **Favorites** all at once to find exactly what you need.
  * **Filter Bottom Sheet:** Replaced the top chips with a modern Modal Bottom Sheet for a cleaner UI. Active filters are now displayed as interactive InputChips with easy-remove actions.
  * **Sort Dropdown:** Streamlined the history header by replacing sort chips with a unified Dropdown Menu, maximizing screen space for your data.
* **New: Automatic Fallback System:**
  * **Zero-Gap Monitoring:** If your watch is disconnected or taken off-wrist in Automatic mode, the phone now intelligently detects the stale data state.
  * **Smart Thresholds:** Reduced the stale data threshold to **5 minutes**. When reached, the phone automatically takes over monitoring duties to ensure no data is lost.
  * **Contextual Notifications:** Updated the notification manager to show a "Remote Disconnected" standby message, clearly informing you which device is currently active and why.
* **Refinement & UX:**
  * **Haptic Feedback:** Added tactile "ticks" to all history actions, including sorting, filtering, and session removal.
  * **Data Integrity:** Refined the Exposure analysis logic to handle empty chart data correctly, ensuring the "Not Enough Data" state is shown instead of empty graphs.
  * **Animation Polish:** Fixed enter/exit transition glitches in the Backup Progress Sheet by implementing keyed content animations.
* **Core & Reliability:**
  * **Cycle Guard:** Introduced an internal `isMeasuring` flag to prevent overlapping measurement cycles, eliminating race conditions and redundant microphone activations.

#### ⌚ Wear OS

* **New: Automatic Fallback System:**
  * **Zero-Gap Monitoring:** If the watch is disconnected or taken off-wrist in Automatic mode, the system intelligently triggers a fallback flow.
  * **Smart Thresholds:** Reduced the stale data threshold to **5 minutes**, ensuring the ecosystem reacts faster to device state changes.
  * **Contextual Notifications:** Tiles and notifications now reflect the fallback state, providing clear status updates when the phone takes over monitoring.
* **New: Complication & Tile Optimization:**
  * **On-Demand Updates:** Completely re-architected the Complication services. By removing background collectors and switching to on-demand data production, we’ve significantly reduced idle battery drain.
  * **Complication Refresh:** Implemented a reflection-based update trigger that ensures all watch complications refresh instantly alongside tiles.
* **Performance & UX:**
  * **Service Startup Logic:** Refined service initialization to prioritize standard start actions, falling back to foreground services only when required by the OS. This improves startup speed and reduces system overhead.
  * **Smooth Pagination:** Introduced a `isLoadingMore` state with a subtle **300ms delay** to ensure loading transitions feel intentional and smooth.
  * **UI Polish:** Centered the loading spinners within the vertical pager and updated the layout to fill the maximum screen real estate on round displays.
  * **Loading UX:** The "Show more" button now features a centered loading spinner (24dp) and becomes disabled during fetching to prevent accidental duplicate loads.
* **Core & Reliability:**
  * **Cycle Guard:** A new internal guard prevents concurrent measurement cycles, ensuring stable microphone management and preventing duplicate data entries.
  * **Lifecycle Fix:** Corrected a critical service lifecycle bug where `onDestroy` was not being called correctly, improving long-term memory management.

## Version 1.19.0 Beta 1
*(Released February 19, 2026)*

This update marks a significant shift towards **Performance Scaling** and **UI Standardization**. We have introduced advanced data downsampling to handle massive datasets with ease, a unified Top Bar architecture, and a modern billing restoration experience.

#### 📱 Phone

* **New: High-Performance Waveforms:**
  * **Visual Downsampling:** The `ZoomableWaveform` now uses an intelligent peak-preserving downsampling algorithm. By aggregating data into visual "chunks" based on screen pixels, the app maintains smooth 60 FPS scrolling even when viewing sessions spanning several hours.
  * **Frame-Based Playback:** Rewrote the playback engine to use monotonic frame-based timing. This ensures that audio playback and visual progress remain perfectly synchronized regardless of processing load or selected speed.
* **New: Enhanced History & Bulk Actions:**
  * **Smart Pagination:** Introduced "Load More" and "Load All" controls to the history list. This reduces initial load times and memory footprint by fetching sessions incrementally.
  * **Intelligent Selection:** Added a "Select All" toggle to the contextual app bar with fluid scale animations. It now intelligently filters across your entire database, allowing you to select matching sessions even if they aren't currently visible on the screen.
  * **Interactive Controls:** Seek and playback buttons now feature a more modern, transparent, and rounded design with enhanced haptic feedback.
* **New: Visual Branding & Banners:**
  * **Unified Top Bar:** Standardized the header across Meter, History, and Exposure screens. It features a bold branding style, integrated Plus-user gradients, and dynamic build badges.
  * **Highlights Carousel:** The settings screen now features a "Highlights Banner" that auto-scrolls through multiple informational cards, such as "What's New" and "Premium Appreciation" notices.
  * **Dynamic Build Badges:** New expressive badges automatically identify Alpha, Canary, Dev, and Release Candidate builds with distinct color-pair gradients.
* **New: Subscription Management:**
  * **Restore Purchases UI:** A dedicated Modal Bottom Sheet now handles the restoration of Plus status. It provides real-time feedback (Loading, Success, Not Found) and built-in troubleshooting tips for network or Play Store connectivity issues.
* **Refinement & UX:**
  * **Related Settings:** Added "Looking for something else?" quick links at the bottom of settings pages to improve discoverability between related categories.
  * **Experimental Features:** Developers and power users can now long-press the version number in the "About" screen to toggle experimental UI features.
* **Project Modernization:**
  * **Gradle 9 & AGP 9:** Upgraded the entire project to the latest **Gradle 9.1** and **Android Gradle Plugin 9.0.1** for faster builds and better code shrinking.
  * **Kotlin 2.2 & KSP 2.0:** Fully migrated to the latest Kotlin compiler and KSP engine to optimize Hilt and Room performance.
  * **Java 17:** Standardized the build toolchain to JVM 17 using the latest Gradle compiler options.
* **Billing Stability:**
  * Prevented concurrent billing connection attempts to avoid Play Store service conflicts.
  * Improved status persistence; the app now strictly preserves your Plus status during temporary network timeouts.
* **General Fixes:**
  * Wrapped deep link navigation in safety guards to prevent crashes from malformed external routes.
  * Centralized all dependency versions using a project-wide **Version Catalog**.

#### ⌚ Wear OS

* **New: Performance "Silky Smooth" Engine:**
  * **GPU-Accelerated Display:** The Compass UI now separates static and dynamic layers, caching heavy elements into GPU-accelerated bitmaps. This drastically reduces CPU usage during active navigation.
  * **Async Analytics:** Heavy exposure calculations are now precomputed on background threads (`Dispatchers.Default`). This prevents UI stutters when opening the dashboard after long recording sessions.
  * **Split-Flow Sampling:** The app now samples rotation at 60Hz for fluid movement while downsampling secondary data (Altitude/Location) to preserve battery.
* **New: History Pagination:**
  * To conserve watch memory, the history screen now uses pagination similar to the phone app, including a "Load more" trigger at the bottom of the session list.
* **Project Modernization:**
  * **Gradle 9 & AGP 9:** Upgraded the entire project to the latest **Gradle 9.1** and **Android Gradle Plugin 9.0.1** for faster builds and better code shrinking.
  * **Kotlin 2.2 & KSP 2.0:** Fully migrated to the latest Kotlin compiler and KSP engine to optimize Hilt and Room performance.
  * **Java 17:** Standardized the build toolchain to JVM 17 using the latest Gradle compiler options.
* **Billing Stability:**
  * Prevented concurrent billing connection attempts to avoid Play Store service conflicts.
  * Improved status persistence; the app now strictly preserves your Plus status during temporary network timeouts.
* **General Fixes:**
  * Wrapped deep link navigation in safety guards to prevent crashes from malformed external routes.
  * Centralized all dependency versions using a project-wide **Version Catalog**.

## Version 1.18.0
*(Released January 30, 2026)*

This milestone update extends the Pixel Pulse ecosystem to your wrist with the launch of our dedicated Wear OS app, alongside a complete re-architecture of the phone experience. We have introduced military-grade encrypted backups, fully interactive charts, and an intelligent synchronization engine that seamlessly bridges your devices.

#### 📱 Phone

* **New: Immersive Interactive Charts:**
  Gain deeper insights into your sound environment with a completely rebuilt visualization engine that puts your data at your fingertips.
  * **Touch & Scrub Analysis:** Interact directly with your data using the new scrubbing engine. Drag your finger across daily exposure graphs to view precise decibel values for specific time blocks, featuring bars that scale dynamically as you touch them.
  * **Semantic Visuals:** Waveforms now utilize "Zebra Striping" and distinct semantic markers to help you visually distinguish between different recording events and sessions at a glance.

* **New: Industrial-Grade Data Security:**
  Your privacy is paramount. We have overhauled our storage architecture to ensure your sensitive recording data remains yours and yours alone.
  * **Native Encryption:** We have rebuilt the backup engine using a native C++ library, securing your data with high-performance encryption via a custom native secret key.
  * **Portable Backups:** You can now open `.ppbk` backup files directly from your file manager or email to instantly import history from another device.
  * **Streaming Architecture:** Exporting and importing massive history files is now instant and stable, utilizing a memory-efficient streaming engine that handles large datasets without compromising performance.

* **New: Intelligent Ecosystem:**
  Pixel Pulse is no longer just an app, it's a connected system. Your phone and watch now work in perfect harmony to capture every moment.
  * **Gapless Synchronization:** The app now performs a smart "Handshake" startup routine, detecting and filling any data gaps between your phone and watch automatically to ensure a unified history.
  * **Smart Monitoring Modes:** Introduced "Automatic" monitoring. The system intelligently determines which device (Phone or Watch) should handle background recording based on battery life and whether you are currently wearing your watch.
  * **Worn State Detection:** The phone app now detects your watch's on-wrist status in real-time to optimize battery usage and pause redundant monitoring.

* **New: Advanced History Management:**
  Managing your library of recordings has never been easier. We've added powerful tools to help you organize, find, and review your sessions.
  * **Smart Playback:** The audio player now features an **'Auto'** speed mode, intelligently adjusting playback velocity based on the session duration to help you review long recordings faster.
  * **Search & Filter:** Instantly locate specific sessions using the new Material 3 search bar, or filter your history by **Favorites**, **Date**, or **Name**.
  * **Metadata Inspection:** View deep technical details of any recording via the new Metadata Dialog, including the specific calibration offset and frequency weighting used.

* **Visual Overhaul:**
  A fresh coat of paint that goes beyond just looks. We've refined the interface to be more fluid, responsive, and delightful to use on any screen size.
  * **Expressive Cards:** Analysis cards have been redesigned with dynamic background tints, expanding animations, and "squircle" iconography for a premium feel.
  * **Adaptive Layouts:** The entire app now features a responsive design that adapts intelligently to foldables and tablets, including optimized landscape layouts and edge-to-edge support.
  * **Polished Notifications:** Critical alerts are now persistent to ensure you never miss a result, while success messages automatically clear themselves to keep your tray clean.

* **Core Experience & Reliability:**
  Under-the-hood improvements to ensure the app runs smoothly and complies with the latest standards.
  * **Policy Transparency:** Added a transparent update dialog to keep you informed about Terms of Service or Privacy Policy changes.
  * **Deep Link Support:** Improved navigation allows external links (from web or watch) to take you directly to specific screens, such as the Plus subscription page.
  * **Audio Stability:** Enhanced the recording engine with a fallback mechanism to ensure stability even on devices with non-standard audio hardware.

#### ⌚ Wear OS

* **New: Pixel Pulse for Watch:**
  Experience the full power of Pixel Pulse, reimagined for your wrist. It's not just a companion; it's a fully featured standalone tool.
  * **Immersive Meter:** A wrist-first experience featuring a reactive atmosphere background that breathes gently when idle and pulses with a radial glow in sync with real-time sound intensity.
  * **Remote Actions:** Seamlessly control your phone from your wrist. Use the watch to open policies, send feedback, or rate the app directly on your connected device.
  * **Morphing Controls:** Tactile animated shape buttons that physically morph their corners when pressed, providing satisfying visual and haptic feedback.
  * **Adaptive Typography:** A smart layout engine that automatically resizes and reflows decibel readings to ensure perfect visibility on any watch screen size or shape.

* **New: Wrist-Based Analytics:**
  Leave your phone in your pocket. You can now track your noise budget and analyze exposure trends directly on your watch.
  * **Exposure Dashboard:** A complete analytics suite on your wrist that displays your **Noise Budget**, **Daily/Weekly Charts**, and **Peak Levels** without needing your phone.
  * **Distribution Bars:** Visualize exactly how much time you spend in Quiet, Normal, or Loud environments with custom-built donut and bar charts optimized for circular screens.
  * **Daily Highlights:** Contextual insight cards that appear within the dashboard to highlight key stats, such as your "Quietest Day" or "Loudest Event."

* **New: Standalone Capability:**
  Built for independence. The watch app is designed to work flawlessly even when your phone is out of range or battery.
  * **Background Recording:** A robust foreground service keeps monitoring sound levels even when you lower your wrist or exit the app.
  * **Off-Body Intelligence:** The app utilizes low-latency sensors to detect when the watch is taken off, automatically entering **Standby Mode** to preserve battery.
  * **Service Recovery:** If the system interrupts monitoring to save resources, a smart "Service Reactivation" notification allows you to resume with a single tap.

* **New: On-Wrist Configuration:**
  Total control, right on your wrist. Tweak professional settings and calibration without ever opening the phone app.
  * **Professional Settings:** Adjust **Frequency Weighting** (A/C/Z), **Update Speed**, and **Noise Thresholds** directly from the watch.
  * **Calibration:** A dedicated screen allows you to fine-tune the microphone input offset to match professional equipment directly on your wrist.


## Version 1.18.0 Release Candidate 3
*(Released January 20, 2026)*

This release brings a massive functionality boost to your wrist! We've introduced a complete suite of **Interactive Tiles** and **Watch Face Complications**, transforming Pixel Pulse on Wear OS into a standalone monitoring powerhouse.

#### ⌚ Wear OS

* **New: Advanced Tiles Suite:**
  * **Current dB Tile:** Now features a **Quick Measure Button** to trigger a check directly from the tile, visualized with a new segmented circular progress indicator.
  * **Noise Budget Tile:** Displays your weekly usage with dynamic status text (Safe, Nearing, Exceeded) to keep you informed at a glance.
  * **Last 24h Tile:** A brand-new tile offering a **Bar Chart Visualization** of your sound exposure over the last day.
* **New: Watch Face Complications:**
  * **Seamless Integration:** You can now add **dB Level** and **Noise Budget** data directly to your favorite watch face.
  * **Rich Data:** Supports Short Text, Ranged Values (progress bars), and Small Images across compatible watch faces.
* **Stability & Experience:**
  * **Smart Error Handling:** Complications now feature clickable error indicators that allow you to retry failed updates without opening the app.
  * **Visual Polish:** Tiles now include "Preview" states for better configuration in the companion app and smoother loading animations.

## Version 1.18.0 Release Candidate 2
*(Released January 19, 2026)*

This update focuses on refined interactions, visual fluidity, and robust connectivity. We've overhauled the banner system with spring-based animations, added tactile feedback to charts, and hardened the synchronization logic between Phone and Watch.

#### 📱 Phone

* **New: Visuals & Animation:**
  * **Live Session Waveform:** The Live Session banner has been redesigned as a floating card featuring a real-time **animated audio waveform**, making active recording status instantly recognizable.
  * **Spring Physics:** InfoBanners now use a custom layout with **spring-based scale animations** for entry and exit, providing a more organic feel.
  * **Material 3 Polish:** The "Beta" badge and History Filter chips have been updated to modern pill-shaped designs with improved spacing and outlined/filled states.
* **New: Tactile Interactions:**
  * **Haptic Charts:** Scrubbing through the **Daily Exposure Chart** now triggers haptic feedback as you cross between bars, making data inspection physically responsive.
  * **Selection Logic:** Enhanced the selection experience in History Mode with clearer color contrasts (especially in Dark Mode) and the ability to toggle/deselect items directly.
* **Core Improvements:**
  * **Sound Exposure Onboarding:** Introduced a dedicated onboarding screen that adapts based on your subscription status (Activate vs. Upgrade) to guide you through exposure features.
  * **License Card:** The subscription management card is now flippable with a cleaner layout, distinguishing clearly between new and returning Plus users.
  * **Accessibility:** Improved color contrast for "Loud" and "Very Loud" decibel levels in Dark Mode to ensure text remains legible against vibrant indicators.
* **Stability & Sync:**
  * **Smart Fallback:** If the remote (watch) data becomes stale or the Wearable API is unavailable, the phone automatically falls back to its own microphone to ensure continuous monitoring.
  * **Connection Robustness:** Added explicit handling for API connection failures to prevent crashes or log spam during sync operations.
* **Notifications:**
  * **Remote Active State:** Notifications now intelligently display the **"Remote Active"** status, clearly indicating when the monitoring is being powered by your watch versus the phone.

#### ⌚ Wear OS

* **Stability & Sync:**
  * **Smart Fallback:** If the remote (watch) data becomes stale or the Wearable API is unavailable, the phone automatically falls back to its own microphone to ensure continuous monitoring.
  * **Connection Robustness:** Added explicit handling for API connection failures to prevent crashes or log spam during sync operations.
* **Notifications:**
  * **Remote Active State:** Notifications now intelligently display the **"Remote Active"** status, clearly indicating when the monitoring is being powered by your watch versus the phone.

## Version 1.18.0 Release Candidate 1
*(Released January 16, 2026)*

This is the final polish before our major public release! We've focused on perfecting the layout for all screen sizes, ensuring rock-solid stability, and finalizing translations for our global community.

#### 📱 Phone

* **New: Adaptive Layouts & Insets:**
  * **Edge-to-Edge Perfection:** We've refined how the app handles system bars (status/navigation) across the entire app. Screens now draw beautifully behind system UI with safe padding for cutouts and gesture areas.
  * **Large Screen Optimization:** History, Settings, and Meter screens now adapt intelligently to tablets and foldables, utilizing specific "Expanded" layouts with proper window insets.
* **New: Notification Logic:**
  * **Persistent Alerts:** Critical notifications (like Backup Success/Failure) are now persistent to ensure you never miss the result of a long operation.
  * **Auto-Reset:** Success notifications automatically clear themselves after a short delay to keep your tray clean.
* **UI Polish:**
  * **Cleaner Favorites:** The favorite star icon in lists now only appears for favorited items, reducing visual clutter.
  * **Meter Layout:** The main dB meter now dynamically hides less critical labels on very small screens to preserve readability of the main value.
* **Globalization:**
  * **100% Translated:** Added missing translations for all new features (Backup, Monitoring Modes, Exposure Insights) across all 15+ supported languages.

#### ⌚ Wear OS
* **Globalization:**
  * **100% Translated:** Added missing translations for all new features (Backup, Monitoring Modes, Exposure Insights) across all 15+ supported languages.

## Version 1.18.0 Beta 7
*(Released January 14, 2026)*

**Wear OS Beta:** The watch app graduates to Beta with a massive visual polish! On the phone, we've introduced interactive charts and a refined backup experience.

#### 📱 Phone

* **New: Interactive Charts:**
  * **Touch Scrubbing:** You can now touch and drag across the **Daily Exposure Chart** to view specific decibel values for any time block. Bars scale up dynamically as you interact with them.
  * **Visual Refresh:** The **Weekly** and **Monthly** analysis cards now feature new pill-shaped bars, animated progress tracks, and clearer labels.
* **New: Expressive UI Overhaul:**
  * **Insight Cards:** Completely redesigned with dynamic background tints, expanding animations, and "squircle" iconography.
  * **Noise Budget:** Now features a custom-drawn **Capsule Progress Bar** for a premium look.
  * **Distribution:** The Donut chart now highlights the dominant noise zone in the center and features a cleaner legend.
* **New: Backup Experience:**
  * Moved the Backup/Restore progress from a simple dialog to a modern **Modal Bottom Sheet**.
  * Added smooth transitions between states (Preparing, Encrypting, Uploading) to prevent UI flickering.
* **New: Smart Ecosystem:**
  * **Worn State Sync:** The phone now knows if you are wearing your watch. It uses this real-time status to optimize battery usage in "Automatic" monitoring mode (e.g., pausing phone monitoring when the watch is on your wrist).
  * **Notification Actions:** Added **"Measure Now"** and **"Retry"** buttons directly to service notifications.

#### ⌚ Wear OS

* **New: Meter Redesign:**
  * **Adaptive Layout:** The main dB meter now automatically resizes text based on your screen shape, ensuring perfect visibility on all watch sizes.
  * **Reactive Background 2.0:** The background now "breathes" gently when idle and switches to a reactive radial glow when recording.
  * **Animated Buttons:** Replaced static controls with **Morphing Shape Buttons** that animate their corners when pressed, providing satisfying visual and haptic feedback.
* **New: Service Recovery:**
  * Introduced a **Service Reactivation Screen**. If the background monitoring service is killed by the system, a smart notification helps you restart it with a single tap.
* **New: Data Sync:**
  * The watch now actively broadcasts its **"Off-Wrist"** state to the phone to help coordinate monitoring duties.

## Version 1.18.0 Beta 6
*(Released January 12, 2026)*

This update introduces industrial-grade security for backups, "gapless" synchronization, and intelligent battery management.

#### 📱 Phone

* **New: Native Secure Backups:**
  * **C++ Encryption:** We've moved our security core to a native C++ library. Backups are now encrypted with a high-performance native secret key, making them significantly more secure.
  * **Streaming Engine:** Implemented a new memory-efficient streaming architecture. You can now export and import massive backup files without crashing the app or freezing the UI.
  * **Progress UI:** Added a detailed **Backup Progress Dialog** to track export/import status in real-time.
* **New: Gapless Data Sync:**
  * **High watermark:** The app now performs a smart "Handshake" with your watch on startup to detect and request any missing data gaps.
  * **Smart Merge:** The database now intelligently merges sessions, ensuring that if you have data on both devices, the highest quality version is preserved.
* **New: Intelligence & Monitoring:**
  * **Automatic Mode:** The default monitoring mode is now **"Automatic"**. The system intelligently decides which device (Phone or Watch) should handle recording based on battery and active state.
  * **Centralized Notifications:** Completely rewrote the notification system (`PixelPulseNotificationManager`) for consistent alerting across foreground services and exposure warnings.
* **UI/UX:**
  * **Responsive Layouts:** Session and Playback screens now adapt dynamically to screen width, looking perfect on foldables and tablets in landscape mode.

## Version 1.18.0 Alpha 11
*(Released January 12, 2026)*

**Wear OS:** This update makes the watch app smarter about battery usage and data transmission.

#### ⌚ Wear OS

* **New: Off-Body Detection:**
  * The monitoring service now utilizes the low-latency off-body sensor. If you take the watch off, the app automatically enters **Standby Mode** to stop recording and save battery.
* **New: Batched Synchronization:**
  * To respect system limits and save power, the watch now sends exposure data in optimized **Batches** rather than real-time streams, while still maintaining near-instant sync when the phone requests it.
* **Improvement:**
  * **Standby Logic:** improved logic to pause microphone usage immediately when the watch is not the active master device or is off-wrist.
  * **Sync Handshake:** The watch now listens for "Handshake" requests from the phone to re-send any missing historical data.

## Version 1.18.0 Beta 5
*(Released January 10, 2026)*

This update transforms how you analyze your data with **Immersive Charts** and overhauled **History Management**.

#### 📱 Phone

* **New: Immersive Analysis:**
  * **Semantic Markers:** Charts now feature "Zebra Striping" and icon markers to visually distinguish between different recording events and sections.
* **New: Advanced History Management:**
  * **Filter & Sort:** A new toolbar allows you to filter by **Favorites** or sort sessions by **Date** and **Name**.
  * **Fast Scroller:** Navigate through years of recordings instantly with a new invisible side-scrubber for dates.
  * **Search:** Added a dedicated Material 3 search bar to quickly find sessions by name.
* **New: Session Metadata:**
  * Added a **Metadata Dialog** to view technical details of a recording, including the Calibration offset, Frequency Weighting, and Update Speed used during the session.
* **UI: Adaptive Design:**
  * **Landscape Support:** Completely refactored the Session and History screens to look great in landscape mode, optimizing space for tablets and foldables.
  * **Responsive Layouts:** Buttons and controls now dynamically resize and rearrange based on the available screen width.

## Version 1.18.0 Beta 4
*(Released January 9, 2026)*

This update refines the Session History experience, adds intelligent playback controls, and enhances the connection with your wearable.

#### 📱 Phone

* **New: Auto Playback Speed:**
  * Introduced a smart **'Auto'** playback speed option. The app now dynamically adjusts playback speed based on session duration (targeting ~15s), making it easier to review long recordings quickly.
  * Revamped the **Playback Speed UI** with clearer visual states and a dedicated Auto option.
* **New: Monitoring Modes (Plus):**
  * Added a new **Monitoring Mode** selection in Exposure Settings. Plus users can now choose which device handles background monitoring: **Phone Only**, **Watch Only**, or **Hybrid (Both)**.
  * Settings changes (thresholds, enabled state) now instantly sync to the Watch.
* **UI: History & Sessions:**
  * **Redesigned Session Items:** List items now feature animated transitions, better visual hierarchy, and display key stats (Avg/Max dB, Duration) directly on the card.
  * **Empty States:** Added beautiful placeholder UI and dashed charts for sessions with missing or empty data.
  * **Loading Indicators:** The History screen now shows a proper loading state while fetching data.
  * **Selection Overlays:** Refactored selection mode for a smoother experience when managing multiple items.
* **Visuals:**
  * **Charts:** Replaced the standard doughnut chart with a custom **Animated Donut Chart** in the Noise Distribution card.
  * **Marquee:** Added scrolling text effects to long labels (e.g., Sync switches) to prevent truncation.
* **Performance & Fixes:**
  * **Audio Stability:** Added a fallback mechanism to use the standard MIC source if UNPROCESSED audio is not supported by the device, and fixed a crash when stopping the recorder.
  * **Sampling:** The main meter now throttles UI updates based on your selected "Update Speed" preference, improving performance.
  * **Sync:** Improved logging and stability for the Wearable Data Listener service.


## Version 1.18.0 Alpha 10
*(Released January 9, 2026)*

A massive update to the Exposure Dashboard and User Experience, bringing feature parity with the phone app.

#### ⌚ Wear OS
* **New: Exposure Dashboard 2.0:**
  * **Insights & Highlights:** Added **Daily Highlights** (e.g., "Quiet Day") and contextual **Insight Cards** interleaved with your charts.
  * **Section Headers:** Organized the dashboard with clear headers (Daily Summary, Weekly Trends, Peaks).
  * **Scroll Hint:** Added a dynamic "Scroll Hint" at the top of the screen that updates as you scroll through different dashboard sections.
  * **Visuals:** Unified card shapes and added "Distribution Bars" to visualize noise zones.
* **New: Settings & Navigation:**
  * **Monitoring Mode:** Added a screen to select **Phone**, **Watch**, or **Both** for background monitoring (syncs with phone).
  * **Alert Configuration:** Replaced small steppers with dedicated **Slider Screens** for setting Noise Threshold and Duration, making it easier to adjust on a small screen.
  * **Structure:** Moved settings to a dedicated route and improved navigation logic.
* **New: User Experience Hub:**
  * Completely redesigned the "Plus" status screen with **Gradient Cards**, shimmer effects, and a clear list of unlocked benefits.
* **Audio & Playback:**
  * **Auto Speed:** Added the 'Auto' playback speed logic to the watch player.
  * **Warmup:** Implemented a 1-second warmup period for the microphone to prevent audio artifacts at the start of recordings.
  * **Stability:** Added placeholders for the player UI when decibel data is missing.
* **UI Polish:**
  * **Marquee Text:** Long texts in cards, policy dialogs, and info links now scroll automatically for better readability.
  * **Policy Dialog:** Redesigned the Legal/Policy dialog with modern Wear OS chips and icons.
  * **Charts:** Localized labels for "Peak" and "Avg" in chart cards.

## Version 1.18.0 Beta 3.1
*(Released January 7, 2026)*

#### 📱 Phone
* **Fix:** Resolved a ProGuard/R8 obfuscation issue affecting `Moshi` serialization and enum fields, ensuring data is saved and loaded correctly.

## Version 1.18.0 Alpha 09
*(Released January 7, 2026)*

#### ⌚ Wear OS
* **Fix:** Resolved a ProGuard/R8 obfuscation issue affecting `Moshi` serialization and enum fields, ensuring data is saved and loaded correctly.


## Version 1.18.0 Beta 3
*(Released January 7, 2026)*

This update focuses on legal compliance, data portability, and refining the user experience for backups and onboarding.

#### 📱 Phone
* **New: Policy Transparency:** Introduced a transparent **Policy Update Dialog**. You will now be notified when Terms of Service or Privacy Policies change, with direct links to review them.
* **New: Backup Import via File:** The app now supports opening `.ppbk` (Pixel Pulse Backup) files directly from your file manager or email attachments.
* **New: Data Settings:** Added a dedicated **"Data & History"** settings screen to manage backups, view last sync timestamps for both Phone and Watch, and manually export/import data.
* **Security:** Backups are now encrypted using AES-GCM to ensure your sensitive session data remains private.

## Version 1.18.0 Alpha 08
*(Released January 7, 2026)*

This massive update introduces the **Exposure Analytics** dashboard to your wrist. You can now analyze your sound environment in detail without reaching for your phone.

#### ⌚ Wear OS

* **New: Exposure Dashboard:** A comprehensive new screen displaying your **Noise Budget**, **Daily/Weekly Charts**, and **Peak Levels**.
* **New: Detailed Views:** Tap on any card in the dashboard to drill down into detailed reports:
  * **Daily/Weekly/Monthly:** View bar charts of your exposure over time.
  * **Distribution:** See a donut chart breaking down how much time you spent in Quiet, Normal, or Loud environments.
  * **Peaks:** Track the loudest sounds recorded each day.
* **New: Visualizations:** Built custom, high-performance **Bar** and **Donut Charts** specifically designed for small circular screens.
* **New: Budget Insight:** A dedicated card shows your remaining "Safe Listening" budget for the day.
* **Settings:** Added a toggle to show/hide the Exposure screen in the main navigation loop.
* **New: Policy Integration:** The Wear OS app now includes the Policy Update Dialog, ensuring legal compliance directly on the wrist.
* **Localization:** Added "Terms of Use" strings for all 15+ supported languages.

## Version 1.18.0 Alpha 07
*(Released January 4, 2026)*

This update implements the **Synchronization & Backup** infrastructure, ensuring your watch data is safe and consistent with your phone.

#### ⌚ Wear OS

* **New: Sync Engine:** The app can now synchronize recorded sessions from your Watch to your Phone.
  * **Manual Sync:** Select specific sessions in History to send, or use the "Sync All" button.
  * **Auto Sync:** Sessions are automatically queued for sync immediately after recording (configurable).
  * **Status:** Added icons to the History list indicating which sessions are safely synced to the phone.
* **New: Sync Settings:** A dedicated settings screen to control synchronization behavior.
* **New: Exposure Settings:** Configure background monitoring directly from the watch.
  * **Alerts:** Set custom dB thresholds and duration triggers for noise alerts.
  * **Data Management:** Added a "Delete Exposure Data" screen with a safety "Slide-to-Confirm" UI.
* **New: Debug Tools:** Added a hidden Debug menu for developers to populate test exposure data.
* **Core:** Migrated data models to a shared domain to ensure consistent logic between Phone and Watch apps.

## Version 1.18.0 Alpha 06
*(Released January 3, 2026)*

This update introduces the complete **History & Playback** ecosystem. You can now save, manage, and view to your recordings directly from your wrist.

#### ⌚ Wear OS

* **New: Session History:** A dedicated **History Screen** allows you to browse saved sessions grouped by month. Includes support for "Select All", batch deletion, and toggling favorites.
* **New: On-Watch Playback:** Implemented a full **Session Player** with db visualization, play/pause controls, and adjustable playback speed.
* **New: Session Actions:** Added powerful management tools. You can now **Rename** sessions (using the on-screen keyboard), **Delete** them with a confirmation dialog, or view detailed metadata.
* **New: Save Flow:** When you stop a recording, a new **Save Screen** appears, allowing you to review the session stats before choosing to save or discard.

## Version 1.18.0 Alpha 05
*(Released January 2, 2026)*

* **New: Background Service:** Recording is now handled by a robust **Foreground Service**. This ensures uninterrupted recording even if you lower your wrist, complete with a live notification showing real-time dB levels.
* **UX:** Improved permission handling with dedicated "Locked" screens for denied Microphone or Notification permissions, guiding the user to settings if needed.

## Version 1.18.0 Beta 2
*(Released January 1, 2026)*

This update prepares Pixel Pulse for the upcoming Wear OS companion app. We've built the bridges needed for the two devices to talk to each other, improved deep linking, and refined the feedback system to understand where your reports are coming from.

#### 📱 Phone
* **New: Smart Feedback Source:** The feedback system is now context-aware. If you send a report triggered from your Watch, the phone app knows it, helping us debug wearable-specific issues faster.
* **New: Expanded Deep Links:** Added support for new navigation routes (like `/buy`), allowing external triggers (such as the Watch app) to take you directly to specific screens like the Plus purchase page.
* **Fix:** Improved the reliability of the Billing Client connection when resuming the app.

#### ⌚ Wear OS
* **New: Plus Status Sync:** We've added a background listener service that communicates with your watch. When you upgrade to **Pixel Pulse+** on your phone, your watch will automatically unlock premium features without you needing to do a thing.

## Version 1.18.0 Alpha 04
*(Released January 1, 2026)*

**Wear OS:** This update brings the Meter to life! We've implemented the core real-time monitoring interface and the synchronization engine.

* **New: Immersive Meter UI:** The main screen now displays live decibel readings with a beautiful **Reactive Background** that pulses and changes color based on sound intensity.
* **New: Recording Controls:** You can now Start, Stop, and Reset recordings directly from your wrist. A new timer shows your session duration.
* **New: Plus Syncing:** The app now listens to your phone for subscription updates. If you are a Plus user, your watch app will automatically unlock premium settings.
* **New: User Experience Screen:** Added a dedicated screen in Settings to view your current plan status and force a sync if needed.


## Version 1.18.0 Alpha 03
*(Released December 29, 2025)*

**Wear OS:** This update focuses on professional tools and deep configuration options.

* **New: Audio Calibration:** Added a dedicated **Calibration Screen**. You can now manually adjust the microphone input offset directly on the watch to match professional equipment.
* **New: Advanced Settings:** Implemented selection dialogs for **Frequency Weighting** (A/C/Z) and **Update Speed**, allowing you to tune the meter's behavior.
* **New: Info Screen:** A new hub accessible via vertical swipe, displaying quick status info and shortcuts to settings.
* **UI:** Added "Smart Toggles" to the Info screen cards—tap to cycle options, long-press to view the full list.

## Version 1.18.0 Alpha 02
*(Released December 28, 2025)*

**Wear OS:** This update introduces the navigation structure and remote phone interactions.

* **New: Remote Interactions:** Your watch can now control your phone! Added buttons to **Open Privacy Policy**, **Send Feedback**, and **Rate App** which automatically launch the corresponding action on your connected phone.
* **New: Redesigned 'About' Screen:** A complete visual overhaul for the About section, featuring the new remote action buttons.
* **New: Onboarding Overlay:** Added a helpful animated overlay to guide users on how to swipe between the Meter and Info screens.
* **Navigation:** Implemented the vertical pager system, allowing seamless transition between the main Meter and the Info/Settings stack.

## Version 1.18.0 Alpha 01
*(Released December 27, 2025)*

**Wear OS:** Initial foundation release.

* **New:** Initial project setup for **Pixel Pulse on Wear OS**.
* **Visuals:** Added the animated Splash Screen, adaptive launcher icons, and the base Material 3 theme implementation.
* **Core:** Integrated logging and basic preference storage.

## Version 1.18.0 Beta 1
*(Released December 23, 2025)*

This beta release focuses on architectural improvements, enhanced deep linking capabilities, and a major cleanup of legacy web assets to support our new cloud infrastructure.

#### 🌐 Web & Infrastructure
* **New: Premium Web Portal:** We have replaced the old static documentation with a fully rebuilt, high-performance **React Portal** (`apps.fertwbr.com`).
* **Enhanced User Experience:** In-app links (Help, Privacy) now lead to a modern site featuring **Instant Navigation**, **Dynamic Material 3 Theming** (that matches the app's look), and **AI-Powered Translations** in 6 languages.
* **Cleanup: Repository Hygiene:** Removed legacy web assets (`docs/`, `website-content/`) from the app package. This reduces the project size and ensures you always see the most up-to-date documentation from the cloud.

#### 📱 Phone
* **New: Deep Link Support:** Added robust deep linking for the `/buy` route (`pixelpulse://open/buy`), allowing external sources (like our website or future Wear OS app) to direct users straight to the Plus subscription screen.
* **New: Source Tracking:** The app now intelligently tracks the source of deep links (e.g., "Web", "WearOS") to provide context-aware feedback and analytics.
* **Improvement: Smart URL Handling:** Refactored the URL generation logic into a shared module, ensuring consistent, themed links to our new web portal across the app.
* **Fix: HTTPS Verification:** Updated `assetlinks.json` and manifest intent filters to support verified App Links for both `fertwbr.github.io` (legacy) and `apps.fertwbr.com` (new).

## Version 1.17.0
*(Released December 16, 2025)*

This is a massive update focused on **Deep Customization** and **User Experience**. We've introduced a powerful drag-and-drop editor for the Meter Toolbar, expanded theming options, and completely rebuilt the subscription, onboarding, and feedback flows with a modern, responsive design.

#### 📱 Phone
* **New: Meter Toolbar Editor(Plus):** You can now fully customize the main action bar! Use the new **Drag-and-Drop Editor** in settings to reorder, add, or remove actions (like Speed, Theme, Calibration) to suit your workflow.
* **New: App Theme Colors (Plus):** Personalize Pixel Pulse with **9 new color palettes**, including **Emerald**, **Sunset**, **Purple**, **Crimson**, **Teal**, and more.
* **New: AMOLED Theme Mode(Plus):** Added a dedicated AMOLED option that switches the app to a pure black background for battery savings on OLED screens.
* **New: Redesigned Subscription Flow:** The entire "Plus" experience has been reimagined with responsive layouts optimized for all screen sizes:
    * **User Experience Screen:** Formerly "Your Plan," this screen now features a **Flippable License Card**, animated status badges, and clearer benefit grouping.
    * **Welcome Screens:** Brand new "Welcome to Plus" and "Welcome Back" screens greet you with animated headers and clear feature highlights.
    * **Expired Screen:** A helpful new layout guides you when your plus status ends, showing exactly which features are paused and which settings are backed up.
* **New: Smart Feedback System:** Sending feedback is now a seamless experience. The new bottom sheet features **Draft Autosave** (so you never lose your text) and **Context-Aware Guidance** to help you write better reports.
* **New: Enhanced Session Naming:** New recordings are now automatically named with the date and a daily sequence number (e.g., "Dec 16 • #1") for better organization.
* **New: "What's New" Redesign:** The update screen features a fresh look with animated, expandable feature cards and a split layout optimized for tablets and foldables.
* **Settings Overhaul:**
    * **Customization Hub:** A new settings section consolidates Themes, Haptics, and Toolbar editing.
    * **Dedicated Exposure Settings:** Exposure alerts and monitoring settings have been moved to their own dedicated screen for easier access.
* **Improvement: Settings Backup:** Your custom Meter Toolbar layout and App Theme color are now automatically backed up and restored for Plus users.
* **Improvement: Smarter Noise Budget:** The Weekly Noise Budget card now provides dynamic insights and tips based on your remaining "safe" days.
* **Visual Polish:**
    * **Empty History:** A beautiful new look for when you haven't recorded any sessions yet.
    * **Permissions:** The "Microphone Permission Denied" screen has been modernized with clear steps and animations.
    * **Dynamic Icons:** The Theme button in settings now updates its icon dynamically to match the active mode.
    * **Refined Text:** Updated descriptions for Plus benefits to be clearer and more descriptive.
* **Performance:** Images for banners and changelogs are now loaded dynamically from the cloud, significantly reducing the app's install size.

## Version 1.16.0
*(Released November 18, 2025)*

This release brings a fresh look to Pixel Pulse with a brand new app icon and introduces powerful new ways to share your data. You can now generate and share beautiful images of your session summaries and charts. We've also made the Noise Budget card smarter and more dynamic.

#### 📱 Phone
* **New: Shareable Image Exports:** You can now export your session summaries and waveform charts as beautiful images, perfect for sharing. A new **Preview Dialog** lets you see exactly what the image looks like before saving or sharing.
* **New: Fresh Visual Identity:** We've refreshed the app with a bolder, more consistent **App Icon** and **Splash Screen** design.
* **Improvement: Smarter Noise Budget:** The Weekly Noise Budget card has been overhauled. It now features an animated progress bar, a "Days Remaining" counter, and provides **Dynamic Insights** to help you manage your exposure throughout the week.
* **UX:** Added confirmation messages (Toasts) when saving images to your gallery for better feedback.

## Version 1.15.8
*(Released October 20, 2025)*
#### 📱 Phone
* **Fix:** Removed unused highlight color and tinting logic from the notification service, simplifying the code and removing unnecessary dependencies.

## Version 1.15.7
*(Released October 19, 2025)*

This update focuses on enhancing the user experience for Samsung devices by adopting platform-specific UI features for notifications.

#### 📱 Phone
* **New:** Introduced a custom brand highlight color to the Samsung notification UI for improved visual consistency.
* **Improvement:** Enhanced the live session notification on Samsung devices by including the notification title, making it clearer.
* **Fix:** Improved the `FileLogger` to use a dedicated coroutine scope, enhancing logging performance and thread safety during background operations.

## Version 1.15.6
*(Released October 18, 2025)*

This release introduces a richer, custom notification experience for users on Samsung devices and provides more at-a-glance information in the general monitoring notification.

#### 📱 Phone
* **New:** Added custom, richer notification layouts for live sessions specifically for Samsung devices, improving the user experience with dedicated expanded and collapsed views.
* **Improvement:** The continuous monitoring service notification now shows the last measurement value and the last check time directly in the notification for better visibility.


## Version 1.15.5
*(Released October 16, 2025)*

This release overhauls the background service's reliability and startup logic, making it more robust and efficient.

#### 📱 Phone
* **Improvement:** Replaced the device reboot receiver with a more reliable periodic **Service Health Worker**. This worker ensures the monitoring service is running as expected and prompts you to restart it if needed, improving reliability and modernizing service management.
* **Improvement:** Simplified and strengthened the service state synchronization logic on app startup to ensure continuous monitoring is always active when it should be.
* **New:** Added a one-time cleanup of legacy background tasks on app startup to ensure a smooth transition for users updating from older versions.

## Version 1.15.4
*(Released October 15, 2025)*

This update improves how the app behaves after a device restart and adds special support for Samsung's notification features.

#### 📱 Phone
* **Improvement:** Instead of automatically restarting, the app now shows a notification prompting you to restart monitoring after a device reboot. This complies with modern Android standards and gives you more control.
* **New:** Added support for Samsung's **"Ongoing Activity"** notification style, enhancing the appearance and integration of the live session notification on Samsung devices.

## Version 1.15.3
*(Released October 6, 2025)*

This is a major architectural update that replaces the old background monitoring system with a more reliable and efficient foreground service.

#### 📱 Phone
* **New:** Migrated background sound monitoring from a WorkManager-based system to a more reliable persistent **foreground service**. This significantly improves the consistency of background monitoring.
* **New:** Introduced an `AppLifecycleManager` to intelligently pause background monitoring when the app is in the foreground, preventing resource conflicts and ensuring a smooth user experience.
* **New:** Added haptic feedback to key UI actions (like activating monitoring) and introduced a **"Beta" badge** to clearly mark new features.
* **Improvement:** Replaced the old permission dialog with a more informative **Activation Bottom Sheet** for a clearer and more user-friendly process to enable background monitoring.
* **Improvement:** Enhanced the accuracy of the weekly noise budget calculation using a more precise noise dose methodology.


## Version 1.15.2
*(Released October 5, 2025)*

A patch release focused on improving the live session notification and user interface consistency.

#### 📱 Phone
* **Improvement:** The live session notification progress bar now reflects the **elapsed session time** rather than the average dB level, providing a more intuitive sense of progress.
* **Fix:** Removed a dependency on MaterialTheme from the notification service, simplifying the code and improving performance.
* **UI:** Replaced several hourglass icons with podcast icons for better visual consistency throughout the app.

## Version 1.15.1
*(Released October 5, 2025)*

This release revamps the Live Session feature with a more intuitive setup flow and visualizes your session data with a new sparkline chart.

#### 📱 Phone
* **New:** Redesigned the "Start Live Session" screen with a **multi-step flow** for a more guided and user-friendly setup.
* **New:** Added a **sparkline chart** to the live session summary dialog to visualize your sound exposure over the entire session.
* **Improvement:** Included a helpful tip specifically for Samsung users on how to enable the enhanced live notification style for the best experience.


## Version 1.15.0
*(Released October 4, 2025)*

This version introduces a modern notification style for live sessions and improves the robustness of background monitoring.

#### 📱 Phone
* **New:** Introduced a modern, enhanced notification for live exposure sessions on newer Android versions, featuring a **progress bar** and a real-time **dB status chip**.
* **Improvement:** Updated all notification icons for better visibility and a cleaner look.
* **Fix:** Improved the resilience of background audio recording with a new retry logic, making it more reliable when system resources are busy.
* **Fix:** Prevented background sound sampling when a live session is already active to avoid resource conflicts.

## Version 1.14.0
*(Released October 3, 2025)*

This is the first stable release of Pixel Pulse, marking its graduation from the initial alpha and beta phases. This landmark update introduces **Live Sound Exposure Monitoring**, a powerful new way to track your sound exposure in real-time for specific durations. We've also significantly enhanced the existing Sound Exposure Analysis with more detailed charts, deeper insights, and a more intuitive user interface.

#### 📱 Phone
* **New: Live Sound Exposure Monitoring:** You can now start a "Live Session" to actively monitor your sound exposure for a set duration (e.g., a concert, a work shift). The feature runs as a foreground service, providing a real-time notification with a sparkline chart of your exposure.
* **New: Live Session Summaries:** At the end of a live session, you'll receive a detailed summary card with key metrics like duration, average/max decibels, and your noise budget consumption.
* **New: Deeper Exposure Insights & Charts:**
    * **Noise Distribution Chart:** A new donut chart shows you the percentage of time you've spent in different noise zones (e.g., Quiet, Moderate, Loud).
    * **Weekly Peaks Analysis:** A bar chart visualizes the loudest event for each of the last 7 days.
    * **New Metrics:** The analysis now includes weekday vs. weekend averages and identifies the loudest time of day (morning, afternoon, or night) based on your weekly patterns.
* **Improvement: Smarter & More Contextual Insights:** The insight engine is now much more powerful. It compares your daily exposure to your weekly average, identifies patterns in your weekly habits, and analyzes your monthly consistency to provide more personalized and actionable advice.
* **UX: Configurable Live Update Rate:** You can now choose the data update frequency for live sessions, balancing real-time detail with battery efficiency.
* **UX: Deep Link Notifications:** Tapping a notification from a Live Session or a background alert now takes you directly to the Exposure screen.

## Version 0.13.0-beta
*(Released October 1, 2025)*

Introducing **Pixel Pulse+**! This release brings an optional premium subscription to unlock advanced features and support future development. We've built a robust system to automatically back up your Plus settings and created a seamless experience for managing your subscription, ensuring your personalized setup is always safe.

#### 📱 Phone
* **New: Introducing Pixel Pulse+:** An optional subscription to unlock exclusive features, including advanced sound analysis, professional frequency weighting, customizable haptics, and more powerful export options.
* **New: Automatic Settings Backup & Restore:** Plus members' settings are now automatically backed up. If your subscription lapses and you return, you can restore your personalized setup with a single tap.
* **New: Redesigned Subscription Screens:** Enjoy a seamless experience with new welcome screens for new and returning Plus members, screens for expired subscriptions, and clearer information on your current plan.
* **Improvement: Feature Gating & Upgrade Prompts:** Premium features are now clearly marked throughout the app. Non-Plus users will see friendly prompts to upgrade when accessing these features.


## Version 0.12.0-beta
*(Released September 30, 2025)*

This update focuses on making background Sound Exposure monitoring much more reliable. The monitoring task now runs as a foreground service to comply with modern Android standards, ensuring it isn't unexpectedly terminated by the system.

#### 📱 Phone
* **Improvement: Reliable Background Monitoring:** The Sound Exposure worker now runs as a foreground service with a persistent notification while active, making it significantly more reliable and less likely to be stopped by the OS.
* **New: Developer Debug Screen:** A new debug section in settings (on debug builds) provides tools to view logs, trigger background tasks, and populate sample data for easier testing and feedback.
* **Fix:** The background worker now handles audio recording failures more gracefully, preventing errors from stopping the monitoring schedule.


## Version 0.11.1-beta
*(Released September 30, 2025)*

A quick maintenance release to add full translation support for all recent features and polish the user interface for tablets and large-screen devices.

#### 📱 Phone
* **New: Full Internationalization:** Added full translation support for all recent features (like the new Onboarding and Exposure Analysis screens) into our 15+ supported languages.
* **UI Polish:** Made several UI adjustments for a more polished experience, including ensuring that dialogs with long content are now scrollable and adding haptic feedback to the navigation rail.


## Version 0.11.0-beta
*(Released September 30, 2025)*

This release brings full internationalization and a completely redesigned user experience for tablets and other large-screen devices. Every major screen now adapts its layout to make the most of the available space, and the app is now fully translated into over 15 languages.

#### 📱 Phone
* **New: Full App Translation:** The entire app is now available in over 15 languages, including Spanish, French, German, Japanese, Portuguese, and more.
* **New: Two-Pane Layout for Large Screens:** On tablets and foldables, the **Meter**, **History**, and **Exposure** screens now use a responsive two-pane layout, showing your data and controls side-by-side for a much-improved experience.
* **Improvement: More Reliable Background Monitoring:** The background task scheduler has been re-architected for better reliability, ensuring that Sound Exposure monitoring is more consistent.
* **Improvement: Polished UI & Interactions:** Added haptic feedback to the navigation rail, made long dialogs scrollable, and improved the labeling on exposure charts for a more polished user experience.


## Version 0.10.0-beta
*(Released September 29, 2025)*

This update is all about creating a more welcoming and informative experience. We've introduced a brand-new, fully animated onboarding flow for new users and a "What's New" screen to highlight changes after an update. The settings screen and large-screen navigation have also been completely overhauled.

#### 📱 Phone
* **New: Full Onboarding Experience:** A new, multi-page animated guide introduces new users to all the app's features, from the real-time meter to the new sound exposure analysis.
* **New: "What's New" Screen:** After an update, you'll see a new screen with confetti animations highlighting the latest changes and a button to view the full changelog.
* **New: Redesigned Adaptive Settings:** The settings screen has been completely restructured with new sub-sections (**General**, **Meter**, **Haptics**) and support for a two-pane layout on tablets for easier navigation.
* **New: Navigation Rail for Tablets:** The app now automatically switches to a side navigation rail on larger screens for better ergonomics and layout.
* **Improvement: Immersive Onboarding Haptics:** Added custom haptic feedback patterns that sync with the onboarding animations for a more immersive and delightful first-time experience.


## Version 0.9.0-beta
*(Released September 29, 2025)*

This release significantly expands the Sound Exposure feature. You can now analyze your sound environment over longer periods with new weekly and monthly reports. The underlying data processing and insights have also been made much smarter and more accurate.

#### 📱 Phone
* **New: Weekly & Monthly Exposure Analysis:** The analysis screen now provides reports for your weekly and monthly sound exposure, in addition to the daily view, giving you a comprehensive overview of your listening habits.
* **Improvement: Smarter Insights & Trends:** The analysis insights are now more intelligent. The app can detect trends in your monthly exposure and provides helpful feedback even on "normal" exposure days.
* **Improvement: More Accurate 24-Hour Chart:** The daily chart now uses a true sliding 24-hour window for its data and clearly highlights the current hour with a "Now" label, making the analysis more accurate and easier to read.
* **UX: Interactive & Informative Cards:** All cards on the exposure screen are now more interactive, providing visual and haptic feedback when tapped. New info banners also guide you in granting the necessary permissions for reliable background monitoring.

## Version 0.8.0-alpha
*(Released September 28, 2025)*

This release introduces a powerful new feature: **Sound Exposure Analysis**. Understand your listening habits over time with daily, weekly, and monthly reports, and get smart insights to protect your hearing. We've also polished the app's look and feel with new animated buttons and navigation icons.

#### 📱 Phone
* **New: Sound Exposure Analysis:** A brand-new screen (previously 'Alerts') dedicated to analyzing your sound exposure. The app can now monitor levels in the background, providing you with **daily, weekly, and monthly reports** on your listening habits.
* **New: Smart Insights & Noise Budget:** The analysis screen provides personalized insights based on your exposure data and helps you track your "noise budget" to understand safe listening limits according to established standards.
* **New: Background Monitoring & Notifications:** With your permission, the app can monitor sound levels periodically in the background and notify you if you've been exposed to potentially harmful noise levels for too long. Monitoring can even resume automatically after your device reboots.
* **Improvement: Expressive UI & Animations:** We've replaced many standard buttons with new, custom-animated buttons that provide a delightful "squish" effect when pressed. Navigation icons also feature new animations for a more polished feel.
* **UX: Informational Dialogs:** You can now tap on any analysis card to open a dialog with a detailed explanation of what the metrics mean, helping you better understand your sound environment.

## Version 0.7.0-alpha
*(Released September 27, 2025)*

This is a major update focused on user experience and interactivity. We're introducing a comprehensive haptic feedback system, including a unique 'Ambient Haptics' feature that responds to sound levels. We've also added advanced controls for playback speed and a new session export feature for sharing your data.

#### 📱 Phone
* **New: Comprehensive Haptic Feedback System:** Feel your sound with a brand-new haptic system. Enable **"Ambient Haptics"** for feedback that scales with decibel levels, adjust the overall intensity in settings, and enjoy tactile responses when scrubbing through playback and interacting with buttons.
* **Improvement: Advanced Speed Controls:** We've enhanced the speed controls for both live monitoring and session playback. You can still tap to cycle through speeds, but now you can also **long-press** the speed button to open a dialog and directly select the speed you want.
* **New: Session Data Export:** You can now export your saved session data. A new export sheet in the session detail screen allows you to share your recording data as a text summary or a detailed **CSV file**.
* **UI Polish:** Introduced new "wavy" dividers for a unique visual touch and improved various layouts to better handle system navigation bars and screen space.


## Version 0.6.0-alpha
*(Released September 26, 2025)*

This release marks a significant visual and functional upgrade. We've replaced our third-party charting library with a completely custom-built solution, resulting in smoother, more beautiful waveform animations.

#### 📱 Phone
* **Improvement: All-New Custom Waveform Charts:** We've replaced the previous charting library with our own custom-built solution. This results in smoother animations, a more minimal and polished look, and better interactive performance when scrubbing through your history.
* **Improvement: Animated Chart Colors:** The session detail playback chart now animates its color based on the decibel level, providing better visual feedback during playback.
* **Fix:** The animation for the minimal waveform chart has been refactored for better stability and smoother transitions.


## Version 0.5.0-alpha
*(Released September 25, 2025)*

This update focuses on improving the app's core lifecycle and permission handling. We've integrated support for in-app updates and reviews, and refined the initial permission request flow for a smoother first-time experience.

#### 📱 Phone
* **New: In-App Updates:** The app will now prompt you when a new version is available on the Play Store, allowing you to update directly from within the app.
* **New: In-App Review Prompts:** To help us grow, the app will now occasionally ask for a review on the Play Store after you've used it a few times.
* **Improvement: Refined Permission Flow:** The initial microphone permission request is now better integrated with the app's startup sequence and splash screen, creating a smoother and more logical first-time user experience.


## Version 0.4.0-alpha
*(Released September 24, 2025)*

This update introduces a major navigation overhaul, creating a more intuitive and modern user experience. We've added a new bottom navigation bar with expressive animations, a brand new 'Alerts' screen, and polished the user interface across the entire app for better consistency and visual appeal.

#### 📱 Phone
* **New: Modern Bottom Navigation:** A completely new bottom navigation bar has been implemented, making it easier and faster to switch between the Meter, History, and new Alerts screens.
* **New: 'Alerts' Screen:** Introduced a dedicated screen for future alert features, establishing the foundation for upcoming sound-level notification capabilities.
* **New: Expressive Navigation Animations:** Navigation is now more delightful and intuitive. Icons bounce and rotate upon selection, and screen transitions use a smooth shared-axis animation for better visual feedback.
* **New: Data Privacy Link:** Added an informational link on the History screen to provide users with clear access to data privacy details.
* **Improvement: Consistent UI Padding & Insets:** Reworked the handling of window insets and padding across multiple screens (History, Settings, Meter) to ensure a more consistent and polished edge-to-edge layout.
* **Improvement: Expressive Decibel Label:** The decibel status label on the meter screen has been upgraded to a new, animated component for a more dynamic and visually engaging display.
* **Improvement: Updated Icons:** The main navigation icons have been updated to be more representative of their functions (Speed, ListAlt, Campaign).

***

## Version 0.3.1-alpha
*(Released September 24, 2025)*

This release focuses on minor but important bug fixes and build optimizations.

#### 📱 Phone
* **Fix: String Formatting:** Corrected the string formatting for the average and maximum decibel values to ensure they always display correctly.
* **Fix: Build Warnings:** Resolved ProGuard build warnings related to `sun.misc.Cleaner` to ensure a cleaner and more stable release build.

***

## Version 0.3.0-alpha
*(Released September 24, 2025)*

This is a landmark update focused on measurement precision and customizability. We've replaced the core audio processing engine with a more advanced system, introducing professional-grade frequency weighting and giving you more control over how the meter behaves.

#### 📱 Phone
* **New: High-Precision Measurement Engine:** The app's core audio recording system has been upgraded from `MediaRecorder` to `AudioRecord` with a custom Fast Fourier Transform (FFT) implementation. This provides significantly more accurate decibel analysis.
* **New: A/C/Z Frequency Weighting:** You can now choose between A-weighting, C-weighting, and Z-weighting (no weighting) from the settings. This allows for more professional and context-aware sound level measurements.
* **New: Meter Settings Dialogs:** The settings screen now features a dedicated 'Meter' section with new dialogs that allow you to easily configure Update Speed, Calibration, and the new Frequency Weighting options.
* **Improvement: Enhanced Settings UI:** The settings dialogs for meter options have been redesigned to be more user-friendly, with added descriptions and improved layouts to help you understand each option.

***

## Version 0.2.0-alpha
*(Released September 23, 2025)*

This release introduces a complete and powerful session history and management system. You can now save your recordings, review them in detail with an interactive chart, and organize them with tools like search, favorites, and batch editing.

#### 📱 Phone
* **New: Full Session History:** The app can now save your recording sessions. A new History screen displays all your saved sessions, conveniently grouped by month.
* **New: Interactive Playback Chart:** A new Session Detail screen allows you to dive deep into any recording. It features an interactive chart that visualizes the entire session's decibel levels over time, complete with a draggable playback marker for precise scrubbing.
* **New: Full Playback Controls:** The detail screen includes controls to play, pause, and seek through your recorded sessions, allowing for a thorough review.
* **New: Advanced Session Management:**
    * **Multi-Select & Batch Actions:** Long-press any session to enter selection mode, allowing you to delete multiple recordings at once.
    * **Favorites:** Mark important sessions as favorites with a star icon for quick identification.
    * **Rename Sessions:** You can now rename any saved session for better organization.
* **New: History Search:** A new search bar on the History screen lets you quickly find specific sessions by name.
* **Improvement: Enhanced UI & Accessibility:** The session list items have been redesigned for clarity, now showing a favorite indicator and key stats. The UI also includes better accessibility with localized content descriptions for controls.
* **Improvement: Smooth Chart Scrubbing:** The playback chart's scrubbing and scrolling behavior has been optimized for a smooth and responsive experience.

***

## Version 0.1.0-alpha
*(Released September 22, 2025)*

This is the initial release of Pixel Pulse, establishing the core functionality of a modern, feature-rich, and beautifully designed sound level meter.

#### 📱 Phone
* **New: Real-Time Decibel Meter:** A highly responsive decibel meter provides at-a-glance sound level readings with an expressive, color-coded gauge.
* **New: Live History Chart:** A real-time chart visualizes the last few seconds of sound levels, giving you immediate context for spikes and changes.
* **New: Core Session Statistics:** The meter screen displays essential statistics for the current recording session, including the minimum, average, and maximum decibel levels.
* **New: Recording Controls:** Easily start, stop, and reset your recording session with animated, intuitive action buttons.
* **New: Microphone Calibration:** A calibration feature allows you to apply a decibel offset, ensuring more accurate readings tailored to your device's microphone.
* **New: Configurable Update Speed:** A dedicated button lets you cycle through Slow, Normal, and Fast update speeds for the meter, balancing responsiveness with readability.
* **New: Comprehensive Settings:** A full settings screen provides control over the app's behavior, including:
    * **Theme Selection:** Choose between Light, Dark, or System Default themes.
    * **Keep Screen On:** An option to prevent the device from sleeping while the app is active.
    * **About & Help:** A dedicated section for getting help, providing feedback, and viewing open-source licenses.
* **New: Modern Material 3 Design:** The app is built from the ground up with Material 3, featuring a minimalist design, dynamic color animations, a custom Roboto Flex font for beautiful typography, and an animated splash screen.