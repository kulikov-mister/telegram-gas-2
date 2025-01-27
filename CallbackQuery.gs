function callbackQuery(TelegramJSON) {//обработка нажатий в личном чате пользователя
  let options = {
    chat_id: TelegramJSON.callback_query.message.chat.id,
    message_id: TelegramJSON.callback_query.message.message_id,
    data: TelegramJSON.callback_query.data,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
    disable_notification: true,
    text: '' || TelegramJSON.callback_query.message.text,
    reply_markup: '',
  }
  let userProperties = PropertiesService.getUserProperties();  
  // callback_query
  if(Bot.isCallbackQuery()) {
    let a = Bot.getSystemUser();
    if(a && a.isAuth) {
      let cb = TelegramJSON.callback_query;
      let msg = '', msg2 = '';
      if(options.data === 'menu_1') {
        if (superAdmin.includes(Bot.getUserID())) {
          Bot.sendChatAction();
          msg = "<b>Вы в главном МЕНЮ:</b>\n\n<i>выберите любой вариант из приведенного ниже списка.</i>";
          Bot.editMessageKeyboard(msg, options.message_id, null, {'inline_keyboard': menu[4]});
          Bot.request('answerCallbackQuery', { callback_query_id: cb.id});
          return;
        }
        else{
          Bot.sendChatAction();
          msg = "<b>Вы в главном МЕНЮ:</b>\n\n<i>выберите любой вариант из приведенного ниже списка.</i>";
          Bot.editMessageKeyboard(msg, options.message_id, null, {'inline_keyboard': menu[1]});
          Bot.request('answerCallbackQuery', { callback_query_id: cb.id});
          return;
        }
      }
      if(options.data === 'menu_start'){
        Bot.sendChatAction();
        msg = "<b>Вы в главном МЕНЮ:</b>\n\n<i>выберите любой вариант из приведенного ниже списка.</i>";
        Bot.editMessageKeyboard(msg, options.message_id, null, {'inline_keyboard': menu[0]});
        Bot.request('answerCallbackQuery', { callback_query_id: cb.id});
        return;
      }
      if(options.data === 'profile') {
        Bot.sendChatAction();
        let isb;
        if (cb.from.is_bot === 'true'){isb = " Да"}else{isb = " Нет"};
        let msg = "<i><b>ID        :</b></i> " + Bot.getUserID() + "\n" +
                  "<i><b>Username  :</b></i> " + Bot.getUsername() + "\n" +
                  "<i><b>First Name:</b></i> " + Bot.getUserFirstName() + "\n" +
                  "<i><b>Last Name :</b></i> " + [cb.from.last_name || ""] + "\n" +
                  "<i><b>Бот       :</b></i> " + isb
        Bot.editMessageKeyboard(msg, options.message_id, null, {'inline_keyboard': menu[2]});
        Bot.request('answerCallbackQuery', { callback_query_id: cb.id});
        return;
      }
      if (options.data === 'donate') {
        Bot.sendChatAction();
        Bot.editMessageKeyboard(msgd, options.message_id, null, {'inline_keyboard': menu[2]});
        Bot.request('answerCallbackQuery', { callback_query_id: cb.id});
        return;
      }
      if (options.data === 'stop') {
        Bot.request('answerCallbackQuery', { callback_query_id: cb.id, text: '🥺 Дальше пусто' });
        return;
      }
      if (options.data === 'Settings') {
        Bot.sendChatAction();
        Bot.editMessageKeyboard('Вы в меню: <b>НАСТРОЙКИ</b>', options.message_id, null, {'inline_keyboard': menu[3]});
        Bot.request('answerCallbackQuery', { callback_query_id: cb.id});
        return;
      }
      if (options.data === 'translate') {
        Bot.sendChatAction();
        let lang_msg = `<a href="https://telegra.ph/List-Language-05-21"><i>Список поддерживаемых языковых кодов</i></a>`;
        Bot.editMessageKeyboard(`<b>C какого языка переводим?</b>\n\n${lang_msg}`, options.message_id, null, {'inline_keyboard': menu[9]});
        Bot.request('answerCallbackQuery', { callback_query_id: cb.id});
        return;
      }
      if (options.data.split('_')[1] === 'sourceL') {
        Bot.sendChatAction();
        let lang_msg = `<a href="https://telegra.ph/List-Language-05-21"><i>Список поддерживаемых языковых кодов</i></a>`;
        sl = options.data.split('_')[0];
        let keys = [[{text: 'RU', callback_data: `${sl}_tlang_ru`},{text: 'EN', callback_data: `${sl}_tlang_en`},{text: 'DE', callback_data: `${sl}_tlang_de`},{text: 'TK', callback_data: `${sl}_tlang_tk`}],
  [{text: 'KK', callback_data: `${sl}_tlang_kk`},{text: 'KY', callback_data: `${sl}_tlang_ky`},{text: 'LV', callback_data: `${sl}_tlang_lv`},{text: 'LT', callback_data: `${sl}_tlang_lt`}],
  [{text: 'RO', callback_data: `${sl}_tlang_ro`},{text: 'SR', callback_data: `${sl}_tlang_sr`},{text: 'ES', callback_data: `${sl}_tlang_es`},{text: 'FR', callback_data: `${sl}_tlang_fr`}],
  [{text: 'SK', callback_data: `${sl}_tlang_sk`},{text: 'SL', callback_data: `${sl}_tlang_sl`},{text: 'UZ', callback_data: `${sl}_tlang_uz`},{text: 'TG', callback_data: `${sl}_tlang_tg`}],
  [{text: 'PL', callback_data: `${sl}_tlang_pl`},{text: 'UK', callback_data: `${sl}_tlang_uk`},{text: 'BG', callback_data: `${sl}_tlang_bg`},{text: 'BE', callback_data: `${sl}_tlang_be`}],
  [{text: '🏡 Назад', callback_data: 'translate'}]];
        Bot.editMessageKeyboard(`<b>На какой язык переводим?</b>\n\n${lang_msg}`, options.message_id, null, {'inline_keyboard': keys,});
        Bot.request('answerCallbackQuery', { callback_query_id: cb.id});
        return;
      }
      if (options.data.split('_')[1] === 'tlang') {//если выбран втрой язык для перевода
        let user = {
          callback_query_data: options.data,
        };
        userProperties.setProperty(options.chat_id, JSON.stringify(user));
        Bot.editMessageText(`Введите текст для перевода. (${options.data.split('_')[0]} => ${options.data.split('_')[2]})`, options.message_id, null);
        Bot.request('answerCallbackQuery', { callback_query_id: cb.id});
        return;
      }
      if (options.data === 'schedule'){
        Bot.sendChatAction();
        if(schedule_msg !== ''){ //если ссылка для расписания имеется
          let msg = 'Расписание🗒';
          Bot.editMessageKeyboard(msg, options.message_id, null, {"inline_keyboard": [[{ text: 'Открыть', url: schedule_msg }],[{text: '🏡 Назад', callback_data: 'menu_1'}]] });
          Bot.request('answerCallbackQuery', { callback_query_id: cb.id});
          return;
        }
        else{
          Bot.request('answerCallbackQuery', { callback_query_id: cb.id, text: '🥺 Расписание отсутсвует!'});
          return;
        }
      }
      if (options.data === 'courses') {
        Bot.sendChatAction();
        let res = [];
        nameOfSheets().forEach(function(item){res.push(`\n${item}`)});
        Bot.editMessageKeyboard(`<b>Список предметов:</b> \n${res}`, options.message_id, null, {'inline_keyboard': menu[8]});
        Bot.request('answerCallbackQuery', { callback_query_id: cb.id});
        return;
      }
      if (options.data === 'Добавить расписание'){
        let user = {
          callback_query_data: 'Добавить расписание',
        };
        userProperties.setProperty(options.chat_id, JSON.stringify(user));
        Bot.editMessageKeyboard('<b>Пришлите прямую ссылку на Ваше расписание</b>', options.message_id, null, {'inline_keyboard': menu[8]});
        Bot.request('answerCallbackQuery', { callback_query_id: cb.id});
        return;
      }
      if (options.data === 'Удалить расписание'){
        if (schedule_msg.trim() == '') { //если ссылка для расписания имеется
          Bot.request('answerCallbackQuery', { callback_query_id: cb.id, text: '⚠️ Расписание отсутсвует!'});
          return;
        }
        else {
          setSheetVal('Settings', 2, 1, '');//установка в графу с расписанием пустого значения
          Bot.request('answerCallbackQuery', { callback_query_id: cb.id, text: '✅ Расписание успешно удалено!'});
          return;
        }
      }
      if (options.data === 'Examples') {
        let user = {
          callback_query_data: options.data,
        };
        userProperties.setProperty(options.chat_id, JSON.stringify(user));
        let data = getDataShhet('Examples');
        let msg = '<b>Выберите любую статью из приведенного ниже списка </b>👇';
        try{
          Bot.editMessageKeyboard(msg, options.message_id, null, keySheets(data, undefined, return_key = "Settings").keyboard); 
        }
        catch{//если не получается изменить сообщение для возврата назад
          Bot.deleteMessage(options.message_id);
          Bot.sendMessage(msg, {'reply_markup': keySheets(data, undefined, return_key = "Settings").keyboard});
        }
        Bot.request('answerCallbackQuery', { callback_query_id: cb.id});
      }
      if (options.data === 'Добавить предмет') {
        let user = {
          callback_query_data: options.data,
        };
        userProperties.setProperty(options.chat_id, JSON.stringify(user));
        Bot.editMessageText('Напишите название предмета.', options.message_id, null);
        Bot.request('answerCallbackQuery', { callback_query_id: cb.id});
        return;
      }
      if (options.data === 'Посмотреть лекции' || options.data === 'Удалить материал' || options.data === 'Удалить предмет' || options.data === 'Добавить материал') {
        let user = {
          callback_query_data: options.data,
        };
        if (options.data === 'Добавить материал') {
          msg = 'Выбери предмет, в который нужно добавить материал 👇';
          userProperties.setProperty(options.chat_id, JSON.stringify(user));
          Bot.editMessageKeyboard(msg, options.message_id, null, keySheets(nameOfSheets(), undefined, return_key = "menu_1").keyboard);
          Bot.request('answerCallbackQuery', { callback_query_id: cb.id});
        }
        if (options.data === 'Посмотреть лекции') {
          msg = 'Выбери предмет, который Вы хотите посмотреть👇'};
        if (options.data === 'Удалить материал') {
          msg = 'Выбери предмет, в котором Вы хотите <b>удалить</b> материал👇'};
        if (options.data === 'Удалить предмет') {
          msg = `Выберите предмет, который хотите удалить`}; 
        
        if(nameOfSheets().length > 0){//проверка на наличие предметов
          userProperties.setProperty(options.chat_id, JSON.stringify(user));
          Bot.editMessageKeyboard(msg, options.message_id, null, keySheets(nameOfSheets(), undefined, return_key = "menu_1").keyboard);
          Bot.request('answerCallbackQuery', { callback_query_id: cb.id});
        }
        else{
          Bot.request('answerCallbackQuery', { callback_query_id: cb.id, text: '🥺 Здесь пусто!' });
        }
        return;       
      }
      let sheets = keySheets(nameOfSheets()).nameOfSheets;
      let userData = JSON.parse(userProperties.getProperty(options.chat_id));
      if (sheets.includes(options.data) && userData.callback_query_data === 'Удалить предмет'){
        delSheet(options.data);
        Bot.editMessageKeyboard(`Выберите предмет, который хотите <b>удалить</b>👇`, options.message_id, null, keySheets(nameOfSheets(), undefined, return_key = "menu_1").keyboard);
      }
      if (sheets.includes(options.data)){//если выбран предмет из списка
        let data = getDataShhet(options.data);
        if (data !== 0) { //если в списке предметов есть информация
          let x = userData.callback_query_data;
          switch(x) {
            case 'Посмотреть лекции':
              userProperties.setProperty(options.chat_id, JSON.stringify({callback_query_data: `find_${msg}`}));
              Bot.editMessageKeyboard(`<b>${options.data}</b>` , options.message_id, null, keySheets(data).keyboard);
              Bot.request('answerCallbackQuery', { callback_query_id: cb.id});
              break;
            case 'Удалить предмет':
              delSheet(options.data);
              Bot.editMessageKeyboard(`Выберите предмет, который хотите <b>удалить</b>👇`, options.message_id, null, keySheets(nameOfSheets(), undefined, return_key = "menu_1").keyboard);
              Bot.request('answerCallbackQuery', { callback_query_id: cb.id});
              break;
            case 'Удалить материал':
              userProperties.setProperty(options.chat_id, JSON.stringify({callback_query_data: `deletem_${msg}`}));
              Bot.editMessageKeyboard(`Выберите предмет, в котором Вы хотите <b>удалить</b> материал👇` , options.message_id, null, keySheets(data).keyboard);
              Bot.request('answerCallbackQuery', { callback_query_id: cb.id});
              break;
            default:
              Bot.request('answerCallbackQuery', { callback_query_id: cb.id});//ответный запрос, чтобы не было зацикливаний 
              break;
          }
        }
        if (userData.callback_query_data === 'Добавить материал'){//если в списке предметов есть информация/или нет
          userProperties.setProperty(options.chat_id, JSON.stringify({callback_query_data: `addm_${options.data}`}));
          Bot.editMessageText('<b>Пришлите Ваш новый материал.</b>', options.message_id);
          Bot.request('answerCallbackQuery', { callback_query_id: cb.id});
        }
        else {
          Bot.request('answerCallbackQuery', { callback_query_id: cb.id, text: '🥺 Здесь пусто!' });
        }
      }
      if (options.data.includes('page')) {//если нажата кнопка перелистнуть страницу в списке лекций
        let page = options.data.substr(-1);
        let x = userData.callback_query_data;
        Bot.request('answerCallbackQuery', { callback_query_id: cb.id});//ответный запрос, чтобы не было зацикливаний
        switch(x) {
          case 'Посмотреть лекции':
            msg = 'Выбери предмет, который Вы хотите <b>посмотреть</b>👇';
            Bot.editMessageKeyboard(msg, options.message_id, null, keySheets(nameOfSheets(), page, return_key = "menu_1").keyboard);
            break;
          case 'Добавить материал':
            msg = 'Выбери предмет, в который нужно <b>добавить</b> материал👇';
            Bot.editMessageKeyboard(msg, options.message_id, null, keySheets(nameOfSheets(), page, return_key = "menu_1").keyboard);
            break;
          case 'Удалить предмет':
            msg = 'Выберите предмет, который хотите <b>удалить</b>👇';
            Bot.editMessageKeyboard(msg, options.message_id, null, keySheets(nameOfSheets(), page, return_key = "menu_1").keyboard);
            break;
          case 'Удалить материал':
            msg = 'Выберите предмет, в котором Вы хотите <b>удалить</b> материал👇';
            Bot.editMessageKeyboard(msg, options.message_id, null, keySheets(nameOfSheets(), page, return_key = "menu_1").keyboard); 
            break;
          case 'Examples':
            msg = 'Выберите любую статью из приведенного ниже списка 👇';
            data = getDataShhet('Examples');
            Bot.editMessageKeyboard(msg, options.message_id, null, keySheets(data, page, return_key = 'Settings').keyboard, {'disable_web_page_preview': true});
            break;
          default:
            Bot.request('answerCallbackQuery', { callback_query_id: cb.id});//ответный запрос, чтобы не было зацикливаний 
            break;
        }
      }
      if (options.data.includes('page') && sheets.includes(options.text)) {//если текст статьи совпадает с текстом кнопки, чтобы правильно корректно срабатывали нажатия
        let page = options.data.substr(-1);
        let data = getDataShhet(options.text);
        let msg = '<b>'+userData.callback_query_data.split('_')[1]+'</b>';
        Bot.editMessageKeyboard(msg, options.message_id, null, keySheets(data, page).keyboard);
        Bot.request('answerCallbackQuery', { callback_query_id: cb.id});
        return;
      }
      if(options.data.split('_')[0] === 'user') {//авторизация пользователя
        if(options.data.split('_')[1] === 'approve') {
          Bot.authSystemUser(options.data.split('_')[2], true);
          msg  = "<i>Вы были авторизованы.</i> Приятного пользования!";
          msg2 = "Запрос от <a href='tg://user?id="+options.data.split('_')[2] + "'>"+options.data.split('_')[2]+"</a> был <b>одобрен</b> вами.";
        }
        else if(options.data.split('_')[1] === 'deny') {
          Bot.authSystemUser(options.data.split('_')[2], false);
          msg  = "<i>К сожалению, Ваш запрос был отклонен!</i>";
          msg2 = "Запрос от <a href='tg://user?id="+options.data.split('_')[2] + "'>"+options.data.split('_')[2]+"</a> был <b>отклонен</b> вами.";
        }
        Bot.sendMessage(msg, { chat_id: options.data.split('_')[2] });
        Bot.editMessageText(msg2, options.message_id);
        Bot.request('answerCallbackQuery', { callback_query_id: cb.id});
        return;
      }
      if(options.data.split('_')[0] === 'article') {//кнопка "назад" при просмотре материала
        let data = getDataShhet(options.data.split('_')[1]);
        let msg = `<b>${options.data.split('_')[1]}</b>`;
        try{
          Bot.editMessageKeyboard(msg, options.message_id, null, keySheets(data).keyboard);
        }
        catch{
          Bot.deleteMessage(options.message_id);
          Bot.sendMessage(msg, {'reply_markup': keySheets(data).keyboard});
        }
        Bot.request('answerCallbackQuery', { callback_query_id: cb.id});
        return;
      }
      if(options.data === 'delete'){
        Bot.deleteMessage(TelegramJSON.callback_query.message.message_id);
        Bot.request('answerCallbackQuery', { callback_query_id: cb.id});
        return;
      }
      if (search_row(options.data, 'Examples') >= 0 && userData.callback_query_data === 'Examples'){//если пользователь просматривает Examples
        let lastpost = SpreadsheetApp.openById(botSheet).getSheetByName('Examples').getRange(search_row(options.data, 'Examples'), 1, 1,  4).getValues()[0]
        let msg = '<b>🔎' + lastpost[0] + '</b>' + '\n\n'+ lastpost[1];
        Bot.request('answerCallbackQuery', { callback_query_id: cb.id});
        if (lastpost[3] == 'Текст') {
          Bot.editMessageKeyboard(msg, options.message_id, null, {'inline_keyboard': [[{ text: 'К списку статей', 'callback_data': `Examples` }]]}, {'disable_web_page_preview': false});
        }
        if (lastpost[3] == 'Изображение') {
          Bot.deleteMessage(options.message_id);
          Bot.sendPhoto(msg, String(lastpost[2]), menu[10], {'disable_web_page_preview': false});
        }
        if (lastpost[3] == 'Видео') {
          Bot.deleteMessage(options.message_id);
          Bot.sendVideo(msg, String(lastpost[2]), menu[10], {'disable_web_page_preview': false});
        }
        if (lastpost[3] == 'Аудио') {
          Bot.deleteMessage(options.message_id);
          Bot.sendAudio(msg, String(lastpost[2]), menu[10], {'disable_web_page_preview': false});
        }
        if (lastpost[3] == 'Документ') {
          Bot.deleteMessage(options.message_id);
          Bot.sendDocument(msg, String(lastpost[2]), menu[10], {'disable_web_page_preview': false});
        }
      }
      let msgdata = userData.callback_query_data.split('_');
      if (search_row(options.data, options.text) >= 0) {
        if (msgdata[0] === 'find'){//если пользователь просматривает материалы
          let lastpost = SpreadsheetApp.openById(botSheet).getSheetByName(options.text).getRange(search_row(options.data, options.text), 1, 1,  4).getValues()[0]
          let msg = '<b>🔎' + lastpost[0] + '</b>' + '\n\n'+ lastpost[1];
          let x = lastpost[3]
          Bot.request('answerCallbackQuery', { callback_query_id: cb.id});
          switch(x) {
            case 'Изображение':
              Bot.deleteMessage(options.message_id);
              Bot.sendPhoto(msg, String(lastpost[2]), [[{'text': 'К списку материалов', 'callback_data': `article_${options.text}`}]]);
              break;
            case 'Видео':
              Bot.deleteMessage(options.message_id);
              Bot.sendVideo(msg, String(lastpost[2]), [[{'text': 'К списку материалов', 'callback_data': `article_${options.text}`}]]);
              break;
            case 'Аудио':
              Bot.deleteMessage(options.message_id);
              Bot.sendAudio(msg, String(lastpost[2]), [[{'text': 'К списку материалов', 'callback_data': `article_${options.text}`}]]);
              break;
            case 'Документ':
              Bot.deleteMessage(options.message_id);
              Bot.sendDocument(msg, String(lastpost[2]), [[{'text': 'К списку материалов', 'callback_data': `article_${options.text}`}]]);
              break;
            case 'Текст':
              Bot.editMessageKeyboard(msg, options.message_id, null,{'inline_keyboard': [[{ text: 'К списку материалов', callback_data: `article_${options.text}`}]],
                                                                     'disable_web_page_preview': false});
              break;
            default:
              Bot.request('answerCallbackQuery', { callback_query_id: cb.id, text: '🥺 Какая-то ошибка!' });
              break;
          }
        }
        if (msgdata[0] === 'deletem') {//если пользователь желает удалить материал
          let SpreadSheet = SpreadsheetApp.openById(botSheet);
          let Sheet = SpreadSheet.getSheetByName(options.text);
          Sheet.deleteRow(search_row(options.data, options.text));
          let data = getDataShhet(msgdata[1]);
          Bot.editMessageKeyboard(`${msgdata[1]}` , options.message_id, null, keySheets(data, undefined, return_key = 'Удалить материал').keyboard);
          Bot.request('answerCallbackQuery', { callback_query_id: cb.id});
        }
      }
    }
    else{//если пользователь не зарегистрирован в боте
      let msg = "Вы не зарегестрированы. \n<i>Пожалуйста, нажмите /addme, чтобы отправить запрос на авторизацию.</i>";
      Bot.sendMessage(msg);
      Bot.request('answerCallbackQuery', { callback_query_id: cb.id});
      return;
    }
  }
}