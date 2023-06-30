const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");

/* Global Variable*/
let volumeValue = 0.5;

/* Initial Settings */
video.volume = volumeValue; // 0.5

/* Play button */
playBtn.addEventListener("click", (event) => {
  // if the video is playing, pause it
  // else play the video
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
});

/* Mute button */
muteBtn.addEventListener("click", (event) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : volumeValue;
});

/* Volume bar */
volumeRange.addEventListener("input", (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  // volume '0'일 시 mute 되도록
  // volume을 '0'으로 내려서 mute한 후, unmute 시 그 이전(0제외) value로 되돌리기
  volumeValue = value;
  video.volume = value;
});
