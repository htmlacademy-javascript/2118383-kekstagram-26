// Функция возвращает случайное целое число из переданного диапазона включительно.
// Если входные данные не корректны, то функция возвращает -1
function getRandomInteger(minValue, maxValue) {
  if ((minValue >= 0) && (minValue < maxValue)) {
    return Math.floor(minValue + Math.random() * (maxValue - minValue + 1));
  } else {
    return -1;
  }
}

// Функция для проверки максимальной длины строки.
// Возвращает true, если строка проходит по длине, и false — если не проходит
function checkStringLength(str, maxLength) {
  return String(str).length <= maxLength;
}

getRandomInteger(0, 5);
checkStringLength('Строка', 6);
