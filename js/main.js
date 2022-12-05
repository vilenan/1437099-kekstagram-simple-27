import {setFilterClick} from './filters.js';
import {renderPosts} from './render-posts.js';
import {showAlert} from './utils.js';
import './form.js';
import {getData} from './api.js';

const init = (posts) =>{
  renderPosts(posts);
  setFilterClick(posts);
};

getData(init, showAlert);

