// Генерируем случайное число в диапозоне min - max
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Проверяем нажат ли Esc
const isEscapeKey = ({ key }) => key.startsWith('Esc');

// Добавляем и показываем сообщение
const renderMessage = (element) => document.body.append(element);

// Функция debounce для устранения дребезга
const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// Перемешиваем случайно массив
const shuffleArrayRandom = (array) => {
  for (let i = 0; i < array.length - 1; i++) {
    const j = getRandomInteger(0, array.length - 1);
    const buffer = array[i];
    array[i] = array[j];
    array[j] = buffer;
  }

  return array;
};

export {getRandomInteger, isEscapeKey, renderMessage, debounce, shuffleArrayRandom };
