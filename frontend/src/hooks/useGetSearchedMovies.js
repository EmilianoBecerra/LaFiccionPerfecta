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
    setTimeout(() => {
      if (
        searchedMovieRef.current !== "" &&
        searchedMovieRef.current === searchedMovie
      ) {
        const fetchSearchedMovies = async () => {
          try {
            setIsLoading(true);
            const response = await searchMovie(searchedMovie, page);
            setMovies(response.results);
            setInfoPages(response.total_pages);
          } catch (error) {
            setIsError("Error al buscar las peliculas");
          } finally {
            setIsLoading(false);
          }
        };

        fetchSearchedMovies();
      }
    }, 500);
  }, [searchedMovie, searchedMovieRef, setMovies, setInfoPages, page]);

  return { isLoading, isError, setInfoPages };
};
