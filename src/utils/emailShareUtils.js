/**
 * @file emailShareUtils.js
 * @description Utility functions for generating and copying a rich HTML email embed from changelog data.
 */

/**
 * @param {string} html
 * @param {string} text
 * @returns {void}
 */
const copyRichTextFallback = (html, text) => {
    const container = document.createElement('div');
    container.innerHTML = html;
    container.style.position = 'fixed';
    container.style.top = '-9999px';
    container.style.left = '-9999px';
    document.body.appendChild(container);

    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(container);
    selection.removeAllRanges();
    selection.addRange(range);

    try {
        document.execCommand('copy');
    } catch (e) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.top = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
        } catch (err) {
        }
        document.body.removeChild(textArea);
    } finally {
        selection.removeAllRanges();
        if (document.body.contains(container)) {
            document.body.removeChild(container);
        }
    }
};

/**
 * @param {string} text
 * @param {string} primaryColor
 * @returns {string}
 */
const formatInline = (text, primaryColor) => {
    let res = text.replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 700;">$1</strong>');
    res = res.replace(/\*(.*?)\*/g, '<em style="font-style: italic;">$1</em>');
    res = res.replace(/`(.*?)`/g, `<code style="background-color: rgba(121, 116, 126, 0.15); padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 13px;">$1</code>`);
    res = res.replace(/\[(.*?)\]\((.*?)\)/g, `<a href="$2" style="color: ${primaryColor}; text-decoration: none; font-weight: 600;">$1</a>`);
    return res;
};

/**
 * @param {string} md
 * @param {string} primaryColor
 * @returns {string}
 */
const parseMarkdownToHTML = (md, primaryColor) => {
    const lines = md.split('\n');
    let html = '';
    let inList = false;
    let inNestedList = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line === '') continue;

        const h4Match = line.match(/^####\s+(.*)/);
        if (h4Match) {
            if (inNestedList) {
                html += '</ul>';
                inNestedList = false;
            }
            if (inList) {
                html += '</ul>';
                inList = false;
            }

            html += `<div style="color: ${primaryColor}; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin: 20px 0 8px 0; display: flex; align-items: center; gap: 8px;">${formatInline(h4Match[1], primaryColor)}</div>`;
            continue;
        }

        const nestedListMatch = line.match(/^(\s{2,}|\t)\*\s+(.*)/) || lines[i].match(/^(\s{2,}|\t)\*\s+(.*)/);
        if (nestedListMatch) {
            if (!inNestedList) {
                html += `<ul style="margin: 4px 0 0 0; padding-left: 20px; list-style-type: circle; opacity: 0.9;">`;
                inNestedList = true;
            }
            html += `<li style="margin-bottom: 4px; font-size: 13px;">${formatInline(nestedListMatch[2], primaryColor)}</li>`;
            continue;
        }

        const listMatch = line.match(/^\*\s+(.*)/);
        if (listMatch) {
            if (inNestedList) {
                html += '</ul>';
                inNestedList = false;
            }
            if (!inList) {
                html += `<ul style="margin: 0; padding-left: 20px;">`;
                inList = true;
            }
            html += `<li style="margin-bottom: 8px; font-size: 14px; line-height: 1.5;">${formatInline(listMatch[1], primaryColor)}</li>`;
            continue;
        }

        html += `<p style="margin: 0 0 12px 0; line-height: 1.6; font-size: 14px; opacity: 0.9;">${formatInline(line, primaryColor)}</p>`;
    }

    if (inNestedList) html += '</ul>';
    if (inList) html += '</ul>';
    return html;
};

/**
 * @param {string} message
 * @returns {void}
 */
export const showToast = (message) => {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'var(--md-sys-color-inverse-surface, #313033)';
    toast.style.color = 'var(--md-sys-color-inverse-on-surface, #f4eff4)';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '8px';
    toast.style.fontSize = '14px';
    toast.style.fontWeight = '500';
    toast.style.zIndex = '9999';
    toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translate(-50%, -10px)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translate(-50%, 0)';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
};

/**
 * @param {Object} version
 * @param {string} appName
 * @param {string} shareUrl
 * @param {string} primaryColor
 * @returns {Object}
 */
export const generateEmailEmbed = (version, appName, shareUrl, primaryColor) => {
    const parsedContentHtml = parseMarkdownToHTML(version.content, primaryColor);

    const htmlText = `
        <div style="font-family: inherit; max-width: 600px; border: 1px solid rgba(121, 116, 126, 0.3); border-radius: 16px; padding: 20px; background-color: rgba(121, 116, 126, 0.05); margin: 16px 0;">
            <div style="border-bottom: 1px solid rgba(121, 116, 126, 0.2); padding-bottom: 16px; margin-bottom: 16px;">
                <div style="font-size: 12px; font-weight: 800; color: ${primaryColor}; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">Update Summary</div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="font-size: 18px; font-weight: 800; margin: 0;">Version ${version.version.replace('Version ', '')}</div>
                    <div style="font-size: 12px; opacity: 0.8; font-weight: 600; background-color: rgba(121, 116, 126, 0.1); padding: 4px 10px; border-radius: 8px; margin: 0;">${version.date}</div>
                </div>
            </div>
            
            <div style="font-size: 14px; line-height: 1.6;">
                ${parsedContentHtml}
            </div>

            <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid rgba(121, 116, 126, 0.2); text-align: center;">
                <a href="${shareUrl}" style="display: inline-block; background-color: ${primaryColor}; color: #ffffff; padding: 12px 24px; border-radius: 100px; text-decoration: none; font-weight: 700; font-size: 13px;">
                    View Full Changelog Online
                </a>
            </div>
        </div>
        <br>
    `;

    const plainText = `${appName} Update: ${version.version}\nReleased: ${version.date}\n\nWhat's New:\n\n${version.content}\n\nView full details: ${shareUrl}`;

    return {htmlText, plainText};
};

/**
 * @param {string} htmlText
 * @param {string} plainText
 * @param {string} successMessage
 * @returns {Promise<void>}
 */
export const executeCopy = async (htmlText, plainText, successMessage) => {
    try {
        if (navigator.clipboard && window.ClipboardItem) {
            try {
                const clipboardItem = new ClipboardItem({
                    'text/plain': new Blob([plainText], {type: 'text/plain'}),
                    'text/html': new Blob([htmlText], {type: 'text/html'})
                });
                await navigator.clipboard.write([clipboardItem]);
                showToast(successMessage);
                return;
            } catch (err) {
            }
        }
        copyRichTextFallback(htmlText, plainText);
        showToast(successMessage);
    } catch (err) {
        showToast("Failed to copy. Please try again.");
    }
};