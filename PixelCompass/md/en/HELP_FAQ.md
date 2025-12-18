# Pixel Compass - Help & Frequently Asked Questions

Welcome to the Pixel Compass Help & FAQ page! Our goal is to help you navigate your world with precision and style — and make the most of your experience.

## Getting Started {: data-toc-key="getting_started" }

### 1. What permissions does Pixel Compass need and why?
Pixel Compass requires **Precise Location** permission to enable its best features:
-   **True North Accuracy:** To calculate the local magnetic declination for a precise geographic North reading.
-   **Weather & Environmental Data:** To fetch local weather, your location's name, and elevation data for the Dynamic Info Cards.
-   **Pixel Compass+ Widgets:** Location is required for the widgets to update with accurate, relevant data in the background.
-   **Notification Access:** (Optional but recommended) Required for reliable background service updates on Android 13+ and for the new "Smart Notifications" feature.

> Your location is only used when the app is active or for periodic widget updates. We never store or track your location history. You can manage permissions at any time in your device settings.

### 2. Understanding the Main Compass Screen
-   **Compass Dial:** The main rotating element. The top of your device always indicates your heading.
-   **Azimuth & Cardinal Direction:** The large number is your heading in degrees, and the text below (e.g., "NW") is the cardinal direction.
-   **Circular Info Ring:** Displays your Latitude, Longitude, Altitude, and the device's Incline at a glance.
-   **Dynamic Info Cards:** (Optional, enable in Settings) A scrollable area below the compass showing real-time location, weather, and more.
-   **At a Glance Interaction:** (v1.13.0+) Tapping certain areas of the screen reveals the "Split" layout, showing weather alerts and smart insights side-by-side.
-   **Quick Actions Bar (FAB):** The floating buttons for quick access to True North, Calibration, and Theme toggles.

## Using the Level Screen {: data-toc-key="level" }

### 1. How does the redesigned Level Screen work?
The Level screen is a powerful tool that uses expressive animations and adapts to how you hold your device.
-   **Flat Mode (Bullseye):** When your device is lying face-up on a surface, it shows a "bullseye" level with a ripple effect. The goal is to center the morphing, fluid bubble.
-   **Linear Mode (Upright):** When your device is held upright (either vertically or horizontally), it shows a linear "bubble tube" level with a fluid, wave-like background. The goal is to center the bubble on the `0°` mark.

### 2. How do I ensure the Level is accurate?
The Level tool uses the same motion sensors as the compass. For best results, place your phone on a known flat surface and use the **Calibrate** button on the main Compass screen. Performing the figure-eight motion will reset and improve the accuracy of all motion-based features.

## Pixel Compass on Wear OS {: data-toc-key="wearos" }

- **A Standalone Experience:** The Wear OS app is fully independent and uses your watch's own sensors.
- **Compass Tile:** (v1.8.0+) Add the Compass Tile to your watch carousel for a quick "snapshot" of your last known heading and current altitude without opening the full app.
- **Customization:** Choose from **9 New Color Themes** (v1.14.0+), including AMOLED Black, Emerald, and Sunset.
- **Precision Tools:** You can manually calibrate altitude directly on your watch and toggle **Compass Inversion** if you wear your watch on your right wrist.
- **Installation:** Install it via your paired phone's Play Store app or directly from the Play Store on your watch.

## Pixel Compass+ & Widgets {: data-toc-key="plus" }

### 1. What is Pixel Compass+?
Pixel Compass+ is our premium feature set, available via a flexible subscription or a lifetime license. It unlocks the app's full potential and supports its future development.

### 2. What are the key Plus features?
-   **Insight Engine 4.0:** Proactive alerts like "Picnic Day", "Strong Winds", or "Pressure Dropping" alerts (v1.12.0+).
-   **Deep Customization:** Unlock premium compass styles (`Sunny`, `Cookie`, `Flower`), advanced card pack shapes, and the **AMOLED Black** app theme.
-   **Forecast Charts:** Tap any weather card to see interactive hourly charts for Temperature, Precipitation, and the **Sun Path**.
-   **Ultimate Widget Suite:** Access exclusive shapes (Modern, Pill, Arch, Cookie) and the **Clock Widget** with native battery efficiency (v1.14.0+).
-   **Interactive Wind Indicator:** A real-time wind vane on the compass rose.
-   **Ad-Free Experience:** Removes all advertising for a focused experience.
-   **Settings Backup:** Your Plus preferences are automatically backed up to the cloud and can be restored with one tap (v1.9.5+).

### 3. How does the Subscription work? What if I already paid?
-   **New Users:** Pixel Compass+ is available via a low-cost monthly subscription.
-   **Legacy Users:** If you made the one-time purchase **before version 1.7.2**, you have **Legacy status**. You get **free, lifetime access** to all Plus features.
-   **Lifetime Option:** A "Buy for life" one-time purchase is available for those who prefer not to have a subscription.

### 4. How do I add and configure widgets?
1.  **Add:** Long-press your home screen, select "Widgets", and find Pixel Compass.
2.  **Configure:** A modern setup screen will open. You can choose the **Type** (Altitude, Compass, Weather, etc.) and the **Shape**.
3.  **Real-Time Updates:** High-frequency updates (v1.12.0+) provide smooth needle animations directly on the home screen.
4.  **Best Practices:** For reliability, ensure Pixel Compass is set to "Unrestricted" in your device's Battery settings and that notifications are enabled.

## Altitude & Calibration {: data-toc-key="altitude" }

### 1. How is altitude calculated?
Pixel Compass uses a multi-source engine:
- **Barometer:** (If available) Uses air pressure for relative changes and high precision.
- **Elevation API:** Calibrates the barometer using Google's topographical data.
- **GPS Fallback:** Used when network or barometer data is unavailable.

### 2. When and how should I calibrate?
- **Manual Calibration:** If you know your exact altitude, you can enter it manually in **Settings > Altitude** for professional-grade precision.
- **Compass Calibration:** If the needle is jumpy, tap the **Calibrate** button and move your device in a **figure-eight (∞)** pattern while rotating it along all three axes.

## Troubleshooting & FAQ {: data-toc-key="troubleshooting" }

-   **My compass is stuck or inaccurate.**
    -   Ensure your phone case doesn't have magnets. Perform the figure-eight calibration away from large metal objects.
-   **The weather says "Location Not Supported".**
    -   Some regions might not have data coverage from the Weather API. You can disable weather features in Settings to hide the error.
-   **My widgets are not updating.**
    -   Check if "Battery Optimization" is killing the app. Set Pixel Compass to "Unrestricted" and ensure you have given "Allow all the time" location permission.

## Support & Feedback {: data-toc-key="support" }

- **In-App Feedback:** The best way to reach us! Use the redesigned Feedback sheet (**Settings > Help & Support**) which includes draft autosaving and diagnostic info options.
- **Contact Email:** **fertwbr@programmer.net**
- **Project Page:** [fertwbr.github.io/PixelCompass/](https://fertwbr.github.io/PixelCompass/)

## Privacy Policy {: data-toc-key="privacy" }
We take your privacy seriously. We do not collect or store your location data. Read our full policy:
[fertwbr.github.io/PixelCompass/privacy](https://fertwbr.github.io/PixelCompass/privacy)

Thank you for choosing **Pixel Compass**!