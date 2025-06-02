import { useContext, useEffect, useState } from "react";
import getTopics from "../services/getTopics";
import { TopicContext } from "../context/StorageContexto";
import getResponses from "../services/getResponse";

const useGetTopics = (id, setTopics, isNewPostSuccessful) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { setComments } = useContext(TopicContext);

  useEffect(() => {
    setTimeout(() => {
      const getTopicsResult = async () => {
        try {
          const response = await getTopics(id);
          console.log(response);
          const result = await getResponses(response[0]._id);
          setComments(result.length);
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
