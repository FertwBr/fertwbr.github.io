/**
 * Analyzes the user input to provide smart guidance tips.
 * Ported from Android Kotlin implementation.
 */
export const getGuidanceKey = (type, text = "", strings) => {
    if (!type) return 'default_general';

    const lowerText = text.trim().toLowerCase();
    if (lowerText.length > 0 && lowerText.length < 15) return 'short_text';

    const hasMatch = (key) => {
        const keywords = strings.keywords[key].split(',');
        return keywords.some(k => lowerText.includes(k.trim()));
    };

    const hasSteps = hasMatch('steps');
    const hasCrash = hasMatch('crash');
    const hasError = hasMatch('error');
    const hasScreen = hasMatch('screen');
    const hasCorrection = hasMatch('correction');
    const hasIdea = hasMatch('idea');

    switch (type) {
        case 'bug':
            if (hasSteps) return 'steps_received';
            if (hasError) return 'error_received';
            if (hasCrash) return 'crash';
            if (lowerText.length > 50 && !hasScreen) return 'screenshot';
            if (lowerText.length > 100) return 'great_detail';
            return 'default_bug';

        case 'translation':
            if (hasScreen && hasCorrection) return 'great_detail';
            if (hasScreen) return 'location_received';
            if (hasCorrection) return 'default_translation';
            return 'translation_keyword';

        case 'feature':
            if (hasIdea) return 'idea_received';
            if (lowerText.length > 50) return 'great_detail';
            return 'default_feature';

        case 'ui':
            if (hasScreen) return 'location_received';
            return 'default_general';

        default:
            return lowerText.length > 40 ? 'great_detail' : 'default_general';
    }
};

/**
 * Generates the mailto link.
 */
export const generateMailto = ({ project, platform, type, message, includeInfo }) => {
    const recipient = "fertwbr@programmer.net";
    const subject = `[Feedback ${project}] ${type.toUpperCase()}`;

    let body = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    body += `📌 TYPE: ${type}\n`;
    body += `🚀 PROJECT: ${project} (${platform})\n`;
    body += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    body += `📝 MESSAGE\n--------------------------------------\n`;
    body += `${message}\n\n`;

    if (includeInfo) {
        body += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        body += `🔧 DIAGNOSTIC INFO\n`;
        body += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        body += `User Agent: ${navigator.userAgent}\n`;
        body += `Language: ${navigator.language}\n`;
        body += `Screen: ${window.screen.width}x${window.screen.height}\n`;
        body += `Time: ${new Date().toISOString()}\n`;
    }

    return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};