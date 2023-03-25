import { renderThumbnails } from './thumbnail.js';
import { openBigPicture } from './big-picture.js';

const picturesContainerElement = document.querySelector('.pictures');

// генерируем галлерею и вешаем событие на открытие
const renderGallery = (pictures) => {
  // Открытие большой фотографию по click/enter
  picturesContainerElement.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');

    if (!thumbnail) {
      return;
    }

    const picture = pictures.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId
    );
    openBigPicture(picture);
  });

  renderThumbnails(pictures, picturesContainerElement);
};

export { renderGallery };
