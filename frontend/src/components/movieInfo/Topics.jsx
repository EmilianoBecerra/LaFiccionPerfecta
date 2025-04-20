import { Link, useLocation } from "react-router";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./Topics.css";
import NewTopic from "../topics-responses/NewTopic";

const Topics = ({ comments, theme, movieid }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  return (
    <section className="Topics">
      <div className="headerTopics">
        <h2>🗣️Temas</h2>
        <button onClick={handleOpen}>Nuevo Tema</button>
      </div>
      <section className="topicsBox">
        {
          comments?.length === 0 || !comments
            ? <p className="noComments">No hay comentarios</p>
            : comments?.map((discussion) => (
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
            <NewTopic id={id} handleClose={handleClose} />
          </Box>
        </Modal>
      </section>
    </section >
  );
};

export default Topics;
