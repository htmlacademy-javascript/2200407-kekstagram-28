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

export {getRandomInteger, isEscapeKey, renderMessage };
