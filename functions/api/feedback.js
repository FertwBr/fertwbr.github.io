/**
 * @file feedback.js
 * @description Cloudflare Pages Function to securely handle feedback submissions via Resend API.
 */

/**
 * Returns localized support and auto-reply configurations.
 * @param {string} languageCode - The user's locale.
 * @param {string} appName - The target application name.
 * @returns {Object} Localized strings.
 */
function getLocalization(languageCode, appName) {
    const lang = (languageCode || 'en').split('-')[0].toLowerCase();

    const greetings = {
        pt: "Mensagem Recebida!",
        es: "¡Mensaje Recibido!",
        fr: "Message Reçu !",
        de: "Nachricht Erhalten!",
        ja: "メッセージを受信しました！",
        hi: "संदेश प्राप्त हुआ!"
    };

    const bodies = {
        pt: "Obrigado pelo contato! Nossa equipe já recebeu seu feedback e retornará o mais breve possível.",
        es: "¡Gracias por contactarnos! Nuestro equipo ha recibido tu mensaje y te responderán lo antes posible.",
        fr: "Merci de nous avoir contactés ! Notre équipe a reçu votre message.",
        de: "Vielen Dank für Ihre Nachricht! Unser Team hat Ihr Feedback erhalten.",
        ja: "ご連絡ありがとうございます。チームがフィードバックを受け取りました。",
        hi: "संपर्क करने के लिए धन्यवाद! हमारी टीम को आपकी प्रतिक्रिया मिल गई है।"
    };

    const buttons = {
        pt: "Ver Projeto",
        es: "Ver Proyecto",
        fr: "Voir le Projet",
        de: "Projekt Ansehen",
        ja: "プロジェクトを見る",
        hi: "प्रोजेक्ट देखें"
    };

    const linksTitles = {
        pt: "Links Úteis",
        es: "Enlaces Útiles",
        fr: "Liens Utiles",
        de: "Nützliche Links",
        ja: "便利なリンク",
        hi: "उपयोगी लिंक्स"
    };

    const subjects = {
        pt: `Confirmado: Recebemos sua mensagem! - ${appName}`,
        es: `Confirmado: ¡Recibimos tu mensaje! - ${appName}`,
        fr: `Confirmé : Nous avons reçu votre message ! - ${appName}`,
        de: `Bestätigt: Nachricht erhalten! - ${appName}`,
        ja: `確認：メッセージを受け取りました - ${appName}`,
        hi: `पुष्टि: हमें आपका संदेश मिल गया है - ${appName}`
    };

    return {
        greeting: greetings[lang] || "Message Received!",
        bodyText: bodies[lang] || "Thanks for reaching out! Our team has received your feedback and will get back to you as soon as possible.",
        btnText: buttons[lang] || "View Project",
        linksTitle: linksTitles[lang] || "Useful Links",
        subject: subjects[lang] || `Confirmed: We got your message! - ${appName}`
    };
}

/**
 * Generates the Auto-Reply HTML layout with dynamic light/dark theme support.
 * @param {Object} params - The dynamic content variables.
 * @returns {string} The constructed HTML.
 */
