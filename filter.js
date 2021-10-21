// query selectors
let posts = [];
const maxDisplayLImit = 3;
const postContainer = document.querySelector(".post-container");

// create the cards and update the ui
function generatePost(post) {
  const returnPostDate = (date) =>
    `${
      [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  const article = document.createElement("article");
  article.classList.add("post");
  article.innerHTML = `
    <div class="post__meta">
      <div class="post__tag--container">
      ${post.meta.tags
        .map((tag) => `<span class="post__tag">${tag}</span>`)
        .join("")}
      </div>
      <p class="post__date">${returnPostDate(new Date(post.meta.date))}</p>
    </div>
    <h3 class="post__header">
      <a href="${post.meta.url}">${post.title}</a>
    </h3>
    <div class="post__author">
      <div class="post__author--avatar" width="55"></div>
      <div>
        <p class="post__author--name"></p>
        <p class="post__author--role">
          <small></small>
        </p>
      </div>
    </div>
    <div class="post__body">
    </div>
    <a href="#" class="btn"></a>
  `;
  return article;
}

function loadPosts() {
  const frag = document.createDocumentFragment();
  posts
    .slice(0, maxDisplayLImit)
    .map((post) => frag.appendChild(generatePost(post)));
  postContainer.innerHTML = "";
  postContainer.appendChild(frag);
}

// fetch the data
async function fetchPosts() {
  await fetch("./posts.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      posts = data;
      loadPosts();
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operations:",
        error
      );
    });
}
fetchPosts();

// update number of posts with button click

// filter for search
