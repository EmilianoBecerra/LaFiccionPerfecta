import "../App.css";
import "./Header.css";
import "../index.css";

export default function Header({
  sendData,
  setSearchedMovie,
  searchedMovieRef,
}) {
  const storage = window.localStorage;
  const theme = storage.getItem("theme") || "light";

  const handleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    storage.setItem("theme", newTheme);
    sendData(newTheme);
  };

  const handleInput = (e) => {
    const movieName = e.target.value;
    searchedMovieRef.current = movieName;
    setSearchedMovie(movieName);
  };

  return (
    <header>
      <img
        src={theme === "light" ? "./img/sol.png" : "./img/luna.png"}
        alt={theme === "light" ? "icono tema claro" : "icono tema oscuro"}
        className="iconoTema mostrar"
        id="temaClaro"
        width="32"
        height="32"
        onClick={handleTheme}
      />
      <h1 className={`${theme}`}>
        <p>La </p>
        <p>Ficción</p>
        <p>Perfecta</p>
      </h1>
      <div className="divSearch">
        <label htmlFor="search">
          Buscar
          <input
            className="inputSearch"
            id="search"
            name="inputSearch"
            type="text"
            defaultValue={""}
            onChange={handleInput}
          />
        </label>
      </div>
    </header>
  );
}
