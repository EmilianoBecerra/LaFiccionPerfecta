import { useEffect, useState } from "react";
import getResponses from "../services/getResponse";

const useGetComments = (id, setResponses) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const commentsResult = async () => {
      try {
        const result = await getResponses(id);
        setResponses(result);
      } catch (error) {
        console.error("No se pudieron recibir los comentarios", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    commentsResult();
  }, [id]);
  return { isLoading, isError };
};

export default useGetComments;
