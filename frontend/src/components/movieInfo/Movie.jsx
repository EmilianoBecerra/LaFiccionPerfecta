import React, { useContext, useEffect, useState } from "react";
import "./Movie.css";
import { useParams } from "react-router";
import findIdMovie from "../../services/findIdMovie";
import newMovieDetail from "../../services/newMovieDetail";
import getTopics from "../../services/getTopics";
import Topics from "./Topics";
import { Skeleton } from "@mui/material";
import Cast from "./Cast";
import Crew from "./Crew";
import Detail from "./Detail";
import Genred from "./Genred";
import { TopicContext } from "../../context/StorageContexto";

const Movie = ({ theme }) => {
  sessionStorage.removeItem("topicName");
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [movieDetail, setMovieDetail] = useState({});
  const [comments, setComments] = useState(undefined);
  const [completeOverview, setCompleteOverview] = useState(false);
  const [typeInfoMovie, setTypeInfoMovie] = useState("crew");
  const [loading, setLoading] = useState(true);
  /*  const [error, setError] = useState(null); */
  const { setSelectedMovieId } = useContext(TopicContext);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await findIdMovie(params.id);
        const dataDetail = await newMovieDetail(params.id);
        const topicsMovie = await getTopics(params.id);
        setMovie(data);
        setMovieDetail(dataDetail);
        setComments(topicsMovie);
        sessionStorage.setItem("movieName", data.title);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [params.id]);

  useEffect(() => {
    setSelectedMovieId(movie.id);
  }, [movie]);

  const handleClick = (value) => {
    setTypeInfoMovie(value);
  };

  const renderSection = () => {
    switch (typeInfoMovie) {
      case "cast":
        return <Cast movieDetail={movieDetail} />;
      case "crew":
        return <Crew movieDetail={movieDetail} />;
      case "detail":
        return <Detail movie={movie} />;
      case "genred":
        return <Genred movie={movie} />;
      default:
        return <Cast movieDetail={movieDetail} />;
    }
  };
  return (
    <main className="Movie">
      {loading
        ? <>
          <Skeleton width={208} height={324} variant="rectangular" className="skeleton" sx={{ display: "flex" }} />
        </>
        : <>
          <section className="movie">
            <img src={
              movie.poster_path === null
                ? "./img/imgnull.webp"
                : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            } alt={`poster de la pelicula ${movie.original_title}`} />
            <article className="overview">
              <h2>{movie.title}</h2>
              {
                movie.poster_path
                  ? <p>
                    {!completeOverview
                      ? movie?.overview?.slice(0, 327)
                      : movie.overview
                    }
                    {!completeOverview && movie.overview?.length > 327
                      ? <span onClick={() => setCompleteOverview((prevValue) => !prevValue)}>
                        {completeOverview ? "ver menos" : " ver mas"}
                      </span>
                      : ""
                    }
                  </p>
                  : ""
              }
            </article>
          </section>
          <div className="infoPersons">
            <ul>
              <li onClick={() => handleClick("crew")}>Equipo</li>
              <li onClick={() => handleClick("cast")}>Elenco</li>
              <li onClick={() => handleClick("detail")}>Detalles</li>
              <li onClick={() => handleClick("genred")}>Genero</li>
            </ul>
            <div className="detailMovie">
              {
                (renderSection())
              }
            </div>
          </div>
          <Topics comments={comments} theme={theme} movieid={movie?.id} />
        </>
      }
    </main>
  );
};

export default Movie;
