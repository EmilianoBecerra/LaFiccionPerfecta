import React, { useContext } from "react";
import { Link, useLocation } from "react-router";
import "./Breadcrumbs.css";
import { TopicContext } from "../../context/StorageContexto";
import { Skeleton } from "@mui/material";

const Breadcrumbs = () => {
  const { selectedTopic, selectedMovieId } = useContext(TopicContext);
  const location = useLocation();
  const movieName = sessionStorage.getItem("movieName" || "");
  const theme = localStorage.getItem("theme");
  const switchPathname = () => {
    switch (true) {
      case location.pathname === "/":
        return (
          <ol className="completeBreadcrumbs">
            <li className="breadcrumbsText">
              <Link to={"/"} className="LINK focusSpan">
                Inicio
              </Link>
            </li>
          </ol>
        );
      case location.pathname.includes("/tema"):
        return (
          <ol className="completeBreadcrumbs">
            <li className="breadcrumbsText">
              <Link to={"/"} className="LINK">
                Inicio &gt;
              </Link>
            </li>
            <li className="breadcrumbsText">
              <Link to={`/pelicula/${selectedMovieId}`} className="LINK">
                {movieName !== "" && movieName.length > 21 ? `${movieName.slice(0, 20)}...` : movieName} &gt;
              </Link>
            </li>
            <li className="nameTopic breadcrumbsText focusSpan">
              {selectedTopic.titulo !== "" && selectedTopic.titulo.length > 21 ? `${selectedTopic.titulo.slice(0, 20)}...` : selectedTopic.titulo}
            </li>
          </ol >);
      case location.pathname.includes("/pelicula"):
        return (
          <ol className="completeBreadcrumbs">
            <li className="breadcrumbsText">
              < Link to={"/"} className="LINK" >
                Inicio &gt;
              </Link >
            </li>
            <li className="breadcrumbsText">
              <p className="breadcrumbsText focusSpan">
                {movieName !== "" && movieName.length > 21 ? `${movieName.slice(0, 20)}...` : movieName}
              </p>
            </li>

          </ol>
        );
    }
  };

  return (
    <>
      {
        (movieName === null && location.pathname !== "/") || (location.pathname.includes("tema") && !selectedTopic.titulo)
          ? <Skeleton variant={"rectangular"} animation={"pulse"} sx={{ bgcolor: theme === "dark" ? "rgba(255, 255, 255, 0.226)" : "rgba(0, 0, 0, 0.137)", borderRadius: "5px", width: "70%" }} />
          : <section className="Breadcrumbs">
            {switchPathname()}
          </section>
      }
    </>
  );
};
export default Breadcrumbs;
