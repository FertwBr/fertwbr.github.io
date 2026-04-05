# Gemini Expressive
Track the evolution of Gemini Expressive. Here you'll find a detailed log of new features, improvements, and fixes for each version.

## Version 1.0.0
*(Released April, 2026)*

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