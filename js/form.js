import {uploadBtn, closeBtn} from './modal.js';
import {isEscKey} from './utils.js';

const form = document.querySelector('.img-upload__form');

//поле ввода комментария
const description = form.querySelector('.text__description');

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successMessageTemplate.cloneNode(true);
const closeSuccessMessageBtn = successMessage.querySelector('.success__button');

const errMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errMessage = errMessageTemplate.cloneNode(true);
const closeErrMessageBtn = errMessage.querySelector('.error__button');

//валидация формы
const pristine = new Pristine(form);

form.addEventListener('submit', (evt)=>{
  const isValid = pristine.validate();
  evt.preventDefault();
  if(isValid){
    //Если отправка данных прошла успешно, показывается соответствующее сообщение. Разметку сообщения, которая находится в блоке #success внутри
    // шаблона template, нужно разместить перед закрывающим тегом </body>
    // Сообщение должно исчезать после нажатия на кнопку .success__button,
    // по нажатию на клавишу Esc и по клику на произвольную область экрана за пределами блока с сообщением.
    document.body.append(successMessage);
    //добавляем обработчик события по крестику
    closeSuccessMessageBtn.addEventListener('click', ()=>{
      successMessage.remove();
    });
    //добавляем обработчик события по Esc
    document.addEventListener('keydown', (event)=>{
      if(isEscKey(event)){
        successMessage.remove();
      }
    });
    //добавляем обработчик события по области вне модалки
    document.addEventListener( 'click', (e) => {
      if(e.target.className !== 'success__inner'){
        successMessage.remove();
      }
    });
    // поля для ввода комментария очищаются;
    description.value = '';
    // поле загрузки фотографии, стилизованное под букву «О» в логотипе, очищается.
    uploadBtn.value = '';
    // При успешной отправке формы: масштаб возвращается к 100%;
    // эффект сбрасывается на «Оригинал»;
  } else {
    //Если при отправке данных произошла ошибка запроса, нужно показать соответствующее сообщение.
    // Разметку сообщения, которая находится в блоке #error внутри шаблона template,
    // нужно разместить перед закрывающим тегом </body>. Сообщение должно исчезать после нажатия на кнопку .error__button, по нажатию на клавишу Esc
    // и по клику на произвольную область экрана за пределами блока с сообщением.
    // В таком случае вся введённая пользователем информация сохраняется, чтобы у него была возможность отправить форму повторно.
    document.body.append(errMessage);
    closeErrMessageBtn.addEventListener('click', ()=>{
      errMessage.remove();
    });
    document.addEventListener('keydown', (event)=>{
      if(isEscKey(event)){
        errMessage.remove();
      }
    });
    document.addEventListener( 'click', (e) => {
      if(e.target.className !== 'error__inner'){
        errMessage.remove();
      }
    });
  }
});

//Нажатие на кнопку #upload-cancel приводит к закрытию формы и возвращению всех данных к исходному состоянию
closeBtn.addEventListener('click', ()=>{
  // поля для ввода комментария очищаются;
  description.value = '';
  // поле загрузки фотографии, стилизованное под букву «О» в логотипе, очищается.
  uploadBtn.value = '';
});
