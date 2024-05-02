const videoContainer = document.getElementById("videoContainer");

const form = document.getElementById("commentForm");

const textarea = form.querySelector("textarea");
const btn = form.querySelector("button");

const addComment = (text, id) => {
  const videoComment = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";

  const icon = document.createElement("i");
  icon.className = "fas fa-comment";

  const span = document.createElement("span");
  span.innerText = ` ${text}`;

  newComment.appendChild(icon);
  newComment.appendChild(span);
  videoComment.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();

  const text = textarea.value;
  const videoId = videoContainer.dataset.id;

  if (text === "") {
    return;
  }

  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

form.addEventListener("submit", handleSubmit);
