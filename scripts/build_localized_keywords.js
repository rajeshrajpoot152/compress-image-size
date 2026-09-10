const fs = require('fs');
const path = require('path');

// Helper to convert JS object to PHP array code
function toPhp(val, indent = 0) {
  const pad = '  '.repeat(indent);
  if (val === null || val === undefined) return 'null';
  if (typeof val === 'boolean') return val ? 'true' : 'false';
  if (typeof val === 'number') return String(val);
  if (typeof val === 'string') {
    const escaped = val.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    return `'${escaped}'`;
  }
  if (Array.isArray(val)) {
    if (val.length === 0) return '[]';
    const items = val.map(item => `${pad}  ${toPhp(item, indent + 1)},`).join('\n');
    return `[\n${items}\n${pad}]`;
  }
  if (typeof val === 'object') {
    const keys = Object.keys(val);
    if (keys.length === 0) return '[]';
    const entries = keys.map(k => `${pad}  '${k}' => ${toPhp(val[k], indent + 1)},`).join('\n');
    return `[\n${entries}\n${pad}]`;
  }
  return `'${String(val)}'`;
}

// 40 Keywords Localization Templates for 10 Languages
const translations = {
  // 1. Primary
  'compress-image-size': {
    en: { h1: 'Compress Image Size Online', title: '100% Free Compress Image Size Online | Instant, Lossless & Secure' },
    es: { h1: 'Comprimir Tamaño de Imagen Online', title: 'Comprimir Imagen Online Gratis | Rápido, Sin Pérdida y Seguro' },
    fr: { h1: 'Compresser la Taille d\'une Image en Ligne', title: 'Compresser une Image en Ligne Gratuit | Instantané, Sans Perte et Sécurisé' },
    de: { h1: 'Bildgröße Online Komprimieren', title: 'Bildgröße Online Kostenlos Komprimieren | Schnell, Ohne Verlust & Sicher' },
    pt: { h1: 'Comprimir Tamanho da Imagem Online', title: 'Comprimir Imagem Online Grátis | Rápido, Sem Perdas e Seguro' },
    it: { h1: 'Comprimi Dimensione Immagine Online', title: 'Comprimi Immagine Online Gratis | Veloce, Senza Perdita e Sicuro' },
    ru: { h1: 'Сжать Размер Изображения Онлайн', title: 'Сжать Изображение Онлайн Бесплатно | Быстро, Без Потерь и Безопасно' },
    zh: { h1: '在线压缩图片大小', title: '在线压缩图片大小 - 100%免费、极速、无损且安全' },
    ja: { h1: 'オンラインで画像サイズを圧縮', title: 'オンラインで画像サイズを圧縮 - 100%無料・高画質・安全' },
    ar: { h1: 'ضغط حجم الصور أونلاين', title: 'ضغط حجم الصور أونلاين مجاناً | فوري وبدون فقدان الجودة' },
  },

  // 2. Size Specific
  'compress-image-to-50kb': {
    en: { h1: 'Compress Image to 50KB Online', title: '100% Free Compress Image to 50KB Online | Ultra-Fast & Lossless' },
    es: { h1: 'Comprimir Imagen a 50KB Online', title: 'Comprimir Imagen a 50KB Online Gratis | Rápido y Sin Pérdida' },
    fr: { h1: 'Compresser une Image à 50Ko en Ligne', title: 'Compresser une Image à 50Ko en Ligne Gratuit | Rapide et Sans Perte' },
    de: { h1: 'Bild auf 50KB Komprimieren Online', title: 'Bild auf 50KB Komprimieren Online Kostenlos | Schnell & Ohne Qualitätsverlust' },
    pt: { h1: 'Comprimir Imagem para 50KB Online', title: 'Comprimir Imagem para 50KB Online Grátis | Rápido e Sem Perdas' },
    it: { h1: 'Comprimi Immagine a 50KB Online', title: 'Comprimi Immagine a 50KB Online Gratis | Veloce e Senza Perdita' },
    ru: { h1: 'Сжать Изображение до 50 КБ Онлайн', title: 'Сжать Изображение до 50 КБ Онлайн Бесплатно | Быстро и Без Потери Качества' },
    zh: { h1: '在线将图片压缩至50KB', title: '在线将图片压缩至50KB - 100%免费、无损且符合报名标准' },
    ja: { h1: 'オンラインで画像を50KBに圧縮', title: 'オンラインで画像を50KBに圧縮 - 申請用・高画質そのまま' },
    ar: { h1: 'ضغط الصورة إلى 50 كيلوبايت أونلاين', title: 'ضغط الصورة إلى 50 كيلوبايت أونلاين مجاناً | دقة عالية وبدون خوادم' },
  },
  'compress-image-to-20kb': {
    en: { h1: 'Compress Image to 20KB Online', title: 'Instantly Compress Image to 20KB Online | 100% Free & Pixel-Perfect' },
    es: { h1: 'Comprimir Imagen a 20KB Online', title: 'Comprimir Imagen a 20KB Online Gratis | Ideal para Firmas y Formularios' },
    fr: { h1: 'Compresser une Image à 20Ko en Ligne', title: 'Compresser une Image à 20Ko en Ligne Gratuit | Idéal pour Signatures' },
    de: { h1: 'Bild auf 20KB Komprimieren Online', title: 'Bild auf 20KB Komprimieren Online Kostenlos | Ideal für Unterschriften' },
    pt: { h1: 'Comprimir Imagem para 20KB Online', title: 'Comprimir Imagem para 20KB Online Grátis | Perfeito para Assinaturas' },
    it: { h1: 'Comprimi Immagine a 20KB Online', title: 'Comprimi Immagine a 20KB Online Gratis | Ideale per Firme e Moduli' },
    ru: { h1: 'Сжать Изображение до 20 КБ Онлайн', title: 'Сжать Изображение до 20 КБ Онлайн Бесплатно | Для Подписей и Документов' },
    zh: { h1: '在线将图片压缩至20KB', title: '在线将图片压缩至20KB - 适用于签名与官方证件上传' },
    ja: { h1: 'オンラインで画像を20KBに圧縮', title: 'オンラインで画像を20KBに圧縮 - 署名・証明写真に最適' },
    ar: { h1: 'ضغط الصورة إلى 20 كيلوبايت أونلاين', title: 'ضغط الصورة إلى 20 كيلوبايت أونلاين مجاناً | مثالي للتواقيع والاستمارات' },
  },
  'compress-image-to-100kb': {
    en: { h1: 'Compress Image to 100KB Online', title: '100% Free Compress Image to 100KB Online | Best Lossless HD Quality' },
    es: { h1: 'Comprimir Imagen a 100KB Online', title: 'Comprimir Imagen a 100KB Online Gratis | Calidad HD Sin Pérdida' },
    fr: { h1: 'Compresser une Image à 100Ko en Ligne', title: 'Compresser une Image à 100Ko en Ligne Gratuit | Qualité HD Sans Perte' },
    de: { h1: 'Bild auf 100KB Komprimieren Online', title: 'Bild auf 100KB Komprimieren Online Kostenlos | Beste HD-Qualität' },
    pt: { h1: 'Comprimir Imagem para 100KB Online', title: 'Comprimir Imagem para 100KB Online Grátis | Qualidade HD Sem Perdas' },
    it: { h1: 'Comprimi Immagine a 100KB Online', title: 'Comprimi Immagine a 100KB Online Gratis | Massima Qualità HD' },
    ru: { h1: 'Сжать Изображение до 100 КБ Онлайн', title: 'Сжать Изображение до 100 КБ Онлайн Бесплатно | Без Потери Четкости' },
    zh: { h1: '在线将图片压缩至100KB', title: '在线将图片压缩至100KB - 保持高清锐利画质' },
    ja: { h1: 'オンラインで画像を100KBに圧縮', title: 'オンラインで画像を100KBに圧縮 - 高精細HD画質を保持' },
    ar: { h1: 'ضغط الصورة إلى 100 كيلوبايت أونلاين', title: 'ضغط الصورة إلى 100 كيلوبايت أونلاين مجاناً | جودة HD فائقة' },
  },
  'compress-image-to-200kb': {
    en: { h1: 'Compress Image to 200KB Online', title: 'Effortless Compress Image to 200KB Online | 100% Free & Lossless' },
    es: { h1: 'Comprimir Imagen a 200KB Online', title: 'Comprimir Imagen a 200KB Online Gratis | Rápido y Con Alta Nitidez' },
    fr: { h1: 'Compresser une Image à 200Ko en Ligne', title: 'Compresser une Image à 200Ko en Ligne Gratuit | Précis et Sans Perte' },
    de: { h1: 'Bild auf 200KB Komprimieren Online', title: 'Bild auf 200KB Komprimieren Online Kostenlos | Verlustfreie Optimierung' },
    pt: { h1: 'Comprimir Imagem para 200KB Online', title: 'Comprimir Imagem para 200KB Online Grátis | Rápido e Seguro' },
    it: { h1: 'Comprimi Immagine a 200KB Online', title: 'Comprimi Immagine a 200KB Online Gratis | Veloce e Senza Distorsioni' },
    ru: { h1: 'Сжать Изображение до 200 КБ Онлайн', title: 'Сжать Изображение до 200 КБ Онлайн Бесплатно | Быстро и Без Водяных Знаков' },
    zh: { h1: '在线将图片压缩至200KB', title: '在线将图片压缩至200KB - 快速无损且私密安全' },
    ja: { h1: 'オンラインで画像を200KBに圧縮', title: 'オンラインで画像を200KBに圧縮 - 透かしなし・完全無料' },
    ar: { h1: 'ضغط الصورة إلى 200 كيلوبايت أونلاين', title: 'ضغط الصورة إلى 200 كيلوبايت أونلاين مجاناً | سريع وبدون علامات مائية' },
  },
  'resize-image-to-20kb': {
    en: { h1: 'Resize Image to 20KB Online', title: 'Fastest Resize Image to 20KB Online Free | 100% Private & Lossless' },
    es: { h1: 'Redimensionar Imagen a 20KB Online', title: 'Redimensionar Imagen a 20KB Online Gratis | Rápido y Privado' },
    fr: { h1: 'Redimensionner une Image à 20Ko en Ligne', title: 'Redimensionner une Image à 20Ko en Ligne Gratuit | Rapide et Privé' },
    de: { h1: 'Bildgröße auf 20KB Ändern Online', title: 'Bildgröße auf 20KB Ändern Online Kostenlos | Schnell & Sicher' },
    pt: { h1: 'Redimensionar Imagem para 20KB Online', title: 'Redimensionar Imagem para 20KB Online Grátis | Rápido e Privado' },
    it: { h1: 'Ridimensiona Immagine a 20KB Online', title: 'Ridimensiona Immagine a 20KB Online Gratis | Veloce e Sicuro' },
    ru: { h1: 'Изменить Размер Изображения до 20 КБ Онлайн', title: 'Изменить Размер Изображения до 20 КБ Онлайн Бесплатно' },
    zh: { h1: '在线调整图片大小至20KB', title: '在线调整图片大小至20KB - 极速精准压缩' },
    ja: { h1: 'オンラインで画像サイズを20KBに変更', title: 'オンラインで画像サイズを20KBに変更 - 1クリック軽量化' },
    ar: { h1: 'تغيير حجم الصورة إلى 20 كيلوبايت أونلاين', title: 'تغيير حجم الصورة إلى 20 كيلوبايت أونلاين مجاناً | بدقة متناهية' },
  },
  'resize-image-to-50kb': {
    en: { h1: 'Resize Image to 50KB Online', title: 'Smart Resize Image to 50KB Online Free | 100% Lossless & Secure' },
    es: { h1: 'Redimensionar Imagen a 50KB Online', title: 'Redimensionar Imagen a 50KB Online Gratis | Seguro y Sin Pérdida' },
    fr: { h1: 'Redimensionner une Image à 50Ko en Ligne', title: 'Redimensionner une Image à 50Ko en Ligne Gratuit | Sans Perte' },
    de: { h1: 'Bildgröße auf 50KB Ändern Online', title: 'Bildgröße auf 50KB Ändern Online Kostenlos | Verlustfrei' },
    pt: { h1: 'Redimensionar Imagem para 50KB Online', title: 'Redimensionar Imagem para 50KB Online Grátis | Seguro' },
    it: { h1: 'Ridimensiona Immagine a 50KB Online', title: 'Ridimensiona Immagine a 50KB Online Gratis | Senza Perdite' },
    ru: { h1: 'Изменить Размер Изображения до 50 КБ Онлайн', title: 'Изменить Размер Изображения до 50 КБ Онлайн Бесплатно' },
    zh: { h1: '在线调整图片大小至50KB', title: '在线调整图片大小至50KB - 智能保持完美比例' },
    ja: { h1: 'オンラインで画像サイズを50KBに変更', title: 'オンラインで画像サイズを50KBに変更 - スマート調整' },
    ar: { h1: 'تغيير حجم الصورة إلى 50 كيلوبايت أونلاين', title: 'تغيير حجم الصورة إلى 50 كيلوبايت أونلاين مجاناً | ذكي وآمن' },
  },
  'resize-image-to-100kb': {
    en: { h1: 'Resize Image to 100KB Online', title: '100% Free Resize Image to 100KB Online | Ultra-Fast & Pixel-Perfect' },
    es: { h1: 'Redimensionar Imagen a 100KB Online', title: 'Redimensionar Imagen a 100KB Online Gratis | Nitidez Total' },
    fr: { h1: 'Redimensionner une Image à 100Ko en Ligne', title: 'Redimensionner une Image à 100Ko en Ligne Gratuit | Netteté Parfaite' },
    de: { h1: 'Bildgröße auf 100KB Ändern Online', title: 'Bildgröße auf 100KB Ändern Online Kostenlos | Glasklar' },
    pt: { h1: 'Redimensionar Imagem para 100KB Online', title: 'Redimensionar Imagem para 100KB Online Grátis | Nitidez Total' },
    it: { h1: 'Ridimensiona Immagine a 100KB Online', title: 'Ridimensiona Immagine a 100KB Online Gratis | Perfetta Nitidezza' },
    ru: { h1: 'Изменить Размер Изображения до 100 КБ Онлайн', title: 'Изменить Размер Изображения до 100 КБ Онлайн Бесплатно' },
    zh: { h1: '在线调整图片大小至100KB', title: '在线调整图片大小至100KB - 像素级保真' },
    ja: { h1: 'オンラインで画像サイズを100KBに変更', title: 'オンラインで画像サイズを100KBに変更 - ピクセル完全一致' },
    ar: { h1: 'تغيير حجم الصورة إلى 100 كيلوبايت أونلاين', title: 'تغيير حجم الصورة إلى 100 كيلوبايت أونلاين مجاناً | وضوح كامل' },
  },
  'reduce-image-size-in-kb': {
    en: { h1: 'Reduce Image Size in KB Online', title: 'Instantly Reduce Image Size in KB Online | 100% Free, Fast & Lossless' },
    es: { h1: 'Reducir Tamaño de Imagen en KB Online', title: 'Reducir Tamaño de Imagen en KB Online Gratis | Rápido y Seguro' },
    fr: { h1: 'Réduire la Taille d\'une Image en Ko en Ligne', title: 'Réduire la Taille d\'une Image en Ko en Ligne Gratuit | Rapide et Sûr' },
    de: { h1: 'Bildgröße in KB Reduzieren Online', title: 'Bildgröße in KB Reduzieren Online Kostenlos | Schnell & Sicher' },
    pt: { h1: 'Reduzir Tamanho da Imagem em KB Online', title: 'Reduzir Tamanho da Imagem em KB Online Grátis | Rápido e Seguro' },
    it: { h1: 'Riduci Peso Immagine in KB Online', title: 'Riduci Peso Immagine in KB Online Gratis | Veloce e Sicuro' },
    ru: { h1: 'Уменьшить Размер Изображения в КБ Онлайн', title: 'Уменьшить Размер Изображения в КБ Онлайн Бесплатно' },
    zh: { h1: '在线缩小图片体积 (KB)', title: '在线缩小图片体积 (KB) - 100%免费且无损' },
    ja: { h1: 'オンラインで画像サイズをKB単位で縮小', title: 'オンラインで画像サイズをKB単位で縮小 - 高速・安全' },
    ar: { h1: 'تقليل حجم الصور بالكيلوبايت أونلاين', title: 'تقليل حجم الصور بالكيلوبايت أونلاين مجاناً | سريع وبدون فقد' },
  },
  'image-kb-size-reducer': {
    en: { h1: 'Image KB Size Reducer Online', title: 'Ultimate Image KB Size Reducer Online | 100% Free, Instant & Flawless' },
    es: { h1: 'Reductor de KB de Imágenes Online', title: 'Reductor de KB de Imágenes Online Gratis | Instantáneo y Eficaz' },
    fr: { h1: 'Réducteur de Poids d\'Image en Ko', title: 'Réducteur de Poids d\'Image en Ko Gratuit | Instantané' },
    de: { h1: 'Bild-KB-Größenreduzierer Online', title: 'Bild-KB-Größenreduzierer Online Kostenlos | Sofortige Ersparnis' },
    pt: { h1: 'Redutor de KB de Fotos Online', title: 'Redutor de KB de Fotos Online Grátis | Instantâneo' },
    it: { h1: 'Riduttore KB Immagini Online', title: 'Riduttore KB Immagini Online Gratis | Istantaneo' },
    ru: { h1: 'Снижение Веса Изображений в КБ Онлайн', title: 'Снижение Веса Изображений в КБ Онлайн Бесплатно' },
    zh: { h1: '在线图片KB大小压缩工具', title: '在线图片KB大小压缩工具 - 瞬间瘦身' },
    ja: { h1: '画像KBサイズ軽量化ツール', title: '画像KBサイズ軽量化ツール - 瞬時に圧縮' },
    ar: { h1: 'أداة تصغير حجم الصور بالكيلوبايت أونلاين', title: 'أداة تصغير حجم الصور بالكيلوبايت أونلاين مجاناً' },
  },
  'compress-image-to-30kb': {
    en: { h1: 'Compress Image to 30KB Online', title: '100% Free Compress Image to 30KB Online | Instant, Lossless & Private' },
    es: { h1: 'Comprimir Imagen a 30KB Online', title: 'Comprimir Imagen a 30KB Online Gratis | Rápido y Privado' },
    fr: { h1: 'Compresser une Image à 30Ko en Ligne', title: 'Compresser une Image à 30Ko en Ligne Gratuit | Instantané' },
    de: { h1: 'Bild auf 30KB Komprimieren Online', title: 'Bild auf 30KB Komprimieren Online Kostenlos | Schnell & Privat' },
    pt: { h1: 'Comprimir Imagem para 30KB Online', title: 'Comprimir Imagem para 30KB Online Grátis | Rápido e Seguro' },
    it: { h1: 'Comprimi Immagine a 30KB Online', title: 'Comprimi Immagine a 30KB Online Gratis | Rapido e Privato' },
    ru: { h1: 'Сжать Изображение до 30 КБ Онлайн', title: 'Сжать Изображение до 30 КБ Онлайн Бесплатно' },
    zh: { h1: '在线将图片压缩至30KB', title: '在线将图片压缩至30KB - 极速合规' },
    ja: { h1: 'オンラインで画像を30KBに圧縮', title: 'オンラインで画像を30KBに圧縮 - 各種登録用に最適' },
    ar: { h1: 'ضغط الصورة إلى 30 كيلوبايت أونلاين', title: 'ضغط الصورة إلى 30 كيلوبايت أونلاين مجاناً | سريع وخاص' },
  },
  'compress-image-to-10kb': {
    en: { h1: 'Compress Image to 10KB Online', title: 'Instantly Compress Image to 10KB Online | 100% Free, Sharp & Secure' },
    es: { h1: 'Comprimir Imagen a 10KB Online', title: 'Comprimir Imagen a 10KB Online Gratis | Máxima Nitidez' },
    fr: { h1: 'Compresser une Image à 10Ko en Ligne', title: 'Compresser une Image à 10Ko en Ligne Gratuit | Haute Précision' },
    de: { h1: 'Bild auf 10KB Komprimieren Online', title: 'Bild auf 10KB Komprimieren Online Kostenlos | Scharf & Sicher' },
    pt: { h1: 'Comprimir Imagem para 10KB Online', title: 'Comprimir Imagem para 10KB Online Grátis | Alta Nitidez' },
    it: { h1: 'Comprimi Immagine a 10KB Online', title: 'Comprimi Immagine a 10KB Online Gratis | Massima Precisione' },
    ru: { h1: 'Сжать Изображение до 10 КБ Онлайн', title: 'Сжать Изображение до 10 КБ Онлайн Бесплатно' },
    zh: { h1: '在线将图片压缩至10KB', title: '在线将图片压缩至10KB - 专为印章签名调优' },
    ja: { h1: 'オンラインで画像を10KBに圧縮', title: 'オンラインで画像を10KBに圧縮 - サインやアイコン向け' },
    ar: { h1: 'ضغط الصورة إلى 10 كيلوبايت أونلاين', title: 'ضغط الصورة إلى 10 كيلوبايت أونلاين مجاناً | حواف نقية' },
  },
  'compress-image-to-1mb': {
    en: { h1: 'Compress Image to 1MB Online', title: '100% Free Compress Image to 1MB Online | Ultra-Fast & Lossless HD' },
    es: { h1: 'Comprimir Imagen a 1MB Online', title: 'Comprimir Imagen a 1MB Online Gratis | Reduce Fotos Pesadas' },
    fr: { h1: 'Compresser une Image à 1Mo en Ligne', title: 'Compresser une Image à 1Mo en Ligne Gratuit | Haute Définition' },
    de: { h1: 'Bild auf 1MB Komprimieren Online', title: 'Bild auf 1MB Komprimieren Online Kostenlos | HD-Kamerafotos Optimieren' },
    pt: { h1: 'Comprimir Imagem para 1MB Online', title: 'Comprimir Imagem para 1MB Online Grátis | Reduza Fotos Pesadas' },
    it: { h1: 'Comprimi Immagine a 1MB Online', title: 'Comprimi Immagine a 1MB Online Gratis | Riduci Foto Pesanti' },
    ru: { h1: 'Сжать Изображение до 1 МБ Онлайн', title: 'Сжать Изображение до 1 МБ Онлайн Бесплатно | Быстро' },
    zh: { h1: '在线将图片压缩至1MB', title: '在线将图片压缩至1MB - 轻松优化高清单反大图' },
    ja: { h1: 'オンラインで画像を1MBに圧縮', title: 'オンラインで画像を1MBに圧縮 - 高解像度デジカメ写真の最適化' },
    ar: { h1: 'ضغط الصورة إلى 1 ميجابايت أونلاين', title: 'ضغط الصورة إلى 1 ميجابايت أونلاين مجاناً | للصور الكبيرة' },
  },

  // 3. Format Specific
  'compress-jpeg': {
    en: { h1: 'Compress JPEG Online Free', title: '100% Free Compress JPEG Online | Best Lossless Quality & Zero Uploads' },
    es: { h1: 'Comprimir JPEG Online Gratis', title: 'Comprimir JPEG Online Gratis | Calidad Sin Pérdida y 100% Privado' },
    fr: { h1: 'Compresser JPEG en Ligne Gratuit', title: 'Compresser JPEG en Ligne Gratuit | Qualité Sans Perte et Privé' },
    de: { h1: 'JPEG Online Kostenlos Komprimieren', title: 'JPEG Online Kostenlos Komprimieren | Beste Verlustfreie Qualität' },
    pt: { h1: 'Comprimir JPEG Online Grátis', title: 'Comprimir JPEG Online Grátis | Qualidade Sem Perdas e Seguro' },
    it: { h1: 'Comprimi JPEG Online Gratis', title: 'Comprimi JPEG Online Gratis | Massima Qualità Senza Perdite' },
    ru: { h1: 'Сжать JPEG Онлайн Бесплатно', title: 'Сжать JPEG Онлайн Бесплатно | Без Потери Качества' },
    zh: { h1: '在线压缩JPEG格式图片', title: '在线压缩JPEG格式图片 - 100%免费无损压缩' },
    ja: { h1: 'オンラインでJPEGを圧縮', title: 'オンラインでJPEGを圧縮 - 画質劣化なし・無料' },
    ar: { h1: 'ضغط صور JPEG أونلاين مجاناً', title: 'ضغط صور JPEG أونلاين مجاناً | جودة نقية بدون فقد' },
  },
  'compress-jpg-online': {
    en: { h1: 'Compress JPG Online', title: '100% Free Compress JPG Online | Ultra-Fast One-Click Optimization' },
    es: { h1: 'Comprimir JPG Online', title: 'Comprimir JPG Online Gratis | Optimización Rápida en 1 Clic' },
    fr: { h1: 'Compresser JPG en Ligne', title: 'Compresser JPG en Ligne Gratuit | Optimisation Rapide en 1 Clic' },
    de: { h1: 'JPG Online Komprimieren', title: 'JPG Online Komprimieren Kostenlos | Blitzschnelle 1-Klick Optimierung' },
    pt: { h1: 'Comprimir JPG Online', title: 'Comprimir JPG Online Grátis | Otimização Rápida em 1 Clique' },
    it: { h1: 'Comprimi JPG Online', title: 'Comprimi JPG Online Gratis | Ottimizzazione Veloce in 1 Clic' },
    ru: { h1: 'Сжать JPG Онлайн', title: 'Сжать JPG Онлайн Бесплатно | Быстрая Оптимизация в 1 Клик' },
    zh: { h1: '在线压缩JPG图片', title: '在线压缩JPG图片 - 极速一键优化' },
    ja: { h1: 'オンラインでJPGを圧縮', title: 'オンラインでJPGを圧縮 - 1クリックで超高速軽量化' },
    ar: { h1: 'ضغط صور JPG أونلاين', title: 'ضغط صور JPG أونلاين مجاناً | تحسين فوري بنقرة واحدة' },
  },
  'compress-a-jpg': {
    en: { h1: 'Compress a JPG Online', title: 'Effortlessly Compress a JPG Online | 100% Free, Instant & Lossless' },
    es: { h1: 'Comprimir un JPG Online', title: 'Comprimir un JPG Online Gratis | Fácil, Rápido y Sin Pérdida' },
    fr: { h1: 'Compresser un Fichier JPG en Ligne', title: 'Compresser un Fichier JPG en Ligne Gratuit | Facile et Rapide' },
    de: { h1: 'Eine JPG-Datei Komprimieren', title: 'Eine JPG-Datei Komprimieren Online Kostenlos | Einfach & Schnell' },
    pt: { h1: 'Comprimir um Arquivo JPG Online', title: 'Comprimir um Arquivo JPG Online Grátis | Fácil e Rápido' },
    it: { h1: 'Comprimi un File JPG Online', title: 'Comprimi un File JPG Online Gratis | Semplice e Veloce' },
    ru: { h1: 'Сжать Файл JPG Онлайн', title: 'Сжать Файл JPG Онлайн Бесплатно | Быстро и Просто' },
    zh: { h1: '在线压缩单个JPG文件', title: '在线压缩单个JPG文件 - 拖拽即压' },
    ja: { h1: 'JPGファイルをオンラインで圧縮', title: 'JPGファイルをオンラインで圧縮 - かんたん・無料' },
    ar: { h1: 'ضغط ملف JPG أونلاين', title: 'ضغط ملف JPG أونلاين مجاناً | سهل وفوري' },
  },
  'reduce-size-of-jpg': {
    en: { h1: 'Reduce Size of JPG Online', title: 'Instantly Reduce Size of JPG Online Free | 100% Pixel-Perfect & Private' },
    es: { h1: 'Reducir Tamaño de JPG Online', title: 'Reducir Tamaño de JPG Online Gratis | Calidad Pixel-Perfect' },
    fr: { h1: 'Réduire la Taille d\'un JPG en Ligne', title: 'Réduire la Taille d\'un JPG en Ligne Gratuit' },
    de: { h1: 'Größe von JPG Reduzieren Online', title: 'Größe von JPG Reduzieren Online Kostenlos' },
    pt: { h1: 'Reduzir Tamanho de JPG Online', title: 'Reduzir Tamanho de JPG Online Grátis' },
    it: { h1: 'Riduci Dimensione JPG Online', title: 'Riduci Dimensione JPG Online Gratis' },
    ru: { h1: 'Уменьшить Размер JPG Онлайн', title: 'Уменьшить Размер JPG Онлайн Бесплатно' },
    zh: { h1: '在线减小JPG文件大小', title: '在线减小JPG文件大小 - 高画质低体积' },
    ja: { h1: 'JPGの容量を小さくする', title: 'JPGの容量を小さくするオンラインツール - 画質そのまま' },
    ar: { h1: 'تقليل حجم ملف JPG أونلاين', title: 'تقليل حجم ملف JPG أونلاين مجاناً | دقة كاملة' },
  },
  'jpeg-size-reducer': {
    en: { h1: 'JPEG Size Reducer Online', title: 'Ultimate JPEG Size Reducer Online | 100% Free, Smart & Lossless' },
    es: { h1: 'Reductor de Tamaño JPEG Online', title: 'Reductor de Tamaño JPEG Online Gratis | Inteligente y Sin Pérdida' },
    fr: { h1: 'Réducteur de Taille JPEG en Ligne', title: 'Réducteur de Taille JPEG en Ligne Gratuit' },
    de: { h1: 'JPEG-Größenreduzierer Online', title: 'JPEG-Größenreduzierer Online Kostenlos' },
    pt: { h1: 'Redutor de Tamanho JPEG Online', title: 'Redutor de Tamanho JPEG Online Grátis' },
    it: { h1: 'Riduttore di Dimensioni JPEG Online', title: 'Riduttore di Dimensioni JPEG Online Gratis' },
    ru: { h1: 'Утилита Сжатия JPEG Онлайн', title: 'Утилита Сжатия JPEG Онлайн Бесплатно' },
    zh: { h1: '在线JPEG图片瘦身器', title: '在线JPEG图片瘦身器 - 智能高效压缩' },
    ja: { h1: 'JPEG容量削減ツール', title: 'JPEG容量削減ツール - スマート圧縮' },
    ar: { h1: 'أداة تقليص حجم JPEG أونلاين', title: 'أداة تقليص حجم JPEG أونلاين مجاناً' },
  },
  'png-compressor': {
    en: { h1: 'PNG Compressor Online', title: 'Fastest PNG Compressor Online Free | 100% Lossless Alpha Transparency' },
    es: { h1: 'Compresor de PNG Online', title: 'Compresor de PNG Online Gratis | Conserva Transparencias Alfa' },
    fr: { h1: 'Compresseur PNG en Ligne', title: 'Compresseur PNG en Ligne Gratuit | Préserve la Transparence' },
    de: { h1: 'PNG Kompressor Online', title: 'PNG Kompressor Online Kostenlos | Transparenzen Bleiben Erhalten' },
    pt: { h1: 'Compressor de PNG Online', title: 'Compressor de PNG Online Grátis | Preserva Fundo Transparente' },
    it: { h1: 'Compressore PNG Online', title: 'Compressore PNG Online Gratis | Mantiene la Trasparenza Alfa' },
    ru: { h1: 'PNG Компрессор Онлайн', title: 'PNG Компрессор Онлайн Бесплатно | С Сохранением Прозрачности' },
    zh: { h1: '在线PNG压缩器', title: '在线PNG压缩器 - 完美保留透明背景通道' },
    ja: { h1: 'オンラインPNG圧縮ツール', title: 'オンラインPNG圧縮ツール - 透過背景を100%保持' },
    ar: { h1: 'ضاغط صور PNG أونلاين', title: 'ضاغط صور PNG أونلاين مجاناً | يحافظ على الشفافية بدقة' },
  },
  'png-size-reducer': {
    en: { h1: 'PNG Size Reducer Online', title: '100% Free PNG Size Reducer Online | Lossless Quality & Zero Watermark' },
    es: { h1: 'Reductor de Tamaño PNG Online', title: 'Reductor de Tamaño PNG Online Gratis | Sin Marcas de Agua' },
    fr: { h1: 'Réducteur de Taille PNG en Ligne', title: 'Réducteur de Taille PNG en Ligne Gratuit' },
    de: { h1: 'PNG-Größenreduzierer Online', title: 'PNG-Größenreduzierer Online Kostenlos' },
    pt: { h1: 'Redutor de Tamanho PNG Online', title: 'Redutor de Tamanho PNG Online Grátis' },
    it: { h1: 'Riduttore Peso PNG Online', title: 'Riduttore Peso PNG Online Gratis' },
    ru: { h1: 'Уменьшить Вес PNG Онлайн', title: 'Уменьшить Вес PNG Онлайн Бесплатно' },
    zh: { h1: '在线PNG体积压缩工具', title: '在线PNG体积压缩工具 - 无水印无损' },
    ja: { h1: 'PNGサイズ軽量化オンライン', title: 'PNGサイズ軽量化オンライン - 透かしなし' },
    ar: { h1: 'أداة تقليل وزن صور PNG أونلاين', title: 'أداة تقليل وزن صور PNG أونلاين مجاناً' },
  },
  'reduce-png-file-size': {
    en: { h1: 'Reduce PNG File Size Online', title: 'Instantly Reduce PNG File Size Online | 100% Free & Pixel-Perfect' },
    es: { h1: 'Reducir Tamaño de Archivo PNG Online', title: 'Reducir Tamaño de Archivo PNG Online Gratis' },
    fr: { h1: 'Réduire le Poids d\'un Fichier PNG en Ligne', title: 'Réduire le Poids d\'un Fichier PNG en Ligne Gratuit' },
    de: { h1: 'PNG Dateigröße Reduzieren Online', title: 'PNG Dateigröße Reduzieren Online Kostenlos' },
    pt: { h1: 'Reduzir Tamanho do Arquivo PNG Online', title: 'Reduzir Tamanho do Arquivo PNG Online Grátis' },
    it: { h1: 'Riduci Dimensione File PNG Online', title: 'Riduci Dimensione File PNG Online Gratis' },
    ru: { h1: 'Уменьшить Размер Файла PNG Онлайн', title: 'Уменьшить Размер Файла PNG Онлайн Бесплатно' },
    zh: { h1: '在线减少PNG文件大小', title: '在线减少PNG文件大小 - 像素级色彩优化' },
    ja: { h1: 'PNGファイルサイズを縮小する', title: 'PNGファイルサイズを縮小するオンラインツール' },
    ar: { h1: 'تقليل حجم ملف PNG أونلاين', title: 'تقليل حجم ملف PNG أونلاين مجاناً' },
  },
  'compress-gif': {
    en: { h1: 'Compress GIF Online Free', title: '100% Free Compress GIF Online | Instantly Shrink Animated GIFs' },
    es: { h1: 'Comprimir GIF Online Gratis', title: 'Comprimir GIF Online Gratis | Reduce Animaciones Sin Tirones' },
    fr: { h1: 'Compresser GIF en Ligne Gratuit', title: 'Compresser GIF en Ligne Gratuit | Réduire le Poids des GIFs' },
    de: { h1: 'GIF Online Kostenlos Komprimieren', title: 'GIF Online Kostenlos Komprimieren | Animierte GIFs Verkleinern' },
    pt: { h1: 'Comprimir GIF Online Grátis', title: 'Comprimir GIF Online Grátis | Reduza GIFs Animados' },
    it: { h1: 'Comprimi GIF Online Gratis', title: 'Comprimi GIF Online Gratis | Riduci GIF Animate' },
    ru: { h1: 'Сжать GIF Онлайн Бесплатно', title: 'Сжать GIF Онлайн Бесплатно | Уменьшить Вес Анимации' },
    zh: { h1: '在线压缩GIF动图', title: '在线压缩GIF动图 - 减少体积同时保持流畅播放' },
    ja: { h1: 'オンラインでGIFを圧縮', title: 'オンラインでGIFを圧縮 - アニメーションGIFの容量削減' },
    ar: { h1: 'ضغط صور GIF أونلاين مجاناً', title: 'ضغط صور GIF أونلاين مجاناً | تصغير الرسوم المتحركة' },
  },
  'animated-gif-compressor': {
    en: { h1: 'Animated GIF Compressor Online', title: 'Ultimate Animated GIF Compressor Online | Fast, Smooth & 100% Free' },
    es: { h1: 'Compresor de GIF Animados Online', title: 'Compresor de GIF Animados Online Gratis | Rápido y Fluido' },
    fr: { h1: 'Compresseur de GIF Animé en Ligne', title: 'Compresseur de GIF Animé en Ligne Gratuit' },
    de: { h1: 'Kompressor für Animierte GIFs Online', title: 'Kompressor für Animierte GIFs Online Kostenlos' },
    pt: { h1: 'Compressor de GIF Animado Online', title: 'Compressor de GIF Animado Online Grátis' },
    it: { h1: 'Compressore GIF Animate Online', title: 'Compressore GIF Animate Online Gratis' },
    ru: { h1: 'Компрессор Анимированных GIF Онлайн', title: 'Компрессор Анимированных GIF Онлайн Бесплатно' },
    zh: { h1: '在线动态GIF压缩器', title: '在线动态GIF压缩器 - 高画质帧率稳定' },
    ja: { h1: 'アニメーションGIF圧縮ツール', title: 'アニメーションGIF圧縮ツール - スムーズに軽量化' },
    ar: { h1: 'ضاغط صور GIF المتحركة أونلاين', title: 'ضاغط صور GIF المتحركة أونلاين مجاناً' },
  },
  'compress-webp-online': {
    en: { h1: 'Compress WebP Online Free', title: '100% Free Compress WebP Online | Ultra-Fast Next-Gen Compression' },
    es: { h1: 'Comprimir WebP Online Gratis', title: 'Comprimir WebP Online Gratis | Máximo Rendimiento Web' },
    fr: { h1: 'Compresser WebP en Ligne Gratuit', title: 'Compresser WebP en Ligne Gratuit | Vitesse Web Maximale' },
    de: { h1: 'WebP Online Kostenlos Komprimieren', title: 'WebP Online Kostenlos Komprimieren | Schnellste Webladezeiten' },
    pt: { h1: 'Comprimir WebP Online Grátis', title: 'Comprimir WebP Online Grátis | Máxima Velocidade Web' },
    it: { h1: 'Comprimi WebP Online Gratis', title: 'Comprimi WebP Online Gratis | Massime Prestazioni Web' },
    ru: { h1: 'Сжать WebP Онлайн Бесплатно', title: 'Сжать WebP Онлайн Бесплатно | Современная Оптимизация' },
    zh: { h1: '在线压缩WebP格式', title: '在线压缩WebP格式 - 极致网页加载速度' },
    ja: { h1: 'オンラインでWebPを圧縮', title: 'オンラインでWebPを圧縮 - 次世代高速フォーマット' },
    ar: { h1: 'ضغط صور WebP أونلاين مجاناً', title: 'ضغط صور WebP أونلاين مجاناً | سرعة فائقة للمواقع' },
  },
  'convert-png-to-jpg': {
    en: { h1: 'Convert PNG to JPG & Compress', title: 'Convert PNG to JPG & Compress Online | 100% Free, Instant & Lossless' },
    es: { h1: 'Convertir PNG a JPG y Comprimir', title: 'Convertir PNG a JPG y Comprimir Online Gratis' },
    fr: { h1: 'Convertir PNG en JPG et Compresser', title: 'Convertir PNG en JPG et Compresser en Ligne Gratuit' },
    de: { h1: 'PNG in JPG Konvertieren & Komprimieren', title: 'PNG in JPG Konvertieren & Komprimieren Online Kostenlos' },
    pt: { h1: 'Converter PNG para JPG e Comprimir', title: 'Converter PNG para JPG e Comprimir Online Grátis' },
    it: { h1: 'Converti PNG in JPG e Comprimi', title: 'Converti PNG in JPG e Comprimi Online Gratis' },
    ru: { h1: 'Конвертировать PNG в JPG и Сжать', title: 'Конвертировать PNG в JPG и Сжать Онлайн Бесплатно' },
    zh: { h1: '转换PNG为JPG并压缩', title: '转换PNG为JPG并压缩 - 节省高达80%体积' },
    ja: { h1: 'PNGをJPGに変換して圧縮', title: 'PNGをJPGに変換して圧縮 - 瞬時に容量削減' },
    ar: { h1: 'تحويل PNG إلى JPG وضغطها', title: 'تحويل PNG إلى JPG وضغطها أونلاين مجاناً' },
  },
  'convert-jpg-to-webp': {
    en: { h1: 'Convert JPG to WebP & Compress', title: 'Fastest Convert JPG to WebP Online | 100% Free & Lossless Optimizer' },
    es: { h1: 'Convertir JPG a WebP y Comprimir', title: 'Convertir JPG a WebP y Comprimir Online Gratis' },
    fr: { h1: 'Convertir JPG en WebP et Compresser', title: 'Convertir JPG en WebP et Compresser en Ligne Gratuit' },
    de: { h1: 'JPG in WebP Konvertieren & Komprimieren', title: 'JPG in WebP Konvertieren & Komprimieren Online Kostenlos' },
    pt: { h1: 'Converter JPG para WebP e Comprimir', title: 'Converter JPG para WebP e Comprimir Online Grátis' },
    it: { h1: 'Converti JPG in WebP e Comprimi', title: 'Converti JPG in WebP e Comprimi Online Gratis' },
    ru: { h1: 'Конвертировать JPG в WebP и Сжать', title: 'Конвертировать JPG в WebP и Сжать Онлайн Бесплатно' },
    zh: { h1: '转换JPG为WebP并压缩', title: '转换JPG为WebP并压缩 - 提速网站加载' },
    ja: { h1: 'JPGをWebPに変換して圧縮', title: 'JPGをWebPに変換して圧縮 - Web高速化に必須' },
    ar: { h1: 'تحويل JPG إلى WebP وضغطها', title: 'تحويل JPG إلى WebP وضغطها أونلاين مجاناً' },
  },

  // 4. Action Oriented
  'reduce-image-size': {
    en: { h1: 'Reduce Image Size Online', title: '100% Free Reduce Image Size Online | Instant, Lossless & No Signup' },
    es: { h1: 'Reducir Tamaño de Imagen Online', title: 'Reducir Tamaño de Imagen Online Gratis | Instantáneo y Sin Registro' },
    fr: { h1: 'Réduire la Taille d\'une Image en Ligne', title: 'Réduire la Taille d\'une Image en Ligne Gratuit' },
    de: { h1: 'Bildgröße Reduzieren Online', title: 'Bildgröße Reduzieren Online Kostenlos | Ohne Registrierung' },
    pt: { h1: 'Reduzir Tamanho da Imagem Online', title: 'Reduzir Tamanho da Imagem Online Grátis' },
    it: { h1: 'Riduci Dimensione Immagine Online', title: 'Riduci Dimensione Immagine Online Gratis' },
    ru: { h1: 'Уменьшить Размер Изображения Онлайн', title: 'Уменьшить Размер Изображения Онлайн Бесплатно' },
    zh: { h1: '在线缩小图片文件大小', title: '在线缩小图片文件大小 - 100%免费即时处理' },
    ja: { h1: 'オンラインで画像サイズを縮小', title: 'オンラインで画像サイズを縮小 - 登録不要・完全無料' },
    ar: { h1: 'تقليل حجم الصور أونلاين', title: 'تقليل حجم الصور أونلاين مجاناً | فوري وبدون تسجيل' },
  },
  'photo-size-reducer': {
    en: { h1: 'Photo Size Reducer Online', title: 'Ultimate Photo Size Reducer Online | 100% Free & Lossless HD Quality' },
    es: { h1: 'Reductor de Tamaño de Fotos Online', title: 'Reductor de Tamaño de Fotos Online Gratis | Calidad HD' },
    fr: { h1: 'Réducteur de Taille de Photo en Ligne', title: 'Réducteur de Taille de Photo en Ligne Gratuit' },
    de: { h1: 'Fotogröße Reduzieren Online', title: 'Fotogröße Reduzieren Online Kostenlos' },
    pt: { h1: 'Redutor de Tamanho de Fotos Online', title: 'Redutor de Tamanho de Fotos Online Grátis' },
    it: { h1: 'Riduci Dimensione Foto Online', title: 'Riduci Dimensione Foto Online Gratis' },
    ru: { h1: 'Уменьшить Размер Фотографии Онлайн', title: 'Уменьшить Размер Фотографии Онлайн Бесплатно' },
    zh: { h1: '在线照片体积压缩工具', title: '在线照片体积压缩工具 - 保持面部与色彩清晰' },
    ja: { h1: '写真サイズ縮小ツール', title: '写真サイズ縮小ツール - 人物や風景の美しさをそのまま保持' },
    ar: { h1: 'أداة تقليل حجم الصور الفوتوغرافية أونلاين', title: 'أداة تقليل حجم الصور الفوتوغرافية أونلاين مجاناً' },
  },
  'minimize-picture-size': {
    en: { h1: 'Minimize Picture Size Online', title: 'Minimize Picture Size Online Free | Ultra-Fast, Lossless & 100% Private' },
    es: { h1: 'Minimizar Tamaño de Foto Online', title: 'Minimizar Tamaño de Foto Online Gratis' },
    fr: { h1: 'Minimiser la Taille d\'une Image en Ligne', title: 'Minimiser la Taille d\'une Image en Ligne Gratuit' },
    de: { h1: 'Bildgröße Verkleinern Online', title: 'Bildgröße Verkleinern Online Kostenlos' },
    pt: { h1: 'Minimizar Tamanho da Imagem Online', title: 'Minimizar Tamanho da Imagem Online Grátis' },
    it: { h1: 'Riduci Peso Immagine Online', title: 'Riduci Peso Immagine Online Gratis' },
    ru: { h1: 'Сжать Размер Фото Онлайн', title: 'Сжать Размер Фото Онлайн Бесплатно' },
    zh: { h1: '在线最小化图片体积', title: '在线最小化图片体积 - 极速无损压缩' },
    ja: { h1: 'オンラインで写真サイズを最小化', title: 'オンラインで写真サイズを最小化 - 高速＆安心' },
    ar: { h1: 'تصغير حجم الصور أونلاين', title: 'تصغير حجم الصور أونلاين مجاناً | فائق السرعة' },
  },
  'decrease-image-size': {
    en: { h1: 'Decrease Image Size Online', title: 'Effortlessly Decrease Image Size Online | 100% Free & Pixel-Perfect' },
    es: { h1: 'Disminuir Tamaño de Imagen Online', title: 'Disminuir Tamaño de Imagen Online Gratis' },
    fr: { h1: 'Diminuer la Taille d\'une Image en Ligne', title: 'Diminuer la Taille d\'une Image en Ligne Gratuit' },
    de: { h1: 'Dateigröße von Bildern Verringern Online', title: 'Dateigröße von Bildern Verringern Online Kostenlos' },
    pt: { h1: 'Diminuir Tamanho da Imagem Online', title: 'Diminuir Tamanho da Imagem Online Grátis' },
    it: { h1: 'Diminuisci Dimensione Immagine Online', title: 'Diminuisci Dimensione Immagine Online Gratis' },
    ru: { h1: 'Уменьшить Объем Изображений Онлайн', title: 'Уменьшить Объем Изображений Онлайн Бесплатно' },
    zh: { h1: '在线降低图片大小', title: '在线降低图片大小 - 零画质损失' },
    ja: { h1: '画像の容量を減らす', title: '画像の容量を減らすオンラインツール - 画質そのまま' },
    ar: { h1: 'إنقاص حجم الصورة أونلاين', title: 'إنقاص حجم الصورة أونلاين مجاناً | بدقة متناهية' },
  },
  'shrink-image-online': {
    en: { h1: 'Shrink Image Online Free', title: '100% Free Shrink Image Online | Ultra-Fast, Secure & No Watermark' },
    es: { h1: 'Comprimir Fotos Online Rápido', title: 'Comprimir Fotos Online Gratis | Rápido, Seguro y Sin Marcas' },
    fr: { h1: 'Alléger une Image en Ligne', title: 'Alléger une Image en Ligne Gratuit | Rapide et Sécurisé' },
    de: { h1: 'Bilder Schrumpfen Online', title: 'Bilder Schrumpfen Online Kostenlos | Sicher & Ohne Wasserzeichen' },
    pt: { h1: 'Encolher Fotos Online Grátis', title: 'Encolher Fotos Online Grátis | Rápido e Seguro' },
    it: { h1: 'Rimpicciolisci Immagini Online', title: 'Rimpicciolisci Immagini Online Gratis' },
    ru: { h1: 'Сжать Изображение Онлайн Быстро', title: 'Сжать Изображение Онлайн Быстро | Безопасно' },
    zh: { h1: '在线快速压缩瘦身图片', title: '在线快速压缩瘦身图片 - 纯本地运行' },
    ja: { h1: 'オンラインで写真を軽量化', title: 'オンラインで写真を軽量化 - 透かしなし・超高速' },
    ar: { h1: 'تقليص الصور أونلاين مجاناً', title: 'تقليص الصور أونلاين مجاناً | سريع وبدون علامات' },
  },
  'condense-image': {
    en: { h1: 'Condense Image Online Free', title: 'Condense Image Online Free | Advanced Smart Engine & Lossless Quality' },
    es: { h1: 'Condensar Imágenes Online Gratis', title: 'Condensar Imágenes Online Gratis | Motor Inteligente Sin Pérdida' },
    fr: { h1: 'Condenser une Image en Ligne', title: 'Condenser une Image en Ligne Gratuit' },
    de: { h1: 'Bilder Kompakt Komprimieren Online', title: 'Bilder Kompakt Komprimieren Online Kostenlos' },
    pt: { h1: 'Condensar Imagens Online Grátis', title: 'Condensar Imagens Online Grátis' },
    it: { h1: 'Comprimi e Condensa Immagini Online', title: 'Comprimi e Condensa Immagini Online Gratis' },
    ru: { h1: 'Оптимизировать Изображения Онлайн', title: 'Оптимизировать Изображения Онлайн Бесплатно' },
    zh: { h1: '在线紧凑浓缩图片大小', title: '在线紧凑浓缩图片大小 - 高度保留原画质' },
    ja: { h1: '画像をコンパクトに圧縮', title: '画像をコンパクトに圧縮するオンラインツール' },
    ar: { h1: 'تكثيف وضغط الصور أونلاين', title: 'تكثيف وضغط الصور أونلاين مجاناً | محرك ذكي' },
  },
  'reduce-image-resolution': {
    en: { h1: 'Reduce Image Resolution Online', title: 'Reduce Image Resolution Online Free | 100% Precise & Pixel-Perfect' },
    es: { h1: 'Reducir Resolución de Imagen Online', title: 'Reducir Resolución de Imagen Online Gratis | Preciso y Nítido' },
    fr: { h1: 'Réduire la Résolution d\'une Image en Ligne', title: 'Réduire la Résolution d\'une Image en Ligne Gratuit' },
    de: { h1: 'Bildauflösung Reduzieren Online', title: 'Bildauflösung Reduzieren Online Kostenlos | Präzise Pixelanpassung' },
    pt: { h1: 'Reduzir Resolução da Imagem Online', title: 'Reduzir Resolução da Imagem Online Grátis | Preciso' },
    it: { h1: 'Riduci Risoluzione Immagine Online', title: 'Riduci Risoluzione Immagine Online Gratis' },
    ru: { h1: 'Уменьшить Разрешение Изображения Онлайн', title: 'Уменьшить Разрешение Изображения Онлайн Бесплатно' },
    zh: { h1: '在线降低图片分辨率', title: '在线降低图片分辨率 - 精准调整像素' },
    ja: { h1: 'オンラインで画像の解像度を下げる', title: 'オンラインで画像の解像度を下げる - 正確なピクセル調整' },
    ar: { h1: 'تقليل دقة الصورة أونلاين', title: 'تقليل دقة الصورة أونلاين مجاناً | دقيق ومثالي' },
  },
  'reduce-image-dimensions': {
    en: { h1: 'Reduce Image Dimensions Online', title: 'Fastest Reduce Image Dimensions Online | 100% Accurate & Lossless' },
    es: { h1: 'Reducir Dimensiones de Imagen Online', title: 'Reducir Dimensiones de Imagen Online Gratis | Ajuste Exacto' },
    fr: { h1: 'Réduire les Dimensions d\'une Image en Ligne', title: 'Réduire les Dimensions d\'une Image en Ligne Gratuit' },
    de: { h1: 'Bildabmessungen Verringern Online', title: 'Bildabmessungen Verringern Online Kostenlos' },
    pt: { h1: 'Reduzir Dimensões da Imagem Online', title: 'Reduzir Dimensões da Imagem Online Grátis' },
    it: { h1: 'Riduci Dimensioni Immagine Online', title: 'Riduci Dimensioni Immagine Online Gratis' },
    ru: { h1: 'Уменьшить Размеры Изображения Онлайн', title: 'Уменьшить Размеры Изображения Онлайн Бесплатно' },
    zh: { h1: '在线修改图片宽高尺寸', title: '在线修改图片宽高尺寸 - 快速适配各类平台' },
    ja: { h1: '画像の縦横サイズを縮小', title: '画像の縦横サイズを縮小するオンラインツール' },
    ar: { h1: 'تقليل أبعاد الصورة أونلاين', title: 'تقليل أبعاد الصورة أونلاين مجاناً | قياسات دقيقة' },
  },
  'image-compressor-online': {
    en: { h1: 'Image Compressor Online Free', title: 'Best Image Compressor Online Free | 100% Private, Fast & Unlimited' },
    es: { h1: 'Compresor de Imágenes Online Gratis', title: 'Mejor Compresor de Imágenes Online Gratis | Ilimitado y Seguro' },
    fr: { h1: 'Compresseur d\'Images en Ligne Gratuit', title: 'Meilleur Compresseur d\'Images en Ligne Gratuit' },
    de: { h1: 'Bester Bildkompressor Online Kostenlos', title: 'Bester Bildkompressor Online Kostenlos | Sicher & Unbegrenzt' },
    pt: { h1: 'Melhor Compressor de Imagens Online Grátis', title: 'Melhor Compressor de Imagens Online Grátis' },
    it: { h1: 'Miglior Compressore Immagini Online Gratis', title: 'Miglior Compressore Immagini Online Gratis' },
    ru: { h1: 'Лучший Компрессор Изображений Онлайн', title: 'Лучший Компрессор Изображений Онлайн Бесплатно' },
    zh: { h1: '在线免费图片压缩工具', title: '最佳在线免费图片压缩工具 - 极速私密无限制' },
    ja: { h1: '無料オンライン画像圧縮ツール', title: '最高峰の無料オンライン画像圧縮ツール - 高速＆無制限' },
    ar: { h1: 'أفضل ضاغط صور أونلاين مجاناً', title: 'أفضل ضاغط صور أونلاين مجاناً | سريع وغير محدود' },
  },
  'image-size-reducer': {
    en: { h1: 'Image Size Reducer Online', title: '100% Free Image Size Reducer Online | Instant, Lossless & Secure' },
    es: { h1: 'Reductor de Tamaño de Imágenes Online', title: 'Reductor de Tamaño de Imágenes Online Gratis | Rápido y Privado' },
    fr: { h1: 'Réducteur de Taille d\'Image en Ligne', title: 'Réducteur de Taille d\'Image en Ligne Gratuit' },
    de: { h1: 'Bildgrößenreduzierer Online', title: 'Bildgrößenreduzierer Online Kostenlos | Sicher & Verlustfrei' },
    pt: { h1: 'Redutor de Tamanho de Imagens Online', title: 'Redutor de Tamanho de Imagens Online Grátis' },
    it: { h1: 'Riduttore Dimensione Immagini Online', title: 'Riduttore Dimensione Immagini Online Gratis' },
    ru: { h1: 'Снижение Размера Изображений Онлайн', title: 'Снижение Размера Изображений Онлайн Бесплатно' },
    zh: { h1: '在线图像体积压缩工具', title: '在线图像体积压缩工具 - 即刻减少MB与KB' },
    ja: { h1: '画像サイズ軽量化ツール', title: '画像サイズ軽量化ツール - 瞬時に圧縮' },
    ar: { h1: 'أداة تصغير حجم الصور أونلاين', title: 'أداة تصغير حجم الصور أونلاين مجاناً | آمن وفوري' },
  },
  'bulk-image-compressor': {
    en: { h1: 'Bulk Image Compressor Online Free', title: 'Bulk Image Compressor Online Free | 100% Fast Batch Photo Optimizer' },
    es: { h1: 'Compresor de Imágenes por Lote Online', title: 'Compresor de Imágenes por Lote Online Gratis | Optimiza Cientos de Fotos' },
    fr: { h1: 'Compresseur d\'Images par Lot en Ligne', title: 'Compresseur d\'Images par Lot en Ligne Gratuit' },
    de: { h1: 'Bilder Stapelweise Komprimieren Online', title: 'Bilder Stapelweise Komprimieren Online Kostenlos' },
    pt: { h1: 'Compressor de Imagens em Lote Online', title: 'Compressor de Imagens em Lote Online Grátis' },
    it: { h1: 'Comprimi Immagini in Batch Online', title: 'Comprimi Immagini in Batch Online Gratis' },
    ru: { h1: 'Пакетное Сжатие Изображений Онлайн', title: 'Пакетное Сжатие Изображений Онлайн Бесплатно' },
    zh: { h1: '在线批量图片压缩器', title: '在线批量图片压缩器 - 一次性快速压缩数百张大图' },
    ja: { h1: 'オンライン一括画像圧縮ツール', title: 'オンライン一括画像圧縮ツール - 数百枚をまとめて高速圧縮' },
    ar: { h1: 'ضاغط الصور دفعة واحدة أونلاين مجاناً', title: 'ضاغط الصور دفعة واحدة أونلاين مجاناً | معالجة مئات الصور' },
  },
  'lossless-image-compressor': {
    en: { h1: 'Lossless Image Compressor Online', title: '100% Lossless Image Compressor Online | Guaranteed HD Quality Preserved' },
    es: { h1: 'Compresor de Imágenes Sin Pérdida Online', title: 'Compresor de Imágenes Sin Pérdida Online Gratis | Calidad HD Intacta' },
    fr: { h1: 'Compresseur d\'Images Sans Perte en Ligne', title: 'Compresseur d\'Images Sans Perte en Ligne Gratuit' },
    de: { h1: 'Verlustfreier Bildkompressor Online', title: 'Verlustfreier Bildkompressor Online Kostenlos | Volle HD-Klarheit' },
    pt: { h1: 'Compressor de Imagens Sem Perdas Online', title: 'Compressor de Imagens Sem Perdas Online Grátis' },
    it: { h1: 'Compressore Immagini Senza Perdita Online', title: 'Compressore Immagini Senza Perdita Online Gratis' },
    ru: { h1: 'Сжатие Изображений Без Потерь Онлайн', title: 'Сжатие Изображений Без Потерь Онлайн Бесплатно' },
    zh: { h1: '在线无损图片压缩器', title: '在线无损图片压缩器 - 严格保证HD原画质不变' },
    ja: { h1: 'オンライン可逆（ロスレス）画像圧縮', title: 'オンライン可逆（ロスレス）画像圧縮 - 画質劣化ゼロ保証' },
    ar: { h1: 'ضاغط الصور بدون فقدان الجودة أونلاين', title: 'ضاغط الصور بدون فقدان الجودة أونلاين مجاناً | دقة أصلية 100%' },
  },
  'shopify-image-optimizer': {
    en: { h1: 'Shopify Product Image Optimizer', title: 'Best Shopify Image Optimizer Online | 100% Free & Boost Store Speed' },
    es: { h1: 'Optimizador de Imágenes para Shopify', title: 'Optimizador de Imágenes para Shopify Gratis | Acelera tu Tienda' },
    fr: { h1: 'Optimiseur d\'Images pour Shopify', title: 'Optimiseur d\'Images pour Shopify Gratuit | Accélérez votre Boutique' },
    de: { h1: 'Shopify Produktbild Optimierer', title: 'Shopify Produktbild Optimierer Kostenlos | Ladezeit Beschleunigen' },
    pt: { h1: 'Otimizador de Imagens para Shopify', title: 'Otimizador de Imagens para Shopify Grátis | Acelere sua Loja' },
    it: { h1: 'Ottimizzatore Immagini per Shopify', title: 'Ottimizzatore Immagini per Shopify Gratis | Velocizza lo Store' },
    ru: { h1: 'Оптимизатор Изображений для Shopify', title: 'Оптимизатор Изображений для Shopify Бесплатно' },
    zh: { h1: 'Shopify商品图片优化器', title: 'Shopify商品图片优化器 - 大幅提升独立站打开速度与转化' },
    ja: { h1: 'Shopify商品画像最適化ツール', title: 'Shopify商品画像最適化ツール - ストアの表示速度と売上を向上' },
    ar: { h1: 'مُحسِّن صور منتجات شوبيفاي', title: 'مُحسِّن صور منتجات شوبيفاي مجاناً | تسريع مبيعات متجرك' },
  },
  'wordpress-image-reducer': {
    en: { h1: 'WordPress Image Reducer Online', title: 'Ultimate WordPress Image Reducer Free | Speed Up Website SEO & Speed' },
    es: { h1: 'Reductor de Imágenes para WordPress', title: 'Reductor de Imágenes para WordPress Gratis | Mejora Velocidad y SEO' },
    fr: { h1: 'Réducteur d\'Images pour WordPress', title: 'Réducteur d\'Images pour WordPress Gratuit | Améliorez votre SEO' },
    de: { h1: 'WordPress Bildreduzierer Online', title: 'WordPress Bildreduzierer Online Kostenlos | Schnelleres SEO Ranking' },
    pt: { h1: 'Redutor de Imagens para WordPress', title: 'Redutor de Imagens para WordPress Grátis | Acelere seu Site' },
    it: { h1: 'Riduttore Immagini per WordPress', title: 'Riduttore Immagini per WordPress Gratis | Velocizza il tuo Sito' },
    ru: { h1: 'Сжатие Изображений для WordPress Онлайн', title: 'Сжатие Изображений для WordPress Онлайн Бесплатно' },
    zh: { h1: 'WordPress在线图片压缩工具', title: 'WordPress在线图片压缩工具 - 轻松通过谷歌 Core Web Vitals' },
    ja: { h1: 'WordPress画像軽量化オンライン', title: 'WordPress画像軽量化オンライン - サイト速度とSEO順位向上' },
    ar: { h1: 'تقليل حجم صور ووردبريس أونلاين', title: 'تقليل حجم صور ووردبريس أونلاين مجاناً | تسريع الموقع وسيو Google' },
  },
};

