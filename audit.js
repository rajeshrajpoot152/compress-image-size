const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rootDir = '.';
const langs = ['ar', 'de', 'es', 'fr', 'it', 'ja', 'pt', 'ru', 'zh'];
const allDirs = ['.', ...langs];

const report = {
    pagesChecked: [],
    languagesChecked: allDirs,
    implementedPoints: {
        'Main Button Color (#ff6c0d)': { status: '✅ Correct', issues: [] },
        'Dropzone Shrink Wrap (inline-block)': { status: '✅ Correct', issues: [] },
        'Fractional Classes Fixed (no .5)': { status: '✅ Correct', issues: [] },
        'Progress Toast Bottom Center & z-index': { status: '✅ Correct', issues: [] },
        'Overlap Fix (no margin-top: -50px)': { status: '✅ Correct', issues: [] },
        'Progress Toast Moved to Body End': { status: '✅ Correct', issues: [] },
        'SVG Icon Shifted': { status: '✅ Correct', issues: [] },
    },
    translationIssues: [],
    missingPoints: [],
    codeIssues: [],
    functionalIssues: [],
    seoIssues: []
};

// Check SVG once
const svgPath = path.join(rootDir, 'images', 'step-3.svg');
if (fs.existsSync(svgPath)) {
    const svgContent = fs.readFileSync(svgPath, 'utf8');
    if (!svgContent.includes('translate(65)')) {
        report.implementedPoints['SVG Icon Shifted'].status = '❌ Missing/Broken';
        report.implementedPoints['SVG Icon Shifted'].issues.push('Missing translate(65) in step-3.svg');
    }
} else {
    report.implementedPoints['SVG Icon Shifted'].status = '❌ Missing/Broken';
    report.implementedPoints['SVG Icon Shifted'].issues.push('images/step-3.svg not found');
}

// Helper to check fractional classes
const fractionalClasses = ['gap-1.5', 'gap-2.5', 'gap-3.5', 'space-y-3.5', 'p-2.5', 'pt-3.5'];

allDirs.forEach(dir => {
    const dirPath = path.join(rootDir, dir);
    if (!fs.existsSync(dirPath)) return;

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));
    
    files.forEach(file => {
        const fp = path.join(dirPath, file);
        report.pagesChecked.push(fp);
        const content = fs.readFileSync(fp, 'utf8');
        
        // Check Point: Main Button Color (#ff6c0d)
        if (!content.includes('background-color: #ff6c0d')) {
            report.implementedPoints['Main Button Color (#ff6c0d)'].status = '❌ Missing/Broken';
            report.implementedPoints['Main Button Color (#ff6c0d)'].issues.push(fp);
        }

        // Check Point: Dropzone Shrink Wrap (inline-block)
        if (!content.includes('id="dropzone"') || !content.includes('inline-block')) { // Simplified check
             const dropzoneMatch = content.match(/<div id="dropzone" class="[^"]*inline-block[^"]*"/);
             if (!dropzoneMatch) {
                 report.implementedPoints['Dropzone Shrink Wrap (inline-block)'].status = '❌ Missing/Broken';
                 report.implementedPoints['Dropzone Shrink Wrap (inline-block)'].issues.push(fp);
             }
        }

        // Check Point: Fractional Classes
        fractionalClasses.forEach(cls => {
            if (content.includes(cls)) {
                report.implementedPoints['Fractional Classes Fixed (no .5)'].status = '⚠️ Issue Found';
                report.implementedPoints['Fractional Classes Fixed (no .5)'].issues.push(`File ${fp} contains ${cls}`);
            }
        });

        // Check Point: Progress Toast Bottom Center & z-index
        const toastMatch = content.includes('style="z-index: 99999 !important; left: 50%; transform: translateX(-50%); width: 92%; max-width: 450px;"');
        if (!toastMatch) {
            report.implementedPoints['Progress Toast Bottom Center & z-index'].status = '❌ Missing/Broken';
            report.implementedPoints['Progress Toast Bottom Center & z-index'].issues.push(fp);
        }

        // Check Point: Overlap Fix
        if (content.includes('margin-top: -50px')) {
            report.implementedPoints['Overlap Fix (no margin-top: -50px)'].status = '❌ Missing/Broken';
            report.implementedPoints['Overlap Fix (no margin-top: -50px)'].issues.push(fp);
        }

        // Check Point: Progress Toast Moved to Body End
        // It should be after section#uploader
        const uploaderIdx = content.indexOf('</section>');
        const toastIdx = content.indexOf('id="progressContainer"');
        if (toastIdx !== -1 && uploaderIdx !== -1 && toastIdx < uploaderIdx) {
            report.implementedPoints['Progress Toast Moved to Body End'].status = '❌ Missing/Broken';
            report.implementedPoints['Progress Toast Moved to Body End'].issues.push(fp);
        }

        // Check Translations (Look for <? or undefined)
        if (content.includes('<?=') || content.includes('<?php')) {
            report.translationIssues.push(`File ${fp} contains raw PHP tags.`);
        }
        if (content.includes('>undefined<') || content.includes('"undefined"')) {
            report.translationIssues.push(`File ${fp} contains 'undefined' string.`);
        }

        // Basic SEO Checks
        if (!content.includes('<title>')) {
            report.seoIssues.push(`File ${fp} missing <title> tag.`);
        }
        if (!content.includes('<meta name="description"')) {
            report.seoIssues.push(`File ${fp} missing meta description.`);
        }
        if (!content.includes('<link rel="canonical"')) {
            report.seoIssues.push(`File ${fp} missing canonical link.`);
        }
        
        // In language directories, check for lang attribute
        const langCode = dir === '.' ? 'en' : dir;
        const langAttrMatch = content.match(/<html[^>]*lang="([^"]+)"/i);
        if (!langAttrMatch) {
            report.seoIssues.push(`File ${fp} missing lang attribute on html tag.`);
        } else if (langAttrMatch[1].toLowerCase() !== langCode.toLowerCase()) {
            report.seoIssues.push(`File ${fp} has wrong lang attribute: expected ${langCode}, found ${langAttrMatch[1]}`);
        }

    });
});

fs.writeFileSync('audit_report.json', JSON.stringify(report, null, 2));
console.log('Audit complete, wrote to audit_report.json');
