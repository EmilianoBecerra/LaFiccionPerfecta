import "./Crew.css";
const Crew = ({ movieDetail }) => {

  const { directorNames, writerNames, producerName } = movieDetail?.crew?.reduce(
    (acc, person) => {
      if (person.job === "Director") acc.directorNames.push(person.name);
      if (person.job === "Writer") acc.writerNames.push(person.name);
      if (person.job === "Executive Producer") acc.producerName.push(person.name);
      return acc;
    },
    {
      directorNames: [], writerNames: [], producerName: []
    }) || { directorNames: [], writerNames: [], producerName: [] }

  return (
    <section className="crewInfo">
      <h5>{directorNames.length > 1 ? "Directores:" : directorNames.length == 1 ? "Director" : ""}</h5>
      {
        directorNames.map((person, index) => (<p key={index} className="personName">{person}</p>))
      }
      <h5>{writerNames.length > 1 ? "Guionistas:" : writerNames.length == 1 ? "Guionista" : ""}</h5>
      {
        writerNames.map((person, index) => (<p key={index} className="personName">{person}</p>))
      }
      <h5>{producerName.length > 1 ? "Productores:" : producerName.length == 1 ? "Productor:" : ""}</h5>
      {
        producerName.map((person, index) => (<p key={index} className="personName">{person}</p>))
      }
    </section>
  )
}

export default Crew;
