const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. Language Definitions
const languages = {
  en: { name: 'English', dir: 'ltr', flag: '<svg class="w-4.5 h-3 rounded-[2px] overflow-hidden shadow-xs border border-slate-200/90 inline-block flex-shrink-0" viewBox="0 0 640 480"><path fill="#bd3d44" d="M0 0h640v480H0z"/><path stroke="#fff" stroke-width="37" d="M0 55.5h640M0 129.5h640M0 203.5h640M0 277.5h640M0 351.5h640M0 425.5h640"/><path fill="#192f5d" d="M0 0h260v260H0z"/></svg>' },
  es: { name: 'Español', dir: 'ltr', flag: '<svg class="w-4.5 h-3 rounded-[2px] overflow-hidden shadow-xs border border-slate-200/90 inline-block flex-shrink-0" viewBox="0 0 640 480"><path fill="#aa151b" d="M0 0h640v480H0z"/><path fill="#f1bf00" d="M0 120h640v240H0z"/></svg>' },
  fr: { name: 'Français', dir: 'ltr', flag: '<svg class="w-4.5 h-3 rounded-[2px] overflow-hidden shadow-xs border border-slate-200/90 inline-block flex-shrink-0" viewBox="0 0 640 480"><path fill="#fff" d="M0 0h640v480H0z"/><path fill="#002654" d="M0 0h213.3v480H0z"/><path fill="#ce1126" d="M426.7 0H640v480H426.7z"/></svg>' },
  de: { name: 'Deutsch', dir: 'ltr', flag: '<svg class="w-4.5 h-3 rounded-[2px] overflow-hidden shadow-xs border border-slate-200/90 inline-block flex-shrink-0" viewBox="0 0 640 480"><path fill="#ffce00" d="M0 320h640v160H0z"/><path d="M0 0h640v160H0z"/><path fill="#d00" d="M0 160h640v160H0z"/></svg>' },
  pt: { name: 'Português', dir: 'ltr', flag: '<svg class="w-4.5 h-3 rounded-[2px] overflow-hidden shadow-xs border border-slate-200/90 inline-block flex-shrink-0" viewBox="0 0 640 480"><path fill="#ff0000" d="M256 0h384v480H256z"/><path fill="#006600" d="M0 0h256v480H0z"/><circle cx="256" cy="240" r="80" fill="#ffff00"/></svg>' },
  zh: { name: '中文', dir: 'ltr', flag: '<svg class="w-4.5 h-3 rounded-[2px] overflow-hidden shadow-xs border border-slate-200/90 inline-block flex-shrink-0" viewBox="0 0 640 480"><path fill="#de2910" d="M0 0h640v480H0z"/><polygon fill="#ffde00" points="100,50 115,95 160,95 125,120 140,165 100,140 60,165 75,120 40,95 85,95"/></svg>' },
  ja: { name: '日本語', dir: 'ltr', flag: '<svg class="w-4.5 h-3 rounded-[2px] overflow-hidden shadow-xs border border-slate-200/90 inline-block flex-shrink-0" viewBox="0 0 640 480"><path fill="#fff" d="M0 0h640v480H0z"/><circle cx="320" cy="240" r="144" fill="#bc002d"/></svg>' },
  ar: { name: 'العربية', dir: 'rtl', flag: '<svg class="w-4.5 h-3 rounded-[2px] overflow-hidden shadow-xs border border-slate-200/90 inline-block flex-shrink-0" viewBox="0 0 640 480"><path fill="#00732f" d="M0 0h640v160H0z"/><path fill="#fff" d="M0 160h640v160H0z"/><path d="M0 320h640v160H0z"/><path fill="#ff0000" d="M0 0h160v480H0z"/></svg>' },
  ru: { name: 'Русский', dir: 'ltr', flag: '<svg class="w-4.5 h-3 rounded-[2px] overflow-hidden shadow-xs border border-slate-200/90 inline-block flex-shrink-0" viewBox="0 0 640 480"><path fill="#fff" d="M0 0h640v480H0z"/><path fill="#0039a6" d="M0 160h640v160H0z"/><path fill="#d52b1e" d="M0 320h640v160H0z"/></svg>' },
  it: { name: 'Italiano', dir: 'ltr', flag: '<svg class="w-4.5 h-3 rounded-[2px] overflow-hidden shadow-xs border border-slate-200/90 inline-block flex-shrink-0" viewBox="0 0 640 480"><path fill="#009246" d="M0 0h213.3v480H0z"/><path fill="#fff" d="M213.3 0h213.4v480H213.3z"/><path fill="#ce2b37" d="M426.7 0H640v480H426.7z"/></svg>' }
};

