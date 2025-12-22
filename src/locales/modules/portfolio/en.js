/**
 * Core portfolio localization strings (English).
 * Includes common UI elements, hero section, about, and general site navigation.
 */
export default {
    common: {
        offline: "You are currently offline.",
    },
    redirect: {
        launching: "Launching Application...",
        did_open: "Did the app open?",
        open_again: "Open App Again",
        get_on_store: "Get on Play Store"
    },
    error: {
        title: "System Malfunction",
        desc_1: "Something unexpected happened within the application core.",
        desc_2: "Don't worry, no data was lost.",
        reload: "Reload System",
        home: "Return Home",
        show_details: "Show Technical Details",
        hide_details: "Hide Technical Details",
        copy: "Copy",
        copied: "Copied"
    },
    hero: {
        greeting: "Hello, I'm",
        name: "Fernando Vaz",
        role_prefix: "I build",
        roles: ["Android Apps", "Backend Systems", "User Experiences", "Digital Solutions"],
        cta_primary: "View Projects",
        cta_secondary: "Contact Me"
    },
    not_found: {
        page_title: "Page Not Found",
        title: "404",
        subtitle: "Oops! Into the void.",
        message: "The page you are looking for currently does not exist.",
        suggestion_title: "Were you looking for this?",
        suggestion_desc: "Based on your link, we think you wanted to go to",
        suggestion_btn: "Yes, Go There",
        home_btn: "Go to Home",
        apps_btn: "See Apps"
    },
    about: {
        title: "About Me",
        subtitle: "Engineering meets Design",
        bio: {
            p1: {
                start: "I'm Fernando Vaz, a Software Engineer graduated from ",
                highlight: "UniCesumar",
                end: ", passionate about the intersection of robust code and intuitive design."
            },
            p2: {
                start: "Specializing in the ",
                highlight_1: "Android ecosystem",
                middle: " (Kotlin/Jetpack Compose) and scalable ",
                highlight_2: "Backends",
                end: " (Spring Boot). I create solutions that are not only functional but delightful to use."
            }
        },
        cta_work: "See my work",
        stats: {
            exp: "Years Exp.",
            projects: "Projects",
            clients: "Happy Clients"
        },
        cards: {
            education: {title: "Education", value: "B.S. Software Engineering", sub: "UniCesumar"},
            location: {title: "Location", value: "Salvador, Brazil", sub: "GMT-3"},
            stack: {title: "Main Stack", value: "Kotlin & Java", sub: "Full Cycle Dev"}
        }
    },
    projects: {
        title: "Selected Works",
        subtitle: "A showcase of technical depth and creative problem solving.",
        view_project: "View Case Study",
        source_code: "Source Code",
        items: [
            {
                id: "pixel_pulse",
                title: "Pixel Pulse",
                category: "Android Engineering",
                desc: "Advanced sound level meter featuring real-time FFT analysis, Room Database persistence, and battery-optimized background services via WorkManager.",
                tags: ["Kotlin", "Compose", "FFT", "Room"],
                icon_url: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Pulse/art/phone.svg",
                link: "/PixelPulse?page=index",
                repo: "https://github.com/fertwbr/PixelPulse",
                color: "primary",
                icon: "equalizer"
            },
            {
                id: "pixel_compass",
                title: "Pixel Compass",
                category: "Wear OS & Mobile",
                desc: "Premium navigation tool with sensor fusion algorithms, Jetpack Glance widgets, and multi-module architecture for clean separation of concerns.",
                tags: ["Wear OS", "Sensors", "Glance", "Retrofit"],
                icon_url: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Compass/art/phone.svg",
                link: "/PixelCompass?page=index",
                repo: "https://github.com/fertwbr/PixelCompass",
                color: "secondary",
                icon: "explore"
            },
            {
                id: "portfolio_site",
                title: "This Portfolio",
                category: "Web Engineering",
                desc: "A deep dive into the architecture of this very site. Built with React, Material Design 3, and a custom Markdown engine.",
                tags: ["React", "Vite", "Material 3", "Framer Motion"],
                icon: "web",
                link: "/site/overview",
                repo: "https://github.com/fertwbr/fertwbr.github.io",
                color: "tertiary"
            },
            {
                id: "box_idea",
                title: "boxIdea",
                category: "Full Stack Web",
                desc: "Corporate innovation platform enabling teams to submit, vote on, and track ideas. Built with Spring Boot Security and PostgreSQL.",
                tags: ["Spring Boot", "Java", "PostgreSQL", "JWT"],
                link: "https://github.com/FertwBr/boxIdea",
                repo: "https://github.com/FertwBr/boxIdea",
                color: "tertiary",
                icon: "lightbulb"
            }
        ]
    },
    tech: {
        title: "Technologies",
        subtitle: "Tools I use to bring ideas to life"
    },
    github: {
        title: "Open Source",
        view_profile: "View GitHub Profile",
        languages: "Most Used Languages",
        default_bio: "Building things for Android and the Web.",
        stats: {
            contributions: "Year Contributions",
            repos: "Repositories",
            stars: "Total Stars",
            followers: "Followers"
        }
    },
    contact: {
        title: "Let's Work Together",
        desc: "Have a project in mind or want to discuss the latest in Android tech?",
        email: "Send Email",
        linkedin: "LinkedIn",
        github: "GitHub"
    },
    footer: {
        rights: "All rights reserved.",
        built: "Designed & Built by Fernando Vaz 🇧🇷",
        useful_links: "Useful Links",
        social_title: "Connect",
        appearance: {
            title: "Theme & Appearance",
            language_selector: "Language",
            en: "English",
            pt: "Português"
        }
    }
};