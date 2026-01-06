# Privacy Policy for Pixel Pulse

**Last Updated:** January 06, 2026

Welcome to Pixel Pulse! This Privacy Policy explains how **fertwbr** ("we," "us," or "our") handles information when you use our Pixel Pulse mobile and wearable applications (the "Service").

## 1. Information We Process

Our commitment is to your privacy. The Service is designed to function almost entirely locally on your device.

**a) Audio Data (Microphone Access):**
*   **Purpose:** The core functionality of the Service requires access to your device's microphone to measure the ambient sound pressure level (decibels).
*   **Processing:** This audio data is processed **in real-time, entirely locally on your device**. The raw audio is immediately discarded after the decibel level is calculated. **We do not store, record, or transmit your raw audio off your device.**
*   **Collection Trigger:** Microphone access is active when:
    1.  You are actively using the app (foreground).
    2.  You explicitly enable **Background Monitoring** or **Live Sessions**. In these cases, the app periodically wakes up or runs a foreground service to sample sound levels while the app is closed or the screen is off. A persistent notification will always be displayed when background monitoring is active.

**b) Session & Exposure Data (Stored Locally):**
*   **Purpose:** To provide history, charts, and health insights regarding your sound environment.
*   **Data Stored:** This includes timestamps, duration, calculated decibel values (min/avg/max), and exposure dose metrics.
*   **Storage:** This data is stored in a **private, local database on your device**. It is **not** transmitted to us or any cloud server managed by us. You have full control to delete this data at any time via the app settings.

**c) Wear OS Synchronization:**
*   **Purpose:** To allow you to view data recorded on your watch within the phone application.
*   **Method:** If you use the Wear OS companion app, calculated data (not raw audio) is transferred directly between your watch and phone using the local Android Wearable Data Layer API (via Bluetooth or Wi-Fi). This data remains within your personal device ecosystem.

**d) In-App Purchase Information (Pixel Pulse+):**
*   **Purpose:** To unlock premium features through a **one-time purchase**.
*   **Data Processed by Google Play:** All purchase transactions are processed directly by **Google Play's billing system**. We do **not** collect or store your payment information. We only receive a confirmation token to verify your license status.

## 2. Permissions

*   **Microphone:** Required to measure sound levels.
*   **Notifications:** Required to send you alerts if sound exposure exceeds safe thresholds (WHO recommendations) and to display the persistent indicator when background services are running.
*   **Foreground Service:** Required to keep the measurement engine running accurately when the screen is off.

## 3. Information Sharing and Disclosure

We do not sell, rent, or share your personal information or session data. Since all core data is processed and stored locally on your device, we do not have access to it to share with third parties.

## 4. Data Security, Retention, and Deletion

*   **Security:** Your data is protected by the standard security sandbox of the Android operating system.
*   **Retention:** Data is retained on your device only as long as you keep the app installed.
*   **Deletion:** You can delete all exposure data via the "Settings > Sound Exposure > Data Management" screen. Uninstalling the app will also permanently delete all locally stored data.

## 5. Medical Disclaimer

Pixel Pulse is **not a medical device**. The data and insights provided are for informational purposes only and are based on generic calibration. They should not be used for professional medical diagnosis or as a substitute for professional hearing protection equipment in industrial settings.

## 6. Children's Privacy

The Service is not intended for anyone under the age of 13. We do not knowingly collect personally identifiable information from children.

## 7. Changes to This Privacy Policy

We may update our Privacy Policy. We will notify you of any significant changes by posting the new Policy on this page, updating the "Last Updated" date, and/or via an in-app notification.

## 8. Contact Us

If you have any questions about this Privacy Policy, please contact us at: **fertwbr@programmer.net**