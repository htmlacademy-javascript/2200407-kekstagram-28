import { renderGallery } from './gallery.js';
import { debounce, shuffleArrayRandom } from './util.js';

const COUNT_RANDOM_PICTURES = 10;
const DELAY_INTERVAL = 500;

const picturesFiltersElement = document.querySelector('.img-filters');
const filterRandomElement = document.querySelector('#filter-random');
const filterDiscussedElement = document.querySelector('#filter-discussed');

// Удаляем все созданные ранее изображения
const removePictures = (elements) => elements.forEach((element) => element.remove());

// Сортируем изображения случайно
const sortRandom = (data) => shuffleArrayRandom(data).slice(0, COUNT_RANDOM_PICTURES);

// Сортируем изображения по количеству комментариев
const sortDiscussed = (data) => data.sort((a, b) => b.comments.length - a.comments.length);

// Обновляем изображения в соответствии с выбранным фильтром сортировки
const updatePictures = (targetElement, pictures) => {
  let copyPictures = pictures.slice();

  if (targetElement === filterRandomElement) {
    copyPictures = sortRandom(copyPictures);
  }
  if (targetElement === filterDiscussedElement) {
    copyPictures = sortDiscussed(copyPictures);
  }

  removePictures(document.querySelectorAll('.picture'));
  renderGallery(copyPictures);
};

// Рендерим изображения используя приём «устранение дребезга»
const renderPicturesDelay = debounce((targetElement, pictures) => updatePictures(targetElement, pictures), DELAY_INTERVAL);

// Иницируем работу с фильтрами сортировки изображений
const initSortPicturesActions = (pictures) => {
  picturesFiltersElement.classList.remove('img-filters--inactive');

  picturesFiltersElement.addEventListener('click', (evt) => {
    if (evt.target.closest('.img-filters__button') && !evt.target.closest('.img-filters__button--active')) {
      const activeFilterElement = picturesFiltersElement.querySelector('.img-filters__button--active');
      activeFilterElement.classList.remove('img-filters__button--active');

      renderPicturesDelay(evt.target, pictures);
      evt.target.classList.add('img-filters__button--active');
    }
  });
};

export { initSortPicturesActions };
