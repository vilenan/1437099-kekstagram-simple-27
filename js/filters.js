import {renderPosts, postsContainer} from './render-posts.js';
import {shuffle} from './utils.js';

const RANDOM_POSTS_TO_SHOW = 10;
const filtersContainer = document.querySelector('.img-filters__form');

const makeRandomArr = (array) => {
  let randomArr = [];
  const randomCount = Math.min(array.length, RANDOM_POSTS_TO_SHOW);
  const arrayOfIndex = Array.from({ length: array.length }, (v, k) => k);
  randomArr = shuffle(arrayOfIndex).slice(0, randomCount);
  return randomArr.map((index) => array[index]);
};

const makeInitialArr = (array) => array;

const makeDiscussedArray = (array) => array.slice().sort((prevEl, nextEl) => nextEl.comments.length - prevEl.comments.length);

const oldPostsRemove = () => {
  const posts = postsContainer.querySelectorAll('.picture');
  posts.forEach((post) => post.remove());
};

const setFilterClick = (array) => {
  filtersContainer.addEventListener('click', (evt) => {
    const activeFilter = document.querySelector('.img-filters__button--active');
    if(activeFilter){
      activeFilter.classList.remove('img-filters__button--active');
    }
    const filter = evt.target.closest('.img-filters__button');
    filter.classList.add('img-filters__button--active');
    const pressedFilter = evt.target.id;
    let filteredPosts = [];
    switch (pressedFilter){
      case 'filter-random':
        filteredPosts = makeRandomArr(array);
        break;
      case 'filter-default':
        filteredPosts = makeInitialArr(array);
        break;
      case 'filter-discussed':
        filteredPosts = makeDiscussedArray(array);
        break;
    }
    oldPostsRemove();
    renderPosts(filteredPosts);
  });
};

export {setFilterClick};
