import { toggleActiveStateOfForms, checkValidationForm } from './form.js';
import { offerGenerator } from './offer-generator.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

const addressInputElement = document.querySelector('#address');

const COORDINATES_OF_TOKIO = {
  lat: 35.68950,
  lng: 139.69171,
};

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

const initCoordinatesOfMainPinMarker = function() {
  mainPinMarker.setLatLng({
    lat: COORDINATES_OF_TOKIO.lat,
    lng: COORDINATES_OF_TOKIO.lng,
  });
  addressInputElement.value = `${COORDINATES_OF_TOKIO.lat}, ${COORDINATES_OF_TOKIO.lng}`;
};

const initMap = function() {
  map.on('load', () => {
    toggleActiveStateOfForms(true);
    checkValidationForm();
    initCoordinatesOfMainPinMarker();

    getData((points) => {
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
    },
    () => showAlert('Ошибка загрузки данных. Обновите страницу снова.'));
  })
    .setView({
      lat: COORDINATES_OF_TOKIO.lat,
      lng: COORDINATES_OF_TOKIO.lng,
    }, 10);

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

const resetCoordinatesOfMainPinMarker = function() {
  initCoordinatesOfMainPinMarker();

  markerGroup.eachLayer((layer) => {
    layer.closePopup();
  });
};

export { initMap, resetCoordinatesOfMainPinMarker };
