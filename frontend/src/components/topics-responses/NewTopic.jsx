import React, { useState } from "react";
import "./NewTopic.css";
import newPost from "../../services/newPost";

const NewTopic = ({ id, handleClose }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    newPost(id, title, message);
    handleClose();
  };

  return (
    <div className="formTopic">
      <h4>Nuevo tema</h4>
      <hr />
      <form>
        <input type="text" name="title" id="title" maxLength={30} placeholder="Titulo" onChange={e => setTitle(e.target.value)} />
        <textarea name="message" id="message" placeholder="Deja tu comentario" required onChange={e => setMessage(e.target.value)}></textarea>
        <button type="submit" onClick={(e) => handleForm(e)}> Publicar </button>
      </form>
    </div>
  );
};
export default NewTopic;
