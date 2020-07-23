//Flags for determine the state of buttons
let started = false;
let expired = false;

//States containing the values of the timer
let seconds = 0;
let minutes = 0;

// VALUE DTERMINING THE LIMIT OF THE TIMER
let maxTimeInSeconds = 300;

// Selector of various UI elements
let seconds_field = document.getElementById("seconds");
let minutes_field = document.getElementById("minutes");
let timer_field = document.getElementById("timer"); // The entire field consists of the minutes and seconds
let button = document.getElementById("button");

let timer = null; // Used as a wrapper for the setInterval function which drives the main timer
let blink = null; // Used as a wrapper for the setInterval function which drives the blinking of the timer
let show = true; // Flag used for blinking of timer after maximum time is reached


//This function drives the timer, and the state of the button and is triggered every the button on screen is clicked
let buttonClick = () => {
  if (!started) {
    //Starts timer
    started = true;
    timer = setInterval(() => {
      seconds++;
      if (seconds == maxTimeInSeconds) {
        //This section is executed when the time limit is reached , changing the button state to 'Reset'
        expired = true;
        timer_field.style.color = "#9b000d";
        button.innerText = "Reset";
        clearInterval(timer);
        //This wrapper is triggered to perform the blinking of the timer
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
      //This section is responsible for the UI of the timer , and changing the state of the button to 'Pause'
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
      //Executed after the button state is changed to 'Reset' and the button is clicked to reset the timer
      minutes = seconds = 0;
      expired = false;
      minutes_field.innerText = seconds_field.innerText = "00";
      timer_field.style.color = "#f0e0ff";
      clearInterval(blink);
    } else {
      //Executed when the timer is ticking the timer has to be 'Paused'
      clearInterval(timer);
    }
    started = false;
    button.innerText = "Start";
  }
};
