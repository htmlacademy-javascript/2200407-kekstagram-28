const pictureTemplateElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesContainerElement = document.querySelector('.pictures');

// Рендерим миниатюры изображений других пользователей
const renderThumbnails = (allPhotos) => {
  const fragmentPicturesElement = document.createDocumentFragment();


  allPhotos.forEach((photo) => {
    const pictureElement = pictureTemplateElement.cloneNode(true);
    const img = pictureElement.querySelector('.picture__img');

    img.src = photo.url;
    img.alt = photo.description;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

    fragmentPicturesElement.appendChild(pictureElement);
  });

  picturesContainerElement.appendChild(fragmentPicturesElement);
};

export { renderThumbnails };
