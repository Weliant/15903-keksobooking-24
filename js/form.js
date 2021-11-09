import { sendData } from './api.js';

const formMainElement = document.querySelector('.ad-form');
const fieldsetsFormMainElement = formMainElement.querySelectorAll('fieldset');
const titleInputElement = formMainElement.querySelector('#title');
const typeInputElement = formMainElement.querySelector('#type');
const priceInputElement = formMainElement.querySelector('#price');
const timeinInputElement = formMainElement.querySelector('#timein');
const timeoutInputElement = formMainElement.querySelector('#timeout');
const roomSelectElement = formMainElement.querySelector('#room_number');
const capacitySelectElement = formMainElement.querySelector('#capacity');
const buttonSubmitElement = formMainElement.querySelector('.ad-form__submit');
const buttonResetElement = formMainElement.querySelector('.ad-form__reset');

const formFilterElement = document.querySelector('.map__filters');
const selectsFormFilterElement = formFilterElement.querySelectorAll('select');
const typeSelectFilterElement = formFilterElement.querySelector('#housing-type');
const priceSelectFilterElement = formFilterElement.querySelector('#housing-price');
const roomsSelectFilterElement = formFilterElement.querySelector('#housing-rooms');
const guestsSelectFilterElement = formFilterElement.querySelector('#housing-guests');
const fieldsetsFormFilterElement = formFilterElement.querySelectorAll('fieldset');

const messageSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const messageSuccessElement = messageSuccessTemplate.cloneNode(true);
const messageErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const messageErrorElement = messageErrorTemplate.cloneNode(true);
const buttonErrorElement = messageErrorElement.querySelector('.error__button');

const avatarLoadElement = document.querySelector('.ad-form__field input[type="file"]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

const photoLoadElement = document.querySelector('.ad-form__upload input[type="file"]');
const photoPreview = document.querySelector('.ad-form__photo');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const ROOMS = [ '100', '1', '2', '3'];
const TYPES = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
let isErrorSubmit = false;
let filtersSelected = {};

const toggleActiveStateOfForms = function(isActive = false) {
  if(isActive){
    formMainElement.classList.remove('ad-form--disabled');
    formFilterElement.classList.remove('ad-form--disabled');

    fieldsetsFormMainElement.forEach((item) => {
      item.removeAttribute('disabled');
    });
    selectsFormFilterElement.forEach((item) => {
      item.removeAttribute('disabled');
    });
    fieldsetsFormFilterElement.forEach((item) => {
      item.removeAttribute('disabled');
    });
  } else {
    formMainElement.classList.add('ad-form--disabled');
    formFilterElement.classList.add('ad-form--disabled');

    fieldsetsFormMainElement.forEach((item) => {
      item.setAttribute('disabled', 'disabled');
    });
    selectsFormFilterElement.forEach((item) => {
      item.setAttribute('disabled', 'disabled');
    });
    fieldsetsFormFilterElement.forEach((item) => {
      item.setAttribute('disabled', 'disabled');
    });
  }
};

const compareExtensions = function(file) {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const addLoadFile = function(){
  avatarLoadElement.addEventListener('change', (evt) => {
    const file = evt.target.files[0];
    const matches = compareExtensions(file);

    if (matches) {
      avatarPreview.src = URL.createObjectURL(file);
    }
  });

  photoLoadElement.addEventListener('change', (evt) => {
    const file = evt.target.files[0];
    const matches = compareExtensions(file);

    if (matches) {
      if (photoPreview.querySelector('img')) {
        photoPreview.querySelector('img').remove();
      }
      const imgElement = document.createElement('img');
      imgElement.src = URL.createObjectURL(file);
      imgElement.style.width = '70px';
      imgElement.style.height = '100%';
      photoPreview.appendChild(imgElement);
    }
  });
};

const addValidationTitleField = function(){
  titleInputElement.addEventListener('invalid', () => {
    if (titleInputElement.validity.valueMissing) {
      titleInputElement.setCustomValidity('Обязательное поле');
    } else if (titleInputElement.validity.tooShort) {
      titleInputElement.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
    } else if (titleInputElement.validity.tooLong) {
      titleInputElement.setCustomValidity('Заголовок не должен превышать 100 символов');
    } else {
      titleInputElement.setCustomValidity('');
    }
  });

  titleInputElement.addEventListener('input', () => {
    titleInputElement.reportValidity();
  });
};

const setValuePriceField = function(value){
  priceInputElement.placeholder = TYPES[value];
  priceInputElement.setAttribute('min', TYPES[value]);
};

const addValidationTypeField = function(){
  typeInputElement.addEventListener('change', (evt) => {
    setValuePriceField(evt.target.value);
  });
};

const addValidationPriceField = function(){
  priceInputElement.addEventListener('invalid', () => {
    if (priceInputElement.validity.valueMissing) {
      priceInputElement.setCustomValidity('Обязательное поле');
    } else if (priceInputElement.validity.rangeOverflow ){
      priceInputElement.setCustomValidity('Максимальное значение 1 000 000');
    } else{
      priceInputElement.setCustomValidity('');
    }
  });

  priceInputElement.addEventListener('input', () => {
    priceInputElement.reportValidity();
  });
};

const addValidationTimeInField = function(){
  timeinInputElement.addEventListener('change', (evt) => {
    timeoutInputElement.value = evt.target.value;
  });
};

const addValidationTimeOutField = function(){
  timeoutInputElement.addEventListener('change', (evt) => {
    timeinInputElement.value = evt.target.value;
  });
};

const checkCapacityField = function(){
  let textError = '';

  if (roomSelectElement.value === ROOMS[0]) {
    if (capacitySelectElement.value !== '0') {
      textError = 'Значние должно быть "не для гостей"';
    }
  } else if (roomSelectElement.value === ROOMS[1]) {
    if (!ROOMS.slice(1, 2).includes(capacitySelectElement.value)) {
      textError = 'Выберите количество комнат для 1 гостя';
    }
  } else if (roomSelectElement.value === ROOMS[2]) {
    if (!ROOMS.slice(1, 3).includes(capacitySelectElement.value)) {
      textError = 'Выберите количество комнат для 1 или 2 гостей';
    }
  } else if (roomSelectElement.value === ROOMS[3]) {
    if (!ROOMS.slice(1).includes(capacitySelectElement.value)) {
      textError = 'Выберите количество комнат для 1, 2 или 3 гостей';
    }
  }

  return textError;
};

const onCapacityChange = function(){
  const textError = checkCapacityField();

  if(textError){
    capacitySelectElement.setCustomValidity(textError);
  } else {
    capacitySelectElement.setCustomValidity('');
  }

  capacitySelectElement.reportValidity();
};

const addValidationRoomField = function(){
  roomSelectElement.addEventListener('change', () => {
    onCapacityChange();
  });
};

const addValidationCapacityField = function(){
  capacitySelectElement.addEventListener('change', () => {
    onCapacityChange();
  });
};

const init = () => {
  messageSuccessElement.classList.add('hidden');
  messageErrorElement.classList.add('hidden');
  document.body.appendChild(messageSuccessElement);
  document.body.appendChild(messageErrorElement);

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      isErrorSubmit = true;
      if (isErrorSubmit) {
        messageErrorElement.classList.add('hidden');
      } else {
        messageSuccessElement.classList.add('hidden');
      }
    }
  });

  messageSuccessElement.addEventListener('click', () => {
    messageSuccessElement.classList.add('hidden');
  });

  messageErrorElement.addEventListener('click', () => {
    messageErrorElement.classList.add('hidden');
  });

  buttonErrorElement.addEventListener('click', () => {
    messageErrorElement.classList.add('hidden');
  });
};

