import {closeBtn, closeModal} from './modal.js';
import {isEscKey, showAlert} from './utils.js';
import {form, previewEl, scaleValueEl, removeEffect} from './add-effect.js';
import {sendData} from './api.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successMessageTemplate.cloneNode(true);
const closeSuccessMessageBtn = successMessage.querySelector('.success__button');

const errMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errMessage = errMessageTemplate.cloneNode(true);
const closeErrMessageBtn = errMessage.querySelector('.error__button');
const errorContainer = form.querySelector('.img-upload__text');
const submitBtn = form.querySelector('.img-upload__submit');

const blockBtn = function (){
  submitBtn.setAttribute('disabled', true);
};

const unblockBtn = function (){
  submitBtn.removeAttribute('disabled');
};

//валидация формы
const pristine = new Pristine(form,{
  classTo: 'img-upload__text',
  errorClass: 'has-danger',
  errorTextTag: 'div',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'text__error'
});

const cleanForm = function(){
  previewEl.className = '';
  scaleValueEl.value = 100;
  previewEl.style.transform = `scale(${(scaleValueEl.value) / 100})`;
  if(errorContainer.classList.contains('has-danger')) {
    errorContainer.classList.remove('has-danger');
    form.querySelector('.text__error').style.display = 'none';
  }
  form.reset();
  previewEl.style = '';
};

const hideMessage = function(){
  const messageEl = successMessage || errMessage;
  messageEl.remove();
  document.body.style.overflow = 'auto';
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener( 'click', onOverlayClick);
};

function onMessageEscKeydown(event){
  if(isEscKey(event)){
    hideMessage();
  }
}

function onOverlayClick(event){
  if((event.target.className !== 'success__inner') || (event.target.className !== 'error__inner')){
    hideMessage();
  }
}

const showSuccessMessage = function(){
  document.body.append(successMessage);
  document.body.style.overflow = 'hidden';
  closeSuccessMessageBtn.addEventListener('click', hideMessage);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener( 'click', onOverlayClick);
};

const showErrorMessage = function (){
  document.body.append(errMessage);
  document.body.style.overflow = 'hidden';
  closeErrMessageBtn.addEventListener('click', hideMessage);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener( 'click', onOverlayClick);
};

form.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  const isValid = pristine.validate();
  if(isValid){
    const formData = new FormData(evt.target);
    blockBtn();
    sendData(
      () => {
        showSuccessMessage();
        cleanForm();
        removeEffect();
        closeModal();
        unblockBtn();
      },
      () => {
        showErrorMessage();
        unblockBtn();
      },
      formData
    );
  } else {
    showAlert('Поля заполнены неверно');
  }
});

closeBtn.addEventListener('click', removeEffect);
closeBtn.addEventListener('click', cleanForm);

export {cleanForm, removeEffect, form, previewEl, showSuccessMessage};
