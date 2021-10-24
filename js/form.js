const formMain = document.querySelector('.ad-form');
const fieldsetsFormMain = formMain.querySelectorAll('fieldset');
const formFilter = document.querySelector('.map__filters');
const selectsFormFilter = formFilter.querySelectorAll('select');
const fieldsetsFormFilter = formFilter.querySelectorAll('fieldset');
const titleInput = formMain.querySelector('#title');
const priceInput = formMain.querySelector('#price');
const roomSelect = formMain.querySelector('#room_number');
const capacitySelect = formMain.querySelector('#capacity');
const buttonSubmit = formMain.querySelector('.ad-form__submit');

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

const checkCapacityField = function(){
  let textError = '';

  if (roomSelect.value === '100') {
    if (capacitySelect.value !== '0') {
      textError = 'Значние должно быть "не для гостей"';
    }
  } else if (roomSelect.value === '1') {
    if (capacitySelect.value !== '1') {
      textError = 'Выберите количество комнат для 1 гостя';
    }
  } else if (roomSelect.value === '2') {
    if (!['1', '2'].includes(capacitySelect.value)) {
      textError = 'Выберите количество комнат для 1 или 2 гостей';
    }
  } else if (roomSelect.value === '3') {
    if (!['1', '2', '3'].includes(capacitySelect.value)) {
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
  addValidationPriceField();
  addValidationRoomField();
  addValidationCapacityField();
  buttonSubmit.addEventListener('click', onFormSubmit);
};

export { checkActiveForm, checkValidationForm };
