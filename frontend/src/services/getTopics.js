import axios from "axios";

const getTopics = async (movieId) => {
  try {
    const response = await axios.get(
      `https://laficcionperfecta.onrender.com/api/peliculas/${movieId}/temas`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getTopics;
