# Version History
Track the evolution of Pixel Compass. Here you'll find a detailed log of new features, improvements, and fixes for each version.

## Version 1.15.3
*(Released January 16, 2026)*

This update focuses on **Visual Fluidity** and **UI Refinements**. We've tuned the compass rendering engine to handle high-performance sensors flawlessly.

#### 📱 Phone
* **Fix: Silky Smooth Animation:** We resolved an issue where the compass needle could appear "jittery" or stuck on devices with high-frequency sensors (60Hz+). The needle movement is now fluid and responsive, regardless of your device's sensor speed.
* **UI: Layout Polish:**
  * **Feature Carousel:** Refined layout calculations for the "What's New" carousel and grid items to ensure perfect alignment on all screen sizes and densities.
  * **Purchase Screen:** The purchase footer now uses a responsive flow layout, improving how buttons are arranged on smaller screens or when using large fonts.
  * **Visuals:** Updated colors on the Premium Benefit cards for better contrast and consistency with the system theme.
* **Fix: RTL Support:** Icons in the Policy update dialogs now correctly mirror for Right-To-Left languages (e.g., Arabic, Hebrew).

#### ⌚ Wear OS
* **UI: Modern Policy Dialog:** The Terms & Privacy dialog has been completely redesigned to match the latest Wear OS standards. It now features a prominent header icon, improved typography, and large, accessible action chips.

## Version 1.15.2
*(Released January 10, 2026)*

This update focuses on compliance, stability, and refining the purchase experience for all user tiers.

#### 📱 Phone
* **New: Policy Management:** Implemented a transparent **Policy Update Dialog**. Users will now be notified when Terms of Service or Privacy Policies change, with direct links to review them within the app settings and About screen.
* **UI: Lifetime Card Redesign:** The "Lifetime Upgrade" card has been redesigned with a modern gradient background and improved typography to better highlight the premium offering.
* **UI: Smart Purchase Footer:** The purchase sticky footer is now context-aware, correctly differentiating between **Plus**, **Legacy**, and **Subscriber** users to show only relevant upgrade options.
* **Fix: Widget Stability:** Added robust error handling to the `SensorService` to prevent crashes when updating Glance widgets that may have been removed or are temporarily unavailable.

#### ⌚ Wear OS
* **New: Policy Integration:** The Wear OS app now includes the **Policy Update Dialog**, ensuring legal compliance and transparency directly on the wrist.
* **i18n:** Added localized strings for "Terms of Use" across all supported languages.


## Version 1.15.1
*(Released January 6, 2026)*

Welcome to 2026! This release introduces a highly requested accessibility feature and visual refinements.

#### 📱 Phone
* **New: Night Vision Theme:** A new, high-contrast **"Red Light"** theme is now available for **FREE** to all users. This theme preserves night vision by using red tones for dark modes.
* **Visuals:** Refreshed the color palettes for **Orange (Sunset)** and **Brown (Earth)** themes, making them more vibrant and natural.
* **Fix: Theme Logic:** Fixed an issue where free users could unintentionally select paid themes. Logic for "System" and "Night Vision" (Free) vs. Paid themes is now strictly enforced.
* **Fix: Haptics Guard:** Ensured that Mechanical Haptics settings are correctly locked behind the Plus subscription.
* **New:** Added full Russian translations for the "What's New" section.
* **Update:** Localized "Night Vision" strings across all supported languages.
* 
#### ⌚ Wear OS
* **New: Night Vision:** The "Red Light" theme is also available on Wear OS, perfect for maintaining low-light visibility during night hikes.
* * **Visuals:** Refreshed the color palettes for **Orange (Sunset)** and **Brown (Earth)** themes, making them more vibrant and natural.
* **UI: Compass Readability:** Added a bold **'N'** label to the North mark (0°) on the compass dial for faster orientation.

## Version 1.15.0
*(Released January 2, 2026)*

Welcome to **Pixel Compass 1.15**! This major update focuses on **Performance**, **Professional Tools**, and **Ecosystem Synergy**. We've completely overhauled the calibration experience, introduced NATO Mils for pros, made the app significantly faster, and brought your Phone and Watch closer together.

#### 🚀 Performance & Stability
* **Baseline Profiles:** We’ve optimized the app's core code. Startup times are now **26.5% faster** on Phone and **19.2% faster** on Watch.
* **Under the Hood:** A complete migration to **Timber** logging and refined sensor logic ensures better stability and battery life across the board.

#### 📱 Phone
* **New: Mechanical Haptics (Plus):** Feel the direction. This feature simulates the physical sensation of mechanical gears engaging as the compass dial rotates.
* **New: Professional Tools:**
  * **NATO Mils:** You can now switch the azimuth display unit to **6400 Mils** for professional/military use.
  * **Imperial Altitude:** Manual altitude input and display now supports **Feet (ft)**.
  * **Arrow Customization:** Choose between a single needle or a double arrow, and toggle between Cardinal Letters or Degree markers on the ring.
* **New: Compass Widget 2.0:**
  * **Rotation Modes:** Configure your widget to use a **Rotating Dial** (Classic) or **Fixed North-Up** (Needle moves).
  * **Visual Polish:** Refined designs for "Style" variants and dynamic bitmap generation.
* **New: Advanced Calibration UI:** A completely rebuilt calibration experience featuring a dynamic "figure-8" morphing animation, haptic feedback, and smart sensor accuracy detection.
* **New: Smart Notifications:** The foreground service notification now displays live **Temperature**, **Weather Conditions**, and **UV Index**.
* **New: Ecosystem & Web:**
  * **Deep Links:** Smarter links (e.g., `pixelcompass://`) allow for seamless navigation.
  * **Web Portal:** Access our new premium web portal at `apps.fertwbr.com` with verification.
* **Weather UI Overhaul:** Redesigned Astronomy charts, clearer Precipitation "Zero States," and localized Wind Direction labels.

#### ⌚ Wear OS
* **New: 60fps Experience:** The compass now uses dual-layer caching to render at a buttery smooth **60 frames per second**.
* **New: Settings Overhaul:** A reorganized menu with dedicated dialogs for "True North," "Advanced Data," and "Invert Compass."
* **New: Remote Interactions:** Trigger actions on your phone directly from your watch (e.g., open Privacy Policy, Buy Plus).
* **New: About Screen:** A complete visual redesign with quick actions to rate the app or send feedback.
* **Improvement:** The **Compass Tile** now uses smart throttling to save battery while keeping data fresh.