// 2. High Quality Translations
const translations = {
  en: {
    title: "How It Works - Complete Guide to CompressImageSize | Free Online Compressor",
    metaDesc: "Learn how CompressImageSize compresses and optimizes JPG, PNG, and WebP images directly in your browser. Detailed user guide, workflow breakdown, tips, and troubleshooting.",
    h1: "How It Works",
    subhead: "Discover how CompressImageSize compresses images 100% in-browser with zero server uploads. Step-by-step user guide, visual comparisons, tips, and troubleshooting.",
    badge: "100% Client-Side Engine • Zero Server Storage",
    breadcrumbHome: "Home",
    navCompressor: "Image Compressor",
    navHow: "How It Works",
    navAbout: "About Us",
    navContact: "Contact Us",
    navPrivacy: "Privacy Policy",
    navTerms: "Terms of Service",
    sec1Heading: "The Complete Process at a Glance",
    sec1Sub: "Follow four simple phases to compress, inspect, and export your photos.",
    quick1Title: "1. Select Images",
    quick1Desc: "Drag and drop up to 500+ JPG, PNG, WebP, GIF, or AVIF files directly into your browser window.",
    quick2Title: "2. In-Memory Compression",
    quick2Desc: "3 parallel Web Workers decode images locally on an HTML5 canvas and strip hidden EXIF metadata.",
    quick3Title: "3. Live Quality Inspection",
    quick3Desc: "Use the real-time quality slider, compare original vs compressed pixels, and check exact file weights.",
    quick4Title: "4. One-Click Download",
    quick4Desc: "Save photos individually in milliseconds, or export your entire compressed batch in a tidy ZIP archive.",
    sec2Heading: "How Simple Is It to Compress Your Files?",
    sec2Sub: "Three effortless steps give you production-ready optimized photos in seconds.",
    step1CardTitle: "Step 1: Upload or Drag Photos",
    step1CardDesc: "Choose single images or large collections from your smartphone, tablet, or PC. No file size restrictions.",
    step2CardTitle: "Step 2: Adjust Quality & Format",
    step2CardDesc: "Slide from 10% to 100% quality or convert JPG/PNG to modern Google WebP for an extra 35% space reduction.",
    step3CardTitle: "Step 3: Instant Download",
    step3CardDesc: "Click to download single files or bundle everything into a ZIP without watermarks or registration.",
    sec3Heading: "Original vs Compressed: See the Difference",
    sec3Sub: "Drag the interactive split handle left and right to inspect fine details and sharpness.",
    badgeOrig: "Original: 3.4 MB",
    badgeComp: "Compressed: 480 KB (-86%)",
    sec4Heading: "Detailed Step-by-Step Instructions",
    sec4Sub: "In-depth guide to maximizing compression ratio while maintaining pristine sharpness.",
    step1Title: "Step 1: Select Your Image Files",
    step1Text: "Drag and drop photos directly from your desktop into the compression drop zone, or tap \"Select Images\" to open your native file picker. We support JPG, JPEG, PNG, WebP, GIF, and AVIF. Batch processing handles up to 500+ photos concurrently.",
    step2Title: "Step 2: Automatic In-Browser Processing",
    step2Text: "The moment files land, three background web workers calculate image dimensions and run perceptual quantization. GPS tags, camera serial numbers, and sensitive EXIF data are automatically stripped for complete privacy.",
    step3Title: "Step 3: Review the Result & Quality",
    step3Text: "Inspect live before-and-after image previews. Switch quality presets (Max Save, Balanced, High Quality, Lossless) or slide to custom target percentages. You can also convert formats to WebP with a single click.",
    step4Title: "Step 4: Download the Result",
    step4Text: "Click the Download button beside each compressed preview card to save individual files, or tap \"Download All (ZIP)\" to download your complete batch in one neat bundle.",
    sec5Heading: "What Happens After You Upload?",
    sec5Sub: "An inside look at our zero-server client-side compression pipeline.",
    tech1Title: "1. Local File Read",
    tech1Desc: "Your files are read locally into JavaScript Uint8Array buffers without sending a single byte across the internet.",
    tech2Title: "2. Canvas Quantization",
    tech2Desc: "The HTML5 2D Canvas decodes pixel data and applies high-efficiency lossy or lossless compression algorithms.",
    tech3Title: "3. EXIF Metadata Removal",
    tech3Desc: "Location coordinates, camera models, and timestamps are stripped to protect your privacy and reduce weight.",
    tech4Title: "4. Instant Export",
    tech4Desc: "Compressed blobs are synthesized into local download URLs or bundled into a ZIP with JSZip entirely in RAM.",
    sec6Heading: "Why Use CompressImageSize?",
    sec6Sub: "Comparing client-side technology against legacy cloud compressors.",
    sec7Heading: "Tips for Getting the Best Compression Results",
    sec7Sub: "Practical advice from web performance experts to achieve optimal balance.",
    sec8Heading: "Common Problems & Quick Solutions",
    sec8Sub: "Troubleshooting common challenges during file optimization.",
    sec9Heading: "Frequently Asked Questions",
    sec9Sub: "Answers to common inquiries regarding privacy, formats, and compression.",
    faq1Q: "Do my photos get uploaded to any external server during compression?",
    faq1A: "No, absolutely not. All compression and format conversion processes execute 100% locally within your device's browser RAM using HTML5 Canvas APIs. No file data is ever transmitted over the network or saved to any cloud server.",
    faq2Q: "What is the recommended quality slider setting for everyday photos?",
    faq2A: "A quality setting between 60% and 75% is the sweet spot for web images, blog articles, and social media. It typically reduces file weight by 60% to 85% while remaining visually indistinguishable from the original to the human eye.",
    faq3Q: "Can I convert images to modern WebP while compressing?",
    faq3A: "Yes. You can keep your original format (Auto) or convert any uploaded JPG, PNG, or GIF into Google WebP with one click, cutting an additional 25% to 35% off file sizes.",
    faq4Q: "Is there a limit on how many images I can compress in one batch?",
    faq4A: "CompressImageSize supports batches from 1 to 500+ images in a single session. The engine utilizes a 3-worker concurrency queue so your browser remains fast, responsive, and crash-free.",
    faq5Q: "Are there any watermarks or hidden charges?",
    faq5A: "None. CompressImageSize is 100% free forever, without watermarks, subscriptions, or login requirements.",
    ctaHeading: "Optimize Your Photos in Seconds",
    ctaSub: "Compress JPG, PNG, and WebP images with 100% in-browser privacy and zero file size limits.",
    ctaBtn: "Start Compressing Now — Free"
  },

  es: {
    title: "Cómo Funciona - Guía Completa de CompressImageSize | Compresor Online Gratis",
    metaDesc: "Aprende cómo CompressImageSize comprime y optimiza imágenes JPG, PNG y WebP directamente en tu navegador. Guía de uso, flujo de trabajo, consejos y preguntas frecuentes.",
    h1: "Cómo Funciona",
    subhead: "Descubre cómo CompressImageSize comprime fotos 100% en tu navegador sin subir archivos a ningún servidor. Guía paso a paso, comparaciones visuales y consejos.",
    badge: "Motor 100% en el Navegador • Cero Almacenamiento en Servidor",
    breadcrumbHome: "Inicio",
    navCompressor: "Comprimir Imágenes",
    navHow: "Cómo Funciona",
    navAbout: "Acerca de",
    navContact: "Contacto",
    navPrivacy: "Política de Privacidad",
    navTerms: "Términos del Servicio",
    sec1Heading: "El Proceso Completo en un Vistazo",
    sec1Sub: "Sigue cuatro sencillas etapas para comprimir, revisar y descargar tus fotos optimizadas.",
    quick1Title: "1. Selecciona Imágenes",
    quick1Desc: "Arrastra y suelta más de 500 fotos en formatos JPG, PNG, WebP, GIF o AVIF directamente a la ventana.",
    quick2Title: "2. Compresión en Memoria",
    quick2Desc: "3 Web Workers procesan las fotos localmente en HTML5 Canvas eliminando metadatos EXIF.",
    quick3Title: "3. Inspección en Vivo",
    quick3Desc: "Ajusta la calidad en tiempo real con el control deslizante y compara píxeles con el visor interactivo.",
    quick4Title: "4. Descarga Inmediata",
    quick4Desc: "Guarda imágenes individualmente en milisegundos o descarga todo el lote comprimido en formato ZIP.",
    sec2Heading: "¿Qué Tan Fácil Es Comprimir Tus Archivos?",
    sec2Sub: "Tres sencillos pasos para obtener fotos de calidad profesional listas para internet.",
    step1CardTitle: "Paso 1: Sube o Arrastra Tus Fotos",
    step1CardDesc: "Selecciona fotos individuales o galerías completas desde tu smartphone o computadora. Sin límites de tamaño.",
    step2CardTitle: "Paso 2: Ajusta Calidad y Formato",
    step2CardDesc: "Mueve el control de 10% a 100% o convierte JPG/PNG a WebP moderno para ahorrar hasta un 35% adicional.",
    step3CardTitle: "Paso 3: Descarga Instantánea",
    step3CardDesc: "Descarga fotos sueltas o todo en un archivo ZIP sin marcas de agua ni necesidad de registrarte.",
    sec3Heading: "Original vs Comprimido: Comprueba la Diferencia",
    sec3Sub: "Arrastra el deslizador central a izquierda y derecha para verificar nitidez y detalles intactos.",
    badgeOrig: "Original: 3.4 MB",
    badgeComp: "Comprimido: 480 KB (-86%)",
    sec4Heading: "Instrucciones Detalladas Paso a Paso",
    sec4Sub: "Manual técnico y práctico para maximizar la reducción de peso conservando una claridad cristalina.",
    step1Title: "Paso 1: Selecciona Tus Archivos de Imagen",
    step1Text: "Arrastra tus fotos al recuadro de compresión o pulsa 'Seleccionar Imágenes' para elegirlas desde tu dispositivo. Es compatible con JPG, JPEG, PNG, WebP, GIF y AVIF en lotes de hasta 500+ fotos.",
    step2Title: "Paso 2: Procesamiento Automático en el Navegador",
    step2Text: "Al cargar las fotos, tres subprocesos ejecutan algoritmos de cuantización perceptiva en la RAM local. Se eliminan automáticamente datos GPS, modelo de cámara y fecha para máxima privacidad.",
    step3Title: "Paso 3: Revisa el Resultado y Ajusta la Calidad",
    step3Text: "Comprueba el porcentaje de reducción en tiempo real. Modifica los perfiles rápidos (Máximo Ahorro, Equilibrado, Alta Calidad) o convierte el formato a WebP con un solo clic.",
    step4Title: "Paso 4: Descarga el Resultado",
    step4Text: "Haz clic en 'Descargar' junto a cada imagen o pulsa 'Descargar Todo (ZIP)' para guardar todo tu lote ordenado en un único archivo comprimido.",
    sec5Heading: "¿Qué Pasa Después de Subir las Imágenes?",
    sec5Sub: "Detalles del motor de compresión local sin envío de datos a servidores externos.",
    tech1Title: "1. Lectura en Memoria Local",
    tech1Desc: "Tus archivos se leen directamente en la memoria RAM del navegador en formato Uint8Array sin salir de tu equipo.",
    tech2Title: "2. Cuantización en Canvas",
    tech2Desc: "El motor HTML5 Canvas procesa los píxeles aplicando reducción de peso altamente optimizada sin pérdida perceptible.",
    tech3Title: "3. Eliminación de Metadatos EXIF",
    tech3Desc: "Se descartan coordenadas GPS y detalles del dispositivo para reducir peso y blindar tu privacidad.",
    tech4Title: "4. Creación del Archivo Final",
    tech4Desc: "Las imágenes procesadas se generan como Blob local y se empaquetan en un archivo ZIP con JSZip.",
    sec6Heading: "¿Por Qué Elegir CompressImageSize?",
    sec6Sub: "Comparativa entre nuestra tecnología 100% en navegador y los compresores basados en servidores.",
    sec7Heading: "Consejos para Lograr la Mejor Compresión",
    sec7Sub: "Recomendaciones de expertos en rendimiento web para equilibrar peso y nitidez.",
    sec8Heading: "Problemas Frecuentes y Soluciones Rápidas",
    sec8Sub: "Respuestas a dudas habituales durante el proceso de compresión.",
    sec9Heading: "Preguntas Frecuentes",
    sec9Sub: "Todo lo que necesitas saber sobre privacidad, compatibilidad y funcionamiento.",
    faq1Q: "¿Mis fotos se suben a algún servidor externo durante la compresión?",
    faq1A: "No, en absoluto. Todo el procesamiento y conversión se realiza 100% en la memoria RAM de tu navegador con HTML5 Canvas. Tus archivos jamás viajan por la red ni se guardan en ningún servidor.",
    faq2Q: "¿Cuál es el ajuste recomendado en el control de calidad?",
    faq2A: "Un valor entre 60% y 75% es ideal para páginas web, redes sociales y blogs. Reduce entre un 60% y 85% del peso manteniéndose visualmente idéntica al original.",
    faq3Q: "¿Puedo convertir imágenes a formato WebP moderno?",
    faq3A: "Sí. Puedes mantener el formato original o convertir cualquier JPG, PNG o GIF a Google WebP con un solo clic, logrando entre 25% y 35% de ahorro adicional.",
    faq4Q: "¿Hay un límite de cuántas fotos puedo comprimir a la vez?",
    faq4A: "Puedes procesar lotes de 1 a más de 500 imágenes por sesión gracias a nuestra cola de 3 Web Workers en paralelo.",
    faq5Q: "¿El servicio añade marcas de agua o cobra en algún momento?",
    faq5A: "No. CompressImageSize es 100% gratis, sin marcas de agua, sin publicidad invasiva y sin registro.",
    ctaHeading: "Optimiza Tus Fotos en Segundos",
    ctaSub: "Comprime imágenes JPG, PNG y WebP con privacidad absoluta y sin restricciones de tamaño.",
    ctaBtn: "Comenzar a Comprimir Gratis"
  },

  fr: {
    title: "Comment ça marche - Guide complet de CompressImageSize | Compresseur gratuit en ligne",
    metaDesc: "Découvrez comment CompressImageSize compresse et optimise les images JPG, PNG et WebP directement dans votre navigateur. Guide complet, étapes et conseils.",
    h1: "Comment ça marche",
    subhead: "Découvrez comment CompressImageSize compresse vos photos à 100% dans votre navigateur, sans aucun envoi vers un serveur. Guide pas à pas, comparatifs et astuces.",
    badge: "Moteur 100% Côté Navigateur • Zéro Stockage Serveur",
    breadcrumbHome: "Accueil",
    navCompressor: "Compresseur d'images",
    navHow: "Comment ça marche",
    navAbout: "À propos",
    navContact: "Contact",
    navPrivacy: "Politique de confidentialité",
    navTerms: "Conditions d'utilisation",
    sec1Heading: "Le processus complet en un coup d'œil",
    sec1Sub: "Suivez quatre étapes simples pour compresser, examiner et télécharger vos images optimisées.",
    quick1Title: "1. Sélectionner les images",
    quick1Desc: "Glissez-déposez plus de 500 fichiers JPG, PNG, WebP, GIF ou AVIF directement dans votre fenêtre.",
    quick2Title: "2. Compression en mémoire",
    quick2Desc: "3 Web Workers traitent les images localement avec HTML5 Canvas et suppriment les données EXIF.",
    quick3Title: "3. Inspection en direct",
    quick3Desc: "Ajustez la qualité en temps réel et comparez les pixels originaux et compressés avec le curseur interactif.",
    quick4Title: "4. Téléchargement instantané",
    quick4Desc: "Enregistrez vos photos individuellement en quelques millisecondes ou téléchargez tout le lot en archive ZIP.",
    sec2Heading: "La simplicité de compression au quotidien",
    sec2Sub: "Trois étapes intuitives pour obtenir des images légères et impeccables.",
    step1CardTitle: "Étape 1 : Déposez vos photos",
    step1CardDesc: "Sélectionnez vos fichiers depuis votre smartphone, tablette ou ordinateur sans limitation de taille.",
    step2CardTitle: "Étape 2 : Réglez qualité et format",
    step2CardDesc: "Ajustez de 10% à 100% ou convertissez vers WebP pour réduire le poids de 35% supplémentaires.",
    step3CardTitle: "Étape 3 : Téléchargement direct",
    step3CardDesc: "Téléchargez immédiatement vos fichiers optimisés, sans filigrane et sans inscription requise.",
    sec3Heading: "Original vs Compressé : Voyez la différence",
    sec3Sub: "Déplacez le curseur de gauche à droite pour vérifier la netteté des détails conservés.",
    badgeOrig: "Original : 3.4 Mo",
    badgeComp: "Compressé : 480 Ko (-86%)",
    sec4Heading: "Instructions détaillées étape par étape",
    sec4Sub: "Guide complet pour maximiser le taux de compression tout en préservant une netteté parfaite.",
    step1Title: "Étape 1 : Choisir vos fichiers images",
    step1Text: "Glissez-déposez vos fichiers ou cliquez sur 'Sélectionner des images'. Prise en charge des formats JPG, PNG, WebP, GIF et AVIF jusqu'à 500+ photos simultanées.",
    step2Title: "Étape 2 : Traitement automatique dans le navigateur",
    step2Text: "Dès l'importation, trois processus parallèles effectuent la quantification dans la mémoire RAM. Les métadonnées GPS et appareil photo sont automatiquement retirées.",
    step3Title: "Étape 3 : Examiner et ajuster la qualité",
    step3Text: "Prévisualisez le gain de poids en direct. Choisissez parmi nos profils prédéfinis ou convertissez en WebP en un clic.",
    step4Title: "Étape 4 : Télécharger vos fichiers",
    step4Text: "Cliquez sur 'Télécharger' à côté de chaque image ou cliquez sur 'Tout télécharger (ZIP)' pour récupérer l'archive complète.",
    sec5Heading: "Que se passe-t-il après le dépôt de vos images ?",
    sec5Sub: "Fonctionnement détaillé de notre technologie 100% locale sans serveur.",
    tech1Title: "1. Lecture en mémoire locale",
    tech1Desc: "Vos images sont chargées dans des tampons mémoire sans qu'aucun octet ne transite sur internet.",
    tech2Title: "2. Quantification Canvas",
    tech2Desc: "L'API Canvas HTML5 décode les pixels et applique une compression ultra-efficace sans dégradation visible.",
    tech3Title: "3. Suppression EXIF",
    tech3Desc: "Les coordonnées GPS et informations privées sont supprimées pour alléger le fichier et protéger votre vie privée.",
    tech4Title: "4. Export immédiat",
    tech4Desc: "Les images compressées sont converties en fichiers locaux et regroupées dans une archive ZIP via JSZip.",
    sec6Heading: "Pourquoi choisir CompressImageSize ?",
    sec6Sub: "Comparatif entre notre traitement dans le navigateur et les anciens compresseurs cloud.",
    sec7Heading: "Conseils pour obtenir la meilleure compression",
    sec7Sub: "Recommandations pratiques pour équilibrer taille de fichier et rendu visuel optimal.",
    sec8Heading: "Problèmes fréquents et solutions rapides",
    sec8Sub: "Réponses aux difficultés courantes lors de l'optimisation de vos photos.",
    sec9Heading: "Foire aux questions",
    sec9Sub: "Toutes les réponses à vos questions sur la confidentialité et les performances.",
    faq1Q: "Mes photos sont-elles envoyées sur un serveur externe ?",
    faq1A: "Non, absolument pas. Tout le traitement s'exécute à 100% localement dans votre navigateur grâce à HTML5 Canvas. Vos photos ne quittent jamais votre appareil.",
    faq2Q: "Quel réglage de qualité est recommandé pour un usage courant ?",
    faq2A: "Un niveau entre 60% et 75% est idéal pour le web, les blogs et les réseaux sociaux. Cela réduit le poids de 60% à 85% sans perte perceptible à l'œil nu.",
    faq3Q: "Puis-je convertir mes images en WebP moderne ?",
    faq3A: "Oui. Vous pouvez conserver le format original ou convertir vos JPG, PNG et GIF en WebP en un clic pour gagner jusqu'à 35% de compression supplémentaire.",
    faq4Q: "Y a-t-il une limite sur le nombre d'images traitées ?",
    faq4A: "CompressImageSize supporte des lots de 1 à plus de 500 images grâce à sa gestion multitâche en 3 Web Workers.",
    faq5Q: "Le service ajoute-t-il des filigranes ou nécessite-t-il un paiement ?",
    faq5A: "Aucun filigrane, aucun abonnement, aucune inscription. C'est 100% gratuit et illimité.",
    ctaHeading: "Optimisez vos photos en quelques secondes",
    ctaSub: "Compressez vos images JPG, PNG et WebP en toute confidentialité et sans limite de taille.",
    ctaBtn: "Commencer à compresser gratuitement"
  },

  de: {
    title: "So funktioniert es - Vollständige Anleitung zu CompressImageSize | Kostenloser Online-Kompressor",
    metaDesc: "Erfahren Sie, wie CompressImageSize JPG-, PNG- und WebP-Bilder direkt im Browser komprimiert und optimiert. Ausführliche Anleitung, Schritte und Tipps.",
    h1: "So funktioniert es",
    subhead: "Erfahren Sie, wie CompressImageSize Bilder zu 100% im Browser ohne Server-Uploads optimiert. Schritt-für-Schritt-Anleitung, Bildvergleiche und nützliche Tipps.",
    badge: "100% Client-seitige Engine • Keine Serverspeicherung",
    breadcrumbHome: "Startseite",
    navCompressor: "Bildkompressor",
    navHow: "So funktioniert es",
    navAbout: "Über uns",
    navContact: "Kontakt",
    navPrivacy: "Datenschutzerklärung",
    navTerms: "Nutzungsbedingungen",
    sec1Heading: "Der gesamte Ablauf im Überblick",
    sec1Sub: "Vier unkomplizierte Phasen zum Komprimieren, Prüfen und Herunterladen Ihrer Fotos.",
    quick1Title: "1. Bilder auswählen",
    quick1Desc: "Ziehen Sie bis zu 500+ JPG-, PNG-, WebP-, GIF- oder AVIF-Dateien direkt in das Browserfenster.",
    quick2Title: "2. Lokale Komprimierung",
    quick2Desc: "3 parallele Web Workers verarbeiten Bilder im RAM über HTML5 Canvas und löschen EXIF-Metadaten.",
    quick3Title: "3. Live-Qualitätsprüfung",
    quick3Desc: "Nutzen Sie den Schieberegler für Qualität und vergleichen Sie Original und Komprimierung im Split-Viewer.",
    quick4Title: "4. Sofortiger Download",
    quick4Desc: "Speichern Sie Fotos einzeln in Millisekunden oder laden Sie das gesamte Paket als ZIP-Datei herunter.",
    sec2Heading: "So einfach komprimieren Sie Ihre Bilder",
    sec2Sub: "Drei mühelose Schritte für web-optimierte Fotos in wenigen Sekunden.",
    step1CardTitle: "Schritt 1: Fotos hochladen oder ablegen",
    step1CardDesc: "Wählen Sie einzelne Fotos oder ganze Alben von PC oder Smartphone ohne Dateigrößenbegrenzung.",
    step2CardTitle: "Schritt 2: Qualität & Format wählen",
    step2CardDesc: "Regeln Sie die Qualität von 10% bis 100% oder wandeln Sie in WebP um, um weitere 35% Speicherplatz zu sparen.",
    step3CardTitle: "Schritt 3: Sofort herunterladen",
    step3CardDesc: "Laden Sie Bilder einzeln oder gesammelt im ZIP-Archiv herunter – ohne Wasserzeichen oder Anmeldung.",
    sec3Heading: "Original vs. Komprimiert: Sehen Sie den Unterschied",
    sec3Sub: "Verschieben Sie den Regler nach links und rechts, um die beibehaltene Schärfe und Details zu prüfen.",
    badgeOrig: "Original: 3.4 MB",
    badgeComp: "Komprimiert: 480 KB (-86%)",
    sec4Heading: "Detaillierte Schritt-für-Schritt-Anleitung",
    sec4Sub: "Praxisorientierter Leitfaden für maximale Dateigrößenreduktion bei perfekter Bildqualität.",
    step1Title: "Schritt 1: Bilddateien auswählen",
    step1Text: "Ziehen Sie Ihre Fotos in das Ablagefeld oder klicken Sie auf 'Bilder auswählen'. Unterstützt JPG, JPEG, PNG, WebP, GIF und AVIF bis zu 500+ Bildern gleichzeitig.",
    step2Title: "Schritt 2: Automatische Verarbeitung im Browser",
    step2Text: "Sobald die Bilder geladen sind, quantisieren drei Hintergrund-Webworker die Bildpunkte im lokalen RAM. GPS-Koordinaten und Kameradaten werden automatisch entfernt.",
    step3Title: "Schritt 3: Ergebnis & Qualität überprüfen",
    step3Text: "Betrachten Sie die Live-Vorschau der Dateigrößen. Wählen Sie Presets (Maximales Sparen, Ausgewogen, Hohe Qualität) oder konvertieren Sie mit einem Klick zu WebP.",
    step4Title: "Schritt 4: Ergebnis herunterladen",
    step4Text: "Klicken Sie auf 'Herunterladen' neben jeder Datei oder auf 'Alles herunterladen (ZIP)', um das gesamte Paket gebündelt zu speichern.",
    sec5Heading: "Was passiert nach dem Hochladen?",
    sec5Sub: "Ein Blick auf unsere rein lokale, serverlose Komprimierungstechnologie.",
    tech1Title: "1. Lokales Einlesen",
    tech1Desc: "Ihre Bilddateien werden als Uint8Array direkt im RAM gelesen, ohne ein einziges Byte über das Internet zu senden.",
    tech2Title: "2. Canvas-Quantisierung",
    tech2Desc: "Die HTML5 2D Canvas decodiert Bildpunkte und wendet hocheffiziente Algorithmen ohne sichtbaren Qualitätsverlust an.",
    tech3Title: "3. Entfernung von EXIF-Daten",
    tech3Desc: "Standortangaben und Gerätedaten werden vollständig gelöscht, um Speicherplatz zu sparen und die Privatsphäre zu schützen.",
    tech4Title: "4. Sofortiger Export",
    tech4Desc: "Komprimierte Blobs werden lokal bereitgestellt oder mit JSZip ohne Cloud-Umweg in ein ZIP-Archiv gepackt.",
    sec6Heading: "Warum CompressImageSize nutzen?",
    sec6Sub: "Vorteile browserbasierter Bildoptimierung im Vergleich zu herkömmlichen Cloud-Lösungen.",
    sec7Heading: "Tipps für beste Komprimierungsergebnisse",
    sec7Sub: "Praktische Empfehlungen zur perfekten Balance aus Dateigröße und Schärfe.",
    sec8Heading: "Häufige Probleme & Schnelle Lösungen",
    sec8Sub: "Hilfestellungen bei typischen Fragen zur Bildverarbeitung.",
    sec9Heading: "Häufig gestellte Fragen (FAQ)",
    sec9Sub: "Wichtige Antworten zu Datenschutz, Formaten und Funktionsweise.",
    faq1Q: "Werden meine Bilder auf externe Server hochgeladen?",
    faq1A: "Nein, keinesfalls. Die gesamte Bildverarbeitung und Formatkonvertierung läuft zu 100% lokal im Browser-RAM über HTML5 Canvas. Es werden keine Daten übertragen.",
    faq2Q: "Welche Qualitätseinstellung wird für Alltagsbilder empfohlen?",
    faq2A: "Ein Qualitätswert zwischen 60% und 75% ist der ideale Kompromiss für Webseiten und soziale Medien. Die Dateigröße sinkt um 60% bis 85% bei unverminderter Schärfe.",
    faq3Q: "Kann ich Bilder während der Komprimierung in WebP umwandeln?",
    faq3A: "Ja. Sie können das Ursprungsformat beibehalten oder JPG, PNG und GIF mit einem Klick in modernes Google WebP umwandeln.",
    faq4Q: "Gibt es ein Limit für die Anzahl gleichzeitiger Bilder?",
    faq4A: "CompressImageSize verarbeitet problemlos 1 bis über 500 Bilder pro Sitzung dank paralleler Web-Worker.",
    faq5Q: "Fügt das Tool Wasserzeichen hinzu oder entstehen Kosten?",
    faq5A: "Nein. CompressImageSize ist dauerhaft 100% kostenlos, werbefrei und erfordert keine Registrierung.",
    ctaHeading: "Optimieren Sie Ihre Bilder in Sekundenschnelle",
    ctaSub: "Komprimieren Sie JPG-, PNG- und WebP-Bilder mit 100% Privatsphäre und ohne Größenlimits.",
    ctaBtn: "Jetzt kostenlos komprimieren"
  },

  pt: {
    title: "Como Funciona - Guia Completo do CompressImageSize | Compressor Online Grátis",
    metaDesc: "Saiba como o CompressImageSize comprime e otimiza imagens JPG, PNG e WebP diretamente no navegador. Guia passo a passo, fluxo de trabalho e dicas úteis.",
    h1: "Como Funciona",
    subhead: "Descubra como o CompressImageSize otimiza imagens 100% no seu navegador sem enviar arquivos para servidores. Guia passo a passo, comparações e dicas.",
    badge: "Motor 100% no Navegador • Zero Armazenamento em Servidor",
    breadcrumbHome: "Início",
    navCompressor: "Comprimir Imagens",
    navHow: "Como Funciona",
    navAbout: "Sobre Nós",
    navContact: "Contato",
    navPrivacy: "Política de Privacidade",
    navTerms: "Termos de Serviço",
    sec1Heading: "O Processo Completo em um Vistazo",
    sec1Sub: "Quatro etapas simples para comprimir, inspecionar e baixar suas imagens otimizadas.",
    quick1Title: "1. Selecionar Imagens",
    quick1Desc: "Arraste e solte mais de 500 fotos JPG, PNG, WebP, GIF ou AVIF direto no navegador.",
    quick2Title: "2. Compressão em Memória",
    quick2Desc: "3 Web Workers paralelos processam as fotos no HTML5 Canvas e eliminam metadados EXIF.",
    quick3Title: "3. Inspeção ao Vivo",
    quick3Desc: "Ajuste o controle deslizante de qualidade em tempo real e compare com o visualizador dividido.",
    quick4Title: "4. Download Instantâneo",
    quick4Desc: "Baixe fotos individuais em milissegundos ou o lote completo em um arquivo ZIP limpo.",
    sec2Heading: "A Simplicidade de Comprimir Seus Arquivos",
    sec2Sub: "Três passos rápidos para gerar imagens com peso ideal para sites e redes sociais.",
    step1CardTitle: "Passo 1: Envie ou Arraste Fotos",
    step1CardDesc: "Selecione fotos do seu celular ou computador sem qualquer limite de tamanho de arquivo.",
    step2CardTitle: "Passo 2: Ajuste Qualidade e Formato",
    step2CardDesc: "Alterne entre 10% e 100% de qualidade ou converta para WebP moderno para economizar até 35% a mais.",
    step3CardTitle: "Passo 3: Baixe Imediatamente",
    step3CardDesc: "Salve imagens separadas ou todas juntas em um ZIP sem marcas d'água nem cadastro.",
    sec3Heading: "Original vs Comprimido: Veja a Diferença",
    sec3Sub: "Arraste o divisor interativo para os lados para inspecionar nitidez e fidelidade de cores.",
    badgeOrig: "Original: 3.4 MB",
    badgeComp: "Comprimido: 480 KB (-86%)",
    sec4Heading: "Instruções Passo a Passo Detalhadas",
    sec4Sub: "Manual completo para maximizar a economia de espaço preservando nitidez visual total.",
    step1Title: "Passo 1: Selecione Seus Arquivos de Imagem",
    step1Text: "Arraste imagens para a área de upload ou clique em 'Selecionar Imagens'. Suporte a JPG, PNG, WebP, GIF e AVIF em lotes de até mais de 500 arquivos simultâneos.",
    step2Title: "Passo 2: Processamento Automático no Navegador",
    step2Text: "Seus arquivos são decodificados na memória RAM local por 3 workers em segundo plano. Dados de GPS, fabricante e metadados ocultos são removidos.",
    step3Title: "Passo 3: Revise o Resultado e Ajuste a Qualidade",
    step3Text: "Veja o tamanho final estimado em tempo real. Alterne presets de qualidade ou ative a conversão para formato WebP com um clique.",
    step4Title: "Passo 4: Baixe Suas Imagens",
    step4Text: "Clique em 'Baixar' ao lado de cada arquivo ou no botão 'Baixar Tudo (ZIP)' para salvar todo o pacote comprimido de uma só vez.",
    sec5Heading: "O Que Acontece Após Selecionar as Fotos?",
    sec5Sub: "Entenda o funcionamento da tecnologia sem envio para nuvem.",
    tech1Title: "1. Leitura em Memória Local",
    tech1Desc: "Os arquivos são lidos como buffers Uint8Array na memória sem transmissão externa de rede.",
    tech2Title: "2. Quantização no Canvas",
    tech2Desc: "O HTML5 Canvas renderiza e quantiza pixels mantendo detalhes visuais impecáveis.",
    tech3Title: "3. Limpeza de Metadados EXIF",
    tech3Desc: "Coordenadas de localização e registros do aparelho são excluídos para máxima segurança.",
    tech4Title: "4. Geração Instantânea",
    tech4Desc: "Os blobs otimizados são compilados na hora em links de download e empacotados com JSZip.",
    sec6Heading: "Por Que Usar o CompressImageSize?",
    sec6Sub: "Vantagens da privacidade local em comparação a compressores tradicionais em nuvem.",
    sec7Heading: "Dicas Para Obter os Melhores Resultados",
    sec7Sub: "Orientações práticas para obter o equilíbrio ideal entre peso e qualidade.",
    sec8Heading: "Dúvidas Frequentes e Soluções Rápidas",
    sec8Sub: "Respostas para situações comuns durante a otimização de imagens.",
    sec9Heading: "Perguntas Frequentes (FAQ)",
    sec9Sub: "Tudo o que você precisa saber sobre segurança, formatos e compressão.",
    faq1Q: "Minhas fotos são enviadas para algum servidor externo?",
    faq1A: "Não, jamais. Todo o processamento ocorre 100% dentro do seu navegador na memória RAM via HTML5 Canvas. Nenhum dado é transmitido para servidores.",
    faq2Q: "Qual é o valor recomendado no controle deslizante de qualidade?",
    faq2A: "Entre 60% e 75% é o ponto ideal para blogs, lojas virtuais e redes sociais, reduzindo de 60% a 85% do tamanho sem perda visual perceptível.",
    faq3Q: "Posso converter imagens para o formato WebP?",
    faq3A: "Sim. Você pode manter o formato original ou transformar JPG, PNG e GIF em WebP do Google com um clique.",
    faq4Q: "Existe um limite para a quantidade de fotos por vez?",
    faq4A: "O CompressImageSize suporta de 1 a mais de 500 imagens por sessão de forma ágil e fluida.",
    faq5Q: "Há marcas d'água ou cobranças escondidas?",
    faq5A: "Não. É 100% gratuito, sem marcas d'água e sem necessidade de criar conta.",
    ctaHeading: "Otimize Suas Fotos em Segundos",
    ctaSub: "Comprima fotos JPG, PNG e WebP com privacidade absoluta e sem limites de tamanho.",
    ctaBtn: "Comece a Comprimir Grátis"
  },

  it: {
    title: "Come Funziona - Guida Completa a CompressImageSize | Compressore Online Gratuito",
    metaDesc: "Scopri come CompressImageSize comprime e ottimizza immagini JPG, PNG e WebP direttamente nel browser. Guida dettagliata, passaggi e domande frequenti.",
    h1: "Come Funziona",
    subhead: "Scopri come CompressImageSize ottimizza le immagini al 100% nel tuo browser senza inviare file a server esterni. Guida dettagliata, confronti e consigli utili.",
    badge: "Motore 100% nel Browser • Zero Archiviazione su Server",
    breadcrumbHome: "Home",
    navCompressor: "Comprimi Immagini",
    navHow: "Come Funziona",
    navAbout: "Chi Siamo",
    navContact: "Contatti",
    navPrivacy: "Informativa Privacy",
    navTerms: "Termini di Servizio",
    sec1Heading: "Il Processo Completo a Colpo d'Occhio",
    sec1Sub: "Segui quattro semplici passaggi per comprimere, visualizzare e scaricare le tue foto.",
    quick1Title: "1. Seleziona le Immagini",
    quick1Desc: "Trascina oltre 500 immagini JPG, PNG, WebP, GIF o AVIF direttamente nella finestra del browser.",
    quick2Title: "2. Compressione in Memoria",
    quick2Desc: "3 Web Worker elaborano i file localmente con HTML5 Canvas eliminando i dati sensibili EXIF.",
    quick3Title: "3. Ispezione in Tempo Reale",
    quick3Desc: "Regola la qualità con lo slider interattivo e confronta i pixel originali con quelli compressi.",
    quick4Title: "4. Download Immediato",
    quick4Desc: "Salva i singoli file in pochi millisecondi oppure scarica l'intero archivio raggruppato in ZIP.",
    sec2Heading: "La Massima Semplicità per Comprimere i Tuoi File",
    sec2Sub: "Tre passaggi veloci per avere immagini leggere pronte per il web.",
    step1CardTitle: "Passo 1: Carica o Trascina le Foto",
    step1CardDesc: "Scegli singole foto o intere cartelle dal computer o dallo smartphone senza limiti di dimensione.",
    step2CardTitle: "Passo 2: Regola Qualità e Formato",
    step2CardDesc: "Imposta la qualità dal 10% al 100% o converti in WebP per risparmiare un ulteriore 35% di spazio.",
    step3CardTitle: "Passo 3: Scarica Istantaneamente",
    step3CardDesc: "Scarica file singoli o l'intero pacchetto in archivio ZIP, senza watermark né registrazione.",
    sec3Heading: "Originale vs Compresso: Guarda la Differenza",
    sec3Sub: "Trascina il divisore verso destra e sinistra per esaminare la nitidezza e la fedeltà dei dettagli.",
    badgeOrig: "Originale: 3.4 MB",
    badgeComp: "Compresso: 480 KB (-86%)",
    sec4Heading: "Istruzioni Dettagliate Passo dopo Passo",
    sec4Sub: "Guida completa per ridurre il peso delle immagini garantendo la massima nitidezza visiva.",
    step1Title: "Passo 1: Seleziona i File Immagine",
    step1Text: "Trascina i tuoi file nel riquadro o clicca su 'Seleziona Immagini'. Supporta file JPG, JPEG, PNG, WebP, GIF e AVIF fino a oltre 500 immagini per sessione.",
    step2Title: "Passo 2: Elaborazione Automatica nel Browser",
    step2Text: "Al caricamento, tre worker paralleli eseguono algoritmi di quantizzazione nella RAM locale. Le coordinate GPS e i metadati EXIF vengono eliminati per la privacy.",
    step3Title: "Passo 3: Verifica Risultato e Qualità",
    step3Text: "Osserva la riduzione di peso in tempo reale. Seleziona un profilo rapido o converti in formato Google WebP con un solo clic.",
    step4Title: "Passo 4: Scarica le Immagini",
    step4Text: "Clicca su 'Scarica' accanto a ciascuna immagine oppure premi 'Scarica Tutto (ZIP)' per scaricare l'intero archivio.",
    sec5Heading: "Cosa Accade Dietro le Quinte?",
    sec5Sub: "Dettagli del nostro motore di elaborazione locale senza trasferimenti su cloud.",
    tech1Title: "1. Lettura in Memoria Locale",
    tech1Desc: "I file vengono decodificati direttamente nei buffer di memoria del browser senza comunicazioni esterne.",
    tech2Title: "2. Quantizzazione su Canvas",
    tech2Desc: "L'API Canvas HTML5 riduce la densità dei dati preservando la qualità percettiva dell'occhio umano.",
    tech3Title: "3. Rimozione Metadati EXIF",
    tech3Desc: "I dettagli della fotocamera e la geolocalizzazione vengono cancellati per la tua sicurezza.",
    tech4Title: "4. Esportazione Immediata",
    tech4Desc: "Le immagini ottimizzate vengono create localmente e impacchettate con JSZip in formato ZIP.",
    sec6Heading: "Perché Scegliere CompressImageSize?",
    sec6Sub: "Vantaggi del sistema locale nel browser rispetto ai vecchi compressori su server.",
    sec7Heading: "Consigli per Risultati Ottimali",
    sec7Sub: "Suggerimenti pratici per bilanciare compressione e fedeltà visiva.",
    sec8Heading: "Problemi Comuni e Soluzioni Rapide",
    sec8Sub: "Guida alla risoluzione dei dubbi più frequenti durante l'uso.",
    sec9Heading: "Domande Frequenti (FAQ)",
    sec9Sub: "Tutte le risposte sulla sicurezza, i formati supportati e il funzionamento.",
    faq1Q: "Le mie foto vengono caricate su server esterni?",
    faq1A: "No, assolutamente no. Tutta l'elaborazione avviene localmente nella RAM del tuo browser tramite HTML5 Canvas. Nessun dato viene trasmesso online.",
    faq2Q: "Quale impostazione di qualità è consigliata?",
    faq2A: "Un livello compreso tra il 60% e il 75% è perfetto per blog, siti e social network, riducendo le dimensioni dal 60% all'85% senza differenze visibili.",
    faq3Q: "Posso convertire le immagini in formato WebP?",
    faq3A: "Sì. Puoi mantenere il formato di origine oppure convertire JPG, PNG e GIF in formato WebP per un ulteriore risparmio.",
    faq4Q: "C'è un limite al numero di immagini per sessione?",
    faq4A: "Puoi comprimere da 1 a oltre 500 immagini contemporaneamente grazie al motore multi-thread a 3 worker.",
    faq5Q: "Il servizio inserisce filigrane o richiede un pagamento?",
    faq5A: "Nessuna filigrana, nessun abbonamento e nessuna registrazione. È 100% gratuito per sempre.",
    ctaHeading: "Ottimizza le Tue Immagini in Pochi Secondi",
    ctaSub: "Riduci le dimensioni di foto JPG, PNG e WebP in totale privacy e senza limiti di dimensione.",
    ctaBtn: "Inizia a Comprimere Gratis"
  },

  ru: {
    title: "Как это работает - Полное руководство CompressImageSize | Бесплатный компрессор",
    metaDesc: "Узнайте, как CompressImageSize сжимает и оптимизирует изображения JPG, PNG и WebP прямо в браузере. Пошаговое руководство, советы и частые вопросы.",
    h1: "Как это работает",
    subhead: "Узнайте, как CompressImageSize сжимает изображения на 100% в браузере без отправки на серверы. Пошаговая инструкция, сравнение качества и полезные советы.",
    badge: "100% Локальный движок • Без сохранения на сервере",
    breadcrumbHome: "Главная",
    navCompressor: "Сжатие изображений",
    navHow: "Как это работает",
    navAbout: "О нас",
    navContact: "Контакты",
    navPrivacy: "Политика конфиденциальности",
    navTerms: "Условия использования",
    sec1Heading: "Весь процесс в четырех шагах",
    sec1Sub: "Четыре простых этапа для сжатия, проверки и загрузки оптимизированных фото.",
    quick1Title: "1. Выбор файлов",
    quick1Desc: "Перетащите до 500+ файлов JPG, PNG, WebP, GIF или AVIF прямо в окно браузера.",
    quick2Title: "2. Сжатие в оперативной памяти",
    quick2Desc: "3 фоновых Web Worker обрабатывают изображения в Canvas и удаляют данные EXIF.",
    quick3Title: "3. Проверка качества в реальном времени",
    quick3Desc: "Настраивайте ползунок качества и сравнивайте пиксели оригинального и сжатого файлов.",
    quick4Title: "4. Скачивание в один клик",
    quick4Desc: "Сохраняйте фото по отдельности за миллисекунды или скачайте весь пакет в архиве ZIP.",
    sec2Heading: "Насколько просто сжимать изображения?",
    sec2Sub: "Три понятных действия для получения оптимизированных фотографий за секунды.",
    step1CardTitle: "Шаг 1: Загрузите или перетащите фото",
    step1CardDesc: "Выбирайте одиночные снимки или папки со смартфона или ПК без ограничений по размеру.",
    step2CardTitle: "Шаг 2: Настройте качество и формат",
    step2CardDesc: "Регулируйте ползунок от 10% до 100% или конвертируйте в WebP для экономии еще 35% веса.",
    step3CardTitle: "Шаг 3: Мгновенное скачивание",
    step3CardDesc: "Скачивайте файлы поштучно или одним архивом ZIP без водяных знаков и регистрации.",
    sec3Heading: "Оригинал против Сжатого: Оцените разницу",
    sec3Sub: "Перемещайте разделитель влево и вправо, чтобы убедиться в сохранении четкости и цветов.",
    badgeOrig: "Оригинал: 3.4 МБ",
    badgeComp: "Сжато: 480 КБ (-86%)",
    sec4Heading: "Подробная пошаговая инструкция",
    sec4Sub: "Практическое руководство по максимальному сжатию файлов при сохранении отличного качества.",
    step1Title: "Шаг 1: Выберите файлы изображений",
    step1Text: "Перетащите фото в область загрузки или нажмите 'Выбрать изображения'. Сервис поддерживает JPG, JPEG, PNG, WebP, GIF и AVIF пакетами до 500+ фото одновременно.",
    step2Title: "Шаг 2: Автоматическая обработка в браузере",
    step2Text: "Сразу после добавления файлов три веб-воркера запускают квантование в памяти браузера. Данные геолокации GPS и сведения о камере удаляются автоматически.",
    step3Title: "Шаг 3: Проверка результатов и настройка качества",
    step3Text: "Смотрите точный расчет размера файла на лету. Выбирайте готовые пресеты или переводите файлы в современный формат WebP в один клик.",
    step4Title: "Шаг 4: Скачивание готовых файлов",
    step4Text: "Нажмите 'Скачать' рядом с нужным фото или воспользуйтесь кнопкой 'Скачать все (ZIP)', чтобы получить полный архив.",
    sec5Heading: "Что происходит внутри браузера?",
    sec5Sub: "Принцип работы локального алгоритма сжатия без отправки данных в облако.",
    tech1Title: "1. Чтение в оперативной памяти",
    tech1Desc: "Файлы преобразуются в буфер Uint8Array локально, ни один байт не передается через интернет.",
    tech2Title: "2. Квантование на Canvas",
    tech2Desc: "HTML5 2D Canvas оптимизирует плотность пикселей с максимальным сохранением визуальной четкости.",
    tech3Title: "3. Удаление метаданных EXIF",
    tech3Desc: "Координаты съемки и скрытые технические теги удаляются для безопасности и легкости файла.",
    tech4Title: "4. Быстрый экспорт",
    tech4Desc: "Готовые Blob-файлы формируются локально и архивируются с помощью библиотеки JSZip.",
    sec6Heading: "Почему именно CompressImageSize?",
    sec6Sub: "Сравнение преимуществ браузерной обработки перед классическими облачными сервисами.",
    sec7Heading: "Советы для наилучшего сжатия",
    sec7Sub: "Проверенные рекомендации для идеального баланса между весом и качеством.",
    sec8Heading: "Частые проблемы и простые решения",
    sec8Sub: "Ответы на распространенные вопросы при обработке изображений.",
    sec9Heading: "Часто задаваемые вопросы (FAQ)",
    sec9Sub: "Все о безопасности, форматах и технологиях сжатия.",
    faq1Q: "Загружаются ли мои фото на сторонние серверы?",
    faq1A: "Нет, ни в коем случае. Весь процесс сжатия и конвертации происходит на 100% локально в браузере через HTML5 Canvas. Файлы никогда не покидают ваше устройство.",
    faq2Q: "Какой уровень качества лучше всего выбрать?",
    faq2A: "Оптимальное значение — от 60% до 75%. Оно уменьшает вес файла на 60–85% без видимой глазу потери четкости.",
    faq3Q: "Можно ли конвертировать фото в современный WebP?",
    faq3A: "Да. Вы можете оставить исходный формат или перевести любой JPG, PNG или GIF в WebP в один клик для дополнительной экономии.",
    faq4Q: "Есть ли лимит на количество фото в одной партии?",
    faq4A: "Сервис легко обрабатывает от 1 до 500+ изображений за сессию благодаря трем параллельным потокам.",
    faq5Q: "Добавляются ли водяные знаки или скрытые платежи?",
    faq5A: "Нет. CompressImageSize полностью бесплатен, не накладывает водяных знаков и не требует регистрации.",
    ctaHeading: "Оптимизируйте ваши фото за секунды",
    ctaSub: "Сжимайте изображения JPG, PNG и WebP с абсолютной приватностью и без ограничений размера.",
    ctaBtn: "Начать сжатие бесплатно"
  },

  zh: {
    title: "使用教程与工作原理 - CompressImageSize 完整指南 | 免费在线图片压缩",
    metaDesc: "了解 CompressImageSize 如何直接在浏览器中高效压缩和优化 JPG、PNG 和 WebP 图片。详细操作指南、技术流程说明与常见问题解答。",
    h1: "使用教程与工作原理",
    subhead: "无需上传服务器，100% 纯本地浏览器内存快速压缩图片。包含详细步骤、画质对比与实用技巧。",
    badge: "100% 纯浏览器本地处理 • 零服务器存储",
    breadcrumbHome: "首页",
    navCompressor: "图片压缩工具",
    navHow: "使用教程",
    navAbout: "关于我们",
    navContact: "联系我们",
    navPrivacy: "隐私政策",
    navTerms: "服务条款",
    sec1Heading: "一目了然的操作流程",
    sec1Sub: "仅需简单四步，即可轻松完成图片压缩、画质比对与批量导出。",
    quick1Title: "1. 选取图片",
    quick1Desc: "直接拖拽多达 500+ 张 JPG、PNG、WebP、GIF 或 AVIF 格式图片至浏览器中。",
    quick2Title: "2. 内存疾速压缩",
    quick2Desc: "3 个并发 Web Worker 利用 HTML5 Canvas 本地解码并自动剔除敏感 EXIF 元数据。",
    quick3Title: "3. 实时画质比对",
    quick3Desc: "自由调节质量滑块，借助交互式滑动条实时对比原图与压缩图的像素细节。",
    quick4Title: "4. 一键极速下载",
    quick4Desc: "毫秒级单独保存各张图片，或将所有压缩好的文件一键打包为 ZIP 压缩包下载。",
    sec2Heading: "压缩图片究竟有多简单？",
    sec2Sub: "无需繁琐设置，3 个步骤即可产出适用于网页与社交媒体的高清小体积图片。",
    step1CardTitle: "第 1 步：上传或拖放照片",
    step1CardDesc: "支持从手机或电脑添加单张或大批量图片，没有任何文件体积限制。",
    step2CardTitle: "第 2 步：调整质量与格式",
    step2CardDesc: "在 10% 至 100% 之间滑动调节，或一键转为现代化 WebP 格式额外节省 35% 空间。",
    step3CardTitle: "第 3 步：即刻保存下载",
    step3CardDesc: "单独下载或一键打包 ZIP 下载，无水印、无需登录注册、终身完全免费。",
    sec3Heading: "原图与压缩图对比：清晰可见的优势",
    sec3Sub: "左右拖动中间滑块，亲眼见证在大幅瘦身的同时保持锐利清晰的画面细节。",
    badgeOrig: "原图: 3.4 MB",
    badgeComp: "压缩后: 480 KB (-86%)",
    sec4Heading: "详尽分步操作指引",
    sec4Sub: "助您在显著缩减文件体积的同时保留完美画质的专业技巧。",
    step1Title: "第 1 步：选择您的图片文件",
    step1Text: "将照片直接拖拽至页面虚线框，或点击'选择图片'按钮选取。全面支持 JPG、PNG、WebP、GIF 和 AVIF，单次最高支持 500+ 张批量并发处理。",
    step2Title: "第 2 步：浏览器全自动本地处理",
    step2Text: "图片载入后，后台多线程在本地内存中即时执行感知量化算法，并自动抹除 GPS 地理定位和相机参数等私密数据。",
    step3Title: "第 3 步：实时预览与质量微调",
    step3Text: "实时查看预计瘦身体积。可快速选择预设方案（极佳省流、均衡、高质量），也可随时一键转为 WebP 格式。",
    step4Title: "第 4 步：快速导出下载",
    step4Text: "点击每张图片下方的'下载'按钮保存单个文件，或点击'打包下载全部(ZIP)'一次性保存整个图包。",
    sec5Heading: "图片载入后究竟发生了什么？",
    sec5Sub: "揭秘纯本地端零服务器上传的压缩技术内幕。",
    tech1Title: "1. 纯本地内存读取",
    tech1Desc: "利用 JavaScript Uint8Array 在本地内存中高速解析，无需消耗任何网络上传流量。",
    tech2Title: "2. Canvas 智能量化",
    tech2Desc: "借助 HTML5 2D Canvas 高效重构像素色彩，在人眼无法察觉的前提下大幅剔除冗余数据。",
    tech3Title: "3. 剥离 EXIF 隐私数据",
    tech3Desc: "彻底清除拍摄时间、地理坐标与设备型号，既保护个人隐私又精简体积。",
    tech4Title: "4. 本地极速封装",
    tech4Desc: "压缩后的数据直接生成本地 Blob 链接，并由 JSZip 库在内存中秒速完成 ZIP 打包。",
    sec6Heading: "为什么选择 CompressImageSize？",
    sec6Sub: "对比传统云端上传压缩工具与现代浏览器纯本地技术的核心优势。",
    sec7Heading: "获取最佳压缩效果的实用技巧",
    sec7Sub: "网页性能优化专家推荐的黄金平衡法则。",
    sec8Heading: "常见疑问与快捷解答",
    sec8Sub: "处理图片时可能遇到的疑问与解决方案。",
    sec9Heading: "常见问题解答 (FAQ)",
    sec9Sub: "关于隐私安全、支持格式与压缩效果的权威解答。",
    faq1Q: "我的图片会被上传到任何外部服务器吗？",
    faq1A: "绝对不会。所有压缩和格式转换均 100% 在您的设备浏览器本地内存中完成。任何文件数据都不会经过网络传输，也不会存留在云端。",
    faq2Q: "推荐将质量滑块调节到多少最合适？",
    faq2A: "一般推荐设置为 60% 至 75%。这是网页、文章配图及社交平台的黄金平衡点，通常可减少 60% 至 85% 体积且肉眼看不出画质差异。",
    faq3Q: "压缩时可以将图片转换成现代 WebP 格式吗？",
    faq3A: "当然可以。您可以保留原格式，也可以一键将 JPG、PNG 或 GIF 转换为 Google WebP 格式，进一步节省 25% 到 35% 空间。",
    faq4Q: "单次批量压缩有文件数量限制吗？",
    faq4A: "CompressImageSize 单次会话支持同时处理 1 至 500+ 张图片，多线程并发队列确保流畅稳定不卡顿。",
    faq5Q: "工具会添加水印或收取任何费用吗？",
    faq5A: "没有任何水印，没有隐藏收费，无需注册登录，100% 永久免费使用。",
    ctaHeading: "数秒内轻松搞定图片优化",
    ctaSub: "安全、私密、极速压缩 JPG、PNG 和 WebP 图片，无任何体积限制。",
    ctaBtn: "立即免费开始压缩"
  },

  ja: {
    title: "使い方と仕組み - CompressImageSize 完全ガイド | 無料オンライン画像圧縮",
    metaDesc: "CompressImageSize がブラウザ内で JPG、PNG、WebP 画像を高速かつ安全に圧縮・最適化する仕組みを解説。詳細な使い方ガイドとFAQ。",
    h1: "使い方と仕組み",
    subhead: "サーバーへのアップロード不要。ブラウザ内で完結する安全な画像圧縮のステップ解説、画質比較、お役立ちヒント。",
    badge: "100% ブラウザ内ローカル処理 • サーバー保存ゼロ",
    breadcrumbHome: "ホーム",
    navCompressor: "画像圧縮ツール",
    navHow: "使い方と仕組み",
    navAbout: "当サイトについて",
    navContact: "お問い合わせ",
    navPrivacy: "プライバシーポリシー",
    navTerms: "利用規約",
    sec1Heading: "処理の流れをひと目で確認",
    sec1Sub: "4つのシンプルなステップで画像の圧縮、品質確認、書き出しが完了します。",
    quick1Title: "1. 画像を選択",
    quick1Desc: "最大500枚以上の JPG、PNG、WebP、GIF、AVIF 画像をブラウザにドラッグ＆ドロップ。",
    quick2Title: "2. メモリ内ローカル圧縮",
    quick2Desc: "3つの Web Worker が HTML5 Canvas 上で局所処理し、不要な EXIF データを自動削除。",
    quick3Title: "3. リアルタイム品質確認",
    quick3Desc: "スライダーで品質を微調整しながら、分割スライダーで原画と圧縮後の画質を即座に比較。",
    quick4Title: "4. ワンクリック保存",
    quick4Desc: "個別画像をミリ秒単位で素早く保存するか、まとめて ZIP 形式で一括ダウンロード。",
    sec2Heading: "こんなに簡単な画像圧縮",
    sec2Sub: "わずか3つの直感的な操作で、Web や SNS に最適な高画質・軽量画像が完成します。",
    step1CardTitle: "ステップ 1: 画像をアップロードまたはドロップ",
    step1CardDesc: "スマホやパソコンから写真を追加。ファイルサイズの上限はありません。",
    step2CardTitle: "ステップ 2: 画質とフォーマットを調整",
    step2CardDesc: "10%〜100% の品質調整や、最新の WebP への変換でさらに35%の容量削減が可能。",
    step3CardTitle: "ステップ 3: すぐにダウンロード",
    step3CardDesc: "透かし（ウォーターマーク）なし、会員登録不要で ZIP または個別保存が可能です。",
    sec3Heading: "オリジナル vs 圧縮後：圧倒的な品質維持",
    sec3Sub: "中央のスライダーを左右に動かして、微細なディテールが損なわれていないか確認してください。",
    badgeOrig: "元画像: 3.4 MB",
    badgeComp: "圧縮後: 480 KB (-86%)",
    sec4Heading: "詳しい操作手順ガイド",
    sec4Sub: "画質の劣化を最小限に抑えつつファイルサイズを極限まで縮小するプロの技。",
    step1Title: "ステップ 1: 画像ファイルを選択する",
    step1Text: "ファイルを枠内にドロップするか「画像を選択」をクリック。JPG、PNG、WebP、GIF、AVIF に対応し、一度に500枚以上の同時処理が可能です。",
    step2Title: "ステップ 2: ブラウザ内での自動最適化",
    step2Text: "画像が追加されると、3基のバックグラウンドワーカーがローカルメモリ上で即座に処理を実行。GPS等の位置情報もプライバシー保護のため自動除去されます。",
    step3Title: "ステップ 3: 結果のプレビューと品質調整",
    step3Text: "リアルタイムで削減率を確認可能。クイックプリセットを選んだり、Google WebP への変換もワンクリックで行えます。",
    step4Title: "ステップ 4: 最適化された画像を保存",
    step4Text: "画像ごとの「ダウンロード」ボタンを押すか、「すべてダウンロード (ZIP)」をクリックして一括保存します。",
    sec5Heading: "アップロード後の内部処理はどうなっているの？",
    sec5Sub: "サーバーに一切データを送信しないローカル処理の仕組み。",
    tech1Title: "1. ローカルメモリ読み込み",
    tech1Desc: "画像データはブラウザの RAM 内で Uint8Array として読み取られ、外部通信は一切発生しません。",
    tech2Title: "2. Canvas 量子化",
    tech2Desc: "HTML5 Canvas API がピクセルデータを解析し、人間の目に識別できない不要な色彩情報をカットします。",
    tech3Title: "3. EXIF データの削除",
    tech3Desc: "撮影日時や位置情報などの機密データを自動で除去し、軽量化と安全性向上を実現します。",
    tech4Title: "4. 即時エクスポート",
    tech4Desc: "最適化された画像データは JSZip ライブラリによりメモリ内で瞬時に ZIP 化されます。",
    sec6Heading: "なぜ CompressImageSize なのか？",
    sec6Sub: "従来のサーバー型ツールと最先端ブラウザ型ツールの違い。",
    sec7Heading: "高画質圧縮のためのヒント",
    sec7Sub: "ウェブパフォーマンスの専門家が推奨するベストプラクティス。",
    sec8Heading: "よくあるトラブルと解決策",
    sec8Sub: "困ったときの対処法とスムーズな利用のためのアドバイス。",
    sec9Heading: "よくあるご質問 (FAQ)",
    sec9Sub: "プライバシー保護や対応フォーマットについての詳しい回答。",
    faq1Q: "画像データが外部サーバーに送信されることはありますか？",
    faq1A: "一切ありません。すべての圧縮・変換処理はお使いの端末のブラウザ内（HTML5 Canvas）で100%ローカルに完結します。",
    faq2Q: "通常の写真にはどの品質設定がおすすめですか？",
    faq2A: "60%〜75% がベストバランスです。見た目の劣化をほとんど感じさせずに 60%〜85% の容量をカットできます。",
    faq3Q: "圧縮と同時に WebP に変換できますか？",
    faq3A: "はい。元フォーマットを維持するか、JPG、PNG、GIF をワンクリックで最新の Google WebP に変換できます。",
    faq4Q: "一度に何枚まで処理できますか？",
    faq4A: "マルチワーカー並列処理により、1枚から500枚以上の大量画像でも快適に一括処理できます。",
    faq5Q: "透かしが入ったり料金が発生したりしますか？",
    faq5A: "一切ありません。CompressImageSize は完全無料で登録不要、透かしもありません。",
    ctaHeading: "数秒で画像をスマートに最適化",
    ctaSub: "安心の完全ローカル処理。容量無制限で JPG、PNG、WebP を圧縮。",
    ctaBtn: "今すぐ無料で圧縮を始める"
  },

  ar: {
    title: "كيف يعمل - الدليل الشامل لموقع CompressImageSize | ضاغط صور مجاني أونلاين",
    metaDesc: "تعرف على كيفية قيام CompressImageSize بضغط وتحسين صور JPG وPNG وWebP مباشرة في متصفحك. دليل تفصيلي، خطوات العمل ونصائح مفيدة.",
    h1: "كيف يعمل الموقع",
    subhead: "اكتشف كيف يضغط CompressImageSize صورك بنسبة 100% داخل المتصفح دون رفعها إلى أي خادم خارجي. خطوات سهلة، مقارنات بصرية ونصائح احترافية.",
    badge: "معالجة داخل المتصفح 100% • بدون تخزين سحابي",
    breadcrumbHome: "الرئيسية",
    navCompressor: "ضغط الصور",
    navHow: "كيف يعمل",
    navAbout: "من نحن",
    navContact: "اتصل بنا",
    navPrivacy: "سياسة الخصوصية",
    navTerms: "شروط الخدمة",
    sec1Heading: "نظرة سريعة على خطوات العمل",
    sec1Sub: "أربع مراحل بسيطة لضغط صورك ومعاينتها وتنزيلها بكل سهولة.",
    quick1Title: "1. اختيار الصور",
    quick1Desc: "اسحب وأفلت ما يصل إلى أكثر من 500 صورة بصيغ JPG وPNG وWebP وGIF وAVIF مباشرة في المتصفح.",
    quick2Title: "2. ضغط محلي في الذاكرة",
    quick2Desc: "تعمل 3 معالجات خلفية داخل HTML5 Canvas محلياً وتقوم بحذف بيانات EXIF وموقع الكاميرا.",
    quick3Title: "3. معاينة فورية للجودة",
    quick3Desc: "تحكم في شريط الجودة وقارن بكسلات الصورة الأصلية بالمضغوطة باستخدام شريط السحب.",
    quick4Title: "4. تنزيل بضغطة واحدة",
    quick4Desc: "احفظ الصور بشكل فردي في أجزاء من الثانية أو قم بتنزيل كامل الدفعة في ملف ZIP مرتب.",
    sec2Heading: "ما مدى سهولة ضغط ملفاتك؟",
    sec2Sub: "ثلاث خطوات فقط للحصول على صور مجهزة ومثالية للمواقع والشبكات الاجتماعية.",
    step1CardTitle: "الخطوة 1: ارفع الصور أو اسحبها",
    step1CardDesc: "اختر صوراً فردية أو ألبومات كاملة من هاتفك أو حاسوبك بدون أي حد لحجم الملفات.",
    step2CardTitle: "الخطوة 2: اضبط الجودة والصيغة",
    step2CardDesc: "حدد الجودة من 10% إلى 100% أو حول إلى صيغة WebP الحديثة لتوفير 35% إضافية من الحجم.",
    step3CardTitle: "الخطوة 3: تنزيل فوري",
    step3CardDesc: "احفظ الملفات بشكل فردي أو مجمعة في ملف مضغوط ZIP بدون علامات مائية أو تسجيل.",
    sec3Heading: "الأصلية مقابل المضغوطة: شاهد الفرق بنفسك",
    sec3Sub: "حرك شريط التقسيم يميناً ويساراً لفحص دقة التفاصيل وجودة الألوان المحفوظة.",
    badgeOrig: "الأصلية: 3.4 ميجابايت",
    badgeComp: "المضغوطة: 480 كيلوبايت (-86%)",
    sec4Heading: "دليل التعليمات التفصيلي خطوة بخطوة",
    sec4Sub: "دليل عملي لتحقيق أقصى توفير في حجم الملفات مع الحفاظ على وضوح مذهل.",
    step1Title: "الخطوة 1: حدد ملفات الصور",
    step1Text: "اسحب الصور إلى منطقة الإفلات أو انقر على 'اختيار الصور'. ندعم صيغ JPG وPNG وWebP وGIF وAVIF حتى أكثر من 500 صورة في وقت واحد.",
    step2Title: "الخطوة 2: المعالجة التلقائية داخل المتصفح",
    step2Text: "بمجرد إدراج الملفات، تتولى عمليات المعالجة الداخلية تطبيق خوارزميات الضغط في ذاكرة RAM. يتم تلقائياً حذف إحداثيات GPS وبيانات الكاميرا.",
    step3Title: "الخطوة 3: فحص النتيجة وضبط الجودة",
    step3Text: "تابع حجم الملف الناتج مباشرة. اختر إعداداً سريعاً أو حول الصيغة إلى WebP بضغطة زر واحدة.",
    step4Title: "الخطوة 4: تنزيل الملفات الجاهزة",
    step4Text: "اضغط على زر 'تنزيل' بجوار كل صورة، أو اختر 'تنزيل الكل (ZIP)' لحفظ الدفعة كاملة داخل ملف واحد.",
    sec5Heading: "ماذا يحدث بعد اختيار الصور؟",
    sec5Sub: "نظرة تقنية على طريقة عمل المعالجة المحلية بدون خوادم خارجية.",
    tech1Title: "1. القراءة في الذاكرة المحلية",
    tech1Desc: "تُقرأ ملفاتك محلياً في الذاكرة بدون إرسال بايت واحد عبر الإنترنت.",
    tech2Title: "2. المعالجة عبر Canvas",
    tech2Desc: "تعتمد الأداة على HTML5 Canvas لمعالجة البكسلات وتقليل الوزن مع الحفاظ على وضوح العين البشرية.",
    tech3Title: "3. إزالة بيانات EXIF",
    tech3Desc: "يتم مسح إحداثيات الموقع ومعلومات الجهاز لحماية الخصوصية وتقليص حجم الملف.",
    tech4Title: "4. تصدير فوري",
    tech4Desc: "تُجمع البيانات في روابط محلية وتُحزم في ملف ZIP باستخدام مكتبة JSZip بسرعة فائقة.",
    sec6Heading: "لماذا تختار CompressImageSize؟",
    sec6Sub: "مقارنة بين التقنية المحلية الآمنة وأدوات الرفع السحابية القديمة.",
    sec7Heading: "نصائح للحصول على أفضل نتائج ضغط",
    sec7Sub: "إرشادات عملية لتحقيق التوازن المثالي بين حجم الملف والوضوح.",
    sec8Heading: "مشاكل شائعة وحلول سريعة",
    sec8Sub: "إجابات وحلول سريعة لأي عقبات أثناء الاستخدام.",
    sec9Heading: "الأسئلة الشائعة (FAQ)",
    sec9Sub: "كل ما تود معرفته عن الأمان والخصوصية والصيغ المدعومة.",
    faq1Q: "هل يتم رفع صوري إلى أي خادم خارجي؟",
    faq1A: "لا على الإطلاق. تتم جميع عمليات الضغط والتحويل محلياً بنسبة 100% داخل متصفحك عبر HTML5 Canvas. لا تخرج ملفاتك أبداً من جهازك.",
    faq2Q: "ما هي نسبة الجودة المثالية للصور اليومية؟",
    faq2A: "يوصى باختيار قيمة بين 60% و75% للويب والمواقع ومواقع التواصل. يقلل ذلك الحجم بنسبة 60% إلى 85% دون فرق تلاحظه العين.",
    faq3Q: "هل يمكنني التحويل إلى صيغة WebP أثناء الضغط؟",
    faq3A: "نعم. يمكنك الاحتفاظ بالصيغة الأصلية أو تحويل صور JPG وPNG وGIF إلى WebP بضغطة زر واحدة لتوفير إضافي يصل إلى 35%.",
    faq4Q: "هل هناك حد لعدد الصور التي يمكن ضغطها في دفعة واحدة؟",
    faq4A: "تدعم الأداة من صورة واحدة إلى أكثر من 500 صورة في الجلسة بفضل نظام المعالجة المتوازية.",
    faq5Q: "هل توجد علامات مائية أو رسوم خفية؟",
    faq5A: "لا توجد أي علامات مائية، ولا اشتراكات ولا تسجيل. الموقع مجاني بالكامل 100% دائماً.",
    ctaHeading: "حسّن صورك في ثوانٍ معدودة",
    ctaSub: "اضغط صور JPG وPNG وWebP بخصوصية تامة وبدون أي قيود على الحجم.",
    ctaBtn: "ابدأ الضغط الآن مجاناً"
  }
};

