const fs = require('fs');
const path = require('path');

const langs = ['ar', 'de', 'es', 'fr', 'it', 'ja', 'pt', 'ru', 'zh'];

const strings = {
    "All utilities run 100% in your browser • Zero data retention • Unlimited usage": {
        "en": "All utilities run 100% in your browser • Zero data retention • Unlimited usage",
        "ar": "تعمل جميع الأدوات 100% في متصفحك • لا يتم الاحتفاظ بالبيانات • استخدام غير محدود",
        "de": "Alle Dienstprogramme laufen zu 100 % in Ihrem Browser • Keine Datenspeicherung • Unbegrenzte Nutzung",
        "es": "Todas las utilidades se ejecutan 100% en su navegador • Cero retención de datos • Uso ilimitado",
        "fr": "Tous les utilitaires s'exécutent à 100 % dans votre navigateur • Aucune conservation de données • Utilisation illimitée",
        "it": "Tutte le utility vengono eseguite al 100% nel tuo browser • Nessuna conservazione dei dati • Uso illimitato",
        "ja": "すべてのユーティリティはブラウザ内で100%動作します • データ保持ゼロ • 無制限の利用",
        "pt": "Todos os utilitários funcionam 100% no seu navegador • Retenção zero de dados • Uso ilimitado",
        "ru": "Все утилиты работают на 100% в вашем браузере • Нулевое хранение данных • Неограниченное использование",
        "zh": "所有实用程序均在您的浏览器中 100% 运行 • 零数据保留 • 无限制使用"
    },
    "Laboratory Benchmarks": {
        "en": "Laboratory Benchmarks",
        "ar": "معايير المختبر",
        "de": "Labor-Benchmarks",
        "es": "Puntos de referencia de laboratorio",
        "fr": "Bancs d'essai en laboratoire",
        "it": "Benchmark di laboratorio",
        "ja": "ラボベンチマーク",
        "pt": "Benchmarks de Laboratório",
        "ru": "Лабораторные тесты",
        "zh": "实验室基准"
    },
    "Laboratory testing across 120,000+ files measuring latency, visual SSIM retention, and reduction efficiency.": {
        "en": "Laboratory testing across 120,000+ files measuring latency, visual SSIM retention, and reduction efficiency.",
        "ar": "اختبارات معملية عبر أكثر من 120,000 ملف لقياس وقت الوصول، والاحتفاظ البصري بـ SSIM، وكفاءة التقليل.",
        "de": "Labortests mit über 120.000 Dateien zur Messung der Latenz, der visuellen SSIM-Erhaltung und der Reduzierungseffizienz.",
        "es": "Pruebas de laboratorio en más de 120,000 archivos midiendo la latencia, retención visual SSIM y eficiencia de reducción.",
        "fr": "Tests en laboratoire sur plus de 120 000 fichiers mesurant la latence, la rétention SSIM visuelle et l'efficacité de la réduction.",
        "it": "Test di laboratorio su oltre 120.000 file che misurano la latenza, la conservazione visiva SSIM e l'efficienza di riduzione.",
        "ja": "レイテンシ、視覚的SSIM保持、および削減効率を測定する12万以上のファイルにわたるラボテスト。",
        "pt": "Testes de laboratório em mais de 120.000 arquivos medindo latência, retenção visual SSIM e eficiência de redução.",
        "ru": "Лабораторное тестирование более 120 000 файлов для измерения задержки, визуального сохранения SSIM и эффективности сжатия.",
        "zh": "对 120,000 多个文件进行了实验室测试，测量延迟、视觉 SSIM 保留和缩减效率。"
    },
    "Photos / Web": {
        "en": "Photos / Web",
        "ar": "صور / ويب",
        "de": "Fotos / Web",
        "es": "Fotos / Web",
        "fr": "Photos / Web",
        "it": "Foto / Web",
        "ja": "写真 / Web",
        "pt": "Fotos / Web",
        "ru": "Фото / Веб",
        "zh": "照片/网页"
    },
    "Logos / Graphics": {
        "en": "Logos / Graphics",
        "ar": "شعارات / رسومات",
        "de": "Logos / Grafiken",
        "es": "Logotipos / Gráficos",
        "fr": "Logos / Graphiques",
        "it": "Loghi / Grafica",
        "ja": "ロゴ / グラフィック",
        "pt": "Logotipos / Gráficos",
        "ru": "Логотипы / Графика",
        "zh": "徽标/图形"
    },
    "Modern Format": {
        "en": "Modern Format",
        "ar": "تنسيق حديث",
        "de": "Modernes Format",
        "es": "Formato Moderno",
        "fr": "Format moderne",
        "it": "Formato moderno",
        "ja": "モダンフォーマット",
        "pt": "Formato Moderno",
        "ru": "Современный формат",
        "zh": "现代格式"
    },
    "SSIM (Structural Similarity Index) &gt; 0.98 indicates perceptual difference is mathematically imperceptible to human eye at 100% display scale.": {
        "en": "SSIM (Structural Similarity Index) &gt; 0.98 indicates perceptual difference is mathematically imperceptible to human eye at 100% display scale.",
        "ar": "يشير مؤشر SSIM &gt; 0.98 إلى أن الاختلاف الإدراكي غير محسوس رياضيًا للعين البشرية بمقياس عرض 100%.",
        "de": "SSIM &gt; 0,98 bedeutet, dass der Wahrnehmungsunterschied für das menschliche Auge bei 100 % Anzeigeskalierung mathematisch nicht wahrnehmbar ist.",
        "es": "SSIM &gt; 0.98 indica que la diferencia perceptiva es matemáticamente imperceptible para el ojo humano a una escala de visualización del 100%.",
        "fr": "SSIM &gt; 0,98 indique que la différence de perception est mathématiquement imperceptible pour l'œil humain à une échelle d'affichage de 100 %.",
        "it": "SSIM &gt; 0.98 indica che la differenza percettiva è matematicamente impercettibile all'occhio umano al 100% della scala di visualizzazione.",
        "ja": "SSIM &gt; 0.98は、100%の表示スケールにおいて、知覚的な違いが人間の目には数学的に知覚できないことを示します。",
        "pt": "SSIM &gt; 0,98 indica que a diferença perceptiva é matematicamente imperceptível ao olho humano em uma escala de exibição de 100%.",
        "ru": "SSIM &gt; 0,98 означает, что перцептивная разница математически незаметна для человеческого глаза при 100% масштабе отображения.",
        "zh": "SSIM &gt; 0.98 表示在 100% 显示比例下，人类肉眼在数学上感觉不到任何差异。"
    },
    "Empirically verified client-side quantization with zero cloud leakage.": {
        "en": "Empirically verified client-side quantization with zero cloud leakage.",
        "ar": "تكميم من جانب العميل تم التحقق منه تجريبيًا بدون أي تسريب سحابي.",
        "de": "Empirisch verifizierte clientseitige Quantisierung ohne Cloud-Lecks.",
        "es": "Cuantización del lado del cliente verificada empíricamente sin fugas en la nube.",
        "fr": "Quantification côté client vérifiée empiriquement sans fuite vers le cloud.",
        "it": "Quantizzazione lato client verificata empiricamente senza perdite nel cloud.",
        "ja": "クラウドルーケージのない、経験的に検証されたクライアント側の量子化。",
        "pt": "Quantização no lado do cliente verificada empiricamente sem vazamento na nuvem.",
        "ru": "Эмпирически проверенное квантование на стороне клиента с нулевой утечкой в облако.",
        "zh": "经过经验验证的客户端量化，零云端泄漏。"
    },
    "Zero Server Logs": {
        "en": "Zero Server Logs",
        "ar": "صفر سجلات خادم",
        "de": "Keine Serverprotokolle",
        "es": "Cero registros de servidor",
        "fr": "Zéro journal serveur",
        "it": "Zero log del server",
        "ja": "サーバーログゼロ",
        "pt": "Zero Logs de Servidor",
        "ru": "Нулевые журналы сервера",
        "zh": "零服务器日志"
    },
    "GDPR Compliant": {
        "en": "GDPR Compliant",
        "ar": "متوافق مع GDPR",
        "de": "DSGVO-konform",
        "es": "Cumple con el GDPR",
        "fr": "Conforme au RGPD",
        "it": "Conforme GDPR",
        "ja": "GDPR準拠",
        "pt": "Em conformidade com GDPR",
        "ru": "Соответствует GDPR",
        "zh": "符合 GDPR"
    },
    "W3C AAA": {
        "en": "W3C AAA",
        "ar": "W3C AAA",
        "de": "W3C AAA",
        "es": "W3C AAA",
        "fr": "W3C AAA",
        "it": "W3C AAA",
        "ja": "W3C AAA",
        "pt": "W3C AAA",
        "ru": "W3C AAA",
        "zh": "W3C AAA"
    },
    "Zero server storage in all supported regions": {
        "en": "Zero server storage in all supported regions",
        "ar": "تخزين خادم صفر في جميع المناطق المدعومة",
        "de": "Keine Serverspeicherung in allen unterstützten Regionen",
        "es": "Cero almacenamiento en servidor en todas las regiones compatibles",
        "fr": "Zéro stockage serveur dans toutes les régions prises en charge",
        "it": "Zero archiviazione sul server in tutte le regioni supportate",
        "ja": "サポートされているすべてのリージョンでサーバーのストレージがゼロ",
        "pt": "Armazenamento em servidor zero em todas as regiões suportadas",
        "ru": "Нулевое хранение на сервере во всех поддерживаемых регионах",
        "zh": "所有受支持区域均为零服务器存储"
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
            if (!langs.includes(lang) && lang !== 'en') return; // only valid langs

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
console.log('Translated hardcoded strings in ' + count + ' files.');

// Also update template.php for future builds
let templateContent = fs.readFileSync('views/template.php', 'utf8');
let templateReplaced = false;
for (const [english, transMap] of Object.entries(strings)) {
    // Instead of raw string, replace with a placeholder for the build script, or just leave it for now.
    // The build script probably doesn't know about these keys.
}
