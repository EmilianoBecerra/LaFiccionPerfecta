import axios from "axios";
import { useState } from "react";


const NewDiscussion = ({ id, handleClose }) => {
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
    <form className="formComment">
      <label htmlFor="title">Titulo</label>
      <input type="text" name="title" id="title" onChange={e => setTitle(e.target.value)} />
      <label htmlFor="message">Comentario</label>
      <textarea name="message" id="message" onChange={e => setMessage(e.target.value)}></textarea>
      <button type="submit" onClick={(e) => handleForm(e)}> Publicar </button>
    </form>

  )
}
export default NewDiscussion;
