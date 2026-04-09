# Gemini Expressive
Track the evolution of Gemini Expressive. Here you'll find a detailed log of new features, improvements, and fixes for each version.

## Version 2.5.2
*(Released April 12, 2026)*

This update focuses on strengthening the extension's internal security, improving runtime stability, and streamlining our cross-browser distribution process for both Chrome and Firefox.

#### 🛡️ Security & Stability
* **Fix: Strict DOM Sanitization:** We have further hardened the extension against HTML injection and Cross-Site Scripting (XSS). Vulnerable `innerHTML` calls within the Snippet Previews and the Code Header Enhancer have been entirely replaced with safe, strict DOM operations (`textContent` and explicit element creation).
* **Fix: Safe Asset Loading:** Implemented a defensive wrapper for fetching extension assets (like the collapse/expand icons). This prevents the extension from throwing runtime errors or crashing if the browser unexpectedly invalidates the extension context.

#### 🛠️ Developer & Distribution
* **New: Automated Build Pipeline:** Introduced a new Node.js build script (`build.js`) that automatically strips incompatible manifest fields and packages perfectly tailored `.zip` releases for both Google Chrome and Mozilla Firefox.
* **Documentation:** Completely revamped the open-source repository's `README`. Added a new stylized hero banner, detailed installation tables, and fresh, high-resolution screenshots showcasing the new Prompt Snippet Editor and Settings Dashboard.


## Version 2.5.1
*(Released April 11, 2026)*

This is a targeted patch release focused on refining the Dynamic Theming engine. We've cleaned up underlying stylesheets and resolved CSS conflicts to ensure our custom themes beautifully enhance the interface without interfering with Gemini's native layout.

#### 🛠️ Visual Fixes & Optimizations
* **Fix: Top Bar Protection:** Excluded Gemini's native top-bar action buttons from the dynamic theming engine. These buttons will now correctly retain their original sizing, padding, and colors instead of being accidentally overridden by the extension.
* **Fix: Sidebar Typography Scoping:** Restricted specific label styles strictly to the sidebar navigation panel, preventing unintended typography changes from leaking into the main chat interface.
* **Fix: Text Input Stability:** Removed obsolete, overly-aggressive CSS overrides for text input fields, rich-text areas, and search surfaces. This resolves visual conflicts and ensures the main chat input box renders perfectly while still smoothly integrating with your chosen theme.
* **Improvement: Stylesheet Optimization:** Streamlined and grouped the underlying dynamic theme selectors. By cleaning up redundant CSS rules, the extension is now lighter and less prone to conflicting with future Gemini UI updates.

## Version 2.5.0
*(Released April 10, 2026)*

This release, dubbed the "Management & Markdown Update," brings powerful new tools to the Prompt Snippets editor, significantly refines the Dynamic Theming engine for better integration with Gemini's native components, and overhauls the Settings interface for a cleaner, more organized experience.

#### ⚡ Enhanced Prompt Snippets
* **New: Markdown Preview Tab:** The snippet editor now features a "Write" and "Preview" toggle. You can now see exactly how your formatted prompts will look before saving them, powered by a new built-in Markdown parser that supports headings, lists, blockquotes, and fenced code blocks.
* **New: Reordering & Management UI:** * Added "Move Up" and "Move Down" controls to manually organize your snippets.
    * Introduced a secure deletion flow with a native Modal Confirmation dialog to prevent accidental data loss.
    * Added validation checks to ensure snippets have required keywords and content before saving.
* **UI: High-Contrast Snippet Menu:** The autocomplete menu has been redesigned with a high-contrast blue palette, improved depth shadows, and better hover/active feedback for keywords and icons.
* **Refinement:** The snippet list now displays a cleaner one-line preview of your content by automatically replacing line breaks with spaces.

