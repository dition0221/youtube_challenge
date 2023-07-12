const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

// f: Time Format
const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substring(14, 19);

/* Global parameter & Initial Settings */
// Initial Volume
let volumeValue = 0.5;
video.volume = volumeValue;
// Initial Controls's SetTimeout ID
let controlsTimeout = null;
let controlsMovementTimeout = null;

/* Play Button */
playBtn.addEventListener("click", () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
});
video.addEventListener("ended", () => {
  playBtn.innerText = "Play";
});

/* Mute Button */
muteBtn.addEventListener("click", () => {
  if (video.muted) {
    video.muted = false;
    video.volume = volumeValue;
  } else {
    volumeValue = volumeRange.value;
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : volumeValue;
});

/* Volume Control (input) */
volumeRange.addEventListener("input", (event) => {
  const {
    target: { value },
  } = event;
  video.volume = value;
  video.muted = value === "0" ? true : false;
  muteBtn.innerText = value === "0" ? "Unmute" : "Mute";
});

/* Volume Control (change) */
volumeRange.addEventListener("change", (event) => {
  const {
    target: { value },
  } = event;
  // if volume is not '0', Save volume value.
  if (Number(value) !== 0) {
    volumeValue = value;
  }
});

/* Total Time */
const handleMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration); // get maximum timeline
};
// 새로고침해도 loadedmetadata가 실행되지 않는 문제 해결
video.readyState
  ? handleMetadata()
  : video.addEventListener("loadedmetadata", handleMetadata);

/* Current Time */
video.addEventListener("timeupdate", () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime); // get current timeline
});

/* Time Line */
timeline.addEventListener("input", (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
});

/* Full Screen */
fullScreenBtn.addEventListener("click", () => {
  const isFullscreen = document.fullscreenElement;
  if (isFullscreen) {
    document.exitFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }
});
document.addEventListener("fullscreenchange", () => {
  fullScreenBtn.innerText = document.fullscreenElement
    ? "Exit Full Screen"
    : "Enter Full Screen";
});

/* Show video controls */
const hideControls = () => videoControls.classList.remove("showing");
// Appear
video.addEventListener("mousemove", () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
});
// Disappear
video.addEventListener("mouseleave", () => {
  controlsTimeout = setTimeout(hideControls, 3000);
});

/* 조회수: Register video's view */
video.addEventListener("ended", async () => {
  const { id } = videoContainer.dataset;
  await fetch(`/api/videos/${id}/view`, { method: "POST" });
});

/* Keyboard shortcut */
document.addEventListener("keyup", (event) => {
  // [F] fullscreen
  if (event.code === "KeyF") {
    fullScreenBtn.click();
  }
  // [Space] play/Stop
  if (event.code === "Space") {
    playBtn.click();
  }
  // [M] Mute/Unmute
  if (event.code === "KeyM") {
    muteBtn.click();
  }
});

/* Video shortcut: Click to play/pause */
video.addEventListener("click", () => {
  playBtn.click();
});
