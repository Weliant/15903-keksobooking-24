function getCorrectPositiveOrZeroValues(value){
  return value < 0 ? 0 : value;
}

function calculateRandomIntFromRange(min, max){
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function getRandomIntFromRange(from, to) {
  // проверяем значения на корректность
  const correctFrom = getCorrectPositiveOrZeroValues(from);
  const correctTo = getCorrectPositiveOrZeroValues(to);

  if(correctFrom >= correctTo){
    if(correctFrom === correctTo){
      return correctFrom;
    } else {
      // если значение correctTo меньше correctFrom
      return calculateRandomIntFromRange(correctTo, correctFrom);
    }
  }

  return calculateRandomIntFromRange(correctFrom, correctTo);
}

function calculateRandomNumber(min, max, quantity){
  // получаем целочисленные min и max, отбрасывая знаки после запятой, которые нас не интересуют, ориентируясь на quantity
  const roundMin = Math.floor(min * quantity);
  const roundMax = Math.floor(max * quantity);
  // вычисляем целочисленный результат
  const randomInt = Math.floor(Math.random() * (roundMax + 1 - roundMin) + roundMin);
  // возвращаем число, основываясь на значении quantity
  return randomInt/quantity;
}

function getRandomCoordinate (from, to, quantity) {
  // получаем число для вычисления целочисленных значений
  const count = Math.pow(10, quantity);
  // проверяем значения на корректность
  const correctFrom = getCorrectPositiveOrZeroValues(from);
  const correctTo = getCorrectPositiveOrZeroValues(to);

  if(correctFrom >= correctTo){
    if(correctFrom === correctTo){
      return correctFrom;
    } else {
      // если значение correctTo меньше correctFrom
      return calculateRandomNumber(correctTo, correctFrom, count);
    }
  }

  return calculateRandomNumber(correctFrom, correctTo, count);
}

const NAMES = [
  'Купить',
  'Сдать',
  'Сдать на ночь',
  'Продать',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

function getArrayOfRandomValues(data, random = false) {
  const allCount = count = getRandomIntFromRange(1, data.length);
  let list = [];

  if (random) {
    const listIndex = [];
    while(count > 0){
      const num = getRandomIntFromRange(0, allCount - 1);
      const idx = listIndex.indexOf(num);

      if (idx === -1) {
        listIndex.push(num);
        count--;
      }
    }

    listIndex.forEach((value) => {
      list.push(data[value]);
    });
  } else {
    list = data.slice(0, allCount + 1);
  }

  return list;
}

const createAuthor = () => {
  const num = getRandomIntFromRange(1, 10);
  return { avatar: `img/avatars/user${num < 10 ? `0${num}` : num}.png`};
};

const createLocation = () => ({
  lat: getRandomCoordinate(35.65000, 35.70000, 5),
  lng: getRandomCoordinate(139.70000, 139.80000, 5),
});

const createOffer = () => ({
  title: NAMES[getRandomIntFromRange(0, NAMES.length - 1)],
  address: `${createLocation().lat}, ${createLocation().lng}`,
  price: getRandomIntFromRange(0, 1000),
  type: TYPES[getRandomIntFromRange(0, TYPES.length - 1)],
  rooms: getRandomIntFromRange(1, 5),
  guests: getRandomIntFromRange(1, 10),
  checkin: CHECKIN[getRandomIntFromRange(0, CHECKIN.length - 1)],
  checkout: CHECKOUT[getRandomIntFromRange(0, CHECKOUT.length - 1)],
  features: getArrayOfRandomValues(FEATURES, true),
  description: 'Просторная комната с двумя окнами во двор',
  photos: getArrayOfRandomValues(PHOTOS),
});

const createAnnouncement = () => ({
  author: createAuthor(),
  offer: createOffer(),
  location: createLocation(),
});

const similarAnnouncement = Array.from({length: 10}, createAnnouncement);

console.log('similarAnnouncement', similarAnnouncement);
