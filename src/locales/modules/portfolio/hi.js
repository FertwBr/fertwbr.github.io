/**
 * Core portfolio localization strings (Hindi).
 */
export default {
    nav: {
        index: "मुख्य पृष्ठ",
        overview: "दस्तावेज़",
        changelog: "परिवर्तन लॉग",
        roadmap: "रोडमैप",
        privacy: "गोपनीयता",
        help: "सहायता",
        back: "वापस"
    },
    common: {
        offline: "आप अभी ऑफ़लाइन हैं।",
    },
    redirect: {
        launching: "एप्लिकेशन शुरू हो रहा है...",
        did_open: "क्या ऐप खुला?",
        open_again: "ऐप फिर से खोलें",
        get_on_store: "Play Store पर प्राप्त करें"
    },
    error: {
        title: "सिस्टम की खराबी",
        desc_1: "एप्लिकेशन कोर के भीतर कुछ अप्रत्याशित हुआ।",
        desc_2: "चिंता न करें, कोई डेटा नष्ट नहीं हुआ है।",
        reload: "सिस्टम रीलोड करें",
        home: "होम पर वापस जाएं",
        show_details: "तकनीकी विवरण दिखाएं",
        hide_details: "तकनीकी विवरण छिपाएं",
        copy: "कॉपी करें",
        copied: "कॉपी किया गया"
    },
    hero: {
        greeting: "नमस्ते, मैं हूँ",
        name: "Fernando Vaz",
        role_prefix: "मैं बनाता हूँ",
        roles: ["Android ऐप्स", "Backend सिस्टम", "यूज़र एक्सपीरियंस", "डिजिटल समाधान"],
        cta_primary: "प्रोजेक्ट्स देखें",
        cta_secondary: "मुझसे संपर्क करें"
    },
    not_found: {
        page_title: "पेज नहीं मिला",
        title: "404",
        subtitle: "ओह! शून्य में प्रवेश।",
        message: "आप जिस पेज की तलाश कर रहे हैं वह वर्तमान में मौजूद नहीं है।",
        suggestion_title: "क्या आप इसे ढूंढ रहे थे?",
        suggestion_desc: "आपके लिंक के आधार पर, हमें लगता है कि आप यहाँ जाना चाहते थे",
        suggestion_btn: "हाँ, वहाँ जाएँ",
        home_btn: "होम पर जाएँ",
        apps_btn: "ऐप्स देखें"
    },
    about: {
        title: "मेरे बारे में",
        subtitle: "इंजीनियरिंग और डिज़ाइन का संगम",
        bio: {
            p1: {
                start: "मैं Fernando Vaz हूँ, ",
                highlight: "UniCesumar",
                end: " से स्नातक एक सॉफ्टवेयर इंजीनियर, जो मजबूत कोड और सहज डिज़ाइन के मिलन के प्रति जुनूनी है।"
            },
            p2: {
                start: "मैं ",
                highlight_1: "Android इकोसिस्टम",
                middle: " (Kotlin/Jetpack Compose) और स्केलेबल ",
                highlight_2: "Backends",
                end: " (Spring Boot) में विशेषज्ञता रखता हूँ। मैं ऐसे समाधान बनाता हूँ जो न केवल कार्यात्मक हैं बल्कि उपयोग करने में सुखद भी हैं।"
            }
        },
        cta_work: "मेरा काम देखें",
        stats: {
            exp: "वर्षों का अनुभव",
            projects: "प्रोजेक्ट्स",
            clients: "खुश ग्राहक"
        },
        cards: {
            education: {title: "शिक्षा", value: "B.S. सॉफ्टवेयर इंजीनियरिंग", sub: "UniCesumar"},
            location: {title: "स्थान", value: "साल्वाडोर, ब्राजील", sub: "GMT-3"},
            stack: {title: "मुख्य स्टैक", value: "Kotlin और Java", sub: "Full Cycle Dev"}
        }
    },
    projects: {
        title: "चयनित कार्य",
        subtitle: "तकनीकी गहराई और रचनात्मक समस्या समाधान का एक प्रदर्शन।",
        view_project: "केस स्टडी देखें",
        source_code: "सोर्स कोड",
        items: [
            {
                id: "pixel_pulse",
                title: "Pixel Pulse",
                category: "Android इंजीनियरिंग",
                desc: "रीयल-टाइम FFT विश्लेषण, Room Database निरंतरता, और WorkManager के माध्यम से बैटरी-अनुकूलित बैकग्राउंड सेवाओं वाला उन्नत ध्वनि स्तर मीटर।",
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
                category: "Wear OS और मोबाइल",
                desc: "सेंसर फ्यूजन एल्गोरिदम, Jetpack Glance विजेट और स्पष्ट कार्यों के पृथक्करण के लिए मल्टी-मॉड्यूल आर्किटेक्चर वाला प्रीमियम नेविगेशन टूल।",
                tags: ["Wear OS", "Sensors", "Glance", "Retrofit"],
                icon_url: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Compass/art/phone.svg",
                link: "/PixelCompass?page=index",
                repo: "https://github.com/fertwbr/PixelCompass",
                color: "secondary",
                icon: "explore"
            },
            {
                id: "portfolio_site",
                title: "यह पोर्टफोलियो",
                category: "वेब इंजीनियरिंग",
                desc: "इसी साइट के आर्किटेक्चर का गहरा विश्लेषण। React, Material Design 3, और एक कस्टम Markdown इंजन के साथ निर्मित।",
                tags: ["React", "Vite", "Material 3", "Framer Motion"],
                icon: "web",
                link: "/site/overview",
                repo: "https://github.com/fertwbr/fertwbr.github.io",
                color: "tertiary"
            },
            {
                id: "box_idea",
                title: "boxIdea",
                category: "फुल स्टैक वेब",
                desc: "कॉर्पोरेट इनोवेशन प्लेटफॉर्म जो टीमों को विचार सबमिट करने, वोट करने और ट्रैक करने में सक्षम बनाता है। Spring Boot Security और PostgreSQL के साथ निर्मित।",
                tags: ["Spring Boot", "Java", "PostgreSQL", "JWT"],
                link: "https://github.com/FertwBr/boxIdea",
                repo: "https://github.com/FertwBr/boxIdea",
                color: "tertiary",
                icon: "lightbulb"
            }
        ]
    },
    tech: {
        title: "तकनीक",
        subtitle: "विचारों को जीवन में लाने के लिए मैं जिन उपकरणों का उपयोग करता हूँ"
    },
    github: {
        title: "ओपन सोर्स",
        view_profile: "GitHub प्रोफ़ाइल देखें",
        languages: "सबसे अधिक उपयोग की जाने वाली भाषाएँ",
        default_bio: "Android और वेब के लिए समाधान विकसित करता है।",
        stats: {
            contributions: "वर्ष की योगदान संख्या",
            repos: "रिपॉज़िटरी",
            stars: "कुल स्टार",
            followers: "फ़ॉलोअर्स"
        }
    },
    contact: {
        title: "आइए मिलकर काम करें",
        desc: "क्या आपके मन में कोई प्रोजेक्ट है या Android तकनीक में नवीनतम चर्चा करना चाहते हैं?",
        email: "ई-मेल भेजें",
        linkedin: "LinkedIn",
        github: "GitHub"
    },
    footer: {
        rights: "सर्वाधिकार सुरक्षित।",
        built: "Fernando Vaz द्वारा डिज़ाइन और विकसित 🇧🇷",
        useful_links: "उपयोगी लिंक",
        social_title: "जुड़ें",
        appearance: {
            title: "थीम और स्वरूप",
            language_selector: "भाषा",
            en: "अंग्रेज़ी",
            pt: "पुर्तगाली",
            theme_mode: "मोड",
            mode_auto: "ऑटो",
            mode_light: "लाइट",
            mode_dark: "डार्क"
        }
    },
    terms_page: {
        page_title: "उपयोग की शर्तें",
        last_updated: "अंतिम अपडेट:",
        print_btn: "शर्तें प्रिंट करें",
        table_of_contents: "विषय सूची",
        contact_title: "इन शर्तों के बारे में प्रश्न?",
        contact_desc: "यदि इन उपयोग की शर्तों के संबंध में आपके कोई प्रश्न या चिंताएँ हैं, तो कृपया हमारी सहायता टीम से संपर्क करें।",
        contact_btn: "सहायता टीम से संपर्क करें"
    },
    changelog: {
        title: "संस्करण इतिहास",
        subtitle: "साइट के विकास को ट्रैक करें। यहाँ आपको प्रत्येक संस्करण के लिए नई सुविधाओं, सुधारों और फिक्स का विस्तृत लॉग मिलेगा।",
        search_placeholder: "सुविधाएँ, संस्करण खोजें...",
        latest_release: "नवीनतम रिलीज़",
        released: "जारी किया गया",
        update_now: "अभी अपडेट करें",
        on_this_page: "इस पृष्ठ पर",
        read_more: "रिलीज़ नोट्स पढ़ें",
        collapse: "संक्षिप्त करें",
        back_to_top: "वापस ऊपर जाएँ",
        update_details: "अपडेट विवरण",
        view_all: "सभी अपडेट देखें",
        share_update: "अपडेट साझा करें",
        jump_to: "यहाँ जाएँ",
        version_not_found: "संस्करण नहीं मिला।",
        no_results: "कोई परिणाम नहीं मिला।",
        back_to_changelog: "चेंजलॉग पर वापस जाएँ",
        load_more: "और लोड करें",
        explore_more: "और एक्सप्लोर करें",
        link_copied: "लिंक क्लिपबोर्ड पर कॉपी हो गया!",
        open_full_screen: "पूर्ण स्क्रीन में खोलें",
        share_tooltip: "इस अपडेट को साझा करें",
        previous_update: "पिछला अपडेट",
        next_update: "अगला अपडेट",
        table_of_contents: "विषय सूची",
        in_this_update: "इस अपडेट में",
        auto_translated_badge: "स्वतः अनुवादित",
        auto_translated_tooltip: "आपकी सुविधा के लिए एक AI सिस्टम द्वारा अनुवादित।",
        translate_badge_restore: "Traducir",
        translate_badge_restore_tooltip: "Traducir el contenido a su idioma actual.",
        translate_modal_title: "स्वतः अनुवादित",
        translate_modal_desc: "आपको अपडेट रखने में मदद के लिए इस सामग्री का स्वचालित रूप से एक AI सिस्टम द्वारा अनुवाद किया गया था। कुछ तकनीकी शब्द या बारीकियाँ थोड़ी गलत हो सकती हैं।",
        translate_modal_show_original: "मूल (अंग्रेज़ी) दिखाएँ",
        translate_modal_keep_translation: "अनुवाद रखें"
    },
    overview_page: {
        title: "तकनीकी अवलोकन",
        subtitle: "आर्किटेक्चर और स्टैक का गहरा विश्लेषण।",
        github_btn: "GitHub पर देखें",
        toc_title: "इस पृष्ठ पर",
        dynamic_docs_note: "यह अवलोकन Markdown फ़ाइलों से गतिशील रूप से उत्पन्न किया जाता है, ताकि यह सुनिश्चित हो सके कि यह हमेशा कोडबेस में हुए नवीनतम परिवर्तनों के साथ अद्यतित रहे।",
        about_docs_title: "इस दस्तावेज़ के बारे में"
    },
    feedback: {
        title: "प्रतिक्रिया भेजें",
        subtitle: "हमें बेहतर बनाने में मदद करें। बग रिपोर्ट, सुविधा अनुरोध, या बस नमस्ते कहें।",
        form: {
            project_label: "प्रोजेक्ट",
            type_label: "विषय",
            platform_label: "प्लेटफॉर्म",
            email_label: "ईमेल पता",
            email_placeholder: "your@email.com",
            email_error: "कृपया एक मान्य ईमेल पता दर्ज करें।",
            description_label: "संदेश",
            description_placeholder: "बताएं कि क्या हुआ या अपना विचार साझा करें...",
            description_error: "संदेश कम से कम 15 वर्णों का होना चाहिए।",
            include_device_info: "डिवाइस जानकारी शामिल करें (Browser/OS)",
            send_button: "प्रतिक्रिया भेजें",
            draft_recovered: "ड्राफ्ट रिकवर किया गया",
            discard_draft: "ड्राफ्ट हटा दें"
        },
        success: {
            title: "संदेश भेज दिया गया!",
            message: "आपका संदेश सफलतापूर्वक support@fertwbr.com पर भेज दिया गया है। एक पुष्टिकरण प्रति {email} पर भेजी गई है।",
            error_title: "डिलिवरी विफल",
            error_message: "आपका संदेश भेजने का प्रयास करते समय हमें नेटवर्क त्रुटि का सामना करना पड़ा। कृपया पुनः प्रयास करें।",
            btn_retry: "पुनः प्रयास करें",
            btn_edit: "संदेश संपादित करें",
            btn_home: "होम पर वापस जाएं"
        },
        projects: {
            pixelpulse: "Pixel Pulse",
            pixelcompass: "Pixel Compass",
            portfolio: "पोर्टफोलियो साइट"
        },
        platforms: {
            android: "Android (फ़ोन)",
            wearos: "Wear OS",
            web: "Web / साइट"
        },
        types: {
            general: "सामान्य प्रतिक्रिया",
            bug: "बग रिपोर्ट",
            feature: "सुविधा अनुरोध",
            translation: "अनुवाद संबंधी समस्या",
            ui: "UI सुझाव",
            other: "अन्य"
        },
        guidance: {
            label: "सुझाव",
            default_general: "हम सुन रहे हैं! अपने विचार साझा करें।",
            default_bug: "बग होने के चरणों का वर्णन करें।",
            default_feature: "यह सुविधा आपके अनुभव को कैसे बेहतर बनाएगी?",
            default_translation: "गलत टेक्स्ट किस स्क्रीन पर है?",
            short_text: "कृपया थोड़ा और विवरण प्रदान करें ताकि हम बेहतर समझ सकें।",
            crash: "यदि ऐप क्रैश हो गया, तो क्या आपको कोई त्रुटि कोड या संदेश दिखाई दिया?",
            screenshot: "एक तस्वीर हज़ार शब्दों के बराबर होती है। स्क्रीनशॉट संलग्न करने पर विचार करें।",
            translation_keyword: "विशिष्ट भाषा और गलत वाक्यांश का उल्लेख करने से हमें इसे तेज़ी से ठीक करने में मदद मिलती है।",
            steps_received: "बेहतरीन! चरणों को जानने से हमें समस्या को दोबारा उत्पन्न करने में मदद मिलती है।",
            error_received: "त्रुटि विवरण शामिल करने के लिए धन्यवाद।",
            location_received: "शानदार, स्क्रीन लोकेशन जानना बहुत मददगार है।",
            idea_received: "यह एक दिलचस्प विचार है! हमें इसके काम करने के तरीके के बारे में और बताएं।",
            great_detail: "बहुत विस्तृत! इससे हमें समझने में काफी मदद मिलती है।"
        },
        keywords: {
            crash: "crash,बंद,रुकना,फ्रीज,लैग,टूटा हुआ,सफेद स्क्रीन",
            error: "त्रुटि,कोड,विफल,अपवाद,0x,नंबर,संदेश",
            steps: "चरण,पहले,फिर,बाद में,जब,क्लिक,टैप,प्रेस,स्क्रॉल",
            screen: "स्क्रीन,पेज,व्यू,विंडो,डायलॉग,टैब,कार्ड,मेनू,नैवबार,फुटर",
            correction: "टेक्स्ट,शब्द,टाइपो,गलत,अशुद्ध,खराब,वर्तनी,व्याकरण,अनुवाद,भाषा",
            idea: "जोड़ें,बनाएं,इच्छा,होगा,सकता है,चाहिए,बेहतर,नया,सुविधा,मोड"
        }
    }
};