import {onPostClick} from './render-big-photo-popup.js';

const filters = document.querySelector('.img-filters');
const postsContainer = document.querySelector('.pictures');
const postTemplate = document.querySelector('#picture').content.querySelector('.picture');
const renderPost = ({ url, description, likes, comments }) => {
  const post = postTemplate.cloneNode(true);
  const postImage = post.querySelector('.picture__img');
  postImage.src = url;
  postImage.alt = description;
  post.querySelector('.picture__comments').textContent = comments.length;
  post.querySelector('.picture__likes').textContent = likes;
  return post;
};

const renderPosts = (posts) => {
  const fragment = document.createDocumentFragment();
  posts.forEach((post) => {
    const newPost = renderPost(post);
    newPost.addEventListener('click', () => onPostClick(post));
    fragment.append(newPost);
  });
  postsContainer.append(fragment);
  filters.classList.remove('img-filters--inactive');
};

export {renderPosts, postsContainer};
