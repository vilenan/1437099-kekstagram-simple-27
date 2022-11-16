import {isEscKey} from './utils.js';
import {cleanForm, successMessage, errMessage} from './form.js';
import {preview, resetSlider} from './add-effect.js';

const uploadBtn = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const closeBtn = document.querySelector('#upload-cancel');

uploadBtn.addEventListener('change',()=> {
  const localPhoto = uploadBtn.files[0];
  if (localPhoto) {
    preview.src = URL.createObjectURL(localPhoto);
  }
});

const onEscKeydown = function (evt){
  if (isEscKey(evt) && (!document.body.contains(successMessage)) && (!document.body.contains(errMessage))){
    closeModal();
    cleanForm();
    resetSlider();
  }
};

function openModal(){
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
}

function closeModal(){
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
}

uploadBtn.addEventListener('change', openModal);
closeBtn.addEventListener('click', closeModal);

export {uploadBtn, closeBtn, closeModal};
