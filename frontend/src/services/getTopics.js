import axios from "axios";

const getTopics = async (movieId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_URL_SERV}/peliculas/${movieId}/temas`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getTopics;
