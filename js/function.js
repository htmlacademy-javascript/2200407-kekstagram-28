// Функция для проверки длины строки
const checkStringLength = (str, stringLength) => {
  if (str.length <= stringLength) {
    return true;
  }

  return false;
};

// Функция для проверки, является ли строка палиндромом
const isPalindrome = (str) => {
  let check = '';
  for (let i = str.length; i > 0; i--) {
    if (str[i - 1] !== ' ') {
      check += str[i - 1];
    }
  }

  if (str.split(' ').join('').toLowerCase() === check.toLowerCase()) {
    return true;
  }

  return false;
};

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
const extractNumbers = (str) => {
  let result = '';

  // Если приходит число, то преобразуем его в строку для правильной обработки в соответствии с заданием
  if (!isNaN(str)) {
    str = String(str);
  }

  for (let i = 0; i < str.length; i++) {
    if (!isNaN(str[i]) && str[i] !== ' ') {
      result += str[i];
    }
  }

  return parseInt(result, 10);
};

// Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины. Символы добавляются в начало строки.
const myPadStart = (str, minLength, pad) => {
  let result = str;

  while (result.length < minLength) {
    const newResultLength = result.length + pad.length;
    const actualPad = newResultLength <= minLength ? pad :
      pad.slice(0, minLength - newResultLength);
    result = actualPad + result;
  }

  return result;
};

checkStringLength('проверяемая строка', 18);
isPalindrome('Лёша на полке клопа нашёл ');
extractNumbers('1 кефир, 0.5 батона');
myPadStart('q', 4, 'we');
