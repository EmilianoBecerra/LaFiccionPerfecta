import { Link, useLocation, useParams } from "react-router"
import "../components/Breadcrumbs.css"
import { use, useEffect, useState } from "react";

const Breadcrumbs = ({ namemovie, topicName }) => {
  const location = useLocation();
  const [id, setId] = useState("");
  useEffect(() => {
    if (location.pathname.includes("/pelicula") && id.length === 0) {
      setId(`${location.pathname.split("/")[2]}`)
    }
    if (location.pathname === "/" && id.length > 0) {
      setId("");
    }
  }, [location.pathname])


  const switchPathname = () => {
    switch (true) {
      case location.pathname === "/":
        return (
          <Link to={"/"} className="LINK focusSpan">
            Inicio
          </Link>)
      case location.pathname.includes("/pelicula"):
        return (
          <p>
            <Link to={"/"} className="LINK" >
              Inicio
            </Link> {`>`}
            <span className="focusSpan">
              {namemovie !== undefined && namemovie.length > 21 ? `${namemovie.slice(0, 20)}...` : namemovie}
            </span>
          </p>
        );
      case location.pathname.includes("/tema"):
        return (
          <p>
            <Link to={"/"} className="LINK">
              Inicio
            </Link> {'>'}
            <Link to={`/pelicula/${id}`} className="LINK">
              {namemovie !== undefined && namemovie.length > 21 ? `${namemovie.slice(0, 20)}...` : namemovie}
            </Link> {'>'}
            <span className="focusSpan">
               {topicName !== undefined && topicName.length > 21 ? `${topicName.slice(0, 20)}...` : topicName}
            </span>
          </p>)
      default:
        return "default"

    }
  }
  return (
    <section className="Breadcrumbs">
      {switchPathname()}
    </section>

  )
}

export default Breadcrumbs;
