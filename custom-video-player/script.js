const $player = document.getElementById("player");
const $play = document.getElementById("play");
const $pause = document.getElementById("pause");
const $stop = document.getElementById("stop");
const $timeSpan = document.getElementById("timeSpan");
const $timelineBar = document.getElementById("timelineBar");
const $timelineControl = document.getElementById("timelineControl");

const HIDE_CN = "hide";

const timelineControlRect = $timelineControl.getBoundingClientRect();
const timeLineRect = $timelineBar.getBoundingClientRect();
// total video length
// const duration = $player.duration;

// check is dragging
let isDown = false;

let previousX = timelineControlRect.x;

$player.removeAttribute("controls");

// play video
$play.addEventListener("click", playVideo);
// pause video
$pause.addEventListener("click", pauseVideo);
// stop video
$stop.addEventListener("click", stopVideo);
// time update event
$player.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    setTime(currentTime);
    updateTimeline(currentTime);
});

$player.addEventListener("ended", stopVideo);

//timelineBar click event
$timelineBar.addEventListener("click", (e) => {
    const width = timeLineRect.width;
    const offsetX = e.offsetX;

    const widthRatio = offsetX / width;
    const toTime = Math.round(widthRatio * $player.duration);

    $player.currentTime = toTime;
    moveTimeLineControl(offsetX);
});

// timelinecontrol mouse down event
$timelineControl.addEventListener("mousedown", e => {
    isDown = true;
})

// timelinecontrol mouse up event
$timelineControl.addEventListener("mouseup", (e) => {
    isDown = false;
});

// timelinecontrol mouse move event
$timelineControl.addEventListener("mousemove", (e) => {
    if(isDown) {
        const offsetX = e.pageX - previousX;
        moveTimeLineControl(offsetX);
    }
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

// 시간에 따라 컨트롤러 버튼 이동 함수
function updateTimeline(time) {
    const width = timeLineRect.width;
    const duration = $player.duration;

    const offsetX = time / duration * width;
    moveTimeLineControl(offsetX);
}