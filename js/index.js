import { getAccountInfo, getAllMovies } from "./services.js";
const btnTemaOscuro = document.getElementById("temaClaro");
const btnTemaClaro = document.getElementById("temaOscuro");
const divMovies = document.getElementById("movies");


const fetchMovies = async () => {
  const movies = await getAllMovies();
  if (!movies || !movies.results) {
    console.error("No se encontraron películas");
    return;
  }
  movies.results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("movieCard");
    div.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="poster ${movie.original_title}" class="posterMovie">
    `;
    divMovies.appendChild(div);
  });
};

document.addEventListener("click", (e) => {
  if (e.target == btnTemaClaro || e.target == btnTemaOscuro) {
    btnTemaClaro.classList.toggle("mostrar");
    btnTemaOscuro.classList.toggle("mostrar");
  }
  if (btnTemaOscuro.classList.contains("mostrar")) {
    document.body.classList.replace("claro", "oscuro");
  } else {
    document.body.classList.replace("oscuro", "claro");
  }
});


fetchMovies();