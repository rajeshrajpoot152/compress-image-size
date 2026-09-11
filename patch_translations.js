const fs = require('fs');
let content = fs.readFileSync('js/translations.js', 'utf8');

const previews = {
  "en": "Click to preview & compare",
  "ar": "انقر للمعاينة والمقارنة",
  "de": "Klicken Sie zur Vorschau und zum Vergleich",
  "es": "Haga clic para vista previa y comparar",
  "fr": "Cliquez pour prévisualiser et comparer",
  "it": "Clicca per l'anteprima e il confronto",
  "ja": "クリックしてプレビューとプレビューを比較",
  "pt": "Clique para visualizar e comparar",
  "ru": "Нажмите для предварительного просмотра и сравнения",
  "zh": "点击预览并比较"
};

for (const [lang, val] of Object.entries(previews)) {
    const search = `"${lang}": {`;
    if (content.includes(search)) {
        content = content.replace(search, `"${lang}": {\n    "title_preview": "${val}",`);
    }
}

fs.writeFileSync('js/translations.js', content);
console.log('Patched translations.js with title_preview');
