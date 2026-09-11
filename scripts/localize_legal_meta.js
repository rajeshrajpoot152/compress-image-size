const fs = require('fs');

const privacyMeta = {
  es: {
    title: "Política de Privacidad - CompressImageSize | Garantía de Privacidad 100% en el Navegador",
    desc: "Descubra cómo CompressImageSize protege su privacidad con compresión de imágenes 100% en el navegador. Cero subidas a servidores. Conforme a RGPD y CCPA.",
    h1: "Política de Privacidad"
  },
  de: {
    title: "Datenschutzerklärung - CompressImageSize | 100% Client-Side Datenschutzgarantie",
    desc: "Erfahren Sie, wie CompressImageSize Ihre Privatsphäre mit 100% clientseitiger Bildkompression schützt. Keine Server-Uploads. DSGVO- und CCPA-konform.",
    h1: "Datenschutzerklärung"
  },
  fr: {
    title: "Politique de Confidentialité - CompressImageSize | Garantie Client-Side 100% Sécurisée",
    desc: "Découvrez comment CompressImageSize protège vos données avec une compression 100% locale dans le navigateur. Aucun téléversement serveur. Conforme RGPD.",
    h1: "Politique de Confidentialité"
  },
  it: {
    title: "Informativa sulla Privacy - CompressImageSize | Garanzia 100% Lato Client",
    desc: "Scopri come CompressImageSize protegge la tua privacy con la compressione locale direttamente nel browser. Nessun caricamento su server. Conforme al GDPR.",
    h1: "Informativa sulla Privacy"
  },
  pt: {
    title: "Política de Privacidade - CompressImageSize | Garantia 100% no Navegador",
    desc: "Saiba como o CompressImageSize protege a sua privacidade com compressão 100% local no navegador. Nenhum envio para servidores. Conforme RGPD e CCPA.",
    h1: "Política de Privacidade"
  },
  ru: {
    title: "Политика Конфиденциальности - CompressImageSize | 100% Локальная Обработка",
    desc: "Узнайте, как CompressImageSize защищает вашу конфиденциальность с помощью 100% локального сжатия в браузере. Без загрузки на сервер. Соответствие GDPR.",
    h1: "Политика Конфиденциальности"
  },
  zh: {
    title: "隐私政策 - CompressImageSize | 100% 浏览器本地安全处理保证",
    desc: "了解 CompressImageSize 如何通过 100% 浏览器本地 WebAssembly 压缩保护您的隐私安全。图片绝不上传至任何服务器，符合 GDPR 标准。",
    h1: "隐私政策"
  },
  ja: {
    title: "プライバシーポリシー - CompressImageSize | 100% ブラウザ内処理の安心保証",
    desc: "CompressImageSize がブラウザ内完全ローカル処理でプライバシーをどのように保護するかをご確認ください。サーバー送信なし、安全安心の画像圧縮ツール。",
    h1: "プライバシーポリシー"
  },
  ar: {
    title: "سياسة الخصوصية - CompressImageSize | ضمان المعالجة المحلية 100% في المتصفح",
    desc: "تعرف على كيفية حماية CompressImageSize لخصوصيتك من خلال ضغط الصور محلياً بنسبة 100% داخل المتصفح بدون أي رفع للخوادم. متوافق مع GDPR.",
    h1: "سياسة الخصوصية"
  }
};

