// ============================================================
// utils.js ï؟½ ï؟½ï؟½ï؟½ï؟½?ï؟½ï؟½ï؟½?ï؟½?ï؟½ï؟½ï؟½ï؟½ ï؟½ï؟½ï؟½ï؟½?ï؟½  v2.4
// ?? ï؟½?ï؟½?ï؟½ ï؟½?ï؟½ data.js ï؟½ app.js ï؟½ï؟½ï؟½ بکï؟½?ï؟½
// ============================================================

// ===== XSS Protection =====
function escHtml(str) {
  if (str == null) return '';
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(String(str)));
  return div.innerHTML;
}

// ===== Storage Engine: Demo Sandbox (In-Memory / Session Isolated) =====
(function initPMStorage() {
  if (window.PMStorage) return;

  const PREFIX = 'pm_';
  const cloneValue = value => {
    if (value == null) return value;
    try {
      if (typeof structuredClone === 'function') return structuredClone(value);
    } catch (_) {}
    return JSON.parse(JSON.stringify(value));
  };

  // داتای سەرەتایی نموونەیی بۆ دۆخی تاقیکاری (Default Kurdish Demo Dataset)
  const DEFAULT_DEMO_SEED = {
    currencies: [
      { code: 'IQD', name: 'دیناری عێراقی',  flag: '🇮🇶', rateToUSD: 1310,  symbol: 'IQD' },
      { code: 'USD', name: 'دۆلاری ئەمریکی', flag: '🇺🇸', rateToUSD: 1,     symbol: '$'   },
      { code: 'TRY', name: 'لیرەی تورکی',    flag: '🇹🇷', rateToUSD: 32.5,  symbol: '₺'   },
      { code: 'EUR', name: 'یۆرۆ',           flag: '🇪🇺', rateToUSD: 0.92,  symbol: '€'   },
      { code: 'IRR', name: 'ڕیالی ئێرانی',   flag: '🇮🇷', rateToUSD: 42000, symbol: '﷼'   },
      { code: 'SAR', name: 'ڕیالی سعودی',    flag: '🇸🇦', rateToUSD: 3.75,  symbol: 'SR'  },
      { code: 'CNY', name: 'یووانی چینی',    flag: '🇨🇳', rateToUSD: 7.24,  symbol: '¥'   }
    ],
    suppliers: [
      { id: 1, name: 'کۆمپانیای ئارام بۆ هاوردەکردن', phone: '07501234567', note: 'هاوردەکاری سەرەکی خۆراک' },
      { id: 2, name: 'بازرگانی ڕاستی - هەڵەبجە', phone: '07709876543', note: 'کۆگای گشتی و فرۆشتنی کۆ' },
      { id: 3, name: 'کۆمپانیای زاگرۆس بۆ بەرهەمی پاککەرەوە', phone: '07512345678', note: 'شامپۆ و پاککەرەوە' }
    ],
    products: [
      { id: 1001, name: 'برنجی کوردی پلە یەک', unit: 'فەردە', supplier: 'کۆمپانیای ئارام بۆ هاوردەکردن', note: 'کوالیتی بەرز و دەنک درێژ' },
      { id: 1002, name: 'ڕۆنی زەیتوون ٥ لیتر', unit: 'دەبە', supplier: 'کۆمپانیای ئارام بۆ هاوردەکردن', note: 'سروشتی ١٠٠٪' },
      { id: 1003, name: 'چای سەیلان سوور', unit: 'کارتۆن', supplier: 'بازرگانی ڕاستی - هەڵەبجە', note: 'تامی تایبەت و ڕەنگی تۆخ' },
      { id: 1004, name: 'شەکر ٥٠ کیلۆیی', unit: 'فەردە', supplier: 'کۆمپانیای ئارام بۆ هاوردەکردن', note: 'شەکری بەرازیلی پلە یەک' },
      { id: 1005, name: 'زەیتی مەحموود ١ لیتر', unit: 'کارتۆن', supplier: 'بازرگانی ڕاستی - هەڵەبجە', note: '١٢ دانە لە کارتۆنێکدا' },
      { id: 1006, name: 'شامپۆی کلیر ٤٠٠ مل', unit: 'کارتۆن', supplier: 'کۆمپانیای زاگرۆس بۆ بەرهەمی پاککەرەوە', note: 'پیاوان و خانمان' }
    ],
    customerTokens: {
      "07504441122": { token: "demo-cust-token-1", name: "ئەحمەد عەلی", phone: "07504441122", createdAt: "2026-08-01T10:00:00.000Z", updatedAt: "2026-08-01T10:00:00.000Z" },
      "07705553344": { token: "demo-cust-token-2", name: "هاوکار محەمەد", phone: "07705553344", createdAt: "2026-08-05T11:00:00.000Z", updatedAt: "2026-08-05T11:00:00.000Z" },
      "07516667788": { token: "demo-cust-token-3", name: "ڕێبین جەمال", phone: "07516667788", createdAt: "2026-08-10T09:00:00.000Z", updatedAt: "2026-08-10T09:00:00.000Z" }
    },
    events: [
      // Loads (بارکردنی کۆگا)
      { id: 1, type: 'load', productId: 1001, date: '2026-08-01', qty: 50, unitCostUSD: 38, currency: 'USD', totalPrice: 1900, amountUSD: 1900, note: 'باری یەکەم لە کۆمپانیا' },
      { id: 2, type: 'load', productId: 1002, date: '2026-08-01', qty: 40, unitCostUSD: 18, currency: 'USD', totalPrice: 720, amountUSD: 720, note: 'ڕۆنی زەیتوونی نوێ' },
      { id: 3, type: 'load', productId: 1003, date: '2026-08-02', qty: 60, unitCostUSD: 22, currency: 'USD', totalPrice: 1320, amountUSD: 1320, note: 'چای سەیلان' },
      { id: 4, type: 'load', productId: 1004, date: '2026-08-02', qty: 30, unitCostUSD: 25, currency: 'USD', totalPrice: 750, amountUSD: 750, note: 'شەکر' },
      { id: 5, type: 'load', productId: 1005, date: '2026-08-03', qty: 50, unitCostUSD: 15, currency: 'USD', totalPrice: 750, amountUSD: 750, note: 'زەیتی مەحموود' },
      { id: 6, type: 'load', productId: 1006, date: '2026-08-03', qty: 40, unitCostUSD: 20, currency: 'USD', totalPrice: 800, amountUSD: 800, note: 'شامپۆ' },

      // Cash Sales (فرۆشتنی نەقد)
      { id: 7, type: 'sell_cash', productId: 1001, date: '2026-08-05', qty: 12, unitPrice: 48, totalPrice: 576, currency: 'USD', amountUSD: 576, buyer: 'کاک هەندرێن', phone: '07501112233', note: 'فرۆشتنی نەقد' },
      { id: 8, type: 'sell_cash', productId: 1002, date: '2026-08-07', qty: 15, unitPrice: 25, totalPrice: 375, currency: 'USD', amountUSD: 375, buyer: 'کاک ئاسۆ', phone: '07702223344', note: 'نەقد' },
      { id: 9, type: 'sell_cash', productId: 1003, date: '2026-08-10', qty: 20, unitPrice: 30, totalPrice: 600, currency: 'USD', amountUSD: 600, buyer: 'ئەحمەد عەلی', phone: '07504441122', customerToken: 'demo-cust-token-1', note: 'فرۆشتنی چا' },
      { id: 10, type: 'sell_cash', productId: 1004, date: '2026-08-12', qty: 10, unitPrice: 32, totalPrice: 320, currency: 'USD', amountUSD: 320, buyer: 'هاوکار محەمەد', phone: '07705553344', customerToken: 'demo-cust-token-2', note: 'نەقد' },
      { id: 11, type: 'sell_cash', productId: 1005, date: '2026-08-15', qty: 25, unitPrice: 21, totalPrice: 525, currency: 'USD', amountUSD: 525, buyer: 'ڕێبین جەمال', phone: '07516667788', customerToken: 'demo-cust-token-3', note: 'نەقد' },

      // Debt Sales (فرۆشتنی بە قەرز)
      { id: 12, type: 'sell_debt', productId: 1001, date: '2026-08-14', qty: 8, unitPrice: 48, totalPrice: 384, currency: 'USD', amountUSD: 384, buyer: 'ئەحمەد عەلی', phone: '07504441122', customerToken: 'demo-cust-token-1', dueDate: '2026-09-15', note: 'قەرزی برنج' },
      { id: 13, type: 'sell_debt', productId: 1002, date: '2026-08-16', qty: 10, unitPrice: 25, totalPrice: 250, currency: 'USD', amountUSD: 250, buyer: 'هاوکار محەمەد', phone: '07705553344', customerToken: 'demo-cust-token-2', dueDate: '2026-09-01', note: 'قەرزی ڕۆن' },
      { id: 14, type: 'sell_debt', productId: 1006, date: '2026-08-10', qty: 15, unitPrice: 28, totalPrice: 420, currency: 'USD', amountUSD: 420, buyer: 'ڕێبین جەمال', phone: '07516667788', customerToken: 'demo-cust-token-3', dueDate: '2026-08-20', note: 'قەرزی شامپۆ' },

      // Debt Repayments (دانەوەی قەرز)
      { id: 15, type: 'debt_pay', date: '2026-08-20', amount: 150, currency: 'USD', amountUSD: 150, buyer: 'ئەحمەد عەلی', phone: '07504441122', customerToken: 'demo-cust-token-1', note: 'پارەدانەوەی بەشێک لە قەرز' },
      { id: 16, type: 'debt_pay', date: '2026-08-22', amount: 100, currency: 'USD', amountUSD: 100, buyer: 'هاوکار محەمەد', phone: '07705553344', customerToken: 'demo-cust-token-2', note: 'پارەدانەوەی کاش' },

      // Expenses (خەرجییەکان)
      { id: 17, type: 'expense', date: '2026-08-01', amount: 250, currency: 'USD', amountUSD: 250, note: 'کرێی دوکان بۆ ئەم مانگە' },
      { id: 18, type: 'expense', date: '2026-08-10', amount: 60, currency: 'USD', amountUSD: 60, note: 'کارەبا و مۆلیدە' },
      { id: 19, type: 'expense', date: '2026-08-15', amount: 45, currency: 'USD', amountUSD: 45, note: 'کرێی گواستنەوە' }
    ],
    nextId: 2000,
    lastSyncAt: '',
    eventIndex: {},
    customerCache: {}
  };

  let memory = cloneValue(DEFAULT_DEMO_SEED);
  let localMeta = {};

  window.PMStorage = {
    prefix: PREFIX,
    ready: () => Promise.resolve(),
    isReady: () => true,
    mode: () => 'demo-sandbox',
    getSync(key) {
      return cloneValue(memory[String(key)]);
    },
    setSync(key, value) {
      memory[String(key)] = cloneValue(value);
      return cloneValue(value);
    },
    removeSync(key) {
      delete memory[String(key)];
    },
    clearSync() {
      memory = cloneValue(DEFAULT_DEMO_SEED);
      localMeta = {};
      return Promise.resolve(true);
    },
    resetDemoData() {
      memory = cloneValue(DEFAULT_DEMO_SEED);
      localMeta = {};
      return cloneValue(memory);
    },
    getLocalMeta(key) {
      return localMeta[String(key)] || null;
    },
    setLocalMeta(key, value) {
      localMeta[String(key)] = cloneValue(value);
    },
    removeLocalMeta(key) {
      delete localMeta[String(key)];
    },
    estimateManagedBytesSync() {
      try {
        return JSON.stringify(memory).length;
      } catch (_) {
        return 10240;
      }
    },
  };
})();

