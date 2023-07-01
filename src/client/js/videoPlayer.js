const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");

/* Global parameter */
let volumeValue = 0.5;
video.volume = volumeValue;

/* Paly button */
playBtn.addEventListener("click", () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
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
