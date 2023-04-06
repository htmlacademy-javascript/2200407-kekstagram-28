import { isEscapeKey, renderMessage } from './util.js';

const MessageType = {
  ERROR: 'error',
  SUCCESS: 'success',
};

const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
const successTemplateElement = document.querySelector('#success').content.querySelector('.success');

let messageCloneElement = null;

// Удаляем сообщение и обработчик
const removeMessage = () => {
  messageCloneElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
};

// Обработчик закрытия сообщения по esc
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeMessage();
  }
}

// Обработчик закрытия сообщения по клику
function onMessageCloneElementClick(evt) {
  evt.preventDefault();
  if (evt.target.closest('.error__button') || evt.target.matches('.error') || evt.target.closest('.success__button') || evt.target.matches('.success')) {
    removeMessage();
  }
}

// Создаем сообщение
const createMessage = (typeMessage, customTest) => {
  messageCloneElement = typeMessage === MessageType.ERROR ? errorTemplateElement.cloneNode(true) : successTemplateElement;

  // Если пришел кастомный текст, то в тайтл появляется пояснение
  if (customTest) {
    const titleElement = messageCloneElement.querySelector(`.${typeMessage}__title`);
    titleElement.textContent = customTest;
  }
  renderMessage(messageCloneElement);

  document.addEventListener('keydown', onDocumentKeydown);
  messageCloneElement.addEventListener('click', onMessageCloneElementClick);
};

export { createMessage, MessageType};
