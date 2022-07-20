// Функция возвращает случайное целое число из переданного диапазона включительно.
// Если входные данные не корректны, то функция возвращает -1
function getRandomInteger(minValue, maxValue) {
  return ((minValue >= 0) && (minValue < maxValue)) ?
    Math.floor(minValue + Math.random() * (maxValue - minValue + 1)) : -1;
}

// Функция для проверки максимальной длины строки.
// Возвращает true, если строка проходит по длине, и false — если не проходит
function checkStringLength(str, maxLength) {
  return String(str).length <= maxLength;
}

getRandomInteger(0, 5);
checkStringLength('Строка', 6);

const images = [];

class UnrepeatedRandomInteger {
  static getNewValue() {
    if (this.useValues === undefined) {
      this.useValues = [];
    }
    let randomValue;
    do {
      randomValue = getRandomInteger(0, 1000);
    } while (this.useValues.includes(randomValue));
    this.useValues.push(randomValue);
    return randomValue;
  }
}

class Comment {
  constructor() {
    this.id = UnrepeatedRandomInteger.getNewValue();
    this.avatar = `img/avatar-${getRandomInteger(1, 6)}.svg`;
    const messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',];
    this.message = messages[getRandomInteger(0, messages.length - 1)];
    const names = ['Артем', 'Люба', 'Дима', 'Ира', 'Сергей', 'Владимир', 'Светлана', 'Игорь'];
    this.name = names[getRandomInteger(0, names.length - 1)];
  }
}

class Img {
  constructor(index) {
    this.id = index;
    this.url = `photos/${index}.jpg`;
    this.description = `Описание картинки ${index}`;
    this.likes = getRandomInteger(15, 200);
    this.comments = [];
    for (let i = 0; i < getRandomInteger(0, 5); i++) {
      this.comments.push(new Comment());
    }
  }
}

for (let i = 1; i <= 25; i++) {
  images.push(new Img(i));
}
