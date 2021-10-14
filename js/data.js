import { getRandomIntFromRange, getRandomCoordinate } from './util.js';

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

const DESCRIPTION = [
  'Просторная комната с двумя окнами во двор',
  'Комната с одним окном',
  'Две спальни и большой зал с балконом',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getArrayOfRandomValues = function(data, random = false) {
  const allCount = getRandomIntFromRange(1, data.length);
  let count = allCount;
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
};

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
  description: DESCRIPTION[getRandomIntFromRange(0, DESCRIPTION.length - 1)],
  photos: getArrayOfRandomValues(PHOTOS),
});

const createAnnouncement = () => ({
  author: createAuthor(),
  offer: createOffer(),
  location: createLocation(),
});

const getListOfAnnouncement = () => Array.from({length: 10}, createAnnouncement);

export { getListOfAnnouncement };
