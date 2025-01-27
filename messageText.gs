function message_chat(TelegramJSON) {//функция для обработки сообщений в  групповом чате
  let text = TelegramJSON.message.text;
  if (!Bot.isNewChatMember()) { //если сообщения не о новом участнике
    if (Bot.isReply()) { //если пересланное сообщение
      let chat_idReply = TelegramJSON.message.reply_to_message.from.id;
      let first_nameReply = TelegramJSON.message.reply_to_message.from.first_name;
      let last_nameReply = TelegramJSON.message.reply_to_message.from.last_name;
      let usernameReply = TelegramJSON.message.reply_to_message.from.username;
      user = getUserInfo(first_nameReply, last_nameReply, usernameReply);
      let usetReply = user.username;
      if (user.username == '') usetReply = user.first_name + ' ' + user.last_name;
      if (matchesThanks(text).length !== 0) {
        if (TelegramJSON.message.reply_to_message.from.is_bot) {
          msg = '<b>Приятно, когда меня хвалят!</b>🙈\n<i>Я умею раздавать карму другим😍</i>';
          Bot.sendMessage(msg);
          return
        }
        if (Bot.getUserID() == chat_idReply) {
          msg = 'Ха... Себе карму хочешь повысить? 😜 Ну-ну...\nПомогай другим в чате и карма быстро вырастит';
          Bot.sendMessage(msg);
          return
        }
        let usetReplyFullName = user.first_name + user.last_name;
        msg = `🎉 <b><a href='tg://user?id=${chat_idReply}'>${usetReply}</a></b> тебе прилетел +1 к карме от <b>${TelegramJSON.message.from.first_name + TelegramJSON.message.from.last_name}</b>\nТекущая карма: <b> ${setCarma(usetReplyFullName, chat_idReply)}</b>`;
        let trophy = getTrophy(chat_idReply);
        if (trophy != false) msg += '\nТрофей:' + trophy
        Bot.sendMessage(msg);
      }
    }
    if (!Bot.isReply()) { //если непересланное сообщение
      if (matchesThanks(text).length !== 0) {
        msg= `<a href='${Bot.mentionByID()}'>${Bot.getUserFirstName()}</a>, чтобы поблагодарить участника чата, ответь на его сообщение, так я смогу повысить его карму.😌`
        Bot.sendMessage(msg);
        return
      }
    }
  }
  if (Bot.isNewChatMember()) {
    namemsg = `<b>🎉 ${Bot.getUserFullName()}</b>, добро пожаловать`
    let msg = `<b>${Bot.getUserFirstName()}</b>, ты в чате!\nСейчас ты можешь пользоватся только поиском.🔍\n📝 <b>Чтобы писать в чат</b>, необходимо ознакомится с правилами чата.🧾`
    let keyBoard = {
      "inline_keyboard": [
        [{ "text": "Правила чата", 'callback_data': 'riding_rules'}]],
      "resize_keyboard": true}
    let options = {
      chat_id: TelegramJSON.message.chat.id,
      user_id: TelegramJSON.message.from.id,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
      disable_notification: true,
      reply_markup: keyBoard,
      permissions: {
        can_send_messages: false,
        can_invite_users: true
      },
      until_date: ~~(Date.now()/100) + 604800
    }
    Bot.restrictChatMember(options.chat_id, options.user_id, options.permissions, options.until_date);
    resp = Bot.sendMessage(msg, options);
    let cache = CacheService.getScriptCache();
    let data = {
      chat_id: resp.result.chat.id,
      message_id: resp.result.message_id,
      text: namemsg + '<b>!</b>'
    }
    cache.put(options.user_id, JSON.stringify(data), 21600)
  }
  
  if(text === '/rules' || text === '/rules@EduMobile_bot'){//команда для правил
    Bot.deleteMessage(TelegramJSON.message.message_id);
    Bot.sendMessage(rules);
  }

  if(text === '/top' || text === '/top@EduMobile_bot'){//команда для топлиста
    let msg = leaderBoard();
    Bot.deleteMessage(TelegramJSON.message.message_id);
    Bot.sendMessage(msg);
  }
}

