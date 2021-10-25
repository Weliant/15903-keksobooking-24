const formMain = document.querySelector('.ad-form');
const fieldsetsFormMain = formMain.querySelectorAll('fieldset');
const formFilter = document.querySelector('.map__filters');
const selectsFormFilter = formFilter.querySelectorAll('select');
const fieldsetsFormFilter = formFilter.querySelectorAll('fieldset');
const titleInput = formMain.querySelector('#title');
const typeInput = formMain.querySelector('#type');
const priceInput = formMain.querySelector('#price');
const timeinInput = formMain.querySelector('#timein');
const timeoutInput = formMain.querySelector('#timeout');
const roomSelect = formMain.querySelector('#room_number');
const capacitySelect = formMain.querySelector('#capacity');
const buttonSubmit = formMain.querySelector('.ad-form__submit');

const ROOMS = [ '100', '1', '2', '3'];

const TYPES = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const checkActiveForm = function(isActive = false) {
  if(isActive){
    formMain.classList.remove('ad-form--disabled');
    formFilter.classList.remove('ad-form--disabled');

    fieldsetsFormMain.forEach((item) => {
      item.removeAttribute('disabled');
    });
    selectsFormFilter.forEach((item) => {
      item.removeAttribute('disabled');
    });
    fieldsetsFormFilter.forEach((item) => {
      item.removeAttribute('disabled');
    });
  } else {
    formMain.classList.add('ad-form--disabled');
    formFilter.classList.add('ad-form--disabled');

    fieldsetsFormMain.forEach((item) => {
      item.setAttribute('disabled', 'disabled');
    });
    selectsFormFilter.forEach((item) => {
      item.setAttribute('disabled', 'disabled');
    });
    fieldsetsFormFilter.forEach((item) => {
      item.setAttribute('disabled', 'disabled');
    });
  }
};

const addValidationTitleField = function(){
  titleInput.addEventListener('invalid', () => {
    if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Заголовок не должен превышать 100 символов');
    } else {
      titleInput.setCustomValidity('');
    }
  });

  titleInput.addEventListener('input', () => {
    titleInput.reportValidity();
  });
};

const addValidationTypeField = function(){
  typeInput.addEventListener('change', (evt) => {
    priceInput.placeholder = TYPES[evt.target.value];
    priceInput.setAttribute('min', TYPES[evt.target.value]);
  });
};

const addValidationPriceField = function(){
  priceInput.addEventListener('invalid', () => {
    if (priceInput.validity.valueMissing) {
      priceInput.setCustomValidity('Обязательное поле');
    } else if (priceInput.validity.rangeOverflow ){
      priceInput.setCustomValidity('Максимальное значение 1 000 000');
    } else{
      priceInput.setCustomValidity('');
    }
  });

  priceInput.addEventListener('input', () => {
    priceInput.reportValidity();
  });
};

const addValidationTimeInField = function(){
  timeinInput.addEventListener('change', (evt) => {
    timeoutInput.value = evt.target.value;
  });
};

const addValidationTimeOutField = function(){
  timeoutInput.addEventListener('change', (evt) => {
    timeinInput.value = evt.target.value;
  });
};

const checkCapacityField = function(){
  let textError = '';

  if (roomSelect.value === ROOMS[0]) {
    if (capacitySelect.value !== '0') {
      textError = 'Значние должно быть "не для гостей"';
    }
  } else if (roomSelect.value === ROOMS[1]) {
    if (capacitySelect.value !== ROOMS.slice(1, 2)) {
      textError = 'Выберите количество комнат для 1 гостя';
    }
  } else if (roomSelect.value === ROOMS[2]) {
    if (!ROOMS.slice(1, 3).includes(capacitySelect.value)) {
      textError = 'Выберите количество комнат для 1 или 2 гостей';
    }
  } else if (roomSelect.value === ROOMS[3]) {
    if (!ROOMS.slice(1).includes(capacitySelect.value)) {
      textError = 'Выберите количество комнат для 1, 2 или 3 гостей';
    }
  }

  return textError;
};

const onCapacityChange = function(){
  const textError = checkCapacityField();

  if(textError){
    capacitySelect.setCustomValidity(textError);
  } else {
    capacitySelect.setCustomValidity('');
  }

  capacitySelect.reportValidity();
};

const addValidationRoomField = function(){
  roomSelect.addEventListener('change', () => {
    onCapacityChange();
  });
};

const addValidationCapacityField = function(){
  capacitySelect.addEventListener('change', () => {
    onCapacityChange();
  });
};

const onFormSubmit = function(evt){
  evt.preventDefault();

  formMain.reportValidity();

  if (formMain.checkValidity()){
    if(checkCapacityField()){
      onCapacityChange();
    } else {
      formMain.submit();
    }
  }
};

const checkValidationForm = function(){
  addValidationTitleField();
  addValidationTypeField();
  addValidationPriceField();
  addValidationTimeInField();
  addValidationTimeOutField();
  addValidationRoomField();
  addValidationCapacityField();
  buttonSubmit.addEventListener('click', onFormSubmit);
};

export { checkActiveForm, checkValidationForm };
