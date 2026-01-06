# Privacy Policy for Pixel Compass

**Last Updated:** January 06, 2026

Welcome to Pixel Compass! This Privacy Policy explains how **fertwbr** ("we," "us," or "our") handles information when you use our Pixel Compass mobile application (the "Service").

Our commitment is to your privacy. While Pixel Compass requires specific sensors and connectivity to function, we aim to process data locally whenever possible and minimize external transmission.

## 1. Information We Process

To provide accurate navigation and weather data, the application processes the following types of information:

### a) Location Data (Precise)
* **Purpose:** The core functionality of the Service relies on access to your device's precise location (latitude and longitude). We use this to:
    * Display your geographical coordinates.
    * Calculate **True North** (by determining magnetic declination for your specific location).
    * Fetch local weather conditions and elevation data via external APIs.
    * Power location-based widgets (if Pixel Compass+ is active).
* **Processing & Sharing:**
    * **Local Use:** Used internally by the Android `android.hardware.GeomagneticField` API to correct compass errors.
    * **External APIs:** Your coordinates are sent to third-party providers (**Google Weather API** and **Google Elevation API**) strictly to retrieve the environmental data displayed on your screen.
* **Collection Trigger:** Location data is accessed only when the app is in use (foreground) or when a widget requires a scheduled update. We use a **Foreground Service** (indicated by a persistent notification) to ensure sensor accuracy and data updates remain active while you are using the app. **We do not track or store your location history in the background.**

### b) Sensor Data
* **Types:** Accelerometer, Magnetometer (Compass), Rotation Vector, and Pressure Sensor (Barometer).
* **Purpose:** Essential to calculate Azimuth (compass bearing), Pitch, Roll, and Altitude estimates.
* **Processing:** This data is processed **entirely locally on your device**. It is **not** recorded, stored on external servers, or transmitted to us.

### c) Network Access & API Data
* **Purpose:** Internet access is required to communicate with Weather and Elevation APIs and to validate In-App Purchases with Google Play.
* **Data Transmitted:** Latitude, Longitude, and standard IP address information required for HTTPS requests to Google's services.

### d) In-App Purchase Information (Pixel Compass+)
* **Purpose:** To manage access to premium features via either a **one-time purchase (Legacy)** or a **recurring subscription**.
* **Data Processed by Google Play:** All financial transactions are handled securely by **Google Play's billing system**. We do **not** collect, access, or store your payment information (such as credit card numbers or bank account details).
* **Local Storage:** We store a local flag on your device (via DataStore preferences) indicating your "Premium" status. This allows the app to verify your license offline and unlock features without constant internet access.

## 2. Permissions

To provide the Service, we request the following permissions on your device:

* **Location (Precise):** Required to calculate True North, magnetic declination, and fetch accurate Weather/Elevation data.
* **Internet:** Required to fetch API data and verify subscription status.
* **Foreground Service:** Required to maintain active sensor readings and location updates without interruption while the app is running or the screen is active.
* **Notifications:** Used to display the foreground service status (a requirement by the Android System) or to provide alerts related to the app's functionality.

## 3. Information Sharing and Disclosure

We do **not** sell, rent, or share your personal information with advertisers or unauthorized third parties. However, to provide the features of the app, specific data is shared with the following service providers:

* **Google Weather & Elevation APIs:** Your latitude and longitude are sent to these services solely to return weather and altitude data to your device.
* **Google Play Billing:** Used to process payments and validate your subscription or legacy license.
* **Legal Requirements:** We may disclose information if required by law or in response to valid requests by public authorities (e.g., a court or a government agency).

## 4. Data Security, Retention, and Deletion

* **Security:** We use industry-standard **HTTPS** encryption for all API requests. Sensor data (magnetometer/accelerometer) is processed in real-time memory and discarded immediately after calculation.
* **Retention:**
    * **Cache:** Weather data may be temporarily cached on your device to reduce data usage and improve performance.
    * **Preferences:** User settings (Theme, Unit systems, True North toggle, Plus Status) are stored locally on your device via DataStore.
* **Deletion:**
    * You can clear all stored data by uninstalling the application or clearing the app's storage via Android Settings. This will immediately remove all local preferences and widget configurations.
    * **Note on Purchases:** Clearing app data deletes the local "Premium" flag. To restore your status after reinstalling or clearing data, simply use the **"Restore Purchases"** option in the app settings, which will re-validate your license with Google Play.

## 5. Navigation & Safety Disclaimer

Pixel Compass is a software tool utilizing consumer-grade hardware sensors found in mobile devices.

* **Not for Critical Navigation:** **Do not** rely on this application for maritime, aviation, or professional land navigation where inaccuracy could result in harm, death, or property damage.
* **Interference:** Compass readings can be heavily affected by magnetic interference from nearby electronics, batteries, cars, or protective cases containing magnets. Always verify your surroundings.

## 6. Children's Privacy

The Service is not intended for anyone under the age of 13. We do not knowingly collect personally identifiable information from children. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us.

## 7. Changes to This Privacy Policy

We may update our Privacy Policy from time to time. We will notify you of any significant changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this document.

## 8. Contact Us

If you have any questions about this Privacy Policy or the practices of this app, please contact us at:

**Email:** fertwbr@programmer.net