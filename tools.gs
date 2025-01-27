/********************************************
 *                Bot функции               *
 * ******************************************/

//функция подписки
function join(chat_id, name, last_name, row_t){
  let row = undefined
  if(row_t){
    row = row_t
  }
  else{
    row = fan_row(chat_id)
  }
  if(row){
    return 0
  }
  // SpreadsheetApp.openById(botSheet).getSheetByName("Fans list");
  // let lastRow = Sheet.getLastRow();
  let add_info = [chat_id, name, last_name, DATE_CURRENT]
  setSheetValues("users", add_info)
  sendText(chat_id, "✅Подписаны✅")
  return 0
}

//функция отписки
function leave(chat_id, row_t){
  let row = undefined
  if(row_t){
    row = row_t
  }
  else{
    row = fan_row(chat_id)
  }
  if(row){
    let SpreadSheet = SpreadsheetApp.openById(botSheet);
    let Sheet = SpreadSheet.getSheetByName("users");
    Sheet.deleteRow(row)
    Bot.sendMessage("❌Отписаны❌")
  }
  return 0
}

//функция получения фанатской строки
function fan_row(chat_id){
  let SpreadSheet = SpreadsheetApp.openById(botSheet);
  let Sheet = SpreadSheet.getSheetByName("users");
  let lastRow = Sheet.getLastRow();
  let start_row = 2
  for(start_row=2; start_row<=lastRow; start_row++){
    this_chat_id = getSheetVal("users", start_row, _getItemColInFansList("chat_id"))
    if(this_chat_id == String(chat_id)){
      return start_row
    }
  }
  return undefined
}

function _getItemColInFansList(item){
  if(item == "chat_id"){
    return 2
  }
  let msg = "[error] Wrong column: "+item
  Logger.log.ERR(msg, "tools._getItemColInFansList")
  return -1
}

//функция получения количества подписчиков
function fan_num(_chat_id){
  return SpreadsheetApp.openById(botSheet).getSheetByName("users").getLastRow()-1
}

let msgd = TelegramLibrary.donate_msg();
//функция отправки количества подписчиков админу или фанатам
function send_fans_number(chat_id){
  let keyboard = undefined
  if(Admins_UID.indexOf(chat_id) < 0){
    keyboard = keyboard_fans
  }
  else{
    keyboard = keyboard_admins
  }
  sendTextKeyboard(chat_id, "Количество подписчиков: "+String(fan_num(chat_id)), keyboard)
}

function createSheet(sheetname) {
  // sheetname = 'Новый лист'
  let spreadsheet = SpreadsheetApp.openById(botSheet);
  let sheets = spreadsheet.getSheets();
  sheets[sheets.length - 7].activate();
  spreadsheet.insertSheet(sheets.length - 7);
  spreadsheet.getActiveSheet().setName(sheetname);
  spreadsheet.getRange('E:Z').activate();
  spreadsheet.getActiveSheet().deleteColumns(spreadsheet.getActiveRange().getColumn(), spreadsheet.getActiveRange().getNumColumns());
  spreadsheet.getRange('A:D').activate();
  spreadsheet.getActiveSheet().setColumnWidths(1, 4, 148);
  spreadsheet.getActiveSheet().setColumnWidths(1, 4, 210);
  let sheet = spreadsheet.getActiveSheet();
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
  spreadsheet.getRange('1:1000').applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY);
  let banding = spreadsheet.getRange('A1:D1000').getBandings()[0];
  banding.setHeaderRowColor(null)
  .setFirstRowColor('#ffffff')
  .setSecondRowColor('#f3f3f3')
  .setFooterRowColor(null);
  banding = spreadsheet.getRange('A1:D1000').getBandings()[0];
  banding.setHeaderRowColor(null)
  .setFirstRowColor('#ffffff')
  .setSecondRowColor('#e0f7fa')
  .setFooterRowColor(null);
}

