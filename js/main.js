import { toggleActiveStateOfMainForm, toggleActiveStateOfFilterForm, setOfferFormSubmit, setOfferFormReset, setChangeFilterSelect } from './form.js';
import { initMap, resetCoordinatesOfMainPinMarker, filterPoints } from './init-map.js';
import { debounce } from './utils/debounce.js';

toggleActiveStateOfMainForm();
toggleActiveStateOfFilterForm();
initMap(toggleActiveStateOfFilterForm);
setChangeFilterSelect(debounce(filterPoints));
setOfferFormSubmit(resetCoordinatesOfMainPinMarker);
setOfferFormReset(resetCoordinatesOfMainPinMarker);

