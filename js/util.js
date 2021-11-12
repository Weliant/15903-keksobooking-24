const ALERT_SHOW_TIME = 10000;

const getCorrectPositiveOrZeroValues = (value) => value < 0 ? 0 : value;

const calculateRandomIntFromRange = (min, max) => Math.floor(Math.random() * (max + 1 - min) + min);

const getRandomIntFromRange = (from, to) => {
  const correctFrom = getCorrectPositiveOrZeroValues(from);
  const correctTo = getCorrectPositiveOrZeroValues(to);

  if(correctFrom >= correctTo){
    if(correctFrom === correctTo){
      return correctFrom;
    } else {
      return calculateRandomIntFromRange(correctTo, correctFrom);
    }
  }

  return calculateRandomIntFromRange(correctFrom, correctTo);
};

const calculateRandomNumber = (min, max, quantity) => {
  const roundMin = Math.floor(min * quantity);
  const roundMax = Math.floor(max * quantity);
  const randomInt = Math.floor(Math.random() * (roundMax + 1 - roundMin) + roundMin);
  return randomInt/quantity;
};

const getRandomCoordinate = (from, to, quantity = 5) => {
  const count = Math.pow(10, quantity);
  const correctFrom = getCorrectPositiveOrZeroValues(from);
  const correctTo = getCorrectPositiveOrZeroValues(to);

  if(correctFrom >= correctTo){
    if(correctFrom === correctTo){
      return correctFrom;
    } else {
      return calculateRandomNumber(correctTo, correctFrom, count);
    }
  }

  return calculateRandomNumber(correctFrom, correctTo, count);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');

  alertContainer.textContent = message;
  alertContainer.classList.add('error_top_message');

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { getRandomIntFromRange, getRandomCoordinate, showAlert };
