// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const datetime = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");
let userSelectedDate;
let timerId;
startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0]
 
        if (selectedDate <= new Date()) {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
                position: 'topRight',
            });
            startBtn.disabled = true;
            return;
        }
        userSelectedDate = selectedDate;
        startBtn.disabled = false;
    }
};
flatpickr(datetime, options);

startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    datetime.disabled = true;
    timerId = setInterval(() => {
        const now = new Date();
        const time1 = userSelectedDate - now
        if (time1 <= 0) {
            clearInterval(timerId)
            updateTimeDisplay(0)
            datetime.disabled = false;
            return;
        }
        updateTimeDisplay(time1)
    },1000)
})
function updateTimeDisplay(ms) {
    const { days, hours, minutes, seconds } = convertMs(ms)
    daysEl.textContent = addLeadingZero(days)
    hoursEl.textContent = addLeadingZero(hours)
    minutesEl.textContent = addLeadingZero(minutes)
    secondsEl.textContent = addLeadingZero(seconds)
}
function addLeadingZero(value) {
    return String(value).padStart(2, '0')
  }

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
}

  
  