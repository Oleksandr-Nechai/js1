import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputDate: document.querySelector('input#datetime-picker'),
  buttonStart: document.querySelector('[data-start]'),
  buttonPause: document.querySelector('[data-pause]'),
  buttonStop: document.querySelector('[data-stop]'),
  displayDays: document.querySelector('[data-days]'),
  displayHours: document.querySelector('[data-hours]'),
  displayMinutes: document.querySelector('[data-minutes]'),
  displaySeconds: document.querySelector('[data-seconds]'),
};

refs.buttonStart.setAttribute('disabled', true);
refs.buttonPause.setAttribute('disabled', true);
refs.buttonStop.setAttribute('disabled', true);

let timeDifference = 0;
let timeIntervalId = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = Date.now();
    const dateStart = selectedDates[0].getTime();

    if (dateStart <= currentTime) {
      alert('Please choose date in the future');
      return;
    }
    cleareIntervalById(timeIntervalId);

    refs.buttonStart.removeAttribute('disabled', true);
    refs.inputDate.disabled = true;
    timeDifference = dateStart - Math.round(currentTime / 1000) * 1000;
    // const objectRemainingTime = convertMs(timeDifference);
    markupTimer(convertMs(timeDifference));
  },
};

flatpickr(refs.inputDate, options);

function cleareIntervalById(id) {
  if (id) {
    clearInterval(id);
  }
}

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

function markupTimer({ days='00', hours='00', minutes='00', seconds='00' }) {
  const { displayDays, displayHours, displayMinutes, displaySeconds } = refs;
  displayDays.textContent = days;
  displayHours.textContent = hours;
  displayMinutes.textContent = minutes;
  displaySeconds.textContent = seconds;
}

function padStart(value) {
  return String(value).padStart(2, '0');
}

refs.buttonStart.addEventListener('click', activateTimer);
refs.buttonPause.addEventListener('click', breakTimer);
refs.buttonStop.addEventListener('click', stoppingTimer);

function activateTimer() {
  timeIntervalId = setInterval(updateTimer, 1000);
}

function updateTimer() {
  refs.buttonStart.setAttribute('disabled', true);
  refs.buttonStop.removeAttribute('disabled', true);
  refs.buttonPause.removeAttribute('disabled', true);
  refs.inputDate.disabled = false;
  timeDifference -= 1000;
  markupTimer(convertMs(timeDifference));
  stopInterval(timeDifference);
}

function stopInterval(timeDifference) {
  if (!timeDifference) {
    clearInterval(timeIntervalId);
  }
}

function stoppingTimer () {
  refs.buttonStop.setAttribute('disabled', true);
  refs.buttonPause.setAttribute('disabled', true);
  clearInterval(timeIntervalId)
  markupTimer({})
}

function breakTimer () {
  if(timeIntervalId){
    clearInterval(timeIntervalId)
    timeIntervalId = 0
    return
  }
  activateTimer()
}