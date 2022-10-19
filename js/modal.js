import {isEscKey} from './utils.js';
// <input type="file" id="upload-file" class="img-upload__input  visually-hidden" name="filename" required>
//находим поле для загрузки изображения
const uploadBtn = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const closeBtn = document.querySelector('#upload-cancel');

//функция закрытия при нажатии на Esc
const onEscKeydown = (evt)=> {
  if (isEscKey(evt)){
    closeModal();
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

export {uploadBtn, closeBtn};
