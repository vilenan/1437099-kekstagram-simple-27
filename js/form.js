import {uploadBtn, closeModal} from './modal.js';
import {isEscKey} from './utils.js';
import {form, previewEl, scaleValueEl, addEffect} from './add-effect.js';

const description = form.querySelector('.text__description');

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successMessageTemplate.cloneNode(true);
const closeSuccessMessageBtn = successMessage.querySelector('.success__button');

const errMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errMessage = errMessageTemplate.cloneNode(true);
const closeErrMessageBtn = errMessage.querySelector('.error__button');
const errorContainer = form.querySelector('.img-upload__text');

const effectsList = document.querySelector('.effects__list');

//валидация формы
const pristine = new Pristine(form,{
  classTo: 'img-upload__text',
  errorClass: 'has-danger',
  errorTextTag: 'div',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'text__error'
});

const cleanForm = function(){
  description.value = '';
  uploadBtn.value = '';
  previewEl.className = '';
  previewEl.classList.add('effects__preview--none');
  scaleValueEl.value = 100;
  previewEl.style.transform = `scale(${(scaleValueEl.value) / 100})`;
  if(errorContainer.classList.contains('has-danger')) {
    errorContainer.classList.remove('has-danger');
    form.querySelector('.text__error').style.display = 'none';
  }
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
    showSuccessMessage();
    cleanForm();
    closeModal();
  } else {
    showErrorMessage();
  }
});

effectsList.addEventListener('click', addEffect);

export {cleanForm, form, previewEl};
