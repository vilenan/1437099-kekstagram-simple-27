import {uploadBtn, closeBtn, closeModal} from './modal.js';
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
const pristine = new Pristine(form,{
  classTo: 'img-upload__text',
  errorClass: 'has-danger',
  errorTextTag: 'div',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'text__error'
});

const cleanForm = function(){
  // поля для ввода комментария очищаются;
  description.value = '';
  // поле загрузки фотографии, стилизованное под букву «О» в логотипе, очищается.
  uploadBtn.value = '';
  const errorContainer = form.querySelector('.img-upload__text');
  if(errorContainer.classList.contains('has-danger')) {
    errorContainer.classList.remove('has-danger');
    form.querySelector('.text__error').style.display = 'none';
  }
};

const showSuccessMessage = function (){
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
};

const showErrorMessage = function (){
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
};

form.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  const isValid = pristine.validate();
  if(isValid){
    showSuccessMessage();
    cleanForm();
    closeModal();
    // При успешной отправке формы: масштаб возвращается к 100%;
    // эффект сбрасывается на «Оригинал»;
  } else {
    showErrorMessage();
  }
});

//Нажатие на кнопку #upload-cancel приводит к закрытию формы и возвращению всех данных к исходному состоянию
closeBtn.addEventListener('click', cleanForm);
export {cleanForm};

