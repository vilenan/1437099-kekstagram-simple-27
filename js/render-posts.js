import {generatePosts} from './data.js';
//получаем массив постов пользователей
const posts = generatePosts();
//находим контейнер для фото
const postsContainer = document.querySelector('.pictures');
//находим шаблон
const postTemplate = document.querySelector('#picture').content.querySelector('.picture');
//функция отрисовывает пост
const renderPost = function (item){
  const post = postTemplate.cloneNode(true);
  const postImage = post.querySelector('.picture__img');
  postImage.src = item.url;
  postImage.alt = item.description;
  post.querySelector('.picture__comments').textContent = `${item.comments}`;
  post.querySelector('.picture__likes').textContent = `${item.likes}`;
  return post;
};

const fragment = document.createDocumentFragment();

posts.forEach((post)=>{
  const newPost = renderPost(post);
  fragment.append(newPost);
});

postsContainer.append(fragment);