## Version 1.15.0 Release Candidate 1
*(Released December 29, 2025*

This is the final step before the public release. We have consolidated all features from the beta cycle, polished the UI, and finalized translations.

#### 📱 Phone
* **Final Polish:** Refined the **Compass Widget**
* **Localization:** Finalized translations for all new features (Calibration UI, Widget Config, and Deep Links) across all 15+ supported languages.
* **UI Polish:** Adjusted scale factors and padding for **PILL** and **ARCH** widget shapes to ensure perfect visual alignment.
* **Refactor:** Renamed all "Pro" UI references to "Plus" for consistency with the new branding.
* **Fix:** Improved Locale handling by using `Locale.Builder` with SIM Country ISO for more accurate region formatting.
* **Fix:** Refined the "Plus Required" view with improved icon hierarchy and padding.

#### ⌚ Wear OS
* **Localization:** Finalized translations for all new features (Calibration UI, Widget Config, and Deep Links) across all 15+ supported languages.

## Version 1.15.0 Beta 7
*(Released December 26, 2025)*

This update focuses exclusively on the **Compass Widget**, bringing a refreshed design to the "Style" variants and introducing new experimental configuration options.

#### 📱 Phone
* **New: Compass Widget Rotation (Beta):** We added a new configuration toggle for the Compass Widget. You can now choose between:
  * **Rotating Dial:** The entire compass rose rotates (Classic behavior).
  * **Fixed North-Up:** The rose stays fixed, and an indicator needle moves to show direction.
* **Visual Polish:** Updated the design for the "Style" versions of the Compass Widget to support dynamic bitmap generation.
* **Refinement:** Adjusted padding and layout for the **PILL** widget shape to ensure the new compass elements fit perfectly.
* **UI:** Added a "BETA" badge to experimental features in the widget configuration screen to clearly identify new capabilities being tested.

## Version 1.15.0 Beta 6
*(Released December 24, 2025)*

This update is dedicated to **Performance and Stability**. We have implemented Baseline Profiles across both platforms and optimized sensor usage to make the app significantly faster and more efficient.

#### 📱 Phone
* **Performance Boost:** Integrated **Startup Compilation Baseline Profiles**.
  * **The Verdict:** App startup time is now **26.5% faster**.
* **Fix:** Resolved a bug where the user-selected theme would delay applying for 2 seconds after the app opened.
* **Fix:** Addressed a potential crash in notifications when string resources were missing.
* **Fix:** Corrected an issue where the "Welcome to Plus" screen could enter a navigation loop.

#### ⌚ Wear OS
* **Performance Boost:** Implemented Baseline Profiles for the watch app, achieving a **19.2% improvement** in startup times.
* **Optimization:** Refactored the **Compass Tile**, introducing smart sensor throttling to reduce battery drain and system load while keeping the tile responsive.
* **Fix:** Solved an issue where tiles could cause performance hiccups by requesting data too aggressively.


## Version 1.15.0 Beta 5
*(Released December 22, 2025)*

This is a massive feature drop. We are introducing **Mechanical Haptics**, deeper Compass Customization, **Smart Notifications**, and a completely overhauled Weather UI.

#### 📱 Phone
* **New: Mechanical Haptics (Plus):** Feel the movement. This feature simulates the sensation of mechanical gears engaging as the compass dial rotates (note: increases battery usage).
* **New: Compass Customization:**
  * **Arrow Style:** Choose between a single needle or a double arrow.
  * **Indicator Format:** Toggle the compass ring between Cardinal Letters (N, S, E, W) or Degrees (0°, 90°, 180°).
* **New: App Shortcuts:** Long-press the app icon on your home screen to quickly access **Level**, **Settings**, or **Feedback**.
* **Weather UI Overhaul:**
  * **Precipitation:** Added a new "Zero State" visual for when no rain is expected.
  * **Astronomy:** Redesigned Sun Path and Moon Phase charts with distinct section headers.
  * **Wind:** Added localized wind direction labels to forecast charts.

## Version 1.15.0 Beta 4
*(Released December 20, 2025)*

This update focuses on **visual refinement and stability**. We have completely redesigned the Widget Debug experience, added smarter weather insights, and performed a major "under-the-hood" cleanup to improve app performance and logging.

#### 📱 Phone
* **New: Smart Notifications:** The foreground service notification has been upgraded. Instead of a generic "Sensor Active" message, Plus users now see live **Temperature**, **Weather Conditions**, and **UV Index** directly in the notification shade.
* **New: OSS Licenses Screen:** Added a dedicated screen in Settings to display Open Source Software licenses, ensuring proper attribution and compliance.
* **Improvement: Widget Debug UI:** A complete redesign of the Widget Debug info card. It now features a cleaner, modern layout with better empty states and organized info boxes.
* **Improvement: Wind Charts:** Added localized wind direction labels directly below the bars in the Wind Forecast Chart for easier reading.
* **Visual Polish:** Replaced standard buttons with **Animated Shape Buttons** across the app (Welcome, Error, and Subscription screens) for a more fluid and responsive feel.

#### ⚙️ Under the Hood
* **Performance:** We've replaced the internal logging system with **Timber**, improving error tracking and stability across both Phone and Watch.
* **Optimization:** Refactored the Compass Sensor logic to reduce battery usage and improve the smoothness of the needle movement (increased update granularity to 16ms).

## Version 1.15.0 Beta 3
*(Released December 18, 2025)*

This beta introduces a **brand-new Calibration experience** shared across both Phone and Watch, along with a massive overhaul of the Wear OS settings menu to make customization easier.

#### 📱 Phone
* **New: Advanced Calibration UI:** The calibration screen has been rebuilt from scratch. It now features:
  * **Morphing Animation:** A dynamic "figure-8" guide that changes shape based on your movement speed.
  * **Haptic Feedback:** Distinct vibration patterns now confirm when calibration succeeds or alert you if it times out.
  * **Smart Detection:** The app now checks sensor accuracy *before* prompting you to calibrate.
  * **Feedback:** Clear success/failure screens to let you know if the sensor is ready.
* **New: Imperial Altitude:** You can now manually input and view reference altitude in **Feet** (ft) as well as Meters. The app remembers your preference.

#### ⌚ Wear OS
* **New: Settings Overhaul:** We've reorganized the entire Settings menu. Critical options like **Unit Selection** (Imperial/Metric, Azimuth, GPS Format) are now at the top for quick access.
* **New: Dialog Settings:** The simple toggles for "True North", "Advanced Data", and "Invert Compass" have been upgraded to dedicated dialog screens that explain exactly what each feature does before you enable it.
* **Improvement: 60fps Performance:** The compass display now uses dual-layer caching. Static elements and dynamic elements (like the compass rose) are rendered separately, ensuring a buttery smooth 60fps experience.
* **Visual Polish:** The Compass Style selection screen now features improved pager animations and clearer "Applied" states.
* **New: Advanced Calibration UI:** The calibration screen has been rebuilt from scratch. It now features:
  * **Morphing Animation:** A dynamic "figure-8" guide that changes shape based on your movement speed.
  * **Haptic Feedback:** Distinct vibration patterns now confirm when calibration succeeds or alert you if it times out.
  * **Smart Detection:** The app now checks sensor accuracy *before* prompting you to calibrate.
  * **Feedback:** Clear success/failure screens to let you know if the sensor is ready.
* **New: Imperial Altitude:** You can now manually input and view reference altitude in **Feet** (ft) as well as Meters. The app remembers your preference.

## Version 1.15.0 Beta 2.1
*(Released December 16, 2025)*

This update finalizes the integration with our new web ecosystem and cleans up the project structure.

#### 🌐 Web & Infrastructure
* **New: Premium Web Portal:** We have replaced the old static documentation with a fully rebuilt, high-performance **React Portal** (`apps.fertwbr.com`).
* **Enhanced User Experience:** In-app links (Help, Privacy) now lead to a modern site featuring **Instant Navigation**, **Dynamic Material 3 Theming** (that matches the app's look), and **AI-Powered Translations** in 6 languages.
* **Cleanup: Repository Hygiene:** Removed legacy web assets (`docs/`, `website-content/`) from the app package. This reduces the project size and ensures you always see the most up-to-date documentation from the cloud.
#### 📱 Phone
* **New: App Link Verification:** Added intent filters for `apps.fertwbr.com`, enabling verified deep links that open directly in the app without browser redirection.
* **Refactor:** Unified URL handling logic with a new shared utility that generates consistent, theme-aware links for both Phone and Watch.

#### ⌚ Wear OS
* **Improvement: About Screen UI:** Further polished the "About" screen with a cleaner layout for version information and standardized button styles using tonal colors.
* **Improvement: Themed Links:** Action buttons now generate URLs that respect the user's active theme color, providing a seamless visual transition from Watch to Phone browser.

## Version 1.15.0 Beta 2
*(Released December 15, 2025)*

This beta improves the synergy between your Phone and Watch. We've introduced deep linking to allow smoother interactions between devices (like opening the purchase screen on your phone from your watch). We've added professional compass units and - for Wear OS users - a completely redesigned "About" screen.

#### 📱 Phone
* **New: Deep Link Support:** The app now handles intelligent links (e.g., `pixelcompass://open/buy`). This allows other apps (like our Watch app) to direct you to specific screens seamlessly.
* **Improvement: Smarter Feedback:** The feedback system now detects the source of the report. If you send feedback triggered from your Watch, we'll know, helping us debug wearable-specific issues faster.
* **New: Compass Unit Selection:** For professional use, you can now switch the azimuth display unit between **Degrees (360°)** and **NATO Mils (6400)** in the settings.
* **New: Remote Interactions:** You can now trigger actions on your connected phone directly from the watch, such as opening the "Plus" purchase screen or the privacy policy.
* **Improvement:** Added helpful descriptions to the GPS Format selection dialog.

#### ⌚ Wear OS
* **New: Compass Unit Selection:** For professional use, you can now switch the azimuth display unit between **Degrees (360°)** and **NATO Mils (6400)** in the settings.
* **New: Redesigned 'About' Screen:** A complete visual overhaul. It now features quick action buttons to Send Feedback, Rate the App, or Open the Companion App on your phone.
* **New: Remote Interactions:** You can now trigger actions on your connected phone directly from the watch, such as opening the privacy policy.


## Version 1.15.0 Beta 1
*(Released December 13, 2025)*

This update focuses on **harmonizing the design language** between **Pixel Compass** and **Pixel Pulse**. We've brought the refined UI elements and responsive layouts from Pixel Pulse into Compass to create a more unified and polished experience, particularly for plus screens.

#### 📱 Phone
* **New: Unified Plus Experience:** The "Welcome," "Plan Selection," and "Subscription Expired" screens have been completely redesigned to match the modern standards of Pixel Pulse. They now feature **responsive layouts** (perfect for Foldables/Tablets), feature carousels, and animated transitions.
* **Improvement: Adaptive Layouts:** The plus feature lists now use smart grids and split-views on larger screens, ensuring efficient use of space in both portrait and landscape modes.
* **Improvement: Smoother Navigation:** We've refactored the navigation logic for User Status and Upgrades to prevent "loops" and ensure the back button always takes you where you expect.
* **Improvement: Weather Error Handling:** The app now gracefully handles "Unsupported Location" errors from the Weather API, providing a clear message instead of a generic failure.
* **Visual Polish:** Updated the **AMOLED Theme** surface colors for better consistency and added dynamic status bar scrims to scrolling screens.
* **Localization:** Updated and refined translations for all Plus features, benefits, and backup flows across existing languages (German, French, Italian, Dutch, Spanish, Portuguese, Chinese, and English regions).


## Version 1.14.2
*(Released December 13, 2025)*

This update focuses on polishing the visual consistency of widget previews and ensuring robust background service handling on modern Android versions.

#### 📱 Phone
* **Improvement: Dynamic Widget Previews:** Widget previews now intelligently adapt their background color based on the selected shape and content type, ensuring better contrast and theme consistency.
* **Improvement: Clock Contrast:** Updated clock dial and hand colors to use high-contrast theme attributes, improving visibility on all backgrounds.
* **Improvement: Wallpaper Gradients:** Refined the gradient overlay on wallpaper previews for better text legibility and smoother color transitions based on your theme.

## Version 1.14.1
*(Released December 12, 2025)*

This is a maintenance release that addresses specific layout rendering issues for the Analog Clock widget on certain device configurations and improves localization coverage.

#### 📱 Phone
* **Fix: Android 14+ Compliance:** Removed the `DATA_SYNC` foreground service type to strictly adhere to Android 14 and 15 background policies, preventing potential crashes or restrictions.
* **Fix: Analog Clock Rendering:** Resolved an issue where the analog clock layout could render incorrectly on some devices by switching to native `RemoteViews` for improved performance and compatibility.
* **Fix: Transparent Clock Dials:** Added a transparent background layer to clock dial vectors to prevent rendering artifacts on certain launchers.

## Version 1.14.0
*(Released December 11, 2025)*

This major update brings the **Clock Widget** to life with deep customization, new digital styles, and a native engine for incredible battery efficiency. We've also completely redesigned the **Feedback** experience and overhauled the **Widget Configuration** screens.

For **Wear OS**, enjoy a massive visual upgrade with **9 new color themes** (including AMOLED Black) and an improved theme picker.

#### 📱 Phone
* **New: Ultimate Clock Widget Customization:** Make it yours! Choose from various face styles, hand designs, and tick marks. We've added new **Digital Layouts** for "Pill" and "Modern" shapes, and the Analog Clock has been rewritten to use native Android views for **maximum battery efficiency**.
* **New: Redesigned Feedback:** Sending feedback is now a seamless experience with a modern Expressive UI, **Draft Autosave** so you never lose your text, and Smart Guidance to help you write better reports.
* **New: Smart Wallpaper System:** The app is now smaller and smarter. Widget preview wallpapers are fetched dynamically from the cloud, and you can now download them directly to your gallery.
* **Improvement: Revamped Configuration:** The widget setup screens have been unified and polished for a consistent, smooth experience across all widget types.
* **Improvement: Regional Formats:** Widgets now fully respect your regional settings (Imperial/Metric, Pressure).
* **Stability:** Major refactor of background services for Android 14+ compliance and sensor stability.

#### ⌚ Wear OS
* **New: 9 New Color Themes:** Personalize your watch with a suite of new themes, including **AMOLED Black**, **Pixel Blue**, **Emerald**, **Sunset**, and more.
* **UI: Enhanced Theme Selector:** A redesigned theme picker with rich previews makes it easier to find your perfect look.
* **Improvement:** Added support for 10+ new regional locales and fixed issues with complication displays.

## Version 1.14.0 Beta 6
*(Released December 8, 2025)*

This beta brings a massive update to the Wear OS app with 9 new color themes and expanded regional support. On the phone, we've hardened the background service reliability and updated translations across the board.

#### 📱 Phone
* **Critical Fix: Service Stability:** We've completely refactored how the background sensor service starts. This resolves `ForegroundServiceStartNotAllowedException` crashes on Android 12+ and ensures monitoring restarts safely after system kills.
* **Localization:** Added and refined translations for the new Widget Configuration and Feedback screens in Arabic, Hindi, Japanese, Korean, Dutch, Polish, Russian, Swedish, and Thai.


#### ⌚ Wear OS
* **New: Expanded Color Themes:** You can now choose from 9 new color themes, including **AMOLED Black**, **Pixel Blue**, **Emerald**, **Sunset**, **Crimson**, and more.
* **UI: Enhanced Theme Selector:** The theme selection screen has been redesigned to show rich color previews and arcs, making it easier to pick your look.
* **Fix: Complication Support:** Fixed an issue with `RANGED_VALUE` complications to ensure the compass data displays correctly on all watch faces.
* **Fix: Onboarding State:** Improved the reliability of the onboarding flow to ensure it stays active until fully completed.
* **Localization:** Added 10 new regional locales (e.g., English AU/GB/IN, French CA, Portuguese PT) to better support regional formatting preferences.

## Version 1.14.0 Beta 5
*(Released December 5, 2025)*

This beta focuses on performance and visual polish. We've re-architected the Analog Clock widget under the hood for better battery efficiency and smoother rendering.

#### 📱 Phone
* **Performance: Native Analog Clock:** The Analog Clock widget has been rewritten to use native Android layouts (`RemoteViews`) instead of drawing bitmaps. This significantly reduces memory usage and improves battery life.
* **Visual Polish: Dynamic Backgrounds:** Widget shapes like "Cookie" and "Modern" now dynamically use your system's Primary color for their background, creating a more vibrant look.
* **Visual Polish: Refined Clock Hands:** The hour and minute hands have been redesigned with smoother shapes and better proportions.
* **Fix:** Added a transparent background layer to clock dials to prevent rendering artifacts on certain launchers.
* **Fix:** Removed the "Seconds Hand" option from previews to align with the new native layout limitations (seconds are not supported in native widget views to save battery).

## Version 1.14.0 Beta 4
*(Released December 3, 2025)*

This beta introduces a specialized digital clock layout for pill-shaped widgets and refines the widget configuration UI for better usability.

#### 📱 Phone
* **New: Pill Digital Clock Layout:** A specialized digital clock layout is now available for the "Pill" widget shape, featuring a stylish, skewed alignment for hours and minutes.
* **New: Modern Digital Clock:** The "Modern" and "Cookie" widget shapes now support a new, responsive digital clock layout that adapts to widget size.
* **Improvement: Widget Font Scaling:** Enhanced the font size calculation logic to ensure text fits perfectly within widget bounds, especially for pill shapes and compact layouts.
* **Improvement: Config UI Polish:** The widget configuration screen now intelligently limits the controls height on larger screens and features more rounded tabs.
* **Improvement: Clock Previews:** Widget previews now accurately reflect 12/24-hour system settings and use improved scaling logic for analog clocks.
* **Fix:** Corrected an issue where the clock or metric layout might not render correctly based on the widget content type.

## Version 1.14.0 Beta 3
*(Released December 1, 2025)*

This beta introduces deep customization and refines visual consistency for the **Clock Widget**.

#### 📱 Phone
* **New: Clock Widget Customization:** You can now fully personalize the Clock Widget! Choose from different face styles, hand styles, tick mark designs, and toggle the second hand visibility directly in the configuration screen.
* **New: Custom True North Icon:** Replaced the generic icon with a custom-designed vector asset for "True North" across the app (Navigation Bar, Detail Panels, Settings).
* **Improvement: Analog Clock Refinements:** The analog clock now uses a consistent red second hand for better visibility and improved scaling logic for a sharper look on all widget sizes.
* **Improvement: Widget Layouts:** Refined the "Arch" shape layout and simplified the Clock Widget by removing redundant city labels in wider layouts.
* **Improvement: Visual Polish:** Updated the clock scale factor and background image handling for a more balanced and aesthetically pleasing widget appearance.

## Version 1.14.0 Beta 2
*(Released November 26, 2025)*

This beta brings a massive under-the-hood refactor to the Widget Configuration screens and introduces a smarter, cloud-based wallpaper system to reduce app size.

#### 📱 Phone
* **New: Smart Wallpaper System:** We've significantly reduced the app size by removing local wallpaper assets. Wallpapers are now fetched dynamically with beautiful gradient fallbacks if loading fails. You can also now download these wallpapers directly to your gallery.
* **Improvement: Revamped Widget Configuration:** The setup screens for both 'Classic' and 'At a Glance' widgets have been completely rebuilt using a shared, modular architecture. This ensures a consistent look, smoother previews, and better performance across all widget types.
* **Improvement: Robust Image Loading:** Refactored the image loading logic across the entire app (Banners, Wallpapers, What's New) into a unified system for better caching and reliability.
* **Improvement: Localization:** Added and refined translations for the Feedback and Wallpaper features, with a specific focus on improving Portuguese support.
* **UI Polish:** Improved layout for compact widgets and refined the Feedback success screen buttons.

## Version 1.14.0 Beta 1.1
*(Released November 24, 2025)*

A quick patch to address specific compliance and localization issues found in Beta 1.

#### 📱 Phone
* **Fix: Foreground Service Compliance:** Updated the foreground service definition to explicitly include 'location', ensuring strict compliance with Android 14+ requirements for background location access.
* **Localization:** Added missing Portuguese strings for the new Feedback interface.

## Version 1.14.0 Beta 1
*(Released November 18, 2025)*

This beta introduces a completely redesigned Feedback experience with a modern Expressive UI and smart features like draft autosaving. We've also deepened the integration of Regional Formats into widgets and improved background reliability.

#### 📱 Phone
* **New: Redesigned Feedback Experience:** Sending feedback is now smoother than ever. The new **Material 3 Expressive** bottom sheet features:
    * **Draft Autosave:** Your message is saved automatically, so you never lose your progress if you close the sheet.
    * **Smart Guidance:** Dynamic, context-aware tips appear based on what you type to help you write better reports.
    * **Polished UI:** A cleaner layout with better input validation and distinct visual sections.
* **New: Regional Formats in Widgets:** Your Home Screen widgets now fully respect your "Regional Formats" settings, correctly displaying Imperial units and your preferred Pressure units.
* **Improvement: Robust Widget Updates:** We've hardened the background update logic (Worker) to handle Android 12+ restrictions and Android 14+ timeouts more gracefully, ensuring your widgets stay up to date.
* **Improvement: Live Time Card:** The Time card has been refactored to use live time data, ensuring even greater accuracy and reliability.
* **Fix: Sensor Stability:** Added safeguards to filter out invalid sensor data (NaN/Infinite values), preventing potential crashes during calibration or leveling.
* **Fix:** Added a safety dialog when disabling "Regional Formats" to prevent accidental unit overrides.

## Version 1.13.1
*(Released November 14, 2025)*

This update focuses on refining the user experience with smarter regional settings, more accurate location naming, and precise time synchronization.

#### 📱 Phone
* **New: Smarter Regional Formats:** The "Use Regional Formats" option is now much more intelligent. It automatically detects the correct units for Temperature, Distance, and Pressure based on your SIM card or system locale, removing the guesswork.
* **Improvement: Better Location Names:** We've improved the logic for formatting addresses from GPS coordinates. Location names in the app and widgets are now more concise and relevant, prioritizing your neighborhood and city.
* **fix: Precision Time Sync:** The Time card now synchronizes perfectly with your system clock, ensuring second-by-second accuracy without delays.
* **Fix: Card Style Selection:** Resolved an issue where Free users were unable to select "Legacy" card styles.

## Version 1.13.0
*(Released November 13, 2025)*

This release introduces a deeper level of personalization with **themes** and an **expanded color palette**. We've also completely redesigned the **"What's New" experience**, added powerful customization to the **"At a Glance" widget**, and expanded support to **Dutch**, **Swedish**, and **Traditional Chinese**.

#### 📱 Phone
* **New: AMOLED & Custom Themes:** Choose from a wide range of new color palettes (Emerald, Sunset, Purple, Crimson, and more) or switch to a dedicated **AMOLED** mode for pure black backgrounds.
* **New: "What's New" Redesign:** Stay informed with a completely rebuilt update screen featuring animated, expandable feature cards and a new split layout for tablets.
* **New: At a Glance - Dual Info Layout:** Introduced a new "Split" layout option for the widget, separating date and insights for better readability.
* **New: At a Glance - Insight Categories:** You can now filter exactly which types of insights (Weather, Sun, Moon, Alerts, etc.) appear in your widget.
* **New: Expanded Localization:** Added full support for **Dutch** 🇳🇱, **Swedish** 🇸🇪, and **Traditional Chinese** 🇹🇼. We also added regional variants for **English** (🇬🇧 🇦🇺 🇨🇦 🇮🇳) and **Canadian French** (🇨🇦).
* **New: Android 15+ Widget Previews:** Added dynamic previews for the "At a Glance" widget in the system widget picker on Android 15+.
* **Improvement: Sensor Stability:** Enhanced the Sensor Service lifecycle management to better handle background execution restrictions on Android 12+, preventing freezes.
* **Improvement: Responsive Config:** The widget configuration screen now adapts beautifully to landscape mode and larger screens.
* **Improvement:** Added robust checks to prevent invalid data (NaN values) from appearing in widgets.

## Version 1.13.0 Beta 3
*(Released November 12, 2025)*

This beta introduces a deeper level of theming with new AMOLED options and an expanded color palette. We've also refined the sensor service stability and improved widget reliability.

#### 📱 Phone
* **New: AMOLED Themes:** Added a dedicated "AMOLED" theme option. Selecting it automatically switches the app to a pure black dark mode for battery savings on OLED screens.
* **New: Expanded Color Palette:** Introduced a new app theme color selector with a wide range of options (Neutral, Pixel Blue, Emerald, Sunset, Purple, Crimson, Teal, Pink, Brown), each with custom light and dark schemes.
* **Improvement: Sensor Stability:** Enhanced the Sensor Service lifecycle management to better handle background execution restrictions on Android 12+, preventing crashes and ensuring smoother compass updates.
* **Improvement: Widget Reliability:** Added robust checks to prevent invalid data (NaN values) from appearing in the widget's azimuth and altitude displays.
* **Improvement: Undo Theme Switch:** Switching to the AMOLED theme now shows a helpful "Undo" snackbar, allowing you to quickly revert if needed.
* **Fix:** Removed redundant dependencies to optimize app size and build performance.

## Version 1.13.0 Beta 2
*(Released November 10, 2025)*

This beta focuses on refining the "At a Glance" configuration UI and adding expressive animations to the "What's New" feature cards.

#### 📱 Phone
* **New: Expandable Feature Cards:** The feature cards in the "What's New" screen now expand to reveal larger images with smooth, animated transitions.
* **Improvement: Refined Config UI:** The "At a Glance" configuration screen has been refactored for better responsiveness on all screen sizes, with improved layout handling for landscape mode.
* **Improvement: Updated Dependencies:** Upgraded core libraries (Compose, Material 3, Billing, Glance) to their latest versions for improved performance and stability.
* **Fix:** Removed duplicate metadata from the manifest to prevent potential conflicts with wearable notifications.

## Version 1.13.0 Beta 1
*(Released November 8, 2025)*

This update focuses on enhancing the "What's New" experience with a fresh design, introducing deep customization for the "At a Glance" widget, and significantly expanding localization support.

#### 📱 Phone
* **New: "What's New" Redesign:** The update screen has been completely redesigned with a new split layout for tablets/foldables, animated feature cards, and support for "Plus" feature badges.
* **New: "Explore" Updates:** A generic "What's New" screen now appears when detailed changelogs can't be loaded, ensuring you're always informed about updates.
* **New: At a Glance - Dual Info Layout:** Introduced a new "Split" layout option for the widget, separating the date and smart insights into two distinct areas for better readability.
* **New: At a Glance - Insight Categories:** You can now filter exactly which types of insights (Weather, Sun, Moon, Alerts, etc.) appear in your widget.
* **New: Android 15+ Widget Previews:** Added dynamic previews for the "At a Glance" widget in the system widget picker on Android 15+.
* **New: Expanded Localization:** Added full support for **Dutch** 🇳🇱, **Swedish** 🇸🇪, and **Traditional Chinese** 🇹🇼. We also added regional variants for **English** en-rAU (🇦🇺), en-rCA (🇨🇦), en-rGB (🇬🇧), en-rIN (🇮🇳) and **Canadian French** (🇨🇦).
* **Improvement: Responsive Widget Config:** The widget configuration screen now adapts beautifully to landscape mode and larger screens with a new responsive layout.
* **Improvement:** The "Pixel Pulse" banner now loads screenshots dynamically, reducing app size.
* **Improvement:** Added haptic feedback to interactions on the "What's New" screen.
* **Improvement:** The "What's New" screen now intelligently switches between compact and split layouts based on your device size.

## Version 1.12.0
*(Released November 6, 2025)*

This release brings a massive overhaul to home screen widgets with **real-time updates**, **custom shapes**, and a brand-new configuration experience. We've also upgraded to **Insight Engine 4.0** and significantly improved altitude calibration reliability across both Phone and Watch.

#### 📱 Phone
* **New: Custom Widget Shapes:** Personalize your home screen with 5 new widget shapes (Modern, Cookie, Pill, Arch, and Classic).
* **New: Redesigned Widget Config:** The widget setup screen has been completely rebuilt with a modern UI, live previews, and deep customization options for appearance and content.
* **New: Real-Time Widget Updates:** The widgets now supports high-frequency updates, providing incredibly smooth compass and altitude animations directly on your home screen.
* **New: Insight Engine 4.0:** Smarter weather insights now include "Picnic Day" and "Breezy Relief," plus better pressure drop detection and contextual day names (e.g., "Tomorrow").
* **New:** The Compass Detail Panel now displays detailed **Altitude Status** (Calibrating, Unavailable).
* **Improvement:** Updated the launcher and splash screen icons with a new, unified modern design.
* **Improvement:** Settings UI refreshed with modern segmented buttons for unit selection.
* **Improvement:** Smarter Altitude Calibration logic now handles network/API errors gracefully with clear user feedback (Toasts).
* **Fix:** Refactored internal temperature handling to eliminate conversion errors in charts and panels.

#### ⌚ Wear OS
* **Improvement:** Updated app icons to match the new modern branding.
* **Improvement:** Added visual feedback (Toasts) for manual calibration errors (e.g., "No Network" or "API Error").
* **Fix:** Corrected Spanish translations for calibration screens.

#### 🌐 Website
* **Improvement:** Updated the website's favicon and manifest icons to match the new, modern app branding. 


## Version 1.12.0 beta 4
*(Released November 3, 2025)*

This beta focuses on improving the reliability of altitude calibration, adding better error feedback, and refining widget layout scaling.

#### 📱 Phone
* **New:** The Compass Detail Panel now displays the current **Altitude Status**, providing context on whether the data is up-to-date, calibrating, or unavailable.
* **Improvement:** Widget layouts now scale much better across different sizes, optimizing text and icon visibility for "giant", "short", and "medium" configurations.
* **Improvement:** Added clear error messages (Toasts) for specific altitude calibration failures (e.g., network issues, API limits).
* **Improvement:** The altitude calibration logic is now smarter, handling API errors with cooldown periods to prevent unnecessary battery usage and repeated failures.
* **Localization:** Added missing translations for the new widget configuration screens and smart insights across all supported languages.

#### ⌚ Wear OS
* **Improvement:** Added visual feedback (Toasts) when manual calibration fails, explaining the specific reason (e.g., no network, API error).
* **Improvement:** Refined the altitude calibration engine for better stability and error handling.
* **Improvement:** Updated the launcher and splash screen icons with a new central circle element, matching the modern app branding.


## Version 1.12.0 beta 3
*(Released November 1, 2025)*

This beta introduces a major overhaul of the widget configuration UI and adds expressive new widget shapes.

#### 📱 Phone
* **New: Custom Widget Shapes:** You can now choose from 5 new widget shapes (Modern, Cookie, Pill, Arch, and Classic) to match your home screen.
* **New: Redesigned Widget Config:** The widget configuration screen has been completely rebuilt. It now features a modern UI with Top and Bottom bars (replacing the FAB) and new tabs for "Appearance," "Content," and "Layout."
* **New:** Added a "Force 1:1 Aspect Ratio" option for custom widget shapes in the new "Layout" tab.
* **New:** The widget preview in the config screen is now highly advanced, showing live shape changes, a split-wallpaper preview for font contrast, and new animations.
* **New:** Added a wallpaper credits dialog (info icon) to the widget configuration screen.
* **New:** Replaced the simple "Pixel Pulse Alpha" dialog with an enhanced promotional banner in settings, now featuring a logo and a carousel of app screenshots.
* **Fix:** Banners for battery and notification permissions no longer overlap in the widget config screen.

#### ⌚ Wear OS
* **Fix:** Corrected Spanish translations for the calibration and settings screens.

## Version 1.12.0 beta 2
*(Released October 29, 2025)*

This beta introduces high-frequency, real-time updates for the widget, making compass and altitude data incredibly responsive. It also includes significant UI polish to the settings screen and navigation components.

#### 📱 Phone
* **New:** The "At a Glance" widget now supports high-frequency, real-time updates from the sensor service, providing much smoother compass and altitude animations.
* **New:** Replaced the unit selection toggles (Time, Temp, Measurement) in Settings with a modern segmented button design for easier selection.
* **New:** Replaced the default "Level" screen navigation icons (bottom bar and rail) with new custom vector icons.
* **New:** Replaced the foreground service notification icon with a new custom compass icon for better brand consistency.
* **Improvement:** Refined the "Level" navigation icon animation for a more expressive and physical bounce effect.
* **Improvement:** The in-app update flow is now smarter; it will no longer repeatedly ask you to update during the same session if you decline.
* **Improvement:** Labels in the navigation rail (for tablets/foldables) now center-align and support up to two lines of text.
* **Fix:** The app now correctly restores the screen's previous orientation setting when leaving the "Level" screen.
* **Fix:** Added a fallback to prevent a crash if the user tries to open the changelog link without a web browser installed.
* **Fix:** Placeholders for "Plus" features (like detail panels) are now correctly clickable to trigger the upgrade flow.
* **Fix (Localization):** Ensured consistent terminology for "Settings" in Brazilian Portuguese (now "Ajustes").

#### 🌐 Website
* **Improvement:** Updated the website's favicon and manifest icons to match the new, modern app branding.

## Version 1.12.0 beta 1
*(Released October 27, 2025)*

This beta introduces a new, settings for 'At a Glance' widget, a new 'Smart Insights' engine (v4.0), and updates the app's icons to a modern design.

#### 📱 Phone
* **New:** Added a toggle to enable or disable 'Smart Insights' in the 'At a Glance' widget configuration.
* **New:** Added an animated carousel preview of Smart Insights to the widget configuration screen.
* **New:** Upgraded to 'Insight Engine 4.0', adding new insights (picnic day, breezy relief), pressure drop detection, and improved logic.
* **New:** Weather event insights now show contextual day names (e.g., 'today', 'tomorrow', 'on Monday') for better clarity.
* **Improvement:** Updated the launcher and splash screen icons with a new, unified, and modern vector design.
* **Improvement:** Standardized and simplified insight strings (thunderstorm, heavy rain) and contextual day strings across all languages.
* **Fix:** Fix 'At a Glance' widget with support for dynamic weather icons and text.
* **Fix:** Refactored all temperature conversion and formatting logic to use Celsius as the base, fixing inconsistencies and formatting errors across panels, cards, and charts.
* **Fix:** Corrected icon tinting logic for widgets to ensure proper display on transparent backgrounds.
* **Fix:** Corrected date formatting (removed periods) in the widget preview.
* **Fix:** Corrected Arabic translations for east-related direction abbreviations.
* **Fix:** Corrected UV index subtitle translations for insights across all languages.

#### ⌚ Wear OS
* **Improvement:** Updated the launcher and splash screen icons to a new, unified vector design, matching the phone app.

## Version 1.11.3
*(Released October 25, 2025)*

This release further polishes the compass animation and improves sensor data stability for both phone and watch.

#### 📱 Phone
* **New:** Insight generation now respects the user's preferred temperature unit (C/F).
* **Improvement:** Implemented specialized circular and linear low-pass filters for azimuth, inclination, and roll, improving orientation data stability.
* **Fix:** Fixed a critical bug where temperature preferences (Fahrenheit) were not applied correctly to insights. Insights are now generated with the correct unit and are automatically regenerated on preference change.
* **Fix:** Standardized all internal temperature handling to use Celsius as the base, preventing double-conversion bugs and formatting errors.
* **Fix:** Updated temperature string formatting in all translations to support non-integer values (e.g., 20.5°).

#### ⌚ Wear OS
* **Improvement:** Refined the spring animation parameters and angle calculation logic for an even smoother and more accurate compass rotation.
* **Improvement:** Implemented specialized circular low-pass filters for azimuth and roll, improving orientation stability and accuracy.

## Version 1.11.2
*(Released October 23, 2025)*

This release improves the compass animation for Wear OS and delivers a major UI and data visualization polish update for the phone app.

#### 📱 Phone
* **New:** The forecast UI (daily, hourly, and highlight cards) now displays a distinct snowflake icon for snow precipitation.
* **Improvement:** The Sun Path Chart now updates the current time every minute, displays the time remaining until the next sun event (sunrise/sunset), and features improved label positioning.
* **Improvement:** The weekly forecast chart now highlights the current day and uses theme-aware gradient colors that adapt to the system's light or dark theme.
* **Improvement:** Temperature labels in the comparison chart now dynamically position themselves (above/below) to prevent visual overlap.
* **Improvement:** Cleaned up the precipitation chart to only show probability labels for the current hour and the maximum probability point, improving readability.
* **Improvement:** The Solar Intensity Gauge colors are now optimized for dark theme.
* **Improvement:** Expanded localization by replacing many hardcoded text labels (moon phases, UV burn time, wind details, precipitation types) with localized string resources.
* **Improvement:** The "What's New" banner logic is now tracked by version code, ensuring it appears correctly after each update.
* **Improvement:** Implemented specialized circular and linear low-pass filters for all orientation values (azimuth, inclination, roll) to improve data stability and accuracy.

#### ⌚ Wear OS
* **New:** A compass inversion indicator icon is now shown next to the direction label when manual inversion is enabled.
* **Improvement:** Replaced the compass dial's rotation logic with a smooth, spring-based animation, eliminating abrupt jumps, improving stability, and removing the need for internal rotation correction.

## Version 1.11.1
*(Released October 19, 2025)*

This release focuses on critical bug fixes for the phone app, particularly around temperature calculations and localization, while delivering a major animation and UI polish update for Wear OS.

#### 📱 Phone
* **New:** The weekly forecast chart now highlights the current day and adapts its gradient colors to the system's light or dark theme.
* **Improvement:** Precipitation chart labels have been cleaned up to only show the probability for the current hour and the maximum probability point, improving readability.
* **Improvement:** Optimized precipitation chart data handling by pre-computing values for better performance.
* **Improvement:** Expanded localization with new Portuguese strings for moon phases, UV burn time, and wind details.
* **Improvement:** Replaced many hardcoded text labels (moon phases, precipitation types, UV burn time, wind descriptions) with localized string resources for better internationalization.
* **Improvement:** The splash screen now waits for initial data to be loaded before dismissing, providing a smoother startup.
* **Fix: Corrected Temperature Calculation:** Fixed a critical bug where temperature conversions were being applied twice (e.g., converting an already-Fahrenheit value to Fahrenheit again), which resulted in incorrect values in detail panels.
* **Fix:** Temperature, feels-like, and dew point panels now correctly use *current* conditions for their display values.
* **Fix:** All detail panels now use a consistent "Idle" placeholder state instead of "No Data" when forecasts are not yet loaded.
* **Fix:** Corrected a dependency injection issue in the `WidgetUpdateWorker`.

#### ⌚ Wear OS
* **Fix:** Corrected the azimuth calculation logic, improving the accuracy of compass correction.
* **Improvement:** Added full localization for the new Theme Selection and Manual Calibration features across all supported languages.
* **Improvement:** Added an explanation for the 'Automatic' theme option on the theme selection screen.
* **Improvement:** Onboarding overlays now wait for the state to be fully loaded, preventing them from appearing prematurely.

## Version 1.11.0
*(Released October 17, 2025)*

This release introduces a brand-new, unified **Forecast Detail Panel**, providing a comprehensive weather overview in one place. We've also completely redesigned our weather icon set with beautiful new expressive and context-aware (day/night) icons. Plus, charts have been polished for better clarity and theming.

#### 📱 Phone
* **New: Unified Forecast Detail Panel:** Instead of separate panels, tapping a weather card now opens a comprehensive forecast screen. It features a new weekly chart, a daily list, a scrollable hourly forecast, and a summary of current conditions, all in one beautiful and easy-to-read layout.
* **New: Expressive Weather Icon Set:** We've completely redesigned and expanded our weather icon set. The new icons uses Google's Weather V4 instead of v2. More beautiful, context-aware (with day/night variants for conditions like fog and storms), and the underlying system is faster and more reliable.
* **Improvement: Polished Charts & Theming:** The Sun Path and other forecast charts now have improved colors that adapt to your system's light or dark theme. We've also added smart anti-collision logic to data labels, so they no longer overlap.
* **Improvement: Full Directional Localization:** All cardinal and intercardinal directions (like N, NE, SW) are now fully translated across all supported languages.

#### ⌚ Wear OS
* **New: Precision Tools:** You can now **manually calibrate altitude** directly on your watch and **select your preferred GPS coordinate format** (DMS, DD, or DDM) in the display settings.
* **New: Theme Selection & Customization:** Personalize your watch with a new theme selector (Automatic, Purple, Blue, and more). We've also added a **Compass Inversion** setting for users who wear their watch on their right wrist.
* **Improvement: More Reliable Compass Rotation:** The rotation logic has been re-architected to use the device's physical display rotation, making it far more accurate and reliable, especially on devices like the Pixel Watch.
* **Improvement: Redesigned Level & Info Screens:** The Level screen has been updated with a cleaner UI. A new "Info" screen has been added to the main pager to provide quick access to your current GPS and compass status.
* **Improvement: New Onboarding Flow:** A new, streamlined onboarding flow and helpful overlays for the Level and Settings screens guide you through all the features.
* **Improvement: Full Internationalization:** All new features, including calibration and settings, are now fully translated into all 15+ supported languages.
* **Fix:** The Compass Tile now correctly uses the last known sensor data, improving performance and reducing resource usage.

## Version 1.11.0 Beta 1
*(Released October 17, 2025)*

#### ⌚ Wear OS
* **New: Manual Altitude Calibration:** You can now manually enter a known altitude directly on your watch to precisely calibrate the sensors, perfect for serious training and outdoor activities.
* **New: GPS Coordinate Format Selection:** Just like on the phone, you can now choose your preferred GPS coordinate format (DMS, DD, or DDM) right from the watch's display settings.
* **New: Compass Inversion Setting:** A new accessibility setting allows you to invert the compass direction, accommodating users who wear their watch on their right wrist or with a left-side crown.
* **Improvement: More Reliable Compass Rotation:** The compass rotation logic has been completely re-architected. It no longer relies on manufacturer-specific settings and instead uses the device's physical display rotation, making it far more accurate and reliable, especially on devices like the Pixel Watch.
* **Improvement: Redesigned Level Screen:** The Level screen has been updated with a new, cleaner `FlatLevelContent` UI for a more polished and responsive experience.
* **Improvement: Smarter Data Fetching:** Data fetching policies are now aware of the Wear OS platform, preventing unnecessary forecast data fetches and optimizing battery life.


## Version 1.10.1
*(Released October 22, 2025)*

This is a maintenance release that addresses a key bug discovered shortly after the launch of version 1.10.0. We recommend all users update to ensure the best experience with the new interactive detail panels.

#### 📱 Phone
* **Fix: Detail Panel Charts Not Updating:** Resolved an issue where forecast charts in the detail panels would not update immediately after changing their corresponding units (e.g., from Celsius to Fahrenheit, or from 24-hour to 12-hour format). All charts now refresh instantly to reflect your selection.


## Version 1.10.0
*(Released October 20, 2025)*

This is the first stable release after our extensive beta cycle, marking a major leap in functionality and polish. We're thrilled to introduce **Interactive Detail Panels** for all weather cards, a completely **redesigned Level Screen** with stunning animations, and powerful new features like **Manual Altitude Calibration**. Thank you to all our beta testers for your invaluable feedback!

#### 📱 Phone
* **New: Interactive Detail Panels with Forecasts:** You can now **tap any weather card** to open a beautiful detail panel packed with more information and **hourly forecast charts** for Temperature, Wind, Precipitation, UV Index, Humidity, and more.
* **New: Completely Redesigned Level Screen:** The Level screen has been rebuilt from the ground up with stunning new animations. The flat level mode now features an animated ripple effect, while the linear level mode has a fluid, wave-like background and a morphing bubble that shows a checkmark when you're perfectly level.
* **New: Manual Altitude Calibration:** For ultimate precision, you can now manually enter a known altitude in the settings to calibrate the app's sensors. You can also easily remove the manual calibration to return to automatic mode.
* **New: Compass Detail Panel & Shortcuts:** The compass is now interactive! **Click the compass** to open a new detail panel where you can check your sensor accuracy, toggle True North, and start a recalibration. You can also now **long-press the compass** on the main screen to quickly toggle True North.
* **New: GPS Coordinate Format Selection:** You can now choose how GPS coordinates are displayed throughout the app! Go to Settings to select from DMS (Degrees, Minutes, Seconds), DD (Decimal Degrees), or DDM (Degrees, Decimal Minutes).
* **New: Environmental Cards & Smarter Insights:** We've added new cards for Atmospheric Pressure, Solar Intensity, Visibility, and Cloud Cover. The Insight Engine is also smarter, now using forecast data to provide proactive insights about upcoming weather.
* **Improvement: Accessibility for Large Fonts:** All dynamic cards now automatically adapt their layout when large font sizes are enabled, preventing text from overlapping.

## Version 1.10.0 Release Candidate
*(Released October 15, 2025)*

This release candidate focuses on final polish and new interactive features for the Compass and Level screens before the official release.

#### 📱 Phone
* **New: Interactive Compass Detail Panel:** The compass is now clickable! Tapping it opens a new detail panel where you can view sensor accuracy, toggle True North, and start a recalibration.
* **New: Long-Press for True North:** You can now long-press directly on the compass to quickly toggle the True North setting.
* **Improvement: Smoother Level Transitions:** The bubble on the Level screen now uses shared element transitions, creating a seamless animation as you switch between flat and linear level modes.
* **Improvement: Full Translation:** All new features introduced in the beta cycle have now been fully translated into our 15+ supported languages.


## Version 1.10.0 Beta 3
*(Released October 14, 2025)*

This beta is all about bringing a new level of polish and precision to the app. The Level screen has received a complete visual and functional overhaul with stunning new animations, and we're introducing a powerful Manual Altitude Calibration feature.

#### 📱 Phone
* **New: Completely Redesigned Level Screen:** The Level screen has been rebuilt from the ground up with stunning new animations. The flat level mode now features an animated ripple effect, while the linear level mode has a fluid, wave-like background and a morphing bubble that shows a checkmark when you're perfectly level.
* **New: Manual Altitude Calibration:** For ultimate precision, you can now manually enter a known altitude in the settings to calibrate the app's sensors. A new status icon clearly indicates when a manual calibration is active, and you can easily remove it to return to automatic mode.
* **Improvement: Smoother Sensor Data:** We've added a low-pass filter to the orientation sensor data, reducing jitter and making both the Compass and Level screen movements significantly smoother.
* **Improvement: Forecast-Based Insights:** The Insight Engine is now even smarter, using hourly and daily forecast data to generate more proactive insights about upcoming rain, temperature trends, and weekend weather.


## Version 1.10.0 Beta 2.1
*(Released October 12, 2025)*

This is a quick stability update to address issues found in Beta 2, focusing on data parsing and fetching reliability.

#### 📱 Phone
* **Fix: Data Parsing & ProGuard:** Resolved issues with data serialization that could occur in release builds by updating ProGuard rules and Moshi configurations, making the app more stable.
* **Fix: Forecast Data Reliability:** Improved the logic for fetching and combining daily and hourly weather forecasts, ensuring the new detail panels receive data more consistently.


## Version 1.10.0 Beta 2
*(Released October 12, 2025)*

This release introduces a powerful new way to explore your weather data. You can now tap any dynamic card to open a beautiful detail panel with hourly forecast charts. We've added several new environmental cards (like Pressure and Solar Intensity), a Sun Path chart for Plus users, and significantly improved our error handling for weather services.

#### 📱 Phone
* **New: Interactive Detail Panels with Forecasts:** The biggest feature of this release! You can now **tap any weather card** to open a detail panel. These panels are packed with more information and beautiful **hourly forecast charts** for Temperature, Wind, Precipitation, UV Index, Humidity, and more.
* **New: Sun Path Chart (Plus):** For Plus users, the Location detail panel now includes a beautiful custom chart that visualizes the sun's path for the day, including sunrise and sunset times.
* **New: Environmental Cards:** We've added several new cards to give you a more complete picture of your environment:
    * **Atmospheric Pressure:** A new flippable card shows pressure from both the weather service and your device's internal sensor, complete with a comparison chart in its detail panel.
    * **Solar Intensity:** A new card that intelligently estimates the sun's intensity based on UV index, cloud cover, and time of day.
    * **Visibility & Cloud Cover:** New dedicated cards for visibility and cloud cover, each with its own detailed forecast chart.
* **Improvement: Robust Error Handling:** The app now provides clearer, more helpful messages for network issues or if the weather service isn't available in your region, with options to retry or disable the feature.
* **UX: Polished Animations & Interactions:** Card flipping and content transitions are now smoother and more expressive.


## Version 1.10.0 Beta 1
*(Released October 10, 2025)*

This is a major release focused on overhauling the Dynamic Information cards and providing deeper customization and accessibility options. We've redesigned the card system from the ground up to be more unified and dynamic, added new user-requested customization features, and improved widget reliability.



#### 📱 Phone
* **New: Unified Contextual Card Pager:** The weather condition and smart insight cards have been merged into a single, auto-rotating pager. This creates a cleaner, more dynamic, and unified experience on the main screen.
* **New: GPS Coordinate Format Selection:** You can now choose how GPS coordinates are displayed throughout the app! Go to Settings to select from DMS (Degrees, Minutes, Seconds), DD (Decimal Degrees), or DDM (Degrees, Decimal Minutes).
* **New: Deeper Weather & Environmental Insights:** The InsightEngine is now even smarter, providing new insights for air quality, sunrise/sunset times, and "golden hour" for photographers.
* **Improvement: Accessibility for Large Fonts:** All dynamic cards now automatically adapt their layout when large font sizes are enabled in system settings, preventing text from overlapping and improving readability.
* **Improvement: Smarter Widget Performance:** The background update logic for widgets has been refined. It's now more intelligent about when to fetch data to preserve battery life and no longer makes unnecessary network calls for elevation data, relying on GPS altitude instead.
* **UX: Weather Data Attribution:** A new attribution line now shows the source of the weather data and when it was last updated, providing more transparency.


## Version 1.9.8
*(Released October 1, 2025)*

This is a maintenance and reliability update. We've fixed the insight rotation mechanism for the 'At a Glance' widget by migrating it to a more modern and robust background task scheduler. We've also included new translations for all the recent widget features.

#### 📱 Phone
* **Fix: Reliable Insight Rotation:** The logic for rotating insights on the 'At a Glance' widget has been re-architected using WorkManager, resolving an issue where rotations could stop or become unreliable.
* **Improvement: Full Internationalization:** All new text related to widgets, settings, best practices, and insights has been fully translated into our 15+ supported languages.


## Version 1.9.7
*(Released September 30, 2025)*

This update focuses on making widgets more reliable and powerful. We've completely re-architected the background update system to be more robust, especially after a device reboot. We've also added new in-app banners to help you get the most out of your widgets by guiding you through important system settings.

#### 📱 Phone
* **New: Smarter Widget Reliability Banners:** The app now intelligently detects if settings like Battery Optimization are enabled and displays helpful, dismissible banners. These banners guide you on how to adjust system settings to ensure your widgets can update reliably in the background.
* **Improvement: Rearchitected Widget Updates:** We've replaced the old update scheduler with a more resilient system that uses a chain of one-time work requests and exact alarms. This makes widget data refreshes more reliable and timely.
* **Improvement: Updates After Reboot:** Widgets now automatically resume their update schedule after your device is restarted, ensuring you don't miss any insights.
* **Improvement: Foreground Service for Updates:** To comply with modern Android standards and improve reliability, widget updates now run as a short-lived foreground service, indicated by a temporary notification.
* **UX: Improved Onboarding:** The early access dialog for Pixel Pulse Alpha has been improved for a clearer user experience.
* **Fix:** Permission-related banners now correctly refresh their state when you return to the app after changing permissions in system settings.


## Version 1.9.6 Release Candidate
*(Released September 25, 2025)*

A quick follow-up release to polish the new 'At a Glance' widget configuration and improve the debugging tools.

#### 📱 Phone
* **Improvement: Widget Configuration UI.** Reorganized the 'At a Glance' settings into separate "Appearance" and "Content" tabs for better clarity. Added new options for font size and weight.
* **Enhancement: At a Glance Preview.** The widget configuration preview now fully supports font color modes (light, dark, or auto), allowing you to see exactly how it will look on your home screen.
* **Improvement: Widget Debugging.** The debug information screen now loads and displays details for both Pixel Compass and the new 'At a Glance' widgets.
* **UI Polish:** Applied rounded corners to the widget type selection chips for a cleaner look.


## Version 1.9.6 Beta 2.1
*(Released September 24, 2025)*

This is a critical stability update that resolves several crashes related to background services and app lifecycle events on modern Android versions.

#### 📱 Phone
* **Critical Fix: Service Stability.** Hardened the foreground service to prevent crashes on Android 12+ by adding required permissions, explicit service types, and robust error handling for cases where the OS blocks the service from starting in the background.
* **Critical Fix: App Startup Crash.** Resolved a race condition that could cause a `ForegroundServiceDidNotStartInTimeException` crash on app startup. A new delayed stop mechanism ensures the sensor service has time to initialize properly during rapid screen navigation.
* **Fix: Animation Crash.** Prevented a crash related to the dynamic cards animation.


## Version 1.9.6 Beta 2
*(Released September 24, 2025)*

This is a major beta release introducing the brand new, highly customizable "At a Glance" widget, bringing contextual insights directly to your home screen. We've also added a new Widget Settings screen to help you get the most out of your widgets and polished several UI elements throughout the app.

#### 📱 Phone
* **New: Deep Widget Customization:** Personalize the new 'At a Glance' widget to perfectly match your style:
    * **Color & Background:** Control background visibility and choose between automatic, light, or dark font colors.
* **New: Widget Settings Screen:** A new section in the app's settings provides best practices for ensuring widget reliability and includes a debug panel (for experimental users) to view active widget details.
* **New: Expanded Weather Insights.** The InsightEngine now generates new insights for thunderstorms, poor visibility, gusty winds, feels-like temperature, and humidity.
* **Enhancement: Rotating Insights.** The 'At a Glance' widget can now automatically cycle through multiple available insights, keeping the information fresh.
* **New: Promotional Banners.** Added in-app banners to invite users to the beta program and promote other projects like Pixel Pulse.
* **Improvement: Smart Data Fetching.** Reworked data fetch policies to better balance user experience, API costs, and battery life for both Free and Plus users.


## Version 1.9.6 Beta
*(Released September 23, 2025)*

This release introduces the brand new, highly customizable "At a Glance" widget, bringing contextual insights directly to your home screen. We've also added a new Widget Settings screen to help you get the most out of your widgets and polished several UI elements throughout the app.

#### 📱 Phone
* **New: 'At a Glance' Widget:** A brand-new widget inspired by Pixel's own, designed to provide contextual information and smart insights right on your home screen. It's powered by a new **InsightEngine** that prioritizes the most relevant information for you.
* **New: Deep Widget Customization:** Personalize the new 'At a Glance' widget to perfectly match your style:
    * **Font Control:** Adjust the **font size** and **font weight** (light, regular, bold) to your preference.
    * **Date Formats:** Choose from multiple date display formats.
    * **Background Transparency:** Control the opacity of the widget's background for a seamless look on any wallpaper.
* **New: Widget Settings Screen:** A new section in the app's settings provides best practices for ensuring widget reliability on your device and includes a debug panel (for experimental users) to view active widget details.
* **Enhancement: Smart Widget Rendering:**
    * Icons are now intelligently tinted; for example, weather icons retain their original colors for better recognition.
    * The minimum widget height has been reduced, offering greater flexibility in your home screen layout.
* **Improvement: UI & Localization Polish:** Made several small but meaningful UI improvements, including updated styling for the top app bar and navigation elements, and fixed localization for the Level screen labels.


## Version 1.9.5
*(Released September 22, 2025)*

This release is a major overhaul of the subscription management system, creating a more reliable, welcoming, and user-friendly experience for Pixel Compass+ members. We've introduced new screens, seamless settings backup/restore, and critical fixes to ensure the app starts up perfectly every time.

#### 📱 Phone
* **New: Automatic Plus Settings Backup & Restore:** To protect your personalized setup, Pixel Compass now automatically backs up your Plus-exclusive settings (like deep compass customizations and card styles) when a subscription expires. When you resubscribe, you'll be welcomed back and can restore your settings with a single tap.
* **New: Redesigned Subscription Screens:**
    * **Welcome New Plus Users:** A completely redesigned, animated welcome screen now greets new subscribers, highlighting the key features they've just unlocked.
    * **Welcome Back:** Returning subscribers are greeted with a new animated screen that lists the benefits they've reacquired and offers to restore their backed-up settings.
    * **Subscription Expired:** An improved screen clearly communicates the status and lists the benefits that are temporarily unavailable.
* **Enhancement: Smart Onboarding for New Plus Users:** When a user upgrades to Plus, the app now automatically enables popular premium features (like extended weather data and the wind-on-compass indicator) so they can enjoy the full experience right away.
* **Critical Fix: Reliable App Startup:** Fixed a critical bug where the splash screen could dismiss before the user's subscription status was fully loaded. The app now waits to ensure Plus members always see the correct features and UI immediately on launch.
* **Improvement: Robust Subscription Handling:** Rearchitected the entire subscription lifecycle management system to be more resilient and reliable. This improves the handling of new purchases, expirations, and renewals.
* **Improvement: Refined Design & Layouts:** Enjoy a more polished experience with numerous UI improvements, including better spacing, enhanced handling of display cutouts for an edge-to-edge feel, and more consistent layouts on larger screens like tablets.

#### ⌚ Wear OS
* **New: Advanced Rotation Correction:** The compass is now significantly more accurate, especially on devices like the Pixel Watch. A new system intelligently corrects the compass heading based on your watch's physical orientation on your wrist (e.g., button placement), ensuring the direction you see is always the direction you're facing.
* **Improvement: Enhanced Reliability:** Refactored the underlying rotation and display logic for a more stable and reliable compass experience across all watch models.

## Version 1.9.4
*(Released September 17, 2025)*

This is a landmark update focused on intelligent performance and efficiency. We've completely overhauled how Pixel Compass fetches data, resulting in significant battery life improvements and reduced data usage for all users, while also creating a more valuable and responsive experience for Plus members.

#### 📱 Phone
*   **New: Smart API Management:** Rearchitected how the app fetches weather and elevation data. This new system significantly reduces unnecessary API calls, leading to lower data usage and improved battery life.
*   **Enhancement for Plus Users:** The value of Pixel Compass+ is now even greater. Plus subscribers will receive more frequent weather and elevation updates, making it ideal for activities like hiking or cycling where conditions change. The Free tier remains robust with balanced, periodic updates that prevent data from becoming stale while minimizing costs.
*   **Improvement: Optimized Widget & App Syncing:** Data fetched by the app is now seamlessly shared with your home screen widgets (and vice versa). This eliminates redundant network requests, further saving battery and ensuring data consistency across the entire experience.

#### ⌚ Wear OS
*   **New: Major Battery Life Improvement:** Implemented the new intelligent data fetching system specifically tuned for wearables. The app now drastically reduces background network activity by updating weather and elevation on a smart schedule, significantly preserving your watch's battery life.
*   **Improvement: Reliable, Efficient Updates:** Weather and elevation data are now updated based on optimized time intervals and significant movement, ensuring you have relevant, up-to-date information without constant battery drain.


## Version 1.9.3
*(Released September 15, 2025)*

This update addresses key user feedback, dramatically improving the fluidity of the compass animation and optimizing the battery life of the Live Complication feature for a much-improved experience.

#### ⌚ Wear OS
* **Improvement: Ultra-Smooth Compass Rotation:** Rearchitected the data pipeline and UI rendering to deliver an ultra-smooth compass rotation. By removing the data update throttle.

## Version 1.9.2
*(Released September 12, 2025)*

#### ⌚ Wear OS
This update focuses on critical bug fixes and performance enhancements for the compass tile and main app.

* **Critical Fix: Tile Reliability:** The Compass Tile has been made more reliable and responsive. It now actively fetches fresh data when opened and falls back to the last known heading if new data isn't immediately available, preventing freezes.
* **Fix: Performance Boost:** Optimized the compass data flow to prevent excessive updates, resolving a bug that could cause the app to become unresponsive or crash.
* **Improvement: Stability:** Updated core libraries for better stability and performance.


## Version 1.9.1
*(Released September 5, 2025)*

#### 📱 Phone
This version introduces a deep customization system for both the compass and the dynamic info cards, allowing for a truly personal experience. These advanced options are available for Plus users via a new customization menu.

* **Deep Compass Customization:** A powerful new set of options to change the look of your compass, including:
    * **New Styles:** Choose from various new compass styles like `Sunny`, `Cookie`, and `Flower` in addition to the existing ones.
    * **Cardinal Points:** Control the level of detail with "Minimal" (N, S, E, W) or "Expanded" (N, NE, E, SE...) points.
    * **Degree Marks:** Toggle the visibility of the degree tick marks for a cleaner look.
* **Advanced Card Styling:** Personalize the shape and layout of the dynamic info cards with various new style packs, including `Bubbly`, `Wavy`, `Soft`, and `Crystal`.
* **Experimental Features Menu:** A hidden menu for advanced customization, activated by a long-press on the app version in the 'About & Help' screen.

* **Redesigned Customization Menu:** Settings are now logically grouped into 'Compass' and 'Cards' categories for easier navigation.
* **Style-Aware UI:** The app now provides visual recommendations and smart defaults for certain style combinations (e.g., hiding tick marks on complex shapes) and intelligently disables options incompatible with your current selection.
* **Clearer Plus Benefits:** The 'Your Experience' screen has been updated to include and describe the new customization and data precision benefits.
* **Animated Style Previews:** Selecting a style in the customization menu now triggers a small, pleasant animation, providing better visual feedback.

#### ⌚ Wear OS
This release brings major new features to Wear OS, including customization options and enhancements to complications and onboarding.

* **Feature: Compass Shape Customization:** You can now personalize your watch face by choosing from different compass shapes in the app's settings.
* **Feature: Live Complication (Beta):** A new setting lets you enable real-time updates for the compass complication, offering live, at-a-glance direction directly on your watch face.
* **Feature: Advanced Data Toggle:** A new switch in the settings allows you to show or hide advanced data (like altitude) on the main compass view.
* **Improvement: Revamped Onboarding:** The first-time setup experience has been redesigned with smoother animations and clearer instructions.
* **UX: Enhanced Style Selection:** The screen for choosing compass shapes now uses a more intuitive horizontal swipe gesture for easier navigation.


## Version 1.9.0
*(Released September 1, 2025)*

This release introduces a major UI/UX overhaul focusing on Material 3 Expressive principles and significantly improves the app's core stability, data reliability, and background processing.

#### 📱 Phone
*   **Feature: Expressive Card Shapes & Animations:** Dynamic info cards have been completely redesigned. They now use new shapes and fluid animations to visually communicate their function and state.
*   **Feature: Enhanced Home Screen Widgets:** Widgets are now fully responsive, adjusting content to perfectly fit any size and prevent clipped text.
*   **Feature: New Plus Feature - Hide Card Labels:** In the 'Display & Units' settings, Plus users can now hide card labels (like 'Humidity', 'Wind') for a more minimalist look.
*   **Feature: Smoother Navigation:** The icons in the navigation bar now have a 'pop' animation when selected, and transitions between settings screens are more fluid.
*   **Improvement: Simpler Settings & Feedback:** Banners have been redesigned and you'll now find helpful links to related options. Sending feedback is also easier with pre-formatted email templates.
*   **Critical Fix: Major Stability Overhaul:** Rearchitected the core sensor and service management to resolve critical crashes related to background services on modern Android versions, ensuring the app is more reliable than ever.
*   **Critical Fix: Smarter Data Updates:** Dynamic cards and widgets now update more intelligently. Data automatically re-validates after 15 minutes, even if you're stationary, and a bug where Plus features sometimes didn't appear on app start has been fixed.
*   **Fix: Improved Location Handling:** Fixed an issue where the Altitude settings screen would lose location access. Now, all screens that need live data keep it active seamlessly as you navigate.
*   **UX: Developer Easter Egg:** Long-press the app version in the 'About' screen to reveal the detailed version code. Useful for bug reports!

#### ⌚ Wear OS
*   **UI: Redesigned Compass Tile:** The Compass Tile has been visually refreshed with an improved layout, clearer typography, and better alignment, following the latest Material 3 guidelines.
*   **Improvement: Enhanced Sensor Reliability:** Sensor management has been re-architected to be more resilient, reducing freezes and ensuring your compass is always ready when you need it.

## Version 1.9.0 pre-release 1
*(Released August 26, 2025)*

This release introduces a major UI/UX overhaul focusing on Material 3 Expressive principles, smarter layouts, and improved user feedback channels.

#### 📱 Phone
* **Feature: Expressive Card Shapes & Animations:** Dynamic info cards have been completely redesigned. They now use a sophisticated shape system (`MaterialShapes`) to visually communicate their function (e.g., `Cookie4Sided` for informational, `Arch` for interactive) and state (e.g., `Slanted` for active). Transitions between states are now true "morphisms" with fluid `SizeTransform` animations.
* **Feature: Contextual Settings Navigation:** Introduced a "Looking for something else?" card at the end of each sub-setting screen, providing intelligent, contextual links to other relevant settings pages, improving discoverability and user flow.
* **Feature: Intelligent Feedback System:** The user feedback flow has been revamped. It now features new categories (Translation, UI), a user-controlled option to include non-sensitive diagnostic data (app/device info), and pre-formatted HTML email templates tailored to the feedback type for more structured and helpful reports.
* **Feature: Animated Navigation Icons:** Bottom navigation and navigation rail icons are now animated, providing expressive feedback on selection with a "pop" effect using a `spring`-based `AnimatedContent` wrapper.
* **UI: Redesigned Banners:** The highlights banners in settings now match the latest Material 3 "in-page" design, featuring a transparent background, a subtle border, and a cleaner layout with more expressive typography.
* **Improvement: Smarter Widget Layouts:** Widget layouts are now significantly more responsive. They intelligently calculate available space to prioritize content, dynamically hide secondary labels to prevent text clipping, and can show a variable number of extra info items (from 1 to 6) based on the widget's size.
* **Improvement: Enhanced Location Card:** The flippable location card now defaults to showing location name, flipping to reveal coordinates in clean decimal format (e.g., `37.421998, -122.084000`) instead of DMS. It also morphs its shape from a pill to a rounded rectangle on flip.
* **Fix: Dynamic Card Data Loading:** Resolved a critical race condition where dynamic cards would sometimes fail to load "Plus" data on app start. The ViewModel's state collection logic was upgraded from a simple `onEach` to a `combine` operator, ensuring that the card list is re-evaluated whenever *any* relevant user setting (`isPlusUser`, `showExtendedWeatherData`, etc.) is loaded or changed.
* **UX: Hide Card Labels:** Added a new setting for Plus users to hide the secondary labels/units on all dynamic cards for a cleaner, more minimalist look.
*   **Feature: Expressive Navigation Animations:** Icons in the navigation bar now feature more expressive, physics-based "layered" slide animations, providing clearer and more delightful feedback on selection.
*   **Feature: Version Code Easter Egg:** The app version item in the "About" screen now supports a long-press gesture to toggle the visibility of the detailed `versionCode`, making it easier for users to provide specific build information in feedback.
*   **Improvement: Intelligent Widget Layouts:** The layout logic for home screen widgets has been completely re-architected. It now uses a profile-based system (`TINY`, `MEDIUM`, `SPACIOUS`) to adapt to different device screen densities (e.g., Pixel vs. Samsung). This prevents text clipping, optimizes the number of information items displayed, and ensures a perfect layout for any widget size.
*   **Improvement: Refined In-App Update Flow:** The in-app update logic has been made more robust. The flow is now decoupled from the initial check, resolving a bug where users had to tap the update button twice. State management is clearer, and the listener cleanup in `onDestroy` prevents potential memory leaks.
*   **Improvement: Modernized Haptic Feedback:** Refactored `HapticFeedbackUtils` to exclusively use modern APIs (`VibratorManager`) for Android 13+, removing all deprecated code and improving consistency.
*   **Critical Bug Fix: Background Service Crash:** Resolved a `BackgroundServiceStartNotAllowedException` crash by replacing direct `startService` calls with `ContextCompat.startForegroundService`. This ensures compliance with modern Android background execution restrictions.
*   **Critical Bug Fix: Invalid Sensor Data Crash:** Eliminated an `IllegalArgumentException: Cannot round NaN value` by adding defensive checks in the compass UI. The display now safely handles invalid `NaN` azimuth values during initialization, preventing crashes.

#### ⌚ Wear OS
*   **UI: Redesigned Compass Tile:** The Compass Tile has been visually refreshed. The layout was re-architected for better alignment and typography, and it now features a custom compass icon for improved branding and clarity.
*   **Improvement: Enhanced Sensor Reliability:** The underlying sensor management on Wear OS was refactored to be more resilient, reducing potential freezes and ensuring complications and the main app have access to reliable, real-time data.

## Version 1.8.0
*(Released August 19, 2025)*

This stable release consolidates all the features and fixes from the 1.8.0 beta cycle, focusing on user engagement, Wear OS enhancements, and core stability.

#### 📱 Phone
*   **Feature: "What's New" & Onboarding:** A completely redesigned, expressive first-launch experience guides new users, while a new "What's New" screen informs existing users about the latest updates after an upgrade.
*   **Feature: Dynamic Highlights Banner:** An intelligent, dismissible banner carousel in the Settings screen now communicates important news, promotions, and feature discovery opportunities.
*   **Improvement: Smarter Altitude Calibration:** The altitude system is now more proactive, automatically checking for staleness based on atmospheric pressure changes in addition to time and distance, ensuring greater accuracy.
*   **UX: In-App Review Prompt:** The app now intelligently prompts for a Play Store review based on usage, following Google's best practices.

#### ⌚ Wear OS
*   **Feature: Compass Tile:** A brand-new Material 3 Tile provides quick, glanceable access to your last known compass heading directly from the carousel.
*   **Architecture: "Snapshot-and-Launch" Pattern:** The Tile displays the most recent cached data and includes a button to launch the full app for a real-time experience, perfectly balancing utility and battery preservation.
*   **Improvement: Enhanced Altitude Control:** Users can now manually force a recalibration of the altitude reference via a new button on the Altitude Status screen. The app also proactively checks for calibration when resumed.
*   **Bug Fix: Background Battery Drain:** Resolved a critical battery drain issue by completely re-architecting sensor management. The app no longer runs services in the background, and sensors are only active when the app or a complication is visible.

## Version 1.8.0 Beta 2
*(Released August 15, 2025)*

#### ⌚ Wear OS
*   **Feature: Compass Tile:** Introduced a brand-new, data-driven Compass Tile designed with Material 3. It acts as a "snapshot" of your last known heading, providing quick, glanceable information.
*   **Architecture: "Snapshot-and-Launch" Pattern:** The Tile displays the most recent cached compass data and includes a button to launch the full app for a real-time, high-frequency experience, perfectly balancing utility and battery preservation.
*   **UI: High-Fidelity Preview:** The tile selection screen now shows a high-fidelity PNG preview of the Tile's final design, generated directly from the layout code for perfect accuracy.

## Version 1.8.0 Beta 1
*(Released August 13, 2025)*

#### 📱 Phone
*   **Feature: "What's New" Screen:** After an update, users will now see a new screen highlighting the latest features and improvements, built with a data-driven XML backend for easy updates and translation.
*   **Feature: Dynamic Highlights Banner:** Implemented an intelligent, dismissible banner carousel on the Settings screen to communicate important news, such as new features or app promotions.
*   **Feature: In-App Review Prompt:** The app now intelligently prompts users for a Play Store review based on usage.
*   **UX: Expressive Onboarding Flow:** Completely redesigned the first-launch experience with a new, fully animated, and expressive multi-page onboarding flow.
*   **Improvement: Smarter Altitude Calibration:** The altitude reference is now automatically checked for staleness based on significant changes in atmospheric pressure.

#### ⌚ Wear OS
*   **Feature: Manual Altitude Recalibration:** Added a refresh button to the Altitude Status screen, allowing users to manually force a recalibration.
*   **Improvement: Proactive Altitude Check:** The app now automatically verifies the validity of the altitude reference when it's resumed.
*   **Refactor: Complication Reliability:** The internal logic for managing complication data and sensor updates was refactored for improved reliability and responsiveness.
*   **Critical Bug Fix: Background Battery Drain:** Rearchitected the app's sensor and service logic to resolve a major battery drain issue. The persistent `SensorService` has been removed. Sensors are now managed directly by the active UI component (Activity or Complication) and are only active when the app is in the foreground or a complication is visible, drastically improving battery life when idle.
*   **Bug Fix: First-Launch Flow:** Corrected a race condition during the initial app startup. The permission rationale screen is now reliably displayed to new users before the system permission dialog is triggered, preventing the main compass screen from appearing prematurely.

## Version 1.7.3
*(Released August 3, 2025)*

#### 📱 Phone
*   **Critical Bug Fix: In-App Update Crash:** Resolved a crash that occurred for production users when the in-app update notification (`Snackbar`) was displayed. The issue was traced to a theme/context mismatch and has been fixed by ensuring the `Snackbar` is created with the correct Activity context.


## Version 1.7.2 Beta 1
*(Released August 2, 2025)*

#### 📱 Phone
*   **Feature: One-Time Purchase Option:** Added a "Buy for life" option to the purchase screen, providing users with an alternative to the monthly subscription. The `BillingClientManager` has been refactored to query and handle both `SUBS` and `INAPP` product types in separate, compliant API calls, fixing a crash related to querying mixed product types.
*   **UX Improvement: Clearer Purchase Screen:**
    *   Redesigned the purchase action section to present both subscription and one-time purchase buttons clearly.
    *   Added a distinct "OR" separator to visually distinguish the two choices.
    *   Included a "Why a subscription?" link in the footer, directing users to a webpage for more information on the benefits of recurring support.
*   **Bug Fix: Dynamic Card Loading:** Fixed a critical bug where premium dynamic cards would not appear for Plus users when data was loaded from the cache. The `ViewModel` now reacts to changes in the user's subscription status and re-evaluates the card list to ensure all entitled features are displayed immediately.
*   **Bug Fix: Persistent Premium Features:** Corrected an issue where features like "Wind on Compass" could remain active for users whose subscription had expired. Feature visibility is now strictly tied to a real-time check of the `isPlusUser` status.

## Version 1.7.1 Beta 1
*(Released August 2, 2025)*

#### 📱 Phone (:shared Module)
*   **Architectural Refactor: Altitude Logic:** Simplified `AltitudeManager` into a pure calculator, removing its responsibility to request recalibration. This improves separation of concerns and centralizes control within the platform-specific ViewModels.
*   **Architectural Refactor: Location Repository:** Updated the `LocationRepository` to support different location request priorities, enabling more granular control over accuracy vs. battery consumption.

#### ⌚ Wear OS
*   **Critical Bug Fix: GPS Battery Drain:** Rearchitected the location logic to eliminate continuous background GPS usage. The GPS is now activated intelligently for short periods only when the app is active and a high-precision location is needed for altitude calibration, drastically improving battery life.
*   **Sensor Reliability: Anti-Freeze System:**
    *   Implemented a robust Foreground Service (`SensorService`) to ensure the operating system prioritizes sensor data collection, preventing freezes when the device enters ambient mode.
    *   Created a "Sensor Watchdog" mechanism within the `ViewModel` that actively monitors the sensor data stream. If data stops flowing, it automatically restarts the sensor listeners to self-correct without user intervention.
*   **Altitude System Overhaul:**
    *   Moved the core calibration logic from `AltitudeManager` to the `ViewModel`, making the `ViewModel` the central orchestrator for when to check and refresh the altitude reference.
    *   Fixed a bug that caused the app to request a new altitude calibration from the network every time it was opened, even if the location hadn't changed. The app now correctly uses the saved valid reference.
*   **UX Improvement: Permission Flow:** Redesigned the initial location permission flow. The app now requests permission from the system once upon startup. If the user denies it, they are shown a single, clear rationale screen where they can choose to proceed without location features, preventing them from being stuck.

## Version 1.7.0 Beta 1
*(Released July 31, 2025)*

#### 📱 Phone
* **Altitude Status & Settings:** Introduced a dedicated altitude settings screen with status display, calibration info, and permission management.
* **Altitude Status Icon:** Added an altitude status icon to the compass display that reflects the calibration state and allows for quick navigation to altitude settings.
* **In-App Updates:** Integrated flexible in-app update support using Play Core, managed by a new `InAppUpdateManager`.
* **UI & UX Refinements:** Relocated info text components to appear below their related settings for improved logical grouping and UI clarity.
* **Translations & Theming:** Added new translations for settings, notifications, and other new features, along with a custom dark color scheme and support for dynamic theming.
* **Location Accuracy:** Tuned location request priority between high accuracy and balanced power to optimize for precision and battery life.
* **Architecture Refactor:** Refactored altitude and location handling in the `CompassViewModel` and replaced `AltitudeLogic` with a more robust `AltitudeManager` for improved calculation and data storage.
* **Bug Fix:** Corrected the compass azimuth for display rotation, ensuring accurate readings regardless of screen orientation.

#### ⌚ Wear OS
* **Sensor Reliability:** Introduced a sensor watchdog to monitor and restart sensor listeners if no updates are received, ensuring continuous azimuth data.
* **Foreground Service:** Added a foreground `SensorService` for continuous sensor data collection, with necessary permissions and user-facing notifications.
* **Altitude Status & UI:** Added a new Altitude Status screen to the settings and introduced UI indicators on the compass display reflecting the reliability of altitude data.
* **Interactive Level Screen:** Implemented an interactive level screen with a dynamic blurred background, precision reticle, and haptic feedback for a more engaging experience.
* **Translation Updates:** Added new altitude-related string resources and updated existing translations for new features.
* **UI Polish:** Adjusted the compass icon and background sizes for improved visual balance.
* **Bug Fixes:** Normalized the azimuth value to prevent negative or overflow values and enabled live updates for the compass complication based on sensor changes.

#### 🌐 Website
* **Interactive Changelog:** The version history page has been completely redesigned into an interactive, accordion-style layout with platform-specific filtering, aligning with Material 3 expressive design principles.

## Version 1.6.1
*(Released July 31, 2025)*

#### ⌚ Wear OS
* **Display Rotation Fix:** Moved display rotation correction from the ViewModel to the UI layer, ensuring the compass azimuth is correctly adjusted based on the device's orientation.

## Version 1.6.0
*(Released July 30, 2025)*

#### 📱 Phone
* **Level Screen Redesign:** Introduced a new `FlatLevelContent` UI with a dynamic bubble, precision reticle, and blurred background. The screen now dynamically locks orientation for a consistent experience.
* **Adaptive Layouts:** Introduced `AppNavigationRail` for tablets and foldables, with logic to seamlessly switch between bottom navigation and the rail based on window size.
* **Settings Screen Overhaul:** Completely restructured the settings screen into sub-screens for better organization and added a responsive two-pane layout for larger displays.
* **Regional Formats:** Added a new master switch "Use regional formats" to automatically align units with the device's locale settings.
* **Pixel Compass+ Management:** Updated the billing system to support both existing one-time purchases (now "Legacy") and new subscription-based "Plus" features, ensuring early supporters retain lifetime access.
* **UI/UX Enhancements:** Improved compass rotation responsiveness, added an animated calibration dialog, enhanced navigation transitions, and included a "Keep screen on" option.
* **Code Optimizations:** Removed legacy code for status bar colors, centralized scrolling logic for settings panes, and refactored components for better maintainability.

#### ⌚ Wear OS
* **New Complication:** The compass complication now uses a custom icon for better visual branding and handles invalid data by showing the app name as a fallback.
* **New Features:** Added a dedicated compass calibration screen, support for dynamic theming, and a "Keep screen on" setting.
* **Compass Accuracy:** Corrected the azimuth calculation to adjust for the device's display rotation, ensuring accurate readings.
* **Compatibility Fix:** Updated the app manifest to resolve compatibility issues with certain complication types.

#### 🌐 Website
* **Major Documentation Localization:** Translated the entire documentation site into multiple languages, including Spanish, Portuguese, Japanese, French, German, and Hindi.
* **New Language Picker:** Added a new language picker with a dedicated UI to allow users to easily switch between supported languages.
* **Content Updates:** Added a new "Pixel Compass+" page with a feature grid, updated the homepage with a Wear OS section, and added a testimonials section.
* **Dynamic UI:** The "Latest Update" panel now dynamically fetches the most recent changelog, and a roadmap summary appears on the index page.
* **i18n Engine:** Reworked the language handling system to dynamically load UI strings and markdown content for each language, with a robust fallback to English.

## Version 1.5.4
*(Released July 25, 2025)*

#### 📱 Phone
* **Foreground Service:** Introduced a dedicated `Foreground Service` to manage sensor data, significantly improving compass reliability and preventing the OS from stopping updates.
* **Smarter Sensor Management:** The Compass and Level screens now manage their own sensor activity, optimizing battery consumption by ensuring sensors are active only when needed.
* **Persistent Weather Caching:** Implemented a new persistent cache for weather API responses to reduce network calls and provide the last known data instantly on startup.
* **Keep Screen On:** The screen now intelligently stays on when viewing the Compass or Level screens, preventing interruptions during active use.
* **Flexible Widgets:** Reduced the minimum size of home screen widgets to 1x1 and implemented adaptive font sizes for better readability.
* **Redesigned Condition Card:** The main weather condition card has been redesigned for better clarity and now includes the current temperature.
* **Smoother Transitions:** Navigation between main screens now uses the "Shared Axis" animation for a more fluid experience.
* **Theming Overhaul:** Updated the app's color palette to be fully compliant with Material 3 guidelines, fixing contrast issues.
* **Critical Data Sync Fix:** Resolved a bug that caused the app and widgets to display stale weather information, ensuring data is always up-to-date.
* **Level Screen Freeze Resolved:** Fixed the underlying issue that caused the Level screen to become unresponsive after navigating away from the compass.

## Version 1.5.3
*(Released July 23, 2025)*

#### 📱 Phone
* **Revamped Widget Configuration:** The widget setup screen has been redesigned from the ground up with a modern, intuitive, tab-based layout inspired by Android's native settings.
* **Enhanced Widget Previews:** Upgraded the widget picker experience with a dynamic live preview for Android 15+ and Material You colored static previews for Android 13 & 14.
* **Full Internationalization:** All new text in the redesigned widget configuration screen has been translated into all 18 supported languages.

## Version 1.5.2
*(Released July 20, 2025)*

#### 📱 Phone
* **Intelligent & Adaptive Widgets:** The home screen widgets have been completely redesigned to be smarter and more visually polished. They now feature adaptive layouts that automatically adjust to show the most relevant information based on the size the user chooses, preventing text from being cut off.
* **Contextual Information:** The "Extra Info" section on larger widgets is now contextual. For example, the Temperature widget will show complementary data like wind speed and precipitation chance, while the Altitude widget will display atmospheric pressure and temperature, making each widget a powerful, focused tool.
* **Official Google Weather Icons:** Replaced all generic weather icons in both the app and widgets with the official, full-color icon set provided by Google's Weather API. This ensures visual consistency and immediate recognition of weather conditions like "Mostly Cloudy," "Scattered Showers," and more.
* **UI & UX Refinements:**
    * Corrected a visual bug where custom icons (like Wind and UV Index) were incorrectly colored in larger widgets.
    * Improved the visual hierarchy in all widgets to make primary information stand out more clearly.
    * Fixed a bug in the main app's "Condition Card" where the new weather icons were being incorrectly colored by the app's theme.

#### ⌚ Wear OS
* **Full Migration to Material 3 Architecture:** Corrected a critical issue where the scrollbar (`PositionIndicator`) and the top clock (`TimeText`) would not appear correctly on scrollable screens. The app now properly uses `AppScaffold` and `ScreenScaffold`, fully complying with Google Play's UI guidelines and ensuring smooth animations.
* **Redesigned Permission Screen:** The permission request screen has been visually updated to precisely match Material 3 Expressive guidelines, featuring distinct "confirm" (circular) and "decline" (squircle) buttons for a more intuitive experience.
* **UI and Layout Polish:** Improved layout consistency, padding, and color usage across all Wear OS screens for a more polished and cohesive interface that adapts beautifully to round displays.
* **Architectural Refactor:** The app's internal structure was significantly improved by splitting the UI into modular, reusable screens (`SettingsScreen`, `PermissionScreen`) and centralizing navigation logic. This makes the app more robust and easier to maintain.

## Version 1.5.1
*(Released July 19, 2025)*

#### 🌐 Website
* **Complete Redesign:** Overhauled the project's documentation website using Material 3 for a modern, clean, and responsive user interface.
* **Single-Page Application (SPA):** The site is now a modular SPA, replacing static HTML files with dynamic routing and content loading.
* **Dynamic Navigation:** Implemented a fully dynamic navigation bar and footer for a consistent user experience.
* **Improved Mobile Experience:** Added a custom 404 page and made major improvements to mobile navigation and UI transitions.

#### ⌚ Wear OS
* **UI Refinements:** Refined the theme and settings UI for better clarity and usability on the wrist, ensuring consistency with Material 3 guidelines.

#### 📱 Phone
* **Reduced API Calls:** Implemented an intelligent caching system that allows the app and widgets to share data, eliminating redundant network requests and saving battery life.
* **Optimized Widget Performance:** Resolved an issue where adding or resizing a widget would trigger a "storm" of background tasks. Resizing is now a smooth, UI-only operation.
* **Smarter App Updates:** The app now intelligently waits for a significant location change or for data to become outdated before fetching new information.
* **Faster App Startup:** Significantly improved UI responsiveness on launch by optimizing data loading, reducing skipped frames by over 50%.
* **Bug Fix:** Corrected a critical issue where multiple background workers could be launched simultaneously by the widget, leading to excessive processing.

## Version 1.5.0
*(Released July 18, 2025)*

#### ⌚ Wear OS
* **Initial Release:** Launched the standalone Wear OS application with full compass functionality (True/Magnetic North), on-wrist settings, and a fluid, responsive UI.
* **Material 3 & Dynamic Theming:** Implemented Material 3 for Compose, including support for Dynamic Theming on Wear OS 4+.

#### 📱 Phone
* **Complete Widget Overhaul:** Rewrote widgets with a new architecture, responsive layouts, and the ability to display rich weather details.
* **Smarter Widget Updates:** Enhanced background update logic with network constraints and a robust retry system for transient failures.
* **Themed External Links:** External links within the app now use the primary color from the system's dynamic theme.
* **Refactoring & Improvements:** Optimized internal navigation, improved the app launch flow from widgets, and standardized the project structure with `:shared` and `:uicommon` modules.
* **Bug Fixes:** Fixed a critical issue with the predictive back gesture and corrected a broken widget configuration path.

## Version 1.4.1
*(Released July 15, 2025)*

#### ⌚ Wear OS
* **Play Store Visibility:** Updated build configurations to require watch hardware, improving the app's filtering and visibility in the Play Store.

## Version 1.4.0
*(Released July 15, 2025)*

#### 📱 Phone
* **Experimental Level Screen:** Introduced the Level Screen (Beta) for surface inclination measurement, accessible from the main navigation bar.

#### ⌚ Wear OS
* **Multi-language Support:** Added extensive multi-language support to the Wear OS application, including localized strings for all settings and UI components.

## Version 1.3.2
*(Released July 5, 2025)*

#### 📱 Phone
* **UI Enhancements:** Enhanced weather cards with new localized precipitation icons and a smoother animated wind indicator.
* **Locale-based Units:** The app now defaults to imperial or metric units based on the user's device locale for a better out-of-the-box experience.

## Version 1.3.1
*(Released July 2, 2025)*

#### 📱 Phone
* **Visual Upgrades:** Introduced new UI enhancements, including gradient backgrounds for subscription cards and scrolling marquee text for long titles.
* **Translation Updates:** Added new translations for several languages.
* **Legacy User Support:** Enabled Pixel Compass+ features for original "Pro" version owners to ensure a smooth upgrade path.

## Version 1.3.0
*(Released July 2, 2025)*

#### 📱 Phone
* **Wind Direction Indicator:** Added a major new feature for Plus users: a wind direction indicator directly on the compass rose.
* **Visual Upgrades:** Implemented significant visual upgrades to all dynamic weather cards and their animations for a more fluid display.

## Version 1.2.0
*(Released June 20, 2025)*

#### 📱 Phone
* **User Onboarding:** Implemented a comprehensive, animated, multi-page user onboarding flow to introduce core features and permission requirements.
* **Refined Animations:** Refined screen transition animations for a smoother navigation experience.
* **Translation Updates:** Added extensive new translations for the onboarding process and other UI elements.

## Version 1.1.0
*(Released June 16, 2025)*

#### 📱 Phone
* **Introducing Pixel Compass+:** A one-time purchase to unlock premium features and support future development.
* **Configurable Home Screen Widgets:** Add a single, versatile widget and configure its content to display Altitude, Compass, Location, or one of six Weather Info cards. All widgets are Material You themed.
* **Technical Implementation:** Integrated Google Play Billing Library v7+ and Jetpack Glance.

## Version 1.0.0
*(Released June 10, 2025)*

#### 📱 Phone
* **Core Functionality:** Initial release featuring True/Magnetic North navigation, integrated elevation data, and interactive compass calibration.
* **Customization:** Added options for Light/Dark/System themes and customizable units.
* **Comprehensive Localization:** Translated the app into 11 languages.
* **Initial Setup:** Implemented an animated splash screen and user-friendly permission flows.