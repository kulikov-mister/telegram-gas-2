//отправка фото
function msgPhoto(TelegramJSON) {
  let userProperties = PropertiesService.getUserProperties();
  let user = JSON.parse(userProperties.getProperty(TelegramJSON.message.chat.id));
  let fileid = TelegramJSON.message.photo[2].file_id;
  let caption = TelegramJSON.message.caption;
  let name_text = caption.split('///')[0];
  let caption_text = caption.split('///')[1];
  let msgdata = user.callback_query_data.split('_');
  if(TelegramJSON.message.photo && user.callback_query_data.split('_')[0] === "addm"){
    if (name_text.length > 30){
      let msg = `⚠️<b>Название материала не должно превышать 30 символов.</b> \n\n<i>Перед основным текстом лекции ограничьте название тремя чертами:\n<b>Например:</b>Лекция1///Текст лекции 1...</i>`;
      Bot.sendMessage(msg);
    }
    if(caption_text.length > 1024){
      let msg = `⚠️<b>Описание материала не должно превышать 1024 символа.</b> \n\n<i>Если у Вас большой материал: используйте @telegraph для сохрания материала в виде статьи, в сообщении боту пришлите ссылку на материал. Так материал не будет сразу отпугивать по объёму и будет наиболее читаемый в мобильных устройствах</i>`;
      Bot.sendMessage(msg);
    }
    if (name_text.length <= 30 && caption_text.length <= 1024){//если название более 1, но менее 30 символов
      let sheet = SpreadsheetApp.openById(botSheet).getSheetByName(msgdata[1]);
      sheet.appendRow([caption.split('///')[0], caption.split('///')[1], fileid, 'Изображение'])
      let msg = `✅Изображение с описанием по предмету: <b>${msgdata[1]}</b> успешно добавлено. \n\n<i>Продолжайте присылать материалы для добавления,\n/menu, чтобы снова перейти в главное меню</i>`;
      //userProperties.deleteProperty(TelegramJSON.message.chat.id);
      Bot.sendMessage(msg);
    }
  }
}

//отправка видео
function msgVideo(TelegramJSON) {
  let userProperties = PropertiesService.getUserProperties();
  let user = JSON.parse(userProperties.getProperty(TelegramJSON.message.chat.id));
  let fileid = TelegramJSON.message.video.file_id;
  let caption = TelegramJSON.message.caption;
  let name_text = caption.split('///')[0];
  let caption_text = caption.split('///')[1];
  let msgdata = user.callback_query_data.split('_');
  if(TelegramJSON.message.video && user.callback_query_data.split('_')[0] === "addm"){
    if (name_text.length > 30){
      let msg = `⚠️<b>Название материала не должно превышать 30 символов.</b> \n\n<i>Перед основным текстом лекции ограничьте название тремя чертами:\n<b>Например:</b>Лекция1///Текст лекции 1...</i>`;
      Bot.sendMessage(msg);
    }
    if(caption_text.length > 1024){
      let msg = `⚠️<b>Описание материала не должно превышать 1024 символа.</b> \n\n<i>Если у Вас большой материал: используйте @telegraph для сохрания материала в виде статьи, в сообщении боту пришлите ссылку на материал. Так материал не будет сразу отпугивать по объёму и будет наиболее читаемый в мобильных устройствах</i>`;
      Bot.sendMessage(msg);
    }
    if (name_text.length <= 30 && caption_text.length <= 1024){//если название более 1, но менее 30 символов
      let sheet = SpreadsheetApp.openById(botSheet).getSheetByName(msgdata[1]);
      sheet.appendRow([caption.split('///')[0], caption.split('///')[1], fileid, 'Видео']);
      let msg = `✅Видео с описанием по предмету: <b>${msgdata[1]}</b> успешно добавлено. \n\n<i>Продолжайте присылать материалы для добавления,\n/menu, чтобы снова перейти в главное меню</i>`;
      //userProperties.deleteProperty(TelegramJSON.message.chat.id);
      Bot.sendMessage(msg);
    }
  }
}

