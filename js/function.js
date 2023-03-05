// Функция для проверки длины строки
const checkStringLength = (text, maxLength) => {
  return text.length <= maxLength;
};

// Функция для проверки, является ли строка палиндромом
const isPalindrome = (text) => {
  let textString = '';
  for (let i = text.length; i > 0; i--) {
    if (text[i - 1] !== ' ') {
      textString += text[i - 1];
    }
  }

  if (text.split(' ').join('').toLowerCase() === textString.toLowerCase()) {
    return true;
  }

  return false;
};

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
const extractNumbers = (text) => {
  let result = '';

  // Если приходит число, то преобразуем его в строку для правильной обработки в соответствии с заданием
  if (typeof text === 'number') {
    text = String(text);
  }

  for (let i = 0; i < text.length; i++) {
    const element = text[i];
    if (!isNaN(element) && element !== ' ') {
      result += element;
    }
  }

  return parseInt(result, 10);
};

// Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины. Символы добавляются в начало строки.
const transformPadStart = (text, minLength, pad) => {
  let result = text;

  while (result.length < minLength) {
    const newResultLength = result.length + pad.length;
    const actualPad = newResultLength <= minLength
      ? pad
      : pad.slice(0, minLength - newResultLength);
    result = actualPad + result;
  }

  return result;
};

checkStringLength('проверяемая строка', 18);
isPalindrome('Лёша на полке клопа нашёл ');
extractNumbers('1 кефир, 0.5 батона');
transformPadStart('q', 4, 'we');
