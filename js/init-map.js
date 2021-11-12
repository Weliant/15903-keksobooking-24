import { toggleActiveStateOfForms, checkValidationForm } from './form.js';
import { offerGenerator } from './offer-generator.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

const addressInputElement = document.querySelector('#address');

const PRICES = {
  middle: { from: 10000, to: 50000},
  low: 10000,
  high: 50000,
};

const COORDINATES_OF_TOKIO = {
  lat: 35.68950,
  lng: 139.69171,
};

const SIMILAR_OFFER_COUNT = 10;

const map = L.map('map-canvas');

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 0,
    lng: 0,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
).addTo(map);

const markerGroup = L.layerGroup().addTo(map);

const initCoordinatesOfMainPinMarker = () => {
  mainPinMarker.setLatLng(COORDINATES_OF_TOKIO);
  addressInputElement.value = `${COORDINATES_OF_TOKIO.lat}, ${COORDINATES_OF_TOKIO.lng}`;
};

let pointsData = [];
let pointsDataFilter = [];

const renderPoints = (points) => {
  markerGroup.clearLayers();
  points.forEach((item) => {
    const pinIcon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat: item.location.lat,
        lng: item.location.lng,
      },
      {
        pinIcon,
      },
    );

    marker
      .addTo(markerGroup)
      .bindPopup(offerGenerator(item));
  });
};

const compareOffers = (offerA, offerB) => {
  const lenA = offerA.offer.features && offerA.offer.features.length ? offerA.offer.features.length : 0;
  const lenB = offerB.offer.features && offerB.offer.features.length ? offerB.offer.features.length : 0;

  return lenB - lenA;
};

const filterPoints = (filterData = {}) => {
  let filterCount = 0;

  if (Object.keys(filterData).length > 0) {
    for (const key in filterData) {
      if (filterData[key] !== 'any' && key !== 'features') {
        filterCount++;
      } else if (key === 'features' && filterData[key].length > 0) {
        filterCount += filterData[key].length;
      }
    }
  }

  if (filterCount) {
    pointsDataFilter = pointsData.filter((item) => {
      const offer = item.offer;
      let matchingValuesCount = 0;

      if (filterData.type !== 'any' && offer.type === filterData.type) {
        matchingValuesCount++;
      }
      if (filterData.rooms !== 'any' && offer.rooms === +filterData.rooms) {
        matchingValuesCount++;
      }
      if (filterData.guests !== 'any' && offer.guests === +filterData.guests) {
        matchingValuesCount++;
      }
      if (filterData.price !== 'any') {
        if (filterData.price === 'low' && offer.price <= PRICES[filterData.price]) {
          matchingValuesCount++;
        } else if (filterData.price === 'middle' && PRICES[filterData.price].from <= offer.price <= PRICES[filterData.price].to) {
          matchingValuesCount++;
        } else if (filterData.price === 'high' && PRICES[filterData.price] <= offer.price) {
          matchingValuesCount++;
        }
      }
      if (filterData.features.length > 0 && offer.features && offer.features.length > 0) {
        filterData.features.forEach((filter) => {
          const indx = offer.features.indexOf(filter);
          if (indx > -1) {
            matchingValuesCount++;
          }
        });
      }

      if (filterCount === matchingValuesCount) {
        return true;
      } else {
        return false;
      }
    });

    if (pointsDataFilter.length > 10) {
      pointsDataFilter = pointsDataFilter.slice().sort(compareOffers).slice(0, SIMILAR_OFFER_COUNT);
    }
  } else {
    pointsDataFilter = pointsData.slice().sort(compareOffers).slice(0, SIMILAR_OFFER_COUNT);
  }

  renderPoints(pointsDataFilter);
};

const getDataPoints = () => {
  getData((points) => {
    pointsData = points;
    filterPoints();
  },
  () => showAlert('Ошибка загрузки данных. Обновите страницу снова.'));
};

const initMap = () => {
  map.on('load', () => {
    toggleActiveStateOfForms(true);
    checkValidationForm();
    initCoordinatesOfMainPinMarker();
    getDataPoints();
  })
    .setView(COORDINATES_OF_TOKIO, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    const coordinate = evt.target.getLatLng();
    addressInputElement.value = `${coordinate.lat.toFixed(5)}, ${coordinate.lng.toFixed(5)}`;
  });
};

const resetCoordinatesOfMainPinMarker = () => {
  initCoordinatesOfMainPinMarker();
  markerGroup.eachLayer((layer) => {
    layer.closePopup();
  });
  filterPoints();
};

export { initMap, resetCoordinatesOfMainPinMarker, filterPoints };
