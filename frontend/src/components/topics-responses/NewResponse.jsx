import React, { useEffect, useState } from "react";
import "./NewResponse.css";
import newResponses from "../../services/newResponses";

const NewResponse = ({ id, handleClose }) => {
  const [author, setAuthor] = useState("");
  const [response, setResponse] = useState("");
  useEffect(() => {
    setAuthor("");
  }, []);
  const handleForm = (e) => {
    e.preventDefault();
    newResponses(id, author, response);
    handleClose();
    window.location.reload();
  };
  return (
    <div className="formTopic">
      <h4>Nueva respuesta</h4>
      <hr />
      <form>
        <textarea name="response" id="response" placeholder="Respondé al tema" required onChange={e => setResponse(e.target.value)}></textarea>
        <button type="submit" onClick={(e) => handleForm(e)}> Publicar </button>
      </form>
    </div>
  );
};

export default NewResponse;
