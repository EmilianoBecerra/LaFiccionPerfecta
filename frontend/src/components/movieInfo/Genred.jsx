import "./Genred.css";
import React from "react";

const Genred = ({ movie }) => {
  return (
    <section className="genredInfo">
      <h5>{movie.genres.length > 1 ? "Géneros:" : "Género:"}</h5>
      {movie.genres.map((genre, index) => (<p className="genre" key={index}>{genre.name}</p>))}
    </section>
  );
};

export default Genred;
