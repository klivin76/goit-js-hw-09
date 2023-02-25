const startButton = document.querySelector(`button[data-start]`);
const stopButton = document.querySelector(`button[data-stop]`);
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startButton.addEventListener(`click`, () => {
  timerId = setInterval(() => {
    const color = getRandomHexColor();
    document.body.style.backgroundColor = color;
  }, 1000);
  startButton.setAttribute('disabled', true);
});
 
stopButton.addEventListener(`click`, () => {
  clearInterval(timerId);
  startButton.removeAttribute('disabled');
});
