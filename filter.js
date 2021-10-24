// query selectors
let posts = [];
let filteredPosts = [];
const POSTS_TO_SHOW = 6;
let maxDisplayLimit = POSTS_TO_SHOW;
const postContainer = document.querySelector(".post-container");
const search = document.querySelector('[type="search"]');

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
      <img class="post__author--avatar" width="55" src="${
        post.meta.author.avatar
      }" alt="${post.user.name[0].firstName} ${post.user.name[1].lastName}">
      <div>
        <p class="post__author--name">${post.user.name[0].firstName} ${
    post.user.name[1].lastName
  }</p>
        <p class="post__author--role">
          <small>${post.user.jobTitle}</small>
        </p>
      </div>
    </div>
    <div class="post__body">
        ${post.summary}
    </div>
    <a href="${post.meta.url}" class="btn">Read Post</a>
  `;
  return article;
}

function loadPosts() {
  const frag = document.createDocumentFragment();
  filteredPosts
    .slice(0, maxDisplayLimit)
    .map((post) => frag.appendChild(generatePost(post)));
  postContainer.innerHTML = "";
  postContainer.appendChild(frag);
}

function filterPosts() {
  console.log("Search:", search.value);

  const searchFilter = (post) =>
    [
      post.title,
      post.summary,
      post.user.name[0].firstName,
      post.user.name[1].lastName,
      post.meta.tags.map((t) => t).join(""),
    ]
      .join("")
      .toLowerCase()
      .indexOf(search.value.toLowerCase()) !== -1;
  console.log("Posts:", posts);
  filteredPosts = posts.filter(searchFilter);
  console.log("Filtered Posts:", filteredPosts);
  loadPosts();
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
      posts = data.sort(
        (a, b) => new Date(b.meta.date) - new Date(a.meta.date)
      );
      filterPosts();
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
function viewMorePosts() {
  maxDisplayLimit += POSTS_TO_SHOW;
  loadPosts();
}
document.querySelector(".btn--view").addEventListener("click", viewMorePosts);

// filter for search
search.addEventListener("keyup", filterPosts);
