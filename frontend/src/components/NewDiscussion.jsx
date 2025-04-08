import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useFetcher } from "react-router";

const NewDiscussion = ({ id, handleClose }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    let url = `http://localhost:3000/api/movies/${id}/discussions`;

    axios.post(url, {
      title: title,
      message: message
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
