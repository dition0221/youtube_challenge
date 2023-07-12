const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

/* Submit comment */
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const video = videoContainer.dataset.id;
  });
}
