const ALERT_SHOW_TIME = 5000;
const isEscKey = (evt) => evt.key === 'Escape';

const showAlert = function (message){
  const alertEl = document.createElement('div');
  alertEl.style.position = 'absolute';
  alertEl.style.width = '500';
  alertEl.style.height = '500';
  alertEl.style.zIndex = 100;
  alertEl.style.top = 0;
  alertEl.style.left = 0;
  alertEl.style.right = 0;
  alertEl.style.backgroundColor = '#FF4E4E';
  alertEl.style.padding = '20px';
  alertEl.style.textAlign = 'center';
  alertEl.textContent = message;
  document.body.append(alertEl);
  setTimeout(() => {
    alertEl.remove();
  }, ALERT_SHOW_TIME);
};


export {isEscKey, showAlert};
