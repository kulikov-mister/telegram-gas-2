// https://github.com/peterherrmann/BetterLog

let Logger = BetterLog.useSpreadsheet(botSheet);
let Bot = TelegramLibrary.createBot(tgBotToken, botSheet);
let TelegramJSON;
function doPost(e) {
  if(e.postData.type == "application/json") {
    TelegramJSON = JSON.parse(e.postData.contents);
    Bot.getUpdate(TelegramJSON);

    Logger.log(JSON.stringify(TelegramJSON));
    debug(TelegramJSON);    
    
    if(Bot.isCallbackQuery()) {//если callback_query
      callbackQueryChat(TelegramJSON);
    }
    
    if(Bot.isBotCommand(TelegramJSON)) {// если команды боту
      if (Bot.isChatType('private')) {//если команда в личный чат
        message_commands(TelegramJSON)
      }
      else{//если команда в другой чат
      }
    }
      
    //если пользователь Ведет Многопоточный Разговор
    let tc = Bot.userHasThreadedConversation();
    // многопоточный разговор
    if(tc.found) {
      if(tc.step == threaded.length) {
        let ans = Bot.endThreadedConversation(threaded,tc.step);
        if(ans) {
          // выполните обработку здесь
          Logger.log(ans);
          let msg = "Данные были записаны. Спасибо.";
          Bot.sendMessageKeyboardRemove(msg);
        }
      }
      else //следующее Сообщение В Многопоточном Разговоре
        Bot.nextMessageInThreadedConversation(threaded, tc.step);
    }

    if (Bot.isNewChatMember() || Bot.isLeftChatMember()) {
      let resp = Bot.deleteMessage(TelegramJSON.message.message_id);
      console.log(resp.result);
      message_chat(TelegramJSON);
      return
    }
    
    if(Bot.isTextMessage()) {// обычные сообщения
      if (Bot.isChatType('private')) {//если в личный чат
        msgText(TelegramJSON)
      }
      else {
        message_chat(TelegramJSON)
      }
    }

    if(Bot.isMap()) {// координаты, локации
      if (Bot.isChatType('private')) {
        let lat, long  = [TelegramJSON.message.location.latitude, TelegramJSON.message.location.longitude];
        Bot.sendVenue(lat, long, lat+','+long, 'Моё местоположение в данный момент.');
        return
      }
    }

    if(Bot.isPhoto()){//если фото
      if (Bot.isChatType('private')) {//если в личный чат
        msgPhoto(TelegramJSON)
        return
      }
    }
    
    if(Bot.isVideo()){//если видео
      if (Bot.isChatType('private')) {//если в личный чат
        msgVideo(TelegramJSON)
        return
      }
    }
    
    if(Bot.isAudio()){//если аудио
      if (Bot.isChatType('private')) {//если в личный чат
        msgAudio(TelegramJSON)
        return
      }
    }

    if(Bot.isDocument()){//если Документ
      if (Bot.isChatType('private')) {//если в личный чат
        msgDoc(TelegramJSON)
        return
      }
    }   
  }
}