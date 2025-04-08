import { Link, useLocation } from "react-router";
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import "./Discussions.css";
import NewDiscussion from "./NewDiscussion";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Discussions = ({ comments }) => {
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
    <section className="Discussion">
      <div className="header_discussions">
        <h2> 🗣️Discusiones</h2>
        <button onClick={handleOpen}>+</button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
            <NewDiscussion id={id} handleClose={handleClose}/>
          </Box>
        </Modal>
      </div>
      {
        comments === "" ? <p>"No hay comentarios"</p> :
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
