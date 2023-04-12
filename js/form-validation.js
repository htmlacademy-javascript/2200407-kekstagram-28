const REG_EXP = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS = 5;
const HASHTAG_MESSAGE_ERROR = `Разрешается использовать не более ${MAX_HASHTAGS} уникальных хэштэгов, длина каждого не более 20 символов каждый (включая решётку). Сначала #, а после - буквы и цифры!`;

const editPictureFormElement = document.querySelector('.img-upload__form');
const hashTagElement = document.querySelector('.text__hashtags');

const pristine = new Pristine(editPictureFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error',
}, false);

// Проверяем регулярным выражением на разрешенные символы в хэштеге, и на количество символов в одном теге
const isHashTagRegExp = (hashTags) => hashTags.some((hashTag) => REG_EXP.test(hashTag));

// Проверяем нет ли дублей в хэштеге
const isHashTagDuplicate = (hashTags) => new Set(hashTags).size === hashTags.length;

// Проверяем на кол-во хэштегов в массиве
const isHashTagsCountLength = (hashTags) => hashTags.length <= MAX_HASHTAGS;

// Проверяем хэштеги на критерии в ТЗ
const validateHashTags = (value) => {
  // Если ничего не пришло, то и проверять ничего не нужно
  if (!value) {
    return true;
  }
  // Разбиваем хэш-теги на массив
  const hashTags = value.toLowerCase().split(/\s+/);
  const isValid = isHashTagRegExp(hashTags) && isHashTagDuplicate(hashTags) && isHashTagsCountLength(hashTags);

  return isValid;
};

const addValidation = () => pristine.addValidator(hashTagElement, validateHashTags, HASHTAG_MESSAGE_ERROR);

const resetPristine = () => pristine.reset();
const validatePristine = () => pristine.validate();

export { addValidation, validatePristine, resetPristine };