const initFilterData = function(){
  filtersSelected = {
    type: typeSelectFilterElement.value,
    price: priceSelectFilterElement.value,
    rooms: roomsSelectFilterElement.value,
    guests: guestsSelectFilterElement.value,
    features: [],
  };
};

const resetForm = function(){
  formMainElement.reset();
  formFilterElement.reset();
  setValuePriceField(typeInputElement.value);
  initFilterData();
};

const setChangeFilterSelect = function(cb){
  formFilterElement.addEventListener('change', (evt)=> {
    if (evt.target.matches('select.map__filter')) {
      const type = evt.target.id.replace('housing-','');
      filtersSelected[type] = evt.target.value;
    } else if (evt.target.matches('input[type="checkbox"]')) {
      const indx = filtersSelected.features.indexOf(evt.target.value);

      if (evt.target.checked) {
        if (indx === -1) {
          filtersSelected.features.push(evt.target.value);
        }
      } else {
        filtersSelected.features.splice(indx, 1);
      }
    }
    cb(filtersSelected);
  });
};

const checkValidationForm = function(){
  init();
  initFilterData();
  setValuePriceField(typeInputElement.value);
  addValidationTitleField();
  addValidationTypeField();
  addValidationPriceField();
  addValidationTimeInField();
  addValidationTimeOutField();
  addValidationRoomField();
  addValidationCapacityField();
  addLoadFile();
};

const setOfferFormSubmit = (onSuccess) => {
  buttonSubmitElement.addEventListener('click', (evt) => {
    evt.preventDefault();

    formMainElement.reportValidity();
    if (formMainElement.checkValidity()){
      if(checkCapacityField()){
        onCapacityChange();
      } else {
        const data = new FormData(formMainElement);

        sendData(
          () => {
            resetForm();
            onSuccess();
            messageSuccessElement.classList.remove('hidden');
          },
          () => { messageErrorElement.classList.remove('hidden'); },
          data,
        );
      }
    }
  });
};

const setOfferFormReset = (onSuccess) => {
  buttonResetElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
    onSuccess();
  });
};

export { toggleActiveStateOfForms, checkValidationForm, setOfferFormSubmit, setOfferFormReset, setChangeFilterSelect };
