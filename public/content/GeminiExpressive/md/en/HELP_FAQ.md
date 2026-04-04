# Gemini Expressive - Help & Frequently Asked Questions

Welcome to the Gemini Expressive Help & FAQ page! Our goal is to supercharge your Gemini workflow with persistent timelines, smart code blocks, and dynamic theming.

## Getting Started {: data-toc-key="getting_started" }

### 1. Installation
You can install Gemini Expressive directly from the Chrome Web Store, Firefox Add-ons, or Microsoft Edge Add-ons. Once installed, the extension works automatically in the background whenever you visit `gemini.google.com`.

### 2. Accessing Settings
To configure the extension, click the extension icon (a palette or puzzle piece) in your browser's toolbar or find the "Expressive" button injected directly into the Gemini sidebar. This will open the settings dashboard where you can toggle features and customize the Material You theme.

## Timeline Navigation {: data-toc-key="timeline" }

### 1. How does the Timeline work?
The timeline is a floating interface injected on the right side of your Gemini screen. It automatically maps out the current conversation, creating a node for every prompt you send and every response Gemini generates.

### 2. Auto-Tracking
As you scroll through a long conversation, the timeline will dynamically highlight the node corresponding to the message currently visible on your screen, keeping you oriented. You can click any node to instantly jump to that part of the chat.

## Prompt Snippets {: data-toc-key="snippets" }

### 1. Creating Snippets
Open the extension settings and navigate to the "Prompt Snippets" manager. Here, you can assign a keyword (e.g., `react`) to a long block of text (e.g., a complex system prompt for coding).

### 2. Using Snippets in Chat
In the Gemini chat box, type your chosen prefix (the default is `/`) followed by your keyword. A native-looking dropdown menu will appear. You can use your mouse or the up/down arrow keys to select the snippet, and press `Enter` to instantly expand it into your full prompt.

## Smart Code Blocks {: data-toc-key="code_blocks" }

### 1. Code Collapsing
Large code blocks can take up a lot of screen space. Gemini Expressive automatically injects a "Collapse/Expand" button into the header of every code block. Clicking it will hide the code, allowing you to read the surrounding text much easier.

### 2. Floating Navigation
When hovering over or interacting with a code block, floating arrows will appear at the bottom center of the screen. These allow you to instantly jump to the previous or next code block in the conversation.

### 3. Enhanced Headers
The extension automatically detects the programming language of the code block. It injects the official Material Design icon for that language into the header and mathematically extracts potential file names directly from the code context (e.g., extracting `App.jsx` from a React component).

## Privacy & Data {: data-toc-key="privacy" }

### 1. Does the extension collect data?
**No.** Gemini Expressive is a local-only extension. It uses pure DOM manipulation and CSS injection to modify the interface directly within your browser. It does not track, save, intercept, or transmit any of your chat data, credentials, or personal information.

### 2. Why does it need storage permissions?
The `storage` permission is strictly used to save your local extension preferences (like your selected theme color, enabled features, and saved snippets) via your browser's Sync API, ensuring your settings sync across your logged-in devices automatically.

## Troubleshooting {: data-toc-key="troubleshooting" }

- **The extension isn't changing the theme:**
    - Ensure "Enable Dynamic Color" is toggled ON in the extension settings.
    - Refresh the Gemini tab (F5).
- **Snippets aren't showing up:**
    - Verify that you are using the correct prefix (check the "Snippet Prefix" setting).
    - Ensure the snippet keyword doesn't have unintended spaces.
- **The sidebar button disappeared:**
    - Google occasionally updates their DOM structure. If this happens, the timeline and sidebars might temporarily vanish until we push a new patch fixing the query selectors.