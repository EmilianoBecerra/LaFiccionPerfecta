import axios from "axios";

const findById = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/movie/${id}?language=en-US`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    console.log("No se encontró pelicula con el id");
  }
};

export default findById;
