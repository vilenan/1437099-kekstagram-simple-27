import {getRandomNumber, generateId} from './utils.js';

const ARRAY_SIZE = 25;

const descriptions = [
  'золотая осень',
  'прогулка в парке',
  'борюсь с хмурой осенью',
  'собираем грибы',
  'ритм большого города',
  'последняя ночь в Париже'
];

const getId = generateId();

const createPost = function(){
  const id = getId();
  return {
    id,
    url: `photos/${id}.jpg`,
    description: descriptions[getRandomNumber(0, descriptions.length - 1)],
    likes: getRandomNumber(15, 200),
    comments: getRandomNumber(0, 200)
  };
};

const generatePosts = function(){
  return Array.from({length:ARRAY_SIZE}, createPost);
};
export {generatePosts};
