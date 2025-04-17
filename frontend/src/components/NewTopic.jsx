import axios from "axios";
import { useState } from "react";
import "./NewTopic.css";

const NewTopic = ({ id, handleClose }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    let url = `http://localhost:3000/api/peliculas/${id}/temas`;

    axios.post(url, {
      titulo: title,
      descripcion: message
    })
      .then(function (response) {
        console.log(response)
      }).catch(function (error) {
        console.log(error)
      })
    handleClose();
    window.location.reload();
  }
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

  )
}
export default NewTopic;