// 3. Helper to generate Hreflang Tags
function getHreflangs() {
  const codes = Object.keys(languages);
  let lines = codes.map(c => {
    const u = c === 'en' ? 'https://compressimagesize.com/how-it-works/' : `https://compressimagesize.com/${c}/how-it-works/`;
    return `  <link rel="alternate" hreflang="${c}" href="${u}" />`;
  });
  lines.push('  <link rel="alternate" hreflang="x-default" href="https://compressimagesize.com/how-it-works/" />');
  return lines.join('\n');
}

// 4. Helper to generate Language Dropdown Menu
function getLangDropdownHtml(currentCode) {
  let html = `              <div class="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">Global Top 10 Languages</div>\n`;
  for (const [code, info] of Object.entries(languages)) {
    const url = code === 'en' ? '/how-it-works/' : `/${code}/how-it-works/`;
    const isActive = code === currentCode ? ' font-bold bg-primary-50 text-primary-600' : '';
    html += `              <a href="${url}" class="flex items-center justify-between px-3 py-2 text-xs sm:text-sm text-dark-slate hover:bg-primary-50 hover:text-primary-600 transition-colors${isActive}">
                <span class="flex items-center gap-2.5">
                  ${info.flag}
                  <span>${info.name}</span>
                </span>
                <span class="text-[10px] uppercase font-mono text-slate-400">${code}</span>
              </a>\n`;
  }
  return html.trimEnd();
}

