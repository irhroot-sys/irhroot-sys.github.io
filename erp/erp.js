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
      try { localStorage.setItem(this.PREFIX + key, JSON.stringify(val)); } catch (e) { }
    },

    remove: function (key) {
      try { localStorage.removeItem(this.PREFIX + key); } catch (e) { }
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
        companyNameAr: 'شركة أمانات الكلمة',
        address: 'Industrial Area, Riyadh, Saudi Arabia',
        phone: '+966 11 XXX XXXX',
        email: 'info@aalkc.com',
        city: 'Riyadh',
        website: 'https://aalkc.com',
        vatNumber: '300000000000003',
        crNumber: '1010XXXXXX',
        vatRate: 15,
        currency: 'SAR',
        invoiceTerms: 30,
        invoiceNotes: 'Payment due within 30 days.',
        invPrefix: 'INV-', invNext: 1009,
        docPrefix: 'DOC-', docNext: 1001,
        defaultLang: 'en',
        dateFormat: 'DD/MM/YYYY',
        weightUnit: 'ton'
      });

      DB.set('contacts', [
        { id: 'c1', type: 'customer', name: 'Al-Jubail Steel Company', nameAr: 'شركة الجبيل للصلب', phone: '+966 13 341 XXXX', email: 'procurement@jubailsteel.sa', city: 'Al Jubail', vatNumber: '300100000000001', crNumber: '2050100001', balance: 0, createdAt: '2024-01-10' },
        { id: 'c2', type: 'customer', name: 'Riyadh Metal Recyclers', nameAr: 'معالجو المعادن الرياض', phone: '+966 11 412 XXXX', email: 'info@riyadhmetal.sa', city: 'Riyadh', vatNumber: '300200000000002', crNumber: '1010200002', balance: 0, createdAt: '2024-02-01' },
        { id: 'c3', type: 'customer', name: 'Arabian Steel Works', nameAr: 'مصانع الصلب العربية', phone: '+966 12 215 XXXX', email: 'ops@arabiansteel.sa', city: 'Jeddah', vatNumber: '300300000000003', crNumber: '4030300003', balance: 0, createdAt: '2024-03-05' },
        { id: 'c4', type: 'supplier', name: 'Jeddah Scrap Traders', nameAr: 'تجار خردة جدة', phone: '+966 12 668 XXXX', email: 'sell@jeddahscrap.sa', city: 'Jeddah', vatNumber: '300400000000004', crNumber: '4030400004', balance: 0, createdAt: '2024-01-15' },
        { id: 'c5', type: 'supplier', name: 'Eastern Province Demolition', nameAr: 'هدم المنطقة الشرقية', phone: '+966 13 812 XXXX', email: 'info@epdemolition.sa', city: 'Dammam', vatNumber: '300500000000005', crNumber: '2050500005', balance: 0, createdAt: '2024-02-20' },
        { id: 'c6', type: 'supplier', name: 'Gulf Metals LLC', nameAr: 'شركة خليج المعادن', phone: '+966 11 537 XXXX', email: 'trade@gulfmetals.sa', city: 'Riyadh', vatNumber: '300600000000006', crNumber: '1010600006', balance: 0, createdAt: '2024-03-12' }
      ]);

      DB.set('inventory', [
        { id: 'i1', sku: 'HMS-001', name: 'Heavy Melting Steel (HMS 1)', nameAr: 'حديد خردة ثقيل (HMS 1)', category: 'ferrous', unit: 'ton', quantity: 120, unitCost: 850, unitPrice: 1050, location: 'Yard A', notes: 'Clean HMS grade 1', createdAt: '2024-01-20' },
        { id: 'i2', sku: 'HMS-002', name: 'Heavy Melting Steel (HMS 2)', nameAr: 'حديد خردة ثقيل (HMS 2)', category: 'ferrous', unit: 'ton', quantity: 80, unitCost: 780, unitPrice: 980, location: 'Yard A', notes: 'Mixed HMS grade 2', createdAt: '2024-01-20' },
        { id: 'i3', sku: 'CU-001', name: 'Copper Wire Scrap', nameAr: 'خردة أسلاك نحاس', category: 'non_ferrous', unit: 'ton', quantity: 15, unitCost: 18500, unitPrice: 21000, location: 'Warehouse B', notes: 'Clean bright copper', createdAt: '2024-02-01' },
        { id: 'i4', sku: 'AL-001', name: 'Aluminum Sheet Scrap', nameAr: 'خردة ألمنيوم صفائح', category: 'non_ferrous', unit: 'ton', quantity: 22, unitCost: 5500, unitPrice: 6800, location: 'Warehouse B', notes: 'Clean aluminum sheets', createdAt: '2024-02-10' },
        { id: 'i5', sku: 'CI-001', name: 'Cast Iron Scrap', nameAr: 'خردة حديد زهر', category: 'ferrous', unit: 'ton', quantity: 60, unitCost: 680, unitPrice: 820, location: 'Yard C', notes: 'Mixed cast iron pieces', createdAt: '2024-02-15' },
        { id: 'i6', sku: 'SS-001', name: 'Stainless Steel 304', nameAr: 'فولاذ مقاوم للصدأ 304', category: 'ferrous', unit: 'ton', quantity: 18, unitCost: 4200, unitPrice: 5100, location: 'Warehouse B', notes: 'Grade 304 stainless steel', createdAt: '2024-03-01' },
        { id: 'i7', sku: 'MX-001', name: 'Mixed Metal Scrap', nameAr: 'خردة معادن مختلطة', category: 'mixed', unit: 'ton', quantity: 45, unitCost: 550, unitPrice: 700, location: 'Yard D', notes: 'Unsorted mixed scrap', createdAt: '2024-03-05' }
      ]);

      /* Invoices spanning Oct 2025–Mar 2026 for chart data */
      DB.set('invoices', [
        { id: 'inv1', number: 'INV-1001', date: '2025-10-05', dueDate: '2025-11-04', contactId: 'c1', contactName: 'Al-Jubail Steel Company', status: 'paid', subtotal: 105000, vatAmount: 15750, total: 120750, items: [], createdAt: '2025-10-05' },
        { id: 'inv2', number: 'INV-1002', date: '2025-11-12', dueDate: '2025-12-12', contactId: 'c2', contactName: 'Riyadh Metal Recyclers', status: 'paid', subtotal: 74261, vatAmount: 11139, total: 85400, items: [], createdAt: '2025-11-12' },
        { id: 'inv3', number: 'INV-1003', date: '2025-12-08', dueDate: '2026-01-07', contactId: 'c3', contactName: 'Arabian Steel Works', status: 'paid', subtotal: 82783, vatAmount: 12417, total: 95200, items: [], createdAt: '2025-12-08' },
        { id: 'inv4', number: 'INV-1004', date: '2026-01-15', dueDate: '2026-02-14', contactId: 'c1', contactName: 'Al-Jubail Steel Company', status: 'paid', subtotal: 97826, vatAmount: 14674, total: 112500, items: [], createdAt: '2026-01-15' },
        { id: 'inv5', number: 'INV-1005', date: '2026-02-20', dueDate: '2026-03-22', contactId: 'c2', contactName: 'Riyadh Metal Recyclers', status: 'paid', subtotal: 68087, vatAmount: 10213, total: 78300, items: [], createdAt: '2026-02-20' },
        { id: 'inv6', number: 'INV-1006', date: '2026-03-05', dueDate: '2026-04-04', contactId: 'c3', contactName: 'Arabian Steel Works', status: 'sent', subtotal: 56522, vatAmount: 8478, total: 65000, items: [], createdAt: '2026-03-05' },
        { id: 'inv7', number: 'INV-1007', date: '2026-03-10', dueDate: '2026-04-09', contactId: 'c2', contactName: 'Riyadh Metal Recyclers', status: 'draft', subtotal: 39130, vatAmount: 5870, total: 45000, items: [], createdAt: '2026-03-10' },
        { id: 'inv8', number: 'INV-1008', date: '2026-01-10', dueDate: '2026-02-09', contactId: 'c1', contactName: 'Al-Jubail Steel Company', status: 'overdue', subtotal: 45217, vatAmount: 6783, total: 52000, items: [], createdAt: '2026-01-10' }
      ]);

      DB.set('expenses', [
        { id: 'ex1', date: '2025-10-10', category: 'fuel', description: 'Truck fuel – October', descriptionAr: 'وقود شاحنات – أكتوبر', amount: 3500, createdAt: '2025-10-10' },
        { id: 'ex2', date: '2025-10-31', category: 'salaries', description: 'Staff salaries – Oct 2025', descriptionAr: 'رواتب الموظفين – أكتوبر 2025', amount: 45000, createdAt: '2025-10-31' },
        { id: 'ex3', date: '2025-11-30', category: 'salaries', description: 'Staff salaries – Nov 2025', descriptionAr: 'رواتب الموظفين – نوفمبر 2025', amount: 45000, createdAt: '2025-11-30' },
        { id: 'ex4', date: '2025-12-10', category: 'maintenance', description: 'Crane maintenance – Q4', descriptionAr: 'صيانة الرافعة – الربع الرابع', amount: 6500, createdAt: '2025-12-10' },
        { id: 'ex5', date: '2025-12-31', category: 'salaries', description: 'Staff salaries – Dec 2025', descriptionAr: 'رواتب الموظفين – ديسمبر 2025', amount: 47000, createdAt: '2025-12-31' },
        { id: 'ex6', date: '2026-01-05', category: 'fuel', description: 'Truck fuel – January', descriptionAr: 'وقود شاحنات – يناير', amount: 3800, createdAt: '2026-01-05' },
        { id: 'ex7', date: '2026-01-31', category: 'salaries', description: 'Staff salaries – Jan 2026', descriptionAr: 'رواتب الموظفين – يناير 2026', amount: 47000, createdAt: '2026-01-31' },
        { id: 'ex8', date: '2026-02-05', category: 'rent', description: 'Yard rental – February', descriptionAr: 'إيجار الساحة – فبراير', amount: 12000, createdAt: '2026-02-05' },
        { id: 'ex9', date: '2026-02-28', category: 'salaries', description: 'Staff salaries – Feb 2026', descriptionAr: 'رواتب الموظفين – فبراير 2026', amount: 49000, createdAt: '2026-02-28' },
        { id: 'ex10', date: '2026-03-01', category: 'salaries', description: 'Staff salaries – Mar 2026', descriptionAr: 'رواتب الموظفين – مارس 2026', amount: 49000, createdAt: '2026-03-01' },
        { id: 'ex11', date: '2026-03-05', category: 'transport', description: 'Delivery to Al-Jubail', descriptionAr: 'توصيل إلى الجبيل', amount: 4200, createdAt: '2026-03-05' },
        { id: 'ex12', date: '2026-03-10', category: 'maintenance', description: 'Vehicle maintenance – March', descriptionAr: 'صيانة مركبات – مارس', amount: 4200, createdAt: '2026-03-10' }
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
      var persisted = '';
      var fallback = String(Store.getSetting('defaultLang') || 'en').toLowerCase();
      try { persisted = String(localStorage.getItem(this.LANG_KEY) || '').toLowerCase(); } catch (e) { }
      var candidate = persisted || fallback || 'en';
      this.current = (candidate === 'ar' || candidate === 'en') ? candidate : 'en';
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

      try { localStorage.setItem(this.LANG_KEY, lang); } catch (e) { }
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
        body: '<p style="margin:0">' + Utils.escape(msg) + '</p>',
        footer:
          '<button class="btn btn-danger"    id="confirmYes">' + Lang.t('Confirm', 'تأكيد') + '</button>' +
          '<button class="btn btn-secondary" id="confirmNo">' + Lang.t('Cancel', 'إلغاء') + '</button>',
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
  /* Simple authorization helper using users/roles stored via Store
     - If no users/roles are defined, access is allowed by default
     - Roles may include: isAdmin (boolean) or permissions (array of module keys)
  */
  var Auth = {
    currentUser: function () {
      var currentId = Store.getSetting('currentUserId');
      if (!currentId) return null;
      var users = Store.getAll('users') || [];
      return users.find(function (u) { return String(u.id) === String(currentId); }) || null;
    },
    canAccess: function (module) {
      if (!module) return false;
      // Always allow dashboard
      if (module === 'dashboard') return true;
      var users = Store.getAll('users') || [];
      var roles = Store.getAll('roles') || [];
      // If no users or roles defined yet, operate permissively
      if (!users.length || !roles.length) return true;
      var user = this.currentUser();
      if (!user) return false;
      var role = roles.find(function (r) { return String(r.id) === String(user.roleId); });
      if (!role) return false;
      if (role.isAdmin) return true;
      if (Array.isArray(role.permissions) && role.permissions.indexOf(module) !== -1) return true;
      return false;
    }
  };
  var Router = {
    _current: 'dashboard',
    _charts: [],

    modules: {
      dashboard: { title: 'Dashboard', titleAr: 'لوحة التحكم', render: function (el) { Dashboard.render(el); } },
      contacts: { title: 'Contacts', titleAr: 'جهات الاتصال', render: function (el) { Contacts.render(el); } },
      inventory: { title: 'Inventory', titleAr: 'المخزون', render: function (el) { Inventory.render(el); } },
      invoices: { title: 'Invoices', titleAr: 'الفواتير', render: function (el) { Router._tpl('tpl-invoices', el); } },
      sales: { title: 'Sales', titleAr: 'المبيعات', render: function (el) { Router._tpl('tpl-sales', el); } },
      purchases: { title: 'Purchases', titleAr: 'المشتريات', render: function (el) { Router._tpl('tpl-purchases', el); } },
      expenses: { title: 'Expenses', titleAr: 'المصروفات', render: function (el) { Router._tpl('tpl-expenses', el); } },
      employees: { title: 'Employees', titleAr: 'الموظفون', render: function (el) { Router._tpl('tpl-employees', el); } },
      bank: { title: 'Bank', titleAr: 'البنك', render: function (el) { Router._tpl('tpl-bank', el); } },
      loans: { title: 'Loans', titleAr: 'القروض', render: function (el) { Router._tpl('tpl-loans', el); } },
      documents: { title: 'Documents', titleAr: 'المستندات', render: function (el) { Router._tpl('tpl-documents', el); } },
      reports: { title: 'Reports', titleAr: 'التقارير', render: function (el) { Router._tpl('tpl-reports', el); } },
      settings: { title: 'Settings', titleAr: 'الإعدادات', render: function (el) { Router._tpl('tpl-settings', el); } }
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
      this._charts.forEach(function (c) { try { c.destroy(); } catch (e) { } });
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
      var sidebar = document.getElementById('sidebar');
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
      var invoices = Store.getAll('invoices');
      var expenses = Store.getAll('expenses');
      var inventory = Store.getAll('inventory');
      var contacts = Store.getAll('contacts');

      var revenue = invoices.filter(function (i) { return i.status === 'paid'; })
        .reduce(function (s, i) { return s + (i.total || 0); }, 0);
      var totalExp = expenses.reduce(function (s, e) { return s + (e.amount || 0); }, 0);
      var invValue = inventory.reduce(function (s, i) { return s + (i.quantity || 0) * (i.unitCost || 0); }, 0);
      var outstanding = invoices.filter(function (i) { return i.status === 'sent' || i.status === 'overdue'; })
        .reduce(function (s, i) { return s + (i.total || 0); }, 0);

      var stats = [
        { label: Lang.t('Total Revenue', 'إجمالي الإيرادات'), value: Utils.formatCurrency(revenue), color: 'success', icon: '📈' },
        { label: Lang.t('Total Expenses', 'إجمالي المصروفات'), value: Utils.formatCurrency(totalExp), color: 'danger', icon: '📉' },
        { label: Lang.t('Inventory Value', 'قيمة المخزون'), value: Utils.formatCurrency(invValue), color: 'primary', icon: '🏭' },
        { label: Lang.t('Outstanding A/R', 'ذمم مدينة'), value: Utils.formatCurrency(outstanding), color: 'warning', icon: '⏳' },
        { label: Lang.t('Contacts', 'جهات الاتصال'), value: contacts.length, color: 'info', icon: '👥' },
        { label: Lang.t('Active Invoices', 'فواتير نشطة'), value: invoices.filter(function (i) { return i.status !== 'draft'; }).length, color: 'secondary', icon: '📄' }
      ];

      var grid = document.getElementById('dashStats');
      if (!grid) return;
      grid.innerHTML = stats.map(function (s) {
        return '<div class="stat-card">' +
          '<div class="stat-card-body">' +
          '<div class="stat-value">' + s.value + '</div>' +
          '<div class="stat-label">' + s.label + '</div>' +
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
        var d = new Date(now.getFullYear(), now.getMonth() - i, 1);
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
              { label: Lang.t('Revenue', 'الإيرادات'), data: revData, backgroundColor: '#2563eb' },
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
            '<td>' + Utils.escape(c.city || '') + '</td>' +
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
              id: c.id || null,
              type: document.getElementById('fType').value,
              name: name,
              nameAr: document.getElementById('fNameAr').value.trim(),
              phone: document.getElementById('fPhone').value.trim(),
              email: document.getElementById('fEmail').value.trim(),
              city: document.getElementById('fCity').value.trim(),
              vatNumber: document.getElementById('fVat').value.trim(),
              crNumber: document.getElementById('fCr').value.trim(),
              notes: document.getElementById('fNotes').value.trim(),
              balance: c.balance || 0,
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
      var value = items.reduce(function (s, i) { return s + (i.quantity || 0) * (i.unitCost || 0); }, 0);
      var qty = items.reduce(function (s, i) { return s + (i.quantity || 0); }, 0);
      var ferrous = items.filter(function (i) { return i.category === 'ferrous'; }).length;
      var nonFerrous = items.filter(function (i) { return i.category === 'non_ferrous'; }).length;

      var stats = [
        { label: Lang.t('Total Stock Value', 'القيمة الإجمالية'), value: Utils.formatCurrency(value) },
        { label: Lang.t('Total Quantity (tons)', 'الكمية الإجمالية (طن)'), value: qty.toLocaleString() },
        { label: Lang.t('Ferrous Items', 'أصناف حديدية'), value: ferrous },
        { label: Lang.t('Non-Ferrous Items', 'أصناف غير حديدية'), value: nonFerrous }
      ];
      el.innerHTML = stats.map(function (s) {
        return '<div class="stat-card"><div class="stat-card-body">' +
          '<div class="stat-value">' + s.value + '</div>' +
          '<div class="stat-label">' + s.label + '</div>' +
          '</div></div>';
      }).join('');
    },

    _renderList: function () {
      var el = document.getElementById('inventoryList');
      if (!el) return;
      var self = this;
      var catLabels = {
        ferrous: Lang.t('Ferrous', 'حديدي'),
        non_ferrous: Lang.t('Non-Ferrous', 'غير حديدي'),
        mixed: Lang.t('Mixed', 'مختلط')
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
            '<td>' + Utils.formatCurrency(it.unitCost) + '</td>' +
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
        '<option value="ferrous"' + sel(it.category, 'ferrous') + '>' + Lang.t('Ferrous', 'حديدي') + '</option>' +
        '<option value="non_ferrous"' + sel(it.category, 'non_ferrous') + '>' + Lang.t('Non-Ferrous', 'غير حديدي') + '</option>' +
        '<option value="mixed"' + sel(it.category, 'mixed') + '>' + Lang.t('Mixed/Other', 'مختلط/أخرى') + '</option>' +
        '</select></div>' +
        '</div>' +
        '<div class="form-grid">' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Quantity', 'الكمية') + '</label>' +
        '<input id="iQty" type="number" min="0" step="0.01" class="form-control" value="' + (it.quantity || 0) + '"></div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Unit', 'الوحدة') + '</label>' +
        '<select id="iUnit" class="form-control">' +
        '<option value="ton"' + sel(it.unit, 'ton') + '>' + Lang.t('Ton', 'طن') + '</option>' +
        '<option value="kg"' + sel(it.unit, 'kg') + '>kg</option>' +
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
              id: it.id || null,
              sku: document.getElementById('iSku').value.trim(),
              name: name,
              nameAr: document.getElementById('iNameAr').value.trim(),
              category: document.getElementById('iCat').value,
              unit: document.getElementById('iUnit').value,
              quantity: parseFloat(document.getElementById('iQty').value) || 0,
              unitCost: parseFloat(document.getElementById('iCost').value) || 0,
              unitPrice: parseFloat(document.getElementById('iPrice').value) || 0,
              location: document.getElementById('iLoc').value.trim(),
              notes: document.getElementById('iNotes').value.trim(),
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
    var e = Utils.escape;
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
    var pf = pfKey || 'unitPrice';
    var cont = modal.querySelector('#' + contId);

    function recalc() {
      var sub = 0;
      cont.querySelectorAll('.ir').forEach(function (r) {
        var qty = parseFloat(r.querySelector('.ir-q').value) || 0;
        var p = parseFloat(r.querySelector('.ir-p').value) || 0;
        var t = qty * p;
        r.querySelector('.ir-t').value = t ? t.toFixed(2) : '';
        sub += t;
      });
      var vat = sub * vatRate;
      var se = modal.querySelector('#' + subId);
      var ve = modal.querySelector('#' + vatId);
      var te = modal.querySelector('#' + totId);
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
        var id = r.querySelector('.ir-s').value;
        var qty = parseFloat(r.querySelector('.ir-q').value) || 0;
        var p = parseFloat(r.querySelector('.ir-p').value) || 0;
        var nm = r.querySelector('.ir-s').options[r.querySelector('.ir-s').selectedIndex].text;
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
      var s = document.getElementById('salesSearch');
      var m = document.getElementById('salesMonthFilter');
      var nb = document.getElementById('newSaleBtn');
      var ex = document.getElementById('salesExportExcel');
      if (s) s.addEventListener('input', function () { self._search = s.value.toLowerCase(); self._renderList(); });
      if (m) m.addEventListener('change', function () { self._monthFilter = m.value; self._renderList(); });
      if (nb) nb.addEventListener('click', function () { self.openForm(null); });
      if (ex) ex.addEventListener('click', function () { UI.toast(Lang.t('Export coming soon', 'التصدير قريباً'), 'info'); });
    },

    _renderStats: function () {
      var el = document.getElementById('salesStats');
      if (!el) return;
      var rows = Store.getAll('sales');
      var mo = new Date().toISOString().slice(0, 7);
      var tot = rows.reduce(function (a, x) { return a + (x.total || 0); }, 0);
      var mon = rows.filter(function (x) { return (x.date || '').startsWith(mo); })
        .reduce(function (a, x) { return a + (x.total || 0); }, 0);
      el.innerHTML = [
        { l: Lang.t('Total Sales', 'إجمالي المبيعات'), v: rows.length },
        { l: Lang.t('Total Revenue', 'إجمالي الإيرادات'), v: Utils.formatCurrency(tot) },
        { l: Lang.t('This Month', 'هذا الشهر'), v: Utils.formatCurrency(mon) },
        { l: Lang.t('Avg Sale Value', 'متوسط قيمة البيع'), v: Utils.formatCurrency(rows.length ? tot / rows.length : 0) }
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
          (!self._search || ((r.number || '') + ' ' + (r.contactName || '')).toLowerCase().indexOf(self._search) >= 0);
      }).sort(function (a, b) {
        var ad = a.date || '';
        var bd = b.date || '';
        if (bd === ad) return 0;
        return bd < ad ? -1 : 1;
      });

      if (!rows.length) {
        el.innerHTML = '<div class="empty-state"><p>' + Lang.t('No sales found', 'لا توجد مبيعات') + '</p></div>';
        return;
      }

      el.innerHTML = '<div class="table-responsive"><table><thead><tr>' +
        '<th>' + Lang.t('Ref #', 'رقم') + '</th>' +
        '<th>' + Lang.t('Date', 'التاريخ') + '</th>' +
        '<th>' + Lang.t('Customer', 'العميل') + '</th>' +
        '<th>' + Lang.t('Items', 'الأصناف') + '</th>' +
        '<th>' + Lang.t('Total', 'الإجمالي') + '</th>' +
        '<th>' + Lang.t('Actions', 'الإجراءات') + '</th>' +
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
            '<button class="btn btn-secondary btn-xs" data-act="view"   data-id="' + r.id + '">' + Lang.t('View', 'عرض') + '</button> ' +
            '<button class="btn btn-secondary btn-xs" data-act="edit"   data-id="' + r.id + '">' + Lang.t('Edit', 'تعديل') + '</button> ' +
            '<button class="btn btn-danger    btn-xs" data-act="delete" data-id="' + r.id + '">' + Lang.t('Delete', 'حذف') + '</button>' +
            '</td></tr>';
        }).join('') + '</tbody></table></div>';

      el.querySelectorAll('[data-act]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id = btn.getAttribute('data-id');
          var act = btn.getAttribute('data-act');
          if (act === 'view') self._viewDetail(id);
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
      var self = this;
      var r = (id ? Store.getById('sales', id) : null) || { number: self._nextNum(), date: Utils.today(), items: [] };
      var e = Utils.escape;
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
        body: body,
        footer: '<button class="btn btn-primary" id="sSv">' + Lang.t('Save', 'حفظ') + '</button>' +
          '<button class="btn btn-secondary" id="sCl">' + Lang.t('Cancel', 'إلغاء') + '</button>',
        onReady: function (ov) {
          var getItems = _wireItemRows(ov, vatRate, 'sAddRow', 'sItemsCont', 'sSub', 'sVt', 'sTt', 'unitPrice');
          ov.querySelector('#sCl').addEventListener('click', UI.closeModal);
          ov.querySelector('#sSv').addEventListener('click', function () {
            var date = ov.querySelector('#sDt').value;
            var cid = ov.querySelector('#sCust').value;
            if (!date) { UI.toast(Lang.t('Date is required', 'التاريخ مطلوب'), 'error'); return; }
            if (!cid) { UI.toast(Lang.t('Select a customer', 'اختر عميلاً'), 'error'); return; }
            var items = getItems();
            if (!items.length) { UI.toast(Lang.t('Add at least one item', 'أضف صنفاً واحداً على الأقل'), 'error'); return; }
            var sub = items.reduce(function (a, i) { return a + i.total; }, 0);
            var vat = sub * vatRate;
            var co = Store.getById('contacts', cid);
            Store.save('sales', {
              id: r.id || null,
              number: ov.querySelector('#sNum').value.trim() || self._nextNum(),
              date: date,
              contactId: cid,
              contactName: co ? co.name : '',
              items: items,
              subtotal: sub,
              vatAmount: vat,
              total: sub + vat,
              notes: ov.querySelector('#sNts').value.trim(),
              createdAt: r.createdAt
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
      var e = Utils.escape;
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
        '<th>' + Lang.t('Item', 'الصنف') + '</th>' +
        '<th>' + Lang.t('Qty', 'الكمية') + '</th>' +
        '<th>' + Lang.t('Unit', 'الوحدة') + '</th>' +
        '<th>' + Lang.t('Price', 'السعر') + '</th>' +
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
        body: body,
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
      var s = document.getElementById('purchasesSearch');
      var m = document.getElementById('purchasesMonthFilter');
      var nb = document.getElementById('newPurchaseBtn');
      var ex = document.getElementById('purchasesExportExcel');
      if (s) s.addEventListener('input', function () { self._search = s.value.toLowerCase(); self._renderList(); });
      if (m) m.addEventListener('change', function () { self._monthFilter = m.value; self._renderList(); });
      if (nb) nb.addEventListener('click', function () { self.openForm(null); });
      if (ex) ex.addEventListener('click', function () { UI.toast(Lang.t('Export coming soon', 'التصدير قريباً'), 'info'); });
    },

    _renderStats: function () {
      var el = document.getElementById('purchasesStats');
      if (!el) return;
      var rows = Store.getAll('purchases');
      var mo = new Date().toISOString().slice(0, 7);
      var tot = rows.reduce(function (a, x) { return a + (x.total || 0); }, 0);
      var mon = rows.filter(function (x) { return (x.date || '').startsWith(mo); })
        .reduce(function (a, x) { return a + (x.total || 0); }, 0);
      el.innerHTML = [
        { l: Lang.t('Total Purchases', 'إجمالي المشتريات'), v: rows.length },
        { l: Lang.t('Total Cost', 'إجمالي التكلفة'), v: Utils.formatCurrency(tot) },
        { l: Lang.t('This Month', 'هذا الشهر'), v: Utils.formatCurrency(mon) },
        { l: Lang.t('Avg Purchase', 'متوسط المشتريات'), v: Utils.formatCurrency(rows.length ? tot / rows.length : 0) }
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
          (!self._search || ((r.number || '') + ' ' + (r.contactName || '')).toLowerCase().indexOf(self._search) >= 0);
      }).sort(function (a, b) {
        var ad = a.date || '';
        var bd = b.date || '';
        if (bd === ad) return 0;
        return bd < ad ? -1 : 1;
      });

      if (!rows.length) {
        el.innerHTML = '<div class="empty-state"><p>' + Lang.t('No purchases found', 'لا توجد مشتريات') + '</p></div>';
        return;
      }

      el.innerHTML = '<div class="table-responsive"><table><thead><tr>' +
        '<th>' + Lang.t('Ref #', 'رقم') + '</th>' +
        '<th>' + Lang.t('Date', 'التاريخ') + '</th>' +
        '<th>' + Lang.t('Supplier', 'المورد') + '</th>' +
        '<th>' + Lang.t('Items', 'الأصناف') + '</th>' +
        '<th>' + Lang.t('Total', 'الإجمالي') + '</th>' +
        '<th>' + Lang.t('Actions', 'الإجراءات') + '</th>' +
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
            '<button class="btn btn-secondary btn-xs" data-act="view"   data-id="' + r.id + '">' + Lang.t('View', 'عرض') + '</button> ' +
            '<button class="btn btn-secondary btn-xs" data-act="edit"   data-id="' + r.id + '">' + Lang.t('Edit', 'تعديل') + '</button> ' +
            '<button class="btn btn-danger    btn-xs" data-act="delete" data-id="' + r.id + '">' + Lang.t('Delete', 'حذف') + '</button>' +
            '</td></tr>';
        }).join('') + '</tbody></table></div>';

      el.querySelectorAll('[data-act]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id = btn.getAttribute('data-id');
          var act = btn.getAttribute('data-act');
          if (act === 'view') self._viewDetail(id);
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
      var self = this;
      var r = (id ? Store.getById('purchases', id) : null) || { number: self._nextNum(), date: Utils.today(), items: [] };
      var e = Utils.escape;
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
        body: body,
        footer: '<button class="btn btn-primary" id="pSv">' + Lang.t('Save', 'حفظ') + '</button>' +
          '<button class="btn btn-secondary" id="pCl">' + Lang.t('Cancel', 'إلغاء') + '</button>',
        onReady: function (ov) {
          var getItems = _wireItemRows(ov, vatRate, 'pAddRow', 'pItemsCont', 'pSub', 'pVt', 'pTt', 'unitCost');
          ov.querySelector('#pCl').addEventListener('click', UI.closeModal);
          ov.querySelector('#pSv').addEventListener('click', function () {
            var date = ov.querySelector('#pDt').value;
            var sid = ov.querySelector('#pSupp').value;
            if (!date) { UI.toast(Lang.t('Date is required', 'التاريخ مطلوب'), 'error'); return; }
            if (!sid) { UI.toast(Lang.t('Select a supplier', 'اختر مورداً'), 'error'); return; }
            var items = getItems();
            if (!items.length) { UI.toast(Lang.t('Add at least one item', 'أضف صنفاً واحداً على الأقل'), 'error'); return; }
            var sub = items.reduce(function (a, i) { return a + i.total; }, 0);
            var vat = sub * vatRate;
            var su = Store.getById('contacts', sid);
            Store.save('purchases', {
              id: r.id || null,
              number: ov.querySelector('#pNum').value.trim() || self._nextNum(),
              date: date,
              contactId: sid,
              contactName: su ? su.name : '',
              items: items,
              subtotal: sub,
              vatAmount: vat,
              total: sub + vat,
              notes: ov.querySelector('#pNts').value.trim(),
              createdAt: r.createdAt
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
      var e = Utils.escape;
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
        '<th>' + Lang.t('Item', 'الصنف') + '</th>' +
        '<th>' + Lang.t('Qty', 'الكمية') + '</th>' +
        '<th>' + Lang.t('Unit', 'الوحدة') + '</th>' +
        '<th>' + Lang.t('Cost', 'التكلفة') + '</th>' +
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
        body: body,
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
      var s = document.getElementById('expSearch');
      var m = document.getElementById('expMonthFilter');
      var cf = document.getElementById('expCategoryFilter');
      var nb = document.getElementById('newExpenseBtn');
      var ex = document.getElementById('expExportExcel');
      if (s) s.addEventListener('input', function () { self._search = s.value.toLowerCase(); self._renderList(); });
      if (m) m.addEventListener('change', function () { self._monthFilter = m.value; self._renderList(); });
      if (cf) cf.addEventListener('change', function () { self._catFilter = cf.value; self._renderList(); });
      if (nb) nb.addEventListener('click', function () { self.openForm(null); });
      if (ex) ex.addEventListener('click', function () { UI.toast(Lang.t('Export coming soon', 'التصدير قريباً'), 'info'); });
    },

    _renderStats: function () {
      var el = document.getElementById('expenseStats');
      if (!el) return;
      var rows = Store.getAll('expenses');
      var mo = new Date().toISOString().slice(0, 7);
      var tot = rows.reduce(function (a, x) { return a + (x.amount || 0); }, 0);
      var mon = rows.filter(function (x) { return (x.date || '').startsWith(mo); })
        .reduce(function (a, x) { return a + (x.amount || 0); }, 0);
      var catTotals = {};
      rows.filter(function (x) { return (x.date || '').startsWith(mo); })
        .forEach(function (x) { catTotals[x.category] = (catTotals[x.category] || 0) + (x.amount || 0); });
      var topCat = Object.keys(catTotals).sort(function (a, b) { return catTotals[b] - catTotals[a]; })[0] || '—';

      el.innerHTML = [
        { l: Lang.t('Total Expenses', 'إجمالي المصروفات'), v: Utils.formatCurrency(tot) },
        { l: Lang.t('This Month', 'هذا الشهر'), v: Utils.formatCurrency(mon) },
        { l: Lang.t('Top Category', 'أعلى فئة'), v: Utils.escape(topCat) },
        { l: Lang.t('Records', 'السجلات'), v: rows.length }
      ].map(function (s) {
        return '<div class="stat-card"><div class="stat-card-body">' +
          '<div class="stat-value">' + s.v + '</div>' +
          '<div class="stat-label">' + s.l + '</div></div></div>';
      }).join('');
    },

    _catLabel: function (cat) {
      var map = {
        fuel: Lang.t('Fuel', 'وقود'),
        maintenance: Lang.t('Maintenance', 'صيانة'),
        salaries: Lang.t('Salaries', 'رواتب'),
        rent: Lang.t('Rent', 'إيجار'),
        utilities: Lang.t('Utilities', 'مرافق'),
        transport: Lang.t('Transport', 'نقل'),
        other: Lang.t('Other', 'أخرى')
      };
      return map[cat] || Utils.escape(cat || '');
    },

    _renderList: function () {
      var el = document.getElementById('expensesList');
      if (!el) return;
      var self = this;
      var rows = Store.getAll('expenses').filter(function (r) {
        return (!self._monthFilter || (r.date || '').startsWith(self._monthFilter)) &&
          (!self._catFilter || r.category === self._catFilter) &&
          (!self._search || ((r.description || '') + ' ' + (r.category || '')).toLowerCase().indexOf(self._search) >= 0);
      }).sort(function (a, b) {
        var ad = a.date || '';
        var bd = b.date || '';
        if (bd === ad) return 0;
        return bd < ad ? -1 : 1;
      });

      if (!rows.length) {
        el.innerHTML = '<div class="empty-state"><p>' + Lang.t('No expenses found', 'لا توجد مصروفات') + '</p></div>';
        return;
      }

      el.innerHTML = '<div class="table-responsive"><table><thead><tr>' +
        '<th>' + Lang.t('Date', 'التاريخ') + '</th>' +
        '<th>' + Lang.t('Category', 'الفئة') + '</th>' +
        '<th>' + Lang.t('Description', 'الوصف') + '</th>' +
        '<th>' + Lang.t('Amount', 'المبلغ') + '</th>' +
        '<th>' + Lang.t('Actions', 'الإجراءات') + '</th>' +
        '</tr></thead><tbody>' +
        rows.map(function (r) {
          return '<tr>' +
            '<td>' + Utils.formatDate(r.date) + '</td>' +
            '<td><span class="badge badge-secondary">' + self._catLabel(r.category) + '</span></td>' +
            '<td>' + Utils.escape(r.description || '') + '</td>' +
            '<td><strong>' + Utils.formatCurrency(r.amount) + '</strong></td>' +
            '<td class="action-cell">' +
            '<button class="btn btn-secondary btn-xs" data-act="edit"   data-id="' + r.id + '">' + Lang.t('Edit', 'تعديل') + '</button> ' +
            '<button class="btn btn-danger    btn-xs" data-act="delete" data-id="' + r.id + '">' + Lang.t('Delete', 'حذف') + '</button>' +
            '</td></tr>';
        }).join('') + '</tbody></table></div>';

      el.querySelectorAll('[data-act]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id = btn.getAttribute('data-id');
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
      var r = (id ? Store.getById('expenses', id) : null) || { date: Utils.today() };
      var e = Utils.escape;
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
        body: body,
        footer: '<button class="btn btn-primary" id="eSv">' + Lang.t('Save', 'حفظ') + '</button>' +
          '<button class="btn btn-secondary" id="eCl">' + Lang.t('Cancel', 'إلغاء') + '</button>',
        onReady: function (ov) {
          ov.querySelector('#eCl').addEventListener('click', UI.closeModal);
          ov.querySelector('#eSv').addEventListener('click', function () {
            var date = ov.querySelector('#eDt').value;
            var cat = ov.querySelector('#eCat').value;
            var desc = ov.querySelector('#eDesc').value.trim();
            var amt = parseFloat(ov.querySelector('#eAmt').value) || 0;
            if (!date) { UI.toast(Lang.t('Date is required', 'التاريخ مطلوب'), 'error'); return; }
            if (!cat) { UI.toast(Lang.t('Select a category', 'اختر فئة'), 'error'); return; }
            if (!desc) { UI.toast(Lang.t('Description is required', 'الوصف مطلوب'), 'error'); return; }
            if (!amt) { UI.toast(Lang.t('Amount must be > 0', 'يجب أن يكون المبلغ أكبر من 0'), 'error'); return; }
            Store.save('expenses', {
              id: r.id || null,
              date: date,
              category: cat,
              description: desc,
              descriptionAr: ov.querySelector('#eDescAr').value.trim(),
              amount: amt,
              createdAt: r.createdAt
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
      var m = document.getElementById('bankMonthFilter');
      var na = document.getElementById('newBankAccountBtn');
      var nt = document.getElementById('newBankTxnBtn');
      if (af) af.addEventListener('change', function () { self._accountFilter = af.value; self._renderTxns(); });
      if (m) m.addEventListener('change', function () { self._monthFilter = m.value; self._renderTxns(); });
      if (na) na.addEventListener('click', function () { self.openAccountForm(null); });
      if (nt) nt.addEventListener('click', function () { self.openTxnForm(null); });
    },

    _accountBalance: function (accountId) {
      var acc = Store.getById('bankAccounts', accountId);
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
      var self = this;
      var accounts = Store.getAll('bankAccounts');
      if (!accounts.length) {
        el.innerHTML = '<div class="empty-state" style="width:100%"><p>' +
          Lang.t('No bank accounts yet. Click "Add Account" to get started.', 'لا توجد حسابات بنكية. انقر على "إضافة حساب" للبدء.') +
          '</p></div>';
        return;
      }
      el.innerHTML = accounts.map(function (acc) {
        var bal = self._accountBalance(acc.id);
        var color = bal >= 0 ? 'var(--color-success)' : 'var(--color-danger)';
        return '<div class="card" style="min-width:220px;cursor:pointer" data-acc-id="' + acc.id + '">' +
          '<div class="card-title">' + Utils.escape(acc.name || '') + '</div>' +
          '<div style="font-size:0.75rem;color:var(--color-text-secondary);margin:4px 0">' + Utils.escape(acc.bankName || '') + '</div>' +
          '<div style="font-size:1.4rem;font-weight:800;color:' + color + '">' + Utils.formatCurrency(bal) + '</div>' +
          '<div style="font-size:0.7rem;color:var(--color-text-secondary);margin-top:4px">' +
          Utils.escape(acc.accountNumber || '') +
          '</div>' +
          '<div style="display:flex;gap:6px;margin-top:12px">' +
          '<button class="btn btn-secondary btn-xs" data-acc-edit="' + acc.id + '">' + Lang.t('Edit', 'تعديل') + '</button>' +
          '<button class="btn btn-danger    btn-xs" data-acc-del="' + acc.id + '">' + Lang.t('Delete', 'حذف') + '</button>' +
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
        var opt = document.createElement('option');
        opt.value = acc.id;
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
          (!self._monthFilter || (t.date || '').startsWith(self._monthFilter));
      }).sort(function (a, b) {
        var ad = a.date || '';
        var bd = b.date || '';
        if (bd === ad) return 0;
        return bd < ad ? -1 : 1;
      });

      if (!rows.length) {
        el.innerHTML = '<div class="empty-state"><p>' + Lang.t('No transactions found', 'لا توجد معاملات') + '</p></div>';
        return;
      }

      el.innerHTML = '<div class="table-responsive"><table><thead><tr>' +
        '<th>' + Lang.t('Date', 'التاريخ') + '</th>' +
        '<th>' + Lang.t('Account', 'الحساب') + '</th>' +
        '<th>' + Lang.t('Type', 'النوع') + '</th>' +
        '<th>' + Lang.t('Description', 'الوصف') + '</th>' +
        '<th>' + Lang.t('Reference', 'المرجع') + '</th>' +
        '<th>' + Lang.t('Amount', 'المبلغ') + '</th>' +
        '<th>' + Lang.t('Actions', 'الإجراءات') + '</th>' +
        '</tr></thead><tbody>' +
        rows.map(function (r) {
          var typeLabel = r.type === 'credit' ? Lang.t('Credit', 'ائتمان') : Lang.t('Debit', 'مدين');
          var typeCls = r.type === 'credit' ? 'badge-success' : 'badge-danger';
          var amtColor = r.type === 'credit' ? 'color:var(--color-success)' : 'color:var(--color-danger)';
          var amtSign = r.type === 'credit' ? '+' : '−';
          return '<tr>' +
            '<td>' + Utils.formatDate(r.date) + '</td>' +
            '<td>' + Utils.escape(r.accountName || '') + '</td>' +
            '<td><span class="badge ' + typeCls + '">' + typeLabel + '</span></td>' +
            '<td>' + Utils.escape(r.description || '') + '</td>' +
            '<td>' + Utils.escape(r.reference || '') + '</td>' +
            '<td><strong style="' + amtColor + '">' + amtSign + Utils.formatCurrency(r.amount) + '</strong></td>' +
            '<td class="action-cell">' +
            '<button class="btn btn-secondary btn-xs" data-act="edit"   data-id="' + r.id + '">' + Lang.t('Edit', 'تعديل') + '</button> ' +
            '<button class="btn btn-danger    btn-xs" data-act="delete" data-id="' + r.id + '">' + Lang.t('Delete', 'حذف') + '</button>' +
            '</td></tr>';
        }).join('') + '</tbody></table></div>';

      el.querySelectorAll('[data-act]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id = btn.getAttribute('data-id');
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
      var r = (id ? Store.getById('bankAccounts', id) : null) || {};
      var e = Utils.escape;
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
        body: body,
        footer: '<button class="btn btn-primary" id="baSv">' + Lang.t('Save', 'حفظ') + '</button>' +
          '<button class="btn btn-secondary" id="baCl">' + Lang.t('Cancel', 'إلغاء') + '</button>',
        onReady: function (ov) {
          ov.querySelector('#baCl').addEventListener('click', UI.closeModal);
          ov.querySelector('#baSv').addEventListener('click', function () {
            var name = ov.querySelector('#baName').value.trim();
            if (!name) { UI.toast(Lang.t('Account name is required', 'اسم الحساب مطلوب'), 'error'); return; }
            Store.save('bankAccounts', {
              id: r.id || null,
              name: name,
              bankName: ov.querySelector('#baBankName').value.trim(),
              accountNumber: ov.querySelector('#baAccNum').value.trim(),
              currency: ov.querySelector('#baCur').value,
              openingBalance: parseFloat(ov.querySelector('#baObal').value) || 0,
              notes: ov.querySelector('#baNotes').value.trim(),
              createdAt: r.createdAt
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
      var r = (id ? Store.getById('bankTransactions', id) : null) || { date: Utils.today(), type: 'credit' };
      var e = Utils.escape;
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
        '<option value="credit"' + (r.type !== 'debit' ? ' selected' : '') + '>' + Lang.t('Credit (Money In)', 'ائتمان (وارد)') + '</option>' +
        '<option value="debit"' + (r.type === 'debit' ? ' selected' : '') + '>' + Lang.t('Debit (Money Out)', 'مدين (صادر)') + '</option>' +
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
        body: body,
        footer: '<button class="btn btn-primary" id="btSv">' + Lang.t('Save', 'حفظ') + '</button>' +
          '<button class="btn btn-secondary" id="btCl">' + Lang.t('Cancel', 'إلغاء') + '</button>',
        onReady: function (ov) {
          ov.querySelector('#btCl').addEventListener('click', UI.closeModal);
          ov.querySelector('#btSv').addEventListener('click', function () {
            var aid = ov.querySelector('#btAcc').value;
            var date = ov.querySelector('#btDt').value;
            var desc = ov.querySelector('#btDesc').value.trim();
            var amt = parseFloat(ov.querySelector('#btAmt').value) || 0;
            if (!aid) { UI.toast(Lang.t('Select an account', 'اختر حساباً'), 'error'); return; }
            if (!date) { UI.toast(Lang.t('Date is required', 'التاريخ مطلوب'), 'error'); return; }
            if (!desc) { UI.toast(Lang.t('Description is required', 'الوصف مطلوب'), 'error'); return; }
            if (!amt) { UI.toast(Lang.t('Amount must be > 0', 'يجب أن يكون المبلغ أكبر من 0'), 'error'); return; }
            var acc = Store.getById('bankAccounts', aid);
            Store.save('bankTransactions', {
              id: r.id || null,
              accountId: aid,
              accountName: acc ? acc.name : '',
              date: date,
              type: ov.querySelector('#btType').value,
              description: desc,
              reference: ov.querySelector('#btRef').value.trim(),
              amount: amt,
              createdAt: r.createdAt
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
        { l: Lang.t('Loans Received', 'قروض مستلمة'), v: Utils.formatCurrency(recv.reduce(function (a, l) { return a + (l.amount || 0); }, 0)) },
        { l: Lang.t('Outstanding Payable', 'مستحق الدفع'), v: Utils.formatCurrency(recvOut) },
        { l: Lang.t('Loans Extended', 'قروض ممنوحة'), v: Utils.formatCurrency(extd.reduce(function (a, l) { return a + (l.amount || 0); }, 0)) },
        { l: Lang.t('Outstanding Receivable', 'مستحق القبض'), v: Utils.formatCurrency(extdOut) }
      ].map(function (s) {
        return '<div class="stat-card"><div class="stat-card-body">' +
          '<div class="stat-value">' + s.v + '</div>' +
          '<div class="stat-label">' + s.l + '</div></div></div>';
      }).join('');
    },

    _renderList: function () {
      var el = document.getElementById('loansList');
      if (!el) return;
      var self = this;
      var today = Utils.today();
      var rows = Store.getAll('loans').filter(function (l) {
        return self._filter === 'all' || l.type === self._filter;
      });

      if (!rows.length) {
        el.innerHTML = '<div class="empty-state"><p>' + Lang.t('No loans found', 'لا توجد قروض') + '</p></div>';
        return;
      }

      el.innerHTML = '<div class="table-responsive"><table><thead><tr>' +
        '<th>' + Lang.t('Party', 'الجهة') + '</th>' +
        '<th>' + Lang.t('Type', 'النوع') + '</th>' +
        '<th>' + Lang.t('Amount', 'المبلغ') + '</th>' +
        '<th>' + Lang.t('Outstanding', 'المتبقي') + '</th>' +
        '<th>' + Lang.t('Due Date', 'تاريخ الاستحقاق') + '</th>' +
        '<th>' + Lang.t('Rate (%)', 'الفائدة (%)') + '</th>' +
        '<th>' + Lang.t('Status', 'الحالة') + '</th>' +
        '<th>' + Lang.t('Actions', 'الإجراءات') + '</th>' +
        '</tr></thead><tbody>' +
        rows.map(function (r) {
          var typeLabel = r.type === 'received' ? Lang.t('Received', 'مستلم') : Lang.t('Extended', 'ممنوح');
          var typeCls = r.type === 'received' ? 'badge-danger' : 'badge-success';
          var statusLabel = r.status === 'active' ? Lang.t('Active', 'نشط') : Lang.t('Settled', 'مسدد');
          var statusCls = r.status === 'active' ? 'badge-warning' : 'badge-secondary';
          var overdue = r.status === 'active' && r.dueDate && r.dueDate < today;
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
            '<button class="btn btn-secondary btn-xs" data-act="edit"   data-id="' + r.id + '">' + Lang.t('Edit', 'تعديل') + '</button> ' +
            '<button class="btn btn-danger    btn-xs" data-act="delete" data-id="' + r.id + '">' + Lang.t('Delete', 'حذف') + '</button>' +
            '</td></tr>';
        }).join('') + '</tbody></table></div>';

      el.querySelectorAll('[data-act]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id = btn.getAttribute('data-id');
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
      var r = (id ? Store.getById('loans', id) : null) || { type: 'received', status: 'active', startDate: Utils.today() };
      var e = Utils.escape;
      var sel = function (val, opt) { return val === opt ? ' selected' : ''; };
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
        '<option value="received"' + sel(r.type, 'received') + '>' + Lang.t('Received (We Owe)', 'مستلم (علينا)') + '</option>' +
        '<option value="extended"' + sel(r.type, 'extended') + '>' + Lang.t('Extended (Owed to Us)', 'ممنوح (لنا)') + '</option>' +
        '</select></div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Status', 'الحالة') + '</label>' +
        '<select id="lStatus" class="form-control">' +
        '<option value="active"' + sel(r.status, 'active') + '>' + Lang.t('Active', 'نشط') + '</option>' +
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
        body: body,
        footer: '<button class="btn btn-primary" id="lSv">' + Lang.t('Save', 'حفظ') + '</button>' +
          '<button class="btn btn-secondary" id="lCl">' + Lang.t('Cancel', 'إلغاء') + '</button>',
        onReady: function (ov) {
          ov.querySelector('#lCl').addEventListener('click', UI.closeModal);
          ov.querySelector('#lSv').addEventListener('click', function () {
            var party = ov.querySelector('#lParty').value.trim();
            var amt = parseFloat(ov.querySelector('#lAmt').value) || 0;
            if (!party) { UI.toast(Lang.t('Party name is required', 'اسم الجهة مطلوب'), 'error'); return; }
            if (!amt) { UI.toast(Lang.t('Amount must be > 0', 'يجب أن يكون المبلغ أكبر من 0'), 'error'); return; }
            Store.save('loans', {
              id: r.id || null,
              party: party,
              partyAr: ov.querySelector('#lPartyAr').value.trim(),
              type: ov.querySelector('#lType').value,
              status: ov.querySelector('#lStatus').value,
              amount: amt,
              outstanding: parseFloat(ov.querySelector('#lOut').value) || 0,
              startDate: ov.querySelector('#lStart').value,
              dueDate: ov.querySelector('#lDue').value,
              interestRate: parseFloat(ov.querySelector('#lRate').value) || 0,
              notes: ov.querySelector('#lNts').value.trim(),
              createdAt: r.createdAt
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
    'sales', 'purchases', 'bankAccounts', 'bankTransactions', 'loans', 'employees', 'payroll', 'users', 'roles'];

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
      var s = DB.get('settings') || {};
      var self = this;
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
          var url = URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url;
          a.download = 'erp-backup-' + Utils.today() + '.json';
          a.click();
          setTimeout(function () { URL.revokeObjectURL(url); }, 400);
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
        {
          id: 's1', number: 'SL-001', date: '2025-10-15', contactId: 'c1', contactName: 'Al-Jubail Steel Company',
          items: [{ itemId: 'i1', name: 'Heavy Melting Steel (HMS 1)', qty: 50, unit: 'ton', unitPrice: 1050, total: 52500 }],
          subtotal: 52500, vatAmount: 7875, total: 60375, notes: '', createdAt: '2025-10-15'
        },
        {
          id: 's2', number: 'SL-002', date: '2025-11-20', contactId: 'c2', contactName: 'Riyadh Metal Recyclers',
          items: [{ itemId: 'i3', name: 'Copper Wire Scrap', qty: 5, unit: 'ton', unitPrice: 21000, total: 105000 }],
          subtotal: 105000, vatAmount: 15750, total: 120750, notes: '', createdAt: '2025-11-20'
        },
        {
          id: 's3', number: 'SL-003', date: '2025-12-18', contactId: 'c3', contactName: 'Arabian Steel Works',
          items: [{ itemId: 'i2', name: 'Heavy Melting Steel (HMS 2)', qty: 40, unit: 'ton', unitPrice: 980, total: 39200 }],
          subtotal: 39200, vatAmount: 5880, total: 45080, notes: '', createdAt: '2025-12-18'
        },
        {
          id: 's4', number: 'SL-004', date: '2026-01-22', contactId: 'c1', contactName: 'Al-Jubail Steel Company',
          items: [{ itemId: 'i6', name: 'Stainless Steel 304', qty: 10, unit: 'ton', unitPrice: 5100, total: 51000 }],
          subtotal: 51000, vatAmount: 7650, total: 58650, notes: '', createdAt: '2026-01-22'
        },
        {
          id: 's5', number: 'SL-005', date: '2026-02-14', contactId: 'c2', contactName: 'Riyadh Metal Recyclers',
          items: [{ itemId: 'i4', name: 'Aluminum Sheet Scrap', qty: 8, unit: 'ton', unitPrice: 6800, total: 54400 }],
          subtotal: 54400, vatAmount: 8160, total: 62560, notes: '', createdAt: '2026-02-14'
        },
        {
          id: 's6', number: 'SL-006', date: '2026-03-08', contactId: 'c3', contactName: 'Arabian Steel Works',
          items: [{ itemId: 'i5', name: 'Cast Iron Scrap', qty: 20, unit: 'ton', unitPrice: 820, total: 16400 }],
          subtotal: 16400, vatAmount: 2460, total: 18860, notes: '', createdAt: '2026-03-08'
        }
      ]);

      DB.set('purchases', [
        {
          id: 'p1', number: 'PO-001', date: '2025-10-03', contactId: 'c4', contactName: 'Jeddah Scrap Traders',
          items: [{ itemId: 'i1', name: 'Heavy Melting Steel (HMS 1)', qty: 80, unit: 'ton', unitCost: 850, total: 68000 }],
          subtotal: 68000, vatAmount: 10200, total: 78200, notes: '', createdAt: '2025-10-03'
        },
        {
          id: 'p2', number: 'PO-002', date: '2025-11-08', contactId: 'c5', contactName: 'Eastern Province Demolition',
          items: [{ itemId: 'i7', name: 'Mixed Metal Scrap', qty: 30, unit: 'ton', unitCost: 550, total: 16500 }],
          subtotal: 16500, vatAmount: 2475, total: 18975, notes: '', createdAt: '2025-11-08'
        },
        {
          id: 'p3', number: 'PO-003', date: '2025-12-05', contactId: 'c6', contactName: 'Gulf Metals LLC',
          items: [{ itemId: 'i5', name: 'Cast Iron Scrap', qty: 40, unit: 'ton', unitCost: 680, total: 27200 }],
          subtotal: 27200, vatAmount: 4080, total: 31280, notes: '', createdAt: '2025-12-05'
        },
        {
          id: 'p4', number: 'PO-004', date: '2026-01-12', contactId: 'c4', contactName: 'Jeddah Scrap Traders',
          items: [{ itemId: 'i3', name: 'Copper Wire Scrap', qty: 8, unit: 'ton', unitCost: 18500, total: 148000 }],
          subtotal: 148000, vatAmount: 22200, total: 170200, notes: '', createdAt: '2026-01-12'
        },
        {
          id: 'p5', number: 'PO-005', date: '2026-02-18', contactId: 'c5', contactName: 'Eastern Province Demolition',
          items: [{ itemId: 'i2', name: 'Heavy Melting Steel (HMS 2)', qty: 50, unit: 'ton', unitCost: 780, total: 39000 }],
          subtotal: 39000, vatAmount: 5850, total: 44850, notes: '', createdAt: '2026-02-18'
        },
        {
          id: 'p6', number: 'PO-006', date: '2026-03-12', contactId: 'c6', contactName: 'Gulf Metals LLC',
          items: [{ itemId: 'i4', name: 'Aluminum Sheet Scrap', qty: 15, unit: 'ton', unitCost: 5500, total: 82500 }],
          subtotal: 82500, vatAmount: 12375, total: 94875, notes: '', createdAt: '2026-03-12'
        }
      ]);

      DB.set('bankAccounts', [
        {
          id: 'ba1', name: 'Main Operating Account', bankName: 'Al Rajhi Bank',
          accountNumber: 'SA0380000000608010167519', currency: 'SAR', openingBalance: 150000,
          notes: '', createdAt: '2024-01-01'
        },
        {
          id: 'ba2', name: 'Payroll Account', bankName: 'Saudi National Bank',
          accountNumber: 'SA4420000001234567891234', currency: 'SAR', openingBalance: 60000,
          notes: 'HR payroll', createdAt: '2024-01-01'
        }
      ]);

      DB.set('bankTransactions', [
        {
          id: 'bt1', accountId: 'ba1', accountName: 'Main Operating Account', date: '2026-01-15',
          type: 'credit', description: 'Payment received – INV-1004', reference: 'INV-1004', amount: 112500, createdAt: '2026-01-15'
        },
        {
          id: 'bt2', accountId: 'ba1', accountName: 'Main Operating Account', date: '2026-01-12',
          type: 'debit', description: 'Supplier payment – PO-004', reference: 'PO-004', amount: 170200, createdAt: '2026-01-12'
        },
        {
          id: 'bt3', accountId: 'ba1', accountName: 'Main Operating Account', date: '2026-02-05',
          type: 'debit', description: 'Yard rental – February', reference: '', amount: 12000, createdAt: '2026-02-05'
        },
        {
          id: 'bt4', accountId: 'ba1', accountName: 'Main Operating Account', date: '2026-02-20',
          type: 'credit', description: 'Payment received – INV-1005', reference: 'INV-1005', amount: 78300, createdAt: '2026-02-20'
        },
        {
          id: 'bt5', accountId: 'ba2', accountName: 'Payroll Account', date: '2026-01-31',
          type: 'debit', description: 'Staff payroll – January 2026', reference: 'PAY-0126', amount: 47000, createdAt: '2026-01-31'
        },
        {
          id: 'bt6', accountId: 'ba2', accountName: 'Payroll Account', date: '2026-02-28',
          type: 'debit', description: 'Staff payroll – February 2026', reference: 'PAY-0226', amount: 49000, createdAt: '2026-02-28'
        },
        {
          id: 'bt7', accountId: 'ba1', accountName: 'Main Operating Account', date: '2026-03-05',
          type: 'debit', description: 'Delivery transport – Al-Jubail', reference: '', amount: 4200, createdAt: '2026-03-05'
        },
        {
          id: 'bt8', accountId: 'ba1', accountName: 'Main Operating Account', date: '2026-03-08',
          type: 'credit', description: 'Customer deposit – SL-006', reference: 'SL-006', amount: 18860, createdAt: '2026-03-08'
        }
      ]);

      DB.set('loans', [
        {
          id: 'l1', party: 'Al Rajhi Bank', partyAr: 'مصرف الراجحي',
          type: 'received', amount: 500000, outstanding: 320000,
          startDate: '2024-06-01', dueDate: '2027-06-01', interestRate: 5.5,
          status: 'active', notes: 'Vehicle fleet financing', createdAt: '2024-06-01'
        },
        {
          id: 'l2', party: 'SIDF', partyAr: 'صندوق التنمية الصناعية',
          type: 'received', amount: 200000, outstanding: 200000,
          startDate: '2025-01-01', dueDate: '2030-01-01', interestRate: 3.0,
          status: 'active', notes: 'Equipment upgrade loan', createdAt: '2025-01-01'
        },
        {
          id: 'l3', party: 'Riyadh Metal Recyclers', partyAr: 'معالجو المعادن الرياض',
          type: 'extended', amount: 50000, outstanding: 30000,
          startDate: '2025-09-01', dueDate: '2026-09-01', interestRate: 0,
          status: 'active', notes: 'Trade credit extended', createdAt: '2025-09-01'
        }
      ]);

      DB.set('seeded2', true);
    },

    init: function () {
      this.seed();
      /* Patch Router.modules to wire Phase 2 render functions */
      Router.modules.sales.render = function (el) { Sales.render(el); };
      Router.modules.purchases.render = function (el) { Purchases.render(el); };
      Router.modules.expenses.render = function (el) { Expenses.render(el); };
      Router.modules.bank.render = function (el) { Bank.render(el); };
      Router.modules.loans.render = function (el) { Loans.render(el); };
      Router.modules.settings.render = function (el) { Settings.render(el); };
    }
  };


  /* Extend App.init to run Phase 2 after Phase 1 bootstrap */
  var _p1Init = App.init.bind(App);
  App.init = function () { _p1Init(); Phase2.init(); };

  /* ============================================================
     erp.js — Phase 3
     Modules: VatEngine · Invoices · Documents (Quotations /
              Transport Permits · Contracts · Vouchers)
     Appended inside Phase 1/2 IIFE — reuses all existing helpers
     ============================================================ */

  /* ============================================================
     § 18  VatEngine — ZATCA TLV QR + VAT helpers
     ============================================================ */
  var VatEngine = {

    rate: function () {
      return parseFloat(Store.getSetting('vatRate') || 15) / 100;
    },

    compute: function (items) {
      var rate = this.rate();
      var subtotal = items.reduce(function (s, i) { return s + (i.total || 0); }, 0);
      var vatAmt = subtotal * rate;
      return { subtotal: subtotal, vatAmount: vatAmt, total: subtotal + vatAmt, vatRate: rate * 100 };
    },

    /* ZATCA TLV: Tag-Length-Value with proper UTF-8 byte encoding */
    _tlv: function (tag, value) {
      var bytes = [];
      var str = String(value || '');
      for (var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i);
        if (code < 0x80) {
          bytes.push(code);
        } else if (code < 0x800) {
          bytes.push(0xC0 | (code >> 6));
          bytes.push(0x80 | (code & 0x3F));
        } else {
          bytes.push(0xE0 | (code >> 12));
          bytes.push(0x80 | ((code >> 6) & 0x3F));
          bytes.push(0x80 | (code & 0x3F));
        }
      }
      return [tag, bytes.length].concat(bytes);
    },

    /* Returns base64-encoded ZATCA TLV QR string */
    zatcaQrString: function (record, settings) {
      try {
        var s = settings || {};
        var sellerName = s.companyNameAr || s.companyNameEn || '';
        var vatNumber = s.vatNumber || '';
        /* ZATCA uses invoice date with midnight UTC — sufficient precision for simplified invoices */
        var timestamp = (record.date || Utils.today()) + 'T00:00:00Z';
        var total = (record.total || 0).toFixed(2);
        var vatAmt = (record.vatAmount || 0).toFixed(2);
        var self = this;
        var bytes = []
          .concat(self._tlv(1, sellerName))
          .concat(self._tlv(2, vatNumber))
          .concat(self._tlv(3, timestamp))
          .concat(self._tlv(4, total))
          .concat(self._tlv(5, vatAmt));
        var str = '';
        for (var i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]);
        return btoa(str);
      } catch (e) {
        return '';
      }
    },

    /* Render the QR into a <canvas> element */
    renderQr: function (canvasId, qrString) {
      if (!window.QRCode || !qrString) return;
      var canvas = document.getElementById(canvasId);
      if (!canvas) return;
      QRCode.toCanvas(canvas, qrString, { width: 120, margin: 1 }, function (err) {
        if (err && canvas.parentNode) {
          canvas.parentNode.innerHTML = '<p class="qr-error">QR unavailable</p>';
        }
      });
    },

    /* Saudi Arabian ZATCA VAT registration number: 15 digits beginning with 3 */
    validateVatNumber: function (vat) {
      return /^3\d{14}$/.test(String(vat || '').trim());
    }
  };

  /* ============================================================
     § 19  InvoicesModule — ZATCA-ready B2B invoice CRUD
     ============================================================ */
  var InvoicesModule = {
    _filter: 'all', _search: '', _dateFilter: '',

    render: function (container) {
      Router._tpl('tpl-invoices', container);
      this._bindEvents();
      this._renderList();
    },

    _bindEvents: function () {
      var self = this;
      var tabs = document.getElementById('invoiceTabs');
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
      var search = document.getElementById('invoiceSearch');
      if (search) search.addEventListener('input', function () { self._search = search.value.toLowerCase(); self._renderList(); });
      var df = document.getElementById('invoiceDateFilter');
      if (df) df.addEventListener('change', function () { self._dateFilter = df.value; self._renderList(); });
      var nb = document.getElementById('newInvoiceBtn');
      if (nb) nb.addEventListener('click', function () { self.openForm(null, null); });
      var ex = document.getElementById('invoiceExportExcel');
      if (ex) ex.addEventListener('click', function () { self._exportExcel(); });
    },

    _dateMatches: function (dateStr, filter) {
      if (!filter) return true;
      var d = new Date((dateStr || '') + 'T00:00:00');
      var now = new Date();
      if (filter === 'this_month') return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
      if (filter === 'last_month') {
        var lm = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        return d.getFullYear() === lm.getFullYear() && d.getMonth() === lm.getMonth();
      }
      if (filter === 'this_year') return d.getFullYear() === now.getFullYear();
      return true;
    },

    _renderList: function () {
      var el = document.getElementById('invoicesList');
      if (!el) return;
      var self = this;
      var today = Utils.today();
      var rows = Store.getAll('invoices').filter(function (r) {
        var eff = (r.status !== 'paid' && r.status !== 'void' && r.dueDate && r.dueDate < today) ? 'overdue' : r.status;
        var statusMatch = self._filter === 'all' || self._filter === eff || self._filter === r.status;
        var searchMatch = !self._search || ((r.number || '') + ' ' + (r.contactName || '')).toLowerCase().indexOf(self._search) >= 0;
        return statusMatch && searchMatch && self._dateMatches(r.date, self._dateFilter);
      }).sort(function (a, b) {
        var ad = a.date || '';
        var bd = b.date || '';
        if (bd === ad) return 0;
        return bd < ad ? -1 : 1;
      });

      if (!rows.length) {
        el.innerHTML = '<div class="empty-state"><p>' + Lang.t('No invoices found', 'لا توجد فواتير') + '</p></div>';
        return;
      }

      el.innerHTML = '<div class="table-responsive"><table><thead><tr>' +
        '<th>' + Lang.t('Invoice #', 'رقم الفاتورة') + '</th>' +
        '<th>' + Lang.t('Date', 'التاريخ') + '</th>' +
        '<th>' + Lang.t('Due Date', 'تاريخ الاستحقاق') + '</th>' +
        '<th>' + Lang.t('Customer', 'العميل') + '</th>' +
        '<th>' + Lang.t('Total', 'الإجمالي') + '</th>' +
        '<th>' + Lang.t('VAT', 'الضريبة') + '</th>' +
        '<th>' + Lang.t('Status', 'الحالة') + '</th>' +
        '<th>' + Lang.t('Actions', 'الإجراءات') + '</th>' +
        '</tr></thead><tbody>' +
        rows.map(function (r) {
          var eff = (r.status !== 'paid' && r.status !== 'void' && r.dueDate && r.dueDate < today) ? 'overdue' : r.status;
          return '<tr>' +
            '<td><strong>' + Utils.escape(r.number || '') + '</strong></td>' +
            '<td>' + Utils.formatDate(r.date) + '</td>' +
            '<td>' + Utils.formatDate(r.dueDate) + '</td>' +
            '<td>' + Utils.escape(r.contactName || '') + '</td>' +
            '<td><strong>' + Utils.formatCurrency(r.total) + '</strong></td>' +
            '<td>' + Utils.formatCurrency(r.vatAmount) + '</td>' +
            '<td><span class="' + Utils.badgeClass(eff) + '">' + Utils.escape(eff) + '</span></td>' +
            '<td class="action-cell">' +
            '<button class="btn btn-secondary btn-xs" data-act="view"   data-id="' + r.id + '">' + Lang.t('View', 'عرض') + '</button> ' +
            '<button class="btn btn-secondary btn-xs" data-act="edit"   data-id="' + r.id + '">' + Lang.t('Edit', 'تعديل') + '</button> ' +
            (r.status === 'draft' ? '<button class="btn btn-secondary btn-xs" data-act="send"   data-id="' + r.id + '">' + Lang.t('Send', 'إرسال') + '</button> ' : '') +
            (r.status === 'sent' || eff === 'overdue' ? '<button class="btn btn-success    btn-xs" data-act="pay"    data-id="' + r.id + '">' + Lang.t('Pay', 'دفع') + '</button> ' : '') +
            '<button class="btn btn-danger btn-xs"    data-act="delete" data-id="' + r.id + '">' + Lang.t('Delete', 'حذف') + '</button>' +
            '</td></tr>';
        }).join('') + '</tbody></table></div>';

      el.querySelectorAll('[data-act]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id = btn.getAttribute('data-id');
          var act = btn.getAttribute('data-act');
          var inv;
          if (act === 'view') { self._viewDetail(id); }
          else if (act === 'edit') { self.openForm(id, null); }
          else if (act === 'send') {
            inv = Store.getById('invoices', id);
            if (inv) { inv.status = 'sent'; Store.save('invoices', inv); UI.toast(Lang.t('Invoice marked as sent', 'تم تحديد الفاتورة كمرسلة'), 'success'); self._renderList(); }
          }
          else if (act === 'pay') {
            inv = Store.getById('invoices', id);
            if (inv) { inv.status = 'paid'; inv.paidAt = Utils.today(); Store.save('invoices', inv); UI.toast(Lang.t('Invoice marked as paid', 'تم تحديد الفاتورة كمدفوعة'), 'success'); self._renderList(); }
          }
          else {
            UI.confirm(Lang.t('Delete this invoice?', 'حذف هذه الفاتورة؟'), function () {
              Store.remove('invoices', id);
              UI.toast(Lang.t('Invoice deleted', 'تم حذف الفاتورة'), 'success');
              self._renderList();
            });
          }
        });
      });
    },

    _nextNumber: function () {
      var prefix = Store.getSetting('invPrefix') || 'INV-';
      var next = parseInt(Store.getSetting('invNext') || 1001, 10);
      var ns = Store.getAll('invoices').map(function (r) {
        var m = (r.number || '').match(/(\d+)$/); return m ? +m[1] : 0;
      });
      var maxN = ns.length ? ns.reduce(function (a, b) { return Math.max(a, b); }, 0) : 0;
      return prefix + Math.max(next, maxN + 1);
    },

    _defaultDueDate: function (terms) {
      var d = new Date();
      d.setDate(d.getDate() + (terms || 30));
      return d.toISOString().slice(0, 10);
    },

    openForm: function (id, prefill) {
      var self = this;
      var r = (id ? Store.getById('invoices', id) : null) || prefill || { date: Utils.today(), status: 'draft', items: [] };
      var e = Utils.escape;
      var vatRate = VatEngine.rate();
      var terms = parseInt(Store.getSetting('invoiceTerms') || 30, 10);
      var defaultDue = r.dueDate || self._defaultDueDate(terms);
      var displayNum = id ? (r.number || '') : self._nextNumber();

      var custOpts = Store.getAll('contacts').filter(function (c) { return c.type === 'customer'; })
        .map(function (c) {
          return '<option value="' + e(c.id) + '"' + (r.contactId === c.id ? ' selected' : '') + '>' + e(c.name) + '</option>';
        }).join('');

      var statusOpts = [
        ['draft', Lang.t('Draft', 'مسودة')],
        ['sent', Lang.t('Sent', 'مرسلة')],
        ['paid', Lang.t('Paid', 'مدفوعة')]
      ].map(function (opt) {
        return '<option value="' + opt[0] + '"' + (r.status === opt[0] ? ' selected' : '') + '>' + opt[1] + '</option>';
      }).join('');

      var body =
        '<div class="form-grid mb-2">' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Invoice #', 'رقم الفاتورة') + '</label>' +
        '<input id="invNum" class="form-control" value="' + e(displayNum) + '"></div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Status', 'الحالة') + '</label>' +
        '<select id="invStatus" class="form-control">' + statusOpts + '</select></div>' +
        '</div>' +
        '<div class="form-grid mb-2">' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Invoice Date', 'تاريخ الفاتورة') + ' *</label>' +
        '<input id="invDate" type="date" class="form-control" value="' + e(r.date || Utils.today()) + '"></div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Due Date', 'تاريخ الاستحقاق') + ' *</label>' +
        '<input id="invDue" type="date" class="form-control" value="' + e(defaultDue) + '"></div>' +
        '</div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Customer', 'العميل') + ' *</label>' +
        '<select id="invCust" class="form-control"><option value="">' + Lang.t('Select customer…', 'اختر عميلاً…') + '</option>' + custOpts + '</select></div>' +
        '<div class="form-section-title">' + Lang.t('Line Items', 'بنود الفاتورة') + '</div>' +
        '<div id="invItemsCont">' + (r.items || []).map(function (it) { return _buildItemRow(it, 'unitPrice'); }).join('') + '</div>' +
        '<button type="button" id="invAddRow" class="btn btn-secondary btn-sm" style="margin-bottom:12px">' + Lang.t('+ Add Item', '+ إضافة صنف') + '</button>' +
        '<div class="detail-panel" style="font-size:0.875rem;margin-bottom:12px">' +
        '<div class="detail-row"><span class="detail-label">' + Lang.t('Subtotal', 'المجموع الفرعي') + '</span><span id="invSub"></span></div>' +
        '<div class="detail-row"><span class="detail-label">VAT (' + (Store.getSetting('vatRate') || 15) + '%)</span><span id="invVat"></span></div>' +
        '<div class="detail-row"><span class="detail-label" style="font-weight:700">' + Lang.t('Total', 'الإجمالي') + '</span><strong id="invTot"></strong></div>' +
        '</div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Notes', 'ملاحظات') + '</label>' +
        '<textarea id="invNotes" class="form-control" rows="2">' + e(r.notes || Store.getSetting('invoiceNotes') || '') + '</textarea></div>';

      UI.modal({
        title: id ? Lang.t('Edit Invoice', 'تعديل الفاتورة') : Lang.t('New Invoice', 'فاتورة جديدة'),
        body: body,
        footer: '<button class="btn btn-primary" id="invSave">' + Lang.t('Save', 'حفظ') + '</button>' +
          '<button class="btn btn-secondary" id="invCancel">' + Lang.t('Cancel', 'إلغاء') + '</button>',
        onReady: function (ov) {
          var getItems = _wireItemRows(ov, vatRate, 'invAddRow', 'invItemsCont', 'invSub', 'invVat', 'invTot', 'unitPrice');
          ov.querySelector('#invCancel').addEventListener('click', UI.closeModal);
          ov.querySelector('#invSave').addEventListener('click', function () {
            var date = ov.querySelector('#invDate').value;
            var due = ov.querySelector('#invDue').value;
            var cid = ov.querySelector('#invCust').value;
            if (!date) { UI.toast(Lang.t('Invoice date is required', 'تاريخ الفاتورة مطلوب'), 'error'); return; }
            if (!due) { UI.toast(Lang.t('Due date is required', 'تاريخ الاستحقاق مطلوب'), 'error'); return; }
            if (!cid) { UI.toast(Lang.t('Select a customer', 'اختر عميلاً'), 'error'); return; }
            var items = getItems();
            if (!items.length) { UI.toast(Lang.t('Add at least one item', 'أضف صنفاً واحداً على الأقل'), 'error'); return; }
            var sub = items.reduce(function (a, i) { return a + i.total; }, 0);
            var vat = sub * vatRate;
            var co = Store.getById('contacts', cid);
            var num = ov.querySelector('#invNum').value.trim() || displayNum;
            var previewRecord = {
              date: date,
              total: sub + vat,
              vatAmount: vat
            };
            var qrPayload = VatEngine.zatcaQrString(previewRecord, DB.get('settings') || {});
            var saved = Store.save('invoices', {
              id: r.id || null,
              number: num,
              date: date,
              dueDate: due,
              contactId: cid,
              contactName: co ? co.name : '',
              contactNameAr: co ? (co.nameAr || '') : '',
              contactVat: co ? (co.vatNumber || '') : '',
              status: ov.querySelector('#invStatus').value,
              items: items,
              subtotal: sub,
              vatAmount: vat,
              total: sub + vat,
              zatcaQr: qrPayload,
              notes: ov.querySelector('#invNotes').value.trim(),
              createdAt: r.createdAt
            });
            /* Advance the invNext counter */
            var nm = (saved.number || '').match(/(\d+)$/);
            if (nm) Store.saveSettings({ invNext: +nm[1] + 1 });
            UI.closeModal();
            UI.toast(Lang.t('Invoice saved', 'تم حفظ الفاتورة'), 'success');
            self._renderList();
          });
        }
      });
    },

    _viewDetail: function (id) {
      var r = Store.getById('invoices', id);
      if (!r) return;
      var settings = DB.get('settings') || {};
      var e = Utils.escape;
      var qrData = r.zatcaQr || VatEngine.zatcaQrString(r, settings);
      var qrId = 'invQrCanvas';
      var vatPct = Store.getSetting('vatRate') || 15;

      var body =
        '<div class="invoice-doc">' +
        /* Bilingual header */
        '<div class="inv-header">' +
        '<div>' +
        '<div class="inv-company-name">' + e(settings.companyNameEn || '') + '</div>' +
        '<div class="inv-company-name" style="font-size:1.1rem">' + e(settings.companyNameAr || '') + '</div>' +
        '<div class="inv-company-info">' +
        e(settings.address || '') +
        (settings.phone ? '<br>' + e(settings.phone) : '') +
        (settings.vatNumber ? '<br>VAT: ' + e(settings.vatNumber) : '') +
        (settings.crNumber ? ' | CR: ' + e(settings.crNumber) : '') +
        '</div>' +
        '</div>' +
        '<div style="text-align:right">' +
        '<div class="inv-title">INVOICE / فاتورة</div>' +
        '<div class="inv-number">' + e(r.number || '') + '</div>' +
        (qrData ? '<canvas id="' + qrId + '" style="display:block;margin-top:8px;margin-left:auto"></canvas>' : '') +
        '</div>' +
        '</div>' +
        /* Meta row */
        '<div class="inv-meta">' +
        '<div><div class="inv-meta-label">Invoice Date / تاريخ الفاتورة</div><div class="inv-meta-value">' + Utils.formatDate(r.date) + '</div></div>' +
        '<div><div class="inv-meta-label">Due Date / تاريخ الاستحقاق</div><div class="inv-meta-value">' + Utils.formatDate(r.dueDate) + '</div></div>' +
        '<div><div class="inv-meta-label">Status / الحالة</div><div class="inv-meta-value"><span class="' + Utils.badgeClass(r.status) + '">' + e(r.status) + '</span></div></div>' +
        '</div>' +
        /* Bill to */
        '<div style="margin-bottom:24px;padding:16px;background:#f8fafc;border-radius:var(--radius-md)">' +
        '<div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--color-text-secondary);margin-bottom:6px">Bill To / الفاتورة لـ</div>' +
        '<div style="font-weight:700">' + e(r.contactName || '') + '</div>' +
        (r.contactNameAr ? '<div>' + e(r.contactNameAr) + '</div>' : '') +
        (r.contactVat ? '<div style="font-size:0.8rem;color:var(--color-text-secondary)">VAT Reg: ' + e(r.contactVat) + '</div>' : '') +
        '</div>' +
        /* Line items table */
        '<div class="inv-items"><table><thead><tr>' +
        '<th>#</th>' +
        '<th>Description / الوصف</th>' +
        '<th>Qty / الكمية</th>' +
        '<th>Unit / الوحدة</th>' +
        '<th>Unit Price / سعر الوحدة</th>' +
        '<th>VAT%</th>' +
        '<th>Amount / المبلغ</th>' +
        '</tr></thead><tbody>' +
        (r.items || []).map(function (it, idx) {
          return '<tr><td>' + (idx + 1) + '</td>' +
            '<td>' + e(it.name || '') + '</td>' +
            '<td>' + (it.qty || 0) + '</td>' +
            '<td>' + e(it.unit || '') + '</td>' +
            '<td>' + Utils.formatCurrency(it.unitPrice) + '</td>' +
            '<td>' + vatPct + '%</td>' +
            '<td>' + Utils.formatCurrency(it.total) + '</td></tr>';
        }).join('') +
        '</tbody></table></div>' +
        /* Totals */
        '<div class="inv-totals">' +
        '<div class="inv-total-row"><span class="label">Subtotal / المجموع الفرعي</span><span class="value">' + Utils.formatCurrency(r.subtotal) + '</span></div>' +
        '<div class="inv-total-row"><span class="label">VAT ' + vatPct + '% / ضريبة القيمة المضافة</span><span class="value">' + Utils.formatCurrency(r.vatAmount) + '</span></div>' +
        '<div class="inv-total-row inv-grand-total"><span class="label">Total / الإجمالي</span><span class="value">' + Utils.formatCurrency(r.total) + '</span></div>' +
        '</div>' +
        (r.notes ? '<div class="inv-notes">' + e(r.notes) + '</div>' : '') +
        /* ZATCA compliance footer */
        '<div class="zatca-compliance-footer">' +
        'This invoice was generated in compliance with ZATCA e-invoicing regulations (Phase 2) — ' +
        'هذه الفاتورة متوافقة مع اشتراطات الفوترة الإلكترونية لهيئة الزكاة والضريبة والجمارك (المرحلة الثانية)' +
        '</div>' +
        '</div>';

      UI.modal({
        title: Lang.t('Invoice', 'فاتورة') + ' – ' + e(r.number || ''),
        body: body,
        footer: '<button class="btn btn-primary no-print" id="invPrintBtn">' + Lang.t('Print', 'طباعة') + '</button>' +
          '<button class="btn btn-secondary no-print" id="invCloseBtn">' + Lang.t('Close', 'إغلاق') + '</button>',
        onReady: function () {
          document.getElementById('invPrintBtn').addEventListener('click', function () { window.print(); });
          document.getElementById('invCloseBtn').addEventListener('click', UI.closeModal);
          if (qrData) VatEngine.renderQr(qrId, qrData);
        }
      });
    },

    _exportExcel: function () {
      if (!window.XLSX) { UI.toast(Lang.t('Export library not loaded', 'لم يتم تحميل مكتبة التصدير'), 'error'); return; }
      var rows = Store.getAll('invoices');
      var data = [['Invoice #', 'Date', 'Due Date', 'Customer', 'Subtotal (SAR)', 'VAT (SAR)', 'Total (SAR)', 'Status']];
      rows.forEach(function (r) {
        data.push([r.number, r.date, r.dueDate, r.contactName, r.subtotal, r.vatAmount, r.total, r.status]);
      });
      var ws = XLSX.utils.aoa_to_sheet(data);
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Invoices');
      XLSX.writeFile(wb, 'invoices-' + Utils.today() + '.xlsx');
    }
  };

  /* ============================================================
     § 20  DocumentsModule — Quotations · Transport Permits ·
            Contracts · Receipt Vouchers · Payment Vouchers
     ============================================================ */
  var DocumentsModule = {
    _filter: 'all', _search: '',

    render: function (container) {
      Router._tpl('tpl-documents', container);
      this._addVoucherTabs();
      this._bindEvents();
      this._renderList();
    },

    /* Dynamically append Receipt Voucher and Payment Voucher tabs after template clone */
    _addVoucherTabs: function () {
      var tabs = document.getElementById('docTypeTabs');
      if (!tabs || tabs.querySelector('[data-filter="receipt_voucher"]')) return;
      var self = this;
      [
        ['receipt_voucher', Lang.t('Receipt Vouchers', 'سندات القبض')],
        ['payment_voucher', Lang.t('Payment Vouchers', 'سندات الصرف')]
      ].forEach(function (pair) {
        var tab = document.createElement('div');
        tab.className = 'tab';
        tab.setAttribute('data-filter', pair[0]);
        tab.textContent = pair[1];
        tabs.appendChild(tab);
      });
    },

    _bindEvents: function () {
      var self = this;
      var tabs = document.getElementById('docTypeTabs');
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
      var search = document.getElementById('docSearch');
      if (search) search.addEventListener('input', function () { self._search = search.value.toLowerCase(); self._renderList(); });
      var nb = document.getElementById('newDocBtn');
      if (nb) nb.addEventListener('click', function () { self._openTypeMenu(); });
    },

    _TYPE_LABELS: {
      quotation: null, /* set in constructor via Lang */
      transport_permit: null,
      contract: null,
      receipt_voucher: null,
      payment_voucher: null
    },

    _typeLabel: function (type) {
      var map = {
        quotation: Lang.t('Quotation', 'عرض سعر'),
        transport_permit: Lang.t('Transport Permit', 'تصريح نقل'),
        contract: Lang.t('Contract', 'عقد'),
        receipt_voucher: Lang.t('Receipt Voucher', 'سند قبض'),
        payment_voucher: Lang.t('Payment Voucher', 'سند صرف')
      };
      return map[type] || Utils.escape(type || '');
    },

    _openTypeMenu: function () {
      var self = this;
      var types = ['quotation', 'transport_permit', 'contract', 'receipt_voucher', 'payment_voucher'];
      var btns = types.map(function (t) {
        return '<button class="btn btn-secondary" style="width:100%;margin-bottom:8px" data-dtype="' + t + '">' + self._typeLabel(t) + '</button>';
      }).join('');
      UI.modal({
        title: Lang.t('Select Document Type', 'اختر نوع المستند'),
        body: '<div style="padding:8px 0">' + btns + '</div>',
        footer: '<button class="btn btn-secondary" id="dtCancel">' + Lang.t('Cancel', 'إلغاء') + '</button>',
        onReady: function (ov) {
          ov.querySelector('#dtCancel').addEventListener('click', UI.closeModal);
          ov.querySelectorAll('[data-dtype]').forEach(function (btn) {
            btn.addEventListener('click', function () {
              var dtype = btn.getAttribute('data-dtype');
              UI.closeModal();
              self.openForm(null, dtype);
            });
          });
        }
      });
    },

    _renderList: function () {
      var el = document.getElementById('documentsList');
      if (!el) return;
      var self = this;
      var rows = Store.getAll('documents').filter(function (r) {
        var typeMatch = self._filter === 'all' || r.type === self._filter;
        var searchMatch = !self._search || ((r.number || '') + ' ' + (r.title || '') + ' ' + (r.party || '')).toLowerCase().indexOf(self._search) >= 0;
        return typeMatch && searchMatch;
      }).sort(function (a, b) {
        var ad = a.date || '';
        var bd = b.date || '';
        if (bd === ad) return 0;
        return bd < ad ? -1 : 1;
      });

      if (!rows.length) {
        el.innerHTML = '<div class="empty-state"><p>' + Lang.t('No documents found', 'لا توجد مستندات') + '</p></div>';
        return;
      }

      el.innerHTML = '<div class="table-responsive"><table><thead><tr>' +
        '<th>' + Lang.t('Ref #', 'رقم المرجع') + '</th>' +
        '<th>' + Lang.t('Type', 'النوع') + '</th>' +
        '<th>' + Lang.t('Date', 'التاريخ') + '</th>' +
        '<th>' + Lang.t('Party', 'الجهة') + '</th>' +
        '<th>' + Lang.t('Title', 'العنوان') + '</th>' +
        '<th>' + Lang.t('Amount', 'المبلغ') + '</th>' +
        '<th>' + Lang.t('Status', 'الحالة') + '</th>' +
        '<th>' + Lang.t('Actions', 'الإجراءات') + '</th>' +
        '</tr></thead><tbody>' +
        rows.map(function (r) {
          return '<tr>' +
            '<td><strong>' + Utils.escape(r.number || '') + '</strong></td>' +
            '<td><span class="badge badge-secondary">' + self._typeLabel(r.type) + '</span></td>' +
            '<td>' + Utils.formatDate(r.date) + '</td>' +
            '<td>' + Utils.escape(r.party || '') + '</td>' +
            '<td>' + Utils.escape(r.title || '') + '</td>' +
            '<td>' + (r.amount ? Utils.formatCurrency(r.amount) : '—') + '</td>' +
            '<td><span class="' + Utils.badgeClass(r.status || 'draft') + '">' + Utils.escape(r.status || 'draft') + '</span></td>' +
            '<td class="action-cell">' +
            '<button class="btn btn-secondary btn-xs" data-act="view"    data-id="' + r.id + '">' + Lang.t('View', 'عرض') + '</button> ' +
            '<button class="btn btn-secondary btn-xs" data-act="edit"    data-id="' + r.id + '">' + Lang.t('Edit', 'تعديل') + '</button> ' +
            (r.type === 'quotation' ? '<button class="btn btn-secondary btn-xs" data-act="convert" data-id="' + r.id + '">' + Lang.t('→ Invoice', '→ فاتورة') + '</button> ' : '') +
            '<button class="btn btn-danger    btn-xs" data-act="delete"  data-id="' + r.id + '">' + Lang.t('Delete', 'حذف') + '</button>' +
            '</td></tr>';
        }).join('') + '</tbody></table></div>';

      el.querySelectorAll('[data-act]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id = btn.getAttribute('data-id');
          var act = btn.getAttribute('data-act');
          var doc;
          if (act === 'view') { self._viewDetail(id); }
          else if (act === 'edit') {
            doc = Store.getById('documents', id);
            if (doc) self.openForm(id, doc.type);
          }
          else if (act === 'convert') { self._convertToInvoice(id); }
          else {
            UI.confirm(Lang.t('Delete this document?', 'حذف هذا المستند؟'), function () {
              Store.remove('documents', id);
              UI.toast(Lang.t('Document deleted', 'تم حذف المستند'), 'success');
              self._renderList();
            });
          }
        });
      });
    },

    _nextNum: function (type) {
      var pfx = { quotation: 'QT-', transport_permit: 'TP-', contract: 'CT-', receipt_voucher: 'RV-', payment_voucher: 'PV-' };
      var prefix = pfx[type] || 'DOC-';
      var ns = Store.getAll('documents').filter(function (d) { return d.type === type; }).map(function (d) {
        var m = (d.number || '').match(/(\d+)$/); return m ? +m[1] : 0;
      });
      return prefix + String((ns.length ? ns.reduce(function (a, b) { return Math.max(a, b); }, 0) : 0) + 1).padStart(3, '0');
    },

    _buildDocForm: function (r, docType) {
      var e = Utils.escape;
      var contactOpts = Store.getAll('contacts').map(function (c) {
        return '<option value="' + e(c.name) + '"' + (r.party === c.name ? ' selected' : '') + '>' + e(c.name) + '</option>';
      }).join('');
      var statusVals = ['draft', 'sent', 'approved', 'expired', 'paid', 'void'];
      var statusLabels = { draft: 'مسودة', sent: 'مرسل', approved: 'معتمد', expired: 'منتهي', paid: 'مدفوع', void: 'ملغى' };
      var statusOpts = statusVals.map(function (s) {
        var enLabel = s.charAt(0).toUpperCase() + s.slice(1);
        return '<option value="' + s + '"' + (r.status === s ? ' selected' : '') + '>' + Lang.t(enLabel, statusLabels[s]) + '</option>';
      }).join('');

      var html =
        '<div class="form-grid mb-2">' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Ref #', 'رقم المرجع') + '</label>' +
        '<input id="dNum" class="form-control" value="' + e(r.number || '') + '"></div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Date', 'التاريخ') + ' *</label>' +
        '<input id="dDt" type="date" class="form-control" value="' + e(r.date || Utils.today()) + '"></div>' +
        '</div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Party / Customer', 'الجهة / العميل') + ' *</label>' +
        '<input id="dParty" class="form-control" list="dPartyList" value="' + e(r.party || '') + '">' +
        '<datalist id="dPartyList">' + contactOpts + '</datalist></div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Title / Description', 'العنوان / الوصف') + ' *</label>' +
        '<input id="dTitle" class="form-control" value="' + e(r.title || '') + '"></div>';

      /* Type-specific fields */
      if (docType === 'receipt_voucher' || docType === 'payment_voucher') {
        html +=
          '<div class="form-grid">' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Amount (SAR)', 'المبلغ (ريال)') + ' *</label>' +
          '<input id="dAmt" type="number" min="0.01" step="0.01" class="form-control" value="' + (r.amount || '') + '"></div>' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Payment Method', 'طريقة الدفع') + '</label>' +
          '<select id="dPay" class="form-control">' +
          '<option value="cash"' + (r.paymentMethod === 'cash' ? ' selected' : '') + '>' + Lang.t('Cash', 'نقداً') + '</option>' +
          '<option value="bank_transfer"' + (r.paymentMethod === 'bank_transfer' ? ' selected' : '') + '>' + Lang.t('Bank Transfer', 'تحويل بنكي') + '</option>' +
          '<option value="cheque"' + (r.paymentMethod === 'cheque' ? ' selected' : '') + '>' + Lang.t('Cheque', 'شيك') + '</option>' +
          '</select></div>' +
          '</div>' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Reference / Invoice #', 'المرجع / رقم الفاتورة') + '</label>' +
          '<input id="dRef" class="form-control" value="' + e(r.reference || '') + '"></div>';
      } else if (docType === 'quotation') {
        html +=
          '<div class="form-grid">' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Amount (SAR)', 'المبلغ (ريال)') + '</label>' +
          '<input id="dAmt" type="number" min="0" step="0.01" class="form-control" value="' + (r.amount || '') + '"></div>' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Valid Until', 'صالح حتى') + '</label>' +
          '<input id="dExpiry" type="date" class="form-control" value="' + e(r.expiryDate || '') + '"></div>' +
          '</div>';
      } else if (docType === 'transport_permit') {
        html +=
          '<div class="form-grid">' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Vehicle / Plate #', 'المركبة / اللوحة') + '</label>' +
          '<input id="dVehicle" class="form-control" value="' + e(r.vehicle || '') + '"></div>' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Driver Name', 'اسم السائق') + '</label>' +
          '<input id="dDriver" class="form-control" value="' + e(r.driver || '') + '"></div>' +
          '</div>';
      } else if (docType === 'contract') {
        html +=
          '<div class="form-grid">' +
          '<div class="form-group"><label class="form-label">' + Lang.t('Contract Value (SAR)', 'قيمة العقد (ريال)') + '</label>' +
          '<input id="dAmt" type="number" min="0" step="0.01" class="form-control" value="' + (r.amount || '') + '"></div>' +
          '<div class="form-group"><label class="form-label">' + Lang.t('End Date', 'تاريخ الانتهاء') + '</label>' +
          '<input id="dExpiry" type="date" class="form-control" value="' + e(r.expiryDate || '') + '"></div>' +
          '</div>';
      }

      html +=
        '<div class="form-group mb-2"><label class="form-label">' + Lang.t('Status', 'الحالة') + '</label>' +
        '<select id="dStatus" class="form-control">' + statusOpts + '</select></div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Notes', 'ملاحظات') + '</label>' +
        '<textarea id="dNotes" class="form-control" rows="2">' + e(r.notes || '') + '</textarea></div>';
      return html;
    },

    openForm: function (id, type) {
      var self = this;
      var docType = type || (id ? (Store.getById('documents', id) || {}).type : '') || 'quotation';
      var r = (id ? Store.getById('documents', id) : null) || {
        number: self._nextNum(docType), type: docType, date: Utils.today(), status: 'draft'
      };
      var e = Utils.escape;
      var typeLbl = self._typeLabel(docType);

      UI.modal({
        title: (id ? Lang.t('Edit', 'تعديل') : Lang.t('New', 'جديد')) + ' – ' + typeLbl,
        body: self._buildDocForm(r, docType),
        footer: '<button class="btn btn-primary" id="dSave">' + Lang.t('Save', 'حفظ') + '</button>' +
          '<button class="btn btn-secondary" id="dCancel">' + Lang.t('Cancel', 'إلغاء') + '</button>',
        onReady: function (ov) {
          ov.querySelector('#dCancel').addEventListener('click', UI.closeModal);
          ov.querySelector('#dSave').addEventListener('click', function () {
            var date = ov.querySelector('#dDt').value;
            var party = ov.querySelector('#dParty').value.trim();
            var title = ov.querySelector('#dTitle').value.trim();
            if (!date) { UI.toast(Lang.t('Date is required', 'التاريخ مطلوب'), 'error'); return; }
            if (!party) { UI.toast(Lang.t('Party is required', 'الجهة مطلوبة'), 'error'); return; }
            if (!title) { UI.toast(Lang.t('Title is required', 'العنوان مطلوب'), 'error'); return; }
            /* Safely read optional type-specific fields */
            var getFieldValue = function (sel) { var el = ov.querySelector(sel); return el ? el.value : ''; };
            var isVoucher = docType === 'receipt_voucher' || docType === 'payment_voucher';
            var amt = parseFloat(getFieldValue('#dAmt')) || 0;
            if (isVoucher && !amt) { UI.toast(Lang.t('Amount must be > 0', 'يجب أن يكون المبلغ أكبر من 0'), 'error'); return; }
            Store.save('documents', {
              id: r.id || null,
              number: ov.querySelector('#dNum').value.trim() || self._nextNum(docType),
              type: docType,
              date: date,
              party: party,
              title: title,
              amount: amt,
              paymentMethod: getFieldValue('#dPay'),
              reference: getFieldValue('#dRef'),
              expiryDate: getFieldValue('#dExpiry'),
              vehicle: getFieldValue('#dVehicle'),
              driver: getFieldValue('#dDriver'),
              status: ov.querySelector('#dStatus').value,
              notes: ov.querySelector('#dNotes').value.trim(),
              createdAt: r.createdAt
            });
            UI.closeModal();
            UI.toast(Lang.t('Document saved', 'تم حفظ المستند'), 'success');
            self._renderList();
          });
        }
      });
    },

    /* Convert an approved quotation into a draft invoice */
    _convertToInvoice: function (id) {
      var doc = Store.getById('documents', id);
      if (!doc || doc.type !== 'quotation') return;
      var co = Store.getAll('contacts').find(function (c) { return c.name === doc.party; });
      var prefill = {
        contactId: co ? co.id : '',
        contactName: doc.party,
        date: Utils.today(),
        status: 'draft',
        notes: doc.notes || '',
        items: doc.items || []
      };
      doc.status = 'approved';
      Store.save('documents', doc);
      UI.toast(Lang.t('Quotation converted — complete the invoice form', 'تم تحويل عرض السعر — أكمل نموذج الفاتورة'), 'info');
      Router.navigate('invoices');
      setTimeout(function () { InvoicesModule.openForm(null, prefill); }, 150);
    },

    _viewDetail: function (id) {
      var r = Store.getById('documents', id);
      if (!r) return;
      var settings = DB.get('settings') || {};
      var e = Utils.escape;
      var self = this;
      var typeLbl = self._typeLabel(r.type);

      var body =
        '<div class="invoice-doc">' +
        '<div class="inv-header">' +
        '<div>' +
        '<div class="inv-company-name">' + e(settings.companyNameEn || '') + '</div>' +
        '<div class="inv-company-name" style="font-size:1.1rem">' + e(settings.companyNameAr || '') + '</div>' +
        '<div class="inv-company-info">' + e(settings.address || '') + (settings.phone ? '<br>' + e(settings.phone) : '') + '</div>' +
        '</div>' +
        '<div style="text-align:right">' +
        '<div class="inv-title" style="font-size:1.4rem">' + typeLbl + '</div>' +
        '<div class="inv-number">' + e(r.number || '') + '</div>' +
        '</div>' +
        '</div>' +
        '<div class="inv-meta">' +
        '<div><div class="inv-meta-label">Date / التاريخ</div><div class="inv-meta-value">' + Utils.formatDate(r.date) + '</div></div>' +
        '<div><div class="inv-meta-label">Party / الجهة</div><div class="inv-meta-value">' + e(r.party || '') + '</div></div>' +
        (r.expiryDate ? '<div><div class="inv-meta-label">Expiry / الانتهاء</div><div class="inv-meta-value">' + Utils.formatDate(r.expiryDate) + '</div></div>' : '') +
        '<div><div class="inv-meta-label">Status / الحالة</div><div class="inv-meta-value"><span class="' + Utils.badgeClass(r.status || 'draft') + '">' + e(r.status || 'draft') + '</span></div></div>' +
        '</div>' +
        '<div style="margin-bottom:20px;padding:16px;background:#f8fafc;border-radius:var(--radius-md)">' +
        '<div style="font-weight:700;font-size:1rem;margin-bottom:8px">' + e(r.title || '') + '</div>' +
        (r.vehicle ? '<div>Vehicle / المركبة: <strong>' + e(r.vehicle) + '</strong></div>' : '') +
        (r.driver ? '<div>Driver / السائق: <strong>' + e(r.driver) + '</strong></div>' : '') +
        (r.amount ?
          '<div style="margin-top:12px;font-size:1.1rem">Amount / المبلغ: <strong>' + Utils.formatCurrency(r.amount) + '</strong>' +
          (r.paymentMethod ? ' <span style="color:var(--color-text-secondary)">(' + e(r.paymentMethod) + ')</span>' : '') +
          (r.reference ? ' — Ref: ' + e(r.reference) : '') +
          '</div>' : '') +
        '</div>' +
        (r.notes ? '<div class="inv-notes">' + e(r.notes) + '</div>' : '') +
        '<div style="margin-top:40px;display:grid;grid-template-columns:1fr 1fr;gap:40px;text-align:center;font-size:0.85rem">' +
        '<div style="border-top:2px solid #e2e8f0;padding-top:8px">Authorized Signature / توقيع المفوض</div>' +
        '<div style="border-top:2px solid #e2e8f0;padding-top:8px">Received / Approved — استلم / اعتمد</div>' +
        '</div>' +
        '</div>';

      UI.modal({
        title: typeLbl + ' – ' + e(r.number || ''),
        body: body,
        footer: '<button class="btn btn-primary no-print" id="docPrintBtn">' + Lang.t('Print', 'طباعة') + '</button>' +
          '<button class="btn btn-secondary no-print" id="docCloseBtn">' + Lang.t('Close', 'إغلاق') + '</button>',
        onReady: function () {
          document.getElementById('docPrintBtn').addEventListener('click', function () { window.print(); });
          document.getElementById('docCloseBtn').addEventListener('click', UI.closeModal);
        }
      });
    }
  };

  /* ============================================================
     § 21  PHASE 3 INIT — demo seed + Router patch
     ============================================================ */
  var Phase3 = {

    seed: function () {
      if (DB.get('seeded3')) return;
      DB.set('documents', [
        {
          id: 'doc1', number: 'QT-001', type: 'quotation',
          date: '2026-01-10', party: 'Al-Jubail Steel Company',
          title: 'Quotation for HMS 1 supply – Q1 2026',
          amount: 60375, expiryDate: '2026-02-10',
          status: 'approved', notes: 'Prices valid for 30 days.', createdAt: '2026-01-10'
        },
        {
          id: 'doc2', number: 'QT-002', type: 'quotation',
          date: '2026-03-05', party: 'Arabian Steel Works',
          title: 'Quotation for Cast Iron Scrap – March 2026',
          amount: 18860, expiryDate: '2026-04-05',
          status: 'draft', notes: 'Awaiting customer approval.', createdAt: '2026-03-05'
        },
        {
          id: 'doc3', number: 'TP-001', type: 'transport_permit',
          date: '2026-02-10', party: 'Al-Jubail Steel Company',
          title: 'Transport of HMS 1 – 50 tons to Al-Jubail',
          vehicle: 'ABC 1234', driver: 'Mohammed Al-Qahtani',
          status: 'approved', notes: 'Route: Riyadh → Al-Jubail Industrial Area', createdAt: '2026-02-10'
        },
        {
          id: 'doc4', number: 'CT-001', type: 'contract',
          date: '2025-01-01', party: 'Riyadh Metal Recyclers',
          title: 'Annual scrap metal supply agreement 2025',
          amount: 600000, expiryDate: '2025-12-31',
          status: 'expired', notes: 'Renewable annually.', createdAt: '2025-01-01'
        },
        {
          id: 'doc5', number: 'RV-001', type: 'receipt_voucher',
          date: '2026-01-16', party: 'Al-Jubail Steel Company',
          title: 'Payment received for INV-1004',
          amount: 112500, paymentMethod: 'bank_transfer', reference: 'INV-1004',
          status: 'paid', notes: 'Bank transfer ref: TRF-20260116', createdAt: '2026-01-16'
        },
        {
          id: 'doc6', number: 'PV-001', type: 'payment_voucher',
          date: '2026-01-12', party: 'Jeddah Scrap Traders',
          title: 'Payment for PO-004 – Copper Wire Scrap',
          amount: 170200, paymentMethod: 'bank_transfer', reference: 'PO-004',
          status: 'paid', notes: 'Bank transfer ref: TRF-20260112', createdAt: '2026-01-12'
        },
        {
          id: 'doc7', number: 'RV-002', type: 'receipt_voucher',
          date: '2026-02-20', party: 'Riyadh Metal Recyclers',
          title: 'Payment received for INV-1005',
          amount: 78300, paymentMethod: 'bank_transfer', reference: 'INV-1005',
          status: 'paid', notes: '', createdAt: '2026-02-20'
        },
        {
          id: 'doc8', number: 'PV-002', type: 'payment_voucher',
          date: '2026-03-12', party: 'Gulf Metals LLC',
          title: 'Payment for PO-006 – Aluminum Sheet Scrap',
          amount: 94875, paymentMethod: 'cheque', reference: 'PO-006',
          status: 'paid', notes: 'Cheque #45891', createdAt: '2026-03-12'
        }
      ]);
      DB.set('seeded3', true);
    },

    init: function () {
      this.seed();

      /* Extend the shared data-collections list for export / clear */
      ['documents', 'seeded3'].forEach(function (c) {
        if (_DATA_COLLECTIONS.indexOf(c) < 0) _DATA_COLLECTIONS.push(c);
      });

      /* Patch Router.modules */
      Router.modules.invoices.render = function (el) { InvoicesModule.render(el); };
      Router.modules.documents.render = function (el) { DocumentsModule.render(el); };
    }
  };

  /* Extend App.init to run Phase 3 after Phase 2 bootstrap */
  var _p2Init = App.init.bind(App);
  App.init = function () { _p2Init(); Phase3.init(); };


  /* ============================================================
     erp.js — Phase 4
     Modules: Reports · Employees · User Management
     ============================================================ */

  var ReportsModule = {
    _tab: 'pl',

    render: function (container) {
      Router._tpl('tpl-reports', container);
      this._bindEvents();
      this._syncDefaultDates();
      this._generate();
    },

    _syncDefaultDates: function () {
      var from = document.getElementById('reportDateFrom');
      var to = document.getElementById('reportDateTo');
      if (!to || !from) return;
      if (!to.value) to.value = Utils.today();
      if (!from.value) {
        var d = new Date();
        d.setMonth(d.getMonth() - 5, 1);
        from.value = d.toISOString().slice(0, 10);
      }
    },

    _bindEvents: function () {
      var self = this;
      var map = {
        tabPL: 'pl',
        tabInvReport: 'inventory',
        tabPayrollReport: 'payroll',
        tabContactsReport: 'arap'
      };
      Object.keys(map).forEach(function (id) {
        var el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('click', function () {
          self._tab = map[id];
          var tabs = el.parentNode ? el.parentNode.querySelectorAll('.tab') : [];
          tabs.forEach(function (t) { t.classList.remove('active'); });
          el.classList.add('active');
          self._generate();
        });
      });
      var btn = document.getElementById('generateReportBtn');
      if (btn) btn.addEventListener('click', function () { self._generate(); });
    },

    _inRange: function (dateStr, from, to) {
      if (!dateStr) return false;
      if (from && dateStr < from) return false;
      if (to && dateStr > to) return false;
      return true;
    },

    _generate: function () {
      var out = document.getElementById('reportContent');
      if (!out) return;
      var from = document.getElementById('reportDateFrom');
      var to = document.getElementById('reportDateTo');
      var f = from ? from.value : '';
      var t = to ? to.value : '';

      if (f && t && f > t) {
        UI.toast(Lang.t('From date must be before To date', 'يجب أن يكون تاريخ البداية قبل النهاية'), 'error');
        return;
      }

      if (this._tab === 'pl') this._renderPL(out, f, t);
      else if (this._tab === 'inventory') this._renderInventory(out, f, t);
      else if (this._tab === 'payroll') this._renderPayroll(out, f, t);
      else this._renderArAp(out, f, t);
    },

    _renderPL: function (out, from, to) {
      var self = this;
      var paidInvoices = Store.getAll('invoices').filter(function (i) {
        return i.status === 'paid' && self._inRange(i.date, from, to);
      });
      var sales = paidInvoices.reduce(function (s, r) { return s + (r.total || 0); }, 0);

      var purchases = Store.getAll('purchases').filter(function (p) {
        return self._inRange(p.date, from, to);
      }).reduce(function (s, r) { return s + (r.total || 0); }, 0);

      var expenses = Store.getAll('expenses').filter(function (e) {
        return self._inRange(e.date, from, to);
      }).reduce(function (s, r) { return s + (r.amount || 0); }, 0);

      var payroll = Store.getAll('payroll').filter(function (p) {
        return self._inRange(p.period + '-01', from, to);
      }).reduce(function (s, r) { return s + (r.net || 0); }, 0);

      var totalCosts = purchases + expenses + payroll;
      var profit = sales - totalCosts;
      var margin = sales ? ((profit / sales) * 100) : 0;

      out.innerHTML =
        '<div class="stats-grid" style="grid-template-columns:repeat(4,1fr);margin-top:16px">' +
        '<div class="stat-card"><div class="stat-card-body"><div class="stat-value">' + Utils.formatCurrency(sales) + '</div><div class="stat-label">' + Lang.t('Revenue', 'الإيرادات') + '</div></div></div>' +
        '<div class="stat-card"><div class="stat-card-body"><div class="stat-value">' + Utils.formatCurrency(totalCosts) + '</div><div class="stat-label">' + Lang.t('Total Costs', 'إجمالي التكاليف') + '</div></div></div>' +
        '<div class="stat-card"><div class="stat-card-body"><div class="stat-value">' + Utils.formatCurrency(profit) + '</div><div class="stat-label">' + Lang.t('Net Profit', 'صافي الربح') + '</div></div></div>' +
        '<div class="stat-card"><div class="stat-card-body"><div class="stat-value">' + margin.toFixed(2) + '%</div><div class="stat-label">' + Lang.t('Profit Margin', 'هامش الربح') + '</div></div></div>' +
        '</div>' +
        '<div class="table-container" style="margin-top:16px">' +
        '<div class="table-header"><div class="table-title">' + Lang.t('Profit & Loss Breakdown', 'تفصيل الأرباح والخسائر') + '</div></div>' +
        '<div class="table-responsive"><table><tbody>' +
        '<tr><td>' + Lang.t('Revenue (Paid Invoices)', 'الإيرادات (فواتير مدفوعة)') + '</td><td><strong>' + Utils.formatCurrency(sales) + '</strong></td></tr>' +
        '<tr><td>' + Lang.t('Purchases', 'المشتريات') + '</td><td>' + Utils.formatCurrency(purchases) + '</td></tr>' +
        '<tr><td>' + Lang.t('Expenses', 'المصروفات') + '</td><td>' + Utils.formatCurrency(expenses) + '</td></tr>' +
        '<tr><td>' + Lang.t('Payroll', 'الرواتب') + '</td><td>' + Utils.formatCurrency(payroll) + '</td></tr>' +
        '<tr><td><strong>' + Lang.t('Net Profit', 'صافي الربح') + '</strong></td><td><strong>' + Utils.formatCurrency(profit) + '</strong></td></tr>' +
        '</tbody></table></div></div>';
    },

    _renderInventory: function (out) {
      var rows = Store.getAll('inventory');
      var totalQty = rows.reduce(function (s, r) { return s + (r.quantity || 0); }, 0);
      var totalVal = rows.reduce(function (s, r) { return s + ((r.quantity || 0) * (r.unitCost || 0)); }, 0);
      var low = rows.filter(function (r) { return (r.quantity || 0) <= 10; });
      out.innerHTML =
        '<div class="stats-grid" style="grid-template-columns:repeat(3,1fr);margin-top:16px">' +
        '<div class="stat-card"><div class="stat-card-body"><div class="stat-value">' + rows.length + '</div><div class="stat-label">' + Lang.t('SKUs', 'الأصناف') + '</div></div></div>' +
        '<div class="stat-card"><div class="stat-card-body"><div class="stat-value">' + totalQty.toFixed(2) + '</div><div class="stat-label">' + Lang.t('Total Quantity', 'إجمالي الكمية') + '</div></div></div>' +
        '<div class="stat-card"><div class="stat-card-body"><div class="stat-value">' + Utils.formatCurrency(totalVal) + '</div><div class="stat-label">' + Lang.t('Stock Value', 'قيمة المخزون') + '</div></div></div>' +
        '</div>' +
        '<div class="table-container" style="margin-top:16px"><div class="table-header"><div class="table-title">' + Lang.t('Inventory Snapshot', 'ملخص المخزون') + '</div></div>' +
        '<div class="table-responsive"><table><thead><tr><th>' + Lang.t('SKU', 'رمز الصنف') + '</th><th>' + Lang.t('Item', 'الصنف') + '</th><th>' + Lang.t('Qty', 'الكمية') + '</th><th>' + Lang.t('Unit Cost', 'تكلفة الوحدة') + '</th><th>' + Lang.t('Value', 'القيمة') + '</th></tr></thead><tbody>' +
        rows.map(function (r) {
          return '<tr><td>' + Utils.escape(r.sku || '') + '</td><td>' + Utils.escape(r.name || '') + '</td><td>' + (r.quantity || 0) + '</td><td>' + Utils.formatCurrency(r.unitCost || 0) + '</td><td>' + Utils.formatCurrency((r.quantity || 0) * (r.unitCost || 0)) + '</td></tr>';
        }).join('') +
        '</tbody></table></div></div>' +
        (low.length ? '<div class="card" style="margin-top:16px;border-color:#fca5a5"><strong>' + Lang.t('Low Stock Alerts', 'تنبيهات انخفاض المخزون') + ':</strong> ' + low.map(function (l) { return Utils.escape(l.name || ''); }).join(', ') + '</div>' : '');
    },

    _renderPayroll: function (out, from, to) {
      var self = this;
      var rows = Store.getAll('payroll').filter(function (p) {
        return self._inRange(p.period + '-01', from, to);
      }).sort(function (a, b) {
        var ap = a.period || '';
        var bp = b.period || '';
        if (bp === ap) return 0;
        return bp < ap ? -1 : 1;
      });
      var tot = rows.reduce(function (s, r) { return s + (r.net || 0); }, 0);
      out.innerHTML =
        '<div class="stats-grid" style="grid-template-columns:repeat(3,1fr);margin-top:16px">' +
        '<div class="stat-card"><div class="stat-card-body"><div class="stat-value">' + rows.length + '</div><div class="stat-label">' + Lang.t('Payroll Entries', 'قيود الرواتب') + '</div></div></div>' +
        '<div class="stat-card"><div class="stat-card-body"><div class="stat-value">' + Utils.formatCurrency(tot) + '</div><div class="stat-label">' + Lang.t('Total Payroll', 'إجمالي الرواتب') + '</div></div></div>' +
        '<div class="stat-card"><div class="stat-card-body"><div class="stat-value">' + Utils.formatCurrency(rows.length ? (tot / rows.length) : 0) + '</div><div class="stat-label">' + Lang.t('Average Entry', 'متوسط القيد') + '</div></div></div>' +
        '</div>' +
        '<div class="table-container" style="margin-top:16px"><div class="table-header"><div class="table-title">' + Lang.t('Payroll Report', 'تقرير الرواتب') + '</div></div>' +
        (rows.length ? '<div class="table-responsive"><table><thead><tr><th>' + Lang.t('Period', 'الفترة') + '</th><th>' + Lang.t('Employee', 'الموظف') + '</th><th>' + Lang.t('Gross', 'الإجمالي') + '</th><th>' + Lang.t('Deductions', 'الاستقطاعات') + '</th><th>' + Lang.t('Net', 'الصافي') + '</th></tr></thead><tbody>' +
          rows.map(function (r) {
            return '<tr><td>' + Utils.escape(r.period || '') + '</td><td>' + Utils.escape(r.employeeName || '') + '</td><td>' + Utils.formatCurrency(r.gross || 0) + '</td><td>' + Utils.formatCurrency(r.deductions || 0) + '</td><td><strong>' + Utils.formatCurrency(r.net || 0) + '</strong></td></tr>';
          }).join('') + '</tbody></table></div>' : '<div class="empty-state"><p>' + Lang.t('No payroll records for selected period', 'لا توجد سجلات رواتب للفترة المحددة') + '</p></div>') +
        '</div>';
    },

    _renderArAp: function (out, from, to) {
      var self = this;
      var invoices = Store.getAll('invoices').filter(function (i) {
        return self._inRange(i.date, from, to);
      });
      var arRows = invoices.filter(function (i) {
        return i.status === 'sent' || (i.status !== 'paid' && i.dueDate && i.dueDate < Utils.today());
      });
      var arTotal = arRows.reduce(function (s, i) { return s + (i.total || 0); }, 0);

      var payables = Store.getAll('loans').filter(function (l) { return l.type === 'received' && l.status === 'active'; });
      var apTotal = payables.reduce(function (s, l) { return s + (l.outstanding || 0); }, 0);

      out.innerHTML =
        '<div class="stats-grid" style="grid-template-columns:repeat(3,1fr);margin-top:16px">' +
        '<div class="stat-card"><div class="stat-card-body"><div class="stat-value">' + Utils.formatCurrency(arTotal) + '</div><div class="stat-label">' + Lang.t('Accounts Receivable', 'الذمم المدينة') + '</div></div></div>' +
        '<div class="stat-card"><div class="stat-card-body"><div class="stat-value">' + Utils.formatCurrency(apTotal) + '</div><div class="stat-label">' + Lang.t('Accounts Payable', 'الذمم الدائنة') + '</div></div></div>' +
        '<div class="stat-card"><div class="stat-card-body"><div class="stat-value">' + Utils.formatCurrency(arTotal - apTotal) + '</div><div class="stat-label">' + Lang.t('Net Position', 'صافي المركز') + '</div></div></div>' +
        '</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px">' +
        '<div class="table-container"><div class="table-header"><div class="table-title">' + Lang.t('Open Invoices (AR)', 'الفواتير المفتوحة (مدينة)') + '</div></div>' +
        (arRows.length ? '<div class="table-responsive"><table><thead><tr><th>' + Lang.t('Invoice', 'الفاتورة') + '</th><th>' + Lang.t('Customer', 'العميل') + '</th><th>' + Lang.t('Due', 'الاستحقاق') + '</th><th>' + Lang.t('Amount', 'المبلغ') + '</th></tr></thead><tbody>' + arRows.map(function (r) {
          return '<tr><td>' + Utils.escape(r.number || '') + '</td><td>' + Utils.escape(r.contactName || '') + '</td><td>' + Utils.formatDate(r.dueDate) + '</td><td>' + Utils.formatCurrency(r.total || 0) + '</td></tr>';
        }).join('') + '</tbody></table></div>' : '<div class="empty-state"><p>' + Lang.t('No receivables', 'لا توجد ذمم مدينة') + '</p></div>') +
        '</div>' +
        '<div class="table-container"><div class="table-header"><div class="table-title">' + Lang.t('Outstanding Loans (AP)', 'القروض المستحقة (دائنة)') + '</div></div>' +
        (payables.length ? '<div class="table-responsive"><table><thead><tr><th>' + Lang.t('Lender', 'المموّل') + '</th><th>' + Lang.t('Due Date', 'تاريخ الاستحقاق') + '</th><th>' + Lang.t('Outstanding', 'المتبقي') + '</th></tr></thead><tbody>' + payables.map(function (l) {
          return '<tr><td>' + Utils.escape(l.party || '') + '</td><td>' + Utils.formatDate(l.dueDate) + '</td><td>' + Utils.formatCurrency(l.outstanding || 0) + '</td></tr>';
        }).join('') + '</tbody></table></div>' : '<div class="empty-state"><p>' + Lang.t('No payables', 'لا توجد ذمم دائنة') + '</p></div>') +
        '</div>' +
        '</div>';
    }
  };

  var EmployeesModule = {
    _tab: 'employees',
    _search: '',
    _status: '',
    _payMonth: '',

    render: function (container) {
      Router._tpl('tpl-employees', container);
      this._bindEvents();
      this._renderStats();
      this._renderEmployees();
      this._renderPayroll();
    },

    _bindEvents: function () {
      var self = this;
      var nb = document.getElementById('newEmployeeBtn');
      var rb = document.getElementById('payrollBtn');
      var s = document.getElementById('empSearch');
      var sf = document.getElementById('empStatusFilter');
      var pm = document.getElementById('payrollMonthFilter');
      var tabEmp = document.getElementById('tabEmpList');
      var tabPay = document.getElementById('tabPayroll');
      if (nb) nb.addEventListener('click', function () { self.openEmployeeForm(null); });
      if (rb) rb.addEventListener('click', function () { self._runPayroll(); });
      if (s) s.addEventListener('input', function () { self._search = s.value.toLowerCase(); self._renderEmployees(); });
      if (sf) sf.addEventListener('change', function () { self._status = sf.value; self._renderEmployees(); });
      if (pm) pm.addEventListener('change', function () { self._payMonth = pm.value; self._renderPayroll(); });
      if (tabEmp) tabEmp.addEventListener('click', function () { self._switchTab('employees'); });
      if (tabPay) tabPay.addEventListener('click', function () { self._switchTab('payroll'); });
    },

    _switchTab: function (tab) {
      this._tab = tab;
      var tabEmp = document.getElementById('tabEmpList');
      var tabPay = document.getElementById('tabPayroll');
      var elEmp = document.getElementById('empListContainer');
      var elPay = document.getElementById('payrollContainer');
      if (tabEmp) tabEmp.classList.toggle('active', tab === 'employees');
      if (tabPay) tabPay.classList.toggle('active', tab === 'payroll');
      if (elEmp) elEmp.style.display = tab === 'employees' ? '' : 'none';
      if (elPay) elPay.style.display = tab === 'payroll' ? '' : 'none';
    },

    _renderStats: function () {
      var rows = Store.getAll('employees');
      var active = rows.filter(function (e) { return e.status !== 'inactive'; });
      var monthly = active.reduce(function (s, e) { return s + (e.salary || 0); }, 0);
      var el = document.getElementById('empStats');
      if (!el) return;
      el.innerHTML = [
        { l: Lang.t('Total Employees', 'إجمالي الموظفين'), v: rows.length },
        { l: Lang.t('Active Employees', 'الموظفون النشطون'), v: active.length },
        { l: Lang.t('Monthly Payroll', 'الرواتب الشهرية'), v: Utils.formatCurrency(monthly) }
      ].map(function (s) {
        return '<div class="stat-card"><div class="stat-card-body"><div class="stat-value">' + s.v + '</div><div class="stat-label">' + s.l + '</div></div></div>';
      }).join('');
    },

    _renderEmployees: function () {
      var self = this;
      var el = document.getElementById('employeesList');
      if (!el) return;
      var rows = Store.getAll('employees').filter(function (r) {
        var text = ((r.name || '') + ' ' + (r.email || '') + ' ' + (r.role || '')).toLowerCase();
        var status = r.status || 'active';
        return (!self._search || text.indexOf(self._search) >= 0) && (!self._status || self._status === status);
      }).sort(function (a, b) {
        var an = (a.name || '').toLowerCase();
        var bn = (b.name || '').toLowerCase();
        if (an === bn) return 0;
        return an < bn ? -1 : 1;
      });

      if (!rows.length) {
        el.innerHTML = '<div class="empty-state"><p>' + Lang.t('No employees found', 'لا يوجد موظفون') + '</p></div>';
        return;
      }

      el.innerHTML = '<div class="table-responsive"><table><thead><tr>' +
        '<th>' + Lang.t('Name', 'الاسم') + '</th><th>' + Lang.t('Role', 'الدور') + '</th><th>' + Lang.t('Email', 'البريد الإلكتروني') + '</th><th>' + Lang.t('Salary', 'الراتب') + '</th><th>' + Lang.t('Status', 'الحالة') + '</th><th>' + Lang.t('Actions', 'الإجراءات') + '</th>' +
        '</tr></thead><tbody>' +
        rows.map(function (r) {
          var st = r.status || 'active';
          return '<tr><td><strong>' + Utils.escape(r.name || '') + '</strong></td><td>' + Utils.escape(r.role || '') + '</td><td>' + Utils.escape(r.email || '') + '</td><td>' + Utils.formatCurrency(r.salary || 0) + '</td><td><span class="' + Utils.badgeClass(st === 'active' ? 'paid' : 'draft') + '">' + Utils.escape(st) + '</span></td><td class="action-cell">' +
            '<button class="btn btn-secondary btn-xs" data-act="edit" data-id="' + r.id + '">' + Lang.t('Edit', 'تعديل') + '</button> ' +
            '<button class="btn btn-danger btn-xs" data-act="delete" data-id="' + r.id + '">' + Lang.t('Delete', 'حذف') + '</button></td></tr>';
        }).join('') + '</tbody></table></div>';

      el.querySelectorAll('[data-act]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id = btn.getAttribute('data-id');
          var act = btn.getAttribute('data-act');
          if (act === 'edit') self.openEmployeeForm(id);
          else UI.confirm(Lang.t('Delete this employee?', 'حذف هذا الموظف؟'), function () {
            Store.remove('employees', id);
            UI.toast(Lang.t('Employee deleted', 'تم حذف الموظف'), 'success');
            self._renderStats();
            self._renderEmployees();
          });
        });
      });
    },

    _renderPayroll: function () {
      var self = this;
      var month = this._payMonth;
      var el = document.getElementById('payrollList');
      if (!el) return;
      var rows = Store.getAll('payroll').filter(function (p) { return !month || p.period === month; }).sort(function (a, b) {
        var ap = a.period || '';
        var bp = b.period || '';
        if (bp === ap) {
          var an = (a.employeeName || '').toLowerCase();
          var bn = (b.employeeName || '').toLowerCase();
          if (an === bn) return 0;
          return an < bn ? -1 : 1;
        }
        return bp < ap ? -1 : 1;
      });

      if (!rows.length) {
        el.innerHTML = '<div class="empty-state"><p>' + Lang.t('No payroll records', 'لا توجد سجلات رواتب') + '</p></div>';
        return;
      }

      el.innerHTML = '<div class="table-responsive"><table><thead><tr><th>' + Lang.t('Period', 'الفترة') + '</th><th>' + Lang.t('Employee', 'الموظف') + '</th><th>' + Lang.t('Gross', 'الإجمالي') + '</th><th>' + Lang.t('Deductions', 'الاستقطاعات') + '</th><th>' + Lang.t('Net', 'الصافي') + '</th></tr></thead><tbody>' +
        rows.map(function (r) {
          return '<tr><td>' + Utils.escape(r.period || '') + '</td><td>' + Utils.escape(r.employeeName || '') + '</td><td>' + Utils.formatCurrency(r.gross || 0) + '</td><td>' + Utils.formatCurrency(r.deductions || 0) + '</td><td><strong>' + Utils.formatCurrency(r.net || 0) + '</strong></td></tr>';
        }).join('') + '</tbody></table></div>';
    },

    _runPayroll: function () {
      var self = this;
      var period = (document.getElementById('payrollMonthFilter') || {}).value || Utils.today().slice(0, 7);
      var employees = Store.getAll('employees').filter(function (e) { return (e.status || 'active') === 'active'; });
      if (!employees.length) {
        UI.toast(Lang.t('No active employees to process', 'لا يوجد موظفون نشطون للتشغيل'), 'error');
        return;
      }
      employees.forEach(function (emp) {
        var id = 'pr-' + period + '-' + emp.id;
        var gross = Number(emp.salary || 0);
        var deductions = Number(emp.deductions || 0);
        Store.save('payroll', {
          id: id,
          period: period,
          employeeId: emp.id,
          employeeName: emp.name,
          gross: gross,
          deductions: deductions,
          net: Math.max(0, gross - deductions),
          createdAt: Utils.today()
        });
      });
      UI.toast(Lang.t('Payroll processed', 'تم تشغيل الرواتب'), 'success');
      self._renderStats();
      self._renderPayroll();
      self._switchTab('payroll');
    },

    openEmployeeForm: function (id) {
      var self = this;
      var r = (id ? Store.getById('employees', id) : null) || { status: 'active' };
      var e = Utils.escape;
      var body =
        '<div class="form-grid">' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Name', 'الاسم') + ' *</label><input id="empName" class="form-control" value="' + e(r.name || '') + '"></div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Role', 'الدور') + '</label><input id="empRole" class="form-control" value="' + e(r.role || '') + '"></div>' +
        '</div>' +
        '<div class="form-grid">' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Email', 'البريد الإلكتروني') + '</label><input id="empEmail" type="email" class="form-control" value="' + e(r.email || '') + '"></div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Status', 'الحالة') + '</label><select id="empStatus" class="form-control"><option value="active"' + ((r.status || 'active') === 'active' ? ' selected' : '') + '>' + Lang.t('Active', 'نشط') + '</option><option value="inactive"' + (r.status === 'inactive' ? ' selected' : '') + '>' + Lang.t('Inactive', 'غير نشط') + '</option></select></div>' +
        '</div>' +
        '<div class="form-grid">' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Monthly Salary', 'الراتب الشهري') + '</label><input id="empSalary" type="number" step="0.01" class="form-control" value="' + (r.salary || 0) + '"></div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Deductions', 'الاستقطاعات') + '</label><input id="empDed" type="number" step="0.01" class="form-control" value="' + (r.deductions || 0) + '"></div>' +
        '</div>';

      UI.modal({
        title: id ? Lang.t('Edit Employee', 'تعديل الموظف') : Lang.t('Add Employee', 'إضافة موظف'),
        body: body,
        footer: '<button class="btn btn-primary" id="empSv">' + Lang.t('Save', 'حفظ') + '</button><button class="btn btn-secondary" id="empCl">' + Lang.t('Cancel', 'إلغاء') + '</button>',
        onReady: function (ov) {
          ov.querySelector('#empCl').addEventListener('click', UI.closeModal);
          ov.querySelector('#empSv').addEventListener('click', function () {
            var name = ov.querySelector('#empName').value.trim();
            if (!name) {
              UI.toast(Lang.t('Name is required', 'الاسم مطلوب'), 'error');
              return;
            }
            Store.save('employees', {
              id: r.id || null,
              name: name,
              role: ov.querySelector('#empRole').value.trim(),
              email: ov.querySelector('#empEmail').value.trim(),
              status: ov.querySelector('#empStatus').value,
              salary: parseFloat(ov.querySelector('#empSalary').value) || 0,
              deductions: parseFloat(ov.querySelector('#empDed').value) || 0,
              createdAt: r.createdAt
            });
            UI.closeModal();
            UI.toast(Lang.t('Employee saved', 'تم حفظ الموظف'), 'success');
            self._renderStats();
            self._renderEmployees();
          });
        }
      });
    }
  };

  var UserManagementModule = {
    _tab: 'users',

    render: function (container) {
      Router._tpl('tpl-users', container);
      this._bindEvents();
      this._renderStats();
      this._renderUsers();
      this._renderRoles();
    },

    _bindEvents: function () {
      var self = this;
      var nu = document.getElementById('newUserBtn');
      var nr = document.getElementById('newRoleBtn');
      var su = document.getElementById('userSearch');
      var rs = document.getElementById('roleSearch');
      if (nu) nu.addEventListener('click', function () { self.openUserForm(null); });
      if (nr) nr.addEventListener('click', function () { self.openRoleForm(null); });
      if (su) su.addEventListener('input', function () { self._userSearch = su.value.toLowerCase(); self._renderUsers(); });
      if (rs) rs.addEventListener('input', function () { self._roleSearch = rs.value.toLowerCase(); self._renderRoles(); });
      var tabUsers = document.getElementById('tabUsersList');
      var tabRoles = document.getElementById('tabRolesList');
      if (tabUsers) tabUsers.addEventListener('click', function () { self._switchTab('users'); });
      if (tabRoles) tabRoles.addEventListener('click', function () { self._switchTab('roles'); });
    },

    _switchTab: function (tab) {
      this._tab = tab;
      var users = document.getElementById('usersContainer');
      var roles = document.getElementById('rolesContainer');
      var tUsers = document.getElementById('tabUsersList');
      var tRoles = document.getElementById('tabRolesList');
      if (users) users.style.display = tab === 'users' ? '' : 'none';
      if (roles) roles.style.display = tab === 'roles' ? '' : 'none';
      if (tUsers) tUsers.classList.toggle('active', tab === 'users');
      if (tRoles) tRoles.classList.toggle('active', tab === 'roles');
    },

    _renderStats: function () {
      var users = Store.getAll('users');
      var roles = Store.getAll('roles');
      var active = users.filter(function (u) { return (u.status || 'active') === 'active'; }).length;
      var el = document.getElementById('userMgmtStats');
      if (!el) return;
      el.innerHTML = [
        { l: Lang.t('Total Users', 'إجمالي المستخدمين'), v: users.length },
        { l: Lang.t('Active Users', 'المستخدمون النشطون'), v: active },
        { l: Lang.t('Roles', 'الأدوار'), v: roles.length }
      ].map(function (s) {
        return '<div class="stat-card"><div class="stat-card-body"><div class="stat-value">' + s.v + '</div><div class="stat-label">' + s.l + '</div></div></div>';
      }).join('');
    },

    _renderUsers: function () {
      var self = this;
      var q = self._userSearch || '';
      var el = document.getElementById('usersList');
      if (!el) return;
      var rows = Store.getAll('users').filter(function (u) {
        var txt = ((u.name || '') + ' ' + (u.email || '') + ' ' + (u.role || '')).toLowerCase();
        return !q || txt.indexOf(q) >= 0;
      }).sort(function (a, b) {
        var an = (a.name || '').toLowerCase();
        var bn = (b.name || '').toLowerCase();
        if (an === bn) return 0;
        return an < bn ? -1 : 1;
      });
      if (!rows.length) {
        el.innerHTML = '<div class="empty-state"><p>' + Lang.t('No users found', 'لا يوجد مستخدمون') + '</p></div>';
        return;
      }
      el.innerHTML = '<div class="table-responsive"><table><thead><tr><th>' + Lang.t('Name', 'الاسم') + '</th><th>' + Lang.t('Email', 'البريد') + '</th><th>' + Lang.t('Role', 'الدور') + '</th><th>' + Lang.t('Status', 'الحالة') + '</th><th>' + Lang.t('Last Login', 'آخر دخول') + '</th><th>' + Lang.t('Actions', 'الإجراءات') + '</th></tr></thead><tbody>' +
        rows.map(function (u) {
          return '<tr><td><strong>' + Utils.escape(u.name || '') + '</strong></td><td>' + Utils.escape(u.email || '') + '</td><td>' + Utils.escape(u.role || '') + '</td><td><span class="' + Utils.badgeClass((u.status || 'active') === 'active' ? 'paid' : 'draft') + '">' + Utils.escape(u.status || 'active') + '</span></td><td>' + Utils.escape(u.lastLogin || '—') + '</td><td class="action-cell"><button class="btn btn-secondary btn-xs" data-act="edit" data-id="' + u.id + '">' + Lang.t('Edit', 'تعديل') + '</button> <button class="btn btn-danger btn-xs" data-act="delete" data-id="' + u.id + '">' + Lang.t('Delete', 'حذف') + '</button></td></tr>';
        }).join('') + '</tbody></table></div>';

      el.querySelectorAll('[data-act]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id = btn.getAttribute('data-id');
          if (btn.getAttribute('data-act') === 'edit') self.openUserForm(id);
          else UI.confirm(Lang.t('Delete this user?', 'حذف هذا المستخدم؟'), function () {
            Store.remove('users', id);
            self._renderStats();
            self._renderUsers();
          });
        });
      });
    },

    _renderRoles: function () {
      var self = this;
      var q = self._roleSearch || '';
      var el = document.getElementById('rolesList');
      if (!el) return;
      var rows = Store.getAll('roles').filter(function (r) {
        var txt = ((r.name || '') + ' ' + (r.permissions || []).join(' ')).toLowerCase();
        return !q || txt.indexOf(q) >= 0;
      }).sort(function (a, b) {
        var an = (a.name || '').toLowerCase();
        var bn = (b.name || '').toLowerCase();
        if (an === bn) return 0;
        return an < bn ? -1 : 1;
      });

      if (!rows.length) {
        el.innerHTML = '<div class="empty-state"><p>' + Lang.t('No roles found', 'لا توجد أدوار') + '</p></div>';
        return;
      }

      el.innerHTML = '<div class="table-responsive"><table><thead><tr><th>' + Lang.t('Role', 'الدور') + '</th><th>' + Lang.t('Permissions', 'الصلاحيات') + '</th><th>' + Lang.t('Actions', 'الإجراءات') + '</th></tr></thead><tbody>' +
        rows.map(function (r) {
          return '<tr><td><strong>' + Utils.escape(r.name || '') + '</strong></td><td>' + Utils.escape((r.permissions || []).join(', ')) + '</td><td class="action-cell"><button class="btn btn-secondary btn-xs" data-r-act="edit" data-id="' + r.id + '">' + Lang.t('Edit', 'تعديل') + '</button> <button class="btn btn-danger btn-xs" data-r-act="delete" data-id="' + r.id + '">' + Lang.t('Delete', 'حذف') + '</button></td></tr>';
        }).join('') + '</tbody></table></div>';

      el.querySelectorAll('[data-r-act]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id = btn.getAttribute('data-id');
          if (btn.getAttribute('data-r-act') === 'edit') self.openRoleForm(id);
          else UI.confirm(Lang.t('Delete this role?', 'حذف هذا الدور؟'), function () {
            Store.remove('roles', id);
            self._renderStats();
            self._renderRoles();
          });
        });
      });
    },

    openUserForm: function (id) {
      var self = this;
      var u = (id ? Store.getById('users', id) : null) || { status: 'active' };
      var roles = Store.getAll('roles').map(function (r) {
        return '<option value="' + Utils.escape(r.name || '') + '"' + (u.role === r.name ? ' selected' : '') + '>' + Utils.escape(r.name || '') + '</option>';
      }).join('');
      var body =
        '<div class="form-group"><label class="form-label">' + Lang.t('Name', 'الاسم') + ' *</label><input id="usrName" class="form-control" value="' + Utils.escape(u.name || '') + '"></div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Email', 'البريد الإلكتروني') + ' *</label><input id="usrEmail" type="email" class="form-control" value="' + Utils.escape(u.email || '') + '"></div>' +
        '<div class="form-grid"><div class="form-group"><label class="form-label">' + Lang.t('Role', 'الدور') + '</label><select id="usrRole" class="form-control">' + roles + '</select></div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Status', 'الحالة') + '</label><select id="usrStatus" class="form-control"><option value="active"' + ((u.status || 'active') === 'active' ? ' selected' : '') + '>' + Lang.t('Active', 'نشط') + '</option><option value="inactive"' + (u.status === 'inactive' ? ' selected' : '') + '>' + Lang.t('Inactive', 'غير نشط') + '</option></select></div></div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Password (optional)', 'كلمة المرور (اختياري)') + '</label><input id="usrPass" type="password" class="form-control" value=""></div>';
      UI.modal({
        title: id ? Lang.t('Edit User', 'تعديل مستخدم') : Lang.t('New User', 'مستخدم جديد'),
        body: body,
        footer: '<button class="btn btn-primary" id="usrSv">' + Lang.t('Save', 'حفظ') + '</button><button class="btn btn-secondary" id="usrCl">' + Lang.t('Cancel', 'إلغاء') + '</button>',
        onReady: function (ov) {
          ov.querySelector('#usrCl').addEventListener('click', UI.closeModal);
          ov.querySelector('#usrSv').addEventListener('click', function () {
            var name = ov.querySelector('#usrName').value.trim();
            var email = ov.querySelector('#usrEmail').value.trim();
            if (!name || !email) {
              UI.toast(Lang.t('Name and email are required', 'الاسم والبريد الإلكتروني مطلوبان'), 'error');
              return;
            }
            Store.save('users', {
              id: u.id || null,
              name: name,
              email: email,
              role: ov.querySelector('#usrRole').value,
              status: ov.querySelector('#usrStatus').value,
              passwordMask: ov.querySelector('#usrPass').value ? '••••••••' : (u.passwordMask || ''),
              lastLogin: u.lastLogin || '',
              createdAt: u.createdAt
            });
            UI.closeModal();
            self._renderStats();
            self._renderUsers();
          });
        }
      });
    },

    openRoleForm: function (id) {
      var self = this;
      var r = (id ? Store.getById('roles', id) : null) || { permissions: [] };
      var body =
        '<div class="form-group"><label class="form-label">' + Lang.t('Role Name', 'اسم الدور') + ' *</label><input id="roleName" class="form-control" value="' + Utils.escape(r.name || '') + '"></div>' +
        '<div class="form-group"><label class="form-label">' + Lang.t('Permissions (comma-separated)', 'الصلاحيات (مفصولة بفواصل)') + '</label><input id="rolePerm" class="form-control" value="' + Utils.escape((r.permissions || []).join(', ')) + '"></div>';
      UI.modal({
        title: id ? Lang.t('Edit Role', 'تعديل الدور') : Lang.t('New Role', 'دور جديد'),
        body: body,
        footer: '<button class="btn btn-primary" id="roleSv">' + Lang.t('Save', 'حفظ') + '</button><button class="btn btn-secondary" id="roleCl">' + Lang.t('Cancel', 'إلغاء') + '</button>',
        onReady: function (ov) {
          ov.querySelector('#roleCl').addEventListener('click', UI.closeModal);
          ov.querySelector('#roleSv').addEventListener('click', function () {
            var name = ov.querySelector('#roleName').value.trim();
            if (!name) {
              UI.toast(Lang.t('Role name is required', 'اسم الدور مطلوب'), 'error');
              return;
            }
            var perms = ov.querySelector('#rolePerm').value.split(',').map(function (p) { return p.trim(); }).filter(function (p) { return !!p; });
            Store.save('roles', {
              id: r.id || null,
              name: name,
              permissions: perms,
              createdAt: r.createdAt
            });
            UI.closeModal();
            self._renderStats();
            self._renderRoles();
          });
        }
      });
    }
  };

  var Phase4 = {
    seed: function () {
      if (!DB.get('employees')) {
        DB.set('employees', [
          { id: 'e1', name: 'Fahad Al-Otaibi', role: 'Operations Manager', email: 'fahad@aalkc.com', status: 'active', salary: 14000, deductions: 500, createdAt: '2025-01-01' },
          { id: 'e2', name: 'Noura Al-Harbi', role: 'Accountant', email: 'noura@aalkc.com', status: 'active', salary: 11000, deductions: 350, createdAt: '2025-01-01' },
          { id: 'e3', name: 'Yousef Al-Qahtani', role: 'Yard Supervisor', email: 'yousef@aalkc.com', status: 'active', salary: 9000, deductions: 250, createdAt: '2025-01-01' }
        ]);
      }
      if (!DB.get('payroll')) {
        DB.set('payroll', [
          { id: 'pr-2026-02-e1', period: '2026-02', employeeId: 'e1', employeeName: 'Fahad Al-Otaibi', gross: 14000, deductions: 500, net: 13500, createdAt: '2026-02-28' },
          { id: 'pr-2026-02-e2', period: '2026-02', employeeId: 'e2', employeeName: 'Noura Al-Harbi', gross: 11000, deductions: 350, net: 10650, createdAt: '2026-02-28' }
        ]);
      }
      if (!DB.get('roles')) {
        DB.set('roles', [
          { id: 'r1', name: 'Admin', permissions: ['all'], createdAt: '2025-01-01' },
          { id: 'r2', name: 'Finance', permissions: ['invoices', 'expenses', 'reports', 'bank'], createdAt: '2025-01-01' },
          { id: 'r3', name: 'Operations', permissions: ['inventory', 'purchases', 'documents'], createdAt: '2025-01-01' }
        ]);
      }
      if (!DB.get('users')) {
        DB.set('users', [
          { id: 'u1', name: 'ERP Admin', email: 'admin@aalkc.com', role: 'Admin', status: 'active', passwordMask: '••••••••', lastLogin: '2026-03-29 09:20', createdAt: '2025-01-01' },
          { id: 'u2', name: 'Finance Officer', email: 'finance@aalkc.com', role: 'Finance', status: 'active', passwordMask: '••••••••', lastLogin: '2026-03-28 14:10', createdAt: '2025-01-01' }
        ]);
      }
    },

    init: function () {
      this.seed();
      ['employees', 'payroll', 'users', 'roles'].forEach(function (c) {
        if (_DATA_COLLECTIONS.indexOf(c) < 0) _DATA_COLLECTIONS.push(c);
      });
      Router.modules.employees.render = function (el) { EmployeesModule.render(el); };
      Router.modules.reports.render = function (el) { ReportsModule.render(el); };
      Router.modules.users = { title: 'User Management', titleAr: 'إدارة المستخدمين', render: function (el) { UserManagementModule.render(el); } };
    }
  };

  /* Extend App.init to run Phase 4 after Phase 3 bootstrap */
  var _p3Init = App.init.bind(App);
  App.init = function () { _p3Init(); Phase4.init(); };

})();
