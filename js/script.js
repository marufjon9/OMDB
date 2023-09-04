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
    let movieListItem = document.createElement("div");
    movieListItem.dataset.id = moviess[idx].imdbId;
    movieListItem.classList.add("search-list-item");
    if (moviess[idx].Poster != "N/A") {
      moviePoster = moviess[idx].Poster;
    } else {
      moviePoster = "/img/image_not_found.png";
    }

    movieListItem.innerHTML = `
      <div class="search-item-thumbnail">
          <img src="${moviePoster}" />
      </div>
      <div class="search-item-info">
          <h3>${moviess[idx].Title}</h3>
          <p>${moviess[idx].Year}</p>
      </div>
    `;
    searchList.appendChild(movieListItem);
  }
}

// function displayMovieList(movies) {
//   searchList.innerHTML = "";
//   for (let idx = 0; idx < movies.length; idx++) {
//     let movieListItem = document.createElement("div");
//     movieListItem.dataset.id = movies[idx].imdbID;
//     movieListItem.classList.add("search-list-item");
//     if (movies[idx].Poster != "N/A") moviePoster = movies[idx].Poster;
//     else moviePoster = "./img/image_not_found.png";

//     movieListItem.innerHTML = `
//         <div class = "search-item-thumbnail">
//             <img src = "${moviePoster}">
//         </div>
//         <div class = "search-item-info">
//             <h3>${movies[idx].Title}</h3>
//             <p>${movies[idx].Year}</p>
//         </div>
//         `;
//     searchList.appendChild(movieListItem);
//   }
//   loadMovieDetails();
// }

// function loadMovieDetails() {
//   const searchListMovies = searchList.querySelectorAll(".search-list-item");
//   searchListMovies.forEach((movie) => {
//     movie.addEventListener("click", async () => {
//       // console.log(movie.dataset.id);
//       searchList.classList.add("hide-search-list");
//       movieSearchBox.value = "";
//       const result = await fetch(
//         `http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`,
//       );
//       const movieDetails = await result.json();
//       // console.log(movieDetails);
//       // displayMovieDetails(movieDetails);
//     });
//   });
// }

// function displayMovieDetails(details) {
//   resultGrid.innerHTML = `
//     <div class = "movie-poster">
//         <img src = "${
//           details.Poster != "N/A" ? details.Poster : "image_not_found.png"
//         }" alt = "movie poster">
//     </div>
//     <div class = "movie-info">
//         <h3 class = "movie-title">${details.Title}</h3>
//         <ul class = "movie-misc-info">
//             <li class = "year">Year: ${details.Year}</li>
//             <li class = "rated">Ratings: ${details.Rated}</li>
//             <li class = "released">Released: ${details.Released}</li>
//         </ul>
//         <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
//         <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
//         <p class = "actors"><b>Actors: </b>${details.Actors}</p>
//         <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
//         <p class = "language"><b>Language:</b> ${details.Language}</p>
//         <p class = "awards"><b><i class = "fas fa-award"></i></b> ${
//           details.Awards
//         }</p>
//     </div>
//     `;
// }

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
      <li class="movie__item" data-id=${element.id}>
        <img
          data-id=${element.id}
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

function renderCard(array) {
  mainListMovies.innerHTML = "";

  array.forEach((element) => {
    mainListMovies.innerHTML += `
            <li class="element__item element" dataset=${element.id}>
              <div class="element__top">
                <img
                  src=${element.img}
                  alt="${element.title}"
                  class="element__img"
                />
              </div>
              <div class="element__bottom">
                <div class="element__writers">
                  <div class="element__container">
                    <p class="element__writer">${element.director[0]}</p>
                    <p class="element__writer">${element.director[1]}</p>
                  </div>  
                  <button class="element__close" type="button"></button>
                </div>
                <div class="element__name">
                  <p class="element__title">${element.title}</p>
                </div>
                <div class="element__genre">
                  <span class="element__type-first">${element.genre[0]}</span>
                  <span class="element__type-second">${
                    element.genre[1] ? element.genre[1] : "N/A"
                  }</span>
                  <span class="element__type-third">${
                    element.genre[2] ? element.genre[2] : "N/A"
                  }</span>
                </div>
                <div class="element__stats">
                  <a target="_blank" class="element__play borders" href='https://www.imdb.com/title/${
                    element.imdbId
                  }/'  ></a>
                  <span class="element__rating borders"
                    >Rating
                    <span class="span__rating-value rotate">${
                      element.rated
                    }</span></span
                  >
                  <span class="element__release borders"
                    >Release
                    <span class="span__release-value rotate"
                      >${element.released}</span
                    ></span
                  >
                  <span class="element__boxoffice borders"
                    >Boxoffice
                    <span class="span__boxoffice-value rotate"
                      >${element.boxoffice ? element.boxoffice : "N/A"}</span
                    ></span
                  >
                  <span class="element__length borders"
                    >Length
                    <span class="span__length-value rotate">${
                      element.runtime ? element.runtime : "N/A"
                    }</span></span
                  >
                </div>
                <div class="element__inner">
                  <p class="element__info">Description</p>
                  <p class="element__desription">
                    ${element.plot}
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
    const foundMovie = movies.filter((item) => item.id == elementId);
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

renderMovies(movies);

const date = new Date();

const year = date.getFullYear();

const thisYear = `${year}`;

fYear.textContent = thisYear;
