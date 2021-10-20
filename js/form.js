
const checkActiveForm = function(isActive = false) {

  const formMain = document.querySelector('.ad-form');
  const fieldsetsFormMain = formMain.querySelectorAll('fieldset');
  const formFilter = document.querySelector('.map__filters');
  const selectsFormFilter = formFilter.querySelectorAll('select');
  const fieldsetsFormFilter = formFilter.querySelectorAll('fieldset');

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

export { checkActiveForm };
