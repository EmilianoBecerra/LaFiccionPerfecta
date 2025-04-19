import { createContext, useState } from "react";

export const TopicContext = createContext('');

export const TopicContextProvider = (props) => {
  const [selectedTopic, setSelectedTopic] = useState({});
  const [selectedMovieId, setSelectedMovieId] = useState("");

  return (
    <TopicContext.Provider value={{ selectedTopic, setSelectedTopic, selectedMovieId, setSelectedMovieId }}>
      {props.children}
    </TopicContext.Provider>
  )
}
