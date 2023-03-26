const pictureTemplateElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// Рендерим миниатюры изображений других пользователей
const renderThumbnails = (allPhotos, element) => {
  const fragmentPicturesElement = document.createDocumentFragment();


  allPhotos.forEach((photo) => {
    const pictureElement = pictureTemplateElement.cloneNode(true);
    const imgElement = pictureElement.querySelector('.picture__img');

    imgElement.src = photo.url;
    imgElement.alt = photo.description;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.dataset.thumbnailId = photo.id;

    fragmentPicturesElement.appendChild(pictureElement);
  });

  element.appendChild(fragmentPicturesElement);
};

export { renderThumbnails };