// ===== PWA registration + install prompt =====
(function initPWAHelpers() {
  if (typeof window === 'undefined') return;

  let deferredInstallPrompt = null;
  let serviceWorkerBootstrapped = false;

  function updateInstallButtons() {
    const canInstall = !!deferredInstallPrompt;
    document.querySelectorAll('[data-install-app]').forEach(btn => {
      btn.hidden = !canInstall;
      btn.setAttribute('aria-hidden', canInstall ? 'false' : 'true');
    });
  }

  async function registerPMServiceWorker() {
    if (serviceWorkerBootstrapped) return true;
    if (!('serviceWorker' in navigator) || !window.isSecureContext) return false;

    try {
      await navigator.serviceWorker.register('./sw.js');
      serviceWorkerBootstrapped = true;
      return true;
    } catch (err) {
      console.warn('[PWA] service worker registration failed', err);
      return false;
    }
  }

  async function installAppPrompt(btn) {
    if (!deferredInstallPrompt) return false;

    try {
      if (btn) {
        btn.disabled = true;
        btn.setAttribute('aria-busy', 'true');
      }
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice.catch(() => null);
    } finally {
      deferredInstallPrompt = null;
      updateInstallButtons();
      if (btn) {
        btn.disabled = false;
        btn.removeAttribute('aria-busy');
      }
    }
    return true;
  }

  window.registerPMServiceWorker = registerPMServiceWorker;
  window.installAppPrompt = installAppPrompt;

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredInstallPrompt = event;
    updateInstallButtons();
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    updateInstallButtons();
  });

  window.addEventListener('load', () => {
    registerPMServiceWorker();
    updateInstallButtons();
  }, { once: true });
})();

