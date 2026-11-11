/* HVAC Stuff — интерактивный макет ленты Revit с демо команд.
   Кнопки, подписи, подсказки и панели берутся из ribbon-data.js, а он собирается из самого плагина (tools/make-site-assets.py):
   лента на сайте = лента в Revit. Значки — те же PNG, что в плагине (светлые для светлой темы Revit, тёмные для тёмной).
   Нужен <div id="revit-mount"></div> и site.js, ribbon-data.js, scenes.js перед этим файлом. */
(function () {
  var H = window.HVAC, t = H.t;
  var mount = document.getElementById("revit-mount"); if (!mount) return;
  H.addStrings({
 "uk": {
  "rb.d1": "Виділіть елементи, вкажіть дві межі",
  "rb.d2g": "Готово: проміжки між краями рівні",
  "rb.d2c": "Готово: кроки між осями рівні",
  "rb.dark": "Темна",
  "rb.light": "Світла",
  "rb.eyebrow": "Спробуйте",
  "rb.title": "Наша вкладка в Revit — натисніть кнопку",
  "rb.lead": "Це копія стрічки Revit (темна й світла теми), але лише з нашою вкладкою. Наведіть курсор — з’явиться підказка, як у Revit. Натисніть — побачите, що робить команда.",
  "rb.f1": "Натисніть F1 для довідки",
  "rb.s0": "Готово",
  "rb.q3": "Готово: гнучкий повітропровід створено",
  "rb.f1s": "Виберіть елемент із жорстким повітропроводом",
  "rb.f2s": "Готово: кінець повітропроводу замінено гнучким, 1500 мм",
  "rb.replay": "↻ Повторити",
  "rb.hint": "Натисніть кнопку на стрічці, щоб побачити, що робить команда. Кнопки налаштувань відкриваються в Revit."
 },
 "en": {
  "rb.d1": "Select the elements, pick two borders",
  "rb.d2g": "Done: the gaps between edges are equal",
  "rb.d2c": "Done: the steps between centers are equal",
  "rb.dark": "Dark",
  "rb.light": "Light",
  "rb.eyebrow": "Try it",
  "rb.title": "Our tab in Revit — press a button",
  "rb.lead": "This is a copy of the Revit ribbon (dark and light themes) with only our tab. Hover a button for a Revit-style tooltip. Press it to see what the command does.",
  "rb.f1": "Press F1 for more help",
  "rb.s0": "Ready",
  "rb.q3": "Done: flex duct created",
  "rb.f1s": "Pick an element with a rigid duct",
  "rb.f2s": "Done: duct end replaced by a flex duct, 1500 mm",
  "rb.replay": "↻ Replay",
  "rb.hint": "Press a button on the ribbon to see what the command does. The settings buttons open in Revit."
 },
 "ru": {
  "rb.d1": "Выделите элементы, укажите две границы",
  "rb.d2g": "Готово: зазоры между краями равны",
  "rb.d2c": "Готово: шаги между осями равны",
  "rb.dark": "Тёмная",
  "rb.light": "Светлая",
  "rb.eyebrow": "Попробуйте",
  "rb.title": "Наша вкладка в Revit — нажмите кнопку",
  "rb.lead": "Это копия ленты Revit (тёмная и светлая темы), но только с нашей вкладкой. Наведите курсор — появится подсказка, как в Revit. Нажмите — увидите, что делает команда.",
  "rb.f1": "Нажмите F1 для получения справки",
  "rb.s0": "Готово",
  "rb.q3": "Готово: гибкий воздуховод создан",
  "rb.f1s": "Выберите элемент с жёстким воздуховодом",
  "rb.f2s": "Готово: конец воздуховода заменён гибким, 1500 мм",
  "rb.replay": "↻ Повторить",
  "rb.hint": "Нажмите кнопку на ленте, чтобы увидеть, что делает команда. Кнопки настроек открываются в Revit."
 }
});
  var S = H.scenes, PANELS = window.RIBBON_PANELS || [];
  function button(b) {
    return '<button class="rv-btn' + (S.has(b.cmd) ? "" : " off") + '" data-cmd="' + b.cmd + '" data-tip="' + b.tip + '" type="button">' +
      '<img data-icon="' + b.icon + '" alt="" width="32" height="32"><span class="l" data-i18n-html="' + b.text + '"></span></button>';
  }
  var ribbon = PANELS.map(function (p) {
    return '<div class="rv-group">' + p.buttons.map(button).join("") + '<span class="ttl" data-i18n="' + p.title + '"></span></div>';
  }).join('<div class="rv-sep"></div>');
  mount.innerHTML = '<div class="revit" id="revit">' +
    '<div class="rv-bar"><i></i><i></i><i></i><div class="rv-theme" id="rvtheme" role="group" aria-label="Revit"><button type="button" data-th="dark" aria-pressed="true" data-i18n="rb.dark"></button><button type="button" data-th="light" aria-pressed="false" data-i18n="rb.light"></button></div></div>' +
    '<div class="rv-tabs"><span class="rv-tab">HVAC Stuff</span></div>' +
    '<div class="rv-ribbon">' + ribbon + '</div>' +
    '<div class="rv-tip" id="rvtip" role="tooltip"></div>' +
    '<div class="rv-stage" id="stage"><div class="scene-host" id="scenehost" hidden></div><div class="pane on" id="pane-hint"><p class="hint-p" data-i18n="rb.hint"></p></div>' +
    '<button class="replay" id="replay" type="button" data-i18n="rb.replay" hidden></button></div>' +
    '<div class="rv-status"><span id="rvstatus"></span><span>HVAC Stuff</span></div></div>';
  H.apply();
  var rv = document.getElementById("revit"), stage = document.getElementById("stage"), host = document.getElementById("scenehost"), hint = document.getElementById("pane-hint");
  var tip = document.getElementById("rvtip"), stat = document.getElementById("rvstatus"), replay = document.getElementById("replay"), cmd = "", tipT = 0;

  function show(c) {
    cmd = c;
    rv.querySelectorAll(".rv-btn").forEach(function (b) { b.classList.toggle("on", b.dataset.cmd === c); });
    S.stop(host);
    var isScene = S.has(c);
    host.hidden = !isScene; replay.hidden = !isScene; hint.classList.toggle("on", !isScene);
    stat.textContent = t("rb.s0");
    if (isScene) S.play(host, c, function (txt) { stat.textContent = txt || t("rb.s0"); });
  }
  function tipShow(b) {
    var name = b.querySelector(".l").textContent.replace(/\s+/g, " ").trim(), txt = t(b.dataset.tip);
    tip.innerHTML = "<b>" + name + "</b>" + txt + '<hr><span class="f1">' + t("rb.f1") + "</span>";
    var rr = rv.getBoundingClientRect(), br = b.getBoundingClientRect();
    tip.style.left = Math.max(6, Math.min(br.left - rr.left, rr.width - 280)) + "px";
    tip.style.top = (br.bottom - rr.top + 6) + "px";
    tip.classList.add("on");
  }
  function tipHide() { clearTimeout(tipT); tip.classList.remove("on"); }
  rv.querySelectorAll(".rv-btn").forEach(function (b) {
    b.addEventListener("mouseenter", function () { clearTimeout(tipT); tipT = setTimeout(function () { tipShow(b); }, 350); });
    b.addEventListener("mouseleave", tipHide);
    b.addEventListener("focus", function () { tipShow(b); });
    b.addEventListener("blur", tipHide);
    b.addEventListener("click", function () { tipHide(); if (!b.classList.contains("off")) show(b.dataset.cmd); });
  });
  function setTheme(th) {
    rv.dataset.theme = th;
    document.querySelectorAll("#rvtheme button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.th === th); });
    rv.querySelectorAll("img[data-icon]").forEach(function (i) { i.src = "img/icons/" + i.dataset.icon + "-" + (th === "dark" ? "Dark" : "Light") + ".png"; });
  }
  document.getElementById("rvtheme").addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) setTheme(b.dataset.th); });
  window.rvTheme = setTheme;                      // вызывается из переключателя темы сайта
  setTheme(H.scheme());
  replay.addEventListener("click", function () { show(cmd); });
  /* панель не уже своего названия, как в Revit */
  function fit() {
    rv.querySelectorAll(".rv-group").forEach(function (g) { g.style.minWidth = ""; g.style.justifyContent = "center"; g.style.minWidth = (g.querySelector(".ttl").scrollWidth + 24) + "px"; });
  }
  H.onLang(function () { fit(); if (S.has(cmd)) show(cmd); else stat.textContent = t("rb.s0"); });
  window.addEventListener("load", fit);
})();
