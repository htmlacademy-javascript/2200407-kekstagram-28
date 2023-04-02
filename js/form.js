import { isEscapeKey } from './util.js';
import { addValidation, validatePristine, resetPristine } from './form-validation.js';
import { activateEffects, destroySlider, activateScaleControl, removeScaleControl } from './form-effects.js';
import { createErrorMessage, createSuccessMessage } from './show-message.js';

const FILE_TYPES = ['gif', 'png', 'jpeg', 'jpg'];
const FILE_TYPES_ERROR_MESSAGE = 'Допустимы только файлы изображений: gif, png, jpeg, jpg';

const uploadPictureElement = document.querySelector('.img-upload__overlay');
const uploadPictureInputElement = document.querySelector('.img-upload__input');
const pictureCloseButtonElement = document.querySelector('.img-upload__cancel');
const editPictureFormElement = document.querySelector('.img-upload__form');
const hashTagElement = document.querySelector('.text__hashtags');
const descriptionInputElement = document.querySelector('.text__description');
const submitButtonElement = document.querySelector('.img-upload__submit');
const picturePreviewElement = document.querySelector('.img-upload__preview img');

// Закрываем форму редактирования изображения, если не в фокусе на элементах указанных в ТЗ
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !hashTagElement.matches(':focus') && !descriptionInputElement.matches(':focus')) {
    closeEditPictureForm();
  }
}

// Показываем форму редактирования изображения
const showEditPictureElement = () => {
  activateScaleControl();
  activateEffects();
  uploadPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

// Закрывает форму и сбрасываем в исходное состояние
const closeEditPictureForm = () => {
  editPictureFormElement.reset();
  destroySlider();
  removeScaleControl();
  resetPristine();

  uploadPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);

};

// Блокируем кнопку отправки
const blockSubmitButton = () => {
  submitButtonElement.disabled = !submitButtonElement.disabled;
};

// Обработчик Submit формы
const onEditPictureFormSubmit = (evt) => {
  evt.preventDefault();

  // Если валидация прошла то блокируем кнопку и отправляем данны
  if (validatePristine()) {
    blockSubmitButton();
    // Тут будет потом добавлена отправка данных на сервер, а пока просто показываю информацию об успешной отправке, закрываю форму если валидация проходит
    createSuccessMessage();
    closeEditPictureForm();
    blockSubmitButton();
  }
};

// Обработчик загрузки изображения
const onFileUploadChange = () => {
  const file = uploadPictureInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const isImage = fileName ? FILE_TYPES.some((type) => fileName.endsWith(type)) : false;

  if (isImage) {
    picturePreviewElement.src = URL.createObjectURL(file);
    showEditPictureElement();
  } else {
    createErrorMessage(FILE_TYPES_ERROR_MESSAGE);
  }
};

// Обработчик кнопки закрытия формы редактирования изображения
const onEditPictureCloseButtonClick = (evt) => {
  evt.preventDefault();
  closeEditPictureForm();
};

// Иницируем работу с формой
const initFormActions = () => {
  uploadPictureInputElement.addEventListener('change', onFileUploadChange);
  editPictureFormElement.addEventListener('submit', onEditPictureFormSubmit);
  pictureCloseButtonElement.addEventListener('click', onEditPictureCloseButtonClick);

  addValidation();
};

export { initFormActions, showEditPictureElement, closeEditPictureForm };
