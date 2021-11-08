import { toggleActiveStateOfForms, setOfferFormSubmit, setOfferFormReset, setChangeFilterSelect } from './form.js';
import { initMap, resetCoordinatesOfMainPinMarker, filterPoints } from './init-map.js';
import { debounce } from './utils/debounce.js';

toggleActiveStateOfForms();
initMap();
setChangeFilterSelect(debounce(filterPoints));
setOfferFormSubmit(resetCoordinatesOfMainPinMarker);
setOfferFormReset(resetCoordinatesOfMainPinMarker);

