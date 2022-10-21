//Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomNumber = function (a, b){
  if((a < 0) || (b < 0) || (a === b)){
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

//Функция, проверяющая максимальную длину строки. Результат: true, если строка проходит по длине, и false — если не проходит
const checkStringLength = function (str, maxLength){
  return str.length <= maxLength;
};

//генерация id
const generateId = function(){
  let id = 0;
  function addId(){
    id++;
    return id;
  }
  return addId;
};

const isEscKey = (evt) => evt.key === 'Escape';

export {getRandomNumber, checkStringLength, generateId, isEscKey};
