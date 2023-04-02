import { isEscapeKey, renderMessage } from './util.js';

const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
const successTemplateElement = document.querySelector('#success').content.querySelector('.success');

let errorMessageClone;
let successMessageClone;

// Обработчик закрытия сообщения об ошибке по esc
const onErrorMessageKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeErrorMessage();
  }
};

// Обработчик закрытия сообщения об успешной отправке по esc
const onSuccessMessageKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeSuccessMessage();
  }
};

// Обработчик закрытия сообщения об ошибке по клику
const onErrorMessageClick = (evt) => {
  evt.preventDefault();
  if (evt.target.closest('.error__button')) {
    removeErrorMessage();
  }
};

// Обработчик закрытия сообщения об успешной по клику
const onSuccessMessageClick = (evt) => {
  evt.preventDefault();
  if (evt.target.closest('.success__button')) {
    removeSuccessMessage();
  }
};

// Удаляем сообщение об ошибке и обработчик
const removeErrorMessage = () => {
  errorMessageClone.remove();
  document.removeEventListener('keydown', onErrorMessageKeydown);
};

// Удаляем сообщение об успешной отправки и обработчик
const removeSuccessMessage = () => {
  successMessageClone.remove();
  document.removeEventListener('keydown', onSuccessMessageKeydown);
};

// Создаем сообщение об ошибке
const createErrorMessage = (customTest) => {
  errorMessageClone = errorTemplateElement.cloneNode(true);

  // Если пришел кастомный текст, то в тайтл появляется пояснение
  if (customTest) {
    const errorTitleElement = errorMessageClone.querySelector('.error__title');
    errorTitleElement.textContent = customTest;
  }
  renderMessage(errorMessageClone);

  document.addEventListener('keydown', onErrorMessageKeydown);
  errorMessageClone.addEventListener('click', onErrorMessageClick);
};

// Создаем сообщение об успешной отправки
const createSuccessMessage = () => {
  successMessageClone = successTemplateElement.cloneNode(true);
  renderMessage(successMessageClone);

  document.addEventListener('keydown', onSuccessMessageKeydown);
  successMessageClone.addEventListener('click', onSuccessMessageClick);

};

export { createErrorMessage, createSuccessMessage };
