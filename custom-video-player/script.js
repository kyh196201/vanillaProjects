const $player = document.getElementById("player");
const $play = document.getElementById("play");
const $pause = document.getElementById("pause");
const $stop = document.getElementById("stop");
const $timeSpan = document.getElementById("timeSpan");
const $timelineBar = document.getElementById("timelineBar");
const $timelineControl = document.getElementById("timelineControl");

const HIDE_CN = "hide";

const timelineControlRect = $timelineControl.getBoundingClientRect();

$player.removeAttribute("controls");

// play video
$play.addEventListener("click", playVideo);
// pause video
$pause.addEventListener("click", pauseVideo);
// stop video
$stop.addEventListener("click", stopVideo);
// time update event
$player.addEventListener("timeupdate", (e) => {
    const duration = $player.duration;
    const currentTime = e.target.currentTime;
    setTime(currentTime);
});

$player.addEventListener("ended", stopVideo);

//timelineBar click event
$timelineBar.addEventListener("click", (e) => {
    const rect = e.target.getBoundingClientRect();
    const width = rect.width;
    const screenX = e.screenX;
    const offsetX = e.offsetX;
    const clientX = e.clientX;

    const widthRatio = offsetX / width;
    const toTime = Math.round(widthRatio * $player.duration);

    $player.currentTime = toTime;
    moveTimeLineControl(offsetX);
});

function playVideo(e) {
    if ($player.paused) {
        $player.play();
        e.currentTarget.classList.add(HIDE_CN);
        $pause.classList.remove(HIDE_CN);
    }
}

function pauseVideo(e) {
    const isPaused = $player.paused;

    if (!isPaused) {
        $player.pause();
        e.currentTarget.classList.add(HIDE_CN);
        $play.classList.remove(HIDE_CN);
    }
}

function stopVideo(e) {
    $player.pause();
    $player.currentTime = 0;
    $play.classList.remove(HIDE_CN);
    $pause.classList.add(HIDE_CN);
    moveTimeLineControl(0);
}

function setTime(time) {
    const min = parseInt(time / 60);
    const sec = Math.round(time % 60);

    $timeSpan.innerText = `${convertTime(min)}:${convertTime(sec)}`;
}

function convertTime(time) {
    return time >= 10 ? time : "0" + time;
}

function moveTimeLineControl(x) {
    $timelineControl.style.transform = `translateX(${x}px)`;
}
