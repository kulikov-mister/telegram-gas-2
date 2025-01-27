function message_commands(TelegramJSON) {
  let userProperties = PropertiesService.getUserProperties();
  userProperties.deleteProperty(TelegramJSON.message.chat.id);
  let text = TelegramJSON.message.text;
  
  if (text === '/start'){
    let msg = "Привет <a href='" + Bot.mentionByID() +"'>" + Bot.getUserFullName() +"</a>! \n\n /menu - главное меню❇️ \n /help - список команд";
    Bot.sendMessage(msg);
  }

  if (text === '/cancel' && !Bot.userHasThreadedConversation().found){
    Bot.sendMessage(`<i>Пользователь отменил операцию</i> \n\n/menu - главное меню❇️`);
  }

  if (text === '/help'){
    let msg = "<b><a href='" + Bot.mentionByID() +"'>" + Bot.getUserFullName() + "</a>, взгляни на команды:</b>\n\n /start - Запустить бота🔥 \n /donate - Донат❤️ \n /profile - профиль \n /addme - запрос на активацию \n /rate - поставить рейтинг💹 \n /ask - Образец опроса \n /menu - главное меню❇️ \n /privacy - какие данные используются \n /cancel - отмена";
    Bot.sendMessage(msg);
  }

  if (text === '/privacy'){
    Bot.sendMessage(privacy_msg);
  }

  if (text === '/donate'){
    Bot.sendMessage(msgd);
  }

  if (text === '/schedule'){
    if(schedule_msg != ""){
      keyboard = {
      reply_markup: {"inline_keyboard": [[{ text: 'Открыть', url: schedule_msg }]]}
      }
      let msg = 'Расписание🗒'
      Bot.sendMessage(msg, keyboard)
    }
    else{
      let msg = 'Расписание сейчас отсутствует. Используйте /addschedule, чтобы добавить ссылку на расписание'
      Bot.sendMessage(msg);
    }
  }

  if (text === '/menu'){
    if(Bot.getSystemUser().isAuth) {//если суперадмин
      msg = "<b>Вы в главном МЕНЮ:</b>\n\n<i>выберите любой вариант из приведенного ниже списка.</i>";
      Bot.sendMessage(msg, {'reply_markup': {'inline_keyboard': menu[0]}});
    }
    else{//если неавторизованный пользователь
      let msg = "Вы не зарегестрированы. \n<i>Пожалуйста, нажмите /addme, чтобы отправить запрос на авторизацию.</i>";
      Bot.sendMessage(msg);
    }
  }

  if (text === '/set_lang'){
    Bot.sendChatAction();
    let lang_msg = `<a href="https://telegra.ph/List-Language-05-21"><i>Список поддерживаемых языковых кодов</i></a>`;
    Bot.sendMessage(`<b>C какого языка переводим</b>\n\n${lang_msg}`, {'reply_markup': {'inline_keyboard': menu[9]}});
    return
  }
  if (text === '/ask'){
    Bot.startThreadedConversation(threaded);
    return
  }

  if(text === '/top'){//команда для топлиста
    let msg = leaderBoard();
    Bot.sendMessage(msg);
  }
  if (text === '/profile'){
    msg = "<b>ID        :</b> " + Bot.getUserID() + "\n" +
          "<b>Username  :</b> " + "<a href='" + Bot.mentionByID() +"'>" + Bot.getUsername() + "</a>\n" +
          "<b>First Name:</b> " + Bot.getUserFirstName() + "\n" +
          "<b>Last Name :</b> " + Bot.getUserLastName() + "\n" +
          "<b>Language  :</b> " + TelegramJSON.message.from.language_code + "\n" +
          "<b>Is bot    :</b> " + TelegramJSON.message.from.is_bot;
    Bot.sendMessage(msg);
  }

  if (text === '/addme'){
    if(Bot.getSystemUser() && Bot.getSystemUser().isAuth) {
      let msg = "Вы уже являетесь авторизованным пользователем.";
      Bot.sendMessage(msg);
      return;
    }
    else if(Bot.getSystemUser()) {
      let msg = "Вы уже делали запрос раньше. Пожалуйста, дождитесь ответа администратора.";
      Bot.sendMessage(msg);
      return;
    }
    Bot.addSystemUser();
    msg = "Ваш запрос был отправлен администратору.";
    Bot.sendMessage(msg);
    // отправка сообщение с запросом администратору
    let sendTo = superAdmin || Bot.getAdminsID();
    const len = sendTo.length;
    for(let i = 0; i < len; i++) {
      let options = {
        'chat_id': sendTo[i],
        'reply_markup': {
          'inline_keyboard': [
            [ 
              { 'text': '⛔️Отклонить', 'callback_data': 'user_deny_' + Bot.getUserID() },
              { 'text': '✅Принять', 'callback_data': 'user_approve_' + Bot.getUserID() }
            ]
          ]
        }
      };

      msg1 = "Этот пользователь запрашивает у вас разрешение\n\n" +
            "<i>ID        :</i> " + "<a href='" + Bot.mentionByID() +"'>" + Bot.getUserID() + "</a>\n" +
            "<i>Username  :</i> " + "<a href='" + Bot.mentionByID() +"'>" + Bot.getUsername() + "</a>\n" +
            "<i>First Name:</i> " + Bot.getUserFirstName() + "\n" +
            "<i>Last Name :</i> " + Bot.getUserLastName() + "\n" +
            "<i>Language  :</i> " + TelegramJSON.message.from.language_code + "\n" +
            "<i>Is bot    :</i> " + TelegramJSON.message.from.is_bot;
      Bot.sendMessage(msg1, options);
    }
  }

  if (text === '/rate'){
    let keyboard = '⭐️,⭐️⭐️;⭐️⭐️⭐️,⭐️⭐️⭐️⭐️,⭐️⭐️⭐️⭐️⭐️';
    msg = "Как вы оцениваете этого бота?";
    Bot.sendMessageCustomKeyboard(msg, keyboard, 'Дайте мне свои звезды...');
  }
}