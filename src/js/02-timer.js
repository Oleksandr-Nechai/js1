import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';


const refs = {
  inputDate: document.querySelector('input#datetime-picker'),
  buttonStart: document.querySelector('[data-start]'),
  displayDays: document.querySelector('[data-days]'),
  displayHours: document.querySelector('[data-hours]'),
  displayMinutes: document.querySelector('[data-minutes]'),
  displaySeconds: document.querySelector('[data-seconds]'),
};
refs.buttonStart.setAttribute('disabled', 'disabled');
let timeDifference = 0;
let timeInterval = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = Date.now();
    if (timeInterval) {
      clearInterval(timeInterval);
    }
    if (selectedDates[0].getTime() < currentTime) {
      Notiflix.Notify.info('Cogito ergo sum');
      return;
    }
    refs.buttonStart.removeAttribute('disabled', 'disabled');
    timeDifference =
      selectedDates[0].getTime() - Math.round(currentTime / 1000) * 1000;
    const objectRemainingTime = convertMs(timeDifference);
    markupTimer(objectRemainingTime);
    console.log('1');
  },
};

flatpickr(refs.inputDate, options);
refs.buttonStart.setAttribute('disabled', 'disabled');
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = padStart(Math.floor(ms / day));
  // Remaining hours
  const hours = padStart(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = padStart(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = padStart(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function markupTimer({ days, hours, minutes, seconds }) {
  const { displayDays, displayHours, displayMinutes, displaySeconds } = refs;
  displayDays.textContent = days;
  displayHours.textContent = hours;
  displayMinutes.textContent = minutes;
  displaySeconds.textContent = seconds;
}

function padStart(value) {
  return String(value).padStart(2, '0');
}

refs.buttonStart.addEventListener('click', () => {
  timeInterval = setInterval(() => {
    refs.buttonStart.setAttribute('disabled', 'disabled');
    timeDifference -= 1000;
    const objectRemainingTime = convertMs(timeDifference);
    markupTimer(objectRemainingTime);
    if (!timeDifference) {
      clearInterval(timeInterval);
    }
  }, 1000);
});
