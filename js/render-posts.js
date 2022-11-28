const postsContainer = document.querySelector('.pictures');
const postTemplate = document.querySelector('#picture').content.querySelector('.picture');

//отрисовка полноразмерного поста
const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseBtn = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
// const commentsList = bigPicture.querySelector('.social__comments');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
// const commentTemplate = `<li class="social__comment">
//     <img
//         class="social__picture"
//         src="{{аватар}}"
//         alt="{{имя комментатора}}"
//         width="35" height="35">
//     <p class="social__text">{{текст комментария}}</p>
// </li>`;


function closeBigPictureModal(){
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCloseBtn.removeEventListener('click', closeBigPictureModal);
}

function openBigPictureModal(){
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureCloseBtn.addEventListener('click', closeBigPictureModal);
}

const onClickPost = ({ url, description, likes, comments }) => {
  openBigPictureModal();
  bigPictureImage.src = url;
  bigPictureDescription.textContent = description;
  likesCount.textContent = likes;
  commentsCount.textContent = comments;
};

const renderPost = ({ url, description, likes, comments }) => {
  const post = postTemplate.cloneNode(true);
  const postImage = post.querySelector('.picture__img');
  postImage.src = url;
  postImage.alt = description;
  post.querySelector('.picture__comments').textContent = comments;
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
