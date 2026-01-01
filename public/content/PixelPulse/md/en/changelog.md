# Version History
Track the evolution of Pixel Pulse. Here you'll find a detailed log of new features, improvements, and fixes for each version.

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