# Pixel Pulse - Help & Frequently Asked Questions {: data-toc-key="top" }

Welcome to the Pixel Pulse Help & FAQ page! Our goal is to help you measure and understand your acoustic environment with precision and clarity, whether on your phone or your wrist.

## Getting Started {: data-toc-key="getting-started" }

### 1. Understanding the Main Meter Screen {: data-toc-key="main-screen" }
-   **Decibel Gauge:** The large, semi-circular meter provides a real-time visual of the current sound level. Its color changes dynamically to give you instant context.
-   **Session Stats:** The MIN, AVG, and MAX readouts show the statistics for your current recording session.
-   **Action Buttons:**
    -   **Stop/Resume:** The primary button to pause and continue the measurement.
    -   **Restart:** Resets all session statistics and the timer.
    -   **Toolbar:** Icons for quick access to Calibration, Saving, and this Info guide.

### 2. How does Calibration work? {: data-toc-key="calibration" }
The **Calibration** tool allows you to fine-tune the app's readings. If you have access to a professional sound level meter, you can use the slider in the calibration dialog to apply a positive or negative offset (e.g., -2.5 dB). This offset will be applied to all future measurements (Phone and Watch) to improve accuracy. This is a free feature for all users.

## Session History {: data-toc-key="session-history" }

### 1. How do I save and manage sessions? {: data-toc-key="manage-sessions" }
After pausing a recording, tap the **Save** icon. On the History screen, **long-press** any session to enter selection mode. This allows you to select multiple recordings to delete or favorite them all at once. Sessions recorded on your Wear OS watch will also appear here after synchronization.

### 2. How do I export my data? {: data-toc-key="exporting" }
From the Session Detail screen, you can use the menu to export your data.
-   **Copy as Text:** This free option copies a simple summary of the session to your clipboard.
-   **Export as CSV `[Plus+]`:** This premium feature saves a complete, timestamped log of the session's decibel history to a CSV file, perfect for analysis in spreadsheet software.

## Wear OS Companion {: data-toc-key="wear-os" }

The Pixel Pulse app for Wear OS is designed for quick interactions and standalone recording. Here is how to navigate the interface:

### 1. Standalone Recording {: data-toc-key="wear-recording" }
You can record sessions directly on your watch without your phone being present. The interface is optimized for AMOLED screens to save battery. When you finish a recording on the watch, you can save it locally.

### 2. Synchronization {: data-toc-key="wear-sync" }
When your watch reconnects to your phone, it can automatically transfer your saved sessions to the phone app's History tab. You can configure this behavior in **Settings > Sync & Backup** on your watch.

### 3. Navigation Basics {: data-toc-key="wear-nav" }
The app uses a **Horizontal Layout** to organize its main features. Swipe **Left** or **Right** to switch between screens:
-   **Center:** The Main Meter.
-   **Right:** Session History.
-   **Far Right:** Settings.

### 4. Using the Main Meter {: data-toc-key="wear-meter" }
-   **Start Recording:** Tap the large **Play** button to start monitoring.
-   **Immersive Mode:** While recording, **tap the screen** to hide the Stop/Save buttons. This enlarges the decibel reading and reveals live statistics (Min/Avg/Max). Tap again to show the controls.
-   **Quick Info:** Swipe **Up** from the bottom edge to see specific details about the current session layout or tips.

### 5. Viewing History & Details {: data-toc-key="wear-history" }
Swipe to the **History** screen to see your list of recordings.
-   **Session Player:** Tap any session to open the details. The first screen shows a chart and playback controls.
-   **Session Actions:** On the detail screen, swipe **Up** to reveal the actions menu. Here you can **Rename**, **Delete**, **Favorite**, or manually **Sync** that specific session to your phone.

### 6. Settings & Customization {: data-toc-key="wear-settings" }
Swipe to the **Settings** screen (far right) to configure your experience:
-   **Meter Settings:** Adjust Update Speed and Frequency Weighting `[Plus+]` or Calibrate the microphone.
-   **Customization:** Change the app theme color to match your watch face.
-   **Sync & Backup:** Configure whether sessions sync automatically.

## Manual Backup & Restore (.ppbk) {: data-toc-key="manual-backup" }

Pixel Pulse offers a robust, privacy-first manual backup system allowing you to transfer your data between devices or keep offline archives. This system uses a proprietary file format: **`.ppbk` (Pixel Pulse Backup)**.

### 1. What is a `.ppbk` file? {: data-toc-key="ppbk-format" }
A `.ppbk` file is a secure, encrypted container that holds your entire Pixel Pulse history. Unlike simple text or CSV exports, this file contains:
-   **Session Recordings:** All your saved audio metering sessions.
-   **Exposure History:** Your long-term background monitoring data.
-   **Metadata:** Information about which device (Phone or Watch) created the data and the app version.

### 2. Smart Restore (Merge Strategy) {: data-toc-key="smart-restore" }
Restoring data in Pixel Pulse is **non-destructive**. We use a "Smart Merge" strategy:
-   **No Overwriting:** Restoring a backup **will not** delete or overwrite your existing data.
-   **Duplicate Detection:** The app checks the unique timestamp of every session and exposure entry.
-   **Seamless Integration:** It only imports records that do not currently exist on your device. This allows you to combine data from multiple backups or different devices without creating duplicates.