#### 🎨 Advanced Theming & Integration
* **New: Media Player Theming:** The Dynamic Material You theme now extends to Gemini's generated music and video players, ensuring play buttons and icons match your custom aesthetic.
* **Improvement: Intelligent Button Theming:** * Re-engineered MDC button logic to ensure icons (`.mat-icon`, `.google-symbols`) automatically inherit the correct primary or on-primary colors based on the button variant (Unelevated, Raised, or Outlined).
    * Added support for multiline button labels with intelligent word-wrapping, preventing layout breaks on narrow screens or with long translated text.
* **Improvement: Refined Input Fields:** Optimized text field visuals by hiding placeholders when not focused and enforcing consistent opacity for floating labels and notched outlines under dynamic themes.
* **UI Polish:** Applied theme-aware styling to native dialog surfaces and clarified the visual hierarchy between text-only and elevated buttons.

#### ⚙️ Settings & UX Polish
* **New: Settings Grouping:** Related options are now organized into visual blocks with rounded corners and descriptive text, making it easier to navigate through general and appearance settings.
* **New: Custom Scrollbars:** Introduced slim, Material-style scrollbars for the snippet list, textareas, and preview panels across both WebKit and Firefox browsers.
* **UI: Layout Stability:** * Fixed help tooltip colors to perfectly match the active dynamic theme.
    * Improved responsive behavior for the developer split-layout on mobile devices.
    * Standardized button sizes and paddings across the entire options interface.

## Version 2.0.0
*(Released April 7, 2026)*

Welcome to Version 2.0! This is a massive update that completely rewrites the extension's core architecture for better performance and stability, while introducing several highly requested quality-of-life features to the chat interface.

#### 🚀 Core Architecture & Performance
* **New: Modular Core System:** We have completely abandoned the old procedural initialization scripts. The extension now utilizes a modern, modular architecture (`ExtensionState`, `UIManager`, `DomObserver`).
* **Improvement: Faster & Lighter:** By centralizing DOM observation and delegating tasks to specific feature managers, the extension now consumes significantly less memory and applies its visual changes (like the Material You theme) much faster when the chat loads.
* **Security:** Consolidated and removed legacy code headers and utility scripts, ensuring the extension adheres to the strictest MV3 security and performance standards.

#### 🧭 Advanced Timeline Navigation
* **New: Smart Scroll Counters:** When navigating very long conversations, the floating timeline now features sticky "Top" and "Bottom" counters. These intelligently indicate exactly how many chat messages are currently hidden off-screen, fading out automatically when you stop scrolling.
* **Improvement: Perfected Scrolling:** Re-engineered the timeline's auto-scroll behavior. Clicking a timeline node now smoothly scrolls the chat to perfectly align the target message at the *start* of your viewport, rather than awkwardly centering it.
* **UI Polish:** The timeline has been anchored more securely to the side of the screen and now automatically hides itself on narrower screens (tablets/mobile) to preserve your chat reading area.

#### 💻 Developer & Code Enhancements
* **UI Polish:** Completely revamped the styling of the Code Collapser buttons and the Code Headers. They now use flexbox for mathematically perfect centering and alignment, resolving minor visual glitches that occurred on certain zoom levels.

#### 🎨 Theming & Customization
* **New: 'Hide Upgrade' Toggle:** Added a highly requested feature to the Appearance settings. You can now toggle a switch to completely hide Gemini's native "Upgrade to Advanced" upsell buttons from the sidebar for a cleaner UI.
* **Improvement: File Preview Theming:** Uploaded file previews (images, documents) now fully inherit your custom dynamic theme colors, including the background, borders, and cancel buttons.

#### ⚙️ Settings & Options
* **UX Polish:** The settings page now features contextual "Help Tooltips" next to complex features, improved mobile layouts for the Snippet editor, and longer, more descriptive toast notifications when saving your preferences.

## Version 1.0.1
*(Released April 2, 2026)*

This is a rapid patch following our initial launch, focused on bringing Gemini Expressive to Firefox users and hardening the extension's internal security and rendering performance.

