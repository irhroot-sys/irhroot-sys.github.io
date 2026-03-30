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

})();
