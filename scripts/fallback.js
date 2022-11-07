
var div = document.createElement('div');
div.id = 'browserFallbackCon';
div.style = 'width: 100%; position:absolute; display:block; min-height: 80px; top: 0; z-index: 9999; text-align: center; background: #fff8ea; padding: 12px;';
var texts = [
  { lang: 'en', value: 'Your web browser is out of date. For more security, comfort and the best experience on this site, please update to or use a modern browser' },
  { lang: 'de', value: 'Ihr Browser ist veraltet. Für mehr Sicherheit, Komfort und die beste Erfahrung auf dieser Website, aktualisieren Sie bitte oder verwenden Sie einen modernen Browser' },
  { lang: 'it', value: 'Il tuo browser non è aggiornato. Per una maggiore sicurezza, comodità e la migliore esperienza su questo sito, si prega di aggiornare o utilizzare un browser moderno.' },
];

var userLang = navigator.language || navigator.userLanguage;

var text = texts[0];
for(var i=0;i<texts.length;i++)
{
  if(userLang === texts[i].lang) {
    text = texts[i];
  }
}
var span = document.createElement('span');
span.lang = text.lang;
span.textContent = text.value
div.appendChild(span);

var button = document.createElement('a');
button.style = 'background-color: #1373e6; ' +
  'color: #fff; cursor: pointer; ' +
  'margin: 12px auto; ' +
  'text-decoration: none; ' +
  'font-style: normal; ' +
  'font-weight: 700;' +
  'display: block;' +
  'width: fit-content;' +
  'margin: auto; ' +
  'padding: 7px 18px 8px;' +
  'line-height: 20px;' +
  'border-radius: 20px;' +
  'font-size: 17px;' +
  'min-height: 21px;'

button.text = 'Ignore'
button.onclick = function () {
  var elem = document.getElementById('browserFallbackCon')
  elem.style = 'display: none'
}
div.appendChild(button);

if(!document.body) {
  document.body = document.createElement('body')
}
document.body.insertBefore(div, document.body.firstChild);
