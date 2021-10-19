import { getListOfAnnouncement } from './data.js';

const typesOfHousing = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const offerGenerator = function() {
  const similarListElement = document.querySelector('#map-canvas');
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const similarOffers = getListOfAnnouncement();

  similarOffers.forEach((item, i) => {
    const offerElement = cardTemplate.cloneNode(true);
    const offer = item.offer;

    const avatar = offerElement.querySelector('.popup__avatar');
    if (item.author && item.author.avatar) {
      avatar.src = item.author.avatar;
    } else {
      avatar.remove();
    }

    const title = offerElement.querySelector('.popup__title');
    if (offer.title) {
      title.textContent = offer.title;
    } else {
      title.remove();
    }

    const address = offerElement.querySelector('.popup__text--address');
    if (offer.address) {
      address.textContent = offer.address;
    } else {
      address.remove();
    }

    const price = offerElement.querySelector('.popup__text--price');
    if (offer.price) {
      price.textContent = `${offer.price} ₽/ночь`;
    } else {
      price.remove();
    }

    const type = offerElement.querySelector('.popup__type');
    if (offer.type) {
      type.textContent = typesOfHousing[offer.type];
    } else {
      type.remove();
    }

    const capacity = offerElement.querySelector('.popup__text--capacity');
    if (offer.rooms || offer.guests) {
      capacity.textContent = `${offer.rooms} комнаты для ${offer.guests} ${offer.guests > 1 ? 'гостей' : 'гостя'}`;
    } else {
      capacity.remove();
    }

    const time = offerElement.querySelector('.popup__text--time');
    if (offer.checkin || offer.checkout) {
      time.textContent = `${offer.checkin ? `Заезд после ${offer.checkin}` : ''}
                            ${offer.checkin && offer.checkout ? ', ' : ''}
                            ${offer.checkout ? `выезд до ${offer.checkout}` : ''}`;
    } else {
      time.remove();
    }

    const description = offerElement.querySelector('.popup__description');
    if (offer.description) {
      description.textContent = offer.description;
    } else {
      description.remove();
    }

    const featuresContainer = offerElement.querySelector('.popup__features');
    const featuresList = featuresContainer.querySelectorAll('.popup__feature');

    featuresList.forEach( (featureListItem) => {
      const isNecessary = offer.features.some(
        (feature) => featureListItem.classList.contains(`popup__feature--${feature}`),
      );

      if (!isNecessary) {
        featureListItem.remove();
      }
    });

    const photoContainer = offerElement.querySelector('.popup__photos');
    const photoItem = photoContainer.querySelector('.popup__photo');
    photoContainer.innerHTML = '';

    offer.photos.forEach( (photo) => {
      const photoNew = photoItem.cloneNode(true);
      photoNew.src = photo;
      photoContainer.appendChild(photoNew);
    });

    if (i === 0) {
      similarListElement.appendChild(offerElement);
    }
  });
};

export { offerGenerator };
