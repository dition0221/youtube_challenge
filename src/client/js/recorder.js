const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

// Global Variables
let stream;
let recorder;
let videoFile;

// Preview
const init = async () => {
  // Get media permission
  stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 200, height: 100 },
    audio: true,
  });
  // Start showing preview
  video.srcObject = stream;
  video.play();
};

/* Initial Settings */
init(); // preview

/* Recording Button */
const handleDownload = () => {
  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "MyRecording.webm";
  document.body.appendChild(a);
  a.click();
};
const handleStop = () => {
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);
  startBtn.innerText = "Download Recording";
  recorder.stop();
};
const handleStart = () => {
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);
  startBtn.innerText = "Stop Recording";
  recorder = new MediaRecorder(stream);
  // When finish recording video, Show recorded video
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };
  recorder.start();
};
startBtn.addEventListener("click", handleStart);
