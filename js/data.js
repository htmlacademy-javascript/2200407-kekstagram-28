import {getRandomInteger} from './util.js';

const COUNT_PICTURES = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR_COUNT = 1;
const MAX_AVATAR_COUNT = 6;
const COUNT_COMMENTS = 18; // Добавила количество комментариев больше при генерации, чтобы комментрии показывались больше 5 для отработки кнопки «Загрузить ещё»
const COUNT_MESSAGES = 2;

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Анна',
  'Люси',
  'Люпита',
  'Вашингтон',
];

const DESCRIPTIONS = [
  'описание фотографии 1',
  'описание фотографии 2',
  'описание фотографии 3',
  'описание фотографии 4',
  'описание фотографии 5'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const generateMessages = (number) => {
  let messages = '';
  for (let i = 1; i <= number; i++) {
    messages += MESSAGES[getRandomInteger(0, MESSAGES.length - 1)];
  }

  return messages;
};

const createComment = (number, indexPhoto) => ({
  id: (indexPhoto * 10 + number),
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_COUNT, MAX_AVATAR_COUNT)}.svg`,
  message: generateMessages(getRandomInteger(1, COUNT_MESSAGES)),
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
});

const generateComments = (number) => {
  const comments = [];
  for (let i = 1; i <= getRandomInteger(1, COUNT_COMMENTS); i++) {
    comments.push(createComment(i, number));
  }

  return comments;
};

const createPicture = (number) => ({
  id: number,
  url: `photos/${number}.jpg`,
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: generateComments(number),
});

const generatePictures = () => {
  const pictures = [];
  for (let i = 1; i <= COUNT_PICTURES; i++) {
    pictures.push(createPicture(i));
  }

  return pictures;
};

export {generatePictures};
