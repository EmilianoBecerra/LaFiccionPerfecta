import "./Movie.css";
import { useParams } from "react-router";
import findIdMovie from "../services/findIdMovie"
import { useEffect, useState } from "react";
import newMovieDetail from "../services/newMovieDetail";
import getDiscussions from "../services/getDiscussions"
import Discussions from "./Discussions";

const Movie = ({ setDiscussion }) => {
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [movieDetail, setMovieDetail] = useState({});
  const [comments, setComments] = useState(undefined);
  const [completeOverview, setCompleteOverview] = useState(false);

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
      }
    }
    fetchMovie();


  }, [params.id])

  const crew = movieDetail?.crew?.filter((person) => { return person.job === "Director" || person.job === "Writer" || person.job === "Producer" });
  const sortCrew = crew?.sort((a, b) =>
    a.job.localeCompare(b.job)
  )
  return (
    <main>
      <section className="Movie">

        <img src={
          movie.poster_path === null
            ? "./img/imgnull.webp"
            : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        } alt={`poster de la pelicula ${movie.original_title}`} />
        <article className="overview">
          <h2>{movie.original_title}</h2>
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
          <li>Crew</li>
          <li>Cast</li>
          <li>Detail</li>
          <li>Genred</li>
        </ul>
      </div>
      <Discussions comments={comments} />
    </main>

  )
}

export default Movie;
