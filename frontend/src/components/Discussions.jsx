import { Link } from "react-router";
import "./Discussions.css";
const Discussions = ({ comments }) => {

  return (
    <section className="Discussion">
      <div className="header_discussions">
        <h2> 🗣️Discusiones</h2>
        <button>+</button>
      </div>
      {
        comments === undefined ? <p>"No hay comentarios"</p> :
          comments?.map((discussion, index) => (
            <Link to={`/discussion/${discussion.topicId}`} style={{ textDecoration: "none", color: "inherit" }} key={index}>
              <article className="discussion_box" >
                <h5>{discussion.title}</h5>
                <p>{discussion?.message?.slice(0, 200)}...</p>
              </article>
            </Link>
          ))
      }


    </section>
  )
}

export default Discussions;
