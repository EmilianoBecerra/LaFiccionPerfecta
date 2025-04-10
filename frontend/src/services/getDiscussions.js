import axios from "axios";

const getDiscussions = async (movieId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/movies/${movieId}/topics`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getDiscussions;
