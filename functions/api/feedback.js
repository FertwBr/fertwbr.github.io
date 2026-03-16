/**
 * @file feedback.js
 * @description Cloudflare Pages Function to securely handle feedback submissions via Resend API.
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
        es: "¡Gracias por contactarnos! Nuestros desenvolvedores han recibido tu mensaje y te responderán lo antes posible.",
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
        hi: "प्रोजект देखें"
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
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body { font-family: sans-serif; background-color: #0f1115; margin: 0; padding: 0; color: #e2e2e6; }
                .container { max-width: 600px; margin: 40px auto; background-color: #1b1b1f; border-radius: 32px; border: 1px solid rgba(255, 255, 255, 0.08); overflow: hidden; }
                .header { background: linear-gradient(135deg, #${colorHex} 0%, #0f1115 150%); padding: 60px 20px; text-align: center; }
                .app-icon { width: 80px; height: 80px; border-radius: 20px; margin-bottom: 16px; }
                .content { padding: 40px 30px; line-height: 1.6; }
                .title { color: #${colorHex}; font-size: 26px; font-weight: 700; margin-bottom: 10px; }
                .user-quote { background: rgba(255,255,255,0.03); border-left: 4px solid #${colorHex}; padding: 15px; border-radius: 8px; font-style: italic; margin-bottom: 30px; white-space: pre-wrap; }
                .footer { background-color: #1b1b1f; padding: 40px 30px; border-top: 1px solid rgba(255, 255, 255, 0.08); }
                .footer-link { display: inline-block; background: #2b2930; color: #e2e2e6; padding: 8px 16px; border-radius: 8px; text-decoration: none; font-size: 13px; margin: 4px; }
                .btn-main { display: inline-block; padding: 16px 32px; background-color: #${colorHex}; color: #ffffff; text-decoration: none; border-radius: 100px; font-weight: 700; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="${appIcon}" class="app-icon">
                    <div style="font-size: 22px; font-weight: 700;">${appName}</div>
                </div>
                <div class="content">
                    <div class="title">${greeting}</div>
                    <p>${bodyText}</p>
                    <div class="user-quote">${userMessage}</div>
                    <a href="https://fertwbr.com/${appSlug}" class="btn-main">${btnText}</a>
                </div>
                <div class="footer">
                    <div style="font-size: 12px; color: #938f99; margin-bottom: 20px;">${linksTitle}</div>
                    <a href="https://fertwbr.com/${appSlug}/overview" class="footer-link">Docs</a>
                    <a href="https://fertwbr.com/${appSlug}/changelog" class="footer-link">Updates</a>
                    <a href="https://fertwbr.com/${appSlug}/privacy" class="footer-link">Privacy</a>
                    <div style="margin-top: 20px; font-size: 13px;">© 2025 - 2026 Fernando Vaz</div>
                </div>
            </div>
        </body>
        </html>
    `;
}

export async function onRequestPost(context) {
    try {
        const body = await context.request.json();
        const apiKey = context.env.RESEND_API_KEY;

        if (!apiKey) {
            console.error("DEBUG: RESEND_API_KEY is missing in context.env");
            return new Response(JSON.stringify({error: "API Key not configured"}), {status: 500});
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
            appIcon = "https://apps.fertwbr.com/pixelpulse/assets/favicon/web-app-manifest-192x192.png";
        }

        const loc = getLocalization(languageCode, appName);
        const attachments = attachmentBase64 ? [{
            filename: attachmentName || 'screenshot.png',
            content: attachmentBase64
        }] : undefined;

        const supportRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {"Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json"},
            body: JSON.stringify({
                from: `${appName} Support <support@fertwbr.com>`,
                to: ["support@fertwbr.com"],
                reply_to: email,
                subject: `[${appName}] New Feedback: ${type}`,
                html: `<p><strong>From:</strong> ${email}</p><p><strong>Platform:</strong> ${platform}</p><p>${message}</p><hr><pre>${debugInfo || ''}</pre>`,
                attachments
            })
        });

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

        await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {"Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json"},
            body: JSON.stringify({
                from: `${appName} <no-reply@fertwbr.com>`,
                to: [email],
                subject: loc.subject,
                html: autoReplyHtml
            })
        });

        return new Response(JSON.stringify({success: true}), {status: 200});

    } catch (error) {
        console.error("CRITICAL ERROR:", error.message);
        return new Response(JSON.stringify({error: error.message}), {status: 500});
    }
}