const termsMeta = {
  es: {
    title: "Términos de Servicio - CompressImageSize | Términos de Uso Gratuitos",
    desc: "Lea los Términos de Servicio de CompressImageSize. Conozca sus derechos, 100% propiedad sobre sus imágenes, uso permitido y exenciones de responsabilidad.",
    h1: "Términos de Servicio"
  },
  de: {
    title: "Nutzungsbedingungen - CompressImageSize | Kostenlose Nutzungsbedingungen",
    desc: "Lesen Sie die Nutzungsbedingungen von CompressImageSize. Erfahren Sie mehr über Ihre Rechte, 100% Urheberrecht an Bildern und Nutzungsrichtlinien.",
    h1: "Nutzungsbedingungen"
  },
  fr: {
    title: "Conditions d'Utilisation - CompressImageSize | Conditions du Service Gratuit",
    desc: "Consultez les conditions d'utilisation de CompressImageSize. Droits de propriété à 100% conservés par l'utilisateur, sécurité et utilisation équitable.",
    h1: "Conditions d'Utilisation"
  },
  it: {
    title: "Termini di Servizio - CompressImageSize | Condizioni d'Uso Gratuite",
    desc: "Consulta i Termini di Servizio di CompressImageSize. Scopri i tuoi diritti, conservazione al 100% della proprietà delle immagini e regole d'uso.",
    h1: "Termini di Servizio"
  },
  pt: {
    title: "Termos de Serviço - CompressImageSize | Termos de Otimização de Imagem",
    desc: "Leia os Termos de Serviço do CompressImageSize. Compreenda seus direitos, 100% de posse de direitos autorais de seus arquivos e termos de uso gratuito.",
    h1: "Termos de Serviço"
  },
  ru: {
    title: "Условия Обслуживания - CompressImageSize | Условия Бесплатного Сервиса",
    desc: "Ознакомьтесь с условиями обслуживания CompressImageSize. Ваши права, 100% сохранение авторских прав на изображения и правила использования.",
    h1: "Условия Обслуживания"
  },
  zh: {
    title: "服务条款 - CompressImageSize | 免费图片压缩工具使用协议",
    desc: "阅读 CompressImageSize 服务条款。了解您的权利、100% 保留图片全部版权所有权、合理使用规范以及免费工具免责声明。",
    h1: "服务条款"
  },
  ja: {
    title: "利用規約 - CompressImageSize | 無料画像最適化ツールの利用規約",
    desc: "CompressImageSize の利用規約をご確認ください。利用者の権利、画像の100%著作権保持、利用ガイドラインについて詳しく説明します。",
    h1: "利用規約"
  },
  ar: {
    title: "شروط الخدمة - CompressImageSize | شروط وضوابط الاستخدام المجاني",
    desc: "اقرأ شروط خدمة CompressImageSize. تعرف على حقوقك واحتفاظك الكامل بملكية حقوق النشر لملفاتك بنسبة 100% وضوابط الاستخدام المجاني.",
    h1: "شروط الخدمة"
  }
};

let patched = 0;
for (const [lang, meta] of Object.entries(privacyMeta)) {
  for (const fname of ['privacy-policy.html', 'privacy.html']) {
    const fpath = lang + '/' + fname;
    if (fs.existsSync(fpath)) {
      let content = fs.readFileSync(fpath, 'utf8');
      content = content.replace(/<title>.*?<\/title>/, <title></title>);
      content = content.replace(/<meta name="description" content=".*?"\s*\/?>/, <meta name="description" content="">);
      content = content.replace(/<meta property="og:title" content=".*?"\s*\/?>/, <meta property="og:title" content="">);
      content = content.replace(/<meta property="og:description" content=".*?"\s*\/?>/, <meta property="og:description" content="">);
      content = content.replace(/<meta name="twitter:title" content=".*?"\s*\/?>/, <meta name="twitter:title" content="">);
      content = content.replace(/<meta name="twitter:description" content=".*?"\s*\/?>/, <meta name="twitter:description" content="">);
      fs.writeFileSync(fpath, content, 'utf8');
      patched++;
    }
  }
}

for (const [lang, meta] of Object.entries(termsMeta)) {
  for (const fname of ['terms-of-service.html', 'terms.html']) {
    const fpath = lang + '/' + fname;
    if (fs.existsSync(fpath)) {
      let content = fs.readFileSync(fpath, 'utf8');
      content = content.replace(/<title>.*?<\/title>/, <title></title>);
      content = content.replace(/<meta name="description" content=".*?"\s*\/?>/, <meta name="description" content="">);
      content = content.replace(/<meta property="og:title" content=".*?"\s*\/?>/, <meta property="og:title" content="">);
      content = content.replace(/<meta property="og:description" content=".*?"\s*\/?>/, <meta property="og:description" content="">);
      content = content.replace(/<meta name="twitter:title" content=".*?"\s*\/?>/, <meta name="twitter:title" content="">);
      content = content.replace(/<meta name="twitter:description" content=".*?"\s*\/?>/, <meta name="twitter:description" content="">);
      fs.writeFileSync(fpath, content, 'utf8');
      patched++;
    }
  }
}

console.log('Successfully localized metadata for legal files:', patched);
