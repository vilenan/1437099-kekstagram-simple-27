const ALERT_SHOW_TIME = 5000;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const isEscKey = (evt) => evt.key === 'Escape';

const showAlert = function (message){
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.width = '500';
  alert.style.height = '500';
  alert.style.zIndex = '100';
  alert.style.top = '0';
  alert.style.left = '0';
  alert.style.right = '0';
  alert.style.backgroundColor = '#FF4E4E';
  alert.style.padding = '20px';
  alert.style.textAlign = 'center';
  alert.textContent = message;
  document.body.append(alert);
  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

export {isEscKey, showAlert, shuffle};
