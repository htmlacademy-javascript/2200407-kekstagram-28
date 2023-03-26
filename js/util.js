// Генерируем случайное число в диапозоне min - max
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция для проверки длины строки
const checkStringLength = (text, maxLength) => (
  text.length <= maxLength
);

const isEscapeKey = ({ key }) => key.startsWith('Esc');

export {getRandomInteger, isEscapeKey};
