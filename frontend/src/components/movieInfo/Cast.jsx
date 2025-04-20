import "./Cast.css";
import React from "react";
const Cast = ({ movieDetail }) => {
  const actors = movieDetail.cast.filter((person) => (
    person.known_for_department === "Acting"
  ));
  return (
    <section className="castInfo" >
      {actors.map((person, index) => (<p key={index} className="personName">{person.name}</p>))}
    </section>
  );
};

export default Cast;
