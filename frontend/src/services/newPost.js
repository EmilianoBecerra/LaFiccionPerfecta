import axios from "axios";

const newPost = async (id, title, message) => {
  try {
    await axios.post(
      `https://laficcionperfecta.onrender.com/api/peliculas/${id}/temas`,
      {
        titulo: title,
        descripcion: message
      },
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
  } catch (error) {
    console.error("Es necesario un titulo y un mensaje");
  }
};

export default newPost;