function buildAutoReplyHtml({
                                greeting,
                                bodyText,
                                btnText,
                                linksTitle,
                                colorHex,
                                appSlug,
                                appName,
                                userMessage,
                                appIcon
                            }) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="color-scheme" content="light dark">
            <meta name="supported-color-schemes" content="light dark">
            <style>
                :root { color-scheme: light dark; }
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 0; color: #1b1b1f; }
                .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 24px; border: 1px solid #e2e2e6; overflow: hidden; }
                .header { background: linear-gradient(135deg, #${colorHex} 0%, #2b2930 150%); padding: 50px 20px; text-align: center; color: #ffffff; }
                .app-icon { width: 80px; height: 80px; border-radius: 20px; margin-bottom: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
                .content { padding: 40px 30px; line-height: 1.6; }
                .title { color: #${colorHex}; font-size: 24px; font-weight: 700; margin-bottom: 12px; }
                .user-quote { background: #f8f9fa; border-left: 4px solid #${colorHex}; padding: 16px; border-radius: 8px; font-style: italic; margin: 24px 0; white-space: pre-wrap; color: #49454f; }
                .footer { background-color: #f8f9fa; padding: 30px; border-top: 1px solid #e2e2e6; }
                .footer-title { font-size: 12px; color: #79747e; margin-bottom: 16px; text-transform: uppercase; font-weight: bold; letter-spacing: 1px; }
                .footer-link { display: inline-block; background: #e2e2e6; color: #1b1b1f; padding: 8px 16px; border-radius: 8px; text-decoration: none; font-size: 13px; margin: 4px; font-weight: 600; }
                .btn-main { display: inline-block; padding: 14px 28px; background-color: #${colorHex}; color: #ffffff !important; text-decoration: none; border-radius: 100px; font-weight: 700; margin-bottom: 20px; }
                .copyright { margin-top: 20px; font-size: 13px; color: #79747e; }
                
                @media (prefers-color-scheme: dark) {
                    body { background-color: #0f1115 !important; color: #e2e2e6 !important; }
                    .container { background-color: #1b1b1f !important; border-color: #2b2930 !important; }
                    .header { background: linear-gradient(135deg, #${colorHex} 0%, #0f1115 150%) !important; }
                    .user-quote { background: rgba(255,255,255,0.03) !important; color: #e2e2e6 !important; }
                    .footer { background-color: #1b1b1f !important; border-color: #2b2930 !important; }
                    .footer-link { background: #2b2930 !important; color: #e2e2e6 !important; }
                    .footer-title, .copyright { color: #938f99 !important; }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="${appIcon}" alt="Icon" class="app-icon">
                    <div style="font-size: 22px; font-weight: 700;">${appName}</div>
                </div>
                <div class="content">
                    <div class="title">${greeting}</div>
                    <p>${bodyText}</p>
                    <div class="user-quote">${userMessage}</div>
                    <a href="https://fertwbr.com/${appSlug}" class="btn-main">${btnText}</a>
                </div>
                <div class="footer">
                    <div class="footer-title">${linksTitle}</div>
                    <a href="https://fertwbr.com/${appSlug}/overview" class="footer-link">Docs</a>
                    <a href="https://fertwbr.com/${appSlug}/changelog" class="footer-link">Updates</a>
                    <a href="https://fertwbr.com/${appSlug}/roadmap" class="footer-link">Roadmap</a>
                    <a href="https://fertwbr.com/${appSlug}/privacy" class="footer-link">Privacy</a>
                    <a href="https://fertwbr.com/${appSlug}/help" class="footer-link">Help</a>
                    <div class="copyright">&copy; 2025 - 2026 Fernando Vaz</div>
                </div>
            </div>
        </body>
        </html>
    `;
}

/**
 * Generates the Support HTML layout with dynamic light/dark theme support.
 * @param {Object} params - The dynamic content variables.
 * @returns {string} The constructed HTML.
 */
function buildSupportHtml({appName, type, platform, email, message, debugInfo, colorHex}) {
    const debugSection = debugInfo ? `<div class="section-title">Diagnostic Info</div><div class="debug">${debugInfo}</div>` : "";

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="color-scheme" content="light dark">
            <meta name="supported-color-schemes" content="light dark">
            <style>
                :root { color-scheme: light dark; }
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 0; color: #1b1b1f; }
                .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 24px; border: 1px solid #e2e2e6; overflow: hidden; }
                .header { background: linear-gradient(135deg, #${colorHex} 0%, #2b2930 150%); padding: 30px 20px; text-align: center; color: #ffffff; font-size: 20px; font-weight: bold; }
                .content { padding: 40px 30px; line-height: 1.6; }
                .metadata { margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #e2e2e6; }
                .badge { display: inline-block; padding: 4px 10px; border-radius: 100px; background-color: #e2e2e6; font-size: 12px; font-weight: bold; color: #1b1b1f; margin-left: 8px; }
                .user-quote { background: #f8f9fa; border-left: 4px solid #${colorHex}; padding: 16px; border-radius: 8px; font-size: 14px; margin-bottom: 30px; white-space: pre-wrap; color: #49454f; }
                .section-title { font-size: 14px; font-weight: bold; margin-bottom: 10px; color: #${colorHex}; text-transform: uppercase; }
                .debug { background-color: #f8f9fa; color: #49454f; padding: 15px; border-radius: 8px; font-family: monospace; font-size: 12px; white-space: pre-wrap; margin-bottom: 20px; border: 1px solid #e2e2e6; }
                .link { color: #${colorHex}; text-decoration: none; font-weight: 600; }

                @media (prefers-color-scheme: dark) {
                    body { background-color: #0f1115 !important; color: #e2e2e6 !important; }
                    .container { background-color: #1b1b1f !important; border-color: #2b2930 !important; }
                    .header { background: linear-gradient(135deg, #${colorHex} 0%, #0f1115 150%) !important; }
                    .metadata { border-color: #2b2930 !important; }
                    .badge { background-color: #2b2930 !important; color: #e2e2e6 !important; border: 1px solid #49454f !important; }
                    .user-quote { background: rgba(255,255,255,0.03) !important; color: #e2e2e6 !important; }
                    .debug { background-color: #0f1115 !important; color: #e2e2e6 !important; border-color: #2b2930 !important; }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">New Ticket: ${appName}</div>
                <div class="content">
                    <div class="metadata">
                        <p style="margin: 8px 0;"><strong>User:</strong> <a href="mailto:${email}" class="link">${email}</a></p>
                        <p style="margin: 8px 0;"><strong>Type:</strong> <span class="badge">${type}</span></p>
                        <p style="margin: 8px 0;"><strong>Platform:</strong> <span class="badge">${platform}</span></p>
                    </div>
                    <div class="section-title">Message</div>
                    <div class="user-quote">${message}</div>
                    ${debugSection}
                </div>
            </div>
        </body>
        </html>
    `;
}

/**
 * Handles POST requests for email submissions.
 * @param {Object} context - The Cloudflare Pages context object.
 * @returns {Response}
 */
export async function onRequestPost({request, env}) {
    try {
        const body = await request.json();
        const apiKey = env.RESEND_API_KEY;

        if (!apiKey) {
            return new Response(JSON.stringify({error: "Missing configuration."}), {
                status: 500,
                headers: {"Content-Type": "application/json"}
            });
        }

        const {
            project,
            platform,
            type,
            email,
            message,
            debugInfo,
            languageCode,
            attachmentBase64,
            attachmentName
        } = body;

        let appName = "Fernando Vaz Portfolio";
        let appSlug = "";
        let colorHex = "D97706";
        let appIcon = "https://fertwbr.com/assets/avatar.png";

        if (project === "pixelcompass") {
            appName = "Pixel Compass";
            appSlug = "pixelcompass";
            colorHex = "6750A4";
            appIcon = "https://apps.fertwbr.com/content/PixelCompass/assets/favicon/web-app-manifest-192x192.png";
        } else if (project === "pixelpulse") {
            appName = "Pixel Pulse";
            appSlug = "pixelpulse";
            colorHex = "3BA174";
            appIcon = "https://apps.fertwbr.com/content/PixelPulse/assets/favicon/web-app-manifest-192x192.png";
        }

        const loc = getLocalization(languageCode, appName);

        const attachments = attachmentBase64 ? [{
            filename: attachmentName || 'screenshot.png',
            content: attachmentBase64
        }] : undefined;

        const supportHtml = buildSupportHtml({appName, type, platform, email, message, debugInfo, colorHex});

        const supportRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {"Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json"},
            body: JSON.stringify({
                from: `${appName} Support <support@fertwbr.com>`,
                to: ["support@fertwbr.com"],
                reply_to: email,
                subject: `[${appName}] New Feedback: ${type}`,
                html: supportHtml,
                text: `New Ticket for ${appName}\n\nFrom: ${email}\nType: ${type}\nPlatform: ${platform}\n\nMessage:\n${message}\n\nDiagnostic Info:\n${debugInfo || 'N/A'}`,
                attachments
            })
        });

        if (!supportRes.ok) {
            throw new Error("API Support call failed: " + supportRes.status);
        }

        const autoReplyHtml = buildAutoReplyHtml({
            greeting: loc.greeting,
            bodyText: loc.bodyText,
            btnText: loc.btnText,
            linksTitle: loc.linksTitle,
            colorHex,
            appSlug,
            appName,
            userMessage: message,
            appIcon
        });

        const replyRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {"Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json"},
            body: JSON.stringify({
                from: `${appName} Support <support@fertwbr.com>`,
                to: [email],
                subject: loc.subject,
                html: autoReplyHtml,
                text: `${loc.greeting}\n\n${loc.bodyText}\n\nYour message:\n${message}\n\n${appName} Team`
            })
        });

        if (!replyRes.ok) {
            throw new Error("API Auto-Reply call failed: " + replyRes.status);
        }

        return new Response(JSON.stringify({success: true}), {
            status: 200,
            headers: {"Content-Type": "application/json"}
        });

    } catch (error) {
        return new Response(JSON.stringify({error: "Failed to send email."}), {
            status: 500,
            headers: {"Content-Type": "application/json"}
        });
    }
}