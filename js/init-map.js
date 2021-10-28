import { toggleActiveStateOfForms, checkValidationForm } from './form.js';
import { getListOfAnnouncement } from './data.js';
import { offerGenerator } from './offer-generator.js';

const addressInputElement = document.querySelector('#address');
const points = getListOfAnnouncement();

const initMap = function() {
  const map = L.map('map-canvas')
    .on('load', () => {
      toggleActiveStateOfForms(true);
      checkValidationForm();
      addressInputElement.value = '35.68950, 139.69171';
    })
    .setView({
      lat: 35.68950,
      lng: 139.69171,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker(
    {
      lat: 35.68950,
      lng: 139.69171,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    const coordinate = evt.target.getLatLng();
    addressInputElement.value = `${coordinate.lat.toFixed(5)}, ${coordinate.lng.toFixed(5)}`;
  });

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
      .addTo(map)
      .bindPopup(offerGenerator(item));
  });
};

export { initMap };
