import React, { createContext, useState } from "react";

export const TopicContext = createContext("");

export const TopicContextProvider = (props) => {
  const [selectedTopic, setSelectedTopic] = useState({});
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [comments, setComments] = useState(Number);

  return (
    <TopicContext.Provider value={{ selectedTopic, setSelectedTopic, selectedMovieId, setSelectedMovieId, comments, setComments }}>
      {props.children}
    </TopicContext.Provider>
  );
};
