import { isEscapeKey } from './util.js';

const AVATAR_SIZE = 35; // Создала константу размера автарки, потому что вдруг в дальнейшем оно поменяется
const COMMENTS_COUNT = 5;

const bodyElement = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = document.querySelector('.big-picture__cancel');
const bigPictureImg = document.querySelector('.big-picture__img');
const bigPictureLike = document.querySelector('.likes-count');
const bigPictureCaption = document.querySelector('.social__caption');
const bigPictureCountComments = document.querySelector('.social__comment-count');
const bigPictureComments = document.querySelector('.social__comments');
const commentsButtonLoader = document.querySelector('.comments-loader');
let allComments = [];
let countCommentsRender;

// Рендерим 1 комментарий для большого изображения
const renderComment = (comment) => {
  // Создаем элемент списка
  const newComment = document.createElement('li');
  newComment.classList.add('social__comment');

  // Создаем изображение аватара и прописываем все атрибуты
  const newAvatarPicture = document.createElement('img');
  newAvatarPicture.classList.add('social__picture');
  newAvatarPicture.src = comment.avatar;
  newAvatarPicture.alt = comment.name;
  newAvatarPicture.width = AVATAR_SIZE;
  newAvatarPicture.height = AVATAR_SIZE;

  // Создаем текст комментария
  const newCommentText = document.createElement('p');
  newCommentText.classList.add('social__text');
  newCommentText.textContent = comment.message;

  newComment.appendChild(newAvatarPicture);
  newComment.appendChild(newCommentText);

  return newComment;
};

// Показываем все комментарии для большого изображения
const addCommentsPicture = (comments) => {
  const fragmentCommentElement = document.createDocumentFragment();
  const fragmentCountCommentsElement = document.createDocumentFragment();
  const countComments = comments.length > COMMENTS_COUNT ? COMMENTS_COUNT : comments.length;
  countCommentsRender += countComments;

  for (let i = 0; i < countComments; i++) {
    fragmentCommentElement.appendChild(renderComment(comments.shift()));
  }

  const commentsCountSpan = bigPictureCountComments.querySelector('.comments-count');

  // Удаляем содержимое блока количества комментариев и генерируем новое
  bigPictureCountComments.innerHTML = '';

  fragmentCountCommentsElement.textContent = `${countCommentsRender} из `;
  fragmentCountCommentsElement.appendChild(commentsCountSpan);
  fragmentCountCommentsElement.innerHtml += ' комментариев';

  // Показываем все блоки
  bigPictureCountComments.appendChild(fragmentCountCommentsElement);
  bigPictureComments.appendChild(fragmentCommentElement);
};

// Показываем первые комментарии к фотографии
const showCommentsPicture = (comments) => {
  allComments = comments.slice();
  countCommentsRender = 0;
  // Удаляем все комментарии из шаблона и показываем сгенерированные
  bigPictureComments.innerHTML = '';

  if (comments.length > COMMENTS_COUNT) {
    commentsButtonLoader.classList.remove('hidden');
  } else {
    commentsButtonLoader.classList.add('hidden');
  }

  bigPictureCountComments.querySelector('.comments-count').textContent = comments.length;

  addCommentsPicture(allComments);
};

// Обработчик кнопки загрузки комментариев
const onLoadMoreComments = () => {
  addCommentsPicture(allComments);
  if (allComments.length === 0) {
    commentsButtonLoader.classList.add('hidden');
  }
};

// Функции закрытия полноразмерного режима для просмотра фотографии
const onCloseBigPicture = () => {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscPressBigPicture);
  bigPictureClose.removeEventListener('click', onCloseBigPicture);
  commentsButtonLoader.removeEventListener('click', onLoadMoreComments);
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
  bigPictureClose.addEventListener('click', onCloseBigPicture);

  bigPictureImg.querySelector('img').src = picture.url;

  bigPictureLike.textContent = picture.likes;
  bigPictureCaption.textContent = picture.description;

  showCommentsPicture(picture.comments);

  commentsButtonLoader.addEventListener('click', onLoadMoreComments);

  bigPicture.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
};

export { openBigPicture };
