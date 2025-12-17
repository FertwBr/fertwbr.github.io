# Privacy Policy for Pixel Compass

**Last Updated:** July 28, 2025

Welcome to Pixel Compass! This Privacy Policy is provided by **fertwbr** ("we," "us," or "our") and explains how we collect, use, and disclose information when you use our Pixel Compass mobile application (the "Service").

Please read this Privacy Policy carefully. By downloading, accessing, or using the Service, you agree to the collection and use of information in accordance with this policy.

## 1. Information We Collect

To provide and improve the Service, we may collect or process the following types of information:

**a) Location Data (Precise):**
*   **Purpose:** The core functionality of the Service requires access to your device's precise location (latitude and longitude) to:
    *   Display your current orientation and geographical coordinates.
    *   Provide weather information relevant to your location.
    *   Calculate True North.
    *   Obtain elevation data for your location.
    *   Power location-based widgets (if Pixel Compass+ is active).
*   **How it's used and with whom it's shared:**
    *   Displayed to you within the app and widgets.
    *   Sent to a third-party weather service provider (**Google Weather API**) to fetch weather forecasts and current conditions.
    *   Sent to a third-party elevation service provider (**Google Elevation API**) to obtain elevation data.
    *   Used locally on your device by the `android.hardware.GeomagneticField` API to calculate magnetic declination if you enable the "True North" feature.
*   **Collection Trigger:** Location data is only accessed when you are actively using the app (or its widgets require it for a foreground/background refresh) and have explicitly granted location permission. We do not track your location for other purposes when the app is not in active use for its core functionalities. A **Foreground Service** may be used to ensure continuous sensor and location data updates while the app is in use, which is indicated by a persistent notification as required by Android.

**b) Sensor Data:**
*   **Types of Sensors:** Accelerometer, magnetometer, rotation vector sensor, and potentially the pressure sensor (barometer).
*   **Purpose:** Essential for compass readings (azimuth), device orientation (pitch/roll), inclination, and can contribute to altitude calculations and power Plus widgets.
*   **Processing:** This sensor data is processed **entirely locally on your device**. It is **not** transmitted off your device by us, nor is it stored by us beyond the immediate needs of the application's current session or for Plus widget display.

**c) Network Access & Device Information for API Calls:**
*   **Purpose:** Internet access is required to fetch weather data, elevation data, and to facilitate in-app purchases.
*   **Data Transmitted to Third-Party APIs (Google Weather, Google Elevation):** Latitude, longitude, and IP address (as part of standard internet communication).
*   **Google's Privacy Policies:** Governed by Google's applicable privacy policies (e.g., [Google Privacy Policy](https://policies.google.com/privacy)).

**d) In-App Purchase Information (Pixel Compass+):**
*   **Purpose:** To unlock premium features through either a **one-time purchase (Legacy)** or a **recurring subscription**.
*   **Data Processed by Google Play:** All purchase and subscription transactions are processed directly by **Google Play's billing system**. We do **not** collect or store your payment information (like credit card details). Google Play provides us with a confirmation of your purchase or subscription status (e.g., whether you own a "Pixel Compass+ Legacy" license or have an active "plus-monthly-plan" subscription).
*   **How Purchase Status is Used:** Your entitlement status is used locally within the app to:
    *   Unlock Plus features and widgets.
    *   Verify your entitlement to Plus features (e.g., when restoring purchases).
*   **Data We Store Related to Purchases:** We store a local flag on your device (via DataStore preferences) indicating whether you have an active "Pixel Compass+" entitlement. This is used for quick offline verification of your Plus status. This flag can be updated by querying Google Play's billing system. We do not store purchase tokens or order IDs on our servers.
*   **Google Play's Privacy Policy:** Transactions are subject to Google Play's Terms of Service and Privacy Policy.

**e) Non-Personal Usage Data & Diagnostics (Future Consideration):**
*   Currently, Pixel Compass does **not** collect analytics or diagnostic data that personally identifies you.
*   If implemented in the future, this policy will be updated, and such collection will aim for anonymity or aggregation, with appropriate consent if personal data is involved.

## 2. How We Use Your Information

*   **To Provide, Operate, and Maintain the Service:** Including all free and Plus features and widgets.
*   **To Personalize Your Experience:** Tailored weather, elevation, and location information.
*   **To Process In-App Purchases:** To enable and verify access to Pixel Compass+ features via Google Play.
*   **To Improve the Service (Potentially in the Future).**

Processing is based on service necessity and your explicit consent (e.g., for location, for purchases).

## 3. Information Sharing and Disclosure

We do not sell or rent your personal information. We do not share your personally identifiable information with outside parties except:

*   **Third-Party Service Providers:**
    *   **Google Weather API & Google Elevation API:** As described.
    *   **Google Play Billing:** For processing in-app purchases. Google handles your payment information. We only receive confirmation of purchase status.
*   **Legal Requirements:** As described previously.

## 4. Data Security

We take reasonable precautions.
*   API data is sent via HTTPS.
*   Sensor data is processed locally.
*   Purchase-related data (payment details) are **not** handled or stored by us; they are managed by Google Play. The local flag Plus status is stored on your device.
    No method is 100% secure.

## 5. Data Retention, User Rights, and Deletion

*   **Data We Do Not Store (Centrally):** Precise location history, detailed sensor data history, payment information.
*   **Locally Cached/Stored Data:**
    *   Weather data cache (expires).
    *   User preferences (theme, units, True North, Plus status flag) are stored locally on your device via DataStore.
    *   Widget configuration data (content type) is stored locally for each widget instance via Glance's state management (which uses DataStore).
*   **Your Rights & Data Deletion:**
    *   Revoke location permission.
    *   Clear app cache and data via device settings (this will remove DataStore preferences, including Plus status flag and widget configurations, requiring a purchase restore).
    *   Uninstall the application.
    *   To restore Plus status after reinstalling or clearing data, use the "Restore/Verify Purchases" option in the app, which will re-query Google Play.
        For specific concerns, contact us.

## 6. Children's Privacy

The Service is not intended for anyone under 13 (or an equivalent minimum age). We do not knowingly collect PII from Children.

## 7. Links to Other Sites

As described previously.

## 8. Changes to This Privacy Policy

We may update our Privacy Policy. Review this page periodically. We will notify you of significant changes by posting the new Policy and updating the "Last Updated" date.

## 9. Contact Us

If you have any questions, suggestions, or concerns about this Privacy Policy or our data practices, please contact us:
**fertwbr@programmer.net**