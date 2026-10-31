/* HVAC Stuff — общий скрипт сайта: шапка с меню, подвал, языки UA/EN/RU, тема, ссылки на PDF и версию релиза.
   Страница задаёт window.HVAC_PAGE = { key: "qfc", title: "qfc.name", T: { uk: {...}, en: {...}, ru: {...} } } до подключения этого файла.
   Остальные скрипты (ribbon.js, videos.js) подключаются после и используют window.HVAC. */
(function () {
  var REPO = "iMrVoLaNd/HVAC-Stuff-Releases";
  var RAW = "https://github.com/" + REPO + "/raw/main/manuals/";
  var PAGE = window.HVAC_PAGE || {};

  /* ---------- общие тексты ---------- */
  var T = {
    uk: {
      "nav.plugins": "Плагіни", "nav.all": "Усі плагіни", "nav.install": "Встановлення", "nav.manuals": "Посібники", "nav.faq": "Питання", "nav.releases": "GitHub Releases", "nav.parsing": "Розбір імен", "nav.menu": "Меню", "nav.home": "HVAC Stuff — головна",
      "qfc.name": "З’єднати гнучким повітропроводом", "ft.name": "Замінити ділянку на гнучкий повітропровід", "dist.name": "Розподіл", "mep.name": "Позначення систем",
      "qfc.p": "Гнучкий повітропровід між двома конекторами за два кліки.",
      "ft.p": "Кінець жорсткого повітропроводу біля елемента стає гнучким потрібної довжини.",
      "dist.p": "Рівномірно розставляє виділені елементи між двома межами: рівні проміжки або рівні кроки між осями.",
      "mep.p": "Заповнює назву системи та ключ сортування в параметрах повітропроводів, труб і обладнання за правилами типу системи.",
      "th.label": "Тема сайту", "th.auto": "Тема: як у системи", "th.light": "Світла тема", "th.dark": "Темна тема",
      "hero.download": "Завантажити", "hero.version": "Версія", "hero.free": "Безкоштовно", "man.pdf": "Посібник (PDF):", "man.soon": "Посібник готується — скоро з’явиться",
      "plug.more": "Докладніше →", "plug.since": "З версії", "plug.new": "Новий",
      "foot.copy": "© 2026 Maliuhin Volodymyr. Безкоштовна надбудова для Autodesk Revit.", "foot.license": "Ліцензія", "foot.third": "Сторонні компоненти", "foot.releases": "Усі релізи", "foot.home": "Головна"
    },
    en: {
      "nav.plugins": "Plugins", "nav.all": "All plugins", "nav.install": "Install", "nav.manuals": "Manuals", "nav.faq": "FAQ", "nav.releases": "GitHub Releases", "nav.parsing": "Name parsing", "nav.menu": "Menu", "nav.home": "HVAC Stuff — home",
      "qfc.name": "Connect with Flex Duct", "ft.name": "Replace Section with Flex Duct", "dist.name": "Distribute", "mep.name": "System Marks",
      "qfc.p": "A flex duct between two duct connectors in two clicks.",
      "ft.p": "The end of a rigid duct at an element becomes a flex duct of the length you need.",
      "dist.p": "Spreads the selected elements evenly between two borders: equal gaps or equal steps between centers.",
      "mep.p": "Fills the system name and the sort key in the parameters of ducts, pipes and equipment by the rules of the system type.",
      "th.label": "Site theme", "th.auto": "Theme: same as system", "th.light": "Light theme", "th.dark": "Dark theme",
      "hero.download": "Download", "hero.version": "Version", "hero.free": "Free", "man.pdf": "Manual (PDF):", "man.soon": "Manual is being updated — coming soon",
      "plug.more": "Details →", "plug.since": "Since version", "plug.new": "New",
      "foot.copy": "© 2026 Maliuhin Volodymyr. A free add-in for Autodesk Revit.", "foot.license": "License", "foot.third": "Third-party notices", "foot.releases": "All releases", "foot.home": "Home"
    },
    ru: {
      "nav.plugins": "Плагины", "nav.all": "Все плагины", "nav.install": "Установка", "nav.manuals": "Руководства", "nav.faq": "Вопросы", "nav.releases": "GitHub Releases", "nav.parsing": "Разбор имён", "nav.menu": "Меню", "nav.home": "HVAC Stuff — главная",
      "qfc.name": "Соединить гибким воздуховодом", "ft.name": "Заменить участок на гибкий воздуховод", "dist.name": "Распределение", "mep.name": "Обозначение систем",
      "qfc.p": "Гибкий воздуховод между двумя коннекторами за два клика.",
      "ft.p": "Конец жёсткого воздуховода у элемента становится гибким нужной длины.",
      "dist.p": "Равномерно расставляет выделенные элементы между двумя границами: равные зазоры или равные шаги между осями.",
      "mep.p": "Заполняет имя системы и ключ сортировки в параметрах воздуховодов, труб и оборудования по правилам типа системы.",
      "th.label": "Тема сайта", "th.auto": "Тема: как в системе", "th.light": "Светлая тема", "th.dark": "Тёмная тема",
      "hero.download": "Скачать", "hero.version": "Версия", "hero.free": "Бесплатно", "man.pdf": "Руководство (PDF):", "man.soon": "Руководство обновляется — скоро появится",
      "plug.more": "Подробнее →", "plug.since": "С версии", "plug.new": "Новый",
      "foot.copy": "© 2026 Maliuhin Volodymyr. Бесплатная надстройка для Autodesk Revit.", "foot.license": "Лицензия", "foot.third": "Сторонние компоненты", "foot.releases": "Все релизы", "foot.home": "Главная"
    }
  };
  function merge(d) { ["uk", "en", "ru"].forEach(function (l) { if (d && d[l]) for (var k in d[l]) T[l][k] = d[l][k]; }); }
  merge(PAGE.T);

  var lang = "uk", listeners = [];
  var H = window.HVAC = { page: PAGE.key || "", version: "1.7.1", repo: REPO };
  H.t = function (k) { return (T[lang] && T[lang][k]) || T.en[k] || k; };
  H.lang = function () { return lang; };
  H.addStrings = function (d) { merge(d); };
  H.onLang = function (fn) { listeners.push(fn); fn(lang); };
  H.scheme = function () {
    var f = document.documentElement.getAttribute("data-theme");
    if (f) return f;
    return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  /* ---------- шапка и подвал ---------- */
  var PLUGINS = [["qfc", "quickflexconnect.html", "qfc.name"], ["ft", "flextail.html", "ft.name"], ["dist", "distribute.html", "dist.name"], ["mep", "mep-parameter-sync.html", "mep.name"]];
  function buildHeader() {
    var el = document.getElementById("siteNav"); if (!el) return;
    var inPlugins = PLUGINS.some(function (p) { return p[0] === PAGE.key; }) || PAGE.key === "parse";
    var items = PLUGINS.map(function (p) {
      return '<li><a href="' + p[1] + '"' + (p[0] === PAGE.key || (p[0] === "mep" && PAGE.key === "parse") ? ' class="here" aria-current="page"' : "") + ' data-i18n="' + p[2] + '"></a></li>';
    }).join("");
    el.className = "nav";
    el.innerHTML =
      '<div class="wrap">' +
      '<a class="brand" href="index.html" data-i18n-title="nav.home"><img src="img/logo-128.png" alt="" width="32" height="32">HVAC Stuff</a>' +
      '<button class="burger" id="burger" type="button" aria-expanded="false" aria-controls="navPanel" data-i18n-title="nav.menu"><i></i></button>' +
      '<div class="nav-panel" id="navPanel">' +
      '<ul class="nav-links">' +
      '<li class="dd" id="ddPlugins"><button class="dd-btn' + (inPlugins ? " here" : "") + '" type="button" aria-expanded="false" aria-haspopup="true" data-i18n="nav.plugins"></button>' +
      '<ul class="dd-menu"><li><a href="index.html#plugins" data-i18n="nav.all"></a></li><li class="sep"></li>' + items + '</ul></li>' +
      '<li><a href="index.html#install" data-sec="install" data-i18n="nav.install"></a></li>' +
      '<li><a href="index.html#manuals" data-sec="manuals" data-i18n="nav.manuals"></a></li>' +
      '<li><a href="index.html#faq" data-sec="faq" data-i18n="nav.faq"></a></li>' +
      '<li><a href="https://github.com/' + REPO + '/releases" target="_blank" rel="noopener" data-i18n="nav.releases"></a></li>' +
      "</ul>" +
      '<div class="nav-tools">' +
      '<div class="lang" role="group" aria-label="Language"><button type="button" data-lang="uk" aria-pressed="false">UA</button><button type="button" data-lang="en" aria-pressed="false">EN</button><button type="button" data-lang="ru" aria-pressed="false">RU</button></div>' +
      '<div class="theme" id="themeSw" role="group" data-i18n-title="th.label">' +
      '<button type="button" data-th="auto" aria-pressed="false" data-i18n-title="th.auto"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg></button>' +
      '<button type="button" data-th="light" aria-pressed="false" data-i18n-title="th.light"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></svg></button>' +
      '<button type="button" data-th="dark" aria-pressed="false" data-i18n-title="th.dark"><svg viewBox="0 0 24 24"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7z"/></svg></button>' +
      "</div></div></div></div>";

    var dd = document.getElementById("ddPlugins"), btn = dd.querySelector(".dd-btn"), burger = document.getElementById("burger");
    var pinned = false;
    function setDd(on) { dd.classList.toggle("open", on); btn.setAttribute("aria-expanded", on); if (!on) pinned = false; }
    // клик закрепляет меню; наведение только показывает его (клик после наведения не закрывает)
    btn.addEventListener("click", function () {
      if (dd.classList.contains("open") && pinned) setDd(false);
      else { setDd(true); pinned = true; }
    });
    if (window.matchMedia && matchMedia("(hover: hover) and (min-width: 961px)").matches) {
      dd.addEventListener("mouseenter", function () { setDd(true); });
      dd.addEventListener("mouseleave", function () { if (!pinned) setDd(false); });
    }
    document.addEventListener("click", function (e) { if (!dd.contains(e.target)) setDd(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { setDd(false); el.classList.remove("open"); burger.setAttribute("aria-expanded", false); } });
    burger.addEventListener("click", function () { var on = !el.classList.contains("open"); el.classList.toggle("open", on); burger.setAttribute("aria-expanded", on); });
    el.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () { el.classList.remove("open"); burger.setAttribute("aria-expanded", false); setDd(false); });
    });
    el.querySelectorAll(".lang button").forEach(function (b) { b.addEventListener("click", function () { H.setLang(b.dataset.lang); }); });
    el.querySelectorAll("#themeSw button").forEach(function (b) { b.addEventListener("click", function () { applyTheme(b.dataset.th, true); }); });
  }
  function buildFooter() {
    var el = document.getElementById("siteFoot"); if (!el) return;
    el.innerHTML =
      '<div class="wrap"><div><img class="foot-logo" src="img/logo-128.png" alt="" width="44" height="44"><b style="color:#fff">HVAC Stuff</b><br><span data-i18n="foot.copy"></span></div>' +
      '<div><a href="index.html" data-i18n="foot.home"></a> · ' +
      '<a href="https://github.com/' + REPO + '/blob/main/LICENSE.md" data-i18n="foot.license"></a> · ' +
      '<a href="https://github.com/' + REPO + '/blob/main/THIRD-PARTY-NOTICES.md" data-i18n="foot.third"></a> · ' +
      '<a href="https://github.com/' + REPO + '/releases" data-i18n="foot.releases"></a><br>' +
      '<a href="mailto:habrahabrtank@gmail.com">habrahabrtank@gmail.com</a></div></div>';
  }

  /* ---------- тема: auto (как в системе) / light / dark ---------- */
  function themeChoice() {
    var f = document.documentElement.getAttribute("data-theme");
    return f === "light" || f === "dark" ? f : "auto";
  }
  function applyTheme(th, save) {
    if (th === "light" || th === "dark") document.documentElement.setAttribute("data-theme", th);
    else { th = "auto"; document.documentElement.removeAttribute("data-theme"); }
    if (save) { try { if (th === "auto") localStorage.removeItem("hvac-theme"); else localStorage.setItem("hvac-theme", th); } catch (e) {} }
    document.querySelectorAll("#themeSw button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.th === th); });
    if (window.rvTheme) window.rvTheme(H.scheme());
  }

  /* ---------- языки ---------- */
  function pickLang() {
    try { var s = localStorage.getItem("hvac-lang"); if (s && T[s]) return s; } catch (e) {}
    var n = (navigator.language || "uk").slice(0, 2).toLowerCase();
    return T[n] ? n : "en";
  }
  H.apply = function () {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = H.t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) { el.innerHTML = H.t(el.dataset.i18nHtml); });
    document.querySelectorAll("[data-i18n-title]").forEach(function (el) { var v = H.t(el.dataset.i18nTitle); el.title = v; el.setAttribute("aria-label", v); });
    document.querySelectorAll(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.lang === lang); });
    document.querySelectorAll("figure.shot").forEach(function (f) { var c = f.querySelector("figcaption"), i = f.querySelector("img"); if (c && i) i.alt = c.textContent; });
    document.title = PAGE.title ? H.t(PAGE.title) + " — HVAC Stuff" : (PAGE.docTitle ? H.t(PAGE.docTitle) : "HVAC Stuff");
    renderPdfs();
  };
  H.setLang = function (l) {
    lang = l;
    try { localStorage.setItem("hvac-lang", l); } catch (e) {}
    H.apply();
    listeners.forEach(function (fn) { fn(lang); });
  };

  function renderPdfs() {
    document.querySelectorAll("[data-pdf]").forEach(function (el) {
      el.innerHTML = '<span class="pdf off">' + H.t("man.soon") + "</span>";
    });
  }

  /* ---------- версия и ссылки на MSI из последнего релиза; без сети остаётся запасная версия ---------- */
  function setVersion(v, assets) {
    H.version = v;
    document.querySelectorAll(".verx").forEach(function (e) { e.textContent = v; });
    var base = "https://github.com/" + REPO + "/releases/download/" + v + "/HVAC.Stuff-" + v;
    [["single", "SingleUser"], ["multi", "MultiUser"]].forEach(function (k) {
      var a = document.querySelector('[data-dl="' + k[0] + '"]'); if (!a) return;
      var found = (assets || []).filter(function (x) { return new RegExp(k[1] + "\\.msi$", "i").test(x.name); })[0];
      a.href = found ? found.browser_download_url : base + "-" + k[1] + ".msi";
    });
  }
  function loadVersion() {
    setVersion(H.version);
    if (!document.querySelector(".verx, [data-dl]")) return;
    fetch("https://api.github.com/repos/" + REPO + "/releases/latest").then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { if (j && j.tag_name) setVersion(j.tag_name.replace(/^v/, ""), j.assets); }).catch(function () {});
  }

  /* ---------- подсветка раздела главной в шапке ---------- */
  function spy() {
    var links = {};
    document.querySelectorAll(".nav-links a[data-sec]").forEach(function (a) { links[a.dataset.sec] = a; });
    var btn = document.querySelector("#ddPlugins .dd-btn");
    var ids = ["plugins", "install", "manuals", "faq"];
    function onScroll() {
      var probe = window.scrollY + 120, cur = "";
      ids.forEach(function (id) { var s = document.getElementById(id); if (s && s.offsetTop <= probe) cur = id; });
      if (window.scrollY + innerHeight >= document.documentElement.scrollHeight - 4) cur = "faq";
      Object.keys(links).forEach(function (k) { links[k].classList.toggle("here", k === cur); });
      btn.classList.toggle("here", cur === "plugins");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  }

  /* ---------- иконки и карточки плагинов (главная и блок «Другие плагины») ---------- */
  var PLUG = {
    qfc: { href: "quickflexconnect.html", en: "Connect with Flex Duct", since: "1.0.0", svg: '<path stroke="#E8ECF2" d="M1 4.5H9.5M1 13.5H9.5M9.5 3V15"/><path stroke="#E8ECF2" d="M31 18.5H22.5M31 27.5H22.5M22.5 17V29"/><path stroke="#F2A93B" stroke-width="3" d="M10.5 8.5H14C19 8.5 13 23.5 18 23.5H21.5"/>' },
    ft: { href: "flextail.html", en: "Replace Section with Flex Duct", since: "1.0.0", svg: '<path stroke="#E8ECF2" d="M1 11H9.5M1 21H9.5M9.5 9.5V22.5"/><path stroke="#F2A93B" stroke-width="3" d="M10.5 16q1.84-7 3.67 0t3.67 0t3.66 0"/><path stroke="#6CBDEB" d="M22.5 6V26H30V6ZM22.5 12H30M22.5 16H30M22.5 20H30"/>' },
    dist: { href: "distribute.html", en: "Distribute", since: "1.3.0", svg: '<path stroke="#6CBDEB" d="M2 11H7V25H2ZM12 11H20V25H12ZM25 11H30V25H25Z"/><path stroke="#E8ECF2" d="M7 6V9M12 6V9M7 7.5H12M20 6V9M25 6V9M20 7.5H25"/>' },
    mep: { href: "mep-parameter-sync.html", en: "System Marks", since: "1.6.0", badge: true, svg: '<path stroke="#E8ECF2" d="M3 7H13M3 14H13M3 21H13M3 28H13"/><path stroke="#6CBDEB" d="M17 7H29M17 14H29M17 21H29M17 28H29"/><path stroke="#F2A93B" stroke-width="3" d="M14 3.5L16 5.5L14 7.5"/>' }
  };
  function plugCards() {
    document.querySelectorAll("[data-plugs]").forEach(function (box) {
      var ex = box.dataset.exclude || "";
      box.innerHTML = Object.keys(PLUG).filter(function (k) { return k !== ex; }).map(function (k) {
        var p = PLUG[k];
        return '<article class="card plug">' + (p.badge ? '<span class="badge" data-i18n="plug.new"></span>' : "") +
          '<div class="tile"><svg viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + p.svg + "</svg></div>" +
          '<h3 data-i18n="' + k + '.name"></h3><p class="en" lang="en">' + p.en + "</p>" +
          '<p data-i18n="' + k + '.p"></p><a class="go" href="' + p.href + '" data-i18n="plug.more"></a>' +
          '<span class="since"><span data-i18n="plug.since"></span> ' + p.since + "</span></article>";
      }).join("");
    });
  }
  function sprite() {
    var d = document.createElement("div");
    d.innerHTML = '<svg width="0" height="0" style="position:absolute" aria-hidden="true">' +
      '<symbol id="i-target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.5"/><path d="M12 1v5M12 18v5M1 12h5M18 12h5"/></symbol>' +
      '<symbol id="i-eye" viewBox="0 0 24 24"><path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z"/><circle cx="12" cy="12" r="3"/></symbol>' +
      '<symbol id="i-chat" viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-5.4A8 8 0 1 1 21 12z"/><path d="M8 11h8M8 14.5h5"/></symbol>' +
      '<symbol id="i-layers" viewBox="0 0 24 24"><path d="M12 3 2 8l10 5 10-5-10-5z"/><path d="m2 13 10 5 10-5M2 17.5 12 22l10-4.5"/></symbol>' +
      '<symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c3 3 3 16 0 19M12 2.5c-3 3-3 16 0 19"/></symbol>' +
      '<symbol id="i-bolt" viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/></symbol>' +
      '<symbol id="i-dl" viewBox="0 0 24 24"><path d="M12 3v12m0 0-4-4m4 4 4-4M4 20h16"/></symbol></svg>';
    document.body.insertBefore(d.firstChild, document.body.firstChild);
  }

  buildHeader();
  buildFooter();
  sprite();
  plugCards();
  lang = pickLang();
  applyTheme(themeChoice(), false);
  if (window.matchMedia) {
    var mq = matchMedia("(prefers-color-scheme: dark)");
    var onSys = function () { if (themeChoice() === "auto") applyTheme("auto", false); };
    if (mq.addEventListener) mq.addEventListener("change", onSys); else if (mq.addListener) mq.addListener(onSys);
  }
  H.apply();
  loadVersion();
  if (PAGE.key === "home") spy();
})();
