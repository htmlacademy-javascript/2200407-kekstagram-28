const SCALE_STEP = 25;
const SCALE_MAX = 100;
const SCALE_MIN = 25;
const EFFECTS_NONE = 'none';

const effectToSettings = {
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    css: 'grayscale',
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    css: 'sepia',
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    css: 'invert',
    unit: '%',
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    css: 'blur',
    unit: 'px',
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    css: 'brightness',
  },
};

const picturePreviewElement = document.querySelector('.img-upload__preview img');
const effectsListElement = document.querySelector('.img-upload__effects');
const sliderElement = document.querySelector('.img-upload__effect-level');
const levelSliderElement = document.querySelector('.effect-level__slider');
const sliderValueElement = document.querySelector('.effect-level__value');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlAllElement = document.querySelectorAll('.scale__control');

let typeEffect = '';

// Обработчик изменения масштаба фотографии
function onScaleControlAllElementClick(evt) {
  let scale = evt.target.className === scaleControlSmallerElement.className ? -SCALE_STEP : SCALE_STEP;
  scale += Number(scaleControlValueElement.value.replace('%', ''));

  if (scale <= SCALE_MAX && scale >= SCALE_MIN) {
    scaleControlValueElement.value = `${scale}%`;
    scale /= 100;
    picturePreviewElement.style.transform = `scale(${scale})`;
  }
}

// Активируем обработчики масштаба фотографии
const activateScaleControl = () => {
  scaleControlAllElement.forEach((element) => {
    element.addEventListener('click', onScaleControlAllElementClick);
  });
};

// Удаляем обработчики масштаба фотографии
const removeScaleControl = () => {
  scaleControlAllElement.forEach((element) => {
    element.removeEventListener('click', onScaleControlAllElementClick);
  });
};

//  Функция обновления параметров слайдера
const updateSliderParams = (min = 0, max = 100, step = 1) => {
  levelSliderElement.noUiSlider.updateOptions({
    range: {
      min,
      max,
    },
    step,
    start: max,
  });
};

// Функция обновления эффекта
const updateEffectFilter = () => {
  picturePreviewElement.className = picturePreviewElement.className.replace(/effects__preview--\w+/g, ''); // сбрасываем классы, чтобы не накапливались перед измененением
  if (typeEffect !== EFFECTS_NONE) {
    sliderElement.classList.remove('hidden');
    picturePreviewElement.classList.add(`effects__preview--${typeEffect}`);
  } else {
    sliderElement.classList.add('hidden');
    picturePreviewElement.style.filter = '';
    sliderValueElement.value = '';
  }
};

// Обрабочик изменения эффекта на другой
function onEffectsListElementChange(evt) {
  if (evt.target.closest('.effects__radio')) {
    typeEffect = evt.target.value;

    updateEffectFilter();
    updateSliderParams(effectToSettings?.[typeEffect]?.min, effectToSettings?.[typeEffect]?.max, effectToSettings?.[typeEffect]?.step);
  }
}

// Обработчик изменения эффектов по бегунку слайдера
function onLevelSliderElementUpdate() {
  const valueCurrent = levelSliderElement.noUiSlider.get();
  sliderValueElement.value = valueCurrent;

  const effectCurrent = effectToSettings?.[typeEffect]?.css ?? '';
  const unitCurrent = effectToSettings?.[typeEffect]?.unit ?? '';

  picturePreviewElement.style.filter = `${effectCurrent}(${valueCurrent}${unitCurrent})`;
}

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
  effectsListElement.removeEventListener('change', onEffectsListElementChange);
  sliderElement.classList.add('hidden');
  picturePreviewElement.style.transform = '';
  picturePreviewElement.className = picturePreviewElement.className.replace(/effects__preview--\w+/g, '');
  typeEffect = '';
  sliderValueElement.value = null;
};

const activateEffects = () => {
  createSlider();

  effectsListElement.addEventListener('change', onEffectsListElementChange);
  levelSliderElement.noUiSlider.on('update', onLevelSliderElementUpdate);
};

export { activateEffects, destroySlider, activateScaleControl, removeScaleControl };
