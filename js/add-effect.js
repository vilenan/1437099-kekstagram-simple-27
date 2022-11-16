const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const EFFECTS = {
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

const form = document.querySelector('.img-upload__form');
const preview = form.querySelector('.img-upload__preview img');
const zoomOutBtn = form.querySelector('.scale__control--smaller');
const zoomInBtn = form.querySelector('.scale__control--bigger');
const scaleValue = form.querySelector('.scale__control--value');
const slider = form.querySelector('.effect-level__slider');
const sliderWrapper = form.querySelector('.effect-level');
const effectLevel = form.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

let currentEffect;

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  connect: 'lower',
});

const updateSlider = function (effect){
  slider.noUiSlider.updateOptions({
    range: {
      min: effect.range.min,
      max: effect.range.max,
    },
    start: effect.start,
    step: effect.step,
  });
};

const onChangeEffectItem = function (evt){
  currentEffect = EFFECTS[evt.target.value];
  preview.className = '';
  preview.classList.add(`effects__preview--${evt.target.value}`);
  updateSlider(currentEffect);
};

const resetSlider = function (){
  currentEffect = EFFECTS.none;
  sliderWrapper.style.display = 'none';
};

slider.noUiSlider.on('update', () => {
  const effectValue = slider.noUiSlider.get(true);
  effectLevel.value = effectValue;
  if(currentEffect && currentEffect.name !== EFFECTS.none.name){
    sliderWrapper.style.display = 'block';
    preview.style.filter = `${currentEffect.filter}(${effectValue}${currentEffect.prefix})`;
  } else {
    preview.style.filter = '';
    sliderWrapper.style.display = 'none';
  }
});

const onZoomOutBtnClick = function (){
  let scale = parseInt(scaleValue.value,10);
  if(scale > MIN_SCALE_VALUE) {
    scale -= SCALE_STEP;
    preview.style.transform = `scale(${(scale) / 100})`;
    scaleValue.value = `${scale}%`;
  }
};

const onZoomInBtnClick = function (){
  let scale = parseInt(scaleValue.value,10);
  if(scale < MAX_SCALE_VALUE){
    scale += SCALE_STEP;
    preview.style.transform = `scale(${(scale) / 100})`;
    scaleValue.value = `${scale}%`;
  }
};

zoomOutBtn.addEventListener('click', onZoomOutBtnClick);
zoomInBtn.addEventListener('click', onZoomInBtnClick);
effectsList.addEventListener('change', onChangeEffectItem);

export {preview, form, scaleValue, effectLevel, resetSlider, onChangeEffectItem};

