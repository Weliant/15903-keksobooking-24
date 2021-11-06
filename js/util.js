const ALERT_SHOW_TIME = 10000;

const getCorrectPositiveOrZeroValues = function(value){
  return value < 0 ? 0 : value;
};

const calculateRandomIntFromRange = function(min, max){
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

const getRandomIntFromRange = function(from, to){
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

const calculateRandomNumber = function(min, max, quantity){
  const roundMin = Math.floor(min * quantity);
  const roundMax = Math.floor(max * quantity);
  const randomInt = Math.floor(Math.random() * (roundMax + 1 - roundMin) + roundMin);
  return randomInt/quantity;
};

const getRandomCoordinate = function(from, to, quantity){
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
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.color = 'white';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { getRandomIntFromRange, getRandomCoordinate, showAlert };
