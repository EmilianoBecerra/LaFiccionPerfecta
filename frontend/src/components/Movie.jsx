import "./Movie.css";
import { useParams } from "react-router";
import findIdMovie from "../services/findIdMovie"
import { useEffect, useState } from "react";
import newMovieDetail from "../services/newMovieDetail";
import getDiscussions from "../services/getDiscussions"
import Discussions from "./Discussions";
import { Skeleton } from "@mui/material";
import Cast from "./Cast";
import Crew from "./Crew";
import Detail from "./Detail";
import Genred from "./Genred";


const Movie = ({ setDiscussion }) => {
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [movieDetail, setMovieDetail] = useState({});
  const [comments, setComments] = useState(undefined);
  const [completeOverview, setCompleteOverview] = useState(false);
  const [typeInfoMovie, setTypeInfoMovie] = useState("crew");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await findIdMovie(params.id);
        const dataDetail = await newMovieDetail(params.id);
        const discussionsMovie = await getDiscussions(params.id);
        setMovie(data);
        setMovieDetail(dataDetail);
        setComments(discussionsMovie);
        setDiscussion(discussionsMovie);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();


  }, [])

  const handleClick = (value) => {
    setTypeInfoMovie(value);
  }

  const renderSection = () => {
    switch (typeInfoMovie) {
      case "cast":
        return <Cast movieDetail={movieDetail} />
        break;
      case "crew":
        return <Crew movieDetail={movieDetail} />
        break;
      case "detail":
        return <Detail movie={movie} />
        break;
      case "genred":
        return <Genred movie={movie} />
        break;
      default:
        return <Cast movieDetail={movieDetail} />
        break;
    }
  }
  return (
    <main>
      {loading ?
        <>
          <Skeleton width={208} height={324} variant="rectangular" className="skeleton" sx={{ display: "flex" }} />
        </>
        :
        <>

          <section className="Movie">
            <img src={
              movie.poster_path === null
                ? "./img/imgnull.webp"
                : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            } alt={`poster de la pelicula ${movie.original_title}`} />
            <article className="overview">
              <h2>{movie.title}</h2>
              {
                movie.poster_path
                  ?
                  <p>
                    {!completeOverview
                      ? movie?.overview?.slice(0, 327)
                      : movie.overview
                    }
                    {!completeOverview && movie.overview?.length > 327
                      ?
                      <span onClick={() => setCompleteOverview((prevValue) => !prevValue)}>
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
          <Discussions comments={comments} />
        </>
      }
    </main>

  )
}

export default Movie;
