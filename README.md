# Fernando Vaz - Portfolio & App Suite

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Framer Motion](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)
![Material Design 3](https://img.shields.io/badge/Material%20Design%203-7555fa?style=for-the-badge&logo=materialdesign&logoColor=white)

A dynamic, interactive portfolio for Software Engineer **Fernando Vaz**. 

This project serves two purposes:
1.  **Personal Portfolio:** Showcasing skills, selected works, and GitHub activity.
2.  **Product Landing Pages:** Hosting dedicated marketing pages for Android applications like **Pixel Pulse** and **Pixel Compass**.

## ✨ Key Features

* **Dynamic Theming:** Uses `@material/material-color-utilities` to generate color palettes on the fly based on a seed color. Supports Dark/Light mode with seamless transitions.
* **Glassmorphism UI:** Modern aesthetic with backdrop blurs, gradients, and floating 3D elements.
* **Animations:** Smooth entry animations, scroll-triggered reveals, and 3D tilt effects using `framer-motion`.
* **Bilingual:** Full support for **English** and **Portuguese (PT-BR)** via a custom React Context.
* **Live GitHub Data:** Fetches real-time repository stats (stars, followers) using the GitHub API.

## 📱 Featured Apps

This repository includes information and links for my flagship Android applications:

| App | Description | Tech Stack |
| :--- | :--- | :--- |
| **Pixel Pulse** | Advanced sound level meter & hearing health coach. | Kotlin, Compose, Room, FFT |
| **Pixel Compass** | Premium navigation tool with sensor fusion. | Wear OS, Glance, Sensors |

## 🛠️ Tech Stack

* **Core:** React (Vite)
* **Styling:** CSS Modules, Material Design 3 Tokens
* **Motion:** Framer Motion (Scroll, Spring, Transform)
* **Icons:** Material Symbols Outlined, Custom SVGs
* **Utilities:** Material Color Utilities (Theme Generation)

## 🚀 Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/fertwbr/my-portfolio.git](https://github.com/fertwbr/my-portfolio.git)
    cd my-portfolio
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open `http://localhost:5173` in your browser.

## 📂 Project Structure

```text
src/
├── components/      # Reusable UI components (Hero, About, Projects...)
├── context/         # React Contexts (LanguageContext)
├── locales/         # Translation files (en.js, pt.js)
├── utils/           # Helper functions (themeUtils.js)
├── App.jsx          # Main application layout
├── config.js        # Global configuration (seed colors, app name)
└── main.jsx         # Entry point

## 🎨 Customization

### Changing the Theme
You can modify the default seed colors in `src/config.js`. The site automatically generates tonal palettes from these hex codes.

### Adding New Projects
Edit `src/locales/en.js` and `src/locales/pt.js`. The `Projects` component will automatically render new cards based on the data array.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with 💙 by Fernando Vaz
</p>