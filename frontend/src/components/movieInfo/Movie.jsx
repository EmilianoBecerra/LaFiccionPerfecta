import React, { useContext, useEffect, useState } from "react";
import "./Movie.css";
import { useParams } from "react-router";
import findIdMovie from "../../services/findIdMovie";
import newMovieDetail from "../../services/newMovieDetail";
import { TopicContext } from "../../context/StorageContexto";
import { Skeleton } from "@mui/material";
import Topics from "./Topics";
import Cast from "./Cast";
import Crew from "./Crew";
import Detail from "./Detail";
import Genred from "./Genred";

const Movie = ({ theme }) => {
  sessionStorage.removeItem("topicName");
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [movieDetail, setMovieDetail] = useState({});
  const [completeOverview, setCompleteOverview] = useState(false);
  const [typeInfoMovie, setTypeInfoMovie] = useState("crew");
  const [loading, setLoading] = useState(true);
  const { setSelectedMovieId } = useContext(TopicContext);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await findIdMovie(params.id);
        const dataDetail = await newMovieDetail(params.id);
        setMovie(data);
        setMovieDetail(dataDetail);
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
    <section className="Movie">
      <section className="movie">
        {
          !loading
            ? <img src=
              {
                movie.poster_path === null
                  ? "./img/imgnull.webp"
                  : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              } alt={`poster de la pelicula ${movie.original_title}`} />
            : <Skeleton animatio={"wave"} variant="rectangular" width={208} height={320} sx={theme === "dark" ? { borderRadius: "5px", bgcolor: "rgba(255, 255, 255, 0.226)" } : { borderRadius: "5px" }} />
        }
        <article className="overview">
          {!loading
            ? <h2>{movie.title}</h2>
            : <Skeleton animatio={"wave"} variant="rectangular" width={152} height={50} sx={theme === "dark" ? { borderRadius: "5px", bgcolor: "rgba(255, 255, 255, 0.226)", marginBottom: "10px" } : { borderRadius: "5px", marginBottom: "10px" }} />
          }
          {!loading
            ? <>
              <p>
                {!completeOverview
                  ? movie?.overview?.slice(0, 260)
                  : movie.overview
                }
                {!completeOverview && movie.overview?.length > 260
                  ? <span onClick={() => setCompleteOverview((prevValue) => !prevValue)}>
                    {completeOverview ? "ver menos" : " ver mas"}
                  </span>
                  : ""
                }
              </p>
            </>
            : <Skeleton animatio={"wave"} variant="rectangular" width={152} height={250} sx={theme === "dark" ? { borderRadius: "5px", bgcolor: "rgba(255, 255, 255, 0.226)" } : { borderRadius: "5px" }} />
          }
        </article>
      </section>
      {
        !loading
          ? <div className="infoPersons">
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
          : <Skeleton animatio={"wave"} variant="rectangular" width={"100%"} height={150} sx={{ bgcolor: theme === "dark" ? "rgba(255, 255, 255, 0.226)" : " rgba(0, 0, 0, 0.137)", borderRadius: "5px", marginTop: "10px", paddingRight: "20px" }} />
      }
      <Topics theme={theme} movieid={movie?.id} />
    </section >
  );
};

export default Movie;
