const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteCommentBtns = document.querySelectorAll(".video__delete-comment");

/* f: Delete comment */
const deleteComment = (id) => {
  const element = document.querySelector(`[data-id="${id}"]`);
  element.remove();
};

/* Handle: Delete comment */
const handleDeleteComment = async (event) => {
  const commentId = event.target.parentElement.dataset.id;
  // Use API
  const response = await fetch(`/api/videos/${commentId}/comment`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  // Success: Delete comment immediately
  if (response.status === 204) {
    deleteComment(commentId);
  }
};

/* f: Create additional comment */
const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = id;
  // Create child elements
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const deleteSpan = document.createElement("span");
  deleteSpan.className = "video__delete-comment";
  deleteSpan.innerHTML = "&nbsp;❌";
  deleteSpan.addEventListener("click", handleDeleteComment);
  // Front-End
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(deleteSpan);
  videoComments.prepend(newComment);
};

/* Submit comment */
if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    // Exception
    if (text.trim() === "") {
      return;
    }
    // Use API
    const response = await fetch(`/api/videos/${videoId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    // Success: Update fake comment immediately
    if (response.status === 201) {
      textarea.value = "";
      const { newCommentId } = await response.json();
      addComment(text, newCommentId);
    }
  });
}

/* Delete comment */
deleteCommentBtns.forEach((btn) => {
  btn.addEventListener("click", handleDeleteComment);
});
