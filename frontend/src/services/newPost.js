import axios from "axios";

const newPost = async (id, title, message) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_URL_SERV}/peliculas/${id}/temas`,
      {
        titulo: title,
        descripcion: message
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
    return response.status;
  } catch (error) {
    console.error("Es necesario un titulo y un mensaje");
  }
};

export default newPost;
