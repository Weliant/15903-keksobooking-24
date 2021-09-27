// возвращаем корректное значение (по условию "положительный, включая ноль")
function getCorrectValue(value){
  return value < 0 ? 0 : value;
}

// возвращаем целое число из диапозона
function calculateRandomInt(min, max){
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

// получаем случайное целое число
function getRandomIntFromRange (from, to) {
  // проверяем значения на корректность
  const correctFrom = getCorrectValue(from);
  const correctTo = getCorrectValue(to);

  if (correctFrom >= correctTo) {
    if(correctFrom === correctTo){
      return correctFrom;
    } else {
      // если значение correctTo меньше correctFrom
      return calculateRandomInt(correctTo, correctFrom);
    }
  }

  return calculateRandomInt(correctFrom, correctTo);
}

// получаем число с плавающей точкой из диапозона
function calculateRandomNumber(min, max, quantity){
  // получаем целочисленные min и max, отбрасывая знаки после запятой, которые нас не интересуют, ориентируясь на quantity
  const roundMin = Math.floor(min * quantity);
  const roundMax = Math.floor(max * quantity);
  // вычисляем целочисленный результат
  const randomInt = Math.floor(Math.random() * (roundMax + 1 - roundMin) + roundMin);
  // возвращаем число, основываясь на значении quantity
  return randomInt/quantity;
}

// получаем случайную коордиинату
function getRandomCoordinate (from, to, quantity) {
  // получаем число для вычисления целочисленных значений
  const count = Math.pow(10, quantity);
  // проверяем значения на корректность
  const correctFrom = getCorrectValue(from);
  const correctTo = getCorrectValue(to);

  if (correctFrom >= correctTo) {
    if(correctFrom === correctTo){
      return correctFrom;
    } else {
      // если значение correctTo меньше correctFrom
      return calculateRandomNumber(correctTo, correctFrom, count);
    }
  }

  return calculateRandomNumber(correctFrom, correctTo, count);
}

getRandomIntFromRange(1, 3);
getRandomCoordinate(1.1, 1.2, 1);
