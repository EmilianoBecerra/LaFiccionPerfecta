import "./index.css";
import "./App.css";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import { useState } from "react";
import Footer from "./components/footer/Footer";
import { Route, Routes } from "react-router";
import Movie from "./components/movieInfo/Movie";
import Post from "./components/topics-responses/Post";
import { TopicContextProvider } from "./context/StorageContexto";
import Breadcrumbs from "./components/breadcrumbs/Breadcrumbs";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [movieId, setMovieId] = useState("");
  const handleData = (childData) => {
    setTheme(childData);
  };
  return (
    <div className={`App ${theme}`}>
      <Header
        sendData={handleData}
      />
      <TopicContextProvider>
        <Breadcrumbs/>
      <Routes>
        <Route path={"/"} element={
          <Main
            themeStyle={theme}
          />} />
        <Route
          path={"/pelicula/:id"}
          element={
            <Movie theme={theme}/>
          }
        />
        <Route
          path={"/pelicula/:movieId/tema/:id"}
          element={
            <Post/>
          }
        />
      </Routes>
      <Footer />
      </TopicContextProvider>
    </div>
  );
}

export default App;
