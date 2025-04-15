import { useParams } from "react-router";
import "./Post.css"
import { useEffect } from "react";

const Post = ({ discussion, setTopicName }) => {
  const params = useParams();
  const comment = discussion?.filter((comment) => comment._id === params.id);
  useEffect(() => {
    setTopicName(comment?.[0].titulo)
  },[])
  return (
    <section className="Post">
      <h2>{comment?.[0]?.titulo}</h2>
      <p>
        {comment?.[0]?.descripcion}
      </p>
    </section>
  )
}
export default Post;
