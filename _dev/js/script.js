/// маска для телефонного номера

function mask(inputName, mask, evt) {
    try {
        var text = document.getElementById(inputName);
        var value = text.value;

        // If user pressed DEL or BACK SPACE, clean the value
        try {
            var e = (evt.which) ? evt.which : event.keyCode;
            if ( e == 46 || e == 8 ) {
                text.value = "";
                return;
            }
        } catch (e1) {}

        var literalPattern=/[0\*]/;
        var numberPattern=/[0-9]/;
        var newValue = "";

        for (var vId = 0, mId = 0 ; mId < mask.length ; ) {
            if (mId >= value.length)
            break;

            // Number expected but got a different value, store only the valid portion
            if (mask[mId] == '0' && value[vId].match(numberPattern) == null) {
                break;
            }

            // Found a literal
            while (mask[mId].match(literalPattern) == null) {
                if (value[vId] == mask[mId])
                break;

                newValue += mask[mId++];
            }

            newValue += value[vId++];
            mId++;
        }

        text.value = newValue;
    } catch(e) {}
}


/// валидация id клиента, добавление id в html код для вставки на страницу клиента

var numButton = document.querySelector('.num__submit');
var numValue = document.querySelector('#InputIdNum');
var clientHtml = document.querySelector('.client__html');

numButton.addEventListener('click', function (event) {
    event.preventDefault();
    var clientId = numValue.value;
    console.log(clientId);

    clientHtml.innerHTML = '&lt;div class="one_click_cont"&gt; data-num=\''+ clientId + '\'\n' +
        '    &lt;a href="https://callme.sipiko.net/viber/order1click/index.php">Кормораздатчики&lt;/a&gt;\n' +
        '&lt;/div&gt;';

    /// сохранение html кнопки в local storage
    var buttonHtmlCode = document.querySelector('.button__cont');
    console.log(buttonHtmlCode.outerHTML);
    var serialBtn = JSON.stringify(buttonHtmlCode.outerHTML);
    localStorage.setItem("ButtonCode", serialBtn);
})

/// расширенные css-настройки кнопки

var cssRequest = document.querySelector('.custom_set-btn');

cssRequest.addEventListener('click', function (event) {
    event.preventDefault();

    /// изменяемые элементы
    var phoneField = document.querySelector('.one__click-phonefield');
    var button = document.querySelector('.one__click-submit');

    /// вытягиваем css-параметры введённые пользователей
    var inputWidth = document.querySelector('.input__width').value;
    var buttonWidth = document.querySelector('.button__width').value;
    var inputBorderColor = document.querySelector('.input__border-color').value;
    var buttonBackground = document.querySelector('.button__background').value;
    var buttonBorderColor = document.querySelector('.button_border-color').value;
    var borderRadius = document.querySelector('.border__radius').value;
    var inputFontSize = document.querySelector('.input__font-size').value;
    var buttonFontSize = document.querySelector('.button__font-size').value;
    var borderWidth = document.querySelector('.border__width').value;

    /// меняем параметры инпута телефонного номера
    phoneField.style.width = inputWidth+'px';
    phoneField.style.borderColor = inputBorderColor;
    phoneField.style.fontSize = inputFontSize+'px';

    /// меняем параметры кнопки

    button.style.width = buttonWidth+'px';
    button.style.background = buttonBackground;
    button.style.borderColor = buttonBorderColor;
    button.style.fontSize = buttonFontSize;

    /// меняем общие параметры

    button.style.borderRadius = 0+' '+borderRadius+'px'+' '+borderRadius+'px'+' '+0;
    phoneField.style.borderRadius = borderRadius+'px'+' '+0+' '+0+' '+borderRadius+'px';
    button.style.borderWidth = borderWidth;
    phoneField.style.borderWidth = borderWidth;

    /// меняем кнопку в local storage

    /// сохранение html кнопки в local storage
    var buttonHtmlCode = document.querySelector('.button__cont');
    console.log(buttonHtmlCode.outerHTML);
    var serialBtn = JSON.stringify(buttonHtmlCode.outerHTML);
    localStorage.setItem("ButtonCode", serialBtn);

})

/////// copy text
var copyDiv = new Clipboard('.copy-text');
var copyScript = new Clipboard('.copy-script');

