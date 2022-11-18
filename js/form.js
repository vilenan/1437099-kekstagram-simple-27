import {closeBtn, closeModal} from './modal.js';
import {isEscKey, showAlert} from './utils.js';
import {form, preview, scaleValue, resetSlider} from './add-effect.js';
import {sendData} from './api.js';

const DEFAULT_SCALE_VALUE = 100;
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successMessageTemplate.cloneNode(true);
const closeSuccessMessageBtn = successMessage.querySelector('.success__button');

const errMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errMessage = errMessageTemplate.cloneNode(true);
const closeErrMessageBtn = errMessage.querySelector('.error__button');
const errorContainer = form.querySelector('.img-upload__text');
const submitBtn = form.querySelector('.img-upload__submit');

const pristine = new Pristine(form,{
  classTo: 'img-upload__text',
  errorClass: 'has-danger',
  errorTextTag: 'div',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'text__error'
});

const blockBtn = () => {
  submitBtn.disabled = true;
  submitBtn.textContent = 'Загружаю...';
};

const unblockBtn = () => {
  submitBtn.disabled = false;
  submitBtn.textContent = 'Опубликовать';
};

const cleanForm = () => {
  preview.className = '';
  scaleValue.value = DEFAULT_SCALE_VALUE;
  preview.style.transform = `scale(${(scaleValue.value) / 100})`;
  form.reset();
  preview.style = '';
  if(errorContainer.classList.contains('has-danger')) {
    errorContainer.classList.remove('has-danger');
    form.querySelector('.text__error').style.display = 'none';
  }
};

const hideMessage = () => {
  let message;
  if(document.body.contains(successMessage)){
    message = successMessage;
  } else { message = errMessage;}
  message.remove();
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

const showSuccessMessage = () => {
  document.body.append(successMessage);
  document.body.style.overflow = 'hidden';
  closeSuccessMessageBtn.addEventListener('click', hideMessage);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener( 'click', onOverlayClick);
};

const showErrorMessage = () => {
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
        resetSlider();
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

closeBtn.addEventListener('click', resetSlider);
closeBtn.addEventListener('click', cleanForm);

export {cleanForm, form, successMessage, errMessage};
