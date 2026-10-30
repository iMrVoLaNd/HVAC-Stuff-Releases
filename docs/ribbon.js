/* HVAC Stuff — интерактивный макет ленты Revit с демо команд (QuickFlexConnect, FlexTail, Distribute).
   Нужен <div id="revit-mount" data-start="qfc|ft|dhg"></div> и site.js перед этим файлом. */
(function () {
  var H = window.HVAC, t = H.t;
  var mount = document.getElementById("revit-mount"); if (!mount) return;
  H.addStrings({"uk":{"rb.g3":"Розстановка","rb.dhg":"Горизонт.<br>проміжки","rb.dhc":"Горизонт.<br>осі","rb.dvg":"Вертик.<br>проміжки","rb.dvc":"Вертик.<br>осі","rb.tip.dhg":"Горизонтальні проміжки — розставляє виділені елементи вздовж горизонталі виду так, щоб проміжки між їхніми краями були рівні. Дві точки — межі вільного місця. Shift — розміри, Ctrl — вирівняти, Alt — вільні точки.","rb.tip.dhc":"Горизонтальні осі — розставляє виділені елементи вздовж горизонталі виду так, щоб відстані між їхніми центрами були рівні. Shift — розміри, Ctrl — вирівняти, Alt — вільні точки.","rb.tip.dvg":"Вертикальні проміжки — розставляє виділені елементи вздовж вертикалі виду так, щоб проміжки між їхніми краями були рівні. Дві точки — межі вільного місця. Shift — розміри, Ctrl — вирівняти, Alt — вільні точки.","rb.tip.dvc":"Вертикальні осі — розставляє виділені елементи вздовж вертикалі виду так, щоб відстані між їхніми центрами були рівні. Shift — розміри, Ctrl — вирівняти, Alt — вільні точки.","rb.d1":"Виділіть елементи, вкажіть дві межі","rb.d2g":"Готово: проміжки між краями рівні","rb.d2c":"Готово: кроки між осями рівні","rb.dark":"Темна","rb.light":"Світла","rb.eyebrow":"Спробуйте","rb.title":"Наша вкладка в Revit — натисніть кнопку","rb.lead":"Це копія стрічки Revit (темна й світла теми), але лише з нашою вкладкою. Наведіть курсор — з’явиться підказка, як у Revit. Натисніть — побачите, що робить команда.","rb.g1":"Повітропроводи","rb.g2":"Програма","rb.qfc":"З’єднати<br>гофрою","rb.ft":"Врізати<br>гофру","rb.set":"Налаштування","rb.about":"Про програму","rb.f1":"Натисніть F1 для довідки","rb.s0":"Готово","rb.q1":"Виберіть перший конектор","rb.q2":"Виберіть другий конектор","rb.q3":"Готово: гнучкий повітропровід створено","rb.f1s":"Виберіть елемент із жорстким повітропроводом","rb.f2s":"Готово: кінець повітроводу замінено гнучким, 1500 мм","rb.replay":"↻ Повторити","rb.len":"Довжина, мм","rb.set.lang":"Мова","rb.set.color":"Колір гофри","rb.set.hint":"Мова змінюється одразу — спробуйте. Колір фарбує гофру в демонстрації.","rb.about.upd":"Перевірити оновлення","rb.about.ok":"Остання версія: ","rb.tip.qfc":"З’єднати гофрою — гнучкий повітропровід між двома конекторами за два кліки. Однакові розміри — одразу, різні — вікно з розміром і живим переглядом. Серія пар до Esc.","rb.tip.ft":"Врізати гофру — кінець жорсткого повітроводу біля елемента стає гнучким. Швидкі значення 500–2500 мм, «Вся ділянка», серія елементів.","rb.tip.set":"Налаштування — мова інтерфейсу, колір і вигляд гнучкого повітроводу при попередньому перегляді, параметри кожної команди.","rb.tip.about":"Про програму — версія й перевірка оновлень, посібники, папка з налаштуваннями й журналами, автор, ліцензія та подяки."},"en":{"rb.g3":"Distribute","rb.dhg":"Horizontal<br>Gaps","rb.dhc":"Horizontal<br>Centers","rb.dvg":"Vertical<br>Gaps","rb.dvc":"Vertical<br>Centers","rb.tip.dhg":"Horizontal Gaps — spreads the selected elements along the horizontal of the view so that the gaps between their edges are equal. The two points are the borders of the free space. Shift: dimensions, Ctrl: align, Alt: free points.","rb.tip.dhc":"Horizontal Centers — spreads the selected elements along the horizontal of the view so that the distances between their centers are equal. Shift: dimensions, Ctrl: align, Alt: free points.","rb.tip.dvg":"Vertical Gaps — spreads the selected elements along the vertical of the view so that the gaps between their edges are equal. The two points are the borders of the free space. Shift: dimensions, Ctrl: align, Alt: free points.","rb.tip.dvc":"Vertical Centers — spreads the selected elements along the vertical of the view so that the distances between their centers are equal. Shift: dimensions, Ctrl: align, Alt: free points.","rb.d1":"Select the elements, pick two borders","rb.d2g":"Done: the gaps between edges are equal","rb.d2c":"Done: the steps between centers are equal","rb.dark":"Dark","rb.light":"Light","rb.eyebrow":"Try it","rb.title":"Our tab in Revit — press a button","rb.lead":"This is a copy of the Revit ribbon (dark and light themes) with only our tab. Hover a button for a Revit-style tooltip. Press it to see what the command does.","rb.g1":"Ductwork","rb.g2":"Program","rb.qfc":"Quick Flex<br>Connect","rb.ft":"Flex<br>Tail","rb.set":"Settings","rb.about":"About","rb.f1":"Press F1 for more help","rb.s0":"Ready","rb.q1":"Pick the first connector","rb.q2":"Pick the second connector","rb.q3":"Done: flex duct created","rb.f1s":"Pick an element with a rigid duct","rb.f2s":"Done: duct end replaced by a flex duct, 1500 mm","rb.replay":"↻ Replay","rb.len":"Length, mm","rb.set.lang":"Language","rb.set.color":"Flex duct color","rb.set.hint":"The language changes at once, try it. The color paints the flex duct in the demo.","rb.about.upd":"Check for updates","rb.about.ok":"Latest version: ","rb.tip.qfc":"Quick FlexConnect — a flex duct between two connectors in two clicks. Equal sizes: built at once; different sizes: a window with the size and a live preview. Series of pairs until Esc.","rb.tip.ft":"Flex Tail — the end of a rigid duct at an element becomes flex. Quick lengths 500–2500 mm, the whole segment, a series of elements.","rb.tip.set":"Settings — interface language, preview color, the look of the flex duct during preview, and the options of each command.","rb.tip.about":"About — the version and the update check, the user guides, the folder with settings and logs, the author, the license, and the credits."},"ru":{"rb.g3":"Расстановка","rb.dhg":"Горизонт.<br>зазоры","rb.dhc":"Горизонт.<br>оси","rb.dvg":"Вертик.<br>зазоры","rb.dvc":"Вертик.<br>оси","rb.tip.dhg":"Горизонтальные зазоры — расставляет выделенные элементы вдоль горизонтали вида так, чтобы зазоры между их краями были равны. Две точки — границы свободного места. Shift — размеры, Ctrl — выровнять, Alt — свободные точки.","rb.tip.dhc":"Горизонтальные оси — расставляет выделенные элементы вдоль горизонтали вида так, чтобы расстояния между их центрами были равны. Shift — размеры, Ctrl — выровнять, Alt — свободные точки.","rb.tip.dvg":"Вертикальные зазоры — расставляет выделенные элементы вдоль вертикали вида так, чтобы зазоры между их краями были равны. Две точки — границы свободного места. Shift — размеры, Ctrl — выровнять, Alt — свободные точки.","rb.tip.dvc":"Вертикальные оси — расставляет выделенные элементы вдоль вертикали вида так, чтобы расстояния между их центрами были равны. Shift — размеры, Ctrl — выровнять, Alt — свободные точки.","rb.d1":"Выделите элементы, укажите две границы","rb.d2g":"Готово: зазоры между краями равны","rb.d2c":"Готово: шаги между осями равны","rb.dark":"Тёмная","rb.light":"Светлая","rb.eyebrow":"Попробуйте","rb.title":"Наша вкладка в Revit — нажмите кнопку","rb.lead":"Это копия ленты Revit (тёмная и светлая темы), но только с нашей вкладкой. Наведите курсор — появится подсказка, как в Revit. Нажмите — увидите, что делает команда.","rb.g1":"Воздуховоды","rb.g2":"Программа","rb.qfc":"Соединить<br>гофрой","rb.ft":"Врезать<br>гофру","rb.set":"Настройки","rb.about":"О программе","rb.f1":"Нажмите F1 для получения справки","rb.s0":"Готово","rb.q1":"Выберите первый коннектор","rb.q2":"Выберите второй коннектор","rb.q3":"Готово: гибкий воздуховод создан","rb.f1s":"Выберите элемент с жёстким воздуховодом","rb.f2s":"Готово: конец воздуховода заменён гибким, 1500 мм","rb.replay":"↻ Повторить","rb.len":"Длина, мм","rb.set.lang":"Язык","rb.set.color":"Цвет гофры","rb.set.hint":"Язык меняется сразу — попробуйте. Цвет окрашивает гофру в демонстрации.","rb.about.upd":"Проверить обновления","rb.about.ok":"Последняя версия: ","rb.tip.qfc":"Соединить гофрой — гибкий воздуховод между двумя коннекторами за два клика. Одинаковые размеры — сразу, разные — окно с размером и живым предпросмотром. Серия пар до Esc.","rb.tip.ft":"Врезать гофру — конец жёсткого воздуховода у элемента становится гибким. Быстрые значения 500–2500 мм, «Весь участок», серия элементов.","rb.tip.set":"Настройки — язык интерфейса, цвет и вид гибкого воздуховода при предпросмотре, параметры каждой команды.","rb.tip.about":"О программе — версия и проверка обновлений, руководства, папка с настройками и журналами, автор, лицензия и благодарности."}});
  mount.innerHTML = "<div class=\"revit\" id=\"revit\">\n      <div class=\"rv-bar\"><i></i><i></i><i></i><div class=\"rv-theme\" id=\"rvtheme\" role=\"group\" aria-label=\"Revit\"><button type=\"button\" data-th=\"dark\" aria-pressed=\"true\" data-i18n=\"rb.dark\"></button><button type=\"button\" data-th=\"light\" aria-pressed=\"false\" data-i18n=\"rb.light\"></button></div></div>\n      <div class=\"rv-tabs\"><span class=\"rv-tab\">HVAC Stuff</span></div>\n      <div class=\"rv-ribbon\">\n        <div class=\"rv-group\">\n          <button class=\"rv-btn\" data-cmd=\"qfc\" type=\"button\">\n            <svg viewBox=\"0 0 32 32\" aria-hidden=\"true\"><path class=\"ink\" d=\"M1 4.5H9.5M1 13.5H9.5M9.5 3V15\"/><path class=\"ink\" d=\"M31 18.5H22.5M31 27.5H22.5M22.5 17V29\"/><path stroke=\"#F2A93B\" stroke-width=\"3\" d=\"M10.5 8.5H14C19 8.5 13 23.5 18 23.5H21.5\"/></svg>\n            <span class=\"l\" data-i18n-html=\"rb.qfc\"></span></button>\n          <button class=\"rv-btn\" data-cmd=\"ft\" type=\"button\">\n            <svg viewBox=\"0 0 32 32\" aria-hidden=\"true\"><path class=\"ink\" d=\"M1 11H9.5M1 21H9.5M9.5 9.5V22.5\"/><path stroke=\"#F2A93B\" stroke-width=\"3\" d=\"M10.5 16q1.84-7 3.67 0t3.67 0t3.66 0\"/><path class=\"blu\" d=\"M22.5 6V26H30V6ZM22.5 12H30M22.5 16H30M22.5 20H30\"/></svg>\n            <span class=\"l\" data-i18n-html=\"rb.ft\"></span></button>\n          <span class=\"ttl\" data-i18n=\"rb.g1\"></span>\n        </div>\n        <div class=\"rv-sep\"></div>\n        <div class=\"rv-group\">\n          <button class=\"rv-btn\" data-cmd=\"dhg\" type=\"button\">\n            <svg viewBox=\"0 0 32 32\" aria-hidden=\"true\"><path class=\"blu\" d=\"M2 11H7V25H2ZM12 11H20V25H12ZM25 11H30V25H25Z\"/>\n  \n  <path class=\"ink\" d=\"M7 6V9M12 6V9M7 7.5H12M20 6V9M25 6V9M20 7.5H25\"/></svg>\n            <span class=\"l\" data-i18n-html=\"rb.dhg\"></span></button>\n          <button class=\"rv-btn\" data-cmd=\"dhc\" type=\"button\">\n            <svg viewBox=\"0 0 32 32\" aria-hidden=\"true\"><path class=\"blu\" d=\"M3 11H8V25H3ZM12 11H20V25H12ZM24 11H29V25H24Z\"/>\n  \n  <path class=\"ink\" d=\"M5.5 5V8M16 5V8M26.5 5V8M5.5 6.5H26.5\"/></svg>\n            <span class=\"l\" data-i18n-html=\"rb.dhc\"></span></button>\n          <button class=\"rv-btn\" data-cmd=\"dvg\" type=\"button\">\n            <svg viewBox=\"0 0 32 32\" aria-hidden=\"true\"><g transform=\"rotate(90 16 16)\">\n<path class=\"blu\" d=\"M2 11H7V25H2ZM12 11H20V25H12ZM25 11H30V25H25Z\"/>\n  \n  <path class=\"ink\" d=\"M7 6V9M12 6V9M7 7.5H12M20 6V9M25 6V9M20 7.5H25\"/>\n</g></svg>\n            <span class=\"l\" data-i18n-html=\"rb.dvg\"></span></button>\n          <button class=\"rv-btn\" data-cmd=\"dvc\" type=\"button\">\n            <svg viewBox=\"0 0 32 32\" aria-hidden=\"true\"><g transform=\"rotate(90 16 16)\">\n<path class=\"blu\" d=\"M3 11H8V25H3ZM12 11H20V25H12ZM24 11H29V25H24Z\"/>\n  \n  <path class=\"ink\" d=\"M5.5 5V8M16 5V8M26.5 5V8M5.5 6.5H26.5\"/>\n</g></svg>\n            <span class=\"l\" data-i18n-html=\"rb.dvc\"></span></button>\n          <span class=\"ttl\" data-i18n=\"rb.g3\"></span>\n        </div>\n        <div class=\"rv-sep\"></div>\n        <div class=\"rv-group\">\n          <button class=\"rv-btn\" data-cmd=\"set\" type=\"button\">\n            <svg viewBox=\"0 0 32 32\" aria-hidden=\"true\"><path class=\"ink\" d=\"M4 7H16M26 7H28M4 16H6M16 16H28M4 25H14M24 25H28\"/><circle stroke=\"#F2A93B\" cx=\"21\" cy=\"7\" r=\"3.2\"/><circle class=\"ink\" cx=\"11\" cy=\"16\" r=\"3.2\"/><circle class=\"ink\" cx=\"19\" cy=\"25\" r=\"3.2\"/></svg>\n            <span class=\"l\" data-i18n=\"rb.set\"></span></button>\n          <button class=\"rv-btn\" data-cmd=\"about\" type=\"button\">\n            <svg viewBox=\"0 0 32 32\" aria-hidden=\"true\"><circle class=\"ink\" cx=\"16\" cy=\"16\" r=\"12\"/><path stroke=\"#F2A93B\" stroke-width=\"3\" d=\"M16 14.5V22M16 10V10.1\"/></svg>\n            <span class=\"l\" data-i18n=\"rb.about\"></span></button>\n          <span class=\"ttl\" data-i18n=\"rb.g2\"></span>\n        </div>\n      </div>\n      <div class=\"rv-tip\" id=\"rvtip\" role=\"tooltip\"></div>\n      <div class=\"rv-stage\" id=\"stage\" data-cmd=\"qfc\">\n        <svg class=\"stg stg-qfc on\" viewBox=\"0 0 800 320\" aria-hidden=\"true\">\n          <defs>\n            <linearGradient id=\"dg\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#5a6fa8\"/><stop offset=\".5\" stop-color=\"#3f5185\"/><stop offset=\"1\" stop-color=\"#2b3a66\"/></linearGradient>\n            <clipPath id=\"clipQ\"><rect class=\"clipq\" x=\"250\" y=\"40\" width=\"0\" height=\"240\"/></clipPath>\n          </defs>\n          <rect x=\"30\" y=\"150\" width=\"220\" height=\"44\" rx=\"3\" fill=\"url(#dg)\"/><ellipse cx=\"250\" cy=\"172\" rx=\"9\" ry=\"22\" fill=\"#26335a\"/>\n          <rect x=\"560\" y=\"68\" width=\"210\" height=\"44\" rx=\"3\" fill=\"url(#dg)\"/><ellipse cx=\"560\" cy=\"90\" rx=\"9\" ry=\"22\" fill=\"#26335a\"/>\n          <g clip-path=\"url(#clipQ)\"><path class=\"flexcol\" d=\"M250 172 C370 172 440 90 560 90\" fill=\"none\" stroke-width=\"34\" stroke-linecap=\"butt\"/><path d=\"M250 172 C370 172 440 90 560 90\" fill=\"none\" stroke=\"#8a5a0a\" stroke-opacity=\".55\" stroke-width=\"34\" stroke-dasharray=\"2 7\"/></g>\n          <circle class=\"mk mk1\" cx=\"250\" cy=\"172\" r=\"19\" fill=\"none\" stroke=\"#F2A93B\" stroke-width=\"3.5\"/><circle class=\"mk mk2\" cx=\"560\" cy=\"90\" r=\"19\" fill=\"none\" stroke=\"#F2A93B\" stroke-width=\"3.5\"/>\n          <circle class=\"ring ring1\" cx=\"250\" cy=\"172\" r=\"14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/><circle class=\"ring ring2\" cx=\"560\" cy=\"90\" r=\"14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/>\n          <text x=\"40\" y=\"228\" fill=\"#8a93a8\" font-size=\"15\">Ø250</text><text x=\"700\" y=\"140\" fill=\"#8a93a8\" font-size=\"15\">Ø160</text>\n          <g class=\"cur\"><path d=\"M0 0V17L4.5 13 8 20.5 10.7 19.3 7.2 12H13Z\" fill=\"#fff\" stroke=\"#111\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/></g>\n        </svg>\n        <svg class=\"stg stg-ft\" viewBox=\"0 0 800 320\" aria-hidden=\"true\">\n          <defs><clipPath id=\"clipF\"><rect class=\"clipf\" x=\"400\" y=\"80\" width=\"0\" height=\"140\"/></clipPath></defs>\n          <rect x=\"30\" y=\"130\" width=\"370\" height=\"40\" rx=\"3\" fill=\"url(#dg)\"/>\n          <rect class=\"rigid2\" x=\"400\" y=\"130\" width=\"220\" height=\"40\" fill=\"url(#dg)\"/>\n          <g clip-path=\"url(#clipF)\"><line class=\"flexcol\" x1=\"400\" y1=\"150\" x2=\"620\" y2=\"150\" stroke-width=\"36\"/><line x1=\"400\" y1=\"150\" x2=\"620\" y2=\"150\" stroke=\"#8a5a0a\" stroke-opacity=\".55\" stroke-width=\"36\" stroke-dasharray=\"2 7\"/></g>\n          <g class=\"dim\" opacity=\"0\"><path d=\"M400 98H620M400 92V104M620 92V104\" stroke=\"currentColor\" stroke-width=\"1.5\" fill=\"none\"/><text x=\"510\" y=\"88\" text-anchor=\"middle\" font-size=\"14\" fill=\"currentColor\" font-weight=\"600\">1500</text></g>\n          <rect x=\"620\" y=\"95\" width=\"90\" height=\"110\" fill=\"#a9bce6\" fill-opacity=\".7\" stroke=\"#3a55c8\" stroke-width=\"2.5\"/><path d=\"M620 132H710M620 150H710M620 168H710\" stroke=\"#3a55c8\" stroke-width=\"2\"/>\n          <circle class=\"mk mk1\" cx=\"620\" cy=\"150\" r=\"20\" fill=\"none\" stroke=\"#F2A93B\" stroke-width=\"3.5\"/>\n          <circle class=\"ring ring1\" cx=\"620\" cy=\"150\" r=\"14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/>\n          <g class=\"cur\"><path d=\"M0 0V17L4.5 13 8 20.5 10.7 19.3 7.2 12H13Z\" fill=\"#fff\" stroke=\"#111\" stroke-width=\"1.2\" stroke-linejoin=\"round\"/></g>\n        </svg>\n        <svg class=\"stg stg-dist\" viewBox=\"0 0 800 320\" aria-hidden=\"true\"></svg>\n        <div class=\"chips2\" id=\"chips\" hidden><span data-i18n=\"rb.len\"></span><span class=\"c\">500</span><span class=\"c\">1000</span><span class=\"c\">1500</span><span class=\"c\">2000</span><span class=\"c\">2500</span></div>\n        <div class=\"pane\" id=\"pane-set\">\n          <div class=\"win\"><header><span data-i18n=\"rb.set\"></span><span>×</span></header><div class=\"bd\">\n            <div class=\"row\"><label data-i18n=\"rb.set.lang\"></label><div class=\"seg\" id=\"seglang\"><button data-l=\"uk\" aria-pressed=\"false\">Українська</button><button data-l=\"en\" aria-pressed=\"false\">English</button><button data-l=\"ru\" aria-pressed=\"false\">Русский</button></div></div>\n            <div class=\"row\"><label data-i18n=\"rb.set.color\"></label><div class=\"sw\" id=\"swatches\"></div></div>\n            <p class=\"hint\" data-i18n=\"rb.set.hint\"></p>\n          </div></div>\n        </div>\n        <div class=\"pane\" id=\"pane-about\">\n          <div class=\"win\"><header><span data-i18n=\"rb.about\"></span><span>×</span></header><div class=\"bd\">\n            <div class=\"row\"><b style=\"font-size:18px\">HVAC Stuff</b><br><span data-i18n=\"hero.version\"></span> <b class=\"verx\">1.6.0</b></div>\n            <div class=\"row\"><button class=\"upd\" id=\"updbtn\" type=\"button\" data-i18n=\"rb.about.upd\"></button><span class=\"ok\" id=\"updok\" hidden></span></div>\n            <p class=\"hint\">© 2026 Maliuhin Volodymyr · <a href=\"https://github.com/iMrVoLaNd/HVAC-Stuff-Releases/blob/main/LICENSE.md\" data-i18n=\"foot.license\"></a></p>\n          </div></div>\n        </div>\n        <button class=\"replay\" id=\"replay\" type=\"button\" data-i18n=\"rb.replay\"></button>\n      </div>\n      <div class=\"rv-status\"><span id=\"rvstatus\"></span><span>HVAC Stuff</span></div>\n    </div>";

  /* ---- 1.6: нові назви, четверта група «Позначення систем», реалістичні сцени ---- */
  (function () {
    var N = {
      uk: { "rb.g1": "Гнучкі повітропроводи", "rb.g3": "Розподіл", "rb.g4": "Позначення систем",
        "rb.qfc": "З’єднати гнучким<br>повітропроводом", "rb.ft": "Замінити ділянку<br>на гнучкий<br>повітропровід",
        "rb.dhg": "Проміжки між<br>елементами<br>по горизонталі", "rb.dhc": "Осі між<br>елементами<br>по горизонталі",
        "rb.dvg": "Проміжки між<br>елементами<br>по вертикалі", "rb.dvc": "Осі між<br>елементами<br>по вертикалі",
        "rb.sm_auto": "Заповнювати<br>автоматично", "rb.sm_fill": "Заповнити<br>параметри", "rb.sm_clear": "Очистити<br>параметри",
        "rb.f2s": "Готово: ділянку замінено гнучким повітропроводом, 1500 мм",
        "rb.tip.sm_auto": "sm — Вмикає або вимикає автоматичне заповнення позначень систем у цьому проєкті. Значок показує стан: усе гаразд, є проблеми, вимкнено, не налаштовано.",
        "rb.tip.sm_fill": "sm — Заповнює цільовий параметр і параметр сортування в усіх елементах проєкту й показує звіт.",
        "rb.tip.sm_clear": "sm — Очищає цільовий і сортувальний параметри в усіх елементах оброблюваних категорій.",
        "rb.sm.states": "Стани значка автоматичного режиму", "rb.sm.on": "Усе гаразд", "rb.sm.att": "Є проблеми", "rb.sm.off": "Вимкнено", "rb.sm.nc": "Не налаштовано" },
      en: { "rb.g1": "Flex Duct", "rb.g3": "Distribute", "rb.g4": "System Marks",
        "rb.qfc": "Connect with<br>Flex Duct", "rb.ft": "Replace Section<br>with<br>Flex Duct",
        "rb.dhg": "Gaps Between<br>Elements<br>Horizontally", "rb.dhc": "Centers Between<br>Elements<br>Horizontally",
        "rb.dvg": "Gaps Between<br>Elements<br>Vertically", "rb.dvc": "Centers Between<br>Elements<br>Vertically",
        "rb.sm_auto": "Fill<br>Automatically", "rb.sm_fill": "Fill<br>Parameters", "rb.sm_clear": "Clear<br>Parameters",
        "rb.f2s": "Done: the section is replaced with flex duct, 1500 mm",
        "rb.tip.sm_auto": "sm — Turns the automatic filling of system marks on or off in this project. The icon shows the state: all good, problems, off, not set up.",
        "rb.tip.sm_fill": "sm — Fills the target parameter and the sort parameter of all elements of the project and shows a report.",
        "rb.tip.sm_clear": "sm — Clears the target and sort parameters of all elements of the processed categories.",
        "rb.sm.states": "States of the automatic mode icon", "rb.sm.on": "All good", "rb.sm.att": "Problems", "rb.sm.off": "Off", "rb.sm.nc": "Not set up" },
      ru: { "rb.g1": "Гибкие воздуховоды", "rb.g3": "Распределение", "rb.g4": "Обозначение систем",
        "rb.qfc": "Соединить гибким<br>воздуховодом", "rb.ft": "Заменить участок<br>на гибкий<br>воздуховод",
        "rb.dhg": "Промежутки<br>между элементами<br>по горизонтали", "rb.dhc": "Оси между<br>элементами<br>по горизонтали",
        "rb.dvg": "Промежутки<br>между элементами<br>по вертикали", "rb.dvc": "Оси между<br>элементами<br>по вертикали",
        "rb.sm_auto": "Заполнять<br>автоматически", "rb.sm_fill": "Заполнить<br>параметры", "rb.sm_clear": "Очистить<br>параметры",
        "rb.f2s": "Готово: участок заменён гибким воздуховодом, 1500 мм",
        "rb.tip.sm_auto": "sm — Включает или выключает автоматическое заполнение обозначений систем в этом проекте. Значок показывает состояние: всё в порядке, есть проблемы, выключено, не настроено.",
        "rb.tip.sm_fill": "sm — Заполняет целевой параметр и параметр сортировки у всех элементов проекта и показывает отчёт.",
        "rb.tip.sm_clear": "sm — Очищает целевой и сортировочный параметры у всех элементов обрабатываемых категорий.",
        "rb.sm.states": "Состояния значка автоматического режима", "rb.sm.on": "Всё в порядке", "rb.sm.att": "Есть проблемы", "rb.sm.off": "Выключено", "rb.sm.nc": "Не настроено" }
    };
    H.addStrings(N);
    var mnt = document.getElementById("revit-mount");
    // четвёртая группа: те же кнопки, что в Revit
    var sheet = '<rect class="ink" x="3" y="3" width="22" height="26" rx="3"/><path stroke="#5BB6E8" d="M8 10h3M8 16h3M8 22h3"/><path class="ink" d="M15 10h5M15 16h5M15 22h5"/>';
    function badge(fill, glyph) { return '<circle cx="24" cy="24" r="7" fill="' + fill + '" stroke="var(--pan)" stroke-width="1.6"/>' + glyph; }
    var icons = {
      sm_auto: sheet + badge("#2f9e5f", '<path d="M20.5 24l2.5 2.5 4.5-5" stroke="#fff" stroke-width="2" fill="none"/>'),
      sm_fill: sheet + badge("#F2A93B", '<path d="M22.3 20.6v6.8l5.6-3.4z" fill="#14213d" stroke="#14213d" stroke-width="1"/>'),
      sm_clear: sheet + '<path d="M19.5 19.5l8 8M27.5 19.5l-8 8" stroke="#e5484d" stroke-width="2.6"/>'
    };
    var grp = document.createElement("div");
    grp.className = "rv-group";
    grp.innerHTML = ["sm_auto", "sm_fill", "sm_clear"].map(function (k) {
      return '<button class="rv-btn" data-cmd="' + k + '" type="button"><svg viewBox="0 0 32 32" aria-hidden="true">' + icons[k] + '</svg><span class="l" data-i18n-html="rb.' + k + '"></span></button>';
    }).join("") + '<span class="ttl" data-i18n="rb.g4"></span>';
    var groups = mnt.querySelectorAll(".rv-ribbon > .rv-group"), last = groups[groups.length - 1], sep = document.createElement("div");
    sep.className = "rv-sep";
    last.parentNode.insertBefore(grp, last);
    last.parentNode.insertBefore(sep, last);
    // панель для кнопок группы
    var stg = document.getElementById("stage"), pane = document.createElement("div");
    pane.className = "pane"; pane.id = "pane-sm";
    var st = ["on", "att", "off", "nc"], col = { on: "#2f9e5f", att: "#F2A93B", off: "#8a93a6", nc: "#5BB6E8" };
    pane.innerHTML = '<div class="win"><header><span id="smtitle"></span><span>×</span></header><div class="bd"><p class="hint" id="smtext"></p><div class="row"><label data-i18n="rb.sm.states"></label></div>' +
      '<div style="display:flex;gap:18px;flex-wrap:wrap">' + st.map(function (k) {
        return '<span style="display:flex;flex-direction:column;align-items:center;gap:4px;font-size:12px"><svg viewBox="0 0 32 32" width="40" height="40" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="stroke:var(--ink,#E8ECF2)">' +
          sheet + '<circle cx="24" cy="24" r="7" fill="' + col[k] + '" stroke="var(--pan)" stroke-width="1.6"/></svg><span data-i18n="rb.sm.' + k + '"></span></span>';
      }).join("") + "</div></div></div>";
    stg.appendChild(pane);

    // ---- реалистичные сцены ----
    function duct(x, y, w, h, flangeAt) {
      var seams = "", i;
      for (i = x + 55; i < x + w - 10; i += 55) seams += '<path d="M' + i + " " + y + "V" + (y + h) + '" stroke="#5c6673" stroke-opacity=".45" stroke-width="1.4"/>';
      var fx = flangeAt === "r" ? x + w - 9 : x;
      return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="2" fill="url(#dg2)" stroke="#4b5563" stroke-width="1.4"/>' + seams +
        '<rect x="' + fx + '" y="' + (y - 3) + '" width="9" height="' + (h + 6) + '" rx="2" fill="url(#dg2)" stroke="#3b4350" stroke-width="1.4"/>';
    }
    function flex(D, w) {
      return '<path d="' + D + '" fill="none" stroke="#3f4852" stroke-width="' + (w + 4) + '"/>' +
        '<path d="' + D + '" fill="none" stroke="#dde2e8" stroke-width="' + w + '"/>' +
        '<path d="' + D + '" fill="none" stroke="#6f7a89" stroke-width="' + w + '" stroke-dasharray="1.7 5.3"/>' +
        '<path d="' + D + '" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="' + (w * 0.26) + '" transform="translate(0,' + (-w * 0.22) + ')"/>' +
        '<path d="' + D + '" fill="none" stroke="#000" stroke-opacity=".22" stroke-width="' + (w * 0.26) + '" transform="translate(0,' + (w * 0.26) + ')"/>';
    }
    function collar(x, y, h) { return '<rect x="' + (x - 5) + '" y="' + (y - h / 2 - 2) + '" width="10" height="' + (h + 4) + '" rx="2" fill="#2f3640" stroke="#1d232b" stroke-width="1"/>'; }
    var cur = '<g class="cur"><path d="M0 0V17L4.5 13 8 20.5 10.7 19.3 7.2 12H13Z" fill="#fff" stroke="#111" stroke-width="1.2" stroke-linejoin="round"/></g>';
    var defs = '<linearGradient id="dg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6f8fb"/><stop offset=".22" stop-color="#d6dce3"/><stop offset=".62" stop-color="#9ba5b2"/><stop offset="1" stop-color="#697482"/></linearGradient>' +
      '<linearGradient id="eq" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8fa3c4"/><stop offset=".5" stop-color="#b9c7de"/><stop offset="1" stop-color="#7f93b6"/></linearGradient>';
    var shared = document.createElement("div");
    shared.innerHTML = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' + defs + "</defs></svg>";
    mnt.appendChild(shared);
    var Dq = "M250 172 C370 172 440 90 560 90";
    stg.querySelector(".stg-qfc").innerHTML = "<defs>" + '<clipPath id="clipQ"><rect class="clipq" x="250" y="40" width="0" height="240"/></clipPath></defs>' +
      duct(30, 150, 220, 44, "r") + '<ellipse cx="253" cy="172" rx="6" ry="20" fill="#252c35"/>' + duct(560, 68, 210, 44, "l") + '<ellipse cx="557" cy="90" rx="6" ry="20" fill="#252c35"/>' +
      '<g clip-path="url(#clipQ)">' + flex(Dq, 34) + collar(256, 172, 34) + collar(554, 90, 34) + "</g>" +
      '<circle class="mk mk1" cx="250" cy="172" r="22" fill="none" stroke="#F2A93B" stroke-width="3.5"/><circle class="mk mk2" cx="560" cy="90" r="22" fill="none" stroke="#F2A93B" stroke-width="3.5"/>' +
      '<circle class="ring ring1" cx="250" cy="172" r="15" fill="none" stroke="currentColor" stroke-width="2"/><circle class="ring ring2" cx="560" cy="90" r="15" fill="none" stroke="currentColor" stroke-width="2"/>' +
      '<text x="40" y="228" fill="#8a93a8" font-size="15">Ø250</text><text x="700" y="140" fill="#8a93a8" font-size="15">Ø160</text>' + cur;
    stg.querySelector(".stg-ft").innerHTML = "<defs>" + '<clipPath id="clipF"><rect class="clipf" x="400" y="80" width="0" height="140"/></clipPath></defs>' +
      duct(30, 130, 370, 40, "r") + '<g class="rigid2">' + duct(400, 130, 220, 40, "r") + "</g>" +
      '<g clip-path="url(#clipF)">' + flex("M400 150H620", 36) + collar(405, 150, 36) + collar(615, 150, 36) + "</g>" +
      '<g class="dim" opacity="0"><path d="M400 98H620M400 92V104M620 92V104" stroke="currentColor" stroke-width="1.5" fill="none"/><text x="510" y="88" text-anchor="middle" font-size="14" fill="currentColor" font-weight="600">1500</text></g>' +
      '<rect x="620" y="92" width="110" height="116" rx="4" fill="url(#eq)" stroke="#4a5d82" stroke-width="2"/><rect x="636" y="106" width="78" height="88" rx="3" fill="none" stroke="#4a5d82" stroke-opacity=".6" stroke-width="1.5"/>' +
      '<path d="M642 122H708M642 138H708M642 154H708M642 170H708" stroke="#4a5d82" stroke-opacity=".55" stroke-width="2"/><circle cx="620" cy="150" r="20" fill="#2a323d" fill-opacity=".35"/>' +
      '<circle class="mk mk1" cx="620" cy="150" r="22" fill="none" stroke="#F2A93B" stroke-width="3.5"/><circle class="ring ring1" cx="620" cy="150" r="15" fill="none" stroke="currentColor" stroke-width="2"/>' + cur;
    window.__rvDistDefs = '<defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f6f9"/><stop offset="1" stop-color="#b3bcc8"/></linearGradient></defs>';
    window.__rvDiff = function (x, y, w, h) {
      var m = Math.min(w, h) * 0.16, cx = x + w / 2, cy = y + h / 2;
      return '<g class="dr"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="3" fill="url(#tg)" stroke="#59636f" stroke-width="2"/>' +
        '<rect x="' + (x + m) + '" y="' + (y + m) + '" width="' + (w - 2 * m) + '" height="' + (h - 2 * m) + '" rx="2" fill="#eef1f5" stroke="#8d98a5" stroke-width="1.5"/>' +
        '<rect x="' + (x + 2 * m) + '" y="' + (y + 2 * m) + '" width="' + (w - 4 * m) + '" height="' + (h - 4 * m) + '" rx="1.5" fill="#c3cbd6" stroke="#7d8896" stroke-width="1.2"/>' +
        '<path d="M' + (x + 2 * m) + " " + (y + 2 * m) + "L" + (x + w - 2 * m) + " " + (y + h - 2 * m) + "M" + (x + w - 2 * m) + " " + (y + 2 * m) + "L" + (x + 2 * m) + " " + (y + h - 2 * m) + '" stroke="#7d8896" stroke-width="1"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="' + (Math.min(w, h) * 0.07) + '" fill="#59636f"/></g>';
    };
  })();
  H.apply();
  function retip() {}
  var rv = document.getElementById("revit"), stage = document.getElementById("stage"), START = mount.dataset.start || "qfc";
  var tip = document.getElementById("rvtip"), stat = document.getElementById("rvstatus"), timers = [], cmd = START, tipT = 0;
  var COLORS = ["#F2A93B", "#E4572E", "#2E9E6B", "#5BB6E8", "#8E6BD9", "#8C96A0"];
  function later(f, ms) { timers.push(setTimeout(f, ms)); }
  function cls(sel, c, on) { var e = stage.querySelector(sel); if (e) e.classList[on ? "add" : "remove"](c); }
  function reset() {
    timers.forEach(clearTimeout); timers = [];
    stage.querySelectorAll(".mk,.chips2 .c").forEach(function (e) { e.classList.remove("on", "hi"); });
    stage.querySelectorAll(".ring").forEach(function (e) { e.classList.remove("go"); });
    stage.querySelectorAll(".clip rect, .clipq, .clipf").forEach(function (e) { e.setAttribute("width", 0); });
    var r2 = stage.querySelector(".rigid2"); if (r2) { r2.style.transition = "none"; r2.style.transform = ""; r2.style.opacity = 1; }
    var dim = stage.querySelector(".dim"); if (dim) dim.setAttribute("opacity", 0);
    stage.querySelectorAll(".cur").forEach(function (c) { c.style.transition = "none"; c.style.opacity = 1; c.style.transform = ""; void c.getBoundingClientRect(); c.style.transition = ""; });
  }
  function go(el, x, y) { el.style.transform = "translate(" + x + "px," + y + "px)"; }
  function click(sel) { var e = stage.querySelector(sel); e.classList.remove("go"); void e.getBoundingClientRect(); e.classList.add("go"); }
  function playQ() {
    var svg = stage.querySelector(".stg-qfc"), cur = svg.querySelector(".cur");
    stat.textContent = t("rb.q1"); go(cur, 60, 262);
    later(function () { go(cur, 250, 172); }, 350);
    later(function () { click(".stg-qfc .ring1"); svg.querySelector(".mk1").classList.add("on"); stat.textContent = t("rb.q2"); }, 1350);
    later(function () { go(cur, 560, 90); }, 1800);
    later(function () { click(".stg-qfc .ring2"); svg.querySelector(".mk2").classList.add("on"); }, 2800);
    later(function () { svg.querySelector(".clipq").setAttribute("width", 320); cur.style.opacity = 0; }, 3150);
    later(function () { stat.textContent = t("rb.q3"); svg.querySelectorAll(".mk").forEach(function (m) { m.classList.remove("on"); }); }, 4200);
  }
  function playF() {
    var svg = stage.querySelector(".stg-ft"), cur = svg.querySelector(".cur"), chips = stage.querySelectorAll(".chips2 .c");
    stat.textContent = t("rb.f1s"); go(cur, 60, 262);
    later(function () { go(cur, 620, 150); }, 350);
    later(function () { click(".stg-ft .ring1"); svg.querySelector(".mk1").classList.add("on"); }, 1350);
    later(function () { chips[0].classList.add("hi"); }, 1700);
    later(function () { chips[0].classList.remove("hi"); chips[1].classList.add("hi"); }, 2050);
    later(function () { chips[1].classList.remove("hi"); chips[2].classList.add("hi"); }, 2400);
    later(function () {
      var r2 = svg.querySelector(".rigid2"); r2.style.transformOrigin = "620px 150px"; r2.style.transition = "transform .9s cubic-bezier(.4,0,.2,1)"; r2.style.transform = "scaleX(0)";
      svg.querySelector(".clipf").setAttribute("width", 220); cur.style.opacity = 0; svg.querySelector(".dim").setAttribute("opacity", 1);
    }, 2900);
    later(function () { stat.textContent = t("rb.f2s"); svg.querySelector(".mk1").classList.remove("on"); }, 3900);
  }
  var DM = { dhg: { v: false, m: "g" }, dhc: { v: false, m: "c" }, dvg: { v: true, m: "g" }, dvc: { v: true, m: "c" } };
  function playD(c) {
    var svg = stage.querySelector(".stg-dist"), d = DM[c], n = 4, i, sum = 0, tgt = [], rects = "", marks = "";
    var sz = d.v ? [30, 56, 24, 44] : [70, 120, 50, 96], st = d.v ? [60, 110, 186, 232] : [100, 230, 430, 540];
    var A = d.v ? 40 : 70, B = d.v ? 280 : 730, L = B - A, gap, step, pos;
    sz.forEach(function (x) { sum += x; });
    gap = (L - sum) / (n + 1); step = L / (n + 1); pos = A + gap;
    for (i = 0; i < n; i++) {
      if (d.m === "g") { tgt.push(pos); pos += sz[i] + gap; } else tgt.push(A + step * (i + 1) - sz[i] / 2);
    }
    function seg(a, b) { /* размерная линия между двумя позициями вдоль направления */
      return d.v ? '<path d="M292 ' + a + 'H308M292 ' + b + 'H308M300 ' + a + 'V' + b + '" />'
                 : '<path d="M' + a + ' 92V108M' + b + ' 92V108M' + a + ' 100H' + b + '" />';
    }
    function line(p) { return d.v ? '<path d="M315 ' + p + 'H485" stroke-dasharray="5 4" />' : '<path d="M' + p + ' 105V215" stroke-dasharray="5 4" />'; }
    function bord(p) { return d.v ? '<path d="M260 ' + p + 'H540" />' : '<path d="M' + p + ' 70V250" />'; }
    for (i = 0; i < n; i++) {
      rects += d.v ? window.__rvDiff(330, st[i], 140, sz[i]) : window.__rvDiff(st[i], 125, sz[i], 70);
    }
    if (d.m === "g") {
      marks += seg(A, tgt[0]);
      for (i = 0; i < n - 1; i++) marks += seg(tgt[i] + sz[i], tgt[i + 1]);
      marks += seg(tgt[n - 1] + sz[n - 1], B);
    } else {
      var cc = tgt.map(function (t0, k) { return t0 + sz[k] / 2; });
      cc.forEach(function (p) { marks += line(p); });
      marks += seg(A, cc[0]);
      for (i = 0; i < n - 1; i++) marks += seg(cc[i], cc[i + 1]);
      marks += seg(cc[n - 1], B);
    }
    svg.innerHTML = window.__rvDistDefs + '<g stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round" opacity=".75">' + bord(A) + bord(B) + "</g>" + rects +
      '<g class="dm" opacity="0" stroke="#F2A93B" stroke-width="2.5" fill="none" stroke-linecap="round">' + marks + "</g>";
    stat.textContent = t("rb.d1");
    var els = svg.querySelectorAll(".dr");
    later(function () {
      for (i = 0; i < n; i++) {
        var dd = tgt[i] - st[i];
        els[i].style.transform = d.v ? "translate(0px," + dd + "px)" : "translate(" + dd + "px,0px)";
      }
    }, 900);
    later(function () { svg.querySelector(".dm").setAttribute("opacity", 1); stat.textContent = t(d.m === "g" ? "rb.d2g" : "rb.d2c"); }, 2000);
  }
  function show(c) {
    cmd = c; stage.dataset.cmd = c;
    rv.querySelectorAll(".rv-btn").forEach(function (b) { b.classList.toggle("on", b.dataset.cmd === c); });
    stage.querySelectorAll(".stg").forEach(function (e) { e.classList.remove("on"); });
    stage.querySelectorAll(".pane").forEach(function (e) { e.classList.remove("on"); });
    document.getElementById("chips").hidden = c !== "ft";
    document.getElementById("replay").hidden = c !== "qfc" && c !== "ft" && !DM[c];
    reset();
    if (c === "qfc") { stage.querySelector(".stg-qfc").classList.add("on"); playQ(); }
    else if (c === "ft") { stage.querySelector(".stg-ft").classList.add("on"); playF(); }
    else if (DM[c]) { stage.querySelector(".stg-dist").classList.add("on"); playD(c); }
    else if (c.indexOf("sm_") === 0) { stage.querySelector("#pane-sm").classList.add("on"); document.getElementById("smtitle").textContent = rv.querySelector('[data-cmd="' + c + '"] .l').textContent.replace(/\s+/g, " ").trim(); document.getElementById("smtext").textContent = t("rb.tip." + c).replace(/^[^—]+—\s*/, ""); stat.textContent = t("rb.s0"); }
    else { stage.querySelector("#pane-" + c).classList.add("on"); stat.textContent = t("rb.s0"); }
  }
  function tipShow(b) {
    var c = b.dataset.cmd, name = b.querySelector(".l").textContent.replace(/\s+/g, " ").trim();
    var txt = t("rb.tip." + c).replace(/^[^—]+—\s*/, "");
    txt = txt.charAt(0).toUpperCase() + txt.slice(1);
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
    b.addEventListener("click", function () { tipHide(); show(b.dataset.cmd); });
  });
  function setTheme(th) {
    rv.dataset.theme = th;
    document.querySelectorAll("#rvtheme button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.th === th); });
  }
  document.getElementById("rvtheme").addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) setTheme(b.dataset.th); });
  window.rvTheme = setTheme;                      // викликається з перемикача теми сайту
  setTheme(H.scheme());
  document.getElementById("replay").addEventListener("click", function () { show(cmd); });
  document.getElementById("seglang").addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) H.setLang(b.dataset.l); });
  var sw = document.getElementById("swatches");
  sw.innerHTML = COLORS.map(function (c, i) { return '<button type="button" aria-pressed="' + (i === 0) + '" aria-label="' + c + '" style="background:' + c + '" data-c="' + c + '"></button>'; }).join("");
  sw.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    sw.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
    stage.style.setProperty("--flex", b.dataset.c);
  });
  document.getElementById("updbtn").addEventListener("click", function () {
    var ok = document.getElementById("updok"); ok.hidden = false; ok.textContent = t("rb.about.ok") + H.version;
  });
  window.rvRefresh = function () {
    document.querySelectorAll("#seglang button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.l === H.lang()); });
    document.querySelectorAll(".verx").forEach(function (e) { e.textContent = H.version; });
    if (!timers.length || cmd === "set" || cmd === "about") stat.textContent = t("rb.s0");
  };
  var rvio = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    if (es[0].isIntersecting) { rvio.disconnect(); show(START); }
  }, { threshold: .45 }) : null;
  if (rvio) rvio.observe(rv); else show(START);
  H.onLang(function () { rvRefresh(); retip(); });
  // стартовая сцена
  stage.querySelectorAll(".stg").forEach(function (e) { e.classList.remove("on"); });
  var s0 = stage.querySelector(".stg-" + (DM[START] ? "dist" : START)); if (s0) s0.classList.add("on");
  rv.querySelectorAll(".rv-btn").forEach(function (b) { b.classList.toggle("on", b.dataset.cmd === START); });
})();
