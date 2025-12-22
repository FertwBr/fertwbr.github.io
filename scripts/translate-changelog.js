/**
 * =================================================================================
 * AUTOMATED CHANGELOG TRANSLATOR (Incremental, Persistent & AI-Powered)
 * =================================================================================
 *
 * HOW TO USE:
 * 1. Ensure GEMINI_API_KEY is in .env
 * 2. Run: node scripts/translate-changelog.js
 *
 * FEATURES:
 * - Uses 'gemini-3-flash-preview' model.
 * - Save-As-You-Go: Writes to disk immediately after each version is translated.
 * - Rate Limit Protection: Waits 20s between requests to avoid 429 errors.
 * - Incremental: Only translates versions missing in the target file.
 * =================================================================================
 */

import fs from 'fs';
import path from 'path';
import {GoogleGenerativeAI} from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const APPS = ['PixelPulse', 'PixelCompass', 'site'];

const LANGUAGES = {
    'pt': 'Portuguese (Brazil)',
    'es': 'Spanish',
    'de': 'German',
    'ja': 'Japanese',
    'hi': 'Hindi'
};

const MODEL_NAME = "gemini-3-flash-preview";
const REQUEST_DELAY = 20000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({model: MODEL_NAME});

/**
 * Splits a Markdown Changelog into an array of version blocks.
 * @param {string} markdown - Full Markdown content.
 * @returns {string[]} Array of version blocks.
 */
function parseVersions(markdown) {
    if (!markdown) return [];
    const parts = markdown.split(/(?=^## Version)/m);
    return parts.filter(part => part.trim().startsWith('## Version'));
}

/**
 * Extracts the version number string from a version block.
 * @param {string} versionBlock - The text block of a version.
 * @returns {string|null} The version number (e.g., "1.0.0").
 */
function extractVersionNumber(versionBlock) {
    const match = versionBlock.match(/^## Version\s+(.+?)(\r?\n|$)/);
    return match ? match[1].trim() : null;
}

/**
 * Translates a text block using the Professional Translator persona.
 * @param {string} text - The Markdown text to translate.
 * @param {string} targetLang - The target language name.
 * @returns {Promise<string>} The translated text.
 */
async function translateText(text, targetLang) {
    const prompt = `
    You are a professional translator and reviewer, with advanced command of grammatical norms, technical style, and institutional language.

    ### OBJECTIVE
    Translate the provided text to **${targetLang}**, **without losing the original meaning**, adapting it to the **professional and natural form of the target language**, maintaining grammatical rigor and absolute clarity.

    ---

    ### MANDATORY RULES

    1. **Total preservation of Markdown structure (.md)**
       - Keep **exactly the same structure**.
       - DO NOT change: Headers (#, ##), Lists (-, *), Bold, Italics, Links.
       - The final text must be raw Markdown.

    2. **Keyword Preservation**
       - DO NOT translate technical terms or proper names including but not limited to: 
         **Pixel Pulse**, **Pixel Compass**, **Google Play**, **Android**, **Premium**, **WorkManager**, **Foreground Service**, **FFT**, **Compose**, **Material 3**, **View Model**, **Use Case**.
       - Preserve the name **fertwbr** exactly as is.

    3. **Grammar and Style**
       - Use standard professional spelling for ${targetLang}.
       - Avoid unnecessary gerunds (if translating to Portuguese).
       - Avoid ambiguity. Use precise terminology.

    4. **Gender Consistency**
       - Consider **fertwbr** as masculine or neutral.

    5. **Fidelity**
       - Do not omit information.
       - Do not add new information.
       - Do not simplify technically complex descriptions.

    ---
    
    ### CONTENT TO TRANSLATE:
    ${text}
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        throw error;
    }
}

/**
 * Inserts a new block into the content after the main header but before other versions.
 */
function prependVersion(currentContent, newBlock) {
    const headerRegex = /^([\s\S]*?)(?=## Version|$)/;
    const match = currentContent.match(headerRegex);

    if (match) {
        const header = match[1];
        const rest = currentContent.substring(header.length);
        return `${header}${newBlock}\n\n${rest}`;
    } else {
        return `\n\n# Version History\n\n${newBlock}\n\n${currentContent}`;
    }
}

async function processFile(sourcePath, targetPath, langName) {
    if (!fs.existsSync(sourcePath)) {
        console.warn(`⚠️ Source not found: ${sourcePath}`);
        return;
    }

    console.log(`\n📂 Processing: ${sourcePath} -> ${langName}`);

    const sourceContent = fs.readFileSync(sourcePath, 'utf-8');

    if (!fs.existsSync(targetPath)) {
        console.log(`   Target file not found. Creating new structure.`);
        const dir = path.dirname(targetPath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive: true});

        const initialContent = `\n\n# Version History\n\n`;
        fs.writeFileSync(targetPath, initialContent);
    }

    let targetContent = fs.readFileSync(targetPath, 'utf-8');

    const sourceVersions = parseVersions(sourceContent);
    const targetVersions = parseVersions(targetContent);
    const targetVersionSet = new Set(targetVersions.map(v => extractVersionNumber(v)));

    const versionsToTranslate = sourceVersions.filter(v => {
        const vNum = extractVersionNumber(v);
        return vNum && !targetVersionSet.has(vNum);
    });

    if (versionsToTranslate.length === 0) {
        console.log(`   ✅ Up to date.`);
        return;
    }

    console.log(`   🚀 Found ${versionsToTranslate.length} new version(s) to translate.`);

    for (const versionBlock of versionsToTranslate) {
        const vNum = extractVersionNumber(versionBlock);
        console.log(`      ... Translating version ${vNum}...`);

        try {
            const translatedBlock = await translateText(versionBlock, langName);

            targetContent = fs.readFileSync(targetPath, 'utf-8');

            const updatedContent = prependVersion(targetContent, translatedBlock);

            fs.writeFileSync(targetPath, updatedContent);
            console.log(`      💾 Saved version ${vNum}`);

            await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY));

        } catch (err) {
            console.error(`      ❌ Failed to translate version ${vNum}. Stopping this file.`);
            console.error(`      Error: ${err.message}`);
            break;
        }
    }
}

async function run() {
    if (!process.env.GEMINI_API_KEY) {
        console.error("❌ Error: GEMINI_API_KEY not found in .env file.");
        return;
    }

    console.log(`🔍 Using Model: ${MODEL_NAME}`);

    for (const app of APPS) {
        const sourceFile = `./public/${app}/md/en/changelog.md`;

        for (const [code, name] of Object.entries(LANGUAGES)) {
            const targetFile = `./public/${app}/md/${code}/changelog.md`;
            await processFile(sourceFile, targetFile, name);
        }
    }
}

run().catch(err => {
    console.error("❌ Fatal Script Error:", err);
    process.exit(1);
});