const EFFECTS_PARAMS = {
  CHROME: {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    CSS: 'grayscale',
  },
  SEPIA: {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    CSS: 'sepia',
  },
  MARVIN: {
    MIN: 0,
    MAX: 100,
    STEP: 1,
    CSS: 'invert',
    UNIT: '%',
  },
  PHOBOS: {
    MIN: 0,
    MAX: 3,
    STEP: 0.1,
    CSS: 'blur',
    UNIT: 'px',
  },
  HEAT: {
    MIN: 1,
    MAX: 3,
    STEP: 0.1,
    CSS: 'brightness',
  },
};

const SCALE_STEP = 25;

const picturePreviewElement = document.querySelector('.img-upload__preview img');
const effectsListElement = document.querySelector('.img-upload__effects');
const sliderElement = document.querySelector('.img-upload__effect-level');
const levelSliderElement = document.querySelector('.effect-level__slider');
const sliderValueElement = document.querySelector('.effect-level__value');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');

let typeEffect = '';

// Изменяем масштаб фотографии
const onScaleControlChange = function (evt) {
  let scale = evt.target.className === scaleControlSmallerElement.className ? -SCALE_STEP : SCALE_STEP;
  scale += Number(scaleControlValueElement.value.replace('%', ''));

  if (scale <= 100 && scale >= 25) {
    scaleControlValueElement.value = scale;
    scale /= 100;
    picturePreviewElement.style.transform = `scale(${scale})`;
  }
};

// Активируем обработчики масштаба фотографии
const activateScaleControl = () => {
  scaleControlSmallerElement.addEventListener('click', onScaleControlChange);
  scaleControlBiggerElement.addEventListener('click', onScaleControlChange);
};

// Удаляем обработчики масштаба фотографии
const removeScaleControl = () => {
  scaleControlSmallerElement.removeEventListener('click', onScaleControlChange);
  scaleControlBiggerElement.removeEventListener('click', onScaleControlChange);
};

//  Функция обновления параметров слайдера
const updateParamsSlider = (min = 0, max = 100, step = 1) => {
  levelSliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    step: step,
    start: max,
  });
};

// Функция обновления эффекта
const updateEffectFilter = () => {
  picturePreviewElement.className = ''; // сбрасываем классы, чтобы не накапливались перед измененением
  if (typeEffect !== 'NONE') {
    sliderElement.classList.remove('hidden');
    picturePreviewElement.classList.add(`effects__preview--${typeEffect.toLowerCase()}`);
  } else {
    sliderElement.classList.add('hidden');
    picturePreviewElement.style.filter = '';
    sliderValueElement.value = null;
  }
};

// Обрабочик изменения эффекта на другой
const onEffectItemChange = (evt) => {
  if (evt.target.closest('.effects__radio')) {
    typeEffect = evt.target.value.toUpperCase();

    updateEffectFilter();
    updateParamsSlider(EFFECTS_PARAMS?.[typeEffect]?.MIN, EFFECTS_PARAMS?.[typeEffect]?.MAX, EFFECTS_PARAMS?.[typeEffect]?.STEP);
  }
};

// Обработчик изменения эффектов по бегунку слайдера
const onLevelSliderUpdate = () => {
  const valueCurrent = levelSliderElement.noUiSlider.get();
  sliderValueElement.value = valueCurrent;

  const effectCurrent = EFFECTS_PARAMS?.[typeEffect]?.CSS ?? '';
  const unitCurrent = EFFECTS_PARAMS?.[typeEffect]?.UNIT ?? '';

  picturePreviewElement.style.filter = `${effectCurrent}(${valueCurrent + unitCurrent})`;
};

const createSlider = () => {
  picturePreviewElement.style.filter = '';
  noUiSlider.create(levelSliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower'
  });
};

// Удаляем и скрываем слайдер, удаляем обработчик, сбрасываем стили
const destroySlider = () => {
  levelSliderElement.noUiSlider.destroy();
  effectsListElement.removeEventListener('change', onEffectItemChange);
  sliderElement.classList.add('hidden');
  picturePreviewElement.style = '';
  picturePreviewElement.className = '';
  typeEffect = '';
  sliderValueElement.value = null;
};

const activateEffects = () => {
  createSlider();

  effectsListElement.addEventListener('change', onEffectItemChange);
  levelSliderElement.noUiSlider.on('update', onLevelSliderUpdate);
};

export { activateEffects, destroySlider, activateScaleControl, removeScaleControl };
