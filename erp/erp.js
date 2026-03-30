/* ============================================================
   erp.js — Phase 1 Bootstrap
   Modules: Utils, DB, Store, Lang, UI, Router,
            Dashboard, Contacts, Inventory
   Saudi Scrap Metal ERP — Plain JS / localStorage
   ============================================================ */

(function () {
  'use strict';

  /* ============================================================
     § 1  UTILS — formatting, escape, badge helpers
     ============================================================ */
  var Utils = {

    genId: function () {
      return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    },

    today: function () {
      return new Date().toISOString().slice(0, 10);
    },

    formatDate: function (d) {
      if (!d) return '';
      var fmt = Store.getSetting('dateFormat') || 'DD/MM/YYYY';
      var p = d.split('-');
      if (p.length !== 3) return d;
      if (fmt === 'DD/MM/YYYY') return p[2] + '/' + p[1] + '/' + p[0];
      if (fmt === 'MM/DD/YYYY') return p[1] + '/' + p[2] + '/' + p[0];
      return d;
    },

    formatCurrency: function (n) {
      var cur = Store.getSetting('currency') || 'SAR';
      return (Number(n) || 0).toLocaleString('en-SA', {
        style: 'currency', currency: cur, minimumFractionDigits: 2
      });
    },

    escape: function (str) {
      return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    },

    /* Map semantic type names to existing badge-* CSS classes */
    badgeClass: function (type) {
      var map = {
        paid: 'success', draft: 'secondary', sent: 'info', overdue: 'danger',
        customer: 'primary', supplier: 'warning',
        ferrous: 'primary', non_ferrous: 'success', mixed: 'secondary'
      };
      return 'badge badge-' + (map[type] || 'secondary');
    },

    /* Map semantic color names to existing stat-icon-* CSS classes */
    iconClass: function (color) {
      var map = {
        success: 'green', danger: 'red', primary: 'blue',
        warning: 'amber', info: 'teal', secondary: 'purple'
      };
      return 'stat-icon stat-icon-' + (map[color] || 'blue');
    }
  };

  /* ============================================================
     § 2  DB — low-level localStorage wrapper
     ============================================================ */
  var DB = {
    PREFIX: 'erp_',

    get: function (key) {
      try {
        var v = localStorage.getItem(this.PREFIX + key);
        return v ? JSON.parse(v) : null;
      } catch (e) { return null; }
    },

    set: function (key, val) {
      try { localStorage.setItem(this.PREFIX + key, JSON.stringify(val)); } catch (e) {}
    },

    remove: function (key) {
      try { localStorage.removeItem(this.PREFIX + key); } catch (e) {}
    }
  };

  /* ============================================================
     § 3  STORE — collection CRUD + demo seed
     ============================================================ */
  var Store = {

    getAll: function (col) {
      return DB.get(col) || [];
    },

    getById: function (col, id) {
      return this.getAll(col).find(function (r) { return r.id === id; }) || null;
    },

    save: function (col, item) {
      var rows = this.getAll(col);
      if (!item.id) {
        item.id = Utils.genId();
        item.createdAt = item.createdAt || Utils.today();
        rows.push(item);
      } else {
        var idx = rows.findIndex(function (r) { return r.id === item.id; });
        if (idx >= 0) rows[idx] = item; else rows.push(item);
      }
      DB.set(col, rows);
      return item;
    },

    remove: function (col, id) {
      DB.set(col, this.getAll(col).filter(function (r) { return r.id !== id; }));
    },

    getSetting: function (key) {
      return (DB.get('settings') || {})[key];
    },

    saveSettings: function (obj) {
      var s = DB.get('settings') || {};
      Object.keys(obj).forEach(function (k) { s[k] = obj[k]; });
      DB.set('settings', s);
    },

    /* ----------------------------------------------------------
       Seed demo data for a Saudi scrap metal company (runs once)
       ---------------------------------------------------------- */
    seed: function () {
      if (DB.get('seeded')) return;

      DB.set('settings', {
        companyNameEn: 'Amanat Al-Kalima Company',
        companyNameAr:  'شركة أمانات الكلمة',
        address:  'Industrial Area, Riyadh, Saudi Arabia',
        phone:    '+966 11 XXX XXXX',
        email:    'info@aalkc.com',
        city:     'Riyadh',
        website:  'https://aalkc.com',
        vatNumber: '300000000000003',
        crNumber:  '1010XXXXXX',
        vatRate:   15,
        currency:  'SAR',
        invoiceTerms: 30,
        invoiceNotes: 'Payment due within 30 days.',
        invPrefix: 'INV-', invNext: 1009,
        docPrefix: 'DOC-', docNext: 1001,
        defaultLang: 'en',
        dateFormat:  'DD/MM/YYYY',
        weightUnit:  'ton'
      });

      DB.set('contacts', [
        { id: 'c1', type: 'customer', name: 'Al-Jubail Steel Company',     nameAr: 'شركة الجبيل للصلب',      phone: '+966 13 341 XXXX', email: 'procurement@jubailsteel.sa', city: 'Al Jubail', vatNumber: '300100000000001', crNumber: '2050100001', balance: 0, createdAt: '2024-01-10' },
        { id: 'c2', type: 'customer', name: 'Riyadh Metal Recyclers',      nameAr: 'معالجو المعادن الرياض',  phone: '+966 11 412 XXXX', email: 'info@riyadhmetal.sa',        city: 'Riyadh',    vatNumber: '300200000000002', crNumber: '1010200002', balance: 0, createdAt: '2024-02-01' },
        { id: 'c3', type: 'customer', name: 'Arabian Steel Works',         nameAr: 'مصانع الصلب العربية',   phone: '+966 12 215 XXXX', email: 'ops@arabiansteel.sa',        city: 'Jeddah',    vatNumber: '300300000000003', crNumber: '4030300003', balance: 0, createdAt: '2024-03-05' },
        { id: 'c4', type: 'supplier', name: 'Jeddah Scrap Traders',        nameAr: 'تجار خردة جدة',         phone: '+966 12 668 XXXX', email: 'sell@jeddahscrap.sa',        city: 'Jeddah',    vatNumber: '300400000000004', crNumber: '4030400004', balance: 0, createdAt: '2024-01-15' },
        { id: 'c5', type: 'supplier', name: 'Eastern Province Demolition', nameAr: 'هدم المنطقة الشرقية',  phone: '+966 13 812 XXXX', email: 'info@epdemolition.sa',       city: 'Dammam',    vatNumber: '300500000000005', crNumber: '2050500005', balance: 0, createdAt: '2024-02-20' },
        { id: 'c6', type: 'supplier', name: 'Gulf Metals LLC',             nameAr: 'شركة خليج المعادن',     phone: '+966 11 537 XXXX', email: 'trade@gulfmetals.sa',        city: 'Riyadh',    vatNumber: '300600000000006', crNumber: '1010600006', balance: 0, createdAt: '2024-03-12' }
      ]);

      DB.set('inventory', [
        { id: 'i1', sku: 'HMS-001', name: 'Heavy Melting Steel (HMS 1)', nameAr: 'حديد خردة ثقيل (HMS 1)', category: 'ferrous',     unit: 'ton', quantity: 120, unitCost: 850,   unitPrice: 1050,  location: 'Yard A',      notes: 'Clean HMS grade 1',         createdAt: '2024-01-20' },
        { id: 'i2', sku: 'HMS-002', name: 'Heavy Melting Steel (HMS 2)', nameAr: 'حديد خردة ثقيل (HMS 2)', category: 'ferrous',     unit: 'ton', quantity: 80,  unitCost: 780,   unitPrice: 980,   location: 'Yard A',      notes: 'Mixed HMS grade 2',         createdAt: '2024-01-20' },
        { id: 'i3', sku: 'CU-001',  name: 'Copper Wire Scrap',           nameAr: 'خردة أسلاك نحاس',        category: 'non_ferrous', unit: 'ton', quantity: 15,  unitCost: 18500, unitPrice: 21000, location: 'Warehouse B', notes: 'Clean bright copper',       createdAt: '2024-02-01' },
        { id: 'i4', sku: 'AL-001',  name: 'Aluminum Sheet Scrap',        nameAr: 'خردة ألمنيوم صفائح',     category: 'non_ferrous', unit: 'ton', quantity: 22,  unitCost: 5500,  unitPrice: 6800,  location: 'Warehouse B', notes: 'Clean aluminum sheets',     createdAt: '2024-02-10' },
        { id: 'i5', sku: 'CI-001',  name: 'Cast Iron Scrap',             nameAr: 'خردة حديد زهر',          category: 'ferrous',     unit: 'ton', quantity: 60,  unitCost: 680,   unitPrice: 820,   location: 'Yard C',      notes: 'Mixed cast iron pieces',    createdAt: '2024-02-15' },
        { id: 'i6', sku: 'SS-001',  name: 'Stainless Steel 304',         nameAr: 'فولاذ مقاوم للصدأ 304',  category: 'ferrous',     unit: 'ton', quantity: 18,  unitCost: 4200,  unitPrice: 5100,  location: 'Warehouse B', notes: 'Grade 304 stainless steel', createdAt: '2024-03-01' },
        { id: 'i7', sku: 'MX-001',  name: 'Mixed Metal Scrap',           nameAr: 'خردة معادن مختلطة',      category: 'mixed',       unit: 'ton', quantity: 45,  unitCost: 550,   unitPrice: 700,   location: 'Yard D',      notes: 'Unsorted mixed scrap',      createdAt: '2024-03-05' }
      ]);

      /* Invoices spanning Oct 2025–Mar 2026 for chart data */
      DB.set('invoices', [
        { id: 'inv1', number: 'INV-1001', date: '2025-10-05', dueDate: '2025-11-04', contactId: 'c1', contactName: 'Al-Jubail Steel Company', status: 'paid',    subtotal: 105000, vatAmount: 15750, total: 120750, items: [], createdAt: '2025-10-05' },
        { id: 'inv2', number: 'INV-1002', date: '2025-11-12', dueDate: '2025-12-12', contactId: 'c2', contactName: 'Riyadh Metal Recyclers',   status: 'paid',    subtotal: 74261,  vatAmount: 11139, total:  85400, items: [], createdAt: '2025-11-12' },
        { id: 'inv3', number: 'INV-1003', date: '2025-12-08', dueDate: '2026-01-07', contactId: 'c3', contactName: 'Arabian Steel Works',      status: 'paid',    subtotal: 82783,  vatAmount: 12417, total:  95200, items: [], createdAt: '2025-12-08' },
        { id: 'inv4', number: 'INV-1004', date: '2026-01-15', dueDate: '2026-02-14', contactId: 'c1', contactName: 'Al-Jubail Steel Company', status: 'paid',    subtotal: 97826,  vatAmount: 14674, total: 112500, items: [], createdAt: '2026-01-15' },
        { id: 'inv5', number: 'INV-1005', date: '2026-02-20', dueDate: '2026-03-22', contactId: 'c2', contactName: 'Riyadh Metal Recyclers',   status: 'paid',    subtotal: 68087,  vatAmount: 10213, total:  78300, items: [], createdAt: '2026-02-20' },
        { id: 'inv6', number: 'INV-1006', date: '2026-03-05', dueDate: '2026-04-04', contactId: 'c3', contactName: 'Arabian Steel Works',      status: 'sent',    subtotal: 56522,  vatAmount:  8478, total:  65000, items: [], createdAt: '2026-03-05' },
        { id: 'inv7', number: 'INV-1007', date: '2026-03-10', dueDate: '2026-04-09', contactId: 'c2', contactName: 'Riyadh Metal Recyclers',   status: 'draft',   subtotal: 39130,  vatAmount:  5870, total:  45000, items: [], createdAt: '2026-03-10' },
        { id: 'inv8', number: 'INV-1008', date: '2026-01-10', dueDate: '2026-02-09', contactId: 'c1', contactName: 'Al-Jubail Steel Company', status: 'overdue', subtotal: 45217,  vatAmount:  6783, total:  52000, items: [], createdAt: '2026-01-10' }
      ]);

      DB.set('expenses', [
        { id: 'ex1',  date: '2025-10-10', category: 'fuel',        description: 'Truck fuel – October',        descriptionAr: 'وقود شاحنات – أكتوبر',         amount:  3500, createdAt: '2025-10-10' },
        { id: 'ex2',  date: '2025-10-31', category: 'salaries',    description: 'Staff salaries – Oct 2025',   descriptionAr: 'رواتب الموظفين – أكتوبر 2025', amount: 45000, createdAt: '2025-10-31' },
        { id: 'ex3',  date: '2025-11-30', category: 'salaries',    description: 'Staff salaries – Nov 2025',   descriptionAr: 'رواتب الموظفين – نوفمبر 2025', amount: 45000, createdAt: '2025-11-30' },
        { id: 'ex4',  date: '2025-12-10', category: 'maintenance', description: 'Crane maintenance – Q4',      descriptionAr: 'صيانة الرافعة – الربع الرابع', amount:  6500, createdAt: '2025-12-10' },
        { id: 'ex5',  date: '2025-12-31', category: 'salaries',    description: 'Staff salaries – Dec 2025',   descriptionAr: 'رواتب الموظفين – ديسمبر 2025', amount: 47000, createdAt: '2025-12-31' },
        { id: 'ex6',  date: '2026-01-05', category: 'fuel',        description: 'Truck fuel – January',        descriptionAr: 'وقود شاحنات – يناير',          amount:  3800, createdAt: '2026-01-05' },
        { id: 'ex7',  date: '2026-01-31', category: 'salaries',    description: 'Staff salaries – Jan 2026',   descriptionAr: 'رواتب الموظفين – يناير 2026',  amount: 47000, createdAt: '2026-01-31' },
        { id: 'ex8',  date: '2026-02-05', category: 'rent',        description: 'Yard rental – February',      descriptionAr: 'إيجار الساحة – فبراير',        amount: 12000, createdAt: '2026-02-05' },
        { id: 'ex9',  date: '2026-02-28', category: 'salaries',    description: 'Staff salaries – Feb 2026',   descriptionAr: 'رواتب الموظفين – فبراير 2026', amount: 49000, createdAt: '2026-02-28' },
        { id: 'ex10', date: '2026-03-01', category: 'salaries',    description: 'Staff salaries – Mar 2026',   descriptionAr: 'رواتب الموظفين – مارس 2026',   amount: 49000, createdAt: '2026-03-01' },
        { id: 'ex11', date: '2026-03-05', category: 'transport',   description: 'Delivery to Al-Jubail',       descriptionAr: 'توصيل إلى الجبيل',             amount:  4200, createdAt: '2026-03-05' },
        { id: 'ex12', date: '2026-03-10', category: 'maintenance', description: 'Vehicle maintenance – March', descriptionAr: 'صيانة مركبات – مارس',          amount:  4200, createdAt: '2026-03-10' }
      ]);

      DB.set('seeded', true);
    }
  };

  /* ============================================================
     § 4  LANG — bilingual EN/AR + RTL switching
     ============================================================ */
  var Lang = {
    LANG_KEY: 'erp-lang',
    current: 'en',

    init: function () {
      try { this.current = localStorage.getItem(this.LANG_KEY) || 'en'; } catch (e) {}
      this.apply(this.current);
    },

    t: function (en, ar) {
      return this.current === 'ar' ? ar : en;
    },

    apply: function (lang) {
      this.current = lang;
      var html = document.documentElement;
      html.setAttribute('lang', lang);
      html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

      document.querySelectorAll('[data-en]').forEach(function (el) {
        var txt = el.getAttribute('data-' + lang);
        if (txt !== null) el.textContent = txt;
      });
      document.querySelectorAll('[data-placeholder-en]').forEach(function (el) {
        var ph = el.getAttribute('data-placeholder-' + lang);
        if (ph !== null) el.setAttribute('placeholder', ph);
      });
      document.querySelectorAll('[data-aria-en]').forEach(function (el) {
        var al = el.getAttribute('data-aria-' + lang);
        if (al !== null) el.setAttribute('aria-label', al);
      });

      var btn = document.getElementById('langToggle');
      if (btn) btn.textContent = lang === 'ar' ? 'English' : 'العربية';

      try { localStorage.setItem(this.LANG_KEY, lang); } catch (e) {}
    },

    toggle: function () {
      this.apply(this.current === 'en' ? 'ar' : 'en');
    }
  };

  /* ============================================================
     § 5  UI — toast notifications + modal / confirm utilities
     ============================================================ */
  var UI = {

    toast: function (msg, type) {
      type = type || 'success';
      var container = document.getElementById('toastContainer');
      if (!container) return;
      var el = document.createElement('div');
      el.className = 'toast toast-' + type;
      el.textContent = msg;
      container.appendChild(el);
      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 3500);
    },

    modal: function (opts) {
      this.closeModal();
      var container = document.getElementById('modalContainer');
      if (!container) return;

      var overlay = document.createElement('div');
      overlay.className = 'modal-overlay';
      overlay.id = 'activeModal';
      overlay.innerHTML =
        '<div class="modal">' +
          '<div class="modal-header">' +
            '<div class="modal-title">' + Utils.escape(opts.title || '') + '</div>' +
            '<button class="modal-close" id="modalCloseBtn" aria-label="Close">&times;</button>' +
          '</div>' +
          '<div class="modal-body">' + (opts.body || '') + '</div>' +
          (opts.footer ? '<div class="modal-footer">' + opts.footer + '</div>' : '') +
        '</div>';

      container.appendChild(overlay);

      document.getElementById('modalCloseBtn').addEventListener('click', function () {
        UI.closeModal();
      });
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) UI.closeModal();
      });

      if (opts.onReady) opts.onReady(overlay);
    },

    closeModal: function () {
      var el = document.getElementById('activeModal');
      if (el && el.parentNode) el.parentNode.removeChild(el);
    },

    confirm: function (msg, onYes) {
      UI.modal({
        title: Lang.t('Confirm Action', 'تأكيد الإجراء'),
        body:  '<p style="margin:0">' + Utils.escape(msg) + '</p>',
        footer:
          '<button class="btn btn-danger"    id="confirmYes">' + Lang.t('Confirm', 'تأكيد') + '</button>' +
          '<button class="btn btn-secondary" id="confirmNo">'  + Lang.t('Cancel',  'إلغاء') + '</button>',
        onReady: function () {
          document.getElementById('confirmYes').addEventListener('click', function () {
            UI.closeModal(); onYes();
          });
          document.getElementById('confirmNo').addEventListener('click', function () {
            UI.closeModal();
          });
        }
      });
    }
  };

  /* ============================================================
     § 6  ROUTER — module-based navigation
     ============================================================ */
  var Router = {
    _current: 'dashboard',
    _charts:  [],

    modules: {
      dashboard: { title: 'Dashboard', titleAr: 'لوحة التحكم', render: function (el) { Dashboard.render(el); } },
      contacts:  { title: 'Contacts',  titleAr: 'جهات الاتصال', render: function (el) { Contacts.render(el); } },
      inventory: { title: 'Inventory', titleAr: 'المخزون',       render: function (el) { Inventory.render(el); } },
      invoices:  { title: 'Invoices',  titleAr: 'الفواتير',     render: function (el) { Router._tpl('tpl-invoices', el); } },
      sales:     { title: 'Sales',     titleAr: 'المبيعات',     render: function (el) { Router._tpl('tpl-sales', el); } },
      purchases: { title: 'Purchases', titleAr: 'المشتريات',    render: function (el) { Router._tpl('tpl-purchases', el); } },
      expenses:  { title: 'Expenses',  titleAr: 'المصروفات',    render: function (el) { Router._tpl('tpl-expenses', el); } },
      employees: { title: 'Employees', titleAr: 'الموظفون',     render: function (el) { Router._tpl('tpl-employees', el); } },
      bank:      { title: 'Bank',      titleAr: 'البنك',        render: function (el) { Router._tpl('tpl-bank', el); } },
      loans:     { title: 'Loans',     titleAr: 'القروض',       render: function (el) { Router._tpl('tpl-loans', el); } },
      documents: { title: 'Documents', titleAr: 'المستندات',    render: function (el) { Router._tpl('tpl-documents', el); } },
      reports:   { title: 'Reports',   titleAr: 'التقارير',     render: function (el) { Router._tpl('tpl-reports', el); } },
      settings:  { title: 'Settings',  titleAr: 'الإعدادات',   render: function (el) { Router._tpl('tpl-settings', el); } }
    },

    /* Clone an HTML template into container then re-apply current language */
    _tpl: function (tplId, container) {
      var tpl = document.getElementById(tplId);
      if (!tpl) return;
      container.appendChild(document.importNode(tpl.content, true));
      Lang.apply(Lang.current);
    },

    navigate: function (module) {
      if (!this.modules[module]) module = 'dashboard';
      this._current = module;

      /* Destroy any Chart.js instances to prevent canvas reuse errors */
      this._charts.forEach(function (c) { try { c.destroy(); } catch (e) {} });
      this._charts = [];

      var content = document.getElementById('pageContent');
      if (content) content.innerHTML = '';

      var mod = this.modules[module];
      var titleEl = document.getElementById('pageTitle');
      if (titleEl) titleEl.textContent = Lang.current === 'ar' ? mod.titleAr : mod.title;

      document.querySelectorAll('.nav-item').forEach(function (item) {
        item.classList.toggle('active', item.getAttribute('data-module') === module);
      });

      if (content) mod.render(content);
    },

    init: function () {
      var self = this;

      /* Sidebar nav items */
      document.querySelectorAll('.nav-item[data-module]').forEach(function (item) {
        item.addEventListener('click', function (e) {
          e.preventDefault();
          self.navigate(item.getAttribute('data-module'));
        });
      });

      /* data-module-link anchors rendered inside module templates */
      document.addEventListener('click', function (e) {
        var target = e.target.closest('[data-module-link]');
        if (target) { e.preventDefault(); self.navigate(target.getAttribute('data-module-link')); }
      });

      /* Sidebar collapse toggle */
      var sidebarToggle = document.getElementById('sidebarToggle');
      var sidebar       = document.getElementById('sidebar');
      if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function () {
          sidebar.classList.toggle('collapsed');
        });
      }

      this.navigate('dashboard');
    }
  };

  /* ============================================================
     § 7  DASHBOARD — KPI stats, Chart.js charts, recent lists
     ============================================================ */
  var Dashboard = {

    render: function (container) {
      Router._tpl('tpl-dashboard', container);
      this._renderStats();
      this._renderCharts();
      this._renderRecentInvoices();
      this._renderRecentExpenses();

      var refreshBtn = document.getElementById('dashRefresh');
      if (refreshBtn) {
        refreshBtn.addEventListener('click', function () { Router.navigate('dashboard'); });
      }
    },

    _renderStats: function () {
      var invoices  = Store.getAll('invoices');
      var expenses  = Store.getAll('expenses');
      var inventory = Store.getAll('inventory');
      var contacts  = Store.getAll('contacts');

      var revenue     = invoices.filter(function (i) { return i.status === 'paid'; })
                                .reduce(function (s, i) { return s + (i.total || 0); }, 0);
      var totalExp    = expenses.reduce(function (s, e) { return s + (e.amount || 0); }, 0);
      var invValue    = inventory.reduce(function (s, i) { return s + (i.quantity || 0) * (i.unitCost || 0); }, 0);
      var outstanding = invoices.filter(function (i) { return i.status === 'sent' || i.status === 'overdue'; })
                                .reduce(function (s, i) { return s + (i.total || 0); }, 0);

      var stats = [
        { label: Lang.t('Total Revenue',    'إجمالي الإيرادات'),   value: Utils.formatCurrency(revenue),     color: 'success',   icon: '📈' },
        { label: Lang.t('Total Expenses',   'إجمالي المصروفات'),   value: Utils.formatCurrency(totalExp),    color: 'danger',    icon: '📉' },
        { label: Lang.t('Inventory Value',  'قيمة المخزون'),       value: Utils.formatCurrency(invValue),    color: 'primary',   icon: '🏭' },
        { label: Lang.t('Outstanding A/R',  'ذمم مدينة'),          value: Utils.formatCurrency(outstanding), color: 'warning',   icon: '⏳' },
        { label: Lang.t('Contacts',         'جهات الاتصال'),       value: contacts.length,                   color: 'info',      icon: '👥' },
        { label: Lang.t('Active Invoices',  'فواتير نشطة'),        value: invoices.filter(function (i) { return i.status !== 'draft'; }).length, color: 'secondary', icon: '📄' }
      ];

      var grid = document.getElementById('dashStats');
      if (!grid) return;
      grid.innerHTML = stats.map(function (s) {
        return '<div class="stat-card">' +
          '<div class="stat-card-body">' +
            '<div class="stat-value">' + s.value + '</div>' +
            '<div class="stat-label">'  + s.label + '</div>' +
          '</div>' +
          '<div class="' + Utils.iconClass(s.color) + '">' + s.icon + '</div>' +
        '</div>';
      }).join('');
    },

    _renderCharts: function () {
      if (!window.Chart) return;

      var invoices = Store.getAll('invoices');
      var expenses = Store.getAll('expenses');
      var now = new Date();
      var months = [], revData = [], expData = [];

      for (var i = 5; i >= 0; i--) {
        var d  = new Date(now.getFullYear(), now.getMonth() - i, 1);
        var mo = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
        months.push(d.toLocaleDateString('en', { month: 'short', year: '2-digit' }));
        revData.push(invoices.filter(function (inv) {
          return inv.status === 'paid' && inv.date && inv.date.startsWith(mo);
        }).reduce(function (s, inv) { return s + (inv.total || 0); }, 0));
        expData.push(expenses.filter(function (ex) {
          return ex.date && ex.date.startsWith(mo);
        }).reduce(function (s, ex) { return s + (ex.amount || 0); }, 0));
      }

      var revCtx = document.getElementById('revenueChart');
      if (revCtx) {
        Router._charts.push(new Chart(revCtx, {
          type: 'bar',
          data: {
            labels: months,
            datasets: [
              { label: Lang.t('Revenue', 'الإيرادات'),  data: revData, backgroundColor: '#2563eb' },
              { label: Lang.t('Expenses', 'المصروفات'), data: expData, backgroundColor: '#ef4444' }
            ]
          },
          options: { responsive: true, plugins: { legend: { position: 'top' } } }
        }));
      }

      var invItems = Store.getAll('inventory');
      var catVal = { ferrous: 0, non_ferrous: 0, mixed: 0 };
      invItems.forEach(function (it) {
        var c = it.category || 'mixed';
        catVal[c] = (catVal[c] || 0) + (it.quantity || 0) * (it.unitCost || 0);
      });
      var invCtx = document.getElementById('inventoryChart');
      if (invCtx) {
        Router._charts.push(new Chart(invCtx, {
          type: 'doughnut',
          data: {
            labels: [Lang.t('Ferrous', 'حديدي'), Lang.t('Non-Ferrous', 'غير حديدي'), Lang.t('Mixed', 'مختلط')],
            datasets: [{ data: [catVal.ferrous, catVal.non_ferrous, catVal.mixed], backgroundColor: ['#2563eb', '#10b981', '#f59e0b'] }]
          },
          options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
        }));
      }
    },

    _renderRecentInvoices: function () {
      var el = document.getElementById('dashRecentInvoices');
      if (!el) return;
      var rows = Store.getAll('invoices').slice(-5).reverse();
      if (!rows.length) { el.innerHTML = '<div class="empty-state"><p>' + Lang.t('No invoices yet', 'لا توجد فواتير') + '</p></div>'; return; }
      el.innerHTML = '<table><thead><tr>' +
        '<th>' + Lang.t('Invoice', 'فاتورة') + '</th>' +
        '<th>' + Lang.t('Customer', 'عميل') + '</th>' +
        '<th>' + Lang.t('Total', 'المجموع') + '</th>' +
        '<th>' + Lang.t('Status', 'الحالة') + '</th>' +
        '</tr></thead><tbody>' +
        rows.map(function (inv) {
          return '<tr>' +
            '<td><strong>' + Utils.escape(inv.number) + '</strong></td>' +
            '<td>' + Utils.escape(inv.contactName || '') + '</td>' +
            '<td>' + Utils.formatCurrency(inv.total) + '</td>' +
            '<td><span class="' + Utils.badgeClass(inv.status) + '">' + Utils.escape(inv.status) + '</span></td>' +
          '</tr>';
        }).join('') +
        '</tbody></table>';
    },

    _renderRecentExpenses: function () {
      var el = document.getElementById('dashRecentExpenses');
      if (!el) return;
      var rows = Store.getAll('expenses').slice(-5).reverse();
      if (!rows.length) { el.innerHTML = '<div class="empty-state"><p>' + Lang.t('No expenses yet', 'لا توجد مصروفات') + '</p></div>'; return; }
      el.innerHTML = '<table><thead><tr>' +
        '<th>' + Lang.t('Date', 'التاريخ') + '</th>' +
        '<th>' + Lang.t('Description', 'الوصف') + '</th>' +
        '<th>' + Lang.t('Amount', 'المبلغ') + '</th>' +
        '</tr></thead><tbody>' +
        rows.map(function (ex) {
          return '<tr>' +
            '<td>' + Utils.formatDate(ex.date) + '</td>' +
            '<td>' + Utils.escape(ex.description || '') + '</td>' +
            '<td>' + Utils.formatCurrency(ex.amount) + '</td>' +
          '</tr>';
        }).join('') +
        '</tbody></table>';
    }
  };

  /* ============================================================
     § 8  CONTACTS — Customers / Suppliers CRUD
     ============================================================ */
  var Contacts = {
    _filter: 'all',
    _search: '',

    render: function (container) {
      Router._tpl('tpl-contacts', container);
      this._bindEvents();
      this._renderList();
    },

    _bindEvents: function () {
      var self = this;
      var tabs = document.getElementById('contactTypeTabs');
      if (tabs) {
        tabs.addEventListener('click', function (e) {
          var tab = e.target.closest('.tab');
          if (!tab) return;
          tabs.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
          tab.classList.add('active');
          self._filter = tab.getAttribute('data-filter') || 'all';
          self._renderList();
        });
      }

      var search = document.getElementById('contactsSearch');
      if (search) {
        search.addEventListener('input', function () {
          self._search = search.value.toLowerCase();
          self._renderList();
        });
      }

      var newBtn = document.getElementById('newContactBtn');
      if (newBtn) { newBtn.addEventListener('click', function () { self.openForm(null); }); }

      var expBtn = document.getElementById('contactsExportExcel');
      if (expBtn) {
        expBtn.addEventListener('click', function () {
          UI.toast(Lang.t('Export coming in Phase 2', 'التصدير قريباً في المرحلة الثانية'), 'info');
        });
      }
    },

    _renderList: function () {
      var el = document.getElementById('contactsList');
      if (!el) return;
      var self = this;
      var rows = Store.getAll('contacts').filter(function (c) {
        if (self._filter !== 'all' && c.type !== self._filter) return false;
        if (self._search) {
          var hay = ((c.name || '') + ' ' + (c.nameAr || '') + ' ' + (c.city || '') + ' ' + (c.phone || '')).toLowerCase();
          if (hay.indexOf(self._search) < 0) return false;
        }
        return true;
      });

      if (!rows.length) {
        el.innerHTML = '<div class="empty-state"><p>' + Lang.t('No contacts found', 'لا توجد جهات اتصال') + '</p></div>';
        return;
      }

      el.innerHTML = '<table><thead><tr>' +
        '<th>' + Lang.t('Name', 'الاسم') + '</th>' +
        '<th>' + Lang.t('Type', 'النوع') + '</th>' +
        '<th>' + Lang.t('Phone', 'الهاتف') + '</th>' +
        '<th>' + Lang.t('City', 'المدينة') + '</th>' +
        '<th>' + Lang.t('VAT #', 'رقم الضريبة') + '</th>' +
        '<th>' + Lang.t('Actions', 'الإجراءات') + '</th>' +
        '</tr></thead><tbody>' +
        rows.map(function (c) {
          var typeLabel = c.type === 'customer' ? Lang.t('Customer', 'عميل') : Lang.t('Supplier', 'مورد');
          return '<tr>' +
            '<td><strong>' + Utils.escape(c.name) + '</strong>' +
              (c.nameAr ? '<br><small class="text-muted">' + Utils.escape(c.nameAr) + '</small>' : '') +
            '</td>' +
            '<td><span class="' + Utils.badgeClass(c.type) + '">' + typeLabel + '</span></td>' +
            '<td>' + Utils.escape(c.phone || '') + '</td>' +
            '<td>' + Utils.escape(c.city  || '') + '</td>' +
            '<td>' + Utils.escape(c.vatNumber || '') + '</td>' +
            '<td class="action-cell">' +
              '<button class="btn btn-secondary btn-xs" data-action="edit"   data-id="' + c.id + '">' + Lang.t('Edit', 'تعديل') + '</button> ' +
              '<button class="btn btn-danger    btn-xs" data-action="delete" data-id="' + c.id + '">' + Lang.t('Delete', 'حذف') + '</button>' +
            '</td></tr>';
        }).join('') +
        '</tbody></table>';

      el.querySelectorAll('[data-action]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id = btn.getAttribute('data-id');
          if (btn.getAttribute('data-action') === 'edit') {
            self.openForm(id);
          } else {
            UI.confirm(Lang.t('Delete this contact?', 'حذف جهة الاتصال؟'), function () {
              Store.remove('contacts', id);
              UI.toast(Lang.t('Contact deleted', 'تم حذف جهة الاتصال'), 'success');
              self._renderList();
            });
          }
        });
      });
    },

    openForm: function (id) {
      var self = this;
      var c = (id ? Store.getById('contacts', id) : null) || { type: 'customer' };
      var title = id ? Lang.t('Edit Contact', 'تعديل جهة الاتصال') : Lang.t('New Contact', 'جهة اتصال جديدة');

      var e = Utils.escape;
      var body =
        '<div class="form-grid">' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Name (EN)', 'الاسم (إنجليزي)') + '</label>' +
            '<input id="fName" class="form-control" value="' + e(c.name || '') + '"></div>' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Name (AR)', 'الاسم (عربي)') + '</label>' +
            '<input id="fNameAr" class="form-control" value="' + e(c.nameAr || '') + '"></div>' +
        '</div>' +
        '<div class="form-grid">' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Type', 'النوع') + '</label>' +
            '<select id="fType" class="form-control">' +
              '<option value="customer"' + (c.type === 'customer' ? ' selected' : '') + '>' + Lang.t('Customer', 'عميل') + '</option>' +
              '<option value="supplier"' + (c.type === 'supplier' ? ' selected' : '') + '>' + Lang.t('Supplier', 'مورد') + '</option>' +
            '</select></div>' +
          '<div class="form-group"><label class="form-label">' + Lang.t('City', 'المدينة') + '</label>' +
            '<input id="fCity" class="form-control" value="' + e(c.city || '') + '"></div>' +
        '</div>' +
        '<div class="form-grid">' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Phone', 'الهاتف') + '</label>' +
            '<input id="fPhone" class="form-control" value="' + e(c.phone || '') + '"></div>' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Email', 'البريد الإلكتروني') + '</label>' +
            '<input id="fEmail" type="email" class="form-control" value="' + e(c.email || '') + '"></div>' +
        '</div>' +
        '<div class="form-grid">' +
          '<div class="form-group"><label class="form-label">' + Lang.t('VAT Number', 'رقم ضريبة القيمة المضافة') + '</label>' +
            '<input id="fVat" class="form-control" value="' + e(c.vatNumber || '') + '"></div>' +
          '<div class="form-group"><label class="form-label">' + Lang.t('CR Number', 'السجل التجاري') + '</label>' +
            '<input id="fCr" class="form-control" value="' + e(c.crNumber || '') + '"></div>' +
        '</div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Notes', 'ملاحظات') + '</label>' +
          '<textarea id="fNotes" class="form-control" rows="2">' + e(c.notes || '') + '</textarea></div>';

      UI.modal({
        title: title, body: body,
        footer: '<button class="btn btn-primary" id="fSave">' + Lang.t('Save', 'حفظ') + '</button>' +
                '<button class="btn btn-secondary" id="fCancel">' + Lang.t('Cancel', 'إلغاء') + '</button>',
        onReady: function () {
          document.getElementById('fCancel').addEventListener('click', function () { UI.closeModal(); });
          document.getElementById('fSave').addEventListener('click', function () {
            var name = document.getElementById('fName').value.trim();
            if (!name) { UI.toast(Lang.t('Name is required', 'الاسم مطلوب'), 'error'); return; }
            Store.save('contacts', {
              id:        c.id || null,
              type:      document.getElementById('fType').value,
              name:      name,
              nameAr:    document.getElementById('fNameAr').value.trim(),
              phone:     document.getElementById('fPhone').value.trim(),
              email:     document.getElementById('fEmail').value.trim(),
              city:      document.getElementById('fCity').value.trim(),
              vatNumber: document.getElementById('fVat').value.trim(),
              crNumber:  document.getElementById('fCr').value.trim(),
              notes:     document.getElementById('fNotes').value.trim(),
              balance:   c.balance || 0,
              createdAt: c.createdAt
            });
            UI.closeModal();
            UI.toast(Lang.t('Contact saved', 'تم حفظ جهة الاتصال'), 'success');
            self._renderList();
          });
        }
      });
    }
  };

  /* ============================================================
     § 9  INVENTORY — scrap material stock CRUD
     ============================================================ */
  var Inventory = {
    _filter: 'all',
    _search: '',

    render: function (container) {
      Router._tpl('tpl-inventory', container);
      this._bindEvents();
      this._renderStats();
      this._renderList();
    },

    _bindEvents: function () {
      var self = this;
      var tabs = document.getElementById('invCategoryTabs');
      if (tabs) {
        tabs.addEventListener('click', function (e) {
          var tab = e.target.closest('.tab');
          if (!tab) return;
          tabs.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
          tab.classList.add('active');
          self._filter = tab.getAttribute('data-filter') || 'all';
          self._renderList();
        });
      }

      var search = document.getElementById('invSearch');
      if (search) {
        search.addEventListener('input', function () {
          self._search = search.value.toLowerCase();
          self._renderList();
        });
      }

      var newBtn = document.getElementById('newItemBtn');
      if (newBtn) { newBtn.addEventListener('click', function () { self.openForm(null); }); }

      var expBtn = document.getElementById('invExportExcel');
      if (expBtn) {
        expBtn.addEventListener('click', function () {
          UI.toast(Lang.t('Export coming in Phase 2', 'التصدير قريباً في المرحلة الثانية'), 'info');
        });
      }
    },

    _renderStats: function () {
      var el = document.getElementById('inventoryStats');
      if (!el) return;
      var items = Store.getAll('inventory');
      var value  = items.reduce(function (s, i) { return s + (i.quantity || 0) * (i.unitCost || 0); }, 0);
      var qty    = items.reduce(function (s, i) { return s + (i.quantity || 0); }, 0);
      var ferrous    = items.filter(function (i) { return i.category === 'ferrous'; }).length;
      var nonFerrous = items.filter(function (i) { return i.category === 'non_ferrous'; }).length;

      var stats = [
        { label: Lang.t('Total Stock Value', 'القيمة الإجمالية'),           value: Utils.formatCurrency(value) },
        { label: Lang.t('Total Quantity (tons)', 'الكمية الإجمالية (طن)'),  value: qty.toLocaleString() },
        { label: Lang.t('Ferrous Items', 'أصناف حديدية'),                   value: ferrous },
        { label: Lang.t('Non-Ferrous Items', 'أصناف غير حديدية'),           value: nonFerrous }
      ];
      el.innerHTML = stats.map(function (s) {
        return '<div class="stat-card"><div class="stat-card-body">' +
          '<div class="stat-value">' + s.value + '</div>' +
          '<div class="stat-label">'  + s.label + '</div>' +
        '</div></div>';
      }).join('');
    },

    _renderList: function () {
      var el = document.getElementById('inventoryList');
      if (!el) return;
      var self = this;
      var catLabels = {
        ferrous:     Lang.t('Ferrous', 'حديدي'),
        non_ferrous: Lang.t('Non-Ferrous', 'غير حديدي'),
        mixed:       Lang.t('Mixed', 'مختلط')
      };

      var rows = Store.getAll('inventory').filter(function (i) {
        if (self._filter !== 'all' && i.category !== self._filter) return false;
        if (self._search) {
          var hay = ((i.name || '') + ' ' + (i.nameAr || '') + ' ' + (i.sku || '')).toLowerCase();
          if (hay.indexOf(self._search) < 0) return false;
        }
        return true;
      });

      if (!rows.length) {
        el.innerHTML = '<div class="empty-state"><p>' + Lang.t('No items found', 'لا توجد أصناف') + '</p></div>';
        return;
      }

      el.innerHTML = '<table><thead><tr>' +
        '<th>SKU</th>' +
        '<th>' + Lang.t('Name', 'الاسم') + '</th>' +
        '<th>' + Lang.t('Category', 'الفئة') + '</th>' +
        '<th>' + Lang.t('Qty', 'الكمية') + '</th>' +
        '<th>' + Lang.t('Unit Cost', 'تكلفة الوحدة') + '</th>' +
        '<th>' + Lang.t('Unit Price', 'سعر البيع') + '</th>' +
        '<th>' + Lang.t('Stock Value', 'قيمة المخزون') + '</th>' +
        '<th>' + Lang.t('Actions', 'الإجراءات') + '</th>' +
        '</tr></thead><tbody>' +
        rows.map(function (it) {
          return '<tr>' +
            '<td><code>' + Utils.escape(it.sku || '') + '</code></td>' +
            '<td><strong>' + Utils.escape(it.name) + '</strong>' +
              (it.nameAr ? '<br><small class="text-muted">' + Utils.escape(it.nameAr) + '</small>' : '') +
            '</td>' +
            '<td><span class="' + Utils.badgeClass(it.category) + '">' + (catLabels[it.category] || it.category) + '</span></td>' +
            '<td>' + (it.quantity || 0) + ' ' + Utils.escape(it.unit || 'ton') + '</td>' +
            '<td>' + Utils.formatCurrency(it.unitCost)  + '</td>' +
            '<td>' + Utils.formatCurrency(it.unitPrice) + '</td>' +
            '<td>' + Utils.formatCurrency((it.quantity || 0) * (it.unitCost || 0)) + '</td>' +
            '<td class="action-cell">' +
              '<button class="btn btn-secondary btn-xs" data-action="edit"   data-id="' + it.id + '">' + Lang.t('Edit', 'تعديل') + '</button> ' +
              '<button class="btn btn-danger    btn-xs" data-action="delete" data-id="' + it.id + '">' + Lang.t('Delete', 'حذف') + '</button>' +
            '</td></tr>';
        }).join('') +
        '</tbody></table>';

      el.querySelectorAll('[data-action]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id = btn.getAttribute('data-id');
          if (btn.getAttribute('data-action') === 'edit') {
            self.openForm(id);
          } else {
            UI.confirm(Lang.t('Delete this item?', 'حذف هذا الصنف؟'), function () {
              Store.remove('inventory', id);
              UI.toast(Lang.t('Item deleted', 'تم حذف الصنف'), 'success');
              self._renderStats();
              self._renderList();
            });
          }
        });
      });
    },

    openForm: function (id) {
      var self = this;
      var it = (id ? Store.getById('inventory', id) : null) || { category: 'ferrous', unit: 'ton' };
      var title = id ? Lang.t('Edit Item', 'تعديل الصنف') : Lang.t('New Item', 'صنف جديد');

      var e = Utils.escape;
      var sel = function (val, opt) { return val === opt ? ' selected' : ''; };
      var body =
        '<div class="form-grid">' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Name (EN)', 'الاسم (إنجليزي)') + ' *</label>' +
            '<input id="iName" class="form-control" value="' + e(it.name || '') + '"></div>' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Name (AR)', 'الاسم (عربي)') + '</label>' +
            '<input id="iNameAr" class="form-control" value="' + e(it.nameAr || '') + '"></div>' +
        '</div>' +
        '<div class="form-grid">' +
          '<div class="form-group"><label class="form-label">SKU</label>' +
            '<input id="iSku" class="form-control" value="' + e(it.sku || '') + '"></div>' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Category', 'الفئة') + '</label>' +
            '<select id="iCat" class="form-control">' +
              '<option value="ferrous"'    + sel(it.category, 'ferrous')    + '>' + Lang.t('Ferrous', 'حديدي') + '</option>' +
              '<option value="non_ferrous"' + sel(it.category, 'non_ferrous') + '>' + Lang.t('Non-Ferrous', 'غير حديدي') + '</option>' +
              '<option value="mixed"'      + sel(it.category, 'mixed')      + '>' + Lang.t('Mixed/Other', 'مختلط/أخرى') + '</option>' +
            '</select></div>' +
        '</div>' +
        '<div class="form-grid">' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Quantity', 'الكمية') + '</label>' +
            '<input id="iQty" type="number" min="0" step="0.01" class="form-control" value="' + (it.quantity || 0) + '"></div>' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Unit', 'الوحدة') + '</label>' +
            '<select id="iUnit" class="form-control">' +
              '<option value="ton"' + sel(it.unit, 'ton') + '>' + Lang.t('Ton', 'طن') + '</option>' +
              '<option value="kg"'  + sel(it.unit, 'kg')  + '>kg</option>' +
              '<option value="pcs"' + sel(it.unit, 'pcs') + '>' + Lang.t('Pieces', 'قطع') + '</option>' +
            '</select></div>' +
        '</div>' +
        '<div class="form-grid">' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Unit Cost (SAR)', 'تكلفة الوحدة (ريال)') + '</label>' +
            '<input id="iCost" type="number" min="0" step="0.01" class="form-control" value="' + (it.unitCost || 0) + '"></div>' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Unit Price (SAR)', 'سعر البيع (ريال)') + '</label>' +
            '<input id="iPrice" type="number" min="0" step="0.01" class="form-control" value="' + (it.unitPrice || 0) + '"></div>' +
        '</div>' +
        '<div class="form-grid">' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Location', 'الموقع') + '</label>' +
            '<input id="iLoc" class="form-control" value="' + e(it.location || '') + '"></div>' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Notes', 'ملاحظات') + '</label>' +
            '<input id="iNotes" class="form-control" value="' + e(it.notes || '') + '"></div>' +
        '</div>';

      UI.modal({
        title: title, body: body,
        footer: '<button class="btn btn-primary" id="iSave">' + Lang.t('Save', 'حفظ') + '</button>' +
                '<button class="btn btn-secondary" id="iCancel">' + Lang.t('Cancel', 'إلغاء') + '</button>',
        onReady: function () {
          document.getElementById('iCancel').addEventListener('click', function () { UI.closeModal(); });
          document.getElementById('iSave').addEventListener('click', function () {
            var name = document.getElementById('iName').value.trim();
            if (!name) { UI.toast(Lang.t('Name is required', 'الاسم مطلوب'), 'error'); return; }
            Store.save('inventory', {
              id:        it.id || null,
              sku:       document.getElementById('iSku').value.trim(),
              name:      name,
              nameAr:    document.getElementById('iNameAr').value.trim(),
              category:  document.getElementById('iCat').value,
              unit:      document.getElementById('iUnit').value,
              quantity:  parseFloat(document.getElementById('iQty').value)   || 0,
              unitCost:  parseFloat(document.getElementById('iCost').value)  || 0,
              unitPrice: parseFloat(document.getElementById('iPrice').value) || 0,
              location:  document.getElementById('iLoc').value.trim(),
              notes:     document.getElementById('iNotes').value.trim(),
              createdAt: it.createdAt
            });
            UI.closeModal();
            UI.toast(Lang.t('Item saved', 'تم حفظ الصنف'), 'success');
            self._renderStats();
            self._renderList();
          });
        }
      });
    }
  };

  /* ============================================================
     § 10  APP — bootstrap (ties all modules together)
     ============================================================ */
  var App = {
    init: function () {
      Store.seed();
      Lang.init();
      Router.init();

      /* Language toggle button */
      var langBtn = document.getElementById('langToggle');
      if (langBtn) {
        langBtn.addEventListener('click', function () {
          Lang.toggle();
          /* Re-render current module so all dynamic text switches language */
          Router.navigate(Router._current || 'dashboard');
        });
      }
    }
  };

  /* Bootstrap */
  document.addEventListener('DOMContentLoaded', function () {
    App.init();
  });


  /* ============================================================
     erp.js — Phase 2
     Modules: Sales · Purchases · Expenses · Bank · Loans · Settings
     Appended inside Phase 1 IIFE — reuses App/DB/Store/Lang/UI/Utils
     ============================================================ */

  /* ----------------------------------------------------------
     Shared line-item row helpers  (Sales & Purchases)
     pfKey = 'unitPrice' (sales) | 'unitCost' (purchases)
     ---------------------------------------------------------- */
  function _buildItemRow(it, pfKey) {
    var e  = Utils.escape;
    var pf = pfKey || 'unitPrice';
    var opts = Store.getAll('inventory').map(function (i) {
      return '<option value="' + e(i.id) + '" data-p="' + e(i[pf] || 0) +
             '" data-u="' + e(i.unit || 'ton') + '"' +
             (it && it.itemId === i.id ? ' selected' : '') + '>' + e(i.name) + '</option>';
    }).join('');
    return '<div class="ir" style="display:flex;gap:6px;margin-bottom:6px;align-items:center">' +
      '<select class="form-control ir-s" style="flex:2">' +
        '<option value="">' + Lang.t('Item…', 'صنف…') + '</option>' + opts +
      '</select>' +
      '<input class="form-control ir-q" type="number" style="flex:0.6" min="0.01" step="0.01" ' +
        'placeholder="' + Lang.t('Qty', 'كمية') + '" value="' + (it ? (it.qty || '') : '') + '">' +
      '<input class="form-control ir-u" type="text" style="flex:0.5;background:#f8fafc" readonly ' +
        'value="' + (it ? e(it.unit || '') : '') + '">' +
      '<input class="form-control ir-p" type="number" style="flex:0.9" step="0.01" ' +
        'placeholder="' + Lang.t('Price', 'السعر') + '" value="' + (it ? (it[pf] || '') : '') + '">' +
      '<input class="form-control ir-t" type="number" style="flex:0.9;background:#f8fafc" readonly ' +
        'value="' + (it ? (it.total || '') : '') + '">' +
      '<button type="button" class="btn btn-danger btn-xs ir-x">×</button>' +
    '</div>';
  }

  /* Wire all item rows in a modal form; returns a getItems() collector. */
  function _wireItemRows(modal, vatRate, addBtnId, contId, subId, vatId, totId, pfKey) {
    var pf   = pfKey || 'unitPrice';
    var cont = modal.querySelector('#' + contId);

    function recalc() {
      var sub = 0;
      cont.querySelectorAll('.ir').forEach(function (r) {
        var qty = parseFloat(r.querySelector('.ir-q').value) || 0;
        var p   = parseFloat(r.querySelector('.ir-p').value) || 0;
        var t   = qty * p;
        r.querySelector('.ir-t').value = t ? t.toFixed(2) : '';
        sub += t;
      });
      var vat = sub * vatRate;
      var se  = modal.querySelector('#' + subId);
      var ve  = modal.querySelector('#' + vatId);
      var te  = modal.querySelector('#' + totId);
      if (se) se.textContent = Utils.formatCurrency(sub);
      if (ve) ve.textContent = Utils.formatCurrency(vat);
      if (te) te.textContent = Utils.formatCurrency(sub + vat);
    }

    function wireRow(row) {
      var sel = row.querySelector('.ir-s');
      sel.addEventListener('change', function () {
        var opt = sel.options[sel.selectedIndex];
        row.querySelector('.ir-p').value = opt.dataset.p || '';
        row.querySelector('.ir-u').value = opt.dataset.u || '';
        recalc();
      });
      row.querySelector('.ir-q').addEventListener('input', recalc);
      row.querySelector('.ir-p').addEventListener('input', recalc);
      row.querySelector('.ir-x').addEventListener('click', function () { row.remove(); recalc(); });
    }

    cont.querySelectorAll('.ir').forEach(wireRow);

    modal.querySelector('#' + addBtnId).addEventListener('click', function () {
      var tmp = document.createElement('div');
      tmp.innerHTML = _buildItemRow(null, pf);
      cont.appendChild(tmp.firstElementChild);
      wireRow(cont.lastElementChild);
    });

    recalc();

    return function getItems() {
      var out = [];
      cont.querySelectorAll('.ir').forEach(function (r) {
        var id  = r.querySelector('.ir-s').value;
        var qty = parseFloat(r.querySelector('.ir-q').value) || 0;
        var p   = parseFloat(r.querySelector('.ir-p').value) || 0;
        var nm  = r.querySelector('.ir-s').options[r.querySelector('.ir-s').selectedIndex].text;
        if (id && qty > 0) {
          var item = { itemId: id, name: nm, qty: qty, unit: r.querySelector('.ir-u').value, total: qty * p };
          item[pf] = p;
          out.push(item);
        }
      });
      return out;
    };
  }

  /* ============================================================
     § 11  SALES — scrap material sales CRUD
     ============================================================ */
  var Sales = {
    _search: '', _monthFilter: '',

    render: function (container) {
      Router._tpl('tpl-sales', container);
      this._bindEvents();
      this._renderStats();
      this._renderList();
    },

    _bindEvents: function () {
      var self = this;
      var s  = document.getElementById('salesSearch');
      var m  = document.getElementById('salesMonthFilter');
      var nb = document.getElementById('newSaleBtn');
      var ex = document.getElementById('salesExportExcel');
      if (s)  s.addEventListener('input',  function () { self._search = s.value.toLowerCase(); self._renderList(); });
      if (m)  m.addEventListener('change', function () { self._monthFilter = m.value; self._renderList(); });
      if (nb) nb.addEventListener('click', function () { self.openForm(null); });
      if (ex) ex.addEventListener('click', function () { UI.toast(Lang.t('Export coming soon', 'التصدير قريباً'), 'info'); });
    },

    _renderStats: function () {
      var el   = document.getElementById('salesStats');
      if (!el) return;
      var rows = Store.getAll('sales');
      var mo   = new Date().toISOString().slice(0, 7);
      var tot  = rows.reduce(function (a, x) { return a + (x.total || 0); }, 0);
      var mon  = rows.filter(function (x) { return (x.date || '').startsWith(mo); })
                     .reduce(function (a, x) { return a + (x.total || 0); }, 0);
      el.innerHTML = [
        { l: Lang.t('Total Sales',    'إجمالي المبيعات'),    v: rows.length },
        { l: Lang.t('Total Revenue',  'إجمالي الإيرادات'),   v: Utils.formatCurrency(tot) },
        { l: Lang.t('This Month',     'هذا الشهر'),          v: Utils.formatCurrency(mon) },
        { l: Lang.t('Avg Sale Value', 'متوسط قيمة البيع'),   v: Utils.formatCurrency(rows.length ? tot / rows.length : 0) }
      ].map(function (s) {
        return '<div class="stat-card"><div class="stat-card-body">' +
          '<div class="stat-value">' + s.v + '</div>' +
          '<div class="stat-label">' + s.l + '</div></div></div>';
      }).join('');
    },

    _renderList: function () {
      var el = document.getElementById('salesList');
      if (!el) return;
      var self = this;
      var rows = Store.getAll('sales').filter(function (r) {
        return (!self._monthFilter || (r.date || '').startsWith(self._monthFilter)) &&
               (!self._search     || ((r.number || '') + ' ' + (r.contactName || '')).toLowerCase().indexOf(self._search) >= 0);
      }).sort(function (a, b) { return (b.date || '') < (a.date || '') ? -1 : 1; });

      if (!rows.length) {
        el.innerHTML = '<div class="empty-state"><p>' + Lang.t('No sales found', 'لا توجد مبيعات') + '</p></div>';
        return;
      }

      el.innerHTML = '<div class="table-responsive"><table><thead><tr>' +
        '<th>' + Lang.t('Ref #',    'رقم')          + '</th>' +
        '<th>' + Lang.t('Date',     'التاريخ')       + '</th>' +
        '<th>' + Lang.t('Customer', 'العميل')        + '</th>' +
        '<th>' + Lang.t('Items',    'الأصناف')       + '</th>' +
        '<th>' + Lang.t('Total',    'الإجمالي')      + '</th>' +
        '<th>' + Lang.t('Actions',  'الإجراءات')     + '</th>' +
        '</tr></thead><tbody>' +
        rows.map(function (r) {
          var sum = (r.items || []).map(function (i) {
            return Utils.escape(i.name || '') + ' ×' + (i.qty || 0);
          }).join(', ') || '—';
          return '<tr>' +
            '<td><strong>' + Utils.escape(r.number || '') + '</strong></td>' +
            '<td>' + Utils.formatDate(r.date) + '</td>' +
            '<td>' + Utils.escape(r.contactName || '') + '</td>' +
            '<td style="font-size:0.8rem;max-width:200px;white-space:normal">' + sum + '</td>' +
            '<td><strong>' + Utils.formatCurrency(r.total) + '</strong></td>' +
            '<td class="action-cell">' +
              '<button class="btn btn-secondary btn-xs" data-act="view"   data-id="' + r.id + '">' + Lang.t('View',   'عرض')   + '</button> ' +
              '<button class="btn btn-secondary btn-xs" data-act="edit"   data-id="' + r.id + '">' + Lang.t('Edit',   'تعديل') + '</button> ' +
              '<button class="btn btn-danger    btn-xs" data-act="delete" data-id="' + r.id + '">' + Lang.t('Delete', 'حذف')   + '</button>' +
            '</td></tr>';
        }).join('') + '</tbody></table></div>';

      el.querySelectorAll('[data-act]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id  = btn.getAttribute('data-id');
          var act = btn.getAttribute('data-act');
          if (act === 'view')      self._viewDetail(id);
          else if (act === 'edit') self.openForm(id);
          else UI.confirm(Lang.t('Delete this sale?', 'حذف هذه المبيعة؟'), function () {
            Store.remove('sales', id);
            UI.toast(Lang.t('Sale deleted', 'تم حذف المبيعة'), 'success');
            self._renderStats(); self._renderList();
          });
        });
      });
    },

    _nextNum: function () {
      var ns = Store.getAll('sales').map(function (r) {
        var m = (r.number || '').match(/(\d+)$/); return m ? +m[1] : 0;
      });
      return 'SL-' + String((ns.length ? ns.reduce(function (a, b) { return Math.max(a, b); }, 0) : 0) + 1).padStart(3, '0');
    },

    openForm: function (id) {
      var self    = this;
      var r       = (id ? Store.getById('sales', id) : null) || { number: self._nextNum(), date: Utils.today(), items: [] };
      var e       = Utils.escape;
      var vatRate = parseFloat(Store.getSetting('vatRate') || 15) / 100;
      var custOpts = Store.getAll('contacts').filter(function (c) { return c.type === 'customer'; })
        .map(function (c) {
          return '<option value="' + e(c.id) + '"' + (r.contactId === c.id ? ' selected' : '') + '>' + e(c.name) + '</option>';
        }).join('');

      var body =
        '<div class="form-grid mb-2">' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Ref #', 'رقم المرجع') + '</label>' +
            '<input id="sNum" class="form-control" value="' + e(r.number || '') + '"></div>' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Date', 'التاريخ') + ' *</label>' +
            '<input id="sDt" type="date" class="form-control" value="' + e(r.date || Utils.today()) + '"></div>' +
        '</div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Customer', 'العميل') + ' *</label>' +
          '<select id="sCust" class="form-control"><option value="">' + Lang.t('Select…', 'اختر…') + '</option>' + custOpts + '</select></div>' +
        '<div class="form-section-title">' + Lang.t('Line Items', 'بنود البيع') + '</div>' +
        '<div id="sItemsCont">' +
          (r.items || []).map(function (it) { return _buildItemRow(it, 'unitPrice'); }).join('') +
        '</div>' +
        '<button type="button" id="sAddRow" class="btn btn-secondary btn-sm" style="margin-bottom:12px">' +
          Lang.t('+ Add Item', '+ إضافة صنف') + '</button>' +
        '<div class="detail-panel" style="font-size:0.875rem;margin-bottom:12px">' +
          '<div class="detail-row"><span class="detail-label">' + Lang.t('Subtotal', 'المجموع الفرعي') + '</span><span id="sSub"></span></div>' +
          '<div class="detail-row"><span class="detail-label">VAT (' + (Store.getSetting('vatRate') || 15) + '%)</span><span id="sVt"></span></div>' +
          '<div class="detail-row"><span class="detail-label" style="font-weight:700">' + Lang.t('Total', 'الإجمالي') + '</span><strong id="sTt"></strong></div>' +
        '</div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Notes', 'ملاحظات') + '</label>' +
          '<textarea id="sNts" class="form-control" rows="2">' + e(r.notes || '') + '</textarea></div>';

      UI.modal({
        title: id ? Lang.t('Edit Sale', 'تعديل المبيعة') : Lang.t('New Sale', 'بيع جديد'),
        body:  body,
        footer: '<button class="btn btn-primary" id="sSv">' + Lang.t('Save', 'حفظ') + '</button>' +
                '<button class="btn btn-secondary" id="sCl">' + Lang.t('Cancel', 'إلغاء') + '</button>',
        onReady: function (ov) {
          var getItems = _wireItemRows(ov, vatRate, 'sAddRow', 'sItemsCont', 'sSub', 'sVt', 'sTt', 'unitPrice');
          ov.querySelector('#sCl').addEventListener('click', UI.closeModal);
          ov.querySelector('#sSv').addEventListener('click', function () {
            var date = ov.querySelector('#sDt').value;
            var cid  = ov.querySelector('#sCust').value;
            if (!date)  { UI.toast(Lang.t('Date is required',            'التاريخ مطلوب'),        'error'); return; }
            if (!cid)   { UI.toast(Lang.t('Select a customer',           'اختر عميلاً'),           'error'); return; }
            var items = getItems();
            if (!items.length) { UI.toast(Lang.t('Add at least one item', 'أضف صنفاً واحداً على الأقل'), 'error'); return; }
            var sub = items.reduce(function (a, i) { return a + i.total; }, 0);
            var vat = sub * vatRate;
            var co  = Store.getById('contacts', cid);
            Store.save('sales', {
              id:          r.id || null,
              number:      ov.querySelector('#sNum').value.trim() || self._nextNum(),
              date:        date,
              contactId:   cid,
              contactName: co ? co.name : '',
              items:       items,
              subtotal:    sub,
              vatAmount:   vat,
              total:       sub + vat,
              notes:       ov.querySelector('#sNts').value.trim(),
              createdAt:   r.createdAt
            });
            UI.closeModal();
            UI.toast(Lang.t('Sale saved', 'تم حفظ المبيعة'), 'success');
            self._renderStats(); self._renderList();
          });
        }
      });
    },

    _viewDetail: function (id) {
      var r = Store.getById('sales', id);
      if (!r) return;
      var e    = Utils.escape;
      var body =
        '<div class="invoice-doc">' +
          '<div class="inv-header">' +
            '<div><div class="inv-company-name">' + e(Store.getSetting('companyNameEn') || '') + '</div>' +
              '<div class="inv-company-info">' + e(Store.getSetting('address') || '') + '</div></div>' +
            '<div><div class="inv-title" style="color:var(--color-success)">' + Lang.t('SALE', 'مبيعة') + '</div>' +
              '<div class="inv-number">' + e(r.number || '') + '</div></div>' +
          '</div>' +
          '<div class="inv-meta">' +
            '<div><div class="inv-meta-label">' + Lang.t('Date', 'التاريخ') + '</div>' +
              '<div class="inv-meta-value">' + Utils.formatDate(r.date) + '</div></div>' +
            '<div><div class="inv-meta-label">' + Lang.t('Customer', 'العميل') + '</div>' +
              '<div class="inv-meta-value">' + e(r.contactName || '') + '</div></div>' +
          '</div>' +
          '<div class="inv-items"><table><thead><tr>' +
            '<th>' + Lang.t('Item',  'الصنف')    + '</th>' +
            '<th>' + Lang.t('Qty',   'الكمية')   + '</th>' +
            '<th>' + Lang.t('Unit',  'الوحدة')   + '</th>' +
            '<th>' + Lang.t('Price', 'السعر')    + '</th>' +
            '<th>' + Lang.t('Total', 'الإجمالي') + '</th>' +
          '</tr></thead><tbody>' +
          (r.items || []).map(function (i) {
            return '<tr><td>' + e(i.name || '') + '</td><td>' + (i.qty || 0) + '</td>' +
              '<td>' + e(i.unit || '') + '</td><td>' + Utils.formatCurrency(i.unitPrice) + '</td>' +
              '<td>' + Utils.formatCurrency(i.total) + '</td></tr>';
          }).join('') + '</tbody></table></div>' +
          '<div class="inv-totals">' +
            '<div class="inv-total-row"><span class="label">' + Lang.t('Subtotal', 'المجموع الفرعي') + '</span>' +
              '<span class="value">' + Utils.formatCurrency(r.subtotal) + '</span></div>' +
            '<div class="inv-total-row"><span class="label">VAT</span>' +
              '<span class="value">' + Utils.formatCurrency(r.vatAmount) + '</span></div>' +
            '<div class="inv-total-row inv-grand-total"><span class="label">' + Lang.t('Total', 'الإجمالي') + '</span>' +
              '<span class="value">' + Utils.formatCurrency(r.total) + '</span></div>' +
          '</div>' +
          (r.notes ? '<div class="inv-notes">' + e(r.notes) + '</div>' : '') +
        '</div>';

      UI.modal({
        title: Lang.t('Sale – ', 'مبيعة – ') + Utils.escape(r.number || ''),
        body:  body,
        footer: '<button class="btn btn-primary no-print" id="vxSPrint">' + Lang.t('Print', 'طباعة') + '</button>' +
                '<button class="btn btn-secondary no-print" id="vxS">' + Lang.t('Close', 'إغلاق') + '</button>',
        onReady: function () {
          document.getElementById('vxSPrint').addEventListener('click', function () { window.print(); });
          document.getElementById('vxS').addEventListener('click', UI.closeModal);
        }
      });
    }
  };

  /* ============================================================
     § 12  PURCHASES — scrap lot purchases CRUD
     ============================================================ */
  var Purchases = {
    _search: '', _monthFilter: '',

    render: function (container) {
      Router._tpl('tpl-purchases', container);
      this._bindEvents();
      this._renderStats();
      this._renderList();
    },

    _bindEvents: function () {
      var self = this;
      var s  = document.getElementById('purchasesSearch');
      var m  = document.getElementById('purchasesMonthFilter');
      var nb = document.getElementById('newPurchaseBtn');
      var ex = document.getElementById('purchasesExportExcel');
      if (s)  s.addEventListener('input',  function () { self._search = s.value.toLowerCase(); self._renderList(); });
      if (m)  m.addEventListener('change', function () { self._monthFilter = m.value; self._renderList(); });
      if (nb) nb.addEventListener('click', function () { self.openForm(null); });
      if (ex) ex.addEventListener('click', function () { UI.toast(Lang.t('Export coming soon', 'التصدير قريباً'), 'info'); });
    },

    _renderStats: function () {
      var el   = document.getElementById('purchasesStats');
      if (!el) return;
      var rows = Store.getAll('purchases');
      var mo   = new Date().toISOString().slice(0, 7);
      var tot  = rows.reduce(function (a, x) { return a + (x.total || 0); }, 0);
      var mon  = rows.filter(function (x) { return (x.date || '').startsWith(mo); })
                     .reduce(function (a, x) { return a + (x.total || 0); }, 0);
      el.innerHTML = [
        { l: Lang.t('Total Purchases', 'إجمالي المشتريات'),  v: rows.length },
        { l: Lang.t('Total Cost',      'إجمالي التكلفة'),    v: Utils.formatCurrency(tot) },
        { l: Lang.t('This Month',      'هذا الشهر'),         v: Utils.formatCurrency(mon) },
        { l: Lang.t('Avg Purchase',    'متوسط المشتريات'),   v: Utils.formatCurrency(rows.length ? tot / rows.length : 0) }
      ].map(function (s) {
        return '<div class="stat-card"><div class="stat-card-body">' +
          '<div class="stat-value">' + s.v + '</div>' +
          '<div class="stat-label">' + s.l + '</div></div></div>';
      }).join('');
    },

    _renderList: function () {
      var el = document.getElementById('purchasesList');
      if (!el) return;
      var self = this;
      var rows = Store.getAll('purchases').filter(function (r) {
        return (!self._monthFilter || (r.date || '').startsWith(self._monthFilter)) &&
               (!self._search     || ((r.number || '') + ' ' + (r.contactName || '')).toLowerCase().indexOf(self._search) >= 0);
      }).sort(function (a, b) { return (b.date || '') < (a.date || '') ? -1 : 1; });

      if (!rows.length) {
        el.innerHTML = '<div class="empty-state"><p>' + Lang.t('No purchases found', 'لا توجد مشتريات') + '</p></div>';
        return;
      }

      el.innerHTML = '<div class="table-responsive"><table><thead><tr>' +
        '<th>' + Lang.t('Ref #',    'رقم')          + '</th>' +
        '<th>' + Lang.t('Date',     'التاريخ')       + '</th>' +
        '<th>' + Lang.t('Supplier', 'المورد')        + '</th>' +
        '<th>' + Lang.t('Items',    'الأصناف')       + '</th>' +
        '<th>' + Lang.t('Total',    'الإجمالي')      + '</th>' +
        '<th>' + Lang.t('Actions',  'الإجراءات')     + '</th>' +
        '</tr></thead><tbody>' +
        rows.map(function (r) {
          var sum = (r.items || []).map(function (i) {
            return Utils.escape(i.name || '') + ' ×' + (i.qty || 0);
          }).join(', ') || '—';
          return '<tr>' +
            '<td><strong>' + Utils.escape(r.number || '') + '</strong></td>' +
            '<td>' + Utils.formatDate(r.date) + '</td>' +
            '<td>' + Utils.escape(r.contactName || '') + '</td>' +
            '<td style="font-size:0.8rem;max-width:200px;white-space:normal">' + sum + '</td>' +
            '<td><strong>' + Utils.formatCurrency(r.total) + '</strong></td>' +
            '<td class="action-cell">' +
              '<button class="btn btn-secondary btn-xs" data-act="view"   data-id="' + r.id + '">' + Lang.t('View',   'عرض')   + '</button> ' +
              '<button class="btn btn-secondary btn-xs" data-act="edit"   data-id="' + r.id + '">' + Lang.t('Edit',   'تعديل') + '</button> ' +
              '<button class="btn btn-danger    btn-xs" data-act="delete" data-id="' + r.id + '">' + Lang.t('Delete', 'حذف')   + '</button>' +
            '</td></tr>';
        }).join('') + '</tbody></table></div>';

      el.querySelectorAll('[data-act]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id  = btn.getAttribute('data-id');
          var act = btn.getAttribute('data-act');
          if (act === 'view')      self._viewDetail(id);
          else if (act === 'edit') self.openForm(id);
          else UI.confirm(Lang.t('Delete this purchase?', 'حذف هذه المشتريات؟'), function () {
            Store.remove('purchases', id);
            UI.toast(Lang.t('Purchase deleted', 'تم حذف المشتريات'), 'success');
            self._renderStats(); self._renderList();
          });
        });
      });
    },

    _nextNum: function () {
      var ns = Store.getAll('purchases').map(function (r) {
        var m = (r.number || '').match(/(\d+)$/); return m ? +m[1] : 0;
      });
      return 'PO-' + String((ns.length ? ns.reduce(function (a, b) { return Math.max(a, b); }, 0) : 0) + 1).padStart(3, '0');
    },

    openForm: function (id) {
      var self    = this;
      var r       = (id ? Store.getById('purchases', id) : null) || { number: self._nextNum(), date: Utils.today(), items: [] };
      var e       = Utils.escape;
      var vatRate = parseFloat(Store.getSetting('vatRate') || 15) / 100;
      var suppOpts = Store.getAll('contacts').filter(function (c) { return c.type === 'supplier'; })
        .map(function (c) {
          return '<option value="' + e(c.id) + '"' + (r.contactId === c.id ? ' selected' : '') + '>' + e(c.name) + '</option>';
        }).join('');

      var body =
        '<div class="form-grid mb-2">' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Ref #', 'رقم المرجع') + '</label>' +
            '<input id="pNum" class="form-control" value="' + e(r.number || '') + '"></div>' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Date', 'التاريخ') + ' *</label>' +
            '<input id="pDt" type="date" class="form-control" value="' + e(r.date || Utils.today()) + '"></div>' +
        '</div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Supplier', 'المورد') + ' *</label>' +
          '<select id="pSupp" class="form-control"><option value="">' + Lang.t('Select…', 'اختر…') + '</option>' + suppOpts + '</select></div>' +
        '<div class="form-section-title">' + Lang.t('Line Items', 'بنود الشراء') + '</div>' +
        '<div id="pItemsCont">' +
          (r.items || []).map(function (it) { return _buildItemRow(it, 'unitCost'); }).join('') +
        '</div>' +
        '<button type="button" id="pAddRow" class="btn btn-secondary btn-sm" style="margin-bottom:12px">' +
          Lang.t('+ Add Item', '+ إضافة صنف') + '</button>' +
        '<div class="detail-panel" style="font-size:0.875rem;margin-bottom:12px">' +
          '<div class="detail-row"><span class="detail-label">' + Lang.t('Subtotal', 'المجموع الفرعي') + '</span><span id="pSub"></span></div>' +
          '<div class="detail-row"><span class="detail-label">VAT (' + (Store.getSetting('vatRate') || 15) + '%)</span><span id="pVt"></span></div>' +
          '<div class="detail-row"><span class="detail-label" style="font-weight:700">' + Lang.t('Total', 'الإجمالي') + '</span><strong id="pTt"></strong></div>' +
        '</div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Notes', 'ملاحظات') + '</label>' +
          '<textarea id="pNts" class="form-control" rows="2">' + e(r.notes || '') + '</textarea></div>';

      UI.modal({
        title: id ? Lang.t('Edit Purchase', 'تعديل المشتريات') : Lang.t('New Purchase', 'شراء جديد'),
        body:  body,
        footer: '<button class="btn btn-primary" id="pSv">' + Lang.t('Save', 'حفظ') + '</button>' +
                '<button class="btn btn-secondary" id="pCl">' + Lang.t('Cancel', 'إلغاء') + '</button>',
        onReady: function (ov) {
          var getItems = _wireItemRows(ov, vatRate, 'pAddRow', 'pItemsCont', 'pSub', 'pVt', 'pTt', 'unitCost');
          ov.querySelector('#pCl').addEventListener('click', UI.closeModal);
          ov.querySelector('#pSv').addEventListener('click', function () {
            var date = ov.querySelector('#pDt').value;
            var sid  = ov.querySelector('#pSupp').value;
            if (!date) { UI.toast(Lang.t('Date is required',            'التاريخ مطلوب'),              'error'); return; }
            if (!sid)  { UI.toast(Lang.t('Select a supplier',           'اختر مورداً'),                'error'); return; }
            var items = getItems();
            if (!items.length) { UI.toast(Lang.t('Add at least one item', 'أضف صنفاً واحداً على الأقل'), 'error'); return; }
            var sub = items.reduce(function (a, i) { return a + i.total; }, 0);
            var vat = sub * vatRate;
            var su  = Store.getById('contacts', sid);
            Store.save('purchases', {
              id:          r.id || null,
              number:      ov.querySelector('#pNum').value.trim() || self._nextNum(),
              date:        date,
              contactId:   sid,
              contactName: su ? su.name : '',
              items:       items,
              subtotal:    sub,
              vatAmount:   vat,
              total:       sub + vat,
              notes:       ov.querySelector('#pNts').value.trim(),
              createdAt:   r.createdAt
            });
            UI.closeModal();
            UI.toast(Lang.t('Purchase saved', 'تم حفظ المشتريات'), 'success');
            self._renderStats(); self._renderList();
          });
        }
      });
    },

    _viewDetail: function (id) {
      var r = Store.getById('purchases', id);
      if (!r) return;
      var e    = Utils.escape;
      var body =
        '<div class="invoice-doc">' +
          '<div class="inv-header">' +
            '<div><div class="inv-company-name">' + e(Store.getSetting('companyNameEn') || '') + '</div>' +
              '<div class="inv-company-info">' + e(Store.getSetting('address') || '') + '</div></div>' +
            '<div><div class="inv-title" style="color:var(--color-warning)">' + Lang.t('PURCHASE', 'مشتريات') + '</div>' +
              '<div class="inv-number">' + e(r.number || '') + '</div></div>' +
          '</div>' +
          '<div class="inv-meta">' +
            '<div><div class="inv-meta-label">' + Lang.t('Date', 'التاريخ') + '</div>' +
              '<div class="inv-meta-value">' + Utils.formatDate(r.date) + '</div></div>' +
            '<div><div class="inv-meta-label">' + Lang.t('Supplier', 'المورد') + '</div>' +
              '<div class="inv-meta-value">' + e(r.contactName || '') + '</div></div>' +
          '</div>' +
          '<div class="inv-items"><table><thead><tr>' +
            '<th>' + Lang.t('Item',  'الصنف')    + '</th>' +
            '<th>' + Lang.t('Qty',   'الكمية')   + '</th>' +
            '<th>' + Lang.t('Unit',  'الوحدة')   + '</th>' +
            '<th>' + Lang.t('Cost',  'التكلفة')  + '</th>' +
            '<th>' + Lang.t('Total', 'الإجمالي') + '</th>' +
          '</tr></thead><tbody>' +
          (r.items || []).map(function (i) {
            return '<tr><td>' + e(i.name || '') + '</td><td>' + (i.qty || 0) + '</td>' +
              '<td>' + e(i.unit || '') + '</td><td>' + Utils.formatCurrency(i.unitCost) + '</td>' +
              '<td>' + Utils.formatCurrency(i.total) + '</td></tr>';
          }).join('') + '</tbody></table></div>' +
          '<div class="inv-totals">' +
            '<div class="inv-total-row"><span class="label">' + Lang.t('Subtotal', 'المجموع الفرعي') + '</span>' +
              '<span class="value">' + Utils.formatCurrency(r.subtotal) + '</span></div>' +
            '<div class="inv-total-row"><span class="label">VAT</span>' +
              '<span class="value">' + Utils.formatCurrency(r.vatAmount) + '</span></div>' +
            '<div class="inv-total-row inv-grand-total"><span class="label">' + Lang.t('Total', 'الإجمالي') + '</span>' +
              '<span class="value">' + Utils.formatCurrency(r.total) + '</span></div>' +
          '</div>' +
          (r.notes ? '<div class="inv-notes">' + e(r.notes) + '</div>' : '') +
        '</div>';

      UI.modal({
        title: Lang.t('Purchase – ', 'مشتريات – ') + Utils.escape(r.number || ''),
        body:  body,
        footer: '<button class="btn btn-primary no-print" id="vxPPrint">' + Lang.t('Print', 'طباعة') + '</button>' +
                '<button class="btn btn-secondary no-print" id="vxP">' + Lang.t('Close', 'إغلاق') + '</button>',
        onReady: function () {
          document.getElementById('vxPPrint').addEventListener('click', function () { window.print(); });
          document.getElementById('vxP').addEventListener('click', UI.closeModal);
        }
      });
    }
  };

  /* ============================================================
     § 13  EXPENSES — operational expense CRUD
     ============================================================ */
  var Expenses = {
    _search: '', _monthFilter: '', _catFilter: '',

    render: function (container) {
      Router._tpl('tpl-expenses', container);
      this._bindEvents();
      this._renderStats();
      this._renderList();
    },

    _bindEvents: function () {
      var self = this;
      var s  = document.getElementById('expSearch');
      var m  = document.getElementById('expMonthFilter');
      var cf = document.getElementById('expCategoryFilter');
      var nb = document.getElementById('newExpenseBtn');
      var ex = document.getElementById('expExportExcel');
      if (s)  s.addEventListener('input',  function () { self._search    = s.value.toLowerCase(); self._renderList(); });
      if (m)  m.addEventListener('change', function () { self._monthFilter = m.value;  self._renderList(); });
      if (cf) cf.addEventListener('change', function () { self._catFilter  = cf.value; self._renderList(); });
      if (nb) nb.addEventListener('click', function () { self.openForm(null); });
      if (ex) ex.addEventListener('click', function () { UI.toast(Lang.t('Export coming soon', 'التصدير قريباً'), 'info'); });
    },

    _renderStats: function () {
      var el = document.getElementById('expenseStats');
      if (!el) return;
      var rows = Store.getAll('expenses');
      var mo   = new Date().toISOString().slice(0, 7);
      var tot  = rows.reduce(function (a, x) { return a + (x.amount || 0); }, 0);
      var mon  = rows.filter(function (x) { return (x.date || '').startsWith(mo); })
                     .reduce(function (a, x) { return a + (x.amount || 0); }, 0);
      var catTotals = {};
      rows.filter(function (x) { return (x.date || '').startsWith(mo); })
          .forEach(function (x) { catTotals[x.category] = (catTotals[x.category] || 0) + (x.amount || 0); });
      var topCat = Object.keys(catTotals).sort(function (a, b) { return catTotals[b] - catTotals[a]; })[0] || '—';

      el.innerHTML = [
        { l: Lang.t('Total Expenses', 'إجمالي المصروفات'),   v: Utils.formatCurrency(tot) },
        { l: Lang.t('This Month',     'هذا الشهر'),           v: Utils.formatCurrency(mon) },
        { l: Lang.t('Top Category',   'أعلى فئة'),            v: Utils.escape(topCat) },
        { l: Lang.t('Records',        'السجلات'),             v: rows.length }
      ].map(function (s) {
        return '<div class="stat-card"><div class="stat-card-body">' +
          '<div class="stat-value">' + s.v + '</div>' +
          '<div class="stat-label">' + s.l + '</div></div></div>';
      }).join('');
    },

    _catLabel: function (cat) {
      var map = {
        fuel:        Lang.t('Fuel',        'وقود'),
        maintenance: Lang.t('Maintenance', 'صيانة'),
        salaries:    Lang.t('Salaries',    'رواتب'),
        rent:        Lang.t('Rent',        'إيجار'),
        utilities:   Lang.t('Utilities',   'مرافق'),
        transport:   Lang.t('Transport',   'نقل'),
        other:       Lang.t('Other',       'أخرى')
      };
      return map[cat] || Utils.escape(cat || '');
    },

    _renderList: function () {
      var el = document.getElementById('expensesList');
      if (!el) return;
      var self = this;
      var rows = Store.getAll('expenses').filter(function (r) {
        return (!self._monthFilter || (r.date || '').startsWith(self._monthFilter)) &&
               (!self._catFilter   || r.category === self._catFilter) &&
               (!self._search      || ((r.description || '') + ' ' + (r.category || '')).toLowerCase().indexOf(self._search) >= 0);
      }).sort(function (a, b) { return (b.date || '') < (a.date || '') ? -1 : 1; });

      if (!rows.length) {
        el.innerHTML = '<div class="empty-state"><p>' + Lang.t('No expenses found', 'لا توجد مصروفات') + '</p></div>';
        return;
      }

      el.innerHTML = '<div class="table-responsive"><table><thead><tr>' +
        '<th>' + Lang.t('Date',        'التاريخ')   + '</th>' +
        '<th>' + Lang.t('Category',    'الفئة')     + '</th>' +
        '<th>' + Lang.t('Description', 'الوصف')     + '</th>' +
        '<th>' + Lang.t('Amount',      'المبلغ')    + '</th>' +
        '<th>' + Lang.t('Actions',     'الإجراءات') + '</th>' +
        '</tr></thead><tbody>' +
        rows.map(function (r) {
          return '<tr>' +
            '<td>' + Utils.formatDate(r.date) + '</td>' +
            '<td><span class="badge badge-secondary">' + self._catLabel(r.category) + '</span></td>' +
            '<td>' + Utils.escape(r.description || '') + '</td>' +
            '<td><strong>' + Utils.formatCurrency(r.amount) + '</strong></td>' +
            '<td class="action-cell">' +
              '<button class="btn btn-secondary btn-xs" data-act="edit"   data-id="' + r.id + '">' + Lang.t('Edit',   'تعديل') + '</button> ' +
              '<button class="btn btn-danger    btn-xs" data-act="delete" data-id="' + r.id + '">' + Lang.t('Delete', 'حذف')   + '</button>' +
            '</td></tr>';
        }).join('') + '</tbody></table></div>';

      el.querySelectorAll('[data-act]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id  = btn.getAttribute('data-id');
          var act = btn.getAttribute('data-act');
          if (act === 'edit') self.openForm(id);
          else UI.confirm(Lang.t('Delete this expense?', 'حذف هذا المصروف؟'), function () {
            Store.remove('expenses', id);
            UI.toast(Lang.t('Expense deleted', 'تم حذف المصروف'), 'success');
            self._renderStats(); self._renderList();
          });
        });
      });
    },

    openForm: function (id) {
      var self = this;
      var r    = (id ? Store.getById('expenses', id) : null) || { date: Utils.today() };
      var e    = Utils.escape;
      var cats = [
        ['fuel', Lang.t('Fuel', 'وقود')],
        ['maintenance', Lang.t('Maintenance', 'صيانة')],
        ['salaries', Lang.t('Salaries', 'رواتب')],
        ['rent', Lang.t('Rent', 'إيجار')],
        ['utilities', Lang.t('Utilities', 'مرافق')],
        ['transport', Lang.t('Transport', 'نقل')],
        ['other', Lang.t('Other', 'أخرى')]
      ];
      var catOpts = cats.map(function (opt) {
        return '<option value="' + opt[0] + '"' + (r.category === opt[0] ? ' selected' : '') + '>' + opt[1] + '</option>';
      }).join('');

      var body =
        '<div class="form-grid mb-2">' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Date', 'التاريخ') + ' *</label>' +
            '<input id="eDt" type="date" class="form-control" value="' + e(r.date || Utils.today()) + '"></div>' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Category', 'الفئة') + ' *</label>' +
            '<select id="eCat" class="form-control"><option value="">' + Lang.t('Select…', 'اختر…') + '</option>' + catOpts + '</select></div>' +
        '</div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Description (English)', 'الوصف (إنجليزي)') + ' *</label>' +
          '<input id="eDesc" class="form-control" value="' + e(r.description || '') + '"></div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Description (Arabic)', 'الوصف (عربي)') + '</label>' +
          '<input id="eDescAr" class="form-control" value="' + e(r.descriptionAr || '') + '"></div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Amount (SAR)', 'المبلغ (ريال)') + ' *</label>' +
          '<input id="eAmt" type="number" min="0.01" step="0.01" class="form-control" value="' + (r.amount || '') + '"></div>';

      UI.modal({
        title: id ? Lang.t('Edit Expense', 'تعديل المصروف') : Lang.t('Add Expense', 'إضافة مصروف'),
        body:  body,
        footer: '<button class="btn btn-primary" id="eSv">' + Lang.t('Save', 'حفظ') + '</button>' +
                '<button class="btn btn-secondary" id="eCl">' + Lang.t('Cancel', 'إلغاء') + '</button>',
        onReady: function (ov) {
          ov.querySelector('#eCl').addEventListener('click', UI.closeModal);
          ov.querySelector('#eSv').addEventListener('click', function () {
            var date = ov.querySelector('#eDt').value;
            var cat  = ov.querySelector('#eCat').value;
            var desc = ov.querySelector('#eDesc').value.trim();
            var amt  = parseFloat(ov.querySelector('#eAmt').value) || 0;
            if (!date) { UI.toast(Lang.t('Date is required',        'التاريخ مطلوب'),               'error'); return; }
            if (!cat)  { UI.toast(Lang.t('Select a category',       'اختر فئة'),                    'error'); return; }
            if (!desc) { UI.toast(Lang.t('Description is required', 'الوصف مطلوب'),                  'error'); return; }
            if (!amt)  { UI.toast(Lang.t('Amount must be > 0',      'يجب أن يكون المبلغ أكبر من 0'), 'error'); return; }
            Store.save('expenses', {
              id:            r.id || null,
              date:          date,
              category:      cat,
              description:   desc,
              descriptionAr: ov.querySelector('#eDescAr').value.trim(),
              amount:        amt,
              createdAt:     r.createdAt
            });
            UI.closeModal();
            UI.toast(Lang.t('Expense saved', 'تم حفظ المصروف'), 'success');
            self._renderStats(); self._renderList();
          });
        }
      });
    }
  };

  /* ============================================================
     § 14  BANK — accounts and transactions CRUD
     ============================================================ */
  var Bank = {
    _accountFilter: '', _monthFilter: '',

    render: function (container) {
      Router._tpl('tpl-bank', container);
      this._bindEvents();
      this._renderCards();
      this._buildAccountFilter();
      this._renderTxns();
    },

    _bindEvents: function () {
      var self = this;
      var af = document.getElementById('bankAccountFilter');
      var m  = document.getElementById('bankMonthFilter');
      var na = document.getElementById('newBankAccountBtn');
      var nt = document.getElementById('newBankTxnBtn');
      if (af) af.addEventListener('change', function () { self._accountFilter = af.value; self._renderTxns(); });
      if (m)  m.addEventListener('change',  function () { self._monthFilter   = m.value;  self._renderTxns(); });
      if (na) na.addEventListener('click',  function () { self.openAccountForm(null); });
      if (nt) nt.addEventListener('click',  function () { self.openTxnForm(null); });
    },

    _accountBalance: function (accountId) {
      var acc  = Store.getById('bankAccounts', accountId);
      var base = acc ? (acc.openingBalance || 0) : 0;
      return Store.getAll('bankTransactions')
        .filter(function (t) { return t.accountId === accountId; })
        .reduce(function (bal, t) {
          return t.type === 'credit' ? bal + (t.amount || 0) : bal - (t.amount || 0);
        }, base);
    },

    _renderCards: function () {
      var el = document.getElementById('bankAccountCards');
      if (!el) return;
      var self     = this;
      var accounts = Store.getAll('bankAccounts');
      if (!accounts.length) {
        el.innerHTML = '<div class="empty-state" style="width:100%"><p>' +
          Lang.t('No bank accounts yet. Click "Add Account" to get started.', 'لا توجد حسابات بنكية. انقر على "إضافة حساب" للبدء.') +
          '</p></div>';
        return;
      }
      el.innerHTML = accounts.map(function (acc) {
        var bal   = self._accountBalance(acc.id);
        var color = bal >= 0 ? 'var(--color-success)' : 'var(--color-danger)';
        return '<div class="card" style="min-width:220px;cursor:pointer" data-acc-id="' + acc.id + '">' +
          '<div class="card-title">' + Utils.escape(acc.name || '') + '</div>' +
          '<div style="font-size:0.75rem;color:var(--color-text-secondary);margin:4px 0">' + Utils.escape(acc.bankName || '') + '</div>' +
          '<div style="font-size:1.4rem;font-weight:800;color:' + color + '">' + Utils.formatCurrency(bal) + '</div>' +
          '<div style="font-size:0.7rem;color:var(--color-text-secondary);margin-top:4px">' +
            Utils.escape(acc.accountNumber || '') +
          '</div>' +
          '<div style="display:flex;gap:6px;margin-top:12px">' +
            '<button class="btn btn-secondary btn-xs" data-acc-edit="' + acc.id + '">' + Lang.t('Edit',   'تعديل') + '</button>' +
            '<button class="btn btn-danger    btn-xs" data-acc-del="'  + acc.id + '">' + Lang.t('Delete', 'حذف')   + '</button>' +
          '</div>' +
        '</div>';
      }).join('');

      el.querySelectorAll('[data-acc-id]').forEach(function (card) {
        card.addEventListener('click', function (ev) {
          if (ev.target.closest('[data-acc-edit],[data-acc-del]')) return;
          var aid = card.getAttribute('data-acc-id');
          self._accountFilter = self._accountFilter === aid ? '' : aid;
          var af = document.getElementById('bankAccountFilter');
          if (af) af.value = self._accountFilter;
          self._renderTxns();
        });
      });
      el.querySelectorAll('[data-acc-edit]').forEach(function (btn) {
        btn.addEventListener('click', function (ev) {
          ev.stopPropagation();
          self.openAccountForm(btn.getAttribute('data-acc-edit'));
        });
      });
      el.querySelectorAll('[data-acc-del]').forEach(function (btn) {
        btn.addEventListener('click', function (ev) {
          ev.stopPropagation();
          UI.confirm(Lang.t('Delete this account?', 'حذف هذا الحساب؟'), function () {
            Store.remove('bankAccounts', btn.getAttribute('data-acc-del'));
            UI.toast(Lang.t('Account deleted', 'تم حذف الحساب'), 'success');
            self._renderCards();
            self._buildAccountFilter();
            self._renderTxns();
          });
        });
      });
    },

    _buildAccountFilter: function () {
      var sel = document.getElementById('bankAccountFilter');
      if (!sel) return;
      while (sel.options.length > 1) sel.remove(1);
      Store.getAll('bankAccounts').forEach(function (acc) {
        var opt       = document.createElement('option');
        opt.value     = acc.id;
        opt.textContent = acc.name;
        sel.appendChild(opt);
      });
      sel.value = this._accountFilter;
    },

    _renderTxns: function () {
      var el = document.getElementById('bankTxnList');
      if (!el) return;
      var self = this;
      var rows = Store.getAll('bankTransactions').filter(function (t) {
        return (!self._accountFilter || t.accountId === self._accountFilter) &&
               (!self._monthFilter   || (t.date || '').startsWith(self._monthFilter));
      }).sort(function (a, b) { return (b.date || '') < (a.date || '') ? -1 : 1; });

      if (!rows.length) {
        el.innerHTML = '<div class="empty-state"><p>' + Lang.t('No transactions found', 'لا توجد معاملات') + '</p></div>';
        return;
      }

      el.innerHTML = '<div class="table-responsive"><table><thead><tr>' +
        '<th>' + Lang.t('Date',        'التاريخ')   + '</th>' +
        '<th>' + Lang.t('Account',     'الحساب')    + '</th>' +
        '<th>' + Lang.t('Type',        'النوع')     + '</th>' +
        '<th>' + Lang.t('Description', 'الوصف')     + '</th>' +
        '<th>' + Lang.t('Reference',   'المرجع')    + '</th>' +
        '<th>' + Lang.t('Amount',      'المبلغ')    + '</th>' +
        '<th>' + Lang.t('Actions',     'الإجراءات') + '</th>' +
        '</tr></thead><tbody>' +
        rows.map(function (r) {
          var typeLabel = r.type === 'credit' ? Lang.t('Credit', 'ائتمان') : Lang.t('Debit', 'مدين');
          var typeCls   = r.type === 'credit' ? 'badge-success' : 'badge-danger';
          var amtColor  = r.type === 'credit' ? 'color:var(--color-success)' : 'color:var(--color-danger)';
          var amtSign   = r.type === 'credit' ? '+' : '−';
          return '<tr>' +
            '<td>' + Utils.formatDate(r.date) + '</td>' +
            '<td>' + Utils.escape(r.accountName || '') + '</td>' +
            '<td><span class="badge ' + typeCls + '">' + typeLabel + '</span></td>' +
            '<td>' + Utils.escape(r.description || '') + '</td>' +
            '<td>' + Utils.escape(r.reference || '') + '</td>' +
            '<td><strong style="' + amtColor + '">' + amtSign + Utils.formatCurrency(r.amount) + '</strong></td>' +
            '<td class="action-cell">' +
              '<button class="btn btn-secondary btn-xs" data-act="edit"   data-id="' + r.id + '">' + Lang.t('Edit',   'تعديل') + '</button> ' +
              '<button class="btn btn-danger    btn-xs" data-act="delete" data-id="' + r.id + '">' + Lang.t('Delete', 'حذف')   + '</button>' +
            '</td></tr>';
        }).join('') + '</tbody></table></div>';

      el.querySelectorAll('[data-act]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id  = btn.getAttribute('data-id');
          var act = btn.getAttribute('data-act');
          if (act === 'edit') self.openTxnForm(id);
          else UI.confirm(Lang.t('Delete this transaction?', 'حذف هذه المعاملة؟'), function () {
            Store.remove('bankTransactions', id);
            UI.toast(Lang.t('Transaction deleted', 'تم حذف المعاملة'), 'success');
            self._renderCards(); self._renderTxns();
          });
        });
      });
    },

    openAccountForm: function (id) {
      var self = this;
      var r    = (id ? Store.getById('bankAccounts', id) : null) || {};
      var e    = Utils.escape;
      var body =
        '<div class="form-group"><label class="form-label">' + Lang.t('Account Name', 'اسم الحساب') + ' *</label>' +
          '<input id="baName" class="form-control" value="' + e(r.name || '') + '"></div>' +
        '<div class="form-grid">' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Bank Name', 'اسم البنك') + '</label>' +
            '<input id="baBankName" class="form-control" value="' + e(r.bankName || '') + '"></div>' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Account Number / IBAN', 'رقم الحساب / IBAN') + '</label>' +
            '<input id="baAccNum" class="form-control" value="' + e(r.accountNumber || '') + '"></div>' +
        '</div>' +
        '<div class="form-grid">' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Currency', 'العملة') + '</label>' +
            '<select id="baCur" class="form-control">' +
              '<option value="SAR"' + ((!r.currency || r.currency === 'SAR') ? ' selected' : '') + '>SAR</option>' +
              '<option value="USD"' + (r.currency === 'USD' ? ' selected' : '') + '>USD</option>' +
            '</select></div>' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Opening Balance', 'الرصيد الافتتاحي') + '</label>' +
            '<input id="baObal" type="number" step="0.01" class="form-control" value="' + (r.openingBalance !== undefined ? r.openingBalance : 0) + '"></div>' +
        '</div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Notes', 'ملاحظات') + '</label>' +
          '<input id="baNotes" class="form-control" value="' + e(r.notes || '') + '"></div>';

      UI.modal({
        title: id ? Lang.t('Edit Account', 'تعديل الحساب') : Lang.t('Add Bank Account', 'إضافة حساب بنكي'),
        body:  body,
        footer: '<button class="btn btn-primary" id="baSv">' + Lang.t('Save', 'حفظ') + '</button>' +
                '<button class="btn btn-secondary" id="baCl">' + Lang.t('Cancel', 'إلغاء') + '</button>',
        onReady: function (ov) {
          ov.querySelector('#baCl').addEventListener('click', UI.closeModal);
          ov.querySelector('#baSv').addEventListener('click', function () {
            var name = ov.querySelector('#baName').value.trim();
            if (!name) { UI.toast(Lang.t('Account name is required', 'اسم الحساب مطلوب'), 'error'); return; }
            Store.save('bankAccounts', {
              id:             r.id || null,
              name:           name,
              bankName:       ov.querySelector('#baBankName').value.trim(),
              accountNumber:  ov.querySelector('#baAccNum').value.trim(),
              currency:       ov.querySelector('#baCur').value,
              openingBalance: parseFloat(ov.querySelector('#baObal').value) || 0,
              notes:          ov.querySelector('#baNotes').value.trim(),
              createdAt:      r.createdAt
            });
            UI.closeModal();
            UI.toast(Lang.t('Account saved', 'تم حفظ الحساب'), 'success');
            self._renderCards(); self._buildAccountFilter(); self._renderTxns();
          });
        }
      });
    },

    openTxnForm: function (id) {
      var self = this;
      var r    = (id ? Store.getById('bankTransactions', id) : null) || { date: Utils.today(), type: 'credit' };
      var e    = Utils.escape;
      var accOpts = Store.getAll('bankAccounts').map(function (acc) {
        return '<option value="' + e(acc.id) + '"' + (r.accountId === acc.id ? ' selected' : '') + '>' + e(acc.name) + '</option>';
      }).join('');
      var body =
        '<div class="form-grid">' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Account', 'الحساب') + ' *</label>' +
            '<select id="btAcc" class="form-control"><option value="">' + Lang.t('Select…', 'اختر…') + '</option>' + accOpts + '</select></div>' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Date', 'التاريخ') + ' *</label>' +
            '<input id="btDt" type="date" class="form-control" value="' + e(r.date || Utils.today()) + '"></div>' +
        '</div>' +
        '<div class="form-grid">' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Type', 'النوع') + ' *</label>' +
            '<select id="btType" class="form-control">' +
              '<option value="credit"' + (r.type !== 'debit' ? ' selected' : '') + '>' + Lang.t('Credit (Money In)', 'ائتمان (وارد)')  + '</option>' +
              '<option value="debit"'  + (r.type === 'debit' ? ' selected' : '') + '>' + Lang.t('Debit (Money Out)', 'مدين (صادر)')    + '</option>' +
            '</select></div>' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Amount (SAR)', 'المبلغ (ريال)') + ' *</label>' +
            '<input id="btAmt" type="number" min="0.01" step="0.01" class="form-control" value="' + (r.amount || '') + '"></div>' +
        '</div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Description', 'الوصف') + ' *</label>' +
          '<input id="btDesc" class="form-control" value="' + e(r.description || '') + '"></div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Reference / Invoice #', 'المرجع / رقم الفاتورة') + '</label>' +
          '<input id="btRef" class="form-control" value="' + e(r.reference || '') + '"></div>';

      UI.modal({
        title: id ? Lang.t('Edit Transaction', 'تعديل المعاملة') : Lang.t('New Transaction', 'معاملة جديدة'),
        body:  body,
        footer: '<button class="btn btn-primary" id="btSv">' + Lang.t('Save', 'حفظ') + '</button>' +
                '<button class="btn btn-secondary" id="btCl">' + Lang.t('Cancel', 'إلغاء') + '</button>',
        onReady: function (ov) {
          ov.querySelector('#btCl').addEventListener('click', UI.closeModal);
          ov.querySelector('#btSv').addEventListener('click', function () {
            var aid  = ov.querySelector('#btAcc').value;
            var date = ov.querySelector('#btDt').value;
            var desc = ov.querySelector('#btDesc').value.trim();
            var amt  = parseFloat(ov.querySelector('#btAmt').value) || 0;
            if (!aid)  { UI.toast(Lang.t('Select an account',       'اختر حساباً'),                  'error'); return; }
            if (!date) { UI.toast(Lang.t('Date is required',        'التاريخ مطلوب'),                 'error'); return; }
            if (!desc) { UI.toast(Lang.t('Description is required', 'الوصف مطلوب'),                   'error'); return; }
            if (!amt)  { UI.toast(Lang.t('Amount must be > 0',      'يجب أن يكون المبلغ أكبر من 0'),  'error'); return; }
            var acc = Store.getById('bankAccounts', aid);
            Store.save('bankTransactions', {
              id:          r.id || null,
              accountId:   aid,
              accountName: acc ? acc.name : '',
              date:        date,
              type:        ov.querySelector('#btType').value,
              description: desc,
              reference:   ov.querySelector('#btRef').value.trim(),
              amount:      amt,
              createdAt:   r.createdAt
            });
            UI.closeModal();
            UI.toast(Lang.t('Transaction saved', 'تم حفظ المعاملة'), 'success');
            self._renderCards(); self._renderTxns();
          });
        }
      });
    }
  };

  /* ============================================================
     § 15  LOANS — payable / receivable CRUD
     ============================================================ */
  var Loans = {
    _filter: 'all',

    render: function (container) {
      Router._tpl('tpl-loans', container);
      this._bindEvents();
      this._renderStats();
      this._renderList();
    },

    _bindEvents: function () {
      var self = this;
      var tabs = document.getElementById('loanTypeTabs');
      if (tabs) {
        tabs.addEventListener('click', function (ev) {
          var tab = ev.target.closest('.tab');
          if (!tab) return;
          tabs.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
          tab.classList.add('active');
          self._filter = tab.getAttribute('data-filter') || 'all';
          self._renderList();
        });
      }
      var nb = document.getElementById('newLoanBtn');
      if (nb) nb.addEventListener('click', function () { self.openForm(null); });
    },

    _renderStats: function () {
      var el = document.getElementById('loanStats');
      if (!el) return;
      var rows = Store.getAll('loans');
      var recv = rows.filter(function (l) { return l.type === 'received'; });
      var extd = rows.filter(function (l) { return l.type === 'extended'; });
      var recvOut = recv.filter(function (l) { return l.status === 'active'; })
                        .reduce(function (a, l) { return a + (l.outstanding || 0); }, 0);
      var extdOut = extd.filter(function (l) { return l.status === 'active'; })
                        .reduce(function (a, l) { return a + (l.outstanding || 0); }, 0);
      el.innerHTML = [
        { l: Lang.t('Loans Received',         'قروض مستلمة'),   v: Utils.formatCurrency(recv.reduce(function (a, l) { return a + (l.amount || 0); }, 0)) },
        { l: Lang.t('Outstanding Payable',    'مستحق الدفع'),   v: Utils.formatCurrency(recvOut) },
        { l: Lang.t('Loans Extended',         'قروض ممنوحة'),   v: Utils.formatCurrency(extd.reduce(function (a, l) { return a + (l.amount || 0); }, 0)) },
        { l: Lang.t('Outstanding Receivable', 'مستحق القبض'),   v: Utils.formatCurrency(extdOut) }
      ].map(function (s) {
        return '<div class="stat-card"><div class="stat-card-body">' +
          '<div class="stat-value">' + s.v + '</div>' +
          '<div class="stat-label">' + s.l + '</div></div></div>';
      }).join('');
    },

    _renderList: function () {
      var el = document.getElementById('loansList');
      if (!el) return;
      var self  = this;
      var today = Utils.today();
      var rows  = Store.getAll('loans').filter(function (l) {
        return self._filter === 'all' || l.type === self._filter;
      });

      if (!rows.length) {
        el.innerHTML = '<div class="empty-state"><p>' + Lang.t('No loans found', 'لا توجد قروض') + '</p></div>';
        return;
      }

      el.innerHTML = '<div class="table-responsive"><table><thead><tr>' +
        '<th>' + Lang.t('Party',       'الجهة')              + '</th>' +
        '<th>' + Lang.t('Type',        'النوع')              + '</th>' +
        '<th>' + Lang.t('Amount',      'المبلغ')             + '</th>' +
        '<th>' + Lang.t('Outstanding', 'المتبقي')            + '</th>' +
        '<th>' + Lang.t('Due Date',    'تاريخ الاستحقاق')    + '</th>' +
        '<th>' + Lang.t('Rate (%)',    'الفائدة (%)')         + '</th>' +
        '<th>' + Lang.t('Status',      'الحالة')             + '</th>' +
        '<th>' + Lang.t('Actions',     'الإجراءات')          + '</th>' +
        '</tr></thead><tbody>' +
        rows.map(function (r) {
          var typeLabel   = r.type === 'received' ? Lang.t('Received', 'مستلم') : Lang.t('Extended', 'ممنوح');
          var typeCls     = r.type === 'received' ? 'badge-danger' : 'badge-success';
          var statusLabel = r.status === 'active' ? Lang.t('Active', 'نشط') : Lang.t('Settled', 'مسدد');
          var statusCls   = r.status === 'active' ? 'badge-warning' : 'badge-secondary';
          var overdue     = r.status === 'active' && r.dueDate && r.dueDate < today;
          return '<tr' + (overdue ? ' style="background:#fff5f5"' : '') + '>' +
            '<td><strong>' + Utils.escape(r.party || '') + '</strong>' +
              (r.partyAr ? '<br><small style="color:var(--color-text-secondary)">' + Utils.escape(r.partyAr) + '</small>' : '') +
            '</td>' +
            '<td><span class="badge ' + typeCls + '">' + typeLabel + '</span></td>' +
            '<td>' + Utils.formatCurrency(r.amount) + '</td>' +
            '<td><strong>' + Utils.formatCurrency(r.outstanding) + '</strong></td>' +
            '<td>' + Utils.formatDate(r.dueDate) +
              (overdue ? ' <span class="badge badge-danger">' + Lang.t('Overdue', 'متأخر') + '</span>' : '') +
            '</td>' +
            '<td>' + (r.interestRate || 0) + '%</td>' +
            '<td><span class="badge ' + statusCls + '">' + statusLabel + '</span></td>' +
            '<td class="action-cell">' +
              '<button class="btn btn-secondary btn-xs" data-act="edit"   data-id="' + r.id + '">' + Lang.t('Edit',   'تعديل') + '</button> ' +
              '<button class="btn btn-danger    btn-xs" data-act="delete" data-id="' + r.id + '">' + Lang.t('Delete', 'حذف')   + '</button>' +
            '</td></tr>';
        }).join('') + '</tbody></table></div>';

      el.querySelectorAll('[data-act]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id  = btn.getAttribute('data-id');
          var act = btn.getAttribute('data-act');
          if (act === 'edit') self.openForm(id);
          else UI.confirm(Lang.t('Delete this loan?', 'حذف هذا القرض؟'), function () {
            Store.remove('loans', id);
            UI.toast(Lang.t('Loan deleted', 'تم حذف القرض'), 'success');
            self._renderStats(); self._renderList();
          });
        });
      });
    },

    openForm: function (id) {
      var self = this;
      var r    = (id ? Store.getById('loans', id) : null) || { type: 'received', status: 'active', startDate: Utils.today() };
      var e    = Utils.escape;
      var sel  = function (val, opt) { return val === opt ? ' selected' : ''; };
      var body =
        '<div class="form-grid">' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Party (English)', 'الجهة (إنجليزي)') + ' *</label>' +
            '<input id="lParty" class="form-control" value="' + e(r.party || '') + '"></div>' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Party (Arabic)', 'الجهة (عربي)') + '</label>' +
            '<input id="lPartyAr" class="form-control" value="' + e(r.partyAr || '') + '"></div>' +
        '</div>' +
        '<div class="form-grid">' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Type', 'النوع') + ' *</label>' +
            '<select id="lType" class="form-control">' +
              '<option value="received"' + sel(r.type, 'received') + '>' + Lang.t('Received (We Owe)',    'مستلم (علينا)') + '</option>' +
              '<option value="extended"' + sel(r.type, 'extended') + '>' + Lang.t('Extended (Owed to Us)', 'ممنوح (لنا)')   + '</option>' +
            '</select></div>' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Status', 'الحالة') + '</label>' +
            '<select id="lStatus" class="form-control">' +
              '<option value="active"'  + sel(r.status, 'active')  + '>' + Lang.t('Active',  'نشط')  + '</option>' +
              '<option value="settled"' + sel(r.status, 'settled') + '>' + Lang.t('Settled', 'مسدد') + '</option>' +
            '</select></div>' +
        '</div>' +
        '<div class="form-grid">' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Loan Amount (SAR)', 'مبلغ القرض (ريال)') + ' *</label>' +
            '<input id="lAmt" type="number" min="0.01" step="0.01" class="form-control" value="' + (r.amount || '') + '"></div>' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Outstanding (SAR)', 'المتبقي (ريال)') + '</label>' +
            '<input id="lOut" type="number" min="0" step="0.01" class="form-control" value="' + (r.outstanding !== undefined ? r.outstanding : (r.amount || '')) + '"></div>' +
        '</div>' +
        '<div class="form-grid">' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Start Date', 'تاريخ البدء') + '</label>' +
            '<input id="lStart" type="date" class="form-control" value="' + e(r.startDate || Utils.today()) + '"></div>' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Due Date', 'تاريخ الاستحقاق') + '</label>' +
            '<input id="lDue" type="date" class="form-control" value="' + e(r.dueDate || '') + '"></div>' +
        '</div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Interest Rate (%)', 'معدل الفائدة (%)') + '</label>' +
          '<input id="lRate" type="number" min="0" step="0.01" class="form-control" value="' + (r.interestRate || 0) + '"></div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Notes', 'ملاحظات') + '</label>' +
          '<textarea id="lNts" class="form-control" rows="2">' + e(r.notes || '') + '</textarea></div>';

      UI.modal({
        title: id ? Lang.t('Edit Loan', 'تعديل القرض') : Lang.t('New Loan', 'قرض جديد'),
        body:  body,
        footer: '<button class="btn btn-primary" id="lSv">' + Lang.t('Save', 'حفظ') + '</button>' +
                '<button class="btn btn-secondary" id="lCl">' + Lang.t('Cancel', 'إلغاء') + '</button>',
        onReady: function (ov) {
          ov.querySelector('#lCl').addEventListener('click', UI.closeModal);
          ov.querySelector('#lSv').addEventListener('click', function () {
            var party = ov.querySelector('#lParty').value.trim();
            var amt   = parseFloat(ov.querySelector('#lAmt').value) || 0;
            if (!party) { UI.toast(Lang.t('Party name is required', 'اسم الجهة مطلوب'),               'error'); return; }
            if (!amt)   { UI.toast(Lang.t('Amount must be > 0',     'يجب أن يكون المبلغ أكبر من 0'), 'error'); return; }
            Store.save('loans', {
              id:           r.id || null,
              party:        party,
              partyAr:      ov.querySelector('#lPartyAr').value.trim(),
              type:         ov.querySelector('#lType').value,
              status:       ov.querySelector('#lStatus').value,
              amount:       amt,
              outstanding:  parseFloat(ov.querySelector('#lOut').value) || 0,
              startDate:    ov.querySelector('#lStart').value,
              dueDate:      ov.querySelector('#lDue').value,
              interestRate: parseFloat(ov.querySelector('#lRate').value) || 0,
              notes:        ov.querySelector('#lNts').value.trim(),
              createdAt:    r.createdAt
            });
            UI.closeModal();
            UI.toast(Lang.t('Loan saved', 'تم حفظ القرض'), 'success');
            self._renderStats(); self._renderList();
          });
        }
      });
    }
  };

  /* ============================================================
     § 16  SETTINGS — company configuration and system preferences
     ============================================================ */

  /* Data collections for export / clear (defined once, used in Settings._bindEvents) */
  var _DATA_COLLECTIONS = ['settings', 'contacts', 'inventory', 'invoices', 'expenses',
                           'sales', 'purchases', 'bankAccounts', 'bankTransactions', 'loans'];

  var Settings = {
    render: function (container) {
      Router._tpl('tpl-settings', container);
      this._populate();
      this._bindEvents();
    },

    /* Map camelCase setting key → element ID (convention: sett + TitleCase) */
    _elId: function (key) {
      return 'sett' + key.charAt(0).toUpperCase() + key.slice(1);
    },

    _populate: function () {
      var s      = DB.get('settings') || {};
      var self   = this;
      var fields = [
        'companyNameEn', 'companyNameAr', 'address', 'phone', 'email', 'city', 'website',
        'vatNumber', 'crNumber', 'vatRate', 'currency', 'invoiceTerms', 'invoiceNotes',
        'invPrefix', 'invNext', 'docPrefix', 'docNext', 'defaultLang', 'dateFormat', 'weightUnit'
      ];
      fields.forEach(function (key) {
        var el = document.getElementById(self._elId(key));
        if (el && s[key] !== undefined) el.value = s[key];
      });
    },

    _bindEvents: function () {
      var self = this;

      var saveBtn = document.getElementById('settSaveBtn');
      if (saveBtn) {
        saveBtn.addEventListener('click', function () {
          var fields = [
            'companyNameEn', 'companyNameAr', 'address', 'phone', 'email', 'city', 'website',
            'vatNumber', 'crNumber', 'invoiceTerms', 'invoiceNotes',
            'invPrefix', 'invNext', 'docPrefix', 'docNext', 'defaultLang', 'dateFormat', 'weightUnit'
          ];
          var obj = {};
          fields.forEach(function (key) {
            var el = document.getElementById(self._elId(key));
            if (el) obj[key] = el.value;
          });
          var vatEl = document.getElementById('settVatRate');
          if (vatEl) obj.vatRate = parseFloat(vatEl.value) || 15;
          var curEl = document.getElementById('settCurrency');
          if (curEl) obj.currency = curEl.value;
          Store.saveSettings(obj);
          UI.toast(Lang.t('Settings saved', 'تم حفظ الإعدادات'), 'success');
        });
      }

      var exportBtn = document.getElementById('settExportData');
      if (exportBtn) {
        exportBtn.addEventListener('click', function () {
          var out = {};
          _DATA_COLLECTIONS.forEach(function (c) { out[c] = DB.get(c); });
          var blob = new Blob([JSON.stringify(out, null, 2)], { type: 'application/json' });
          var url  = URL.createObjectURL(blob);
          var a    = document.createElement('a');
          a.href     = url;
          a.download = 'erp-backup-' + Utils.today() + '.json';
          a.click();
          URL.revokeObjectURL(url);
        });
      }

      var clearBtn = document.getElementById('settClearData');
      if (clearBtn) {
        clearBtn.addEventListener('click', function () {
          UI.confirm(
            Lang.t('Clear ALL data? This cannot be undone.', 'مسح كل البيانات؟ لا يمكن التراجع عن ذلك.'),
            function () {
              _DATA_COLLECTIONS.concat(['seeded', 'seeded2']).forEach(function (k) { DB.remove(k); });
              UI.toast(Lang.t('All data cleared. Reload to re-seed.', 'تم مسح كل البيانات. أعد التحميل لإعادة الزرع.'), 'info');
            }
          );
        });
      }
    }
  };

  /* ============================================================
     § 17  PHASE 2 INIT — demo seed + Router patch
     ============================================================ */
  var Phase2 = {

    seed: function () {
      if (DB.get('seeded2')) return;

      DB.set('sales', [
        { id: 's1', number: 'SL-001', date: '2025-10-15', contactId: 'c1', contactName: 'Al-Jubail Steel Company',
          items: [{ itemId: 'i1', name: 'Heavy Melting Steel (HMS 1)', qty: 50, unit: 'ton', unitPrice: 1050, total: 52500 }],
          subtotal: 52500,  vatAmount:  7875, total:  60375, notes: '', createdAt: '2025-10-15' },
        { id: 's2', number: 'SL-002', date: '2025-11-20', contactId: 'c2', contactName: 'Riyadh Metal Recyclers',
          items: [{ itemId: 'i3', name: 'Copper Wire Scrap', qty: 5, unit: 'ton', unitPrice: 21000, total: 105000 }],
          subtotal: 105000, vatAmount: 15750, total: 120750, notes: '', createdAt: '2025-11-20' },
        { id: 's3', number: 'SL-003', date: '2025-12-18', contactId: 'c3', contactName: 'Arabian Steel Works',
          items: [{ itemId: 'i2', name: 'Heavy Melting Steel (HMS 2)', qty: 40, unit: 'ton', unitPrice: 980, total: 39200 }],
          subtotal: 39200,  vatAmount:  5880, total:  45080, notes: '', createdAt: '2025-12-18' },
        { id: 's4', number: 'SL-004', date: '2026-01-22', contactId: 'c1', contactName: 'Al-Jubail Steel Company',
          items: [{ itemId: 'i6', name: 'Stainless Steel 304', qty: 10, unit: 'ton', unitPrice: 5100, total: 51000 }],
          subtotal: 51000,  vatAmount:  7650, total:  58650, notes: '', createdAt: '2026-01-22' },
        { id: 's5', number: 'SL-005', date: '2026-02-14', contactId: 'c2', contactName: 'Riyadh Metal Recyclers',
          items: [{ itemId: 'i4', name: 'Aluminum Sheet Scrap', qty: 8, unit: 'ton', unitPrice: 6800, total: 54400 }],
          subtotal: 54400,  vatAmount:  8160, total:  62560, notes: '', createdAt: '2026-02-14' },
        { id: 's6', number: 'SL-006', date: '2026-03-08', contactId: 'c3', contactName: 'Arabian Steel Works',
          items: [{ itemId: 'i5', name: 'Cast Iron Scrap', qty: 20, unit: 'ton', unitPrice: 820, total: 16400 }],
          subtotal: 16400,  vatAmount:  2460, total:  18860, notes: '', createdAt: '2026-03-08' }
      ]);

      DB.set('purchases', [
        { id: 'p1', number: 'PO-001', date: '2025-10-03', contactId: 'c4', contactName: 'Jeddah Scrap Traders',
          items: [{ itemId: 'i1', name: 'Heavy Melting Steel (HMS 1)', qty: 80, unit: 'ton', unitCost: 850, total: 68000 }],
          subtotal: 68000,  vatAmount: 10200, total:  78200, notes: '', createdAt: '2025-10-03' },
        { id: 'p2', number: 'PO-002', date: '2025-11-08', contactId: 'c5', contactName: 'Eastern Province Demolition',
          items: [{ itemId: 'i7', name: 'Mixed Metal Scrap', qty: 30, unit: 'ton', unitCost: 550, total: 16500 }],
          subtotal: 16500,  vatAmount:  2475, total:  18975, notes: '', createdAt: '2025-11-08' },
        { id: 'p3', number: 'PO-003', date: '2025-12-05', contactId: 'c6', contactName: 'Gulf Metals LLC',
          items: [{ itemId: 'i5', name: 'Cast Iron Scrap', qty: 40, unit: 'ton', unitCost: 680, total: 27200 }],
          subtotal: 27200,  vatAmount:  4080, total:  31280, notes: '', createdAt: '2025-12-05' },
        { id: 'p4', number: 'PO-004', date: '2026-01-12', contactId: 'c4', contactName: 'Jeddah Scrap Traders',
          items: [{ itemId: 'i3', name: 'Copper Wire Scrap', qty: 8, unit: 'ton', unitCost: 18500, total: 148000 }],
          subtotal: 148000, vatAmount: 22200, total: 170200, notes: '', createdAt: '2026-01-12' },
        { id: 'p5', number: 'PO-005', date: '2026-02-18', contactId: 'c5', contactName: 'Eastern Province Demolition',
          items: [{ itemId: 'i2', name: 'Heavy Melting Steel (HMS 2)', qty: 50, unit: 'ton', unitCost: 780, total: 39000 }],
          subtotal: 39000,  vatAmount:  5850, total:  44850, notes: '', createdAt: '2026-02-18' },
        { id: 'p6', number: 'PO-006', date: '2026-03-12', contactId: 'c6', contactName: 'Gulf Metals LLC',
          items: [{ itemId: 'i4', name: 'Aluminum Sheet Scrap', qty: 15, unit: 'ton', unitCost: 5500, total: 82500 }],
          subtotal: 82500,  vatAmount: 12375, total:  94875, notes: '', createdAt: '2026-03-12' }
      ]);

      DB.set('bankAccounts', [
        { id: 'ba1', name: 'Main Operating Account', bankName: 'Al Rajhi Bank',
          accountNumber: 'SA0380000000608010167519', currency: 'SAR', openingBalance: 150000,
          notes: '', createdAt: '2024-01-01' },
        { id: 'ba2', name: 'Payroll Account', bankName: 'Saudi National Bank',
          accountNumber: 'SA4420000001234567891234', currency: 'SAR', openingBalance: 60000,
          notes: 'HR payroll', createdAt: '2024-01-01' }
      ]);

      DB.set('bankTransactions', [
        { id: 'bt1', accountId: 'ba1', accountName: 'Main Operating Account', date: '2026-01-15',
          type: 'credit', description: 'Payment received – INV-1004',    reference: 'INV-1004', amount: 112500, createdAt: '2026-01-15' },
        { id: 'bt2', accountId: 'ba1', accountName: 'Main Operating Account', date: '2026-01-12',
          type: 'debit',  description: 'Supplier payment – PO-004',       reference: 'PO-004',   amount: 170200, createdAt: '2026-01-12' },
        { id: 'bt3', accountId: 'ba1', accountName: 'Main Operating Account', date: '2026-02-05',
          type: 'debit',  description: 'Yard rental – February',           reference: '',         amount:  12000, createdAt: '2026-02-05' },
        { id: 'bt4', accountId: 'ba1', accountName: 'Main Operating Account', date: '2026-02-20',
          type: 'credit', description: 'Payment received – INV-1005',    reference: 'INV-1005', amount:  78300, createdAt: '2026-02-20' },
        { id: 'bt5', accountId: 'ba2', accountName: 'Payroll Account',        date: '2026-01-31',
          type: 'debit',  description: 'Staff payroll – January 2026',    reference: 'PAY-0126', amount:  47000, createdAt: '2026-01-31' },
        { id: 'bt6', accountId: 'ba2', accountName: 'Payroll Account',        date: '2026-02-28',
          type: 'debit',  description: 'Staff payroll – February 2026',   reference: 'PAY-0226', amount:  49000, createdAt: '2026-02-28' },
        { id: 'bt7', accountId: 'ba1', accountName: 'Main Operating Account', date: '2026-03-05',
          type: 'debit',  description: 'Delivery transport – Al-Jubail',   reference: '',         amount:   4200, createdAt: '2026-03-05' },
        { id: 'bt8', accountId: 'ba1', accountName: 'Main Operating Account', date: '2026-03-08',
          type: 'credit', description: 'Customer deposit – SL-006',       reference: 'SL-006',   amount:  18860, createdAt: '2026-03-08' }
      ]);

      DB.set('loans', [
        { id: 'l1', party: 'Al Rajhi Bank',          partyAr: 'مصرف الراجحي',
          type: 'received', amount: 500000, outstanding: 320000,
          startDate: '2024-06-01', dueDate: '2027-06-01', interestRate: 5.5,
          status: 'active',  notes: 'Vehicle fleet financing', createdAt: '2024-06-01' },
        { id: 'l2', party: 'SIDF',                   partyAr: 'صندوق التنمية الصناعية',
          type: 'received', amount: 200000, outstanding: 200000,
          startDate: '2025-01-01', dueDate: '2030-01-01', interestRate: 3.0,
          status: 'active',  notes: 'Equipment upgrade loan',  createdAt: '2025-01-01' },
        { id: 'l3', party: 'Riyadh Metal Recyclers', partyAr: 'معالجو المعادن الرياض',
          type: 'extended', amount: 50000,  outstanding:  30000,
          startDate: '2025-09-01', dueDate: '2026-09-01', interestRate: 0,
          status: 'active',  notes: 'Trade credit extended',   createdAt: '2025-09-01' }
      ]);

      DB.set('seeded2', true);
    },

    init: function () {
      this.seed();
      /* Patch Router.modules to wire Phase 2 render functions */
      Router.modules.sales.render     = function (el) { Sales.render(el); };
      Router.modules.purchases.render = function (el) { Purchases.render(el); };
      Router.modules.expenses.render  = function (el) { Expenses.render(el); };
      Router.modules.bank.render      = function (el) { Bank.render(el); };
      Router.modules.loans.render     = function (el) { Loans.render(el); };
      Router.modules.settings.render  = function (el) { Settings.render(el); };
    }
  };

  /* Extend App.init to run Phase 2 after Phase 1 bootstrap */
  var _p1Init = App.init.bind(App);
  App.init = function () { _p1Init(); Phase2.init(); };

})();
