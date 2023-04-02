import { renderThumbnails } from './thumbnail.js';
import { openBigPicture } from './big-picture.js';

const picturesContainerElement = document.querySelector('.pictures');

// генерируем галлерею и вешаем событие на открытие
const renderGallery = (pictures) => {
  // Открытие большой фотографию по click/enter
  picturesContainerElement.addEventListener('click', (evt) => {
    const thumbnailElement = evt.target.closest('[data-thumbnail-id]');

    if (!thumbnailElement) {
      return;
    }

    const thumbnailId = +thumbnailElement.dataset.thumbnailId;

    const picture = pictures.find(
      ({ id }) => id === thumbnailId
    );
    openBigPicture(picture);
  });

  renderThumbnails(pictures, picturesContainerElement);
};

export { renderGallery };
