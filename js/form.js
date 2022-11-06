import {closeBtn, closeModal} from './modal.js';
import {isEscKey} from './utils.js';
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

const showSuccessMessage = function (){
  document.body.append(successMessage);
  closeSuccessMessageBtn.addEventListener('click', ()=>{
    successMessage.remove();
  });
  document.addEventListener('keydown', (event)=>{
    if(isEscKey(event)){
      successMessage.remove();
    }
  });
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
    showErrorMessage();
  }
});

closeBtn.addEventListener('click', removeEffect);
closeBtn.addEventListener('click', cleanForm);

export {cleanForm, removeEffect, form, previewEl, showSuccessMessage};
