import { useEffect, useState } from "react";
import { searchMovie } from "../services/searchMovie";

export const useGetSearchedMovies = ({
  searchedMovieRef,
  searchedMovie,
  setMovies,
  setInfoPages,
  page
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (searchedMovie.trim() === "") return;
    const fetchSearchedMovies = async () => {
      try {
        setIsLoading(true);
        const response = await searchMovie(searchedMovie, page);
        console.log(response.results);
        setMovies(response.results);
        setInfoPages(response.total_pages);
      } catch (error) {
        console.error(error);
        setIsError("Error al buscar las peliculas");
      } finally {
        setIsLoading(false);
      }
    };
    console.log(searchedMovieRef.current === searchedMovie);
    const delayDebounce = setTimeout(() => {
      if (searchedMovieRef.current === searchedMovie) {
        fetchSearchedMovies();
      }
    }, 700);
    return () => clearTimeout(delayDebounce);
  }, [searchedMovie]);
  return { isLoading, isError };
};
