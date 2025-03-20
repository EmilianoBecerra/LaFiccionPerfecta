import "./index.css";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import { useRef, useState } from "react";
import Footer from "./components/Footer";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [searchedMovie, setSearchedMovie] = useState("");
  const searchedMovieRef = useRef("");

  const handleData = (childData) => {
    setTheme(childData);
  };

  return (
    <div className={`App ${theme}`}>
      <Header
        sendData={handleData}
        searchedMovie={searchedMovie}
        setSearchedMovie={setSearchedMovie}
        searchedMovieRef={searchedMovieRef}
      />
      <Main
        themeStyle={theme}
        searchedMovie={searchedMovie}
        searchedMovieRef={searchedMovieRef}
      />
      <Footer />
    </div>
  );
}

export default App;
