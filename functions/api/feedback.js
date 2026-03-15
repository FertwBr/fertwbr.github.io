/**
 * @file feedback.js
 * @description Cloudflare Pages Function to securely handle feedback submissions via Resend API.
 */

/**
 * Returns localized support and auto-reply configurations.
 * @param {string} languageCode
 * @param {string} appName
 * @returns {Object}
 */
function getLocalization(languageCode, appName) {
    const lang = (languageCode || 'en').split('-')[0].toLowerCase();

    const greetings = {
        pt: "Mensagem Recebida!",
        es: "¡Mensaje Recibido!",
        fr: "Message Reçu !",
        de: "Nachricht erhalten!",
        ja: "メッセージを受信しました！",
        hi: "संदेश प्राप्त हुआ!"
    };

    const bodies = {
        pt: "Obrigado pelo contato! Nossos devs já receberam seu feedback e retornarão o mais breve possível.",
        es: "¡Gracias por contactarnos! Nuestros desarrolladores han recibido tu mensaje y te responderán lo antes posible.",
        fr: "Merci de nous avoir contactés ! Nos développeurs ont reçu votre message.",
        de: "Vielen Dank für deine Nachricht! Unsere Entwickler haben dein Feedback erhalten.",
        ja: "ご連絡ありがとうございます。開発チームがフィードバックを受け取りました。",
        hi: "संपर्क करने के लिए धन्यवाद! हमारे डेवलपर्स को आपकी प्रतिक्रिया मिल गई है।"
    };

    const buttons = {
        pt: "Ver Projeto",
        es: "Ver Proyecto",
        fr: "Voir le Projet",
        de: "Projekt ansehen",
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
        bodyText: bodies[lang] || "Thanks for reaching out! Our devs have received your feedback and will get back to you as soon as possible.",
        btnText: buttons[lang] || "View Project",
        linksTitle: linksTitles[lang] || "Useful Links",
        subject: subjects[lang] || `Confirmed: We got your message! - ${appName}`
    };
}

/**
 * Generates the Auto-Reply HTML.
 * @param {Object} params
 * @returns {string}
 */
