import {onClickPost} from './render-big-photo-popup.js';
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
    newPost.addEventListener('click', () => onClickPost(post));
    fragment.append(newPost);
  });
  postsContainer.append(fragment);
};

export {renderPosts};
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
