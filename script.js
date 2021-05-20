let trumps = document.querySelectorAll('.trump');
let score = 0;
let timesPlayed = 0;

function setTiming() {
    trumps.forEach(function (element) {
        element.style.animationDuration = (((Math.random() * 2) + 1)).toString() + 's';
    });
}


function hitTrump(index) {
    score++;
    document.querySelector('.scores').innerHTML = score.toString();
    if (score == 9) {
        // document.querySelector('.score-container').innerHTML += `<div style = "width: auto; padding-top: 50px; padding-right: 10px; font-size: 50px;color: white; display: inline-block">You Win!</div>`;
        document.querySelector(".container-top").innerHTML = `<div style = "width: auto; padding-top: 200px; padding-right: 10px; font-size: 50px;color: white; display: inline-block">You Win!</div>`;
        document.querySelector(".container-top").style.backgroundImage = `url("../../images/joeBiden.jpg")`;
        document.querySelector(".container-top").style.backgroundSize = `cover`;
        document.querySelector(".container-top").style.backgroundPosition = `center`;
        // document.querySelector(".container-top").style.backgroundRepeat = `no=repeat`;
    }
    trumps[index].style.animationDuration = (((Math.random() * 2) + 1)).toString() + 's';
    trumps[index].style.backgroundImage = `url("../../images/angryTrump.png")`;
    trumps[index].style.pointerEvents = "none";
}

trumps.forEach(function (element, index) {
    element.addEventListener("click", function () {
        hitTrump(index);
    });
});



// timer


const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
    info: {
        color: "green"
    },
    warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD
    },
    alert: {
        color: "red",
        threshold: ALERT_THRESHOLD
    }
};

const TIME_LIMIT = 20;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

startTimer();

function onTimesUp() {
    clearInterval(timerInterval);
    window.location.replace(window.location.protocol + "/gameover.html");
}

function startTimer() {
    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById("base-timer-label").innerHTML = formatTime(
            timeLeft
        );
        setCircleDasharray();
        setRemainingPathColor(timeLeft);

        if (timeLeft === 0) {
            onTimesUp();
        }
    }, 1000);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
    const {
        alert,
        warning,
        info
    } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(warning.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(info.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(warning.color);
    }
}

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
    const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
    document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
}



// if (timePassed <) {
//     document.querySelector(".container-top").innerHTML = `<div style = "width: auto; padding-top: 200px; padding-right: 10px; font-size: 50px;color: white; display: inline-block">You Lose!</div>`;
//     document.querySelector(".container-top").style.backgroundImage = `url("/images/trumpWin.jpg")`;
//     document.querySelector(".container-top").style.backgroundSize = `contain`;
// }