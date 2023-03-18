import {generatePhotos} from './data.js';

// Рендерим миниатюры изображений других пользователей
const renderingThumbnail = () => {
  const allPhotos = generatePhotos();
  const fragmentAllPictures = document.createDocumentFragment();
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  const picturesContainerElement = document.querySelector('.pictures');

  allPhotos.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

    fragmentAllPictures.appendChild(pictureElement);
  });

  picturesContainerElement.appendChild(fragmentAllPictures);
};

export {renderingThumbnail};
