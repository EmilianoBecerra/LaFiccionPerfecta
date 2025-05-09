import React, { useState } from "react";
import "./NewTopic.css";
import newPost from "../../services/newPost";

const NewTopic = ({ id, handleClose, setIsNewPostSuccessful }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    const status = await newPost(id, title, message);
    setIsNewPostSuccessful(status >= 200 && status < 300);
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
