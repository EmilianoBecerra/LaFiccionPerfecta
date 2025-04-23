import axios from "axios";

const getResponses = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_URL_SERV}/temas/${id}/comentarios`,
      {
        headers: {
          accept: "application/json"
        }
      }
    );
    return response.data;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    console.log(`No se encontraron comentarios con el id ${id}`);
  }
};

export default getResponses;
