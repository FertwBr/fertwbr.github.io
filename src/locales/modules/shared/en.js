/**
 * Core shared localization strings.
 * Includes common UI elements, error states, forms, and universal viewer pages.
 */
export default {
    common: {
        offline: "You are currently offline."
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
    footer: {
        rights: "All rights reserved.",
        built: "Designed & Built by Fernando Vaz 🇧🇷",
        useful_links: "Useful Links",
        social_title: "Connect",
        appearance: {
            title: "Theme & Appearance",
            language_selector: "Language",
            en: "English",
            pt: "Português",
            theme_mode: "Mode",
            mode_auto: "Auto",
            mode_light: "Light",
            mode_dark: "Dark"
        },
        themes: {
            "m3 purple": "M3 Purple",
            "crimson": "Crimson",
            "teal": "Teal",
            "forest": "Forest",
            "emerald": "Emerald",
            "amber": "Amber",
            "coral": "Coral",
            "rose": "Rose",
            "magenta": "Magenta"
        }
    },
    terms_page: {
        page_title: "Terms of Use",
        last_updated: "Last Updated:",
        print_btn: "Print Terms",
        table_of_contents: "Table of Contents",
        contact_title: "Questions about these Terms?",
        contact_desc: "If you have any questions or concerns regarding these Terms of Use, please contact our support team.",
        contact_btn: "Contact Support"
    },
    privacy_page: {
        page_title: "Privacy Policy",
        last_updated: "Last Updated:",
        table_of_contents: "Table of Contents",
        contact_title: "Have Questions?",
        contact_desc: "If you have any concerns about your data, please contact us.",
        contact_btn: "Contact Support",
        print_btn: "Print Policy"
    },
    help_page: {
        page_title: "Help & FAQ",
        subtitle: "Find answers and learn how to get the most out of the application.",
        search_placeholder: "Search for answers...",
        table_of_contents: "Topics",
        contact_title: "Still stuck?",
        contact_desc: "Can't find what you're looking for? Our team is here to help.",
        contact_btn: "Contact Support",
        no_results: "No topics found matching your search."
    },
    roadmap_page: {
        title: "Product Roadmap",
        subtitle: "See what we've built and where we're heading next.",
        suggest_btn: "Suggest a Feature",
        contact_title: "Have a Feature Request?",
        contact_desc: "Help us shape the future by sharing your ideas directly with the developer.",
        toc_title: "Timeline"
    },
    overview_page: {
        title: "Technical Overview",
        subtitle: "Deep dive into the architecture and stack.",
        github_btn: "View on GitHub",
        toc_title: "On This Page",
        dynamic_docs_note: "This overview is generated dynamically from Markdown files to ensure it's always up-to-date with the latest codebase changes.",
        about_docs_title: "About this docs"
    },
    changelog: {
        title: "Version History",
        subtitle: "Track the evolution of the application. Here you'll find a detailed log of new features, improvements, and fixes.",
        search_placeholder: "Search features, versions...",
        latest_release: "Latest Release",
        released: "Released",
        update_now: "Update Now",
        on_this_page: "On This Page",
        read_more: "Read Release Notes",
        collapse: "Collapse",
        back_to_top: "Back to Top",
        update_details: "Update Details",
        view_all: "View All Updates",
        share_update: "Share Update",
        jump_to: "Jump to",
        version_not_found: "Version not found.",
        no_results: "No results found.",
        back_to_changelog: "Back to Changelog",
        load_more: "Load More",
        explore_more: "Explore More",
        link_copied: "Link copied to clipboard!",
        email_copied: "Email summary copied to clipboard!",
        copy_email_embed: "Copy summary for email",
        open_full_screen: "Open in full screen",
        share_tooltip: "Share this update",
        previous_update: "Previous Update",
        next_update: "Next Update",
        table_of_contents: "Table of Contents",
        in_this_update: "In this update",
        auto_translated_badge: "Auto Translated",
        auto_translated_tooltip: "Translated by an AI system for your convenience.",
        translate_badge_restore: "Translate",
        translate_badge_restore_tooltip: "Translate content to your current language.",
        translate_modal_title: "Auto Translated",
        translate_modal_desc: "This content was automatically translated by an AI system. Some technical terms might be slightly inaccurate.",
        translate_modal_show_original: "Show Original (English)",
        translate_modal_keep_translation: "Keep Translation"
    },
    feedback: {
        title: "Send Feedback",
        subtitle: "Help us improve. Bug reports, feature requests, or just say hi.",
        wizard: {
            step_1: "Step 1 of 4 • Getting Started",
            step_2: "Step 2 of 4 • Quick Choice",
            step_3: "Step 3 of 4 • Almost There (~1 min left)",
            step_4: "Step 4 of 4 • Review & Send",
            back: "Back",
            next: "Next",
            review_title: "Review Your Feedback",
            info_included: "Included",
            info_not_included: "Not Included",
            none: "None",
            change_file: "Change File",
            attach_image: "Attach Image",
            device_info: "Device Info",
            attachment: "Attachment"
        },
        form: {
            project_label: "Project",
            type_label: "Topic",
            platform_label: "Platform",
            email_label: "Email Address",
            email_placeholder: "your@email.com",
            email_error: "Please enter a valid email address.",
            description_label: "Message",
            description_placeholder: "Describe what happened or share your idea...",
            description_error: "Message must be at least 15 characters long.",
            include_device_info: "Include device info (Browser/OS)",
            send_button: "Send Feedback",
            draft_recovered: "Draft recovered",
            discard_draft: "Discard Draft"
        },
        success: {
            title: "Message Sent!",
            message: "Your message was successfully sent to support@fertwbr.com. A confirmation copy has been sent to {email}.",
            error_title: "Delivery Failed",
            error_message: "We encountered a network error while trying to send your message. Please try again.",
            btn_retry: "Try Again",
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
            screenshot: "A picture is worth a thousand words. Consider attaching a screenshot.",
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