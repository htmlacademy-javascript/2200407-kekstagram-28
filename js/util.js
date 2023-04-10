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
    timeoutId = setTimeout(callback, timeoutDelay, ...rest);
  };
};

// Перемешиваем случайно массив
const shuffleDataRandom = (data) => {
  for (let i = 0; i < data.length - 1; i++) {
    const randomIndex = getRandomInteger(0, data.length - 1);
    const buffer = data[i];
    data[i] = data[randomIndex];
    data[randomIndex] = buffer;
  }

  return data;
};

const removeElement = (element) => {
  element.remove();
};

export {getRandomInteger, isEscapeKey, renderMessage, debounce, shuffleDataRandom, removeElement };