function buildAutoReplyHtml({ greeting, bodyText, btnText, linksTitle, colorHex, appSlug, appName, userMessage, appIcon }) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${greeting}</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
                body { font-family: 'Poppins', Arial, sans-serif; background-color: #0f1115; margin: 0; padding: 0; color: #e2e2e6; -webkit-font-smoothing: antialiased; }
                .wrapper { width: 100%; table-layout: fixed; background-color: #0f1115; padding-bottom: 60px; }
                .container { max-width: 600px; margin: 0 auto; background-color: #1b1b1f; border-radius: 32px; border: 1px solid rgba(255, 255, 255, 0.08); overflow: hidden; margin-top: 40px; }
                .header { background: linear-gradient(135deg, #${colorHex} 0%, #0f1115 150%); padding: 60px 20px; text-align: center; }
                .app-icon { width: 80px; height: 80px; border-radius: 20px; margin-bottom: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
                .content { padding: 40px 30px; line-height: 1.6; }
                .title { color: #${colorHex}; font-size: 26px; font-weight: 700; margin-bottom: 10px; }
                .message { color: #e2e2e6; font-size: 16px; margin-bottom: 24px; }
                .user-quote { background: rgba(255,255,255,0.03); border-left: 4px solid #${colorHex}; padding: 15px; border-radius: 8px; font-style: italic; font-size: 14px; margin-bottom: 30px; white-space: pre-wrap; }
                .footer { background-color: #1b1b1f; padding: 40px 30px; border-top: 1px solid rgba(255, 255, 255, 0.08); text-align: left; }
                .footer-title { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #938f99; font-weight: 700; margin-bottom: 20px; }
                .links-grid { display: block; margin-bottom: 30px; }
                .footer-link { display: inline-block; background: #2b2930; color: #e2e2e6; padding: 8px 16px; border-radius: 8px; text-decoration: none; font-size: 13px; margin: 4px; font-weight: 500; border: 1px solid transparent; }
                .copyright { font-size: 13px; color: #938f99; margin-top: 20px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px; }
                .btn-main { display: inline-block; padding: 16px 32px; background-color: #${colorHex}; color: #ffffff; text-decoration: none; border-radius: 100px; font-weight: 700; margin-bottom: 20px; }
            </style>
        </head>
        <body>
            <div class="wrapper">
                <div class="container">
                    <div class="header">
                        <img src="${appIcon}" alt="${appName}" class="app-icon">
                        <div style="font-size: 22px; font-weight: 700; color: #ffffff;">${appName}</div>
                    </div>
                    <div class="content">
                        <div class="title">${greeting}</div>
                        <p class="message">${bodyText}</p>
                        <div class="user-quote">${userMessage.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
                        <a href="https://fertwbr.com/${appSlug}" class="btn-main">${btnText}</a>
                    </div>
                    <div class="footer">
                        <div class="footer-title">${linksTitle}</div>
                        <div class="links-grid">
                            <a href="https://fertwbr.com/${appSlug}/overview" class="footer-link">Docs</a>
                            <a href="https://fertwbr.com/${appSlug}/changelog" class="footer-link">Updates</a>
                            <a href="https://fertwbr.com/${appSlug}/roadmap" class="footer-link">Roadmap</a>
                            <a href="https://fertwbr.com/${appSlug}/privacy" class="footer-link">Privacy</a>
                            <a href="https://fertwbr.com/${appSlug}/help" class="footer-link">Help</a>
                        </div>
                        <div class="copyright">
                            <p style="margin: 0; font-weight: 600; color: #e2e2e6;">${appName}. All rights reserved.</p>
                            <p style="margin: 4px 0;">© 2025 - 2026 Fernando Vaz</p>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
}

/**
 * Handles the POST request to send the email via Resend.
 */
export async function onRequestPost(context) {
    try {
        const body = await context.request.json();
        const apiKey = context.env.RESEND_API_KEY;

        if (!apiKey) {
            return new Response(JSON.stringify({ error: "Missing API Key configuration." }), { status: 500 });
        }

        const { project, platform, type, email, message, debugInfo, languageCode, attachmentBase64, attachmentName } = body;

        let appName = "Fernando Vaz Portfolio";
        let appSlug = "";
        let colorHex = "D97706";
        let appIcon = "https://fertwbr.com/assets/avatar.png";

        if (project === "pixelcompass") {
            appName = "Pixel Compass";
            appSlug = "pixelcompass";
            colorHex = "6750A4";
            appIcon = "https://apps.fertwbr.com/pixelcompass/assets/favicon/web-app-manifest-192x192.png";
        } else if (project === "pixelpulse") {
            appName = "Pixel Pulse";
            appSlug = "pixelpulse";
            colorHex = "3BA174";
            appIcon = "https://apps.fertwbr.com/pixelpulse/assets/favicon/web-app-manifest-192x192.png";
        }

        const loc = getLocalization(languageCode, appName);

        const attachments = attachmentBase64 ? [{
            filename: attachmentName || 'attachment.png',
            content: attachmentBase64
        }] : undefined;

        const debugHtml = debugInfo ? `<p><strong>Diagnostic Info:</strong></p><pre style="background:#f4f4f5;padding:10px;border-radius:8px;font-size:12px;">${debugInfo}</pre>` : "";
        const supportHtml = `
            <h2>New Feedback: ${appName}</h2>
            <p><strong>Type:</strong> ${type}</p>
            <p><strong>Platform:</strong> ${platform}</p>
            <p><strong>User Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <hr>
            <p>${message.replace(/\n/g, "<br>")}</p>
            <hr>
            ${debugHtml}
        `;

        const supportPayload = {
            from: `${appName} Support <support@fertwbr.com>`,
            to: ["support@fertwbr.com"],
            reply_to: email,
            subject: `[${appName}] New Feedback: ${type}`,
            html: supportHtml,
            attachments
        };

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

        const autoReplyPayload = {
            from: `${appName} <no-reply@fertwbr.com>`,
            to: [email],
            subject: loc.subject,
            html: autoReplyHtml
        };

        const sendToResend = async (payload) => {
            const res = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error("Resend API returned " + res.status);
            return res.json();
        };

        await sendToResend(supportPayload);
        await sendToResend(autoReplyPayload);

        return new Response(JSON.stringify({ success: true }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to send email." }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}