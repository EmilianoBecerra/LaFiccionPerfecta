import axios from "axios";

const newMovieDetail = async (id) => {
  try {
    const response = await axios.get(
      `
        ${process.env.REACT_APP_API_URL}/movie/${id}/credits?language=en-US
      `,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`
        }
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export default newMovieDetail;
