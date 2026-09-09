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

  // Progress Bar & Batch Stats Elements
  const progressContainer = document.getElementById('progressContainer');
  const progressBarFill = document.getElementById('progressBarFill');
  const progressPercentage = document.getElementById('progressPercentage');
  const progressStatusText = document.getElementById('progressStatusText');
  const progressCountText = document.getElementById('progressCountText');

  const batchStatsCard = document.getElementById('batchStatsCard');
  const statTotalCount = document.getElementById('statTotalCount');
  const statOriginalSize = document.getElementById('statOriginalSize');
  const statNewSize = document.getElementById('statNewSize');
  const statSavingsPercent = document.getElementById('statSavingsPercent');
  const downloadZipBtn = document.getElementById('downloadZipBtn');
  const downloadZipBtnText = document.getElementById('downloadZipBtnText');
  const resultsCount = document.getElementById('resultsCount');

  // Compare Modal Elements
  const compareModal = document.getElementById('compareModal');
  const compareOrigImg = document.getElementById('compareOrigImg');
  const compareNewImg = document.getElementById('compareNewImg');
  const compareOrigSize = document.getElementById('compareOrigSize');
  const compareNewSize = document.getElementById('compareNewSize');
  const closeCompareModalBtn = document.getElementById('closeCompareModalBtn');
  const closeCompareModalBottomBtn = document.getElementById('closeCompareModalBottomBtn');

  // Nav & Header
  const langToggleBtn = document.getElementById('langToggleBtn');
  const langMenu = document.getElementById('langMenu');
  const langChevron = document.getElementById('langChevron');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');

  // State
  let uploadedFiles = []; // Array of File objects
  let processedFiles = []; // Array of { original, blob, url, name, originalSize, newSize, width, height, originalUrl }

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

      if (formatSelect) {
        if (toolParam.includes('png')) {
          formatSelect.value = 'image/png';
        } else if (toolParam.includes('jpg') || toolParam.includes('jpeg')) {
          formatSelect.value = 'image/jpeg';
        } else if (toolParam.includes('webp')) {
          formatSelect.value = 'image/webp';
        }
        formatSelect.dispatchEvent(new Event('change'));
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
      document.querySelectorAll('.quality-preset-btn').forEach(btn => {
        if (btn.getAttribute('data-quality') === qualityRange.value) {
          btn.classList.add('border-primary-300', 'bg-primary-50', 'text-primary-700');
          btn.classList.remove('border-slate-200', 'bg-white', 'text-slate-600');
        } else {
          btn.classList.remove('border-primary-300', 'bg-primary-50', 'text-primary-700');
          btn.classList.add('border-slate-200', 'bg-white', 'text-slate-600');
        }
      });
    });
  }

  // Quality Presets
  const qualityPresets = document.querySelectorAll('.quality-preset-btn');
  if (qualityPresets.length > 0 && qualityRange) {
    qualityPresets.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-quality');
        if (val) {
          qualityRange.value = val;
          if (qualityVal) qualityVal.textContent = `${val}%`;
          qualityPresets.forEach(b => {
            b.classList.remove('border-primary-300', 'bg-primary-50', 'text-primary-700');
            b.classList.add('border-slate-200', 'bg-white', 'text-slate-600');
          });
          btn.classList.remove('border-slate-200', 'bg-white', 'text-slate-600');
          btn.classList.add('border-primary-300', 'bg-primary-50', 'text-primary-700');
          if (uploadedFiles.length > 0 && compressAllBtn) {
            compressAllBtn.click();
          }
        }
      });
    });
  }

  // Visual Output Format Cards
  const formatCards = document.querySelectorAll('.format-card');
  function updateActiveFormatCard(targetFormatVal) {
    formatCards.forEach(card => {
      const cardFormat = card.getAttribute('data-format');
      if (cardFormat === targetFormatVal) {
        card.classList.remove('border-slate-200', 'bg-white', 'text-slate-700');
        card.classList.add('border-primary-600', 'bg-primary-50/70', 'text-primary-900', 'shadow-sm', 'ring-2', 'ring-primary-500/20');
      } else {
        card.classList.remove('border-primary-600', 'bg-primary-50/70', 'text-primary-900', 'shadow-sm', 'ring-2', 'ring-primary-500/20');
        card.classList.add('border-slate-200', 'bg-white', 'text-slate-700');
      }
    });
  }

  if (formatCards.length > 0 && formatSelect) {
    formatCards.forEach(card => {
      card.addEventListener('click', () => {
        const selectedFormat = card.getAttribute('data-format');
        if (selectedFormat) {
          formatSelect.value = selectedFormat;
          updateActiveFormatCard(selectedFormat);
          formatSelect.dispatchEvent(new Event('change'));
          if (uploadedFiles.length > 0 && compressAllBtn) {
            compressAllBtn.click();
          }
        }
      });
    });

    formatSelect.addEventListener('change', () => {
      updateActiveFormatCard(formatSelect.value);
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

  // ── 7. File Processing Queue & Concurrency Controller ──────
  function handleFiles(files) {
    const validFiles = Array.from(files).filter((file) => {
      // Accept any image MIME type or common image extensions
      return file.type.startsWith('image/') || /\.(jpe?g|png|webp|gif|avif|bmp|tiff)$/i.test(file.name);
    });

    if (validFiles.length === 0) {
      alert('Please select valid image files (JPG, PNG, WebP, GIF, AVIF).');
      return;
    }

    uploadedFiles = [...uploadedFiles, ...validFiles];
    updateQueueUI();
    processBatch(validFiles);
  }

  function updateQueueUI() {
    const count = uploadedFiles.length;
    if (queueCount) {
      queueCount.textContent = `${count} image${count === 1 ? '' : 's'} queued`;
    }
    if (count > 0) {
      clearAllBtn?.classList.remove('hidden');
      resultsContainer?.classList.remove('hidden');
    } else {
      clearAllBtn?.classList.add('hidden');
      downloadAllBtn?.classList.add('hidden');
      resultsContainer?.classList.add('hidden');
      batchStatsCard?.classList.add('hidden');
    }
  }

  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      uploadedFiles = [];
      processedFiles.forEach((f) => {
        if (f.url) URL.revokeObjectURL(f.url);
        if (f.originalUrl && f.originalUrl.startsWith('blob:')) URL.revokeObjectURL(f.originalUrl);
      });
      processedFiles = [];
      if (resultsList) resultsList.innerHTML = '';
      if (progressContainer) progressContainer.classList.add('hidden');
      if (batchStatsCard) batchStatsCard.classList.add('hidden');
      if (fileInput) fileInput.value = '';
      updateQueueUI();
    });
  }

  if (compressAllBtn) {
    compressAllBtn.addEventListener('click', () => {
      if (uploadedFiles.length === 0) return;
      if (resultsList) resultsList.innerHTML = '';
      processedFiles.forEach((f) => {
        if (f.url) URL.revokeObjectURL(f.url);
      });
      processedFiles = [];
      processBatch(uploadedFiles);
    });
  }

  // ── 8. Core Client-Side Image Compression Engine ─────────────
  function formatBytes(bytes, decimals = 1) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  /**
   * Concurrency Queue to process 100 to 500+ images smoothly
   * Uses 3 concurrent workers so mobile and desktop browsers never freeze or crash.
   */
  async function processBatch(files) {
    if (!files || files.length === 0) return;

    const totalToProcess = files.length;
    let completedCount = 0;

    // Show and initialize Progress Bar
    if (progressContainer) {
      progressContainer.classList.remove('hidden');
      if (progressBarFill) progressBarFill.style.width = '0%';
      if (progressPercentage) progressPercentage.textContent = '0%';
      if (progressStatusText) {
        progressStatusText.innerHTML = `
          <svg class="w-4 h-4 text-primary-600 animate-spin inline-block mr-1.5" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Optimizing ${totalToProcess} image${totalToProcess > 1 ? 's' : ''} in browser RAM...
        `;
      }
      if (progressCountText) progressCountText.textContent = `0 of ${totalToProcess} processed`;
    }

    const CONCURRENCY = 3;
    let index = 0;

    async function worker() {
      while (index < files.length) {
        const file = files[index++];
        try {
          const itemData = await compressSingleFile(file);
          processedFiles.push(itemData);
          renderResultCard(itemData);
          updateBatchStats();
        } catch (err) {
          console.error('Error compressing file:', file.name, err);
        } finally {
          completedCount++;
          const percent = Math.min(100, Math.round((completedCount / totalToProcess) * 100));
          if (progressBarFill) progressBarFill.style.width = `${percent}%`;
          if (progressPercentage) progressPercentage.textContent = `${percent}%`;
          if (progressCountText) progressCountText.textContent = `${completedCount} of ${totalToProcess} processed`;
        }
      }
    }

    const workers = [];
    const poolSize = Math.min(CONCURRENCY, files.length);
    for (let i = 0; i < poolSize; i++) {
      workers.push(worker());
    }

    await Promise.all(workers);

    // All complete state
    if (progressStatusText) {
      progressStatusText.innerHTML = `
        <span class="inline-flex items-center text-action-700 font-bold">
          <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
          All ${totalToProcess} images compressed successfully!
        </span>
      `;
    }

    if (downloadAllBtn && processedFiles.length > 1) {
      downloadAllBtn.classList.remove('hidden');
      downloadAllBtn.classList.add('inline-flex');
    }
  }

  function compressSingleFile(file) {
    return new Promise((resolve) => {
      // Use Blob URL for low memory footprint
      const originalBlobUrl = URL.createObjectURL(file);
      const img = new Image();
      img.decoding = 'async';

      img.onload = async function () {
        const userQuality = parseInt(qualityRange?.value || '80', 10) / 100;
        let selectedFormat = formatSelect ? formatSelect.value : 'original';

        if (selectedFormat === 'original') {
          if (file.type === 'image/png') {
            selectedFormat = 'image/png';
          } else if (file.type === 'image/webp') {
            selectedFormat = 'image/webp';
          } else {
            selectedFormat = 'image/jpeg';
          }
        }

        // Clamp excessive dimensions (e.g. 50MP DSLR photos) to max 4096px to protect memory
        const MAX_DIM = 4096;
        let targetWidth = img.naturalWidth || img.width;
        let targetHeight = img.naturalHeight || img.height;

        if (targetWidth > MAX_DIM || targetHeight > MAX_DIM) {
          if (targetWidth > targetHeight) {
            targetHeight = Math.round((targetHeight * MAX_DIM) / targetWidth);
            targetWidth = MAX_DIM;
          } else {
            targetWidth = Math.round((targetWidth * MAX_DIM) / targetHeight);
            targetHeight = MAX_DIM;
          }
        }

        // Draw onto canvas with high quality smoothing
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d', { alpha: true });

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // White background for JPEG only (prevents black background on transparent PNGs)
        if (selectedFormat === 'image/jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, targetWidth, targetHeight);
        }

        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        // Convert canvas to compressed Blob
        let compressedBlob = await new Promise((res) => {
          canvas.toBlob(
            (blob) => res(blob),
            selectedFormat,
            selectedFormat === 'image/png' ? undefined : userQuality
          );
        });

        // Fallback safety
        if (!compressedBlob) {
          compressedBlob = file;
        }

        const blobUrl = URL.createObjectURL(compressedBlob);
        let extension = 'jpg';
        if (selectedFormat === 'image/png') extension = 'png';
        else if (selectedFormat === 'image/webp') extension = 'webp';
        else if (selectedFormat === 'image/jpeg') extension = 'jpg';

        const rawName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
        const outputName = `${rawName}-compressed.${extension}`;

        const itemData = {
          original: file,
          blob: compressedBlob,
          url: blobUrl,
          name: outputName,
          originalSize: file.size,
          newSize: compressedBlob.size,
          width: targetWidth,
          height: targetHeight,
          originalUrl: originalBlobUrl,
        };

        resolve(itemData);
      };

      img.onerror = function () {
        console.warn('Could not decode image:', file.name);
        resolve({
          original: file,
          blob: file,
          url: originalBlobUrl,
          name: file.name,
          originalSize: file.size,
          newSize: file.size,
          width: 0,
          height: 0,
          originalUrl: originalBlobUrl,
        });
      };

      img.src = originalBlobUrl;
    });
  }

  // ── 9. Batch Metrics & Stats Calculation ─────────────────────
  function updateBatchStats() {
    if (!batchStatsCard) return;

    const count = processedFiles.length;
    if (count === 0) {
      batchStatsCard.classList.add('hidden');
      return;
    }

    let totalOrig = 0;
    let totalNew = 0;
    processedFiles.forEach((item) => {
      totalOrig += item.originalSize;
      totalNew += item.newSize;
    });

    const totalSaved = Math.max(0, totalOrig - totalNew);
    const savingsPercent = totalOrig > 0 ? Math.round((totalSaved / totalOrig) * 100) : 0;

    batchStatsCard.classList.remove('hidden');

    if (statTotalCount) statTotalCount.textContent = `${count}`;
    if (statOriginalSize) statOriginalSize.textContent = formatBytes(totalOrig);
    if (statNewSize) statNewSize.textContent = formatBytes(totalNew);
    if (statSavingsPercent) statSavingsPercent.innerHTML = `&darr; ${savingsPercent}% Saved`;

    if (resultsCount) resultsCount.textContent = `${count}`;
    if (downloadZipBtnText) downloadZipBtnText.textContent = `Download All as ZIP (${count} Files)`;
  }

  // ── 10. Result Card Rendering with Compare & Download ────────
  function renderResultCard(item) {
    if (!resultsList) return;

    const savings = Math.max(0, Math.round(((item.originalSize - item.newSize) / item.originalSize) * 100));
    const isSmaller = item.newSize < item.originalSize;

    const card = document.createElement('div');
    card.className =
      'bg-white rounded-2xl p-4 sm:p-5 border border-surface-border shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in hover:border-primary-300 transition-all';

    card.innerHTML = `
      <div class="flex items-center gap-3.5 w-full sm:w-auto min-w-0">
        <!-- Thumbnail with preview trigger -->
        <button type="button" class="preview-btn relative flex-shrink-0 group focus:outline-none rounded-xl overflow-hidden" title="Click to inspect quality">
          <img src="${item.url}" alt="${item.name}" class="w-16 h-16 rounded-xl object-cover border border-slate-200 bg-slate-50 shadow-2xs group-hover:scale-105 transition-transform" />
          <div class="absolute inset-0 bg-primary-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          </div>
        </button>

        <div class="min-w-0 flex-1">
          <h5 class="text-xs sm:text-sm font-bold text-dark-slate truncate max-w-[200px] sm:max-w-xs" title="${item.name}">${item.name}</h5>
          <div class="flex items-center gap-2 text-[11px] sm:text-xs text-slate-500 mt-1 flex-wrap">
            ${item.width ? `<span>${item.width} &times; ${item.height} px</span><span>•</span>` : ''}
            <span class="line-through text-slate-400">${formatBytes(item.originalSize)}</span>
            <span>&rarr;</span>
            <span class="font-bold text-primary-700">${formatBytes(item.newSize)}</span>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between sm:justify-end gap-2 sm:gap-2.5 w-full sm:w-auto flex-shrink-0">
        <!-- Savings Badge -->
        ${
          isSmaller
            ? `<span class="px-2.5 py-1 text-[11px] sm:text-xs font-bold bg-action-50 text-action-700 border border-action-200 rounded-lg whitespace-nowrap">
                &darr; ${savings}% Saved
              </span>`
            : `<span class="px-2.5 py-1 text-[11px] sm:text-xs font-bold bg-slate-100 text-slate-600 rounded-lg whitespace-nowrap">Optimized</span>`
        }

        <!-- Compare Button -->
        <button type="button" class="compare-btn inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all" title="Side-by-side quality comparison">
          <svg class="w-3.5 h-3.5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          <span class="hidden sm:inline">Compare</span>
        </button>

        <!-- Individual Download Button -->
        <a href="${item.url}" download="${item.name}" class="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-bold text-white bg-action-600 hover:bg-action-700 active:scale-95 rounded-xl shadow-xs transition-all">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Download</span>
        </a>
      </div>
    `;

    // Hook compare modal events
    const compareBtn = card.querySelector('.compare-btn');
    const previewBtn = card.querySelector('.preview-btn');
    const openModal = () => openCompareModal(item);
    if (compareBtn) compareBtn.addEventListener('click', openModal);
    if (previewBtn) previewBtn.addEventListener('click', openModal);

    resultsList.appendChild(card);
  }

  // ── 11. Compare Modal Logic ──────────────────────────────────
  function openCompareModal(item) {
    if (!compareModal) return;
    if (compareOrigImg) compareOrigImg.src = item.originalUrl || item.url;
    if (compareNewImg) compareNewImg.src = item.url;
    if (compareOrigSize) compareOrigSize.textContent = `${formatBytes(item.originalSize)} (Original)`;
    if (compareNewSize) compareNewSize.textContent = `${formatBytes(item.newSize)} (Optimized)`;

    compareModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  function closeCompareModal() {
    if (!compareModal) return;
    compareModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  if (closeCompareModalBtn) closeCompareModalBtn.addEventListener('click', closeCompareModal);
  if (closeCompareModalBottomBtn) closeCompareModalBottomBtn.addEventListener('click', closeCompareModal);

  if (compareModal) {
    compareModal.addEventListener('click', (e) => {
      if (e.target === compareModal) {
        closeCompareModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !compareModal.classList.contains('hidden')) {
        closeCompareModal();
      }
    });
  }

  // ── 12. Bulk ZIP Download Engine (JSZip) ──────────────────────
  if (downloadZipBtn) {
    downloadZipBtn.addEventListener('click', async () => {
      if (processedFiles.length === 0) return;

      // Check if JSZip is loaded
      if (typeof window.JSZip === 'undefined') {
        alert('ZIP library is loading. Please download individually or try again in a moment.');
        return;
      }

      downloadZipBtn.disabled = true;
      const originalText = downloadZipBtnText ? downloadZipBtnText.textContent : 'Download All as ZIP';
      if (downloadZipBtnText) downloadZipBtnText.textContent = 'Packaging ZIP (0%)...';

      try {
        const zip = new window.JSZip();

        // Add all processed images into the ZIP
        processedFiles.forEach((item) => {
          zip.file(item.name, item.blob);
        });

        // Generate the ZIP blob with progress
        const zipBlob = await zip.generateAsync(
          {
            type: 'blob',
            compression: 'DEFLATE',
            compressionOptions: { level: 6 },
          },
          (metadata) => {
            if (downloadZipBtnText) {
              downloadZipBtnText.textContent = `Packaging ZIP (${Math.round(metadata.percent)}%)...`;
            }
          }
        );

        // Trigger Download
        const zipUrl = URL.createObjectURL(zipBlob);
        const a = document.createElement('a');
        a.href = zipUrl;
        a.download = `compressed-images-${Date.now()}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        setTimeout(() => URL.revokeObjectURL(zipUrl), 30000);

        if (downloadZipBtnText) downloadZipBtnText.textContent = 'Download Started!';
        setTimeout(() => {
          if (downloadZipBtnText) downloadZipBtnText.textContent = originalText;
          downloadZipBtn.disabled = false;
        }, 2000);
      } catch (err) {
        console.error('Error generating ZIP:', err);
        alert('Failed to generate ZIP archive. Falling back to individual downloads.');
        if (downloadZipBtnText) downloadZipBtnText.textContent = originalText;
        downloadZipBtn.disabled = false;
      }
    });
  }

  // ── 13. Sequential Multi-Download Fallback ───────────────────
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

  // Initial Run
  document.addEventListener('DOMContentLoaded', () => {
    handleUrlKeywords();
  });
})();
