const movieTheme = document.querySelector(".movie__theme");
const mainList = document.querySelector(".main__list");
const fYear = document.querySelector(".f__year");

if (localStorage.getItem("mode") == "dark") {
  darkMode();
} else {
  noDark();
}

movieTheme.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    darkMode();
  } else {
    noDark();
  }
});

function darkMode() {
  document.body.classList.add("dark");
  localStorage.setItem("mode", "dark");
  // themeBtn.textContent = "Light Mode";
}

function noDark() {
  document.body.classList.remove("dark");
  localStorage.setItem("mode", "light");
  // themeBtn.textContent = "Dark Mode";
}

function renderMovies(array) {
  array.forEach((element) => {
    mainList.innerHTML += `
      <li class="movie__item">
        <img
          dataset=${element.id}
          src=${element.img}
          alt=${element.title}
          class="movie__img"
          
        />
        <div class="movie__textbox">
          <h2 class="movie__title">${element.title} <span>${element.year}</span></h2>
          <p class="movie__type">${element.type}</p>
        </div>
        <button class="movie__fav" type="button"></button>
      </li>
    `;
  });
}

// renderMovies(movies);

const date = new Date();

const year = date.getFullYear();

const thisYear = `${year}`;

fYear.textContent = thisYear;
