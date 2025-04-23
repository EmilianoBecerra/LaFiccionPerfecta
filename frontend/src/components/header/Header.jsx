import "./Header.css";
import React from "react";
import { Link, useLocation } from "react-router";

export default function Header ({
  sendData
}) {
  const storage = window.localStorage;
  const theme = storage.getItem("theme") || "light";
  const locationPath = useLocation();

  const handleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    storage.setItem("theme", newTheme);
    sendData(newTheme);
  };

  const handleClickReload = () => {
    return location.reload();
  };

  return (
    <header>
      <Link to={"/"} className="Link">
        <h1 className={`${theme}`} onClick={locationPath.pathname === "/" ? handleClickReload : null}>
          LaFiccionPerfecta
        </h1>
      </Link>
      <img
        src={theme === "light" ? "/img/luna.png" : "/img/sol.png"}
        alt={theme === "light" ? "icono tema claro" : "icono tema oscuro"}
        className="iconoTema mostrar"
        id="temaClaro"
        width="24"
        height="24"
        onClick={handleTheme}
      />
    </header>
  );
}
