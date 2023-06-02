import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://quickcart-e1abb-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const db = getDatabase(app);
const dbRef = ref(db, "movieList");

const inputEl = document.getElementById("input-el");
const movieListEl = document.getElementById("movie-list");

onValue(dbRef, function (snapshot) {
  if (snapshot.exists()) {
    let dataArr = Object.entries(snapshot.val());

    clearmovieList();

    for (let i = 0; i < dataArr.length; i++) {
      let currentItem = dataArr[i];
      appendList(currentItem);
    }
  } else {
    movieListEl.innerHTML = "No Movies left to be watched...";
  }
});

function clearmovieList() {
  movieListEl.innerHTML = "";
}

function clearInput() {
  inputEl.value = "";
}

function appendList(item) {
  // movieListEl.innerHTML += `<li> ${val} </li>`;
  let itemID = item[0];
  let itemVal = item[1];

  let newEl = document.createElement("li");
  newEl.textContent = itemVal;

  newEl.addEventListener("click", function () {
    let exactLocationofItem = ref(db, `movieList/${itemID}`);
    remove(exactLocationofItem);
  });

  movieListEl.appendChild(newEl);
}

document.getElementById("add-btn").onclick = function () {
  let inputValue = inputEl.value;
  push(dbRef, inputValue);
  clearInput();
};
