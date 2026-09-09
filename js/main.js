/**
 * CompressImageSize - Client-Side Image Compression Engine & UI Controller
 * 100% Privacy-First, Zero Server Uploads, WCAG Compliant
 */

(function () {
  'use strict';

  // ── 1. DOM Elements ──────────────────────────────────────────
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('fileInput');
  const selectImagesBtn = document.getElementById('selectImagesBtn');
  const settingsPanel = document.getElementById('settingsPanel');
  const resultsContainer = document.getElementById('resultsContainer');
  const resultsList = document.getElementById('resultsList');
  const qualityRange = document.getElementById('qualityRange');
  const qualityVal = document.getElementById('qualityVal');
  const formatSelect = document.getElementById('formatSelect');
  const queueCount = document.getElementById('queueCount');
  const clearAllBtn = document.getElementById('clearAllBtn');
  const compressAllBtn = document.getElementById('compressAllBtn');
  const downloadAllBtn = document.getElementById('downloadAllBtn');

  // Nav & Header
  const langToggleBtn = document.getElementById('langToggleBtn');
  const langMenu = document.getElementById('langMenu');
  const langChevron = document.getElementById('langChevron');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');

  // State
  let uploadedFiles = []; // Array of File objects
  let processedFiles = []; // Array of { original, blob, url, name, originalSize, newSize, width, height }

  // ── 2. Multilingual System (Client-Side & URL) ─────────────
  function applyLanguage(langCode) {
    if (!window.COMPRESS_LANGS || !window.COMPRESS_LANGS[langCode]) return;
    const l = window.COMPRESS_LANGS[langCode];

    const currentLangText = document.getElementById('currentLangText');
    if (currentLangText) currentLangText.textContent = l.name;

    const badgeText = document.getElementById('badgeText');
    if (badgeText && l.badge_free) badgeText.textContent = l.badge_free;

    const selectBtnText = document.getElementById('selectBtnText');
    if (selectBtnText && l.cta) selectBtnText.textContent = l.cta;

    const dropHintText = document.getElementById('dropHintText');
    if (dropHintText && l.drop_hint) dropHintText.textContent = l.drop_hint;

    const settingsHeading = document.getElementById('settingsHeading');
    if (settingsHeading && l.settings_title) settingsHeading.textContent = l.settings_title;

    const settingsSub = document.getElementById('settingsSub');
    if (settingsSub && l.settings_sub) settingsSub.textContent = l.settings_sub;

    const labelQuality = document.getElementById('labelQuality');
    if (labelQuality && l.quality_label) labelQuality.textContent = l.quality_label;

    const labelFormat = document.getElementById('labelFormat');
    if (labelFormat && l.format_label) labelFormat.textContent = l.format_label;

    const clearBtnEl = document.getElementById('clearAllBtn');
    if (clearBtnEl && l.clear_all) clearBtnEl.textContent = l.clear_all;

    const recompressBtnEl = document.getElementById('compressAllBtn');
    if (recompressBtnEl && l.recompress) {
      const span = recompressBtnEl.querySelector('span');
      if (span) span.textContent = l.recompress;
    }

    const downloadAllBtnEl = document.getElementById('downloadAllBtn');
    if (downloadAllBtnEl && l.download_all) {
      const span = downloadAllBtnEl.querySelector('span');
      if (span) span.textContent = l.download_all;
    }

    localStorage.setItem('compress_lang', langCode);
  }

  function handleUrlKeywords() {
    const urlParams = new URLSearchParams(window.location.search);
    const toolParam = urlParams.get('tool');
    const langParam = urlParams.get('lang') || localStorage.getItem('compress_lang') || 'en';

    if (langParam) {
      applyLanguage(langParam);
    }

    if (toolParam) {
      const pageH1 = document.getElementById('pageH1');
      const cleanName = toolParam.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      if (pageH1) {
        pageH1.innerHTML = cleanName + ' <span class="text-primary-600">Online</span>';
      }
      document.title = `${cleanName} - Free Online Image Compressor`;

      if (toolParam.includes('png') && formatSelect) {
        formatSelect.value = 'image/png';
      } else if ((toolParam.includes('jpg') || toolParam.includes('jpeg')) && formatSelect) {
        formatSelect.value = 'image/jpeg';
      } else if (toolParam.includes('webp') && formatSelect) {
        formatSelect.value = 'image/webp';
      }
    }
  }

  // ── 3. Navigation & Dropdowns ────────────────────────────────
  if (langToggleBtn && langMenu) {
    langToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !langMenu.classList.contains('hidden');
      langMenu.classList.toggle('hidden', isOpen);
      langToggleBtn.setAttribute('aria-expanded', !isOpen);
      if (langChevron) langChevron.classList.toggle('rotate-180', !isOpen);
    });

    // Intercept language clicks for instant live translation
    langMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.includes('lang=')) {
          const match = href.match(/lang=([a-z]+)/);
          if (match && match[1]) {
            const chosenLang = match[1];
            applyLanguage(chosenLang);
            langMenu.classList.add('hidden');
            langToggleBtn.setAttribute('aria-expanded', 'false');
            if (langChevron) langChevron.classList.remove('rotate-180');
            // Update URL without reloading if user prefers instant feel
            if (window.history && window.history.pushState) {
              const newUrl = new URL(window.location);
              newUrl.searchParams.set('lang', chosenLang);
              window.history.pushState({}, '', newUrl);
              e.preventDefault();
            }
          }
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!langMenu.contains(e.target) && !langToggleBtn.contains(e.target)) {
        langMenu.classList.add('hidden');
        langToggleBtn.setAttribute('aria-expanded', 'false');
        if (langChevron) langChevron.classList.remove('rotate-180');
      }
    });
  }

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
    });
    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => mobileDrawer.classList.add('hidden'));
    });
  }

  // ── 4. FAQ Accordion ─────────────────────────────────────────
  document.querySelectorAll('.faq-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      const content = item.querySelector('.faq-content');
      const arrow = trigger.querySelector('.faq-arrow');
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // Close all other items
      document.querySelectorAll('.faq-item').forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.querySelector('.faq-content')?.classList.add('hidden');
          otherItem.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
          otherItem.querySelector('.faq-arrow')?.classList.remove('rotate-180', 'text-primary-600');
        }
      });

      // Toggle current
      if (isExpanded) {
        content.classList.add('hidden');
        trigger.setAttribute('aria-expanded', 'false');
        arrow?.classList.remove('rotate-180', 'text-primary-600');
      } else {
        content.classList.remove('hidden');
        trigger.setAttribute('aria-expanded', 'true');
        arrow?.classList.add('rotate-180', 'text-primary-600');
      }
    });
  });

  // ── 5. Controls & Events ─────────────────────────────────────
  if (qualityRange && qualityVal) {
    qualityRange.addEventListener('input', () => {
      qualityVal.textContent = `${qualityRange.value}%`;
    });
  }

  // ── 6. Drag & Drop Handling ──────────────────────────────────
  if (selectImagesBtn) {
    selectImagesBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      fileInput.click();
    });
  }

  if (dropzone) {
    dropzone.addEventListener('click', () => {
      fileInput.click();
    });

    ['dragenter', 'dragover'].forEach((eventName) => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach((eventName) => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files && files.length > 0) {
        handleFiles(files);
      }
    });

    // Also support dropping anywhere on window
    window.addEventListener('dragover', (e) => e.preventDefault());
    window.addEventListener('drop', (e) => {
      if (e.target !== dropzone && !dropzone.contains(e.target)) {
        e.preventDefault();
        if (e.dataTransfer && e.dataTransfer.files.length > 0) {
          handleFiles(e.dataTransfer.files);
        }
      }
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files.length > 0) {
        handleFiles(fileInput.files);
      }
    });
  }

  // ── 7. File Processing Queue ─────────────────────────────────
  function handleFiles(files) {
    const newFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));
    if (newFiles.length === 0) {
      alert('Please select valid image files (JPG, PNG, WebP, GIF).');
      return;
    }

    uploadedFiles = [...uploadedFiles, ...newFiles];
    updateQueueUI();
    processBatch(newFiles);
  }

  function updateQueueUI() {
    if (queueCount) {
      queueCount.textContent = `${uploadedFiles.length} image${uploadedFiles.length === 1 ? '' : 's'} queued`;
    }
    if (uploadedFiles.length > 0) {
      clearAllBtn?.classList.remove('hidden');
      resultsContainer?.classList.remove('hidden');
    } else {
      clearAllBtn?.classList.add('hidden');
      downloadAllBtn?.classList.add('hidden');
      resultsContainer?.classList.add('hidden');
    }
  }

  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      uploadedFiles = [];
      processedFiles.forEach((f) => URL.revokeObjectURL(f.url));
      processedFiles = [];
      if (resultsList) resultsList.innerHTML = '';
      updateQueueUI();
    });
  }

  if (compressAllBtn) {
    compressAllBtn.addEventListener('click', () => {
      if (uploadedFiles.length === 0) return;
      if (resultsList) resultsList.innerHTML = '';
      processedFiles.forEach((f) => URL.revokeObjectURL(f.url));
      processedFiles = [];
      processBatch(uploadedFiles);
    });
  }

  // ── 8. Core Client-Side Image Compression Logic ──────────────
  function formatBytes(bytes, decimals = 1) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  async function processBatch(files) {
    for (const file of files) {
      await compressSingleFile(file);
    }
    if (processedFiles.length > 1 && downloadAllBtn) {
      downloadAllBtn.classList.remove('hidden');
      downloadAllBtn.classList.add('inline-flex');
    }
  }

  function compressSingleFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.onload = async function () {
          const userQuality = (parseInt(qualityRange?.value || '80', 10)) / 100;
          let selectedFormat = formatSelect ? formatSelect.value : 'original';
          if (selectedFormat === 'original') {
            selectedFormat = file.type === 'image/png' || file.type === 'image/webp' ? file.type : 'image/jpeg';
          }

          // Create canvas
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;

          // Fill white background for transparent PNG converted to JPG
          if (selectedFormat === 'image/jpeg') {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Direct quality compression
          let compressedBlob = await new Promise((res) => canvas.toBlob(res, selectedFormat, userQuality));

          if (!compressedBlob) {
            compressedBlob = file; // Fallback
          }

          const blobUrl = URL.createObjectURL(compressedBlob);
          const extension = selectedFormat.split('/')[1] === 'jpeg' ? 'jpg' : selectedFormat.split('/')[1];
          const rawName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
          const outputName = `${rawName}-compressed.${extension}`;

          const itemData = {
            original: file,
            blob: compressedBlob,
            url: blobUrl,
            name: outputName,
            originalSize: file.size,
            newSize: compressedBlob.size,
            width: img.width,
            height: img.height,
          };

          processedFiles.push(itemData);
          renderResultCard(itemData);
          resolve();
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  // ── 9. Result Card Rendering ─────────────────────────────────
  function renderResultCard(item) {
    if (!resultsList) return;
    const savings = Math.max(0, Math.round(((item.originalSize - item.newSize) / item.originalSize) * 100));
    const isSmaller = item.newSize < item.originalSize;

    const card = document.createElement('div');
    card.className =
      'bg-white rounded-2xl p-4 sm:p-5 border border-surface-border shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in hover:border-primary-300 transition-all';

    card.innerHTML = `
      <div class="flex items-center gap-4 w-full sm:w-auto">
        <img src="${item.url}" alt="${item.name}" class="w-16 h-16 rounded-xl object-cover border border-slate-200 bg-slate-50 flex-shrink-0 shadow-sm" />
        <div class="min-w-0 flex-1">
          <h5 class="text-sm font-bold text-dark-slate truncate max-w-[220px] sm:max-w-xs" title="${item.name}">${item.name}</h5>
          <div class="flex items-center gap-2 text-xs text-slate-500 mt-1">
            <span>${item.width} &times; ${item.height} px</span>
            <span>•</span>
            <span class="line-through text-slate-400">${formatBytes(item.originalSize)}</span>
            <span>&rarr;</span>
            <span class="font-bold text-primary-700">${formatBytes(item.newSize)}</span>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
        ${
          isSmaller
            ? `<span class="px-2.5 py-1 text-xs font-bold bg-action-50 text-action-700 border border-action-200 rounded-lg whitespace-nowrap">
                &darr; ${savings}% Saved
              </span>`
            : `<span class="px-2.5 py-1 text-xs font-bold bg-slate-100 text-slate-600 rounded-lg">Optimized</span>`
        }

        <a href="${item.url}" download="${item.name}" class="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-action-600 hover:bg-action-700 active:scale-95 rounded-xl shadow-sm transition-all">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download
        </a>
      </div>
    `;

    resultsList.appendChild(card);
  }

  // ── 10. Download All Button ──────────────────────────────────
  if (downloadAllBtn) {
    downloadAllBtn.addEventListener('click', () => {
      processedFiles.forEach((item, index) => {
        setTimeout(() => {
          const a = document.createElement('a');
          a.href = item.url;
          a.download = item.name;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }, index * 250);
      });
    });
  }

  // ── 11. Header & Navigation Controls ─────────────────────────
  if (langToggleBtn && langMenu) {
    langToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isClosed = langMenu.classList.toggle('hidden');
      langToggleBtn.setAttribute('aria-expanded', !isClosed);
      if (langChevron) {
        langChevron.classList.toggle('rotate-180', !isClosed);
      }
    });

    document.addEventListener('click', (e) => {
      if (!langMenu.contains(e.target) && !langToggleBtn.contains(e.target)) {
        langMenu.classList.add('hidden');
        langToggleBtn.setAttribute('aria-expanded', 'false');
        if (langChevron) langChevron.classList.remove('rotate-180');
      }
    });
  }

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
    });
  }

  // Initial Run
  document.addEventListener('DOMContentLoaded', () => {
    handleUrlKeywords();
  });
})();