### 3. Security & Encryption {: data-toc-key="backup-security" }
Your sound data is sensitive, so our backups are encrypted by default. You cannot simply open a `.ppbk` file in a text editor.
-   **Encryption Standard:** We use **AES-256-GCM** (Advanced Encryption Standard in Galois/Counter Mode) with NoPadding. This is an industry-standard algorithm used for securing sensitive data.
-   **Integrity Check:** The file includes a unique "Magic Header" and initialization vectors to ensure the file hasn't been corrupted or tampered with before decryption.

### 4. How to use it {: data-toc-key="using-backup" }
-   **To Backup:** Go to **Settings > Data Management > Backup**. This will generate a `.ppbk` file that you can save to Google Drive, send via email, or store on your phone's file system.
-   **To Restore:** Go to **Settings > Data Management > Restore** and select a valid `.ppbk` file. The app will process the file and let you know how many new items were imported.

## Pixel Pulse+: Sound Exposure & Alerts {: data-toc-key="plus-features" }

The Exposure tab is the heart of the Pixel Pulse+ experience. It transforms the app into an automated hearing health coach.

### 1. What is Sound Exposure Analysis? {: data-toc-key="exposure-analysis" }
When you activate this `[Plus+]` feature, the app works quietly in the background, taking periodic sound samples to build a picture of your environment. This powers a dedicated screen with several components:
-   **Daily, Weekly, and Monthly Charts:** See your sound patterns over different time scales.
-   **Weekly Noise Budget:** A visual tool based on WHO guidelines to help you manage your exposure to loud sounds (above 80 dB).
-   **Key Metrics Panel:** See your average dB, peak levels, and the busiest/quietest periods for the last 24 hours.
-   **Personalized Insights:** The app provides contextual tips and observations based on your data trends.

### 2. How do Noise Alerts work? {: data-toc-key="noise-alerts" }
Noise Alerts `[Plus+]` are a proactive safety feature. In the Exposure screen settings, you can define a **Noise Limit** (e.g., 85 dB) and an **Alert Duration** (e.g., 15 minutes). If the background monitor detects that you have been in an environment exceeding that limit for longer than the specified duration, it will send you a notification, reminding you to take a break or use hearing protection.

### 3. What are the Advanced `[Plus+]` Settings? {: data-toc-key="advanced-settings" }
Pixel Pulse+ unlocks several professional-grade settings:
-   **Frequency Weighting (dBC/dBZ):** While dBA (the standard for human hearing) is free, Plus users can switch to dBC (for low-frequency noise) or dBZ (a flat, unweighted reading) for technical analysis.
-   **Adjustable Update Speed:** Control how quickly the meter responds, balancing battery life with the need to capture rapid sound changes.
-   **Ambient Haptic Feedback:** Enable a continuous, subtle vibration that scales with the intensity of the ambient sound, providing a unique sensory connection to your environment.

## Data Privacy & Handling {: data-toc-key="data-privacy" }

Your privacy is paramount. Here is exactly what data the app handles and how.

### 1. Real-Time Metering & Saved Sessions (All Users) {: data-toc-key="privacy-sessions" }
-   **Is audio recorded?** No. The microphone is used to measure sound pressure, and the raw audio is immediately discarded. **No audio is ever saved.**
-   **What is saved?** When you save a session, the app stores a list of calculated decibel numbers (e.g., 65.4, 66.1, 65.9) and session stats (min, max, duration).
-   **Where is it stored?** This data is stored in a private, local database **on your device only**. It never leaves your phone unless you choose to export it.

### 2. Sound Exposure Monitoring (Pixel Pulse+ Users) {: data-toc-key="privacy-exposure" }
-   **How does it work?** About every 15 minutes, the app wakes up for a few seconds, measures the average sound level, and saves two pieces of information: a **timestamp** and a single **decibel number**.
-   **Is audio recorded in the background?** Absolutely not. The process is the same as the real-time meter: measure, calculate, and discard audio instantly.
-   **Where is this data stored?** It is also stored in the same private, local database on your device.
-   **Is any data shared?** No. All analysis, charts, and insights are generated 100% on-device.

### 3. Sync & Backup (Wear OS) {: data-toc-key="sync-data-privacy" }
-   **How is data transferred?** We use the secure **Android Wearable Data Layer API** (part of Google Play Services) to transfer session data from your Watch to your Phone.
-   **Is data stored on servers?** No. Pixel Pulse does not have its own backend servers. The sync process is strictly **Device-to-Device**.
-   **What about Cloud Sync?** If your watch and phone are not connected via Bluetooth, the system may use Google Cloud Sync (encrypted) to relay the data via Wi-Fi/LTE. This is handled entirely by the Android System to ensure delivery; Pixel Pulse does not access or store this data externally.
-   **Can I disable this?** Yes. You can disable "Automatic Sync" in the **Settings > Sync & Backup** menu on your watch at any time.

We **do not** collect, share, or have any access to your audio or measurement data.

## Troubleshooting & FAQ {: data-toc-key="troubleshooting" }

-   **Background monitoring seems to stop working.**
    -   Some phone manufacturers use aggressive battery-saving measures that can shut down background apps. To ensure reliable monitoring, please **disable Battery Optimization** for Pixel Pulse. The app will show a banner to guide you if it detects that optimization is active.

-   **My readings seem inaccurate.**
    -   For best results, point your device's primary microphone towards the sound source and ensure it is not covered. Use the **Calibration** feature to fine-tune the readings against a reference device.

## Support & Feedback {: data-toc-key="support" }

- **In-App Feedback:** The best way to reach us is via **Settings > About & Help > Send Feedback**.
- **Contact Email:** **fertwbr@programmer.net**

Thank you for choosing **Pixel Pulse**!