function nameOfSheets() {
  let ss = SpreadsheetApp.openById(botSheet);
  let sheets = ss.getSheets();
  let sheetsName = []
  for (i in sheets) {
    if (i < sheets.length - 7) sheetsName.push(sheets[i].getSheetName());
  }
  console.log(sheetsName)
  return sheetsName
}

function getDataShhet(sheetname) {
  //sheetname = 'лист2'
  try{
    let ss = SpreadsheetApp.openById(botSheet);
    let sheet = ss.getSheetByName(sheetname);
    let data = sheet.getRange(1, 1, sheet.getLastRow()).getValues();
    let lists = []
    for (i in data) {
      lists.push(data[i]);
    }
    list = lists.flat()
    console.log(list)
    return list
  }
  catch{
    return 0
  }
}

function getDataSheet(sheetname) {
  // sheetname = 'Листочек'
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetname);
  let data = sheet.getDataRange().getValues();
  console.log(data)
  return data
}

function addDataSheet(sheetname, data) {
  let ss = SpreadsheetApp.openById(botSheet);
  let sheet = ss.getSheetByName(sheetname);
  sheet.appendRow(data)
}

//функция взятия значений в нужный лист
function getSheetVal(sheetName, row, col){
  let SpreadSheet = SpreadsheetApp.openById(botSheet);
  let Sheet = SpreadSheet.getSheetByName(sheetName);
  return Sheet.getSheetValues(row, col, 1, 1)[0][0]
}

//функция установки значений в нужный лист
function setSheetVal(sheetName, row, col, val){
  let SpreadSheet = SpreadsheetApp.openById(botSheet);
  let Sheet = SpreadSheet.getSheetByName(sheetName);
  Sheet.getRange(row, col).setValue(val)
  return 0
}

//функция добавления строки с контентом из массива
function setSheetValues(sheetName, val){
  let values = val.toString().split(',');
  SpreadsheetApp.openById(botSheet).getSheetByName(sheetName).appendRow(values)
  return 0
}

function delSheet(sheetName) {
  //sheetName = 'лист';
  let spreadsheet = SpreadsheetApp.openById(botSheet);
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName(sheetName), true);
  return spreadsheet.deleteActiveSheet();
}

// функция деления массива (длина элементов, массив который нужно разделить, новый список после деления)
function listArray(num, array, container) {
  for (d = 0; d < array.length; d += num) {
    container.push(array.slice(d, d + num));
  }
  return container
}

function finalCountdown() {
  let token = tgBotToken;
  let chatID = TelegramJSON.message.chat.id;
  let urls = 'https://api.telegram.org/bot' + token +
      '/sendMessage?chat_id=' + chatID + '&text=It\'s the final countdown!';
  let response = UrlFetchApp.fetch(urls);
  response = JSON.parse(response.getContentText());
  let msgID = response.result.message_id;
  Utilities.sleep(1000);
  let baseUrl = 'https://api.telegram.org/bot' + token +
      '/editMessageText?chat_id=' + chatID + '&message_id=' + msgID + '&text=';
  let w = { '0': "0️⃣", '1': "1️⃣", '2': "2️⃣", '3': "3️⃣", '4': "4️⃣", '5': "5️⃣", '6': "6️⃣", '7': "7️⃣", '8': "8️⃣", '9': "9️⃣", ":": "▪️" }

  let url;
  for (let i = 0; i < 15; ++i) {

      let date = new Date();
      let timestamp = date.getTime();
      let timezone = Session.getScriptTimeZone()
      let times = Utilities.formatDate(date, timezone, "HH:mm:ss");
      url = baseUrl + [...times.toString()].map(e => w[e]).join();
      UrlFetchApp.fetch(url);
      Utilities.sleep(1000);
  }
  url = baseUrl + '💣Boom!';
  UrlFetchApp.fetch(url);
}

//функция поиска строк статей и уроков
function search_row(text, list){
  //text = "Лекция 1"; 
  //list = 'лист2';
  let Sheet = SpreadsheetApp.openById(botSheet).getSheetByName(list);
  let lastRow = Sheet.getLastRow();
  let start_row = 1
  for(start_row=1; start_row<=lastRow; start_row++){
    this_text = getSheetVal(list, start_row, 1)
    if(this_text == String(text)){
      //console.log(start_row)
      return start_row
    }
    else undefined
  }
}

