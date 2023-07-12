import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const actionBtn = document.getElementById("actionBtn");
const video = document.getElementById("preview");

/* Global Variables */
let stream;
let recorder;
let videoFile;
const VIDEO = {
  WIDTH: 1024,
  HEIGHT: 576,
};

/* Preview */
const init = async () => {
  // Get media permission
  stream = await navigator.mediaDevices.getUserMedia({
    video: { width: VIDEO.WIDTH, height: VIDEO.HEIGHT },
    audio: true,
  });
  // Start showing preview
  video.srcObject = stream;
  video.play();
};

/* Download file */
const downloadFile = (fileUrl, fileName) => {
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
};

/* Recording Button (Start > Download) */
const handleDownload = async () => {
  // Delete event
  actionBtn.removeEventListener("click", handleDownload);
  actionBtn.innerText = "Transcoding...";
  actionBtn.disabled = true;
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
  // Download recorded video & thumbnail
  downloadFile(mp4Url, OUTPUT_VIDEO);
  downloadFile(thumbUrl, THUMBNAIL);
  // Unlink
  ffmpeg.FS("unlink", INPUT_VIDEO);
  ffmpeg.FS("unlink", OUTPUT_VIDEO);
  ffmpeg.FS("unlink", THUMBNAIL);
  URL.revokeObjectURL(videoFile);
  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(thumbUrl);
  // Reset
  actionBtn.addEventListener("click", handleStart);
  actionBtn.disabled = false;
  actionBtn.innerText = "Record Again";
  init();
};
const handleStart = () => {
  actionBtn.innerText = "Recording...(5s)";
  actionBtn.disabled = true;
  // Change event
  actionBtn.removeEventListener("click", handleStart);
  recorder = new MediaRecorder(stream);
  // When finish recording video, Show recorded video
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.width = VIDEO.WIDTH;
    video.height = VIDEO.HEIGHT;
    video.play();
    actionBtn.innerText = "Download";
    actionBtn.disabled = false;
    actionBtn.addEventListener("click", handleDownload);
  };
  recorder.start();
  // After 5s, Stop recording
  setTimeout(() => {
    recorder.stop();
  }, 5000);
};
actionBtn.addEventListener("click", handleStart);

/* Execute init */
init(); // preview
