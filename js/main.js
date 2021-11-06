import { toggleActiveStateOfForms, setOfferFormSubmit, setOfferFormReset } from './form.js';
import { initMap, resetCoordinatesOfMainPinMarker } from './init-map.js';

toggleActiveStateOfForms();
initMap();
setOfferFormSubmit(resetCoordinatesOfMainPinMarker);
setOfferFormReset(resetCoordinatesOfMainPinMarker);
