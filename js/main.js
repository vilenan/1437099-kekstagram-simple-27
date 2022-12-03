import {init} from './render-posts.js';
import {showAlert} from './utils.js';
import './form.js';
import {getData} from './api.js';

getData(init, showAlert);

