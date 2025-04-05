import axios from "axios";

export const searchMovie = async (inputValue, page) => {
  try {
    const response = await axios.get(
      `
      ${
        process.env.REACT_APP_API_URL
      }/search/movie?query=${inputValue}&include_adult=false&language=en-US&page=${
        page || 1
      }`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error al buscar peliculas", error);
  }
};
