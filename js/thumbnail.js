const pictureTemplateElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// Рендерим миниатюры изображений других пользователей
const renderThumbnails = (allPhotos, container) => {
  const fragmentPicturesElement = document.createDocumentFragment();


  allPhotos.forEach((photo) => {
    const pictureElement = pictureTemplateElement.cloneNode(true);
    const img = pictureElement.querySelector('.picture__img');

    img.src = photo.url;
    img.alt = photo.description;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.dataset.thumbnailId = photo.id;

    fragmentPicturesElement.appendChild(pictureElement);
  });

  container.appendChild(fragmentPicturesElement);
};

export { renderThumbnails };
