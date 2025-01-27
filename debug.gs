function debug(TelegramJSON) {//json файл последнего действия в листе JSON
  let ss = SpreadsheetApp.openById(botSheet);
  ss.getSheetByName("JSON").getRange(1, 1).setValue(JSON.stringify(TelegramJSON, null, 7));
}