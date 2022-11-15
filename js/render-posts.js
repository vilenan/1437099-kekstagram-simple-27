const postsContainer = document.querySelector('.pictures');
const postTemplate = document.querySelector('#picture').content.querySelector('.picture');
const renderPost = function (item){
  const post = postTemplate.cloneNode(true);
  const postImage = post.querySelector('.picture__img');
  postImage.src = item.url;
  postImage.alt = item.description;
  post.querySelector('.picture__comments').textContent = `${item.comments}`;
  post.querySelector('.picture__likes').textContent = `${item.likes}`;
  return post;
};

const renderPosts = function(posts){
  const fragment = document.createDocumentFragment();
  posts.forEach((post) => {
    const newPost = renderPost(post);
    fragment.append(newPost);
  });
  postsContainer.append(fragment);
};

export {renderPosts};
