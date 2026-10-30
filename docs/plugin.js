/* HVAC Stuff — карточки «Чому саме так» и ролики на страницах плагинов (QuickFlexConnect, FlexTail, Distribute).
   Карточки: <div class="grid3" data-feat="f1 f2 f3"></div>. Нужен <div class="tabs" id="vtabs"></div><div class="vids" id="vids" data-groups="qfc,common"></div>.
   Чтобы подключить видео, пропишите src (mp4 из релиза «media»), подпись вшита в видео (en, uk, ru). */
(function () {
  var H = window.HVAC, box = document.getElementById("vids"), tabs = document.getElementById("vtabs");
  H.addStrings({
    uk: {
      "feat.eyebrow": "Чому саме так", "feat.title": "Менше рутини — більше проєктування", "feat.lead": "Надбудова бере на себе дрібні операції й робить їх передбачуваними.",
      "f1.t": "Точний вибір конектора", "f1.p": "Підсвічується той конектор, що найближче до курсора на екрані — навіть серед восьми врізок камери.",
      "f2.t": "Видно майбутню гофру", "f2.p": "Контур під курсором, а у вікні — справжній гнучкий повітровід, що перебудовується при кожній зміні.",
      "f3.t": "Зрозумілі повідомлення", "f3.p": "Що сталося, чому й що робити — з посиланням на елемент, кнопками «Копіювати» та «Відкрити журнал».",
      "f4.t": "План, розріз, 3D", "f4.p": "Працює на планах, розрізах і 3D-видах без перспективи. Де не має сенсу — кнопки сірі.",
      "f5.t": "Три мови", "f5.p": "Українська, англійська, російська. Мова змінюється в налаштуваннях і діє одразу, разом зі стрічкою.",
      "f6.t": "Швидкий запуск", "f6.p": "Revit стартує, як і раніше: важке завантажується лише при першому натисканні.",
      "vid.eyebrow": "Відео", "vid.title": "Подивіться, як це працює", "vid.lead": "Кожен ролик — одна функція. Пояснення на екрані — одразу трьома мовами: англійською, українською, російською.",
      "more.eyebrow": "Також у наборі", "more.title": "Інші плагіни HVAC Stuff"
    },
    en: {
      "feat.eyebrow": "Why it feels different", "feat.title": "Less routine, more design", "feat.lead": "The add-in takes the small chores off your hands and makes them predictable.",
      "f1.t": "Precise connector pick", "f1.p": "The connector nearest to the cursor on screen is highlighted, even among eight taps of a plenum.",
      "f2.t": "See the flex before it exists", "f2.p": "An outline follows the cursor; the window shows the real flex duct, rebuilt on every change.",
      "f3.t": "Messages that explain", "f3.p": "What happened, why, and what to do, with a link to the element, Copy, and Open log buttons.",
      "f4.t": "Plan, section, 3D", "f4.p": "Works on plans, sections, and non-perspective 3D views. Where it makes no sense, the buttons are gray.",
      "f5.t": "Three languages", "f5.p": "English, Ukrainian, Russian. Change it in Settings; it applies at once, including the ribbon.",
      "f6.t": "Fast start", "f6.p": "Revit starts as before: the heavy parts load on the first click only.",
      "vid.eyebrow": "Videos", "vid.title": "See it in action", "vid.lead": "One video, one feature. The on-screen notes come in three languages at once: English, Ukrainian, Russian.",
      "more.eyebrow": "Also in the set", "more.title": "Other HVAC Stuff plugins"
    },
    ru: {
      "feat.eyebrow": "Чем удобно", "feat.title": "Меньше рутины — больше проектирования", "feat.lead": "Надстройка берёт на себя мелкие операции и делает их предсказуемыми.",
      "f1.t": "Точный выбор коннектора", "f1.p": "Подсвечивается коннектор, ближайший к курсору на экране, даже среди восьми врезок камеры.",
      "f2.t": "Будущая гофра видна заранее", "f2.p": "Контур под курсором, а в окне — настоящий гибкий воздуховод, перестраивающийся при каждом изменении.",
      "f3.t": "Понятные сообщения", "f3.p": "Что произошло, почему и что делать — со ссылкой на элемент и кнопками «Копировать» и «Открыть журнал».",
      "f4.t": "План, разрез, 3D", "f4.p": "Работает на планах, разрезах и 3D-видах без перспективы. Где не имеет смысла — кнопки серые.",
      "f5.t": "Три языка", "f5.p": "Украинский, английский, русский. Язык меняется в настройках и действует сразу, вместе с лентой.",
      "f6.t": "Быстрый запуск", "f6.p": "Revit стартует как раньше: тяжёлое загружается только при первом нажатии.",
      "vid.eyebrow": "Видео", "vid.title": "Посмотрите, как это работает", "vid.lead": "Каждый ролик — одна функция. Пояснения на экране — сразу на трёх языках: английском, украинском, русском.",
      "more.eyebrow": "Также в наборе", "more.title": "Другие плагины HVAC Stuff"
    }
  });
  var ICONS = { f1: "target", f2: "eye", f3: "chat", f4: "layers", f5: "globe", f6: "bolt" };
  document.querySelectorAll("[data-feat]").forEach(function (g) {
    g.innerHTML = g.dataset.feat.split(" ").map(function (k) {
      return '<div class="card"><div class="ico"><svg><use href="#i-' + ICONS[k] + '"/></svg></div><h3 data-i18n="' + k + '.t"></h3><p data-i18n="' + k + '.p"></p></div>';
    }).join("");
  });
  H.apply();
  if (!box) return;
  H.addStrings({
    uk: { "vid.all": "Усі", "vid.soon": "Незабаром", "vid.common": "Загальне" },
    en: { "vid.all": "All", "vid.soon": "Coming soon", "vid.common": "General" },
    ru: { "vid.all": "Все", "vid.soon": "Скоро", "vid.common": "Общее" }
  });
  var VIDEOS = [
    { id: "V1", grp: "common", src: null, title: { uk: "Налаштування й «Про програму»", en: "Settings and About", ru: "Настройки и «О программе»" }, text: { uk: "Мова, колір і вигляд гофри при перегляді, перевірка оновлень.", en: "Language, preview color and look, update check.", ru: "Язык, цвет и вид гофры при просмотре, проверка обновлений." } },
    { id: "V2", grp: "qfc", src: null, title: { uk: "План, розріз і 3D", en: "Plan, section, and 3D", ru: "План, разрез и 3D" }, text: { uk: "Штатна команда на розрізі недоступна, наша — працює в кожному вигляді.", en: "The built-in command is unavailable on a section; ours works in every view.", ru: "Штатная команда на разрезе недоступна, наша — работает в каждом виде." } },
    { id: "V3", grp: "qfc", src: null, title: { uk: "Камера статичного тиску", en: "Static-pressure plenum", ru: "Камера статического давления" }, text: { uk: "Серія патрубків поспіль; вікно вибору — лише вперше.", en: "A series of taps in a row; the size window appears only once.", ru: "Серия патрубков подряд; окно выбора — только в первый раз." } },
    { id: "V4", grp: "qfc", src: null, title: { uk: "Вікно вибору розміру", en: "The size window", ru: "Окно выбора размера" }, text: { uk: "Свій діаметр — і два переходи будуються наживо.", en: "Your own diameter, and two transitions are built live.", ru: "Свой диаметр — и два перехода строятся вживую." } },
    { id: "V5", grp: "qfc", src: null, title: { uk: "Різні діаметри й елементи", en: "Different diameters and elements", ru: "Разные диаметры и элементы" }, text: { uk: "Вентилятор, дросель-клапан, розподільник — переходи ставляться самі.", en: "Fan, damper, terminal; transitions are added by themselves.", ru: "Вентилятор, дроссель-клапан, распределитель — переходы ставятся сами." } },
    { id: "V6", grp: "qfc", src: null, title: { uk: "Типи гнучкого повітроводу", en: "Flex duct types", ru: "Типы гибкого воздуховода" }, text: { uk: "Утеплений тип і режим «з зразка» в моделі.", en: "An insulated type and the “from a sample” mode.", ru: "Утеплённый тип и режим «с образца» в модели." } },
    { id: "V7", grp: "ft", src: null, title: { uk: "Будь-які категорії", en: "Any category", ru: "Любые категории" }, text: { uk: "Камера, обладнання, деталі: там, де штатна команда відмовляє.", en: "Plenum, equipment, fittings: where the built-in command refuses.", ru: "Камера, оборудование, детали: там, где штатная команда отказывает." } },
    { id: "V8", grp: "ft", src: null, title: { uk: "Довжина, «Вся ділянка», цикл", en: "Length, whole segment, loop", ru: "Длина, «Весь участок», цикл" }, text: { uk: "Швидкі значення, своя довжина, заміна ділянки цілком.", en: "Quick values, a custom length, replacing a whole segment.", ru: "Быстрые значения, своя длина, замена участка целиком." } },
    { id: "V9", grp: "common", src: null, title: { uk: "Зрозумілі повідомлення", en: "Messages that explain", ru: "Понятные сообщения" }, text: { uk: "Вікно замість помилки Revit: посилання на елемент, «Копіювати», журнал.", en: "A window instead of a Revit error: element link, Copy, log.", ru: "Окно вместо ошибки Revit: ссылка на элемент, «Копировать», журнал." } }
  ];
  var groups = box.dataset.groups.split(","), filter = "all";
  function label(g) { return g === "all" ? H.t("vid.all") : g === "qfc" ? H.t("qfc.name") : g === "ft" ? H.t("ft.name") : H.t("vid.common"); }
  function render() {
    var l = H.lang();
    tabs.innerHTML = ["all"].concat(groups).map(function (g) {
      return '<button type="button" data-g="' + g + '" aria-pressed="' + (g === filter) + '">' + label(g) + "</button>";
    }).join("");
    box.innerHTML = VIDEOS.filter(function (v) { return groups.indexOf(v.grp) >= 0 && (filter === "all" || v.grp === filter); }).map(function (v) {
      var screen = v.src
        ? '<video controls preload="metadata" playsinline src="' + v.src + '"></video>'
        : '<div class="ph"><div class="play"></div></div><span class="soon">' + H.t("vid.soon") + '</span><span class="tag">' + v.id + " · " + label(v.grp) + "</span>";
      return '<article class="vid"><div class="screen">' + screen + '</div><div class="body"><h4>' + v.title[l] + "</h4><p>" + v.text[l] + "</p></div></article>";
    }).join("");
  }
  tabs.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) { filter = b.dataset.g; render(); } });
  H.onLang(render);
})();
