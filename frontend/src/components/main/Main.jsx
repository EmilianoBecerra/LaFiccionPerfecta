import React, { useEffect, useState, useRef } from "react";
import { getMovies } from "../../services/getMovies.js";
import "./Main.css";
import Pagination from "@mui/material/Pagination";
import { useGetSearchedMovies } from "../../hooks/useGetSearchedMovies.js";
import { Skeleton } from "@mui/material";
import { Link } from "react-router";

export default function Main ({
  themeStyle
}) {
  sessionStorage.removeItem("movieName");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const [page, setPage] = useState(1);
  const [infoPages, setInfoPages] = useState(1);
  const eskeletonNum = [...Array(20).keys()];
  const [searchedMovie, setSearchedMovie] = useState("");
  const searchedMovieRef = useRef("");
  useEffect(() => {
    fetchMovies();
  }, [page, infoPages]);

  const fetchMovies = async () => {
    try {
      const data = await getMovies(setInfoPages, page);
      setMovies(data.results);
      setInfoPages(data.total_pages);
      setPage(data.page);
    } catch (err) {
      setError("Error al obtener las peliculas");
    } finally {
      setLoading(false);
    }
  };

  const { isError, isLoading } = useGetSearchedMovies({
    searchedMovieRef,
    searchedMovie,
    setMovies,
    setInfoPages,
    page,
    setSearchedMovie
  });

  const handleInput = (e) => {
    const movieName = e.target.value;
    if (movieName === "") {
      searchedMovieRef.current = "";
      setSearchedMovie("");
      fetchMovies();
    }
    if (/^[\w-]+$/.test(movieName)) {
      searchedMovieRef.current = movieName;
      setSearchedMovie(movieName);
    }
  };

  const handlePagination = (e, newPage) => {
    setPage(newPage);
  };

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  if (isError) {
    return <p className="error-message">${error}</p>;
  }
  return (
    <section className="Main">
      <hr />
      <input
        className="inputSearch"
        id="search"
        name="inputSearch"
        type="text"
        maxLength={20}
        onChange={handleInput}
        placeholder="Busca tu peli"
      />
      <h2>Donde el debate por el cine sucede </h2>
      <p>
        Busca la pelicula que desees debatir, abrí un nuevo tema de discusión
        y contanos tus teorías, inquietudes o los sentimientos que te produjo.
      </p>
      <div className={`movies ${themeStyle}`}>
        {loading || isLoading
          ? eskeletonNum.map((skeletonIndex) => {
            return (
              <Skeleton
                key={skeletonIndex}
                variant="rounded"
                height={133}
                width={84}
              />
            );
          })
          : movies?.map((movie) => {
            return (
              <Link to={`/pelicula/${movie.id}`} key={movie.id}>
                {!loadedImages[movie.id] && (
                  <Skeleton variant="rectangle" height={133} width={84} animatio={"wave"} sx={themeStyle === "dark" ? { bgcolor: "rgba(255, 255, 255, 0.226)", borderRadius: "5px" } : { borderRadius: "5px" }} />
                )}
                <img
                  src={
                    movie.poster_path === null
                      ? "./img/imgnull.webp"
                      : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  }
                  className="posterMovie"
                  alt={`imagen pelicula ${movie.original_title}`}
                  onLoad={() => handleImageLoad(movie.id)}
                  style={{
                    display: !loadedImages[movie.id] ? "none" : "block"
                  }}
                />
              </Link>
            );
          })}
      </div>
      {(loading || !isLoading) && infoPages > 1
        ? <Pagination
          count={infoPages > 500 ? 500 : infoPages}
          page={page}
          variant="text"
          className="pagination"
          onChange={handlePagination}
        />
        : <Skeleton width={"70%"} height={20} sx={infoPages < 2 ? { display: "none" } : { display: "block" }} />
      }
    </section >
  );
}
