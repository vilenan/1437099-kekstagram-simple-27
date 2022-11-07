const BASE_URL = 'https://27.javascript.pages.academy/kekstagram-simple';

const getData = function (onSuccess, onError){
  fetch(`${BASE_URL}/data`)
    .then((response) => {
      if(response.ok){
        return response.json();
      }onError('Произошла ошибка загрузки с сервера');
    })
    .then((posts) => {
      onSuccess(posts);
    })
    .catch(() => onError('Произошла ошибка загрузки с сервера'));
};

const sendData = (onSuccess, onError, body) => {
  fetch(BASE_URL,
    {
      method: 'POST',
      body
    },
  ).then((response) => {
    if(response.ok){
      onSuccess();
      return;
    } onError();
  })
    .catch(() => onError());
} ;

export {getData, sendData};
