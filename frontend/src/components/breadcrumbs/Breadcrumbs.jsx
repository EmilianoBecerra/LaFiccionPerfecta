import React, { useContext } from "react";
import { Link, useLocation } from "react-router";
import "./Breadcrumbs.css";
import { TopicContext } from "../../context/StorageContexto";
import { Skeleton } from "@mui/material";

const Breadcrumbs = () => {
  const { selectedTopic, selectedMovieId } = useContext(TopicContext);
  const location = useLocation();
  const movieName = sessionStorage.getItem("movieName" || "");
  const switchPathname = () => {
    switch (true) {
      case location.pathname === "/":
        return (
          <Link to={"/"} className="LINK focusSpan">
            Inicio
          </Link>);
      case location.pathname.includes("/tema"):
        return (
          <p>
            <Link to={"/"} className="LINK">
              Inicio
            </Link> {">"}
            <Link to={`/pelicula/${selectedMovieId}`} className="LINK">
              {movieName !== "" && movieName.length > 21 ? `${movieName.slice(0, 20)}...` : movieName}
            </Link> {">"}
            <span className="focusSpan">
              {selectedTopic.titulo !== "" && selectedTopic.titulo.length > 21 ? `${selectedTopic.titulo.slice(0, 20)}...` : selectedTopic.titulo}
            </span>
          </p>);
      case location.pathname.includes("/pelicula"):
        return (
          <p>
            < Link to={"/"} className="LINK" >
              Inicio
            </Link > {">"}
            <span className="focusSpan">
              {movieName !== "" && movieName.length > 21 ? `${movieName.slice(0, 20)}...` : movieName}
            </span>
          </p >
        );
    }
  };

  return (
    <>
      {
        (movieName === null && location.pathname !== "/") || (location.pathname.includes("tema") && !selectedTopic.titulo)
          ? <Skeleton variant={"rectangular"} sx={{ bgcolor: "white" }} />
          : <section className="Breadcrumbs">
            {switchPathname()}
            </section>
      }
    </>
  );
};
export default Breadcrumbs;
