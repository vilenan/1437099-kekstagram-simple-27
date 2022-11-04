const form = document.querySelector('.img-upload__form');
const previewEl = form.querySelector('.img-upload__preview img');

const zoomOutBtn = form.querySelector('.scale__control--smaller');
const zoomInBtn = form.querySelector('.scale__control--bigger');
const scaleValueEl = form.querySelector('.scale__control--value');

const sliderEl = form.querySelector('.effect-level__slider');
const effectValueEl = form.querySelector('.effect-level__value');


const SCALE_STEP = 25;
const effects = {
  none : {
    name: 'none',
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    filter: '',
    prefix: '',
  },
  chrome : {
    name: 'chrome',
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    filter: 'grayscale',
    prefix: '',
  },
  sepia: {
    name: 'sepia',
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    filter: 'sepia',
    prefix: '',
  },
  marvin: {
    name: 'marvin',
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1,
    filter: 'invert',
    prefix: '%',
  },
  phobos: {
    name: 'phobos',
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    filter: 'blur',
    prefix: 'px',
  },
  heat: {
    name: 'heat',
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    filter: 'brightness',
    prefix: '',
  },
};

noUiSlider.create(sliderEl, {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  connect: 'lower',
});
let currentEffect;

const addEffect = function (evt){
  currentEffect = effects[evt.target.value]; //какой эффект выбран heat, объект
  previewEl.className = '';
  previewEl.classList.add(`effects__preview--${evt.target.value}`);
  sliderEl.noUiSlider.updateOptions({
    range: {
      min: currentEffect.range.min,
      max: currentEffect.range.max,
    },
    start: currentEffect.start,
    step: currentEffect.step,
  });
  return currentEffect;
};

sliderEl.noUiSlider.on('update', () => {
  const effectValue = sliderEl.noUiSlider.get(true);
  effectValueEl.value = effectValue;
  if(currentEffect && currentEffect.name !== effects.none.name){
    sliderEl.removeAttribute('disabled');
    previewEl.style.filter = `${currentEffect.filter}(${effectValue}${currentEffect.prefix})`;
  } else {
    previewEl.style.filter = '';
    sliderEl.setAttribute('disabled', true);
  }
});

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

