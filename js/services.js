export const getAccountInfo = () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NGNkMTBjNGE4MTk5YTc0ODRmZjdmMzc5MzViNWVkYyIsIm5iZiI6MTcyOTc3OTczNy43NTcsInN1YiI6IjY3MWE1ODE5NzY5MTA3ZDc3YjQ3OTJlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jB24Ta6QSzEI4uPUYHU_c8x6iBqh0-IUbzFgeqbbysQ",
    },
  };

  const response = fetch(
    "https://api.themoviedb.org/3/authentication",
    options
  )
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
  return response;
};

export const getAllMovies = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NGNkMTBjNGE4MTk5YTc0ODRmZjdmMzc5MzViNWVkYyIsIm5iZiI6MTcyOTc3OTczNy43NTcsInN1YiI6IjY3MWE1ODE5NzY5MTA3ZDc3YjQ3OTJlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jB24Ta6QSzEI4uPUYHU_c8x6iBqh0-IUbzFgeqbbysQ",
    },
  };

  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc",
      options
    )
    if(!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`); 
    }
    const data = await response.json();
    return data;
  }catch (error) {
    console.error("Error al obtener las películas:", error);
    return null; 
  }
};
