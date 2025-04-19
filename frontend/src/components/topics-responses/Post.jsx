import { useParams } from "react-router";
import "./Post.css"
import { useContext, useEffect, useState } from "react";
import findByIdTopic from "../../services/findIdTopic";
import { TopicContext } from "../../context/StorageContexto";

const Post = () => {
  const params = useParams();
  const [topicMovie, setTopicMovie] = useState({});
  const commentsOfTopics = ["jajaja mal", "es verdad se va a armar", "no creo que se arme nunca pasa nada"];

  const { setSelectedTopic } = useContext(TopicContext)

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const getTopicsMovie = await findByIdTopic(params.movieId);
        const topic = getTopicsMovie?.find((topic) => topic._id === params.id);
        setTopicMovie(topic);
        sessionStorage.setItem("topicName", topic?.titulo);
        setSelectedTopic(topic)
      } catch (err) {
        console.error("No se encontró tema", err)
      }
    }
    fetchTopics();
  }, [params.movieId, params.id, setSelectedTopic])

  return (
    <section className="CommentsTopic">
      <div className="topic">
        <h5 className="titleTopic">{topicMovie?.titulo}</h5>
        <p className="descriptionTopic">
          {topicMovie?.descripcion}
        </p>
      </div>
      <p className="countComment">{`${commentsOfTopics.length} ${commentsOfTopics.length === 1 ? "Comentario" : "Comentarios"}`}</p>
      <div className="commentBox">
        {
          commentsOfTopics.map((response, index) => (
            <article className="responseTopic" key={index}>
              <p className="responseText">
                {response}
              </p>
            </article>
          ))
        }
      </div>
      <button className="addResponse">Agregar comentario</button>
    </section>
  )
}
export default Post;
