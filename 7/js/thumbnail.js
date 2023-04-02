const pictureTemplateElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// Рендерим миниатюры изображений других пользователей
const renderThumbnails = (allPictures, element) => {
  const fragmentPicturesElement = document.createDocumentFragment();


  allPictures.forEach((picture) => {
    const pictureElement = pictureTemplateElement.cloneNode(true);
    const imgElement = pictureElement.querySelector('.picture__img');

    imgElement.src = picture.url;
    imgElement.alt = picture.description;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.dataset.thumbnailId = picture.id;

    fragmentPicturesElement.appendChild(pictureElement);
  });

  element.appendChild(fragmentPicturesElement);
};

export { renderThumbnails };
