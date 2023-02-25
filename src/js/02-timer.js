import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
btnStart: document.querySelector(`button[data-start]`),
inputTime: document.querySelector(`input#datetime-picker`),
days: document.querySelector(`span[data-days]`),
hours: document.querySelector(`span[data-hours]`),
minutes: document.querySelector(`span[data-minutes]`),
seconds: document.querySelector(`span[data-seconds]`),
};

refs.btnStart.disabled = true;
let selectedDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      selectedDates[0] - options.defaultDate < 0
      ? Notify.failure(`Please choose a date in the future.`) : 
      (refs.btnStart.disabled = false);
      selectedDate = selectedDates[0];
      refs.btnStart.addEventListener(`click`, onStartTimer);        
    },
  };

  flatpickr(`#datetime-picker`, options)

  function onStartTimer() {
    setInterval(() => {
      const { days, hours, minutes, seconds } = convertMs(
        selectedDate - Date.now()
      );
      refs.days.textContent = days;
      refs.hours.textContent = hours;
      refs.minutes.textContent = minutes;
      refs.seconds.textContent = seconds;
    }, 1000);
  }
  
  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
  
  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );
    return { days, hours, minutes, seconds };
  }
