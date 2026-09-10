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
  const progressSpinner = document.getElementById('progressSpinner');
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
  const compareFileName = document.getElementById('compareFileName');
  const compareOrigImg = document.getElementById('compareOrigImg');
  const compareNewImg = document.getElementById('compareNewImg');
  const compareOrigSize = document.getElementById('compareOrigSize');
  const compareNewSize = document.getElementById('compareNewSize');
  const compareOrigSizeBadge = document.getElementById('compareOrigSizeBadge');
  const compareNewSizeBadge = document.getElementById('compareNewSizeBadge');
  const compareSavingsBadge = document.getElementById('compareSavingsBadge');
  const compareDimensionsBadge = document.getElementById('compareDimensionsBadge');
  const compareDownloadBtn = document.getElementById('compareDownloadBtn');
  const closeCompareModalBtn = document.getElementById('closeCompareModalBtn');
  const closeCompareModalBottomBtn = document.getElementById('closeCompareModalBottomBtn');

  // Modal View Toggle & Split Slider Elements
  const compareViewSideBtn = document.getElementById('compareViewSideBtn');
  const compareViewSliderBtn = document.getElementById('compareViewSliderBtn');
  const compareSideView = document.getElementById('compareSideView');
  const compareSliderView = document.getElementById('compareSliderView');
  const compareSliderOrigImg = document.getElementById('compareSliderOrigImg');
  const compareSliderNewImg = document.getElementById('compareSliderNewImg');
  const compareSliderClip = document.getElementById('compareSliderClip');
  const compareSliderDivider = document.getElementById('compareSliderDivider');
  const compareRangeSlider = document.getElementById('compareRangeSlider');

  // Nav & Header
  const langToggleBtn = document.getElementById('langToggleBtn');
  const langMenu = document.getElementById('langMenu');
  const langChevron = document.getElementById('langChevron');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');

  // State
  let uploadedFiles = []; // Array of File objects
  let processedFiles = []; // Array of { original, blob, url, name, originalSize, newSize, width, height, originalUrl }
  let currentBatchId = 0; // Guard against race conditions during rapid re-compression / slider movements
  let liveDebounceTimer = null; // Debounce timer for real-time slider updates

  // ── 2. Multilingual System (Client-Side & Dynamic Strings) ──
  const pageLang = document.documentElement.lang || 'en';

  // Synchronize localStorage with current page language
  try {
    localStorage.setItem('compress_lang', pageLang);
  } catch (e) {}

  function getLangString(key, fallback) {
    if (window.COMPRESS_LANGS && window.COMPRESS_LANGS[pageLang] && window.COMPRESS_LANGS[pageLang][key]) {
      return window.COMPRESS_LANGS[pageLang][key];
    }
    if (window.COMPRESS_LANGS && window.COMPRESS_LANGS['en'] && window.COMPRESS_LANGS['en'][key]) {
      return window.COMPRESS_LANGS['en'][key];
    }
    return fallback;
  }

  function handleUrlKeywords() {
    const urlParams = new URLSearchParams(window.location.search);
    const toolParam = urlParams.get('tool');

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

    // Save selected language on click and allow clean navigation
    langMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        const chosenLang = link.getAttribute('data-lang');
        if (chosenLang) {
          try {
            localStorage.setItem('compress_lang', chosenLang);
          } catch (e) {}
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

  // Also hook mobile drawer language links
  if (mobileDrawer) {
    mobileDrawer.querySelectorAll('a[data-lang]').forEach(link => {
      link.addEventListener('click', () => {
        const chosenLang = link.getAttribute('data-lang');
        if (chosenLang) {
          try {
            localStorage.setItem('compress_lang', chosenLang);
          } catch (e) {}
        }
      });
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
  function updatePresetHighlights(val) {
    document.querySelectorAll('.quality-preset-btn').forEach(btn => {
      if (btn.getAttribute('data-quality') === String(val)) {
        btn.classList.add('border-primary-300', 'bg-primary-50', 'text-primary-700', 'ring-2', 'ring-primary-500/20');
        btn.classList.remove('border-slate-200', 'bg-white', 'text-slate-600');
        const span = btn.querySelector('span');
        if (span) {
          span.classList.add('text-primary-600', 'font-bold');
          span.classList.remove('text-slate-500');
        }
      } else {
        btn.classList.remove('border-primary-300', 'bg-primary-50', 'text-primary-700', 'ring-2', 'ring-primary-500/20');
        btn.classList.add('border-slate-200', 'bg-white', 'text-slate-600');
        const span = btn.querySelector('span');
        if (span) {
          span.classList.remove('text-primary-600', 'font-bold');
          span.classList.add('text-slate-500');
        }
      }
    });
  }

  function triggerLiveRecompress(delayMs = 180) {
    if (uploadedFiles.length === 0) return;
    clearTimeout(liveDebounceTimer);
    liveDebounceTimer = setTimeout(() => {
      if (compressAllBtn) {
        compressAllBtn.click();
      }
    }, delayMs);
  }

  if (qualityRange && qualityVal) {
    qualityRange.addEventListener('input', () => {
      qualityVal.textContent = `${qualityRange.value}%`;
      updatePresetHighlights(qualityRange.value);
      // Run-time real-time optimization smoothly as slider moves
      triggerLiveRecompress(180);
    });

    qualityRange.addEventListener('change', () => {
      qualityVal.textContent = `${qualityRange.value}%`;
      updatePresetHighlights(qualityRange.value);
      // Ensure final slider drop immediately triggers if not already triggered
      triggerLiveRecompress(0);
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
          updatePresetHighlights(val);
          triggerLiveRecompress(0);
        }
      });
    });
  }

  // Visual Output Format Cards
  const formatCards = document.querySelectorAll('.format-card');
  function updateActiveFormatCard(targetFormatVal) {
    formatCards.forEach(card => {
      const cardFormat = card.getAttribute('data-format');
      
      // Base removal
      card.classList.remove(
        'border-primary-600', 'bg-primary-50/70', 'text-primary-900', 'shadow-sm', 'ring-2', 'ring-primary-500/20',
        'border-slate-200', 'bg-white', 'text-slate-700', 'hover:border-slate-300', 'hover:bg-slate-100',
        'is-active', 'bg-slate-100', 'ring-slate-400', 'border-slate-400', 'bg-slate-50/70',
        'border-blue-600', 'bg-blue-50/70', 'text-blue-900', 'ring-blue-500/20', 'border-blue-200/60', 'bg-blue-50/30', 'text-blue-800', 'hover:border-blue-300', 'hover:bg-blue-50/60',
        'border-emerald-600', 'bg-emerald-50/70', 'text-emerald-900', 'ring-emerald-500/20', 'border-emerald-200/60', 'bg-emerald-50/30', 'text-emerald-800', 'hover:border-emerald-300', 'hover:bg-emerald-50/60',
        'border-amber-600', 'bg-amber-50/70', 'text-amber-900', 'ring-amber-500/20', 'border-amber-200/60', 'bg-amber-50/30', 'text-amber-800', 'hover:border-amber-300', 'hover:bg-amber-50/60'
      );
      
      const isActive = (cardFormat === targetFormatVal);
      
      if (cardFormat === 'original') {
         if (isActive) card.classList.add('border-primary-600', 'bg-primary-50/70', 'text-primary-900', 'shadow-sm', 'ring-2', 'ring-primary-500/20');
         else card.classList.add('border-slate-200', 'bg-slate-50/70', 'text-slate-700', 'hover:border-slate-300', 'hover:bg-slate-100');
      } else if (cardFormat === 'image/jpeg') {
         if (isActive) card.classList.add('border-blue-600', 'bg-blue-50/70', 'text-blue-900', 'shadow-sm', 'ring-2', 'ring-blue-500/20');
         else card.classList.add('border-blue-200/60', 'bg-blue-50/30', 'text-blue-800', 'hover:border-blue-300', 'hover:bg-blue-50/60');
      } else if (cardFormat === 'image/webp') {
         if (isActive) card.classList.add('border-emerald-600', 'bg-emerald-50/70', 'text-emerald-900', 'shadow-sm', 'ring-2', 'ring-emerald-500/20');
         else card.classList.add('border-emerald-200/60', 'bg-emerald-50/30', 'text-emerald-800', 'hover:border-emerald-300', 'hover:bg-emerald-50/60');
      } else if (cardFormat === 'image/png') {
         if (isActive) card.classList.add('border-amber-600', 'bg-amber-50/70', 'text-amber-900', 'shadow-sm', 'ring-2', 'ring-amber-500/20');
         else card.classList.add('border-amber-200/60', 'bg-amber-50/30', 'text-amber-800', 'hover:border-amber-300', 'hover:bg-amber-50/60');
      }
    });
  }

  // Force 'original' (Auto) format selection by default on all pages
  if (formatSelect) {
    formatSelect.value = 'original';
    updateActiveFormatCard('original');
  }

  // UI Improvement: Remove excessive nested borders and padding from the settings wrapper
  const settingsGrid = document.querySelector('#settingsPanel > .grid');
  if (settingsGrid) {
    settingsGrid.classList.remove('bg-slate-50/70', 'p-4', 'sm:p-5', 'rounded-2xl', 'border', 'border-surface-border', 'shadow-soft');
    settingsGrid.classList.add('pt-2');
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

    // Auto-scroll so results and download buttons appear immediately in eye focus
    setTimeout(() => {
      if (resultsContainer) {
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 120);
  }

  function updateQueueUI() {
    const count = uploadedFiles.length;
    if (queueCount) {
      queueCount.textContent = `${count} image${count === 1 ? '' : 's'} queued`;
    }
    if (count > 0) {
      clearAllBtn?.classList.remove('hidden');
      clearAllBtn?.classList.add('inline-flex');
      batchStatsCard?.classList.remove('hidden');
      resultsContainer?.classList.remove('hidden');
      dropzone?.classList.add('compact-mode');
    } else {
      clearAllBtn?.classList.add('hidden');
      clearAllBtn?.classList.remove('inline-flex');
      downloadAllBtn?.classList.add('hidden');
      downloadAllBtn?.classList.remove('inline-flex');
      resultsContainer?.classList.add('hidden');
      batchStatsCard?.classList.add('hidden');
      dropzone?.classList.remove('compact-mode');
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

    // Increment batch ID so any previous in-flight compression is invalidated
    const thisBatchId = ++currentBatchId;

    const totalToProcess = files.length;
    let completedCount = 0;

    // Show and initialize Progress Bar
    if (progressContainer) {
      progressContainer.classList.remove('hidden');
      if (progressBarFill) progressBarFill.style.width = '0%';
      if (progressPercentage) progressPercentage.textContent = '0%';
      if (progressSpinner) progressSpinner.classList.remove('hidden');
      if (progressStatusText) {
        progressStatusText.innerHTML = `<span style="color: #0f172a !important;">${getLangString('progress_optimizing', 'Compressing images in browser RAM...')} (${totalToProcess})</span>`;
      }
      if (progressCountText) progressCountText.textContent = `0 / ${totalToProcess}`;
    }

    const CONCURRENCY = 3;
    let index = 0;

    async function worker() {
      while (index < files.length) {
        // If a newer batch was triggered (e.g. user dragged slider), abandon this worker immediately
        if (thisBatchId !== currentBatchId) return;

        const file = files[index++];
        try {
          const itemData = await compressSingleFile(file);
          if (thisBatchId !== currentBatchId) {
            if (itemData.url) URL.revokeObjectURL(itemData.url);
            return;
          }
          processedFiles.push(itemData);
          renderResultCard(itemData);
          updateBatchStats();
        } catch (err) {
          console.error('Error compressing file:', file.name, err);
        } finally {
          if (thisBatchId === currentBatchId) {
            completedCount++;
            const percent = Math.min(100, Math.round((completedCount / totalToProcess) * 100));
            if (progressBarFill) progressBarFill.style.width = `${percent}%`;
            if (progressPercentage) progressPercentage.textContent = `${percent}%`;
            if (progressCountText) progressCountText.textContent = `${completedCount} / ${totalToProcess}`;
          }
        }
      }
    }

    const workers = [];
    const poolSize = Math.min(CONCURRENCY, files.length);
    for (let i = 0; i < poolSize; i++) {
      workers.push(worker());
    }

    await Promise.all(workers);

    // If superseded by a newer batch, do not update final UI state
    if (thisBatchId !== currentBatchId) return;

    // All complete state
    if (progressSpinner) progressSpinner.classList.add('hidden');
    if (progressStatusText) {
      progressStatusText.innerHTML = `
        <span class="inline-flex items-center font-bold" style="color: #047857 !important;">
          <svg class="w-4 h-4 mr-1.5" style="color: #059669 !important;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
          ${getLangString('progress_done', 'All images compressed successfully!')}
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
        const userQuality = parseInt(qualityRange?.value || '60', 10) / 100;
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

        // Mobile Device Memory & iOS Safari Canvas Safeguard
        // Safari iOS crash threshold is ~16.7M pixels; cap iOS to 2560px and mobile to 3200px
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const MAX_DIM = isIOS ? 2560 : (isMobile ? 3200 : 4096);

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

        let targetExtension = selectedFormat === 'image/png' ? 'png' : selectedFormat === 'image/webp' ? 'webp' : 'jpg';
        let originalExtension = file.type === 'image/png' ? 'png' : (file.type === 'image/webp' ? 'webp' : 'jpg');

        if (compressedBlob.size >= file.size) {
          const isSameFormat = (selectedFormat === 'original' || targetExtension === originalExtension);
          if (isSameFormat) {
            compressedBlob = file;
            targetExtension = originalExtension;
          }
        }

        const blobUrl = URL.createObjectURL(compressedBlob);
        const extension = targetExtension;

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

        // Instant resolution without artificial lag so real-time slider updates are snappy
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
    if (statSavingsPercent) statSavingsPercent.textContent = `${savingsPercent}%`;

    if (resultsCount) resultsCount.textContent = `${count}`;
    const baseDlText = getLangString('download_all_zip', 'Download all images');
    if (downloadZipBtnText) downloadZipBtnText.textContent = count > 1 ? `${baseDlText} (${count})` : baseDlText;
  }

  // ── 10. Result Row Rendering (TinyPNG-Style High Clarity Strip) ─
  function renderResultCard(item) {
    if (!resultsList) return;

    const savingsRaw = Math.round(((item.originalSize - item.newSize) / item.originalSize) * 100);
    const isSmaller = item.newSize <= item.originalSize;
    const absSavings = Math.abs(savingsRaw);
    
    const fileExt = item.name.split('.').pop().toUpperCase();

    const row = document.createElement('div');
    row.className =
      'flex items-center justify-between p-2.5 sm:p-3 hover:bg-slate-50/90 transition-colors gap-2 sm:gap-4 group animate-fade-in';

    // Format badge color accent (like TinyPNG format tags)
    const isPng = fileExt === 'PNG';
    const isWebp = fileExt === 'WEBP';
    const badgeClass = isPng 
      ? 'bg-blue-50 text-blue-600 border-blue-200' 
      : (isWebp ? 'bg-purple-50 text-purple-600 border-purple-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200');
      
    const percentColorClass = isSmaller ? 'text-emerald-700' : 'text-rose-600';

    row.innerHTML = `
      <!-- Left: Thumbnail Preview & File Metadata -->
      <div class="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
        <!-- Thumbnail Preview -->
        <button type="button" class="preview-btn relative flex-shrink-0 focus:outline-none rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs group-hover:border-primary-400 transition-all cursor-pointer" title="Click to preview & compare">
          <img src="${item.url}" alt="${item.name}" class="w-10 h-10 sm:w-11 sm:h-11 object-cover" />
          <div class="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          </div>
        </button>

        <!-- Filename & Original File Size -->
        <div class="min-w-0 flex-1">
          <h5 class="text-xs sm:text-sm font-semibold text-slate-800 truncate" title="${item.name}">${item.name}</h5>
          <div class="flex items-center gap-1.5 mt-0.5 text-xs">
            <span class="inline-block px-1.5 py-0.5 text-[10px] font-extrabold uppercase rounded border ${badgeClass} font-mono tracking-wider">${fileExt}</span>
            <span class="text-slate-600 font-semibold text-[11px] sm:text-xs">${formatBytes(item.originalSize)}</span>
          </div>
        </div>
      </div>

      <!-- Right: Savings %, New Size & Action Buttons -->
      <div class="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        <!-- Savings Percentage & New Compressed Size -->
        <div class="text-right min-w-[55px] sm:min-w-[70px]">
          <span class="text-xs sm:text-sm font-black ${percentColorClass} font-mono block">
            ${isSmaller ? (absSavings === 0 ? '0%' : `-${absSavings}%`) : `+${absSavings}%`}
          </span>
          <span class="text-[11px] sm:text-xs text-slate-600 font-semibold block">${formatBytes(item.newSize)}</span>
        </div>

        <!-- Compare Modal Trigger Button -->
        <button type="button" class="compare-btn p-1.5 text-slate-500 hover:text-primary-700 hover:bg-slate-100 rounded-lg transition-all cursor-pointer" title="Inspect Original vs Compressed">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
        </button>

        <!-- Individual Download Pill Button (TinyPNG Style: Download Icon + Format Tag) -->
        <a href="${item.url}" download="${item.name}" class="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-white bg-slate-100 hover:bg-emerald-600 border border-slate-200 hover:border-emerald-600 rounded-lg shadow-sm transition-all cursor-pointer group-btn" title="Download ${item.name}">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span class="font-mono uppercase text-[11px] font-extrabold">${fileExt}</span>
        </a>
      </div>
    `;

    // Hook compare modal events
    const compareBtn = row.querySelector('.compare-btn');
    const previewBtn = row.querySelector('.preview-btn');
    const openModal = () => openCompareModal(item);
    if (compareBtn) compareBtn.addEventListener('click', openModal);
    if (previewBtn) previewBtn.addEventListener('click', openModal);

    resultsList.appendChild(row);
  }

  // ── 11. Compare Modal Logic ──────────────────────────────────
  function setCompareView(mode) {
    if (mode === 'side') {
      if (compareSideView) compareSideView.classList.remove('hidden');
      if (compareSliderView) compareSliderView.classList.add('hidden');

      if (compareViewSideBtn) {
        compareViewSideBtn.classList.add('bg-white', 'text-dark-slate', 'shadow-xs');
        compareViewSideBtn.classList.remove('text-slate-600');
      }
      if (compareViewSliderBtn) {
        compareViewSliderBtn.classList.remove('bg-white', 'text-dark-slate', 'shadow-xs');
        compareViewSliderBtn.classList.add('text-slate-600');
      }
    } else {
      if (compareSideView) compareSideView.classList.add('hidden');
      if (compareSliderView) compareSliderView.classList.remove('hidden');

      if (compareViewSliderBtn) {
        compareViewSliderBtn.classList.add('bg-white', 'text-dark-slate', 'shadow-xs');
        compareViewSliderBtn.classList.remove('text-slate-600');
      }
      if (compareViewSideBtn) {
        compareViewSideBtn.classList.remove('bg-white', 'text-dark-slate', 'shadow-xs');
        compareViewSideBtn.classList.add('text-slate-600');
      }
    }
  }

  function openCompareModal(item) {
    if (!compareModal) return;

    // Populate images for both views
    const origSrc = item.originalUrl || item.url;
    const newSrc = item.url;

    if (compareOrigImg) compareOrigImg.src = origSrc;
    if (compareNewImg) compareNewImg.src = newSrc;
    if (compareSliderOrigImg) compareSliderOrigImg.src = origSrc;
    if (compareSliderNewImg) compareSliderNewImg.src = newSrc;

    // Populate filename
    if (compareFileName) compareFileName.textContent = item.name || 'Optimized Image';

    // Populate sizes
    const formattedOrig = formatBytes(item.originalSize);
    const formattedNew = formatBytes(item.newSize);

    if (compareOrigSize) compareOrigSize.textContent = formattedOrig;
    if (compareNewSize) compareNewSize.textContent = formattedNew;
    if (compareOrigSizeBadge) compareOrigSizeBadge.textContent = formattedOrig;
    if (compareNewSizeBadge) compareNewSizeBadge.textContent = formattedNew;

    // Calculate percentage savings
    const savings = Math.max(0, Math.round(((item.originalSize - item.newSize) / item.originalSize) * 100));
    if (compareSavingsBadge) {
      compareSavingsBadge.textContent = item.newSize < item.originalSize ? `-${savings}%` : '0%';
    }

    // Populate dimensions
    if (compareDimensionsBadge) {
      if (item.width && item.height) {
        compareDimensionsBadge.textContent = `${item.width} × ${item.height} px`;
        compareDimensionsBadge.classList.remove('hidden');
      } else {
        compareDimensionsBadge.classList.add('hidden');
      }
    }

    // Populate direct download button
    if (compareDownloadBtn) {
      compareDownloadBtn.href = item.url;
      compareDownloadBtn.download = item.name || 'compressed-image';
    }

    // Reset slider to center (50%)
    if (compareRangeSlider) compareRangeSlider.value = '50';
    if (compareSliderClip) compareSliderClip.style.clipPath = 'inset(0 0 0 50%)';
    if (compareSliderDivider) compareSliderDivider.style.left = '50%';

    // Default to Side-by-Side view on modal open
    setCompareView('side');

    compareModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  function closeCompareModal() {
    if (!compareModal) return;
    compareModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  // Hook toggle tabs
  if (compareViewSideBtn) {
    compareViewSideBtn.addEventListener('click', () => setCompareView('side'));
  }
  if (compareViewSliderBtn) {
    compareViewSliderBtn.addEventListener('click', () => setCompareView('slider'));
  }

  // Hook interactive split slider
  if (compareRangeSlider) {
    compareRangeSlider.addEventListener('input', () => {
      const val = compareRangeSlider.value;
      if (compareSliderClip) compareSliderClip.style.clipPath = `inset(0 0 0 ${val}%)`;
      if (compareSliderDivider) compareSliderDivider.style.left = `${val}%`;
    });
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

  // ── 13. Sequential Multi-Download Fallback & Bottom Action ───
  if (downloadAllBtn) {
    downloadAllBtn.addEventListener('click', () => {
      if (downloadZipBtn && processedFiles.length > 1) {
        downloadZipBtn.click();
        return;
      }
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

  // ── 14. Floating Bottom-Right Back To Top Handler ───
  const floatingBackToTop = document.getElementById('floatingBackToTop');
  if (floatingBackToTop) {
    const checkScroll = () => {
      if (window.scrollY > 150) {
        floatingBackToTop.classList.add('visible');
      } else {
        floatingBackToTop.classList.remove('visible');
      }
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  }

  // Initial Run
  document.addEventListener('DOMContentLoaded', () => {
    handleUrlKeywords();
  });
})();
