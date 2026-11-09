/* HVAC Stuff — сцены-анимации команд. Одни и те же сцены играют и на шапках страниц плагинов, и на кнопках ленты Revit:
   HVAC.scenes.play(host, "qfc", onStatus) — один раз; HVAC.scenes.mount(host, "qfc") — по кругу, пока блок виден.
   Сцены: qfc, ft, dhg, dhc, dvg, dvc, sm_fill, sm_clear, sm_auto, sm_jrn. Нужен site.js перед этим файлом, стили — в ribbon.css. */
(function () {
  "use strict";
  var H = window.HVAC, t = H.t, uid = 0, SCENES = {};

  H.addStrings({
    uk: {
      "sc.el.duct": "Повітропровід", "sc.el.elbow": "Відвід", "sc.el.tee": "Трійник", "sc.el.diff": "Розподільник",
      "sc.src": "Ім’я системи", "sc.strat": "Стратегія", "sc.simple": "Проста", "sc.target": "Цільовий параметр", "sc.sort": "Параметр сортування",
      "sc.new": "новий", "sc.updater": "Оновлювач", "sc.rank": "невидимі символи рангу",
      "sc.fill1": "Беремо «Ім’я системи» елемента", "sc.fill2": "Застосовуємо стратегію типу системи", "sc.fill3": "Записуємо в цільовий параметр і в параметр сортування", "sc.fill4": "Готово: усі елементи заповнено, звіт нижче",
      "sc.clr1": "Очищаємо цільовий параметр і параметр сортування", "sc.clr2": "Готово: параметри очищено, звіт нижче",
      "sc.auto1": "У моделі з’явився новий елемент", "sc.auto2": "Оновлювач бачить зміну й сам застосовує стратегію", "sc.auto3": "Готово: параметри заповнено без кнопок і без звіту",
      "sc.rep.t": "Звіт про перерахунок", "sc.rep.found": "Знайдено елементів", "sc.rep.tw": "Записано цільових параметрів", "sc.rep.sw": "Записано параметрів сортування", "sc.rep.skip": "Пропущено (сімейства)", "sc.rep.err": "Помилок",
      "sc.crep.t": "Звіт про очищення", "sc.crep.tc": "Очищено цільових параметрів", "sc.crep.sc": "Очищено параметрів сортування", "sc.crep.empty": "Уже порожні",
      "sc.jrn.t": "Журнал запусків", "sc.jrn.auto": "Автоматично", "sc.jrn.manual": "Вручну", "sc.jrn.clear": "Очищення", "sc.jrn.n": "елементів", "sc.jrn1": "Останні запуски проєкту: автоматичні й ручні"
    },
    en: {
      "sc.el.duct": "Duct", "sc.el.elbow": "Elbow", "sc.el.tee": "Tee", "sc.el.diff": "Diffuser",
      "sc.src": "System Name", "sc.strat": "Strategy", "sc.simple": "Simple", "sc.target": "Target parameter", "sc.sort": "Sort parameter",
      "sc.new": "new", "sc.updater": "Updater", "sc.rank": "invisible rank characters",
      "sc.fill1": "Take the System Name of the element", "sc.fill2": "Apply the strategy of the system type", "sc.fill3": "Write it to the target parameter and to the sort parameter", "sc.fill4": "Done: every element is filled, the report is below",
      "sc.clr1": "Clear the target parameter and the sort parameter", "sc.clr2": "Done: the parameters are cleared, the report is below",
      "sc.auto1": "A new element appears in the model", "sc.auto2": "The updater sees the change and applies the strategy by itself", "sc.auto3": "Done: filled with no buttons and no report",
      "sc.rep.t": "Recalculation report", "sc.rep.found": "Elements found", "sc.rep.tw": "Target parameters written", "sc.rep.sw": "Sort parameters written", "sc.rep.skip": "Skipped (families)", "sc.rep.err": "Errors",
      "sc.crep.t": "Clearing report", "sc.crep.tc": "Target parameters cleared", "sc.crep.sc": "Sort parameters cleared", "sc.crep.empty": "Already empty",
      "sc.jrn.t": "Run journal", "sc.jrn.auto": "Automatic", "sc.jrn.manual": "Manual", "sc.jrn.clear": "Clearing", "sc.jrn.n": "elements", "sc.jrn1": "Latest runs of the project: automatic and manual"
    },
    ru: {
      "sc.el.duct": "Воздуховод", "sc.el.elbow": "Отвод", "sc.el.tee": "Тройник", "sc.el.diff": "Воздухораспределитель",
      "sc.src": "Имя системы", "sc.strat": "Стратегия", "sc.simple": "Простая", "sc.target": "Целевой параметр", "sc.sort": "Параметр сортировки",
      "sc.new": "новый", "sc.updater": "Апдейтер", "sc.rank": "невидимые символы ранга",
      "sc.fill1": "Берём «Имя системы» элемента", "sc.fill2": "Применяем стратегию типа системы", "sc.fill3": "Записываем в целевой параметр и в параметр сортировки", "sc.fill4": "Готово: все элементы заполнены, отчёт ниже",
      "sc.clr1": "Очищаем целевой параметр и параметр сортировки", "sc.clr2": "Готово: параметры очищены, отчёт ниже",
      "sc.auto1": "В модели появился новый элемент", "sc.auto2": "Апдейтер видит изменение и сам применяет стратегию", "sc.auto3": "Готово: параметры заполнены без кнопок и без отчёта",
      "sc.rep.t": "Отчёт о перерасчёте", "sc.rep.found": "Найдено элементов", "sc.rep.tw": "Записано целевых параметров", "sc.rep.sw": "Записано параметров сортировки", "sc.rep.skip": "Пропущено (семейства)", "sc.rep.err": "Ошибок",
      "sc.crep.t": "Отчёт об очистке", "sc.crep.tc": "Очищено целевых параметров", "sc.crep.sc": "Очищено параметров сортировки", "sc.crep.empty": "Уже пустые",
      "sc.jrn.t": "Журнал запусков", "sc.jrn.auto": "Автоматически", "sc.jrn.manual": "Вручную", "sc.jrn.clear": "Очистка", "sc.jrn.n": "элементов", "sc.jrn1": "Последние запуски проекта: автоматические и ручные"
    }
  });

  /* ---------- общие детали рисунка ---------- */
  function defs(id) {
    return '<defs><linearGradient id="' + id + 'dg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6f8fb"/><stop offset=".22" stop-color="#d6dce3"/><stop offset=".62" stop-color="#9ba5b2"/><stop offset="1" stop-color="#697482"/></linearGradient>' +
      '<linearGradient id="' + id + 'tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f6f9"/><stop offset="1" stop-color="#b3bcc8"/></linearGradient>' +
      '<linearGradient id="' + id + 'eq" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8fa3c4"/><stop offset=".5" stop-color="#b9c7de"/><stop offset="1" stop-color="#7f93b6"/></linearGradient></defs>';
  }
  function duct(x, y, w, h, flange, id) {
    var seams = "", i;
    for (i = x + 55; i < x + w - 10; i += 55) seams += '<path d="M' + i + " " + y + "V" + (y + h) + '" stroke="#5c6673" stroke-opacity=".45" stroke-width="1.4"/>';
    var fx = flange === "r" ? x + w - 9 : x;
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="2" fill="url(#' + id + 'dg)" stroke="#4b5563" stroke-width="1.4"/>' + seams +
      '<rect x="' + fx + '" y="' + (y - 3) + '" width="9" height="' + (h + 6) + '" rx="2" fill="url(#' + id + 'dg)" stroke="#3b4350" stroke-width="1.4"/>';
  }
  function flex(D, w) {
    return '<path d="' + D + '" fill="none" stroke="#3f4852" stroke-width="' + (w + 4) + '"/><path d="' + D + '" fill="none" stroke="#dde2e8" stroke-width="' + w + '"/>' +
      '<path d="' + D + '" fill="none" stroke="#6f7a89" stroke-width="' + w + '" stroke-dasharray="1.7 5.3"/>' +
      '<path d="' + D + '" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="' + (w * 0.26) + '" transform="translate(0,' + (-w * 0.22) + ')"/>' +
      '<path d="' + D + '" fill="none" stroke="#000" stroke-opacity=".22" stroke-width="' + (w * 0.26) + '" transform="translate(0,' + (w * 0.26) + ')"/>';
  }
  function collar(x, y, h) { return '<rect x="' + (x - 5) + '" y="' + (y - h / 2 - 2) + '" width="10" height="' + (h + 4) + '" rx="2" fill="#2f3640" stroke="#1d232b" stroke-width="1"/>'; }
  function arrow(x, y, dx, dy, n) { /* стрелка потока воздуха от точки (x,y) на n пикселей */
    var ex = x + dx * n, ey = y + dy * n, px = -dy * 3.2, py = dx * 3.2, bx = ex - dx * 4.5, by = ey - dy * 4.5;
    return '<path d="M' + x + " " + y + "L" + ex + " " + ey + "M" + (bx + px) + " " + (by + py) + "L" + ex + " " + ey + "L" + (bx - px) + " " + (by - py) + '"/>';
  }
  /* воздухораспределитель в плане: рамка, «ёлочка» внутри и четыре стрелки потока воздуха наружу */
  function diffuser(x, y, w, h, id) {
    var m = Math.min(w, h) * 0.15, ix = x + m, iy = y + m, iw = w - 2 * m, ih = h - 2 * m, cx = x + w / 2, cy = y + h / 2, k, p = "", n;
    if (w >= h) {
      n = Math.max(2, Math.floor(iw / 17));
      for (k = 1; k <= n; k++) { var px = ix + iw * k / (n + 1); p += "M" + (px - 6) + " " + (iy + ih * 0.2) + "L" + (px + 6) + " " + cy + "L" + (px - 6) + " " + (iy + ih * 0.8); }
    } else {
      n = Math.max(2, Math.floor(ih / 17));
      for (k = 1; k <= n; k++) { var py = iy + ih * k / (n + 1); p += "M" + (ix + iw * 0.2) + " " + (py - 6) + "L" + cx + " " + (py + 6) + "L" + (ix + iw * 0.8) + " " + (py - 6); }
    }
    return '<g class="dr"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="3" fill="url(#' + id + 'tg)" stroke="#59636f" stroke-width="2"/>' +
      '<rect x="' + ix + '" y="' + iy + '" width="' + iw + '" height="' + ih + '" rx="2" fill="#eef1f5" stroke="#8d98a5" stroke-width="1.5"/>' +
      '<path d="' + p + '" fill="none" stroke="#6d7a89" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/>' +
      '<g class="air" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + arrow(cx, y - 3, 0, -1, 9) + arrow(cx, y + h + 3, 0, 1, 9) + arrow(x - 3, cy, -1, 0, 9) + arrow(x + w + 3, cy, 1, 0, 9) + "</g></g>";
  }
  /* метка коннектора — как в плагине: тонкая полоса из трёх колец по сечению, стрелка по направлению коннектора и крест */
  function conn(cls, x, y, size, dir) {
    var len = size * 1.15, L = Math.max(size * 0.8, 32), ex = x + dir * L;
    return '<g class="cm ' + cls + '"><path d="M' + (x - 3) + " " + (y - len / 2) + "V" + (y + len / 2) + "M" + x + " " + (y - len / 2) + "V" + (y + len / 2) + "M" + (x + 3) + " " + (y - len / 2) + "V" + (y + len / 2) + '"/>' +
      '<path d="M' + x + " " + y + "H" + ex + "M" + (ex - dir * 9) + " " + (y - 5.5) + "L" + ex + " " + y + "L" + (ex - dir * 9) + " " + (y + 5.5) + '"/></g>';
  }
  var CUR = '<g class="cur"><g class="cp"><path d="M0 0V17L4.5 13 8 20.5 10.7 19.3 7.2 12H13Z" fill="#fff" stroke="#111" stroke-width="1.2" stroke-linejoin="round"/></g></g>';

  /* ---------- проигрыватель ---------- */
  function stop(host) {
    var c = host.__sc;
    if (c) { c.dead = true; c.timers.forEach(clearTimeout); }
    host.__sc = null;
  }
  function play(host, name, onStatus) {
    stop(host);
    var S = SCENES[name]; if (!S) return null;
    var c = { host: host, id: "s" + (++uid), timers: [], dead: false, total: 6000, name: name };
    c.status = function (k) { if (!c.dead && onStatus) onStatus(k ? t(k) : ""); };
    c.at = function (ms, fn) { c.timers.push(setTimeout(function () { if (!c.dead) fn(); }, ms)); };
    c.q = function (s) { return host.querySelector(s); };
    c.on = function (s, cls, on) { var e = host.querySelector(s); if (e) e.classList[on === false ? "remove" : "add"](cls); };
    c.go = function (s, x, y) { var e = host.querySelector(s); if (e) e.style.transform = "translate(" + x + "px," + y + "px)"; };
    c.press = function () { var e = host.querySelector(".cur"); if (e) { e.classList.add("press"); c.at(0, function () {}); setTimeout(function () { e.classList.remove("press"); }, 160); } };
    c.draw = function (inner, vh) {
      host.innerHTML = '<svg class="scn" viewBox="' + (typeof vh === "string" ? vh : "0 0 800 " + (vh || 340)) + '" aria-hidden="true">' + defs(c.id) + inner + "</svg>";
    };
    host.__sc = c;
    S(c);
    return c;
  }

  /* ---------- соединение гофрой: воздуховод → воздухораспределитель ---------- */
  SCENES.qfc = function (c) {
    var id = c.id, D = "M250 172 C380 172 470 96 596 96";
    c.draw('<clipPath id="' + id + 'cq"><rect class="clipq" x="240" y="40" width="0" height="260"/></clipPath>' +
      duct(30, 150, 220, 44, "r", id) + '<ellipse cx="253" cy="172" rx="6" ry="20" fill="#252c35"/>' +
      diffuser(626, 38, 120, 116, id) + '<rect x="598" y="82" width="28" height="28" fill="url(#' + id + 'dg)" stroke="#4b5563" stroke-width="1.4"/><ellipse cx="597" cy="96" rx="5" ry="14" fill="#252c35"/>' +
      '<g clip-path="url(#' + id + 'cq)">' + flex(D, 30) + collar(256, 172, 34) + collar(592, 96, 26) + "</g>" +
      conn("m1", 250, 172, 44, 1) + conn("m2", 597, 96, 28, -1) +
      '<text x="40" y="228" class="sc-note">Ø250</text><text x="596" y="140" class="sc-note">Ø160</text>' + CUR);
    c.status("rb.q1"); c.go(".cur", 70, 300);
    c.at(350, function () { c.go(".cur", 250, 172); });
    c.at(900, function () { c.on(".m1", "on"); });
    c.at(1400, function () { c.press(); c.on(".m1", "sel"); c.status("rb.q2"); });
    c.at(1800, function () { c.go(".cur", 597, 96); });
    c.at(2350, function () { c.on(".m2", "on"); });
    c.at(2850, function () { c.press(); c.on(".m2", "sel"); });
    c.at(3250, function () { c.q(".clipq").setAttribute("width", 380); c.q(".cur").style.opacity = 0; });
    c.at(4300, function () { c.on(".m1", "on", false); c.on(".m2", "on", false); c.on(".m1", "sel", false); c.on(".m2", "sel", false); c.status("rb.q3"); });
    c.total = 7500;
  };

  /* ---------- замена конца жёсткого воздуховода гибким ---------- */
  SCENES.ft = function (c) {
    var id = c.id;
    c.draw('<clipPath id="' + id + 'cf"><rect class="clipf" x="400" y="80" width="0" height="140"/></clipPath>' +
      duct(30, 130, 370, 40, "r", id) + '<g class="rigid2">' + duct(400, 130, 220, 40, "r", id) + "</g>" +
      '<g clip-path="url(#' + id + 'cf)">' + flex("M400 150H620", 36) + collar(405, 150, 36) + collar(615, 150, 36) + "</g>" +
      '<g class="dim" opacity="0"><path d="M400 98H620M400 92V104M620 92V104" stroke="currentColor" stroke-width="1.5" fill="none"/><text x="510" y="88" text-anchor="middle" font-size="14" fill="currentColor" font-weight="600">1500</text></g>' +
      '<rect x="620" y="92" width="110" height="116" rx="4" fill="url(#' + id + 'eq)" stroke="#4a5d82" stroke-width="2"/><rect x="636" y="106" width="78" height="88" rx="3" fill="none" stroke="#4a5d82" stroke-opacity=".6" stroke-width="1.5"/>' +
      '<path d="M642 122H708M642 138H708M642 154H708M642 170H708" stroke="#4a5d82" stroke-opacity=".55" stroke-width="2"/>' +
      conn("m1", 620, 150, 40, -1) + CUR);
    c.host.insertAdjacentHTML("beforeend", '<div class="chips2"><span>' + t("rb.len") + '</span><span class="c">500</span><span class="c">1000</span><span class="c">1500</span><span class="c">2000</span><span class="c">2500</span></div>');
    var ch = c.host.querySelectorAll(".chips2 .c");
    c.status("rb.f1s"); c.go(".cur", 70, 300);
    c.at(350, function () { c.go(".cur", 620, 150); });
    c.at(900, function () { c.on(".m1", "on"); });
    c.at(1400, function () { c.press(); c.on(".m1", "sel"); });
    c.at(1750, function () { ch[0].classList.add("hi"); });
    c.at(2100, function () { ch[0].classList.remove("hi"); ch[1].classList.add("hi"); });
    c.at(2450, function () { ch[1].classList.remove("hi"); ch[2].classList.add("hi"); });
    c.at(3000, function () {
      var r2 = c.q(".rigid2"); r2.style.transformOrigin = "620px 150px"; r2.style.transition = "transform .9s cubic-bezier(.4,0,.2,1)"; r2.style.transform = "scaleX(0)";
      c.q(".clipf").setAttribute("width", 220); c.q(".cur").style.opacity = 0; c.q(".dim").setAttribute("opacity", 1);
    });
    c.at(4000, function () { c.on(".m1", "on", false); c.on(".m1", "sel", false); c.status("rb.f2s"); });
    c.total = 7000;
  };

  /* ---------- распределение воздухораспределителей: зазоры или оси ---------- */
  var DM = { dhg: { v: false, m: "g" }, dhc: { v: false, m: "c" }, dvg: { v: true, m: "g" }, dvc: { v: true, m: "c" } };
  Object.keys(DM).forEach(function (k) {
    SCENES[k] = function (c) {
      var d = DM[k], n = 4, i, sum = 0, tgt = [], rects = "", marks = "", pos;
      var sz = d.v ? [30, 46, 26, 40] : [70, 120, 50, 96], st = d.v ? [48, 100, 176, 224] : [100, 230, 430, 540];
      var A = d.v ? 30 : 70, B = d.v ? 312 : 730, L = B - A, gap = 0, step = L / (n + 1);
      sz.forEach(function (x) { sum += x; });
      gap = (L - sum) / (n + 1); pos = A + gap;
      for (i = 0; i < n; i++) { if (d.m === "g") { tgt.push(pos); pos += sz[i] + gap; } else tgt.push(A + step * (i + 1) - sz[i] / 2); }
      function seg(a, b) { return d.v ? '<path d="M292 ' + a + "H308M292 " + b + "H308M300 " + a + "V" + b + '"/>' : '<path d="M' + a + " 92V108M" + b + " 92V108M" + a + " 100H" + b + '"/>'; }
      function line(p) { return d.v ? '<path d="M315 ' + p + 'H485" stroke-dasharray="5 4"/>' : '<path d="M' + p + ' 105V215" stroke-dasharray="5 4"/>'; }
      function bord(p) { return d.v ? '<path d="M260 ' + p + 'H540"/>' : '<path d="M' + p + ' 70V250"/>'; }
      for (i = 0; i < n; i++) rects += d.v ? diffuser(330, st[i], 140, sz[i], c.id) : diffuser(st[i], 125, sz[i], 70, c.id);
      if (d.m === "g") {
        marks += seg(A, tgt[0]);
        for (i = 0; i < n - 1; i++) marks += seg(tgt[i] + sz[i], tgt[i + 1]);
        marks += seg(tgt[n - 1] + sz[n - 1], B);
      } else {
        var cc = tgt.map(function (t0, q) { return t0 + sz[q] / 2; });
        cc.forEach(function (p) { marks += line(p); });
        marks += seg(A, cc[0]);
        for (i = 0; i < n - 1; i++) marks += seg(cc[i], cc[i + 1]);
        marks += seg(cc[n - 1], B);
      }
      c.draw('<g class="bd" fill="none" stroke-linecap="round">' + bord(A) + bord(B) + "</g>" + rects + '<g class="dm" opacity="0" fill="none" stroke-linecap="round">' + marks + "</g>", d.v ? "230 0 340 340" : "40 56 720 208");
      c.status("rb.d1");
      var els = c.host.querySelectorAll(".dr");
      c.at(900, function () {
        for (i = 0; i < n; i++) { var dd = tgt[i] - st[i]; els[i].style.transform = d.v ? "translate(0px," + dd + "px)" : "translate(" + dd + "px,0px)"; }
      });
      c.at(2000, function () { c.q(".dm").setAttribute("opacity", 1); c.status(d.m === "g" ? "rb.d2g" : "rb.d2c"); });
      c.total = 5500;
    };
  });

  /* ---------- позначення систем: общий чертёж «элементы → параметр → стратегия → два параметра» ---------- */
  var TILE_Y = [22, 92, 162, 232];
  var ROWS = [["duct", "ПК3", "К3"], ["elbow", "ПК3", "К3"], ["tee", "ПК-12а 1", "К-12а"], ["diff", "ПК4", "К4"]];
  function glyph(kind, x, y) {
    var u = '<g transform="translate(' + x + " " + y + ')" fill="none" stroke-linecap="butt" stroke-linejoin="round">';
    if (kind === "duct") u += '<rect x="1" y="11" width="34" height="14" rx="2" fill="#b9c2cd" stroke="#4b5563" stroke-width="1.6"/><path d="M12 11V25M24 11V25" stroke="#4b5563" stroke-opacity=".5"/>';
    else if (kind === "elbow") u += '<path d="M5 29H20V5" stroke="#4b5563" stroke-width="15"/><path d="M5 29H20V5" stroke="#b9c2cd" stroke-width="12"/>';
    else if (kind === "tee") u += '<path d="M3 11H33M18 11V33" stroke="#4b5563" stroke-width="15"/><path d="M3 11H33M18 11V33" stroke="#b9c2cd" stroke-width="12"/>';
    else u += '<rect x="3" y="3" width="30" height="30" rx="3" fill="#eef1f5" stroke="#59636f" stroke-width="1.8"/><path d="M11 9L17 18L11 27M20 9L26 18L20 27" stroke="#6d7a89" stroke-width="1.6"/>';
    return u + "</g>";
  }
  function pipe(c, filled, extra) {
    var tiles = "", i;
    for (i = 0; i < 4; i++) {
      var y = TILE_Y[i], r = ROWS[i];
      tiles += '<g class="tile tile' + i + '"><rect x="8" y="' + y + '" width="196" height="58" rx="9" class="sc-card"/>' + glyph(r[0], 18, y + 11) +
        '<text x="62" y="' + (y + 24) + '" class="sc-t" font-size="13.5" font-weight="600">' + t("sc.el." + r[0]) + "</text>" +
        '<rect x="62" y="' + (y + 31) + '" width="' + (r[1].length * 9 + 14) + '" height="19" rx="5" class="sc-chip"/><text x="69" y="' + (y + 45) + '" class="sc-mono" font-size="13">' + r[1] + "</text>" +
        '<g class="res" opacity="' + (filled ? 1 : 0) + '"><path d="M150 ' + (y + 40) + 'h6" class="sc-ar"/><rect x="160" y="' + (y + 31) + '" width="' + (r[2].length * 9 + 14) + '" height="19" rx="5" fill="#14213D" stroke="#F2A93B" stroke-width="1.4"/><text x="167" y="' + (y + 45) + '" class="sc-mono" font-size="13" fill="#fff">' + r[2] + "</text></g></g>";
    }
    var box = function (cls, x, y, w, h, title, body) {
      return '<g class="bx ' + cls + '"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="10" class="sc-card"/><text x="' + (x + 12) + '" y="' + (y + 22) + '" class="sc-sub" font-size="12">' + title + "</text>" + body + "</g>";
    };
    var out = tiles +
      '<path class="flow f1" d="M208 ' + (TILE_Y[0] + 29) + 'C232 ' + (TILE_Y[0] + 29) + ' 236 160 262 160"/>' +
      box("b-src", 262, 124, 132, 72, t("sc.src"), '<rect x="274" y="154" width="92" height="30" rx="6" class="sc-chip"/><text x="284" y="175" class="sc-mono val" font-size="15" font-weight="700">' + (extra && extra.src || "ПК3") + "</text>") +
      '<path class="flow f2" d="M396 160H432"/>' +
      box("b-str", 432, 124, 150, 72, t("sc.strat"), '<text x="444" y="168" class="sc-t" font-size="14" font-weight="700">' + t("sc.simple") + '</text><text x="444" y="188" class="sc-mono" font-size="14" fill="#F2A93B">ПК → К</text>') +
      '<path class="flow f3 up" d="M584 160C610 160 614 94 640 94"/><path class="flow f3 dn" d="M584 160C610 160 614 244 640 244"/>' +
      box("b-tgt", 640, 56, 152, 76, t("sc.target"), '<text x="652" y="97" class="sc-mono" font-size="11.5">ADSK_Система_Имя</text><rect x="652" y="104" width="92" height="24" rx="6" class="sc-chip"/><text x="662" y="121" class="sc-mono val" font-size="15" font-weight="700">' + (filled ? "К3" : "") + "</text>") +
      box("b-srt", 640, 206, 152, 76, t("sc.sort"), '<text x="652" y="247" class="sc-mono" font-size="11.5">Unicode Сортування</text><rect x="652" y="254" width="92" height="24" rx="6" class="sc-chip"/><text x="662" y="271" class="sc-mono val" font-size="15" font-weight="700">' + (filled ? "▯К3" : "") + "</text>") +
      '<g class="tok" opacity="0"><rect x="-26" y="-13" width="52" height="26" rx="13" fill="#F2A93B"/><text x="0" y="5" text-anchor="middle" font-size="13" font-weight="700" fill="#14213D" class="sc-mono tt">ПК3</text></g>' +
      '<g class="tok tok2" opacity="0"><rect x="-26" y="-13" width="52" height="26" rx="13" fill="#F2A93B"/><text x="0" y="5" text-anchor="middle" font-size="13" font-weight="700" fill="#14213D" class="sc-mono tt2">К3</text></g>';
    return out;
  }
  function tok(c, sel, x, y, dur, op) {
    var e = c.q(sel); if (!e) return;
    e.style.transition = "transform " + (dur || 700) + "ms cubic-bezier(.45,0,.2,1), opacity .3s";
    e.style.transform = "translate(" + x + "px," + y + "px)"; e.setAttribute("opacity", op === undefined ? 1 : op);
  }
  function setText(c, sel, v) { var e = c.q(sel); if (e) e.textContent = v; }
  function panel(c, title, rows, x, y, w) {
    var h = 62 + rows.length * 26, s = '<g class="rep" opacity="0"><rect x="0" y="0" width="800" height="340" fill="#000" fill-opacity=".5"/>' +
      '<g transform="translate(' + (x) + " " + y + ')"><rect width="' + w + '" height="' + h + '" rx="8" class="sc-win"/><path d="M0 8a8 8 0 0 1 8-8H' + (w - 8) + 'a8 8 0 0 1 8 8V34H0Z" fill="#14213D"/>' +
      '<text x="16" y="23" fill="#fff" font-size="14" font-weight="700">' + title + "</text>";
    rows.forEach(function (r, i) {
      s += '<text x="18" y="' + (60 + i * 26) + '" class="sc-win-t" font-size="13">' + r[0] + '</text><text x="' + (w - 18) + '" y="' + (60 + i * 26) + '" text-anchor="end" class="sc-win-t" font-size="14" font-weight="700">' + r[1] + "</text>";
    });
    return s + "</g></g>";
  }

  SCENES.sm_fill = function (c) {
    c.draw(pipe(c, false) +
      panel(c, t("sc.rep.t"), [[t("sc.rep.found"), "128"], [t("sc.rep.tw"), "128"], [t("sc.rep.sw"), "128"], [t("sc.rep.skip"), "12"], [t("sc.rep.err"), "0"]], 250, 80, 300));
    var y0 = TILE_Y[0] + 29;
    c.status("sc.fill1"); c.on(".tile0", "act");
    tok(c, ".tok:not(.tok2)", 208, y0, 1, 0);
    c.at(300, function () { tok(c, ".tok:not(.tok2)", 208, y0, 1, 1); c.on(".f1", "run"); });
    c.at(900, function () { tok(c, ".tok:not(.tok2)", 326, 160, 800); c.on(".b-src", "act"); });
    c.at(1900, function () { c.status("sc.fill2"); tok(c, ".tok:not(.tok2)", 436, 160, 800); c.on(".b-str", "act"); c.on(".f2", "run"); });
    c.at(2800, function () { setText(c, ".tt", "К3"); c.on(".tok:not(.tok2)", "pop"); tok(c, ".tok:not(.tok2)", 584, 160, 900); });
    c.at(3300, function () {
      c.status("sc.fill3"); c.on(".f3", "run");
      tok(c, ".tok:not(.tok2)", 698, 116, 800); tok(c, ".tok2", 584, 160, 1, 1); setTimeout(function () { tok(c, ".tok2", 698, 266, 800); }, 30);
    });
    c.at(4150, function () {
      setText(c, ".b-tgt .val", "К3"); setText(c, ".b-srt .val", "▯К3"); c.on(".b-tgt", "act"); c.on(".b-srt", "act");
      c.q(".tok:not(.tok2)").setAttribute("opacity", 0); c.q(".tok2").setAttribute("opacity", 0);
      var rs = c.host.querySelectorAll(".res"); rs[0].setAttribute("opacity", 1);
      [1, 2, 3].forEach(function (k, i) { setTimeout(function () { rs[k].setAttribute("opacity", 1); c.on(".tile" + k, "act"); }, 250 * (i + 1)); });
    });
    c.at(5300, function () { c.status("sc.fill4"); c.q(".rep").setAttribute("opacity", 1); });
    c.total = 9500;
  };

  SCENES.sm_clear = function (c) {
    c.draw(pipe(c, true) +
      panel(c, t("sc.crep.t"), [[t("sc.rep.found"), "128"], [t("sc.crep.tc"), "128"], [t("sc.crep.sc"), "128"], [t("sc.crep.empty"), "0"], [t("sc.rep.skip"), "12"]], 250, 80, 300));
    ["b-src", "b-str", "b-tgt", "b-srt"].forEach(function (k) { c.on("." + k, "act"); });
    c.status("sc.clr1");
    c.at(900, function () { setText(c, ".b-tgt .val", ""); c.on(".b-tgt", "act", false); });
    c.at(1300, function () { setText(c, ".b-srt .val", ""); c.on(".b-srt", "act", false); });
    var rs = c.host.querySelectorAll(".res");
    [0, 1, 2, 3].forEach(function (k) { c.at(1700 + k * 350, function () { rs[k].setAttribute("opacity", 0); c.on(".tile" + k, "act", false); }); });
    c.at(3500, function () { c.status("sc.clr2"); c.q(".rep").setAttribute("opacity", 1); });
    c.total = 7500;
  };

  /* автоматический режим: апдейтер работает в фоне, кнопок и отчёта нет */
  SCENES.sm_auto = function (c) {
    c.draw(pipe(c, true) +
      '<g class="upd" opacity="0.35"><rect x="296" y="26" width="224" height="40" rx="20" class="sc-card"/><circle cx="322" cy="46" r="9" fill="none" stroke="#5BB6E8" stroke-width="2.2"/><circle cx="322" cy="46" r="3.5" fill="#5BB6E8"/>' +
      '<text x="342" y="51" class="sc-t" font-size="14" font-weight="600">' + t("sc.updater") + "</text><circle class=\"upd-dot\" cx=\"498\" cy=\"46\" r=\"5\" fill=\"#2f9e5f\"/></g>" +
      '<g class="newb" opacity="0"><rect x="150" y="' + (TILE_Y[3] + 2) + '" width="48" height="18" rx="9" fill="#5BB6E8"/><text x="174" y="' + (TILE_Y[3] + 15) + '" text-anchor="middle" font-size="11" font-weight="700" fill="#14213D">' + t("sc.new") + "</text></g>");
    var rs = c.host.querySelectorAll(".res"); rs[3].setAttribute("opacity", 0);
    setText(c, ".b-src .val", ""); setText(c, ".b-tgt .val", "К3"); setText(c, ".b-srt .val", "▯К3");
    c.q(".tile3").setAttribute("opacity", 0);
    c.status("sc.auto1");
    c.at(700, function () { c.q(".tile3").style.transition = "opacity .5s"; c.q(".tile3").setAttribute("opacity", 1); c.q(".newb").setAttribute("opacity", 1); });
    c.at(1600, function () { c.status("sc.auto2"); c.q(".upd").setAttribute("opacity", 1); c.on(".upd", "pulse"); setText(c, ".b-tgt .val", ""); setText(c, ".b-srt .val", ""); tok(c, ".tok:not(.tok2)", 208, TILE_Y[3] + 29, 1, 1); setText(c, ".tt", "ПК4"); });
    c.at(2000, function () { c.on(".f1", "run"); tok(c, ".tok:not(.tok2)", 326, 160, 600); setText(c, ".b-src .val", "ПК4"); c.on(".b-src", "act"); });
    c.at(2800, function () { tok(c, ".tok:not(.tok2)", 436, 160, 600); c.on(".b-str", "act"); });
    c.at(3500, function () { setText(c, ".tt", "К4"); tok(c, ".tok:not(.tok2)", 584, 160, 1, 1); tok(c, ".tok2", 584, 160, 1, 1); setText(c, ".tt2", "К4"); setTimeout(function () { tok(c, ".tok:not(.tok2)", 698, 116, 700); tok(c, ".tok2", 698, 266, 700); }, 30); c.on(".f3", "run"); });
    c.at(4350, function () {
      setText(c, ".b-tgt .val", "К4"); setText(c, ".b-srt .val", "▯К4"); c.on(".b-tgt", "act"); c.on(".b-srt", "act");
      c.q(".tok:not(.tok2)").setAttribute("opacity", 0); c.q(".tok2").setAttribute("opacity", 0);
      rs[3].setAttribute("opacity", 1); c.q(".newb").setAttribute("opacity", 0); c.on(".tile3", "act");
    });
    c.at(5000, function () { c.status("sc.auto3"); });
    c.total = 8500;
  };

  /* журнал запусков */
  SCENES.sm_jrn = function (c) {
    var rows = [["17:42:05", "sc.jrn.auto", "1", "#2f9e5f"], ["17:41:12", "sc.jrn.auto", "3", "#2f9e5f"], ["17:30:48", "sc.jrn.manual", "128", "#F2A93B"], ["17:12:30", "sc.jrn.clear", "128", "#e5484d"], ["16:58:03", "sc.jrn.manual", "126", "#F2A93B"]], s = "", i;
    for (i = 0; i < rows.length; i++) {
      var y = 74 + i * 46;
      s += '<g class="jr" opacity="0"><rect x="120" y="' + y + '" width="560" height="38" rx="9" class="sc-card"/><circle cx="146" cy="' + (y + 19) + '" r="6" fill="' + rows[i][3] + '"/>' +
        '<text x="166" y="' + (y + 24) + '" class="sc-mono" font-size="14">' + rows[i][0] + '</text><text x="270" y="' + (y + 24) + '" class="sc-t" font-size="14" font-weight="600">' + t(rows[i][1]) + '</text>' +
        '<text x="660" y="' + (y + 24) + '" text-anchor="end" class="sc-t" font-size="14"><tspan font-weight="700">' + rows[i][2] + "</tspan> " + t("sc.jrn.n") + "</text></g>";
    }
    c.draw('<text x="120" y="42" class="sc-t" font-size="17" font-weight="700">' + t("sc.jrn.t") + '</text><text x="120" y="60" class="sc-sub" font-size="12.5">' + t("sc.jrn1") + "</text>" + s);
    c.status("");
    var rs = c.host.querySelectorAll(".jr");
    [0, 1, 2, 3, 4].forEach(function (k) { c.at(300 + k * 450, function () { rs[k].setAttribute("opacity", 1); }); });
    c.total = 5000;
  };

  /* ---------- Air Point: вид воздухораспределителя подбирается по сети ---------- */
  H.addStrings({
    uk: {
      "sc.ap.sup": "Приплив", "sc.ap.exh": "Витяжка", "sc.ap.kind": "Вид:", "sc.ap.scene": "Сцена:", "sc.ap.auto": "Авто",
      "sc.ap.k.sup": "Припливний", "sc.ap.k.ext": "Витяжний", "sc.ap.k.exh": "Викидний", "sc.ap.k.int": "Повітрозабірний",
      "sc.ap.m.sup": "Приплив", "sc.ap.m.int": "Забір", "sc.ap.m.ext": "Витяжка", "sc.ap.m.exh": "Викид",
      "sc.ap.flow": "Витрата, м³/год", "sc.ap.flowauto": "Витрата: з мережі автоматично", "sc.ap.unit": "м³/год",
      "sc.ap.s0": "Дві мережі: вентилятор, повітроводи, повітророзподільники. На вільні кінці поставимо Air Point",
      "sc.ap.s1": "Кінець зі сторони вулиці, за ним вентилятор. Вид — повітрозабірний. Витрата сама: сума всіх повітророзподільників, 300 + 200 = 500",
      "sc.ap.s2": "Спершу — кінець відгалуження зі сторони приміщення. Вид — припливний, вводимо витрату",
      "sc.ap.s3": "Витяжна система, кінець за вентилятором зі сторони вулиці. Вид — викидний. Витрата сама: 300 + 200 = 500",
      "sc.ap.s4": "Витяжна система, кінець зі сторони приміщення. Вид — витяжний, вводимо витрату",
      "sc.ap.s5": "Умовне позначення показує напрямок повітря. Точки можна замінити справжніми повітророзподільниками пізніше"
    },
    en: {
      "sc.ap.sup": "Supply", "sc.ap.exh": "Exhaust", "sc.ap.kind": "Kind:", "sc.ap.scene": "Scene:", "sc.ap.auto": "Auto",
      "sc.ap.k.sup": "Supply", "sc.ap.k.ext": "Extract", "sc.ap.k.exh": "Exhaust", "sc.ap.k.int": "Outdoor air intake",
      "sc.ap.m.sup": "Supply", "sc.ap.m.int": "Intake", "sc.ap.m.ext": "Extract", "sc.ap.m.exh": "Exhaust",
      "sc.ap.flow": "Airflow, m³/h", "sc.ap.flowauto": "Airflow: from the network", "sc.ap.unit": "m³/h",
      "sc.ap.s0": "Two networks: a fan, ducts, air terminals. Air Point goes on the free ends",
      "sc.ap.s1": "An end on the outdoor side, a fan behind it. The kind is intake. The airflow fills itself: the sum of all terminals, 300 + 200 = 500",
      "sc.ap.s2": "First the end of the branch on the room side. The kind is supply, we type the airflow",
      "sc.ap.s3": "An exhaust system, the end behind the fan on the outdoor side. The kind is exhaust. The airflow fills itself: 300 + 200 = 500",
      "sc.ap.s4": "An exhaust system, the end on the room side. The kind is extract, we type the airflow",
      "sc.ap.s5": "The symbol shows the way of the air. The points can be replaced with real terminals later"
    },
    ru: {
      "sc.ap.sup": "Приток", "sc.ap.exh": "Вытяжка", "sc.ap.kind": "Вид:", "sc.ap.scene": "Сцена:", "sc.ap.auto": "Авто",
      "sc.ap.k.sup": "Приточный", "sc.ap.k.ext": "Вытяжной", "sc.ap.k.exh": "Выбросной", "sc.ap.k.int": "Воздухозаборный",
      "sc.ap.m.sup": "Приток", "sc.ap.m.int": "Забор", "sc.ap.m.ext": "Вытяжка", "sc.ap.m.exh": "Выброс",
      "sc.ap.flow": "Расход, м³/ч", "sc.ap.flowauto": "Расход: из сети автоматически", "sc.ap.unit": "м³/ч",
      "sc.ap.s0": "Две сети: вентилятор, воздуховоды, воздухораспределители. На свободные концы поставим Air Point",
      "sc.ap.s1": "Конец со стороны улицы, за ним вентилятор. Вид — воздухозаборный. Расход сам: сумма всех воздухораспределителей, 300 + 200 = 500",
      "sc.ap.s2": "Сначала — конец ответвления со стороны помещения. Вид — приточный, вводим расход",
      "sc.ap.s3": "Вытяжная система, конец за вентилятором со стороны улицы. Вид — выбросной. Расход сам: 300 + 200 = 500",
      "sc.ap.s4": "Вытяжная система, конец со стороны помещения. Вид — вытяжной, вводим расход",
      "sc.ap.s5": "Условное обозначение показывает направление воздуха. Точки можно заменить настоящими воздухораспределителями позже"
    }
  });
  /* вентилятор в плане: корпус, крыльчатка (вращается), стрелка потока над корпусом */
  function fan(x, y, flowDir, id) {
    var cx = x + 40, cy = y + 28, blades = "", k, ccw = flowDir < 0, ar = "";
    for (k = 0; k < 6; k++) blades += '<path d="M0 0Q9 -2 16 -12" transform="rotate(' + (k * 60) + ')" stroke="#4a5d82" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
    ar = flowDir > 0 ? "M" + (x + 22) + " " + (y - 9) + "H" + (x + 58) + "M" + (x + 51) + " " + (y - 14) + "L" + (x + 58) + " " + (y - 9) + "L" + (x + 51) + " " + (y - 4) :
      "M" + (x + 58) + " " + (y - 9) + "H" + (x + 22) + "M" + (x + 29) + " " + (y - 14) + "L" + (x + 22) + " " + (y - 9) + "L" + (x + 29) + " " + (y - 4);
    return '<g class="fan"><rect x="' + x + '" y="' + y + '" width="80" height="56" rx="8" fill="url(#' + id + 'eq)" stroke="#4a5d82" stroke-width="2"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="23" fill="#eef2f9" stroke="#4a5d82" stroke-width="1.6"/>' +
      '<g class="imp' + (ccw ? " ccw" : "") + '"><g transform="translate(' + cx + " " + cy + ')"><circle r="18" fill="none" stroke="none"/>' + blades + '<circle r="3.4" fill="#4a5d82"/></g></g>' +
      '<g class="air' + (ccw ? " ex" : "") + '" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="' + ar + '"/></g></g>';
  }
  /* условное обозначение на свободном конце: линия, треугольник (основание у линии, если воздух уходит из воздуховода) и точка на коннекторе */
  function ugo(cls, x, y, ox, oy, leaves) {
    var S = 12, W = 17, Hh = 30, px = -oy, py = ox, e1x = x + ox * S, e1y = y + oy * S, bx = leaves ? e1x : e1x + ox * Hh, by = leaves ? e1y : e1y + oy * Hh,
      ax = leaves ? e1x + ox * Hh : e1x, ay = leaves ? e1y + oy * Hh : e1y;
    return '<g class="ugo ' + cls + '" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M' + x + " " + y + "L" + e1x + " " + e1y +
      "M" + (bx - px * W) + " " + (by - py * W) + "L" + (bx + px * W) + " " + (by + py * W) +
      "M" + (bx - px * W) + " " + (by - py * W) + "L" + ax + " " + ay + "L" + (bx + px * W) + " " + (by + py * W) + '"/>' +
      '<path class="plate" d="M' + (x - px * 21) + " " + (y - py * 21) + "L" + (x + px * 21) + " " + (y + py * 21) + '"/><circle cx="' + x + '" cy="' + y + '" r="2.8" class="dot"/></g>';
  }
  /* расход точек: забор и выброс несут сумму всех воздухораспределителей сети (300 у настоящего + 200 у точки на ответвлении) */
  var FL = { A: "500", B: "200", C: "500", D: "200" };
  function pill(n, x, y) {
    return '<g class="fl fl' + n + '" opacity="0"><rect x="' + x + '" y="' + y + '" width="146" height="30" rx="15" class="sc-card" style="stroke:#F2A93B;stroke-width:2"/>' +
      '<text x="' + (x + 73) + '" y="' + (y + 21) + '" text-anchor="middle" class="sc-mono" font-size="16" font-weight="700">' + (n === "A" || n === "C" ? "Σ " : "") + FL[n] + " " + t("sc.ap.unit") + "</text></g>";
  }
  /* какие точки показывает режим: авто — все по очереди, остальные — одна точка (для забора и выброса остальные точки сети уже стоят) */
  var AP_MODES = { auto: ["B", "A", "D", "C"], sup: ["B"], int: ["A"], ext: ["D"], exh: ["C"] };
  var AP_PRE = { int: ["B"], exh: ["D"] };
  SCENES.ap = function (c) {
    var id = c.id, supCy = 88, exhCy = 262, air, mode = c.host.__apMode || "auto", list = AP_MODES[mode] || AP_MODES.auto;
    function branchV(x, y0, y1) {
      return '<rect x="' + x + '" y="' + y0 + '" width="40" height="' + (y1 - y0) + '" fill="url(#' + id + 'dg)" stroke="#4b5563" stroke-width="1.4"/>';
    }
    /* точки сцены: куда щёлкаем, какой вид, какой из двух видов нажат, расход набирается или берётся из сети */
    var VIS = {
      B: { x: 390, y: 20, s: "sc.ap.s2", a: "sup", b: "int", hi: 0, auto: false },
      A: { x: 70, y: supCy, s: "sc.ap.s1", a: "sup", b: "int", hi: 1, auto: true },
      D: { x: 390, y: 332, s: "sc.ap.s4", a: "ext", b: "exh", hi: 0, auto: false },
      C: { x: 70, y: exhCy, s: "sc.ap.s3", a: "ext", b: "exh", hi: 1, auto: true }
    };
    /* стрелки потока: приток вправо и вверх по ответвлению, вытяжка влево и вверх по ответвлению */
    air = '<g class="air" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' + arrow(92, supCy, 1, 0, 42) + arrow(262, supCy, 1, 0, 50) + arrow(460, supCy, 1, 0, 50) + arrow(390, 56, 0, -1, 24) + "</g>" +
      '<g class="air ex" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' + arrow(138, exhCy, -1, 0, 42) + arrow(330, exhCy, -1, 0, 50) + arrow(500, exhCy, -1, 0, 50) + arrow(390, 322, 0, -1, 30) + "</g>";
    c.draw(
      '<text x="70" y="40" class="sc-sub" font-size="18" font-weight="700">' + t("sc.ap.sup") + "</text>" +
      duct(70, supCy - 20, 80, 40, "l", id) + fan(150, supCy - 28, 1, id) + duct(230, supCy - 20, 300, 40, "r", id) + branchV(370, 20, supCy - 20) +
      '<rect x="367" y="20" width="46" height="8" rx="2" fill="url(#' + id + 'dg)" stroke="#3b4350" stroke-width="1.4"/>' + diffuser(532, supCy - 30, 60, 60, id) +
      '<text x="70" y="214" class="sc-sub" font-size="18" font-weight="700">' + t("sc.ap.exh") + "</text>" +
      duct(70, exhCy - 20, 80, 40, "l", id) + fan(150, exhCy - 28, -1, id) + duct(230, exhCy - 20, 300, 40, "r", id) + branchV(370, exhCy + 20, 332) +
      '<rect x="367" y="324" width="46" height="8" rx="2" fill="url(#' + id + 'dg)" stroke="#3b4350" stroke-width="1.4"/>' + diffuser(532, exhCy - 30, 60, 60, id) +
      air +
      ugo("pv pA", 70, supCy, -1, 0, false) + ugo("fn fA", 70, supCy, -1, 0, false) +
      ugo("pv pB", 390, 20, 0, -1, true) + ugo("fn fB", 390, 20, 0, -1, true) +
      ugo("pv pC", 70, exhCy, -1, 0, true) + ugo("fn fC", 70, exhCy, -1, 0, true) +
      ugo("pv pD", 390, 332, 0, 1, false) + ugo("fn fD", 390, 332, 0, 1, false) +
      /* расход настоящих воздухораспределителей и подписи расхода у точек */
      '<text x="562" y="' + (supCy + 66) + '" text-anchor="middle" class="sc-note" font-size="15" font-weight="600">300 ' + t("sc.ap.unit") + '</text>' +
      '<text x="562" y="' + (exhCy + 66) + '" text-anchor="middle" class="sc-note" font-size="15" font-weight="600">300 ' + t("sc.ap.unit") + '</text>' +
      pill("A", 14, supCy + 30) + pill("B", 424, -12) + pill("C", 14, exhCy + 30) + pill("D", 424, 344) +
      /* окно ввода расхода: одно на все точки, заголовок и поле меняются перед показом */
      '<g class="fw" opacity="0"><rect x="176" y="106" width="330" height="118" rx="10" class="sc-card" style="stroke:#F2A93B;stroke-width:2.6"/><text x="196" y="136" class="sc-sub fwt" font-size="14" font-weight="600">' + t("sc.ap.flow") + '</text>' +
      '<rect x="196" y="150" width="180" height="50" rx="7" class="sc-chip fwf"/><text class="fwv sc-mono" x="210" y="184" font-size="24" font-weight="700"></text>' +
      '<rect class="fwok" x="392" y="150" width="90" height="50" rx="7" fill="#14213D" stroke="#F2A93B" stroke-width="2"/><text x="437" y="183" text-anchor="middle" font-size="20" font-weight="700" fill="#fff">OK</text></g>' +
      CUR, "0 -34 630 424");
    c.host.insertAdjacentHTML("beforeend", '<div class="apcap"></div>');
    /* виды-кнопки и выбор сцены стоят полосами над рисунком, а не поверх него */
    c.host.insertAdjacentHTML("afterbegin", '<div class="chips2 bar"><span>' + t("sc.ap.kind") + '</span><span class="c k0">&nbsp;</span><span class="c k1">&nbsp;</span></div>');
    if (!c.host.closest(".rv-stage")) {
      var sel = '<div class="apsel"><span>' + t("sc.ap.scene") + "</span>";
      [["auto", "sc.ap.auto"], ["sup", "sc.ap.m.sup"], ["int", "sc.ap.m.int"], ["ext", "sc.ap.m.ext"], ["exh", "sc.ap.m.exh"]].forEach(function (m) {
        sel += '<button type="button" class="apb' + (m[0] === mode ? " on" : "") + '" data-m="' + m[0] + '">' + t(m[1]) + "</button>";
      });
      c.host.insertAdjacentHTML("afterbegin", sel + "</div>");
      c.host.querySelectorAll(".apsel .apb").forEach(function (b) {
        b.addEventListener("click", function () {
          c.host.__apMode = b.dataset.m;
          c.host.dispatchEvent(new Event("scenerestart"));
        });
      });
    }
    var k0 = c.q(".chips2 .k0"), k1 = c.q(".chips2 .k1"), chips = c.q(".chips2");
    function kinds(a, b, hi) {
      k0.textContent = t("sc.ap.k." + a); k1.textContent = t("sc.ap.k." + b);
      k0.classList.toggle("hi", hi === 0); k1.classList.toggle("hi", hi === 1);
    }
    chips.style.opacity = 0;
    var cap = c.q(".apcap");
    function say(k) { cap.textContent = t(k); c.status(k); }
    function placed(n) { c.on(".f" + n, "on"); c.q(".fl" + n).setAttribute("opacity", 1); }
    /* клик по концу → окно с видом и вводом расхода (набор цифр, OK) → точка с подписью расхода */
    function visit(n, t0) {
      var v = VIS[n], flow = FL[n], fwv = c.q(".fwv"), fwt = c.q(".fwt"), fwf = c.q(".fwf");
      c.at(t0, function () { c.go(".cur", v.x, v.y); });
      c.at(t0 + 900, function () { c.on(".p" + n, "on"); kinds(v.a, v.b, v.hi); chips.style.opacity = 1; say(v.s); });
      c.at(t0 + 2300, function () {
        c.press(); fwv.textContent = ""; fwv.setAttribute("font-size", v.auto ? 19 : 24);
        fwt.textContent = t(v.auto ? "sc.ap.flowauto" : "sc.ap.flow"); fwf.style.opacity = v.auto ? 0.45 : 1;
        c.q(".fw").setAttribute("opacity", 1); c.q(".fwok").setAttribute("fill", "#14213D");
      });
      c.at(t0 + 2700, function () { c.go(".cur", 300, 214); });
      /* забор и выброс: поле заблокировано, сумма подтягивается сама; у остальных точек расход набирается */
      if (v.auto) c.at(t0 + 3000, function () { fwv.textContent = "Σ 300 + 200"; });
      else flow.split("").forEach(function (ch, i) { c.at(t0 + 3000 + i * 220, function () { fwv.textContent = flow.slice(0, i + 1); }); });
      c.at(t0 + 3800, function () { c.go(".cur", 437, 180); });
      c.at(t0 + 4400, function () { c.press(); c.q(".fwok").setAttribute("fill", "#F2A93B"); });
      c.at(t0 + 4800, function () { c.q(".fw").setAttribute("opacity", 0); c.on(".p" + n, "on", false); placed(n); });
    }
    say("sc.ap.s0"); c.go(".cur", 430, 190);
    (AP_PRE[mode] || []).forEach(placed);
    /* авто: сначала воздухораспределители с вводом расхода, потом забор и выброс с суммой, подтянутой автоматически */
    list.forEach(function (n, i) { visit(n, 700 + i * 5300); });
    if (list.length > 1) {
      c.at(700 + list.length * 5300, function () { c.go(".cur", 580, 190); chips.style.opacity = 0; say("sc.ap.s5"); });
      c.total = 700 + list.length * 5300 + 3500;
    } else {
      c.total = 700 + 5300 + 2000;
    }
  };

  /* ---------- по кругу, пока блок виден ---------- */
  function mount(host, name) {
    var visible = false, timer = 0, c;
    function run() {
      if (!visible) return;
      c = play(host, name);
      if (!c) return;
      timer = setTimeout(run, c.total + 2500);
    }
    function off() { clearTimeout(timer); stop(host); }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        var v = es[0].isIntersecting;
        if (v && !visible) { visible = true; run(); } else if (!v && visible) { visible = false; off(); }
      }, { threshold: 0.35 }).observe(host);
    } else { visible = true; run(); }
    H.onLang(function () { if (visible) { off(); run(); } });
    /* сцена просит начать заново (например, выбран другой режим) */
    host.addEventListener("scenerestart", function () { if (visible) { off(); run(); } });
  }
  document.querySelectorAll(".scene-host[data-scene]").forEach(function (h) { mount(h, h.dataset.scene); });

  window.HVAC.scenes = { play: play, stop: stop, mount: mount, has: function (n) { return !!SCENES[n]; } };
})();
