/**
 * Core portfolio localization strings (English).
 * Includes common UI elements, hero section, about, and general site navigation.
 */
export default {
    nav: {
        index: "Home",
        overview: "Docs",
        changelog: "Changelog",
        roadmap: "Roadmap",
        privacy: "Privacy",
        help: "Help",
        back: "Back"
    },
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
    },
    changelog: {
        title: "Version History",
        subtitle: "Track the evolution of the site. Here you'll find a detailed log of new features, improvements, and fixes for each version.",
        search_placeholder: "Search features, versions...",
        latest_release: "Latest Release",
        released: "Released",
        update_now: "Update Now",
        on_this_page: "On This Page",
        load_more: "Load Older Versions",
        no_results: "No versions found matching your filters.",
        jump_to: "Jump to Version",
        read_more: "Read Release Notes",
        collapse: "Collapse",
        back_to_top: "Back to Top"
    },
    overview_page: {
        title: "Technical Overview",
        subtitle: "Deep dive into the architecture and stack.",
        github_btn: "View on GitHub",
        toc_title: "On This Page",
        dynamic_docs_note: "This overview is generated dynamically from Markdown files to ensure it's always up-to-date with the latest codebase changes.",
        about_docs_title: "About this docs"
    },
    feedback: {
        title: "Send Feedback",
        subtitle: "Help us improve. Bug reports, feature requests, or just say hi.",

        form: {
            project_label: "Project",
            type_label: "Topic",
            platform_label: "Platform",
            description_label: "Message",
            description_placeholder: "Describe what happened or share your idea...",
            include_device_info: "Include device info (Browser/OS)",
            send_button: "Generate Email",
            draft_recovered: "Draft recovered",
            discard_draft: "Discard Draft",
            attach_tip: "Note: Please attach screenshots directly in your email app if needed."
        },

        success: {
            title: "Ready to Send",
            message: "We've opened your email client with the prepared message. Please review and hit Send.",
            btn_retry: "Open Email App Again",
            btn_edit: "Edit Message",
            btn_home: "Return Home"
        },

        projects: {
            pixelpulse: "Pixel Pulse",
            pixelcompass: "Pixel Compass",
            portfolio: "Portfolio Site"
        },

        platforms: {
            android: "Android (Phone)",
            wearos: "Wear OS",
            web: "Web / Site"
        },

        types: {
            general: "General Feedback",
            bug: "Bug Report",
            feature: "Feature Request",
            translation: "Translation Issue",
            ui: "UI Suggestion",
            other: "Other"
        },
        guidance: {
            label: "Tip",
            default_general: "We are listening! Share your thoughts.",
            default_bug: "Describe the steps to make the bug happen.",
            default_feature: "How would this feature improve your experience?",
            default_translation: "Which screen has the wrong text?",

            short_text: "Please provide a bit more detail so we can understand better.",
            crash: "If the app crashed, did you see an error code or message?",
            screenshot: "A picture is worth a thousand words. Consider attaching a screenshot in the email.",
            translation_keyword: "Mentioning the specific language and the incorrect phrase helps us fix it fast.",

            steps_received: "Perfect! Knowing the steps helps us reproduce the issue.",
            error_received: "Thanks for including the error details.",
            location_received: "Excellent, knowing the screen location is very helpful.",
            idea_received: "That is an interesting idea! Tell us more about how it works.",
            great_detail: "Great detail! This helps us understand significantly."
        },
        keywords: {
            crash: "crash,close,stop,shut,freeze,lag,broken,white screen",
            error: "error,code,fail,exception,0x,number,message",
            steps: "step,first,then,after,when,click,tap,press,scroll",
            screen: "screen,page,view,window,dialog,tab,card,menu,navbar,footer",
            correction: "text,word,typo,wrong,incorrect,bad,spelling,grammar,translate,language",
            idea: "add,create,wish,would,could,should,better,new,feature,mode"
        }
    }
};