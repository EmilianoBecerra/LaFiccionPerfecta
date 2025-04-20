import axios from "axios";

const newResponses = (id, autor, contenido) => {
  axios.post(`https://laficcionperfecta.onrender.com/api/temas/${id}/comentarios`,
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
