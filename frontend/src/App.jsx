import "./index.css";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import { useState } from "react";
import Footer from "./components/Footer";
import { Route, Routes, } from "react-router";
import Movie from "./components/Movie";
import Post from "./components/Post";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [discussion, setDiscussion] = useState(undefined);


  const handleData = (childData) => {
    setTheme(childData);
  };

  return (
    <div className={`App ${theme}`}>
      <Header
        sendData={handleData}
      />
      <Routes>
        <Route path={"/"} element={
          <Main
            themeStyle={theme}
          />} />
        <Route
          path={"/movie/:id"}
          element={
            <Movie setDiscussion={setDiscussion} />
          }
        />
        <Route
          path={"/discussion/:id"}
          element={
            <Post discussion={discussion} />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
