import axios from "axios";

const newResponses = (id, autor, contenido) => {
  axios.post(`${process.env.REACT_APP_URL_SERV}/temas/${id}/comentarios`,
    {
      contenido,
      autor: autor || ""
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
};

export default newResponses;