//отправка аудио
function msgAudio(TelegramJSON) {
  let userProperties = PropertiesService.getUserProperties();
  let user = JSON.parse(userProperties.getProperty(TelegramJSON.message.chat.id));
  let fileid = TelegramJSON.message.audio.file_id;
  let caption = TelegramJSON.message.caption;
  let name_text = caption.split('///')[0];
  let caption_text = caption.split('///')[1];
  let msgdata = user.callback_query_data.split('_');
  if(TelegramJSON.message.audio && user.callback_query_data.split('_')[0] === "addm"){
    if (name_text.length > 30){
      let msg = `⚠️<b>Название материала не должно превышать 30 символов.</b> \n\n<i>Перед основным текстом лекции ограничьте название тремя чертами:\n<b>Например:</b>Лекция1///Текст лекции 1...</i>`;
      Bot.sendMessage(msg);
    }
    if(caption_text.length > 1024){
      let msg = `⚠️<b>Описание материала не должно превышать 1024 символа.</b> \n\n<i>Если у Вас большой материал: используйте @telegraph для сохрания материала в виде статьи, в сообщении боту пришлите ссылку на материал. Так материал не будет сразу отпугивать по объёму и будет наиболее читаемый в мобильных устройствах</i>`;
      Bot.sendMessage(msg);
    }
    if (name_text.length <= 30 && caption_text.length <= 1024){//если название более 1, но менее 30 символов
      let sheet = SpreadsheetApp.openById(botSheet).getSheetByName(msgdata[1]);
      sheet.appendRow([caption.split('///')[0], caption.split('///')[1], fileid, 'Аудио'])
      let msg = `✅Аудио с описанием по предмету: <b>${msgdata[1]}</b> успешно добавлено. \n\n<i>Продолжайте присылать материалы для добавления,\n/menu, чтобы снова перейти в главное меню</i>`;
      //userProperties.deleteProperty(TelegramJSON.message.chat.id);
      Bot.sendMessage(msg);
    }
  }
}

//отправка документа
function msgDoc(TelegramJSON) {
  let userProperties = PropertiesService.getUserProperties();
  let user = JSON.parse(userProperties.getProperty(TelegramJSON.message.chat.id));
  let fileid = TelegramJSON.message.document.file_id;
  let caption = TelegramJSON.message.caption;
  let name_text = caption.split('///')[0];
  let caption_text = caption.split('///')[1];
  let msgdata = user.callback_query_data.split('_');
  if(TelegramJSON.message.document && user.callback_query_data.split('_')[0] === "addm"){
    if (name_text.length > 30){
      let msg = `⚠️<b>Название материала не должно превышать 30 символов.</b> \n\n<i>Перед основным текстом лекции ограничьте название тремя чертами:\n<b>Например:</b>Лекция1///Текст лекции 1...</i>`;
      Bot.sendMessage(msg);
    }
    if(caption_text.length > 1024){
      let msg = `⚠️<b>Описание материала не должно превышать 1024 символа.</b> \n\n<i>Если у Вас большой материал: используйте @telegraph для сохрания материала в виде статьи, в сообщении боту пришлите ссылку на материал. Так материал не будет сразу отпугивать по объёму и будет наиболее читаемый в мобильных устройствах</i>`;
      Bot.sendMessage(msg);
    }
    if (name_text.length <= 30 && caption_text.length <= 1024){//если название более 1, но менее 30 символов
      let sheet = SpreadsheetApp.openById(botSheet).getSheetByName(msgdata[1]);
      sheet.appendRow([caption.split('//')[0], caption.split('///')[1], fileid, 'Документ'])
      let msg = `✅Документ с описанием по предмету: <b>${msgdata[1]}</b> успешно добавлен. \n\n<i>Продолжайте присылать материалы для добавления,\n/menu, чтобы снова перейти в главное меню</i>`;
      //userProperties.deleteProperty(TelegramJSON.message.chat.id);
      Bot.sendMessage(msg);
    }
  }
}

//отправка документа
function msgMedia(TelegramJSON) {
  let userProperties = PropertiesService.getUserProperties();
  let user = JSON.parse(userProperties.getProperty(TelegramJSON.message.chat.id));
  let fileid = TelegramJSON.message.document.file_id;
  let caption = TelegramJSON.message.caption;
  let name_text = caption.split('///')[0];
  let caption_text = caption.split('///')[1];
  let msgdata = user.callback_query_data.split('_');
  if(TelegramJSON.message.document && user.callback_query_data.split('_')[0] === "addm"){
    if (name_text.length > 30){
      let msg = `⚠️<b>Название материала не должно превышать 30 символов.</b> \n\n<i>Перед основным текстом лекции ограничьте название тремя чертами:\n<b>Например:</b>Лекция1///Текст лекции 1...</i>`;
      Bot.sendMessage(msg);
    }
    if(caption_text.length > 1024){
      let msg = `⚠️<b>Описание материала не должно превышать 1024 символа.</b> \n\n<i>Если у Вас большой материал: используйте @telegraph для сохрания материала в виде статьи, в сообщении боту пришлите ссылку на материал. Так материал не будет сразу отпугивать по объёму и будет наиболее читаемый в мобильных устройствах</i>`;
      Bot.sendMessage(msg);
    }
    if (name_text.length <= 30 && caption_text.length <= 1024){//если название более 1, но менее 30 символов
      let sheet = SpreadsheetApp.openById(botSheet).getSheetByName(msgdata[1]);
      sheet.appendRow([caption.split('//')[0], caption.split('///')[1], fileid, 'Документ'])
      let msg = `✅Файлы с описанием по предмету: <b>${msgdata[1]}</b> успешно добавлен. \n\n<i>Продолжайте присылать материалы для добавления,\n/menu, чтобы снова перейти в главное меню</i>`;
      //userProperties.deleteProperty(TelegramJSON.message.chat.id);
      Bot.sendMessage(msg);
    }
  }
}