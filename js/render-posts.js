import {onClickPost} from './render-big-photo-popup.js';
import {shuffle} from './utils.js';

const RANDOM_POSTS_TO_SHOW = 10;
const postsContainer = document.querySelector('.pictures');
const postTemplate = document.querySelector('#picture').content.querySelector('.picture');
const filtersContainer = document.querySelector('.img-filters__form');

const onFilterBtnClick = () => {
  filtersContainer.addEventListener('click', (evt)=>{
    const activeBtn = document.querySelector('.img-filters__button--active');
    if(activeBtn){
      activeBtn.classList.remove('img-filters__button--active');
    }
    const filterBtn = evt.target.closest('.img-filters__button');
    filterBtn.classList.add('img-filters__button--active');
  });
};

const renderPost = ({ url, description, likes, comments }) => {
  const post = postTemplate.cloneNode(true);
  const postImage = post.querySelector('.picture__img');
  postImage.src = url;
  postImage.alt = description;
  post.querySelector('.picture__comments').textContent = comments.length;
  post.querySelector('.picture__likes').textContent = likes;
  return post;
};

const filters = document.querySelector('.img-filters');
const random = filters.querySelector('#filter-random');
const initial = filters.querySelector('#filter-default');
const discussed = filters.querySelector('#filter-discussed');

const makeRandomArr = (array) => {
  let randomArr = [];
  const randomCount = Math.min(array.length, RANDOM_POSTS_TO_SHOW);
  const arrayOfIndex = Array.from({ length: array.length }, (v, k) => k);
  randomArr = shuffle(arrayOfIndex).slice(0, randomCount);
  return randomArr.map((index) => array[index]);
};

const makeInitialArr = (array) => array;

const makeDiscussedArray = (array) => array.slice().sort((prevEl, nextEl) => nextEl.comments.length - prevEl.comments.length);

const onRandomFilter = (cb) => {
  random.addEventListener('click',() => {
    postsContainer.textContent = '';
    const randomArr = cb();
    renderPosts(randomArr);
  });
};

const onDefaultFilter = (cb) => {
  initial.addEventListener('click',() => {
    postsContainer.textContent = '';
    const defaultArr = cb();
    renderPosts(defaultArr);
  });
};

const onDiscussedFilter = (cb) => {
  discussed.addEventListener('click',() => {
    postsContainer.textContent = '';
    const discussedArr = cb();
    renderPosts(discussedArr);
  });
};

function renderPosts(posts){
  const fragment = document.createDocumentFragment();
  posts.forEach((post) => {
    const newPost = renderPost(post);
    newPost.addEventListener('click', () => onClickPost(post));
    fragment.append(newPost);
  });
  postsContainer.append(fragment);
  filters.classList.remove('img-filters--inactive');
}

const init = (posts) =>{
  renderPosts(posts);
  onFilterBtnClick();
  onRandomFilter(() => makeRandomArr(posts));
  onDefaultFilter(() => makeInitialArr(posts));
  onDiscussedFilter(() => makeDiscussedArray(posts));
};

export {init};
//генерация id
// const generateId = function(){
//   let id = 0;
//   function addId(){
//     id++;
//     return id;
//   }
//   return addId;
// };
// const getId = generateId();
//
// const createPhoto = function(){
//   const id = getId();
