//Функция, возвращающая случайное целое число из переданного диапазона включительно

const getRandomNumber = function (a, b){
  if((a < 0) || (b < 0) || (a === b)){
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
getRandomNumber(34.7, 8.9);
//Функция, проверяющая максимальную длину строки. Результат: true, если строка проходит по длине, и false — если не проходит
const checkStringLength = function (str, maxLength){
  return str.length <= maxLength;
};
checkStringLength('hello', 9);

const descriptions = [
  'золотая осень',
  'прогулка в парке',
  'борюсь с хмурой осенью',
  'собираем грибы',
  'ритм большого города',
  'последняя ночь в Париже'
];
const OBJECT_SIZE = 25;

//генерация id
const generateId = function(){
  let id = 0;
  function addId(){
    id++;
    return id;
  }
  return addId;
};

const getId = generateId();

const createPhoto = function(){
  const id = getId();
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: descriptions[getRandomNumber(0, descriptions.length - 1)],
    likes: getRandomNumber(15, 200),
    comments: getRandomNumber(0, 200)
  };
};

const generatePhotos = function(size){
  Array.from({length:size}, createPhoto);
};
generatePhotos(OBJECT_SIZE);
