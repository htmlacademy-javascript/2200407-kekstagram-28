import { isEscapeKey } from './util.js';

const COMMENTS_COUNT = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCloseElement = document.querySelector('.big-picture__cancel');
const bigPictureImgElement = document.querySelector('.big-picture__img img');
const bigPictureLikeElement = document.querySelector('.likes-count');
const bigPictureCaptionElement = document.querySelector('.social__caption');
const bigPictureCountCommentsElement = document.querySelector('.social__comment-count');
const commentsCountSpanElement = bigPictureCountCommentsElement.querySelector('.comments-count');
const bigPictureCommentsElement = document.querySelector('.social__comments');
const commentsButtonLoaderElement = document.querySelector('.comments-loader');
const commentTemplateElement = document.querySelector('#big-picture__comment')
  .content
  .querySelector('.social__comment');
let allComments = [];
let countCommentsRender = 0;

// Рендерим 1 комментарий для большого изображения
const renderComment = (comment) => {
  // Копируем элемент комментария
  const commentElement = commentTemplateElement.cloneNode(true);

  // Создаем изображение аватарки и прописываем все атрибуты
  const newAvatarPictureElement = commentElement.querySelector('.social__picture');
  newAvatarPictureElement.src = comment.avatar;
  newAvatarPictureElement.alt = comment.name;

  commentElement.querySelector('.social__text').textContent = comment.message;

  return commentElement;
};

// Показываем все комментарии для большого изображения
const addCommentsPicture = (comments) => {
  const fragmentCommentElement = document.createDocumentFragment();
  const countComments = comments.length > COMMENTS_COUNT ? COMMENTS_COUNT : comments.length;
  countCommentsRender += countComments;

  for (let i = 0; i < countComments; i++) {
    fragmentCommentElement.appendChild(renderComment(comments.shift()));
  }

  bigPictureCountCommentsElement.innerHTML = `${countCommentsRender} из ${commentsCountSpanElement.outerHTML} комментариев`;

  bigPictureCommentsElement.appendChild(fragmentCommentElement);
};

// Показываем первые комментарии к фотографии
const showCommentsPicture = (comments) => {
  allComments = comments.slice();
  countCommentsRender = 0;
  // Удаляем все комментарии из шаблона и показываем сгенерированные
  bigPictureCommentsElement.replaceChildren();

  if (comments.length > COMMENTS_COUNT) {
    commentsButtonLoaderElement.classList.remove('hidden');
  } else {
    commentsButtonLoaderElement.classList.add('hidden');
  }

  commentsCountSpanElement.textContent = comments.length;

  addCommentsPicture(allComments);
};

// Обработчик кнопки загрузки комментариев
function onCommentsButtonLoaderElementClick() {
  addCommentsPicture(allComments);
  if (allComments.length === 0) {
    commentsButtonLoaderElement.classList.add('hidden');
  }
}

// Функция закрытия полноразмерного режима для просмотра фотографии
const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscKeydown);
  bigPictureCloseElement.removeEventListener('click', onBigPictureCloseElementClick);
  commentsButtonLoaderElement.removeEventListener('click', onCommentsButtonLoaderElementClick);
};

// Обработчик закрытия полноразмерного режима по click
function onBigPictureCloseElementClick() {
  closeBigPicture();
}

// Обработчик закрытия полноразмерного режима по esc
function onDocumentEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

// Показываем фотографию в полноразмерном режиме
const openBigPicture = (picture) => {
  document.addEventListener('keydown', onDocumentEscKeydown);
  bigPictureCloseElement.addEventListener('click', onBigPictureCloseElementClick);

  bigPictureImgElement.src = picture.url;
  bigPictureImgElement.alt = picture.description;

  bigPictureLikeElement.textContent = picture.likes;
  bigPictureCaptionElement.textContent = picture.description;

  showCommentsPicture(picture.comments);

  commentsButtonLoaderElement.addEventListener('click', onCommentsButtonLoaderElementClick);

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

export { openBigPicture };
