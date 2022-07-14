const refs = {
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
  backgroundBody: document.querySelector('body'),
};
let colorRandomId = null;

refs.buttonStart.addEventListener('click', startIntervalColor);

function startIntervalColor() {
  if (colorRandomId) {
    return;
  }
  colorRandomId = setInterval(changebackgroundColor, 1000);
}

refs.buttonStop.addEventListener('click', () => {
  clearInterval(colorRandomId);
  colorRandomId = null;
  refs.backgroundBody.style.backgroundColor = '#fafafa';
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changebackgroundColor() {
  return (refs.backgroundBody.style.backgroundColor = getRandomHexColor());
}