/**********************************************************************************************************************
 *                                     ОБРАБОТКА СООБЩЕНИЙ В ЛИЧНОМ ЧАТЕ                                              *
 **********************************************************************************************************************/
function msgText(TelegramJSON) {
  let text = TelegramJSON.message.text;
  let userProperties = PropertiesService.getUserProperties();
  let user = JSON.parse(userProperties.getProperty(TelegramJSON.message.chat.id));
  if(text === '⭐️' || text === '⭐️⭐️' || text === '⭐️⭐️⭐️' || text === '⭐️⭐️⭐️⭐️' || text === '⭐️⭐️⭐️⭐️⭐️') {
    setSheetVal('users', fan_row(TelegramJSON.message.chat.id), 8, text)//вставка рейтинга напротив id пользователя
    Bot.sendMessageKeyboardRemove('Спасибо Вам за Ваш рейтинг!☺️');
  }
  if(text && user.callback_query_data === 'Добавить расписание') {
    let msg = '✅<b>Расписание успешно добавлено.</b> \n\n<i>Используйте: /menu, чтобы снова перейти в главное меню</i>';
    setSheetVal('Settings', 2, 1, text)
    userProperties.deleteProperty(TelegramJSON.message.chat.id);
    Bot.deleteMessage(TelegramJSON.message.message_id);
    Bot.deleteMessage(TelegramJSON.message.message_id-1);//удаление 2-х предыдущих сообщений, для очистки мусора
    Bot.sendMessage(msg);
  }
  if(text && user.callback_query_data === 'Добавить предмет') {
    Bot.sendChatAction();
    if(text.length > 30) {
      let msg = '⚠️Название Предмета не должно превышать 30 символов';
      Bot.sendMessage(msg);
    }
    else{
      createSheet(text);
      let msg = '<b>✅Предмет успешно добавлен.</b> \n\n<i>Продолжайте вводить названия предметов для добавления,\n/menu, чтобы снова перейти в главное меню</i>';
      //userProperties.deleteProperty(TelegramJSON.message.chat.id);
      Bot.sendMessage(msg);
    }
  }
  let msgdata = user.callback_query_data.split('_');
  if(text && msgdata[0] == "addm") {//если пришло сообщение в режиме добавления материала для лекций
    let name_text = text.split('///')[0];
    if (name_text.length > 30){
      let msg = `<b>⚠️Название материала не должно превышать 30 символов.</b> \n\n<i>Перед основным текстом лекции ограничьте название тремя чертами:\n<b>Например:</b>Лекция1///Текст лекции 1...</i>`;
      Bot.sendMessage(msg);
    }
    else{//если название более 1, но менее 30 символов
      Bot.sendChatAction();
      let sheet = SpreadsheetApp.openById(botSheet).getSheetByName(msgdata[1]);
      sheet.appendRow([name_text, text.split('///')[1], '', 'Текст'])
      let msg = `✅Метериал в виде текста по предмету: <b>${msgdata[1]}</b> успешно добавлен! \n\n<i>/cancel -  остановить добавление</i>`;
      //userProperties.deleteProperty(TelegramJSON.message.chat.id);
      Bot.sendMessage(msg);
    }
  }
  if(text && msgdata[1] === 'tlang') {//если пришло сообщение после выбора target language
    Bot.sendChatAction();
    try{
      let translatedText = LanguageApp.translate(text, msgdata[0], msgdata[2]); //текст, с какого языка, на какой язык;
      Bot.sendMessage(`<code>${translatedText}</code>\n\n <i>/set_lang - установить язык заново\n/cancel - остановить перевод</i>`);
      Bot.sendMessage(`Введите текст для перевода. (${msgdata[0]} => ${msgdata[2]})`)
    }
    catch{
      Bot.sendMessage(`⚠️Произошла ошибка перевода. Попробуйте снова или позже.\n\n <i>/cancel - остановить перевод</i>`);
    }
  }
}