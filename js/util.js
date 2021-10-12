function getCorrectPositiveOrZeroValues(value){
  return value < 0 ? 0 : value;
}

function calculateRandomIntFromRange(min, max){
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function getRandomIntFromRange(from, to) {
  // проверяем значения на корректность
  const correctFrom = getCorrectPositiveOrZeroValues(from);
  const correctTo = getCorrectPositiveOrZeroValues(to);

  if(correctFrom >= correctTo){
    if(correctFrom === correctTo){
      return correctFrom;
    } else {
      // если значение correctTo меньше correctFrom
      return calculateRandomIntFromRange(correctTo, correctFrom);
    }
  }

  return calculateRandomIntFromRange(correctFrom, correctTo);
}

function calculateRandomNumber(min, max, quantity){
  // получаем целочисленные min и max, отбрасывая знаки после запятой, которые нас не интересуют, ориентируясь на quantity
  const roundMin = Math.floor(min * quantity);
  const roundMax = Math.floor(max * quantity);
  // вычисляем целочисленный результат
  const randomInt = Math.floor(Math.random() * (roundMax + 1 - roundMin) + roundMin);
  // возвращаем число, основываясь на значении quantity
  return randomInt/quantity;
}

function getRandomCoordinate (from, to, quantity) {
  // получаем число для вычисления целочисленных значений
  const count = Math.pow(10, quantity);
  // проверяем значения на корректность
  const correctFrom = getCorrectPositiveOrZeroValues(from);
  const correctTo = getCorrectPositiveOrZeroValues(to);

  if(correctFrom >= correctTo){
    if(correctFrom === correctTo){
      return correctFrom;
    } else {
      // если значение correctTo меньше correctFrom
      return calculateRandomNumber(correctTo, correctFrom, count);
    }
  }

  return calculateRandomNumber(correctFrom, correctTo, count);
}

export { getRandomIntFromRange, getRandomCoordinate };
