import { isEscapeKey } from './util.js';
import { addValidation, validatePristine, resetPristine } from './form-validation.js';
import { activateEffects, destroySlider, activateScaleControl, removeScaleControl } from './form-effects.js';
import { createMessage, MessageType } from './show-message.js';
import { sendData } from './backend.js';

const FILE_TYPES = ['gif', 'png', 'jpeg', 'jpg'];
const FILE_TYPES_ERROR_MESSAGE = `Допустимы только файлы изображений: ${FILE_TYPES.join(', ')}`;

const uploadPictureElement = document.querySelector('.img-upload__overlay');
const uploadPictureInputElement = document.querySelector('.img-upload__input');
const pictureCloseButtonElement = document.querySelector('.img-upload__cancel');
const editPictureFormElement = document.querySelector('.img-upload__form');
const hashTagElement = document.querySelector('.text__hashtags');
const descriptionInputElement = document.querySelector('.text__description');
const submitButtonElement = document.querySelector('.img-upload__submit');
const picturePreviewElement = document.querySelector('.img-upload__preview img');

// Показываем форму редактирования изображения
const showEditPictureElement = () => {
  activateScaleControl();
  activateEffects();
  uploadPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  pictureCloseButtonElement.addEventListener('click', onPictureCloseButtonElementClick);
};

// Закрывает форму и сбрасываем в исходное состояние
const closeEditPictureForm = () => {
  uploadPictureElement.classList.add('hidden');
  editPictureFormElement.reset();
  destroySlider();
  removeScaleControl();
  resetPristine();
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  pictureCloseButtonElement.removeEventListener('click', onPictureCloseButtonElementClick);
};

// Обработчик закрытия формы редактирования изображения, если не в фокусе на элементах указанных в ТЗ
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !hashTagElement.matches(':focus') && !descriptionInputElement.matches(':focus')) {
    closeEditPictureForm();
  }
}

// Обработчик Submit формы
function onEditPictureFormElementSubmit(evt) {
  evt.preventDefault();

  // Если валидация прошла то блокируем кнопку и отправляем данны
  if (validatePristine()) {
    submitButtonElement.disabled = true;

    // Отправляем данные на сервер
    sendData(new FormData(evt.target))
      .then(() => {
        createMessage(MessageType.SUCCESS);
        closeEditPictureForm();
      })
      .catch(() => createMessage(MessageType.ERROR))
      .finally(() => {
        submitButtonElement.disabled = false;
      });
  }
}

// Обработчик загрузки изображения
function onUploadPictureInputElementChange() {
  const file = uploadPictureInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const isImage = fileName ? FILE_TYPES.some((type) => fileName.endsWith(type)) : false;

  if (isImage) {
    picturePreviewElement.src = URL.createObjectURL(file);
    showEditPictureElement();
  } else {
    createMessage(MessageType.ERROR, FILE_TYPES_ERROR_MESSAGE);
    uploadPictureInputElement.value = '';
  }
}

// Обработчик кнопки закрытия формы редактирования изображения
function onPictureCloseButtonElementClick(evt) {
  evt.preventDefault();
  closeEditPictureForm();
}

// Иницируем работу с формой
const initFormActions = () => {
  uploadPictureInputElement.addEventListener('change', onUploadPictureInputElementChange);
  editPictureFormElement.addEventListener('submit', onEditPictureFormElementSubmit);

  addValidation();
};

export { initFormActions, showEditPictureElement, closeEditPictureForm };
