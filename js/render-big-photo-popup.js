import {isEscKey} from './utils.js';
const COMMENTS_TO_SHOW = 5;
let copyComments = [];
const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseBtn = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsShow = bigPicture.querySelector('.comments-show');
const commentsList = bigPicture.querySelector('.social__comments');
const commentLoaderBtn = bigPicture.querySelector('.comments-loader');
const bigPictureDescription = bigPicture.querySelector('.social__caption');

const onEscKey = (evt) => {
  if(isEscKey(evt)){
    closeBigPictureModal();
  }
};

function closeBigPictureModal(){
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCloseBtn.removeEventListener('click', closeBigPictureModal);
  document.removeEventListener('keydown', onEscKey);
}

function openBigPictureModal(){
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureCloseBtn.addEventListener('click', closeBigPictureModal);
}

const showCommentLoaderBtn = () => {
  commentLoaderBtn.classList.remove('hidden');
};

const hideCommentLoaderBtn = () => {
  commentLoaderBtn.classList.add('hidden');
};

const renderComment = ({avatar, message, name}) => {
  const commentItem = document.createElement('div');
  commentItem.innerHTML = `<li class="social__comment">
            <img
             class="social__picture"
             src=${avatar}
             alt=${name}
             width="35" height="35">
            <p class="social__text">${message}</p>
        </li>`;
  return commentItem.firstElementChild;
};

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const newComment = renderComment(comment);
    fragment.append(newComment);
  });
  commentsList.append(fragment);
};

const renderBigPost = ({url, description, likes, comments}) => {
  if(comments.length < COMMENTS_TO_SHOW + 1){
    hideCommentLoaderBtn();
  } else {showCommentLoaderBtn();}
  copyComments = [...comments];
  bigPictureImage.src = url;
  bigPictureDescription.textContent = description;
  likesCount.textContent = likes;
  commentsCount.textContent = copyComments.length.toString();
  commentsList.innerHTML = '';
  renderMore();
  commentLoaderBtn.addEventListener('click', renderMore);
};

function renderMore() {
  renderComments(copyComments.splice(0,COMMENTS_TO_SHOW));
  commentsShow.textContent = commentsList.querySelectorAll('.social__comment').length.toString();
  if(!copyComments.length){
    hideCommentLoaderBtn();
  }
}

const onPostClick = (post) => {
  openBigPictureModal();
  renderBigPost(post);
  document.addEventListener('keydown', onEscKey);
};
export {onPostClick};