// ===== Step 5.1: ï؟½ï؟½دکï؟½ï؟½ï؟½?ï؟½?ï؟½ ï؟½ï؟½ï؟½?ï؟½ï؟½ ï؟½ 2 ï؟½ï؟½ï؟½?ï؟½ ï؟½?ï؟½?ï؟½ï؟½ =====
function roundMoney(v) {
  return Math.round((parseFloat(v) || 0) * 100) / 100;
}

// ===== ï؟½?ï؟½ï؟½ï؟½ï؟½ =====
function today() {
  return new Date().toISOString().split('T')[0];
}

// ===== ï؟½?ï؟½ï؟½ï؟½ï؟½ ï؟½ï؟½ï؟½ ï؟½ ï؟½ï؟½ï؟½?ï؟½ ï؟½اگï؟½ 31 =====
function endOfMonth(year, month1indexed) {
  return new Date(year, month1indexed, 0).toISOString().split('T')[0];
}

// ===== ï؟½?ï؟½ï؟½ï؟½ï؟½ ï؟½ï؟½ï؟½ï؟½ï؟½ ï؟½ï؟½ï؟½ï؟½? =====
function fmtN(n, decimals) {
  const num = parseFloat(n || 0);
  if (decimals === undefined) decimals = num >= 100 ? 0 : 2;
  return num.toLocaleString('en', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// ===== ï؟½ï؟½ï؟½تکï؟½ï؟½ï؟½?ï؟½?ï؟½ ï؟½ï؟½ï؟½ï؟½?ï؟½ ï؟½?ï؟½ï؟½? =====
function fmtShort(n) {
  const v = Math.abs(n);
  if (v >= 1e9) return (n / 1e9).toFixed(1) + 'B';
  if (v >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (v >= 1e3) return (n / 1e3).toFixed(0) + 'K';
  return String(n);
}

// ===== ï؟½??ï؟½ï؟½ï؟½ ï؟½ï؟½ï؟½ï؟½ ï؟½? USD =====
function toUSD(amount, fromCode) {
  if (!amount) return 0;
  const list = getCurrencies();
  const from = list.find(c => c.code === fromCode);
  if (!from) return parseFloat(amount) || 0;
  return (parseFloat(amount) || 0) / (from.rateToUSD || 1);
}

// ===== ï؟½??ï؟½ï؟½ï؟½ USD ï؟½? ï؟½ï؟½ï؟½ï؟½ï؟½ ï؟½ï؟½ =====
function fromUSD(usdAmount, toCode) {
  const list = getCurrencies();
  const to = list.find(c => c.code === toCode);
  if (!to) return parseFloat(usdAmount) || 0;
  return (parseFloat(usdAmount) || 0) * (to.rateToUSD || 1);
}

// ===== ï؟½?ï؟½ï؟½ï؟½ï؟½ ï؟½ï؟½ï؟½ï؟½ï؟½ ï؟½ï؟½ï؟½ï؟½ =====
function fmtC(amount, code) {
  const list = getCurrencies();
  const c = list.find(x => x.code === code) || { symbol: code, code };
  const dec = (code === 'IQD' || code === 'IRR') ? 0 : 2;
  return c.symbol + ' ' + fmtN(amount, dec);
}

// ===== Step 6.5: ï؟½ï؟½ï؟½ï؟½ï؟½ï؟½ï؟½ï؟½ï؟½ ï؟½ï؟½ï؟½ ï؟½ï؟½ï؟½ï؟½ ï؟½ NaN safety =====
function fmtDual(amount, currency, rateSnapshot) {
  if (!amount) return fmtC(0, currency);
  const primary = fmtC(amount, currency);
  if (currency === 'USD') return primary;
  const rate = rateSnapshot || (getCurrencies().find(c => c.code === currency)?.rateToUSD || 1);
  if (!rate || !isFinite(rate)) return primary;
  const inUSD = (parseFloat(amount) || 0) / rate;
  if (!isFinite(inUSD)) return primary;
  return `${primary} <span style="color:var(--muted);font-size:10px;font-weight:400">(${fmtC(inUSD, 'USD')} | ${fmtN(rate, 0)} ${currency}/$)</span>`;
}

// ===== Step 5.1.1: ï؟½?ï؟½ï؟½ï؟½ï؟½ï؟½?ï؟½?ï؟½ ï؟½ï؟½ï؟½ï؟½?ï؟½ ï؟½?ï؟½ï؟½ï؟½ï؟½ =====
function normalizePhone(phone) {
  if (!phone) return '';
  return phone.replace(/[\s\-\(\)]/g, '');
}

// ===== ï؟½ï؟½ش‌ï؟½ ï؟½?ï؟½ ï؟½? backward compatibility =====
function legacyHashToken(buyer, phone) {
  const raw = (buyer || '') + '|' + (phone || '');
  let hash = 5381;
  for (let i = 0; i < raw.length; i++) {
    hash = ((hash << 5) + hash) ^ raw.charCodeAt(i);
  }
  return Math.abs(hash).toString(36) + (buyer || 'x').slice(0, 3).replace(/\s/g, '');
}

// ===== Step 5.1.4: Token validation =====
function validateToken(token) {
  if (!token || typeof token !== 'string') return false;
  if (token.length < 6) return false;
  if (!/^[a-zA-Z0-9\-_]+$/.test(token)) return false;
  return true;
}

function getCustomerTokenEntry(token) {
  if (!validateToken(token)) return null;
  try {
    const registry = PMStorage.getSync('customerTokens') || {};
    const entry = Object.values(registry).find(r => r && r.token === token);
    if (!entry) return null;
    return {
      ...entry,
      name: entry.name || '',
      phone: normalizePhone(entry.phone || ''),
      token: entry.token || token,
    };
  } catch (e) {
    console.warn('[getCustomerTokenEntry] هەڵە:', e.message);
    return null;
  }
}

function isCustomerTokenEntryActive(entry, nowMs = Date.now()) {
  if (!entry || typeof entry !== 'object' || !validateToken(entry.token || '')) return false;
  if (entry.revokedAt) return false;
  if (entry.expiresAt) {
    const expiresAtMs = Date.parse(entry.expiresAt);
    if (!Number.isNaN(expiresAtMs) && expiresAtMs < nowMs) return false;
  }
  return true;
}

function getCustomerTokenAccessState(token) {
  if (!validateToken(token)) return { ok: false, code: 'invalid', entry: null };
  const entry = getCustomerTokenEntry(token);
  if (!entry) return { ok: false, code: 'missing', entry: null };
  if (entry.revokedAt) return { ok: false, code: 'revoked', entry };
  if (entry.expiresAt) {
    const expiresAtMs = Date.parse(entry.expiresAt);
    if (!Number.isNaN(expiresAtMs) && expiresAtMs < Date.now()) {
      return { ok: false, code: 'expired', entry };
    }
  }
  return { ok: true, code: 'active', entry };
}

// ===== Step 5.1.5: ï؟½??ï؟½ï؟½?ï؟½?ï؟½ ï؟½ï؟½ï؟½ï؟½ï؟½ï؟½ï؟½ ï؟½?ï؟½ï؟½ï؟½ ï؟½? token ï؟½ hardened =====
function lookupCustomerByToken(token) {
  if (!token) return null;
  try {
    const access = getCustomerTokenAccessState(token);
    if (!access.ok) return null;
    const entry = access.entry;
    return {
      name:  entry.name  || '',
      phone: normalizePhone(entry.phone || ''),
      token: entry.token || token,
    };
  } catch (e) {
    console.warn('[lookupCustomerByToken] ï؟½???:', e.message);
    return null;
  }
}

// ===== Step 5.1.3: ï؟½اکï؟½ï؟½ï؟½ï؟½ï؟½ registry =====
function repairCustomerRegistry() {
  try {
    const existing = PMStorage.getSync('customerTokens');
    if (!existing) return;
    let registry;
    try { registry = cloneRegistry(existing); } catch {
      console.warn('[repairRegistry] JSON ï؟½ï؟½اپ ï؟½ ?ï؟½ï؟½?ï؟½ ï؟½?ï؟½ï؟½?ï؟½');
      PMStorage.setSync('customerTokens', {});
      return;
    }
    if (!registry || typeof registry !== 'object' || Array.isArray(registry)) {
      console.warn('[repairRegistry] ï؟½ï؟½ï؟½ï؟½ï؟½ï؟½ï؟½ ï؟½ï؟½ï؟½ï؟½ï؟½ï؟½ï؟½ ï؟½ ?ï؟½ï؟½?ï؟½ ï؟½?ï؟½ï؟½?ï؟½');
      PMStorage.setSync('customerTokens', {});
      return;
    }

    let changed = false;
    const seenTokens = new Set();
    const keys = Object.keys(registry);

    for (const key of keys) {
      const entry = registry[key];
      if (!entry || typeof entry !== 'object' || !entry.token) {
        console.warn('[repairRegistry] ï؟½?ï؟½ï؟½ï؟½ï؟½ ï؟½ï؟½اپ ï؟½ï؟½ï؟½ï؟½ï؟½:', key);
        delete registry[key];
        changed = true;
        continue;
      }
      if (seenTokens.has(entry.token)) {
        console.warn('[repairRegistry] ï؟½?ï؟½ï؟½ï؟½ ï؟½?ï؟½ï؟½ï؟½ï؟½ ï؟½ï؟½ï؟½ï؟½ï؟½:', key);
        delete registry[key];
        changed = true;
        continue;
      }
      seenTokens.add(entry.token);

      // phone normalize
      const normPhone = normalizePhone(entry.phone || '');
      if (normPhone !== (entry.phone || '')) {
        entry.phone = normPhone;
        changed = true;
      }
      if (entry.expiresAt == null) {
        entry.expiresAt = '';
        changed = true;
      }
      if (entry.revokedAt == null) {
        entry.revokedAt = '';
        changed = true;
      }
      if (entry.updatedAt == null) {
        entry.updatedAt = entry.createdAt || new Date().toISOString();
        changed = true;
      }
      // ï؟½ï؟½ï؟½ï؟½ normalize بک?
      if (normPhone && key !== normPhone && !registry[normPhone]) {
        registry[normPhone] = entry;
        delete registry[key];
        changed = true;
      }
    }

    if (changed) {
      PMStorage.setSync('customerTokens', registry);
      console.debug('[repairRegistry] ï؟½اکï؟½ï؟½ï؟½ ?');
    }
  } catch (e) {
    console.warn('[repairRegistry] ï؟½???:', e.message);
  }
}

function cloneRegistry(value) {
  if (!value || typeof value !== 'object') return {};
  try {
    if (typeof structuredClone === 'function') return structuredClone(value);
  } catch (_) {}
  return JSON.parse(JSON.stringify(value));
}
