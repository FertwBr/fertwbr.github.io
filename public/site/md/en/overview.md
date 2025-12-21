# Portfolio Architecture
{: .intro}
This project serves two purposes: to showcase my professional work and to demonstrate my ability to engineer complex, scalable frontend architectures. It is not just a static site; it's a dynamic React application with a custom content engine.

## 🛠️ Tech Stack
| Category | Stack |
| --- | --- |
| **Core** | React 18, Vite |
| **Design** | Material Design 3, CSS Variables |
| **Animation** | Framer Motion, Lenis Scroll |
| **Data** | Custom Markdown Parsers, Fetch API |
| **Routing** | React Router DOM v6 |

## 📐 Design Philosophy

### Dynamic Theming
The site uses `@material/material-color-utilities` to generate a complete tonal palette from a single seed color in real-time. This ensures that:
* **Accessibility:** Contrast ratios are mathematically calculated.
* **Consistency:** All components share the same tonal relationships.
* **Personalization:** Users can change the theme color, which persists across sessions.

### Content as Code
Instead of hardcoding text into React components, the site fetches raw Markdown files from the `public/` directory.
* **Custom Parsers:** I wrote regex-based parsers to extract structured data (version numbers, dates, tags) from standard Markdown files.
* **Components:** Specialized viewers (`ChangelogViewer`, `RoadmapViewer`) consume this parsed data to render rich, interactive UIs.

## 🚀 Performance

### Route Transitions
We use `AnimatePresence` from Framer Motion to orchestrate exit and enter animations for routes. A custom `PageTransition` component wraps the content, ensuring smooth visual continuity without layout shifts.

### Scroll Handling
Native browser scrolling is replaced by **Lenis**, a high-performance inertial scroll library. This provides a "premium" feel on desktop while maintaining native touch behavior on mobile devices.