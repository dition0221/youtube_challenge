import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

/* Global Variables */
let stream;
let recorder;
let videoFile;

/* Preview */
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

/* Recording Button (Start > Stop > Download) */
const handleDownload = async () => {
  // String variable
  const INPUT_VIDEO = "recoding.webm";
  const OUTPUT_VIDEO = "MyRecording.mp4";
  const THUMBNAIL = "thumbnail.jpg";
  // Format video(mp4)
  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load(); // go to user's computer
  ffmpeg.FS("writeFile", INPUT_VIDEO, await fetchFile(videoFile)); // create file
  await ffmpeg.run("-i", INPUT_VIDEO, "-r", "60", OUTPUT_VIDEO); // format video
  const mp4File = ffmpeg.FS("readFile", OUTPUT_VIDEO); // get output file
  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" }); // to Blob data
  const mp4Url = URL.createObjectURL(mp4Blob); // to URL
  // Create thumbnail image
  await ffmpeg.run(
    "-i",
    INPUT_VIDEO,
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    THUMBNAIL
  );
  const thumbFile = ffmpeg.FS("readFile", THUMBNAIL);
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });
  const thumbUrl = URL.createObjectURL(thumbBlob);
  // Download recorded video
  const a = document.createElement("a");
  a.href = mp4Url;
  a.download = OUTPUT_VIDEO;
  document.body.appendChild(a);
  a.click();
  // Download thumbnail image
  const thumbA = document.createElement("a");
  thumbA.href = thumbUrl;
  thumbA.download = THUMBNAIL;
  document.body.appendChild(thumbA);
  thumbA.click();
  // Unlink
  ffmpeg.FS("unlink", INPUT_VIDEO);
  ffmpeg.FS("unlink", OUTPUT_VIDEO);
  ffmpeg.FS("unlink", THUMBNAIL);
  URL.revokeObjectURL(videoFile);
  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(thumbUrl);
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

/* Execute init */
init(); // preview
