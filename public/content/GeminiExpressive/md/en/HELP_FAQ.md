# Gemini Expressive - Help & Frequently Asked Questions

Welcome to the Gemini Expressive Help & FAQ page! Our goal is to supercharge your Gemini workflow with persistent
timelines, smart code blocks, and dynamic theming.

## Getting Started {: data-toc-key="getting-started" }

### 1. Installation {: data-toc-key="installation" }

You can install Gemini Expressive directly from the Chrome Web Store, Firefox Add-ons, or Microsoft Edge Add-ons. Once
installed, the extension works automatically in the background whenever you visit `gemini.google.com`.

### 2. Accessing Settings {: data-toc-key="accessing-settings" }

To configure the extension, click the extension icon (a palette or puzzle piece) in your browser's toolbar or find the "
Expressive" button injected directly into the Gemini sidebar. This will open the settings dashboard where you can toggle
features and customize the Material You theme.

### 3. Appearance & Theming {: data-toc-key="appearance-theming" }

* **Theme Mode:** Forces the interface to be Light, Dark, or automatically follow your system's default preference.
* **Enable Dynamic Color & Theme Color:** Overrides Google's default colors with a custom Material You palette generated
  automatically from your chosen seed color.
* **Hide Upgrade Button:** Removes the "Upgrade to Gemini Advanced" button from the bottom left of the screen, giving
  you a cleaner and less cluttered sidebar interface.

## Timeline Navigation {: data-toc-key="timeline" }

### 1. How does the Timeline work? {: data-toc-key="timeline-how-it-works" }

The timeline is a floating interface injected on the right side of your Gemini screen. It automatically maps out the
current conversation, creating a node for every prompt you send and every response Gemini generates.

**Understanding the Shapes:**

* **Circle (Cookie):** Represents your prompts (User inputs).
* **Pill:** Represents Gemini's standard text responses.
* **Triangle:** Represents messages that contain programming code blocks.

### 2. Auto-Tracking & Navigation {: data-toc-key="timeline-auto-tracking" }

As you scroll through a long conversation, the timeline will dynamically highlight the node corresponding to the message
currently visible on your screen, keeping you oriented. You can click any node to instantly jump to that part of the
chat. Floating counters will also appear to let you know how many messages are hidden above or below your current scroll
position.

## Prompt Snippets {: data-toc-key="snippets" }

### 1. Creating and Managing Snippets {: data-toc-key="snippets-creating" }

Create custom shortcuts for your most used, long, or complex prompts. Using the Expressive Settings dashboard, you can
define a keyword and its corresponding full text.

### 2. How to use them {: data-toc-key="snippets-using" }

Type your chosen **Snippet Prefix** (e.g., `/`, `!`, or `#`) followed by your keyword in the Gemini chat box. A custom
auto-complete menu will pop up. You can use your mouse or the `Up`/`Down` arrow keys and `Enter` to instantly expand the
shortcut into the full prompt text.

## Smart Code Blocks {: data-toc-key="code-blocks" }

### 1. Code Collapsing {: data-toc-key="code-collapsing" }

Large code blocks can take up a lot of screen space. Gemini Expressive automatically injects a "Collapse/Expand" button
into the header of every code block. Clicking it will hide the code, allowing you to read the surrounding text much
easier.

### 2. Floating Navigation {: data-toc-key="code-floating-nav" }

When hovering over or interacting with a code block, floating arrows will appear at the bottom center of the screen.
These allow you to instantly jump to the previous or next code snippet in the chat, completely skipping the text in
between.

### 3. Enhanced Headers {: data-toc-key="code-enhanced-headers" }

The extension automatically detects the programming language of the code block. It injects the official Material Design
icon for that language into the header and mathematically tries to extract potential file names directly from the code
context (e.g., extracting `App.jsx` from a React component).

## Privacy & Data {: data-toc-key="privacy" }

### 1. Does the extension collect data? {: data-toc-key="privacy-collect" }

**No.** Gemini Expressive is a local-only extension. It uses pure DOM manipulation and CSS injection to modify the
interface directly within your browser. It does not track, save, intercept, or transmit any of your chat data,
credentials, or personal information.

### 2. Why does it need storage permissions? {: data-toc-key="privacy-storage" }

The `storage` permission is strictly used to save your local extension preferences (like your selected theme color,
enabled features, and saved snippets) via your browser's Sync API, ensuring your settings sync across your logged-in
devices automatically.

## Troubleshooting {: data-toc-key="troubleshooting" }

- **The extension isn't changing the theme:**
    - Ensure "Enable Dynamic Color" is toggled ON in the extension settings.
    - Refresh the Gemini tab (F5).
- **Snippets aren't showing up:**
    - Verify that you are using the correct prefix (check the "Snippet Prefix" setting).
    - Ensure the snippet keyword doesn't have unintended spaces.
- **The sidebar button disappeared:**
    - Google occasionally updates their DOM structure. If this happens, the timeline and sidebars might temporarily
      vanish until we push a new patch fixing the query selectors.