#### 🦊 Cross-Browser Support
* **New: Firefox Compatibility:** We have updated the extension manifest with dedicated `browser_specific_settings` (including a Gecko ID and strict minimum versions). Gemini Expressive is now fully configured and ready to run on Mozilla Firefox.
* **Fix: Extension Architecture:** Upgraded the legacy `options_page` declaration to the modern `options_ui` standard (configured to open neatly in a full tab) and added background script fallbacks alongside the service worker to ensure flawless operation across different browser engines.

#### 🛡️ Security & Performance
* **Improvement: Strict DOM Safety:** We have completely eliminated the use of `innerHTML` across the extension's codebase.
* **Improvement: Snippet Rendering:** The Prompt Snippets list and empty states are now generated and cleared using strict, native DOM operations (`createElement`, `cloneNode`, `textContent`). This completely neutralizes Cross-Site Scripting (XSS) and HTML injection risks, while also making the UI rendering slightly faster and more reliable.

## Version 1.0.0
*(Released April 1, 2026)*

Welcome to the first official release of **Gemini Expressive**! This browser extension completely overhauls the Google Gemini web interface, bringing powerful developer tools, productivity shortcuts, and beautiful Material Design 3 theming directly to your chat experience.

#### 🎨 Dynamic Material You Theming
* **Custom Color Palettes:** Break free from the default colors. Choose from curated presets (Indigo, Rose, Teal, etc.) or use a custom color picker to generate a mathematically perfect Material 3 tonal palette (including primary, secondary, and tertiary accents).
* **Native Syncing:** The extension intelligently detects and synchronizes with Gemini's native Light/Dark mode, ensuring your custom colors always have the perfect contrast.
* **Expressive UI:** Theming doesn't just change text; it beautifully restyles buttons, text inputs, banners, and the Gemini logo itself to match your chosen aesthetic.

#### 🧭 Persistent Timeline Navigation
* **Floating Chat Timeline:** Easily navigate long conversations with a new, scrollable vertical timeline pinned to the side of your screen.
* **Smart Shape Indicators:** The timeline uses distinct SVG shapes (Circles, Pills, Triangles) to instantly show whether a message block is a prompt from you, a response from Gemini, or a generated code block.
* **Auto-Centering & Tooltips:** As you scroll through the chat, the timeline automatically tracks your position. Hovering over a timeline dot reveals a rich tooltip with a preview of the message.

#### 💻 Developer & Code Enhancements
* **Intelligent Code Collapsing:** Long code blocks no longer clutter your screen. You can now smoothly collapse and expand `<pre>` code blocks with a dedicated, custom-styled toggle button.
* **Smart Code Headers:** The extension automatically analyzes code blocks to extract and display the programming language, a matching Material icon, and intelligently guesses the file name/extension.
* **Code Block Navigation:** Enable the new "Code Nav" setting to add floating arrows next to code blocks, allowing you to instantly jump from one code snippet to the next without scrolling.

#### ⚡ Productivity: Prompt Snippets
* **Tab-Expansion:** Save hours of typing by creating custom Prompt Snippets. Simply type your configurable trigger prefix (e.g., `/`) followed by your keyword, press `Tab` inside the Gemini text box, and your full prompt will instantly expand.
* **Drag-and-Drop Management:** A dedicated Snippets Editor allows you to easily create, edit, delete, and intuitively drag-and-drop to reorder your saved prompts.
* **Mobile-Friendly Editor:** The snippet management UI is fully responsive, allowing you to manage your prompts effortlessly even on narrow or mobile browser windows.

#### ⚙️ Seamless Integration & Localization
* **Native Sidebar Shortcut:** Gemini Expressive feels like a native feature. We inject a custom "Expressive Settings" button directly into the Gemini side navigation menu (supporting both desktop and mobile layouts).
* **Global Localization:** The extension is fully translated into 6 languages: English, Portuguese, Spanish, German, Hindi, and Japanese.
* **Smart Geographic Flags:** The settings menu utilizes `FlagCDN` to display geographically accurate flags based on your browser's time zone (e.g., automatically showing the UK, Ireland, or South Africa flag for English depending on your location).
* **Smooth Page Transitions:** Moving between the General Settings and the Snippets Editor features fluid, `framer-motion`-style page exit and entrance animations.