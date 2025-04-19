import "./Detail.css"
const Detail = ({ movie }) => {
  return (
    <section className="detailInfo">
      <h5>{movie.production_countries.length > 1 ? "Países:" : movie.production_countries.length === 1 ? "País:" : ""}</h5>
      {movie.production_countries.map((countries, index) => (<p key={index} className="detailMovie">{countries.name}</p>))}
      <h5>Lenguaje:</h5>
      {movie.spoken_languages.map((lang, index) => (<p key={index} className="detailMovie">{lang.name}</p>))}
      <h5>Duración:</h5>
      <p className="detailMovie">{movie.runtime} mins</p>
      <h5>Votos:</h5>
      <p className="detailMovie">{movie.vote_count}</p>
      <h5>Puntuación</h5>
      <p className="detailMovie">{movie.vote_average}</p>
    </section>
  )
}


export default Detail;

