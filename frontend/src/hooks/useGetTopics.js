import { useEffect, useState } from "react";
import getTopics from "../services/getTopics";

const useGetTopics = (id, setTopics, isNewPostSuccessful) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const getTopicsResult = async () => {
        try {
          const response = await getTopics(id);
          setTopics(response);
        } catch (error) {
          console.error("No se pudieron cargar los temas", error);
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };
      getTopicsResult();
    }, [500]);
  }, [id, isNewPostSuccessful]);
  return { isLoading, isError };
};

export default useGetTopics;
