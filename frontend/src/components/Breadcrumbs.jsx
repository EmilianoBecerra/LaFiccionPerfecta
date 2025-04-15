import { Link, useLocation, useParams } from "react-router"
import "../components/Breadcrumbs.css"
import { useEffect, useState } from "react";

const Breadcrumbs = ({ namemovie, pathname, topicName }) => {
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
      case pathname === "/":
        return <Link to={"/"} className="LINK"><span className="focusSpan">Inicio</span></Link>
      case pathname.includes("/pelicula"):
        return <p><Link to={"/"} className="LINK" >Inicio</Link> {`>`} <span className="focusSpan">{namemovie}</span></p>;
      case pathname.includes("/tema"):
        return <p><Link to={"/"} className="LINK"><span>Inicio</span></Link> {'>'} <Link to={`/pelicula/${id}`} className="LINK">{namemovie}</Link> {'>'} <span className="focusSpan">{topicName}</span></p>
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
