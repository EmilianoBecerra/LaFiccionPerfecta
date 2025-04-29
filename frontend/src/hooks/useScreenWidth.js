import { useEffect /*, useState */ } from "react";

const useScreenWidth = () => {
  useEffect(() => {
    /* const [isMobile, setIsMobile] = useState(false); */
    window.addEventListener("resize", (e) => {});
  }, []);
  console.log(innerWidth);
};

export default useScreenWidth;