function getSheetValue(sheetName, row, col){
  let SpreadSheet = SpreadsheetApp.openById(botSheet);
  let Sheet = SpreadSheet.getSheetByName(sheetName);
  return Sheet.getSheetValues(row, col, 1, 1)
}

let schedule_msg = getSheetValue("Settings", 2, 2).toString()
let welcome_msg = getSheetValue("Settings", 5, 2).toString()
let setting_msg = getSheetValue("Settings", 3, 2).toString()
let privacy_msg = getSheetValue("Settings", 4, 2).toString()

let version_msg = 'PROGRAM NAME:' + '1' + '\n\nТекущая версия на' + '<u>' + '1' + '</u>' + ":\n" + '1'
let howto_msg = '🤓<b>Инструкция по использованию</b>📃<a href="https://telegra.ph/Kak-polzovatsya-botom-dlya-obrazovaniya-02-23">.</a>'
let author_msg = 'Это бот был создан специально для образования.\n\nАвтор: <b>Куликов Александр</b><a href="https://t.me/kulikov_mister">.</a> - Магистрант БГПУ им.М.Акмуллы'

/********************************************
 *           Функционал для кармы           *
 * ******************************************/

const wsData = SpreadsheetApp.openById(botSheet).getSheetByName('Рейтинг');
const wsSetting = SpreadsheetApp.openById(botSheet).getSheetByName('Settings');

function setCarma(name, chatId) {
  let arrChatId = wsData.getRange(2, 4, wsData.getLastRow()).getValues().flat();
  let idRow = arrChatId.indexOf(+chatId) + 2;
  if (idRow == 1) {
    wsData.appendRow(['', name, 1, chatId]);
    let currentCarma = 1
    return currentCarma
  }
  let currentCarma = wsData.getRange(idRow, 3).getValue();
  currentCarma = currentCarma + 1
  wsData.getRange(idRow, 3).setValue(currentCarma);
  wsData.getRange('B2:D').sort({ column: 3, ascending: false });
  return currentCarma
}

function leaderBoard() {
  let dataTop = wsData.getRange(2, 1, wsData.getLastRow(), 3).getDisplayValues()
  let board = []
  for (let i = 0; i < dataTop.length - 1; i++) {
    board.push(`<code>${dataTop[i][0]}</code> <b>${dataTop[i][1]}: ${dataTop[i][2]}</b>\n`)
  }
  let text = '🏆 <b>Таблица лидеров</b>\n\n' + board.slice(0, 20).join('');
  console.log(text)
  return text
}
function thanks(query) {
  let dataThanks = wsSetting.getRange(2, 1, wsSetting.getLastRow() - 1).getValues().flat();

  return dataThanks.filter(function (el) {
    return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
  })
}

function matchesThanks(query) {
  // query = '+'
  query = query.toLowerCase().replace(/[\s.,№#"'%?!&()<>]/g, ' ').split(' ').filter(Boolean)
  let dataThanks = wsSetting.getRange(2, 1, wsSetting.getLastRow() - 1).getValues().flat();

  let matches = dataThanks.filter(function (item) {
    return query.indexOf(item.toLowerCase()) > -1
  })
  return matches
}

function getTrophy(chatId) {
  let arrChatId = wsData.getRange(2, 4, wsData.getLastRow()).getValues().flat();
  let idRow = arrChatId.indexOf(+chatId) + 2;
  let trophy = false
  if (idRow > 1 && idRow < 5) {
    trophy = wsData.getRange(idRow, 1).getValue();
  }
  return trophy
}

function getUserInfo(first_name = '', last_name = '', username = '') {
  let user = {
    first_name: first_name,
    last_name: last_name == '' ? '' : ' ' + last_name,
    username: username
  }
  return user
}