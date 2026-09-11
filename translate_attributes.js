const fs = require('fs');
const path = require('path');

const langs = ['ar', 'de', 'es', 'fr', 'it', 'ja', 'pt', 'ru', 'zh'];

const strings = {
    'title="Clear all images from queue"': {
        "en": 'title="Clear all images from queue"',
        "ar": 'title="مسح جميع الصور من قائمة الانتظار"',
        "de": 'title="Alle Bilder aus der Warteschlange löschen"',
        "es": 'title="Borrar todas las imágenes de la cola"',
        "fr": 'title="Effacer toutes les images de la file d\'attente"',
        "it": 'title="Cancella tutte le immagini dalla coda"',
        "ja": 'title="キューからすべての画像をクリア"',
        "pt": 'title="Limpar todas as imagens da fila"',
        "ru": 'title="Очистить все изображения из очереди"',
        "zh": 'title="从队列中清除所有图像"'
    },
    'title="Re-compress all with current settings"': {
        "en": 'title="Re-compress all with current settings"',
        "ar": 'title="إعادة ضغط الكل بالإعدادات الحالية"',
        "de": 'title="Alle mit aktuellen Einstellungen neu komprimieren"',
        "es": 'title="Recomprimir todo con la configuración actual"',
        "fr": 'title="Re-compresser tout avec les paramètres actuels"',
        "it": 'title="Ricomprimi tutto con le impostazioni correnti"',
        "ja": 'title="現在の設定ですべて再圧縮"',
        "pt": 'title="Recomprimir tudo com as configurações atuais"',
        "ru": 'title="Повторно сжать все с текущими настройками"',
        "zh": 'title="使用当前设置重新压缩所有内容"'
    },
    'title="Close (Esc)"': {
        "en": 'title="Close (Esc)"',
        "ar": 'title="إغلاق (Esc)"',
        "de": 'title="Schließen (Esc)"',
        "es": 'title="Cerrar (Esc)"',
        "fr": 'title="Fermer (Échap)"',
        "it": 'title="Chiudi (Esc)"',
        "ja": 'title="閉じる (Esc)"',
        "pt": 'title="Fechar (Esc)"',
        "ru": 'title="Закрыть (Esc)"',
        "zh": 'title="关闭 (Esc)"'
    },
    'aria-label="Close modal"': {
        "en": 'aria-label="Close modal"',
        "ar": 'aria-label="إغلاق النافذة المنبثقة"',
        "de": 'aria-label="Modal schließen"',
        "es": 'aria-label="Cerrar modal"',
        "fr": 'aria-label="Fermer la modale"',
        "it": 'aria-label="Chiudi modale"',
        "ja": 'aria-label="モーダルを閉じる"',
        "pt": 'aria-label="Fechar modal"',
        "ru": 'aria-label="Закрыть модальное окно"',
        "zh": 'aria-label="关闭模态框"'
    }
};

let count = 0;
function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fullPath.includes('.git') || fullPath.includes('node_modules')) return;
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let replaced = false;

            const lang = (dir === '.' || dir === 'views' || dir === 'scripts') ? 'en' : dir;
            if (!langs.includes(lang) && lang !== 'en') return;

            for (const [english, transMap] of Object.entries(strings)) {
                if (content.includes(english) && lang !== 'en') {
                    const translated = transMap[lang];
                    if (translated) {
                        content = content.replace(new RegExp(english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), translated);
                        replaced = true;
                    }
                }
            }

            if (replaced) {
                fs.writeFileSync(fullPath, content);
                count++;
            }
        }
    });
}

walk('.');
console.log('Translated hardcoded attributes in ' + count + ' files.');
