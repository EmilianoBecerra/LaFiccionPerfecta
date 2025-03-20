import { useEffect, useState } from "react";
import { getMovies } from "../services/servicesMovies.js";
import "./Main.css";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import { useGetSearchedMovies } from "../hooks/useGetSearchedMovies.js";
import { Skeleton } from "@mui/material";

export default function Main({ themeStyle, searchedMovieRef, searchedMovie }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const [page, setPage] = useState(1);
  const [infoPages, setInfoPages] = useState(1);
  const eskeletonNum = [...Array(20).keys()];

  useEffect(() => {
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
    if (searchedMovie === "") {
      fetchMovies();
    }
  }, [page]);

  const { isLoading, isError } = useGetSearchedMovies({
    searchedMovieRef,
    searchedMovie,
    setMovies,
    setInfoPages,
    page,
  });

  const handlePagination = (e, newPage) => {
    setPage(newPage);
  };
  if (isError) {
    return <p className="error-message">No se encontraron películas</p>;
  }

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <main>
      <div className="introduction">
        <h2>Donde el debate por el cine sucede </h2>
        <p>
          Busca la pelicula que deseen debatir, abrí un nuevo tema de discusión
          y contanos tus teorías, conspiraciones o sentimientos que te produjo
        </p>
      </div>
      <div className={`movies ${themeStyle}`}>
        {loading
          ? eskeletonNum.map((skeletonIndex) => {
              return (
                <Skeleton
                  key={skeletonIndex}
                  variant="rectangle"
                  height={120}
                  width={80}
                />
              );
            })
          : movies.map((movie) => {
              return (
                <a
                  href={`${movie.id}`}
                  key={movie.id}
                  className={`posterMovie`}
                >
                  {!loadedImages[movie.id] && (
                    <Skeleton variant="rectangle" height={133} width={84} />
                  )}
                  <img
                    src={
                      movie.poster_path === null
                        ? "./img/imgnull.webp"
                        : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    }
                    alt={`imagen pelicula ${movie.original_title}`}
                    onLoad={() => handleImageLoad(movie.id)}
                    style={{
                      display: !loadedImages[movie.id] ? "none" : "block",
                    }}
                  />
                </a>
              );
            })}
      </div>
      <Pagination
        count={infoPages > 500 ? 500 : infoPages}
        page={page}
        color="primary"
        variant="text"
        className="dark"
        onChange={handlePagination}
      />
    </main>
  );
}
