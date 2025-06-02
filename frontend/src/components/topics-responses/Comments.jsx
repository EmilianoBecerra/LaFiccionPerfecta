import { useParams } from "react-router";
import "./Comments.css";
import React, { useContext, useEffect, useState } from "react";
import findByIdTopic from "../../services/findIdTopic";
import { TopicContext } from "../../context/StorageContexto";
import NewResponse from "../forms/NewResponse";
import { Box, Modal, Skeleton, Stack } from "@mui/material";
import useGetComments from "../../hooks/useGetComments";

const Comments = () => {
  const params = useParams();
  const [topicMovie, setTopicMovie] = useState({});
  const [responses, setResponses] = useState([]);
  const theme = localStorage.getItem("theme");
  const { setSelectedTopic, setSelectedMovieId } = useContext(TopicContext);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const getTopicsMovie = await findByIdTopic(params.movieId);
        const topic = getTopicsMovie?.find((topic) => topic._id === params.id);
        setTopicMovie(topic);
        sessionStorage.setItem("topicName", topic?.titulo);
        setSelectedTopic(topic);
        setSelectedMovieId(params.movieId);
      } catch (err) {
        console.error("No se encontró tema", err);
      }
    };
    fetchTopics();
  }, [params.movieId, params.id, setSelectedTopic]);

  const { isLoading, isError } = useGetComments(params.id, setResponses);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <section className="CommentsTopic">
      {!isLoading
        ? <div className="topic">
          <h5 className="titleTopic">{topicMovie?.titulo}</h5>
          <p className="descriptionTopic">
            {topicMovie?.descripcion}
          </p>
        </div>
        : <Skeleton variant="rectangular" width={"98%"} animation={"pulse"} height={60} sx={{ borderRadius: "5px", bgcolor: theme === "dark" ? "rgba(255, 255, 255, 0.226)" : "rgba(0, 0, 0, 0.137)", marginTop: "10px" }} />
      }

      <p className="countComment">{`${responses?.length} ${responses?.length === 1 ? "Comentario" : "Comentarios"}`}</p>
      <div className="commentBox">
        {
          isError
            ? <p>Ocurrió un error al buscar los comentarios </p>
            : !isLoading
                ? responses.map((response) => (
                <article className="responseTopic" key={response._id}>
                  <p className="autorName">{response.autor === "" ? "Anónimo" : response.autor}</p>
                  <p className="responseText">
                    {response.contenido}
                  </p>
                </article>
                ))
                : <Stack>
                <Skeleton width={"98%"} animation={"pulse"} sx={{ borderRadius: "5px", bgcolor: theme === "dark" ? "rgba(255, 255, 255, 0.226)" : "rgba(0, 0, 0, 0.137)", height: "60px" }} />
                <Skeleton width={"98%"} animation={"pulse"} sx={{ borderRadius: "5px", bgcolor: theme === "dark" ? "rgba(255, 255, 255, 0.226)" : "rgba(0, 0, 0, 0.137)", height: "60px" }} />
                <Skeleton width={"98%"} animation={"pulse"} sx={{ borderRadius: "5px", bgcolor: theme === "dark" ? "rgba(255, 255, 255, 0.226)" : "rgba(0, 0, 0, 0.137)", height: "60px" }} />
              </Stack>
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
export default Comments;
