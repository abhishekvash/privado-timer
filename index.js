let started = false;
let expired = false;
let seconds = 0;
let minutes = 0;
let maxTimeInSeconds = 300;
let seconds_field = document.getElementById("seconds");
let minutes_field = document.getElementById("minutes");
let timer_field = document.getElementById("timer");
let button = document.getElementById("button");
let timer = null;
let blink = null;
let show = true;

let buttonClick = () => {
  if (!started) {
    started = true;
    timer = setInterval(() => {
      seconds++;
      if (seconds == maxTimeInSeconds) {
        expired = true;
        timer_field.style.color = "#9b000d";
        button.innerText = "Reset";
        clearInterval(timer);
        blink = setInterval(() => {
          if (show) {
            timer_field.style.color = "#08000f";
            show = false;
          } else {
            timer_field.style.color = "#9b000d";
            show = true;
          }
        }, 1000);
      }
      if ((seconds % 60 < 10 && seconds % 60 != 0) || seconds / 60 == 0.0) {
        seconds_field.innerText = "0" + (seconds % 60);
      } else if (seconds % 60 >= 10 && seconds % 60 != 0 && seconds % 60 <= 59) {
        seconds_field.innerText = seconds % 60;
      } else {
        minutes++;
        seconds_field.innerText = "0" + (seconds % 60);
        minutes_field.innerText = "0" + minutes;
      }
    }, 1000);
    button.innerText = "Pause";
  } else {
    if (expired) {
      minutes = seconds = 0;
      expired = false;
      minutes_field.innerText = seconds_field.innerText = "00";
      timer_field.style.color = "#f0e0ff";
      clearInterval(blink);
    } else {
      clearInterval(timer);
    }
    started = false;
    button.innerText = "Start";
  }
};
