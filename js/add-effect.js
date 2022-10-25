const form = document.querySelector('.img-upload__form');
const previewEl = form.querySelector('.img-upload__preview img');

const effectNone = form.querySelector('#effect-none');
const effectChrome = form.querySelector('#effect-chrome');
const effectSepia = form.querySelector('#effect-sepia');
const effectMarvin = form.querySelector('#effect-marvin');
const effectPhobos = form.querySelector('#effect-phobos');
const effectHeat = form.querySelector('#effect-heat');

const zoomOutBtn = form.querySelector('.scale__control--smaller');
const zoomInBtn = form.querySelector('.scale__control--bigger');
const scaleValueEl = form.querySelector('.scale__control--value');
// scaleValueEl.value = '100';
// console.log(`scale(${(scaleValueEl.value) / 100})`);

// previewEl.style.transform = `scale(${(scaleValueEl.value) / 100})`;

const sliderEl = form.querySelector('.effect-level__slider');

const SCALE_STEP = 25;

// noUiSlider.create(sliderEl, {
//   range: {
//     min: 25,
//     max: 100
//   },
//   start: 100,
//   step: 25,
//   connect: 'lower',
// });

const addEffect = function (evt){
  if(evt.target === effectNone){
    previewEl.className = '';
    previewEl.classList.add('effects__preview--none');
  }
  if(evt.target === effectChrome){
    previewEl.className = '';
    previewEl.classList.add('effects__preview--chrome');
  } else
  if(evt.target === effectSepia){
    previewEl.className = '';
    previewEl.classList.add('effects__preview--sepia');
  } else
  if(evt.target === effectMarvin){
    previewEl.className = '';
    previewEl.classList.add('effects__preview--marvin');
  }
  if(evt.target === effectPhobos) {
    previewEl.className = '';
    previewEl.classList.add('effects__preview--phobos');
  }
  if(evt.target === effectHeat) {
    previewEl.className = '';
    previewEl.classList.add('effects__preview--heat');
  }
};

// sliderEl.noUiSlider.on('update', () => {
//   scaleValueEl.value = sliderEl.noUiSlider.get(true);
//   previewEl.style.transform = `scale(${(scaleValueEl.value) / 100})`;
// });


// const scaleValueNum = parseInt(scaleValueEl.value,10);

const increaseImage = function (){
  let scale = parseInt(scaleValueEl.value,10);
  if(scale > 25) {
    scale -= SCALE_STEP;
    previewEl.style.transform = `scale(${(scale) / 100})`;
    scaleValueEl.value = `${scale}%`;
  }
};

const shrinkImage = function (){
  let scale = parseInt(scaleValueEl.value,10);
  if(scale < 100){
    scale += SCALE_STEP;
    previewEl.style.transform = `scale(${(scale) / 100})`;
    scaleValueEl.value = `${scale}%`;
  }
};

zoomOutBtn.addEventListener('click', increaseImage);
zoomInBtn.addEventListener('click', shrinkImage);

export {addEffect, previewEl, form, scaleValueEl};