// Localized Category Names for Navigation / Breadcrumbs
const categoryNamesByLang = {
  en: {
    primary: 'Image Size Compressor',
    size: 'Size-Specific Reducers',
    format: 'Format Compressors',
    action: 'Broad Image Tools'
  },
  es: {
    primary: 'Compresor de Imágenes',
    size: 'Reductores por Tamaño',
    format: 'Compresores por Formato',
    action: 'Herramientas de Imagen'
  },
  fr: {
    primary: 'Compresseur d\'Image',
    size: 'Réducteurs par Taille Spécifique',
    format: 'Compresseurs par Format',
    action: 'Outils d\'Image Globaux'
  },
  de: {
    primary: 'Bildkompressor',
    size: 'Größenspezifische Reduzierer',
    format: 'Format-Kompressoren',
    action: 'Allgemeine Bildwerkzeuge'
  },
  pt: {
    primary: 'Compressor de Imagens',
    size: 'Redutores por Tamanho Específico',
    format: 'Compressores por Formato',
    action: 'Ferramentas Gerais de Imagem'
  },
  it: {
    primary: 'Compressore di Immagini',
    size: 'Riduttori per Dimensione Specifica',
    format: 'Compressori per Formato',
    action: 'Strumenti Generali per Immagini'
  },
  ru: {
    primary: 'Компрессор Изображений',
    size: 'Сжатие до Точного Размера',
    format: 'Компрессоры по Форматам',
    action: 'Инструменты для Работы с Фото'
  },
  zh: {
    primary: '图片大小压缩器',
    size: '指定大小压缩工具',
    format: '特定格式转换压缩',
    action: '常用图像处理工具'
  },
  ja: {
    primary: '画像サイズ圧縮ツール',
    size: '指定サイズ別圧縮ツール',
    format: 'フォーマット別圧縮',
    action: '画像処理ユーティリティ'
  },
  ar: {
    primary: 'ضاغط حجم الصور',
    size: 'تقليل الحجم لحجم محدد',
    format: 'ضغط حسب الصيغة',
    action: 'أدوات الصور الشاملة'
  }
};

const phpContent = `<?php
// data/localized_keywords.php
// Programmatic SEO translations for all 40 keywords across 10 global languages

\$kwTranslations = ${toPhp(translations)};
\$catTranslations = ${toPhp(categoryNamesByLang)};

if (!function_exists('getLocalizedKeywordData')) {
    function getLocalizedKeywordData(\$slug, \$lang, \$baseKw) {
        global \$kwTranslations, \$catTranslations;

        \$res = \$baseKw;
        if (isset(\$kwTranslations[\$slug][\$lang])) {
            \$l = \$kwTranslations[\$slug][\$lang];
            \$res['h1'] = \$l['h1'] ?? \$baseKw['h1'];
            \$res['title'] = \$l['title'] ?? \$baseKw['title'];
        }

        // Localized category name
        \$catSlug = \$baseKw['category'] ?? 'primary';
        \$res['category_name'] = \$catTranslations[\$lang][\$catSlug] ?? \$catTranslations['en'][\$catSlug] ?? 'Image Tools';

        return \$res;
    }
}
`;

fs.writeFileSync(path.join(__dirname, '..', 'data', 'localized_keywords.php'), phpContent, 'utf-8');
console.log('Saved: data/localized_keywords.php successfully!');
