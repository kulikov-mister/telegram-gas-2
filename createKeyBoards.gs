const menu = [
 [[{'text': '🔥 Меню', 'callback_data': 'menu_1'}],
  [{'text': 'ℹ️ Профиль', 'callback_data': 'profile'}],
  [{'text': '⚙️ Настройки', 'callback_data': 'Settings'}],
  [{'text': '💳 Donate', 'callback_data': 'donate'}]],

  [[{'text': '👀 Посмотреть лекции 📖', 'callback_data': 'Посмотреть лекции'}],
   [{'text': '📚 Список предметов', 'callback_data': 'courses'}],
   [{'text': '👀 Посмотреть расписание 🗒', 'callback_data': 'schedule'}],
   [{'text': '🅰️ Переводчик 🈂️', 'callback_data': 'translate'}],
   [{'text': '🏡 Назад', 'callback_data': 'menu_start'}]],

  [[{'text': '🏡 Назад', 'callback_data': 'menu_start'}]],

  [[{'text': '🛃 Написать разработчику', 'url': 't.me/freetech_support'}],
   [{'text': '💡 Examples', 'callback_data': 'Examples'}],
   [{'text': '⁉️ Как пользоваться?', 'url': 'https://telegra.ph/Kak-polzovatsya-botom-dlya-obrazovaniya-02-23'}],
   [{'text': '🏡 Назад', 'callback_data': 'menu_start'}]],

  [[{'text': '👀 Посмотреть лекции 📖', 'callback_data': 'Посмотреть лекции'}],
   [{'text': '➕ Добавить материал 📝', 'callback_data': 'Добавить материал'}],
   [{'text': '🗑️ Удалить материал 📝', 'callback_data': 'Удалить материал'}],
   [{'text': '📚 Список предметов', 'callback_data': 'courses'}],
   [{'text': '➕ Добавить предмет 📚', 'callback_data': 'Добавить предмет'}],
   [{'text': '🗑️ Удалить предмет 📚', 'callback_data': 'Удалить предмет'}],
   [{'text': '👀 Посмотреть расписание 🗒', 'callback_data': 'schedule'}],
   [{'text': '➕ Добавить расписание 🗒', 'callback_data': 'Добавить расписание'}],
   [{'text': '🗑️ Удалить расписание 🗒', 'callback_data': 'Удалить расписание'}],
   [{'text': '🅰️ Переводчик 🈂️', 'callback_data': 'translate'}],
   [{'text': '🏡 Назад', 'callback_data': 'menu_start'}]],

  [[{'text': '📄 Правила чата', 'callback_data': 'riding_rules'}]],

  [[{'text': '☑️ Принять', 'callback_data': 'agree with rules'}]],

  [[{ "text": "✅ С правилами ознакомлен", 'callback_data': 'pass' }]],

  [[{'text': '🏡 Назад', 'callback_data': 'menu_1'}]],

  [[{text: 'RU', callback_data: 'ru_sourceL'},{text: 'EN', callback_data: 'en_sourceL'},{text: 'DE', callback_data: 'de_sourceL'},{text: 'TK', callback_data: 'tk_sourceL'}],
   [{text: 'KK', callback_data: 'kk_sourceL'},{text: 'KY', callback_data: 'ky_sourceL'},{text: 'LV', callback_data: 'lv_sourceL'},{text: 'LT', callback_data: 'lt_sourceL'}],
   [{text: 'RO', callback_data: 'ro_sourceL'},{text: 'SR', callback_data: 'sr_sourceL'},{text: 'ES', callback_data: 'es_sourceL'},{text: 'FR', callback_data: 'fr_sourceL'}],
   [{text: 'SK', callback_data: 'sk_sourceL'},{text: 'SL', callback_data: 'sl_sourceL'},{text: 'UZ', callback_data: 'uz_sourceL'},{text: 'TG', callback_data: 'tg_sourceL'}],
   [{text: 'PL', callback_data: 'pl_sourceL'},{text: 'UK', callback_data: 'uk_sourceL'},{text: 'BG', callback_data: 'bg_sourceL'},{text: 'BE', callback_data: 'be_sourceL'}],
   [{text: '🏡 Назад', callback_data: 'menu_1'}]],

   [[{'text': 'Назад в 💡 Examples', 'callback_data': 'Examples'}]]
   
];



//функция создания массива кнопок при просмотре списка материалов
function keySheets(arraykeys, page = "page-0", return_key = "Посмотреть лекции") {
  //
  let container = [];
  let keyboardLength = 5
  let nameOfSheetsArr = listArray(keyboardLength, arraykeys, container)
  console.log(arraykeys)
  page = +page.substr(-1)

  let keys = [];
  for (i in nameOfSheetsArr[page]) {
    keys.push([{ text: String(nameOfSheetsArr[page][i]), callback_data: nameOfSheetsArr[page][i] }])
  }
  if (arraykeys.length > keyboardLength) {
    if (page == 0) {
      keys.push([{ text: '⏹', callback_data: "stop" }, { text: '🏡 Назад', callback_data: return_key }, { text: '▶️ ' + (page + 2) + " 📄", callback_data: "page-" + (page + 1) }])
    }
    else if (page == nameOfSheetsArr.length - 1) {
      keys.push([{ text: "📄 " + (page) + ' ◀️', callback_data: "page-" + (page - 1) }, { text: '🏡 Назад', callback_data: return_key }, { text: '⏹', callback_data: "stop" }])
    }
    else {
      keys.push([{ text: "📄 " + (page) + ' ◀️', callback_data: "page-" + (page - 1) }, { text: '🏡 Назад', callback_data: return_key }, { text: '▶️ ' + (page + 2) + " 📄", callback_data: "page-" + (page + 1) }])
    }
  }
  else{//если список кнопок меньше заданного значения 'keyboardlength'
    keys.push([{ text: '🏡 Назад', callback_data: return_key }])
  }

  let keyboards = {
    inline_keyboard: [...keys]
  }
  console.log(JSON.stringify(keyboards))
  let obj = { nameOfSheets: arraykeys, keyboard: keyboards }
  return obj
}