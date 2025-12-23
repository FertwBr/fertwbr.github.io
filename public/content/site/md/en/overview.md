# Portfolio Architecture
{: .intro}
This project serves two purposes: to showcase my professional work and to demonstrate my ability to engineer complex, scalable frontend architectures. It is not just a static site; it's a dynamic React application with a custom content engine and AI-driven automation.

## 🛠️ Tech Stack
| Category | Stack |
| --- | --- |
| **Core** | React 18, Vite |
| **Hosting** | Cloudflare Pages |
| **Design** | Material Design 3, CSS Variables |
| **Animation** | Framer Motion, Lenis Scroll |
| **Data** | Custom Markdown Parsers, Fetch API |
| **AI & Automation** | Google Gemini API, Node.js Scripts |
| **Routing** | React Router DOM v6 |

## ☁️ Infrastructure & Hosting
Moving beyond standard static hosting, Version 2.2.0 introduced a robust cloud infrastructure using **Cloudflare Pages**.

### Domain Strategy
To clearly separate my personal portfolio from my software products, the architecture now supports domain-aware routing:
* **fertwbr.com:** Serves the personal portfolio, resume, and contact information.
* **apps.fertwbr.com:** Serves as the dedicated portal for Pixel Pulse and Pixel Compass.

### Legacy Compatibility Layer
Migrating domains often breaks existing links. I engineered a hybrid redirect solution:
1.  **GitHub Pages** acts as a "dumb" redirector using a custom `CNAME`, forwarding all legacy `fertwbr.github.io` traffic to the new domain.
2.  **Cloudflare Redirects** intercept incoming traffic to normalize case-sensitive URLs (e.g., redirecting `/PixelCompass` to `/pixelcompass`), ensuring 100% link preservation for existing users.

## 📐 Design Philosophy

### Dynamic Theming
The site uses `@material/material-color-utilities` to generate a complete tonal palette from a single seed color in real-time. This ensures that:
* **Accessibility:** Contrast ratios are mathematically calculated.
* **Consistency:** All components share the same tonal relationships.
* **Personalization:** Users can change the theme color, which persists across sessions.

### Content as Code
Instead of hardcoding text into React components, the site fetches raw Markdown files from the `public/` directory.
* **Custom Parsers:** I wrote regex-based parsers to extract structured data (version numbers, dates, tags, roadmap phases) from standard Markdown files.
* **Smart Viewers:** Specialized components like `ChangelogViewer` and `RoadmapViewer` consume this parsed data to render rich, interactive UIs with filtering and search capabilities.

## 🤖 AI Integration
To manage documentation across 6 languages efficiently, I engineered a custom build-time workflow:
* **Incremental Translation:** A Node.js script scans English changelogs and compares them against target languages.
* **Gemini API:** It uses the **Gemini 1.5 Flash** model to translate *only* the missing version blocks, preserving Markdown structure and technical terminology.
* **Cost Efficiency:** The script implements a "save-as-you-go" strategy and rate limiting to stay within free tier quotas while ensuring data persistence.

## 🚀 Performance

### Route Transitions
We use `AnimatePresence` from Framer Motion to orchestrate exit and enter animations for routes. A custom `PageTransition` component wraps the content, ensuring smooth visual continuity without layout shifts.

### Scroll Handling
Native browser scrolling is replaced by **Lenis**, a high-performance inertial scroll library. This provides a "premium" feel on desktop while maintaining native touch behavior on mobile devices.