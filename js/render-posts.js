import {onPostClick} from './render-big-photo-popup.js';
import {shuffle} from './utils.js';

const RANDOM_POSTS_TO_SHOW = 10;
const postsContainer = document.querySelector('.pictures');
const postTemplate = document.querySelector('#picture').content.querySelector('.picture');
const filtersContainer = document.querySelector('.img-filters__form');
const filters = document.querySelector('.img-filters');
const randomFilter = filters.querySelector('#filter-random');
const initialFilter = filters.querySelector('#filter-default');
const discussedFilter = filters.querySelector('#filter-discussed');

const setFilterClick = () => {
  filtersContainer.addEventListener('click', (evt) => {
    const activeFilter = document.querySelector('.img-filters__button--active');
    if(activeFilter){
      activeFilter.classList.remove('img-filters__button--active');
    }
    const filter = evt.target.closest('.img-filters__button');
    filter.classList.add('img-filters__button--active');
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

const makeRandomArr = (array) => {
  let randomArr = [];
  const randomCount = Math.min(array.length, RANDOM_POSTS_TO_SHOW);
  const arrayOfIndex = Array.from({ length: array.length }, (v, k) => k);
  randomArr = shuffle(arrayOfIndex).slice(0, randomCount);
  return randomArr.map((index) => array[index]);
};

const makeInitialArr = (array) => array;

const makeDiscussedArray = (array) => array.slice().sort((prevEl, nextEl) => nextEl.comments.length - prevEl.comments.length);

const setRandomFilterClick = (cb) => {
  randomFilter.addEventListener('click',() => {
    postsContainer.textContent = '';
    const randomArr = cb();
    renderPosts(randomArr);
  });
};

const setDefaultFilterClick = (cb) => {
  initialFilter.addEventListener('click',() => {
    postsContainer.textContent = '';
    const defaultArr = cb();
    renderPosts(defaultArr);
  });
};

const setDiscussedFilterClick = (cb) => {
  discussedFilter.addEventListener('click',() => {
    postsContainer.textContent = '';
    const discussedArr = cb();
    renderPosts(discussedArr);
  });
};

function renderPosts(posts){
  const fragment = document.createDocumentFragment();
  posts.forEach((post) => {
    const newPost = renderPost(post);
    newPost.addEventListener('click', () => onPostClick(post));
    fragment.append(newPost);
  });
  postsContainer.append(fragment);
  filters.classList.remove('img-filters--inactive');
}

const init = (posts) =>{
  renderPosts(posts);
  setFilterClick();
  setRandomFilterClick(() => makeRandomArr(posts));
  setDefaultFilterClick(() => makeInitialArr(posts));
  setDiscussedFilterClick(() => makeDiscussedArray(posts));
};

export {init};
