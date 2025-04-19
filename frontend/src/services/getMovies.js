import axios from "axios";

export const getMovies = async (setInfoPages, page) => {
  try {
    const response = await axios.get(
      `${
        process.env.REACT_APP_API_URL
      }/discover/movie?include_adult=false&include_video=false&language=en-US&page=${
        page || 1
      }&sort_by=popularity.desc`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
        },
      }
    );

    setInfoPages(response.data.total_pages);
    return response.data;
  } catch (error) {
    console.error("No se encontro fetching de movies", error);
  }
};
