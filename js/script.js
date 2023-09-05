const movieTheme = document.querySelector(".movie__theme");
const mainList = document.querySelector(".main__list");
const fYear = document.querySelector(".f__year");
const mainListMovies = document.querySelector(".main__list-movies");

const movieImg = document.querySelector(".movie__img");
const elementItem = document.querySelector(".element__item");
const elementClose = document.querySelector(".element__close");

const movieInput = document.querySelector(".movie__input");
const movieForm = document.querySelector(".movie__form");
const searchList = document.getElementById("search-list");
const searchListItem = document.querySelector(".search-list-item");

async function loadMovies(searchTerm) {
  const URL = `https://www.omdbapi.com/?apikey=62de789&s=${searchTerm}&page=1`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  // console.log(data);
  if (data.Response == "True") displayMovieList(data.Search);
}

function findMovies() {
  let searchTerm = movieInput.value.trim();
  if (searchTerm.length > 0) {
    searchList.classList.remove("hide-search-list");
    loadMovies(searchTerm);
  } else {
    searchList.classList.add("hide-search-list");
  }
}

function displayMovieList(moviess) {
  searchList.innerHTML = "";
  for (let idx = 0; idx < moviess.length; idx++) {
    var movieListItem = document.createElement("div");
    movieListItem.dataset.id = moviess[idx].imdbID;
    movieListItem.classList.add("search-list-item");
    if (moviess[idx].Poster != "N/A") {
      moviePoster = moviess[idx].Poster;
    } else {
      moviePoster = "/img/image_not_found.png";
    }

    movieListItem.innerHTML = `
      <div class="search-item-thumbnail" dataset=${moviess[idx].imdbID}>
          <img src="${moviePoster}" />
      </div>
      <div class="search-item-info">
          <h3>${moviess[idx].Title}</h3>
          <p>${moviess[idx].Year}</p>
      </div>
    `;
    searchList.appendChild(movieListItem);
  }
  loadMovieDetails();
}

function loadMovieDetails() {
  const searchListMovies = searchList.querySelectorAll(".search-list-item");
  searchListMovies.forEach((movie) => {
    movie.addEventListener("click", async () => {
      // console.log(movie.dataset.id);
      searchList.classList.add("hide-search-list");
      movieInput.value = "";
      const result = await fetch(
        `https://www.omdbapi.com/?apikey=62de789&i=${movie.dataset.id}&page=1`,
      );
      const movieDetails = await result.json();
      // console.log(movieDetails);
      displayMovieDetails(movieDetails);
    });
  });
}

function displayMovieDetails(details) {
  mainList.innerHTML = "";
  mainListMovies.innerHTML = "";
  mainListMovies.innerHTML = `
    <li class="element__item element" dataset=${details.imdbID}>
              <div class="element__top">
                <img
                  src=${details.Poster}
                  dataset=${details.imdbID}
                  alt="${details.Title}"
                  class="element__img"
                />
              </div>
              <div class="element__bottom">
                <div class="element__writers">
                  <div class="element__container">
                    <p class="element__writer">${details.Writer[0]}</p>
                    <p class="element__writer">${details.Writer[1]}</p>
                  </div>  
                  <button class="element__close" type="button"></button>
                </div>
                <div class="element__name">
                  <p class="element__title">${details.Title}</p>
                </div>
                <div class="element__genre">
                  <span class="element__type-first">${details.Genre[0]}</span>
                  <span class="element__type-second">${
                    details.Genre[1] ? details.Genre[1] : "N/A"
                  }</span>
                  <span class="element__type-third">${
                    details.Genre[2] ? details.Genre[2] : "N/A"
                  }</span>
                </div>
                <div class="element__stats">
                  <a target="_blank" class="element__play borders" href='https://www.imdb.com/title/${
                    details.imdbID
                  }/'  ></a>
                  <span class="element__rating borders"
                    >Rating
                    <span class="span__rating-value rotate">${
                      details.Rated
                    }</span></span
                  >
                  <span class="element__release borders"
                    >Release
                    <span class="span__release-value rotate"
                      >${details.Released}</span
                    ></span
                  >
                  <span class="element__boxoffice borders"
                    >Boxoffice
                    <span class="span__boxoffice-value rotate"
                      >${details.BoxOffice ? details.BoxOffice : "N/A"}</span
                    ></span
                  >
                  <span class="element__length borders"
                    >Length
                    <span class="span__length-value rotate">${
                      details.Runtime ? details.Runtime : "N/A"
                    }</span></span
                  >
                </div>
                <div class="element__inner">
                  <p class="element__info">Description</p>
                  <p class="element__desription">
                    ${details.Plot}
                  </p>
                  <div class="element__ratings">
                    <p class="element__imdb">${details.Ratings[0].Value}</p>
                    <p class="element__rt">${
                      details.Ratings[1]?.Value
                        ? details.Ratings[1].Value
                        : "N/A"
                    }</p>
                    <p class="element__metacritic">${
                      details.Ratings[2]?.Value
                        ? details.Ratings[2].Value
                        : "N/A"
                    }</p>
                  </div>
                </div>
              </div>
        </li>
  `;
}

