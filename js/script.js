const movieTheme = document.querySelector(".movie__theme");
const mainList = document.querySelector(".main__list");
const fYear = document.querySelector(".f__year");
const mainListMovies = document.querySelector(".main__list-movies");

const movieImg = document.querySelector(".movie__img");
const elementItem = document.querySelector(".element__item");
const elementClose = document.querySelector(".element__close");

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
            <li class="element__item element no-show" dataset=${element.id}>
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
                  <button class="element__close" type="button" dataset=${element.title}></button>
                </div>
                <div class="element__name">
                  <p class="element__title">${element.title}</p>
                </div>
                <div class="element__genre">
                  <span class="element__type-first">${element.genre[0]}</span>
                  <span class="element__type-second">${element.genre[1]}</span>
                  <span class="element__type-third">${element.genre[2]}</span>
                </div>
                <div class="element__stats">
                  <div class="element__play borders"></div>
                  <span class="element__rating borders"
                    >Rating
                    <span class="span__rating-value rotate">${element.rated}</span></span
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
                      >${element.boxoffice}</span
                    ></span
                  >
                  <span class="element__length borders"
                    >Length
                    <span class="span__length-value rotate">${element.runtime}</span></span
                  >
                </div>
                <div class="element__inner">
                  <p class="element__info">Description</p>
                  <p class="element__desription">
                    ${element.plot}
                  </p>
                  <div class="element__ratings">
                    <p class="element__imdb">${element.Ratings[0].Value}</p>
                    <p class="element__rt">${element.Ratings[0].Value}</p>
                    <p class="element__metacritic">${element.Ratings[0].Value}</p>
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
    const numberId = e.target.dataset.id;
    // console.log(numberId);
    const foundMovie = movies.find((item) => {
      return item.id == numberId;
    });
    renderCard(foundMovie);
  }
});

mainListMovies.addEventListener("click", function (e) {
  if (e.target.matches(".element__close")) {
    elementItem.classList.add("no-show");
  }
  renderMovies(movies);
});

renderMovies(movies);

const date = new Date();

const year = date.getFullYear();

const thisYear = `${year}`;

fYear.textContent = thisYear;
