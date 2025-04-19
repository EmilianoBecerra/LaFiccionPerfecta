import axios from "axios";

const findByIdTopic = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/peliculas/${id}/temas`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    console.log("No se encontraron temas con es id");
  }
};

export default findByIdTopic;