window.addEventListener("click", (event) => {
  if (event.target.className != "form-control") {
    searchList.classList.add("hide-search-list");
  }
});

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
  mainList.textContent = "";
  array.forEach((element) => {
    mainList.innerHTML += `
      <li class="movie__item" data-id=${element.imdbID}>
        <img
          data-id=${element.imdbID}
          src=${element.Poster}
          alt=${element.Title}
          class="movie__img"
        />
        <div class="movie__textbox">
          <h2 class="movie__title">${element.Title} <span>${element.Year}</span></h2>
          
          <p class="movie__type">${element.Genre}</p>
        </div>
        <button class="movie__fav" type="button"></button>
      </li>
    `;
  });
}

function renderCard(array) {
  mainListMovies.innerHTML = "";

  array.forEach((element) => {
    mainListMovies.innerHTML += `
            <li class="element__item element" dataset=${element.imdbID}>
              <div class="element__top">
                <img
                  src=${element.Poster}
                  dataset=${element.imdbID}
                  alt="${element.Title}"
                  class="element__img"
                />
              </div>
              <div class="element__bottom">
                <div class="element__writers">
                  <div class="element__container">
                    <p class="element__writer">${element.Writer[0]}</p>
                    <p class="element__writer">${element.Writer[1]}</p>
                  </div>  
                  <button class="element__close" type="button"></button>
                </div>
                <div class="element__name">
                  <p class="element__title">${element.Title}</p>
                </div>
                <div class="element__genre">
                  <span class="element__type-first">${element.Genre[0]}</span>
                  <span class="element__type-second">${
                    element.Genre[1] ? element.Genre[1] : "N/A"
                  }</span>
                  <span class="element__type-third">${
                    element.Genre[2] ? element.Genre[2] : "N/A"
                  }</span>
                </div>
                <div class="element__stats">
                  <a target="_blank" class="element__play borders" href='https://www.imdb.com/title/${
                    element.imdbID
                  }/'  ></a>
                  <span class="element__rating borders"
                    >Rating
                    <span class="span__rating-value rotate">${
                      element.Rated
                    }</span></span
                  >
                  <span class="element__release borders"
                    >Release
                    <span class="span__release-value rotate"
                      >${element.Released}</span
                    ></span
                  >
                  <span class="element__boxoffice borders"
                    >Boxoffice
                    <span class="span__boxoffice-value rotate"
                      >${element.BoxOffice ? element.BoxOffice : "N/A"}</span
                    ></span
                  >
                  <span class="element__length borders"
                    >Length
                    <span class="span__length-value rotate">${
                      element.Runtime ? element.Runtime : "N/A"
                    }</span></span
                  >
                </div>
                <div class="element__inner">
                  <p class="element__info">Description</p>
                  <p class="element__desription">
                    ${element.Plot}
                  </p>
                  <div class="element__ratings">
                    <p class="element__imdb">${element.Ratings[0].Value}</p>
                    <p class="element__rt">${
                      element.Ratings[1]?.Value
                        ? element.Ratings[1].Value
                        : "N/A"
                    }</p>
                    <p class="element__metacritic">${
                      element.Ratings[2]?.Value
                        ? element.Ratings[2].Value
                        : "N/A"
                    }</p>
                  </div>
                </div>
              </div>
        </li>
        `;
  });
}

mainList.addEventListener("click", function (e) {
  if (e.target.matches(".movie__img")) {
    mainList.innerHTML = "";
    const elementId = e.target.dataset.id;
    // console.log(elementId);
    const foundMovie = movies.filter((item) => item.imdbID == elementId);
    renderCard(foundMovie);
  }
});

mainListMovies.addEventListener("click", function (e) {
  if (e.target.matches(".element__close")) {
    // elementItem.classList.add("no-show");
    renderMovies(movies);
    mainListMovies.innerHTML = "";
  }
});

searchList.addEventListener("click", function (e) {
  if (e.target.matches(".search-list-item")) {
  }
});

renderMovies(movies);

const date = new Date();

const year = date.getFullYear();

const thisYear = `${year}`;

fYear.textContent = thisYear;
