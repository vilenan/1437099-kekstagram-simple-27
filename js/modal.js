import {isEscKey} from './utils.js';
import {cleanForm, removeEffect} from './form.js';
import {previewEl} from './add-effect.js';

const uploadBtn = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const closeBtn = document.querySelector('#upload-cancel');

uploadBtn.addEventListener('change',()=> {
  const localPhoto = uploadBtn.files[0];
  if (localPhoto) {
    previewEl.src = URL.createObjectURL(localPhoto);
  }
});

//функция закрытия при нажатии на Esc
const onEscKeydown = (evt)=> {
  if (isEscKey(evt)){
    closeModal();
    cleanForm();
    removeEffect();
  }
};

function openModal(){
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
}

function closeModal(){
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
}

uploadBtn.addEventListener('change', openModal);
closeBtn.addEventListener('click', closeModal);

export {uploadBtn, closeBtn, closeModal};
