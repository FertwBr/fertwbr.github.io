# Roadmap & Vision

Explore the future of Pixel Compass. This document outlines our planned features, upcoming improvements, architectural refactoring, and the long-term vision for the ultimate navigation and weather companion.

## 🚀 Current Status: Version 1.22.2
We have recently overhauled the Insight Engine for smarter notifications, introduced native Glance Widgets for Wear OS 7+, and deployed the Altitude Auto-Healing system. Our current development cycle is heavily focused on deep architectural refactoring to a unified `shared` module and expanding our weather capabilities.



## 🛠️ Immediate Priorities (Next Updates)

### 🏗️ Architecture & Refactoring (The "Shared" Module Initiative)
* **Global Logic Migration:** Refactor all dynamic cards, detail panels, and charts to use global logic within the `shared` module.
* **Separation of Concerns:** Deep refactor of Detail Panels with better naming conventions, strictly separating UI from business logic, and moving everything possible to the `shared` module.
* **Weather Analyzer Port:** Move the weather analysis logic to the `shared` module to prepare for multi-platform weather screens.
* **Smart Analyzers:** Refactor strings and the `Analyzer` engine to utilize smarter, context-aware logic.
* **Translation Overhaul:** Remove raw string translations from the app layer, relying on the new centralized architecture.
* **Forecast Fetching:** Fix the logic so the forecast is always reliably fetched again upon an update trigger.

### 📱 Phone: Weather & Features
* **Dedicated Weather Screen:** Introduce a completely new, dedicated Weather screen in the app.
* **Air Quality & Allergies:** Integrate support for Air Quality APIs, including specific data for Pollen and Grass. Add logic to the `Analyzer` to process and surface these insights.
* **Smart Weather Notifications:** Upgrade rain and weather notifications to be truly intelligent—understanding when rain has stopped, if it's continuing, and auto-updating in real-time instead of freezing at the minute they were generated.
* **Qibla Direction (Smart Visibility):** Implement a smart toggle for "Show Qibla Direction" in settings. To keep the UI clean, it will only be visible if:
    1. **GPS/IP:** The user is physically in the Middle East or a Muslim-majority country.
    2. **Locale/SIM:** The device region/language or SIM card points to one of these countries.
    3. **Experimental:** The user manually activates "Experimental Features" in advanced settings.
* **Dynamic Speed Card:** Add a new dynamic card specifically for Speed tracking.

### ⌚ Wear OS 7 Expansion
* **Wear OS Weather Hub:** Bring the new dedicated Weather experience to Wear OS.
* **Modern Wear OS 7 Components:** Implement new weather-specific Complications, Tiles, and Widgets specifically leveraging Wear OS 7 capabilities.
* **Customization:** Improve customization options for existing complications, tiles, and the main Info screen.

### 🧩 Widgets Expansion
* **Forecast Widgets:** Introduce new dedicated widgets for Daily Forecast and Hourly Forecast (capable of actively fetching data).
* **Compass Widget Toggle:** Add a setting toggle to show/hide the needle/pointer on the Compass Widget.



## 📅 The Future (Planned Milestones)

### 💎 User Experience & Value
* **Weather Database & Historical Analysis:** Save weather data to a local database (e.g., up to 1 week of history). Transform the weather engine to intelligently compare current conditions with historical data for deeper insights.

### ⚙️ Technical Evolution & Research
* **1Hz Android Limitation Study:** Research workarounds (such as associating a Foreground Service with the widget or using Intent-based updates) to bypass the Android OS 1-second (1Hz) update limitation for home screen sensors and widgets.

## 📜 Version History (Summary)

*Track the thematic evolution of Pixel Compass. This is a high-level summary of our major milestones.*

| Version | Title | Key Highlight |
| : | : | : |
| **1.22.0** | *The Hub & Auto-Healing Update* | At-a-Glance system hub, widget intelligence, Wear OS 7 Glance widgets, and Altitude Auto-Healing. |
| **1.21.0** | *The Wind & Control Update* | Advanced wind customizations (Beaufort/Knots), severe weather alert cooldowns, and a customizable FAB. |
| **1.20.0** | *The Level & Physics Update* | High-performance 3D Volumetric Level tool, liquid AGSL shaders, Flip-to-Align sensory feedback. |
| **1.19.0** | *The Intelligence & Redundancy Update*| Smart Weather Alerts, OpenWeatherMap fallback engine, and strict hardware magnetometer enforcement. |
| **1.18.0** | *The Customization Update* | Drag-and-drop Edit Mode, Regional Formats engine, and configurable Wear OS Compass Arcs. |
| **1.17.0** | *The Expressive & Insight Update* | Expressive Design system, interactive charting, Insight Engine 6.0, and Wear OS Live Complications. |
| **1.16.0** | *The Power & Altitude Update* | Adaptive Power System, advanced weather insights, and dedicated Altitude Complications/Tiles for Wear OS. |
| **1.15.0** | *The Professional Update* | Mechanical Haptics, NATO Mils, advanced calibration UI, and Ecosystem Deep Links. |
| **1.14.0** | *The Clock Update* | Advanced Clock Widget customization and Wear OS color themes. |
| **1.13.0** | *The Theme Update* | Introduction of AMOLED mode and expanded color palettes. |
| **1.12.0** | *The Real-Time Update* | High-frequency widget updates and custom widget shapes. |
| **1.11.0** | *The Forecast Update* | Unified forecast panels and Google Weather V4 icons. |
| **1.10.0** | *The Detail Update* | Interactive detail panels with hourly charts. |
| **1.9.0** | *The Expressive Update* | Material 3 Expressive card shapes and navigation animations. |
| **1.8.0** | *The Wear OS Update* | Introduction of the Compass Tile and smarter battery management. |
| **1.7.0** | *The Altitude Update* | Dedicated altitude settings and manual calibration. |
| **1.5.0** | *The Wear OS Launch* | Standalone watch app and responsive Glance widgets. |
| **1.0.0** | *Genesis* | Core compass functionality and True North support. |