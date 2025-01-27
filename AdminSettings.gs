const tgBotToken = "???"; //Токен Бота
const botSheet   = ???'; //ID таблицы
const superAdmin = [???]; //ID админа
const webAppURL  = '???'; // URL развёртывания

let PROGRAM_NAME = "Telegram бот для взаимодействия с Вашими учащимися"
let DATE_CURRENT = new Date().toLocaleDateString('Ru')
let VERSION = "<b>1.2.1</b>" //вводится рандомно, если планируются доработки кода


function setWebHook() {
  let payload = {
    url: webAppURL
  };
  let response = Bot.request('setWebhook', payload);
  Logger.log(JSON.stringify(response));
}

function deleteWebHook() {
  let payload = {
    url: webAppURL
  };
  let response = Bot.request('deleteWebhook', payload);
  Logger.log(JSON.stringify(response));
}

function oneTimeSetup() {
  Bot.settingUpBotSheet();
}

function scheduleClearTmp_() {
  Bot.cleanUpBotTmpData();
}

function scheduler() {
  ScriptApp.newTrigger('scheduleClearTmp_').timeBased().everyDays(1).atHour(4).nearMinute(5).inTimezone("Asia/Yekaterinburg").create();
}

function doGet(e) {
}

const threaded = [//образец многопоточного разговора
  { q: 'Назови мне свое полное имя.' },
  { q: 'Введите Ваш пол?',
    o: {'reply_markup': {'keyboard': [[{ 'text': 'Мужской' }],[{ 'text': 'Женский' }]],'resize_keyboard': true,'one_time_keyboard': true,'input_field_placeholder': 'Мужской или Женский?'}},
    v: '^Мужской$|^Женский$',
    w: '_Нажмите на клавиатуру ниже._' },//warning
  { q: 'Какой у вас номер идентификационной карты?'},
  { q: 'Введите Ваш номер телефона',
    o: {'reply_markup': {'keyboard': [[{ 'text': 'Отправить номер телефона', 'request_contact': true }]],'resize_keyboard': true,'one_time_keyboard': true,'input_field_placeholder': 'Номер телефона'}},
    v: '^\\d{11}$',
    w: '_Неверный номер телефона. Пожалуйста, введите снова._'}
];
