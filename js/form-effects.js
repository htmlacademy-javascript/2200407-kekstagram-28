const effectSettings = {
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
const SCALE_MAX = 100;
const SCALE_MIN = 25;
const EFFECTS_NONE = 'NONE';

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
    picturePreviewElement.classList.add(`effects__preview--${typeEffect.toLowerCase()}`);
  } else {
    sliderElement.classList.add('hidden');
    picturePreviewElement.style.filter = '';
    sliderValueElement.value = '';
  }
};

// Обрабочик изменения эффекта на другой
function onEffectsListElementChange(evt) {
  if (evt.target.closest('.effects__radio')) {
    typeEffect = evt.target.value.toUpperCase();

    updateEffectFilter();
    updateSliderParams(effectSettings?.[typeEffect]?.MIN, effectSettings?.[typeEffect]?.MAX, effectSettings?.[typeEffect]?.STEP);
  }
}

// Обработчик изменения эффектов по бегунку слайдера
function onLevelSliderElementUpdate() {
  const valueCurrent = levelSliderElement.noUiSlider.get();
  sliderValueElement.value = valueCurrent;

  const effectCurrent = effectSettings?.[typeEffect]?.CSS ?? '';
  const unitCurrent = effectSettings?.[typeEffect]?.UNIT ?? '';

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
