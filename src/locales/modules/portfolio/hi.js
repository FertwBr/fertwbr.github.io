// src/locales/modules/portfolio/hi.js
export default {
    nav: {
        index: "होम",
        overview: "दस्तावेज़",
        changelog: "चेन्ज लॉग",
        roadmap: "रोडमैप",
        privacy: "गोपनीयता",
        terms: "उपयोग की शर्तें",
        help: "सहायता",
        back: "वापस"
    },
    hero: {
        greeting: "नमस्ते, मैं हूँ",
        name: "Fernando Vaz",
        role_prefix: "मैं बनाता हूँ",
        roles: ["Android ऐप्स", "बैकएंड सिस्टम", "उपयोगकर्ता अनुभव", "डिजिटल समाधान"],
        cta_primary: "प्रोजेक्ट्स देखें",
        cta_secondary: "मुझसे संपर्क करें"
    },
    not_found: {
        page_title: "पृष्ठ नहीं मिला",
        title: "404",
        subtitle: "उफ़! शून्यता में।",
        message: "आप जिस पृष्ठ को खोज रहे हैं वह वर्तमान में मौजूद नहीं है।",
        suggestion_title: "क्या आप इसे खोज रहे थे?",
        suggestion_desc: "आपके लिंक के आधार पर, हमें लगता है कि आप यहाँ जाना चाहते थे",
        suggestion_btn: "हाँ, वहाँ जाएँ",
        home_btn: "होम पर जाएँ",
        apps_btn: "ऐप्स देखें"
    },
    about: {
        title: "मेरे बारे में",
        subtitle: "जहाँ इंजीनियरिंग का डिज़ाइन से मिलन होता है",
        bio: {
            p1: {
                start: "मैं Fernando Vaz हूँ, ",
                highlight: "UniCesumar",
                end: " से स्नातक एक सॉफ़्टवेयर इंजीनियर, जो मज़बूत कोड और सहज डिज़ाइन के प्रतिच्छेदन के प्रति जुनूनी है।"
            },
            p2: {
                start: "मैं ",
                highlight_1: "Android इकोसिस्टम",
                middle: " (Kotlin/Jetpack Compose) और स्केलेबल ",
                highlight_2: "बैकएंड",
                end: " (Spring Boot) में विशेषज्ञ हूँ। मैं ऐसे समाधान बनाता हूँ जो न केवल कार्यात्मक हैं बल्कि उपयोग करने में आनंददायक भी हैं।"
            }
        },
        cta_work: "मेरा काम देखें",
        stats: {exp: "वर्षों का अनुभव", projects: "प्रोजेक्ट्स", clients: "संतुष्ट ग्राहक"},
        cards: {
            education: {title: "शिक्षा", value: "B.S. सॉफ़्टवेयर इंजीनियरिंग", sub: "UniCesumar"},
            location: {title: "स्थान", value: "सल्वाडोर, ब्राज़ील", sub: "GMT-3"},
            stack: {title: "मुख्य स्टैक", value: "Kotlin और Java", sub: "पूर्ण चक्र विकास"}
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
                desc: "रीयल-टाइम FFT विश्लेषण, Room Database दृढ़ता और WorkManager के माध्यम से बैटरी-अनुकूलित पृष्ठभूमि सेवाओं की विशेषता वाला उन्नत ध्वनि स्तर मीटर।",
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
                desc: "सेंसर फ्यूजन एल्गोरिदम, Jetpack Glance विजेट और चिंताओं के स्पष्ट पृथक्करण के लिए मल्टी-मॉड्यूल आर्किटेक्चर के साथ प्रीमियम नेविगेशन टूल।",
                tags: ["Wear OS", "सेंसर", "Glance", "Retrofit"],
                icon_url: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Compass/art/phone.svg",
                link: "/PixelCompass?page=index",
                repo: "https://github.com/fertwbr/PixelCompass",
                color: "primary",
                icon: "explore"
            },
            {
                id: "gemini_expressive",
                title: "Gemini Expressive",
                category: "ब्राउज़र एक्सटेंशन",
                desc: "Gemini वेब UI को एक स्थायी टाइमलाइन नेविगेशन, बुद्धिमान कोड कोलाप्सिंग, और डायनामिक Material You थीमिंग के साथ बेहतर बनाता है।",
                tags: ["JavaScript", "Manifest V3", "CSS Variables", "Material 3"],
                icon_url: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Gemini/art/favicon.svg",
                link: "https://tools.fertwbr.com/geminiexpressive",
                repo: "https://github.com/fertwbr/Gemini-Expressive",
                color: "secondary",
                icon: "extension"
            },
            {
                id: "portfolio_site",
                title: "यह पोर्टफोलियो",
                category: "वेब इंजीनियरिंग",
                desc: "इसी साइट के आर्किटेक्चर में एक गहरा गोता। React, Material Design 3 और एक कस्टम Markdown इंजन के साथ निर्मित।",
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
                desc: "कॉर्पोरेट इनोवेशन प्लेटफ़ॉर्म जो टीमों को विचार प्रस्तुत करने, वोट करने और ट्रैक करने में सक्षम बनाता है। Spring Boot Security और PostgreSQL के साथ निर्मित।",
                tags: ["Spring Boot", "Java", "PostgreSQL", "JWT"],
                link: "https://github.com/FertwBr/boxIdea",
                repo: "https://github.com/FertwBr/boxIdea",
                color: "tertiary",
                icon: "lightbulb"
            }
        ]
    },
    tech: {title: "तकनीकें", subtitle: "उपकरण जिनका उपयोग मैं विचारों को जीवंत करने के लिए करता हूँ"},
    github: {
        title: "ओपन सोर्स", view_profile: "GitHub प्रोफ़ाइल देखें", languages: "सर्वाधिक प्रयुक्त भाषाएँ",
        default_bio: "Android और वेब के लिए चीजें बनाना।",
        stats: {
            contributions: "वार्षिक योगदान",
            repos: "रिपॉजिटरी",
            stars: "कुल सितारे",
            followers: "अनुयायी"
        }
    },
    contact: {
        title: "आइए साथ मिलकर काम करें",
        desc: "क्या आपके दिमाग में कोई प्रोजेक्ट है या नवीनतम Android तकनीक पर चर्चा करना चाहते हैं?",
        email: "e-mail भेजें",
        linkedin: "LinkedIn",
        github: "GitHub"
    }
};