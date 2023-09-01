const movieTheme = document.querySelector(".movie__theme");
const mainList = document.querySelector(".main__list");
const fYear = document.querySelector(".f__year");

movieTheme.addEventListener("click", function () {
  document.body.classList.toggle("dark");
});

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

renderMovies(movies);

const date = new Date();

const year = date.getFullYear();

const thisYear = `${year}`;

fYear.textContent = thisYear;
