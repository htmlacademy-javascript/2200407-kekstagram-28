import { isEscapeKey } from './util.js';

const AVATAR_SIZE = 35; // Создала константу размера автарки, потому что вдруг в дальнейшем оно поменяется
const COMMENTS_COUNT = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCloseElement = document.querySelector('.big-picture__cancel');
const bigPictureImgElement = document.querySelector('.big-picture__img');
const bigPictureLikeElement = document.querySelector('.likes-count');
const bigPictureCaptionElement = document.querySelector('.social__caption');
const bigPictureCountCommentsElement = document.querySelector('.social__comment-count');
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
  newAvatarPictureElement.width = AVATAR_SIZE;
  newAvatarPictureElement.height = AVATAR_SIZE;

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

  const commentsCountSpanElement = bigPictureCountCommentsElement.querySelector('.comments-count');

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

  bigPictureCountCommentsElement.querySelector('.comments-count').textContent = comments.length;

  addCommentsPicture(allComments);
};

// Обработчик кнопки загрузки комментариев
const onLoadMoreComments = () => {
  addCommentsPicture(allComments);
  if (allComments.length === 0) {
    commentsButtonLoaderElement.classList.add('hidden');
  }
};

// Функции закрытия полноразмерного режима для просмотра фотографии
const onCloseBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscPressBigPicture);
  bigPictureCloseElement.removeEventListener('click', onCloseBigPicture);
  commentsButtonLoaderElement.removeEventListener('click', onLoadMoreComments);
};

// Обработчик закрытия полноразмерного режима по esc
const onEscPressBigPicture = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseBigPicture();
  }
};

// Показываем фотографию в полноразмерном режиме
const openBigPicture = (picture) => {
  document.addEventListener('keydown', onEscPressBigPicture);
  bigPictureCloseElement.addEventListener('click', onCloseBigPicture);

  bigPictureImgElement.querySelector('img').src = picture.url;

  bigPictureLikeElement.textContent = picture.likes;
  bigPictureCaptionElement.textContent = picture.description;

  showCommentsPicture(picture.comments);

  commentsButtonLoaderElement.addEventListener('click', onLoadMoreComments);

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

export { openBigPicture };
