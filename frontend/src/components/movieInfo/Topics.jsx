import { Link, useLocation, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./Topics.css";
import NewTopic from "../topics-responses/NewTopic";
import { Skeleton, Stack } from "@mui/material";
import useGetTopics from "../../hooks/useGetTopics";

const Topics = ({ theme, movieid }) => {
  const [open, setOpen] = useState(false);
  const [topics, setTopics] = useState([]);
  const params = useParams();
  const [isNewPostSuccessful, setIsNewPostSuccessful] = useState(false);
  const { isLoading } = useGetTopics(params.id, setTopics, isNewPostSuccessful);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setIsNewPostSuccessful(false);
  }, [topics.length]);

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  return (
    <section className="Topics">
      <div className="headerTopics">
        <h2>🗣️Temas</h2>
        <button onClick={handleOpen}>Nuevo Tema</button>
      </div>
      <section className="topicsBox">
        {!isLoading
          ? topics?.length === 0
            ? <p className="noComments">No hay comentarios</p>
            : topics?.reverse().map((discussion) => (
              <Link to={`/pelicula/${movieid}/tema/${discussion._id}`} style={{ textDecoration: "none", color: "inherit", width: "400px" }} key={discussion._id}>
                <article className="topicBox" >
                  <section className="titleTopic">
                    <h5>{discussion.titulo}</h5>
                    <p>Comentar</p>
                  </section>
                  <p className="comment">{discussion?.descripcion}</p>
                </article>
              </Link>
            ))
          : <Stack>
            <Skeleton width={"100%"} height={"60px"} sx={{ bgcolor: theme === "dark" ? "rgba(255, 255, 255, 0.226)" : "rgba(0, 0, 0, 0.137)" }} />
            <Skeleton width={"100%"} height={"60px"} sx={{ bgcolor: theme === "dark" ? "rgba(255, 255, 255, 0.226)" : "rgba(0, 0, 0, 0.137)" }} />
            <Skeleton width={"100%"} height={"60px"} sx={{ bgcolor: theme === "dark" ? "rgba(255, 255, 255, 0.226)" : "rgba(0, 0, 0, 0.137)" }} />
          </Stack>
        }
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
          <Box className={`${theme} box`} sx={{
            width: 360, height: 380
          }}>
            <NewTopic id={id} handleClose={handleClose} setIsNewPostSuccessful={setIsNewPostSuccessful} />
          </Box>
        </Modal>
      </section>
    </section >
  );
};

export default Topics;