// 5. Read Master English Template
const masterPath = path.join(rootDir, 'how-it-works', 'index.html');
const masterHtml = fs.readFileSync(masterPath, 'utf8');

// Build each language
for (const [code, langInfo] of Object.entries(languages)) {
  const t = translations[code];
  const isEn = code === 'en';
  const prefix = isEn ? '' : `${code}/`;
  const homeLink = isEn ? '/' : `/${code}/`;
  const howLink = isEn ? '/how-it-works/' : `/${code}/how-it-works/`;
  const aboutLink = isEn ? '/about-us' : `/${code}/about-us`;
  const contactLink = isEn ? '/contact-us' : `/${code}/contact-us`;
  const privacyLink = isEn ? '/privacy-policy' : `/${code}/privacy-policy`;
  const termsLink = isEn ? '/terms-of-service' : `/${code}/terms-of-service`;
  const canonicalUrl = `https://compressimagesize.com/${prefix}how-it-works/`;

  let page = masterHtml;

  // 1. html tag
  page = page.replace(/<html\b[^>]*>/i, `<html lang="${code}" dir="${langInfo.dir}">`);

  // 2. Title & Description & Canonical
  page = page.replace(/<title>[\s\S]*?<\/title>/i, `<title>${t.title}</title>`);
  page = page.replace(/<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/i, `<meta name="description" content="${t.metaDesc}" />`);
  page = page.replace(/<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

  // 3. Open Graph & Twitter
  page = page.replace(/<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  page = page.replace(/<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="og:title" content="${t.title}" />`);
  page = page.replace(/<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/i, `<meta property="og:description" content="${t.metaDesc}" />`);
  page = page.replace(/<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/?>/i, `<meta name="twitter:title" content="${t.title}" />`);
  page = page.replace(/<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/?>/i, `<meta name="twitter:description" content="${t.metaDesc}" />`);

  // 4. Injects Hreflang Tags & Favicon
  const hreflangs = getHreflangs();
  const metaRobotsTag = isEn ? '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />'
                             : '<meta name="robots" content="noindex, follow" />';
  
  // Replace robots tag
  page = page.replace(/<meta\s+name="robots"\s+content="[\s\S]*?"\s*\/?>/i, metaRobotsTag);

  // Replace or inject canonical and hreflangs
  const canonicalPlusHreflang = `<link rel="canonical" href="${canonicalUrl}" />\n${hreflangs}`;
  page = page.replace(/<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/, canonicalPlusHreflang);

  // Replace favicon with /favicon.ico
  page = page.replace(/<link\s+rel=["'](?:shortcut )?icon["']\s+href=["'][^"']*["']\s*\/?>/gi, '<link rel="icon" type="image/x-icon" href="/favicon.ico" />');

  // 5. Ensure all asset links use root-relative paths
  page = page.replace(/href="\.\.\/css\//g, 'href="/css/');
  page = page.replace(/src="\.\.\/images\//g, 'src="/images/');
  page = page.replace(/url\('\.\.\/images\//g, "url('/images/");
  page = page.replace(/url\("\.\.\/images\//g, 'url("/images/');
  page = page.replace(/href="css\//g, 'href="/css/');
  page = page.replace(/src="images\//g, 'src="/images/');
  page = page.replace(/url\('images\//g, "url('/images/");
  page = page.replace(/src="\.\.\/js\//g, 'src="/js/');
  page = page.replace(/src="js\//g, 'src="/js/');

  // 6. Header: Logo and Nav
  // Logo
  page = page.replace(/<a href="(?:\/|\.\.\/)" class="flex items-center group focus:outline-none focus:ring-2 focus:ring-primary-600 rounded-lg p-1" aria-label="CompressImageSize Home">/i,
    `<a href="${homeLink}" class="flex items-center group focus:outline-none focus:ring-2 focus:ring-primary-600 rounded-lg p-1" aria-label="CompressImageSize Home">`);

  // Navbar Links
  const navRegex = /<nav class="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium text-dark-body">[\s\S]*?<\/nav>/i;
  const newNav = `<nav class="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium text-dark-body">
          <a href="${homeLink}" class="hover:text-primary-600 transition-colors">${t.navCompressor}</a>
          <a href="${howLink}" class="text-primary-600 font-bold border-b-2 border-primary-600 pb-0.5 transition-colors">${t.navHow}</a>
          <a href="${aboutLink}" class="hover:text-primary-600 transition-colors">${t.navAbout}</a>
          <a href="${contactLink}" class="hover:text-primary-600 transition-colors">${t.navContact}</a>
        </nav>`;
  page = page.replace(navRegex, newNav);

  // Language button: currentLangFlag and currentLangText
  page = page.replace(/<span id="currentLangFlag" class="inline-flex items-center">[\s\S]*?<\/span>/i,
    `<span id="currentLangFlag" class="inline-flex items-center">${langInfo.flag}</span>`);
  page = page.replace(/<span id="currentLangText">[\s\S]*?<\/span>/i,
    `<span id="currentLangText">${langInfo.name}</span>`);

  // Language Dropdown Menu
  const langMenuRegex = /<!-- Language Dropdown Menu -->[\s\S]*?<\/div>\s*<\/div>\s*<!-- Mobile Menu Button -->/i;
  const newLangMenu = `<!-- Language Dropdown Menu -->
            <div id="langMenu" class="hidden absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-56 bg-white rounded-xl shadow-card border border-surface-border py-2 z-50 max-h-[80vh] overflow-y-auto">
${getLangDropdownHtml(code)}
            </div>
          </div>

          <!-- Mobile Menu Button -->`;
  page = page.replace(langMenuRegex, newLangMenu);

  // Mobile Drawer Links
  const drawerRegex = /<div class="flex flex-col space-y-1">[\s\S]*?<\/div>/i;
  const newDrawer = `<div class="flex flex-col space-y-1">
        <a href="${homeLink}" class="block py-2 text-sm font-medium text-dark-slate hover:text-primary-600">${t.navCompressor}</a>
        <a href="${howLink}" class="block py-2 text-sm font-bold text-primary-600">${t.navHow}</a>
        <a href="${aboutLink}" class="block py-2 text-sm font-medium text-dark-slate hover:text-primary-600">${t.navAbout}</a>
        <a href="${contactLink}" class="block py-2 text-sm font-medium text-dark-slate hover:text-primary-600">${t.navContact}</a>
      </div>`;
  page = page.replace(drawerRegex, newDrawer);

  // 7. Breadcrumb
  page = page.replace(/<a href="(?:\/|\.\.\/)" class="hover:text-primary-600 transition-colors">Home<\/a>/i,
    `<a href="${homeLink}" class="hover:text-primary-600 transition-colors">${t.breadcrumbHome}</a>`);

  // 8. Hero
  page = page.replace(/<h1\b[^>]*>[\s\S]*?<\/h1>/i,
    `<h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-md tracking-tight leading-tight mb-4 sm:mb-6">${t.h1}</h1>`);
  page = page.replace(/<p class="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-normal">[\s\S]*?<\/p>/i,
    `<p class="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-normal">${t.subhead}</p>`);
  page = page.replace(/100% Client-Side Engine • Zero Server Storage/g, t.badge);

  // 9. Section 1 (Quick 4 steps)
  page = page.replace(/The Complete Process at a Glance/g, t.sec1Heading);
  page = page.replace(/Follow four simple phases to compress, inspect, and export your photos\./g, t.sec1Sub);
  page = page.replace(/1\. Select Images/g, t.quick1Title);
  page = page.replace(/Drag and drop up to 500\+ JPG, PNG, WebP, GIF, or AVIF files directly into your browser window\./g, t.quick1Desc);
  page = page.replace(/2\. In-Memory Compression/g, t.quick2Title);
  page = page.replace(/3 parallel Web Workers decode images locally on an HTML5 canvas and strip hidden EXIF metadata\./g, t.quick2Desc);
  page = page.replace(/3\. Live Quality Inspection/g, t.quick3Title);
  page = page.replace(/Use the real-time quality slider, compare original vs compressed pixels, and check exact file weights\./g, t.quick3Desc);
  page = page.replace(/4\. One-Click Download/g, t.quick4Title);
  page = page.replace(/Save photos individually in milliseconds, or export your entire compressed batch in a tidy ZIP archive\./g, t.quick4Desc);

  // 10. Section 2 (3 Visual Cards)
  page = page.replace(/How Simple Is It to Compress Your Files\?/g, t.sec2Heading);
  page = page.replace(/Three effortless steps give you production-ready optimized photos in seconds\./g, t.sec2Sub);
  page = page.replace(/Step 1: Upload or Drag Photos/g, t.step1CardTitle);
  page = page.replace(/Choose single images or large collections from your smartphone, tablet, or PC\. No file size restrictions\./g, t.step1CardDesc);
  page = page.replace(/Step 2: Adjust Quality &amp; Format/g, t.step2CardTitle);
  page = page.replace(/Slide from 10% to 100% quality or convert JPG\/PNG to modern Google WebP for an extra 35% space reduction\./g, t.step2CardDesc);
  page = page.replace(/Step 3: Instant Download/g, t.step3CardTitle);
  page = page.replace(/Click to download single files or bundle everything into a ZIP without watermarks or registration\./g, t.step3CardDesc);

  // 11. Section 3 (Original vs Compressed)
  page = page.replace(/Original vs Compressed: See the Difference/g, t.sec3Heading);
  page = page.replace(/Drag the interactive split handle left and right to inspect fine details and sharpness\./g, t.sec3Sub);
  page = page.replace(/Original: 3\.4 MB/g, t.badgeOrig);
  page = page.replace(/Compressed: 480 KB \(-86%\)/g, t.badgeComp);

  // 12. Section 4 (Detailed Steps)
  page = page.replace(/Detailed Step-by-Step Instructions/g, t.sec4Heading);
  page = page.replace(/In-depth guide to maximizing compression ratio while maintaining pristine sharpness\./g, t.sec4Sub);
  page = page.replace(/Step 1: Select Your Image Files/g, t.step1Title);
  page = page.replace(/Step 2: Automatic In-Browser Processing/g, t.step2Title);
  page = page.replace(/Step 3: Review the Result &amp; Quality/g, t.step3Title);
  page = page.replace(/Step 4: Download the Result/g, t.step4Title);

  // 13. Section 5 & 6 & 7 & 8 & 9
  page = page.replace(/What Happens After You Upload\?/g, t.sec5Heading);
  page = page.replace(/An inside look at our zero-server client-side compression pipeline\./g, t.sec5Sub);
  page = page.replace(/Why Use CompressImageSize\?/g, t.sec6Heading);
  page = page.replace(/Comparing client-side technology against legacy cloud compressors\./g, t.sec6Sub);
  page = page.replace(/Tips for Getting the Best Compression Results/g, t.sec7Heading);
  page = page.replace(/Practical advice from web performance experts to achieve optimal balance\./g, t.sec7Sub);
  page = page.replace(/Common Problems &amp; Quick Solutions/g, t.sec8Heading);
  page = page.replace(/Troubleshooting common challenges during file optimization\./g, t.sec8Sub);
  page = page.replace(/Frequently Asked Questions/g, t.sec9Heading);
  page = page.replace(/Answers to common inquiries regarding privacy, formats, and compression\./g, t.sec9Sub);

  // 14. FAQs
  page = page.replace(/Do my photos get uploaded to any external server during compression\?/g, t.faq1Q);
  page = page.replace(/No, absolutely not\. All compression and format conversion processes execute 100% locally within your device's browser RAM using HTML5 Canvas APIs\. No file data is ever transmitted over the network or saved to any cloud server\./g, t.faq1A);
  page = page.replace(/What is the recommended quality slider setting for everyday photos\?/g, t.faq2Q);
  page = page.replace(/A quality setting between 60% and 75% is the sweet spot for web images, blog articles, and social media\. It typically reduces file weight by 60% to 85% while remaining visually indistinguishable from the original to the human eye\./g, t.faq2A);
  page = page.replace(/Can I convert images to modern WebP while compressing\?/g, t.faq3Q);
  page = page.replace(/Yes\. You can keep your original format \(Auto\) or convert any uploaded JPG, PNG, or GIF into Google WebP with one click, cutting an additional 25% to 35% off file sizes\./g, t.faq3A);
  page = page.replace(/Is there a limit on how many images I can compress in one batch\?/g, t.faq4Q);
  page = page.replace(/CompressImageSize supports batches from 1 to 500\+ images in a single session\. The engine utilizes a 3-worker concurrency queue so your browser remains fast, responsive, and crash-free\./g, t.faq4A);

  // 15. CTA
  page = page.replace(/Optimize Your Photos in Seconds/g, t.ctaHeading);
  page = page.replace(/Compress JPG, PNG, and WebP images with 100% in-browser privacy and zero file size limits\./g, t.ctaSub);
  page = page.replace(/Start Compressing Now — Free/g, t.ctaBtn);
  // CTA button link
  page = page.replace(/<a href="(?:\/|\.\.\/)" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 focus:ring-4 focus:ring-primary-500\/30 cursor-pointer text-base">/i,
    `<a href="${homeLink}" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 focus:ring-4 focus:ring-primary-500/30 cursor-pointer text-base">`);

  // 16. Footer Links
  page = page.replace(/<a href="(?:\/about-us|\.\.\/about-us)" class="hover:text-primary-600 transition-colors py-1">About Us<\/a>/g,
    `<a href="${aboutLink}" class="hover:text-primary-600 transition-colors py-1">${t.navAbout}</a>`);
  page = page.replace(/<a href="(?:\/contact-us|\.\.\/contact-us)" class="hover:text-primary-600 transition-colors py-1">Contact Us<\/a>/g,
    `<a href="${contactLink}" class="hover:text-primary-600 transition-colors py-1">${t.navContact}</a>`);
  page = page.replace(/<a href="(?:\/privacy-policy|\.\.\/privacy-policy)" class="hover:text-primary-600 transition-colors py-1">Privacy Policy<\/a>/g,
    `<a href="${privacyLink}" class="hover:text-primary-600 transition-colors py-1">${t.navPrivacy}</a>`);
  page = page.replace(/<a href="(?:\/terms-of-service|\.\.\/terms-of-service)" class="hover:text-primary-600 transition-colors py-1">Terms of Service<\/a>/g,
    `<a href="${termsLink}" class="hover:text-primary-600 transition-colors py-1">${t.navTerms}</a>`);

  // Footer Logo
  page = page.replace(/<a href="(?:\/|\.\.\/)" class="flex items-center gap-3 w-fit" aria-label="CompressImageSize Home">/i,
    `<a href="${homeLink}" class="flex items-center gap-3 w-fit" aria-label="CompressImageSize Home">`);

  // 17. Save files
  if (isEn) {
    fs.writeFileSync(path.join(rootDir, 'how-it-works', 'index.html'), page, 'utf8');
    fs.writeFileSync(path.join(rootDir, 'how-it-works.html'), page, 'utf8');
    console.log('Updated en: how-it-works/index.html & how-it-works.html');
  } else {
    const targetDir = path.join(rootDir, code, 'how-it-works');
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), page, 'utf8');
    fs.writeFileSync(path.join(rootDir, code, 'how-it-works.html'), page, 'utf8');
    console.log(`Generated ${code}: ${code}/how-it-works/index.html & ${code}/how-it-works.html`);
  }
}

console.log('All 10 language versions of How It Works generated successfully!');
