import "./index.css";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import { useState } from "react";
import Footer from "./components/Footer";
import { Link, Route, Routes, useLocation, } from "react-router";
import Movie from "./components/Movie";
import Post from "./components/Post";
import Breadcrumbs from "./components/Breadcrumbs";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [discussion, setDiscussion] = useState(undefined);
  const [nameMovie, setNameMovie] = useState("");
  const location = useLocation();
  const [topicName, setTopicName] = useState("")

  const handleData = (childData) => {
    setTheme(childData);
  };

  return (
    <div className={`App ${theme}`}>
      <Header
        sendData={handleData}
      />
      <Breadcrumbs namemovie ={nameMovie} pathname={location.pathname} topicName={topicName}/>
      <Routes>
        <Route path={"/"} element={
          <Main
            themeStyle={theme}
          />} />
        <Route
          path={"/pelicula/:id"}
          element={
            <Movie setDiscussion={setDiscussion} theme={theme} setNameMovie={setNameMovie} />
          }
        />
        <Route
          path={"/tema/:id"}
          element={
            <Post discussion={discussion} setTopicName={setTopicName}/>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
