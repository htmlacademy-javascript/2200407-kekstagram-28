import { openBigPicture } from './big-picture.js';

const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// Рендерим миниатюру изображения, вешаем событие на открытие, добавляем на экран
const renderThumbnail = (picture) => {
  const pictureElement = pictureTemplateElement.cloneNode(true);
  const imgElement = pictureElement.querySelector('.picture__img');

  imgElement.src = picture.url;
  imgElement.alt = picture.description;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.dataset.thumbnailId = picture.id;

  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(picture);
  });

  return pictureElement;
};

// генерируем галлерею и показываем фильтры
const renderGallery = (pictures) => {
  const fragmentPicturesElement = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnailElement = renderThumbnail(picture);
    fragmentPicturesElement.appendChild(thumbnailElement);
  });

  picturesContainerElement.appendChild(fragmentPicturesElement);
};

export { renderGallery };
