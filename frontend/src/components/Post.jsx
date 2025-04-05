import { useParams } from "react-router";
import "./Post.css"

const Post = ({ discussion }) => {
  const params = useParams();
  const comment = discussion?.filter((comment) => comment.topicId === params.id);
  return (
    <section className="Post">
      <h2>{comment?.[0]?.title}</h2>
      <p>
        {comment?.[0]?.message}
      </p>
    </section>
  )
}
export default Post;
