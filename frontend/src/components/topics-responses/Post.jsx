import { useParams } from "react-router";
import "./Post.css";
import React, { useContext, useEffect, useState } from "react";
import findByIdTopic from "../../services/findIdTopic";
import { TopicContext } from "../../context/StorageContexto";
import NewResponse from "./NewResponse";
import { Box, Modal } from "@mui/material";
import getResponses from "../../services/getResponse";

const Post = () => {
  const params = useParams();
  const [topicMovie, setTopicMovie] = useState({});
  const [responses, setResponses] = useState([]);

  const { setSelectedTopic, setSelectedMovieId } = useContext(TopicContext);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const getTopicsMovie = await findByIdTopic(params.movieId);
        const topic = getTopicsMovie?.find((topic) => topic._id === params.id);
        const responses = await getResponses(params.id);
        setTopicMovie(topic);
        sessionStorage.setItem("topicName", topic?.titulo);
        setSelectedTopic(topic);
        setSelectedMovieId(params.movieId);
        setResponses(responses);
      } catch (err) {
        console.error("No se encontró tema", err);
      }
    };
    fetchTopics();
  }, [params.movieId, params.id, setSelectedTopic]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <section className="CommentsTopic">
      <div className="topic">
        <h5 className="titleTopic">{topicMovie?.titulo}</h5>
        <p className="descriptionTopic">
          {topicMovie?.descripcion}
        </p>
      </div>
      <p className="countComment">{`${responses?.length} ${responses?.length === 1 ? "Comentario" : "Comentarios"}`}</p>
      <div className="commentBox">
        {
          responses.map((response) => (
            <article className="responseTopic" key={response._id}>
              <p className="autorName">{response.autor === "" ? "Anónimo" : response.autor}</p>
              <p className="responseText">
                {response.contenido}
              </p>
            </article>
          ))
        }
      </div>
      <button className="addResponse" onClick={handleOpen}>Agregar comentario</button>
      <section>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
          sx={{
            "& > .MuiBackdrop-root": {
              backdropFilter: "blur(2px)"
            }
          }}
        >
          <Box className={`${localStorage.getItem("theme")} box`} sx={{
            width: 360, height: 380
          }}>
            <NewResponse id={params.id} handleClose={handleClose} />
          </Box>
        </Modal>
      </section>
    </section>
  );
};
export default Post;
